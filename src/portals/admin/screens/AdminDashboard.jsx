import { ADMIN_CLIENTS } from "../data.js";

export default function AdminDashboard({ onNavigate }) {
  const today = new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"short",day:"numeric"});

  const perf = [
    { label:"TOTAL BATCHES HANDLED", value:"847", sub:"All time",           color:"#111827" },
    { label:"SUCCESSFULLY COMPLETED",value:"731", sub:"86% completion rate", color:"#16a34a" },
    { label:"COMPLETION RATE",       value:"86%", sub:"Platform average",    color:"#16a34a" },
    { label:"CURRENTLY ACTIVE",      value:"94",  sub:"Across all clients",  color:"#3b82f6" },
    { label:"RETURNED / FLAGGED",    value:"22",  sub:"Awaiting CE action",  color:"#d97706" },
    { label:"AVG TURNAROUND",        value:"9d",  sub:"Days per job",        color:"#7c3aed" },
  ];

  const clientStats = [
    { label:"TOTAL CLIENTS",   value: ADMIN_CLIENTS.length,                                        color:"#111827" },
    { label:"ACTIVE",          value: ADMIN_CLIENTS.filter(c=>c.status==="Active").length,          color:"#16a34a" },
    { label:"INACTIVE",        value: ADMIN_CLIENTS.filter(c=>c.status!=="Active").length,          color:"#6b7280" },
    { label:"NEW THIS MONTH",  value:"2",                                                           color:"#3b82f6" },
  ];

  const teamStats = [
    { label:"TOTAL USERS",        value:"11", color:"#111827" },
    { label:"ACTIVE VOs",         value:"8",  color:"#16a34a" },
    { label:"FIELD AGENTS AVAIL", value:"6",  color:"#3b82f6" },
    { label:"TEMPLATES ASSIGNED", value:"24", color:"#7c3aed" },
  ];

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>ADMIN DASHBOARD</h1>
        <span style={{fontSize:14,color:"#6b7280"}}>{today}</span>
      </div>

      {/* Section 1 — Platform Performance */}
      <div style={{marginBottom:8}}>
        <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.6}}>PLATFORM PERFORMANCE</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:14,marginBottom:24}}>
          {perf.map(s=>(
            <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 20px"}}>
              <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5,lineHeight:1.4}}>{s.label}</p>
              <p style={{margin:"0 0 4px",fontSize:28,fontWeight:700,color:s.color}}>{s.value}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Quick Actions (unchanged) */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:20}}>
        <p style={{margin:"0 0 16px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>QUICK ACTIONS</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {[
            { label:"+ New Service",  nav:"newservice" },
            { label:"+ New User",     nav:"newuser" },
            { label:"+ New Agent",    nav:"newagent" },
            { label:"+ New Client User", nav:"newclient" },
            { label:"+ Template",     nav:"newtemplate" },
            { label:"View Audit Log", nav:"auditlogs" },
          ].map(a=>(
            <button key={a.label} onClick={()=>a.nav && onNavigate(a.nav)}
              style={{padding:"10px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 3 — Client Overview + Team Overview */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

        {/* Left — Client Overview */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CLIENT OVERVIEW</p>
            <button onClick={()=>onNavigate&&onNavigate("clients")}
              style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,color:"#374151",cursor:"pointer"}}>View All</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {clientStats.map(s=>(
              <div key={s.label} style={{background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                <p style={{margin:"0 0 6px",fontSize:10,fontWeight:700,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
                <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Team Overview */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>TEAM OVERVIEW</p>
            <button onClick={()=>onNavigate&&onNavigate("internalusers")}
              style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,color:"#374151",cursor:"pointer"}}>View All</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {teamStats.map(s=>(
              <div key={s.label} style={{background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                <p style={{margin:"0 0 6px",fontSize:10,fontWeight:700,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
                <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
