export default function Check({checked, onChange, children}) {
  return (
    <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:14,color:"#374151",lineHeight:1.5}}>
      <div onClick={onChange} style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2,cursor:"pointer"}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
      <span>{children}</span>
    </label>
  );
}
