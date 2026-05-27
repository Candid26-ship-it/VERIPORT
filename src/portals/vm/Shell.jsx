import { useState } from "react";
import { Topbar } from "../../components/Topbar.jsx";
import { VM_ESCALATIONS, VM_EXPENSES } from "./data.js";
import VMDashboard from "./screens/VMDashboard.jsx";
import VMEscalationQueue from "./screens/VMEscalationQueue.jsx";
import VMExpenseApproval from "./screens/VMExpenseApproval.jsx";
import VMVARegistry from "./screens/VMVARegistry.jsx";

function VMShell({ user, activeProfile, onSwitchProfile, onSignOut }) {
  const [sidebarOpen,      setSidebarOpen]      = useState(true);
  const [activeNav,        setActiveNav]        = useState("Dashboard");
  const [escalations,      setEscalations]      = useState(VM_ESCALATIONS);
  const [expenses,         setExpenses]         = useState(VM_EXPENSES);
  const [selectedEsc,      setSelectedEsc]      = useState(VM_ESCALATIONS[0]);
  const [selectedExp,      setSelectedExp]      = useState(VM_EXPENSES[0]);
  const [escDecision,      setEscDecision]      = useState("");
  const [escNotes,         setEscNotes]         = useState("");
  const [expDecision,      setExpDecision]      = useState("Approve Full");
  const [expPartialAmt,    setExpPartialAmt]    = useState("");
  const [expNotes,         setExpNotes]         = useState("");
  const [resolvedEsc,      setResolvedEsc]      = useState(new Set());
  const [resolvedExp,      setResolvedExp]      = useState(new Set());

  const pendingEsc = escalations.filter(e=>!resolvedEsc.has(e.id)).length;
  const pendingExp = expenses.filter(e=>!resolvedExp.has(e.id)).length;
  const weeklyTotal= expenses.reduce((s,e)=>s+e.amount,0);

  const resolveEscalation = (id) => { setResolvedEsc(p=>new Set([...p,id])); setEscNotes(""); setEscDecision(""); };
  const resolveExpense    = (id) => { setResolvedExp(p=>new Set([...p,id])); setExpNotes(""); setExpDecision("Approve Full"); setExpPartialAmt(""); };

  const VM_NAV = [
    { label:"Dashboard",         d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { label:"Escalation Queue",  d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" },
    { label:"Expense Approval",  d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11v-2h2v2zm0-4H11V7h2v5z" },
    { label:"VA Registry",       d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { label:"Settings",          d:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
  ];

  const renderContent = () => {

    // ── VM-01: Manager Dashboard ────────────────────────────────────────────
    if (activeNav === "Dashboard") return <VMDashboard pendingEsc={pendingEsc} setActiveNav={setActiveNav}/>;

    // ── VM-02: Escalation Queue ─────────────────────────────────────────────
    if (activeNav === "Escalation Queue") {
      return <VMEscalationQueue escalations={escalations} selectedEsc={selectedEsc} setSelectedEsc={setSelectedEsc} escDecision={escDecision} setEscDecision={setEscDecision} escNotes={escNotes} setEscNotes={setEscNotes} resolvedEsc={resolvedEsc} resolveEscalation={resolveEscalation} pendingEsc={pendingEsc} setActiveNav={setActiveNav}/>;
    }

    // ── VM-03: Expense Approval ─────────────────────────────────────────────
    if (activeNav === "Expense Approval") {
      return <VMExpenseApproval expenses={expenses} selectedExp={selectedExp} setSelectedExp={setSelectedExp} expDecision={expDecision} setExpDecision={setExpDecision} expPartialAmt={expPartialAmt} setExpPartialAmt={setExpPartialAmt} expNotes={expNotes} setExpNotes={setExpNotes} resolvedExp={resolvedExp} setResolvedExp={setResolvedExp} resolveExpense={resolveExpense} pendingExp={pendingExp} weeklyTotal={weeklyTotal} setActiveNav={setActiveNav}/>;
    }

    if (activeNav === "VA Registry") return <VMVARegistry/>;
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#9ca3af",fontSize:15}}>{activeNav}{" — coming soon"}</div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      <Topbar user={user} activeProfile={activeProfile} onSwitchProfile={onSwitchProfile} onToggleSidebar={()=>setSidebarOpen(p=>!p)}/>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {sidebarOpen && (
          <div className="vp-sidebar vp-sidebar-open" style={{width:240,background:"white",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
            <div style={{padding:"16px 12px 8px"}}>
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 12px"}}>
                <p style={{margin:0,fontSize:11,fontWeight:600,color:"#b91c1c",letterSpacing:.5,marginBottom:2}}>CURRENT ROLE</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{activeProfile.role}</p>
              </div>
            </div>
            <nav style={{padding:"4px 8px",flex:1}}>
              {VM_NAV.map(item=>(
                <button key={item.label} onClick={()=>setActiveNav(item.label)}
                  style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:activeNav===item.label?600:400,
                    background:activeNav===item.label?"#b91c1c":"transparent",
                    color:activeNav===item.label?"white":"#374151",marginBottom:2,textAlign:"left"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d={item.d}/></svg>
                  {item.label}
                  {item.label==="Escalation Queue" && pendingEsc>0 && (
                    <span style={{marginLeft:"auto",background:"#b91c1c",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:activeNav===item.label?0.8:1}}>{pendingEsc}</span>
                  )}
                  {item.label==="Expense Approval" && pendingExp>0 && (
                    <span style={{marginLeft:"auto",background:"#d97706",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:activeNav===item.label?0.8:1}}>{pendingExp}</span>
                  )}
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
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export { VMShell };
export default VMShell;
