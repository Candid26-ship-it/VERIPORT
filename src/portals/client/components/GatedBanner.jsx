export default function GatedBanner() {
  return (
    <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"10px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      <span style={{fontSize:13,color:"#1e40af"}}>Verification results will be available after the batch is released by your account manager.</span>
    </div>
  );
}
