import { useState } from "react";

function CESettings({ user }) {
  const [tab, setTab] = useState("Profile");

  // Profile state
  const [name,    setName]    = useState(user?.name  || "Emeka Nwosu");
  const [email,   setEmail]   = useState(user?.email || "emeka@dragnet.ng");
  const [phone,   setPhone]   = useState("+234-802-345-6789");
  const [saved,   setSaved]   = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  // Notifications state
  const [notif, setNotif] = useState({
    batchAssigned: true, statusChange: true, voReturns: true, inApp: true,
  });
  const [digest, setDigest] = useState("Immediate");

  // Display state
  const [defaultTab,   setDefaultTab]   = useState("Drafts");
  const [rowsPerPage,  setRowsPerPage]  = useState("25");
  const [dateFormat,   setDateFormat]   = useState("DD/MM/YYYY");

  // Report preferences state
  const [footerMsg,      setFooterMsg]      = useState("This report is confidential and prepared by Dragnet Solutions.");
  const [autoRef,        setAutoRef]        = useState(true);
  const [reportLang,     setReportLang]     = useState("English");

  const TABS = ["Profile", "Notifications", "Display", "Report Preferences"];

  const Radio = ({val, cur, set}) => (
    <div onClick={()=>set(val)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${cur===val?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        {cur===val && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      <span style={{fontSize:14,color:"#374151"}}>{val}</span>
    </div>
  );

  const Toggle = ({checked, onChange, label, desc}) => (
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid #f3f4f6"}}>
      <div style={{paddingRight:16}}>
        <p style={{margin:"0 0 2px",fontSize:14,fontWeight:500,color:"#111827"}}>{label}</p>
        {desc && <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{desc}</p>}
      </div>
      <div onClick={onChange} style={{width:20,height:20,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,marginTop:2}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="12" height="12"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
    </div>
  );

  const inp = {width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827",marginBottom:16};
  const lbl = {display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6};

  const renderTab = () => {
    if (tab === "Profile") return (
      <div>
        <h2 style={{margin:"0 0 6px",fontSize:18,fontWeight:700,color:"#111827"}}>Profile</h2>
        <p style={{margin:"0 0 24px",fontSize:13,color:"#6b7280"}}>Your personal information and account credentials.</p>
        {/* Avatar placeholder */}
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28,paddingBottom:24,borderBottom:"1px solid #e5e7eb"}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:22,flexShrink:0}}>
            {name.split(" ").map(n=>n[0]).join("").substring(0,2)}
          </div>
          <div>
            <p style={{margin:"0 0 4px",fontSize:15,fontWeight:600,color:"#111827"}}>{name}</p>
            <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>CE Officer · Dragnet Solutions</p>
            <button style={{padding:"5px 14px",border:"1.5px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>Change Photo</button>
          </div>
        </div>
        <label style={lbl}>Full Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} style={inp}/>
        <label style={lbl}>Email Address</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} style={inp}/>
        <label style={lbl}>Phone Number</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} style={inp}/>
        <div style={{borderTop:"1px solid #e5e7eb",paddingTop:24,marginTop:8}}>
          <h3 style={{margin:"0 0 16px",fontSize:15,fontWeight:700,color:"#111827"}}>Change Password</h3>
          <label style={lbl}>Current Password</label>
          <input type="password" placeholder="••••••••" style={inp}/>
          <label style={lbl}>New Password</label>
          <input type="password" placeholder="••••••••" style={inp}/>
          <label style={lbl}>Confirm New Password</label>
          <input type="password" placeholder="••••••••" style={{...inp,marginBottom:0}}/>
        </div>
      </div>
    );

    if (tab === "Notifications") return (
      <div>
        <h2 style={{margin:"0 0 6px",fontSize:18,fontWeight:700,color:"#111827"}}>Notifications</h2>
        <p style={{margin:"0 0 24px",fontSize:13,color:"#6b7280"}}>Choose which events trigger alerts and how you receive them.</p>
        <h3 style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:"#374151",letterSpacing:.3}}>EMAIL ALERTS</h3>
        <Toggle checked={notif.batchAssigned} onChange={()=>setNotif(p=>({...p,batchAssigned:!p.batchAssigned}))}
          label="New batch assigned" desc="Get notified when a new batch is assigned to you"/>
        <Toggle checked={notif.statusChange}  onChange={()=>setNotif(p=>({...p,statusChange:!p.statusChange}))}
          label="Batch status changes" desc="Alerts when a batch moves between stages"/>
        <Toggle checked={notif.voReturns}     onChange={()=>setNotif(p=>({...p,voReturns:!p.voReturns}))}
          label="Returns from VO" desc="Notified when tasks are returned for your attention"/>
        <div style={{marginTop:24,marginBottom:4}}>
          <h3 style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:"#374151",letterSpacing:.3}}>IN-APP</h3>
        </div>
        <Toggle checked={notif.inApp} onChange={()=>setNotif(p=>({...p,inApp:!p.inApp}))}
          label="In-app notifications" desc="Show notification bell alerts within VeriPort"/>
        <div style={{marginTop:24}}>
          <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:700,color:"#374151",letterSpacing:.3}}>DIGEST FREQUENCY</h3>
          <div style={{display:"flex",gap:28}}>
            {["Immediate","Daily Summary","Weekly"].map(d=><Radio key={d} val={d} cur={digest} set={setDigest}/>)}
          </div>
        </div>
      </div>
    );

    if (tab === "Display") return (
      <div>
        <h2 style={{margin:"0 0 6px",fontSize:18,fontWeight:700,color:"#111827"}}>Display Preferences</h2>
        <p style={{margin:"0 0 24px",fontSize:13,color:"#6b7280"}}>Customise how the CE workboard looks and behaves.</p>
        <div style={{marginBottom:24}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#374151"}}>Default Landing Tab</p>
          <p style={{margin:"0 0 14px",fontSize:13,color:"#6b7280"}}>Which tab opens first when you navigate to the Dashboard</p>
          <div style={{display:"flex",gap:28}}>
            {["Drafts","Collection","Active","Complete"].map(t=><Radio key={t} val={t} cur={defaultTab} set={setDefaultTab}/>)}
          </div>
        </div>
        <div style={{borderTop:"1px solid #e5e7eb",paddingTop:24,marginBottom:24}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#374151"}}>Rows Per Page</p>
          <div style={{display:"flex",gap:28}}>
            {["10","25","50"].map(r=><Radio key={r} val={r} cur={rowsPerPage} set={setRowsPerPage}/>)}
          </div>
        </div>
        <div style={{borderTop:"1px solid #e5e7eb",paddingTop:24}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#374151"}}>Date Format</p>
          <div style={{display:"flex",gap:28}}>
            {["DD/MM/YYYY","MM/DD/YYYY","YYYY-MM-DD"].map(f=><Radio key={f} val={f} cur={dateFormat} set={setDateFormat}/>)}
          </div>
        </div>
      </div>
    );

    if (tab === "Report Preferences") return (
      <div>
        <h2 style={{margin:"0 0 6px",fontSize:18,fontWeight:700,color:"#111827"}}>Report Preferences</h2>
        <p style={{margin:"0 0 24px",fontSize:13,color:"#6b7280"}}>Configure default settings for generated PDF reports.</p>
        <label style={lbl}>Default Report Footer Message</label>
        <textarea value={footerMsg} onChange={e=>setFooterMsg(e.target.value)} rows={3}
          style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827",resize:"vertical",marginBottom:20}}/>
        <Toggle checked={autoRef} onChange={()=>setAutoRef(p=>!p)}
          label="Auto-include batch reference on PDFs" desc="Automatically adds the batch reference number to every generated report"/>
        <div style={{marginTop:24,borderTop:"1px solid #e5e7eb",paddingTop:24}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#374151"}}>Report Language</p>
          <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
            {[
              {val:"English", disabled:false},
              {val:"French",  disabled:true},
              {val:"Arabic",  disabled:true},
            ].map(({val,disabled})=>(
              <div key={val} style={{display:"flex",alignItems:"center",gap:8,opacity:disabled?0.4:1,cursor:disabled?"not-allowed":"pointer"}}
                onClick={()=>!disabled && setReportLang(val)}>
                <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${reportLang===val&&!disabled?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {reportLang===val && !disabled && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                <span style={{fontSize:14,color:"#374151"}}>{val}{disabled?" (coming soon)":""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{display:"flex",flex:1,height:"100%",overflow:"hidden"}}>
      {/* Left tab nav */}
      <div style={{width:220,borderRight:"1px solid #e5e7eb",background:"white",padding:"24px 12px",flexShrink:0}}>
        <p style={{margin:"0 0 12px 8px",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:.8}}>SETTINGS</p>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{display:"block",width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:tab===t?600:400,background:tab===t?"#fef2f2":"transparent",color:tab===t?"#b91c1c":"#374151",textAlign:"left",marginBottom:2}}>
            {t}
          </button>
        ))}
      </div>
      {/* Right content */}
      <div style={{flex:1,overflowY:"auto",padding:"32px 40px"}}>
        {renderTab()}
        {/* Save button */}
        <div style={{marginTop:32,paddingTop:24,borderTop:"1px solid #e5e7eb",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={handleSave}
            style={{padding:"10px 28px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
            Save Changes
          </button>
          {saved && <span style={{fontSize:14,color:"#16a34a",fontWeight:500}}>✓ Changes saved</span>}
        </div>
      </div>
    </div>
  );
}

export default CESettings;
