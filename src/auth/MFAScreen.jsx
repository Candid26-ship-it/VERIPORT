import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldIcon, LockIcon } from "../components/Icons.jsx";
import { useAuth } from "./AuthContext.jsx";

export function MFAScreen() {
  const { completeMfa, signOut, activeProfile } = useAuth();
  const navigate = useNavigate();
  const [codes, setCodes] = useState(["","","","","",""]);
  const [err, setErr] = useState("");
  const refs = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];
  const onChange = (i,v) => { if (!/^\d?$/.test(v)) return; const n=[...codes]; n[i]=v; setCodes(n); if(v&&i<5) refs[i+1].current.focus(); };
  const onKD = (i,e) => { if(e.key==="Backspace"&&!codes[i]&&i>0) refs[i-1].current.focus(); };
  const verify = () => {
    if(codes.join("").length<6){setErr("Please enter a complete 6-digit code.");return;}
    completeMfa();
    navigate(roleHomePath(activeProfile));
  };
  const back = () => { signOut(); navigate("/login"); };
  return (
    <div style={{minHeight:"100vh",background:"#f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{width:56,height:56,background:"#b91c1c",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><ShieldIcon/></div>
      <h1 style={{margin:"0 0 2px",fontSize:22,color:"#111827",fontWeight:700}}>VeriPort</h1>
      <p style={{margin:"0 0 24px",color:"#6b7280",fontSize:14}}>Enterprise Verification Platform</p>
      <div style={{background:"white",borderRadius:16,padding:"32px",width:"100%",maxWidth:440,boxShadow:"0 4px 24px #0001",textAlign:"center"}}>
        <div style={{width:52,height:52,background:"#b91c1c",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><LockIcon/></div>
        <h2 style={{margin:"0 0 6px",fontSize:20,color:"#111827"}}>Multi-Factor Authentication</h2>
        <p style={{margin:"0 0 24px",color:"#6b7280",fontSize:14}}>Enter the 6-digit code from your authenticator app</p>
        <label style={{display:"block",textAlign:"left",fontWeight:500,fontSize:14,color:"#374151",marginBottom:10}}>Authentication Code</label>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16,flexWrap:"wrap"}}>
          {codes.map((c,i)=><input key={i} ref={refs[i]} value={c} maxLength={1} onChange={e=>onChange(i,e.target.value)} onKeyDown={e=>onKD(i,e)} inputMode="numeric" style={{width:44,height:52,textAlign:"center",fontSize:20,fontWeight:600,border:"1.5px solid #d1d5db",borderRadius:8,outline:"none",color:"#111827"}}/>)}
        </div>
        {err && <p style={{color:"#b91c1c",fontSize:13,marginBottom:12}}>{err}</p>}
        <button onClick={verify} style={{width:"100%",padding:14,background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:16,cursor:"pointer",marginBottom:16}}>Verify Code</button>
        <button onClick={back} style={{background:"none",border:"none",color:"#b91c1c",fontSize:14,cursor:"pointer",fontWeight:500}}>← Back to login</button>
        <hr style={{border:"none",borderTop:"1px solid #e5e7eb",margin:"16px 0"}}/>
        <p style={{color:"#9ca3af",fontSize:13,margin:0}}>Test code: Use any 6-digit number (e.g., 123456)</p>
      </div>
    </div>
  );
}

export function roleHomePath(profile) {
  switch (profile?.role) {
    case "System Administrator":   return "/admin";
    case "Verification Officer":   return "/vo";
    case "Verification Authority": return "/va";
    case "Executive":              return "/ve";
    case "Manager":                return "/vm";
    case "Candidate Portal":       return "/candidate";
    case "Client Portal":          return "/client";
    default:                       return "/ce";
  }
}
