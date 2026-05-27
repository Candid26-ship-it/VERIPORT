export default function SaveModal({setShowSaveModal}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{background:"white",borderRadius:16,padding:"32px 36px",width:"90%",maxWidth:440,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{width:52,height:52,borderRadius:12,background:"#fef9c3",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="26" height="26"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
        </div>
        <h3 style={{margin:"0 0 8px",fontSize:18,fontWeight:700,color:"#111827",textAlign:"center"}}>Progress Saved</h3>
        <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280",textAlign:"center",lineHeight:1.7}}>Your information has been saved. To continue your application, go to your email inbox and click the verification link sent to you by Dragnet.</p>
        <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 16px",marginBottom:20}}>
          <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.4}}>RETURNING TO YOUR APPLICATION</p>
          <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.6}}>Open the email from <strong>noreply@dragnet.ng</strong> with the subject line <em>"Complete your verification"</em> and click the link to resume exactly where you left off.</p>
        </div>
        <button onClick={()=>setShowSaveModal(false)} style={{width:"100%",padding:"12px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:15,cursor:"pointer"}}>
          Got it, I'll check my email
        </button>
      </div>
    </div>
  );
}
