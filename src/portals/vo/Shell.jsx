import { useState } from "react";
import { ShieldIcon, ChevronRight, MenuIcon, SearchSm, BellIcon } from "../../components/Icons.jsx";
import { RoleSwitcher } from "../../components/RoleSwitcher.jsx";
import { VO_SERVMODES } from "./data.js";
import VOWorkboard from "./screens/VOWorkboard.jsx";
import VOSettings from "./screens/VOSettings.jsx";
import VOHelp from "./screens/VOHelp.jsx";

export function VOShell({ user, activeProfile, onSwitchProfile, onSignOut, onReturnToCE }) {
  const [activeNav, setActiveNav]       = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [selectedSF, setSelectedSF]     = useState(null);

  const totalTasks   = VO_SERVMODES.reduce((a,s)=>a+s.tasks,0);
  const totalAtRisk  = VO_SERVMODES.reduce((a,s)=>a+s.atRisk,0);
  const urgentTasks = [
    { id:"TASK-2024-10-00245", service:"Employment Reference Verification", candidate:"Jane Smith", status:"Route 1 - Email (Day 8)", sla:"Due in 1 day", slaColor:"#b91c1c" },
    { id:"TASK-2024-10-00123", service:"Employment Reference Verification", candidate:"Sarah Ahmed", status:"Route 1 - Email (Day 6)", sla:"Due in 2 days", slaColor:"#d97706" },
  ];

  const VONav = [
    { label:"Dashboard",    d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { label:"My ServModes", d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" },
    { label:"My Tasks",     d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label:"Task Queues",  d:"M4 6h16M4 10h16M4 14h16M4 18h16" },
    { label:"Settings",     d:"M12 15a3 3 0 100-6 3 3 0 000 6z" },
    { label:"Help",         d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 8v4M12 16h.01" },
  ];

  const renderContent = () => {
    // If a ServMode is selected, show its workboard
    if (selectedSF) return <VOWorkboard sf={selectedSF} onBack={()=>setSelectedSF(null)} onReturnToCE={onReturnToCE}/>;

    if (activeNav==="Dashboard" || activeNav==="My ServModes") return (
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        {activeNav==="Dashboard" && (
          <>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div>
                <h1 style={{margin:"0 0 2px",fontSize:24,fontWeight:700,color:"#111827"}}>VERIPORT OFFICER</h1>
                <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Tuesday, Feb 4, 2026 — Good morning, Mike</p>
              </div>
            </div>

            {/* My Workload summary */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:20}}>
              <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>MY WORKLOAD</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {[
                  {label:"Assigned",    val:0,         icon:"📋", color:"#374151",  bg:"#f9fafb" },
                  {label:"In Progress", val:3,         icon:"🕐", color:"#3b82f6",  bg:"#eff6ff" },
                  {label:"Overdue",     val:0,         icon:"⚠️",  color:"#b91c1c",  bg:"#fef2f2" },
                  {label:"At Risk",     val:totalAtRisk,icon:"🔔",color:"#d97706",  bg:"#fffbeb" },
                ].map(s=>(
                  <div key={s.label} style={{background:s.bg,borderRadius:10,padding:"16px",textAlign:"center"}}>
                    <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
                    <p style={{margin:"0 0 2px",fontSize:26,fontWeight:700,color:s.color}}>{s.val}</p>
                    <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent attention */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:20}}>
              <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#b91c1c",letterSpacing:.5}}>⚠️ URGENT ATTENTION ({urgentTasks.length})</p>
              {urgentTasks.map((t,i)=>(
                <div key={i} style={{borderRadius:10,border:"1px solid #fecaca",background:"#fef2f2",padding:"14px 16px",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
                    <div>
                      <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:"#111827"}}>● {t.id}</p>
                      <p style={{margin:"0 0 2px",fontSize:13,color:"#374151"}}>{t.service} — {t.candidate}</p>
                      <p style={{margin:"0 0 8px",fontSize:12,color:"#6b7280"}}>Status: {t.status}</p>
                      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:600,color:t.slaColor}}>SLA: {t.sla}</p>
                      <div style={{display:"flex",gap:8}}>
                        <button style={{padding:"7px 16px",border:"none",borderRadius:6,background:"#1d4ed8",color:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>Make Phone Call</button>
                        <button style={{padding:"7px 16px",border:"none",borderRadius:6,background:"#d97706",color:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>Escalate</button>
                        <button style={{padding:"7px 16px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>View Task</button>
                      </div>
                    </div>
                    <div style={{width:12,height:12,borderRadius:"50%",background:"#fecaca",border:"2px solid #b91c1c",flexShrink:0}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick ServModes access */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>MY SERVMODES</p>
                <span style={{fontSize:12,color:"#6b7280"}}>Total: {totalTasks} tasks · At Risk: {totalAtRisk}</span>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  {["SERVMODE","MODE","TASKS","ACTIVE / AWAITING","AT RISK",""].map((h,i)=><th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {VO_SERVMODES.map((sf,i)=>{
                    const modeBg = {Email:"#eff6ff",Letter:"#fef3c7",Field:"#dcfce7",Portal:"#f0fdf4",Scholar:"#f5f3ff"}[sf.mode]||"#f3f4f6";
                    const modeTx = {Email:"#3b82f6",Letter:"#d97706",Field:"#16a34a",Portal:"#059669",Scholar:"#7c3aed"}[sf.mode]||"#374151";
                    return (
                      <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:sf.atRisk>0?"#fffbeb":"white"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                        onMouseLeave={e=>e.currentTarget.style.background=sf.atRisk>0?"#fffbeb":"white"}
                        onClick={()=>{setSelectedSF(sf);setActiveNav("My ServModes");}}>
                        <td style={{padding:"13px 16px",fontWeight:600,fontSize:14,color:"#111827"}}>{sf.id}</td>
                        <td style={{padding:"13px 16px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:modeBg,color:modeTx}}>{sf.mode}</span></td>
                        <td style={{padding:"13px 16px",fontSize:14,color:"#374151"}}>{sf.tasks}</td>
                        <td style={{padding:"13px 16px",fontSize:14,color:"#374151"}}>{sf.active} / {sf.awaiting}</td>
                        <td style={{padding:"13px 16px"}}>
                          {sf.atRisk>0 ? <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:"#fef2f2",color:"#b91c1c"}}>{sf.atRisk} at risk</span>
                          : <span style={{fontSize:13,color:"#6b7280"}}>—</span>}
                        </td>
                        <td style={{padding:"13px 16px",color:"#9ca3af"}}><ChevronRight/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{borderTop:"1px solid #f3f4f6",padding:"12px 16px",display:"flex",gap:24,fontSize:13,color:"#6b7280"}}>
                <span>Total Tasks: <b style={{color:"#111827"}}>{totalTasks}</b></span>
                <span>At Risk: <b style={{color:"#b91c1c"}}>{totalAtRisk}</b></span>
                <span>Late: <b style={{color:"#b91c1c"}}>0</b></span>
              </div>
            </div>
          </>
        )}

        {activeNav==="My ServModes" && !selectedSF && (
          <>
            <h1 style={{margin:"0 0 20px",fontSize:22,fontWeight:700,color:"#111827"}}>MY SERVMODES</h1>
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  {["SERVMODE","SERVICE","MODE","TASKS","ACTIVE / AWAITING","AT RISK",""].map((h,i)=><th key={i} style={{padding:"11px 18px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {VO_SERVMODES.map((sf,i)=>{
                    const modeBg = {Email:"#eff6ff",Letter:"#fef3c7",Field:"#dcfce7",Portal:"#f0fdf4",Scholar:"#f5f3ff"}[sf.mode]||"#f3f4f6";
                    const modeTx = {Email:"#3b82f6",Letter:"#d97706",Field:"#16a34a",Portal:"#059669",Scholar:"#7c3aed"}[sf.mode]||"#374151";
                    return (
                      <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:sf.atRisk>0?"#fffbeb":"white"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                        onMouseLeave={e=>e.currentTarget.style.background=sf.atRisk>0?"#fffbeb":"white"}
                        onClick={()=>setSelectedSF(sf)}>
                        <td style={{padding:"14px 18px",fontWeight:600,fontSize:14,color:"#111827"}}>{sf.id}</td>
                        <td style={{padding:"14px 18px",fontSize:13,color:"#6b7280"}}>{sf.service}</td>
                        <td style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:modeBg,color:modeTx}}>{sf.mode}</span></td>
                        <td style={{padding:"14px 18px",fontSize:14,color:"#374151"}}>{sf.tasks}</td>
                        <td style={{padding:"14px 18px",fontSize:14,color:"#374151"}}>{sf.active} / {sf.awaiting}</td>
                        <td style={{padding:"14px 18px"}}>
                          {sf.atRisk>0 ? <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:"#fef2f2",color:"#b91c1c"}}>{sf.atRisk} at risk</span>
                          : <span style={{fontSize:13,color:"#6b7280"}}>—</span>}
                        </td>
                        <td style={{padding:"14px 18px",color:"#9ca3af"}}><ChevronRight/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    );

    // ── My Tasks ──────────────────────────────────────────────────────────────
    if (activeNav === "My Tasks") {
      const MY_TASKS_DATA = [
        { id:"TASK-2024-10-00245", service:"Employment Verification", candidate:"Jane Smith",  sla:"24h left", slaRed:true,  status:"In Progress",        statusBlue:true,  batch:"BATCH-2024-10-001", urgent:true },
        { id:"TASK-2024-10-00289", service:"Guarantor Verification",  candidate:"Tom White",   sla:"48h left", slaRed:true,  status:"In Progress",        statusBlue:true,  batch:"BATCH-2024-10-001", urgent:true },
        { id:"TASK-2024-10-00334", service:"Employment Verification", candidate:"Peter Obi",   sla:"72h left", slaGreen:true,status:"In Progress",        statusBlue:true,  batch:"BATCH-2024-10-002", urgent:false },
        { id:"TASK-2024-10-00356", service:"Address Verification",    candidate:"Grace Lee",   sla:"120h left",slaGreen:true,status:"Pending Assignment", statusGray:true,  batch:"BATCH-2024-10-002", urgent:false },
      ];
      const urgent = MY_TASKS_DATA.filter(t => t.urgent);
      const SlaBadge = ({t}) => (
        <span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,
          background:t.slaRed?"#fee2e2":t.slaGreen?"#dcfce7":"#f3f4f6",
          color:t.slaRed?"#b91c1c":t.slaGreen?"#16a34a":"#374151"}}>{t.sla}</span>
      );
      const StatusBadge2 = ({t}) => (
        <span style={{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:500,
          background:t.statusBlue?"#eff6ff":t.statusGray?"#f3f4f6":"#f9fafb",
          color:t.statusBlue?"#3b82f6":t.statusGray?"#6b7280":"#374151"}}>{t.status}</span>
      );
      return (
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
          {/* Breadcrumb */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            <span style={{color:"#9ca3af"}}>›</span>
            <span style={{color:"#374151",fontWeight:500}}>My tasks</span>
          </div>
          <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>My Tasks</h1>
          <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Manage your assigned verification tasks</p>

          {/* Stat cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
            {[
              {iconColor:"#3b82f6", iconPath:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 6v6l4 2", val:3, label:"In Progress"},
              {iconColor:"#b91c1c", iconPath:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01", val:2, label:"Urgent"},
              {iconColor:"#6b7280", iconPath:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 6v6l4 2", val:1, label:"Pending"},
            ].map(s => (
              <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={s.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d={s.iconPath}/></svg>
                  <span style={{fontSize:34,fontWeight:700,color:s.iconColor}}>{s.val}</span>
                </div>
                <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Urgent Attention */}
          <div style={{background:"#fff5f5",borderRadius:12,border:"1px solid #fecaca",padding:"20px 24px",marginBottom:20}}>
            <p style={{margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#b91c1c",display:"flex",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="18" height="18"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
              Urgent Attention ({urgent.length})
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {urgent.map((t,i) => (
                <div key={i} style={{background:"white",borderRadius:10,border:"1px solid #fecaca",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <div>
                    <p style={{margin:"0 0 3px",fontSize:14,fontWeight:600,color:"#111827"}}>{t.id} - {t.service}</p>
                    <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{t.candidate}</p>
                  </div>
                  <span style={{padding:"4px 12px",borderRadius:20,fontSize:13,fontWeight:600,background:"#fee2e2",color:"#b91c1c",whiteSpace:"nowrap"}}>{t.sla}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All tasks table */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#f9fafb"}}>
                {["TASK ID","SERVICE","SLA","STATUS","BATCH"].map(h => (
                  <th key={h} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {MY_TASKS_DATA.map((t,i) => (
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <td style={{padding:"15px 20px"}}>
                      <p style={{margin:"0 0 2px",fontSize:14,fontWeight:600,color:"#111827"}}>{t.id}</p>
                      <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{t.candidate}</p>
                    </td>
                    <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{t.service}</td>
                    <td style={{padding:"15px 20px"}}><SlaBadge t={t}/></td>
                    <td style={{padding:"15px 20px"}}><StatusBadge2 t={t}/></td>
                    <td style={{padding:"15px 20px",fontSize:13,color:"#6b7280"}}>{t.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // ── Task Queues ───────────────────────────────────────────────────────────
    if (activeNav === "Task Queues") {
      const QUEUES_DATA = [
        { name:"Employment Verification Queue", desc:"Employment verifications",  count:12, oldest:4, oldestColor:"#d97706" },
        { name:"Guarantor Verification Queue",  desc:"Guarantor verifications",   count:8,  oldest:2, oldestColor:"#16a34a" },
        { name:"Education Verification Queue",  desc:"Education verifications",   count:15, oldest:6, oldestColor:"#b91c1c" },
        { name:"Address Verification Queue",    desc:"Address verifications",     count:10, oldest:3, oldestColor:"#d97706" },
      ];
      return (
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,color:"#6b7280"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            <span style={{color:"#9ca3af"}}>›</span>
            <span style={{color:"#374151",fontWeight:500}}>Task queues</span>
          </div>
          <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Task Queues</h1>
          <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280"}}>Claim tasks from available queues</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {QUEUES_DATA.map((q,i) => (
              <div key={i} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20}}>
                  <div style={{width:44,height:44,borderRadius:10,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{margin:"0 0 3px",fontSize:16,fontWeight:700,color:"#111827"}}>{q.name}</p>
                    <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{q.desc}</p>
                  </div>
                </div>
                <div style={{marginBottom:8,display:"flex",justifyContent:"space-between",fontSize:14,color:"#374151"}}>
                  <span>Tasks in queue:</span>
                  <span style={{fontWeight:700,color:"#111827"}}>{q.count}</span>
                </div>
                <div style={{marginBottom:20,display:"flex",justifyContent:"space-between",fontSize:14,color:"#374151"}}>
                  <span>Oldest task:</span>
                  <span style={{fontWeight:700,color:q.oldestColor}}>{q.oldest} days</span>
                </div>
                <button style={{width:"100%",padding:"11px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#991b1b"}
                  onMouseLeave={e=>e.currentTarget.style.background="#b91c1c"}>
                  View &amp; Claim Tasks
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ── Settings ──────────────────────────────────────────────────────────────
    if (activeNav === "Settings") {
      return <VOSettings user={user}/>;
    }

    // ── Help ──────────────────────────────────────────────────────────────────
    if (activeNav === "Help") {
      return <VOHelp/>;
    }

    return (
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontSize:15}}>
        {activeNav} — coming soon
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      {/* Topbar */}
      <div style={{display:"flex",alignItems:"center",padding:"0 20px",height:56,background:"white",borderBottom:"1px solid #e5e7eb",gap:16,flexShrink:0,zIndex:10}}>
        <button onClick={()=>setSidebarOpen(p=>!p)} style={{background:"none",border:"none",cursor:"pointer",color:"#374151",padding:4,display:"flex"}}><MenuIcon/></button>
        <div style={{display:"flex",alignItems:"center",gap:8,fontWeight:700,fontSize:16,color:"#111827"}}>
          <div style={{width:28,height:28,background:"#b91c1c",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><ShieldIcon size={16}/></div>
          VERIPORT
        </div>
        <div style={{flex:1,maxWidth:400,position:"relative",marginLeft:16}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input placeholder="Search... (Ctrl+K)" style={{width:"100%",padding:"7px 12px 7px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151",background:"#f9fafb"}}/>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
          <RoleSwitcher activeProfile={activeProfile} onSwitch={onSwitchProfile}/>
          <div style={{position:"relative",cursor:"pointer"}}>
            <div style={{width:36,height:36,border:"1.5px solid #e5e7eb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#374151"}}><BellIcon/></div>
            <span style={{position:"absolute",top:-6,right:-6,background:"#b91c1c",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>3</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:12}}>{user.initials}</div>
            <span style={{fontSize:14,fontWeight:500,color:"#111827"}}>{user.name}</span>
          </div>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {sidebarOpen && (
          <div className="vp-sidebar vp-sidebar-open" style={{width:240,background:"white",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
            <div style={{padding:"16px 12px 8px"}}>
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 12px"}}>
                <p style={{margin:0,fontSize:11,fontWeight:600,color:"#b91c1c",letterSpacing:.5,marginBottom:2}}>CURRENT ROLE</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>Verification Officer</p>
              </div>
            </div>
            <nav style={{padding:"4px 8px",flex:1}}>
              {VONav.map(item=>(
                <button key={item.label} onClick={()=>{setActiveNav(item.label);if(item.label!=="My ServModes")setSelectedSF(null);}}
                  style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:(activeNav===item.label&&!selectedSF)||item.label==="My ServModes"&&selectedSF?600:400,background:activeNav===item.label?"#b91c1c":"transparent",color:activeNav===item.label?"white":"#374151",marginBottom:2,textAlign:"left"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d={item.d}/></svg>
                  {item.label}
                </button>
              ))}
            </nav>
            <div style={{padding:"12px 8px",borderTop:"1px solid #e5e7eb"}}>
              <button onClick={onSignOut} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,color:"#6b7280",background:"transparent"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}

export default VOShell;
