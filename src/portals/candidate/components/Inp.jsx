export default function Inp({value, onChange, placeholder, type="text", locked=false, style={}}) {
  return (
    <div style={{position:"relative"}}>
      <input value={value} onChange={onChange} placeholder={placeholder} type={type} disabled={locked}
        style={{width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:locked?"#6b7280":"#111827",background:locked?"#f3f4f6":"white",...style}}/>
      {locked && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="14" height="14" style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)"}}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
    </div>
  );
}
