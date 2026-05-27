import { useState } from "react";

export default function VAOnboarding({ va, activeProfile, onComplete, Topbar }) {
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
