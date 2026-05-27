import { RoleSwitcher } from "../../../components/RoleSwitcher.jsx";

export default function VATopbar({ activeProfile, onSwitchProfile }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",height:52,background:"#1e3a5f",color:"white",fontFamily:"system-ui,sans-serif",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:24,height:24,background:"white",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg viewBox="0 0 24 24" fill="#1e3a5f" width="14" height="14"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
        </div>
        <span style={{fontSize:14,fontWeight:700,letterSpacing:.8}}>DRAGNET VERIFICATION PORTAL</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <RoleSwitcher activeProfile={activeProfile} onSwitch={onSwitchProfile}/>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",background:"rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px"}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"#2d6a4f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:11}}>{activeProfile.initials}</div>
          <span style={{fontSize:13,fontWeight:500}}>{activeProfile.name}</span>
          <span style={{fontSize:11,opacity:.7}}>▾</span>
        </div>
      </div>
    </div>
  );
}
