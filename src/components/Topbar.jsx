import { ShieldIcon, MenuIcon, SearchSm, BellIcon } from "./Icons.jsx";
import { RoleSwitcher } from "./RoleSwitcher.jsx";

export function Topbar({ user, activeProfile, onSwitchProfile, onToggleSidebar }) {
  return (
    <div style={{display:"flex",alignItems:"center",padding:"0 12px",height:56,background:"white",borderBottom:"1px solid #e5e7eb",gap:12,flexShrink:0,zIndex:10}}>
      <button onClick={onToggleSidebar} style={{background:"none",border:"none",cursor:"pointer",color:"#374151",padding:4,display:"flex"}}><MenuIcon/></button>
      <div style={{display:"flex",alignItems:"center",gap:8,fontWeight:700,fontSize:16,color:"#111827"}}>
        <div style={{width:28,height:28,background:"#b91c1c",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><ShieldIcon size={16}/></div>
        <span className="vp-topbar-title">VERIPORT</span>
      </div>
      <div style={{flex:1,maxWidth:400,position:"relative",marginLeft:8}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input placeholder="Search... (Ctrl+K)" style={{width:"100%",padding:"7px 12px 7px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151",background:"#f9fafb"}}/>
      </div>
      <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
        <RoleSwitcher activeProfile={activeProfile} onSwitch={onSwitchProfile}/>
        <div className="vp-desktop-only" style={{position:"relative",cursor:"pointer"}}>
          <div style={{width:36,height:36,border:"1.5px solid #e5e7eb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#374151"}}><BellIcon/></div>
          <span style={{position:"absolute",top:-6,right:-6,background:"#b91c1c",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>3</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:12}}>{user?.initials || "U"}</div>
          <span className="vp-topbar-title" style={{fontSize:14,fontWeight:500,color:"#111827"}}>{user?.name || ""}</span>
        </div>
      </div>
    </div>
  );
}
