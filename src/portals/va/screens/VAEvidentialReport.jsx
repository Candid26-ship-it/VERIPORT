export default function VAEvidentialReport({ students, submissions, vaName, vaEmail, vaRole, institution, delChainRef, onClose, Topbar }) {
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
