import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

// ─── VO Data ──────────────────────────────────────────────────────────────────
const VO_SERVMODES = [
  { id:"EMP-EMAIL",  service:"Employment Reference", mode:"Email",  tasks:18, active:10, awaiting:8,  atRisk:2, lanes:["Queued","Sent - Awaiting","Responses"], counts:[5,10,15],  postVOFlow:{reviewVE:true, reviewVM:true, reviewCE:true} },
  { id:"GUAR-EMAIL", service:"Guarantor",            mode:"Email",  tasks:12, active:5,  awaiting:7,  atRisk:1, lanes:["Queued","Sent - Awaiting","Responses"], counts:[3,7,11],  postVOFlow:{reviewVE:true, reviewVM:false, reviewCE:true} },
  { id:"REF-EMAIL",  service:"Reference Check",      mode:"Email",  tasks:6,  active:3,  awaiting:3,  atRisk:0, lanes:["Queued","Sent - Awaiting","Responses"], counts:[2,3,5],   postVOFlow:{reviewVE:true, reviewVM:false, reviewCE:false} },
  { id:"ADDR-FIELD", service:"Address Verification", mode:"Field",  tasks:10, active:4,  awaiting:6,  atRisk:1, lanes:["Ready","Dispatched","In Progress","QA","Done"], counts:[6,4,2,3,15], postVOFlow:{reviewVE:true, reviewVM:true, reviewCE:true} },
  { id:"WAEC-PORTAL",service:"WAEC",                 mode:"Portal", tasks:8,  active:3,  awaiting:5,  atRisk:0, lanes:["Ready","In Run","Evidence Review","Done"], counts:[8,0,2,35], postVOFlow:{reviewVE:false, reviewVM:false, reviewCE:false} },
  { id:"CRIM-LETTER",service:"Criminal Record",      mode:"Letter", tasks:8,  active:4,  awaiting:4,  atRisk:1, lanes:["Generated","Sent","Acknowledged","Reply Received","Done"], counts:[4,6,3,5,42], postVOFlow:{reviewVE:true, reviewVM:false, reviewCE:true} },
  { id:"STUDENTSHIP-SCHOLAR", service:"Ongoing Studentship", mode:"Scholar", tasks:43, active:8, awaiting:35, atRisk:1, lanes:["Revalidation","Confirmed","Sent","QA"], counts:[3,5,8,27], skipVARevalidation:false, postVOFlow:{reviewVE:false, reviewVM:false, reviewCE:true} },
];

const EMAIL_QUEUED = [
  { candidate:"Yusuf Ibrahim",   employer:"Shell Nigeria",  contact:"hr@shell.com.ng",       sla:5, slaOk:true },
  { candidate:"Aisha Mohammed",  employer:"First Bank",     contact:"hr@firstbank.ng",        sla:5, slaOk:true },
  { candidate:"Tunde Bakare",    employer:"Nestle Nigeria",  contact:"hr@nestle.com.ng",      sla:4, slaOk:true },
  { candidate:"Kemi Johnson",    employer:"Dangote Group",  contact:"verify@dangote.com",     sla:5, slaOk:true },
  { candidate:"Emeka Okafor",    employer:"MTN Nigeria",    contact:"verification@mtn.ng",    sla:3, slaRisk:true },
];
const EMAIL_AWAITING = [
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
const EMAIL_REPLIED = [
  { candidate:"Janet Okonkwo", ext:"Dangote HR",  replied:"Feb 3", via:"Secure Link" },
  { candidate:"Chidi Nwosu",   ext:"GTBank HR",   replied:"Feb 3", via:"Email Reply" },
  { candidate:"Helen Obi",     ext:"PwC HR",      replied:"Feb 4", via:"Secure Link" },
];
const EMAIL_DONE = [
  { candidate:"Ada Eze",         ext:"Unilever HR",   outcome:"Verified",     completed:"Jan 28", exec:"Approved" },
  { candidate:"Peter Eze",       ext:"Chevron HR",    outcome:"Verified",     completed:"Jan 29", exec:"Pending" },
  { candidate:"Bola Akinwale",   ext:"FCMB HR",       outcome:"Discrepancy",  completed:"Jan 30", exec:"Pending" },
  { candidate:"Fatima Suleiman", ext:"Total E&P HR",  outcome:"Verified",     completed:"Jan 31", exec:"Approved" },
];

const FIELD_READY = [
  { candidate:"Yusuf Ibrahim",   address:"15 Maple St, Ikeja",           state:"Lagos",   sla:7 },
  { candidate:"Aisha Mohammed",  address:"8 Aminu Kano Cr, Wuse",        state:"FCT",     sla:7 },
  { candidate:"Tunde Bakare",    address:"22 Aba Rd, Rumuola",           state:"Rivers",  sla:6 },
  { candidate:"Kemi Johnson",    address:"3 Abiola Way, Abeokuta",       state:"Ogun",    sla:7 },
  { candidate:"Emeka Okafor",    address:"14 New Market Rd, Onitsha",    state:"Anambra", sla:5 },
  { candidate:"Ibrahim Musa",    address:"7 Ahmadu Bello Way, Kaduna",   state:"Kaduna",  sla:7 },
];
const FIELD_DISPATCHED = [
  { candidate:"Yusuf Ibrahim",  agent:"AGT-001 Chuka",  accepted:"Feb 3", state:"Lagos",  status:"Planning" },
  { candidate:"Aisha Mohammed", agent:"AGT-005 Amina",  accepted:"Feb 3", state:"FCT",    status:"En route" },
  { candidate:"Tunde Bakare",   agent:"AGT-008 David",  accepted:"Feb 4", state:"Rivers", status:"Planning" },
  { candidate:"Kemi Johnson",   agent:"AGT-003 Ngozi",  accepted:"Feb 4", state:"Ogun",   status:"Planning" },
];
const FIELD_INPROG = [
  { candidate:"Aisha Mohammed", agent:"AGT-005 Amina",  location:"Wuse, FCT",         status:"On-site" },
  { candidate:"Emeka Okafor",   agent:"AGT-012 Chidi",  location:"Onitsha, Anambra",  status:"Submitting" },
];
const FIELD_QA = [
  { candidate:"Fatima Suleiman", agent:"AGT-001 Chuka", submitted:"Feb 4", photos:"4/4", gps:"ok" },
  { candidate:"Ada Eze",         agent:"AGT-005 Amina", submitted:"Feb 4", photos:"3/4", gps:"ok" },
  { candidate:"Peter Eze",       agent:"AGT-008 David", submitted:"Feb 5", photos:"4/4", gps:"warn" },
];
const FIELD_DONE = [
  { candidate:"Fatima Suleiman", agent:"AGT-001 Chuka", outcome:"Verified",     completed:"Jan 28", exec:"Approved" },
  { candidate:"Ada Eze",         agent:"AGT-005 Amina", outcome:"Verified",     completed:"Jan 29", exec:"Pending" },
  { candidate:"Peter Eze",       agent:"AGT-008 David", outcome:"Not Verified",  completed:"Jan 30", exec:"Pending" },
];

const PORTAL_READY = [
  { candidate:"Yusuf Ibrahim",  year:2018, examNo:"4251234567", subjects:9, sla:3 },
  { candidate:"Aisha Mohammed", year:2017, examNo:"4251234568", subjects:9, sla:3 },
  { candidate:"Tunde Bakare",   year:2019, examNo:"4251234569", subjects:9, sla:2 },
  { candidate:"Kemi Johnson",   year:2018, examNo:"4251234570", subjects:8, sla:4 },
  { candidate:"Emeka Okafor",   year:2020, examNo:"4251234571", subjects:9, sla:5 },
];
const PORTAL_EVIDENCE = [
  { candidate:"Tunde Bakare",  exam:"WAEC 2019", result:"Match",    screenshot:"ok" },
  { candidate:"Kemi Johnson",  exam:"WAEC 2018", result:"No Match", screenshot:"blurry" },
];
const PORTAL_DONE = [
  { candidate:"Ada Eze",      exam:"WAEC 2017", result:"Match",    completed:"Jan 28", exec:"Approved" },
  { candidate:"Yusuf Ibrahim",exam:"WAEC 2018", result:"Match",    completed:"Jan 29", exec:"Approved" },
  { candidate:"Emeka Okafor", exam:"WAEC 2019", result:"No Match", completed:"Jan 30", exec:"Pending" },
];

const LETTER_GENERATED = [
  { candidate:"Yusuf Ibrahim",  institution:"NPF Lagos Command",  ref:"LTR-2026-001", sla:14 },
  { candidate:"Aisha Mohammed", institution:"NPF FCT Command",    ref:"LTR-2026-002", sla:14 },
  { candidate:"Tunde Bakare",   institution:"NPF Rivers Command", ref:"LTR-2026-003", sla:12 },
  { candidate:"Kemi Johnson",   institution:"NPF Ogun Command",   ref:"LTR-2026-004", sla:14 },
];
const LETTER_SENT = [
  { candidate:"Bola Akinwale",  institution:"NPF Lagos Command",  via:"Email", days:8, chases:1 },
  { candidate:"Emeka Okafor",   institution:"NPF FCT Command",    via:"FE",    days:6, chases:0 },
  { candidate:"Ibrahim Musa",   institution:"NPF Kaduna Command", via:"Email", days:4, chases:0 },
];
const LETTER_ACKED = [
  { candidate:"Fatima Suleiman", institution:"NPF Rivers Command", ackDate:"Jan 29", daysSince:6 },
  { candidate:"Ada Eze",         institution:"NPF Ogun Command",   ackDate:"Feb 1",  daysSince:3 },
  { candidate:"Peter Eze",       institution:"NPF Enugu Command",  ackDate:"Feb 2",  daysSince:2 },
];
const LETTER_REPLIED = [
  { candidate:"Linda Nwachukwu", institution:"NPF Lagos Command",  replied:"Feb 3", via:"Physical doc" },
  { candidate:"Kunle Adeyemo",   institution:"NPF FCT Command",    replied:"Feb 3", via:"Email" },
  { candidate:"Mary Udoh",       institution:"NPF Rivers Command", replied:"Feb 4", via:"Physical doc" },
  { candidate:"Bola Akinwale",   institution:"NPF Ogun Command",   replied:"Feb 4", via:"FE collected" },
  { candidate:"Fatima Suleiman", institution:"NPF Enugu Command",  replied:"Feb 5", via:"Email" },
];
const LETTER_DONE = [
  { candidate:"Ada Eze",         institution:"NPF Ogun Command",    outcome:"Verified",     completed:"Jan 28", exec:"Approved" },
  { candidate:"Peter Eze",       institution:"NPF Lagos Command",   outcome:"Verified",     completed:"Jan 29", exec:"Pending" },
  { candidate:"Fatima Suleiman", institution:"NPF Rivers Command",  outcome:"Not Verified", completed:"Jan 30", exec:"Pending" },
  { candidate:"Ibrahim Musa",    institution:"NPF FCT Command",     outcome:"Verified",     completed:"Jan 31", exec:"Approved" },
];

// ─── VO Scholar ServMode: VA Info Panel (item 13 — read-only) ─────────────────
// Maps scholar rows to VA registry data for read-only display in VO portal
const VA_INFO_MAP = {
  "Dr. Emeka Nwosu":    { role:"HOD",             email:"akpan@unilag.edu.ng",            status:"Validated", lastConfirmed:"Feb 22, 2026", source:"Direct",    inst:"UNILAG", dept:"Computer Science"   },
  "Prof. Ade Williams": { role:"HOD",             email:"ade.williams@oau.edu.ng",         status:"Stale",     lastConfirmed:"Nov 10, 2025", source:"Direct",    inst:"OAU",    dept:"Anatomy"            },
  "Dr. Chukwuma Eze":   { role:"HOD",             email:"chukwuma.eze@ui.edu.ng",          status:"Validated", lastConfirmed:"Jan 30, 2026", source:"FE-sourced",inst:"UI",     dept:"International Law"  },
  "Prof. Ada Okonkwo":  { role:"HOD",             email:"ada.okonkwo@unilag.edu.ng",       status:"Validated", lastConfirmed:"Feb 18, 2026", source:"Direct",    inst:"UNILAG", dept:"Physics"            },
  "Dr. Halima Suleiman":{ role:"HOD",             email:"halima.suleiman@abu.edu.ng",      status:"Stale",     lastConfirmed:"Dec 02, 2025", source:"Direct",    inst:"ABU",    dept:"Mathematics"        },
  "Prof. Emeka Okafor": { role:"Registrar",       email:"registrar@uniben.edu.ng",         status:"Validated", lastConfirmed:"Feb 05, 2026", source:"Direct",    inst:"UNIBEN", dept:"—"                  },
};

function VAInfoPanel({ row }) {
  const vaData = VA_INFO_MAP[row.va] || null;
  const stColor = s => s==="Validated"?"#16a34a":s==="Stale"?"#d97706":s==="Vacated"?"#6b7280":"#b91c1c";
  const stBg    = s => s==="Validated"?"#dcfce7":s==="Stale"?"#fef3c7":s==="Vacated"?"#f3f4f6":"#fee2e2";

  return (
    <div>
      {/* Read-only notice */}
      <div style={{background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:8,padding:"10px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" width="15" height="15"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <p style={{margin:0,fontSize:12,color:"#6d28d9",lineHeight:1.5}}>Registry data is <strong>read-only</strong> in the VO portal. Contact the VM to update VA records.</p>
      </div>

      {/* Task context */}
      <div style={{marginBottom:20}}>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>TASK CONTEXT</p>
        {[
          ["Institution", row.inst],
          ["Faculty",     row.faculty || "—"],
          ["Department",  row.dept],
          ["Students",    `${row.students} students`],
        ].map(([l,v])=>(
          <div key={l} style={{display:"flex",marginBottom:8}}>
            <span style={{width:110,fontSize:12,color:"#9ca3af",fontWeight:500,flexShrink:0}}>{l}</span>
            <span style={{fontSize:13,color:"#111827",fontWeight:500}}>{v}</span>
          </div>
        ))}
      </div>

      <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:20}}/>

      {/* VA Assignment */}
      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>ASSIGNED VA</p>
      <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 16px",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <p style={{margin:0,fontSize:15,fontWeight:700,color:"#111827"}}>{row.va}</p>
          {vaData && <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:stBg(vaData.status),color:stColor(vaData.status)}}>{vaData.status}</span>}
        </div>
        {vaData ? (
          <>
            {[
              ["Role",           vaData.role],
              ["Email",          vaData.email],
              ["Source",         vaData.source],
              ["Last Confirmed", vaData.lastConfirmed],
            ].map(([l,v])=>(
              <div key={l} style={{display:"flex",marginBottom:7}}>
                <span style={{width:120,fontSize:12,color:"#9ca3af",fontWeight:500,flexShrink:0}}>{l}</span>
                <span style={{fontSize:12,color:l==="Email"?"#3b82f6":"#374151"}}>{v}</span>
              </div>
            ))}
          </>
        ) : (
          <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>No registry record found for this VA name.</p>
        )}
      </div>

      {/* Status warning if not Validated */}
      {vaData && vaData.status !== "Validated" && (
        <div style={{background:vaData.status==="Stale"?"#fffbeb":"#fef2f2",border:`1px solid ${vaData.status==="Stale"?"#fcd34d":"#fecaca"}`,borderRadius:8,padding:"12px 14px",marginBottom:16}}>
          <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:vaData.status==="Stale"?"#92400e":"#b91c1c"}}>
            {vaData.status==="Stale" ? "⚠ Stale Contact" : vaData.status==="Vacant" ? "✗ Vacant Role" : "✗ Vacated Role"}
          </p>
          <p style={{margin:0,fontSize:12,color:vaData.status==="Stale"?"#b45309":"#b91c1c",lineHeight:1.5}}>
            {vaData.status==="Stale"
              ? "This VA contact has passed the freshness window. Verify manually before sending. Contact the VM to refresh the registry record."
              : "No validated VA is assigned to this role. Tasks may be delayed. Contact the VM to assign a replacement."}
          </p>
        </div>
      )}

      {/* Lookup chain note */}
      <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px"}}>
        <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#374151"}}>Lookup chain used</p>
        <p style={{margin:0,fontSize:12,color:"#6b7280",lineHeight:1.6}}>HOD → Registrar → Deputy Registrar → Dean of Students → VC/Rector. Assignment was made at the first available Validated record in this chain.</p>
      </div>
    </div>
  );
}

const SCHOLAR_REVAL = [
  { inst:"UNILAG", faculty:"Science",   dept:"Comp Sci",  va:"Dr. Emeka Nwosu",    students:15, sla:9 },
  { inst:"OAU",    faculty:"Medicine",  dept:"Anatomy",   va:"Prof. Ade Williams",  students:12, sla:8 },
  { inst:"UI",     faculty:"Law",       dept:"Intl Law",  va:"Dr. Chukwuma Eze",    students:8,  sla:7, atRisk:true },
];
const SCHOLAR_CONFIRMED = [
  { inst:"UNILAG", faculty:"Science",   dept:"Physics",      va:"Prof. Ada Okonkwo",  students:12, sla:10 },
  { inst:"ABU",    faculty:"Science",   dept:"Mathematics",  va:"Dr. Halima Suleiman",students:9,  sla:11 },
  { inst:"UNIBEN", faculty:"Pharmacy",  dept:"Pharmacology", va:"Prof. Emeka Okafor", students:7,  sla:9 },
];
const SCHOLAR_SENT = [
  { inst:"UNILAG", dept:"Medicine",   va:"Dr. Ade Bello",    students:10, sent:"Jan 28", days:8, reminds:1, nudges:0, slaBreach:true },
  { inst:"UNILAG", dept:"Engineering",va:"Prof. Chidi Eze",  students:18, sent:"Jan 30", days:6, reminds:1, nudges:1, slaRisk:true },
  { inst:"ABU",    dept:"Economics",  va:"Dr. Musa Ibrahim", students:14, sent:"Feb 1",  days:4, reminds:0, nudges:0, slaOk:true },
];
const SCHOLAR_QA = [
  { student:"Blessing Okoro",  dept:"Comp Sci / UNILAG", matric:"180305123", status:"Confirmed",    result:"Enrolled" },
  { student:"Chidi Nnamdi",    dept:"Comp Sci / UNILAG", matric:"190207456", status:"Confirmed",    result:"Enrolled" },
  { student:"Grace Adebayo",   dept:"Comp Sci / UNILAG", matric:"170108789", status:"Not Found",    result:"Not Found" },
  { student:"Ibrahim Musa",    dept:"Medicine / OAU",    matric:"180109012", status:"Confirmed",    result:"Enrolled" },
  { student:"Kemi Johnson",    dept:"Medicine / OAU",    matric:"190210345", status:"Discrepancy",  result:"Graduated" },
];
const SCHOLAR_DONE = [
  { student:"Ada Eze",         dept:"Physics / UNILAG",    outcome:"Enrolled",   completed:"Jan 28", exec:"Approved" },
  { student:"Peter Eze",       dept:"Mathematics / ABU",   outcome:"Enrolled",   completed:"Jan 29", exec:"Pending" },
  { student:"Fatima Suleiman", dept:"Law / UI",            outcome:"Graduated",  completed:"Jan 30", exec:"Pending" },
];

// ─── VO Shared Sub-components ─────────────────────────────────────────────────
const SLABadge = ({ val, risk, breach }) => (
  <span style={{fontSize:13,fontWeight:600,color:breach?"#b91c1c":risk?"#d97706":"#374151"}}>
    {val}d{breach?" 🔴":risk?" ⚠️":""}
  </span>
);

const OutcomeBadge = ({ val }) => {
  const map = { Verified:["#dcfce7","#16a34a"], "Not Verified":["#fee2e2","#b91c1c"], Inconclusive:["#f3f4f6","#6b7280"], Discrepancy:["#fef3c7","#d97706"], Enrolled:["#dcfce7","#16a34a"], Graduated:["#eff6ff","#3b82f6"], "Not Found":["#fee2e2","#b91c1c"], Match:["#dcfce7","#16a34a"], "No Match":["#fee2e2","#b91c1c"], Partial:["#fef3c7","#d97706"] };
  const [bg, color] = map[val] || ["#f3f4f6","#6b7280"];
  return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:bg,color}}>{val}</span>;
};

const ExecBadge = ({ val }) => {
  if (val==="Approved") return <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✅ Approved</span>;
  if (val==="Pending")  return <span style={{fontSize:13,color:"#d97706",fontWeight:500}}>⏳ Pending</span>;
  return <span style={{fontSize:13,color:"#b91c1c",fontWeight:500}}>🔄 Returned</span>;
};

const VOTable = ({ cols, rows, onRow, emptyMsg="No tasks." }) => (
  <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr style={{background:"#fafafa"}}>
        {cols.map((c,i)=><th key={i} style={{padding:"11px 18px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,whiteSpace:"nowrap"}}>{c}</th>)}
      </tr></thead>
      <tbody>
        {rows.length===0 && <tr><td colSpan={cols.length} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>{emptyMsg}</td></tr>}
        {rows.map((r,i)=>(
          <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white",cursor:onRow?"pointer":"default"}}
            onMouseEnter={e=>{if(onRow)e.currentTarget.style.background="#fafafa";}}
            onMouseLeave={e=>e.currentTarget.style.background="white"}
            onClick={()=>onRow&&onRow(r,i)}>
            {r}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TD = ({children,bold}) => <td style={{padding:"14px 18px",fontSize:14,color:bold?"#111827":"#374151",fontWeight:bold?500:400}}>{children}</td>;

// ─── VO Drawers ───────────────────────────────────────────────────────────────
function PivotDrawer({ task, onClose }) {
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("Method exhausted — email unresponsive");
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:440,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>PIVOT SERVMODE</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 4px",fontWeight:600}}>Current: {task?.servform || "EMP-EMAIL"}</p>
          <p style={{margin:"0 0 4px"}}>Task: {task?.candidate || "Yusuf Ibrahim"} → {task?.ext || "Shell Nigeria HR"}</p>
          <p style={{margin:0,color:"#6b7280"}}>3 reminders sent, 2 nudges, email opened 4x. No response after 12 days.</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>MODE HISTORY</p>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:12,color:"#6b7280",fontFamily:"monospace"}}>
          {["Jan 25 Initial request sent","Jan 27 Email opened (no response)","Jan 28 Remind #1 sent","Jan 30 Nudge #1 to candidate","Feb 1  Remind #2 sent","Feb 3  Nudge #2 to candidate","Feb 5  Remind #3 sent (final)","Feb 6  No response — method exhausted"].map((l,i)=><p key={i} style={{margin:"0 0 3px"}}>├─ {l}</p>)}
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>PIVOT TO:</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {["EMP-LETTER","EMP-FIELD"].map(sf=>(
            <div key={sf} onClick={()=>setSelected(sf)} style={{border:`2px solid ${selected===sf?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px",cursor:"pointer",background:selected===sf?"#fef2f2":"white",textAlign:"center"}}>
              <p style={{margin:"0 0 4px",fontWeight:600,fontSize:14,color:selected===sf?"#b91c1c":"#111827"}}>{sf}</p>
              <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{sf.includes("LETTER")?"Letter":"Field"}</p>
            </div>
          ))}
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"#374151",marginBottom:6}}>REASON</label>
          <textarea value={reason} onChange={e=>setReason(e.target.value)} style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:70,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ SLA history transfers. Full mode history travels with the task.</p>
        <button onClick={onClose} disabled={!selected} style={{width:"100%",padding:"12px",background:selected?"#b91c1c":"#e5e7eb",color:selected?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:selected?"pointer":"default"}}>
          Pivot to {selected||"—"}
        </button>
      </div>
    </div>
  );
}

function ReturnToCEDrawer({ task, onClose, onSent }) {
  const [issueType, setIssueType] = useState("");
  const [details, setDetails] = useState("");
  const ISSUES = ["Email bounced — address invalid","Wrong contact — person no longer at company","Missing information — need alternative contact","Candidate data mismatch — name/details don't match","Other"];
  const handleReturn = () => {
    if (onSent && issueType) {
      onSent({
        client: task?.client || "Acme Corporation Limited",
        batch:  task?.batch  || "Acme Q4 New Hires - Batch 1",
        servform: task?.servform || "Employment Reference",
        mode: "Email",
        candidate: task?.candidate || "—",
        issue: issueType + (details ? ` — ${details}` : ""),
        sla: "3 days",
        slaOver: false,
      });
    }
    onClose();
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:440,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>RETURN TO CE</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#fef2f2",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Task: {task?.candidate || "Bola Akinwale"} → {task?.ext || "FCMB HR"}</p>
          <p style={{margin:0,color:"#6b7280"}}>ServMode: {task?.servform || "EMP-EMAIL"}</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>ISSUE TYPE</p>
        {ISSUES.map(issue=>(
          <label key={issue} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",fontSize:14,color:"#374151"}}>
            <div onClick={()=>setIssueType(issue)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${issueType===issue?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
              {issueType===issue && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
            </div>
            {issue}
          </label>
        ))}
        <div style={{marginTop:16,marginBottom:20}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"#374151",marginBottom:6}}>DETAILS</label>
          <textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Describe the issue…" style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:80,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ Task moves to CE's "Returned from Ops" queue. SLA paused while with CE.</p>
        <button onClick={handleReturn} disabled={!issueType} style={{width:"100%",padding:"12px",background:issueType?"#b91c1c":"#e5e7eb",color:issueType?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:issueType?"pointer":"default"}}>Return to CE</button>
      </div>
    </div>
  );
}

function NudgeDrawer({ task, onClose }) {
  const [channel, setChannel] = useState({email:true,sms:true});
  const history = [
    { n:1, date:"Jan 30", msg:"Your former employer at Shell hasn't responded to our verification request. Please contact them directly.", status:"Delivered ✅  Opened ✅" },
    { n:2, date:"Feb 3",  msg:"We still haven't received a response from Shell. Your verification is being delayed. Please follow up urgently.", status:"Delivered ✅  Opened ✅" },
  ];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:460,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>NUDGE CANDIDATE</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Task: {task?.candidate||"Yusuf Ibrahim"} → {task?.ext||"Shell Nigeria HR"}</p>
          <p style={{margin:0,color:"#6b7280"}}>ServMode: EMP-EMAIL</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>NUDGE HISTORY</p>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20}}>
          {history.map(h=>(
            <div key={h.n} style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid #e5e7eb"}}>
              <p style={{margin:"0 0 4px",fontSize:13,fontWeight:600,color:"#111827"}}>#{h.n} — {h.date}</p>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#374151",fontStyle:"italic"}}>"{h.msg}"</p>
              <p style={{margin:0,fontSize:12,color:"#6b7280"}}>Status: {h.status}</p>
            </div>
          ))}
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>SEND NUDGE #3</p>
        <div style={{display:"flex",gap:16,marginBottom:14}}>
          {["email","sms"].map(c=>(
            <label key={c} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14}}>
              <div onClick={()=>setChannel(p=>({...p,[c]:!p[c]}))} style={{width:18,height:18,borderRadius:4,border:`2px solid ${channel[c]?"#b91c1c":"#d1d5db"}`,background:channel[c]?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                {channel[c]&&<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
              </div>
              {c==="email"?"Email":"SMS"}
            </label>
          ))}
        </div>
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151",fontStyle:"italic"}}>
          "Dear Yusuf, This is our final reminder. Your verification with Shell Nigeria is significantly delayed because they have not responded. Please contact them immediately."
        </div>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ Nudge goes to CANDIDATE, not external party. After nudges exhausted → consider Pivot.</p>
        <button onClick={onClose} style={{width:"100%",padding:"12px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer"}}>Send Nudge #3</button>
      </div>
    </div>
  );
}

function RemindDrawer({ task, onClose }) {
  const [channel, setChannel] = useState({email:true,sms:false});
  const history = [
    { n:1, date:"Jan 25", msg:"Dear HR, We sent a verification request on Jan 25. Please respond at your earliest convenience.", status:"Delivered ✅  Opened ✅" },
    { n:2, date:"Feb 1",  msg:"Dear HR, This is a follow-up to our verification request. Please review and respond.", status:"Delivered ✅  No open" },
  ];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:460,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>REMIND EXTERNAL PARTY</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Task: {task?.candidate||"Yusuf Ibrahim"} → {task?.ext||"Shell Nigeria HR"}</p>
          <p style={{margin:0,color:"#6b7280"}}>ServMode: EMP-EMAIL · Remind goes to EXTERNAL PARTY</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>REMIND HISTORY</p>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20}}>
          {history.map(h=>(
            <div key={h.n} style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid #e5e7eb"}}>
              <p style={{margin:"0 0 4px",fontSize:13,fontWeight:600,color:"#111827"}}>#{h.n} — {h.date}</p>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#374151",fontStyle:"italic"}}>"{h.msg}"</p>
              <p style={{margin:0,fontSize:12,color:"#6b7280"}}>Status: {h.status}</p>
            </div>
          ))}
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>SEND REMIND #3</p>
        <div style={{display:"flex",gap:16,marginBottom:14}}>
          {["email","sms"].map(c=>(
            <label key={c} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14}}>
              <div onClick={()=>setChannel(p=>({...p,[c]:!p[c]}))} style={{width:18,height:18,borderRadius:4,border:`2px solid ${channel[c]?"#b91c1c":"#d1d5db"}`,background:channel[c]?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                {channel[c]&&<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
              </div>
              {c==="email"?"Email":"SMS"}
            </label>
          ))}
        </div>
        <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151",fontStyle:"italic"}}>
          "Dear HR Team, This is our third and final reminder regarding the employment verification request for {task?.candidate||"the candidate"}. Please respond urgently to avoid escalation."
        </div>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ Remind goes to EXTERNAL PARTY, not the candidate. After reminders exhausted → consider Pivot.</p>
        <button onClick={onClose} style={{width:"100%",padding:"12px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer"}}>Send Remind #3</button>
      </div>
    </div>
  );
}

function SubmitDrawer({ task, onClose }) {
  const [outcome, setOutcome] = useState("");
  const [confidence, setConfidence] = useState("");
  const [notes, setNotes] = useState("");
  const comparison = [
    { field:"Employer",   candidate:"Shell Nigeria",     external:"Shell Petroleum",   match:false },
    { field:"Job Title",  candidate:"Senior Accountant", external:"Senior Accountant", match:true },
    { field:"Start Date", candidate:"January 2019",      external:"January 2019",       match:true },
    { field:"End Date",   candidate:"April 2023",        external:"March 2023",         match:false },
    { field:"Reason Left",candidate:"Better offer",      external:"Mutual agreement",   match:false },
  ];
  const outcomes = ["Verified","Not Verified","Inconclusive","Discrepancy"];
  const confidences = ["High","Medium","Low"];
  const R = ({val,group,set,cur})=>(
    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:"#374151",marginBottom:6}}>
      <div onClick={()=>set(val)} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${cur===val?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
        {cur===val&&<div style={{width:7,height:7,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      {val}
    </label>
  );
  const canSubmit = outcome && confidence && notes.length >= 50;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:500,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>SUBMIT VERIFICATION</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Candidate: {task?.candidate||"Yusuf Ibrahim"}</p>
          <p style={{margin:0,color:"#6b7280"}}>Service: Employment Reference · ServMode: EMP-EMAIL</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>DATA COMPARISON</p>
        <table style={{width:"100%",borderCollapse:"collapse",marginBottom:20,fontSize:13}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Field","Candidate Claim","External Response",""].map((h,i)=><th key={i} style={{padding:"8px 12px",textAlign:"left",fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",fontSize:12}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {comparison.map((r,i)=>(
              <tr key={i} style={{background:r.match?"white":"#fffbeb",borderBottom:"1px solid #f3f4f6"}}>
                <td style={{padding:"8px 12px",fontWeight:500,color:"#374151"}}>{r.field}</td>
                <td style={{padding:"8px 12px",color:"#374151"}}>{r.candidate}</td>
                <td style={{padding:"8px 12px",color:"#374151"}}>{r.external}</td>
                <td style={{padding:"8px 12px"}}>{r.match?"✅":"⚠️"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>OUTCOME</p>
            {outcomes.map(o=><R key={o} val={o} cur={outcome} set={setOutcome}/>)}
          </div>
          <div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CONFIDENCE</p>
            {confidences.map(c=><R key={c} val={c} cur={confidence} set={setConfidence}/>)}
          </div>
        </div>
        <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>OFFICER NOTES <span style={{color:"#9ca3af",fontWeight:400}}>(min 50 chars)</span></p>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Describe your findings, any discrepancies, and rationale for the outcome…"
          style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:100,outline:"none",boxSizing:"border-box",marginBottom:6}}/>
        <p style={{fontSize:12,color:notes.length>=50?"#16a34a":"#9ca3af",marginBottom:16}}>{notes.length}/50 chars</p>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ All tasks require 100% Executive review. Executive sees comparison, outcome, evidence and notes.</p>
        <button onClick={()=>{if(canSubmit)onClose();}} disabled={!canSubmit}
          style={{width:"100%",padding:"12px",background:canSubmit?"#111827":"#e5e7eb",color:canSubmit?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:canSubmit?"pointer":"default"}}>
          Submit for Executive Review
        </button>
      </div>
    </div>
  );
}

// ─── Agent Select Drawer ─────────────────────────────────────────────────────
const FIELD_AGENTS = [
  { id:"AGT-001", name:"Chuka Obi",     area:"Lagos Island / Mainland", rate:"₦8,500", workload:3, acceptance:94 },
  { id:"AGT-003", name:"Ngozi Eze",     area:"Ogun / Abeokuta",         rate:"₦7,200", workload:1, acceptance:98 },
  { id:"AGT-005", name:"Amina Yusuf",   area:"FCT / Abuja",             rate:"₦9,000", workload:2, acceptance:91 },
  { id:"AGT-008", name:"David Okafor",  area:"Rivers / Port Harcourt",  rate:"₦8,000", workload:4, acceptance:87 },
  { id:"AGT-012", name:"Chidi Nwosu",   area:"Anambra / Onitsha",       rate:"₦7,500", workload:0, acceptance:100},
];
function AgentSelectDrawer({ task, onClose }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:480,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>SELECT AGENT</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#fef2f2",borderRadius:8,padding:"10px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Candidate: {task?.candidate}</p>
          <p style={{margin:0,color:"#6b7280"}}>Address: {task?.address} · {task?.state}</p>
        </div>
        <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>AVAILABLE AGENTS IN COVERAGE AREA</p>
        {FIELD_AGENTS.map(a=>(
          <div key={a.id} onClick={()=>setSelected(a.id)}
            style={{border:`2px solid ${selected===a.id?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px 16px",marginBottom:10,cursor:"pointer",background:selected===a.id?"#fef2f2":"white"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:14,fontWeight:600,color:"#111827"}}>{a.name}</span>
              <span style={{fontSize:12,color:"#6b7280"}}>{a.id}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
              <p style={{margin:0,fontSize:12,color:"#374151"}}>📍 {a.area}</p>
              <p style={{margin:0,fontSize:12,color:"#374151"}}>💰 {a.rate}/task</p>
              <p style={{margin:0,fontSize:12,color:"#374151"}}>📋 Workload: {a.workload} active</p>
              <p style={{margin:0,fontSize:12,color:a.acceptance>=95?"#16a34a":a.acceptance>=88?"#d97706":"#b91c1c",fontWeight:500}}>✓ {a.acceptance}% acceptance</p>
            </div>
          </div>
        ))}
        <button onClick={onClose} disabled={!selected}
          style={{width:"100%",marginTop:8,padding:"12px",background:selected?"#b91c1c":"#e5e7eb",color:selected?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:selected?"pointer":"default"}}>
          Assign Agent
        </button>
      </div>
    </div>
  );
}

// ─── Letter Preview Drawer ────────────────────────────────────────────────────
function LetterPreviewDrawer({ task, onClose }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:560,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>LETTER PREVIEW</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#fef2f2",borderRadius:8,padding:"10px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Ref: {task?.ref}</p>
          <p style={{margin:0,color:"#6b7280"}}>To: {task?.institution} · {task?.candidate}</p>
        </div>
        {/* Letter body mock */}
        <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"28px 32px",background:"white",fontFamily:"Georgia,serif",fontSize:13,lineHeight:1.8,color:"#111827"}}>
          <p style={{margin:"0 0 20px",textAlign:"right",fontSize:12,color:"#6b7280"}}>Date: {new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}</p>
          <p style={{margin:"0 0 4px",fontWeight:700}}>The Commanding Officer</p>
          <p style={{margin:"0 0 20px"}}>{task?.institution}</p>
          <p style={{margin:"0 0 12px"}}><strong>RE: CRIMINAL RECORD VERIFICATION — {task?.candidate?.toUpperCase()}</strong></p>
          <p style={{margin:"0 0 12px"}}>Dear Sir/Madam,</p>
          <p style={{margin:"0 0 12px"}}>We write to request a verification of the criminal records of the above-named individual in connection with an ongoing employment background screening exercise conducted on behalf of our client.</p>
          <p style={{margin:"0 0 12px"}}>Kindly confirm whether the individual has any criminal record within your command's jurisdiction and provide your official response at your earliest convenience.</p>
          <p style={{margin:"0 0 12px"}}>All information provided will be treated with the strictest confidentiality.</p>
          <p style={{margin:"0 0 20px"}}>Yours faithfully,</p>
          <p style={{margin:"0 0 4px",fontWeight:700}}>Dragnet Solutions Limited</p>
          <p style={{margin:0,fontSize:12,color:"#6b7280"}}>Ref: {task?.ref}</p>
        </div>
        <div style={{display:"flex",gap:10,marginTop:16}}>
          <button onClick={onClose} style={{flex:1,padding:"11px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}>📤 Dispatch Letter</button>
          <button onClick={onClose} style={{padding:"11px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,cursor:"pointer"}}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── VO Workboard (mode-specific lanes) ──────────────────────────────────────
function VOWorkboard({ sf, onBack, onReturnToCE }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState({});
  const [drawer, setDrawer] = useState(null); // {type, task}
  const [taskDetail, setTaskDetail] = useState(null); // {task, context} — full-screen task detail
  const [portalSession, setPortalSession] = useState(null);
  const [sessionResult, setSessionResult] = useState("");
  const [skipVAReval, setSkipVAReval] = useState(sf.skipVARevalidation || false);
  const [selectedRevalRow, setSelectedRevalRow] = useState(null); // VA info panel — Revalidation tab
  const [selectedConfRow,  setSelectedConfRow]  = useState(null); // VA info panel — Confirmed tab

  // Derive SCHOLAR lane list and data from skipVAReval flag
  const scholarLanes  = skipVAReval ? ["Confirmed","Sent","QA"] : ["Revalidation","Confirmed","Sent","QA"];
  // When skip is enabled, any rows previously in Revalidation migrate to Confirmed
  const scholarConfirmedRows = skipVAReval
    ? [...SCHOLAR_REVAL.map(r=>({...r})), ...SCHOLAR_CONFIRMED]
    : SCHOLAR_CONFIRMED;
  // Map tab index to lane name for Scholar mode
  const scholarTabName = scholarLanes[activeTab] || "";

  const Tabs = () => {
    const lanes  = sf.mode==="Scholar" ? scholarLanes : sf.lanes;
    const counts = sf.mode==="Scholar"
      ? (skipVAReval
          ? [scholarConfirmedRows.length, 8, 27]
          : [sf.counts[0], scholarConfirmedRows.length, 8, 27])
      : sf.counts;
    return (
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #e5e7eb",marginBottom:20,flexWrap:"wrap"}}>
        {lanes.map((lane,i)=>(
          <button key={i} onClick={()=>setActiveTab(i)}
            style={{padding:"11px 18px",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:activeTab===i?600:400,
              color:activeTab===i?"#b91c1c":"#6b7280",borderBottom:activeTab===i?"2px solid #b91c1c":"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap"}}>
            {lane} <span style={{fontSize:13,color:activeTab===i?"#b91c1c":"#9ca3af"}}>({counts[i]})</span>
          </button>
        ))}
      </div>
    );
  };

  const BulkBar = ({ actions }) => (
    <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
      {actions.map((a,i)=>(
        <button key={i} onClick={a.onClick} style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>{a.label}</button>
      ))}
    </div>
  );

  const renderEmailMode = () => {
    if (activeTab===0) {
      const allQueuedSelected = EMAIL_QUEUED.every((_,i) => selectedRows[`q-${i}`]);
      const toggleAllQueued = () => {
        const next = {};
        if (!allQueuedSelected) EMAIL_QUEUED.forEach((_,i) => { next[`q-${i}`] = true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label:"☑ Select All", onClick: toggleAllQueued},
            {label:`📧 Send (${EMAIL_QUEUED.length})`, onClick:()=>{}}
          ]}/>
          <VOTable
            cols={["☐","CANDIDATE","EMPLOYER","CONTACT","SLA"]}
            rows={EMAIL_QUEUED.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`q-${i}`]} onChange={e=>setSelectedRows(p=>({...p,[`q-${i}`]:e.target.checked}))} style={{cursor:"pointer"}}/></TD>,
              <TD key="n" bold>{r.candidate}</TD>,
              <TD key="e">{r.employer}</TD>,
              <TD key="co" style={{fontSize:13,color:"#6b7280"}}>{r.contact}</TD>,
              <td key="s" style={{padding:"14px 18px"}}><SLABadge val={r.sla} risk={r.slaRisk} breach={r.slaBreach}/></td>,
            ])}
          />
        </>
      );
    }
    if (activeTab===1) {
      const allAwaitingSelected = EMAIL_AWAITING.every((_,i) => selectedRows[`a-${i}`]);
      const toggleAllAwaiting = () => {
        const next = {};
        if (!allAwaitingSelected) EMAIL_AWAITING.forEach((_,i) => { next[`a-${i}`] = true; });
        setSelectedRows(next);
      };
      const selectedAwaitingTasks = EMAIL_AWAITING.filter((_,i) => selectedRows[`a-${i}`]);
      const firstSelected = selectedAwaitingTasks[0];
      return (
        <>
          <BulkBar actions={[
            {label:"☑ Select All",    onClick: toggleAllAwaiting},
            {label:"🔄 Remind",       onClick:()=>setDrawer({type:"remind",  task: firstSelected ? {candidate:firstSelected.candidate, ext:firstSelected.ext} : {candidate:"Selected",ext:"—"}})},
            {label:"📲 Nudge",        onClick:()=>setDrawer({type:"nudge",   task: firstSelected ? {candidate:firstSelected.candidate, ext:firstSelected.ext} : {candidate:"Selected",ext:"—"}})},
            {label:"↩ Pivot",         onClick:()=>setDrawer({type:"pivot",   task:{servform:sf.id}})},
            {label:"↰ Return to CE",  onClick:()=>setDrawer({type:"returnce",task: firstSelected ? {candidate:firstSelected.candidate, ext:firstSelected.ext, servform:sf.id} : {servform:sf.id}})},
          ]}/>
          <VOTable
            cols={["☐","CANDIDATE","EXT. PARTY","DAYS","REMIND","NUDGE","STATUS","ACT."]}
            rows={EMAIL_AWAITING.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`a-${i}`]} onChange={e=>setSelectedRows(p=>({...p,[`a-${i}`]:e.target.checked}))} style={{cursor:"pointer"}}/></TD>,
              <TD key="n" bold>{r.candidate}</TD>,
              <TD key="e">{r.ext}</TD>,
              <td key="d" style={{padding:"14px 18px"}}><SLABadge val={r.days} risk={r.slaRisk} breach={r.slaBreach}/></td>,
              <TD key="r">{r.remind}</TD>,
              <TD key="nu">{r.nudge}</TD>,
              <td key="s" style={{padding:"14px 18px"}}><span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:r.status==="Opened"?"#eff6ff":r.status==="Delivered"?"#f0fdf4":"#f3f4f6",color:r.status==="Opened"?"#3b82f6":r.status==="Delivered"?"#16a34a":"#6b7280"}}>{r.status}</span></td>,
              <td key="a" style={{padding:"14px 18px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>setDrawer({type:"remind",task:{candidate:r.candidate,ext:r.ext}})} style={{padding:"5px 10px",border:"1px solid #3b82f6",borderRadius:6,background:"white",color:"#3b82f6",fontSize:12,fontWeight:500,cursor:"pointer"}}>Remind</button>
                  <button onClick={()=>setDrawer({type:"nudge",task:{candidate:r.candidate,ext:r.ext}})} style={{padding:"5px 10px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>Nudge</button>
                </div>
              </td>
            ])}
          />
          <p style={{fontSize:12,color:"#6b7280",marginTop:10}}>ⓘ Remind = resend to external party. Nudge = message to CANDIDATE to chase up.</p>
        </>
      );
    }
    if (activeTab===2) return ( // Responses (merged Replied + Done)
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>RESPONSES — All received responses. Review each individually before submitting.</p>
        <VOTable
          cols={["#","CANDIDATE","EXT. PARTY","REPLIED","RESPONSE VIA","OUTCOME","ACTION"]}
          rows={[...EMAIL_REPLIED.map((r,i)=>([
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.ext}</TD>,
            <TD key="d">{r.replied}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:r.via==="Secure Link"?"#eff6ff":"#f9fafb",color:r.via==="Secure Link"?"#3b82f6":"#374151"}}>{r.via}</span></td>,
            <td key="o" style={{padding:"14px 18px"}}><span style={{padding:"2px 8px",borderRadius:20,fontSize:12,fontWeight:500,background:"#fef9c3",color:"#854d0e"}}>Pending Review</span></td>,
            <td key="a" style={{padding:"14px 18px"}}>
              <button onClick={()=>setDrawer({type:"submit",task:{candidate:r.candidate,ext:r.ext}})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])), ...EMAIL_DONE.map((r,i)=>([
            <TD key="n">{EMAIL_REPLIED.length+i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.ext}</TD>,
            <TD key="d">{r.completed}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:"#f9fafb",color:"#374151"}}>—</span></td>,
            <td key="o" style={{padding:"14px 18px"}}><OutcomeBadge val={r.outcome}/></td>,
            <td key="a" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ]))]}
        />
      </>
    );
  };

  const renderFieldMode = () => {
    if (activeTab===0) return (
      <>
        <BulkBar actions={[{label:`🚗 Auto-Assign (${FIELD_READY.length})`},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","ADDRESS","STATE","SLA","ACTION"]}
          rows={FIELD_READY.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="a">{r.address}</TD>,
            <TD key="s">{r.state}</TD>,
            <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDrawer({type:"agentselect",task:r})} style={{padding:"5px 12px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:12,fontWeight:500,cursor:"pointer"}}>Offer</button>
                <button onClick={()=>setTaskDetail({task:{...r,sla:r.sla},context:"Field — Ready"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===1) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DISPATCHED — Agent accepted, planning/en route. ⓘ Monitoring only. Agent updates status via mobile app.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","ACCEPTED","STATE","STATUS","ACTION"]}
          rows={FIELD_DISPATCHED.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <TD key="ac">{r.accepted}</TD>,
            <TD key="s">{r.state}</TD>,
            <td key="st" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,background:"#eff6ff",color:"#3b82f6",fontWeight:500}}>{r.status}</span></td>,
            <td key="ac2" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:5},context:"Field — Dispatched"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===2) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>IN PROGRESS — Agent on-site or submitting. Task auto-moves to QA when agent submits evidence.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","LOCATION","STATUS","ACTION"]}
          rows={FIELD_INPROG.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <TD key="l">{r.location}</TD>,
            <td key="s" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,background:r.status==="On-site"?"#dcfce7":"#fef3c7",color:r.status==="On-site"?"#16a34a":"#d97706",fontWeight:500}}>{r.status}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:4},context:"Field — In Progress"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===3) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>QA — Review agent submissions. Each submission is unique — individual review required.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","SUBMITTED","PHOTOS","GPS","ACTION"]}
          rows={FIELD_QA.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <TD key="s">{r.submitted}</TD>,
            <td key="p" style={{padding:"14px 18px"}}><span style={{fontSize:13,fontWeight:500,color:r.photos==="4/4"?"#16a34a":"#d97706"}}>{r.photos}</span></td>,
            <td key="g" style={{padding:"14px 18px"}}><span style={{fontSize:16}}>{r.gps==="ok"?"✅":r.gps==="warn"?"⚠️":"❌"}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <button onClick={()=>setTaskDetail({task:{...r,sla:5},context:"Field — QA"})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===4) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DONE — Completed, submitted for Executive review.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","OUTCOME","COMPLETED","EXEC REVIEW"]}
          rows={FIELD_DONE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <td key="o" style={{padding:"14px 18px"}}><OutcomeBadge val={r.outcome}/></td>,
            <TD key="d">{r.completed}</TD>,
            <td key="ex" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ])}
        />
      </>
    );
  };

  const renderPortalMode = () => {

    if (portalSession) return (
      <div>
        <button onClick={()=>setPortalSession(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
          <ChevronLeft/> Back to Queue
        </button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>PORTAL RUN SESSION</h2>
          <span style={{fontSize:13,color:"#6b7280"}}>Task 1 of {PORTAL_READY.length}</span>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"10px 16px",marginBottom:16,fontSize:13,color:"#374151",display:"flex",gap:24}}>
          <span><b>Candidate:</b> {portalSession.candidate}</span>
          <span><b>Exam:</b> WAEC {portalSession.year}</span>
          <span><b>No:</b> {portalSession.examNo}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CANDIDATE DATA (from batch)</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Name:</b> {portalSession.candidate}</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Exam Year:</b> {portalSession.year}</p>
            <p style={{margin:"0 0 12px",fontSize:13,color:"#374151"}}><b>Exam No:</b> {portalSession.examNo}</p>
            {["Mathematics A1","English B2","Physics B3","Chemistry A1","Biology C4","Geography B2","Agric Science B3","Economics A1","Civic Ed B2"].map((s,i)=>(
              <p key={i} style={{margin:"0 0 3px",fontSize:12,color:"#374151"}}>Subject {i+1}: {s}</p>
            ))}
          </div>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>PORTAL RESULT</p>
            <div style={{background:"#f9fafb",border:"2px dashed #d1d5db",borderRadius:8,padding:"32px 16px",textAlign:"center",marginBottom:16,cursor:"pointer"}}>
              <p style={{margin:"0 0 4px",fontSize:14,color:"#6b7280"}}>Paste screenshot here</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Ctrl+V or drag & drop</p>
            </div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:600,color:"#374151"}}>RESULT</p>
            {["Match","Partial","No Match","Not Found","Portal Error"].map(o=>(
              <label key={o} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                <div onClick={()=>setSessionResult(o)} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${sessionResult===o?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                  {sessionResult===o&&<div style={{width:7,height:7,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {o}
              </label>
            ))}
            <div style={{display:"flex",gap:10,marginTop:16}}>
              <button onClick={()=>setPortalSession(null)} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>✅ Submit</button>
              <button style={{flex:1,padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>⏭ Next</button>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button onClick={()=>setDrawer({type:"returnce",task:{candidate:portalSession.candidate}})} style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>↩ Return to CE</button>
          <button onClick={()=>setDrawer({type:"pivot",task:{candidate:portalSession.candidate}})} style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>🔀 Pivot to WAEC-LETTER</button>
        </div>
      </div>
    );

    if (activeTab===0) return (
      <>
        <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setPortalSession(PORTAL_READY[0])} style={{padding:"10px 20px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}>🚀 Start Batch Run ({PORTAL_READY.length})</button>
          <span style={{fontSize:13,color:"#6b7280"}}>Run portal checks sequentially</span>
        </div>
        <VOTable
          cols={["#","CANDIDATE","EXAM YEAR","EXAM NO","SUBJECTS","SLA","ACTION"]}
          rows={PORTAL_READY.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="y">{r.year}</TD>,
            <TD key="e">{r.examNo}</TD>,
            <TD key="s">{r.subjects}</TD>,
            <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setPortalSession(r)} style={{padding:"5px 12px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:12,fontWeight:500,cursor:"pointer"}}>Run</button>
                <button onClick={()=>setTaskDetail({task:{...r,sla:r.sla},context:"Portal — Ready"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===1) return (
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>PORTAL RUN SESSION</h2>
          <span style={{fontSize:13,color:"#6b7280"}}>Task 1 of {PORTAL_READY.length}</span>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"10px 16px",marginBottom:16,fontSize:13,color:"#374151",display:"flex",gap:24}}>
          <span><b>Candidate:</b> {PORTAL_READY[0].candidate}</span>
          <span><b>Exam:</b> WAEC {PORTAL_READY[0].year}</span>
          <span><b>No:</b> {PORTAL_READY[0].examNo}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CANDIDATE DATA (from batch)</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Name:</b> {PORTAL_READY[0].candidate}</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Exam Year:</b> {PORTAL_READY[0].year}</p>
            <p style={{margin:"0 0 12px",fontSize:13,color:"#374151"}}><b>Exam No:</b> {PORTAL_READY[0].examNo}</p>
            {["Mathematics A1","English B2","Physics B3","Chemistry A1","Biology C4","Geography B2","Agric Science B3","Economics A1","Civic Ed B2"].map((s,i)=>(
              <p key={i} style={{margin:"0 0 3px",fontSize:12,color:"#374151"}}>Subject {i+1}: {s}</p>
            ))}
          </div>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>PORTAL RESULT</p>
            <div style={{background:"#f9fafb",border:"2px dashed #d1d5db",borderRadius:8,padding:"32px 16px",textAlign:"center",marginBottom:16,cursor:"pointer"}}>
              <p style={{margin:"0 0 4px",fontSize:14,color:"#6b7280"}}>Paste screenshot here</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Ctrl+V or drag & drop</p>
            </div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:600,color:"#374151"}}>RESULT</p>
            {["Match","Partial","No Match","Not Found","Portal Error"].map(o=>(
              <label key={o} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                <div style={{width:16,height:16,borderRadius:"50%",border:"2px solid #d1d5db",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}/>
                {o}
              </label>
            ))}
            <p style={{margin:"12px 0 6px",fontSize:12,fontWeight:600,color:"#374151"}}>NOTES</p>
            <textarea placeholder="Optional notes..." style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:60,outline:"none",boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:10,marginTop:12}}>
              <button style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>✅ Submit</button>
              <button style={{flex:1,padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>⏭ Next Candidate</button>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>↩ Return to CE — Portal error / candidate data wrong</button>
          <button style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>🔀 Pivot → Portal down, switch to WAEC-LETTER</button>
        </div>
      </div>
    );
    if (activeTab===2) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>EVIDENCE REVIEW — Verify screenshot + result accuracy before submission.</p>
        <VOTable
          cols={["#","CANDIDATE","EXAM","RESULT","SCREENSHOT","ACTION"]}
          rows={PORTAL_EVIDENCE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.exam}</TD>,
            <td key="r" style={{padding:"14px 18px"}}><OutcomeBadge val={r.result}/></td>,
            <td key="s" style={{padding:"14px 18px"}}><span style={{fontSize:14}}>{r.screenshot==="ok"?"✅ Clear":"⚠️ Blurry"}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                {r.screenshot==="ok"
                  ? <button onClick={()=>setDrawer({type:"submit",task:{candidate:r.candidate}})} style={{padding:"6px 14px",border:"1px solid #16a34a",borderRadius:6,background:"white",color:"#16a34a",fontSize:13,fontWeight:500,cursor:"pointer"}}>Confirm</button>
                  : <button onClick={()=>setTaskDetail({task:{...r,sla:3},context:"Portal — Flag"})} style={{padding:"6px 14px",border:"1px solid #d97706",borderRadius:6,background:"white",color:"#d97706",fontSize:13,fontWeight:500,cursor:"pointer"}}>Redo</button>
                }
                <button onClick={()=>setTaskDetail({task:{...r,sla:3},context:"Portal — Flag"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>Flag →</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===3) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DONE — Completed, submitted for Executive review.</p>
        <VOTable
          cols={["#","CANDIDATE","EXAM","RESULT","COMPLETED","EXEC REVIEW"]}
          rows={PORTAL_DONE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.exam}</TD>,
            <td key="r" style={{padding:"14px 18px"}}><OutcomeBadge val={r.result}/></td>,
            <TD key="d">{r.completed}</TD>,
            <td key="ex" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ])}
        />
      </>
    );
  };

  const renderLetterMode = () => {
    if (activeTab===0) return (
      <>
        <BulkBar actions={[{label:"📧 Send via Email"},{label:"🚗 Dispatch via FE"},{label:"👤 VO Hand Deliver"},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","INSTITUTION","LETTER REF","SLA","ACTION"]}
          rows={LETTER_GENERATED.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <TD key="r">{r.ref}</TD>,
            <td key="s" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDrawer({type:"letterpreview",task:r})} style={{padding:"5px 12px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:12,fontWeight:500,cursor:"pointer"}}>Preview</button>
                <button onClick={()=>setTaskDetail({task:{...r,sla:r.sla},context:"Letter — Generated"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===1) return (
      <>
        <BulkBar actions={[{label:"🔄 Chase >5d"},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","INSTITUTION","VIA","DAYS","CHASES","ACTION"]}
          rows={LETTER_SENT.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:"#f3f4f6",color:"#374151"}}>{r.via}</span></td>,
            <td key="d" style={{padding:"14px 18px"}}><SLABadge val={r.days} risk={r.days>=5} breach={r.days>=8}/></td>,
            <TD key="ch">{r.chases}</TD>,
            <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:r.days},context:"Letter — Sent"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===2) return (
      <>
        <BulkBar actions={[{label:"🔄 Chase for Reply >3d"},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","INSTITUTION","ACK DATE","DAYS SINCE","ACTION"]}
          rows={LETTER_ACKED.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <TD key="a">{r.ackDate}</TD>,
            <td key="d" style={{padding:"14px 18px"}}><SLABadge val={r.daysSince} risk={r.daysSince>=3} breach={r.daysSince>=6}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:r.daysSince},context:"Letter — Acknowledged"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===3) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>REPLY RECEIVED — Review and capture evidence. Each reply is unique — individual review required.</p>
        <VOTable
          cols={["#","CANDIDATE","INSTITUTION","REPLIED","REPLY VIA","ACTION"]}
          rows={LETTER_REPLIED.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <TD key="d">{r.replied}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:"#f3f4f6",color:"#374151"}}>{r.via}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <button onClick={()=>setTaskDetail({task:{...r,sla:5},context:"Letter — Reply"})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===4) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DONE — Completed, submitted for Executive review.</p>
        <VOTable
          cols={["#","CANDIDATE","INSTITUTION","OUTCOME","COMPLETED","EXEC REVIEW"]}
          rows={LETTER_DONE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <td key="o" style={{padding:"14px 18px"}}><OutcomeBadge val={r.outcome}/></td>,
            <TD key="d">{r.completed}</TD>,
            <td key="ex" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ])}
        />
      </>
    );
  };

  const renderScholarMode = () => {
    // — Revalidation tab (only visible when skipVAReval=false) —
    if (scholarTabName==="Revalidation") {
      const allSel = SCHOLAR_REVAL.every((_,i)=>selectedRows[`rv-${i}`]);
      const toggleAll = () => {
        const next = {};
        if (!allSel) SCHOLAR_REVAL.forEach((_,i)=>{ next[`rv-${i}`]=true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label:`📧 Send Revalidation Emails (${SCHOLAR_REVAL.length})`, onClick:()=>{}},
            {label: allSel ? "☑ Deselect All" : "☑ Select All", onClick: toggleAll},
          ]}/>
          <VOTable
            cols={["☐","INSTITUTION","FACULTY","DEPARTMENT","VA","STUDENTS","SLA","→"]}
            rows={SCHOLAR_REVAL.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`rv-${i}`]} onChange={e=>{const n={...selectedRows};e.target.checked?n[`rv-${i}`]=true:delete n[`rv-${i}`];setSelectedRows(n);}} style={{cursor:"pointer"}}/></TD>,
              <TD key="i" bold>{r.inst}</TD>,
              <TD key="f">{r.faculty}</TD>,
              <TD key="d">{r.dept}</TD>,
              <TD key="v">{r.va}</TD>,
              <TD key="s">{r.students}</TD>,
              <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla} risk={r.atRisk}/></td>,
              <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setSelectedRevalRow(r)} style={{padding:"5px 12px",border:"1px solid #7c3aed",borderRadius:6,background:"white",color:"#7c3aed",fontSize:13,cursor:"pointer"}}>VA Info →</button></td>
            ])}
          />
          {selectedRevalRow && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
              <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
                <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
                  <div>
                    <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                    <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedRevalRow.inst} · {selectedRevalRow.dept}</p>
                  </div>
                  <button onClick={()=>setSelectedRevalRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
                </div>
                <div style={{padding:"24px 20px",flex:1}}><VAInfoPanel row={selectedRevalRow}/></div>
              </div>
            </div>
          )}
        </>
      );
    }

    // — Confirmed tab —
    if (scholarTabName==="Confirmed") {
      const rows = scholarConfirmedRows;
      const allSel = rows.every((_,i)=>selectedRows[`cf-${i}`]);
      const toggleAll = () => {
        const next = {};
        if (!allSel) rows.forEach((_,i)=>{ next[`cf-${i}`]=true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label:`📧 Send Verification Requests (${rows.length})`, onClick:()=>{}},
            {label: allSel ? "☑ Deselect All" : "☑ Select All", onClick: toggleAll},
          ]}/>
          <VOTable
            cols={["☐","INSTITUTION","FACULTY","DEPARTMENT","VA","STUDENTS","SLA","ACTION"]}
            rows={rows.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`cf-${i}`]} onChange={e=>{const n={...selectedRows};e.target.checked?n[`cf-${i}`]=true:delete n[`cf-${i}`];setSelectedRows(n);}} style={{cursor:"pointer"}}/></TD>,
              <TD key="i" bold>{r.inst}</TD>,
              <TD key="f">{r.faculty||"—"}</TD>,
              <TD key="d">{r.dept}</TD>,
              <TD key="v">{r.va}</TD>,
              <TD key="s">{r.students}</TD>,
              <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
              <td key="ac" style={{padding:"14px 18px",display:"flex",gap:6}}>
                <button style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"#b91c1c",color:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>Send Request</button>
                <button onClick={()=>setSelectedConfRow(r)} style={{padding:"6px 10px",border:"1px solid #7c3aed",borderRadius:6,background:"white",color:"#7c3aed",fontSize:12,cursor:"pointer"}}>VA</button>
              </td>
            ])}
          />
          {selectedConfRow && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
              <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
                <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
                  <div>
                    <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                    <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedConfRow.inst} · {selectedConfRow.dept}</p>
                  </div>
                  <button onClick={()=>setSelectedConfRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
                </div>
                <div style={{padding:"24px 20px",flex:1}}><VAInfoPanel row={selectedConfRow}/></div>
              </div>
            </div>
          )}
        </>
      );
    }

    // — Sent tab — Pivot + Return to CE live here —
    if (scholarTabName==="Sent") {
      const allSel = SCHOLAR_SENT.every((_,i)=>selectedRows[`st-${i}`]);
      const toggleAll = () => {
        const next = {};
        if (!allSel) SCHOLAR_SENT.forEach((_,i)=>{ next[`st-${i}`]=true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label: allSel ? "☑ Deselect All" : "☑ Select All", onClick: toggleAll},
            {label:"🔄 Remind",       onClick:()=>setDrawer({type:"remind",task:{candidate:"Selected VAs",ext:"Institution"}})},
            {label:"📲 Nudge",        onClick:()=>setDrawer({type:"nudge", task:{candidate:"Selected Students",ext:"Institution"}})},
            {label:"🔀 Pivot",        onClick:()=>setDrawer({type:"pivot",task:{servform:sf.id}})},
            {label:"↩ Return to CE",  onClick:()=>setDrawer({type:"returnce",task:{servform:sf.id}})},
          ]}/>
          <VOTable
            cols={["☐","INSTITUTION","DEPARTMENT","VA","STUDENTS","SENT","DAYS","REMINDS","NUDGES","ACTION"]}
            rows={SCHOLAR_SENT.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`st-${i}`]} onChange={e=>{const n={...selectedRows};e.target.checked?n[`st-${i}`]=true:delete n[`st-${i}`];setSelectedRows(n);}} style={{cursor:"pointer"}}/></TD>,
              <TD key="i" bold>{r.inst}</TD>,
              <TD key="d">{r.dept}</TD>,
              <TD key="v">{r.va}</TD>,
              <TD key="s">{r.students}</TD>,
              <TD key="se">{r.sent}</TD>,
              <td key="days" style={{padding:"14px 18px"}}><SLABadge val={r.days} risk={r.slaRisk} breach={r.slaBreach}/></td>,
              <TD key="r">{r.reminds}</TD>,
              <TD key="nu">{r.nudges}</TD>,
              <td key="ac" style={{padding:"14px 18px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>setDrawer({type:"remind",task:{candidate:r.va,ext:r.inst}})} style={{padding:"5px 10px",border:"1px solid #3b82f6",borderRadius:6,background:"white",color:"#3b82f6",fontSize:12,fontWeight:500,cursor:"pointer"}}>Remind</button>
                  <button onClick={()=>setDrawer({type:"nudge", task:{candidate:"Students",ext:r.va}})} style={{padding:"5px 10px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>Nudge</button>
                </div>
              </td>
            ])}
          />
          <p style={{fontSize:12,color:"#6b7280",marginTop:10}}>ⓘ Remind = resend to VA/HOD. Nudge = message to CANDIDATES to chase their HOD.</p>
        </>
      );
    }

    // — QA tab —
    if (scholarTabName==="QA") return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>QA — Review VA submissions per student. {SCHOLAR_QA.length} students awaiting review.</p>
        <VOTable
          cols={["STUDENT","DEPARTMENT","MATRIC NO","STATUS","RESULT","ACTION"]}
          rows={SCHOLAR_QA.map(r=>[
            <TD key="s" bold>{r.student}</TD>,
            <TD key="d">{r.dept}</TD>,
            <TD key="m">{r.matric}</TD>,
            <td key="st" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:r.status==="Confirmed"?"#dcfce7":r.status==="Discrepancy"?"#fef3c7":"#fee2e2",color:r.status==="Confirmed"?"#16a34a":r.status==="Discrepancy"?"#d97706":"#b91c1c"}}>{r.status}</span></td>,
            <TD key="r">{r.result}</TD>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <button onClick={()=>setDrawer({type:"submit",task:{candidate:r.student,ext:"Scholar VA"}})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])}
        />
      </>
    );
  };

  const renderContent = () => {
    if (sf.mode==="Email")   return renderEmailMode();
    if (sf.mode==="Field")   return renderFieldMode();
    if (sf.mode==="Portal")  return renderPortalMode();
    if (sf.mode==="Letter")  return renderLetterMode();
    if (sf.mode==="Scholar") return renderScholarMode();
    return <p style={{color:"#9ca3af"}}>Mode not yet implemented.</p>;
  };

  // ── Task Detail full-screen view ──────────────────────────────────────────
  const renderTaskDetail = () => {
    const { task, context } = taskDetail;
    const TRow = ({label,value}) => (
      <div style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
        <span style={{minWidth:160,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
        <span style={{fontSize:13,color:"#111827",fontWeight:500}}>{value||"—"}</span>
      </div>
    );
    const Section = ({title,children}) => (
      <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px",marginBottom:12}}>
        <p style={{margin:"0 0 12px",fontSize:11,fontWeight:700,color:"#374151",letterSpacing:.6,textTransform:"uppercase"}}>{title}</p>
        {children}
      </div>
    );
    const slaColor = task.sla<=2?"#b91c1c":task.sla<=4?"#d97706":"#16a34a";
    return (
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        <button onClick={()=>setTaskDetail(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
          <ChevronLeft/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:20,fontWeight:700,color:"#111827"}}>{task.candidate}</h1>
            <span style={{fontSize:13,color:"#6b7280"}}>{sf.id} · {context}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:task.sla<=2?"#fef2f2":task.sla<=4?"#fffbeb":"#f0fdf4",borderRadius:8,border:`1px solid ${task.sla<=2?"#fecaca":task.sla<=4?"#fde68a":"#bbf7d0"}`}}>
            <span style={{fontSize:12,fontWeight:600,color:slaColor}}>SLA: {task.sla}d remaining</span>
          </div>
        </div>

        <Section title="Candidate Info">
          <TRow label="Candidate" value={task.candidate}/>
          <TRow label="External Party" value={task.ext||task.institution||task.agent||"—"}/>
          {task.address && <TRow label="Address" value={task.address}/>}
          {task.state   && <TRow label="State" value={task.state}/>}
          {task.landmark && <TRow label="Landmark" value={task.landmark||"Not provided"}/>}
        </Section>

        {/* Context-specific sections */}
        {context==="Field — Ready" && (
          <Section title="Field Details">
            <TRow label="Address" value={task.address}/>
            <TRow label="State" value={task.state}/>
            <TRow label="Landmark" value="Opposite First Bank (demo)"/>
            <TRow label="Documents" value="NIN Slip, Utility Bill"/>
          </Section>
        )}
        {context==="Field — Dispatched" && (
          <Section title="Agent Profile">
            <TRow label="Agent" value={task.agent}/>
            <TRow label="Contact" value="+234 812 000 0001 (demo)"/>
            <TRow label="Acceptance Rate" value="94%"/>
            <TRow label="Est. Visit Time" value="Within 24 hrs"/>
            <TRow label="Status" value={task.status}/>
            <TRow label="Task Brief" value="Address verification — confirm residency, photograph premises"/>
          </Section>
        )}
        {context==="Field — In Progress" && (
          <Section title="Live Agent Status">
            <TRow label="Agent" value={task.agent}/>
            <TRow label="Location" value={task.location}/>
            <TRow label="Status" value={task.status}/>
            <TRow label="GPS" value="🟢 Live tracking active (demo)"/>
            <TRow label="Photos Uploaded" value="2 / 4"/>
            <TRow label="Agent Notes" value="On-site. Resident confirmed present."/>
          </Section>
        )}
        {context==="Field — QA" && (<>
          <Section title="Submission Evidence">
            <TRow label="Agent" value={task.agent}/>
            <TRow label="Submitted" value={task.submitted}/>
            <TRow label="Photos" value={task.photos}/>
            <TRow label="GPS Status" value={task.gps==="ok"?"✅ Verified":task.gps==="warn"?"⚠️ Weak signal — review required":"❌ Not captured"}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
              {["📷 Photo_1.jpg","📷 Photo_2.jpg","📷 Photo_3.jpg","📷 Photo_4.jpg"].map((p,i)=>(
                <div key={i} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"28px 12px",textAlign:"center",fontSize:12,color:"#6b7280",cursor:"pointer"}}>
                  {p}<br/><span style={{fontSize:11,color:"#9ca3af"}}>Tap to enlarge</span>
                </div>
              ))}
            </div>
          </Section>
          <Section title="GPS Trail">
            <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"16px",marginBottom:12,textAlign:"center",color:"#15803d",fontSize:13}}>
              🗺 GPS trail: Agent checked in at {task.location||"target address"} at 10:42 AM · Departed 11:18 AM
            </div>
            <TRow label="Lat / Long" value="6.5244° N, 3.3792° E (demo)"/>
            <TRow label="On-site Duration" value="36 minutes"/>
          </Section>
          <Section title="Agent Notes & Attestation">
            <TRow label="Agent Notes" value="Property confirmed. Resident present and cooperative. Utility bill sighted."/>
            <TRow label="Neighbour Attestation" value="✅ Confirmed by neighbour (Mrs. Adaeze — Flat 2B)"/>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              <button onClick={()=>setDrawer({type:"submit",task})} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>✅ Approve Submission</button>
              <button onClick={()=>setDrawer({type:"returnce",task})} style={{padding:"10px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,cursor:"pointer"}}>↩ Return to CE</button>
            </div>
          </Section>
        </>)}
        {context==="Portal — Ready" && (
          <Section title="Exam Details">
            <TRow label="Exam Year" value={task.year}/>
            <TRow label="Exam Number" value={task.examNo}/>
            <TRow label="Subjects" value={`${task.subjects} subjects`}/>
          </Section>
        )}
        {context==="Portal — Flag" && (
          <Section title="Evidence Review">
            <TRow label="Exam" value={task.exam}/>
            <TRow label="Result" value={task.result}/>
            <TRow label="Screenshot" value={task.screenshot==="ok"?"✅ Clear":"⚠️ Blurry — needs re-run"}/>
            <div style={{marginTop:12}}>
              <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>DISCREPANCY NOTES</label>
              <textarea placeholder="Describe the discrepancy..." style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:70,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <button onClick={()=>setTaskDetail(null)} style={{marginTop:12,padding:"9px 20px",border:"1px solid #d97706",borderRadius:8,background:"white",color:"#d97706",fontSize:13,fontWeight:600,cursor:"pointer"}}>🚩 Flag & Save</button>
          </Section>
        )}
        {context==="Letter — Generated" && (
          <Section title="Letter Details">
            <TRow label="Institution" value={task.institution}/>
            <TRow label="Letter Ref" value={task.ref}/>
            <TRow label="SLA" value={`${task.sla} days`}/>
            <div style={{marginTop:12,padding:"12px 16px",background:"#fafafa",borderRadius:8,border:"1px solid #e5e7eb"}}>
              <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#374151"}}>Edit before dispatch</p>
              <textarea defaultValue="Dear Sir/Madam,\n\nWe write to verify the employment records of the above-named individual..." style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:12,resize:"vertical",minHeight:100,outline:"none",boxSizing:"border-box",fontFamily:"monospace"}}/>
            </div>
          </Section>
        )}
        {context==="Letter — Sent" && (
          <Section title="Delivery & Chase">
            <TRow label="Institution" value={task.institution}/>
            <TRow label="Via" value={task.via}/>
            <TRow label="Days Waiting" value={`${task.days} days`}/>
            <TRow label="Chases Sent" value={task.chases}/>
            <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
              <button onClick={()=>setTaskDetail(null)} style={{padding:"9px 18px",border:"1px solid #3b82f6",borderRadius:8,background:"white",color:"#3b82f6",fontSize:13,fontWeight:500,cursor:"pointer"}}>🔄 Chase Now</button>
              <button onClick={()=>setDrawer({type:"returnce",task})} style={{padding:"9px 18px",border:"1px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,cursor:"pointer"}}>↩ Return to CE</button>
            </div>
          </Section>
        )}
        {context==="Letter — Acknowledged" && (
          <Section title="Acknowledgment">
            <TRow label="Institution" value={task.institution}/>
            <TRow label="Acknowledged" value={task.ackDate}/>
            <TRow label="Days Since Ack" value={`${task.daysSince} days`}/>
            <TRow label="Chase History" value="1 chase sent (demo)"/>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              <button onClick={()=>setTaskDetail(null)} style={{padding:"9px 18px",border:"1px solid #3b82f6",borderRadius:8,background:"white",color:"#3b82f6",fontSize:13,fontWeight:500,cursor:"pointer"}}>🔄 Chase for Reply</button>
            </div>
          </Section>
        )}
        {context==="Letter — Reply" && (
          <>
            <Section title="Reply Received">
              <TRow label="Institution" value={task.institution}/>
              <TRow label="Replied" value={task.replied}/>
              <TRow label="Via" value={task.via}/>
            </Section>
            <Section title="Evidence & Actions">
              <div style={{background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:13,color:"#374151"}}>📄 Institution_Response_{task.candidate?.split(" ")[0]}.pdf</span>
                <button style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>View</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button onClick={()=>setDrawer({type:"submit",task})} style={{padding:"11px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>✅ Accept as Evidence → Done</button>
                <button onClick={()=>setDrawer({type:"submit",task})} style={{padding:"11px",border:"1.5px solid #d97706",borderRadius:8,background:"white",color:"#d97706",fontSize:14,fontWeight:600,cursor:"pointer"}}>🚩 Flag Discrepancy → Done (flagged)</button>
                <button onClick={()=>setTaskDetail(null)} style={{padding:"11px",border:"1.5px solid #3b82f6",borderRadius:8,background:"white",color:"#3b82f6",fontSize:14,fontWeight:600,cursor:"pointer"}}>📧 Request More Info → Sent</button>
                <button onClick={()=>setDrawer({type:"returnce",task})} style={{padding:"11px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer"}}>↩ Return to CE</button>
              </div>
            </Section>
          </>
        )}

        <Section title="Activity Timeline">
          {["Task created","NIN verified","Batch dispatched","VO assigned","Task opened"].map((e,i)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:8,marginBottom:8,borderBottom:i<4?"1px solid #f3f4f6":"none"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c",flexShrink:0,marginTop:5}}/>
              <span style={{fontSize:13,color:"#374151"}}>{e}</span>
            </div>
          ))}
        </Section>

        <Section title="Documents">
          {["NIN_Slip.pdf","Candidate_Consent.pdf","Supporting_Doc.pdf"].map((d,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:i<2?"1px solid #f3f4f6":"none"}}>
              <span style={{fontSize:13,color:"#374151"}}>📄 {d}</span>
              <button style={{padding:"4px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>View</button>
            </div>
          ))}
        </Section>
      </div>
    );
  };

  const modeBadgeColor = { Email:"#eff6ff", Letter:"#fef3c7", Field:"#dcfce7", Portal:"#f0fdf4", Scholar:"#f5f3ff" };
  const modeTxtColor   = { Email:"#3b82f6", Letter:"#d97706", Field:"#16a34a", Portal:"#059669", Scholar:"#7c3aed" };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Full-screen Task Detail — replaces workboard content */}
      {taskDetail && renderTaskDetail()}
      {!taskDetail && (<>
      {/* Header */}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> All ServModes
      </button>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{sf.id}</h1>
          <span style={{padding:"4px 12px",borderRadius:20,fontSize:13,fontWeight:500,background:modeBadgeColor[sf.mode],color:modeTxtColor[sf.mode]}}>{sf.mode}</span>
        </div>
      </div>
      {/* Stats row */}
      <div style={{display:"flex",gap:12,marginBottom:20}}>
        {[["Total Tasks",sf.tasks,"#111827"],["Active",sf.active,"#16a34a"],["Awaiting",sf.awaiting,"#d97706"],["At Risk",sf.atRisk,"#b91c1c"]].map(([k,v,c])=>(
          <div key={k} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 20px",minWidth:100}}>
            <p style={{margin:"0 0 4px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.4}}>{k.toUpperCase()}</p>
            <p style={{margin:0,fontSize:22,fontWeight:700,color:c}}>{v}</p>
          </div>
        ))}
      </div>
      <Tabs/>
      {renderContent()}

      {/* Drawers */}
      {drawer?.type==="pivot"       && <PivotDrawer      task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="returnce"    && <ReturnToCEDrawer  task={drawer.task} onClose={()=>setDrawer(null)} onSent={onReturnToCE}/>}
      {drawer?.type==="nudge"       && <NudgeDrawer       task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="remind"      && <RemindDrawer      task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="submit"      && <SubmitDrawer      task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="agentselect" && <AgentSelectDrawer task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="letterpreview"&&<LetterPreviewDrawer task={drawer.task} onClose={()=>setDrawer(null)}/>}
      </>)}
    </div>
  );
}

// ─── VO Settings ─────────────────────────────────────────────────────────────
function VOSettings({ user }) {
  const [settingsTab, setSettingsTab] = useState("Personal");
  const [density, setDensity]         = useState("Comfortable");
  const [theme, setTheme]             = useState("Light");
  const [highContrast, setHighContrast] = useState(false);
  const [timezone, setTimezone]       = useState("Africa/Lagos (WAT)");
  const [notif, setNotif]             = useState({ email:true, sms:false, push:true });
  const [alerts, setAlerts]           = useState({ sla:true, discrepancy:true, system:false });
  const [fontSize, setFontSize]       = useState("Small");
  const [access, setAccess]           = useState({ focusIndicators:true, skipLinks:true, enhancedDesc:true, announcePages:true });

  const Radio = ({ val, cur, set }) => (
    <div onClick={() => set(val)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${cur===val?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",background:"white",flexShrink:0}}>
        {cur===val && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      <span style={{fontSize:14,color:"#374151"}}>{val}</span>
    </div>
  );

  const Checkbox = ({ checked, onChange, label, desc }) => (
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid #f3f4f6"}}>
      <div style={{paddingRight:16}}>
        <p style={{margin:"0 0 2px",fontSize:14,fontWeight:500,color:"#111827"}}>{label}</p>
        {desc && <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{desc}</p>}
      </div>
      <div onClick={onChange} style={{width:20,height:20,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,marginTop:1}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="12" height="12"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
    </div>
  );

  const SETTINGS_TABS = [
    { label:"Personal",      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
    { label:"Notifications", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg> },
    { label:"Accessibility", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg> },
  ];

  const renderContent = () => {
    if (settingsTab === "Personal") return (
      <div>
        <h2 style={{margin:"0 0 20px",fontSize:18,fontWeight:700,color:"#111827"}}>Display Preferences</h2>
        <div style={{marginBottom:22}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:500,color:"#374151"}}>Interface Density</p>
          <div style={{display:"flex",gap:28}}>{["Compact","Comfortable","Spacious"].map(d=><Radio key={d} val={d} cur={density} set={setDensity}/>)}</div>
        </div>
        <div style={{marginBottom:22}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:500,color:"#374151"}}>Theme</p>
          <div style={{display:"flex",gap:28}}>{["Light","Dark","System"].map(t=><Radio key={t} val={t} cur={theme} set={setTheme}/>)}</div>
        </div>
        <div style={{marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setHighContrast(p=>!p)}>
            <div style={{width:18,height:18,borderRadius:3,border:`2px solid ${highContrast?"#b91c1c":"#d1d5db"}`,background:highContrast?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {highContrast && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <span style={{fontSize:14,fontWeight:500,color:"#374151"}}>High contrast mode</span>
          </div>
          <p style={{margin:"4px 0 0 28px",fontSize:13,color:"#6b7280"}}>Improves visibility for users with visual impairments</p>
        </div>
        <div style={{borderTop:"1px solid #e5e7eb",marginTop:24,paddingTop:24}}>
          <h2 style={{margin:"0 0 16px",fontSize:18,fontWeight:700,color:"#111827"}}>Regional Settings</h2>
          <p style={{margin:"0 0 8px",fontSize:14,fontWeight:500,color:"#374151"}}>Timezone</p>
          <div style={{position:"relative",maxWidth:340}}>
            <select value={timezone} onChange={e=>setTimezone(e.target.value)}
              style={{width:"100%",padding:"10px 36px 10px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,color:"#374151",background:"white",outline:"none",appearance:"none",cursor:"pointer"}}>
              <option>Africa/Lagos (WAT)</option>
              <option>Africa/Abuja (WAT)</option>
              <option>UTC</option>
              <option>Europe/London (GMT)</option>
            </select>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
          </div>
        </div>
      </div>
    );
    if (settingsTab === "Notifications") return (
      <div>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Notification Channels</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={notif.email}  onChange={()=>setNotif(p=>({...p,email:!p.email}))}  label="Email Notifications"  desc="Receive notifications via email"/>
        <Checkbox checked={notif.sms}    onChange={()=>setNotif(p=>({...p,sms:!p.sms}))}      label="SMS Notifications"    desc="Receive critical alerts via SMS"/>
        <Checkbox checked={notif.push}   onChange={()=>setNotif(p=>({...p,push:!p.push}))}    label="Push Notifications"   desc="Browser push notifications"/>
        <h2 style={{margin:"24px 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Alert Types</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={alerts.sla}         onChange={()=>setAlerts(p=>({...p,sla:!p.sla}))}               label="SLA Alerts"         desc="Notifications when cases approach SLA deadlines"/>
        <Checkbox checked={alerts.discrepancy} onChange={()=>setAlerts(p=>({...p,discrepancy:!p.discrepancy}))} label="Discrepancy Alerts" desc="Notifications when discrepancies are flagged"/>
        <Checkbox checked={alerts.system}      onChange={()=>setAlerts(p=>({...p,system:!p.system}))}           label="System Updates"     desc="Notifications about system maintenance and updates"/>
      </div>
    );
    if (settingsTab === "Accessibility") return (
      <div>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Visual Accessibility</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={highContrast} onChange={()=>setHighContrast(p=>!p)} label="High Contrast Mode" desc="Increases contrast for better visibility"/>
        <div style={{padding:"14px 0",borderBottom:"1px solid #f3f4f6",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:14,fontWeight:500,color:"#111827"}}>Font Size</p>
          <div style={{position:"relative",maxWidth:240}}>
            <select value={fontSize} onChange={e=>setFontSize(e.target.value)}
              style={{width:"100%",padding:"10px 36px 10px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,color:"#374151",background:"white",outline:"none",appearance:"none",cursor:"pointer"}}>
              {["Small","Medium","Large"].map(s=><option key={s}>{s}</option>)}
            </select>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
          </div>
        </div>
        <h2 style={{margin:"24px 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Keyboard Navigation</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={access.focusIndicators} onChange={()=>setAccess(p=>({...p,focusIndicators:!p.focusIndicators}))} label="Enhanced Focus Indicators" desc="More visible focus outlines for keyboard navigation"/>
        <Checkbox checked={access.skipLinks}       onChange={()=>setAccess(p=>({...p,skipLinks:!p.skipLinks}))}             label="Skip Links"               desc="Show skip navigation links"/>
        <h2 style={{margin:"24px 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Screen Reader</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={access.enhancedDesc}  onChange={()=>setAccess(p=>({...p,enhancedDesc:!p.enhancedDesc}))}   label="Enhanced Descriptions" desc="More detailed aria-labels and descriptions"/>
        <Checkbox checked={access.announcePages} onChange={()=>setAccess(p=>({...p,announcePages:!p.announcePages}))} label="Announce Page Changes"  desc="Announce when navigating between pages"/>
      </div>
    );
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <span style={{color:"#9ca3af"}}>›</span>
        <span style={{color:"#374151",fontWeight:500}}>Settings</span>
      </div>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Settings</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>Manage your preferences and account settings</p>
        </div>
        <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.background="#991b1b"}
          onMouseLeave={e=>e.currentTarget.style.background="#b91c1c"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save Changes
        </button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:16,alignItems:"start"}}>
        {/* Left nav */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          {SETTINGS_TABS.map(t => (
            <button key={t.label} onClick={()=>setSettingsTab(t.label)}
              style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"13px 16px",border:"none",cursor:"pointer",fontSize:14,fontWeight:settingsTab===t.label?600:400,
                background:settingsTab===t.label?"#b91c1c":"white",
                color:settingsTab===t.label?"white":"#374151",
                textAlign:"left",borderBottom:"1px solid #f3f4f6"}}>
              <span style={{opacity:.8}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        {/* Content panel */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px"}}>
          {renderContent()}
        </div>
      </div>

      {/* Profile card at bottom */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px",marginTop:16,display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:16,flexShrink:0}}>
          {user?.initials || "M"}
        </div>
        <div>
          <p style={{margin:"0 0 2px",fontSize:15,fontWeight:600,color:"#111827"}}>{user?.name || "Mike Obi"}</p>
          <p style={{margin:"0 0 2px",fontSize:13,color:"#6b7280"}}>m.obi@dragnet.com</p>
          <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Current Role: Verification Officer</p>
        </div>
      </div>

      {/* ── VA Info Panel — Revalidation tab (item 13, read-only) ───────────── */}
      {selectedRevalRow && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
          <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
              <div>
                <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedRevalRow.inst} · {selectedRevalRow.dept}</p>
              </div>
              <button onClick={()=>setSelectedRevalRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{padding:"24px 20px",flex:1}}>
              <VAInfoPanel row={selectedRevalRow}/>
            </div>
          </div>
        </div>
      )}

      {/* ── VA Info Panel — Confirmed tab (item 13, read-only) ──────────────── */}
      {selectedConfRow && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
          <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
              <div>
                <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedConfRow.inst} · {selectedConfRow.dept}</p>
              </div>
              <button onClick={()=>setSelectedConfRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{padding:"24px 20px",flex:1}}>
              <VAInfoPanel row={selectedConfRow}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VO Help ──────────────────────────────────────────────────────────────────
function VOHelp() {
  const [helpTab, setHelpTab]       = useState("Quick Guide");
  const [helpSearch, setHelpSearch] = useState("");

  const GUIDE_SECTIONS = [
    { title:"Getting Started",  desc:"Learn the basics of VeriPort and how to navigate the platform",
      items:["Understanding the dashboard","Navigating between modules","Using the global search","Switching user roles (for testing)"] },
    { title:"Case Management",  desc:"How to manage verification cases and workflows",
      items:["Creating new cases","Uploading evidence","Managing SLA timelines","Handling discrepancies"] },
    { title:"Batch Processing", desc:"Working with job orders and batch verification",
      items:["Creating job orders","Managing candidate lists","Tracking batch progress","Generating final reports"] },
    { title:"Communications",   desc:"Using templates and managing communications",
      items:["Creating message templates","Sending verification requests","Tracking message status","Managing responses"] },
  ];

  const SHORTCUTS = [
    {key:"Ctrl+K", desc:"Open global search"},
    {key:"R",      desc:"Remind external party"},
    {key:"N",      desc:"Nudge candidate"},
    {key:"P",      desc:"Pivot ServMode"},
    {key:"C",      desc:"Return to CE"},
    {key:"S",      desc:"Submit / Send"},
    {key:"→",      desc:"Next task in batch"},
    {key:"←",      desc:"Previous task in batch"},
    {key:"Esc",    desc:"Close drawer / modal"},
  ];

  const filtered = GUIDE_SECTIONS.map(s => ({
    ...s,
    items: helpSearch === ""
      ? s.items
      : s.items.filter(i => i.toLowerCase().includes(helpSearch.toLowerCase()) || s.title.toLowerCase().includes(helpSearch.toLowerCase()))
  })).filter(s => s.items.length > 0);

  const HELP_TABS = [
    { label:"Quick Guide",        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
    { label:"Keyboard Shortcuts", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg> },
    { label:"System Info",        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg> },
  ];

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <span style={{color:"#9ca3af"}}>›</span>
        <span style={{color:"#374151",fontWeight:500}}>Help</span>
      </div>
      <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Help &amp; Support</h1>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Get help with VeriPort and access documentation</p>

      {/* Tabs */}
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #e5e7eb",marginBottom:20}}>
        {HELP_TABS.map(t => (
          <button key={t.label} onClick={()=>setHelpTab(t.label)}
            style={{display:"flex",alignItems:"center",gap:7,padding:"11px 18px",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:helpTab===t.label?600:400,
              color:helpTab===t.label?"#b91c1c":"#6b7280",
              borderBottom:helpTab===t.label?"2px solid #b91c1c":"2px solid transparent",
              marginBottom:-1,whiteSpace:"nowrap"}}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Quick Guide */}
      {helpTab === "Quick Guide" && (
        <>
          <div style={{position:"relative",marginBottom:20}}>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </span>
            <input value={helpSearch} onChange={e=>setHelpSearch(e.target.value)} placeholder="Search help topics..."
              style={{width:"100%",padding:"12px 14px 12px 42px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {(helpSearch ? filtered : GUIDE_SECTIONS).map((s,si) => (
              <div key={si} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
                <h3 style={{margin:"0 0 4px",fontSize:17,fontWeight:700,color:"#111827"}}>{s.title}</h3>
                <p style={{margin:"0 0 14px",fontSize:13,color:"#6b7280"}}>{s.desc}</p>
                {s.items.map((item,ii) => (
                  <div key={ii} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",
                    borderTop:ii>0?"1px solid #f3f4f6":"none",cursor:"pointer",color:"#374151",fontSize:14}}
                    onMouseEnter={e=>e.currentTarget.style.color="#b91c1c"}
                    onMouseLeave={e=>e.currentTarget.style.color="#374151"}>
                    <span style={{color:"#9ca3af",fontSize:15,fontWeight:600}}>›</span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Keyboard Shortcuts */}
      {helpTab === "Keyboard Shortcuts" && (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <div style={{padding:"16px 24px",borderBottom:"1px solid #e5e7eb"}}>
            <h3 style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:"#111827"}}>Keyboard Shortcuts</h3>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Power-user shortcuts for faster workflow in the workboard.</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"11px 24px",textAlign:"left",fontSize:12,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>SHORTCUT</th>
              <th style={{padding:"11px 24px",textAlign:"left",fontSize:12,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>ACTION</th>
            </tr></thead>
            <tbody>
              {SHORTCUTS.map((s,i) => (
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 24px"}}>
                    <kbd style={{display:"inline-block",padding:"3px 10px",background:"#f3f4f6",border:"1px solid #d1d5db",borderRadius:5,fontSize:13,fontWeight:600,color:"#374151",fontFamily:"monospace"}}>{s.key}</kbd>
                  </td>
                  <td style={{padding:"13px 24px",fontSize:14,color:"#374151"}}>{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* System Info */}
      {helpTab === "System Info" && (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px"}}>
          <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#111827"}}>System Information</h3>
          {[
            ["Platform",             "VeriPort Enterprise v5.0"],
            ["Environment",          "Production"],
            ["User",                 "Mike Obi (m.obi@dragnet.com)"],
            ["Role",                 "Verification Officer"],
            ["ServModes Assigned",   "7"],
            ["Browser",              "Chrome / WebKit"],
            ["Last Login",           "Feb 4, 2026 — 08:14 WAT"],
            ["Support Email",        "support@dragnet.ng"],
          ].map(([k,v],i) => (
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 0",borderBottom:"1px solid #f3f4f6",fontSize:14}}>
              <span style={{color:"#6b7280",fontWeight:500}}>{k}</span>
              <span style={{color:"#111827",fontWeight:500}}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── VO Shell ─────────────────────────────────────────────────────────────────
function VOShell({ user, activeProfile, onSwitchProfile, onSignOut, onReturnToCE }) {
  const [activeNav, setActiveNav]       = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [selectedSF, setSelectedSF]     = useState(null);

  const totalTasks   = VO_SERVMODES.reduce((a,s)=>a+s.tasks,0);
  const totalAtRisk  = VO_SERVMODES.reduce((a,s)=>a+s.atRisk,0);
  const urgentTasks = [
    { id:"TASK-2024-10-00245", service:"Employment Reference Verification", candidate:"Jane Smith", status:"Route 1 - Email (Day 8)", sla:"Due in 1 day", slaColor:"#b91c1c" },
    { id:"TASK-2024-10-00123", service:"Employment Reference Verification", candidate:"Sarah Ahmed", status:"Route 1 - Email (Day 6)", sla:"Due in 2 days", slaColor:"#d97706" },
  ];

  const VONav = [
    { label:"Dashboard",    d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { label:"My ServModes", d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" },
    { label:"My Tasks",     d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label:"Task Queues",  d:"M4 6h16M4 10h16M4 14h16M4 18h16" },
    { label:"Settings",     d:"M12 15a3 3 0 100-6 3 3 0 000 6z" },
    { label:"Help",         d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 8v4M12 16h.01" },
  ];

  const renderContent = () => {
    // If a ServMode is selected, show its workboard
    if (selectedSF) return <VOWorkboard sf={selectedSF} onBack={()=>setSelectedSF(null)} onReturnToCE={onReturnToCE}/>;

    if (activeNav==="Dashboard" || activeNav==="My ServModes") return (
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        {activeNav==="Dashboard" && (
          <>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div>
                <h1 style={{margin:"0 0 2px",fontSize:24,fontWeight:700,color:"#111827"}}>VERIPORT OFFICER</h1>
                <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Tuesday, Feb 4, 2026 — Good morning, Mike</p>
              </div>
            </div>

            {/* My Workload summary */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:20}}>
              <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>MY WORKLOAD</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {[
                  {label:"Assigned",    val:0,         icon:"📋", color:"#374151",  bg:"#f9fafb" },
                  {label:"In Progress", val:3,         icon:"🕐", color:"#3b82f6",  bg:"#eff6ff" },
                  {label:"Overdue",     val:0,         icon:"⚠️",  color:"#b91c1c",  bg:"#fef2f2" },
                  {label:"At Risk",     val:totalAtRisk,icon:"🔔",color:"#d97706",  bg:"#fffbeb" },
                ].map(s=>(
                  <div key={s.label} style={{background:s.bg,borderRadius:10,padding:"16px",textAlign:"center"}}>
                    <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
                    <p style={{margin:"0 0 2px",fontSize:26,fontWeight:700,color:s.color}}>{s.val}</p>
                    <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent attention */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:20}}>
              <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#b91c1c",letterSpacing:.5}}>⚠️ URGENT ATTENTION ({urgentTasks.length})</p>
              {urgentTasks.map((t,i)=>(
                <div key={i} style={{borderRadius:10,border:"1px solid #fecaca",background:"#fef2f2",padding:"14px 16px",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
                    <div>
                      <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:"#111827"}}>● {t.id}</p>
                      <p style={{margin:"0 0 2px",fontSize:13,color:"#374151"}}>{t.service} — {t.candidate}</p>
                      <p style={{margin:"0 0 8px",fontSize:12,color:"#6b7280"}}>Status: {t.status}</p>
                      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:600,color:t.slaColor}}>SLA: {t.sla}</p>
                      <div style={{display:"flex",gap:8}}>
                        <button style={{padding:"7px 16px",border:"none",borderRadius:6,background:"#1d4ed8",color:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>Make Phone Call</button>
                        <button style={{padding:"7px 16px",border:"none",borderRadius:6,background:"#d97706",color:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>Escalate</button>
                        <button style={{padding:"7px 16px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>View Task</button>
                      </div>
                    </div>
                    <div style={{width:12,height:12,borderRadius:"50%",background:"#fecaca",border:"2px solid #b91c1c",flexShrink:0}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick ServModes access */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>MY SERVMODES</p>
                <span style={{fontSize:12,color:"#6b7280"}}>Total: {totalTasks} tasks · At Risk: {totalAtRisk}</span>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  {["SERVMODE","MODE","TASKS","ACTIVE / AWAITING","AT RISK",""].map((h,i)=><th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {VO_SERVMODES.map((sf,i)=>{
                    const modeBg = {Email:"#eff6ff",Letter:"#fef3c7",Field:"#dcfce7",Portal:"#f0fdf4",Scholar:"#f5f3ff"}[sf.mode]||"#f3f4f6";
                    const modeTx = {Email:"#3b82f6",Letter:"#d97706",Field:"#16a34a",Portal:"#059669",Scholar:"#7c3aed"}[sf.mode]||"#374151";
                    return (
                      <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:sf.atRisk>0?"#fffbeb":"white"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                        onMouseLeave={e=>e.currentTarget.style.background=sf.atRisk>0?"#fffbeb":"white"}
                        onClick={()=>{setSelectedSF(sf);setActiveNav("My ServModes");}}>
                        <td style={{padding:"13px 16px",fontWeight:600,fontSize:14,color:"#111827"}}>{sf.id}</td>
                        <td style={{padding:"13px 16px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:modeBg,color:modeTx}}>{sf.mode}</span></td>
                        <td style={{padding:"13px 16px",fontSize:14,color:"#374151"}}>{sf.tasks}</td>
                        <td style={{padding:"13px 16px",fontSize:14,color:"#374151"}}>{sf.active} / {sf.awaiting}</td>
                        <td style={{padding:"13px 16px"}}>
                          {sf.atRisk>0 ? <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:"#fef2f2",color:"#b91c1c"}}>{sf.atRisk} at risk</span>
                          : <span style={{fontSize:13,color:"#6b7280"}}>—</span>}
                        </td>
                        <td style={{padding:"13px 16px",color:"#9ca3af"}}><ChevronRight/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{borderTop:"1px solid #f3f4f6",padding:"12px 16px",display:"flex",gap:24,fontSize:13,color:"#6b7280"}}>
                <span>Total Tasks: <b style={{color:"#111827"}}>{totalTasks}</b></span>
                <span>At Risk: <b style={{color:"#b91c1c"}}>{totalAtRisk}</b></span>
                <span>Late: <b style={{color:"#b91c1c"}}>0</b></span>
              </div>
            </div>
          </>
        )}

        {activeNav==="My ServModes" && !selectedSF && (
          <>
            <h1 style={{margin:"0 0 20px",fontSize:22,fontWeight:700,color:"#111827"}}>MY SERVMODES</h1>
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  {["SERVMODE","SERVICE","MODE","TASKS","ACTIVE / AWAITING","AT RISK",""].map((h,i)=><th key={i} style={{padding:"11px 18px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {VO_SERVMODES.map((sf,i)=>{
                    const modeBg = {Email:"#eff6ff",Letter:"#fef3c7",Field:"#dcfce7",Portal:"#f0fdf4",Scholar:"#f5f3ff"}[sf.mode]||"#f3f4f6";
                    const modeTx = {Email:"#3b82f6",Letter:"#d97706",Field:"#16a34a",Portal:"#059669",Scholar:"#7c3aed"}[sf.mode]||"#374151";
                    return (
                      <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:sf.atRisk>0?"#fffbeb":"white"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                        onMouseLeave={e=>e.currentTarget.style.background=sf.atRisk>0?"#fffbeb":"white"}
                        onClick={()=>setSelectedSF(sf)}>
                        <td style={{padding:"14px 18px",fontWeight:600,fontSize:14,color:"#111827"}}>{sf.id}</td>
                        <td style={{padding:"14px 18px",fontSize:13,color:"#6b7280"}}>{sf.service}</td>
                        <td style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:modeBg,color:modeTx}}>{sf.mode}</span></td>
                        <td style={{padding:"14px 18px",fontSize:14,color:"#374151"}}>{sf.tasks}</td>
                        <td style={{padding:"14px 18px",fontSize:14,color:"#374151"}}>{sf.active} / {sf.awaiting}</td>
                        <td style={{padding:"14px 18px"}}>
                          {sf.atRisk>0 ? <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:"#fef2f2",color:"#b91c1c"}}>{sf.atRisk} at risk</span>
                          : <span style={{fontSize:13,color:"#6b7280"}}>—</span>}
                        </td>
                        <td style={{padding:"14px 18px",color:"#9ca3af"}}><ChevronRight/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    );

    // ── My Tasks ──────────────────────────────────────────────────────────────
    if (activeNav === "My Tasks") {
      const MY_TASKS_DATA = [
        { id:"TASK-2024-10-00245", service:"Employment Verification", candidate:"Jane Smith",  sla:"24h left", slaRed:true,  status:"In Progress",        statusBlue:true,  batch:"BATCH-2024-10-001", urgent:true },
        { id:"TASK-2024-10-00289", service:"Guarantor Verification",  candidate:"Tom White",   sla:"48h left", slaRed:true,  status:"In Progress",        statusBlue:true,  batch:"BATCH-2024-10-001", urgent:true },
        { id:"TASK-2024-10-00334", service:"Employment Verification", candidate:"Peter Obi",   sla:"72h left", slaGreen:true,status:"In Progress",        statusBlue:true,  batch:"BATCH-2024-10-002", urgent:false },
        { id:"TASK-2024-10-00356", service:"Address Verification",    candidate:"Grace Lee",   sla:"120h left",slaGreen:true,status:"Pending Assignment", statusGray:true,  batch:"BATCH-2024-10-002", urgent:false },
      ];
      const urgent = MY_TASKS_DATA.filter(t => t.urgent);
      const SlaBadge = ({t}) => (
        <span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,
          background:t.slaRed?"#fee2e2":t.slaGreen?"#dcfce7":"#f3f4f6",
          color:t.slaRed?"#b91c1c":t.slaGreen?"#16a34a":"#374151"}}>{t.sla}</span>
      );
      const StatusBadge2 = ({t}) => (
        <span style={{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:500,
          background:t.statusBlue?"#eff6ff":t.statusGray?"#f3f4f6":"#f9fafb",
          color:t.statusBlue?"#3b82f6":t.statusGray?"#6b7280":"#374151"}}>{t.status}</span>
      );
      return (
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
          {/* Breadcrumb */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            <span style={{color:"#9ca3af"}}>›</span>
            <span style={{color:"#374151",fontWeight:500}}>My tasks</span>
          </div>
          <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>My Tasks</h1>
          <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Manage your assigned verification tasks</p>

          {/* Stat cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
            {[
              {iconColor:"#3b82f6", iconPath:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 6v6l4 2", val:3, label:"In Progress"},
              {iconColor:"#b91c1c", iconPath:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01", val:2, label:"Urgent"},
              {iconColor:"#6b7280", iconPath:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 6v6l4 2", val:1, label:"Pending"},
            ].map(s => (
              <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={s.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d={s.iconPath}/></svg>
                  <span style={{fontSize:34,fontWeight:700,color:s.iconColor}}>{s.val}</span>
                </div>
                <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Urgent Attention */}
          <div style={{background:"#fff5f5",borderRadius:12,border:"1px solid #fecaca",padding:"20px 24px",marginBottom:20}}>
            <p style={{margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#b91c1c",display:"flex",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="18" height="18"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
              Urgent Attention ({urgent.length})
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {urgent.map((t,i) => (
                <div key={i} style={{background:"white",borderRadius:10,border:"1px solid #fecaca",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <div>
                    <p style={{margin:"0 0 3px",fontSize:14,fontWeight:600,color:"#111827"}}>{t.id} - {t.service}</p>
                    <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{t.candidate}</p>
                  </div>
                  <span style={{padding:"4px 12px",borderRadius:20,fontSize:13,fontWeight:600,background:"#fee2e2",color:"#b91c1c",whiteSpace:"nowrap"}}>{t.sla}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All tasks table */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#f9fafb"}}>
                {["TASK ID","SERVICE","SLA","STATUS","BATCH"].map(h => (
                  <th key={h} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {MY_TASKS_DATA.map((t,i) => (
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <td style={{padding:"15px 20px"}}>
                      <p style={{margin:"0 0 2px",fontSize:14,fontWeight:600,color:"#111827"}}>{t.id}</p>
                      <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{t.candidate}</p>
                    </td>
                    <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{t.service}</td>
                    <td style={{padding:"15px 20px"}}><SlaBadge t={t}/></td>
                    <td style={{padding:"15px 20px"}}><StatusBadge2 t={t}/></td>
                    <td style={{padding:"15px 20px",fontSize:13,color:"#6b7280"}}>{t.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // ── Task Queues ───────────────────────────────────────────────────────────
    if (activeNav === "Task Queues") {
      const QUEUES_DATA = [
        { name:"Employment Verification Queue", desc:"Employment verifications",  count:12, oldest:4, oldestColor:"#d97706" },
        { name:"Guarantor Verification Queue",  desc:"Guarantor verifications",   count:8,  oldest:2, oldestColor:"#16a34a" },
        { name:"Education Verification Queue",  desc:"Education verifications",   count:15, oldest:6, oldestColor:"#b91c1c" },
        { name:"Address Verification Queue",    desc:"Address verifications",     count:10, oldest:3, oldestColor:"#d97706" },
      ];
      return (
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            <span style={{color:"#9ca3af"}}>›</span>
            <span style={{color:"#374151",fontWeight:500}}>Task queues</span>
          </div>
          <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Task Queues</h1>
          <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280"}}>Claim tasks from available queues</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {QUEUES_DATA.map((q,i) => (
              <div key={i} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20}}>
                  <div style={{width:44,height:44,borderRadius:10,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{margin:"0 0 3px",fontSize:16,fontWeight:700,color:"#111827"}}>{q.name}</p>
                    <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{q.desc}</p>
                  </div>
                </div>
                <div style={{marginBottom:8,display:"flex",justifyContent:"space-between",fontSize:14,color:"#374151"}}>
                  <span>Tasks in queue:</span>
                  <span style={{fontWeight:700,color:"#111827"}}>{q.count}</span>
                </div>
                <div style={{marginBottom:20,display:"flex",justifyContent:"space-between",fontSize:14,color:"#374151"}}>
                  <span>Oldest task:</span>
                  <span style={{fontWeight:700,color:q.oldestColor}}>{q.oldest} days</span>
                </div>
                <button style={{width:"100%",padding:"11px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#991b1b"}
                  onMouseLeave={e=>e.currentTarget.style.background="#b91c1c"}>
                  View &amp; Claim Tasks
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ── Settings ──────────────────────────────────────────────────────────────
    if (activeNav === "Settings") {
      return <VOSettings user={user}/>;
    }

    // ── Help ──────────────────────────────────────────────────────────────────
    if (activeNav === "Help") {
      return <VOHelp/>;
    }

    return (
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontSize:15}}>
        {activeNav} — coming soon
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      {/* Topbar */}
      <div style={{display:"flex",alignItems:"center",padding:"0 20px",height:56,background:"white",borderBottom:"1px solid #e5e7eb",gap:16,flexShrink:0,zIndex:10}}>
        <button onClick={()=>setSidebarOpen(p=>!p)} style={{background:"none",border:"none",cursor:"pointer",color:"#374151",padding:4,display:"flex"}}><MenuIcon/></button>
        <div style={{display:"flex",alignItems:"center",gap:8,fontWeight:700,fontSize:16,color:"#111827"}}>
          <div style={{width:28,height:28,background:"#b91c1c",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><ShieldIcon size={16}/></div>
          VERIPORT
        </div>
        <div style={{flex:1,maxWidth:400,position:"relative",marginLeft:16}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input placeholder="Search... (Ctrl+K)" style={{width:"100%",padding:"7px 12px 7px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151",background:"#f9fafb"}}/>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
          <RoleSwitcher activeProfile={activeProfile} onSwitch={onSwitchProfile}/>
          <div style={{position:"relative",cursor:"pointer"}}>
            <div style={{width:36,height:36,border:"1.5px solid #e5e7eb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#374151"}}><BellIcon/></div>
            <span style={{position:"absolute",top:-6,right:-6,background:"#b91c1c",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>3</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:12}}>{user.initials}</div>
            <span style={{fontSize:14,fontWeight:500,color:"#111827"}}>{user.name}</span>
          </div>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {sidebarOpen && (
          <div className="vp-sidebar vp-sidebar-open" style={{width:240,background:"white",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
            <div style={{padding:"16px 12px 8px"}}>
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 12px"}}>
                <p style={{margin:0,fontSize:11,fontWeight:600,color:"#b91c1c",letterSpacing:.5,marginBottom:2}}>CURRENT ROLE</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>Verification Officer</p>
              </div>
            </div>
            <nav style={{padding:"4px 8px",flex:1}}>
              {VONav.map(item=>(
                <button key={item.label} onClick={()=>{setActiveNav(item.label);if(item.label!=="My ServModes")setSelectedSF(null);}}
                  style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:(activeNav===item.label&&!selectedSF)||item.label==="My ServModes"&&selectedSF?600:400,background:activeNav===item.label?"#b91c1c":"transparent",color:activeNav===item.label?"white":"#374151",marginBottom:2,textAlign:"left"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d={item.d}/></svg>
                  {item.label}
                </button>
              ))}
            </nav>
            <div style={{padding:"12px 8px",borderTop:"1px solid #e5e7eb"}}>
              <button onClick={onSignOut} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,color:"#6b7280",background:"transparent"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VA PORTAL (External — Verification Authority)
// ═══════════════════════════════════════════════════════════════════════════════

const VA_STUDENTS = [
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


export { VOShell };
