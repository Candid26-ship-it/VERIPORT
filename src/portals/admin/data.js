export const ADMIN_CLIENTS = [
  { name:"Shell Nigeria Ltd",   industry:"Oil & Gas",         contact:"Emeka Obi",     email:"emeka.obi@shell.ng",        phone:"+234-801-234-5678", address:"1 Shell Close, Victoria Island, Lagos",         active:12, completed:45, lastActivity:"Feb 18, 2026", status:"Active"   },
  { name:"Zenith Bank",         industry:"Banking & Finance",  contact:"Amaka Nwosu",   email:"amaka.nwosu@zenithbank.ng", phone:"+234-802-345-6789", address:"84 Ajose Adeogun St, Victoria Island, Lagos",   active:8,  completed:30, lastActivity:"Feb 20, 2026", status:"Active"   },
  { name:"MTN Nigeria",         industry:"Telecommunications", contact:"Chidi Adeleke", email:"chidi.adeleke@mtn.ng",      phone:"+234-803-456-7890", address:"30 Afribank St, Victoria Island, Lagos",         active:5,  completed:20, lastActivity:"Jan 15, 2026", status:"Inactive" },
  { name:"Dangote Group",       industry:"Manufacturing",      contact:"Fatima Dangote",email:"fatima@dangote.ng",         phone:"+234-804-567-8901", address:"Union Marble House, 1 Alfred Rewane Rd, Lagos",  active:3,  completed:14, lastActivity:"Feb 22, 2026", status:"Active"   },
  { name:"First Bank Nigeria",  industry:"Banking & Finance",  contact:"Olu Adesanya",  email:"olu.adesanya@firstbank.ng", phone:"+234-805-678-9012", address:"Samuel Asabia House, 35 Marina, Lagos",          active:6,  completed:22, lastActivity:"Feb 19, 2026", status:"Active"   },
];

export const CLIENT_PORTAL_USERS = {
  "Shell Nigeria Ltd": [
    { name:"Emeka Obi",      email:"emeka.obi@shell.ng",        role:"HR Manager",        lastLogin:"May 12, 2026", status:"Active" },
    { name:"Ngozi Eze",      email:"ngozi.eze@shell.ng",         role:"Talent Acquisition",lastLogin:"May 10, 2026", status:"Active" },
    { name:"Tunde Bakare",   email:"tunde.bakare@shell.ng",      role:"HR Officer",        lastLogin:"Mar 28, 2026", status:"Dormant" },
  ],
  "Zenith Bank": [
    { name:"Amaka Nwosu",    email:"amaka.nwosu@zenithbank.ng",  role:"HR Director",       lastLogin:"May 11, 2026", status:"Active" },
    { name:"Chukwuma Eze",   email:"chukwuma.eze@zenithbank.ng", role:"HR Analyst",        lastLogin:"Apr 02, 2026", status:"Dormant" },
  ],
  "MTN Nigeria": [
    { name:"Chidi Adeleke",  email:"chidi.adeleke@mtn.ng",       role:"HR Manager",        lastLogin:"Jan 15, 2026", status:"Dormant" },
    { name:"Fatima Ali",     email:"fatima.ali@mtn.ng",           role:"HR Officer",        lastLogin:"—",            status:"Suspended" },
  ],
  "Dangote Group": [
    { name:"Fatima Dangote", email:"fatima@dangote.ng",           role:"Group HR Lead",     lastLogin:"May 13, 2026", status:"Active" },
  ],
  "First Bank Nigeria": [
    { name:"Olu Adesanya",   email:"olu.adesanya@firstbank.ng",  role:"HR Manager",        lastLogin:"May 09, 2026", status:"Active" },
    { name:"Bisi Adeyemi",   email:"bisi.adeyemi@firstbank.ng",  role:"Talent Officer",    lastLogin:"May 01, 2026", status:"Active" },
    { name:"Kemi Okafor",    email:"kemi.okafor@firstbank.ng",   role:"HR Coordinator",    lastLogin:"Feb 14, 2026", status:"Suspended" },
  ],
};

export const SERVICES = [
  { name: "Employment Verification",   category: "Employment",  method: "Digital",    servforms: 4, status: "Active" },
  { name: "Educational Verification",  category: "Education",   method: "Digital",    servforms: 3, status: "Active" },
  { name: "Address Verification",      category: "Address",     method: "Field",      servforms: 2, status: "Active" },
  { name: "Criminal Records Check",    category: "Criminal",    method: "Government", servforms: 2, status: "Active" },
  { name: "Credit Check",              category: "Financial",   method: "Digital",    servforms: 1, status: "Active" },
  { name: "Professional License",      category: "Professional",method: "Digital",    servforms: 2, status: "Active" },
  { name: "Reference Check",           category: "Employment",  method: "Phone",      servforms: 1, status: "Active" },
  { name: "NIN Verification",          category: "Identity",    method: "Government", servforms: 1, status: "Active" },
  { name: "Bank Statement Analysis",   category: "Financial",   method: "Digital",    servforms: 1, status: "Active" },
  { name: "Social Media Screening",    category: "Background",  method: "Digital",    servforms: 1, status: "Draft"  },
  { name: "Driving License Check",     category: "Identity",    method: "Government", servforms: 1, status: "Active" },
  { name: "International Verification",category: "Background",  method: "Manual",     servforms: 1, status: "Active" },
];

export const SERVMODE_DATA = {
  "Employment Verification": [
    { code:"EMP-REF-EMAIL", mode:"Email",  sla:"10 days", primary:true,  vosAssigned:3, activeTasks:12, status:"Active",
      voAssignments:[{name:"Mike Obi",assigned:true},{name:"Ada Nwosu",assigned:true},{name:"Emeka Udo",assigned:true},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
      assignMethod:"auto", slaDays:"10", warnThreshold:"70", escalThreshold:"90", escalRecipient:"Manager",
      autoReminders:true, reminders:[{day:"Day 3",template:"Reminder - Day 3"},{day:"Day 7",template:"Reminder - Day 7"}],
      reqTemplate:"Employment Reference - Email Request", nudgeTemplate:"Employment Reference - Nudge" },
    { code:"EMP-REF-PHONE", mode:"Phone",  sla:"7 days",  primary:false, vosAssigned:2, activeTasks:5,  status:"Active",
      voAssignments:[{name:"Mike Obi",assigned:true},{name:"Ada Nwosu",assigned:true},{name:"Emeka Udo",assigned:false},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
      assignMethod:"manual", slaDays:"7",  warnThreshold:"70", escalThreshold:"90", escalRecipient:"Manager",
      autoReminders:false, reminders:[], reqTemplate:"Employment Reference - Phone Request", nudgeTemplate:"Employment Reference - Nudge" },
    { code:"EMP-REF-FIELD", mode:"Field",  sla:"14 days", primary:false, vosAssigned:1, activeTasks:0,  status:"Active",
      voAssignments:[{name:"Mike Obi",assigned:false},{name:"Ada Nwosu",assigned:false},{name:"Emeka Udo",assigned:true},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
      assignMethod:"manual", slaDays:"14", warnThreshold:"80", escalThreshold:"95", escalRecipient:"Executive",
      autoReminders:false, reminders:[], reqTemplate:"Employment Reference - Field Request", nudgeTemplate:"Employment Reference - Nudge" },
  ],
};
export const getServModes = (svcName) => SERVMODE_DATA[svcName] || [
  { code: svcName.replace(/\s+/g,"-").toUpperCase().slice(0,8)+"-EMAIL", mode:"Email", sla:"10 days", primary:true, vosAssigned:1, activeTasks:3, status:"Active",
    voAssignments:[{name:"Mike Obi",assigned:true},{name:"Ada Nwosu",assigned:false},{name:"Emeka Udo",assigned:false},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
    assignMethod:"auto", slaDays:"10", warnThreshold:"70", escalThreshold:"90", escalRecipient:"Manager",
    autoReminders:true, reminders:[{day:"Day 3",template:"Reminder - Day 3"}],
    reqTemplate:"Standard - Email Request", nudgeTemplate:"Standard - Nudge" },
];

export const TEMPLATES = [
  { ref:"C-01", name:"Candidate Invitation",       cat:"Candidate",      channel:"Email",     pri:"High",     status:"Required", owner:"CE",     retry:"Resend after 48 hrs inactivity. Max 3 reminders.",              vars:["{{CandidateName}}","{{CollectionLink}}","{{ExpiryDate}}","{{BatchName}}","{{ClientName}}"],                                        modified:"Jan 12, 2026", subject:"Your Verification Has Been Initiated — Action Required" },
  { ref:"C-02", name:"Collection Reminder",        cat:"Candidate",      channel:"Email/SMS", pri:"High",     status:"Existing", owner:"CE",     retry:"Day 3, Day 7 after invitation. Stop after 3 sends.",            vars:["{{CandidateName}}","{{CollectionLink}}","{{ExpiryDate}}","{{DaysRemaining}}"],                                                      modified:"Jan 10, 2026", subject:"Reminder: Please Complete Your Verification Submission" },
  { ref:"C-03", name:"Link Expiry Warning",         cat:"Candidate",      channel:"Email/SMS", pri:"Medium",   status:"Existing", owner:"System", retry:"Single send 24 hrs before expiry.",                             vars:["{{CandidateName}}","{{CollectionLink}}","{{ExpiryDate}}","{{HoursRemaining}}"],                                                      modified:"Jan 11, 2026", subject:"Your Verification Link Expires Soon" },
  { ref:"C-04", name:"Consent Confirmation",       cat:"Candidate",      channel:"Email",     pri:"Medium",   status:"Required", owner:"System", retry:"Single send on consent capture. No retry.",                    vars:["{{CandidateName}}","{{ConsentDate}}","{{PlatformName}}","{{DataUsageSummary}}"],                                                      modified:"—",            subject:"Your Consent Has Been Recorded" },
  { ref:"C-05", name:"NIN Verification Failure",   cat:"Candidate",      channel:"In-App",    pri:"High",     status:"Required", owner:"System", retry:"Triggered on each failed attempt. Max 3.",                     vars:["{{CandidateName}}","{{FailureReason}}","{{RetryLink}}","{{SupportEmail}}"],                                                           modified:"Dec 28, 2025", subject:"NIN Verification Unsuccessful — Please Retry" },
  { ref:"C-06", name:"Face Capture Retry",         cat:"Candidate",      channel:"In-App",    pri:"Medium",   status:"Required", owner:"System", retry:"Immediate on failure. Max 3 attempts before escalation.",       vars:["{{CandidateName}}","{{AttemptNumber}}","{{RetryLink}}","{{SupportContact}}"],                                                      modified:"—",            subject:"Face Capture Unsuccessful — Please Try Again" },
  { ref:"C-07", name:"Document Upload Reminder",   cat:"Candidate",      channel:"Email/SMS", pri:"Medium",   status:"Required", owner:"System", retry:"After 24 hrs if docs still missing. Max 2 reminders.",          vars:["{{CandidateName}}","{{MissingDocuments}}","{{UploadLink}}","{{Deadline}}"],                                                        modified:"—",            subject:"Action Required: Missing Documents for Your Verification" },
  { ref:"C-08", name:"Candidate Nudge",            cat:"Candidate",      channel:"Email/SMS", pri:"Medium",   status:"Required", owner:"VO",     retry:"Manual trigger by VO. No auto-retry.",                          vars:["{{CandidateName}}","{{InstitutionName}}","{{NudgeReason}}","{{ContactDetails}}"],                                                     modified:"—",            subject:"Follow-Up Required: Your Verification Is Pending" },
  { ref:"I-01", name:"VA Validation Request",      cat:"VA/Institutional",channel:"Email",    pri:"Critical", status:"Required", owner:"VO",     retry:"Reminder after SLA warning threshold. Escalate after 2 failed.", vars:["{{CandidateName}}","{{Institution}}","{{Department}}","{{VerificationLink}}","{{DueDate}}","{{VOName}}"],                         modified:"Jan 05, 2026", subject:"Verification Request — {{CandidateName}} / {{Department}}" },
  { ref:"I-02", name:"VA Reminder",                cat:"VA/Institutional",channel:"Email",    pri:"High",     status:"Required", owner:"System", retry:"Day 3, Day 7, Day 14. Escalate to VM after Day 14.",            vars:["{{CandidateName}}","{{Institution}}","{{Department}}","{{OriginalRequestDate}}","{{DueDate}}"],                                      modified:"—",            subject:"Reminder: Verification Response Required" },
  { ref:"I-03", name:"Verification Acknowledgment",cat:"VA/Institutional",channel:"Email",   pri:"Low",      status:"Required", owner:"System", retry:"Single send on response receipt. No retry.",                    vars:["{{InstitutionName}}","{{CandidateName}}","{{ResponseDate}}","{{VOName}}"],                                                           modified:"—",            subject:"Thank You — Verification Response Received" },
  { ref:"I-04", name:"Request More Information",   cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"VO",     retry:"Manual trigger by VO. No auto-retry.",                          vars:["{{RecipientName}}","{{CandidateName}}","{{InformationRequired}}","{{Deadline}}","{{VOName}}"],                                       modified:"—",            subject:"Additional Information Required — {{CandidateName}}" },
  { ref:"I-05", name:"Portal Verification Request",cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"VO",     retry:"Manual trigger. Reminder after 5 days if no response.",         vars:["{{InstitutionName}}","{{PortalURL}}","{{CandidateName}}","{{ReferenceNumber}}","{{VOName}}"],                                      modified:"—",            subject:"Verification Request via Portal — {{CandidateName}}" },
  { ref:"I-06", name:"Letter Generated",           cat:"VA/Institutional",channel:"In-App",  pri:"Low",      status:"Required", owner:"System", retry:"Single in-app. No retry.",                                      vars:["{{VOName}}","{{LetterReference}}","{{CandidateName}}","{{Institution}}","{{GeneratedDate}}"],                                       modified:"—",            subject:"Letter Ready for Dispatch" },
  { ref:"I-07", name:"Letter Dispatch Notice",     cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"System", retry:"Single email on dispatch. Reminder if no reply after 7 days.",  vars:["{{InstitutionName}}","{{LetterReference}}","{{CandidateName}}","{{DispatchDate}}","{{ExpectedReply}}"],                           modified:"—",            subject:"Official Verification Letter Sent — {{CandidateName}}" },
  { ref:"I-08", name:"Acknowledgement Reminder",   cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"System", retry:"Day 7 after dispatch. Day 14 if still no reply.",               vars:["{{InstitutionName}}","{{LetterReference}}","{{OriginalDispatchDate}}","{{DueDate}}"],                                             modified:"—",            subject:"Reminder: Acknowledgement Required for Verification Letter" },
  { ref:"OP-01",name:"Task Assigned (VO)",         cat:"Internal Ops",   channel:"In-App",   pri:"High",     status:"Required", owner:"System", retry:"Email if unacknowledged after 2 hrs.",                          vars:["{{VOName}}","{{TaskID}}","{{CandidateName}}","{{ServiceName}}","{{SLADueDate}}","{{BatchName}}"],                                    modified:"—",            subject:"New Task Assigned — {{ServiceName}} / {{CandidateName}}" },
  { ref:"OP-02",name:"Field Task Assigned",        cat:"Field Ops",      channel:"SMS",      pri:"High",     status:"Required", owner:"System", retry:"Resend SMS if unacknowledged after 1 hr.",                      vars:["{{AgentName}}","{{TaskID}}","{{CandidateName}}","{{Location}}","{{AppointmentDate}}","{{Instructions}}"],                         modified:"—",            subject:"Field Assignment: {{CandidateName}} — {{Location}}" },
  { ref:"OP-03",name:"Task Return to CE",          cat:"Internal Ops",   channel:"In-App",   pri:"High",     status:"Existing", owner:"System", retry:"Single in-app on return. No retry.",                            vars:["{{CEName}}","{{TaskID}}","{{CandidateName}}","{{ReturnReason}}","{{VOName}}","{{SLARemaining}}"],                                    modified:"Jan 08, 2026", subject:"Task Returned: {{CandidateName}} — Action Required" },
  { ref:"OP-04",name:"Escalation Alert",           cat:"Internal Ops",   channel:"In-App",   pri:"Critical", status:"Required", owner:"VM",     retry:"Immediate on SLA breach. Resend every 4 hrs until resolved.",   vars:["{{TaskID}}","{{SLAHours}}","{{AssignedOfficer}}","{{EscalationLevel}}","{{BatchName}}"],                                          modified:"—",            subject:"ESCALATION: SLA Breached — {{BatchName}}" },
  { ref:"OP-05",name:"Evidence Approved",          cat:"Internal Ops",   channel:"In-App",   pri:"Low",      status:"Required", owner:"System", retry:"Single in-app. No retry.",                                      vars:["{{VOName}}","{{CandidateName}}","{{EvidenceType}}","{{ApprovedBy}}","{{TaskID}}"],                                                  modified:"—",            subject:"Evidence Approved — {{CandidateName}}" },
  { ref:"OP-06",name:"Evidence Rejected",          cat:"Internal Ops",   channel:"In-App",   pri:"Medium",   status:"Required", owner:"System", retry:"Follow-up after 24 hrs if not resubmitted.",                    vars:["{{RecipientName}}","{{CandidateName}}","{{RejectionReason}}","{{RedoDeadline}}","{{TaskID}}"],                                     modified:"—",            subject:"Evidence Rejected — Redo Required" },
  { ref:"OP-07",name:"Reply Received Notice",      cat:"Internal Ops",   channel:"In-App",   pri:"Medium",   status:"Required", owner:"System", retry:"Single in-app on receipt. No retry.",                           vars:["{{VOName}}","{{InstitutionName}}","{{CandidateName}}","{{ReplyDate}}","{{TaskID}}"],                                               modified:"—",            subject:"Reply Received from {{InstitutionName}}" },
  { ref:"OP-08",name:"Batch Returned",             cat:"Internal Ops",   channel:"In-App",   pri:"High",     status:"Existing", owner:"System", retry:"Email if unacknowledged after 2 hrs.",                          vars:["{{CEName}}","{{BatchName}}","{{ReturnReason}}","{{ReturnedBy}}","{{SLAImpact}}"],                                                  modified:"—",            subject:"Batch Returned — {{BatchName}}" },
  { ref:"CL-01",name:"Batch Created",             cat:"Client",         channel:"Email",     pri:"Low",      status:"Required", owner:"CE",     retry:"Single email. No retry.",                                       vars:["{{ClientName}}","{{BatchName}}","{{CandidateCount}}","{{Services}}","{{ExpectedTAT}}"],                                          modified:"—",            subject:"Batch Created: {{BatchName}} — Verification Underway" },
  { ref:"CL-02",name:"Report Ready",              cat:"Client",         channel:"Email",     pri:"Medium",   status:"Existing", owner:"CE",     retry:"Single notification. No retry.",                                vars:["{{ClientName}}","{{BatchID}}","{{ReportLink}}","{{CandidateCount}}","{{ReleasedBy}}"],                                           modified:"Jan 15, 2026", subject:"Verification Report Ready — {{BatchID}}" },
  { ref:"CL-03",name:"Batch Completion Notice",   cat:"Client",         channel:"Email",     pri:"Medium",   status:"Required", owner:"CE",     retry:"Single email. No retry.",                                       vars:["{{ClientName}}","{{BatchName}}","{{CompletionDate}}","{{TotalCandidates}}","{{SummaryLink}}"],                                    modified:"—",            subject:"Batch Complete: {{BatchName}} — All Reports Available" },
  { ref:"SY-01",name:"Client Credentials",        cat:"System & Security",channel:"Email",   pri:"Critical", status:"Existing", owner:"Admin",  retry:"Admin can resend manually. No auto-retry.",                     vars:["{{ClientName}}","{{Username}}","{{TemporaryPassword}}","{{PortalURL}}","{{ExpiryDate}}"],                                          modified:"—",            subject:"Your VeriPort Portal Access Credentials" },
  { ref:"SY-02",name:"Internal User Invite",      cat:"System & Security",channel:"Email",   pri:"High",     status:"Required", owner:"Admin",  retry:"Admin can resend manually. No auto-retry.",                     vars:["{{UserName}}","{{Role}}","{{Username}}","{{TemporaryPassword}}","{{PortalURL}}","{{AdminName}}"],                                  modified:"—",            subject:"Welcome to VeriPort — Your Account Is Ready" },
  { ref:"SY-03",name:"Password Reset",            cat:"System & Security",channel:"Email",   pri:"Critical", status:"Required", owner:"System", retry:"User can request again. Link expires in 30 mins.",              vars:["{{UserName}}","{{ResetLink}}","{{ExpiryTime}}","{{SupportEmail}}"],                                                             modified:"—",            subject:"VeriPort Password Reset Request" },
  { ref:"SY-04",name:"MFA Verification",          cat:"System & Security",channel:"SMS",     pri:"Critical", status:"Existing", owner:"System", retry:"Retry once after failed delivery. Code expires in 5 mins.",    vars:["{{UserName}}","{{OTPCode}}","{{ExpiryTime}}","{{IPAddress}}"],                                                                 modified:"—",            subject:"Your VeriPort Verification Code" },
];

export const VA_BATCHES = [
  {
    id: "b1",
    batch: "Q1 2026 Scholars",
    client: "ABC Foundation",
    created: "Jan 15",
    deptsTotal: 15,
    deptsCleared: 12,
    deptsPending: 3,
    progress: 80,
    departments: [
      { id:"d1", institution:"UNILAG", dept:"Computer Science", issue:"Contact changed",   issueType:"changed",   students:15, status:"pending",
        validatedContact:{ name:"Dr. John Okafor",     position:"Head of Department", email:"j.okafor@unilag.edu.ng",  phone:"+234-802-111-2222", lastUsed:"March 2025",   history:"Verified 8 students (June 2025), 100% response rate" },
        crowdsourced:[
          { name:"Dr. Emeka Nwosu",        position:"Head of Department", email:"e.nwosu@unilag.edu.ng",   phone:"+234-803-333-4444", votes:12, total:15, pct:80, submittedBy:"Blessing Okoro, Chidi Nnamdi, Grace Adebayo, +9 more", warning:null, recommended:true },
          { name:"Dr. John Okafor",        position:"Head of Department", email:"j.okafor@gmail.com",      phone:"+234-802-111-2222", votes:3,  total:15, pct:20, submittedBy:null, warning:"Personal email", recommended:false },
        ]
      },
      { id:"d2", institution:"OAU",    dept:"Medicine",         issue:"Conflict (2 opts)", issueType:"conflict",  students:12, status:"pending",
        validatedContact:{ name:"Prof. Adebayo Williams", position:"Head of Department", email:"a.williams@oau.edu.ng",   phone:"+234-805-555-6666", lastUsed:"August 2025",  history:null },
        crowdsourced:[
          { name:"Prof. Adebayo Williams", position:"Head of Department", email:"a.williams@yahoo.com",    phone:"+234-805-555-6666", votes:5,  total:12, pct:42, submittedBy:null, warning:"⚠ Personal email", recommended:false },
          { name:"Dr. Funke Adeola",       position:"Course Adviser",     email:"f.adeola@oau.edu.ng",     phone:"+234-806-777-8888", votes:4,  total:12, pct:33, submittedBy:null, warning:null, recommended:false },
          { name:"Mrs. Janet Obi",         position:"Secretary",          email:"j.obi@oau.edu.ng",        phone:"+234-807-999-0000", votes:3,  total:12, pct:25, submittedBy:null, warning:null, recommended:false },
        ],
        recommendation:"Keep validated contact (HOD with official email)"
      },
      { id:"d3", institution:"UI",     dept:"Law",              issue:"New department",    issueType:"new",       students:8,  status:"pending",
        validatedContact:null,
        crowdsourced:[
          { name:"Dr. Chukwuma Eze",       position:"Head of Department", email:"c.eze@ui.edu.ng",         phone:"+234-808-111-2222", votes:7,  total:8,  pct:88, submittedBy:null, warning:"✓ Official domain", recommended:true },
          { name:"Prof. Bola Akande",      position:"Dean",               email:"b.akande@ui.edu.ng",      phone:"+234-809-333-4444", votes:1,  total:8,  pct:12, submittedBy:null, warning:null, recommended:false },
        ]
      },
      { id:"d4",  institution:"UNILAG", dept:"Medicine",          issue:null, issueType:null, students:10, status:"validated", vaContact:"Dr. Ade Bello",       how:"Auto" },
      { id:"d5",  institution:"UNILAG", dept:"Engineering",       issue:null, issueType:null, students:18, status:"validated", vaContact:"Prof. Chidi Eze",     how:"Auto" },
      { id:"d6",  institution:"ABU",    dept:"Economics",         issue:null, issueType:null, students:14, status:"validated", vaContact:"Dr. Musa Ibrahim",    how:"Auto" },
      { id:"d7",  institution:"UI",     dept:"Political Science", issue:null, issueType:null, students:11, status:"validated", vaContact:"Prof. Ngozi Eze",     how:"Auto" },
      { id:"d8",  institution:"LASU",   dept:"Accounting",        issue:null, issueType:null, students:9,  status:"validated", vaContact:"Dr. Tunde Bakare",    how:"Manual" },
      { id:"d9",  institution:"OAU",    dept:"Chemistry",         issue:null, issueType:null, students:13, status:"validated", vaContact:"Dr. Segun Adewale",   how:"Auto" },
      { id:"d10", institution:"UNIBEN", dept:"Pharmacy",          issue:null, issueType:null, students:7,  status:"validated", vaContact:"Prof. Emeka Okafor",  how:"Auto" },
      { id:"d11", institution:"ABU",    dept:"Mathematics",       issue:null, issueType:null, students:16, status:"validated", vaContact:"Dr. Halima Suleiman", how:"Auto" },
      { id:"d12", institution:"UNILAG", dept:"Physics",           issue:null, issueType:null, students:12, status:"validated", vaContact:"Prof. Ada Okonkwo",   how:"Auto" },
      { id:"d13", institution:"UI",     dept:"English",           issue:null, issueType:null, students:8,  status:"validated", vaContact:"Dr. Bisi Afolabi",    how:"Auto" },
      { id:"d14", institution:"LASU",   dept:"History",           issue:null, issueType:null, students:6,  status:"validated", vaContact:"Prof. Kunle Bello",   how:"Auto" },
      { id:"d15", institution:"UNIBEN", dept:"Architecture",      issue:null, issueType:null, students:14, status:"validated", vaContact:"Dr. Chike Nweze",     how:"Manual" },
    ]
  },
  {
    id: "b2",
    batch: "Jan Intake Cohort",
    client: "XYZ Trust",
    created: "Jan 18",
    deptsTotal: 22,
    deptsCleared: 20,
    deptsPending: 2,
    progress: 91,
    departments: [
      { id:"e1", institution:"UNILAG", dept:"Biochemistry",   issue:"Contact changed", issueType:"changed", students:9, status:"pending",
        validatedContact:{ name:"Dr. Chidi Obi", position:"Head of Department", email:"c.obi@unilag.edu.ng", phone:"+234-801-222-3333", lastUsed:"Oct 2025", history:"Verified 5 students, 100% response" },
        crowdsourced:[
          { name:"Dr. Amara Osei", position:"Head of Department", email:"a.osei@unilag.edu.ng", phone:"+234-802-444-5555", votes:8, total:9, pct:89, submittedBy:null, warning:null, recommended:true },
          { name:"Dr. Chidi Obi",  position:"Head of Department", email:"c.obi@gmail.com",      phone:"+234-801-222-3333", votes:1, total:9, pct:11, submittedBy:null, warning:"Personal email", recommended:false },
        ]
      },
      { id:"e2", institution:"ABU",    dept:"Statistics",     issue:"New department",  issueType:"new",     students:6, status:"pending",
        validatedContact:null,
        crowdsourced:[
          { name:"Prof. Yusuf Musa", position:"Head of Department", email:"y.musa@abu.edu.ng", phone:"+234-803-666-7777", votes:6, total:6, pct:100, submittedBy:null, warning:"✓ Official domain", recommended:true },
        ]
      },
    ]
  },
  {
    id: "b3",
    batch: "Special Grant Program",
    client: "DEF Fund",
    created: "Jan 20",
    deptsTotal: 8,
    deptsCleared: 5,
    deptsPending: 3,
    progress: 63,
    departments: [
      { id:"f1", institution:"LASU",   dept:"Sociology",      issue:"Missing contact", issueType:"missing", students:4, status:"pending",
        validatedContact:null,
        crowdsourced:[]
      },
      { id:"f2", institution:"UNIBEN", dept:"Fine Arts",      issue:"Conflict (3 opts)",issueType:"conflict",students:7, status:"pending",
        validatedContact:{ name:"Dr. Ngozi Okeke", position:"Head of Department", email:"n.okeke@uniben.edu.ng", phone:"+234-804-888-9999", lastUsed:"Jul 2025", history:null },
        crowdsourced:[
          { name:"Dr. Ngozi Okeke",   position:"Head of Department", email:"n.okeke@uniben.edu.ng", phone:"+234-804-888-9999", votes:3, total:7, pct:43, submittedBy:null, warning:null, recommended:false },
          { name:"Prof. Eze Nwosu",   position:"Associate Dean",     email:"e.nwosu@uniben.edu.ng", phone:"+234-805-000-1111", votes:2, total:7, pct:29, submittedBy:null, warning:null, recommended:false },
          { name:"Mrs. Ada Okafor",   position:"Secretary",          email:"a.okafor@gmail.com",    phone:"+234-806-222-3333", votes:2, total:7, pct:29, submittedBy:null, warning:"Personal email", recommended:false },
        ],
        recommendation:"Keep validated contact (only HOD with official university email)"
      },
      { id:"f3", institution:"OAU",    dept:"Theatre Arts",   issue:"Contact changed", issueType:"changed", students:5, status:"pending",
        validatedContact:{ name:"Prof. Sola Ogundimu", position:"Head of Department", email:"s.ogundimu@oau.edu.ng", phone:"+234-807-444-5555", lastUsed:"May 2025", history:"Verified 3 students, 100% response" },
        crowdsourced:[
          { name:"Dr. Kemi Adeyemi",    position:"Head of Department", email:"k.adeyemi@oau.edu.ng", phone:"+234-808-666-7777", votes:4, total:5, pct:80, submittedBy:null, warning:null, recommended:true },
          { name:"Prof. Sola Ogundimu", position:"Head of Department", email:"s.ogundimu@gmail.com", phone:"+234-807-444-5555", votes:1, total:5, pct:20, submittedBy:null, warning:"Personal email", recommended:false },
        ]
      },
    ]
  },
];

export const LOCAL_INSTITUTION_REGISTRY = [
  { institution:"UNILAG", registrarEmail:"registrar@unilag.edu.ng", examsRecordsEmail:"records@unilag.edu.ng", paymentRequired:"No", source:"Merged VA / validated" },
  { institution:"OAU", registrarEmail:"registrar@oauife.edu.ng", examsRecordsEmail:"exams@oauife.edu.ng", paymentRequired:"Yes", source:"Candidate-crowdsourced pending confirmation" },
  { institution:"UI", registrarEmail:"registrar@ui.edu.ng", examsRecordsEmail:"records@ui.edu.ng", paymentRequired:"No", source:"Merged VA / validated" },
];

export const FOREIGN_INSTITUTION_REGISTRY = [
  { institution:"University of Ghana", portalName:"UG Student Portal", institutionEmail:"academic@ug.edu.gh", mode:"Portal + email" },
  { institution:"University of Nairobi", portalName:"UoN Student Management", institutionEmail:"registrar-academic@uonbi.ac.ke", mode:"Email" },
  { institution:"University of Pretoria", portalName:"UP Student Centre", institutionEmail:"records@up.ac.za", mode:"Portal" },
];

export const AGENTS = [
  { name: "Bola Adewale",   zone: "Lagos Island",    tasks: 14, completed: 11, performance: "79%", status: "Active"   },
  { name: "Segun Okonkwo",  zone: "Abuja Central",   tasks: 9,  completed: 9,  performance: "100%",status: "Active"   },
  { name: "Amina Bello",    zone: "Kano North",      tasks: 6,  completed: 4,  performance: "67%", status: "Active"   },
  { name: "Chuka Eze",      zone: "Port Harcourt",   tasks: 11, completed: 10, performance: "91%", status: "Active"   },
  { name: "Tunde Fashola",  zone: "Ibadan",          tasks: 7,  completed: 5,  performance: "71%", status: "Active"   },
  { name: "Grace Nwachukwu",zone: "Enugu",           tasks: 3,  completed: 0,  performance: "—",   status: "Inactive" },
];
export const NIGERIA_STATES = [
  { name:"Abia",          capital:"Umuahia" },
  { name:"Adamawa",       capital:"Yola" },
  { name:"Akwa Ibom",     capital:"Uyo" },
  { name:"Anambra",       capital:"Awka" },
  { name:"Bauchi",        capital:"Bauchi" },
  { name:"Bayelsa",       capital:"Yenagoa" },
  { name:"Benue",         capital:"Makurdi" },
  { name:"Borno",         capital:"Maiduguri" },
  { name:"Cross River",   capital:"Calabar" },
  { name:"Delta",         capital:"Asaba" },
  { name:"Ebonyi",        capital:"Abakaliki" },
  { name:"Edo",           capital:"Benin City" },
  { name:"Ekiti",         capital:"Ado Ekiti" },
  { name:"Enugu",         capital:"Enugu" },
  { name:"FCT Abuja",     capital:"Abuja" },
  { name:"Gombe",         capital:"Gombe" },
  { name:"Imo",           capital:"Owerri" },
  { name:"Jigawa",        capital:"Dutse" },
  { name:"Kaduna",        capital:"Kaduna" },
  { name:"Kano",          capital:"Kano" },
  { name:"Katsina",       capital:"Katsina" },
  { name:"Kebbi",         capital:"Birnin Kebbi" },
  { name:"Kogi",          capital:"Lokoja" },
  { name:"Kwara",         capital:"Ilorin" },
  { name:"Lagos",         capital:"Ikeja" },
  { name:"Nasarawa",      capital:"Lafia" },
  { name:"Niger",         capital:"Minna" },
  { name:"Ogun",          capital:"Abeokuta" },
  { name:"Ondo",          capital:"Akure" },
  { name:"Osun",          capital:"Osogbo" },
  { name:"Oyo",           capital:"Ibadan" },
  { name:"Plateau",       capital:"Jos" },
  { name:"Rivers",        capital:"Port Harcourt" },
  { name:"Sokoto",        capital:"Sokoto" },
  { name:"Taraba",        capital:"Jalingo" },
  { name:"Yobe",          capital:"Damaturu" },
  { name:"Zamfara",       capital:"Gusau" },
];

export const LGA_DATA = {
  "Lagos": [
    { lga:"Ikeja",           agent:"Adewale Ogunleye", tasks:12 },
    { lga:"Surulere",        agent:"Adewale Ogunleye", tasks:8  },
    { lga:"Ikorodu",         agent:"Chioma Nwosu",     tasks:6  },
    { lga:"Epe",             agent:"Chioma Nwosu",     tasks:4  },
    { lga:"Lagos Island",    agent:"Adewale Ogunleye", tasks:15 },
    { lga:"Lagos Mainland",  agent:null,               tasks:0  },
    { lga:"Apapa",           agent:"Adewale Ogunleye", tasks:9  },
    { lga:"Badagry",         agent:"Chioma Nwosu",     tasks:3  },
    { lga:"Ibeju-Lekki",     agent:"Chioma Nwosu",     tasks:5  },
    { lga:"Eti-Osa",         agent:"Adewale Ogunleye", tasks:11 },
    { lga:"Kosofe",          agent:"Adewale Ogunleye", tasks:7  },
    { lga:"Mushin",          agent:"Adewale Ogunleye", tasks:10 },
    { lga:"Ojo",             agent:null,               tasks:0  },
    { lga:"Oshodi-Isolo",    agent:"Adewale Ogunleye", tasks:8  },
    { lga:"Shomolu",         agent:"Adewale Ogunleye", tasks:6  },
    { lga:"Alimosho",        agent:"Adewale Ogunleye", tasks:14 },
    { lga:"Amuwo-Odofin",    agent:null,               tasks:0  },
    { lga:"Ifako-Ijaiye",    agent:null,               tasks:0  },
    { lga:"Agege",           agent:null,               tasks:0  },
    { lga:"Ajeromi-Ifelodun",agent:"Adewale Ogunleye", tasks:5  },
  ],
  "FCT Abuja": [
    { lga:"Abuja Municipal", agent:"Segun Okonkwo",    tasks:18 },
    { lga:"Gwagwalada",      agent:"Segun Okonkwo",    tasks:8  },
    { lga:"Kuje",            agent:"Segun Okonkwo",    tasks:7  },
    { lga:"Bwari",           agent:"Segun Okonkwo",    tasks:5  },
    { lga:"Kwali",           agent:null,               tasks:0  },
    { lga:"Abaji",           agent:null,               tasks:0  },
  ],
  "Rivers": [
    { lga:"Port Harcourt",   agent:"Chuka Eze",        tasks:22 },
    { lga:"Obio-Akpor",      agent:"Chuka Eze",        tasks:14 },
    { lga:"Eleme",           agent:"Chuka Eze",        tasks:8  },
    { lga:"Ikwerre",         agent:"Chuka Eze",        tasks:6  },
    { lga:"Oyigbo",          agent:"Chuka Eze",        tasks:5  },
    { lga:"Tai",             agent:null,               tasks:0  },
    { lga:"Gokana",          agent:null,               tasks:0  },
    { lga:"Khana",           agent:null,               tasks:0  },
    { lga:"Ogu-Bolo",        agent:null,               tasks:0  },
    { lga:"Andoni",          agent:null,               tasks:0  },
    { lga:"Abua-Odual",      agent:null,               tasks:0  },
    { lga:"Ahoada East",     agent:null,               tasks:0  },
  ],
};

export const STATE_SUMMARY = [
  { state:"Lagos",    agents:2, lgasCovered:"16/20", tasks:123, status:"Partial" },
  { state:"FCT Abuja",agents:1, lgasCovered:"4/6",   tasks:38,  status:"Partial" },
  { state:"Rivers",   agents:1, lgasCovered:"5/12",  tasks:55,  status:"Partial" },
];

export const INTEGRATIONS = [
  { name: "NIMC API",    desc: "National Identity Management Commission — NIN verification",  status: "Connected", lastSync: "2 mins ago",   color: "#16a34a" },
  { name: "SendGrid",    desc: "Transactional email delivery for candidate communications",   status: "Connected", lastSync: "5 mins ago",   color: "#16a34a" },
  { name: "Twilio",      desc: "SMS notifications and reminders to candidates",               status: "Connected", lastSync: "8 mins ago",   color: "#16a34a" },
  { name: "QuickBooks",  desc: "Finance and invoicing integration for client billing",        status: "Disconnected",lastSync:"Never",        color: "#dc2626" },
];

export const AUDIT_LOGS = [
  { time: "2026-02-26 09:14:22", actor: "Alice Okafor",   action: "Created user",      entity: "Fatima Bello",            details: "Role: VE" },
  { time: "2026-02-26 08:55:10", actor: "Sarah Adeniyi",  action: "Created batch",     entity: "Zenith Bank Q1 Intake",   details: "384 candidates" },
  { time: "2026-02-25 17:30:44", actor: "Alice Okafor",   action: "Updated config",    entity: "Link Expiry",             details: "Changed to 7 days" },
  { time: "2026-02-25 16:12:08", actor: "Damilola Adeyemi",action:"Completed task",    entity: "Acme Q4 - Batch 1",       details: "ServMode: Employment" },
  { time: "2026-02-25 14:48:33", actor: "Alice Okafor",   action: "Deactivated user",  entity: "Old User Account",        details: "Reason: Left company" },
  { time: "2026-02-25 11:22:19", actor: "Sarah Adeniyi",  action: "Released report",   entity: "Beta Industries Q3",      details: "32 candidates" },
  { time: "2026-02-24 16:05:55", actor: "Alice Okafor",   action: "Added VA",          entity: "Prof. Adebayo Okafor",    details: "Institution: UNILAG" },
  { time: "2026-02-24 10:33:11", actor: "Chinedu Okafor", action: "Submitted evidence",entity: "Acme Q4 Batch 1 - Task 3",details: "ServMode: Education" },
];

export const REFERENCE_REGISTRIES = [
  { name:"Country",            records:249,   updated:"2026-01-12", icon:"🌍", dep:null },
  { name:"State",              records:37,    updated:"2025-11-03", icon:"🗺",  dep:"Country" },
  { name:"LGA",                records:774,   updated:"2025-11-03", icon:"📍", dep:"State" },
  { name:"Local Institution",  records:264,   updated:"2026-02-09", icon:"🏫", dep:null },
  { name:"Foreign Institution",records:1820,  updated:"2026-02-09", icon:"🌐", dep:"Country" },
  { name:"Degree Type",        records:42,    updated:"2025-09-21", icon:"🎓", dep:null },
  { name:"Degree Grade",       records:7,     updated:"2025-09-21", icon:"📊", dep:null },
  { name:"Sex",                records:3,     updated:"2025-09-21", icon:"👤", dep:null },
  { name:"Marital Status",     records:5,     updated:"2025-09-21", icon:"💍", dep:null },
  { name:"Relationship",       records:12,    updated:"2025-09-21", icon:"🤝", dep:null },
];

export const SAMPLE_RECORDS = {
  "Country":             [{id:"CTR-001",value:"Nigeria"},{id:"CTR-002",value:"Ghana"},{id:"CTR-003",value:"United Kingdom"},{id:"CTR-004",value:"United States"},{id:"CTR-005",value:"Canada"}],
  "State":               [{id:"STT-001",value:"Lagos",dep:"Nigeria"},{id:"STT-002",value:"Ogun",dep:"Nigeria"},{id:"STT-003",value:"Oyo",dep:"Nigeria"},{id:"STT-004",value:"Abuja (FCT)",dep:"Nigeria"},{id:"STT-005",value:"Rivers",dep:"Nigeria"}],
  "LGA":                 [{id:"LGA-001",value:"Ikeja",dep:"Lagos"},{id:"LGA-002",value:"Eti-Osa",dep:"Lagos"},{id:"LGA-003",value:"Abeokuta South",dep:"Ogun"},{id:"LGA-004",value:"Ibadan North",dep:"Oyo"},{id:"LGA-005",value:"Port Harcourt",dep:"Rivers"}],
  "Local Institution":   [{id:"INST-NG-0142",value:"University of Lagos",dep:"Nigeria"},{id:"INST-NG-0201",value:"Obafemi Awolowo University",dep:"Nigeria"},{id:"INST-NG-0089",value:"University of Ibadan",dep:"Nigeria"},{id:"INST-NG-0310",value:"Ahmadu Bello University",dep:"Nigeria"},{id:"INST-NG-0178",value:"Lagos State University",dep:"Nigeria"}],
  "Foreign Institution": [{id:"INST-UK-0041",value:"University of London",dep:"United Kingdom"},{id:"INST-UK-0012",value:"University of Oxford",dep:"United Kingdom"},{id:"INST-US-0301",value:"Harvard University",dep:"United States"},{id:"INST-GH-0022",value:"University of Ghana",dep:"Ghana"},{id:"INST-US-0188",value:"MIT",dep:"United States"}],
  "Degree Type":         [{id:"DEG-001",value:"BSc"},{id:"DEG-002",value:"BA"},{id:"DEG-003",value:"BEng"},{id:"DEG-004",value:"LLB"},{id:"DEG-005",value:"MBBS"}],
  "Degree Grade":        [{id:"GRD-001",value:"First Class"},{id:"GRD-002",value:"Second Class Upper (2:1)"},{id:"GRD-003",value:"Second Class Lower (2:2)"},{id:"GRD-004",value:"Third Class"},{id:"GRD-005",value:"Pass"},{id:"GRD-006",value:"Distinction"},{id:"GRD-007",value:"Merit"}],
  "Sex":                 [{id:"SEX-001",value:"Male"},{id:"SEX-002",value:"Female"},{id:"SEX-003",value:"Prefer not to say"}],
  "Marital Status":      [{id:"MAR-001",value:"Single"},{id:"MAR-002",value:"Married"},{id:"MAR-003",value:"Divorced"},{id:"MAR-004",value:"Widowed"},{id:"MAR-005",value:"Separated"}],
  "Relationship":        [{id:"REL-001",value:"Father"},{id:"REL-002",value:"Mother"},{id:"REL-003",value:"Spouse"},{id:"REL-004",value:"Sibling"},{id:"REL-005",value:"Child"}],
};
