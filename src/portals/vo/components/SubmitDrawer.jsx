import { useState } from "react";

function SubmitDrawer({ task, onClose }) {
  const [outcome, setOutcome] = useState("");
  const [confidence, setConfidence] = useState("");
  const [notes, setNotes] = useState("");
  const comparison = [
    { field:"Employer",   candidate:"Shell Nigeria",     external:"Shell Petroleum",   match:false },
    { field:"Job Title",  candidate:"Senior Accountant", external:"Senior Accountant", match:true },
    { field:"Start Date", candidate:"January 2019",      external:"January 2019",       match:true },
    { field:"End Date",   candidate:"April 2023",        external:"March 2023",         match:false },
    { field:"Reason Left",candidate:"Better offer",      external:"Mutual agreement",   match:false },
  ];
  const outcomes = ["Verified","Not Verified","Inconclusive","Discrepancy"];
  const confidences = ["High","Medium","Low"];
  const R = ({val,group,set,cur})=>(
    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:"#374151",marginBottom:6}}>
      <div onClick={()=>set(val)} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${cur===val?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
        {cur===val&&<div style={{width:7,height:7,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      {val}
    </label>
  );
  const canSubmit = outcome && confidence && notes.length >= 50;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:500,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>SUBMIT VERIFICATION</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Candidate: {task?.candidate||"Yusuf Ibrahim"}</p>
          <p style={{margin:0,color:"#6b7280"}}>Service: Employment Reference · ServMode: EMP-EMAIL</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>DATA COMPARISON</p>
        <table style={{width:"100%",borderCollapse:"collapse",marginBottom:20,fontSize:13}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Field","Candidate Claim","External Response",""].map((h,i)=><th key={i} style={{padding:"8px 12px",textAlign:"left",fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",fontSize:12}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {comparison.map((r,i)=>(
              <tr key={i} style={{background:r.match?"white":"#fffbeb",borderBottom:"1px solid #f3f4f6"}}>
                <td style={{padding:"8px 12px",fontWeight:500,color:"#374151"}}>{r.field}</td>
                <td style={{padding:"8px 12px",color:"#374151"}}>{r.candidate}</td>
                <td style={{padding:"8px 12px",color:"#374151"}}>{r.external}</td>
                <td style={{padding:"8px 12px"}}>{r.match?"✅":"⚠️"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>OUTCOME</p>
            {outcomes.map(o=><R key={o} val={o} cur={outcome} set={setOutcome}/>)}
          </div>
          <div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CONFIDENCE</p>
            {confidences.map(c=><R key={c} val={c} cur={confidence} set={setConfidence}/>)}
          </div>
        </div>
        <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>OFFICER NOTES <span style={{color:"#9ca3af",fontWeight:400}}>(min 50 chars)</span></p>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Describe your findings, any discrepancies, and rationale for the outcome…"
          style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:100,outline:"none",boxSizing:"border-box",marginBottom:6}}/>
        <p style={{fontSize:12,color:notes.length>=50?"#16a34a":"#9ca3af",marginBottom:16}}>{notes.length}/50 chars</p>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ All tasks require 100% Executive review. Executive sees comparison, outcome, evidence and notes.</p>
        <button onClick={()=>{if(canSubmit)onClose();}} disabled={!canSubmit}
          style={{width:"100%",padding:"12px",background:canSubmit?"#111827":"#e5e7eb",color:canSubmit?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:canSubmit?"pointer":"default"}}>
          Submit for Executive Review
        </button>
      </div>
    </div>
  );
}

export default SubmitDrawer;
