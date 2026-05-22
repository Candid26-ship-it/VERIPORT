import { useState } from "react";
import { EyeIcon } from "../components/Icons.jsx";
import { useAuth } from "./AuthContext.jsx";

export function ClientLoginScreen() {
  const { setClientAuthed } = useAuth();
  const [email, setEmail]   = useState("");
  const [pw, setPw]         = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr]       = useState("");

  const submit = () => {
    if (!email || !pw) { setErr("Please enter your email and password."); return; }
    setClientAuthed(true);
  };

  const inp = { width:"100%", padding:"11px 14px", border:"1.5px solid #d1d5db", borderRadius:8, fontSize:14, boxSizing:"border-box", outline:"none", color:"#111827", background:"white" };

  return (
    <div style={{minHeight:"100vh", background:"#f1f5f9", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 16px"}}>
      <div style={{background:"white", borderRadius:16, padding:"32px", width:"100%", maxWidth:440, boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
        <div style={{textAlign:"center", marginBottom:28, paddingBottom:24, borderBottom:"1px solid #e5e7eb"}}>
          <div style={{width:48,height:48,background:"#b91c1c",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
          </div>
          <h1 style={{margin:"0 0 4px", fontSize:18, fontWeight:700, color:"#111827", letterSpacing:.2}}>DRAGNET SOLUTIONS</h1>
          <p style={{margin:0, fontSize:14, color:"#6b7280"}}>Verification Portal</p>
        </div>

        <label style={{display:"block", fontWeight:500, fontSize:13, color:"#374151", marginBottom:6}}>Email</label>
        <input value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="you@company.com" style={{...inp, marginBottom:16}}/>

        <label style={{display:"block", fontWeight:500, fontSize:13, color:"#374151", marginBottom:6}}>Password</label>
        <div style={{position:"relative", marginBottom:8}}>
          <input value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} type={showPw?"text":"password"} placeholder="••••••••••" style={{...inp, paddingRight:44}} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0}}>
            <EyeIcon show={showPw}/>
          </button>
        </div>

        <div style={{textAlign:"right", marginBottom:20}}>
          <button style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,cursor:"pointer",fontWeight:500,padding:0}}>Forgot Password?</button>
        </div>

        {err && <p style={{color:"#b91c1c", fontSize:13, marginBottom:12, marginTop:-8}}>{err}</p>}

        <button onClick={submit} style={{width:"100%",padding:"12px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:15,cursor:"pointer"}}>
          Log In
        </button>

        <hr style={{border:"none",borderTop:"1px solid #e5e7eb",margin:"20px 0 14px"}}/>
        <p style={{textAlign:"center",color:"#9ca3af",fontSize:12,marginBottom:10}}>Demo: admin@zenithbank.com / zenith1234</p>
      </div>

      <p style={{marginTop:20, fontSize:13, color:"#9ca3af", textAlign:"center"}}>
        Having trouble? Contact your account manager or{" "}
        <span style={{color:"#b91c1c"}}>support@dragnet.com</span>
      </p>
    </div>
  );
}
