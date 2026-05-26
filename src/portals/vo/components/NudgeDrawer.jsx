import { useState } from "react";

function NudgeDrawer({ task, onClose }) {
  const [channel, setChannel] = useState({email:true,sms:true});
  const history = [
    { n:1, date:"Jan 30", msg:"Your former employer at Shell hasn't responded to our verification request. Please contact them directly.", status:"Delivered ✅  Opened ✅" },
    { n:2, date:"Feb 3",  msg:"We still haven't received a response from Shell. Your verification is being delayed. Please follow up urgently.", status:"Delivered ✅  Opened ✅" },
  ];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:460,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>NUDGE CANDIDATE</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Task: {task?.candidate||"Yusuf Ibrahim"} → {task?.ext||"Shell Nigeria HR"}</p>
          <p style={{margin:0,color:"#6b7280"}}>ServMode: EMP-EMAIL</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>NUDGE HISTORY</p>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20}}>
          {history.map(h=>(
            <div key={h.n} style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid #e5e7eb"}}>
              <p style={{margin:"0 0 4px",fontSize:13,fontWeight:600,color:"#111827"}}>#{h.n} — {h.date}</p>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#374151",fontStyle:"italic"}}>"{h.msg}"</p>
              <p style={{margin:0,fontSize:12,color:"#6b7280"}}>Status: {h.status}</p>
            </div>
          ))}
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>SEND NUDGE #3</p>
        <div style={{display:"flex",gap:16,marginBottom:14}}>
          {["email","sms"].map(c=>(
            <label key={c} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14}}>
              <div onClick={()=>setChannel(p=>({...p,[c]:!p[c]}))} style={{width:18,height:18,borderRadius:4,border:`2px solid ${channel[c]?"#b91c1c":"#d1d5db"}`,background:channel[c]?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                {channel[c]&&<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
              </div>
              {c==="email"?"Email":"SMS"}
            </label>
          ))}
        </div>
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151",fontStyle:"italic"}}>
          "Dear Yusuf, This is our final reminder. Your verification with Shell Nigeria is significantly delayed because they have not responded. Please contact them immediately."
        </div>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ Nudge goes to CANDIDATE, not external party. After nudges exhausted → consider Pivot.</p>
        <button onClick={onClose} style={{width:"100%",padding:"12px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer"}}>Send Nudge #3</button>
      </div>
    </div>
  );
}

export default NudgeDrawer;
