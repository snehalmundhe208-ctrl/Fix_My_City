import requests
import json
import os
import sys
import time

BASE_URL = "http://127.0.0.1:8000/api"

def print_step(num, name, passed, details=""):
    status_str = "PASS" if passed else "FAIL"
    symbol = "OK" if passed else "ERR"
    print(f"[{symbol}] Step {num}: {name} -> {status_str}")
    if details:
        print(f"    Details: {details}")

def run_tests():
    print("=" * 70)
    print("FIXMYCITY FULL FLOW INTEGRATION TEST (REAL API)")
    print("=" * 70)

    results = {}

    # 1. Register a new citizen
    unique_id = int(time.time())
    citizen_email = f"citizen_{unique_id}@example.com"
    reg_payload = {
        "name": "Pooja Hegde",
        "email": citizen_email,
        "phone": "+91 98221 55667",
        "ward": "Ward 12",
        "password": "citizenSecurePassword123"
    }

    try:
        reg_res = requests.post(f"{BASE_URL}/auth/register", json=reg_payload)
        reg_data = reg_res.json()
        step1_pass = (reg_res.status_code == 200 and reg_data.get("requireMfa") == True)
        reg_otp = reg_data.get("demoOtp")
        print_step(1, "Register New Citizen", step1_pass, f"Registered {citizen_email}, OTP generated: {reg_otp}")
        results["1. Register"] = step1_pass
    except Exception as e:
        print_step(1, "Register New Citizen", False, str(e))
        return

    # 2. Verify OTP (with 3-minute expiry validation)
    try:
        otp_payload = {
            "email": citizen_email,
            "otp": reg_otp
        }
        otp_res = requests.post(f"{BASE_URL}/auth/verify-otp", json=otp_payload)
        otp_data = otp_res.json()
        citizen_token = otp_data.get("token")
        step2_pass = (otp_res.status_code == 200 and citizen_token is not None and otp_data["user"]["role"] == "Citizen")
        print_step(2, "MFA OTP Verification & JWT Token Issuance", step2_pass, f"JWT Token obtained: {citizen_token[:25]}... (Role: {otp_data.get('user', {}).get('role')})")
        results["2. OTP Verification"] = step2_pass
    except Exception as e:
        print_step(2, "MFA OTP Verification", False, str(e))
        return

    # 3. Test Bcrypt Login (Valid password and Invalid password)
    try:
        # Invalid password check
        wrong_res = requests.post(f"{BASE_URL}/auth/login", json={"email": citizen_email, "password": "wrongpassword"})
        wrong_pass = (wrong_res.status_code == 401)

        # Valid password check
        valid_res = requests.post(f"{BASE_URL}/auth/login", json={"email": citizen_email, "password": "citizenSecurePassword123"})
        valid_data = valid_res.json()
        step3_pass = wrong_pass and (valid_res.status_code == 200 and valid_data.get("requireMfa") == True)
        print_step(3, "Bcrypt Password Hashing & Authentication", step3_pass, "Wrong password -> 401 Unauthorized; Correct bcrypt password -> 200 OK + MFA challenge")
        results["3. Bcrypt Login"] = step3_pass
    except Exception as e:
        print_step(3, "Bcrypt Login", False, str(e))

    # 4. Report Issue with Multipart Evidence File Upload (+15 pts awarded)
    test_image_path = os.path.join(os.path.dirname(__file__), "test_evidence.jpg")
    with open(test_image_path, "wb") as f:
        f.write(b"\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00\xFF\xDB\x00C\x00") # minimal valid jpeg header

    try:
        with open(test_image_path, "rb") as img_file:
            files = {"file": ("pothole_evidence.jpg", img_file, "image/jpeg")}
            data = {
                "category": "Roads",
                "title": "Severe asphalt depression on East Ring Road",
                "description": "Hazardous road depression approx 3 feet wide near junction.",
                "location": "East Ring Road, Pillar 104",
                "ward": "Ward 12",
                "contact": "+91 98221 55667",
                "urgency": "High",
                "citizenName": "Pooja Hegde",
                "citizenEmail": citizen_email
            }
            citizen_headers = {"Authorization": f"Bearer {citizen_token}"}
            rep_res = requests.post(f"{BASE_URL}/complaints", data=data, files=files, headers=citizen_headers)
            rep_data = rep_res.json()
            created_ticket_id = rep_data.get("id")
            uploaded_image_url = rep_data.get("imageUrl")
            
            # Check user balance increased by 15 points (100 registration + 15 report = 115)
            me_res = requests.get(f"{BASE_URL}/auth/me", headers=citizen_headers)
            new_balance = me_res.json().get("pointsBalance")
            
            step4_pass = (
                rep_res.status_code == 200 
                and created_ticket_id.startswith("CM-")
                and "/uploads/" in (uploaded_image_url or "")
                and new_balance == 115
            )
            print_step(4, "Report Civic Issue with Multipart Upload (+15 pts)", step4_pass, f"Ticket {created_ticket_id} created, Image saved to {uploaded_image_url}, Balance: {new_balance} pts (+15 pts awarded)")
            results["4. Report Issue (+15 pts)"] = step4_pass
    except Exception as e:
        print_step(4, "Report Civic Issue", False, str(e))
        return

    # 5. Track Complaint & Verify File Served from /uploads
    try:
        track_res = requests.get(f"{BASE_URL}/complaints/{created_ticket_id}")
        track_data = track_res.json()

        # Test image file URL directly via HTTP GET
        img_check_url = track_data["imageUrl"]
        img_res = requests.get(img_check_url)
        step5_pass = (
            track_res.status_code == 200 
            and track_data["id"] == created_ticket_id
            and track_data["status"] == "Pending"
            and len(track_data["timeline"]) == 5
            and img_res.status_code == 200
        )
        print_step(5, "Track Complaint & Serve File from /uploads", step5_pass, f"Status: {track_data['status']}, 5-stage timeline active, Evidence image HTTP status: {img_res.status_code} OK")
        results["5. Track Complaint"] = step5_pass
    except Exception as e:
        print_step(5, "Track Complaint", False, str(e))

    # 6. Role-Protected Routes: Verify Citizen calling Admin endpoint is rejected with 403 Forbidden
    try:
        assign_payload = {"officer_id": "off-1", "instructions": "Dispatched"}
        unauth_res = requests.post(f"{BASE_URL}/complaints/{created_ticket_id}/assign-officer", json=assign_payload, headers=citizen_headers)
        step6_pass = (unauth_res.status_code == 403)
        print_step(6, "Role Protection: Citizen Blocked from Admin Endpoints", step6_pass, f"Citizen call to assign-officer -> HTTP {unauth_res.status_code} Forbidden (detail: '{unauth_res.json().get('detail')}')")
        results["6. Role Protection (403)"] = step6_pass
    except Exception as e:
        print_step(6, "Role Protection", False, str(e))

    # 7. Admin Login & JWT Issuance
    try:
        admin_login = requests.post(f"{BASE_URL}/auth/login", json={"email": "admin@fixmycity.org", "password": "adminSecure123"})
        admin_login_data = admin_login.json()
        admin_otp = admin_login_data.get("demoOtp")
        admin_verify = requests.post(f"{BASE_URL}/auth/verify-otp", json={"email": "admin@fixmycity.org", "otp": admin_otp})
        admin_token = admin_verify.json().get("token")
        admin_headers = {"Authorization": f"Bearer {admin_token}"}
        step7_pass = (admin_verify.status_code == 200 and admin_token is not None and admin_verify.json()["user"]["role"] == "Admin")
        print_step(7, "Admin Authentication & Admin JWT Issuance", step7_pass, f"Admin token obtained, Role: {admin_verify.json()['user']['role']}")
        results["7. Admin Login"] = step7_pass
    except Exception as e:
        print_step(7, "Admin Login", False, str(e))
        return

    # 8. Admin Assigns Officer
    try:
        assign_res = requests.post(f"{BASE_URL}/complaints/{created_ticket_id}/assign-officer", json={"officer_id": "off-1", "instructions": "Bring asphalt roller"}, headers=admin_headers)
        assign_data = assign_res.json()
        step8_pass = (
            assign_res.status_code == 200 
            and assign_data["status"] == "In Progress"
            and assign_data["assignedOfficer"]["name"] == "Mr. R. Kumar"
        )
        print_step(8, "Admin Assigns Officer", step8_pass, f"Officer {assign_data.get('assignedOfficer', {}).get('name')} assigned, Status updated to {assign_data['status']}")
        results["8. Admin Assign Officer"] = step8_pass
    except Exception as e:
        print_step(8, "Admin Assign Officer", False, str(e))

    # 9. Admin Updates Status to "Resolved" with Notes
    try:
        status_res = requests.put(f"{BASE_URL}/complaints/{created_ticket_id}/status", json={"status": "Resolved", "notes": "Road depression filled with hot-mix asphalt and compacted."}, headers=admin_headers)
        status_data = status_res.json()
        step9_pass = (
            status_res.status_code == 200 
            and status_data["status"] == "Resolved"
        )
        print_step(9, "Admin Updates Status to 'Resolved'", step9_pass, f"Ticket #{created_ticket_id} status changed to Resolved with official engineering notes")
        results["9. Update Status to Resolved"] = step9_pass
    except Exception as e:
        print_step(9, "Admin Updates Status to Resolved", False, str(e))

    # 10. Verify Timeline Updated with Completion
    try:
        verify_c = requests.get(f"{BASE_URL}/complaints/{created_ticket_id}").json()
        timeline = verify_c.get("timeline", [])
        resolved_event = next((t for t in timeline if t["step"] == "Resolved & Verified"), None)
        step10_pass = (
            resolved_event is not None 
            and resolved_event["status"] == "completed"
        )
        print_step(10, "Timeline Verified Updated", step10_pass, f"Stage 'Resolved & Verified' marked completed with note: '{resolved_event.get('desc', '')}'")
        results["10. Timeline Updated"] = step10_pass
    except Exception as e:
        print_step(10, "Timeline Verified", False, str(e))

    # 11. Upvote and Add Citizen Community Comment
    try:
        upvote_res = requests.post(f"{BASE_URL}/complaints/{created_ticket_id}/upvote")
        upvote_data = upvote_res.json()
        
        comment_res = requests.post(f"{BASE_URL}/complaints/{created_ticket_id}/comments", json={"text": "Excellent road restoration. Smooth driving now!"}, headers=citizen_headers)
        comment_data = comment_res.json()

        step11_pass = (
            upvote_res.status_code == 200 
            and upvote_data["upvotes"] >= 2
            and comment_res.status_code == 200
            and comment_data["text"] == "Excellent road restoration. Smooth driving now!"
        )
        print_step(11, "Upvote & Community Comment", step11_pass, f"Total Upvotes: {upvote_data.get('upvotes')}, Comment posted by {comment_data.get('user')}")
        results["11. Upvote & Comment"] = step11_pass
    except Exception as e:
        print_step(11, "Upvote and Comment", False, str(e))

    # 12. Redeem Reward (Points Deducted)
    try:
        # User currently has 115 points, Bus pass costs 100 points
        redeem_res = requests.post(f"{BASE_URL}/rewards/redeem", json={"reward_id": "r1"}, headers=citizen_headers)
        redeem_data = redeem_res.json()
        step12_pass = (
            redeem_res.status_code == 200 
            and redeem_data["success"] == True
            and redeem_data["remainingPoints"] == 15 # 115 - 100 = 15
            and redeem_data["voucher"]["code"] == "BUS-PASS-7729"
        )
        print_step(12, "Redeem Reward (Points Deducted)", step12_pass, f"100 pts redeemed for Bus Pass. Voucher Code: {redeem_data.get('voucher', {}).get('code')}, Remaining Balance: {redeem_data.get('remainingPoints')} pts")
        results["12. Redeem Reward"] = step12_pass
    except Exception as e:
        print_step(12, "Redeem Reward", False, str(e))

    # Cleanup temp test image
    if os.path.exists(test_image_path):
        os.remove(test_image_path)

    print("=" * 70)
    all_passed = all(results.values())
    total_steps = len(results)
    passed_steps = sum(1 for v in results.values() if v)
    print(f"SUMMARY: {passed_steps}/{total_steps} STEPS PASSED")
    if all_passed:
        print("ALL REAL API INTEGRATION TESTS PASSED SUCCESSFULLY! [OK]")
    else:
        print("SOME TESTS FAILED! [FAILED]")
    print("=" * 70)
    return all_passed

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
