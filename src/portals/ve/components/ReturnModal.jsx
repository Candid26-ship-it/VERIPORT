export default function ReturnModal({ returnModal, setReturnModal, returnReason, setReturnReason, returnNotes, setReturnNotes, returnTask }) {
  return (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{background:"white",borderRadius:14,padding:"28px 32px",width:"90%",maxWidth:520,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            <h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Return to VO</h3>
            <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Task: {returnModal.candidate} — {returnModal.service} · VO: {returnModal.vo}</p>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Reason</label>
              <div style={{position:"relative"}}>
                <select value={returnReason} onChange={e=>setReturnReason(e.target.value)}
                  style={{width:"100%",padding:"10px 36px 10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,color:"#374151",background:"white",outline:"none",appearance:"none"}}>
                  {["Evidence incomplete","Evidence unclear/illegible","Notes insufficient","Data mismatch","Other"].map(r=><option key={r}>{r}</option>)}
                </select>
                <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280",fontSize:11}}>▾</span>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Feedback to VO</label>
              <textarea value={returnNotes} onChange={e=>setReturnNotes(e.target.value)} rows={4} placeholder="Describe what needs to be corrected..."
                style={{width:"100%",padding:"10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",color:"#374151"}}/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setReturnModal(null)} style={{padding:"9px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>returnTask(returnModal.id)} style={{padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>Return to VO</button>
            </div>
          </div>
        </div>
  );
}
