import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

function CandidatePortal({ activeProfile, onSwitchProfile, onSignOut }) {
  // Global demo selector — show Return Visit or Link Expired for demo
  const [demoScreen, setDemoScreen] = useState(null); // null | "return" | "expired"
  const [screen, setScreen] = useState("welcome"); // welcome|privacy|nin|consent|personal|documents|review|confirmation|ninfailed|blocked
  const [ninAttempts, setNinAttempts] = useState(0);
  const [ninValue, setNinValue] = useState("");
  const [ninState, setNinState] = useState("idle"); // idle|verifying|success|error
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [consentChecks, setConsentChecks] = useState({employment:false,education:false,address:false,guarantor:false,criminal:false,share:false});
  const [signature, setSignature] = useState("");
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Personal data state
  const [phone, setPhone] = useState("+234 803 456 7890");
  const [email, setEmail] = useState("yusuf.ibrahim@gmail.com");
  const [street, setStreet] = useState("15 Ahmadu Bello Way, Apt 3B");
  const [city, setCity] = useState("Victoria Island");
  const [addrState, setAddrState] = useState("Lagos");
  const [lga, setLga] = useState("Eti-Osa");
  const [duration, setDuration] = useState("2 years, 3 months");
  const [landmark, setLandmark] = useState("Opposite First Bank");
  const [employer, setEmployer] = useState("Access Bank PLC");
  const [jobTitle, setJobTitle] = useState("Senior Analyst");
  const [startDate, setStartDate] = useState("March 2022");
  const [currentJob, setCurrentJob] = useState(true);
  const [hrName, setHrName] = useState("Mrs. Folake Adeyemi");
  const [hrEmail, setHrEmail] = useState("hr@accessbank.ng");
  const [hrPhone, setHrPhone] = useState("+234 802 345 6789");
  const [university, setUniversity] = useState("University of Lagos");
  const [degree, setDegree] = useState("B.Sc. Computer Science");
  const [grade, setGrade] = useState("Second Class Upper");
  const [gradYear, setGradYear] = useState("2018");
  const [guarantorName, setGuarantorName] = useState("Dr. Chukwuma Okonkwo");
  const [guarantorRel, setGuarantorRel] = useState("Former Manager");
  const [guarantorPhone, setGuarantorPhone] = useState("+234 805 678 9012");
  const [expandedSection, setExpandedSection] = useState("personal");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Document upload state
  const [uploadedDocs, setUploadedDocs] = useState({govId:"NIN_Slip_Yusuf.pdf", academic:null, address:null, employment:null, extra:null});

  const CANDIDATE_NAME = "YUSUF IBRAHIM ABUBAKAR";
  const CANDIDATE_FIRST = "Yusuf";
  const CLIENT = "Zenith Bank";
  const DEADLINE = "February 10, 2026";
  const REF = "VER-2026-0203-YIA-7842";

  const STEPS = ["Privacy & Terms", "NIN Verification", "Face Capture", "Authorization", "Your Information", "Documents", "Review"];
  const SCREEN_STEP = {privacy:1, nin:2, face:3, consent:4, personal:5, documents:6, review:7};
  const currentStep = SCREEN_STEP[screen] || 0;

  // Face capture state
  const [faceCapture, setFaceCapture] = useState(null);
  const [faceCamState, setFaceCamState] = useState("idle"); // idle|active|captured|error
  const [faceCamError, setFaceCamError] = useState("");

  // Simulate NIN verification
  const verifyNIN = () => {
    if (ninValue.length !== 11) return;
    setNinState("verifying");
    setTimeout(() => {
      if (ninValue === "00000000000") {
        // simulate failed
        const newAttempts = ninAttempts + 1;
        setNinAttempts(newAttempts);
        if (newAttempts >= 3) { setScreen("blocked"); setNinState("idle"); }
        else { setScreen("ninfailed"); setNinState("idle"); }
      } else {
        setNinState("success");
      }
    }, 2000);
  };

  const allConsentChecked = Object.values(consentChecks).every(Boolean);
  const signatureValid = signature.toLowerCase().trim() === CANDIDATE_NAME.toLowerCase().trim();
  const requiredDocs = [uploadedDocs.govId, uploadedDocs.academic, uploadedDocs.address];
  const uploadedCount = requiredDocs.filter(Boolean).length;

  // ─── Shared UI primitives ────────────────────────────────────────────────────
  const DragnetLogo = () => (
    <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:24}}>
      <div style={{width:40,height:40,background:"#b91c1c",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg viewBox="0 0 24 24" fill="white" width={22} height={22}><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
      </div>
      <div>
        <p style={{margin:0,fontSize:16,fontWeight:800,color:"#111827",letterSpacing:.5}}>DRAGNET</p>
        <p style={{margin:0,fontSize:10,color:"#6b7280",letterSpacing:.5}}>VERIFICATION SERVICES</p>
      </div>
    </div>
  );

  const StepBar = ({step, total=7}) => (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:12,color:"#6b7280"}}>Step {step} of {total}</span>
        <span style={{fontSize:12,color:"#6b7280"}}>{STEPS[step-1]}</span>
      </div>
      <div style={{height:4,background:"#e5e7eb",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",background:"#b91c1c",borderRadius:4,width:`${(step/total)*100}%`,transition:"width .3s"}}/>
      </div>
    </div>
  );

  const BackBtn = ({to}) => (
    <button onClick={()=>setScreen(to)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#374151",cursor:"pointer",fontSize:14,fontWeight:500,padding:0,marginBottom:20}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back
    </button>
  );

  const PrimaryBtn = ({onClick, disabled, children, style={}}) => (
    <button onClick={onClick} disabled={disabled}
      style={{width:"100%",padding:"14px",border:"none",borderRadius:10,background:disabled?"#d1d5db":"#b91c1c",color:"white",fontSize:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",letterSpacing:.3,...style}}>
      {children}
    </button>
  );

  const SecondaryBtn = ({onClick, children}) => (
    <button onClick={onClick}
      style={{width:"100%",padding:"13px",border:"1.5px solid #d1d5db",borderRadius:10,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer"}}>
      {children}
    </button>
  );

  const Card = ({children, style={}}) => (
    <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 18px",...style}}>{children}</div>
  );

  const Divider = () => <div style={{borderTop:"1px solid #e5e7eb",margin:"20px 0"}}/>;

  const Inp = ({value, onChange, placeholder, type="text", locked=false, style={}}) => (
    <div style={{position:"relative"}}>
      <input value={value} onChange={onChange} placeholder={placeholder} type={type} disabled={locked}
        style={{width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:locked?"#6b7280":"#111827",background:locked?"#f3f4f6":"white",...style}}/>
      {locked && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="14" height="14" style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)"}}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
    </div>
  );

  const Label = ({children, required}) => (
    <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>
      {children}{required && <span style={{color:"#b91c1c",marginLeft:2}}>*</span>}
    </label>
  );

  const Check = ({checked, onChange, children}) => (
    <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:14,color:"#374151",lineHeight:1.5}}>
      <div onClick={onChange} style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2,cursor:"pointer"}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
      <span>{children}</span>
    </label>
  );

  const SectionHeader = ({id, title, status, expanded, onToggle}) => (
    <button onClick={onToggle} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",border:"none",background:"none",cursor:"pointer",borderBottom:"1px solid #e5e7eb"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" width="14" height="14"><path d={expanded?"M18 15l-6-6-6 6":"M9 18l6-6-6-6"}/></svg>
        <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{title}</span>
      </div>
      <span style={{fontSize:12,fontWeight:500,color:status==="done"?"#15803d":"#9ca3af",display:"flex",alignItems:"center",gap:4}}>
        {status==="done" ? <><svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg> Done</> : "○ Pending"}
      </span>
    </button>
  );

  // ─── Topbar with profile switcher ────────────────────────────────────────────
  const CandidateTopbar = () => (
    <div style={{background:"#1e3a5f",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:28,height:28,background:"#b91c1c",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg viewBox="0 0 24 24" fill="white" width={16} height={16}><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
        </div>
        <span style={{fontSize:13,fontWeight:700,color:"white",letterSpacing:.5}}>DRAGNET CANDIDATE PORTAL</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {/* Quick demo nav */}
        <select value={demoScreen||""} onChange={e=>setDemoScreen(e.target.value||null)}
          style={{fontSize:11,padding:"4px 8px",borderRadius:6,border:"1px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.1)",color:"white",cursor:"pointer",outline:"none"}}>
          <option value="">Demo: Normal Flow</option>
          <option value="return">Return Visit</option>
          <option value="expired">Link Expired</option>
        </select>
        <RoleSwitcher activeProfile={activeProfile} onSwitch={onSwitchProfile}/>
      </div>
    </div>
  );

  // ─── Wrapper: centered narrow card layout (mobile-first) ─────────────────────
  const PageWrap = ({children, noPad}) => (
    <div style={{flex:1,overflowY:"auto",background:"#f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",padding:noPad?"0":"24px 16px 40px"}}>
      <div style={{width:"100%",maxWidth:520,background:"white",borderRadius:16,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",padding:noPad?"0":"28px 28px 32px"}}>
        {children}
      </div>
    </div>
  );

  // ═══ SCREEN ROUTER ════════════════════════════════════════════════════════════
  const renderPortalScreen = () => {

    // Demo overrides
    if (demoScreen === "expired") return renderExpired();
    if (demoScreen === "return")  return renderReturn();

    switch(screen) {
      case "welcome":      return renderWelcome();
      case "privacy":      return renderPrivacy();
      case "nin":          return renderNIN();
      case "ninfailed":    return renderNINFailed();
      case "blocked":      return renderBlocked();
      case "face":         return renderFaceCapture();
      case "consent":      return renderConsent();
      case "personal":     return renderPersonal();
      case "documents":    return renderDocuments();
      case "review":       return renderReview();
      case "confirmation": return renderConfirmation();
      default:             return renderWelcome();
    }
  };

  // ─── CAND-01: Welcome ────────────────────────────────────────────────────────
  const renderWelcome = () => (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Background Verification Request</h2>
        <p style={{margin:0,fontSize:14,color:"#374151"}}>Hello <strong>{CANDIDATE_FIRST}</strong>,</p>
      </div>
      <p style={{fontSize:14,color:"#374151",lineHeight:1.7,margin:"0 0 4px"}}>
        <strong>{CLIENT}</strong> has requested a background verification as part of your application.
      </p>
      <p style={{fontSize:14,color:"#6b7280",lineHeight:1.7,margin:"0 0 20px"}}>
        This process takes about <strong>10–15 minutes</strong>. You can save your progress and return anytime before the deadline.
      </p>
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>WHAT YOU'LL NEED:</p>
      {["Your NIN (National Identification Number)","Employment history details","Educational qualifications","Current residential address","Guarantor contact information"].map((item,i)=>(
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="15" height="15" style={{flexShrink:0,marginTop:2}}><path d="M20 6L9 17l-5-5"/></svg>
          <span style={{fontSize:14,color:"#374151"}}>{item}</span>
        </div>
      ))}
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>DOCUMENTS TO UPLOAD:</p>
      {["Government-issued ID (front & back)","Academic certificates","Employment letters (if available)","Utility bill or proof of address"].map((item,i)=>(
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
          <span style={{color:"#6b7280",fontSize:14,flexShrink:0}}>•</span>
          <span style={{fontSize:14,color:"#374151"}}>{item}</span>
        </div>
      ))}
      <Divider/>
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"12px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:18}}>⏱️</span>
        <span style={{fontSize:13,color:"#92400e"}}>Deadline: <strong>{DEADLINE}</strong> (7 days remaining)</span>
      </div>
      <PrimaryBtn onClick={()=>setScreen("privacy")}>Get Started →</PrimaryBtn>
      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Questions? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
      <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Powered by Dragnet Verification Services</p>
    </PageWrap>
  );

  // ─── CAND-02: Privacy & Terms ────────────────────────────────────────────────
  const renderPrivacy = () => (
    <PageWrap>
      <BackBtn to="welcome"/>
      <StepBar step={1}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Privacy & Terms</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please read and accept the following to continue.</p>

      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>DATA PRIVACY AGREEMENT</p>
      <Card style={{maxHeight:220,overflowY:"auto",marginBottom:14,fontSize:13,color:"#374151",lineHeight:1.7}}>
        <p style={{margin:"0 0 10px",fontWeight:600}}>In accordance with the Nigeria Data Protection Regulation (NDPR) 2019, we are required to inform you of the following:</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>1. PURPOSE OF DATA COLLECTION</p>
        <p style={{margin:"0 0 10px"}}>Your personal data is being collected solely for the purpose of conducting background verification as requested by {CLIENT}.</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>2. DATA WE COLLECT</p>
        {["National Identification Number (NIN)","Biographical information","Employment history","Educational records","Residential address","Contact information of references","Supporting documents you upload"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 6px",fontWeight:600}}>3. HOW WE USE YOUR DATA</p>
        {["Verify information provided","Contact third parties (employers, institutions, references) for confirmation","Generate verification report for client"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 6px",fontWeight:600}}>4. DATA SHARING</p>
        <p style={{margin:"0 0 10px"}}>Your verification results will be shared with {CLIENT}. We do not sell or share your data with any other third parties.</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>5. DATA RETENTION</p>
        <p style={{margin:"0 0 10px"}}>Your data will be retained for 7 years in accordance with regulatory requirements, after which it will be securely disposed.</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>6. YOUR RIGHTS</p>
        {["Access your personal data","Request correction of inaccurate data","Request deletion (subject to legal holds)","Withdraw consent (verification will stop)"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 6px",fontWeight:600}}>7. DATA CONTROLLER</p>
        <p style={{margin:0}}>Dragnet Solutions Limited · privacy@dragnet.ng</p>
      </Card>
      <Check checked={privacyChecked} onChange={()=>setPrivacyChecked(p=>!p)}>
        I have read and agree to the Data Privacy Agreement
      </Check>

      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>TERMS OF USE</p>
      <Card style={{maxHeight:180,overflowY:"auto",marginBottom:14,fontSize:13,color:"#374151",lineHeight:1.7}}>
        <p style={{margin:"0 0 8px",fontWeight:600}}>By using this portal, you agree to:</p>
        {["Provide truthful and accurate information","Upload authentic documents only","Not impersonate another person","Complete submission by the deadline"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 8px",fontWeight:600}}>Providing false information may result in:</p>
        {["Rejection of your application","Reporting to relevant authorities","Legal action where applicable"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
      </Card>
      <Check checked={termsChecked} onChange={()=>setTermsChecked(p=>!p)}>
        I have read and agree to the Terms of Use
      </Check>

      <Divider/>
      <PrimaryBtn onClick={()=>setScreen("nin")} disabled={!privacyChecked||!termsChecked}>
        Accept & Continue →
      </PrimaryBtn>
      <p style={{margin:"16px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>If you do not agree, you may close this page. Your verification cannot proceed without consent.</p>
    </PageWrap>
  );

  // ─── CAND-03: NIN Verification ───────────────────────────────────────────────
  const renderNIN = () => (
    <PageWrap>
      <BackBtn to="privacy"/>
      <StepBar step={2}/>

      {ninState === "verifying" && (
        <div style={{textAlign:"center",padding:"40px 20px"}}>
          <h2 style={{margin:"0 0 24px",fontSize:20,fontWeight:700,color:"#111827"}}>Verify Your Identity</h2>
          <div style={{fontSize:32,marginBottom:16,animation:"spin 1s linear infinite"}}>◌</div>
          <p style={{margin:"0 0 8px",fontSize:16,fontWeight:600,color:"#374151"}}>Verifying your NIN...</p>
          <p style={{margin:0,fontSize:14,color:"#9ca3af"}}>Please wait a moment.</p>
        </div>
      )}

      {ninState === "success" && (
        <>
          <h2 style={{margin:"0 0 20px",fontSize:20,fontWeight:700,color:"#111827"}}>Identity Verified ✓</h2>
          <Card style={{borderColor:"#bbf7d0",background:"#f0fdf4",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="18" height="18"><path d="M20 6L9 17l-5-5"/></svg>
              <span style={{fontSize:14,fontWeight:700,color:"#15803d"}}>NIN Verified</span>
            </div>
            {[["Name",CANDIDATE_NAME],["Gender","Male"],["DOB","15 March 1995"]].map(([k,v])=>(
              <p key={k} style={{margin:"0 0 6px",fontSize:14,color:"#374151"}}><span style={{color:"#6b7280",marginRight:8}}>{k}:</span><strong>{v}</strong></p>
            ))}
            <p style={{margin:"12px 0 0",fontSize:13,color:"#374151",fontStyle:"italic"}}>Please confirm this information is correct.</p>
          </Card>
          <Check checked={confirmCheck} onChange={()=>setConfirmCheck(p=>!p)}>
            I confirm this is my information
          </Check>
          <Divider/>
          <PrimaryBtn onClick={()=>setScreen("face")} disabled={!confirmCheck}>Continue →</PrimaryBtn>
          <p style={{margin:"14px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Not your information? Contact support immediately.</p>
        </>
      )}

      {ninState === "idle" && (
        <>
          <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Verify Your Identity</h2>
          <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please enter your National Identification Number (NIN) to verify your identity.</p>
          <Divider/>
          <div style={{marginBottom:20}}>
            <Label required>National Identification Number (NIN)</Label>
            <Inp value={ninValue} onChange={e=>setNinValue(e.target.value.replace(/\D/g,"").slice(0,11))} placeholder="e.g. 12345678901"/>
            <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af"}}>11 digits. Find this on your NIN slip or card.</p>
          </div>
          <Card style={{marginBottom:20}}>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" width="16" height="16" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <span style={{fontSize:13,fontWeight:600,color:"#1e40af"}}>Why we need your NIN</span>
            </div>
            <p style={{margin:"0 0 8px",fontSize:13,color:"#374151",lineHeight:1.6}}>Your NIN confirms your identity through the National Identity Management Commission (NIMC). This protects both you and the organization requesting verification.</p>
            <p style={{margin:0,fontSize:13,color:"#374151"}}>Your NIN data is handled securely and only used for identity verification purposes.</p>
          </Card>
          <PrimaryBtn onClick={verifyNIN} disabled={ninValue.length!==11}>Verify NIN →</PrimaryBtn>
          <Divider/>
          <p style={{margin:0,fontSize:13,color:"#6b7280",textAlign:"center"}}>Don't know your NIN? Dial <strong>*346#</strong> from your registered phone to retrieve it.</p>
          <p style={{margin:"8px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Demo: enter any 11 digits to verify. Enter "00000000000" to simulate failure.</p>
        </>
      )}
    </PageWrap>
  );

  // ─── CAND-03C: Face Capture ──────────────────────────────────────────────────
  const faceVideoRef = useRef(null);
  const faceStreamRef = useRef(null);

  const startCamera = async () => {
    setFaceCamError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      faceStreamRef.current = stream;
      if (faceVideoRef.current) {
        faceVideoRef.current.srcObject = stream;
        faceVideoRef.current.play();
      }
      setFaceCamState("active");
    } catch (err) {
      const msg = err.name === "NotAllowedError"
        ? "Camera access was denied. Please allow camera access to continue."
        : "We could not access your camera on this device.";
      setFaceCamError(msg);
      setFaceCamState("error");
    }
  };

  const stopCamera = () => {
    if (faceStreamRef.current) {
      faceStreamRef.current.getTracks().forEach(t => t.stop());
      faceStreamRef.current = null;
    }
  };

  const capturePhoto = () => {
    const video = faceVideoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    setFaceCapture(dataUrl);
    setFaceCamState("captured");
  };

  const retakePhoto = () => {
    setFaceCapture(null);
    setFaceCamState("idle");
    setFaceCamError("");
  };

  const handleFaceFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setFaceCapture(ev.target.result); setFaceCamState("captured"); };
    reader.readAsDataURL(file);
  };

  const renderFaceCapture = () => (
    <PageWrap>
      <BackBtn to="nin"/>
      <StepBar step={3}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Facial Recognition</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>We need to capture a photo of your face to confirm your identity before continuing.</p>

      {faceCamState !== "active" && faceCamState !== "captured" && (
        <Card style={{marginBottom:20}}>
          <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:"#374151"}}>Before you begin:</p>
          {["Be in a well-lit area","Face the camera directly","Remove hats, dark glasses, or anything covering your face","Keep your face centered in the frame"].map((tip,i) => (
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="14" height="14" style={{flexShrink:0,marginTop:2}}><path d="M20 6L9 17l-5-5"/></svg>
              <p style={{margin:0,fontSize:13,color:"#374151"}}>{tip}</p>
            </div>
          ))}
        </Card>
      )}

      {faceCamState === "error" && (
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"12px 16px",marginBottom:16}}>
          <p style={{margin:0,fontSize:13,fontWeight:600,color:"#b91c1c"}}>{faceCamError}</p>
        </div>
      )}

      {faceCamState === "active" && (
        <div style={{marginBottom:16}}>
          <div style={{position:"relative",borderRadius:12,overflow:"hidden",background:"#000",marginBottom:12}}>
            <video ref={faceVideoRef} autoPlay playsInline muted style={{width:"100%",display:"block",maxHeight:320,objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
              <div style={{width:160,height:200,border:"2px dashed rgba(255,255,255,0.6)",borderRadius:"50%"}}/>
            </div>
          </div>
          <PrimaryBtn onClick={capturePhoto}>📸 Capture Photo</PrimaryBtn>
        </div>
      )}

      {faceCamState === "captured" && faceCapture && (
        <div style={{marginBottom:16}}>
          <div style={{borderRadius:12,overflow:"hidden",marginBottom:12,border:"2px solid #bbf7d0"}}>
            <img src={faceCapture} alt="Captured face" style={{width:"100%",display:"block",maxHeight:320,objectFit:"cover"}}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,padding:"10px 14px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#15803d"}}>Photo captured successfully</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <PrimaryBtn onClick={()=>{ stopCamera(); setScreen("consent"); }}>Confirm & Continue →</PrimaryBtn>
            <SecondaryBtn onClick={retakePhoto}>↺ Retake Photo</SecondaryBtn>
          </div>
        </div>
      )}

      {(faceCamState === "idle" || faceCamState === "error") && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <PrimaryBtn onClick={startCamera}>Start Camera</PrimaryBtn>
          <div style={{textAlign:"center"}}><span style={{fontSize:12,color:"#9ca3af"}}>or</span></div>
          <label style={{width:"100%",padding:"13px",border:"1.5px solid #d1d5db",borderRadius:10,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer",textAlign:"center",display:"block",boxSizing:"border-box"}}>
            Upload Photo Instead
            <input type="file" accept="image/*" onChange={handleFaceFileUpload} style={{display:"none"}}/>
          </label>
        </div>
      )}

      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Your photo is used only to confirm your identity for this verification.</p>
    </PageWrap>
  );

  // ─── CAND-03B: NIN Failed ────────────────────────────────────────────────────
  const renderNINFailed = () => (
    <PageWrap>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48,marginBottom:8}}>⚠️</div>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Verification Unsuccessful</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151"}}>We were unable to verify your identity using the NIN you provided.</p>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:"#374151"}}>This may happen if:</p>
      {["The NIN was entered incorrectly","The NIN does not match your registered name","There is an issue with NIMC records"].map((d,i)=>(
        <p key={i} style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}>• {d}</p>
      ))}
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:"#374151"}}>What you can do:</p>
      {["Double-check your NIN and try again","Ensure you're using YOUR NIN, not someone else's","If the problem persists, contact support"].map((d,i)=>(
        <p key={i} style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}>{i+1}. {d}</p>
      ))}
      <Divider/>
      <div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:20}}>
        <p style={{margin:0,fontSize:13,color:"#92400e",fontWeight:600}}>Attempts remaining: {3-ninAttempts} of 3</p>
      </div>
      <PrimaryBtn onClick={()=>{setNinValue("");setNinState("idle");setScreen("nin");}}>Try Again</PrimaryBtn>
      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Need help? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
      <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Reference: VER-2026-0128-YIB</p>
    </PageWrap>
  );

  // ─── CAND-03B: Blocked (3 failures) ─────────────────────────────────────────
  const renderBlocked = () => (
    <PageWrap>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48,marginBottom:8}}>🚫</div>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Submission Blocked</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151",lineHeight:1.7}}>Your submission has been temporarily blocked due to multiple unsuccessful verification attempts.</p>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151",lineHeight:1.7}}>Our team has been notified and will review your case. You will receive an email with next steps within 1–2 business days.</p>
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:14,color:"#374151"}}>If you believe this is an error, please contact support with your reference number below.</p>
      <Card style={{textAlign:"center"}}>
        <p style={{margin:"0 0 4px",fontSize:12,color:"#6b7280"}}>Reference Number</p>
        <p style={{margin:0,fontSize:16,fontWeight:700,color:"#111827",fontFamily:"monospace"}}>VER-2026-0128-YIB</p>
        <p style={{margin:"6px 0 0",fontSize:12,color:"#6b7280"}}>support@dragnet.ng</p>
      </Card>
    </PageWrap>
  );

  // ─── CAND-04: Consent Form ───────────────────────────────────────────────────
  const renderConsent = () => {
    const checks = [
      {key:"employment", label:"Employment Verification *", desc:"Contact my current and previous employers to verify employment dates, job titles, and obtain references."},
      {key:"education",  label:"Education Verification *",  desc:"Contact educational institutions to verify my academic qualifications and records."},
      {key:"address",    label:"Address Verification *",    desc:"Conduct a physical visit to my residential address to confirm I reside there."},
      {key:"guarantor",  label:"Guarantor Verification *",  desc:"Contact my listed guarantor(s) to confirm our relationship and obtain their reference."},
      {key:"criminal",   label:"Criminal Record Check *",   desc:"Request a criminal background check from the Nigeria Police Force using my biometric data and NIN."},
      {key:"share",      label:"Share Results with Requesting Organisation *", desc:`I authorize Dragnet Solutions to share the verification results with ${CLIENT} who has requested this background check.`},
    ];
    return (
      <PageWrap>
        <BackBtn to="nin"/>
        <StepBar step={3}/>
        <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Authorization & Consent</h2>
        <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please review and authorize the verification activities below.</p>
        <Divider/>
        <p style={{margin:"0 0 16px",fontSize:14,color:"#374151"}}>I, <strong>{CANDIDATE_NAME}</strong>, authorize Dragnet Solutions Limited to perform the following:</p>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>VERIFICATION AUTHORIZATIONS</p>
        <div style={{marginBottom:10,padding:"10px 14px",background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb"}}>
          <Check checked={allConsentChecked} onChange={()=>{const val=!allConsentChecked;setConsentChecks({employment:val,education:val,address:val,guarantor:val,criminal:val,share:val});}}>
            <span style={{fontWeight:700,fontSize:14,color:"#111827"}}>Select All — Authorize all verification activities</span>
          </Check>
        </div>
        <Card style={{marginBottom:16}}>
          {checks.map((c,i)=>(
            <div key={c.key} style={{marginBottom:i<checks.length-1?16:0,paddingBottom:i<checks.length-1?16:0,borderBottom:i<checks.length-1?"1px solid #e5e7eb":"none"}}>
              <Check checked={consentChecks[c.key]} onChange={()=>setConsentChecks(p=>({...p,[c.key]:!p[c.key]}))}>
                <div>
                  <p style={{margin:"0 0 3px",fontWeight:600,fontSize:14,color:"#111827"}}>{c.label}</p>
                  <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.5}}>{c.desc}</p>
                </div>
              </Check>
            </div>
          ))}
        </Card>
        <Divider/>
        <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px",marginBottom:20,fontSize:13,color:"#374151",lineHeight:1.7}}>
          <p style={{margin:"0 0 6px"}}>• Providing false information may disqualify my application and may be reported to authorities.</p>
          <p style={{margin:"0 0 6px"}}>• I may withdraw consent at any time by contacting <span style={{color:"#b91c1c"}}>support@dragnet.ng</span>, which will stop verification.</p>
          <p style={{margin:0}}>• This consent is valid for 90 days from signing.</p>
        </div>
        <div style={{marginBottom:20}}>
          <Label required>Type your full name as signature</Label>
          <Inp value={signature} onChange={e=>setSignature(e.target.value)} placeholder={CANDIDATE_NAME}/>
          <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af"}}>Must match: <strong>{CANDIDATE_NAME}</strong></p>
          {signature && !signatureValid && <p style={{margin:"4px 0 0",fontSize:12,color:"#b91c1c"}}>Name does not match. Please type exactly: {CANDIDATE_NAME}</p>}
          {signature && signatureValid && <p style={{margin:"4px 0 0",fontSize:12,color:"#15803d"}}>✓ Signature accepted</p>}
        </div>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Date: February 3, 2026</p>
        <PrimaryBtn onClick={()=>setScreen("personal")} disabled={!allConsentChecked||!signatureValid}>
          Sign & Continue →
        </PrimaryBtn>
      </PageWrap>
    );
  };

  // ─── CAND-05: Personal Data Form ─────────────────────────────────────────────
  const renderPersonal = () => {
    const sections = [
      {id:"personal", title:"PERSONAL DETAILS"},
      {id:"address",  title:"CURRENT ADDRESS"},
      {id:"employment",title:"EMPLOYMENT HISTORY"},
      {id:"education",title:"EDUCATION"},
      {id:"guarantor",title:"GUARANTOR INFORMATION"},
    ];
    const sectionDone = {personal:!!(phone&&email),address:!!(street&&city),employment:!!(employer&&jobTitle),education:!!(university&&degree),guarantor:!!(guarantorName&&guarantorPhone)};

    return (
      <PageWrap>
        <BackBtn to="consent"/>
        <StepBar step={4}/>
        <h2 style={{margin:"0 0 20px",fontSize:20,fontWeight:700,color:"#111827"}}>Your Information</h2>
        {sections.map(s=>(
          <div key={s.id} style={{marginBottom:4}}>
            <SectionHeader id={s.id} title={s.title} status={sectionDone[s.id]?"done":"pending"} expanded={expandedSection===s.id} onToggle={()=>setExpandedSection(expandedSection===s.id?null:s.id)}/>
            {expandedSection===s.id && (
              <div style={{padding:"16px 0 8px"}}>
                {s.id==="personal" && <>
                  <div style={{marginBottom:12}}>
                    <Label>Full Name (from NIN)</Label>
                    <Inp value={CANDIDATE_NAME} locked={true}/>
                  </div>
                  <div style={{marginBottom:12}}>
                    <Label>Date of Birth (from NIN)</Label>
                    <Inp value="15 March 1995" locked={true}/>
                  </div>
                  <div style={{marginBottom:12}}>
                    <Label required>Phone Number</Label>
                    <Inp value={phone} onChange={e=>setPhone(e.target.value)}/>
                  </div>
                  <div style={{marginBottom:4}}>
                    <Label required>Email Address</Label>
                    <Inp value={email} onChange={e=>setEmail(e.target.value)}/>
                  </div>
                </>}
                {s.id==="address" && <>
                  <div style={{marginBottom:12}}>
                    <Label required>Street Address</Label>
                    <Inp value={street} onChange={e=>setStreet(e.target.value)}/>
                  </div>
                  <div style={{marginBottom:12}}>
                    <Label required>City/Town</Label>
                    <Inp value={city} onChange={e=>setCity(e.target.value)}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                    <div>
                      <Label required>State</Label>
                      <Inp value={addrState} onChange={e=>setAddrState(e.target.value)}/>
                    </div>
                    <div>
                      <Label required>LGA</Label>
                      <Inp value={lga} onChange={e=>setLga(e.target.value)}/>
                    </div>
                  </div>
                  <div style={{marginBottom:12}}>
                    <Label required>How long at this address?</Label>
                    <Inp value={duration} onChange={e=>setDuration(e.target.value)} placeholder="e.g. 2 years, 3 months"/>
                  </div>
                  <div style={{marginBottom:4}}>
                    <Label>Landmark (optional)</Label>
                    <Inp value={landmark} onChange={e=>setLandmark(e.target.value)} placeholder="e.g. Opposite First Bank"/>
                  </div>
                </>}
                {s.id==="employment" && <>
                  <p style={{margin:"0 0 12px",fontSize:13,fontWeight:600,color:"#374151"}}>Current / Most Recent Employer</p>
                  <div style={{marginBottom:12}}><Label required>Company Name</Label><Inp value={employer} onChange={e=>setEmployer(e.target.value)}/></div>
                  <div style={{marginBottom:12}}><Label required>Job Title</Label><Inp value={jobTitle} onChange={e=>setJobTitle(e.target.value)}/></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                    <div><Label required>Start Date</Label><Inp value={startDate} onChange={e=>setStartDate(e.target.value)} placeholder="Month Year"/></div>
                    <div style={{paddingTop:28}}>
                      <Check checked={currentJob} onChange={()=>setCurrentJob(p=>!p)}>Currently here</Check>
                    </div>
                  </div>
                  <div style={{marginBottom:12}}><Label required>HR/Manager Name</Label><Inp value={hrName} onChange={e=>setHrName(e.target.value)}/></div>
                  <div style={{marginBottom:12}}><Label required>HR/Manager Email</Label><Inp value={hrEmail} onChange={e=>setHrEmail(e.target.value)}/></div>
                  <div style={{marginBottom:4}}><Label>HR/Manager Phone</Label><Inp value={hrPhone} onChange={e=>setHrPhone(e.target.value)}/></div>
                  <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #e5e7eb"}}>
                    <p style={{margin:"0 0 12px",fontSize:13,fontWeight:600,color:"#374151"}}>Previous Employer</p>
                    <div style={{marginBottom:12}}><Label>Company Name</Label><Inp placeholder="e.g. GTBank PLC"/></div>
                    <div style={{marginBottom:12}}><Label>Job Title</Label><Inp placeholder="e.g. Analyst"/></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                      <div><Label>Start Date</Label><Inp placeholder="Month Year"/></div>
                      <div><Label>End Date</Label><Inp placeholder="Month Year"/></div>
                    </div>
                    <div style={{marginBottom:12}}><Label>HR/Manager Name</Label><Inp/></div>
                    <div style={{marginBottom:12}}><Label>HR/Manager Email</Label><Inp/></div>
                    <div style={{marginBottom:4}}><Label>HR/Manager Phone</Label><Inp/></div>
                  </div>
                </>}
                {s.id==="education" && <>
                  <div style={{marginBottom:12}}><Label required>Institution Name</Label><Inp value={university} onChange={e=>setUniversity(e.target.value)}/></div>
                  <div style={{marginBottom:12}}><Label required>Degree / Qualification</Label><Inp value={degree} onChange={e=>setDegree(e.target.value)}/></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
                    <div><Label>Grade / Class</Label><Inp value={grade} onChange={e=>setGrade(e.target.value)}/></div>
                    <div><Label>Year</Label><Inp value={gradYear} onChange={e=>setGradYear(e.target.value)} placeholder="YYYY"/></div>
                  </div>
                </>}
                {s.id==="guarantor" && <>
                  <div style={{marginBottom:12}}><Label required>Guarantor Full Name</Label><Inp value={guarantorName} onChange={e=>setGuarantorName(e.target.value)}/></div>
                  <div style={{marginBottom:12}}><Label required>Relationship</Label><Inp value={guarantorRel} onChange={e=>setGuarantorRel(e.target.value)}/></div>
                  <div style={{marginBottom:4}}><Label required>Phone Number</Label><Inp value={guarantorPhone} onChange={e=>setGuarantorPhone(e.target.value)}/></div>
                </>}
              </div>
            )}
          </div>
        ))}
        <Divider/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <SecondaryBtn onClick={()=>setShowSaveModal(true)}>Save & Exit</SecondaryBtn>
          <PrimaryBtn onClick={()=>setScreen("documents")} style={{width:"auto"}}>Continue →</PrimaryBtn>
        </div>
        <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Your progress is saved automatically.</p>
      </PageWrap>
    );
  };

  // ─── CAND-06: Document Upload ────────────────────────────────────────────────
  const renderDocuments = () => {
    const UploadZone = ({docKey, label, description, required}) => {
      const uploaded = uploadedDocs[docKey];
      return (
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            {uploaded
              ? <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
              : <div style={{width:16,height:16,borderRadius:"50%",border:"2px solid #9ca3af"}}/>}
            <span style={{fontSize:14,fontWeight:600,color:uploaded?"#15803d":"#111827"}}>{label} {required&&!uploaded&&<span style={{color:"#b91c1c"}}>*</span>}</span>
          </div>
          {description && <p style={{margin:"0 0 8px 24px",fontSize:12,color:"#6b7280"}}>{description}</p>}
          {uploaded ? (
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"10px 14px",marginLeft:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" width="14" height="14"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>{uploaded}</span>
              </div>
              <button onClick={()=>setUploadedDocs(p=>({...p,[docKey]:null}))} style={{background:"none",border:"none",color:"#6b7280",fontSize:12,cursor:"pointer"}}>Remove</button>
            </div>
          ) : (
            <div onClick={()=>setUploadedDocs(p=>({...p,[docKey]:`Document_${docKey}.pdf`}))}
              style={{marginLeft:24,border:"2px dashed #d1d5db",borderRadius:8,padding:"20px",textAlign:"center",cursor:"pointer",background:"#fafafa"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#b91c1c"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#d1d5db"}>
              <div style={{fontSize:28,marginBottom:8}}>📄</div>
              <p style={{margin:"0 0 4px",fontSize:13,fontWeight:500,color:"#374151"}}>Tap to upload</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>or drag file here</p>
              <p style={{margin:"6px 0 0",fontSize:11,color:"#9ca3af"}}>PDF, JPG, PNG · max 5MB</p>
            </div>
          )}
        </div>
      );
    };

    return (
      <PageWrap>
        <BackBtn to="personal"/>
        <StepBar step={5}/>
        <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Upload Documents</h2>
        <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please upload the following documents. Accepted formats: PDF, JPG, PNG (max 5MB each)</p>

        <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>REQUIRED DOCUMENTS</p>
        <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"16px",marginBottom:20}}>
          <UploadZone docKey="govId"    label="Government-Issued ID"    required={true} description="Front and back of NIN card or passport"/>
          <div style={{borderTop:"1px solid #f3f4f6",margin:"0 0 16px"}}/>
          <UploadZone docKey="academic" label="Academic Certificate(s)" required={true} description="Upload your highest qualification"/>
          <div style={{borderTop:"1px solid #f3f4f6",margin:"0 0 16px"}}/>
          <UploadZone docKey="address"  label="Proof of Address"        required={true} description="Utility bill or bank statement (last 3 months)"/>
        </div>

        <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>OPTIONAL DOCUMENTS</p>
        <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"16px",marginBottom:20}}>
          <UploadZone docKey="employment" label="Employment Letter" description="Letter from current employer (if available)"/>
          <div style={{borderTop:"1px solid #f3f4f6",margin:"0 0 16px"}}/>
          <UploadZone docKey="extra"      label="Additional Documents" description="Any other supporting documents"/>
        </div>

        <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 14px",marginBottom:20}}>
          <p style={{margin:0,fontSize:13,color:"#1e40af",fontWeight:500}}>Uploaded: {uploadedCount} of 3 required</p>
          {uploadedCount < 3 && <p style={{margin:"4px 0 0",fontSize:12,color:"#3b82f6"}}>{3-uploadedCount} more required document{3-uploadedCount>1?"s":""} to upload</p>}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <SecondaryBtn onClick={()=>setShowSaveModal(true)}>Save & Exit</SecondaryBtn>
          <PrimaryBtn onClick={()=>setScreen("review")} disabled={uploadedCount<3} style={{width:"auto"}}>Continue →</PrimaryBtn>
        </div>
      </PageWrap>
    );
  };

  // ─── CAND-07: Review & Submit ────────────────────────────────────────────────
  const renderReview = () => (
    <PageWrap>
      <BackBtn to="documents"/>
      <StepBar step={6}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Review Your Submission</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please review your information before submitting.</p>

      {[
        {title:"PERSONAL DETAILS", to:"personal", lines:[`Name: ${CANDIDATE_NAME}`,`DOB: 15 March 1995`,`Phone: ${phone}`,`Email: ${email}`]},
        {title:"CURRENT ADDRESS",  to:"personal", lines:[street,`${city}, ${addrState}`,`${lga} LGA`,`Duration: ${duration}`]},
        {title:"EMPLOYMENT",       to:"personal", lines:[employer,jobTitle,`${startDate} – ${currentJob?"Present":"—"}`,`Contact: ${hrName}`]},
        {title:"EDUCATION",        to:"personal", lines:[university,degree,`${grade} (${gradYear})`]},
        {title:"GUARANTOR",        to:"personal", lines:[guarantorName,`Relationship: ${guarantorRel}`,`Phone: ${guarantorPhone}`]},
        {title:"DOCUMENTS",        to:"documents", lines:Object.entries(uploadedDocs).filter(([,v])=>v).map(([,v])=>`✓ ${v}`)},
      ].map(s=>(
        <div key={s.title} style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>{s.title}</span>
            <button onClick={()=>setScreen(s.to)} style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>[Edit]</button>
          </div>
          <Card>
            {s.lines.map((l,i)=><p key={i} style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>{l}</p>)}
          </Card>
        </div>
      ))}

      <Divider/>
      <Check checked={confirmCheck} onChange={()=>setConfirmCheck(p=>!p)}>
        I confirm all information provided is true and accurate to the best of my knowledge.
      </Check>
      <Divider/>
      <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,padding:"12px 14px",marginBottom:20}}>
        <p style={{margin:0,fontSize:13,color:"#9a3412",fontWeight:500}}>⚠ After submission, you cannot edit your data. Ensure everything is correct.</p>
      </div>
      <PrimaryBtn onClick={()=>{setScreen("confirmation");setSubmitted(true);}} disabled={!confirmCheck}>
        Submit for Verification →
      </PrimaryBtn>
    </PageWrap>
  );

  // ─── CAND-08: Confirmation ───────────────────────────────────────────────────
  const renderConfirmation = () => (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="32" height="32"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 style={{margin:"0 0 6px",fontSize:22,fontWeight:700,color:"#111827"}}>Submission Complete</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#374151",lineHeight:1.7}}>Thank you, <strong>{CANDIDATE_FIRST}</strong>. Your information has been submitted for verification. Here's what happens next:</p>
      {[
        {n:"1",title:"VERIFICATION",text:"Our team will verify the information you provided. This typically takes 5–7 business days."},
        {n:"2",title:"THIRD-PARTY CONTACT",text:"We may contact your employers, institutions, and references for confirmation."},
        {n:"3",title:"RESULTS",text:`The verification results will be shared with ${CLIENT}. They will contact you regarding next steps in your application.`},
      ].map(s=>(
        <div key={s.n} style={{display:"flex",gap:12,marginBottom:16}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"#b91c1c",color:"white",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.n}</div>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>{s.title}</p>
            <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.6}}>{s.text}</p>
          </div>
        </div>
      ))}
      <Divider/>
      <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 14px",marginBottom:16}}>
        <p style={{margin:0,fontSize:13,color:"#1e40af"}}>A confirmation email has been sent to: <strong>{email}</strong></p>
      </div>
      <Divider/>
      <p style={{margin:"0 0 6px",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Questions? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>You may now close this page.</p>
    </PageWrap>
  );

  // ─── CAND-09: Return Visit ───────────────────────────────────────────────────
  const renderReturn = () => (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827",textAlign:"center"}}>Welcome Back, {CANDIDATE_FIRST}</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280",textAlign:"center"}}>You have a submission in progress.</p>
      <Card style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:14,fontWeight:600,color:"#111827"}}>Progress: 60% complete</span>
        </div>
        <div style={{height:8,background:"#e5e7eb",borderRadius:4,overflow:"hidden",marginBottom:16}}>
          <div style={{height:"100%",background:"#b91c1c",borderRadius:4,width:"60%"}}/>
        </div>
        {[
          {done:true,  label:"Privacy & Terms accepted"},
          {done:true,  label:"Identity verified"},
          {done:true,  label:"Consent provided"},
          {done:true,  label:"Personal data entered"},
          {done:false, label:"Documents pending (2 of 3)"},
          {done:false, label:"Final review"},
        ].map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            {s.done
              ? <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="15" height="15"><path d="M20 6L9 17l-5-5"/></svg>
              : <div style={{width:15,height:15,borderRadius:"50%",border:"2px solid #9ca3af"}}/>}
            <span style={{fontSize:13,color:s.done?"#374151":"#9ca3af"}}>{s.label}</span>
          </div>
        ))}
      </Card>
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"12px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:16}}>⏱️</span>
        <span style={{fontSize:13,color:"#92400e"}}>Deadline: <strong>{DEADLINE}</strong> (4 days remaining)</span>
      </div>
      <PrimaryBtn onClick={()=>{setDemoScreen(null);setScreen("documents");}}>Continue Where I Left Off →</PrimaryBtn>
      <Divider/>
      <p style={{margin:0,fontSize:13,color:"#6b7280",textAlign:"center"}}>Or start over: <button onClick={()=>{setDemoScreen(null);setScreen("welcome");}} style={{background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:13,fontWeight:500}}>Clear and Restart</button></p>
    </PageWrap>
  );

  // ─── CAND-10: Link Expired ───────────────────────────────────────────────────
  const renderExpired = () => (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48,marginBottom:8}}>⚠️</div>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Link Expired</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151",lineHeight:1.7}}>This verification link is no longer active.</p>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#374151",lineHeight:1.7}}>The submission deadline has passed or the link has been deactivated.</p>
      <Divider/>
      <p style={{margin:"0 0 16px",fontSize:14,color:"#374151",lineHeight:1.7}}>If you still need to complete your verification, please contact the organization that requested it (<strong>{CLIENT}</strong>) to request a new link.</p>
      <Card style={{textAlign:"center",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontSize:12,color:"#6b7280"}}>Reference</p>
        <p style={{margin:0,fontSize:15,fontWeight:700,color:"#111827",fontFamily:"monospace"}}>VER-2026-0128-YIB</p>
      </Card>
      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Questions? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
    </PageWrap>
  );

  // ─── Main render ─────────────────────────────────────────────────────────────
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f1f5f9"}}>
      <CandidateTopbar/>
      {renderPortalScreen()}

      {/* Save & Exit Modal */}
      {showSaveModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"white",borderRadius:16,padding:"32px 36px",width:"90%",maxWidth:440,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            <div style={{width:52,height:52,borderRadius:12,background:"#fef9c3",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="26" height="26"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
            </div>
            <h3 style={{margin:"0 0 8px",fontSize:18,fontWeight:700,color:"#111827",textAlign:"center"}}>Progress Saved</h3>
            <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280",textAlign:"center",lineHeight:1.7}}>Your information has been saved. To continue your application, go to your email inbox and click the verification link sent to you by Dragnet.</p>
            <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 16px",marginBottom:20}}>
              <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.4}}>RETURNING TO YOUR APPLICATION</p>
              <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.6}}>Open the email from <strong>noreply@dragnet.ng</strong> with the subject line <em>"Complete your verification"</em> and click the link to resume exactly where you left off.</p>
            </div>
            <button onClick={()=>setShowSaveModal(false)} style={{width:"100%",padding:"12px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:15,cursor:"pointer"}}>
              Got it, I'll check my email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



// ════════════════════════════════════════════════════════════════════════════════
// CLIENT PORTAL — Read-only view for clients (e.g. Zenith Bank)
// Mirrors CE data but strips all operational controls.
// Shows: Dashboard overview, Batches, Candidates per batch, Results/Reports
// ════════════════════════════════════════════════════════════════════════════════



export { CandidatePortal };
