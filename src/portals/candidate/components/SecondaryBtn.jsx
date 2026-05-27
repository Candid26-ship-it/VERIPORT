export default function SecondaryBtn({onClick, children}) {
  return (
    <button onClick={onClick}
      style={{width:"100%",padding:"13px",border:"1.5px solid #d1d5db",borderRadius:10,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer"}}>
      {children}
    </button>
  );
}
