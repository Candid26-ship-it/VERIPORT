import { useState, useRef, useEffect } from "react";
import { PeopleIcon, ChevronDown } from "./Icons.jsx";
import { ROLE_PROFILES } from "../data/index.js";

export function RoleSwitcher({ activeProfile, onSwitch }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = e => { if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{position:"relative"}}>
      <button onClick={()=>setOpen(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",cursor:"pointer",color:"#374151",fontSize:14,fontWeight:500}}>
        <PeopleIcon/> <span className="vp-topbar-title">{activeProfile.role}</span> <ChevronDown/>
      </button>
      {open && (
        <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,width:280,background:"white",borderRadius:12,boxShadow:"0 8px 32px rgba(0,0,0,0.14)",border:"1px solid #e5e7eb",zIndex:200,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:"1px solid #f3f4f6"}}>
            <p style={{margin:0,fontWeight:600,fontSize:14,color:"#111827"}}>Switch User Role</p>
            <p style={{margin:"2px 0 0",fontSize:12,color:"#9ca3af"}}>For demo purposes</p>
          </div>
          {ROLE_PROFILES.map(p => {
            const isActive = p.id === activeProfile.id;
            return (
              <button key={p.id} onClick={()=>{onSwitch(p);setOpen(false);}}
                style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 16px",border:"none",cursor:"pointer",background:isActive?"#fef2f2":"white",textAlign:"left"}}
                onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background="#f9fafb";}}
                onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="white";}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"#b91c1c",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:14,flexShrink:0}}>{p.initials}</div>
                <div><p style={{margin:0,fontWeight:600,fontSize:14,color:"#111827"}}>{p.name}</p><p style={{margin:"2px 0 0",fontSize:12,color:"#6b7280"}}>{p.role}</p></div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
