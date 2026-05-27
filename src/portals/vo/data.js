export const VO_SERVMODES = [
  { id:"EMP-EMAIL",  service:"Employment Reference", mode:"Email",  tasks:18, active:10, awaiting:8,  atRisk:2, lanes:["Queued","Sent - Awaiting","Responses"], counts:[5,10,15],  postVOFlow:{reviewVE:true, reviewVM:true, reviewCE:true} },
  { id:"GUAR-EMAIL", service:"Guarantor",            mode:"Email",  tasks:12, active:5,  awaiting:7,  atRisk:1, lanes:["Queued","Sent - Awaiting","Responses"], counts:[3,7,11],  postVOFlow:{reviewVE:true, reviewVM:false, reviewCE:true} },
  { id:"REF-EMAIL",  service:"Reference Check",      mode:"Email",  tasks:6,  active:3,  awaiting:3,  atRisk:0, lanes:["Queued","Sent - Awaiting","Responses"], counts:[2,3,5],   postVOFlow:{reviewVE:true, reviewVM:false, reviewCE:false} },
  { id:"ADDR-FIELD", service:"Address Verification", mode:"Field",  tasks:10, active:4,  awaiting:6,  atRisk:1, lanes:["Ready","Dispatched","In Progress","QA","Done"], counts:[6,4,2,3,15], postVOFlow:{reviewVE:true, reviewVM:true, reviewCE:true} },
  { id:"WAEC-PORTAL",service:"WAEC",                 mode:"Portal", tasks:8,  active:3,  awaiting:5,  atRisk:0, lanes:["Ready","In Run","Evidence Review","Done"], counts:[8,0,2,35], postVOFlow:{reviewVE:false, reviewVM:false, reviewCE:false} },
  { id:"CRIM-LETTER",service:"Criminal Record",      mode:"Letter", tasks:8,  active:4,  awaiting:4,  atRisk:1, lanes:["Generated","Sent","Acknowledged","Reply Received","Done"], counts:[4,6,3,5,42], postVOFlow:{reviewVE:true, reviewVM:false, reviewCE:true} },
  { id:"STUDENTSHIP-SCHOLAR", service:"Ongoing Studentship", mode:"Scholar", tasks:43, active:8, awaiting:35, atRisk:1, lanes:["Revalidation","Confirmed","Sent","QA"], counts:[3,5,8,27], skipVARevalidation:false, postVOFlow:{reviewVE:false, reviewVM:false, reviewCE:true} },
];

export const EMAIL_QUEUED = [
  { candidate:"Yusuf Ibrahim",   employer:"Shell Nigeria",  contact:"hr@shell.com.ng",       sla:5, slaOk:true },
  { candidate:"Aisha Mohammed",  employer:"First Bank",     contact:"hr@firstbank.ng",        sla:5, slaOk:true },
  { candidate:"Tunde Bakare",    employer:"Nestle Nigeria",  contact:"hr@nestle.com.ng",      sla:4, slaOk:true },
  { candidate:"Kemi Johnson",    employer:"Dangote Group",  contact:"verify@dangote.com",     sla:5, slaOk:true },
  { candidate:"Emeka Okafor",    employer:"MTN Nigeria",    contact:"verification@mtn.ng",    sla:3, slaRisk:true },
];
export const EMAIL_AWAITING = [
  { candidate:"Yusuf Ibrahim",   ext:"Shell HR",       days:6, remind:1, nudge:1, status:"Opened",    slaRisk:true },
  { candidate:"Aisha Mohammed",  ext:"First Bank HR",  days:5, remind:1, nudge:0, status:"Opened",    slaRisk:true },
  { candidate:"Tunde Bakare",    ext:"Nestle HR",      days:4, remind:1, nudge:0, status:"Delivered", slaOk:true },
  { candidate:"Kemi Johnson",    ext:"Dangote HR",     days:3, remind:0, nudge:0, status:"Delivered", slaOk:true },
  { candidate:"Emeka Okafor",    ext:"MTN HR",         days:7, remind:2, nudge:1, status:"Opened",    slaBreach:true },
  { candidate:"Ibrahim Musa",    ext:"GTBank HR",      days:2, remind:0, nudge:0, status:"Sent",      slaOk:true },
  { candidate:"Linda Nwachukwu", ext:"Chevron HR",     days:5, remind:1, nudge:0, status:"Opened",    slaRisk:true },
  { candidate:"Bola Akinwale",   ext:"FCMB HR",        days:3, remind:0, nudge:0, status:"Delivered", slaOk:true },
  { candidate:"Kunle Adeyemo",   ext:"Flour Mills HR", days:8, remind:2, nudge:2, status:"Opened",    slaBreach:true },
  { candidate:"Mary Udoh",       ext:"PwC HR",         days:1, remind:0, nudge:0, status:"Sent",      slaOk:true },
];
export const EMAIL_REPLIED = [
  { candidate:"Janet Okonkwo", ext:"Dangote HR",  replied:"Feb 3", via:"Secure Link" },
  { candidate:"Chidi Nwosu",   ext:"GTBank HR",   replied:"Feb 3", via:"Email Reply" },
  { candidate:"Helen Obi",     ext:"PwC HR",      replied:"Feb 4", via:"Secure Link" },
];
export const EMAIL_DONE = [
  { candidate:"Ada Eze",         ext:"Unilever HR",   outcome:"Verified",     completed:"Jan 28", exec:"Approved" },
  { candidate:"Peter Eze",       ext:"Chevron HR",    outcome:"Verified",     completed:"Jan 29", exec:"Pending" },
  { candidate:"Bola Akinwale",   ext:"FCMB HR",       outcome:"Discrepancy",  completed:"Jan 30", exec:"Pending" },
  { candidate:"Fatima Suleiman", ext:"Total E&P HR",  outcome:"Verified",     completed:"Jan 31", exec:"Approved" },
];

export const FIELD_READY = [
  { candidate:"Yusuf Ibrahim",   address:"15 Maple St, Ikeja",           state:"Lagos",   sla:7 },
  { candidate:"Aisha Mohammed",  address:"8 Aminu Kano Cr, Wuse",        state:"FCT",     sla:7 },
  { candidate:"Tunde Bakare",    address:"22 Aba Rd, Rumuola",           state:"Rivers",  sla:6 },
  { candidate:"Kemi Johnson",    address:"3 Abiola Way, Abeokuta",       state:"Ogun",    sla:7 },
  { candidate:"Emeka Okafor",    address:"14 New Market Rd, Onitsha",    state:"Anambra", sla:5 },
  { candidate:"Ibrahim Musa",    address:"7 Ahmadu Bello Way, Kaduna",   state:"Kaduna",  sla:7 },
];
export const FIELD_DISPATCHED = [
  { candidate:"Yusuf Ibrahim",  agent:"AGT-001 Chuka",  accepted:"Feb 3", state:"Lagos",  status:"Planning" },
  { candidate:"Aisha Mohammed", agent:"AGT-005 Amina",  accepted:"Feb 3", state:"FCT",    status:"En route" },
  { candidate:"Tunde Bakare",   agent:"AGT-008 David",  accepted:"Feb 4", state:"Rivers", status:"Planning" },
  { candidate:"Kemi Johnson",   agent:"AGT-003 Ngozi",  accepted:"Feb 4", state:"Ogun",   status:"Planning" },
];
export const FIELD_INPROG = [
  { candidate:"Aisha Mohammed", agent:"AGT-005 Amina",  location:"Wuse, FCT",         status:"On-site" },
  { candidate:"Emeka Okafor",   agent:"AGT-012 Chidi",  location:"Onitsha, Anambra",  status:"Submitting" },
];
export const FIELD_QA = [
  { candidate:"Fatima Suleiman", agent:"AGT-001 Chuka", submitted:"Feb 4", photos:"4/4", gps:"ok" },
  { candidate:"Ada Eze",         agent:"AGT-005 Amina", submitted:"Feb 4", photos:"3/4", gps:"ok" },
  { candidate:"Peter Eze",       agent:"AGT-008 David", submitted:"Feb 5", photos:"4/4", gps:"warn" },
];
export const FIELD_DONE = [
  { candidate:"Fatima Suleiman", agent:"AGT-001 Chuka", outcome:"Verified",     completed:"Jan 28", exec:"Approved" },
  { candidate:"Ada Eze",         agent:"AGT-005 Amina", outcome:"Verified",     completed:"Jan 29", exec:"Pending" },
  { candidate:"Peter Eze",       agent:"AGT-008 David", outcome:"Not Verified",  completed:"Jan 30", exec:"Pending" },
];

export const PORTAL_READY = [
  { candidate:"Yusuf Ibrahim",  year:2018, examNo:"4251234567", subjects:9, sla:3 },
  { candidate:"Aisha Mohammed", year:2017, examNo:"4251234568", subjects:9, sla:3 },
  { candidate:"Tunde Bakare",   year:2019, examNo:"4251234569", subjects:9, sla:2 },
  { candidate:"Kemi Johnson",   year:2018, examNo:"4251234570", subjects:8, sla:4 },
  { candidate:"Emeka Okafor",   year:2020, examNo:"4251234571", subjects:9, sla:5 },
];
export const PORTAL_EVIDENCE = [
  { candidate:"Tunde Bakare",  exam:"WAEC 2019", result:"Match",    screenshot:"ok" },
  { candidate:"Kemi Johnson",  exam:"WAEC 2018", result:"No Match", screenshot:"blurry" },
];
export const PORTAL_DONE = [
  { candidate:"Ada Eze",      exam:"WAEC 2017", result:"Match",    completed:"Jan 28", exec:"Approved" },
  { candidate:"Yusuf Ibrahim",exam:"WAEC 2018", result:"Match",    completed:"Jan 29", exec:"Approved" },
  { candidate:"Emeka Okafor", exam:"WAEC 2019", result:"No Match", completed:"Jan 30", exec:"Pending" },
];

export const LETTER_GENERATED = [
  { candidate:"Yusuf Ibrahim",  institution:"NPF Lagos Command",  ref:"LTR-2026-001", sla:14 },
  { candidate:"Aisha Mohammed", institution:"NPF FCT Command",    ref:"LTR-2026-002", sla:14 },
  { candidate:"Tunde Bakare",   institution:"NPF Rivers Command", ref:"LTR-2026-003", sla:12 },
  { candidate:"Kemi Johnson",   institution:"NPF Ogun Command",   ref:"LTR-2026-004", sla:14 },
];
export const LETTER_SENT = [
  { candidate:"Bola Akinwale",  institution:"NPF Lagos Command",  via:"Email", days:8, chases:1 },
  { candidate:"Emeka Okafor",   institution:"NPF FCT Command",    via:"FE",    days:6, chases:0 },
  { candidate:"Ibrahim Musa",   institution:"NPF Kaduna Command", via:"Email", days:4, chases:0 },
];
export const LETTER_ACKED = [
  { candidate:"Fatima Suleiman", institution:"NPF Rivers Command", ackDate:"Jan 29", daysSince:6 },
  { candidate:"Ada Eze",         institution:"NPF Ogun Command",   ackDate:"Feb 1",  daysSince:3 },
  { candidate:"Peter Eze",       institution:"NPF Enugu Command",  ackDate:"Feb 2",  daysSince:2 },
];
export const LETTER_REPLIED = [
  { candidate:"Linda Nwachukwu", institution:"NPF Lagos Command",  replied:"Feb 3", via:"Physical doc" },
  { candidate:"Kunle Adeyemo",   institution:"NPF FCT Command",    replied:"Feb 3", via:"Email" },
  { candidate:"Mary Udoh",       institution:"NPF Rivers Command", replied:"Feb 4", via:"Physical doc" },
  { candidate:"Bola Akinwale",   institution:"NPF Ogun Command",   replied:"Feb 4", via:"FE collected" },
  { candidate:"Fatima Suleiman", institution:"NPF Enugu Command",  replied:"Feb 5", via:"Email" },
];
export const LETTER_DONE = [
  { candidate:"Ada Eze",         institution:"NPF Ogun Command",    outcome:"Verified",     completed:"Jan 28", exec:"Approved" },
  { candidate:"Peter Eze",       institution:"NPF Lagos Command",   outcome:"Verified",     completed:"Jan 29", exec:"Pending" },
  { candidate:"Fatima Suleiman", institution:"NPF Rivers Command",  outcome:"Not Verified", completed:"Jan 30", exec:"Pending" },
  { candidate:"Ibrahim Musa",    institution:"NPF FCT Command",     outcome:"Verified",     completed:"Jan 31", exec:"Approved" },
];

export const VA_INFO_MAP = {
  "Dr. Emeka Nwosu":    { role:"HOD",             email:"akpan@unilag.edu.ng",            status:"Validated", lastConfirmed:"Feb 22, 2026", source:"Direct",    inst:"UNILAG", dept:"Computer Science"   },
  "Prof. Ade Williams": { role:"HOD",             email:"ade.williams@oau.edu.ng",         status:"Stale",     lastConfirmed:"Nov 10, 2025", source:"Direct",    inst:"OAU",    dept:"Anatomy"            },
  "Dr. Chukwuma Eze":   { role:"HOD",             email:"chukwuma.eze@ui.edu.ng",          status:"Validated", lastConfirmed:"Jan 30, 2026", source:"FE-sourced",inst:"UI",     dept:"International Law"  },
  "Prof. Ada Okonkwo":  { role:"HOD",             email:"ada.okonkwo@unilag.edu.ng",       status:"Validated", lastConfirmed:"Feb 18, 2026", source:"Direct",    inst:"UNILAG", dept:"Physics"            },
  "Dr. Halima Suleiman":{ role:"HOD",             email:"halima.suleiman@abu.edu.ng",      status:"Stale",     lastConfirmed:"Dec 02, 2025", source:"Direct",    inst:"ABU",    dept:"Mathematics"        },
  "Prof. Emeka Okafor": { role:"Registrar",       email:"registrar@uniben.edu.ng",         status:"Validated", lastConfirmed:"Feb 05, 2026", source:"Direct",    inst:"UNIBEN", dept:"—"                  },
};

export const SCHOLAR_REVAL = [
  { inst:"UNILAG", faculty:"Science",   dept:"Comp Sci",  va:"Dr. Emeka Nwosu",    students:15, sla:9 },
  { inst:"OAU",    faculty:"Medicine",  dept:"Anatomy",   va:"Prof. Ade Williams",  students:12, sla:8 },
  { inst:"UI",     faculty:"Law",       dept:"Intl Law",  va:"Dr. Chukwuma Eze",    students:8,  sla:7, atRisk:true },
];
export const SCHOLAR_CONFIRMED = [
  { inst:"UNILAG", faculty:"Science",   dept:"Physics",      va:"Prof. Ada Okonkwo",  students:12, sla:10 },
  { inst:"ABU",    faculty:"Science",   dept:"Mathematics",  va:"Dr. Halima Suleiman",students:9,  sla:11 },
  { inst:"UNIBEN", faculty:"Pharmacy",  dept:"Pharmacology", va:"Prof. Emeka Okafor", students:7,  sla:9 },
];
export const SCHOLAR_SENT = [
  { inst:"UNILAG", dept:"Medicine",   va:"Dr. Ade Bello",    students:10, sent:"Jan 28", days:8, reminds:1, nudges:0, slaBreach:true },
  { inst:"UNILAG", dept:"Engineering",va:"Prof. Chidi Eze",  students:18, sent:"Jan 30", days:6, reminds:1, nudges:1, slaRisk:true },
  { inst:"ABU",    dept:"Economics",  va:"Dr. Musa Ibrahim", students:14, sent:"Feb 1",  days:4, reminds:0, nudges:0, slaOk:true },
];
export const SCHOLAR_QA = [
  { student:"Blessing Okoro",  dept:"Comp Sci / UNILAG", matric:"180305123", status:"Confirmed",    result:"Enrolled" },
  { student:"Chidi Nnamdi",    dept:"Comp Sci / UNILAG", matric:"190207456", status:"Confirmed",    result:"Enrolled" },
  { student:"Grace Adebayo",   dept:"Comp Sci / UNILAG", matric:"170108789", status:"Not Found",    result:"Not Found" },
  { student:"Ibrahim Musa",    dept:"Medicine / OAU",    matric:"180109012", status:"Confirmed",    result:"Enrolled" },
  { student:"Kemi Johnson",    dept:"Medicine / OAU",    matric:"190210345", status:"Discrepancy",  result:"Graduated" },
];
export const SCHOLAR_DONE = [
  { student:"Ada Eze",         dept:"Physics / UNILAG",    outcome:"Enrolled",   completed:"Jan 28", exec:"Approved" },
  { student:"Peter Eze",       dept:"Mathematics / ABU",   outcome:"Enrolled",   completed:"Jan 29", exec:"Pending" },
  { student:"Fatima Suleiman", dept:"Law / UI",            outcome:"Graduated",  completed:"Jan 30", exec:"Pending" },
];

export const FIELD_AGENTS = [
  { id:"AGT-001", name:"Chuka Obi",     area:"Lagos Island / Mainland", rate:"₦8,500", workload:3, acceptance:94 },
  { id:"AGT-003", name:"Ngozi Eze",     area:"Ogun / Abeokuta",         rate:"₦7,200", workload:1, acceptance:98 },
  { id:"AGT-005", name:"Amina Yusuf",   area:"FCT / Abuja",             rate:"₦9,000", workload:2, acceptance:91 },
  { id:"AGT-008", name:"David Okafor",  area:"Rivers / Port Harcourt",  rate:"₦8,000", workload:4, acceptance:87 },
  { id:"AGT-012", name:"Chidi Nwosu",   area:"Anambra / Onitsha",       rate:"₦7,500", workload:0, acceptance:100},
];

export const VA_STUDENTS = [
  { id:1, name:"Blessing Okoro",  matric:"180305123", level:300, session:"2025/2026", status:"Pending" },
  { id:2, name:"Chidi Nnamdi",    matric:"190207456", level:200, session:"2025/2026", status:"Pending" },
  { id:3, name:"Grace Adebayo",   matric:"170108789", level:400, session:"2025/2026", status:"Pending" },
  { id:4, name:"Emeka Okonkwo",   matric:"200401234", level:100, session:"2025/2026", status:"Done"    },
  { id:5, name:"Fatima Ibrahim",  matric:"210502345", level:100, session:"2025/2026", status:"Pending" },
  { id:6, name:"Adaeze Eze",      matric:"200301122", level:300, session:"2025/2026", status:"Pending" },
  { id:7, name:"Tunde Afolabi",   matric:"190405678", level:200, session:"2025/2026", status:"Pending" },
  { id:8, name:"Ngozi Obi",       matric:"180607890", level:400, session:"2025/2026", status:"Pending" },
  { id:9, name:"Usman Bello",     matric:"210102233", level:100, session:"2025/2026", status:"Pending" },
  { id:10,name:"Chisom Ike",      matric:"170809456", level:500, session:"2025/2026", status:"Pending" },
  { id:11,name:"Oluwaseun Adeyemi",matric:"180102567",level:300, session:"2025/2026", status:"Pending" },
  { id:12,name:"Kelechi Okafor",  matric:"190204678", level:200, session:"2025/2026", status:"Pending" },
  { id:13,name:"Hauwa Musa",      matric:"200305789", level:100, session:"2025/2026", status:"Pending" },
  { id:14,name:"Ifeanyi Nwosu",   matric:"170406890", level:400, session:"2025/2026", status:"Pending" },
  { id:15,name:"Sola Taiwo",      matric:"210507901", level:200, session:"2025/2026", status:"Pending" },
];
