export default function VAComparisonScreen({ student, formData, vaName, onContinue, Topbar }) {
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
