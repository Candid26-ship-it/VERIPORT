import { useState } from "react";

function PivotDrawer({ task, onClose }) {
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("Method exhausted — email unresponsive");
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:440,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>PIVOT SERVMODE</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 4px",fontWeight:600}}>Current: {task?.servform || "EMP-EMAIL"}</p>
          <p style={{margin:"0 0 4px"}}>Task: {task?.candidate || "Yusuf Ibrahim"} → {task?.ext || "Shell Nigeria HR"}</p>
          <p style={{margin:0,color:"#6b7280"}}>3 reminders sent, 2 nudges, email opened 4x. No response after 12 days.</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>MODE HISTORY</p>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:12,color:"#6b7280",fontFamily:"monospace"}}>
          {["Jan 25 Initial request sent","Jan 27 Email opened (no response)","Jan 28 Remind #1 sent","Jan 30 Nudge #1 to candidate","Feb 1  Remind #2 sent","Feb 3  Nudge #2 to candidate","Feb 5  Remind #3 sent (final)","Feb 6  No response — method exhausted"].map((l,i)=><p key={i} style={{margin:"0 0 3px"}}>├─ {l}</p>)}
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>PIVOT TO:</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {["EMP-LETTER","EMP-FIELD"].map(sf=>(
            <div key={sf} onClick={()=>setSelected(sf)} style={{border:`2px solid ${selected===sf?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px",cursor:"pointer",background:selected===sf?"#fef2f2":"white",textAlign:"center"}}>
              <p style={{margin:"0 0 4px",fontWeight:600,fontSize:14,color:selected===sf?"#b91c1c":"#111827"}}>{sf}</p>
              <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{sf.includes("LETTER")?"Letter":"Field"}</p>
            </div>
          ))}
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"#374151",marginBottom:6}}>REASON</label>
          <textarea value={reason} onChange={e=>setReason(e.target.value)} style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:70,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ SLA history transfers. Full mode history travels with the task.</p>
        <button onClick={onClose} disabled={!selected} style={{width:"100%",padding:"12px",background:selected?"#b91c1c":"#e5e7eb",color:selected?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:selected?"pointer":"default"}}>
          Pivot to {selected||"—"}
        </button>
      </div>
    </div>
  );
}

export default PivotDrawer;
