export default function UploadZone({docKey, label, description, required, uploadedDocs, setUploadedDocs}) {
  const uploaded = uploadedDocs[docKey];
  return (
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        {uploaded
          ? <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
          : <div style={{width:16,height:16,borderRadius:"50%",border:"2px solid #9ca3af"}}/>}
        <span style={{fontSize:14,fontWeight:600,color:uploaded?"#15803d":"#111827"}}>{label} {required&&!uploaded&&<span style={{color:"#b91c1c"}}>*</span>}</span>
      </div>
      {description && <p style={{margin:"0 0 8px 24px",fontSize:12,color:"#6b7280"}}>{description}</p>}
      {uploaded ? (
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"10px 14px",marginLeft:24}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" width="14" height="14"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>{uploaded}</span>
          </div>
          <button onClick={()=>setUploadedDocs(p=>({...p,[docKey]:null}))} style={{background:"none",border:"none",color:"#6b7280",fontSize:12,cursor:"pointer"}}>Remove</button>
        </div>
      ) : (
        <div onClick={()=>setUploadedDocs(p=>({...p,[docKey]:`Document_${docKey}.pdf`}))}
          style={{marginLeft:24,border:"2px dashed #d1d5db",borderRadius:8,padding:"20px",textAlign:"center",cursor:"pointer",background:"#fafafa"}}
          onMouseEnter={e=>e.currentTarget.style.borderColor="#b91c1c"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="#d1d5db"}>
          <div style={{fontSize:28,marginBottom:8}}>📄</div>
          <p style={{margin:"0 0 4px",fontSize:13,fontWeight:500,color:"#374151"}}>Tap to upload</p>
          <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>or drag file here</p>
          <p style={{margin:"6px 0 0",fontSize:11,color:"#9ca3af"}}>PDF, JPG, PNG · max 5MB</p>
        </div>
      )}
    </div>
  );
}
