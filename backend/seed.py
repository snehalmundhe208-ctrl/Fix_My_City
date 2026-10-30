from database import SessionLocal, engine, Base
import models
from auth_utils import hash_password

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if users have hashed passwords or table is empty
    citizen_check = db.query(models.User).filter(models.User.id == "usr-citizen-1").first()
    if citizen_check:
        if not citizen_check.hashed_password:
            citizen_check.hashed_password = hash_password("citizenPass123")
            admin_check = db.query(models.User).filter(models.User.id == "usr-admin-1").first()
            if admin_check:
                admin_check.hashed_password = hash_password("adminSecure123")
            db.commit()
        print("Database already seeded.")
        db.close()
        return

    print("Seeding database with FixMyCity initial records...")

    # Users with Bcrypt Hashed Passwords
    citizen = models.User(
        id="usr-citizen-1",
        name="Amit Sharma",
        email="amit.sharma@example.com",
        hashed_password=hash_password("citizenPass123"),
        phone="+91 98220 12345",
        ward="Ward 12",
        role="Citizen",
        points_balance=450
    )
    admin = models.User(
        id="usr-admin-1",
        name="Sunil K. Verma",
        email="admin@fixmycity.org",
        hashed_password=hash_password("adminSecure123"),
        phone="+91 98110 55667",
        ward="Ward 12",
        role="Admin",
        points_balance=0
    )
    db.add_all([citizen, admin])

    # Officers
    officers = [
        models.Officer(id="off-1", name="Mr. R. Kumar", department="Roads & Civil Infrastructure", ward="Ward 12", phone="+91 98450 78901", active_cases=4),
        models.Officer(id="off-2", name="Ms. S. Patil", department="Water Supply & Sewage Board", ward="Ward 3", phone="+91 94223 11223", active_cases=2),
        models.Officer(id="off-3", name="Mr. V. Deshmukh", department="Solid Waste Management", ward="Ward 5", phone="+91 98900 12344", active_cases=5),
        models.Officer(id="off-4", name="Mr. A. Joshi", department="Electrical Engineering Dept", ward="Ward 14", phone="+91 98221 44556", active_cases=3),
        models.Officer(id="off-5", name="Mrs. Meera Kadam", department="Stormwater Drainage Dept", ward="Ward 8", phone="+91 97655 44332", active_cases=3),
    ]
    db.add_all(officers)

    # Reward Items
    rewards = [
        models.RewardItem(id="r1", title="City Bus Daily / Monthly Pass", points=100, category="Transit", icon="Bus", description="Unlimited rides on municipal transport buses for a full day.", code="BUS-PASS-7729"),
        models.RewardItem(id="r2", title="Local Market / Kirana Voucher ₹150", points=200, category="Shopping", icon="ShoppingBag", description="Redeemable at 80+ affiliated local grocery stores.", code="MKT-SAVE-150X"),
        models.RewardItem(id="r3", title="Civic Champion Golden Badge & Certificate", points=500, category="Recognition", icon="Award", description="Official recognition signed by Municipal Commissioner.", code="CHAMP-GOLD-99"),
        models.RewardItem(id="r4", title="Tree Plantation in Your Honor", points=150, category="Environment", icon="Trees", description="A native sapling planted in urban forest with geo-tagged cert.", code="TREE-GEO-551"),
        models.RewardItem(id="r5", title="Property Tax Rebate Coupon 5%", points=300, category="Municipal Rebate", icon="Receipt", description="5% discount voucher on annual residential property tax.", code="TAX-REBATE-5PCT")
    ]
    db.add_all(rewards)

    # Complaints
    # 1. CM-8921
    c1 = models.Complaint(
        id="CM-8921",
        title="Deep pothole causing traffic slowdown near Market Yard",
        category="Roads",
        description="A hazardous pothole approximately 2 feet wide has formed right at the entrance of Market Yard Gate 3. Immediate asphalt filling needed.",
        location="Market Yard Gate 3, South Main Road",
        ward="Ward 12",
        contact="+91 98220 12345",
        status="In Progress",
        urgency="High",
        reported_at="2 hours ago",
        reported_date="2026-10-29 19:15",
        citizen_name="Amit Sharma",
        citizen_email="amit.sharma@example.com",
        department="Roads & Civil Infrastructure",
        assigned_officer_id="off-1",
        upvotes=42,
        sla_deadline="2026-10-30 19:15",
        is_breached=False,
        image_url="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
    )
    db.add(c1)
    db.flush()

    db.add_all([
        models.TimelineEvent(complaint_id="CM-8921", step="Complaint Registered", status="completed", time_str="Today, 19:15", description="Digital ticket generated & auto-triaged.", order_idx=1),
        models.TimelineEvent(complaint_id="CM-8921", step="Assigned to Ward Officer", status="completed", time_str="Today, 19:40", description="Assigned to Mr. R. Kumar (Junior Engineer).", order_idx=2),
        models.TimelineEvent(complaint_id="CM-8921", step="Field Inspection Completed", status="completed", time_str="Today, 20:30", description="Inspection done. Crew mobilized.", order_idx=3),
        models.TimelineEvent(complaint_id="CM-8921", step="Work in Progress", status="current", time_str="Today, 21:00", description="Asphalt compaction underway. Expected resolution: Tonight 11:30 PM.", order_idx=4),
        models.TimelineEvent(complaint_id="CM-8921", step="Resolved & Verified", status="pending", time_str="Expected: 23:30", description="Site photo verification and citizen sign-off.", order_idx=5),
        models.ComplaintUpdate(complaint_id="CM-8921", title="Field crew mobilized on site", time_str="25m ago", icon="truck"),
        models.ComplaintUpdate(complaint_id="CM-8921", title="Officer assigned: Mr. R. Kumar", time_str="2h ago", icon="user-check"),
        models.Comment(id="c1", complaint_id="CM-8921", user_name="Vikram Mehta", text="I commute here daily. Extremely dangerous at night!", time_str="1h ago", is_official=False),
        models.Comment(id="c2", complaint_id="CM-8921", user_name="Officer R. Kumar", text="Patchwork vehicle dispatched. Will be repaired tonight.", time_str="45m ago", is_official=True)
    ])

    # 2. CM-8920
    c2 = models.Complaint(
        id="CM-8920",
        title="Overflowing commercial garbage dump opposite Central Park Gate 2",
        category="Garbage",
        description="Municipal bin overflowing for last 48 hours. Foul odor and stray animals.",
        location="Central Park Gate 2, Shivajinagar",
        ward="Ward 5",
        contact="+91 98220 12345",
        status="Pending",
        urgency="Medium",
        reported_at="3 hours ago",
        reported_date="2026-10-29 18:15",
        citizen_name="Amit Sharma",
        citizen_email="amit.sharma@example.com",
        department="Solid Waste Management",
        assigned_officer_id=None,
        upvotes=28,
        sla_deadline="2026-10-31 18:15",
        is_breached=False,
        image_url="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80"
    )
    db.add(c2)
    db.flush()

    db.add_all([
        models.TimelineEvent(complaint_id="CM-8920", step="Complaint Registered", status="completed", time_str="Today, 18:15", description="Ticket logged. Awaiting triage.", order_idx=1),
        models.TimelineEvent(complaint_id="CM-8920", step="Assigned to Ward Officer", status="pending", time_str="Pending", description="Queue priority: Medium", order_idx=2),
        models.TimelineEvent(complaint_id="CM-8920", step="Work in Progress", status="pending", time_str="Pending", description="Compactor dispatch", order_idx=3),
        models.TimelineEvent(complaint_id="CM-8920", step="Resolved & Verified", status="pending", time_str="Pending", description="Site clearance verification", order_idx=4),
        models.ComplaintUpdate(complaint_id="CM-8920", title="Ticket logged & auto-routed to Solid Waste division", time_str="3h ago", icon="file-text"),
        models.Comment(id="c3", complaint_id="CM-8920", user_name="Sunita Roy", text="Morning walkers having tough time. Please clear urgently.", time_str="2h ago", is_official=False)
    ])

    # 3. CM-8890 with Compensation
    c3 = models.Complaint(
        id="CM-8890",
        title="Hazardous broken sewer lid at crowded vegetable market",
        category="Drainage",
        description="Heavy iron slab broken, leaving open gap. Delayed beyond statutory 24-hour SLA.",
        location="Subhash Chowk, Ward 7",
        ward="Ward 7",
        contact="+91 98811 00223",
        status="Resolved",
        urgency="Critical",
        reported_at="5 days ago",
        reported_date="2026-10-24 10:00",
        citizen_name="Amit Sharma",
        citizen_email="amit.sharma@example.com",
        department="Stormwater Drainage Dept",
        assigned_officer_id="off-3",
        upvotes=68,
        sla_deadline="2026-10-25 10:00",
        is_breached=True,
        image_url="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80"
    )
    db.add(c3)
    db.flush()

    db.add_all([
        models.TimelineEvent(complaint_id="CM-8890", step="Complaint Registered", status="completed", time_str="24 Oct", description="Logged.", order_idx=1),
        models.TimelineEvent(complaint_id="CM-8890", step="Assigned to Ward Officer", status="completed", time_str="24 Oct", description="Assigned to Mr. V. Deshmukh", order_idx=2),
        models.TimelineEvent(complaint_id="CM-8890", step="Work in Progress", status="completed", time_str="26 Oct", description="Heavy iron lid fitted.", order_idx=3),
        models.TimelineEvent(complaint_id="CM-8890", step="Resolved & Verified", status="completed", time_str="26 Oct", description="Resolved (delayed by 18 hours).", order_idx=4),
        models.ComplaintUpdate(complaint_id="CM-8890", title="Statutory Civic Compensation ₹200 credited for SLA delay", time_str="3d ago", icon="award"),
        models.CompensationRecord(complaint_id="CM-8890", citizen_email="amit.sharma@example.com", amount="₹200", comp_type="Cash DBT Bank Transfer", reason="Statutory SLA delay of 18 hours on Critical Hazard", date_credited="2026-10-26")
    ])

    db.commit()
    db.close()
    print("Database seeded successfully.")

if __name__ == "__main__":
    seed_database()
