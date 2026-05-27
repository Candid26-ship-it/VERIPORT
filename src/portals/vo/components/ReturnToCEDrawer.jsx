import { useState } from "react";

function ReturnToCEDrawer({ task, onClose, onSent }) {
  const [issueType, setIssueType] = useState("");
  const [details, setDetails] = useState("");
  const ISSUES = ["Email bounced — address invalid","Wrong contact — person no longer at company","Missing information — need alternative contact","Candidate data mismatch — name/details don't match","Other"];
  const handleReturn = () => {
    if (onSent && issueType) {
      onSent({
        client: task?.client || "Acme Corporation Limited",
        batch:  task?.batch  || "Acme Q4 New Hires - Batch 1",
        servform: task?.servform || "Employment Reference",
        mode: "Email",
        candidate: task?.candidate || "—",
        issue: issueType + (details ? ` — ${details}` : ""),
        sla: "3 days",
        slaOver: false,
      });
    }
    onClose();
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:440,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>RETURN TO CE</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#fef2f2",borderRadius:8,padding:"12px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Task: {task?.candidate || "Bola Akinwale"} → {task?.ext || "FCMB HR"}</p>
          <p style={{margin:0,color:"#6b7280"}}>ServMode: {task?.servform || "EMP-EMAIL"}</p>
        </div>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>ISSUE TYPE</p>
        {ISSUES.map(issue=>(
          <label key={issue} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",fontSize:14,color:"#374151"}}>
            <div onClick={()=>setIssueType(issue)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${issueType===issue?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
              {issueType===issue && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
            </div>
            {issue}
          </label>
        ))}
        <div style={{marginTop:16,marginBottom:20}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"#374151",marginBottom:6}}>DETAILS</label>
          <textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Describe the issue…" style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:80,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>ⓘ Task moves to CE's "Returned from Ops" queue. SLA paused while with CE.</p>
        <button onClick={handleReturn} disabled={!issueType} style={{width:"100%",padding:"12px",background:issueType?"#b91c1c":"#e5e7eb",color:issueType?"white":"#9ca3af",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:issueType?"pointer":"default"}}>Return to CE</button>
      </div>
    </div>
  );
}

export default ReturnToCEDrawer;
