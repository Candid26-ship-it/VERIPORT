import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldIcon, EyeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS } from "../data/index.js";
import { useAuth } from "./AuthContext.jsx";

export function LoginScreen() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const fill = k => { setEmail(LOGIN_USERS[k].email); setPw(LOGIN_USERS[k].password); setErr(""); };
  const submit = () => {
    const u = Object.values(LOGIN_USERS).find(u => u.email === email && u.password === pw);
    if (!u) { setErr("Invalid email or password."); return; }
    signIn(u);
    navigate("/mfa");
  };
  const inp = { width:"100%", padding:"12px 14px", border:"1.5px solid #d1d5db", borderRadius:8, fontSize:15, boxSizing:"border-box", outline:"none", color:"#111827" };
  return (
    <div style={{minHeight:"100vh",background:"#f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{width:60,height:60,background:"#b91c1c",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><ShieldIcon/></div>
      <h1 style={{margin:"0 0 2px",fontSize:24,color:"#111827",fontWeight:700}}>VeriPort</h1>
      <p style={{margin:"0 0 28px",color:"#6b7280",fontSize:14}}>Enterprise Verification Platform</p>
      <div style={{background:"white",borderRadius:16,padding:"32px",width:"100%",maxWidth:480,boxShadow:"0 4px 24px #0001"}}>
        <h2 style={{textAlign:"center",margin:"0 0 4px",fontSize:20,color:"#111827"}}>Sign in with Dragnet</h2>
        <p style={{textAlign:"center",margin:"0 0 24px",color:"#6b7280",fontSize:14}}>Enter your credentials to continue</p>
        <label style={{display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6}}>Email Address</label>
        <input value={email} onChange={e=>{setEmail(e.target.value);setErr("")}} placeholder="you@dragnet.ng" style={{...inp,marginBottom:16}}/>
        <label style={{display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6}}>Password</label>
        <div style={{position:"relative",marginBottom:16}}>
          <input value={pw} onChange={e=>{setPw(e.target.value);setErr("")}} type={showPw?"text":"password"} placeholder="••••••••••" style={{...inp,paddingRight:44}} onKeyDown={e=>{ if(e.key==='Enter') submit(); }}/>
          <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0}}><EyeIcon show={showPw}/></button>
        </div>
        {err && <p style={{color:"#b91c1c",fontSize:13,marginBottom:12}}>{err}</p>}
        <button onClick={submit} style={{width:"100%",padding:14,background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:16,cursor:"pointer",marginBottom:20}}>Sign In</button>
        <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:16}}/>
        <p style={{textAlign:"center",color:"#9ca3af",fontSize:13,marginBottom:12}}>Quick login for testing:</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:10}}>
          {Object.entries(LOGIN_USERS).map(([k,u])=>(
            <button key={k} onClick={()=>fill(k)} style={{background:"#f9fafb",color:"#374151",padding:"10px",fontSize:13,border:"1px solid #e5e7eb",borderRadius:8,fontWeight:500,cursor:"pointer"}}>{u.name.split(" ")[0]} ({u.role})</button>
          ))}
        </div>
      </div>
    </div>
  );
}
