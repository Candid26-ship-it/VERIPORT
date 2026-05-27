import { useState } from "react";
import VAInfoPanel from "../components/VAInfoPanel.jsx";

function VOSettings({ user }) {
  const [settingsTab, setSettingsTab] = useState("Personal");
  const [density, setDensity]         = useState("Comfortable");
  const [theme, setTheme]             = useState("Light");
  const [highContrast, setHighContrast] = useState(false);
  const [timezone, setTimezone]       = useState("Africa/Lagos (WAT)");
  const [notif, setNotif]             = useState({ email:true, sms:false, push:true });
  const [alerts, setAlerts]           = useState({ sla:true, discrepancy:true, system:false });
  const [fontSize, setFontSize]       = useState("Small");
  const [access, setAccess]           = useState({ focusIndicators:true, skipLinks:true, enhancedDesc:true, announcePages:true });

  const Radio = ({ val, cur, set }) => (
    <div onClick={() => set(val)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${cur===val?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",background:"white",flexShrink:0}}>
        {cur===val && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      <span style={{fontSize:14,color:"#374151"}}>{val}</span>
    </div>
  );

  const Checkbox = ({ checked, onChange, label, desc }) => (
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid #f3f4f6"}}>
      <div style={{paddingRight:16}}>
        <p style={{margin:"0 0 2px",fontSize:14,fontWeight:500,color:"#111827"}}>{label}</p>
        {desc && <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{desc}</p>}
      </div>
      <div onClick={onChange} style={{width:20,height:20,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,marginTop:1}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="12" height="12"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
    </div>
  );

  const SETTINGS_TABS = [
    { label:"Personal",      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
    { label:"Notifications", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg> },
    { label:"Accessibility", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg> },
  ];

  const renderContent = () => {
    if (settingsTab === "Personal") return (
      <div>
        <h2 style={{margin:"0 0 20px",fontSize:18,fontWeight:700,color:"#111827"}}>Display Preferences</h2>
        <div style={{marginBottom:22}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:500,color:"#374151"}}>Interface Density</p>
          <div style={{display:"flex",gap:28}}>{["Compact","Comfortable","Spacious"].map(d=><Radio key={d} val={d} cur={density} set={setDensity}/>)}</div>
        </div>
        <div style={{marginBottom:22}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:500,color:"#374151"}}>Theme</p>
          <div style={{display:"flex",gap:28}}>{["Light","Dark","System"].map(t=><Radio key={t} val={t} cur={theme} set={setTheme}/>)}</div>
        </div>
        <div style={{marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setHighContrast(p=>!p)}>
            <div style={{width:18,height:18,borderRadius:3,border:`2px solid ${highContrast?"#b91c1c":"#d1d5db"}`,background:highContrast?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {highContrast && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <span style={{fontSize:14,fontWeight:500,color:"#374151"}}>High contrast mode</span>
          </div>
          <p style={{margin:"4px 0 0 28px",fontSize:13,color:"#6b7280"}}>Improves visibility for users with visual impairments</p>
        </div>
        <div style={{borderTop:"1px solid #e5e7eb",marginTop:24,paddingTop:24}}>
          <h2 style={{margin:"0 0 16px",fontSize:18,fontWeight:700,color:"#111827"}}>Regional Settings</h2>
          <p style={{margin:"0 0 8px",fontSize:14,fontWeight:500,color:"#374151"}}>Timezone</p>
          <div style={{position:"relative",maxWidth:340}}>
            <select value={timezone} onChange={e=>setTimezone(e.target.value)}
              style={{width:"100%",padding:"10px 36px 10px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,color:"#374151",background:"white",outline:"none",appearance:"none",cursor:"pointer"}}>
              <option>Africa/Lagos (WAT)</option>
              <option>Africa/Abuja (WAT)</option>
              <option>UTC</option>
              <option>Europe/London (GMT)</option>
            </select>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
          </div>
        </div>
      </div>
    );
    if (settingsTab === "Notifications") return (
      <div>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Notification Channels</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={notif.email}  onChange={()=>setNotif(p=>({...p,email:!p.email}))}  label="Email Notifications"  desc="Receive notifications via email"/>
        <Checkbox checked={notif.sms}    onChange={()=>setNotif(p=>({...p,sms:!p.sms}))}      label="SMS Notifications"    desc="Receive critical alerts via SMS"/>
        <Checkbox checked={notif.push}   onChange={()=>setNotif(p=>({...p,push:!p.push}))}    label="Push Notifications"   desc="Browser push notifications"/>
        <h2 style={{margin:"24px 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Alert Types</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={alerts.sla}         onChange={()=>setAlerts(p=>({...p,sla:!p.sla}))}               label="SLA Alerts"         desc="Notifications when cases approach SLA deadlines"/>
        <Checkbox checked={alerts.discrepancy} onChange={()=>setAlerts(p=>({...p,discrepancy:!p.discrepancy}))} label="Discrepancy Alerts" desc="Notifications when discrepancies are flagged"/>
        <Checkbox checked={alerts.system}      onChange={()=>setAlerts(p=>({...p,system:!p.system}))}           label="System Updates"     desc="Notifications about system maintenance and updates"/>
      </div>
    );
    if (settingsTab === "Accessibility") return (
      <div>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Visual Accessibility</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={highContrast} onChange={()=>setHighContrast(p=>!p)} label="High Contrast Mode" desc="Increases contrast for better visibility"/>
        <div style={{padding:"14px 0",borderBottom:"1px solid #f3f4f6",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:14,fontWeight:500,color:"#111827"}}>Font Size</p>
          <div style={{position:"relative",maxWidth:240}}>
            <select value={fontSize} onChange={e=>setFontSize(e.target.value)}
              style={{width:"100%",padding:"10px 36px 10px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,color:"#374151",background:"white",outline:"none",appearance:"none",cursor:"pointer"}}>
              {["Small","Medium","Large"].map(s=><option key={s}>{s}</option>)}
            </select>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
          </div>
        </div>
        <h2 style={{margin:"24px 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Keyboard Navigation</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={access.focusIndicators} onChange={()=>setAccess(p=>({...p,focusIndicators:!p.focusIndicators}))} label="Enhanced Focus Indicators" desc="More visible focus outlines for keyboard navigation"/>
        <Checkbox checked={access.skipLinks}       onChange={()=>setAccess(p=>({...p,skipLinks:!p.skipLinks}))}             label="Skip Links"               desc="Show skip navigation links"/>
        <h2 style={{margin:"24px 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Screen Reader</h2>
        <div style={{marginBottom:20}}/>
        <Checkbox checked={access.enhancedDesc}  onChange={()=>setAccess(p=>({...p,enhancedDesc:!p.enhancedDesc}))}   label="Enhanced Descriptions" desc="More detailed aria-labels and descriptions"/>
        <Checkbox checked={access.announcePages} onChange={()=>setAccess(p=>({...p,announcePages:!p.announcePages}))} label="Announce Page Changes"  desc="Announce when navigating between pages"/>
      </div>
    );
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <span style={{color:"#9ca3af"}}>›</span>
        <span style={{color:"#374151",fontWeight:500}}>Settings</span>
      </div>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Settings</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>Manage your preferences and account settings</p>
        </div>
        <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.background="#991b1b"}
          onMouseLeave={e=>e.currentTarget.style.background="#b91c1c"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save Changes
        </button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:16,alignItems:"start"}}>
        {/* Left nav */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          {SETTINGS_TABS.map(t => (
            <button key={t.label} onClick={()=>setSettingsTab(t.label)}
              style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"13px 16px",border:"none",cursor:"pointer",fontSize:14,fontWeight:settingsTab===t.label?600:400,
                background:settingsTab===t.label?"#b91c1c":"white",
                color:settingsTab===t.label?"white":"#374151",
                textAlign:"left",borderBottom:"1px solid #f3f4f6"}}>
              <span style={{opacity:.8}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        {/* Content panel */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px"}}>
          {renderContent()}
        </div>
      </div>

      {/* Profile card at bottom */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px",marginTop:16,display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:16,flexShrink:0}}>
          {user?.initials || "M"}
        </div>
        <div>
          <p style={{margin:"0 0 2px",fontSize:15,fontWeight:600,color:"#111827"}}>{user?.name || "Mike Obi"}</p>
          <p style={{margin:"0 0 2px",fontSize:13,color:"#6b7280"}}>m.obi@dragnet.com</p>
          <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Current Role: Verification Officer</p>
        </div>
      </div>

      {/* ── VA Info Panel — Revalidation tab (item 13, read-only) ───────────── */}
      {selectedRevalRow && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
          <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
              <div>
                <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedRevalRow.inst} · {selectedRevalRow.dept}</p>
              </div>
              <button onClick={()=>setSelectedRevalRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{padding:"24px 20px",flex:1}}>
              <VAInfoPanel row={selectedRevalRow}/>
            </div>
          </div>
        </div>
      )}

      {/* ── VA Info Panel — Confirmed tab (item 13, read-only) ──────────────── */}
      {selectedConfRow && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
          <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
              <div>
                <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedConfRow.inst} · {selectedConfRow.dept}</p>
              </div>
              <button onClick={()=>setSelectedConfRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{padding:"24px 20px",flex:1}}>
              <VAInfoPanel row={selectedConfRow}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VOSettings;
