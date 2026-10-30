from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any
from datetime import datetime

# --- Auth Schemas ---
class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = "Citizen"

class RegisterRequest(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    ward: Optional[str] = "Ward 12"
    password: str

class MfaVerifyRequest(BaseModel):
    email: str
    otp: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    ward: str
    role: str
    points_balance: int

# --- Officer Schemas ---
class OfficerResponse(BaseModel):
    id: str
    name: str
    department: str
    ward: str
    phone: str
    active_cases: int

# --- Complaint Schemas ---
class TimelineEventSchema(BaseModel):
    step: str
    status: str
    time: str
    desc: Optional[str] = ""

class ComplaintUpdateSchema(BaseModel):
    title: str
    time: str
    icon: Optional[str] = "file-text"

class CommentSchema(BaseModel):
    id: str
    user: str
    text: str
    time: str
    isOfficial: Optional[bool] = False

class CompensationSchema(BaseModel):
    amount: str
    type: str
    reason: str
    date: str

class ComplaintCreate(BaseModel):
    title: Optional[str] = None
    category: str
    description: str
    location: str
    ward: Optional[str] = "Ward 12"
    contact: str
    urgency: Optional[str] = "Medium"
    citizenName: Optional[str] = "Amit Sharma"
    citizenEmail: Optional[str] = "amit.sharma@example.com"
    imageUrl: Optional[str] = None

class ComplaintResponse(BaseModel):
    id: str
    title: str
    category: str
    description: str
    location: str
    ward: str
    contact: str
    status: str
    urgency: str
    reportedAt: str
    reportedDate: str
    citizenName: str
    citizenEmail: str
    department: str
    assignedOfficer: Optional[Any] = None
    upvotes: int
    hasUpvoted: Optional[bool] = False
    commentsCount: int
    comments: List[CommentSchema] = []
    timeline: List[TimelineEventSchema] = []
    updates: List[ComplaintUpdateSchema] = []
    slaDeadline: str
    isBreached: bool
    compensationCredited: Optional[CompensationSchema] = None
    imageUrl: Optional[str] = None

# --- Admin Action Schemas ---
class AssignOfficerRequest(BaseModel):
    officer_id: str
    instructions: Optional[str] = ""

class UpdateStatusRequest(BaseModel):
    status: str
    notes: Optional[str] = ""

class TriggerCompensationRequest(BaseModel):
    amount: str = "₹250"
    type: str = "Cash DBT Bank Transfer"
    reason: str = "Citizen Charter SLA Deadline Exceeded"

class AddCommentRequest(BaseModel):
    text: str
    user_name: Optional[str] = "Amit Sharma"
    is_official: Optional[bool] = False

# --- Rewards Schemas ---
class RewardItemResponse(BaseModel):
    id: str
    title: str
    points: int
    category: str
    icon: str
    description: str
    code: str

class RedeemRequest(BaseModel):
    reward_id: str
    user_email: Optional[str] = "amit.sharma@example.com"
