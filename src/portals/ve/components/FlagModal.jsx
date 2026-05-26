export default function FlagModal({ flagModal, setFlagModal, flagReason, setFlagReason, flagNotes, setFlagNotes, flagTask }) {
  return (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{background:"white",borderRadius:14,padding:"28px 32px",width:"90%",maxWidth:520,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            <h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Escalate to Manager</h3>
            <p style={{margin:"0 0 4px",fontSize:14,color:"#6b7280"}}>Task: {flagModal.candidate} — {flagModal.service}</p>
            <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Outcome: <span style={{color:"#b45309",fontWeight:500}}>{flagModal.outcome}</span></p>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Escalation Reason</label>
              <div style={{position:"relative"}}>
                <select value={flagReason} onChange={e=>setFlagReason(e.target.value)}
                  style={{width:"100%",padding:"10px 36px 10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,color:"#374151",background:"white",outline:"none",appearance:"none"}}>
                  {["Discrepancy dispute","Suspected fraud","Client complaint","Policy exception needed","Other"].map(r=><option key={r}>{r}</option>)}
                </select>
                <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280",fontSize:11}}>▾</span>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Details for Manager</label>
              <textarea value={flagNotes} onChange={e=>setFlagNotes(e.target.value)} rows={4} placeholder="Explain the situation..."
                style={{width:"100%",padding:"10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",color:"#374151"}}/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setFlagModal(null)} style={{padding:"9px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>flagTask(flagModal.id)} style={{padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>Escalate to VM</button>
            </div>
          </div>
        </div>
  );
}
