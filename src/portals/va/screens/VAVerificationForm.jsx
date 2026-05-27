import { useState } from "react";

export default function VAVerificationForm({ student, sessionIndex, sessionTotal, sessionMode, vaName, vaDetails, savedData, onBack, onSubmit, onSkip, Topbar }) {
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
