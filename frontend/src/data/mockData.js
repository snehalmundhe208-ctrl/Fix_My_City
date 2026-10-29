export const INITIAL_COMPLAINTS = [
  {
    id: "CM-8921",
    title: "Deep pothole causing traffic slowdown near Market Yard",
    category: "Roads",
    description: "A hazardous pothole approximately 2 feet wide has formed right at the entrance of Market Yard Gate 3. Two two-wheelers skidded yesterday. Immediate asphalt filling needed.",
    location: "Market Yard Gate 3, South Main Road",
    ward: "Ward 12",
    contact: "+91 98220 12345",
    status: "In Progress",
    urgency: "High",
    reportedAt: "2 hours ago",
    reportedDate: "2026-10-29 19:15",
    citizenName: "Amit Sharma",
    citizenEmail: "amit.sharma@example.com",
    department: "Roads & Civil Infrastructure",
    assignedOfficer: {
      name: "Mr. R. Kumar",
      phone: "+91 98450 78901",
      designation: "Junior Engineer (Roads)",
      assignedAt: "2h ago"
    },
    upvotes: 42,
    hasUpvoted: false,
    commentsCount: 6,
    comments: [
      { id: "c1", user: "Vikram Mehta", time: "1h ago", text: "I commute here daily. This pothole is extremely dangerous at night!" },
      { id: "c2", user: "Officer R. Kumar", isOfficial: true, time: "45m ago", text: "Patchwork vehicle dispatched. Will be repaired by 10 PM tonight." }
    ],
    timeline: [
      { step: "Complaint Registered", status: "completed", time: "Today, 19:15", desc: "Digital ticket generated & verified by auto-triage." },
      { step: "Assigned to Ward Officer", status: "completed", time: "Today, 19:40", desc: "Assigned to Mr. R. Kumar (Ward 12 Junior Engineer)." },
      { step: "Field Inspection Completed", status: "completed", time: "Today, 20:30", desc: "Inspection done. Patchwork crew mobilized." },
      { step: "Work in Progress", status: "current", time: "Today, 21:00", desc: "Asphalt filling and compaction underway. Expected resolution: Tonight 11:30 PM." },
      { step: "Resolved & Verified", status: "pending", time: "Expected: Today 23:30", desc: "Site photo verification and citizen sign-off." }
    ],
    updates: [
      { title: "Field crew mobilized on site", time: "25m ago", icon: "truck" },
      { title: "Officer assigned: Mr. R. Kumar", time: "2h ago", icon: "user-check" },
      { title: "Complaint registered via Mobile Portal", time: "2h ago", icon: "file-text" }
    ],
    slaDeadline: "2026-10-30 19:15",
    isBreached: false,
    compensationCredited: null,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CM-8920",
    title: "Overflowing commercial garbage dump opposite Central Park Gate 2",
    category: "Garbage",
    description: "Municipal bin has been overflowing for the last 48 hours. Stray dogs and cows are scattering waste across the pedestrian sidewalk. Strong foul odor.",
    location: "Central Park Gate 2, Shivajinagar",
    ward: "Ward 5",
    contact: "+91 98220 12345",
    status: "Pending",
    urgency: "Medium",
    reportedAt: "3 hours ago",
    reportedDate: "2026-10-29 18:15",
    citizenName: "Amit Sharma",
    citizenEmail: "amit.sharma@example.com",
    department: "Solid Waste Management",
    assignedOfficer: null,
    upvotes: 28,
    hasUpvoted: false,
    commentsCount: 3,
    comments: [
      { id: "c3", user: "Sunita Roy", time: "2h ago", text: "Morning walkers are having a tough time. Please clear it immediately." }
    ],
    timeline: [
      { step: "Complaint Registered", status: "completed", time: "Today, 18:15", desc: "Ticket logged. Awaiting officer assignment." },
      { step: "Assigned to Ward Officer", status: "pending", time: "Pending", desc: "Queue priority: Medium" },
      { step: "Field Inspection Completed", status: "pending", time: "Pending", desc: "Compactor vehicle dispatch" },
      { step: "Work in Progress", status: "pending", time: "Pending", desc: "Waste clearance" },
      { step: "Resolved & Verified", status: "pending", time: "Pending", desc: "Sanitization & photo proof" }
    ],
    updates: [
      { title: "Ticket created and sent to Solid Waste division", time: "3h ago", icon: "file-text" }
    ],
    slaDeadline: "2026-10-31 18:15",
    isBreached: false,
    compensationCredited: null,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CM-8918",
    title: "Clogged stormwater drain causing waterlogging after light shower",
    category: "Drainage",
    description: "Plastic waste has blocked the drainage opening near the junction. Even with mild rain, 6 inches of dirty water stagnates, blocking pedestrian access.",
    location: "Kothrud Depot Road, Ward 8",
    ward: "Ward 8",
    contact: "+91 97654 32100",
    status: "Pending",
    urgency: "High",
    reportedAt: "5 hours ago",
    reportedDate: "2026-10-29 16:15",
    citizenName: "Kavita Rao",
    citizenEmail: "kavita.rao@example.com",
    department: "Stormwater Drainage Dept",
    assignedOfficer: null,
    upvotes: 35,
    hasUpvoted: true,
    commentsCount: 4,
    comments: [
      { id: "c4", user: "Rohan Patil", time: "3h ago", text: "Mosquito breeding has already started here." }
    ],
    timeline: [
      { step: "Complaint Registered", status: "completed", time: "Today, 16:15", desc: "High priority drainage incident logged." },
      { step: "Assigned to Ward Officer", status: "pending", time: "Pending", desc: "Awaiting sanitation inspector" }
    ],
    updates: [
      { title: "Auto-escalated to Executive Engineer due to waterlogging risk", time: "4h ago", icon: "alert-circle" }
    ],
    slaDeadline: "2026-10-30 08:00",
    isBreached: true,
    compensationCredited: null,
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CM-8915",
    title: "Four consecutive streetlights dark on Green Avenue stretch",
    category: "Streetlights",
    description: "Between pole #34 and #38 the entire road is pitch dark. Senior citizens walk here in the evening and it feels unsafe.",
    location: "Green Avenue, Ward 14",
    ward: "Ward 14",
    contact: "+91 94220 99887",
    status: "In Progress",
    urgency: "Medium",
    reportedAt: "1 day ago",
    reportedDate: "2026-10-28 14:00",
    citizenName: "Pooja Hegde",
    citizenEmail: "pooja.h@example.com",
    department: "Electrical Engineering Dept",
    assignedOfficer: {
      name: "Mr. A. Joshi",
      phone: "+91 98221 44556",
      designation: "Assistant Electrical Engineer",
      assignedAt: "18h ago"
    },
    upvotes: 19,
    hasUpvoted: false,
    commentsCount: 2,
    comments: [
      { id: "c5", user: "Mr. A. Joshi", isOfficial: true, time: "6h ago", text: "Replacement LED drivers arrived. Electrician crew scheduled for 7 PM." }
    ],
    timeline: [
      { step: "Complaint Registered", status: "completed", time: "Yesterday, 14:00", desc: "Ticket logged." },
      { step: "Assigned to Ward Officer", status: "completed", time: "Yesterday, 17:00", desc: "Assigned to Mr. A. Joshi." },
      { step: "Field Inspection Completed", status: "completed", time: "Today, 11:00", desc: "Inspected wiring faulty." },
      { step: "Work in Progress", status: "current", time: "Today, 15:00", desc: "Underground cable splicing." }
    ],
    updates: [
      { title: "Replacement parts procured", time: "6h ago", icon: "tool" },
      { title: "Faulty feeder box identified", time: "10h ago", icon: "check" }
    ],
    slaDeadline: "2026-10-30 14:00",
    isBreached: false,
    compensationCredited: null,
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CM-8910",
    title: "Low water pressure and muddy water supply in Block B",
    category: "Water Supply",
    description: "Residents of Block B received brown, turbid water for two consecutive mornings. Pressure too low to fill overhead tanks.",
    location: "Shree Heights, Block B, Ward 3",
    ward: "Ward 3",
    contact: "+91 98220 12345",
    status: "Resolved",
    urgency: "High",
    reportedAt: "2 days ago",
    reportedDate: "2026-10-27 07:30",
    citizenName: "Amit Sharma",
    citizenEmail: "amit.sharma@example.com",
    department: "Water Supply & Sewage Board",
    assignedOfficer: {
      name: "Ms. S. Patil",
      phone: "+91 94223 11223",
      designation: "Water Supply Superintendent",
      assignedAt: "2d ago"
    },
    upvotes: 56,
    hasUpvoted: true,
    commentsCount: 5,
    comments: [
      { id: "c6", user: "Ms. S. Patil", isOfficial: true, time: "Yesterday", text: "Main valve gasket leak fixed at Sub-Station 4. Water test reports passed purity standard." },
      { id: "c7", user: "Amit Sharma", time: "Yesterday", text: "Clean water restored with great pressure! Thank you for the swift resolution." }
    ],
    timeline: [
      { step: "Complaint Registered", status: "completed", time: "27 Oct, 07:30", desc: "Reported with photos." },
      { step: "Assigned to Ward Officer", status: "completed", time: "27 Oct, 08:15", desc: "Assigned to Ms. S. Patil." },
      { step: "Field Inspection Completed", status: "completed", time: "27 Oct, 11:00", desc: "Valve leakage detected." },
      { step: "Work in Progress", status: "completed", time: "27 Oct, 16:30", desc: "Replaced 4-inch valve." },
      { step: "Resolved & Verified", status: "completed", time: "28 Oct, 09:00", desc: "Purity certified & citizen verified." }
    ],
    updates: [
      { title: "Complaint resolved & citizen feedback received (5/5)", time: "1d ago", icon: "check-circle" },
      { title: "Water line pressure normalized to 2.4 bar", time: "1d ago", icon: "activity" }
    ],
    slaDeadline: "2026-10-29 07:30",
    isBreached: false,
    compensationCredited: null,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CM-8890",
    title: "Hazardous broken sewer lid at crowded vegetable market",
    category: "Drainage",
    description: "Heavy iron slab broken, leaving open gap. Delayed beyond statutory 24-hour SLA.",
    location: "Subhash Chowk, Ward 7",
    ward: "Ward 7",
    contact: "+91 98811 00223",
    status: "Resolved",
    urgency: "Critical",
    reportedAt: "5 days ago",
    reportedDate: "2026-10-24 10:00",
    citizenName: "Amit Sharma",
    citizenEmail: "amit.sharma@example.com",
    department: "Drainage Department",
    assignedOfficer: {
      name: "Mr. V. Deshmukh",
      phone: "+91 98900 12344",
      designation: "Executive Sanitation Officer",
      assignedAt: "5d ago"
    },
    upvotes: 68,
    hasUpvoted: true,
    commentsCount: 7,
    comments: [],
    timeline: [
      { step: "Complaint Registered", status: "completed", time: "24 Oct", desc: "Logged." },
      { step: "Assigned to Ward Officer", status: "completed", time: "24 Oct", desc: "Assigned." },
      { step: "Field Inspection Completed", status: "completed", time: "25 Oct", desc: "Delayed due to material stock." },
      { step: "Work in Progress", status: "completed", time: "26 Oct", desc: "Cast iron heavy lid fitted." },
      { step: "Resolved & Verified", status: "completed", time: "26 Oct", desc: "Resolved (Delayed by 18 hours)." }
    ],
    updates: [
      { title: "Statutory Civic Compensation ₹200 credited for SLA delay", time: "3d ago", icon: "award" }
    ],
    slaDeadline: "2026-10-25 10:00",
    isBreached: true,
    compensationCredited: {
      amount: "₹200",
      type: "Cash Direct Benefit Transfer",
      reason: "Statutory SLA delay of 18 hours on Critical Hazard",
      date: "2026-10-26"
    },
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOCK_OFFICERS = [
  { id: "off-1", name: "Mr. R. Kumar", department: "Roads & Civil Infrastructure", ward: "Ward 12", phone: "+91 98450 78901", activeCases: 4 },
  { id: "off-2", name: "Ms. S. Patil", department: "Water Supply & Sewage Board", ward: "Ward 3", phone: "+91 94223 11223", activeCases: 2 },
  { id: "off-3", name: "Mr. V. Deshmukh", department: "Solid Waste Management", ward: "Ward 5", phone: "+91 98900 12344", activeCases: 5 },
  { id: "off-4", name: "Mr. A. Joshi", department: "Electrical Engineering Dept", ward: "Ward 14", phone: "+91 98221 44556", activeCases: 3 },
  { id: "off-5", name: "Mrs. Meera Kadam", department: "Stormwater Drainage Dept", ward: "Ward 8", phone: "+91 97655 44332", activeCases: 3 }
];

export const SERVICE_CATEGORIES = [
  { id: "garbage", name: "Garbage", desc: "Door-to-door collection, overflowing bins, bulk waste disposal", icon: "Trash2", slaHours: 24 },
  { id: "roads", name: "Roads", desc: "Pothole repair, damaged pavements, resurfacing & speed breakers", icon: "Truck", slaHours: 48 },
  { id: "drainage", name: "Drainage", desc: "Desilting, open manholes, stormwater blocks & sewage leaks", icon: "Waves", slaHours: 24 },
  { id: "streetlights", name: "Streetlights", desc: "Non-functional lights, loose hanging cables, timer fixes", icon: "Lightbulb", slaHours: 24 },
  { id: "water", name: "Water Supply", desc: "Pipeline burst, low pressure, water quality & contaminated supply", icon: "Droplets", slaHours: 12 }
];

export const ANNOUNCEMENTS = [
  { id: "a1", title: "Ward 12 Stormwater Drain Desilting Pre-Monsoon Drive starts Friday", date: "29 Oct 2026", tag: "Public Works" },
  { id: "a2", title: "New Automated Waste Segregation Facility inaugurated in South Zone", date: "28 Oct 2026", tag: "Sanitation" },
  { id: "a3", title: "Pothole Reporting Campaign: Earn 2x Reward Points throughout this week", date: "27 Oct 2026", tag: "Rewards" },
  { id: "a4", title: "Special Citizen Grievance Camp at Ward 5 Office on Saturday 10 AM", date: "25 Oct 2026", tag: "Civic Meet" }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Priya Nair",
    locality: "Ward 14, Kalyani Nagar",
    initials: "PN",
    stars: 5,
    quote: "Reported an overflowing garbage dump in the morning. By 3 PM, municipal workers cleared the site. The photo verification gave total transparency!"
  },
  {
    id: "t2",
    name: "Rajesh Kulkarni",
    locality: "Ward 8, Kothrud",
    initials: "RK",
    stars: 5,
    quote: "The open manhole on our street was fixed within 24 hours. Seeing real-time updates and direct contact with the assigned engineer was amazing."
  },
  {
    id: "t3",
    name: "Sneha Shinde",
    locality: "Ward 12, Swargate",
    initials: "SS",
    stars: 5,
    quote: "Earned 450 points just by reporting civic issues and completing the civic awareness quiz. Easily redeemed my monthly city bus pass!"
  }
];

export const REWARDS_CATALOG = [
  {
    id: "r1",
    title: "City Bus Daily / Monthly Pass",
    points: 100,
    category: "Transit",
    icon: "Bus",
    description: "Enjoy unlimited rides on city municipal transport buses for a full day.",
    code: "BUS-PASS-7729"
  },
  {
    id: "r2",
    title: "Local Market / Kirana Voucher ₹150",
    points: 200,
    category: "Shopping",
    icon: "ShoppingBag",
    description: "Redeemable at 80+ affiliated local grocery stores and community cooperatives.",
    code: "MKT-SAVE-150X"
  },
  {
    id: "r3",
    title: "Civic Champion Golden Badge & Certificate",
    points: 500,
    category: "Recognition",
    icon: "Award",
    description: "Official recognition signed by the Municipal Commissioner with digital badge.",
    code: "CHAMP-GOLD-99"
  },
  {
    id: "r4",
    title: "Tree Plantation in Your Honor",
    points: 150,
    category: "Environment",
    icon: "Trees",
    description: "A native sapling planted in city urban forest with geo-tagged certificate.",
    code: "TREE-GEO-551"
  },
  {
    id: "r5",
    title: "Property Tax Rebate Coupon 5%",
    points: 300,
    category: "Municipal Rebate",
    icon: "Receipt",
    description: "Direct 5% discount voucher on your upcoming annual residential property tax.",
    code: "TAX-REBATE-5PCT"
  }
];
