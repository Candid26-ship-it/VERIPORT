export default function SectionHeader({id, title, status, expanded, onToggle}) {
  return (
    <button onClick={onToggle} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",border:"none",background:"none",cursor:"pointer",borderBottom:"1px solid #e5e7eb"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" width="14" height="14"><path d={expanded?"M18 15l-6-6-6 6":"M9 18l6-6-6-6"}/></svg>
        <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{title}</span>
      </div>
      <span style={{fontSize:12,fontWeight:500,color:status==="done"?"#15803d":"#9ca3af",display:"flex",alignItems:"center",gap:4}}>
        {status==="done" ? <><svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg> Done</> : "○ Pending"}
      </span>
    </button>
  );
}
