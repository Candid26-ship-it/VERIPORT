export default function BackBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      {label}
    </button>
  );
}
