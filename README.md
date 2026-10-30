# FixMyCity — Civic Complaint & Redressal Portal

FixMyCity is a modern, transparent civic complaint management and redressal web application inspired by public grievance platforms. It enables citizens to report local infrastructure issues (potholes, garbage dumps, drainage, streetlights, water supply), track resolution milestones in real time, engage in ward discussions, and earn rewards, while providing municipal administrators with a command center to triage complaints, dispatch ward officers, and credit statutory delay compensations under the Citizen Service Guarantee Charter.

---

## 🏗️ Architecture & Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, React Router v6, Lucide Icons, Inter font, Canvas Confetti.
- **Backend**: Python 3, FastAPI, Uvicorn (ASGI), SQLAlchemy ORM, Pydantic v2.
- **Database**: SQLite (persisted in `backend/fixmycity.db`), fully seedable and zero-config.
- **Security & Auth**:
  - `bcrypt` password hashing (rounds = 12).
  - Signed JWT tokens (`HS256`) passed via `Authorization: Bearer <token>`.
  - Role-based route protection: Citizen tokens are strictly forbidden (`403 Forbidden`) from accessing administrative endpoints.
  - Multi-Factor Authentication (MFA) OTP verification with strict 3-minute expiry.
- **File Storage**: Multipart/form-data evidence image upload served directly from `/uploads`.
- **Dev Switch & Resilience**:
  - A persistent, visible red banner automatically appears across the portal whenever the backend is unreachable.
  - Silent local mock fallback is strictly disabled unless `VITE_OFFLINE_MODE=true` or toggled via the dev switch.

---

## 📁 Project Folder Structure

```
fyp/
├── .gitignore                      # Root git ignore (node_modules, .db, uploads, venv, dist)
├── README.md                       # Documentation & setup instructions
├── backend/
│   ├── auth_utils.py               # Bcrypt hashing, JWT encode/decode, FastAPI role dependencies
│   ├── database.py                 # SQLite database engine & session maker
│   ├── main.py                     # FastAPI application routes, CORS, upload handler, static files
│   ├── models.py                   # SQLAlchemy models (User, Officer, Complaint, Timeline, Comment, etc.)
│   ├── requirements.txt            # Python dependencies (fastapi, uvicorn, sqlalchemy, bcrypt, pyjwt, etc.)
│   ├── schemas.py                  # Pydantic request/response validation schemas
│   ├── seed.py                     # Database initialization and mock data seeder
│   ├── tests/
│   │   └── test_full_flow.py       # 12-step end-to-end integration test runner against live API
│   └── uploads/                    # Physical directory serving uploaded complaint photos
└── frontend/
    ├── .gitignore                  # Frontend-specific ignores
    ├── index.html                  # HTML5 entry with Inter font
    ├── package.json                # Dependencies and scripts
    ├── tailwind.config.js          # Design system colors (Navy #0F1F3D, Amber #F59E0B, Teal #10B981)
    ├── vite.config.js              # Vite bundler configuration
    └── src/
        ├── api/
        │   └── client.js           # API client with token injection & backend offline detection
        ├── components/
        │   ├── admin/              # AssignOfficerModal, UpdateStatusModal, CompensationModal
        │   ├── citizen/            # CitizenSidebar
        │   ├── common/             # BackendOfflineBanner, CityAssistChat, ComplaintRow, StatCard, StatusPill, Timeline
        │   └── layout/             # TopBar, Header, Footer
        ├── context/
        │   ├── AccessibilityContext.jsx # Text scaling (A- A A+) and screen reader simulation
        │   ├── AuthContext.jsx          # JWT authentication, role switcher, MFA handling
        │   ├── CivicContext.jsx         # Live complaint CRUD, upvoting, comments, rewards
        │   └── LanguageContext.jsx      # Multi-language toggle (English, Hindi, Marathi)
        ├── data/
        │   └── mockData.js         # Default fallback data
        └── pages/
            ├── AboutUsPage.jsx             # Citizen charter & SLA guarantee
            ├── AdminDashboard.jsx          # Central command queue, officer assignment, status update, compensation
            ├── CitizenDashboard.jsx        # Citizen profile, active tickets, reward points
            ├── CitizenRewardsPage.jsx      # Balance, transit passes, grocery vouchers, badges
            ├── CivicServicesPage.jsx       # Public directory by category
            ├── CommunityComplaintsPage.jsx # Public feed, ward filtering, discussion drawer
            ├── ComplaintTrackingPage.jsx   # Live 5-stage timeline and field inspector contact
            ├── ContactPage.jsx             # Ward helplines & inquiry dispatch
            ├── LandingPage.jsx             # Full-bleed hero, search band, CityAssist AI card, stats, testimonials
            ├── LoginPage.jsx               # Split-screen auth with demo fillers
            ├── MfaPage.jsx                 # 6-digit OTP verification with countdown timer
            ├── RegisterPage.jsx            # Citizen account creation
            └── ReportIssuePage.jsx         # Category chips, GPS detection, evidence file upload
```

---

## 🚀 Quickstart & Setup

### Prerequisites
- **Node.js** (v18 or higher) & `npm`
- **Python** (v3.10 or higher) & `pip`

---

### Step 1: Backend Setup & Database Seeding

Open a terminal in the root folder (`F:\fyp`):

```powershell
# 1. Install Python requirements
python -m pip install -r backend/requirements.txt

# 2. Seed database with initial complaints, officers, and rewards
python backend/seed.py

# 3. Start the FastAPI backend server
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

- **Backend API**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`
- **Health Check**: `http://127.0.0.1:8000/api/health`

---

### Step 2: Frontend Setup & Dev Server

Open a second terminal in the root folder (`F:\fyp`):

```powershell
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the Vite dev server
npm run dev
```

- **Frontend Application**: `http://127.0.0.1:5173`

---

## 🔑 Demo User Credentials

The database is pre-seeded with bcrypt-hashed credentials and pre-configured roles:

| Role | Email | Password | OTP | Access & Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Citizen** | `amit.sharma@example.com` | `citizenPass123` | `482910` (or dynamic code) | Report issues, track tickets, participate in discussions, claim transit vouchers (`450 pts` balance). |
| **Admin** | `admin@fixmycity.org` | `adminSecure123` | `482910` (or dynamic code) | Central command dashboard, assign field officers, transition statuses to Resolved, trigger statutory SLA delay compensations. |

> **Note on OTP**: The MFA verification page accepts any newly generated 6-digit code or the convenience evaluation master code **`482910`**. Codes strictly expire after 3 minutes.

---

## 🧪 Automated End-to-End Integration Tests

You can run the full 12-step real API integration test suite anytime:

```powershell
python backend/tests/test_full_flow.py
```

### Test Suite Execution Output
```
======================================================================
FIXMYCITY FULL FLOW INTEGRATION TEST (REAL API)
======================================================================
[OK] Step 1: Register New Citizen -> PASS
    Details: Registered citizen, OTP generated
[OK] Step 2: MFA OTP Verification & JWT Token Issuance -> PASS
    Details: JWT Token obtained (Role: Citizen)
[OK] Step 3: Bcrypt Password Hashing & Authentication -> PASS
    Details: Wrong password -> 401 Unauthorized; Correct bcrypt password -> 200 OK + MFA challenge
[OK] Step 4: Report Civic Issue with Multipart Upload (+15 pts) -> PASS
    Details: Ticket created, Image saved to /uploads/..., Balance: 115 pts (+15 pts awarded)
[OK] Step 5: Track Complaint & Serve File from /uploads -> PASS
    Details: Status: Pending, 5-stage timeline active, Evidence image HTTP status: 200 OK
[OK] Step 6: Role Protection: Citizen Blocked from Admin Endpoints -> PASS
    Details: Citizen call to assign-officer -> HTTP 403 Forbidden
[OK] Step 7: Admin Authentication & Admin JWT Issuance -> PASS
    Details: Admin token obtained, Role: Admin
[OK] Step 8: Admin Assigns Officer -> PASS
    Details: Officer Mr. R. Kumar assigned, Status updated to In Progress
[OK] Step 9: Admin Updates Status to 'Resolved' -> PASS
    Details: Ticket status changed to Resolved with official engineering notes
[OK] Step 10: Timeline Verified Updated -> PASS
    Details: Stage 'Resolved & Verified' marked completed with note
[OK] Step 11: Upvote & Community Comment -> PASS
    Details: Total Upvotes incremented, Comment posted by citizen
[OK] Step 12: Redeem Reward (Points Deducted) -> PASS
    Details: 100 pts redeemed for Bus Pass. Remaining Balance: 15 pts
======================================================================
SUMMARY: 12/12 STEPS PASSED
ALL REAL API INTEGRATION TESTS PASSED SUCCESSFULLY! [OK]
======================================================================
```

---

## 🛡️ Citizen Charter SLA & Delay Compensation Guarantee

Under the FixMyCity civic framework, municipal service deadlines are statutory:
- **Water Supply Emergency**: 12 Hours SLA
- **Drainage & Open Sewer Lid**: 24 Hours SLA
- **Garbage & Sanitation**: 24 Hours SLA
- **Road Potholes & Asphalt**: 48 Hours SLA

If a deadline is breached, central administrators approve civic compensation:
1. **Direct Benefit Transfer (DBT)**: ₹150 to ₹500 cash credited.
2. **Fuel Discount Voucher**: Petrol/diesel rebate at municipal fuel outlets.
3. **Fair-Price Ration Credit**: Subsidized community market grocery voucher.
