export default function BackBtn({to, setScreen}) {
  return (
    <button onClick={()=>setScreen(to)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#374151",cursor:"pointer",fontSize:14,fontWeight:500,padding:0,marginBottom:20}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back
    </button>
  );
}
