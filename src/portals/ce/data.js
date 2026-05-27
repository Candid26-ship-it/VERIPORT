import { BATCHES } from "../../data/index.js";

export const WORKBENCH_SERVICES = [
  { name:"Employment History Verification",  total:32, released:18, queried:3, pending:11 },
  { name:"Education Verification",           total:32, released:22, queried:1, pending:9  },
  { name:"Identity Verification",            total:32, released:30, queried:0, pending:2  },
  { name:"Criminal Record Check",            total:32, released:14, queried:4, pending:14 },
  { name:"Professional License Verification",total:32, released:20, queried:2, pending:10 },
  { name:"Reference Check",                  total:32, released:25, queried:1, pending:6  },
  { name:"Address Verification",             total:32, released:28, queried:2, pending:2  },
  { name:"Social Media Check",               total:32, released:32, queried:0, pending:0  },
];

export const WORKBENCH_CANDIDATES = [
  "Chinyere Okafor","Adebayo Adeleke","Emeka Nwosu","Amaka Okonkwo",
  "Tunde Fashola","Blessing Eze","Ngozi Okafor","Ibrahim Danladi",
  "Fatima Abdullahi","Kelechi Eze","Sade Williams","Kunle Adewale",
];

export const ALL_SERVICES = [
  { name:"NIN Verification",                    sla:"1 day"  },
  { name:"Employment Reference Verification",   sla:"10 days"},
  { name:"Address Verification",                sla:"7 days" },
  { name:"Guarantor Verification",              sla:"7 days" },
  { name:"Criminal Record Check",               sla:"15 days"},
  { name:"Educational Verification",            sla:"10 days"},
  { name:"Professional Certification Verification", sla:"12 days"},
  { name:"Credit Check",                        sla:"5 days" },
  { name:"NYSC Verification",                   sla:"3 days" },
  { name:"Academic (Local)",                    sla:"10 days"},
  { name:"Professional Membership",             sla:"8 days" },
];

export const SLA_DAYS = { "1 day":1,"3 days":3,"5 days":5,"7 days":7,"8 days":8,"10 days":10,"12 days":12,"15 days":15 };

export const SERVICE_SELECTION_OPTIONS = [
  { name:"NIN Verification", category:"Identity" },
  { name:"Employment Reference Verification", category:"Employment", nudgeEligible:true },
  { name:"Address Verification", category:"Field", nudgeEligible:true, fieldBased:true },
  { name:"Guarantor Verification", category:"Reference", nudgeEligible:true, mayRequireSignature:true },
  { name:"Criminal Record Check", category:"Risk", captureExecutionNotes:["Police Records Unit"] },
  { name:"Educational Verification", category:"Academic", mayUseBulkResponse:true, mayRequireSignature:true },
  { name:"Professional Certification Verification", category:"Professional" },
  { name:"Credit Check", category:"Risk", captureExecutionNotes:["Email / manual processing", "No API yet"] },
  { name:"NYSC Verification", category:"Registry" },
  { name:"Academic (Local)", category:"Academic", nudgeEligible:true, isScholar:true, mayUseBulkResponse:true, mayRequireSignature:true },
  { name:"Professional Membership", category:"Professional" },
];

export const CLONE_SOURCE_BATCHES = [
  ...BATCHES.drafts.map((b, i) => ({ id:`draft-${i+1}`, label:`${b.client} — ${b.batch}`, client:b.client, batch:b.batch })),
  ...BATCHES.collection.map((b, i) => ({ id:`collection-${i+1}`, label:`${b.client} — ${b.batch}`, client:b.client, batch:b.batch })),
  ...BATCHES.active.candidates.map((b, i) => ({ id:`active-${i+1}`, label:`${b.client} — ${b.batch}`, client:b.client, batch:b.batch })),
];

export const SCHOLAR_INTAKE_FIELDS = [
  "Institution name", "Faculty / School", "Department", "Programme / Course", "Level / Year", "Matric / Student Number",
  "Academic session", "Admission year", "Expected graduation year", "Scholar type", "Current student / Graduated",
  "Registrar email (if known)", "Exams & records email (if known)", "Portal name / clue (if foreign)"
];

export const CE_CLIENTS = [
  { name:"Acme Corporation Limited",  activeBatches:3 },
  { name:"Beta Industries PLC",       activeBatches:1 },
  { name:"Gamma Technologies Ltd",    activeBatches:2 },
  { name:"Delta Financial Services",  activeBatches:1 },
  { name:"Epsilon Real Estate",       activeBatches:0 },
];

export const REPORT_CANDIDATES = {
  "Acme September Batch": [
    { name:"Amaka Okonkwo",    role:"Senior Analyst",       status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"3 years confirmed at Zenith Bank"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Computer Science, UNILAG confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN and passport match"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Current address confirmed"},
    ]},
    { name:"Tunde Fashola",    role:"Operations Manager",   status:"Flagged", services:[
      {name:"Employment History Verification", outcome:"Discrepancy",   note:"Employment gap Jan–Aug 2022 unaccounted"},
      {name:"Education Verification",          outcome:"Verified",      note:"MBA Lagos Business School confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN confirmed"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Address confirmed"},
    ]},
    { name:"Blessing Eze",     role:"Finance Officer",      status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"5 years at GTBank confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Accounting, OAU confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN confirmed"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Lekki Phase 1 address confirmed"},
    ]},
    { name:"Ngozi Okafor",     role:"HR Business Partner",  status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"4 years at Dangote Group confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Sociology, UNIBEN confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN and driver's licence match"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Address confirmed"},
    ]},
    { name:"Ibrahim Danladi",  role:"IT Security Analyst",  status:"Flagged", services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"2 years at MTN confirmed"},
      {name:"Education Verification",          outcome:"Unverified",    note:"Institution unable to confirm degree"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN confirmed"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Discrepancy",   note:"Address differs from submitted details"},
    ]},
  ],
  "Delta Finance New Hires": [
    { name:"Chidinma Eze",     role:"Credit Analyst",       status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"3 years at Access Bank confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Economics, UNN confirmed"},
      {name:"Reference Check",                 outcome:"Verified",      note:"Two referees responded positively"},
    ]},
    { name:"Emeka Obi",        role:"Relationship Manager", status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"5 years at First Bank confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Banking & Finance, ABU confirmed"},
      {name:"Reference Check",                 outcome:"Verified",      note:"Both referees confirmed"},
    ]},
    { name:"Fatima Aliyu",     role:"Risk Officer",         status:"Flagged", services:[
      {name:"Employment History Verification", outcome:"Discrepancy",   note:"Title mismatch — listed as Manager, confirmed as Officer"},
      {name:"Education Verification",          outcome:"Verified",      note:"MSc Finance, UNILAG confirmed"},
      {name:"Reference Check",                 outcome:"Verified",      note:"Referees confirmed with minor note"},
    ]},
  ],
  "Gamma Previous Batch": [
    { name:"Seun Adeyemi",     role:"Software Engineer",    status:"Clean",   services:[
      {name:"Employment History Verification",   outcome:"Verified",    note:"4 years at Andela confirmed"},
      {name:"Education Verification",            outcome:"Verified",    note:"BSc Computer Science, UI confirmed"},
      {name:"Identity Verification",             outcome:"Verified",    note:"NIN confirmed"},
      {name:"Professional License Verification", outcome:"Verified",    note:"AWS certification confirmed"},
      {name:"Social Media Check",                outcome:"Verified",    note:"No adverse findings"},
    ]},
    { name:"Kemi Balogun",     role:"Product Manager",      status:"Clean",   services:[
      {name:"Employment History Verification",   outcome:"Verified",    note:"3 years at Interswitch confirmed"},
      {name:"Education Verification",            outcome:"Verified",    note:"BSc MIS, LASU confirmed"},
      {name:"Identity Verification",             outcome:"Verified",    note:"NIN and international passport match"},
      {name:"Professional License Verification", outcome:"Verified",    note:"PMP certification confirmed"},
      {name:"Social Media Check",                outcome:"Verified",    note:"No adverse findings"},
    ]},
    { name:"Chukwuma Nwosu",   role:"DevOps Engineer",      status:"Flagged", services:[
      {name:"Employment History Verification",   outcome:"Verified",    note:"2 years at SystemSpecs confirmed"},
      {name:"Education Verification",            outcome:"Verified",    note:"BSc Electrical Engineering, FUTA confirmed"},
      {name:"Identity Verification",             outcome:"Verified",    note:"NIN confirmed"},
      {name:"Professional License Verification", outcome:"Discrepancy", note:"Cisco cert listed as CCNP — only CCNA confirmed"},
      {name:"Social Media Check",                outcome:"Verified",    note:"No adverse findings"},
    ]},
  ],
};

export const FINALIZED_BATCHES = [
  {
    client:"Acme Corporation Limited", batch:"Acme September Batch",
    candidates:32, released:"Sep 26, 2024", duration:"8 days", deliveredTo:"Chike Eze",
    services:[
      {name:"Employment History Verification", total:32, completed:32, released:32, queried:0},
      {name:"Education Verification",          total:32, completed:32, released:32, queried:0},
      {name:"Identity Verification",           total:32, completed:32, released:32, queried:0},
      {name:"Criminal Record Check",           total:32, completed:32, released:32, queried:0},
      {name:"Address Verification",            total:32, completed:32, released:32, queried:0},
    ],
  },
  {
    client:"Delta Financial Services", batch:"Delta Finance New Hires",
    candidates:24, released:"Sep 30, 2024", duration:"14 days", deliveredTo:"Amara Obi",
    services:[
      {name:"Employment History Verification", total:24, completed:24, released:24, queried:0},
      {name:"Education Verification",          total:24, completed:24, released:24, queried:0},
      {name:"Reference Check",                 total:24, completed:24, released:24, queried:0},
    ],
  },
  {
    client:"Gamma Technologies Ltd", batch:"Gamma Previous Batch",
    candidates:48, released:"Oct 04, 2024", duration:"9 days", deliveredTo:"Funmi Adeyemi",
    services:[
      {name:"Employment History Verification",   total:48, completed:48, released:48, queried:0},
      {name:"Education Verification",            total:48, completed:48, released:48, queried:0},
      {name:"Identity Verification",             total:48, completed:48, released:48, queried:0},
      {name:"Professional License Verification", total:48, completed:48, released:48, queried:0},
      {name:"Social Media Check",                total:48, completed:48, released:48, queried:0},
    ],
  },
];
