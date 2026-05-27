import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../../data/index.js";
import { Topbar } from "../../components/Topbar.jsx";
import { Breadcrumb } from "../../components/Breadcrumb.jsx";
import { VE_BATCHES, VE_TASKS_BASE } from "./data.js";
import BatchReviewQueue from "./screens/BatchReviewQueue.jsx";
import BatchEvidenceReview from "./screens/BatchEvidenceReview.jsx";
import ReturnModal from "./components/ReturnModal.jsx";
import FlagModal from "./components/FlagModal.jsx";

function VEShell({ user, activeProfile, onSwitchProfile, onSignOut }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav,   setActiveNav]   = useState("Batch Review");
  const [batches,     setBatches]     = useState(VE_BATCHES);
  const [tasks,       setTasks]       = useState(VE_TASKS_BASE.map(t=>({...t})));
  const [search,      setSearch]      = useState("");
  const [activeBatch, setActiveBatch] = useState(null); // which batch is open in VE-02
  const [selectedTask,setSelectedTask]= useState(null);
  const [returnModal, setReturnModal] = useState(null);
  const [flagModal,   setFlagModal]   = useState(null);
  const [returnReason,setReturnReason]= useState("Evidence incomplete");
  const [returnNotes, setReturnNotes] = useState("");
  const [flagReason,  setFlagReason]  = useState("Discrepancy dispute");
  const [flagNotes,   setFlagNotes]   = useState("");

  const batchTasks = tasks; // in real app, filter by activeBatch.id

  const approveTask = (id) => setTasks(p=>p.map(t=>t.id===id?{...t,status:"Approved"}:t));
  const returnTask  = (id) => { setTasks(p=>p.map(t=>t.id===id?{...t,status:"Returned"}:t)); setReturnModal(null); setReturnNotes(""); };
  const flagTask    = (id) => { setTasks(p=>p.map(t=>t.id===id?{...t,status:"Flagged"}:t));  setFlagModal(null);   setFlagNotes("");   };
  const approveAll  = ()   => setTasks(p=>p.map(t=>t.status==="Review"?{...t,status:"Approved"}:t));

  const toReview  = batchTasks.filter(t=>t.status==="Review").length;
  const approved  = batchTasks.filter(t=>t.status==="Approved").length;
  const returned  = batchTasks.filter(t=>t.status==="Returned").length;
  const flagged   = batchTasks.filter(t=>t.status==="Flagged").length;
  const canFinish = toReview === 0;

  const VE_NAV = [
    { label:"Batch Review",  d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label:"Done Batches",  d:"M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { label:"Settings",      d:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
  ];

  const filteredBatches = batches.filter(b =>
    b.client.toLowerCase().includes(search.toLowerCase()) ||
    b.batch.toLowerCase().includes(search.toLowerCase())
  );

  const renderContent = () => {
    // ── VE-02: Batch Evidence Review ─────────────────────────────────────────
    if (activeBatch) {
      return (
        <BatchEvidenceReview
          activeBatch={activeBatch}
          setActiveBatch={setActiveBatch}
          batchTasks={batchTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          toReview={toReview}
          approved={approved}
          returned={returned}
          flagged={flagged}
          canFinish={canFinish}
          approveTask={approveTask}
          setReturnModal={setReturnModal}
          setFlagModal={setFlagModal}
          approveAll={approveAll}
        />
      );
    }

    // ── VE-01: Batch Review Queue ─────────────────────────────────────────────
    if (activeNav === "Batch Review") {
      return (
        <BatchReviewQueue
          search={search}
          setSearch={setSearch}
          filteredBatches={filteredBatches}
          batches={batches}
          setActiveBatch={setActiveBatch}
          setSelectedTask={setSelectedTask}
        />
      );
    }

    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#9ca3af",fontSize:15}}>{activeNav} — coming soon</div>
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
              {VE_NAV.map(item=>(
                <button key={item.label} onClick={()=>{setActiveNav(item.label);setActiveBatch(null);}}
                  style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:activeNav===item.label?600:400,background:activeNav===item.label?"#b91c1c":"transparent",color:activeNav===item.label?"white":"#374151",marginBottom:2,textAlign:"left"}}>
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
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
          {renderContent()}
        </div>
      </div>

      {/* Return to VO Modal */}
      {returnModal && (
        <ReturnModal
          returnModal={returnModal}
          setReturnModal={setReturnModal}
          returnReason={returnReason}
          setReturnReason={setReturnReason}
          returnNotes={returnNotes}
          setReturnNotes={setReturnNotes}
          returnTask={returnTask}
        />
      )}

      {/* Flag (Escalate) Modal */}
      {flagModal && (
        <FlagModal
          flagModal={flagModal}
          setFlagModal={setFlagModal}
          flagReason={flagReason}
          setFlagReason={setFlagReason}
          flagNotes={flagNotes}
          setFlagNotes={setFlagNotes}
          flagTask={flagTask}
        />
      )}
    </div>
  );
}

export { VEShell };
export default VEShell;
