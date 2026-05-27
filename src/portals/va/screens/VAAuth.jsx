import { useState } from "react";

export default function VAAuth({ va, activeProfile, isFirstTime, pinSet, onAuthenticated, onGoOnboard, Topbar }) {
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
