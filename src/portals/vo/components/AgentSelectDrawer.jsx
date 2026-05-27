import { useState } from "react";
import { FIELD_AGENTS } from "../data.js";

function AgentSelectDrawer({ task, onClose }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:480,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>SELECT AGENT</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#fef2f2",borderRadius:8,padding:"10px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Candidate: {task?.candidate}</p>
          <p style={{margin:0,color:"#6b7280"}}>Address: {task?.address} · {task?.state}</p>
        </div>
        <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>AVAILABLE AGENTS IN COVERAGE AREA</p>
        {FIELD_AGENTS.map(a=>(
          <div key={a.id} onClick={()=>setSelected(a.id)}
            style={{border:`2px solid ${selected===a.id?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px 16px",marginBottom:10,cursor:"pointer",background:selected===a.id?"#fef2f2":"white"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:14,fontWeight:600,color:"#111827"}}>{a.name}</span>
              <span style={{fontSize:12,color:"#6b7280"}}>{a.id}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
              <p style={{margin:0,fontSize:12,color:"#374151"}}>📍 {a.area}</p>
              <p style={{margin:0,fontSize:12,color:"#374151"}}>💰 {a.rate}/task</p>
              <p style={{margin:0,fontSize:12,color:"#374151"}}>📋 Workload: {a.workload} active</p>
              <p style={{margin:0,fontSize:12,color:a.acceptance>=95?"#16a34a":a.acceptance>=88?"#d97706":"#b91c1c",fontWeight:500}}>✓ {a.acceptance}% acceptance</p>
            </div>
          </div>
        ))}
        <button onClick={onClose} disabled={!selected}
          style={{width:"100%",marginTop:8,padding:"12px",background:selected?"#b91c1c":"#e5e7eb",color:selected?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:selected?"pointer":"default"}}>
          Assign Agent
        </button>
      </div>
    </div>
  );
}

export default AgentSelectDrawer;
