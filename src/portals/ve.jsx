import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

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

  const OutcomeBadge = ({o}) => {
    const cfg = {Verified:{bg:"#dcfce7",c:"#15803d"},Discrepancy:{bg:"#fef3c7",c:"#b45309"},"Not Verified":{bg:"#fee2e2",c:"#b91c1c"},Inconclusive:{bg:"#f3f4f6",c:"#6b7280"}};
    const s = cfg[o]||cfg.Inconclusive;
    return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:s.bg,color:s.c}}>{o}</span>;
  };
  const StatusBadge = ({s}) => {
    const cfg = {Review:{bg:"#eff6ff",c:"#3b82f6",label:"○ Review"},Approved:{bg:"#dcfce7",c:"#15803d",label:"✓ Approved"},Returned:{bg:"#fef3c7",c:"#b45309",label:"↩ Returned"},Flagged:{bg:"#fee2e2",c:"#b91c1c",label:"⚠ Flagged"}};
    const d = cfg[s]||cfg.Review;
    return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:d.bg,color:d.c}}>{d.label}</span>;
  };

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
      const filteredTasks = batchTasks;
      const task = selectedTask ? batchTasks.find(t=>t.id===selectedTask) : batchTasks[0];

      return (
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {/* Back + batch header */}
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <button onClick={()=>{setActiveBatch(null);setSelectedTask(null);}}
              style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:14,fontWeight:500,padding:0}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Batch Review Queue
            </button>
          </div>

          <div style={{marginBottom:20}}>
            <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{activeBatch.client} — {activeBatch.batch}</h1>
            <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{activeBatch.tasks} tasks · Completed: {activeBatch.completed} · CE: Sarah Adeniyi</p>
          </div>

          {/* VE-02 summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
            {[
              {label:"TO REVIEW",  val:toReview,  c:"#3b82f6"},
              {label:"APPROVED",   val:approved,  c:"#16a34a"},
              {label:"RETURNED",   val:returned,  c:"#d97706"},
              {label:"FLAGGED",    val:flagged,   c:"#b91c1c"},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"16px 20px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:0,fontSize:28,fontWeight:700,color:s.c}}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Task list */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#f9fafb"}}>
                {["#","CANDIDATE","SERVICE","OUTCOME","EVIDENCE","STATUS"].map(h=>(
                  <th key={h} style={{padding:"11px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredTasks.map((t,i)=>(
                  <tr key={t.id} onClick={()=>setSelectedTask(t.id)}
                    style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:selectedTask===t.id?"#fef2f2":"white"}}
                    onMouseEnter={e=>{if(selectedTask!==t.id)e.currentTarget.style.background="#fafafa";}}
                    onMouseLeave={e=>{if(selectedTask!==t.id)e.currentTarget.style.background="white";}}>
                    <td style={{padding:"12px 16px",fontSize:13,color:"#6b7280"}}>{i+1}</td>
                    <td style={{padding:"12px 16px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.candidate}</td>
                    <td style={{padding:"12px 16px",fontSize:13,color:"#374151"}}>{t.service}</td>
                    <td style={{padding:"12px 16px"}}><OutcomeBadge o={t.outcome}/></td>
                    <td style={{padding:"12px 16px",fontSize:13,color:"#6b7280"}}>{t.evidence} files</td>
                    <td style={{padding:"12px 16px"}}><StatusBadge s={t.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Task detail panel */}
          {task && (
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
              <div style={{background:"#f9fafb",padding:"14px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <p style={{margin:"0 0 2px",fontSize:16,fontWeight:700,color:"#111827"}}>{task.candidate} — {task.service}</p>
                  <p style={{margin:0,fontSize:13,color:"#6b7280"}}>VO: {task.vo} · Completed: {task.date} · Mode: {task.mode}</p>
                </div>
                <div style={{display:"flex",gap:8}}>
                  {task.status==="Review" && (<>
                    <button onClick={()=>approveTask(task.id)} style={{padding:"8px 16px",border:"none",borderRadius:7,background:"#15803d",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>Approve</button>
                    <button onClick={()=>setReturnModal(task)} style={{padding:"8px 16px",border:"1.5px solid #d1d5db",borderRadius:7,background:"white",color:"#374151",fontWeight:500,fontSize:13,cursor:"pointer"}}>Return</button>
                    <button onClick={()=>setFlagModal(task)} style={{padding:"8px 16px",border:"1.5px solid #fecaca",borderRadius:7,background:"#fef2f2",color:"#b91c1c",fontWeight:500,fontSize:13,cursor:"pointer"}}>Flag</button>
                  </>)}
                  {task.status!=="Review" && <StatusBadge s={task.status}/>}
                </div>
              </div>
              <div style={{padding:"20px 24px"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                    <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>CANDIDATE DATA</p>
                    {task.employer!=="—" && <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Employer:</span> {task.employer}</p>}
                    {task.title!=="—"    && <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Title:</span> {task.title}</p>}
                    {task.period!=="—"   && <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Period:</span> {task.period}</p>}
                    {task.hrEmail!=="—"  && <p style={{margin:0,fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>HR Email:</span> {task.hrEmail}</p>}
                    {task.employer==="—" && <p style={{margin:0,fontSize:13,color:"#9ca3af",fontStyle:"italic"}}>No candidate data for this service type</p>}
                  </div>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                    <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VERIFICATION RESULT</p>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151",display:"flex",alignItems:"center",gap:6}}><span style={{color:"#6b7280"}}>Outcome:</span> <OutcomeBadge o={task.outcome}/></p>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>External Party:</span> {task.extParty}</p>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Response:</span> {task.response}</p>
                    <p style={{margin:0,fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Response Date:</span> {task.date}</p>
                  </div>
                </div>

                <div style={{marginBottom:16}}>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>EVIDENCE FILES</p>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                    {Array.from({length:task.evidence},(_,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<task.evidence-1?"1px solid #e5e7eb":"none"}}>
                        <span style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#374151"}}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                          {["HR_Response_SecureLink.pdf","Email_Thread_Screenshot.png","Employment_Letter_Scan.pdf","Supporting_Doc.pdf","Additional_Evidence.jpg","Final_Confirmation.pdf"][i]}
                        </span>
                        <button style={{background:"none",border:"1px solid #d1d5db",borderRadius:5,padding:"3px 10px",fontSize:12,color:"#374151",cursor:"pointer"}}>View</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VO NOTES</p>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                    <p style={{margin:0,fontSize:13,color:"#374151",lineHeight:1.6}}>{task.voNotes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Finish batch bar */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{toReview > 0 ? `${toReview} task${toReview>1?"s":""} remaining to review` : "All tasks reviewed — batch ready to finish"}</p>
            <div style={{display:"flex",gap:10}}>
              {toReview > 0 && (
                <button onClick={approveAll} style={{padding:"9px 16px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer"}}>Approve All Remaining</button>
              )}
              <button onClick={()=>setActiveBatch(null)} disabled={!canFinish}
                style={{padding:"9px 20px",border:"none",borderRadius:8,background:canFinish?"#b91c1c":"#d1d5db",color:"white",fontSize:13,fontWeight:600,cursor:canFinish?"pointer":"not-allowed"}}>
                Finish Batch
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ── VE-01: Batch Review Queue ─────────────────────────────────────────────
    if (activeNav === "Batch Review") {
      const pendingReview = 12;
      const reviewedToday = 8;
      const returnedCount = 1;
      return (
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>Batch Review Queue</h1>
            <span style={{fontSize:14,color:"#6b7280"}}>Thursday, Feb 6</span>
          </div>

          {/* Summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
            {[
              {label:"PENDING REVIEW",  val:pendingReview, c:"#b91c1c",   sub:null},
              {label:"REVIEWED TODAY",  val:reviewedToday, c:"#15803d",   sub:null},
              {label:"RETURNED",        val:returnedCount, c:"#d97706",   sub:"needs rework"},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:"0 0 4px",fontSize:30,fontWeight:700,color:s.c}}>{s.val}</p>
                {s.sub && <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{s.sub}</p>}
              </div>
            ))}
          </div>

          {/* Search / filter row */}
          <div style={{display:"flex",gap:12,marginBottom:16}}>
            <div style={{flex:1,position:"relative"}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search clients or batches..."
                style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"9px 14px",fontSize:13,color:"#374151",cursor:"pointer",background:"white",minWidth:130,justifyContent:"space-between"}}>
              All Clients <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"9px 14px",fontSize:13,color:"#374151",cursor:"pointer",background:"white",minWidth:140,justifyContent:"space-between"}}>
              Oldest First <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>

          {/* Batch table */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:12}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#f9fafb"}}>
                {["CLIENT","BATCH","TASKS","COMPLETED","AGE",""].map(h=>(
                  <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredBatches.map((b,i)=>(
                  <tr key={b.id} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <td style={{padding:"14px 20px",fontSize:14,color:"#111827",fontWeight:500}}>
                      {b.warning && <span style={{marginRight:6,color:"#d97706"}}>⚠</span>}
                      {b.client}
                    </td>
                    <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.batch}</td>
                    <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.tasks}</td>
                    <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.completed}</td>
                    <td style={{padding:"14px 20px",fontSize:13}}>
                      <span style={{color:b.age>=3?"#b91c1c":b.age>=2?"#d97706":"#374151",fontWeight:b.age>=3?600:400}}>{b.age}d{b.age>=3?" ⚠":""}</span>
                    </td>
                    <td style={{padding:"14px 20px"}}>
                      <button onClick={()=>{setActiveBatch(b);setSelectedTask(VE_TASKS_BASE[0].id);}}
                        style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",border:"none",borderRadius:7,background:"#b91c1c",color:"white",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                        Review →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBatches.some(b=>b.age>=3) && (
            <p style={{fontSize:13,color:"#d97706",margin:"0 0 8px",display:"flex",alignItems:"center",gap:6}}>⚠ Batches older than 3 days need priority attention</p>
          )}
          <p style={{fontSize:13,color:"#9ca3af",margin:0}}>Showing {filteredBatches.length} of {batches.length} batches pending review</p>
        </div>
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
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{background:"white",borderRadius:14,padding:"28px 32px",width:"90%",maxWidth:520,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            <h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Return to VO</h3>
            <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Task: {returnModal.candidate} — {returnModal.service} · VO: {returnModal.vo}</p>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Reason</label>
              <div style={{position:"relative"}}>
                <select value={returnReason} onChange={e=>setReturnReason(e.target.value)}
                  style={{width:"100%",padding:"10px 36px 10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,color:"#374151",background:"white",outline:"none",appearance:"none"}}>
                  {["Evidence incomplete","Evidence unclear/illegible","Notes insufficient","Data mismatch","Other"].map(r=><option key={r}>{r}</option>)}
                </select>
                <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280",fontSize:11}}>▾</span>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Feedback to VO</label>
              <textarea value={returnNotes} onChange={e=>setReturnNotes(e.target.value)} rows={4} placeholder="Describe what needs to be corrected..."
                style={{width:"100%",padding:"10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",color:"#374151"}}/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setReturnModal(null)} style={{padding:"9px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>returnTask(returnModal.id)} style={{padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>Return to VO</button>
            </div>
          </div>
        </div>
      )}

      {/* Flag (Escalate) Modal */}
      {flagModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{background:"white",borderRadius:14,padding:"28px 32px",width:"90%",maxWidth:520,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            <h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Escalate to Manager</h3>
            <p style={{margin:"0 0 4px",fontSize:14,color:"#6b7280"}}>Task: {flagModal.candidate} — {flagModal.service}</p>
            <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Outcome: <span style={{color:"#b45309",fontWeight:500}}>{flagModal.outcome}</span></p>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Escalation Reason</label>
              <div style={{position:"relative"}}>
                <select value={flagReason} onChange={e=>setFlagReason(e.target.value)}
                  style={{width:"100%",padding:"10px 36px 10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,color:"#374151",background:"white",outline:"none",appearance:"none"}}>
                  {["Discrepancy dispute","Suspected fraud","Client complaint","Policy exception needed","Other"].map(r=><option key={r}>{r}</option>)}
                </select>
                <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280",fontSize:11}}>▾</span>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Details for Manager</label>
              <textarea value={flagNotes} onChange={e=>setFlagNotes(e.target.value)} rows={4} placeholder="Explain the situation..."
                style={{width:"100%",padding:"10px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",color:"#374151"}}/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setFlagModal(null)} style={{padding:"9px 18px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>flagTask(flagModal.id)} style={{padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>Escalate to VM</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════════════════
// VERIFICATION MANAGER (VM) SHELL — VM-01 + VM-02 + VM-03
// ════════════════════════════════════════════════════════════════════════════════

const VM_ESCALATIONS = [
  { id:1, type:"Discrepancy",  label:"Discrepancy",  item:"Chidi Nwosu - Employment",      escalatedBy:"Fatima (VE)", age:"2h",  candidate:"Chidi Nwosu",  service:"Employment Reference", veNotes:"Employer says employment ended March 2024. Candidate claimed December 2024. 9-month discrepancy. Client may want to discuss before we finalize the report.", employer:"First Bank", title:"Branch Manager", candidatePeriod:"Jan 2020–Dec 2024", hrPeriod:"Jan 2020–Mar 2024", outcome:"Discrepancy" },
  { id:2, type:"Client Issue",  label:"Client Issue", item:"GTBank batch - complaint",      escalatedBy:"Sarah (CE)", age:"4h",  candidate:"GTBank Batch",  service:"—",                    veNotes:"Client raised concern about report format and missing addendum.",                                                                                          employer:"—", title:"—", candidatePeriod:"—", hrPeriod:"—", outcome:"Client Complaint" },
  { id:3, type:"SLA Breach",   label:"SLA Breach",   item:"Shell batch - 3 tasks late",     escalatedBy:"System",     age:"2d",  candidate:"Shell Batch",   service:"Multiple",             veNotes:"3 tasks have exceeded SLA by >2 days. Auto-escalated for manager action.",                                                                               employer:"—", title:"—", candidatePeriod:"—", hrPeriod:"—", outcome:"SLA Breach" },
  { id:4, type:"Fraud Suspect",label:"Fraud Suspect",item:"Emeka Udo - WAEC certificate",   escalatedBy:"Fatima (VE)", age:"3d",  candidate:"Emeka Udo",     service:"WAEC Verification",    veNotes:"WAEC certificate appears to have been altered. Serial number does not match official records.",                                                          employer:"WAEC", title:"—", candidatePeriod:"2003/2004", hrPeriod:"Not found", outcome:"Suspected Fraud" },
];

const VM_EXPENSES = [
  { id:1, agent:"Tunde Bakare",    task:"Ada Okonkwo - Address",    amount:12500, submitted:"Feb 5", location:"Ikeja, Lagos",     taskId:"#45221", taskOutcome:"Verified", evidenceCount:6, items:[{label:"Transportation",amt:5000,receipt:true},{label:"Site access fee",amt:3500,receipt:true},{label:"Neighbor attestation",amt:2000,receipt:true},{label:"Communication (calls)",amt:2000,receipt:false}], agentNotes:"Address was in gated estate, had to pay ₦3,500 to security for entry. Neighbor required small gift before agreeing to attestation." },
  { id:2, agent:"Amina Yusuf",     task:"Chidi Nwosu - Address",    amount:8000,  submitted:"Feb 5", location:"Yaba, Lagos",       taskId:"#45198", taskOutcome:"Verified", evidenceCount:5, items:[{label:"Transportation",amt:4500,receipt:true},{label:"Communication",amt:2000,receipt:true},{label:"Printing",amt:1500,receipt:false}],                                                                          agentNotes:"Subject confirmed at address. Had to revisit twice as subject was not available first visit." },
  { id:3, agent:"Chidi Nwankwo",   task:"Emeka Udo - Guarantor",    amount:6500,  submitted:"Feb 4", location:"Surulere, Lagos",   taskId:"#45210", taskOutcome:"Verified", evidenceCount:4, items:[{label:"Transportation",amt:4000,receipt:true},{label:"Communication",amt:2500,receipt:true}],                                                                                                                   agentNotes:"Guarantor confirmed all details in person." },
  { id:4, agent:"Olu Adeyinka",    task:"Fatima Sule - Address",    amount:15000, submitted:"Feb 4", location:"Victoria Island",   taskId:"#45215", taskOutcome:"Verified", evidenceCount:7, items:[{label:"Transportation",amt:8000,receipt:true},{label:"Site access fee",amt:5000,receipt:true},{label:"Communication",amt:2000,receipt:false}],                                                                    agentNotes:"VI address required vehicle access fee for estate." },
  { id:5, agent:"Blessing Okafor", task:"Helen Obi - Employment",   amount:9500,  submitted:"Feb 3", location:"Apapa, Lagos",      taskId:"#45188", taskOutcome:"Verified", evidenceCount:3, items:[{label:"Transportation",amt:7000,receipt:true},{label:"Communication",amt:2500,receipt:false}],                                                                                                                   agentNotes:"Employer located in port area, high transportation cost." },
  { id:6, agent:"Tunde Bakare",    task:"Janet Musa - Address",     amount:7000,  submitted:"Feb 3", location:"Gbagada, Lagos",    taskId:"#45179", taskOutcome:"Verified", evidenceCount:4, items:[{label:"Transportation",amt:5000,receipt:true},{label:"Communication",amt:2000,receipt:false}],                                                                                                                   agentNotes:"Standard address verification." },
];


export { VEShell };
