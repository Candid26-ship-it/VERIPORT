import { useState } from "react";
import { VA_STUDENTS } from "./data.js";
import VATopbar from "./components/VATopbar.jsx";
import VAOnboarding from "./screens/VAOnboarding.jsx";
import VAAuth from "./screens/VAAuth.jsx";
import VAVerificationForm from "./screens/VAVerificationForm.jsx";
import VAEvidentialReport from "./screens/VAEvidentialReport.jsx";
import VAComparisonScreen from "./screens/VAComparisonScreen.jsx";

export function VAPortal({ user, activeProfile, onSwitchProfile, onSignOut }) {
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
    <VATopbar activeProfile={activeProfile} onSwitchProfile={onSwitchProfile}/>
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

export default VAPortal;
