from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    ward = Column(String, default="Ward 12")
    role = Column(String, default="Citizen") # "Citizen" | "Admin"
    points_balance = Column(Integer, default=450)
    created_at = Column(DateTime, default=datetime.utcnow)

class Officer(Base):
    __tablename__ = "officers"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    ward = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    active_cases = Column(Integer, default=0)

    complaints = relationship("Complaint", back_populates="officer")

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(String, primary_key=True, index=True) # e.g. "CM-8921"
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String, nullable=False)
    ward = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    status = Column(String, default="Pending") # "Pending", "In Progress", "Resolved"
    urgency = Column(String, default="Medium")
    reported_at = Column(String, default="Recently")
    reported_date = Column(String, default="")
    citizen_name = Column(String, default="Amit Sharma")
    citizen_email = Column(String, default="amit.sharma@example.com")
    department = Column(String, default="Public Works")
    
    assigned_officer_id = Column(String, ForeignKey("officers.id"), nullable=True)
    officer = relationship("Officer", back_populates="complaints")

    upvotes = Column(Integer, default=0)
    sla_deadline = Column(String, default="")
    is_breached = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    timeline_events = relationship("TimelineEvent", back_populates="complaint", cascade="all, delete-orphan")
    updates = relationship("ComplaintUpdate", back_populates="complaint", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="complaint", cascade="all, delete-orphan")
    compensation = relationship("CompensationRecord", back_populates="complaint", uselist=False, cascade="all, delete-orphan")

class TimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id = Column(String, ForeignKey("complaints.id"))
    step = Column(String, nullable=False)
    status = Column(String, default="pending") # "completed", "current", "pending"
    time_str = Column(String, default="")
    description = Column(Text, default="")
    order_idx = Column(Integer, default=0)

    complaint = relationship("Complaint", back_populates="timeline_events")

class ComplaintUpdate(Base):
    __tablename__ = "complaint_updates"

    id = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id = Column(String, ForeignKey("complaints.id"))
    title = Column(String, nullable=False)
    time_str = Column(String, default="Just now")
    icon = Column(String, default="file-text")

    complaint = relationship("Complaint", back_populates="updates")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(String, primary_key=True, index=True)
    complaint_id = Column(String, ForeignKey("complaints.id"))
    user_name = Column(String, nullable=False)
    text = Column(Text, nullable=False)
    time_str = Column(String, default="Just now")
    is_official = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="comments")

class RewardItem(Base):
    __tablename__ = "reward_items"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    points = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    icon = Column(String, default="Gift")
    description = Column(Text, default="")
    code = Column(String, default="")

class ClaimedReward(Base):
    __tablename__ = "claimed_rewards"

    id = Column(String, primary_key=True)
    user_email = Column(String, nullable=False)
    reward_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    code = Column(String, nullable=False)
    points_spent = Column(Integer, nullable=False)
    claimed_at = Column(String, nullable=False)

class CompensationRecord(Base):
    __tablename__ = "compensation_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id = Column(String, ForeignKey("complaints.id"))
    citizen_email = Column(String, nullable=False)
    amount = Column(String, default="₹250")
    comp_type = Column(String, default="Cash DBT Bank Transfer")
    reason = Column(Text, default="SLA turnaround target exceeded")
    date_credited = Column(String, default="")

    complaint = relationship("Complaint", back_populates="compensation")
