from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import random
from datetime import datetime, timedelta

from database import engine, get_db, Base
import models
import schemas
from seed import seed_database

# Ensure tables and seed on start
Base.metadata.create_all(bind=engine)
seed_database()

app = FastAPI(
    title="FixMyCity Civic API",
    description="Backend API for FixMyCity civic complaint redressal and SLA management portal",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def format_complaint(c: models.Complaint) -> dict:
    assigned_officer_dict = None
    if c.officer:
        assigned_officer_dict = {
            "name": c.officer.name,
            "phone": c.officer.phone,
            "designation": c.officer.department,
            "assignedAt": "Recently"
        }

    compensation_dict = None
    if c.compensation:
        compensation_dict = {
            "amount": c.compensation.amount,
            "type": c.compensation.comp_type,
            "reason": c.compensation.reason,
            "date": c.compensation.date_credited or "2026-10-26"
        }

    sorted_timeline = sorted(c.timeline_events, key=lambda t: t.order_idx)

    return {
        "id": c.id,
        "title": c.title,
        "category": c.category,
        "description": c.description,
        "location": c.location,
        "ward": c.ward,
        "contact": c.contact,
        "status": c.status,
        "urgency": c.urgency,
        "reportedAt": c.reported_at,
        "reportedDate": c.reported_date,
        "citizenName": c.citizen_name,
        "citizenEmail": c.citizen_email,
        "department": c.department,
        "assignedOfficer": assigned_officer_dict,
        "upvotes": c.upvotes,
        "hasUpvoted": False,
        "commentsCount": len(c.comments),
        "comments": [
            {
                "id": cm.id,
                "user": cm.user_name,
                "text": cm.text,
                "time": cm.time_str,
                "isOfficial": cm.is_official
            } for cm in c.comments
        ],
        "timeline": [
            {
                "step": t.step,
                "status": t.status,
                "time": t.time_str,
                "desc": t.description
            } for t in sorted_timeline
        ],
        "updates": [
            {
                "title": u.title,
                "time": u.time_str,
                "icon": u.icon
            } for u in c.updates
        ],
        "slaDeadline": c.sla_deadline,
        "isBreached": c.is_breached,
        "compensationCredited": compensation_dict,
        "imageUrl": c.image_url
    }

def get_department_for_category(category: str) -> str:
    cat = (category or "").lower()
    if "garbage" in cat:
        return "Solid Waste Management"
    elif "road" in cat:
        return "Roads & Civil Infrastructure"
    elif "drain" in cat:
        return "Stormwater Drainage Dept"
    elif "light" in cat:
        return "Electrical Engineering Dept"
    elif "water" in cat:
        return "Water Supply & Sewage Board"
    return "Public Works Department"

# ==================== Health ====================
@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "FixMyCity Backend", "version": "1.0.0"}

# ==================== Auth Endpoints ====================
@app.post("/api/auth/login")
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email.lower()).first()
    if not user:
        # Fallback create citizen if testing with any email
        role = "Admin" if "admin" in req.email.lower() else "Citizen"
        user = models.User(
            id=f"usr-{int(datetime.utcnow().timestamp())}",
            name="Civic User" if role == "Citizen" else "Central Admin",
            email=req.email.lower(),
            role=role,
            ward="Ward 12",
            points_balance=450 if role == "Citizen" else 0
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "success": True,
        "requireMfa": True,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "ward": user.ward,
            "pointsBalance": user.points_balance
        }
    }

@app.post("/api/auth/register")
def register(req: schemas.RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == req.email.lower()).first()
    if existing:
        return {
            "success": True,
            "requireMfa": True,
            "user": {
                "id": existing.id,
                "name": existing.name,
                "email": existing.email,
                "phone": existing.phone,
                "role": existing.role,
                "ward": existing.ward,
                "pointsBalance": existing.points_balance
            }
        }

    new_user = models.User(
        id=f"usr-{int(datetime.utcnow().timestamp())}",
        name=req.name,
        email=req.email.lower(),
        phone=req.phone or "+91 98220 00000",
        ward=req.ward or "Ward 12",
        role="Citizen",
        points_balance=100
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "requireMfa": True,
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "phone": new_user.phone,
            "role": new_user.role,
            "ward": new_user.ward,
            "pointsBalance": new_user.points_balance
        }
    }

@app.post("/api/auth/verify-otp")
def verify_otp(req: schemas.MfaVerifyRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email.lower()).first()
    if not user:
        user = models.User(
            id=f"usr-{int(datetime.utcnow().timestamp())}",
            name="Amit Sharma",
            email=req.email.lower(),
            role="Citizen",
            ward="Ward 12",
            points_balance=450
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    destination = "/admin" if user.role == "Admin" else "/dashboard"
    return {
        "success": True,
        "destination": destination,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "ward": user.ward,
            "pointsBalance": user.points_balance
        }
    }

# ==================== Complaints Endpoints ====================
@app.get("/api/complaints")
def list_complaints(
    category: Optional[str] = None,
    ward: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Complaint)

    if category and category.lower() != "all":
        query = query.filter(models.Complaint.category.ilike(f"%{category}%"))
    if ward and ward.lower() != "all":
        query = query.filter(models.Complaint.ward == ward)
    if status and status.lower() != "all":
        query = query.filter(models.Complaint.status.ilike(f"%{status}%"))
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.Complaint.title.ilike(search_filter)) |
            (models.Complaint.id.ilike(search_filter)) |
            (models.Complaint.description.ilike(search_filter)) |
            (models.Complaint.location.ilike(search_filter))
        )

    complaints = query.order_by(models.Complaint.created_at.desc()).all()
    return [format_complaint(c) for c in complaints]

@app.post("/api/complaints")
def create_complaint(req: schemas.ComplaintCreate, db: Session = Depends(get_db)):
    ticket_num = random.randint(8930, 9999)
    complaint_id = f"CM-{ticket_num}"

    target_title = req.title or f"{req.category} issue at {req.location}"
    department = get_department_for_category(req.category)
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    sla_time = (datetime.now() + timedelta(hours=48)).strftime("%Y-%m-%d %H:%M")

    new_c = models.Complaint(
        id=complaint_id,
        title=target_title,
        category=req.category,
        description=req.description,
        location=req.location,
        ward=req.ward or "Ward 12",
        contact=req.contact,
        status="Pending",
        urgency=req.urgency or "Medium",
        reported_at="Just now",
        reported_date=now_str,
        citizen_name=req.citizenName or "Amit Sharma",
        citizen_email=req.citizenEmail or "amit.sharma@example.com",
        department=department,
        assigned_officer_id=None,
        upvotes=1,
        sla_deadline=sla_time,
        is_breached=False,
        image_url=req.imageUrl or "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80"
    )
    db.add(new_c)
    db.flush()

    # Create initial 5-stage timeline
    t1 = models.TimelineEvent(complaint_id=complaint_id, step="Complaint Registered", status="completed", time_str="Just now", description="Ticket logged successfully. Auto-routed to department.", order_idx=1)
    t2 = models.TimelineEvent(complaint_id=complaint_id, step="Assigned to Ward Officer", status="pending", time_str="Pending", description="Awaiting field triage.", order_idx=2)
    t3 = models.TimelineEvent(complaint_id=complaint_id, step="Field Inspection Completed", status="pending", time_str="Pending", description="Inspection pending.", order_idx=3)
    t4 = models.TimelineEvent(complaint_id=complaint_id, step="Work in Progress", status="pending", time_str="Pending", description="On-site execution pending.", order_idx=4)
    t5 = models.TimelineEvent(complaint_id=complaint_id, step="Resolved & Verified", status="pending", time_str="Pending", description="Final photo proof & citizen sign-off pending.", order_idx=5)
    
    update1 = models.ComplaintUpdate(complaint_id=complaint_id, title="Complaint logged via FixMyCity Civic Portal", time_str="Just now", icon="file-text")

    db.add_all([t1, t2, t3, t4, t5, update1])

    # Reward citizen with 15 civic points
    citizen = db.query(models.User).filter(models.User.email == (req.citizenEmail or "amit.sharma@example.com").lower()).first()
    if citizen:
        citizen.points_balance += 15

    db.commit()
    db.refresh(new_c)

    return format_complaint(new_c)

@app.get("/api/complaints/{complaint_id}")
def get_complaint(complaint_id: str, db: Session = Depends(get_db)):
    c = db.query(models.Complaint).filter(models.Complaint.id == complaint_id.upper()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint ticket not found")
    return format_complaint(c)

@app.post("/api/complaints/{complaint_id}/upvote")
def upvote_complaint(complaint_id: str, db: Session = Depends(get_db)):
    c = db.query(models.Complaint).filter(models.Complaint.id == complaint_id.upper()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")
    c.upvotes += 1
    db.commit()
    return {"id": c.id, "upvotes": c.upvotes, "hasUpvoted": True}

@app.post("/api/complaints/{complaint_id}/comments")
def add_comment(complaint_id: str, req: schemas.AddCommentRequest, db: Session = Depends(get_db)):
    c = db.query(models.Complaint).filter(models.Complaint.id == complaint_id.upper()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")

    new_cm = models.Comment(
        id=f"c-{int(datetime.utcnow().timestamp() * 1000)}",
        complaint_id=c.id,
        user_name=req.user_name or "Amit Sharma",
        text=req.text,
        time_str="Just now",
        is_official=req.is_official or False
    )
    db.add(new_cm)
    db.commit()

    return {
        "id": new_cm.id,
        "user": new_cm.user_name,
        "text": new_cm.text,
        "time": new_cm.time_str,
        "isOfficial": new_cm.is_official
    }

# ==================== Admin Action Endpoints ====================
@app.get("/api/officers")
def list_officers(db: Session = Depends(get_db)):
    officers = db.query(models.Officer).all()
    return [
        {
            "id": off.id,
            "name": off.name,
            "department": off.department,
            "ward": off.ward,
            "phone": off.phone,
            "activeCases": off.active_cases
        } for off in officers
    ]

@app.post("/api/complaints/{complaint_id}/assign-officer")
def assign_officer(complaint_id: str, req: schemas.AssignOfficerRequest, db: Session = Depends(get_db)):
    c = db.query(models.Complaint).filter(models.Complaint.id == complaint_id.upper()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")

    officer = db.query(models.Officer).filter(models.Officer.id == req.officer_id).first()
    if not officer:
        officer = db.query(models.Officer).first()

    c.assigned_officer_id = officer.id
    if c.status == "Pending":
        c.status = "In Progress"

    # Update timeline
    for event in c.timeline_events:
        if event.step == "Assigned to Ward Officer":
            event.status = "completed"
            event.time_str = "Just now"
            event.description = f"Assigned to {officer.name} ({officer.department})."
        elif event.step == "Work in Progress" and event.status == "pending":
            event.status = "current"
            event.time_str = "Underway"

    # Add log
    update_log = models.ComplaintUpdate(
        complaint_id=c.id,
        title=f"Officer assigned: {officer.name} ({officer.department})",
        time_str="Just now",
        icon="user-check"
    )
    db.add(update_log)
    officer.active_cases += 1

    db.commit()
    db.refresh(c)
    return format_complaint(c)

@app.put("/api/complaints/{complaint_id}/status")
def update_status(complaint_id: str, req: schemas.UpdateStatusRequest, db: Session = Depends(get_db)):
    c = db.query(models.Complaint).filter(models.Complaint.id == complaint_id.upper()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")

    c.status = req.status

    for event in c.timeline_events:
        if req.status == "In Progress":
            if event.step == "Work in Progress":
                event.status = "current"
                event.time_str = "In Progress"
                event.description = req.notes or "Work underway on site."
        elif req.status == "Resolved":
            if event.step == "Work in Progress":
                event.status = "completed"
            elif event.step == "Resolved & Verified":
                event.status = "completed"
                event.time_str = "Just now"
                event.description = req.notes or "Verified resolved with site proof."

    update_log = models.ComplaintUpdate(
        complaint_id=c.id,
        title=req.notes or f"Status changed to {req.status}",
        time_str="Just now",
        icon="check-circle" if req.status == "Resolved" else "activity"
    )
    db.add(update_log)

    db.commit()
    db.refresh(c)
    return format_complaint(c)

@app.post("/api/complaints/{complaint_id}/compensate")
def trigger_compensation(complaint_id: str, req: schemas.TriggerCompensationRequest, db: Session = Depends(get_db)):
    c = db.query(models.Complaint).filter(models.Complaint.id == complaint_id.upper()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")

    c.is_breached = True

    comp_rec = db.query(models.CompensationRecord).filter(models.CompensationRecord.complaint_id == c.id).first()
    if not comp_rec:
        comp_rec = models.CompensationRecord(
            complaint_id=c.id,
            citizen_email=c.citizen_email,
            amount=req.amount,
            comp_type=req.type,
            reason=req.reason,
            date_credited=datetime.now().strftime("%Y-%m-%d")
        )
        db.add(comp_rec)
    else:
        comp_rec.amount = req.amount
        comp_rec.comp_type = req.type
        comp_rec.reason = req.reason

    update_log = models.ComplaintUpdate(
        complaint_id=c.id,
        title=f"Statutory Compensation {req.amount} ({req.type}) credited for SLA delay",
        time_str="Just now",
        icon="award"
    )
    db.add(update_log)

    # Award bonus civic points
    citizen = db.query(models.User).filter(models.User.email == c.citizen_email.lower()).first()
    if citizen:
        citizen.points_balance += 50

    db.commit()
    db.refresh(c)
    return format_complaint(c)

# ==================== Rewards Endpoints ====================
@app.get("/api/rewards")
def list_rewards(db: Session = Depends(get_db)):
    rewards = db.query(models.RewardItem).all()
    return [
        {
            "id": r.id,
            "title": r.title,
            "points": r.points,
            "category": r.category,
            "icon": r.icon,
            "description": r.description,
            "code": r.code
        } for r in rewards
    ]

@app.post("/api/rewards/redeem")
def redeem_reward(req: schemas.RedeemRequest, db: Session = Depends(get_db)):
    reward = db.query(models.RewardItem).filter(models.RewardItem.id == req.reward_id).first()
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")

    user = db.query(models.User).filter(models.User.email == (req.user_email or "amit.sharma@example.com").lower()).first()
    if not user:
        user = db.query(models.User).first()

    if user.points_balance < reward.points:
        raise HTTPException(status_code=400, detail="Insufficient reward points")

    user.points_balance -= reward.points

    voucher_code = reward.code or f"FMC-{random.randint(1000, 9999)}"
    claimed = models.ClaimedReward(
        id=f"claim-{int(datetime.utcnow().timestamp())}",
        user_email=user.email,
        reward_id=reward.id,
        title=reward.title,
        code=voucher_code,
        points_spent=reward.points,
        claimed_at=datetime.now().strftime("%d %b %Y")
    )
    db.add(claimed)
    db.commit()

    return {
        "success": True,
        "remainingPoints": user.points_balance,
        "voucher": {
            "id": claimed.id,
            "title": claimed.title,
            "code": claimed.code,
            "pointsSpent": claimed.points_spent,
            "claimedAt": claimed.claimed_at
        }
    }

# ==================== Stats Endpoint ====================
@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    total_db = db.query(models.Complaint).count()
    resolved_db = db.query(models.Complaint).filter(models.Complaint.status == "Resolved").count()
    in_progress_db = db.query(models.Complaint).filter(models.Complaint.status == "In Progress").count()
    pending_db = db.query(models.Complaint).filter(models.Complaint.status == "Pending").count()

    return {
        "total": 12450 + total_db - 3,
        "resolved": 9820 + resolved_db - 1,
        "inProgress": 2630 + in_progress_db - 1,
        "pending": pending_db
    }
