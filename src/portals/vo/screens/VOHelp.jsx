import { useState } from "react";

function VOHelp() {
  const [helpTab, setHelpTab]       = useState("Quick Guide");
  const [helpSearch, setHelpSearch] = useState("");

  const GUIDE_SECTIONS = [
    { title:"Getting Started",  desc:"Learn the basics of VeriPort and how to navigate the platform",
      items:["Understanding the dashboard","Navigating between modules","Using the global search","Switching user roles (for testing)"] },
    { title:"Case Management",  desc:"How to manage verification cases and workflows",
      items:["Creating new cases","Uploading evidence","Managing SLA timelines","Handling discrepancies"] },
    { title:"Batch Processing", desc:"Working with job orders and batch verification",
      items:["Creating job orders","Managing candidate lists","Tracking batch progress","Generating final reports"] },
    { title:"Communications",   desc:"Using templates and managing communications",
      items:["Creating message templates","Sending verification requests","Tracking message status","Managing responses"] },
  ];

  const SHORTCUTS = [
    {key:"Ctrl+K", desc:"Open global search"},
    {key:"R",      desc:"Remind external party"},
    {key:"N",      desc:"Nudge candidate"},
    {key:"P",      desc:"Pivot ServMode"},
    {key:"C",      desc:"Return to CE"},
    {key:"S",      desc:"Submit / Send"},
    {key:"→",      desc:"Next task in batch"},
    {key:"←",      desc:"Previous task in batch"},
    {key:"Esc",    desc:"Close drawer / modal"},
  ];

  const filtered = GUIDE_SECTIONS.map(s => ({
    ...s,
    items: helpSearch === ""
      ? s.items
      : s.items.filter(i => i.toLowerCase().includes(helpSearch.toLowerCase()) || s.title.toLowerCase().includes(helpSearch.toLowerCase()))
  })).filter(s => s.items.length > 0);

  const HELP_TABS = [
    { label:"Quick Guide",        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
    { label:"Keyboard Shortcuts", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg> },
    { label:"System Info",        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg> },
  ];

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <span style={{color:"#9ca3af"}}>›</span>
        <span style={{color:"#374151",fontWeight:500}}>Help</span>
      </div>
      <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Help &amp; Support</h1>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Get help with VeriPort and access documentation</p>

      {/* Tabs */}
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #e5e7eb",marginBottom:20}}>
        {HELP_TABS.map(t => (
          <button key={t.label} onClick={()=>setHelpTab(t.label)}
            style={{display:"flex",alignItems:"center",gap:7,padding:"11px 18px",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:helpTab===t.label?600:400,
              color:helpTab===t.label?"#b91c1c":"#6b7280",
              borderBottom:helpTab===t.label?"2px solid #b91c1c":"2px solid transparent",
              marginBottom:-1,whiteSpace:"nowrap"}}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Quick Guide */}
      {helpTab === "Quick Guide" && (
        <>
          <div style={{position:"relative",marginBottom:20}}>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </span>
            <input value={helpSearch} onChange={e=>setHelpSearch(e.target.value)} placeholder="Search help topics..."
              style={{width:"100%",padding:"12px 14px 12px 42px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {(helpSearch ? filtered : GUIDE_SECTIONS).map((s,si) => (
              <div key={si} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
                <h3 style={{margin:"0 0 4px",fontSize:17,fontWeight:700,color:"#111827"}}>{s.title}</h3>
                <p style={{margin:"0 0 14px",fontSize:13,color:"#6b7280"}}>{s.desc}</p>
                {s.items.map((item,ii) => (
                  <div key={ii} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",
                    borderTop:ii>0?"1px solid #f3f4f6":"none",cursor:"pointer",color:"#374151",fontSize:14}}
                    onMouseEnter={e=>e.currentTarget.style.color="#b91c1c"}
                    onMouseLeave={e=>e.currentTarget.style.color="#374151"}>
                    <span style={{color:"#9ca3af",fontSize:15,fontWeight:600}}>›</span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Keyboard Shortcuts */}
      {helpTab === "Keyboard Shortcuts" && (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <div style={{padding:"16px 24px",borderBottom:"1px solid #e5e7eb"}}>
            <h3 style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:"#111827"}}>Keyboard Shortcuts</h3>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Power-user shortcuts for faster workflow in the workboard.</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"11px 24px",textAlign:"left",fontSize:12,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>SHORTCUT</th>
              <th style={{padding:"11px 24px",textAlign:"left",fontSize:12,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>ACTION</th>
            </tr></thead>
            <tbody>
              {SHORTCUTS.map((s,i) => (
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 24px"}}>
                    <kbd style={{display:"inline-block",padding:"3px 10px",background:"#f3f4f6",border:"1px solid #d1d5db",borderRadius:5,fontSize:13,fontWeight:600,color:"#374151",fontFamily:"monospace"}}>{s.key}</kbd>
                  </td>
                  <td style={{padding:"13px 24px",fontSize:14,color:"#374151"}}>{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* System Info */}
      {helpTab === "System Info" && (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px"}}>
          <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#111827"}}>System Information</h3>
          {[
            ["Platform",             "VeriPort Enterprise v5.0"],
            ["Environment",          "Production"],
            ["User",                 "Mike Obi (m.obi@dragnet.com)"],
            ["Role",                 "Verification Officer"],
            ["ServModes Assigned",   "7"],
            ["Browser",              "Chrome / WebKit"],
            ["Last Login",           "Feb 4, 2026 — 08:14 WAT"],
            ["Support Email",        "support@dragnet.ng"],
          ].map(([k,v],i) => (
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 0",borderBottom:"1px solid #f3f4f6",fontSize:14}}>
              <span style={{color:"#6b7280",fontWeight:500}}>{k}</span>
              <span style={{color:"#111827",fontWeight:500}}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VOHelp;
