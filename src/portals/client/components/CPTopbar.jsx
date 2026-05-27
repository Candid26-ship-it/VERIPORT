export default function CPTopbar({ onSignOut }) {
  return (
    <div style={{display:"flex",alignItems:"center",padding:"0 24px",height:56,background:"white",borderBottom:"1px solid #e5e7eb",flexShrink:0,zIndex:10}}>
      <div style={{display:"flex",alignItems:"center",gap:8,fontWeight:700,fontSize:15,color:"#111827"}}>
        <div style={{width:28,height:28,background:"#b91c1c",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
        </div>
        DRAGNET SOLUTIONS
        <span style={{fontSize:12,fontWeight:400,color:"#9ca3af",marginLeft:4}}>Verification Portal</span>
      </div>
      <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:12}}>ZB</div>
          <span style={{fontSize:14,fontWeight:600,color:"#111827"}}>Zenith Bank</span>
        </div>
        <button onClick={onSignOut}
          style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
          Logout
        </button>
      </div>
    </div>
  );
}
