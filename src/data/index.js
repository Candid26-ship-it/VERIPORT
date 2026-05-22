// ─── Data ─────────────────────────────────────────────────────────────────────
export const LOGIN_USERS = {
  alice:   { name: "Alice Okafor",  email: "alice@dragnet.ng",   password: "alice1234",   role: "Admin",   initials: "AO" },
  emeka:   { name: "Emeka Nwosu",   email: "emeka@dragnet.ng",   password: "emeka1234",   role: "CE",      initials: "EN" },
  mariam:  { name: "Mariam Yusuf",  email: "mariam@dragnet.ng",  password: "mariam1234",  role: "Manager", initials: "MY" },
  kelechi: { name: "Kelechi Eze",   email: "kelechi@dragnet.ng", password: "kelechi1234", role: "Officer", initials: "KE" },
};

export const ROLE_PROFILES = [
  { id: "admin",   name: "Admin User",      role: "System Administrator",   initials: "A" },
  { id: "sarah",   name: "Sarah Chen",      role: "CE Officer",              initials: "S" },
  { id: "mike",    name: "Mike Obi",        role: "Verification Officer",    initials: "M" },
  { id: "grace",   name: "Grace Adeyemi",   role: "Executive",               initials: "G" },
  { id: "david",   name: "David Okonkwo",   role: "Manager",                 initials: "D" },
  { id: "akpan",   name: "Dr. Akpan",       role: "Verification Authority",  initials: "DA",
    vaDetails: { title:"Head of Department, Computer Science", institution:"University of Lagos", email:"akpan@unilag.edu.ng", department:"Computer Science", faculty:"Science" } },
  { id: "candidate", name: "Yusuf Ibrahim",   role: "Candidate Portal",        initials: "YI" },
  { id: "client",    name: "Zenith Bank",     role: "Client Portal",           initials: "ZB" },
];

export const USERS_LIST = [
  { name: "Jane Okonkwo",    email: "jane@dragnet.ng",     role: "Admin", servforms: "—",  status: "Active" },
  { name: "Sarah Adeniyi",   email: "sarah@dragnet.ng",    role: "CE",    servforms: "—",  status: "Active" },
  { name: "Damilola Adeyemi",email: "damilola@dragnet.ng", role: "VO",    servforms: "4",  status: "Active" },
  { name: "Chinedu Okafor",  email: "chinedu@dragnet.ng",  role: "VO",    servforms: "3",  status: "Active" },
  { name: "Adebayo Fashola", email: "adebayo@dragnet.ng",  role: "VO",    servforms: "1",  status: "Active" },
  { name: "Fatima Bello",    email: "fatima@dragnet.ng",   role: "VE",    servforms: "—",  status: "Active" },
  { name: "Olumide Bakare",  email: "olumide@dragnet.ng",  role: "VM",    servforms: "—",  status: "Active" },
];

export const ROLE_PERMISSIONS = [
  {
    section: "USER & ACCESS MANAGEMENT",
    perms: [
      { label: "Manage users",           admin: true,  ce: false, vo: false, ve: false, vm: false },
      { label: "Assign roles",           admin: true,  ce: false, vo: false, ve: false, vm: false },
      { label: "Deactivate users",       admin: true,  ce: false, vo: false, ve: false, vm: false },
    ]
  },
  {
    section: "CLIENT ENGAGEMENT",
    perms: [
      { label: "Create batches",         admin: true,  ce: true,  vo: false, ve: false, vm: false },
      { label: "Manage batches",         admin: true,  ce: true,  vo: false, ve: false, vm: false },
      { label: "Release reports",        admin: true,  ce: true,  vo: false, ve: false, vm: false },
      { label: "Query reports",          admin: true,  ce: true,  vo: false, ve: true,  vm: true  },
    ]
  },
  {
    section: "VERIFICATION OPERATIONS",
    perms: [
      { label: "Perform verifications",  admin: false, ce: false, vo: true,  ve: false, vm: false },
      { label: "Submit evidence",        admin: false, ce: false, vo: true,  ve: false, vm: false },
      { label: "View assigned ServModes",admin: true,  ce: false, vo: true,  ve: false, vm: false },
    ]
  },
  {
    section: "TEMPLATES & CONFIGURATION",
    perms: [
      { label: "Manage services",        admin: true,  ce: false, vo: false, ve: false, vm: false },
      { label: "Manage templates",       admin: true,  ce: false, vo: false, ve: false, vm: false },
      { label: "Assign ServModes",       admin: true,  ce: false, vo: false, ve: false, vm: true  },
    ]
  },
  {
    section: "SYSTEM & AUDIT",
    perms: [
      { label: "View audit logs",        admin: true,  ce: false, vo: false, ve: false, vm: false },
      { label: "Configure integrations", admin: true,  ce: false, vo: false, ve: false, vm: false },
      { label: "System settings access", admin: true,  ce: false, vo: false, ve: false, vm: false },
    ]
  },
  {
    section: "REGISTRY & FIELD MANAGEMENT",
    perms: [
      { label: "Manage VA Registry",     admin: true,  ce: false, vo: false, ve: true,  vm: true  },
      { label: "Manage Field Agents",    admin: true,  ce: false, vo: false, ve: true,  vm: true  },
    ]
  },
];

export const BATCHES = {
  drafts: [
    { client: "Beta Industries PLC", batch: "Beta Executive Hiring",        tasks: 16,  days: 501 },
    { client: "Zenith Bank",         batch: "January 2026 Graduate Intake", tasks: 384, days: 32  },
    { client: "Beta Industries PLC", batch: "Q1 Contract Workers - Lagos",  tasks: 125, days: 29  },
  ],
  collection: [
    { client: "Acme Corporation Limited", batch: "UBA Dec 2025 Intake",        received: "70 / 100", tasks: 400, days: "5/5" },
    { client: "Beta Industries PLC",      batch: "MTN Nigeria Q1 Contractors", received: "84 / 120", tasks: 480, days: "7/7" },
    { client: "Gamma Technologies Ltd",   batch: "Stanbic Feb Intake",         received: "70 / 100", tasks: 600, days: "7/7" },
  ],
  active: {
    candidates: [
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: "32 / 40", pending: "8 / 40",  days: 508, status: "Verifying" },
      { client: "Beta Industries PLC",      batch: "Beta Ltd Q4 Screening",        complete: "7 / 20",  pending: "13 / 20", days: 506, status: "Verifying" },
      { client: "Gamma Technologies Ltd",   batch: "Gamma Tech Team Expansion",    complete: "18 / 24", pending: "6 / 24",  days: 508, status: "Verifying" },
    ],
    tasks: [
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 0,  pending: 3, days: 508, status: "Verifying" },
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 6,  pending: 4, days: 508, status: "Verifying" },
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 4,  pending: 3, days: 508, status: "Verifying" },
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 8,  pending: 1, days: 508, status: "Verifying" },
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 8,  pending: 1, days: 508, status: "Verifying" },
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 2,  pending: 2, days: 508, status: "Verifying" },
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 2,  pending: 1, days: 508, status: "Verifying" },
      { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", complete: 1,  pending: 0, days: 508, status: "Verifying" },
      { client: "Beta Industries PLC",      batch: "Beta Ltd Q4 Screening",        complete: 7,  pending: 2, days: 506, status: "Verifying" },
    ],
  },
  complete: [
    { client: "Acme Corporation Limited", batch: "Acme September Batch",   tasks: 32, delivered: "Sep 26, 2024", duration: "8 days" },
    { client: "Delta Financial Services", batch: "Delta Finance New Hires", tasks: 24, delivered: "Sep 30, 2024", duration: "14 days" },
    { client: "Gamma Technologies Ltd",   batch: "Gamma Previous Batch",    tasks: 48, delivered: "Oct 04, 2024", duration: "9 days" },
  ],
};

export const BATCH_RETURNS = [
  { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", servform: "Employment Reference", mode: "Email",  candidate: "Fatima Yusuf",   issue: "Email bounced — invalid address provided",                   sla: "3 days",  slaOver: false },
  { client: "Acme Corporation Limited", batch: "Acme Q4 New Hires - Batch 1", servform: "Address Verification",   mode: "Field",  candidate: "Ngozi Obi",      issue: "Address not found — incorrect location details",              sla: "1 day",   slaOver: true  },
  { client: "Beta Industries PLC",      batch: "Beta Ltd Q4 Screening",        servform: "Academic Verification",  mode: "Email",  candidate: "Ibrahim Musa",   issue: "Institution not responding — no reply after 3 attempts",      sla: "5 days",  slaOver: false },
  { client: "Beta Industries PLC",      batch: "Beta Ltd Q4 Screening",        servform: "Employment Reference",   mode: "Email",  candidate: "Blessing Eze",   issue: "Employer address incomplete — missing suite number",           sla: "Overdue", slaOver: true  },
  { client: "Gamma Technologies Ltd",   batch: "Gamma Tech Team Expansion",    servform: "Guarantor Verification", mode: "Phone",  candidate: "Chidi Okonkwo",  issue: "Guarantor phone unreachable — number disconnected",            sla: "2 days",  slaOver: false },
];

export const ADMIN_NAV = [
  { label: "Dashboard",                d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Internal Users",           d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
  { label: "Service Catalog",          d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6" },
  { label: "Communication Templates",  d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
  { label: "VA Registry",              d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { label: "Field Agents",             d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" },
  { label: "System Configuration",     d: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
  { label: "Reference Data",           d: "M4 6h16M4 10h16M4 14h10M4 18h6" },
  { label: "Integrations",             d: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" },
  { label: "Audit Logs",               d: "M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" },
  { label: "Clients",                  d: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" },
  { label: "System Settings",          d: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 8v4M12 16h.01" },
];

export const CE_NAV = [
  { label: "Dashboard",       d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Finalized",       d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { label: "Reports",         d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" },
  { label: "Settings",        d: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
  { label: "Help",            d: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 8v4M12 16h.01" },
];

