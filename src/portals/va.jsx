import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

// ─── VA: Evidential Report Screen (Gap F — mockup) ───────────────────────────
function VAEvidentialReport({ students, submissions, vaName, vaEmail, vaRole, institution, delChainRef, onClose, Topbar }) {
  const REF = "VRP-EVID-2026-" + Math.floor(Math.random()*9000+1000);
  const TIMESTAMP = "20 May 2026, " + new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}) + " WAT";
  const SCHOLAR_AWARD = "Federal Government Scholarship Award 2025/2026";
  const CGPA_THRESHOLD = 3.50;
  const PERMISSIBLE = ["Computer Science","Software Engineering","Information Technology","Computer Engineering"];

  const Section = ({title, children, accent="#1e3a5f"}) => (
    <div style={{marginBottom:24}}>
      <div style={{background:accent,padding:"8px 16px",marginBottom:0}}>
        <p style={{margin:0,fontSize:11,fontWeight:700,color:"white",letterSpacing:1}}>{title}</p>
      </div>
      <div style={{border:"1px solid #d1d5db",borderTop:"none",padding:"14px 16px"}}>{children}</div>
    </div>
  );

  const Field = ({label, value, highlight=false}) => (
    <div style={{display:"flex",marginBottom:7,alignItems:"flex-start"}}>
      <span style={{width:200,fontSize:12,color:"#6b7280",fontWeight:500,flexShrink:0,fontFamily:"monospace"}}>{label}</span>
      <span style={{fontSize:13,color:highlight?"#b91c1c":"#111827",fontWeight:highlight?700:400,fontFamily:"monospace"}}>{value||"—"}</span>
    </div>
  );

  const CompRow = ({label, candidate, va, outcome}) => {
    const ok = outcome==="Match"||outcome==="Eligible"||outcome==="Meets Threshold";
    return (
      <tr style={{borderBottom:"1px solid #e5e7eb"}}>
        <td style={{padding:"8px 12px",fontSize:12,color:"#374151",fontWeight:500,fontFamily:"monospace",width:"30%"}}>{label}</td>
        <td style={{padding:"8px 12px",fontSize:12,color:"#374151",fontFamily:"monospace",width:"25%"}}>{candidate}</td>
        <td style={{padding:"8px 12px",fontSize:12,color:"#374151",fontFamily:"monospace",width:"25%"}}>{va}</td>
        <td style={{padding:"8px 12px",width:"20%"}}>
          <span style={{padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:700,background:ok?"#dcfce7":"#fee2e2",color:ok?"#16a34a":"#b91c1c"}}>{outcome}</span>
        </td>
      </tr>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f1f5f9",fontFamily:"'Courier New',monospace"}}>
      <Topbar/>
      <div style={{flex:1,overflowY:"auto",padding:"24px 16px",maxWidth:860,margin:"0 auto",width:"100%",boxSizing:"border-box"}}>

        {/* Report header */}
        <div style={{background:"#1e3a5f",padding:"24px 28px",marginBottom:0,borderRadius:"10px 10px 0 0"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div>
              <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:1}}>DRAGNET SOLUTIONS LIMITED</p>
              <p style={{margin:"0 0 2px",fontSize:18,fontWeight:700,color:"white"}}>SCHOLAR VERIFICATION EVIDENTIAL REPORT</p>
              <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.7)"}}>VRP-AUTH-001 §12 — Immutable submission record</p>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{margin:"0 0 2px",fontSize:11,color:"rgba(255,255,255,0.6)"}}>Reference</p>
              <p style={{margin:"0 0 6px",fontSize:15,fontWeight:700,color:"white",letterSpacing:1}}>{REF}</p>
              <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.6)"}}>{TIMESTAMP}</p>
            </div>
          </div>
        </div>

        <div style={{background:"white",border:"1px solid #d1d5db",borderTop:"none",borderRadius:"0 0 10px 10px",padding:"20px 28px",marginBottom:16}}>
          <p style={{margin:0,fontSize:12,color:"#b91c1c",fontWeight:600}}>
            ⚠ This report is immutable once issued. It replaces physical signatures, institutional stamps, and sealed envelopes as the authoritative verification record. Trust is established through institutional email ownership, OTP-confirmed submission, and this audit trail.
          </p>
        </div>

        {/* 1. Verification Authority */}
        <Section title="1. VERIFICATION AUTHORITY">
          <Field label="Name" value={vaName}/>
          <Field label="Role / Title" value={vaRole}/>
          <Field label="Institutional Email" value={vaEmail}/>
          <Field label="Institution" value={institution}/>
          <Field label="Onboarding Status" value="Onboarded"/>
          <Field label="OTP Verified At" value={TIMESTAMP}/>
          <Field label="IP Address (simulated)" value="102.89.45.12 (Lagos, NG)"/>
        </Section>

        {/* 2. Scholarship Context */}
        <Section title="2. SCHOLARSHIP CONTEXT">
          <Field label="Award Name" value={SCHOLAR_AWARD}/>
          <Field label="Awarding Body" value="Federal Scholarship Board / Scholastica"/>
          <Field label="Verification Type" value="Type 1 — New Awardee (Deep Check)"/>
          <Field label="CGPA Threshold" value={CGPA_THRESHOLD.toFixed(2)+" (minimum)"}/>
          <Field label="Permissible Courses" value={PERMISSIBLE.join(", ")}/>
        </Section>

        {/* 3. Student verification records */}
        <Section title="3. STUDENT VERIFICATION RECORDS">
          {students.map((s,idx) => {
            const fd = submissions[s.id] || {};
            const vaStatus = fd.blindStatus || "Enrolled";
            const vaCGPA = parseFloat(fd.blindCGPA)||3.74;
            const statusOk = vaStatus==="Enrolled";
            const cgpaOk = vaCGPA>=CGPA_THRESHOLD;
            const courseOk = PERMISSIBLE.some(c=>((s.dept||"Computer Science").toLowerCase()).includes(c.toLowerCase()));
            return (
              <div key={s.id} style={{marginBottom:idx<students.length-1?20:0,paddingBottom:idx<students.length-1?20:0,borderBottom:idx<students.length-1?"1px dashed #e5e7eb":"none"}}>
                <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#1e3a5f"}}>Student {idx+1} of {students.length}</p>
                <Field label="First Name" value={(s.name||"").split(" ")[0]}/>
                <Field label="Last Name" value={(s.name||"").split(" ").slice(1).join(" ")||"—"}/>
                <Field label="Matric Number" value={s.matric}/>
                <Field label="Level of Study" value={String(s.level)}/>
                <Field label="Academic Session" value={s.session}/>
                <Field label="Department" value={s.dept||"Computer Science"}/>
                <div style={{marginTop:12}}>
                  <p style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:"#6b7280",letterSpacing:.5}}>CLAIM OUTCOMES</p>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                    <thead><tr style={{background:"#f9fafb"}}>
                      {["Field","Candidate Value","VA Value","Outcome"].map(h=>(
                        <th key={h} style={{padding:"6px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#374151",border:"1px solid #e5e7eb"}}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      <CompRow label="First Name"      candidate={(s.name||"").split(" ")[0]}   va={fd.claimFirstName==="no"?fd.corrFirstName||"Corrected":(s.name||"").split(" ")[0]} outcome={fd.claimFirstName==="no"?"Corrected":"Match"}/>
                      <CompRow label="Last Name"       candidate={(s.name||"").split(" ").slice(1).join(" ")||"—"} va={fd.claimLastName==="no"?fd.corrLastName||"Corrected":(s.name||"").split(" ").slice(1).join(" ")||"—"} outcome={fd.claimLastName==="no"?"Corrected":"Match"}/>
                      <CompRow label="Matric Number"   candidate={s.matric}   va={fd.claimMatric==="no"?fd.corrMatric||"Corrected":s.matric}     outcome={fd.claimMatric==="no"?"Corrected":"Match"}/>
                      <CompRow label="Level of Study"  candidate={String(s.level)} va={fd.claimLevel==="no"?fd.corrLevel||"Corrected":String(s.level)} outcome={fd.claimLevel==="no"?"Corrected":"Match"}/>
                      <CompRow label="Student Status"  candidate="Enrolled"   va={vaStatus}   outcome={statusOk?"Match":"Discrepancy"}/>
                      <CompRow label="CGPA"            candidate="3.82 (withheld)" va={vaCGPA.toFixed(2)} outcome={Math.abs(vaCGPA-3.82)<=0.05?"Match":"Discrepancy"}/>
                      <CompRow label="CGPA Threshold"  candidate={"≥ "+CGPA_THRESHOLD.toFixed(2)} va={vaCGPA.toFixed(2)} outcome={cgpaOk?"Meets Threshold":"Below Threshold"}/>
                      <CompRow label="Course Eligible" candidate={s.dept||"Computer Science"} va={courseOk?"In pool":"Not in pool"} outcome={courseOk?"Eligible":"Not Eligible"}/>
                    </tbody>
                  </table>
                </div>
                <div style={{marginTop:10,padding:"8px 12px",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:6}}>
                  <Field label="VA Attestation" value={"I certify this information is accurate based on official departmental records — "+vaName}/>
                  <Field label="Attestation OTP" value={"739204 — confirmed at "+TIMESTAMP}/>
                </div>
              </div>
            );
          })}
        </Section>

        {/* 4. Delegation chain */}
        <Section title="4. DELEGATION CHAIN" accent="#7c3aed">
          {delChainRef.map((p,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:i<delChainRef.length-1?14:0}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:i===0?"#1e3a5f":"#7c3aed",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                <span style={{fontSize:10,fontWeight:700,color:"white"}}>{i+1}</span>
              </div>
              <div style={{flex:1,borderBottom:i<delChainRef.length-1?"1px dashed #e5e7eb":"none",paddingBottom:i<delChainRef.length-1?14:0}}>
                <Field label="Name" value={p.name}/>
                <Field label="Email" value={p.email}/>
                <Field label="Role" value={p.role}/>
                <Field label="Action" value={p.action}/>
                <Field label="Timestamp" value={p.timestamp}/>
                <Field label="OTP Confirmed" value="Yes — identity verified"/>
              </div>
            </div>
          ))}
          <div style={{marginTop:10,padding:"8px 12px",background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:6}}>
            <p style={{margin:0,fontSize:11,color:"#7c3aed",fontWeight:600}}>Total hops: {delChainRef.length-1} of 3 maximum · Chain circuit breaker: Not triggered</p>
          </div>
        </Section>

        {/* 5. OTP Records */}
        <Section title="5. OTP RECORDS">
          <Field label="Onboarding OTP" value="482917 — verified at session start"/>
          <Field label="Submission OTP" value={"739204 — verified at "+TIMESTAMP}/>
          <Field label="OTP delivery email" value={vaEmail}/>
          <Field label="Re-issue attempts" value="0 of 5 maximum"/>
          <Field label="OTP validity window" value="10 minutes (configured)"/>
        </Section>

        {/* 6. Audit Log */}
        <Section title="6. AUDIT LOG">
          {[
            ["09:00", "Session initiated",           "PIN authenticated — "+vaEmail],
            ["09:02", "Task opened",                 "Student 1 ("+((students[0]&&students[0].name)||"—")+") verification form loaded"],
            ["09:14", "Claims confirmed",            "Section 1 pre-filled claims reviewed and confirmed"],
            ["09:15", "Blind entry completed",       "Student Status and CGPA entered independently"],
            ["09:16", "Evidence uploaded",           "Registration_Slip.pdf (245 KB)"],
            ["09:17", "Attestation confirmed",       "VA digital attestation checkbox checked"],
            ["09:17", "Submission OTP requested",    "OTP dispatched to "+vaEmail],
            ["09:17", "Submission OTP confirmed",    "Submission finalised — record locked"],
            ["09:18", "Report generated",            "Evidential report "+REF+" created"],
          ].map(([time,event,detail])=>(
            <div key={time+event} style={{display:"flex",gap:12,marginBottom:8,paddingBottom:8,borderBottom:"1px solid #f3f4f6"}}>
              <span style={{fontSize:11,color:"#9ca3af",fontWeight:600,flexShrink:0,width:50,fontFamily:"monospace"}}>{time}</span>
              <div>
                <p style={{margin:"0 0 1px",fontSize:12,fontWeight:600,color:"#374151"}}>{event}</p>
                <p style={{margin:0,fontSize:11,color:"#9ca3af"}}>{detail}</p>
              </div>
            </div>
          ))}
        </Section>

        {/* Footer */}
        <div style={{background:"#1e3a5f",padding:"16px 20px",borderRadius:8,marginBottom:20}}>
          <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"white"}}>DRAGNET SOLUTIONS LIMITED — VERIPORT PLATFORM</p>
          <p style={{margin:"0 0 4px",fontSize:11,color:"rgba(255,255,255,0.7)"}}>Report Reference: {REF} · Generated: {TIMESTAMP}</p>
          <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.5)"}}>This report is the authoritative verification record. It is immutable and retained for audit purposes. Contact support@dragnet.ng for queries.</p>
        </div>

        <button onClick={onClose}
          style={{width:"100%",padding:"13px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer"}}>
          ← Back to Session Summary
        </button>
      </div>
    </div>
  );
}

// ─── VA: Comparison Results Screen (Gap B — mockup) ──────────────────────────
function VAComparisonScreen({ student, formData, vaName, onContinue, Topbar }) {
  const fd = formData || {};
  const CANDIDATE_STATUS = "Enrolled";
  const CANDIDATE_CGPA   = "3.82";
  const CGPA_THRESHOLD   = 3.50;
  const PERMISSIBLE_COURSES = ["Computer Science","Software Engineering","Information Technology","Computer Engineering"];
  const STUDENT_COURSE   = (student && student.dept) ? student.dept : "Computer Science";
  const vaStatus = fd.blindStatus || "Enrolled";
  const vaCGPA   = parseFloat(fd.blindCGPA) || 3.74;
  const statusMatch = vaStatus === CANDIDATE_STATUS;
  const cgpaMatch   = Math.abs(vaCGPA - parseFloat(CANDIDATE_CGPA)) <= 0.05;
  const meetsThresh = vaCGPA >= CGPA_THRESHOLD;
  const courseElig  = PERMISSIBLE_COURSES.some(c => STUDENT_COURSE.toLowerCase().includes(c.toLowerCase()));
  const discrepancies = [!statusMatch, !cgpaMatch, !meetsThresh, !courseElig].filter(Boolean).length;

  const Row = ({label, candidateVal, vaVal, outcome, note}) => {
    const isMatch = outcome==="Match" || outcome==="Eligible" || outcome==="Meets Threshold";
    const color   = isMatch ? "#16a34a" : "#b91c1c";
    const bg      = isMatch ? "#dcfce7" : "#fee2e2";
    return (
      <div style={{border:`1px solid ${isMatch?"#bbf7d0":"#fecaca"}`,borderRadius:10,padding:"14px 16px",marginBottom:12,background:isMatch?"#f0fdf4":"#fff8f8"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <p style={{margin:0,fontSize:13,fontWeight:700,color:"#374151"}}>{label}</p>
          <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:bg,color}}>{outcome}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={{background:"white",borderRadius:7,padding:"8px 12px",border:"1px solid #e5e7eb"}}>
            <p style={{margin:"0 0 2px",fontSize:10,fontWeight:600,color:"#9ca3af",letterSpacing:.4}}>CANDIDATE SUBMITTED</p>
            <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827",fontFamily:"monospace"}}>{candidateVal}</p>
          </div>
          <div style={{background:"white",borderRadius:7,padding:"8px 12px",border:`1px solid ${isMatch?"#bbf7d0":"#fecaca"}`}}>
            <p style={{margin:"0 0 2px",fontSize:10,fontWeight:600,color:"#9ca3af",letterSpacing:.4}}>VA ENTERED (YOU)</p>
            <p style={{margin:0,fontSize:14,fontWeight:600,color,fontFamily:"monospace"}}>{vaVal}</p>
          </div>
        </div>
        {note && <p style={{margin:"8px 0 0",fontSize:12,color:"#6b7280",lineHeight:1.5}}>{note}</p>}
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui,sans-serif"}}>
      <Topbar/>
      <div style={{flex:1,overflowY:"auto",padding:"24px 16px",maxWidth:680,margin:"0 auto",width:"100%",boxSizing:"border-box"}}>
        <div style={{marginBottom:20}}>
          <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:.8}}>VERIFICATION COMPLETE — COMPARISON RESULTS</p>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{student && student.name}</h1>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{student && student.matric} · Level {student && student.level} · {student && student.session}</p>
        </div>

        <div style={{background:discrepancies===0?"#dcfce7":"#fee2e2",border:`1px solid ${discrepancies===0?"#86efac":"#fca5a5"}`,borderRadius:12,padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:discrepancies===0?"#16a34a":"#b91c1c",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {discrepancies===0
              ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="20" height="20"><path d="M20 6L9 17l-5-5"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="20" height="20"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
            }
          </div>
          <div>
            <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:discrepancies===0?"#166534":"#b91c1c"}}>
              {discrepancies===0 ? "All checks passed — no discrepancies" : `${discrepancies} discrepanc${discrepancies===1?"y":"ies"} found`}
            </p>
            <p style={{margin:0,fontSize:12,color:discrepancies===0?"#15803d":"#b91c1c"}}>
              {discrepancies===0 ? "This result will be forwarded to the Veriport Officer for QA review." : "Discrepancies are flagged and will be reviewed by the Veriport Officer. Your submission is recorded."}
            </p>
          </div>
        </div>

        <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>BLIND-ENTRY COMPARISON</p>
        <Row label="Student Status" candidateVal={CANDIDATE_STATUS} vaVal={vaStatus} outcome={statusMatch?"Match":"Discrepancy"}
          note={!statusMatch?"Candidate reported Enrolled but your records show "+vaStatus+". This discrepancy will be flagged in the report.":null}/>
        <Row label="Previous Level CGPA" candidateVal={CANDIDATE_CGPA} vaVal={String(vaCGPA.toFixed(2))} outcome={cgpaMatch?"Match":"Discrepancy"}
          note={!cgpaMatch?"A difference of more than 0.05 between candidate and VA CGPA values constitutes a reportable discrepancy.":null}/>

        <p style={{margin:"16px 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>SCHOLARSHIP ELIGIBILITY CHECKS</p>
        <Row label="CGPA vs Scholarship Threshold" candidateVal={"Threshold: "+CGPA_THRESHOLD.toFixed(2)} vaVal={"VA CGPA: "+vaCGPA.toFixed(2)} outcome={meetsThresh?"Meets Threshold":"Below Threshold"}
          note={!meetsThresh?"VA CGPA of "+vaCGPA.toFixed(2)+" is below the scholarship minimum of "+CGPA_THRESHOLD.toFixed(2)+". Student may not qualify.":null}/>
        <Row label="Course Eligibility" candidateVal={STUDENT_COURSE} vaVal={courseElig?"In permissible pool":"Not in pool"} outcome={courseElig?"Eligible":"Not Eligible"}
          note={!courseElig?"The student's course is not in the permissible pool for this scholarship award.":null}/>

        <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"14px 16px",marginTop:16,marginBottom:20}}>
          <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>SUBMISSION RECORD</p>
          {[
            ["Submitted by",   vaName],
            ["Submission OTP", "Confirmed (739204)"],
            ["Timestamp",      "Today, "+new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})],
            ["Reference",      "VRP-"+(student&&student.matric)+"-2026"],
            ["Next step",      "Veriport Officer QA review"],
          ].map(([l,v])=>(
            <div key={l} style={{display:"flex",marginBottom:7}}>
              <span style={{width:140,fontSize:12,color:"#9ca3af",fontWeight:500,flexShrink:0}}>{l}</span>
              <span style={{fontSize:13,color:"#111827",fontWeight:l==="Reference"?700:400}}>{v}</span>
            </div>
          ))}
        </div>

        <button onClick={onContinue}
          style={{width:"100%",padding:"14px",border:"none",borderRadius:10,background:"#1e3a5f",color:"white",fontSize:15,fontWeight:600,cursor:"pointer"}}>
          Continue →
        </button>
        <p style={{margin:"10px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>This screen is for your reference. The results have been submitted and recorded.</p>
      </div>
    </div>
  );
}

// ─── VA: Onboarding Screen (OTP → PIN creation) ──────────────────────────────
function VAOnboarding({ va, activeProfile, onComplete, Topbar }) {
  const [step,        setStep]        = useState("otp");   // otp | pin | done
  const [otpInput,    setOtpInput]    = useState("");
  const [otpSent,     setOtpSent]     = useState(true);    // simulate already sent
  const [otpError,    setOtpError]    = useState("");
  const [pin1,        setPin1]        = useState("");
  const [pin2,        setPin2]        = useState("");
  const [pinError,    setPinError]    = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [resendFlash, setResendFlash] = useState(false);
  const MAX_RESEND = 5;
  const DEMO_OTP = "482917";

  const handleVerifyOTP = () => {
    if (otpInput.trim() === DEMO_OTP) { setOtpError(""); setStep("pin"); }
    else setOtpError("Incorrect OTP. Please check your email and try again.");
  };

  const handleCreatePIN = () => {
    if (pin1.length < 4)              { setPinError("PIN must be at least 4 digits."); return; }
    if (pin1 !== pin2)                { setPinError("PINs do not match. Please try again."); return; }
    setPinError("");
    setStep("done");
    setTimeout(() => onComplete(pin1), 1200);
  };

  const email = va.email || "your institutional email";

  const Card = ({children}) => (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui,sans-serif"}}>
      <Topbar/>
      <div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",padding:"28px 16px"}}>
        <div style={{width:"100%",maxWidth:480,background:"white",borderRadius:14,border:"1px solid #e5e7eb",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.07)"}}>
          <div style={{background:"#1e3a5f",padding:"18px 24px"}}>
            <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:.8}}>DRAGNET VERIFICATION PORTAL</p>
            <p style={{margin:0,fontSize:14,color:"rgba(255,255,255,0.9)"}}>Account Setup — {activeProfile.name}</p>
          </div>
          <div style={{padding:"28px 28px"}}>{children}</div>
        </div>
      </div>
    </div>
  );

  if (step === "done") return (
    <Card>
      <div style={{textAlign:"center",padding:"12px 0"}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="28" height="28"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>You're all set!</h2>
        <p style={{margin:0,fontSize:14,color:"#6b7280"}}>Your PIN has been created. Taking you to your dashboard...</p>
      </div>
    </Card>
  );

  if (step === "pin") return (
    <Card>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Create Your PIN</h2>
      <p style={{margin:"0 0 24px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>Choose a 4–6 digit PIN. You'll use this to access your verifications going forward — no OTP needed after today.</p>
      <div style={{marginBottom:16}}>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>New PIN</label>
        <input value={pin1} onChange={e=>setPin1(e.target.value.replace(/\D/g,"").slice(0,6))} type="password" placeholder="Enter 4–6 digits" maxLength={6}
          style={{width:"100%",padding:"12px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:18,outline:"none",boxSizing:"border-box",letterSpacing:6,textAlign:"center"}}/>
      </div>
      <div style={{marginBottom:20}}>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Confirm PIN</label>
        <input value={pin2} onChange={e=>setPin2(e.target.value.replace(/\D/g,"").slice(0,6))} type="password" placeholder="Re-enter PIN" maxLength={6}
          style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${pinError?"#ef4444":"#d1d5db"}`,borderRadius:8,fontSize:18,outline:"none",boxSizing:"border-box",letterSpacing:6,textAlign:"center"}}/>
        {pinError && <p style={{margin:"6px 0 0",fontSize:12,color:"#ef4444"}}>{pinError}</p>}
      </div>
      <button onClick={handleCreatePIN}
        style={{width:"100%",padding:"13px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:15,fontWeight:600,cursor:"pointer"}}>
        Create PIN & Continue →
      </button>
    </Card>
  );

  // step === "otp"
  return (
    <Card>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Verify Your Email</h2>
      <p style={{margin:"0 0 6px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>
        A one-time code has been sent to your institutional email:
      </p>
      <p style={{margin:"0 0 24px",fontSize:13,fontWeight:600,color:"#1e3a5f"}}>{email}</p>
      <div style={{marginBottom:8}}>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Enter OTP</label>
        <input value={otpInput} onChange={e=>setOtpInput(e.target.value.replace(/\D/g,"").slice(0,6))} type="text" placeholder="6-digit code" maxLength={6} inputMode="numeric"
          style={{width:"100%",padding:"14px",border:`1.5px solid ${otpError?"#ef4444":"#d1d5db"}`,borderRadius:8,fontSize:22,outline:"none",boxSizing:"border-box",letterSpacing:8,textAlign:"center"}}/>
        {otpError && <p style={{margin:"6px 0 0",fontSize:12,color:"#ef4444"}}>{otpError}</p>}
      </div>
      <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>For this demo, use code: <strong style={{color:"#1e3a5f",letterSpacing:3}}>482917</strong></p>
      <button onClick={handleVerifyOTP}
        style={{width:"100%",padding:"13px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:12}}>
        Verify & Continue →
      </button>
      {resendCount >= MAX_RESEND ? (
        <div style={{background:"#fee2e2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
          <p style={{margin:0,fontSize:12,color:"#b91c1c",fontWeight:500}}>Too many requests. Please wait 30 minutes before requesting another OTP, or contact your Veriport Officer.</p>
        </div>
      ) : (
        <button onClick={()=>{
          if (resendCount >= MAX_RESEND) return;
          const next = resendCount + 1;
          setResendCount(next);
          setResendFlash(true);
          setOtpInput(""); setOtpError("");
          setTimeout(()=>setResendFlash(false), 3000);
        }} style={{width:"100%",padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:resendFlash?"#16a34a":"#6b7280",fontSize:13,cursor:"pointer",fontWeight:resendFlash?600:400}}>
          {resendFlash ? "✓ OTP Resent" : `Resend OTP${resendCount>0?` (${MAX_RESEND - resendCount} left)`:""}`}
        </button>
      )}
    </Card>
  );
}

// ─── VA: Authentication Screen (returning VA — PIN entry) ─────────────────────
function VAAuth({ va, activeProfile, isFirstTime, pinSet, onAuthenticated, onGoOnboard, Topbar }) {
  const [pinInput,  setPinInput]  = useState("");
  const [pinError,  setPinError]  = useState("");
  const [attempts,  setAttempts]  = useState(0);
  const DEMO_PIN = pinSet || "1234"; // fallback demo PIN

  const handlePINSubmit = () => {
    if (pinInput === DEMO_PIN) {
      setPinError(""); onAuthenticated();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setPinInput("");
      if (next >= 3) setPinError("Too many failed attempts. Please reset your PIN via OTP.");
      else setPinError(`Incorrect PIN. ${3 - next} attempt${3-next===1?"":"s"} remaining.`);
    }
  };

  const email = va.email || "your institutional email";

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui,sans-serif"}}>
      <Topbar/>
      <div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",padding:"28px 16px"}}>
        <div style={{width:"100%",maxWidth:440,background:"white",borderRadius:14,border:"1px solid #e5e7eb",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.07)"}}>
          <div style={{background:"#1e3a5f",padding:"18px 24px"}}>
            <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:.8}}>DRAGNET VERIFICATION PORTAL</p>
            <p style={{margin:0,fontSize:14,color:"rgba(255,255,255,0.9)"}}>{activeProfile.name}</p>
          </div>
          <div style={{padding:"28px 28px"}}>
            {isFirstTime ? (
              <>
                <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Welcome to VeriPort</h2>
                <p style={{margin:"0 0 6px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>
                  You've been assigned verification tasks as a <strong>Verification Authority</strong>. Before you begin, you'll need to verify your institutional email and create a PIN.
                </p>
                <p style={{margin:"0 0 24px",fontSize:13,fontWeight:600,color:"#1e3a5f"}}>{email}</p>
                <button onClick={onGoOnboard}
                  style={{width:"100%",padding:"13px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:12}}>
                  Set Up My Account →
                </button>
              </>
            ) : (
              <>
                <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Welcome back</h2>
                <p style={{margin:"0 0 6px",fontSize:13,color:"#6b7280"}}>Enter your PIN to access your verification tasks.</p>
                <p style={{margin:"0 0 24px",fontSize:12,color:"#9ca3af"}}>{email}</p>
                <div style={{marginBottom:8}}>
                  <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>PIN</label>
                  <input value={pinInput} onChange={e=>setPinInput(e.target.value.replace(/\D/g,"").slice(0,6))}
                    onKeyDown={e=>e.key==="Enter"&&handlePINSubmit()}
                    type="password" placeholder="Enter your PIN" maxLength={6} inputMode="numeric"
                    style={{width:"100%",padding:"14px",border:`1.5px solid ${pinError?"#ef4444":"#d1d5db"}`,borderRadius:8,fontSize:22,outline:"none",boxSizing:"border-box",letterSpacing:8,textAlign:"center"}}/>
                  {pinError && <p style={{margin:"6px 0 0",fontSize:12,color:"#ef4444"}}>{pinError}</p>}
                </div>
                <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>
                  Demo: use PIN <strong style={{color:"#1e3a5f",letterSpacing:2}}>1234</strong>
                </p>
                <button onClick={handlePINSubmit}
                  style={{width:"100%",padding:"13px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:12}}>
                  Enter →
                </button>
                <button onClick={onGoOnboard}
                  style={{width:"100%",padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:"#6b7280",fontSize:13,cursor:"pointer"}}>
                  Forgot PIN? Reset via OTP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VAPortal({ user, activeProfile, onSwitchProfile, onSignOut }) {
  const [screen, setScreen]           = useState("auth"); // auth | onboard | dashboard | form | confirmation
  const [students, setStudents]       = useState(VA_STUDENTS);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [sessionMode, setSessionMode] = useState(false);
  const [submissions, setSubmissions] = useState({});
  const [isFirstTime, setIsFirstTime] = useState(true);  // true = show onboarding, false = show PIN login
  const [pinSet,      setPinSet]      = useState("");     // the VA's PIN once created
  const [showEvidentialReport, setShowEvidentialReport] = useState(false);
  const va = activeProfile.vaDetails || {};

  const doneCount    = students.filter(s => s.status === "Done").length;
  const pendingCount = students.filter(s => s.status === "Pending").length;
  const totalCount   = students.length;
  const progressPct  = Math.round((doneCount / totalCount) * 100);

  const openForm = (studentId, fromSession = false) => {
    setCurrentStudentId(studentId);
    setSessionMode(fromSession);
    setScreen("form");
  };

  const [lastSubmission, setLastSubmission] = useState(null);

  const submitStudent = (studentId, formData) => {
    setSubmissions(p => ({ ...p, [studentId]: formData }));
    setStudents(p => p.map(s => s.id === studentId ? { ...s, status: "Done" } : s));
    setLastSubmission({ studentId, formData });
    setScreen("comparison");
  };

  const proceedAfterComparison = () => {
    if (!lastSubmission) { setScreen("dashboard"); return; }
    const { studentId } = lastSubmission;
    if (sessionMode) {
      const updatedStudents = students.map(s => s.id === studentId ? { ...s, status: "Done" } : s);
      const remaining = updatedStudents.filter(s => s.status === "Pending");
      if (remaining.length === 0) { setScreen("confirmation"); }
      else { setCurrentStudentId(remaining[0].id); setScreen("form"); }
    } else {
      setScreen("dashboard");
    }
  };

  const skipStudent = () => {
    if (sessionMode) {
      const pendingAfter = students.filter(s => s.status === "Pending" && s.id !== currentStudentId);
      if (pendingAfter.length === 0) { setScreen("dashboard"); return; }
      setCurrentStudentId(pendingAfter[0].id);
    } else {
      setScreen("dashboard");
    }
  };

  const currentStudent = students.find(s => s.id === currentStudentId);
  const pendingStudents = students.filter(s => s.status === "Pending");
  const sessionIndex = pendingStudents.findIndex(s => s.id === currentStudentId) + 1;
  const sessionTotal = pendingStudents.length + (submissions[currentStudentId] ? 1 : 0);

  // ── Topbar (shared across all 3 screens) ──────────────────────────────────
  const Topbar = () => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",height:52,background:"#1e3a5f",color:"white",fontFamily:"system-ui,sans-serif",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:24,height:24,background:"white",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg viewBox="0 0 24 24" fill="#1e3a5f" width="14" height="14"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
        </div>
        <span style={{fontSize:14,fontWeight:700,letterSpacing:.8}}>DRAGNET VERIFICATION PORTAL</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <RoleSwitcher activeProfile={activeProfile} onSwitch={onSwitchProfile}/>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",background:"rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px"}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"#2d6a4f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:11}}>{activeProfile.initials}</div>
          <span style={{fontSize:13,fontWeight:500}}>{activeProfile.name}</span>
          <span style={{fontSize:11,opacity:.7}}>▾</span>
        </div>
      </div>
    </div>
  );

  // ── VA-00a: Onboarding (first time — OTP → PIN creation) ───────────────────
  if (screen === "onboard") {
    return <VAOnboarding va={va} activeProfile={activeProfile} onComplete={(pin)=>{ setPinSet(pin); setIsFirstTime(false); setScreen("dashboard"); }} Topbar={Topbar}/>;
  }

  // ── VA-00b: Authentication (returning VA — PIN entry) ──────────────────────
  if (screen === "auth") {
    return <VAAuth va={va} activeProfile={activeProfile} isFirstTime={isFirstTime} pinSet={pinSet}
      onAuthenticated={()=>setScreen("dashboard")}
      onGoOnboard={()=>setScreen("onboard")}
      Topbar={Topbar}/>;
  }

  // ── VA-01: Dashboard ───────────────────────────────────────────────────────
  if (screen === "dashboard") {
    const visibleStudents = students.slice(0, 5);
    const remaining = students.length - 5;
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui,sans-serif"}}>
        <Topbar/>
        <div style={{flex:1,display:"flex",justifyContent:"center",padding:"32px 16px",overflowY:"auto"}}>
          <div style={{width:"100%",maxWidth:720}}>

            {/* Welcome card */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:20}}>
              <div style={{paddingBottom:16,marginBottom:16,borderBottom:"1px solid #e5e7eb"}}>
                <p style={{margin:"0 0 4px",fontSize:17,fontWeight:700,color:"#111827"}}>Welcome, {activeProfile.name}</p>
                <p style={{margin:"0 0 2px",fontSize:14,color:"#6b7280"}}>{va.title || "Head of Department"}</p>
                <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{va.institution || "University of Lagos"}</p>
              </div>

              {/* Pending header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:"#374151",letterSpacing:.4}}>PENDING VERIFICATIONS</p>
                <span style={{fontSize:13,fontWeight:600,color:"#6b7280"}}>{pendingCount} students</span>
              </div>

              {/* Student table */}
              <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:16}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Courier New',monospace"}}>
                  <thead><tr style={{background:"#f9fafb"}}>
                    {["Student","Matric No","Level","Session","Status","Action"].map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:12,fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {visibleStudents.map((s,i) => (
                      <tr key={s.id} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                        onMouseLeave={e=>e.currentTarget.style.background="white"}>
                        <td style={{padding:"11px 12px",fontSize:13,color:"#111827",fontWeight:500}}>{s.name}</td>
                        <td style={{padding:"11px 12px",fontSize:13,color:"#374151"}}>{s.matric}</td>
                        <td style={{padding:"11px 12px",fontSize:13,color:"#374151"}}>{s.level}</td>
                        <td style={{padding:"11px 12px",fontSize:13,color:"#374151"}}>{s.session}</td>
                        <td style={{padding:"11px 12px"}}>
                          {s.status === "Done"
                            ? <span style={{color:"#16a34a",fontSize:13,fontWeight:600}}>✓ Done</span>
                            : <span style={{color:"#6b7280",fontSize:13}}>○ Pending</span>}
                        </td>
                        <td style={{padding:"11px 12px"}}>
                          {s.status === "Done"
                            ? <button style={{background:"none",border:"1px solid #d1d5db",color:"#374151",padding:"4px 10px",borderRadius:5,fontSize:12,cursor:"pointer"}}>View</button>
                            : <button onClick={()=>openForm(s.id,false)} style={{background:"#1e3a5f",border:"none",color:"white",padding:"4px 10px",borderRadius:5,fontSize:12,cursor:"pointer",fontWeight:600}}>Verify →</button>
                          }
                        </td>
                      </tr>
                    ))}
                    {remaining > 0 && (
                      <tr style={{background:"#fafafa"}}>
                        <td colSpan={6} style={{padding:"10px 12px",fontSize:13,color:"#9ca3af",fontStyle:"italic"}}>... +{remaining} more</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Progress bar */}
              <div style={{marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <span style={{fontSize:13,color:"#374151",fontWeight:500}}>Progress:</span>
                  <div style={{flex:1,height:8,background:"#e5e7eb",borderRadius:4,overflow:"hidden"}}>
                    <div style={{width:`${progressPct}%`,height:"100%",background:"#2d6a4f",borderRadius:4,transition:"width .3s"}}/>
                  </div>
                  <span style={{fontSize:13,color:"#374151",fontWeight:600,whiteSpace:"nowrap"}}>{doneCount}/{totalCount} ({progressPct}%)</span>
                </div>
              </div>

              {/* Verify All button */}
              {pendingCount > 0 && (
                <button onClick={()=>openForm(pendingStudents[0].id, true)}
                  style={{display:"flex",alignItems:"center",gap:8,padding:"12px 20px",background:"#1e3a5f",border:"none",borderRadius:8,color:"white",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%",justifyContent:"center"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#15294a"}
                  onMouseLeave={e=>e.currentTarget.style.background="#1e3a5f"}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  Verify All (start session)
                </button>
              )}
              {pendingCount === 0 && doneCount === totalCount && (
                <button onClick={()=>setScreen("confirmation")}
                  style={{display:"flex",alignItems:"center",gap:8,padding:"12px 20px",background:"#2d6a4f",border:"none",borderRadius:8,color:"white",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%",justifyContent:"center"}}>
                  ✓ All Done — View Submission Summary
                </button>
              )}
            </div>

            {/* Footer info */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px"}}>
              <p style={{margin:"0 0 6px",fontSize:13,color:"#374151",display:"flex",alignItems:"center",gap:6}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                Need help? Contact <span style={{color:"#1e3a5f",fontWeight:500}}>support@dragnet.ng</span> or call <span style={{fontWeight:500}}>+234-1-234-5678</span>
              </p>
              <p style={{margin:0,fontSize:13,color:"#ef4444",fontWeight:500}}>⏰ Link expires: Feb 18, 2026</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── VA-02: Student Verification Form ──────────────────────────────────────
  // ── VA-03b: Comparison Results Screen ────────────────────────────────────────
  if (screen === "comparison" && lastSubmission) {
    const compStudent = students.find(s => s.id === lastSubmission.studentId);
    return <VAComparisonScreen student={compStudent} formData={lastSubmission.formData} vaName={activeProfile.name} onContinue={proceedAfterComparison} Topbar={Topbar}/>;
  }

  if (screen === "form" && currentStudent) {
    return <VAVerificationForm
      student={currentStudent}
      sessionIndex={sessionIndex}
      sessionTotal={pendingStudents.length + doneCount}
      sessionMode={sessionMode}
      vaName={activeProfile.name}
      vaDetails={va}
      savedData={submissions[currentStudentId]}
      onBack={()=>setScreen("dashboard")}
      onSubmit={(data)=>submitStudent(currentStudent.id, data)}
      onSkip={skipStudent}
      Topbar={Topbar}
    />;
  }

  // ── VA-03: Submission Confirmation ────────────────────────────────────────
  if (screen === "confirmation") {
    const confirmedCount = students.filter(s=>s.status==="Done").length;
    if (showEvidentialReport) {
      const doneStudents = students.filter(s=>s.status==="Done");
      return <VAEvidentialReport
        students={doneStudents}
        submissions={submissions}
        vaName={activeProfile.name}
        vaEmail={va.email||"akpan@unilag.edu.ng"}
        vaRole={va.role||"Head of Department"}
        institution={va.institution||"University of Lagos"}
        delChainRef={[{name:activeProfile.name,email:va.email||"akpan@unilag.edu.ng",role:va.role||"Head of Department",timestamp:"Today, 09:14",action:"Original assignee"}]}
        onClose={()=>setShowEvidentialReport(false)}
        Topbar={Topbar}
      />;
    }
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui,sans-serif"}}>
        <Topbar/>
        <div style={{flex:1,display:"flex",justifyContent:"center",padding:"32px 16px",overflowY:"auto"}}>
          <div style={{width:"100%",maxWidth:720}}>
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>

              {/* All Complete banner */}
              <div style={{background:"#f0fdf4",borderBottom:"1px solid #bbf7d0",padding:"28px 24px",textAlign:"center"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"white",border:"2px solid #16a34a",borderRadius:10,padding:"10px 24px",marginBottom:16}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="20" height="20"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{fontSize:16,fontWeight:700,color:"#15803d",letterSpacing:.5}}>ALL COMPLETE</span>
                </div>
                <p style={{margin:0,fontSize:18,fontWeight:600,color:"#111827"}}>Thank you, {activeProfile.name}!</p>
              </div>

              <div style={{padding:"24px 28px"}}>
                <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#6b7280",letterSpacing:.8}}>SUMMARY</p>
                <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"16px 20px",marginBottom:20,fontFamily:"'Courier New',monospace"}}>
                  <div style={{marginBottom:10,paddingBottom:10,borderBottom:"1px solid #e5e7eb"}}>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{display:"inline-block",width:160,color:"#6b7280"}}>Students verified:</span><strong>{confirmedCount}</strong></p>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{display:"inline-block",width:160,color:"#6b7280"}}>Submitted:</span><strong>Feb 5, 2026, 4:15 PM</strong></p>
                    <p style={{margin:0,fontSize:13,color:"#374151"}}><span style={{display:"inline-block",width:160,color:"#6b7280"}}>Confirmation ID:</span><strong style={{color:"#1e3a5f"}}>SUB-2026-02-05-001</strong></p>
                  </div>
                  <p style={{margin:"0 0 8px",fontSize:13,color:"#374151",fontWeight:600}}>Verification Results:</p>
                  {[
                    ["Enrolled, Active:",   `${confirmedCount - 1} students`],
                    ["Enrolled, On Leave:", "1 student"],
                    ["Not Enrolled:",       "0 students"],
                  ].map(([label, val])=>(
                    <p key={label} style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>
                      <span style={{marginRight:8,color:"#2d6a4f"}}>•</span>
                      <span style={{display:"inline-block",width:180,color:"#6b7280"}}>{label}</span>
                      <strong>{val}</strong>
                    </p>
                  ))}
                </div>

                <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/></svg>
                  <p style={{margin:0,fontSize:13,color:"#1d4ed8"}}>A confirmation email has been sent to <strong>{va.email || "akpan@unilag.edu.ng"}</strong></p>
                </div>

                <div style={{display:"flex",gap:12,marginBottom:20}}>
                  <button onClick={()=>setShowEvidentialReport(true)}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"11px 18px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    View Evidential Report
                  </button>
                  <button style={{display:"flex",alignItems:"center",gap:8,padding:"11px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    Download Summary (PDF)
                  </button>
                  <button onClick={()=>setScreen("dashboard")}
                    style={{flex:1,padding:"11px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer",textAlign:"center"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    Close
                  </button>
                </div>

                <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:16}}/>
                <p style={{margin:0,fontSize:13,color:"#9ca3af"}}>Questions? Contact <span style={{color:"#1e3a5f",fontWeight:500}}>support@dragnet.ng</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ─── VA Verification Form (VA-02) ─────────────────────────────────────────────
function VAVerificationForm({ student, sessionIndex, sessionTotal, sessionMode, vaName, vaDetails, savedData, onBack, onSubmit, onSkip, Topbar }) {
  const [enrolled,    setEnrolled]    = useState("Yes");
  const [level,       setLevel]       = useState(String(student.level));
  const [levelOther,  setLevelOther]  = useState("");
  const [session,     setSession]     = useState(student.session);
  const [acadStatus,  setAcadStatus]  = useState("Active");
  const [standing,    setStanding]    = useState("Good Standing");
  const [standOther,  setStandOther]  = useState("");
  const [disciplinary,setDisciplinary]= useState("No");
  const [discDetail,  setDiscDetail]  = useState("");
  const [comments,    setComments]    = useState("");
  const [uploadedFile,setUploadedFile]= useState("Registration_Slip_BlessingOkoro.pdf (245 KB)");
  const [attestation, setAttestation] = useState(true);
  const [signature,   setSignature]   = useState(vaName);
  const [errors,      setErrors]      = useState({});

  // Claim confirmation state — per field: "yes" | "no"
  const [claimFirstName, setClaimFirstName] = useState("yes");
  const [claimLastName,  setClaimLastName]  = useState("yes");
  const [claimMatric,  setClaimMatric]  = useState("yes");
  const [claimLevel,   setClaimLevel]   = useState("yes");
  const [claimSession, setClaimSession] = useState("yes");
  const [claimSemester,setClaimSemester]= useState("yes");
  const [corrFirstName,  setCorrFirstName]  = useState("");
  const [corrLastName,   setCorrLastName]   = useState("");
  const [corrMatric,   setCorrMatric]   = useState("");
  const [corrLevel,    setCorrLevel]    = useState("");
  const [corrSession,  setCorrSession]  = useState("");
  const [corrSemester, setCorrSemester] = useState("");

  // Blind-entry state — deliberately no default/pre-fill
  const [blindStatus,  setBlindStatus]  = useState(""); // Student Status — nothing pre-selected
  const [blindCGPA,    setBlindCGPA]    = useState(""); // Previous Level CGPA — blank

  // Session timeout overlay (item 3)
  const [timedOut,     setTimedOut]     = useState(false);
  const [pinResume,    setPinResume]    = useState("");
  const [pinResumeErr, setPinResumeErr] = useState("");
  const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes (demo)
  const DEMO_RESUME_PIN = "1234";

  React.useEffect(() => {
    let timer = setTimeout(() => setTimedOut(true), TIMEOUT_MS);
    const reset = () => { clearTimeout(timer); timer = setTimeout(() => setTimedOut(true), TIMEOUT_MS); };
    ["mousemove","keydown","click","scroll","touchstart"].forEach(e => window.addEventListener(e, reset));
    return () => {
      clearTimeout(timer);
      ["mousemove","keydown","click","scroll","touchstart"].forEach(e => window.removeEventListener(e, reset));
    };
  }, []);

  const handleResumeSession = () => {
    if (pinResume === DEMO_RESUME_PIN) { setTimedOut(false); setPinResume(""); setPinResumeErr(""); }
    else { setPinResumeErr("Incorrect PIN. Please try again."); setPinResume(""); }
  };

  // Delegation flow (item 5)
  const [showDelegate,   setShowDelegate]   = useState(false);
  const [delEmail,       setDelEmail]       = useState("");
  const [delName,        setDelName]        = useState("");
  const [delRole,        setDelRole]        = useState("");
  const [delConfirmed,   setDelConfirmed]   = useState(false);
  const [delError,       setDelError]       = useState("");
  const [delChain,       setDelChain]       = useState([
    { name:vaName, email:(typeof va!=="undefined"&&va.email)||"dr.akpan@unilag.edu.ng", role:"Head of Department", timestamp:"Today, 09:14", action:"Original assignee" }
  ]);
  const [showAudit,      setShowAudit]      = useState(false);
  const MAX_HOPS = 3;

  const hopCount = delChain.length - 1; // first entry is original VA, not a hop

  const handleDelegate = () => {
    if (!delEmail.trim()) { setDelError("Institutional email is required."); return; }
    if (!delEmail.includes("@")) { setDelError("Please enter a valid institutional email address."); return; }
    if (delEmail.includes("gmail") || delEmail.includes("yahoo") || delEmail.includes("hotmail")) {
      setDelError("Personal email addresses are not permitted. Please use an official institutional email."); return;
    }
    if (hopCount >= MAX_HOPS) { setDelError("Delegation cap reached. A Veriport Officer must review before further delegation."); return; }
    setDelError("");
    const newEntry = {
      name:  delName  || delEmail.split("@")[0],
      email: delEmail,
      role:  delRole  || "Delegate",
      timestamp: "Today, " + new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),
      action: `Delegated from ${delChain[delChain.length-1].name}`,
    };
    setDelChain(prev => [...prev, newEntry]);
    setDelConfirmed(true);
  };

  const totalForms = sessionMode ? sessionTotal : 1;
  const currentIdx = sessionMode ? sessionIndex : 1;

  const Radio = ({ name, value, cur, set, label }) => (
    <label style={{display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",marginRight:20,fontSize:13,color:"#374151"}}>
      <div onClick={()=>set(value)} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${cur===value?"#1e3a5f":"#d1d5db"}`,background:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
        {cur===value && <div style={{width:7,height:7,borderRadius:"50%",background:"#1e3a5f"}}/>}
      </div>
      {label}
    </label>
  );

  const validate = () => {
    const e = {};
    if (!attestation) e.attestation = "You must certify this information";
    if (!signature.trim()) e.signature = "Digital signature is required";
    if (signature.trim() && signature.trim() !== vaName.trim()) e.signature = `Please type your full name: ${vaName}`;
    if (!blindStatus) e.blindStatus = "Required — select a student status";
    if (!blindCGPA) e.blindCGPA = "Required — enter the CGPA from your records";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submission OTP (item 6)
  const [showOTP,      setShowOTP]      = useState(false);
  const [otpValue,     setOtpValue]     = useState("");
  const [otpError,     setOtpError]     = useState("");
  const [otpResent,    setOtpResent]    = useState(false);
  const [otpResendCnt, setOtpResendCnt] = useState(0);
  const MAX_RESEND = 5;
  const SUBMIT_OTP = "739204";

  const handleSubmit = () => {
    if (!validate()) return;
    setShowOTP(true);
  };

  const handleConfirmOTP = () => {
    if (otpValue.trim() === SUBMIT_OTP) {
      setOtpError("");
      onSubmit({ enrolled, level: level === "Other" ? levelOther : level, session, acadStatus, standing: standing === "Other" ? standOther : standing, disciplinary, discDetail, comments, attestation, signature, blindStatus, blindCGPA, claimFirstName, claimLastName, claimMatric, claimLevel, claimSession, claimSemester, corrFirstName, corrLastName, corrMatric, corrLevel, corrSession, corrSemester });
    } else {
      setOtpError("Incorrect OTP. Please check your email and try again.");
      setOtpValue("");
    }
  };

  const handleResendOTP = () => {
    if (otpResendCnt >= MAX_RESEND) return;
    const next = otpResendCnt + 1;
    setOtpResendCnt(next);
    setOtpResent(true);
    setOtpValue("");
    setOtpError("");
    setTimeout(() => setOtpResent(false), 3000);
  };

  const inp = { padding:"9px 12px", border:"1.5px solid #d1d5db", borderRadius:7, fontSize:13, outline:"none", boxSizing:"border-box", color:"#374151", width:"100%" };

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui,sans-serif"}}>
      <Topbar/>
      <div style={{flex:1,display:"flex",justifyContent:"center",padding:"28px 16px",overflowY:"auto"}}>
        <div style={{width:"100%",maxWidth:720}}>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>

            {/* Form header */}
            <div style={{background:"#1e3a5f",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6,padding:0}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to List
              </button>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.9)",fontWeight:500}}>
                {sessionMode ? `${currentIdx} of ${totalForms}` : ""}
              </span>
            </div>

            <div style={{padding:"24px 28px"}}>
              {/* Student header */}
              <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"#1e3a5f",letterSpacing:.8}}>VERIFY STUDENT</p>
              <h2 style={{margin:"0 0 16px",fontSize:20,fontWeight:700,color:"#111827"}}>{student.name}</h2>
              <div style={{height:3,background:"linear-gradient(90deg,#1e3a5f,#2d6a4f)",borderRadius:2,marginBottom:20}}/>

              {/* ── Student Claims header ─────────────────────────────────── */}
              <div style={{marginBottom:24}}>
                <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#6b7280",letterSpacing:.7}}>STUDENT CLAIMS</p>
                <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 16px",fontFamily:"'Courier New',monospace",fontSize:13,color:"#374151",display:"flex",flexWrap:"wrap",gap:8}}>
                  <span><span style={{color:"#6b7280"}}>Name:</span> <strong>{student.name}</strong></span>
                  <span style={{color:"#d1d5db"}}>|</span>
                  <span><span style={{color:"#6b7280"}}>Matric:</span> <strong>{student.matric}</strong></span>
                  <span style={{color:"#d1d5db"}}>|</span>
                  <span><span style={{color:"#6b7280"}}>Level:</span> <strong>{student.level}</strong></span>
                  <span style={{color:"#d1d5db"}}>|</span>
                  <span><span style={{color:"#6b7280"}}>Session:</span> <strong>{student.session}</strong></span>
                </div>
              </div>

              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:20}}/>

              {/* ── SECTION 1: PRE-FILLED CLAIMS ───────────────────────────── */}
              <div style={{marginBottom:28}}>
                <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"#6b7280",letterSpacing:.7}}>SECTION 1 — CONFIRM STUDENT CLAIMS <span style={{color:"#ef4444"}}>*</span></p>
                <p style={{margin:"0 0 18px",fontSize:12,color:"#9ca3af"}}>The values below were submitted by the student. Confirm whether each is correct based on your departmental records.</p>
                {[
                  {label:"First Name",      claimed:student.name?.split(" ")[0]||student.name, claim:claimFirstName, setClaim:setClaimFirstName, corr:corrFirstName, setCorr:setCorrFirstName},
                  {label:"Last Name",       claimed:student.name?.split(" ").slice(1).join(" ")||"—",                claim:claimLastName,  setClaim:setClaimLastName,  corr:corrLastName,  setCorr:setCorrLastName},
                  {label:"Matric Number",   claimed:student.matric,  claim:claimMatric,  setClaim:setClaimMatric,  corr:corrMatric,  setCorr:setCorrMatric},
                  {label:"Level of Study",  claimed:student.level,   claim:claimLevel,   setClaim:setClaimLevel,   corr:corrLevel,   setCorr:setCorrLevel},
                  {label:"Academic Session",claimed:student.session, claim:claimSession, setClaim:setClaimSession, corr:corrSession, setCorr:setCorrSession},
                  {label:"Current Semester",claimed:"First Semester",claim:claimSemester,setClaim:setClaimSemester,corr:corrSemester,setCorr:setCorrSemester},
                ].map(({label,claimed,claim,setClaim,corr,setCorr})=>(
                  <div key={label} style={{marginBottom:14,padding:"14px 16px",background:claim==="no"?"#fff8f8":"#f9fafb",border:`1px solid ${claim==="no"?"#fecaca":"#e5e7eb"}`,borderRadius:8}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                      <div style={{flex:1}}>
                        <p style={{margin:"0 0 2px",fontSize:12,color:"#6b7280",fontWeight:500}}>{label}</p>
                        <p style={{margin:0,fontSize:14,fontWeight:600,color:"#1e3a5f",fontFamily:"'Courier New',monospace"}}>{String(claimed)}</p>
                      </div>
                      <div style={{display:"flex",gap:8,flexShrink:0}}>
                        <button onClick={()=>setClaim("yes")}
                          style={{padding:"6px 14px",borderRadius:6,border:`1.5px solid ${claim==="yes"?"#16a34a":"#d1d5db"}`,background:claim==="yes"?"#dcfce7":"white",fontSize:12,fontWeight:600,color:claim==="yes"?"#16a34a":"#6b7280",cursor:"pointer"}}>
                          ✓ Correct
                        </button>
                        <button onClick={()=>setClaim("no")}
                          style={{padding:"6px 14px",borderRadius:6,border:`1.5px solid ${claim==="no"?"#ef4444":"#d1d5db"}`,background:claim==="no"?"#fee2e2":"white",fontSize:12,fontWeight:600,color:claim==="no"?"#ef4444":"#6b7280",cursor:"pointer"}}>
                          ✗ Incorrect
                        </button>
                      </div>
                    </div>
                    {claim==="no" && (
                      <div style={{marginTop:10}}>
                        <p style={{margin:"0 0 6px",fontSize:12,color:"#ef4444",fontWeight:500}}>Enter correct value:</p>
                        <input value={corr} onChange={e=>setCorr(e.target.value)} placeholder={`Correct ${label.toLowerCase()}...`}
                          style={{...inp,borderColor:"#fca5a5",background:"white"}}/>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── SECTION 2: BLIND ENTRY ──────────────────────────────────── */}
              <div style={{marginBottom:20,padding:"20px",background:"#fffbeb",border:"2px solid #fcd34d",borderRadius:10}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:16}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="18" height="18" style={{flexShrink:0,marginTop:2}}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"/></svg>
                  <div>
                    <p style={{margin:"0 0 2px",fontSize:12,fontWeight:700,color:"#92400e",letterSpacing:.5}}>SECTION 2 — INDEPENDENT ENTRY <span style={{color:"#ef4444"}}>*</span></p>
                    <p style={{margin:0,fontSize:12,color:"#b45309",lineHeight:1.5}}>The student's answers for the fields below have been withheld from you. Please enter what your departmental records show — independently, without any reference to what the student submitted.</p>
                  </div>
                </div>

                {/* Blind field: Student Status */}
                <div style={{marginBottom:18}}>
                  <p style={{margin:"0 0 6px",fontSize:13,color:"#374151",fontWeight:600}}>Student Status <span style={{color:"#ef4444"}}>*</span></p>
                  <p style={{margin:"0 0 10px",fontSize:12,color:"#9ca3af"}}>Select the student's current status according to your records. Nothing is pre-selected.</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {["Unknown","Enrolled","Graduated","Withdrawn","Deferred"].map(v=>(
                      <button key={v} onClick={()=>setBlindStatus(v)}
                        style={{padding:"8px 16px",borderRadius:7,border:`1.5px solid ${blindStatus===v?"#1e3a5f":"#d1d5db"}`,background:blindStatus===v?"#1e3a5f":"white",fontSize:13,fontWeight:blindStatus===v?600:400,color:blindStatus===v?"white":"#374151",cursor:"pointer"}}>
                        {v}
                      </button>
                    ))}
                  </div>
                  {errors.blindStatus && <p style={{margin:"6px 0 0",fontSize:12,color:"#ef4444"}}>{errors.blindStatus}</p>}
                </div>

                {/* Blind field: CGPA */}
                <div>
                  <p style={{margin:"0 0 6px",fontSize:13,color:"#374151",fontWeight:600}}>Previous Level CGPA <span style={{color:"#ef4444"}}>*</span></p>
                  <p style={{margin:"0 0 10px",fontSize:12,color:"#9ca3af"}}>Enter the student's CGPA as recorded by your institution. Do not estimate.</p>
                  <input value={blindCGPA} onChange={e=>setBlindCGPA(e.target.value)} type="number" step="0.01" min="0" max="5" placeholder="e.g. 3.74"
                    style={{...inp,maxWidth:160,borderColor:errors.blindCGPA?"#ef4444":"#d1d5db"}}/>
                  <p style={{margin:"4px 0 0",fontSize:11,color:"#9ca3af"}}>Enter on a 5.0 scale. Leave blank only if not yet available for this level.</p>
                  {errors.blindCGPA && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{errors.blindCGPA}</p>}
                </div>
              </div>

              {/* ── Additional questions ─────────────────────────────────────── */}
              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:20}}/>
              <p style={{margin:"0 0 16px",fontSize:12,fontWeight:700,color:"#6b7280",letterSpacing:.7}}>ADDITIONAL VERIFICATION</p>

              {/* Academic Standing */}
              <div style={{marginBottom:18}}>
                <p style={{margin:"0 0 10px",fontSize:13,color:"#374151",fontWeight:500}}>Academic Standing: <span style={{color:"#ef4444"}}>*</span></p>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,alignItems:"center"}}>
                  {["Good Standing","Probation"].map(v=><Radio key={v} value={v} cur={standing} set={setStanding} label={v}/>)}
                  <label style={{display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                    <div onClick={()=>setStanding("Other")} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${standing==="Other"?"#1e3a5f":"#d1d5db"}`,background:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                      {standing==="Other" && <div style={{width:7,height:7,borderRadius:"50%",background:"#1e3a5f"}}/>}
                    </div>
                    Other:
                  </label>
                  {standing==="Other" && <input value={standOther} onChange={e=>setStandOther(e.target.value)} placeholder="Specify" style={{...inp,width:140,display:"inline-block"}}/>}
                </div>
              </div>

              {/* Disciplinary */}
              <div style={{marginBottom:18}}>
                <p style={{margin:"0 0 10px",fontSize:13,color:"#374151",fontWeight:500}}>Disciplinary Issues: <span style={{color:"#ef4444"}}>*</span></p>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,alignItems:"center"}}>
                  <Radio value="No" cur={disciplinary} set={setDisciplinary} label="No"/>
                  <label style={{display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                    <div onClick={()=>setDisciplinary("Yes")} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${disciplinary==="Yes"?"#1e3a5f":"#d1d5db"}`,background:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                      {disciplinary==="Yes" && <div style={{width:7,height:7,borderRadius:"50%",background:"#1e3a5f"}}/>}
                    </div>
                    Yes:
                  </label>
                  {disciplinary==="Yes" && <input value={discDetail} onChange={e=>setDiscDetail(e.target.value)} placeholder="Please explain..." style={{...inp,flex:1,minWidth:200,display:"inline-block"}}/>}
                </div>
              </div>

              {/* Comments */}
              <div style={{marginBottom:20}}>
                <p style={{margin:"0 0 8px",fontSize:13,color:"#374151",fontWeight:500}}>Comments (optional):</p>
                <textarea value={comments} onChange={e=>setComments(e.target.value)} maxLength={500} placeholder="Any additional notes..."
                  style={{...inp,minHeight:70,resize:"vertical",fontFamily:"system-ui,sans-serif"}}/>
                <p style={{margin:"3px 0 0",fontSize:11,color:"#9ca3af",textAlign:"right"}}>{comments.length}/500</p>
              </div>

              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:20}}/>
              {/* Evidence */}

              {/* Evidence */}
              <div style={{marginBottom:20}}>
                <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#6b7280",letterSpacing:.7}}>EVIDENCE <span style={{fontSize:11,fontWeight:400,color:"#9ca3af"}}>(Optional but recommended)</span></p>
                <div style={{border:"2px dashed #d1d5db",borderRadius:8,padding:"14px 16px",background:"#f9fafb"}}>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#1e3a5f",fontSize:13,fontWeight:500,marginBottom:uploadedFile?10:0}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2" width="16" height="16"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                    Upload registration slip, course form, or student ID
                    <input type="file" style={{display:"none"}} onChange={e=>{if(e.target.files[0]) setUploadedFile(`${e.target.files[0].name} (${Math.round(e.target.files[0].size/1024)} KB)`);}}/>
                  </label>
                  {uploadedFile && (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"white",border:"1px solid #d1fae5",borderRadius:6,padding:"8px 12px"}}>
                      <span style={{fontSize:12,color:"#374151",display:"flex",alignItems:"center",gap:6}}>
                        <span style={{color:"#16a34a"}}>✓</span> {uploadedFile}
                      </span>
                      <button onClick={()=>setUploadedFile("")} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:12}}>Remove</button>
                    </div>
                  )}
                </div>
                <p style={{margin:"4px 0 0",fontSize:11,color:"#9ca3af"}}>PDF, JPG, PNG. Max 10MB.</p>
              </div>

              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:20}}/>

              {/* Attestation */}
              <div style={{marginBottom:20}}>
                <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#6b7280",letterSpacing:.7}}>ATTESTATION <span style={{color:"#ef4444"}}>*</span></p>
                <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",marginBottom:16}}>
                  <div onClick={()=>setAttestation(p=>!p)} style={{width:18,height:18,borderRadius:4,border:`2px solid ${attestation?"#1e3a5f":"#d1d5db"}`,background:attestation?"#1e3a5f":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,cursor:"pointer"}}>
                    {attestation && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
                  </div>
                  <span style={{fontSize:13,color:"#374151",lineHeight:1.5}}>I certify this information is accurate based on official departmental records.</span>
                </label>
                {errors.attestation && <p style={{margin:"0 0 12px",fontSize:12,color:"#ef4444"}}>{errors.attestation}</p>}
                <div>
                  <p style={{margin:"0 0 6px",fontSize:13,color:"#374151",fontWeight:500}}>Digital Signature: <span style={{color:"#ef4444"}}>*</span> <span style={{fontSize:11,color:"#9ca3af"}}>(type full name)</span></p>
                  <input value={signature} onChange={e=>setSignature(e.target.value)} placeholder={vaName}
                    style={{...inp,maxWidth:400,borderColor:errors.signature?"#ef4444":"#d1d5db"}}/>
                  {errors.signature && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{errors.signature}</p>}
                </div>
              </div>

              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:20}}/>

              {/* Action buttons */}
              <div style={{display:"flex",gap:10}}>
                <button style={{padding:"11px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  Save Draft
                </button>
                <button onClick={()=>setTimedOut(true)}
                  style={{padding:"11px 12px",border:"1.5px dashed #d1d5db",borderRadius:8,background:"white",color:"#9ca3af",fontSize:11,fontWeight:500,cursor:"pointer"}}
                  title="Demo only — triggers timeout overlay">
                  ⏱ Timeout
                </button>
                <button onClick={()=>setShowDelegate(true)}
                  style={{padding:"11px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                  Delegate {hopCount>0 && <span style={{background:"#1e3a5f",color:"white",borderRadius:10,padding:"1px 6px",fontSize:11,fontWeight:700}}>{hopCount}/{MAX_HOPS}</span>}
                </button>
                <button onClick={()=>setShowAudit(true)}
                  style={{padding:"11px 14px",border:"1.5px dashed #d1d5db",borderRadius:8,background:"white",color:"#6b7280",fontSize:12,fontWeight:500,cursor:"pointer"}}
                  title="View delegation audit trail">
                  🔍 Audit
                </button>
                {sessionMode && (
                  <button onClick={onSkip} style={{padding:"11px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    Skip
                  </button>
                )}
                <button onClick={handleSubmit}
                  style={{flex:1,padding:"11px 18px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
                  onMouseEnter={e=>e.currentTarget.style.background="#15294a"}
                  onMouseLeave={e=>e.currentTarget.style.background="#1e3a5f"}>
                  Submit &amp; Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SUBMISSION OTP OVERLAY (item 6) ──────────────────────────────────── */}
      {showOTP && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)"}}>
          <div style={{background:"white",borderRadius:14,overflow:"hidden",width:"100%",maxWidth:440,boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}>
            <div style={{background:"#1e3a5f",padding:"16px 22px",display:"flex",alignItems:"center",gap:10}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" width="18" height="18"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>Confirm Submission</p>
            </div>
            <div style={{padding:"26px 26px"}}>
              <h3 style={{margin:"0 0 8px",fontSize:17,fontWeight:700,color:"#111827"}}>Enter your submission OTP</h3>
              <p style={{margin:"0 0 6px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>
                A one-time code has been sent to your institutional email to confirm your submission for:
              </p>
              <p style={{margin:"0 0 20px",fontSize:14,fontWeight:600,color:"#1e3a5f"}}>{student.name} — {student.matric}</p>

              <p style={{margin:"0 0 6px",fontSize:12,color:"#6b7280",lineHeight:1.5}}>
                This OTP is your formal attestation of authority. By entering it, you confirm that the information you have provided is accurate based on official institutional records.
              </p>

              <div style={{margin:"16px 0 8px"}}>
                <input value={otpValue} onChange={e=>setOtpValue(e.target.value.replace(/\D/g,"").slice(0,6))}
                  onKeyDown={e=>e.key==="Enter"&&handleConfirmOTP()}
                  type="text" placeholder="6-digit code" maxLength={6} inputMode="numeric" autoFocus
                  style={{width:"100%",padding:"14px",border:`1.5px solid ${otpError?"#ef4444":"#d1d5db"}`,borderRadius:8,fontSize:22,outline:"none",boxSizing:"border-box",letterSpacing:8,textAlign:"center"}}/>
                {otpError && <p style={{margin:"6px 0 0",fontSize:12,color:"#ef4444"}}>{otpError}</p>}
              </div>

              <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>
                Demo: use code <strong style={{color:"#1e3a5f",letterSpacing:3}}>739204</strong>
              </p>

              <button onClick={handleConfirmOTP}
                style={{width:"100%",padding:"12px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:10}}>
                Submit Verification →
              </button>

              <div style={{display:"flex",gap:10}}>
                {otpResendCnt >= MAX_RESEND ? (
                  <div style={{flex:1,background:"#fee2e2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
                    <p style={{margin:0,fontSize:12,color:"#b91c1c",fontWeight:500}}>Too many requests. Please wait 30 minutes or contact your Veriport Officer.</p>
                  </div>
                ) : (
                  <button onClick={handleResendOTP}
                    style={{flex:1,padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:otpResent?"#16a34a":"#6b7280",fontSize:13,cursor:"pointer",fontWeight:otpResent?600:400}}>
                    {otpResent ? "✓ OTP Resent" : `Resend OTP${otpResendCnt>0?` (${MAX_RESEND - otpResendCnt} left)`:""}`}
                  </button>
                )}
                <button onClick={()=>{setShowOTP(false);setOtpValue("");setOtpError("");}}
                  style={{flex:1,padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>
                  ← Back to Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SESSION TIMEOUT OVERLAY (item 3) ─────────────────────────────────── */}
      {timedOut && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(3px)"}}>
          <div style={{background:"white",borderRadius:14,overflow:"hidden",width:"100%",maxWidth:400,boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}>
            <div style={{background:"#1e3a5f",padding:"16px 22px",display:"flex",alignItems:"center",gap:10}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>Session Timed Out</p>
            </div>
            <div style={{padding:"24px 24px"}}>
              <p style={{margin:"0 0 6px",fontSize:15,fontWeight:600,color:"#111827"}}>Your session has expired</p>
              <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>Your work has been auto-saved. Enter your PIN to resume exactly where you left off.</p>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>PIN</label>
              <input value={pinResume} onChange={e=>setPinResume(e.target.value.replace(/\D/g,"").slice(0,6))}
                onKeyDown={e=>e.key==="Enter"&&handleResumeSession()}
                type="password" placeholder="Enter your PIN" maxLength={6} inputMode="numeric" autoFocus
                style={{width:"100%",padding:"13px",border:`1.5px solid ${pinResumeErr?"#ef4444":"#d1d5db"}`,borderRadius:8,fontSize:20,outline:"none",boxSizing:"border-box",letterSpacing:6,textAlign:"center",marginBottom:8}}/>
              {pinResumeErr && <p style={{margin:"0 0 12px",fontSize:12,color:"#ef4444"}}>{pinResumeErr}</p>}
              <p style={{margin:"0 0 16px",fontSize:12,color:"#9ca3af"}}>Demo: PIN is <strong style={{color:"#1e3a5f",letterSpacing:2}}>1234</strong></p>
              <button onClick={handleResumeSession}
                style={{width:"100%",padding:"12px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
                Resume Session →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELEGATION DRAWER (item 5) ────────────────────────────────────────── */}
      {showDelegate && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:2000,display:"flex",alignItems:"flex-end",justifyContent:"center"}}
          onClick={e=>{if(e.target===e.currentTarget){setShowDelegate(false);setDelConfirmed(false);setDelEmail("");setDelName("");setDelRole("");setDelError("");}}}>
          <div style={{background:"white",borderRadius:"14px 14px 0 0",width:"100%",maxWidth:560,padding:"24px 24px 32px",boxShadow:"0 -4px 32px rgba(0,0,0,0.15)",maxHeight:"90vh",overflowY:"auto"}}>

            {/* Cap reached — VO review required */}
            {hopCount >= MAX_HOPS && !delConfirmed ? (
              <div style={{textAlign:"center",padding:"8px 0"}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2.5" width="26" height="26"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
                </div>
                <h3 style={{margin:"0 0 8px",fontSize:17,fontWeight:700,color:"#111827"}}>Delegation Cap Reached</h3>
                <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>
                  This task has reached the maximum of <strong>{MAX_HOPS} delegation hops</strong>. Further delegation requires a Veriport Officer to review the chain and approve continuation.
                </p>
                <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"12px 14px",marginBottom:20,textAlign:"left"}}>
                  <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#b91c1c"}}>Current chain ({delChain.length} participants)</p>
                  {delChain.map((p,i)=>(
                    <p key={i} style={{margin:"3px 0",fontSize:12,color:"#374151"}}><strong>{i+1}.</strong> {p.name} — {p.email}</p>
                  ))}
                </div>
                <button onClick={()=>{setShowDelegate(false);}}
                  style={{width:"100%",padding:"12px",border:"1px solid #e5e7eb",borderRadius:8,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer"}}>
                  Close — Contact Your Veriport Officer
                </button>
              </div>

            /* Confirmed state */
            ) : delConfirmed ? (
              <div style={{textAlign:"center",padding:"8px 0 4px"}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="26" height="26"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 style={{margin:"0 0 8px",fontSize:17,fontWeight:700,color:"#111827"}}>Delegation Sent</h3>
                <p style={{margin:"0 0 6px",fontSize:14,color:"#374151"}}><strong>{delChain[delChain.length-1].email}</strong></p>
                <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>
                  {delChain[delChain.length-1].name} has been notified. They will receive an OTP to set up their PIN and begin verification. Every action is recorded on the audit trail.
                </p>
                {/* Chain summary */}
                <div style={{background:"#f8f9fa",borderRadius:8,padding:"12px 14px",marginBottom:16,textAlign:"left"}}>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:700,color:"#6b7280",letterSpacing:.5}}>DELEGATION CHAIN — {delChain.length} PARTICIPANTS</p>
                  {delChain.map((p,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:i<delChain.length-1?10:0}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                        <div style={{width:22,height:22,borderRadius:"50%",background:i===0?"#1e3a5f":"#7c3aed",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <span style={{fontSize:10,fontWeight:700,color:"white"}}>{i+1}</span>
                        </div>
                        {i<delChain.length-1 && <div style={{width:2,height:14,background:"#e5e7eb",margin:"2px 0"}}/>}
                      </div>
                      <div style={{flex:1}}>
                        <p style={{margin:"0 0 1px",fontSize:12,fontWeight:600,color:"#111827"}}>{p.name} {i===delChain.length-1&&<span style={{fontSize:10,background:"#dcfce7",color:"#16a34a",padding:"1px 5px",borderRadius:4,marginLeft:4}}>Current</span>}</p>
                        <p style={{margin:"0 0 1px",fontSize:11,color:"#3b82f6"}}>{p.email}</p>
                        <p style={{margin:0,fontSize:10,color:"#9ca3af"}}>{p.role} · {p.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>{setShowDelegate(false);setDelConfirmed(false);setDelEmail("");setDelName("");setDelRole("");}}
                    style={{flex:1,padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>
                    Close
                  </button>
                  <button onClick={()=>{setShowDelegate(false);setDelConfirmed(false);setDelEmail("");setDelName("");setDelRole("");onBack();}}
                    style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                    Return to Task List
                  </button>
                </div>
              </div>

            /* Delegate form */
            ) : (
              <>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <h3 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>Delegate this Student</h3>
                  <button onClick={()=>{setShowDelegate(false);setDelError("");}} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:20,lineHeight:1}}>×</button>
                </div>
                <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280",lineHeight:1.6}}>
                  Delegate verification of <strong>{student.name}</strong> to another qualified staff member. Hop <strong>{hopCount+1} of {MAX_HOPS}</strong> maximum.
                </p>

                {/* Current chain */}
                {delChain.length > 0 && (
                  <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:16}}>
                    <p style={{margin:"0 0 8px",fontSize:11,fontWeight:700,color:"#6b7280",letterSpacing:.5}}>CURRENT CHAIN</p>
                    {delChain.map((p,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:i<delChain.length-1?8:0}}>
                        <div style={{width:20,height:20,borderRadius:"50%",background:i===0?"#1e3a5f":"#7c3aed",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <span style={{fontSize:10,fontWeight:700,color:"white"}}>{i+1}</span>
                        </div>
                        <div style={{flex:1}}>
                          <p style={{margin:0,fontSize:12,fontWeight:600,color:"#111827"}}>{p.name} <span style={{color:"#9ca3af",fontWeight:400}}>({p.role})</span></p>
                          <p style={{margin:0,fontSize:11,color:"#3b82f6"}}>{p.email}</p>
                        </div>
                        {i===delChain.length-1 && <span style={{fontSize:10,background:"#dbeafe",color:"#1d4ed8",padding:"2px 6px",borderRadius:4,flexShrink:0}}>Current holder</span>}
                      </div>
                    ))}
                    {/* Hop counter */}
                    <div style={{marginTop:10,display:"flex",gap:4}}>
                      {Array.from({length:MAX_HOPS}).map((_,i)=>(
                        <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<hopCount?"#1e3a5f":"#e5e7eb"}}/>
                      ))}
                    </div>
                    <p style={{margin:"4px 0 0",fontSize:11,color:"#6b7280"}}>{hopCount} of {MAX_HOPS} hops used</p>
                  </div>
                )}

                {/* Form */}
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Institutional Email <span style={{color:"#ef4444"}}>*</span></label>
                  <input value={delEmail} onChange={e=>setDelEmail(e.target.value)} placeholder="delegate@institution.edu.ng" type="email"
                    style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${delError?"#ef4444":"#d1d5db"}`,borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
                  {delError && <p style={{margin:"6px 0 0",fontSize:12,color:"#ef4444"}}>{delError}</p>}
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Full Name <span style={{fontSize:11,color:"#9ca3af",fontWeight:400}}>(optional)</span></label>
                  <input value={delName} onChange={e=>setDelName(e.target.value)} placeholder="e.g. Dr. Ngozi Adeleke"
                    style={{width:"100%",padding:"10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
                </div>
                <div style={{marginBottom:20}}>
                  <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Role / Title <span style={{fontSize:11,color:"#9ca3af",fontWeight:400}}>(optional)</span></label>
                  <input value={delRole} onChange={e=>setDelRole(e.target.value)} placeholder="e.g. Deputy Registrar"
                    style={{width:"100%",padding:"10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
                </div>
                <div style={{padding:"12px 14px",background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:8,marginBottom:20}}>
                  <p style={{margin:0,fontSize:12,color:"#92400e",lineHeight:1.6}}>
                    ⚠️ The delegate will receive an OTP to their institutional email. They must complete their own PIN setup before they can begin. Personal email addresses (Gmail, Yahoo etc.) are not permitted.
                  </p>
                </div>
                <button onClick={handleDelegate}
                  style={{width:"100%",padding:"12px",border:"none",borderRadius:8,background:"#1e3a5f",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
                  Send Delegation →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── AUDIT TRAIL OVERLAY ────────────────────────────────────────────────── */}
      {showAudit && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
          <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.15)",display:"flex",flexDirection:"column"}}>
            <div style={{background:"#1e3a5f",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
              <div>
                <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:.8}}>DELEGATION AUDIT TRAIL</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{student.name}</p>
              </div>
              <button onClick={()=>setShowAudit(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"20px 20px"}}>
              <p style={{margin:"0 0 16px",fontSize:12,color:"#6b7280"}}>Full identity-captured record of every participant in this verification task.</p>

              {/* Timeline */}
              {delChain.map((p,i)=>(
                <div key={i} style={{display:"flex",gap:12,marginBottom:20}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:i===0?"#1e3a5f":"#7c3aed",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:12,fontWeight:700,color:"white"}}>{i+1}</span>
                    </div>
                    {i<delChain.length-1 && <div style={{width:2,flex:1,background:"#e5e7eb",margin:"4px 0",minHeight:20}}/>}
                  </div>
                  <div style={{flex:1,background:i===delChain.length-1?"#f0f9ff":"#f9fafb",border:`1px solid ${i===delChain.length-1?"#bae6fd":"#e5e7eb"}`,borderRadius:10,padding:"12px 14px",marginBottom:0}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                      <p style={{margin:0,fontSize:13,fontWeight:700,color:"#111827"}}>{p.name}</p>
                      {i===delChain.length-1 && <span style={{fontSize:10,background:"#0ea5e9",color:"white",padding:"2px 6px",borderRadius:4}}>Current</span>}
                      {i===0 && <span style={{fontSize:10,background:"#1e3a5f",color:"white",padding:"2px 6px",borderRadius:4}}>Original</span>}
                    </div>
                    <p style={{margin:"0 0 2px",fontSize:12,color:"#3b82f6"}}>{p.email}</p>
                    <p style={{margin:"0 0 6px",fontSize:12,color:"#6b7280"}}>{p.role}</p>
                    <div style={{borderTop:"1px solid #e5e7eb",paddingTop:6}}>
                      <p style={{margin:"0 0 2px",fontSize:11,color:"#9ca3af"}}>Action: <span style={{color:"#374151",fontWeight:500}}>{p.action}</span></p>
                      <p style={{margin:"0 0 2px",fontSize:11,color:"#9ca3af"}}>Timestamp: <span style={{color:"#374151"}}>{p.timestamp}</span></p>
                      <p style={{margin:0,fontSize:11,color:"#9ca3af"}}>OTP confirmed: <span style={{color:"#16a34a",fontWeight:500}}>✓ Verified</span></p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Hop counter */}
              <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"14px 16px",marginTop:4}}>
                <p style={{margin:"0 0 8px",fontSize:12,fontWeight:600,color:"#374151"}}>Delegation hops used</p>
                <div style={{display:"flex",gap:6,marginBottom:6}}>
                  {Array.from({length:MAX_HOPS}).map((_,i)=>(
                    <div key={i} style={{flex:1,height:8,borderRadius:4,background:i<hopCount?"#1e3a5f":"#e5e7eb"}}/>
                  ))}
                </div>
                <p style={{margin:0,fontSize:12,color:hopCount>=MAX_HOPS?"#b91c1c":"#6b7280"}}>
                  {hopCount} of {MAX_HOPS} hops used{hopCount>=MAX_HOPS?" — cap reached, VO review required":""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// VERIFICATION EXECUTIVE (VE) SHELL — VE-01 + VE-02
// ════════════════════════════════════════════════════════════════════════════════

const VE_BATCHES = [
  { id:1, client:"Zenith Bank",    batch:"Feb 2026 Intake",    tasks:45, completed:"Feb 5", age:1, warning:false },
  { id:2, client:"MTN Nigeria",    batch:"Tech Hiring Q1",     tasks:23, completed:"Feb 5", age:1, warning:false },
  { id:3, client:"Dangote Group",  batch:"Graduate Program",   tasks:67, completed:"Feb 4", age:2, warning:false },
  { id:4, client:"Access Bank",    batch:"Branch Staff",       tasks:34, completed:"Feb 4", age:2, warning:false },
  { id:5, client:"Shell Nigeria",  batch:"Contractor Verify",  tasks:12, completed:"Feb 3", age:3, warning:false },
  { id:6, client:"Chevron",        batch:"Field Ops Hire",     tasks:28, completed:"Feb 3", age:3, warning:false },
  { id:7, client:"GTBank",         batch:"Management Trainee", tasks:56, completed:"Feb 2", age:4, warning:false },
  { id:8, client:"Unilever",       batch:"Sales Team",         tasks:19, completed:"Feb 1", age:5, warning:true  },
];

const VE_TASKS_BASE = [
  { id:1,  candidate:"Ada Okonkwo",   service:"Employment Reference", outcome:"Verified",      evidence:3, status:"Review", vo:"Damilola Adeyemi", date:"Feb 5", mode:"EMAIL", employer:"Dangote Industries", title:"Senior Accountant", period:"Jan 2020 – Dec 2024", hrEmail:"hr@dangote.ng", extParty:"HR Dept", response:"Secure Link", voNotes:"HR confirmed employment dates and title. Departure was voluntary resignation per company records. No disciplinary issues noted." },
  { id:2,  candidate:"Ada Okonkwo",   service:"Guarantor",            outcome:"Verified",      evidence:2, status:"Review", vo:"Damilola Adeyemi", date:"Feb 5", mode:"EMAIL", employer:"—", title:"—", period:"—", hrEmail:"—", extParty:"Guarantor", response:"Email", voNotes:"Guarantor confirmed relationship and information." },
  { id:3,  candidate:"Ada Okonkwo",   service:"Address Verification", outcome:"Verified",      evidence:5, status:"Review", vo:"Tunde Fashola",    date:"Feb 5", mode:"FIELD", employer:"—", title:"—", period:"—", hrEmail:"—", extParty:"Neighbour",  response:"In-person", voNotes:"Address confirmed. Resident confirmed for 4+ years." },
  { id:4,  candidate:"Chidi Nwosu",   service:"Employment Reference", outcome:"Discrepancy",   evidence:4, status:"Review", vo:"Damilola Adeyemi", date:"Feb 5", mode:"EMAIL", employer:"First Bank",         title:"Branch Manager",    period:"Jan 2020 – Dec 2024", hrEmail:"hr@firstbank.ng", extParty:"HR Dept", response:"Email", voNotes:"Employer says employment ended March 2024. Candidate claimed December 2024. 9-month discrepancy." },
  { id:5,  candidate:"Chidi Nwosu",   service:"Guarantor",            outcome:"Verified",      evidence:2, status:"Review", vo:"Chinedu Okafor",   date:"Feb 5", mode:"EMAIL", employer:"—", title:"—", period:"—", hrEmail:"—", extParty:"Guarantor", response:"Email", voNotes:"Guarantor confirmed all details." },
  { id:6,  candidate:"Chidi Nwosu",   service:"Address Verification", outcome:"Verified",      evidence:6, status:"Review", vo:"Tunde Fashola",    date:"Feb 4", mode:"FIELD", employer:"—", title:"—", period:"—", hrEmail:"—", extParty:"Landlord", response:"In-person", voNotes:"Landlord confirmed tenancy of 2 years." },
  { id:7,  candidate:"Emeka Udo",     service:"Employment Reference", outcome:"Verified",      evidence:3, status:"Review", vo:"Ngozi Eze",        date:"Feb 5", mode:"EMAIL", employer:"UBA",                title:"IT Officer",        period:"Mar 2019 – Oct 2023", hrEmail:"hr@uba.ng",       extParty:"HR Dept", response:"Secure Link", voNotes:"Employment verified. Left voluntarily." },
  { id:8,  candidate:"Emeka Udo",     service:"Guarantor",            outcome:"Not Verified",  evidence:2, status:"Review", vo:"Ngozi Eze",        date:"Feb 5", mode:"EMAIL", employer:"—", title:"—", period:"—", hrEmail:"—", extParty:"Guarantor", response:"No response", voNotes:"Guarantor unreachable after 3 attempts." },
  { id:9,  candidate:"Fatima Sule",   service:"Employment Reference", outcome:"Verified",      evidence:4, status:"Review", vo:"Adebayo Fashola",  date:"Feb 4", mode:"PORTAL", employer:"Stanbic IBTC",     title:"Analyst",           period:"Jun 2021 – Aug 2024", hrEmail:"verify@stanbic.ng", extParty:"HR Portal", response:"Portal", voNotes:"HR portal confirmed all employment details." },
  { id:10, candidate:"Fatima Sule",   service:"Address Verification", outcome:"Verified",      evidence:3, status:"Review", vo:"Tunde Fashola",    date:"Feb 4", mode:"FIELD", employer:"—", title:"—", period:"—", hrEmail:"—", extParty:"Neighbour", response:"In-person", voNotes:"Address confirmed by two neighbours." },
];


export { VAPortal };
