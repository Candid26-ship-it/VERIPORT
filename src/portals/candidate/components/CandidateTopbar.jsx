export default function CandidateTopbar({demoScreen, setDemoScreen, activeProfile, onSwitchProfile}) {
  return (
    <div style={{background:"#1e3a5f",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:28,height:28,background:"#b91c1c",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg viewBox="0 0 24 24" fill="white" width={16} height={16}><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
        </div>
        <span style={{fontSize:13,fontWeight:700,color:"white",letterSpacing:.5}}>DRAGNET CANDIDATE PORTAL</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {/* Quick demo nav */}
        <select value={demoScreen||""} onChange={e=>setDemoScreen(e.target.value||null)}
          style={{fontSize:11,padding:"4px 8px",borderRadius:6,border:"1px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.1)",color:"white",cursor:"pointer",outline:"none"}}>
          <option value="">Demo: Normal Flow</option>
          <option value="return">Return Visit</option>
          <option value="expired">Link Expired</option>
        </select>
        <RoleSwitcher activeProfile={activeProfile} onSwitch={onSwitchProfile}/>
      </div>
    </div>
  );
}
