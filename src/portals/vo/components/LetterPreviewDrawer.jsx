function LetterPreviewDrawer({ task, onClose }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:560,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>LETTER PREVIEW</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>
        <div style={{background:"#fef2f2",borderRadius:8,padding:"10px 14px",marginBottom:20,fontSize:13,color:"#374151"}}>
          <p style={{margin:"0 0 2px",fontWeight:600}}>Ref: {task?.ref}</p>
          <p style={{margin:0,color:"#6b7280"}}>To: {task?.institution} · {task?.candidate}</p>
        </div>
        {/* Letter body mock */}
        <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"28px 32px",background:"white",fontFamily:"Georgia,serif",fontSize:13,lineHeight:1.8,color:"#111827"}}>
          <p style={{margin:"0 0 20px",textAlign:"right",fontSize:12,color:"#6b7280"}}>Date: {new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}</p>
          <p style={{margin:"0 0 4px",fontWeight:700}}>The Commanding Officer</p>
          <p style={{margin:"0 0 20px"}}>{task?.institution}</p>
          <p style={{margin:"0 0 12px"}}><strong>RE: CRIMINAL RECORD VERIFICATION — {task?.candidate?.toUpperCase()}</strong></p>
          <p style={{margin:"0 0 12px"}}>Dear Sir/Madam,</p>
          <p style={{margin:"0 0 12px"}}>We write to request a verification of the criminal records of the above-named individual in connection with an ongoing employment background screening exercise conducted on behalf of our client.</p>
          <p style={{margin:"0 0 12px"}}>Kindly confirm whether the individual has any criminal record within your command's jurisdiction and provide your official response at your earliest convenience.</p>
          <p style={{margin:"0 0 12px"}}>All information provided will be treated with the strictest confidentiality.</p>
          <p style={{margin:"0 0 20px"}}>Yours faithfully,</p>
          <p style={{margin:"0 0 4px",fontWeight:700}}>Dragnet Solutions Limited</p>
          <p style={{margin:0,fontSize:12,color:"#6b7280"}}>Ref: {task?.ref}</p>
        </div>
        <div style={{display:"flex",gap:10,marginTop:16}}>
          <button onClick={onClose} style={{flex:1,padding:"11px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}>📤 Dispatch Letter</button>
          <button onClick={onClose} style={{padding:"11px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,cursor:"pointer"}}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default LetterPreviewDrawer;
