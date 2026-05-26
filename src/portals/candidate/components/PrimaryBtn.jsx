export default function PrimaryBtn({onClick, disabled, children, style={}}) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{width:"100%",padding:"14px",border:"none",borderRadius:10,background:disabled?"#d1d5db":"#b91c1c",color:"white",fontSize:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",letterSpacing:.3,...style}}>
      {children}
    </button>
  );
}
