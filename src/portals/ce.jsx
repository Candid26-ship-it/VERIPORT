import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

// ─── CE Batch Detail Views ────────────────────────────────────────────────────
function DraftDetail({ batch, onBack }) {
  const candidates = batch.tasks || 48;
  const services = 8;
  const totalTasks = candidates * services;
  const ninStatus = { pending: 12, awaiting: 30, verified: 6, failed: 0 };
  const Lbl = ({children}) => <p style={{margin:"0 0 2px",fontSize:12,color:"#9ca3af"}}>{children}</p>;
  const Val = ({children,bold}) => <p style={{margin:0,fontSize:15,fontWeight:bold?700:500,color:"#111827"}}>{children}</p>;
  const NinRow = ({label,count,note,color}) => (
    <div style={{display:"flex",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #f3f4f6"}}>
      <span style={{flex:1,fontSize:14,color:"#374151"}}>{label}</span>
      <span style={{fontWeight:600,fontSize:15,color:color||"#111827",width:40,textAlign:"right"}}>{count}</span>
      {note && <span style={{fontSize:13,color:"#9ca3af",marginLeft:32,width:140,textAlign:"right"}}>{note}</span>}
    </div>
  );
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Ce","Batches",batch.batch,"Draft"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:16,padding:0}}>
        <ChevronLeft/> Back to Draft
      </button>
      <h1 style={{margin:"0 0 20px",fontSize:26,fontWeight:700,color:"#111827"}}>{batch.batch}</h1>

      {/* Info card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,paddingBottom:20,borderBottom:"1px solid #f3f4f6",marginBottom:20}}>
          <div><Lbl>Client</Lbl><Val bold>{batch.client}</Val></div>
          <div><Lbl>Created</Lbl><Val bold>Jan 22, 2026</Val></div>
        </div>
        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="18" height="18"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
              <span style={{fontSize:13,color:"#6b7280"}}>Candidates</span>
            </div>
            <p style={{margin:"0 0 4px",fontSize:32,fontWeight:700,color:"#111827"}}>{candidates}</p>
            <button style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,cursor:"pointer",padding:0,fontWeight:500}}>View Candidates</button>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="18" height="18"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              <span style={{fontSize:13,color:"#6b7280"}}>Services</span>
            </div>
            <p style={{margin:0,fontSize:32,fontWeight:700,color:"#111827"}}>{services}</p>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="18" height="18"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              <span style={{fontSize:13,color:"#6b7280"}}>Total Tasks</span>
            </div>
            <p style={{margin:0,fontSize:32,fontWeight:700,color:"#111827"}}>{totalTasks} tasks</p>
          </div>
        </div>
      </div>

      {/* NIN Verification Status */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 12px",fontWeight:600,fontSize:15,color:"#111827"}}>NIN Verification Status</p>
        <NinRow label="Pending"  count={ninStatus.pending}  note="Links not sent"/>
        <NinRow label="Awaiting" count={ninStatus.awaiting} note="Sent, waiting"/>
        <NinRow label="Verified" count={ninStatus.verified} note="Ready" color="#16a34a"/>
        <NinRow label="Failed"   count={ninStatus.failed}/>
      </div>

      {/* Info banner */}
      <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" width="16" height="16" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <span style={{fontSize:13,color:"#1e40af"}}>All candidate data uploaded. Send NIN+Consent links to start collection. Batch moves to Collection stage.</span>
      </div>

      {/* CTAs */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
        <button style={{padding:"11px 22px",border:"1.5px solid #fca5a5",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#b91c1c",cursor:"pointer"}}>Delete Batch</button>
        <button style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Send Links</button>
      </div>
    </div>
  );
}

function CollectionDetail({ batch, onBack }) {
  const parts = (batch.received||"32 / 48").split("/");
  const recv = parseInt(parts[0].trim());
  const total = parseInt(parts[1].trim());
  const pct = Math.round((recv/total)*100);
  const daysLeft = typeof batch.days === "string" ? parseInt(batch.days.split("/")[0]) : 5;

  const SBRow = ({icon, label, note, count, color}) => (
    <div style={{display:"flex",alignItems:"center",padding:"13px 0",borderBottom:"1px solid #f3f4f6"}}>
      <div style={{width:22,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,flexShrink:0}}>
        {icon}
      </div>
      <span style={{flex:1,fontSize:14,color:"#374151"}}>{label}</span>
      {note && <span style={{fontSize:13,color:"#9ca3af",marginRight:24}}>{note}</span>}
      <span style={{fontWeight:600,fontSize:14,color:color||"#111827",minWidth:24,textAlign:"right"}}>{count}</span>
    </div>
  );
  const TRow = ({label,value,bold}) => (
    <div style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid #f3f4f6"}}>
      <span style={{fontSize:14,color:"#6b7280"}}>{label}</span>
      <span style={{fontSize:14,fontWeight:bold?600:400,color:"#111827"}}>{value}</span>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Ce","Batches",batch.batch,"Collection"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:16,padding:0}}>
        <ChevronLeft/> Back to Collection
      </button>

      {/* Header card: client + title + stat cards + CTAs */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontSize:12,fontWeight:600,color:"#374151",letterSpacing:.5}}>{batch.client.toUpperCase()}</p>
        <h1 style={{margin:"0 0 20px",fontSize:24,fontWeight:700,color:"#111827"}}>{batch.batch}</h1>

        {/* 3 stat cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20}}>
          <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 20px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>CANDIDATES</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:"#111827"}}>{total}</p>
          </div>
          <div style={{border:"1px solid #bbf7d0",borderRadius:10,padding:"16px 20px",background:"#f0fdf4"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#16a34a",letterSpacing:.5}}>NIN VERIFIED</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:"#16a34a"}}>{recv}/{total}</p>
          </div>
          <div style={{border:"1px solid #fde68a",borderRadius:10,padding:"16px 20px",background:"#fffbeb"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#d97706",letterSpacing:.5}}>DAYS LEFT</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:"#d97706"}}>{daysLeft}</p>
          </div>
        </div>

        {/* CTAs — at top as requested */}
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>View Candidates</button>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>Add Candidates</button>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>Send Reminder</button>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>Extend Deadline</button>
          <button style={{flex:"0 0 auto",padding:"11px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:13,fontWeight:600,color:"white",cursor:"pointer"}}>Close Collection</button>
        </div>
      </div>

      {/* Collection Progress */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 12px",fontWeight:600,fontSize:15,color:"#111827"}}>Collection Progress</p>
        <p style={{margin:"0 0 8px",fontSize:14,color:"#374151"}}>{recv}/{total} ({pct}%)</p>
        <div style={{background:"#f3f4f6",borderRadius:8,height:12,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:"#16a34a",borderRadius:8,transition:"width .3s"}}/>
        </div>
      </div>

      {/* Gates */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:600,fontSize:15,color:"#111827"}}>Gates</p>
        <SBRow label="Submitted"      count={6}  icon={<div style={{width:8,height:8,borderRadius:"50%",background:"#e5e7eb"}}/>}/>
        <SBRow label="Pre-Screen (0 review)" count={0} color="#3b82f6"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>}/>
        <SBRow label="Ready for Active" count={15} icon={<div style={{width:8,height:8,borderRadius:"50%",background:"#e5e7eb"}}/>}/>
      </div>

      {/* Status Breakdown */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:600,fontSize:15,color:"#111827"}}>Status Breakdown</p>
        <SBRow label="Collected"          count={15} color="#16a34a"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10" stroke="#16a34a"/><path d="M9 12l2 2 4-4"/></svg>}/>
        <SBRow label="Awaiting NIN"       count={6}  icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Awaiting delivery"  count={6}  icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Delivered"          count={6}  note="Email delivered, not opened"
          icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Opened"             count={6}  note="Opened email, no action yet"
          icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Engaged"            count={6}  note="Started form, not complete"
          icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Bounced"            count={1}  note="Email could not be delivered" color="#d97706"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>}/>
        <SBRow label="Expired"            count={1}  note="Link expired before completion" color="#d97706"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>}/>
        <SBRow label="Failed"             count={1}  note="NIN verification failed" color="#dc2626"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg>}/>
        <div style={{display:"flex",justifyContent:"space-between",padding:"13px 0 0"}}>
          <span style={{fontSize:14,fontWeight:600,color:"#374151"}}>Total</span>
          <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{total}</span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:600,fontSize:15,color:"#111827"}}>Timeline</p>
        <TRow label="Links Sent"          value="Jan 15, 2024 10:00 AM"/>
        <TRow label="Submission Deadline" value="Feb 6, 2024 (5 days left)" bold/>
        <TRow label="Link Expiry"         value="Feb 13, 2024"/>
        <TRow label="Next Reminder"       value="Tomorrow (Day 4)" bold/>
      </div>

      {/* Tasks */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <TRow label="Tasks"  value={`384 tasks (${total} candidates)`}/>
      </div>

      {/* Attention banner */}
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"14px 18px",marginBottom:32,display:"flex",alignItems:"flex-start",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" width="16" height="16" style={{flexShrink:0,marginTop:2}}><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        <span style={{fontSize:13,color:"#92400e"}}><strong>2 candidates need attention:</strong> 1 expired + 1 bounced. CE should click [View Candidates] and filter by status to address these issues.</span>
      </div>
    </div>
  );
}

function ActiveDetail({ batch, onBack }) {
  const title = batch.batch || "Acme Q4 New Hires - Batch 1";
  const client = batch.client || "Acme Corporation Limited";
  const candidates = 40;
  const services = 8;
  const totalTasks = candidates * services;
  const completedTasks = 142;
  const pendingTasks = totalTasks - completedTasks;
  const pct = Math.round((completedTasks / totalTasks) * 100);

  const SERVICE_PROGRESS = [
    { name: "NIN Verification",                  complete: 40, total: 40 },
    { name: "Pre-screening",                     complete: 40, total: 40 },
    { name: "Employment History Verification",   complete: 28, total: 40 },
    { name: "Education Verification",            complete: 35, total: 40 },
    { name: "Criminal Record Check",             complete: 22, total: 40 },
    { name: "Professional License Verification", complete: 10, total: 40 },
    { name: "Address Verification",              complete: 2,  total: 40 },
    { name: "Reference Check",                   complete: 5,  total: 40 },
  ];

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Ce","Batches","Active"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Active
      </button>

      {/* Header card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:16}}>
        <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#111827"}}>{title}</h1>
        <p style={{margin:"0 0 20px",fontSize:13,fontWeight:600,color:"#6b7280",letterSpacing:.5,textTransform:"uppercase"}}>{client}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,borderTop:"1px solid #f3f4f6",paddingTop:20}}>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#9ca3af"}}>Total Tasks</p>
            <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{totalTasks} tasks ({candidates} candidates)</p>
          </div>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#9ca3af"}}>Days Active</p>
            <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{batch.days || 508} days</p>
          </div>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#9ca3af"}}>Status</p>
            <span style={{display:"inline-block",padding:"4px 12px",background:"#eff6ff",color:"#3b82f6",borderRadius:20,fontSize:12,fontWeight:500,border:"1px solid #bfdbfe"}}>Verifying</span>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 32px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <p style={{margin:0,fontWeight:700,fontSize:16,color:"#111827"}}>Overall Progress</p>
          <span style={{fontSize:22,fontWeight:700,color:"#111827"}}>{pct}%</span>
        </div>
        <div style={{background:"#e5e7eb",borderRadius:8,height:12,overflow:"hidden",marginBottom:10}}>
          <div style={{height:"100%",width:`${pct}%`,background:"#16a34a",borderRadius:8,transition:"width .3s"}}/>
        </div>
        <div style={{display:"flex",gap:24}}>
          <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✓ {completedTasks} tasks completed</span>
          <span style={{fontSize:13,color:"#d97706",fontWeight:500}}>⏳ {pendingTasks} tasks pending</span>
        </div>
      </div>

      {/* Service Breakdown */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:32}}>
        <div style={{padding:"20px 32px",borderBottom:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontWeight:700,fontSize:16,color:"#111827"}}>Service Breakdown</p>
          <p style={{margin:"4px 0 0",fontSize:13,color:"#9ca3af"}}>Verification progress per service</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Service","Progress","Complete","Pending"].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {SERVICE_PROGRESS.map((s,i)=>{
              const sp = Math.round((s.complete/s.total)*100);
              const pending = s.total - s.complete;
              return (
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#111827",fontWeight:500}}>{s.name}</td>
                  <td style={{padding:"16px 20px",minWidth:160}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{flex:1,background:"#e5e7eb",borderRadius:4,height:8,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${sp}%`,background:sp===100?"#16a34a":"#3b82f6",borderRadius:4}}/>
                      </div>
                      <span style={{fontSize:12,color:"#6b7280",width:32,textAlign:"right"}}>{sp}%</span>
                    </div>
                  </td>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#16a34a",fontWeight:600}}>{s.complete}</td>
                  <td style={{padding:"16px 20px",fontSize:14,color:pending>0?"#d97706":"#16a34a",fontWeight:600}}>{pending}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function CompleteDetail({ batch, onBack }) {
  const [showReturns, setShowReturns] = useState(false);
  const [showReleaseSummaryModal, setShowReleaseSummaryModal] = useState(false);
  const [releaseCandidate, setReleaseCandidate] = useState(null);
  const [benchFilter, setBenchFilter] = useState("All");
  const [logFilter, setLogFilter] = useState("Task Completed");

  const title = batch.batch || "Acme Q4 New Hires - Batch 1";
  const client = batch.client || "Acme Corporation Limited";
  const candidates = 25; const services = 8;
  const totalTasks = candidates * services;
  const completed = 142; const pending = totalTasks - completed;
  const pct = Math.round((completed / totalTasks) * 100);

  const BENCH_CANDIDATES = [
    {name:"Chinyere Okafor",  email:"c.okafor@example.com",   services:"8/8", outcome:"All Pass",      outColor:"#16a34a", sla:"Within SLA", slaOver:false, status:"Ready"},
    {name:"Adebayo Adeleke",  email:"a.adeleke@example.com",  services:"8/8", outcome:"6P · 2F",       outColor:"#dc2626", sla:"Within SLA", slaOver:false, status:"Ready"},
    {name:"Emeka Nwosu",      email:"e.nwosu@example.com",    services:"8/8", outcome:"7P · 1 Inconc", outColor:"#dc2626", sla:"Overdue",    slaOver:true,  status:"Ready"},
    {name:"Amaka Okonkwo",    email:"a.okonkwo@example.com",  services:"8/8", outcome:"All Pass",      outColor:"#16a34a", sla:"Within SLA", slaOver:false, status:"Ready"},
    {name:"Tunde Fashola",    email:"t.fashola@example.com",  services:"8/8", outcome:"7P · 1F",       outColor:"#dc2626", sla:"Within SLA", slaOver:false, status:"Ready"},
    {name:"Blessing Eze",     email:"b.eze@example.com",      services:"8/8", outcome:"All Pass",      outColor:"#16a34a", sla:"Within SLA", slaOver:false, status:"Queried"},
    {name:"Ngozi Okafor",     email:"n.okafor@example.com",   services:"8/8", outcome:"6P · 2F",       outColor:"#dc2626", sla:"Overdue",    slaOver:true,  status:"Ready"},
    {name:"Ibrahim Danladi",  email:"i.danladi@example.com",  services:"8/8", outcome:"All Pass",      outColor:"#16a34a", sla:"Within SLA", slaOver:false, status:"Ready"},
    {name:"Fatima Abdullahi", email:"f.abdullahi@example.com",services:"8/8", outcome:"7P · 1F",       outColor:"#dc2626", sla:"Within SLA", slaOver:false, status:"Ready"},
    {name:"Kelechi Eze",      email:"k.eze@example.com",      services:"8/8", outcome:"All Pass",      outColor:"#16a34a", sla:"Within SLA", slaOver:false, status:"Ready"},
    {name:"Sade Williams",    email:"s.williams@example.com", services:"8/8", outcome:"5P · 3F",       outColor:"#dc2626", sla:"Overdue",    slaOver:true,  status:"Ready"},
    {name:"Kunle Adewale",    email:"k.adewale@example.com",  services:"8/8", outcome:"All Pass",      outColor:"#16a34a", sla:"Within SLA", slaOver:false, status:"Ready"},
  ];

  const SERVICES = ["Employment History Verification","Education Verification","Identity Verification","Criminal Record Check","Professional License Verification","Reference Check","Address Verification","Social Media Check"];
  const LOG_TASKS = BENCH_CANDIDATES.slice(0, 3).flatMap(c =>
    SERVICES.map(s => ({candidate:c.name, service:s, outcome:"Pass", outColor:"#16a34a", sla:"Within SLA", slaColor:"#16a34a"}))
  );
  const RETURNS = [
    {candidate:"Fatima Yusuf", service:"Employment History Verification", issue:"Email bounced - invalid address",                     sla:"3 days", slaColor:"#374151"},
    {candidate:"Ngozi Obi",    service:"Address Verification",            issue:"Address not found - incorrect location details",       sla:"2 days", slaColor:"#dc2626"},
    {candidate:"Ibrahim Musa", service:"Education Verification",           issue:"Institution not responding - no reply after 3 attempts",sla:"5 days", slaColor:"#374151"},
    {candidate:"Blessing Eze", service:"Employment History Verification",  issue:"Employer address incomplete - missing suite number",    sla:"1 day",  slaColor:"#dc2626"},
  ];

  const readyCands   = BENCH_CANDIDATES.filter(c => c.status === "Ready");
  const queriedCands = BENCH_CANDIDATES.filter(c => c.status === "Queried");
  const filteredBench = benchFilter==="All" ? BENCH_CANDIDATES : benchFilter==="Ready" ? readyCands : benchFilter==="Queried" ? queriedCands : [];

  const StatusPill = ({label}) => {
    const map = {Ready:{bg:"#f1f5f9",c:"#475569",b:"#cbd5e1"}, Queried:{bg:"#fffbeb",c:"#d97706",b:"#fde68a"}, Released:{bg:"#f0fdf4",c:"#16a34a",b:"#bbf7d0"}};
    const s = map[label]||{bg:"#f3f4f6",c:"#6b7280",b:"#e5e7eb"};
    return <span style={{padding:"4px 12px",background:s.bg,color:s.c,borderRadius:20,fontSize:12,fontWeight:500,border:`1px solid ${s.b}`}}>{label}</span>;
  };
  const SLAPill = ({over}) => (
    <span style={{padding:"4px 10px",background:over?"#fef2f2":"#f0fdf4",color:over?"#dc2626":"#16a34a",borderRadius:20,fontSize:12,fontWeight:500,border:`1px solid ${over?"#fecaca":"#bbf7d0"}`}}>
      {over?"Overdue":"Within SLA"}
    </span>
  );

  // ── Returns screen ──────────────────────────────────────────────
  if (showReturns) return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Ce","Batches",title,"Returns"]}/>
      <button onClick={()=>setShowReturns(false)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Active Batch
      </button>
      <h1 style={{margin:"0 0 6px",fontSize:22,fontWeight:800,color:"#111827",letterSpacing:-.3}}>RETURNED FROM OPS</h1>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Resolve operational issues to keep tasks within SLA.</p>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Candidate","Service","Issue","SLA Remaining","Fix"].map((h,i)=>(
              <th key={i} style={{padding:"13px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{RETURNS.map((r,i)=>(
            <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
              <td style={{padding:"16px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{r.candidate}</td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.service}</td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.issue}</td>
              <td style={{padding:"16px 20px",fontSize:14,fontWeight:600,color:r.slaColor}}>{r.sla}</td>
              <td style={{padding:"16px 20px"}}>
                <button style={{padding:"7px 18px",background:"#1d4ed8",color:"white",border:"none",borderRadius:6,fontSize:13,fontWeight:600,cursor:"pointer"}}>Fix</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );

  // ── Release Confirm Modal ───────────────────────────────────────
  const ReleaseModal = () => (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{background:"white",borderRadius:16,padding:"40px 36px",width:480,textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{width:56,height:56,background:"#dcfce7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Release Candidate Report</h2>
        <p style={{margin:"0 0 6px",fontSize:15,color:"#374151"}}>{releaseCandidate?.name}</p>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>8 Pass · 0 Fail · 8/8 services</p>
        <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"12px 16px",marginBottom:24,display:"flex",gap:8,textAlign:"left"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="16" height="16" style={{flexShrink:0,marginTop:1}}><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          <span style={{fontSize:13,color:"#92400e"}}>This action will make the full verification report visible to the client. It cannot be undone.</span>
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>setReleaseCandidate(null)} style={{flex:1,padding:"12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>setReleaseCandidate(null)} style={{flex:1,padding:"12px",border:"none",borderRadius:8,background:"#16a34a",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Confirm Release</button>
        </div>
      </div>
    </div>
  );

  // ── Release Activity Summary Modal ─────────────────────────────
  const ReleaseSummaryModal = () => {
    const days = [{d:"2024-10-01",n:5},{d:"2024-10-02",n:8},{d:"2024-10-03",n:12},{d:"2024-10-04",n:15},{d:"2024-10-05",n:18}];
    const max = 18;
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
        <div style={{background:"white",borderRadius:16,padding:"36px 40px",width:680,maxHeight:"85vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
            <h2 style={{margin:0,fontSize:20,fontWeight:700,color:"#111827"}}>Release Activity Summary</h2>
            <button onClick={()=>setShowReleaseSummaryModal(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#9ca3af",lineHeight:1}}>×</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:28}}>
            <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"18px 20px"}}>
              <p style={{margin:"0 0 6px",fontSize:13,color:"#9ca3af"}}>Total Released</p>
              <p style={{margin:0,fontSize:28,fontWeight:700,color:"#111827"}}>58</p>
            </div>
            <div style={{border:"1px solid #bfdbfe",borderRadius:10,padding:"18px 20px",background:"#eff6ff"}}>
              <p style={{margin:"0 0 6px",fontSize:13,color:"#3b82f6"}}>Cumulative This Week</p>
              <p style={{margin:0,fontSize:28,fontWeight:700,color:"#2563eb"}}>23</p>
            </div>
            <div style={{border:"1px solid #bbf7d0",borderRadius:10,padding:"18px 20px",background:"#f0fdf4"}}>
              <p style={{margin:"0 0 6px",fontSize:13,color:"#16a34a"}}>Within SLA</p>
              <p style={{margin:0,fontSize:28,fontWeight:700,color:"#16a34a"}}>98%</p>
            </div>
          </div>
          <p style={{margin:"0 0 14px",fontWeight:600,fontSize:15,color:"#111827"}}>Release Activity by Day</p>
          <div style={{marginBottom:28}}>
            {days.map(({d,n})=>(
              <div key={d} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <span style={{fontSize:13,color:"#6b7280",width:90,flexShrink:0}}>{d}</span>
                <div style={{flex:1,background:"#f3f4f6",borderRadius:4,height:20,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(n/max)*100}%`,background:"#16a34a",borderRadius:4}}/>
                </div>
                <span style={{fontSize:13,fontWeight:600,color:"#111827",width:20,textAlign:"right"}}>{n}</span>
              </div>
            ))}
          </div>
          <p style={{margin:"0 0 12px",fontWeight:600,fontSize:15,color:"#111827"}}>Recent Releases</p>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{borderBottom:"1px solid #e5e7eb"}}>
              {["Service","Name","Released Date","Released By"].map(h=>(
                <th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                {type:"Task",  name:"Employment History - Chinyere Okafor",      date:"2024-10-01",by:"Sarah Chen"},
                {type:"Task",  name:"Education Verification - Adebayo Adeleke",  date:"2024-10-02",by:"Sarah Chen"},
                {type:"Report",name:"Chinyere Okafor",                            date:"2024-10-03",by:"Sarah Chen"},
              ].map((r,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"11px 12px",fontSize:13,color:"#374151"}}>{r.type}</td>
                  <td style={{padding:"11px 12px",fontSize:13,color:"#374151"}}>{r.name}</td>
                  <td style={{padding:"11px 12px",fontSize:13,color:"#374151"}}>{r.date}</td>
                  <td style={{padding:"11px 12px",fontSize:13,color:"#374151"}}>{r.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ── Main detail screen ──────────────────────────────────────────
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px",position:"relative"}}>
      {releaseCandidate && <ReleaseModal/>}
      {showReleaseSummaryModal && <ReleaseSummaryModal/>}

      <Breadcrumb items={["Ce","Batches","Active"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:16,padding:0}}>
        <ChevronLeft/> Back to Active
      </button>

      {/* Header card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <h1 style={{margin:"0 0 16px",fontSize:22,fontWeight:700,color:"#111827"}}>{title}</h1>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {[
            {label:"Client",      value:client},
            {label:"Total Tasks", value:`${totalTasks} tasks (${candidates} candidates)`},
            {label:"Days Active", value:"12 days"},
          ].map(f=>(
            <div key={f.label}>
              <p style={{margin:"0 0 4px",fontSize:13,color:"#9ca3af"}}>{f.label}</p>
              <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Progress */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 12px",fontWeight:600,fontSize:15,color:"#111827"}}>Overall Progress</p>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:14,color:"#374151"}}>Complete: {completed} / {totalTasks}</span>
          <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{pct}%</span>
        </div>
        <div style={{background:"#e5e7eb",borderRadius:8,height:12,overflow:"hidden",marginBottom:6}}>
          <div style={{height:"100%",width:`${pct}%`,background:"#16a34a",borderRadius:8}}/>
        </div>
        <span style={{fontSize:13,color:"#6b7280"}}>Pending: {pending} tasks</span>
      </div>

      {/* Returns alert */}
      <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,padding:"14px 20px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="16" height="16" style={{flexShrink:0}}><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        <span style={{flex:1,fontSize:14,color:"#b91c1c"}}><strong>4 tasks returned from operations</strong> - require immediate attention to stay within SLA</span>
        <button onClick={()=>setShowReturns(true)} style={{padding:"8px 18px",background:"#b91c1c",color:"white",border:"none",borderRadius:6,fontSize:13,fontWeight:600,cursor:"pointer",flexShrink:0}}>View Returns</button>
      </div>

      {/* Job Summary */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 16px",fontWeight:600,fontSize:15,color:"#111827"}}>Job Summary</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {[
            {label:"Tasks Pending",     value:42,  bg:"#fffbeb",c:"#d97706"},
            {label:"Tasks Completed",   value:158, bg:"#f0fdf4",c:"#16a34a"},
            {label:"Candidates Pending",value:9,   bg:"#eff6ff",c:"#3b82f6"},
            {label:"Candidates Complete",value:16, bg:"#f0fdf4",c:"#16a34a"},
          ].map(s=>(
            <div key={s.label} style={{background:s.bg,borderRadius:10,padding:"18px 20px",border:`1px solid ${s.c}22`}}>
              <p style={{margin:"0 0 8px",fontSize:28,fontWeight:700,color:s.c}}>{s.value}</p>
              <p style={{margin:0,fontSize:13,color:s.c}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Release Activity Summary */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 28px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <p style={{margin:"0 0 2px",fontWeight:600,fontSize:15,color:"#111827"}}>Release Activity Summary</p>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Total Released: 58</p>
        </div>
        <button onClick={()=>setShowReleaseSummaryModal(true)} style={{padding:"8px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>View</button>
      </div>

      {/* Release Bench */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:16,color:"white"}}>Release Bench</p>
              <p style={{margin:0,fontSize:12,color:"#bfdbfe"}}>Review completed candidates and release reports to client</p>
            </div>
          </div>
          <div style={{display:"flex",gap:24}}>
            {[{label:"Ready",n:readyCands.length,c:"white"},{label:"Queried",n:queriedCands.length,c:"#fbbf24"},{label:"Released",n:0,c:"#6ee7b7"}].map(s=>(
              <div key={s.label} style={{textAlign:"center"}}>
                <p style={{margin:"0 0 2px",fontSize:20,fontWeight:700,color:s.c}}>{s.n}</p>
                <p style={{margin:0,fontSize:12,color:"#93c5fd"}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Search + filter */}
        <div style={{padding:"14px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,position:"relative"}}>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
            <input placeholder="Search candidates..." style={{width:"100%",padding:"8px 12px 8px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:13,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
          </div>
          <div style={{display:"flex",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"}}>
            {["All","Ready","Queried","Released"].map((f,fi)=>(
              <button key={f} onClick={()=>setBenchFilter(f)}
                style={{padding:"8px 16px",border:"none",cursor:"pointer",fontSize:13,fontWeight:benchFilter===f?600:400,background:benchFilter===f?"#f9fafb":"white",color:benchFilter===f?"#111827":"#6b7280",borderRight:fi<3?"1px solid #e5e7eb":"none"}}>
                {f}
              </button>
            ))}
          </div>
        </div>
        {/* Bench table */}
        {filteredBench.length===0 ? (
          <div style={{padding:"48px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No candidates found.</div>
        ) : (
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"12px 20px",width:32}}><div style={{width:16,height:16,border:"2px solid #d1d5db",borderRadius:3}}/></th>
              {["Candidate","Services","Outcome","SLA","Status","Actions"].map(h=>(
                <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filteredBench.map((c,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"14px 20px"}}><div style={{width:16,height:16,border:"2px solid #d1d5db",borderRadius:3}}/></td>
                  <td style={{padding:"14px 16px"}}>
                    <p style={{margin:"0 0 2px",fontSize:14,fontWeight:600,color:"#111827"}}>{c.name}</p>
                    <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{c.email}</p>
                  </td>
                  <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>{c.services}</td>
                  <td style={{padding:"14px 16px",fontSize:14,fontWeight:600,color:c.outColor}}>{c.outcome}</td>
                  <td style={{padding:"14px 16px"}}><SLAPill over={c.slaOver}/></td>
                  <td style={{padding:"14px 16px"}}><StatusPill label={c.status}/></td>
                  <td style={{padding:"14px 16px"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <button style={{padding:"6px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,color:"#374151",cursor:"pointer"}}>View Evidence</button>
                      <button style={{padding:"6px 12px",border:"1px solid #fde68a",borderRadius:6,background:"#fffbeb",fontSize:12,color:"#d97706",cursor:"pointer",fontWeight:500}}>Query</button>
                      {c.status!=="Queried" && (
                        <button onClick={()=>setReleaseCandidate(c)} style={{padding:"6px 14px",border:"none",borderRadius:6,background:"#16a34a",fontSize:12,color:"white",cursor:"pointer",fontWeight:600}}>Release</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Task & Candidate Log */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:32}}>
        <p style={{margin:"0 0 2px",fontWeight:600,fontSize:15,color:"#111827"}}>Task &amp; Candidate Log</p>
        <p style={{margin:"0 0 16px",fontSize:13,color:"#9ca3af"}}>View only — use the Release Bench above to take action</p>
        <div style={{display:"flex",gap:24,marginBottom:16,borderBottom:"1px solid #f3f4f6"}}>
          {[{label:"Task Pending",n:46},{label:"Task Completed",n:154},{label:"Candidate Pending",n:9},{label:"Candidate Complete",n:16},{label:"Released",n:3}].map(f=>(
            <button key={f.label} onClick={()=>setLogFilter(f.label)}
              style={{padding:"8px 0",border:"none",background:"none",cursor:"pointer",fontSize:13,fontWeight:logFilter===f.label?700:400,
                color:logFilter===f.label?"#2563eb":"#374151",
                borderBottom:logFilter===f.label?"2px solid #2563eb":"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap"}}>
              {f.label}<br/><span style={{fontWeight:logFilter===f.label?700:400,color:logFilter===f.label?"#2563eb":"#374151"}}>({f.n})</span>
            </button>
          ))}
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{borderBottom:"1px solid #e5e7eb"}}>
            {["Candidate","Service","Outcome","SLA","Actions"].map(h=>(
              <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {LOG_TASKS.map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>{r.candidate}</td>
                <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>{r.service}</td>
                <td style={{padding:"14px 16px",fontSize:14,fontWeight:600,color:r.outColor}}>{r.outcome}</td>
                <td style={{padding:"14px 16px",fontSize:14,color:r.slaColor,fontWeight:500}}>{r.sla}</td>
                <td style={{padding:"14px 16px"}}>
                  <button style={{padding:"6px 14px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,color:"#374151",cursor:"pointer"}}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── CE Tab Content ───────────────────────────────────────────────────────────
const StatusBadge = ({ label }) => (
  <span style={{padding:"4px 10px",background:"#eff6ff",color:"#3b82f6",borderRadius:20,fontSize:12,fontWeight:500}}>{label}</span>
);
function DraftsTab({ search, onRowClick }) {
  const rows = BATCHES.drafts.filter(r => r.client.toLowerCase().includes(search.toLowerCase()) || r.batch.toLowerCase().includes(search.toLowerCase()));
  return (
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr style={{background:"#fafafa"}}>{["Client","Batch","Tasks","Days","Notes",""].map((h,i)=><th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",width:h===""?40:undefined}}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i} onClick={()=>onRowClick&&onRowClick(r)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
            <td style={{padding:"16px 20px",fontSize:14,color:"#111827"}}>{r.client}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.batch}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.tasks}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.days}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#9ca3af"}}>-</td>
            <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
          </tr>
        ))}
        {rows.length===0&&<tr><td colSpan={6} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No results found.</td></tr>}
      </tbody>
    </table>
  );
}
function CollectionTab({ search, onRowClick }) {
  const rows = BATCHES.collection.filter(r => r.client.toLowerCase().includes(search.toLowerCase()) || r.batch.toLowerCase().includes(search.toLowerCase()));
  return (
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr style={{background:"#fafafa"}}>{["Client","Batch","Received","Tasks","Days","Notes",""].map((h,i)=><th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",width:h===""?40:undefined}}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i} onClick={()=>onRowClick&&onRowClick(r)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
            <td style={{padding:"16px 20px",fontSize:14,color:"#111827"}}>{r.client}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.batch}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.received}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.tasks}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.days}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#9ca3af"}}>-</td>
            <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
          </tr>
        ))}
        {rows.length===0&&<tr><td colSpan={7} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No results found.</td></tr>}
      </tbody>
    </table>
  );
}
function ActiveTab({ search, onRowClick }) {
  const rows = BATCHES.active.candidates.filter(r => r.client.toLowerCase().includes(search.toLowerCase()) || r.batch.toLowerCase().includes(search.toLowerCase()));
  return (
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr style={{background:"#fafafa"}}>{["Client","Batch","Complete","Pending","Days",""].map((h,i)=><th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",width:h===""?40:undefined}}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i} onClick={()=>onRowClick&&onRowClick(r)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
            <td style={{padding:"16px 20px",fontSize:14,color:"#111827"}}>{r.client}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.batch}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.complete}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.pending}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.days}</td>
            <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
          </tr>
        ))}
        {rows.length===0&&<tr><td colSpan={6} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No results found.</td></tr>}
      </tbody>
    </table>
  );
}
// ─── Release Workbench (Complete Tab) ────────────────────────────────────────
const WORKBENCH_SERVICES = [
  { name:"Employment History Verification",  total:32, released:18, queried:3, pending:11 },
  { name:"Education Verification",           total:32, released:22, queried:1, pending:9  },
  { name:"Identity Verification",            total:32, released:30, queried:0, pending:2  },
  { name:"Criminal Record Check",            total:32, released:14, queried:4, pending:14 },
  { name:"Professional License Verification",total:32, released:20, queried:2, pending:10 },
  { name:"Reference Check",                  total:32, released:25, queried:1, pending:6  },
  { name:"Address Verification",             total:32, released:28, queried:2, pending:2  },
  { name:"Social Media Check",               total:32, released:32, queried:0, pending:0  },
];

const WORKBENCH_CANDIDATES = [
  "Chinyere Okafor","Adebayo Adeleke","Emeka Nwosu","Amaka Okonkwo",
  "Tunde Fashola","Blessing Eze","Ngozi Okafor","Ibrahim Danladi",
  "Fatima Abdullahi","Kelechi Eze","Sade Williams","Kunle Adewale",
];

function ServiceDrillDown({ service, batchName, onBack }) {
  const [taskStates, setTaskStates] = useState(() => {
    const s = {};
    const total = WORKBENCH_CANDIDATES.length;
    // Cap so Pending is majority: max 3 Released, max 1 Queried from the initial data
    const relCap = Math.min(service.released, Math.floor(total * 0.25));
    const qryCap = Math.min(service.queried, Math.floor(total * 0.08));
    WORKBENCH_CANDIDATES.forEach((c, i) => {
      s[i] = i < relCap ? "Released" : i < relCap + qryCap ? "Queried" : "Pending";
    });
    return s;
  });
  const [evidenceFor, setEvidenceFor] = useState(null);
  const [queryFor, setQueryFor]       = useState(null);
  const [queryNote, setQueryNote]     = useState("");
  const [docView, setDocView]         = useState(null); // { candName, docName }
  const serviceName = service?.name || "";
  const supportsSignatureEvidence = service?.mode === "Scholar" || /Academic|Educational|Guarantor/i.test(serviceName);
  const supportsBulkMetadata = /Academic|Educational/i.test(serviceName) || service?.mode === "Scholar";

  const StatusPill = ({ status }) => {
    const map = {
      Released:{ bg:"#f0fdf4", c:"#16a34a", b:"#bbf7d0" },
      Queried: { bg:"#fffbeb", c:"#d97706", b:"#fde68a" },
      Pending: { bg:"#f1f5f9", c:"#475569", b:"#cbd5e1" },
    };
    const s = map[status] || map.Pending;
    return <span style={{padding:"4px 12px",background:s.bg,color:s.c,border:`1px solid ${s.b}`,borderRadius:20,fontSize:12,fontWeight:500}}>{status}</span>;
  };

  const released = Object.values(taskStates).filter(s=>s==="Released").length;
  const queried  = Object.values(taskStates).filter(s=>s==="Queried").length;
  const pending  = Object.values(taskStates).filter(s=>s==="Pending").length;

  // Query modal — defined here so it's available in all early-return branches
  const QueryModal = () => (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{background:"white",borderRadius:16,padding:"36px",width:460,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>Query Task</h2>
          <button onClick={()=>{setQueryFor(null);setQueryNote("");}} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:20,lineHeight:1,padding:0}}>×</button>
        </div>
        <p style={{margin:"0 0 16px",fontSize:14,color:"#374151"}}>Query task <strong>{service.name}</strong> for candidate <strong>{WORKBENCH_CANDIDATES[queryFor]}</strong></p>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Reason</label>
        <textarea value={queryNote} onChange={e=>setQueryNote(e.target.value)} placeholder="Enter reason for query..."
          style={{width:"100%",height:120,padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,resize:"vertical",boxSizing:"border-box",outline:"none",color:"#374151"}}/>
        <div style={{display:"flex",gap:10,marginTop:20,justifyContent:"flex-end"}}>
          <button onClick={()=>{setQueryFor(null);setQueryNote("");}} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,cursor:"pointer",color:"#374151"}}>Cancel</button>
          <button onClick={()=>{setTaskStates(p=>({...p,[queryFor]:"Queried"}));setQueryFor(null);setQueryNote("");if(evidenceFor!==null)setEvidenceFor(null);}}
            style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#d97706",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Submit Query</button>
        </div>
      </div>
    </div>
  );

  // Document viewer
  if (docView !== null) {
    return (
      <div style={{padding:"28px 32px"}}>
        <button onClick={()=>setDocView(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
          <ChevronLeft/> Back to Evidence
        </button>
        <h1 style={{margin:"0 0 4px",fontSize:20,fontWeight:700,color:"#111827"}}>{docView.docName}</h1>
        <p style={{margin:"0 0 24px",fontSize:13,color:"#6b7280"}}>{docView.candName} · {service.name} · {batchName}</p>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          {/* Dummy PDF viewer */}
          <div style={{background:"#374151",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:"white",fontSize:13,fontWeight:500}}>{docView.docName}</span>
            <span style={{color:"#9ca3af",fontSize:12}}>Page 1 of 1</span>
          </div>
          <div style={{background:"#f8f8f8",padding:"40px",minHeight:480,display:"flex",alignItems:"flex-start",justifyContent:"center"}}>
            <div style={{background:"white",width:"100%",maxWidth:600,padding:"48px",boxShadow:"0 2px 16px rgba(0,0,0,0.1)",borderRadius:4,fontFamily:"serif"}}>
              <div style={{textAlign:"center",marginBottom:32}}>
                <div style={{width:56,height:56,background:"#b91c1c",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                  <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
                </div>
                <p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:"#111827"}}>DRAGNET SOLUTIONS</p>
                <p style={{margin:0,fontSize:12,color:"#6b7280"}}>Verification Report</p>
              </div>
              <hr style={{border:"none",borderTop:"2px solid #e5e7eb",margin:"20px 0"}}/>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Document Type</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{docView.docName.replace(".pdf","")}</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Candidate Name</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{docView.candName}</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Service</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{service.name}</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Batch</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{batchName}</p>
              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",margin:"20px 0"}}/>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Verification Status</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#16a34a"}}>✓ Verified</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Date Issued</p>
              <p style={{margin:0,fontSize:15,fontWeight:600,color:"#111827"}}>07 Mar 2026</p>
              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",margin:"20px 0"}}/>
              <p style={{fontSize:11,color:"#9ca3af",textAlign:"center",margin:0}}>This document is generated by Dragnet Solutions and is valid for official use only.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Evidence viewer
  if (evidenceFor !== null) {
    const cand = WORKBENCH_CANDIDATES[evidenceFor];
    return (
      <div style={{padding:"28px 32px"}}>
        {queryFor !== null && <QueryModal/>}
        <button onClick={()=>setEvidenceFor(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
          <ChevronLeft/> Back to {service.name}
        </button>
        <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{cand}</h1>
        <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>{service.name} · {batchName}</p>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"32px",marginBottom:20}}>
          <p style={{margin:"0 0 16px",fontSize:14,fontWeight:600,color:"#374151"}}>Evidence Documents</p>
          {["Verification Certificate.pdf","Source Response Letter.pdf","Supporting Document.pdf"].map((doc,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",border:"1px solid #e5e7eb",borderRadius:8,marginBottom:10,background:"#fafafa"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/></svg>
                <span style={{fontSize:14,color:"#111827",fontWeight:500}}>{doc}</span>
              </div>
              <button onClick={()=>setDocView({candName:cand,docName:doc})} style={{padding:"6px 16px",background:"#1d4ed8",color:"white",border:"none",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer"}}>View</button>
            </div>
          ))}
        </div>
        {supportsBulkMetadata && (
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px",marginBottom:20}}>
            <p style={{margin:"0 0 14px",fontSize:14,fontWeight:600,color:"#374151"}}>Bulk Response Metadata</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
              {[
                ["Letter dated","07 Mar 2026"],
                ["Signed by","Mrs. Janet Obi"],
                ["Received on","09 Mar 2026"],
                ["Uploaded by","A. Musa (VE)"],
                ["Upload date","09 Mar 2026 · 14:22"],
                ["Candidates covered","12 candidates"],
              ].map(([k,v]) => (<div key={k}><p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:600,textTransform:"uppercase"}}>{k}</p><p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{v}</p></div>))}
            </div>
            <p style={{margin:"12px 0 0",fontSize:12,color:"#6b7280"}}>The underlying response sheet remains internal evidence. Only metadata is surfaced here.</p>
          </div>
        )}
        {supportsSignatureEvidence && (
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px",marginBottom:20}}>
            <p style={{margin:"0 0 14px",fontSize:14,fontWeight:600,color:"#374151"}}>Signature Evidence Metadata</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:"#6b7280"}}>Shown only where the response actually involves a captured digital signature event.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
              {[
                ["Signed date","07 Mar 2026"],
                ["Signed time","13:47 WAT"],
                ["IP address","102.89.14.221"],
                ["Location","Lagos, Nigeria"],
                ["NIN Verified","Yes"],
                ["Face Verified","Yes"],
              ].map(([k,v]) => (<div key={k}><p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:600,textTransform:"uppercase"}}>{k}</p><p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{v}</p></div>))}
            </div>
          </div>
        )}
        {taskStates[evidenceFor]!=="Released" && (
        <div style={{display:"flex",gap:12,justifyContent:"flex-end"}}>
          <button onClick={()=>{setQueryFor(evidenceFor);}}
            style={{padding:"10px 24px",border:"1.5px solid #d97706",borderRadius:8,background:"white",color:"#d97706",fontSize:14,fontWeight:600,cursor:"pointer"}}>Query</button>
          <button onClick={()=>{setTaskStates(p=>({...p,[evidenceFor]:"Released"}));setEvidenceFor(null);}}
            style={{padding:"10px 24px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Release</button>
        </div>
        )}
      </div>
    );
  }

  return (
    <div style={{padding:"28px 32px"}}>
      {queryFor !== null && <QueryModal/>}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
        <ChevronLeft/> Back to Release Workbench
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{service.name}</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{batchName}</p>
        </div>
        <div style={{display:"flex",gap:20}}>
          {[{label:"Total",val:WORKBENCH_CANDIDATES.length,c:"#374151"},{label:"Released",val:released,c:"#16a34a"},{label:"Queried",val:queried,c:"#d97706"},{label:"Pending",val:pending,c:"#475569"}].map(({label,val,c})=>(
            <div key={label} style={{textAlign:"center"}}>
              <p style={{margin:0,fontSize:22,fontWeight:700,color:c}}>{val}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Candidate","Status","Actions"].map((h,i)=>(
              <th key={i} style={{padding:"13px 20px",textAlign:i===2?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[...WORKBENCH_CANDIDATES.map((cand,i)=>({cand,i}))].sort((a,b)=>{const order={Pending:0,Queried:1,Released:2};return order[taskStates[a.i]]-order[taskStates[b.i]];}).map(({cand,i})=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{cand}</td>
                <td style={{padding:"16px 20px"}}><StatusPill status={taskStates[i]}/></td>
                <td style={{padding:"16px 20px",textAlign:"right"}}>
                  <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                    <button onClick={()=>setEvidenceFor(i)}
                      style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>View Evidence</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompleteTab({ onArchive }) {
  const [selectedBatch, setSelectedBatch] = useState(BATCHES.complete[0]);
  const [selectedService, setSelectedService] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archivedBatches, setArchivedBatches] = useState([]);
  const dropRef = useRef();
  useEffect(()=>{
    const h = e => { if(dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  },[]);

  if (selectedService) return (
    <ServiceDrillDown
      service={selectedService}
      batchName={selectedBatch.batch}
      onBack={()=>setSelectedService(null)}
    />
  );

  const totalReleased = WORKBENCH_SERVICES.reduce((a,s)=>a+s.released,0);
  const totalQueried  = WORKBENCH_SERVICES.reduce((a,s)=>a+s.queried,0);
  const totalPending  = WORKBENCH_SERVICES.reduce((a,s)=>a+s.pending,0);
  const grandTotal    = WORKBENCH_SERVICES.reduce((a,s)=>a+s.total,0);
  const pct = Math.round((totalReleased/grandTotal)*100);

  return (
    <div style={{padding:"28px 32px"}}>
      {/* Archive Confirm Modal */}
      {showArchiveModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"white",borderRadius:16,padding:"40px 36px",width:460,textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            <div style={{width:56,height:56,background:"#fef3c7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3"/></svg>
            </div>
            <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Archive This Batch?</h2>
            <p style={{margin:"0 0 8px",fontSize:15,fontWeight:600,color:"#374151"}}>{selectedBatch.batch}</p>
            <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280"}}>This batch will be archived and moved to Reports. It will no longer appear in the Complete workbench.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <button onClick={()=>setShowArchiveModal(false)} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>{
                setArchivedBatches(p=>[...p,selectedBatch.batch]);
                setShowArchiveModal(false);
                if(onArchive) onArchive(selectedBatch);
              }} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Archive Batch</button>
            </div>
          </div>
        </div>
      )}

      {/* Header + batch selector */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>Release Workbench</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>Review evidence and release candidate reports to client</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* Archive CTA — only active when fully released */}
          <button
            onClick={()=>{ if(pct===100 && !archivedBatches.includes(selectedBatch.batch)) setShowArchiveModal(true); }}
            disabled={pct < 100 || archivedBatches.includes(selectedBatch.batch)}
            title={pct < 100 ? "All candidates must be released before archiving" : archivedBatches.includes(selectedBatch.batch) ? "Already archived" : "Archive this batch"}
            style={{padding:"10px 18px",border:"none",borderRadius:8,fontSize:14,fontWeight:600,cursor:pct===100&&!archivedBatches.includes(selectedBatch.batch)?"pointer":"not-allowed",background:pct===100&&!archivedBatches.includes(selectedBatch.batch)?"#1d4ed8":"#e5e7eb",color:pct===100&&!archivedBatches.includes(selectedBatch.batch)?"white":"#9ca3af",transition:"all .15s"}}>
            {archivedBatches.includes(selectedBatch.batch) ? "✓ Archived" : "Archive Batch →"}
          </button>
          <div ref={dropRef} style={{position:"relative"}}>
          <button onClick={()=>setDropdownOpen(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",cursor:"pointer",fontSize:14,fontWeight:500,color:"#111827",minWidth:260}}>
            <div style={{flex:1,textAlign:"left"}}>
              <p style={{margin:0,fontSize:11,color:"#9ca3af",fontWeight:400}}>Selected Batch</p>
              <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{selectedBatch.batch}</p>
            </div>
            <ChevronDown/>
          </button>
          {dropdownOpen && (
            <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,width:320,background:"white",borderRadius:10,boxShadow:"0 8px 32px rgba(0,0,0,0.14)",border:"1px solid #e5e7eb",zIndex:200,overflow:"hidden"}}>
              {BATCHES.complete.map((b,i)=>(
                <button key={i} onClick={()=>{setSelectedBatch(b);setDropdownOpen(false);setSelectedService(null);}}
                  style={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:"100%",padding:"12px 16px",border:"none",cursor:"pointer",background:selectedBatch.batch===b.batch?"#fef2f2":"white",textAlign:"left"}}
                  onMouseEnter={e=>{if(selectedBatch.batch!==b.batch)e.currentTarget.style.background="#f9fafb";}}
                  onMouseLeave={e=>{if(selectedBatch.batch!==b.batch)e.currentTarget.style.background="white";}}>
                  <span style={{fontSize:14,fontWeight:600,color:"#111827"}}>{b.batch}</span>
                  <span style={{fontSize:12,color:"#6b7280"}}>{b.client} · Delivered {b.delivered}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        </div>{/* end flex row: archive btn + batch selector */}
      </div>

      {/* Summary bar */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:32}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:13,fontWeight:600,color:"#374151"}}>Overall Release Progress</span>
            <span style={{fontSize:13,fontWeight:700,color:"#111827"}}>{pct}%</span>
          </div>
          <div style={{height:8,background:"#f3f4f6",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"#16a34a",borderRadius:99}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:28,flexShrink:0}}>
          {[{label:"Total",val:grandTotal,c:"#374151"},{label:"Completed",val:totalReleased+totalQueried,c:"#111827"},{label:"Released",val:totalReleased,c:"#16a34a"},{label:"Queried",val:totalQueried,c:"#d97706"}].map(({label,val,c})=>(
            <div key={label} style={{textAlign:"center"}}>
              <p style={{margin:0,fontSize:20,fontWeight:700,color:c}}>{val}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service cards grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {WORKBENCH_SERVICES.map((svc,i)=>{
          const svcPct = Math.round((svc.released/svc.total)*100);
          const allDone = svc.pending===0;
          return (
            <div key={i} onClick={()=>setSelectedService(svc)}
              style={{background:"white",borderRadius:12,border:`1px solid ${allDone?"#bbf7d0":"#e5e7eb"}`,padding:"20px",cursor:"pointer",transition:"box-shadow .15s,border-color .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.08)";e.currentTarget.style.borderColor=allDone?"#86efac":"#d1d5db";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=allDone?"#bbf7d0":"#e5e7eb";}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827",lineHeight:1.4,flex:1,paddingRight:8}}>{svc.name}</p>
                {allDone
                  ? <span style={{padding:"3px 10px",background:"#f0fdf4",color:"#16a34a",border:"1px solid #bbf7d0",borderRadius:20,fontSize:11,fontWeight:600,flexShrink:0}}>Complete</span>
                  : <span style={{padding:"3px 10px",background:"#eff6ff",color:"#3b82f6",border:"1px solid #bfdbfe",borderRadius:20,fontSize:11,fontWeight:600,flexShrink:0}}>In Progress</span>
                }
              </div>
              <div style={{height:5,background:"#f3f4f6",borderRadius:99,overflow:"hidden",marginBottom:14}}>
                <div style={{height:"100%",width:`${svcPct}%`,background:allDone?"#16a34a":"#b91c1c",borderRadius:99}}/>
              </div>
              <div style={{display:"flex",gap:0,borderTop:"1px solid #f3f4f6",paddingTop:14}}>
                {[{label:"Total",val:svc.total,c:"#374151"},{label:"Completed",val:svc.released+svc.queried,c:"#111827"},{label:"Released",val:svc.released,c:"#16a34a"},{label:"Queried",val:svc.queried,c:"#d97706"}].map(({label,val,c},j)=>(
                  <div key={j} style={{flex:1,textAlign:"center"}}>
                    <p style={{margin:0,fontSize:16,fontWeight:700,color:c}}>{val}</p>
                    <p style={{margin:0,fontSize:11,color:"#9ca3af"}}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ─── Batch Setup & Service Selection Flow ─────────────────────────────────────

const ALL_SERVICES = [
  { name:"NIN Verification",                    sla:"1 day"  },
  { name:"Employment Reference Verification",   sla:"10 days"},
  { name:"Address Verification",                sla:"7 days" },
  { name:"Guarantor Verification",              sla:"7 days" },
  { name:"Criminal Record Check",               sla:"15 days"},
  { name:"Educational Verification",            sla:"10 days"},
  { name:"Professional Certification Verification", sla:"12 days"},
  { name:"Credit Check",                        sla:"5 days" },
  { name:"NYSC Verification",                   sla:"3 days" },
  { name:"Academic (Local)",                    sla:"10 days"},
  { name:"Professional Membership",             sla:"8 days" },
];

const SLA_DAYS = { "1 day":1,"3 days":3,"5 days":5,"7 days":7,"8 days":8,"10 days":10,"12 days":12,"15 days":15 };

const SERVICE_SELECTION_OPTIONS = [
  { name:"NIN Verification", category:"Identity" },
  { name:"Employment Reference Verification", category:"Employment", nudgeEligible:true },
  { name:"Address Verification", category:"Field", nudgeEligible:true, fieldBased:true },
  { name:"Guarantor Verification", category:"Reference", nudgeEligible:true, mayRequireSignature:true },
  { name:"Criminal Record Check", category:"Risk", captureExecutionNotes:["Police Records Unit"] },
  { name:"Educational Verification", category:"Academic", mayUseBulkResponse:true, mayRequireSignature:true },
  { name:"Professional Certification Verification", category:"Professional" },
  { name:"Credit Check", category:"Risk", captureExecutionNotes:["Email / manual processing", "No API yet"] },
  { name:"NYSC Verification", category:"Registry" },
  { name:"Academic (Local)", category:"Academic", nudgeEligible:true, isScholar:true, mayUseBulkResponse:true, mayRequireSignature:true },
  { name:"Professional Membership", category:"Professional" },
];

const CLONE_SOURCE_BATCHES = [
  ...BATCHES.drafts.map((b, i) => ({ id:`draft-${i+1}`, label:`${b.client} — ${b.batch}`, client:b.client, batch:b.batch })),
  ...BATCHES.collection.map((b, i) => ({ id:`collection-${i+1}`, label:`${b.client} — ${b.batch}`, client:b.client, batch:b.batch })),
  ...BATCHES.active.candidates.map((b, i) => ({ id:`active-${i+1}`, label:`${b.client} — ${b.batch}`, client:b.client, batch:b.batch })),
];

const SCHOLAR_INTAKE_FIELDS = [
  "Institution name", "Faculty / School", "Department", "Programme / Course", "Level / Year", "Matric / Student Number",
  "Academic session", "Admission year", "Expected graduation year", "Scholar type", "Current student / Graduated",
  "Registrar email (if known)", "Exams & records email (if known)", "Portal name / clue (if foreign)"
];

// ─── Create Batch Wizard ──────────────────────────────────────────────────────

const CE_CLIENTS = [
  { name:"Acme Corporation Limited",  activeBatches:3 },
  { name:"Beta Industries PLC",       activeBatches:1 },
  { name:"Gamma Technologies Ltd",    activeBatches:2 },
  { name:"Delta Financial Services",  activeBatches:1 },
  { name:"Epsilon Real Estate",       activeBatches:0 },
];

function CreateBatchWizard({ onCancel, onDone, initialClone=false }) {
  // wizard state
  const [step, setStep] = useState(1);
  const [client, setClient]         = useState(null);
  const [batchName, setBatchName]   = useState("");
  const [collMode, setCollMode]     = useState("decentralized"); // only decentralized
  const [selectedServices, setSelectedServices] = useState([]);
  const [cloneMode, setCloneMode]   = useState(initialClone ? "clone" : "new");
  const [cloneSource, setCloneSource] = useState(initialClone ? CLONE_SOURCE_BATCHES[0]?.id || "" : "");
  const [fileInfo, setFileInfo]     = useState(null); // { name, total, valid, errors }
  const [hasErrors, setHasErrors]   = useState(false);
  const [subDeadline, setSubDeadline] = useState("5");
  const [linkExpiry, setLinkExpiry]   = useState("7");
  const [reminders, setReminders]     = useState([]);
  const [reminderInput, setReminderInput] = useState("3");
  const [clientSearch, setClientSearch]   = useState("");
  const [success, setSuccess]             = useState(false);

  const selectedServiceObjects = SERVICE_SELECTION_OPTIONS.filter(s => selectedServices.includes(s.name));
  const hasScholarService = selectedServiceObjects.some(s => s.isScholar || /Academic|Educational/i.test(s.name));
  const hasFieldService = selectedServiceObjects.some(s => s.fieldBased);
  const hasManualRegistryService = selectedServiceObjects.some(s => /Educational|Academic|Criminal Record Check|Credit Check/i.test(s.name));
  const cloneSourceObj = CLONE_SOURCE_BATCHES.find(b => b.id === cloneSource) || null;

  const buildRequiredColumns = () => {
    const base = collMode === "decentralized"
      ? ["Name", "Email"]
      : ["Name", "Email", "NIN", "Date of Birth", "Address"];
    const extras = [];
    if (selectedServices.includes("Address Verification") && !base.includes("Address")) extras.push("Address");
    if (selectedServices.includes("Guarantor Verification")) extras.push("Guarantor Name", "Guarantor Phone", "Guarantor Relationship");
    if (selectedServices.includes("Employment Reference Verification")) extras.push("Employer Name", "Employer Email");
    if (hasScholarService) extras.push(...SCHOLAR_INTAKE_FIELDS);
    return [...new Set([...base, ...extras])];
  };

  const buildOptionalColumns = () => {
    const extras = collMode === "decentralized" ? ["Phone"] : ["Phone", "Middle Name"];
    if (hasScholarService) extras.push("Other academic office email", "Candidate notes on contact source");
    if (hasManualRegistryService) extras.push("Portal URL / clue", "Source notes");
    return [...new Set(extras)];
  };

  // dynamic steps: 1 Select Client, 2 Batch Details,
  // 3 Service Selection, 4 Upload Candidates, 5 Review Errors (conditional), 6 Collection Settings (decentralized only), 7 Review & Create
  const stepLabels = ["Select Client","Batch Details","Select Services","Upload Candidates",
    ...(hasErrors ? ["Review Errors"] : []),
    ...(collMode==="decentralized" ? ["Collection Settings"] : []),
    "Review & Create"];
  const totalSteps = stepLabels.length;

  // map logical step to position label index
  const STEP_SELECT_CLIENT = 1;
  const STEP_BATCH_DETAILS = 2;
  const STEP_SERVICES      = 3;
  const STEP_UPLOAD        = 4;
  const STEP_ERRORS        = hasErrors ? 5 : null;
  const STEP_COLL_SETTINGS = collMode==="decentralized" ? (hasErrors ? 6 : 5) : null;
  const STEP_REVIEW        = totalSteps;

  const StepIndicator = () => (
    <div style={{display:"flex",alignItems:"center",marginBottom:32}}>
      {stepLabels.map((label,i)=>{
        const n = i+1;
        const done = n < step;
        const active = n === step;
        return (
          <React.Fragment key={n}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,minWidth:80}}>
              <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                background: done?"#16a34a": active?"#b91c1c":"#e5e7eb",
                color: (done||active)?"white":"#9ca3af", fontWeight:700,fontSize:14,flexShrink:0}}>
                {done ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg> : n}
              </div>
              <span style={{fontSize:11,color:active?"#b91c1c":done?"#374151":"#9ca3af",fontWeight:active?600:400,textAlign:"center",whiteSpace:"nowrap"}}>{label}</span>
            </div>
            {i<stepLabels.length-1 && (
              <div style={{flex:1,height:2,background:done?"#16a34a":"#e5e7eb",margin:"0 4px",marginBottom:18}}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const Footer = ({ backFn, nextFn, nextLabel="Next →", nextDisabled=false, showDraft=false }) => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:32,paddingTop:20,borderTop:"1px solid #f3f4f6"}}>
      <div>
        {backFn && <button onClick={backFn} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>← Back</button>}
      </div>
      <div style={{display:"flex",gap:10}}>
        {showDraft && <button onClick={()=>onDone("draft")} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>}
        <button onClick={onCancel} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={nextFn} disabled={nextDisabled}
          style={{padding:"10px 24px",border:"none",borderRadius:8,background:nextDisabled?"#fca5a5":"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:nextDisabled?"not-allowed":"pointer"}}>
          {nextLabel}
        </button>
      </div>
    </div>
  );

  const Card = ({ children }) => (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px"}}>
      {children}
    </div>
  );

  // ── Step 1: Select Client ──
  const Step1 = () => {
    const filtered = CE_CLIENTS.filter(c=>c.name.toLowerCase().includes(clientSearch.toLowerCase()));
    return (
      <Card>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Select Client</h2>
        <div style={{height:1,background:"#f3f4f6",margin:"16px 0 20px"}}/>
        <div style={{position:"relative",marginBottom:20}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input value={clientSearch} onChange={e=>setClientSearch(e.target.value)} placeholder="Search clients..."
            style={{width:"100%",padding:"10px 12px 10px 36px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{borderBottom:"1px solid #e5e7eb"}}>
            <th style={{width:40,padding:"10px 12px"}}></th>
            {["Client Name","Active Batches","Last Batch",""].map((h,i)=>(
              <th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((c,i)=>(
              <tr key={i} onClick={()=>setClient(c)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:client?.name===c.name?"#fef2f2":"white"}}
                onMouseEnter={e=>{if(client?.name!==c.name)e.currentTarget.style.background="#fafafa";}}
                onMouseLeave={e=>{if(client?.name!==c.name)e.currentTarget.style.background="white";}}>
                <td style={{padding:"14px 12px",textAlign:"center"}}>
                  <div onClick={e=>{e.stopPropagation();setClient(c);}} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${client?.name===c.name?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",margin:"auto"}}>
                    {client?.name===c.name && <div style={{width:9,height:9,borderRadius:"50%",background:"#b91c1c"}}/>}
                  </div>
                </td>
                <td style={{padding:"14px 16px",fontSize:14,color:"#111827",fontWeight:500}}>{c.name}</td>
                <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>{c.activeBatches}</td>
                <td style={{padding:"14px 16px",fontSize:14,color:"#9ca3af"}}>-</td>
                <td style={{padding:"14px 16px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Footer nextFn={()=>setStep(2)} nextDisabled={!client}/>
      </Card>
    );
  };

  // ── Step 2: Batch Details ──
  const Step2 = () => (
    <Card>
      <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Batch Details</h2>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Client: {client?.name}</p>
      <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:8}}>Batch Name *</label>
      <input value={batchName} onChange={e=>setBatchName(e.target.value)} placeholder="January 2026 Graduate Intake"
        style={{width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827",marginBottom:24}}/>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:12}}>Collection Mode</label>
      {[
        {id:"decentralized", title:"Decentralized (Candidate Self-Service)", desc:"You upload Name + Email only. Candidates receive links to submit their own NIN, consent, and all required data."},
      ].map(opt=>{
        const sel = collMode===opt.id;
        return (
          <div key={opt.id} onClick={()=>setCollMode(opt.id)}
            style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 20px",border:`1.5px solid ${sel?"#b91c1c":"#e5e7eb"}`,borderRadius:10,cursor:"pointer",background:sel?"#fef2f2":"white",marginBottom:12}}
            onMouseEnter={e=>{if(!sel){e.currentTarget.style.background="#fafafa";e.currentTarget.style.borderColor="#d1d5db";}}}
            onMouseLeave={e=>{if(!sel){e.currentTarget.style.background="white";e.currentTarget.style.borderColor="#e5e7eb";}}}>
            <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sel?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
              {sel && <div style={{width:9,height:9,borderRadius:"50%",background:"#b91c1c"}}/>}
            </div>
            <div>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{opt.title}</p>
              <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{opt.desc}</p>
            </div>
          </div>
        );
      })}
      <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid #f3f4f6"}}>
        <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:12}}>Batch Setup Option</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          {[
            {id:"new", title:"Start fresh", desc:"Create a new batch from scratch while preserving existing system defaults."},
            {id:"clone", title:"Clone existing batch", desc:"Reuse a prior batch structure, then edit only what is needed."},
          ].map(opt=>{
            const sel = cloneMode === opt.id;
            return (
              <div key={opt.id} onClick={()=>setCloneMode(opt.id)} style={{border:`1.5px solid ${sel?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",background:sel?"#fef2f2":"white"}}>
                <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{opt.title}</p>
                <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{opt.desc}</p>
              </div>
            );
          })}
        </div>
        {cloneMode === "clone" && (
          <div>
            <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:8}}>Source Batch</label>
            <select value={cloneSource} onChange={e=>setCloneSource(e.target.value)} style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",outline:"none"}}>
              <option value="">Select batch to clone…</option>
              {CLONE_SOURCE_BATCHES.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
            </select>
          </div>
        )}
      </div>
      <Footer backFn={()=>setStep(1)} nextFn={()=>setStep(STEP_SERVICES)} nextDisabled={!batchName.trim()||!collMode||(cloneMode==="clone"&&!cloneSource)} showDraft/>
    </Card>
  );

  // ── Step 3: Select Services ──
  const Step3 = () => {
    const toggleService = (name) => setSelectedServices(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
    return (
      <Card>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Select Services</h2>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Choose the services to include in this batch. This replaces the old bundle-led setup and preserves the existing batch structure around direct service selection.</p>
        <div style={{height:1,background:"#f3f4f6",marginBottom:20}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {SERVICE_SELECTION_OPTIONS.map((svc)=>{
            const sel = selectedServices.includes(svc.name);
            return (
              <div key={svc.name} onClick={()=>toggleService(svc.name)} style={{border:`1.5px solid ${sel?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",background:sel?"#fef2f2":"white"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
                  <div>
                    <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{svc.name}</p>
                    <p style={{margin:"0 0 6px",fontSize:12,color:"#6b7280"}}>{svc.category} · SLA {ALL_SERVICES.find(s=>s.name===svc.name)?.sla || "—"}</p>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {svc.nudgeEligible && <span style={{fontSize:11,background:"#eff6ff",color:"#1d4ed8",padding:"2px 8px",borderRadius:999}}>Nudge</span>}
                      {svc.fieldBased && <span style={{fontSize:11,background:"#ecfccb",color:"#3f6212",padding:"2px 8px",borderRadius:999}}>Field</span>}
                      {svc.isScholar && <span style={{fontSize:11,background:"#f5f3ff",color:"#7c3aed",padding:"2px 8px",borderRadius:999}}>Scholar</span>}
                      {svc.mayUseBulkResponse && <span style={{fontSize:11,background:"#fff7ed",color:"#c2410c",padding:"2px 8px",borderRadius:999}}>Bulk response</span>}
                    </div>
                  </div>
                  <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${sel?"#b91c1c":"#d1d5db"}`,background:sel?"#b91c1c":"white"}}/>
                </div>
              </div>
            );
          })}
        </div>
        {hasScholarService && (
          <div style={{marginTop:18,background:"#f8fafc",border:"1px solid #e5e7eb",borderRadius:10,padding:"14px 16px"}}>
            <p style={{margin:"0 0 6px",fontSize:13,fontWeight:600,color:"#374151"}}>Scholar / VA intake impact</p>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Because VA coverage is expanding, candidate-crowdsourced academic records will increase and scholar verifications will collect the institution, registrar, exams & records, and related academic-routing data up front.</p>
          </div>
        )}
        <Footer backFn={()=>setStep(STEP_BATCH_DETAILS)} nextFn={()=>setStep(STEP_UPLOAD)} nextDisabled={selectedServices.length===0} showDraft/>
      </Card>
    );
  };

  // ── Step 4: Upload Candidates ──
  const Step4 = () => {
    const simulateUpload = () => {
      const info = { name:"Estate Database - Estate Database.csv", total:50, valid:48, errors:2, dupes:0 };
      setFileInfo(info);
      setHasErrors(info.errors > 0);
    };
    const nextStep = () => {
      if (hasErrors) setStep(STEP_ERRORS);
      else if (collMode==="decentralized") setStep(STEP_COLL_SETTINGS);
      else setStep(STEP_REVIEW);
    };
    const reqCols = buildRequiredColumns().join(", ");
    const optCols = buildOptionalColumns().join(", ");
    return (
      <Card>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Upload Candidates</h2>
        <p style={{margin:"0 0 2px",fontSize:13,color:"#6b7280"}}>Client: {client?.name}</p>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Mode: {collMode==="decentralized"?"Decentralized":"DIY"}</p>
        <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
        <div style={{border:"2px dashed #d1d5db",borderRadius:12,padding:"48px 32px",textAlign:"center",marginBottom:16,background:"#fafafa"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" style={{margin:"0 auto 12px"}}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          <p style={{margin:"0 0 16px",fontSize:14,color:"#6b7280"}}>Drag CSV file here or click to browse</p>
          <div style={{display:"flex",gap:10,justifyContent:"center"}}>
            <button onClick={simulateUpload} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>Choose File</button>
            <button style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>Download Template</button>
          </div>
        </div>
        {fileInfo && (
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"16px 20px",marginBottom:16,background:"#f8fafc"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:13,fontWeight:600,color:"#374151"}}>{fileInfo.name} <span style={{color:"#6b7280",fontWeight:400,cursor:"pointer"}}>[Remove]</span></span>
              <span style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>✓ {fileInfo.total} rows processed</span>
            </div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>• Total rows: {fileInfo.total}</p>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>• Valid: {fileInfo.valid}</p>
            {fileInfo.errors>0 && <p style={{margin:"0 0 4px",fontSize:13,color:"#b91c1c"}}>• Errors: {fileInfo.errors}</p>}
            <p style={{margin:0,fontSize:13,color:"#374151"}}>• Duplicates (skipped): {fileInfo.dupes}</p>
          </div>
        )}
        <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><strong>Required columns:</strong> {reqCols}</p>
        <p style={{margin:"0 0 10px",fontSize:13,color:"#374151"}}><strong>Optional columns:</strong> {optCols}</p>
        {hasScholarService && (
          <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"12px 14px",marginBottom:18}}>
            <p style={{margin:"0 0 6px",fontSize:13,fontWeight:600,color:"#92400e"}}>Academic / scholar intake required</p>
            <p style={{margin:0,fontSize:13,color:"#92400e"}}>Candidate-crowdsourced institution records must now include registrar email, exams & records email, payment-required clues for local institutions, and portal / institution email clues for foreign institutions where known.</p>
          </div>
        )}
        <Footer backFn={()=>setStep(STEP_SERVICES)} nextFn={nextStep} nextDisabled={!fileInfo} showDraft/>
      </Card>
    );
  };

  // ── Step 5: Review Errors (conditional) ──
  const StepErrors = () => (
    <Card>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
        <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>Review Errors</h2>
        <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Download CSV
        </button>
      </div>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>2 rows have errors. Fix and re-upload, or continue with valid rows only.</p>
      <div style={{height:1,background:"#f3f4f6",marginBottom:20}}/>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:20}}>
        <thead><tr style={{borderBottom:"1px solid #e5e7eb"}}>
          {["Row","Field","Error"].map((h,i)=><th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151"}}>{h}</th>)}
        </tr></thead>
        <tbody>
          <tr style={{borderBottom:"1px solid #f3f4f6"}}>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>12</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>Email</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#b91c1c"}}>Invalid email format</td>
          </tr>
          <tr>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>34</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>Email</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#b91c1c"}}>Missing required field</td>
          </tr>
        </tbody>
      </table>
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"14px 16px",marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14" style={{marginRight:6,verticalAlign:"middle"}}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          Valid rows: 48 - Will be added to batch
        </p>
        <p style={{margin:0,fontSize:13,color:"#374151"}}>Error rows: 2 - Will be excluded</p>
      </div>
      <Footer backFn={()=>setStep(STEP_UPLOAD)} nextFn={()=>setStep(collMode==="decentralized" ? STEP_COLL_SETTINGS : STEP_REVIEW)} nextLabel="Continue with Valid →" showDraft/>
    </Card>
  );

  // ── Step 6: Collection Settings (decentralized only) ──
  const StepCollSettings = () => (
    <Card>
      <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Collection Settings</h2>
      <p style={{margin:"0 0 2px",fontSize:13,color:"#6b7280"}}>Client: {client?.name}</p>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Mode: Decentralized</p>
      <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:8}}>Submission Deadline</label>
      <select value={subDeadline} onChange={e=>setSubDeadline(e.target.value)}
        style={{padding:"9px 36px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",cursor:"pointer",marginBottom:6,outline:"none",appearance:"none",
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",backgroundSize:"16px"}}>
        {["3","5","7","10","14"].map(d=><option key={d} value={d}>{d} days</option>)}
      </select>
      <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>(Max: 14 days)</p>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:8}}>Link Expiry</label>
      <select value={linkExpiry} onChange={e=>setLinkExpiry(e.target.value)}
        style={{padding:"9px 36px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",cursor:"pointer",marginBottom:6,outline:"none",appearance:"none",
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",backgroundSize:"16px"}}>
        {["3","5","7","10","14","21","30"].map(d=><option key={d} value={d}>{d} days</option>)}
      </select>
      <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>(Max: 30 days)</p>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:4}}>Automatic Reminders</label>
      <p style={{margin:"0 0 12px",fontSize:13,color:"#6b7280"}}>Add the days (after link is sent) when reminders should be sent.</p>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:reminders.length?12:0}}>
        <input value={reminderInput} onChange={e=>setReminderInput(e.target.value)} type="number" min="1"
          style={{width:160,padding:"9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",color:"#374151"}}/>
        <button onClick={()=>{if(reminderInput)setReminders(p=>[...p,reminderInput]);setReminderInput("");}}
          style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#374151",color:"white",fontSize:14,fontWeight:500,cursor:"pointer"}}>Add</button>
      </div>
      {reminders.length>0 && (
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:4}}>
          {reminders.map((r,i)=>(
            <span key={i} style={{padding:"4px 12px",background:"#f3f4f6",borderRadius:20,fontSize:13,color:"#374151",display:"flex",alignItems:"center",gap:6}}>
              Day {r}
              <button onClick={()=>setReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:14,padding:0,lineHeight:1}}>×</button>
            </span>
          ))}
        </div>
      )}
      <Footer backFn={()=>setStep(hasErrors?STEP_ERRORS:STEP_UPLOAD)} nextFn={()=>setStep(STEP_REVIEW)} showDraft/>
    </Card>
  );

  // ── Step 6: Review & Create ──
  const StepReview = () => {
    const candidates = fileInfo ? fileInfo.valid : 0;
    const totalLoad = candidates;
    return (
      <Card>
        <h2 style={{margin:"0 0 20px",fontSize:18,fontWeight:700,color:"#111827"}}>Review Batch Details</h2>
        <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
          {[
            {label:"Client",      val:client?.name},
            {label:"Batch Name",  val:batchName},
            {label:"Collection Mode", val:collMode==="decentralized"?"Decentralized":"DIY"},
            {label:"Setup", val:cloneMode==="clone" ? `Cloned from ${cloneSourceObj?.batch || "selected batch"}` : "Created fresh"},
            {label:"Services", val:selectedServices.join(", ") || "—"},
          ].map(({label,val},i)=>(
            <div key={i} style={{padding:"16px 0",borderBottom:"1px solid #f3f4f6"}}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500,textTransform:"uppercase",letterSpacing:.4}}>{label}</p>
              <p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{val}</p>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,marginTop:0}}>
          {[
            {label:"Candidates",  val:candidates},
            {label:"Services Selected", val:selectedServices.length},
            {label:"Total Load",  val:`${Math.max(totalLoad,1) * Math.max(selectedServices.length,1)} tasks`},
            ...(collMode==="decentralized"?[
              {label:"Submission Deadline", val:`${subDeadline} days`},
              {label:"Link Expiry",         val:`${linkExpiry} days`},
              {label:"Reminders",           val:reminders.length?reminders.map(r=>`Day ${r}`).join(", "):"None"},
            ]:[]),
          ].map(({label,val},i)=>(
            <div key={i} style={{padding:"16px 0",borderBottom:"1px solid #f3f4f6"}}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500,textTransform:"uppercase",letterSpacing:.4}}>{label}</p>
              <p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{val}</p>
            </div>
          ))}
        </div>
        {/* Success modal */}
        {success && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
            <div style={{background:"white",borderRadius:16,padding:"48px 40px",width:400,textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:"#f0fdf4",border:"2px solid #bbf7d0",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="32" height="32"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 style={{margin:"0 0 8px",fontSize:22,fontWeight:700,color:"#111827"}}>Success</h2>
              <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280"}}>Links sent successfully.</p>
              <button onClick={()=>onDone("sent")} style={{width:"100%",padding:14,background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:16,cursor:"pointer"}}>Done</button>
            </div>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:32,paddingTop:20,borderTop:"1px solid #f3f4f6"}}>
          <button onClick={()=>setStep(collMode==="decentralized" ? STEP_COLL_SETTINGS : (hasErrors ? STEP_ERRORS : STEP_UPLOAD))} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>← Back</button>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>onDone("draft")} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>
            <button onClick={()=>setSuccess(true)} style={{padding:"10px 24px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>
              {collMode==="decentralized"?"Send Links":"Create Batch"}
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#6b7280",marginBottom:20}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <ChevronRight/>
        <span style={{cursor:"pointer"}} onClick={onCancel}>Batches</span>
        <ChevronRight/>
        <span style={{color:"#111827",fontWeight:500}}>{cloneMode === "clone" ? "Clone Batch" : "Create"}</span>
      </div>
      <h1 style={{margin:"0 0 12px",fontSize:22,fontWeight:800,color:"#111827",letterSpacing:-.5}}>{cloneMode === "clone" ? "CLONE BATCH" : "CREATE BATCH"}</h1>
      {cloneMode === "clone" && <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Only the selected setup elements are being reused. Existing flow logic and downstream screens remain intact.</p>}
      <StepIndicator/>
      {step===STEP_SELECT_CLIENT && <Step1/>}
      {step===STEP_BATCH_DETAILS && <Step2/>}
      {step===STEP_SERVICES      && <Step3/>}
      {step===STEP_UPLOAD        && <Step4/>}
      {step===STEP_ERRORS        && <StepErrors/>}
      {step===STEP_COLL_SETTINGS && <StepCollSettings/>}
      {step===STEP_REVIEW        && <StepReview/>}
    </div>
  );
}

// ─── CE Dashboard Shell ───────────────────────────────────────────────────────

function ReturnFixDrawer({ item, onClose, onResubmit }) {
  const [confirm, setConfirm] = useState(false);
  // Field values — pre-populated from existing data, CE edits them
  const [fixNote, setFixNote] = useState("");
  const [field1,  setField1]  = useState(
    item.mode==="Email"  ? item.candidate + "@corrected-domain.com" :
    item.mode==="Field"  ? "12B Corrected Street, Lagos" :
    item.mode==="Phone"  ? "+234-801-000-0000" : ""
  );
  const fieldLabel =
    item.mode==="Email"  ? "Corrected Email Address" :
    item.mode==="Field"  ? "Corrected Address" :
    item.mode==="Phone"  ? "Corrected Phone Number" : "Correction";

  const handleResubmit = () => {
    if (!fixNote.trim() || !field1.trim()) return;
    setConfirm(true);
  };
  const handleConfirm = () => { setConfirm(false); onResubmit(item); };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:460,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>FIX RETURNED TASK</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>

        {/* Issue context */}
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"14px 16px",marginBottom:20}}>
          <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:"#b91c1c",letterSpacing:.5}}>ISSUE FLAGGED BY VO</p>
          <p style={{margin:0,fontSize:14,color:"#111827",lineHeight:1.6}}>{item.issue}</p>
        </div>

        {/* Task details */}
        <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"14px 16px",marginBottom:20}}>
          {[
            ["Candidate",  item.candidate],
            ["Batch",      item.batch],
            ["ServMode",   item.servform],
            ["Mode",       item.mode],
            ["SLA",        item.sla],
          ].map(([l,v])=>(
            <div key={l} style={{display:"flex",marginBottom:6}}>
              <span style={{width:100,fontSize:12,color:"#9ca3af",fontWeight:600,flexShrink:0}}>{l.toUpperCase()}</span>
              <span style={{fontSize:13,color:"#374151",fontWeight:500}}>{v}</span>
            </div>
          ))}
        </div>

        {/* Fix fields */}
        <p style={{margin:"0 0 6px",fontSize:13,fontWeight:700,color:"#374151"}}>YOUR CORRECTIONS</p>
        <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>{fieldLabel} *</label>
        <input value={field1} onChange={e=>setField1(e.target.value)}
          style={{width:"100%",padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",boxSizing:"border-box",color:"#111827",marginBottom:14}}/>
        <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Fix Note to VO *</label>
        <textarea value={fixNote} onChange={e=>setFixNote(e.target.value)}
          placeholder="Explain what you corrected and why..."
          rows={4} style={{width:"100%",padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",boxSizing:"border-box",color:"#111827",resize:"vertical",marginBottom:20}}/>

        {/* Resubmit CTA */}
        <button onClick={handleResubmit} disabled={!fixNote.trim()||!field1.trim()}
          style={{padding:"11px",border:"none",borderRadius:8,background:(!fixNote.trim()||!field1.trim())?"#fca5a5":"#1d4ed8",color:"white",fontSize:14,fontWeight:700,cursor:(!fixNote.trim()||!field1.trim())?"not-allowed":"pointer",marginTop:"auto"}}>
          Resubmit to VO →
        </button>
      </div>

      {/* Confirm modal */}
      {confirm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,padding:"28px 32px",width:"90%",maxWidth:400,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <h3 style={{margin:"0 0 10px",fontSize:17,fontWeight:700,color:"#111827"}}>Confirm Resubmit</h3>
            <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280",lineHeight:1.6}}>Are you sure you want to resubmit this task to the VO? The task will be removed from your Returns queue.</p>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setConfirm(false)} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
              <button onClick={handleConfirm} style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#1d4ed8",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Resubmit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReturnsTab({ search, rows, onResubmit }) {
  const data = rows || BATCH_RETURNS;
  const [clientFilter, setClientFilter] = useState("All Clients");
  const [filterOpen,   setFilterOpen]   = useState(false);
  const [fixItem,      setFixItem]       = useState(null);

  const clients = ["All Clients", ...Array.from(new Set(data.map(r=>r.client)))];

  const filtered = data.filter(r => {
    const matchSearch =
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.batch.toLowerCase().includes(search.toLowerCase()) ||
      r.candidate.toLowerCase().includes(search.toLowerCase()) ||
      r.servform.toLowerCase().includes(search.toLowerCase());
    const matchClient = clientFilter==="All Clients" || r.client===clientFilter;
    return matchSearch && matchClient;
  });

  return (
    <>
      {/* Client filter row */}
      <div style={{padding:"12px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"flex-end",position:"relative"}}>
        <div onClick={()=>setFilterOpen(p=>!p)}
          style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"8px 14px",fontSize:14,color:"#374151",cursor:"pointer",minWidth:180,justifyContent:"space-between",background:"white",userSelect:"none"}}>
          {clientFilter} <ChevronDown/>
        </div>
        {filterOpen && (
          <div style={{position:"absolute",top:52,right:20,background:"white",border:"1px solid #e5e7eb",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",zIndex:100,minWidth:220,overflow:"hidden"}}>
            {clients.map(c=>(
              <div key={c} onClick={()=>{setClientFilter(c);setFilterOpen(false);}}
                style={{padding:"11px 16px",fontSize:14,color:c===clientFilter?"#b91c1c":"#374151",fontWeight:c===clientFilter?600:400,cursor:"pointer",background:"white",borderBottom:"1px solid #f3f4f6"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                {c===clientFilter ? "✓ " : "   "}{c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#fafafa"}}>
          {["Client","Batch","ServMode","Mode","Candidate","Issue","SLA Remaining","Action"].map((h,i)=>(
            <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {filtered.map((r,i)=>(
            <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
              onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
              onMouseLeave={e=>e.currentTarget.style.background="white"}>
              <td style={{padding:"16px 20px",fontSize:14,color:"#111827",fontWeight:500}}>{r.client}</td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.batch}</td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151",fontWeight:500}}>{r.servform}</td>
              <td style={{padding:"16px 20px"}}>
                <span style={{padding:"3px 10px",background:"#f3f4f6",color:"#374151",borderRadius:20,fontSize:12,fontWeight:500,border:"1px solid #e5e7eb"}}>{r.mode}</span>
              </td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.candidate}</td>
              <td style={{padding:"16px 20px",fontSize:13,color:"#6b7280",maxWidth:240}}>{r.issue}</td>
              <td style={{padding:"16px 20px"}}>
                <span style={{padding:"4px 10px",background:r.slaOver?"#fef2f2":"#f0fdf4",color:r.slaOver?"#dc2626":"#16a34a",borderRadius:20,fontSize:12,fontWeight:600,border:`1px solid ${r.slaOver?"#fecaca":"#bbf7d0"}`}}>
                  {r.sla}
                </span>
              </td>
              <td style={{padding:"16px 20px"}}>
                <button onClick={()=>setFixItem(r)} style={{padding:"7px 18px",background:"#1d4ed8",color:"white",border:"none",borderRadius:6,fontSize:13,fontWeight:600,cursor:"pointer"}}>Fix</button>
              </td>
            </tr>
          ))}
          {filtered.length===0 && (
            <tr><td colSpan={8} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No returned tasks found.</td></tr>
          )}
        </tbody>
      </table>

      {/* Fix drawer */}
      {fixItem && (
        <ReturnFixDrawer
          item={fixItem}
          onClose={()=>setFixItem(null)}
          onResubmit={(item)=>{ onResubmit && onResubmit(item); setFixItem(null); }}
        />
      )}
    </>
  );
}

// ─── CE: Help ────────────────────────────────────────────────────────────────
function CEHelp({ user }) {
  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [msgSent, setMsgSent] = useState(false);
  const [message, setMessage] = useState("");

  const STEPS = [
    { n:1, title:"Create a new batch",              desc:"Go to Dashboard and click '+ New Batch'. Fill in client, batch name, select services and upload candidates." },
    { n:2, title:"Set up collection",               desc:"After saving as draft, move the batch to Collection. Set the collection window and share the candidate link." },
    { n:3, title:"Monitor active verifications",    desc:"Once candidates submit, the batch moves to Active. Track progress per candidate and service in real time." },
    { n:4, title:"Review and release in Complete",  desc:"When all verifications are done, the batch enters the Release Workbench. Review each service and release candidate reports to the client." },
    { n:5, title:"View finalized reports",          desc:"Fully released batches move to Finalized. Open Reports to download individual candidate PDF reports." },
  ];

  const FAQS = [
    { q:"How do I clone an existing batch?",              a:"On the Dashboard, click 'Clone Existing' next to '+ New Batch'. Select the source batch and adjust the details as needed." },
    { q:"What does the 'Returns' tab mean?",              a:"Returns are tasks sent back from the Verification Officer (VO) due to data issues — wrong candidate info, missing documents, etc. You'll find them in the Returns tab and need to fix and resubmit." },
    { q:"How do I download a candidate report as PDF?",   a:"Go to Reports in the sidebar, select the batch, click the candidate name, then click 'Download PDF' at the top right of the candidate report screen." },
    { q:"What happens after I archive a batch?",          a:"Archived batches move to Finalized. They are read-only — no further changes can be made. You can still view and download all candidate reports." },
    { q:"How do I add a new client?",                     a:"Go to Admin and use '+ New Client' in the Quick Actions. If you don't have Admin access, contact your System Administrator." },
    { q:"Who do I contact if a VO hasn't responded?",     a:"Use the Remind action in the Active tab to send a reminder. If the issue persists, contact your Manager or raise a support ticket below." },
    { q:"Can I edit a batch after it moves to Active?",   a:"Limited edits are allowed — you can add notes but cannot change services or candidate list once verification has started." },
    { q:"How long does a verification typically take?",   a:"Standard turnaround is 5–14 days depending on the services requested and responsiveness of third parties." },
  ];

  const SHORTCUTS = [
    { key:"Ctrl + K",   action:"Global search" },
    { key:"N",          action:"New batch (on Dashboard)" },
    { key:"← / →",     action:"Switch between tabs" },
    { key:"Esc",        action:"Close modal or drawer" },
    { key:"Enter",      action:"Confirm action in modal" },
  ];

  const filtered = (items, keys) => items.filter(item =>
    !search.trim() || keys.some(k => item[k]?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredSteps    = filtered(STEPS,    ["title","desc"]);
  const filteredFAQs     = filtered(FAQS,     ["q","a"]);
  const filteredShortcuts= filtered(SHORTCUTS, ["key","action"]);

  return (
    <div style={{padding:"28px 32px",maxWidth:860}}>
      {/* Header + search */}
      <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:700,color:"#111827"}}>Help Centre</h1>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Find answers, guides and support for the CE Officer workflow.</p>
      <div style={{position:"relative",marginBottom:36}}>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search help topics..."
          style={{width:"100%",padding:"12px 16px 12px 42px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:15,outline:"none",boxSizing:"border-box",color:"#374151",background:"white"}}/>
      </div>

      {/* Quick Start Guide */}
      {filteredSteps.length > 0 && (
        <div style={{marginBottom:36}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Quick Start Guide</h2>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {filteredSteps.map(s=>(
              <div key={s.n} style={{display:"flex",gap:16,background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 20px",alignItems:"flex-start"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"#b91c1c",color:"white",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{s.n}</div>
                <div>
                  <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{s.title}</p>
                  <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.6}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {filteredFAQs.length > 0 && (
        <div style={{marginBottom:36}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Frequently Asked Questions</h2>
          <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
            {filteredFAQs.map((f,i)=>(
              <div key={i} style={{borderBottom:i<filteredFAQs.length-1?"1px solid #f3f4f6":"none"}}>
                <button onClick={()=>setOpenFAQ(openFAQ===i?null:i)}
                  style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                  <span style={{fontSize:14,fontWeight:500,color:"#111827",paddingRight:16}}>{f.q}</span>
                  <span style={{fontSize:18,color:"#9ca3af",flexShrink:0,transform:openFAQ===i?"rotate(45deg)":"none",transition:"transform .2s"}}>+</span>
                </button>
                {openFAQ===i && (
                  <div style={{padding:"0 20px 16px",fontSize:13,color:"#6b7280",lineHeight:1.7,borderTop:"1px solid #f3f4f6"}}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts */}
      {filteredShortcuts.length > 0 && (
        <div style={{marginBottom:36}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Keyboard Shortcuts</h2>
          <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#fafafa"}}>
                {["Shortcut","Action"].map((h,i)=>(
                  <th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredShortcuts.map((s,i)=>(
                  <tr key={i} style={{borderBottom:i<filteredShortcuts.length-1?"1px solid #f3f4f6":"none"}}>
                    <td style={{padding:"13px 20px"}}>
                      <kbd style={{padding:"3px 10px",background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:5,fontSize:12,fontWeight:600,color:"#374151",fontFamily:"monospace"}}>{s.key}</kbd>
                    </td>
                    <td style={{padding:"13px 20px",fontSize:14,color:"#374151"}}>{s.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Support */}
      {(!search.trim() || "contact support help".includes(search.toLowerCase())) && (
        <div style={{marginBottom:8}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Contact Support</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            {[
              {icon:"✉",label:"Email",value:"support@dragnet.ng"},
              {icon:"☎",label:"Phone",value:"+234-800-DRAGNET"},
            ].map(({icon,label,value})=>(
              <div key={label} style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                <span style={{fontSize:22}}>{icon}</span>
                <div>
                  <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:.4}}>{label.toUpperCase()}</p>
                  <p style={{margin:0,fontSize:14,fontWeight:500,color:"#374151"}}>{value}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Contact form */}
          <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"24px"}}>
            <p style={{margin:"0 0 16px",fontSize:14,fontWeight:600,color:"#111827"}}>Send a Message</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div>
                <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Name</label>
                <input value={user?.name||"Emeka Nwosu"} readOnly style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#6b7280",background:"#f9fafb",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Email</label>
                <input value={user?.email||"emeka@dragnet.ng"} readOnly style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#6b7280",background:"#f9fafb",boxSizing:"border-box"}}/>
              </div>
            </div>
            <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Message</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Describe your issue or question..."
              rows={4} style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",boxSizing:"border-box",outline:"none",resize:"vertical",marginBottom:12}}/>
            {msgSent
              ? <div style={{padding:"10px 16px",background:"#dcfce7",border:"1px solid #86efac",borderRadius:7,color:"#16a34a",fontSize:13,fontWeight:500}}>✓ Message sent! Our support team will respond within 24 hours.</div>
              : <button onClick={()=>{if(message.trim())setMsgSent(true);}}
                  style={{padding:"10px 24px",border:"none",borderRadius:7,background:message.trim()?"#b91c1c":"#fca5a5",color:"white",fontSize:14,fontWeight:600,cursor:message.trim()?"pointer":"not-allowed"}}>
                  Send Message
                </button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CE: Settings ────────────────────────────────────────────────────────────
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

// ─── CE: Reports ─────────────────────────────────────────────────────────────
const REPORT_CANDIDATES = {
  "Acme September Batch": [
    { name:"Amaka Okonkwo",    role:"Senior Analyst",       status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"3 years confirmed at Zenith Bank"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Computer Science, UNILAG confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN and passport match"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Current address confirmed"},
    ]},
    { name:"Tunde Fashola",    role:"Operations Manager",   status:"Flagged", services:[
      {name:"Employment History Verification", outcome:"Discrepancy",   note:"Employment gap Jan–Aug 2022 unaccounted"},
      {name:"Education Verification",          outcome:"Verified",      note:"MBA Lagos Business School confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN confirmed"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Address confirmed"},
    ]},
    { name:"Blessing Eze",     role:"Finance Officer",      status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"5 years at GTBank confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Accounting, OAU confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN confirmed"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Lekki Phase 1 address confirmed"},
    ]},
    { name:"Ngozi Okafor",     role:"HR Business Partner",  status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"4 years at Dangote Group confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Sociology, UNIBEN confirmed"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN and driver's licence match"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Verified",      note:"Address confirmed"},
    ]},
    { name:"Ibrahim Danladi",  role:"IT Security Analyst",  status:"Flagged", services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"2 years at MTN confirmed"},
      {name:"Education Verification",          outcome:"Unverified",    note:"Institution unable to confirm degree"},
      {name:"Identity Verification",           outcome:"Verified",      note:"NIN confirmed"},
      {name:"Criminal Record Check",           outcome:"Verified",      note:"No records found"},
      {name:"Address Verification",            outcome:"Discrepancy",   note:"Address differs from submitted details"},
    ]},
  ],
  "Delta Finance New Hires": [
    { name:"Chidinma Eze",     role:"Credit Analyst",       status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"3 years at Access Bank confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Economics, UNN confirmed"},
      {name:"Reference Check",                 outcome:"Verified",      note:"Two referees responded positively"},
    ]},
    { name:"Emeka Obi",        role:"Relationship Manager", status:"Clean",   services:[
      {name:"Employment History Verification", outcome:"Verified",      note:"5 years at First Bank confirmed"},
      {name:"Education Verification",          outcome:"Verified",      note:"BSc Banking & Finance, ABU confirmed"},
      {name:"Reference Check",                 outcome:"Verified",      note:"Both referees confirmed"},
    ]},
    { name:"Fatima Aliyu",     role:"Risk Officer",         status:"Flagged", services:[
      {name:"Employment History Verification", outcome:"Discrepancy",   note:"Title mismatch — listed as Manager, confirmed as Officer"},
      {name:"Education Verification",          outcome:"Verified",      note:"MSc Finance, UNILAG confirmed"},
      {name:"Reference Check",                 outcome:"Verified",      note:"Referees confirmed with minor note"},
    ]},
  ],
  "Gamma Previous Batch": [
    { name:"Seun Adeyemi",     role:"Software Engineer",    status:"Clean",   services:[
      {name:"Employment History Verification",   outcome:"Verified",    note:"4 years at Andela confirmed"},
      {name:"Education Verification",            outcome:"Verified",    note:"BSc Computer Science, UI confirmed"},
      {name:"Identity Verification",             outcome:"Verified",    note:"NIN confirmed"},
      {name:"Professional License Verification", outcome:"Verified",    note:"AWS certification confirmed"},
      {name:"Social Media Check",                outcome:"Verified",    note:"No adverse findings"},
    ]},
    { name:"Kemi Balogun",     role:"Product Manager",      status:"Clean",   services:[
      {name:"Employment History Verification",   outcome:"Verified",    note:"3 years at Interswitch confirmed"},
      {name:"Education Verification",            outcome:"Verified",    note:"BSc MIS, LASU confirmed"},
      {name:"Identity Verification",             outcome:"Verified",    note:"NIN and international passport match"},
      {name:"Professional License Verification", outcome:"Verified",    note:"PMP certification confirmed"},
      {name:"Social Media Check",                outcome:"Verified",    note:"No adverse findings"},
    ]},
    { name:"Chukwuma Nwosu",   role:"DevOps Engineer",      status:"Flagged", services:[
      {name:"Employment History Verification",   outcome:"Verified",    note:"2 years at SystemSpecs confirmed"},
      {name:"Education Verification",            outcome:"Verified",    note:"BSc Electrical Engineering, FUTA confirmed"},
      {name:"Identity Verification",             outcome:"Verified",    note:"NIN confirmed"},
      {name:"Professional License Verification", outcome:"Discrepancy", note:"Cisco cert listed as CCNP — only CCNA confirmed"},
      {name:"Social Media Check",                outcome:"Verified",    note:"No adverse findings"},
    ]},
  ],
};

function CEReportsList({ onSelectBatch }) {
  const [search, setSearch] = useState("");
  const rows = FINALIZED_BATCHES.filter(b =>
    b.client.toLowerCase().includes(search.toLowerCase()) ||
    b.batch.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{padding:"28px 32px"}}>
      <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Reports</h1>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Select a batch to view and download candidate verification reports.</p>
      <div style={{marginBottom:16,position:"relative",maxWidth:400}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search batches or clients..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["CLIENT","BATCH","CANDIDATES","RELEASED DATE","STATUS",""].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((b,i)=>(
              <tr key={i} onClick={()=>onSelectBatch(b)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{b.client}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.batch}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.candidates}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.released}</td>
                <td style={{padding:"16px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:"#dcfce7",color:"#16a34a"}}>✓ Finalized</span>
                </td>
                <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
            {rows.length===0 && <tr><td colSpan={6} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No batches found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CEReportsBatch({ batch, onBack, onSelectCandidate }) {
  const [search, setSearch] = useState("");
  const candidates = (REPORT_CANDIDATES[batch.batch] || []).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Reports
      </button>
      <div style={{marginBottom:24}}>
        <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#111827"}}>{batch.batch}</h1>
        <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{batch.client} · Released {batch.released} · {batch.candidates} candidates</p>
      </div>
      {/* Summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
        {[
          {label:"Total Candidates", value:batch.candidates,                                                                      color:"#111827"},
          {label:"Clean",           value:(REPORT_CANDIDATES[batch.batch]||[]).filter(c=>c.status==="Clean").length,              color:"#16a34a"},
          {label:"Flagged",         value:(REPORT_CANDIDATES[batch.batch]||[]).filter(c=>c.status==="Flagged").length,            color:"#d97706"},
        ].map(({label,value,color})=>(
          <div key={label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:600,color:"#6b7280",letterSpacing:.4}}>{label.toUpperCase()}</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color}}>{value}</p>
          </div>
        ))}
      </div>
      {/* Search */}
      <div style={{marginBottom:16,position:"relative",maxWidth:400}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search candidates..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>
      {/* Candidates table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["CANDIDATE","ROLE","SERVICES","OVERALL STATUS","ACTION"].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {candidates.map((c,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{c.name}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{c.role}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{c.services.length}</td>
                <td style={{padding:"16px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,
                    background:c.status==="Clean"?"#dcfce7":"#fef3c7",
                    color:c.status==="Clean"?"#16a34a":"#d97706"}}>
                    {c.status==="Clean"?"✓ Clean":"⚠ Flagged"}
                  </span>
                </td>
                <td style={{padding:"16px 20px"}}>
                  <button onClick={()=>onSelectCandidate(c)} style={{padding:"7px 16px",border:"1.5px solid #b91c1c",borderRadius:7,background:"white",color:"#b91c1c",fontSize:13,fontWeight:600,cursor:"pointer"}}>View Report</button>
                </td>
              </tr>
            ))}
            {candidates.length===0 && <tr><td colSpan={5} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No candidates found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CEReportCandidate({ candidate, batch, onBack }) {
  const [showPDF, setShowPDF] = useState(false);
  if (showPDF) return <CEReportPDF candidate={candidate} batch={batch} onClose={()=>setShowPDF(false)}/>;
  const outcomeColor = o => o==="Verified"?"#16a34a":o==="Discrepancy"?"#d97706":"#b91c1c";
  const outcomeIcon  = o => o==="Verified"?"✓":o==="Discrepancy"?"⚠":"✗";
  const outcomeBg    = o => o==="Verified"?"#dcfce7":o==="Discrepancy"?"#fef3c7":"#fee2e2";
  const refNo = "DRG-" + batch.batch.replace(/\s+/g,"").substring(0,4).toUpperCase() + "-" + candidate.name.split(" ")[1]?.toUpperCase().substring(0,3) + "-2024";
  return (
    <div style={{padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> {batch.batch}
      </button>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#111827"}}>{candidate.name}</h1>
          <p style={{margin:"0 0 8px",fontSize:14,color:"#6b7280"}}>{candidate.role} · {batch.client} · {batch.batch}</p>
          <span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,
            background:candidate.status==="Clean"?"#dcfce7":"#fef3c7",
            color:candidate.status==="Clean"?"#16a34a":"#d97706"}}>
            {candidate.status==="Clean"?"✓ Overall: Clean":"⚠ Overall: Flagged — Review Required"}
          </span>
        </div>
        <button onClick={()=>setShowPDF(true)}
          style={{padding:"10px 22px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
          ↓ Download PDF
        </button>
      </div>
      {/* Ref + date */}
      <div style={{background:"#f9fafb",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 20px",marginBottom:20,display:"flex",gap:40}}>
        <div><p style={{margin:"0 0 2px",fontSize:11,color:"#9ca3af",fontWeight:600}}>REPORT REF</p><p style={{margin:0,fontSize:14,fontWeight:600,color:"#374151"}}>{refNo}</p></div>
        <div><p style={{margin:"0 0 2px",fontSize:11,color:"#9ca3af",fontWeight:600}}>GENERATED</p><p style={{margin:0,fontSize:14,fontWeight:600,color:"#374151"}}>{batch.released}</p></div>
        <div><p style={{margin:"0 0 2px",fontSize:11,color:"#9ca3af",fontWeight:600}}>CLIENT</p><p style={{margin:0,fontSize:14,fontWeight:600,color:"#374151"}}>{batch.client}</p></div>
        <div><p style={{margin:"0 0 2px",fontSize:11,color:"#9ca3af",fontWeight:600}}>DELIVERED TO</p><p style={{margin:0,fontSize:14,fontWeight:600,color:"#374151"}}>{batch.deliveredTo}</p></div>
      </div>
      {/* Services breakdown */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:20}}>
        <div style={{padding:"16px 24px",borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>VERIFICATION RESULTS</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["SERVICE","OUTCOME","NOTES / FLAGS"].map((h,i)=>(
              <th key={i} style={{padding:"12px 24px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {candidate.services.map((svc,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:svc.outcome!=="Verified"?"#fffbeb":"white"}}>
                <td style={{padding:"16px 24px",fontSize:14,fontWeight:500,color:"#111827"}}>{svc.name}</td>
                <td style={{padding:"16px 24px"}}>
                  <span style={{padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:600,background:outcomeBg(svc.outcome),color:outcomeColor(svc.outcome)}}>
                    {outcomeIcon(svc.outcome)} {svc.outcome}
                  </span>
                </td>
                <td style={{padding:"16px 24px",fontSize:13,color:"#6b7280"}}>{svc.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Verdict box */}
      <div style={{borderRadius:12,border:`2px solid ${candidate.status==="Clean"?"#86efac":"#fde68a"}`,background:candidate.status==="Clean"?"#f0fdf4":"#fffbeb",padding:"20px 24px"}}>
        <p style={{margin:"0 0 6px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>VERIFICATION VERDICT</p>
        <p style={{margin:0,fontSize:15,fontWeight:600,color:candidate.status==="Clean"?"#16a34a":"#d97706"}}>
          {candidate.status==="Clean"
            ? "All verification checks passed. Candidate is cleared for engagement."
            : "One or more checks returned discrepancies or could not be verified. Please review flagged items before proceeding."}
        </p>
      </div>
    </div>
  );
}

function CEReportPDF({ candidate, batch, onClose }) {
  const outcomeColor = o => o==="Verified"?"#16a34a":o==="Discrepancy"?"#d97706":"#b91c1c";
  const outcomeIcon  = o => o==="Verified"?"✓":o==="Discrepancy"?"⚠":"✗";
  const refNo = "DRG-" + batch.batch.replace(/\s+/g,"").substring(0,4).toUpperCase() + "-" + candidate.name.split(" ")[1]?.toUpperCase().substring(0,3) + "-2024";
  const today = new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"});
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:2000,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"32px 0"}}>
      {/* Toolbar */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:52,background:"#1e293b",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",zIndex:2001}}>
        <span style={{color:"white",fontSize:14,fontWeight:500}}>Verification Report — {candidate.name}</span>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>window.print()} style={{padding:"7px 18px",border:"1px solid rgba(255,255,255,0.3)",borderRadius:7,background:"rgba(255,255,255,0.1)",color:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>Print / Save PDF</button>
          <button onClick={onClose} style={{padding:"7px 18px",border:"none",borderRadius:7,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>✕ Close</button>
        </div>
      </div>
      {/* PDF page */}
      <div style={{width:794,background:"white",marginTop:52,boxShadow:"0 8px 40px rgba(0,0,0,0.3)",fontFamily:"Georgia,serif"}}>
        {/* Letterhead */}
        <div style={{background:"#b91c1c",padding:"28px 48px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:44,height:44,background:"white",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg viewBox="0 0 24 24" fill="#b91c1c" width="26" height="26"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
            </div>
            <div>
              <p style={{margin:0,fontSize:22,fontWeight:700,color:"white",fontFamily:"system-ui,sans-serif",letterSpacing:.5}}>DRAGNET SOLUTIONS</p>
              <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.8)",fontFamily:"system-ui,sans-serif",letterSpacing:1}}>BACKGROUND VERIFICATION SERVICES</p>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.7)",fontFamily:"system-ui,sans-serif"}}>www.dragnet.ng</p>
            <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.7)",fontFamily:"system-ui,sans-serif"}}>info@dragnet.ng · +234-800-DRAGNET</p>
          </div>
        </div>
        {/* Title band */}
        <div style={{background:"#1e293b",padding:"14px 48px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{margin:0,fontSize:15,fontWeight:700,color:"white",fontFamily:"system-ui,sans-serif",letterSpacing:2}}>VERIFICATION REPORT</p>
          <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.7)",fontFamily:"system-ui,sans-serif"}}>Ref: {refNo}</p>
        </div>
        {/* Body */}
        <div style={{padding:"36px 48px"}}>
          {/* Candidate info block */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:28}}>
            {[
              ["Candidate Name",  candidate.name],
              ["Role Applied For",candidate.role],
              ["Client",          batch.client],
              ["Batch Reference", batch.batch],
              ["Report Date",     today],
              ["Delivered To",    batch.deliveredTo],
            ].map(([l,v],i)=>(
              <div key={l} style={{padding:"12px 20px",background:i%2===0?"#f9fafb":"white",borderBottom:"1px solid #e5e7eb"}}>
                <p style={{margin:"0 0 2px",fontSize:10,fontWeight:700,color:"#9ca3af",fontFamily:"system-ui,sans-serif",letterSpacing:.8}}>{l.toUpperCase()}</p>
                <p style={{margin:0,fontSize:13,fontWeight:600,color:"#111827",fontFamily:"system-ui,sans-serif"}}>{v}</p>
              </div>
            ))}
          </div>
          {/* Verdict */}
          <div style={{borderRadius:8,border:`2px solid ${candidate.status==="Clean"?"#86efac":"#fde68a"}`,background:candidate.status==="Clean"?"#f0fdf4":"#fffbeb",padding:"16px 20px",marginBottom:28,display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:32}}>{candidate.status==="Clean"?"✅":"⚠️"}</span>
            <div>
              <p style={{margin:"0 0 2px",fontSize:12,fontWeight:700,color:"#374151",fontFamily:"system-ui,sans-serif",letterSpacing:.5}}>OVERALL VERIFICATION STATUS</p>
              <p style={{margin:0,fontSize:15,fontWeight:700,color:candidate.status==="Clean"?"#16a34a":"#d97706",fontFamily:"system-ui,sans-serif"}}>
                {candidate.status==="Clean" ? "CLEARED — All checks passed" : "FLAGGED — Review required"}
              </p>
            </div>
          </div>
          {/* Results table */}
          <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",fontFamily:"system-ui,sans-serif",letterSpacing:.8}}>VERIFICATION RESULTS BY SERVICE</p>
          <table style={{width:"100%",borderCollapse:"collapse",marginBottom:28,fontFamily:"system-ui,sans-serif"}}>
            <thead>
              <tr style={{background:"#1e293b"}}>
                {["Service","Outcome","Notes / Findings"].map((h,i)=>(
                  <th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:"white",letterSpacing:.5}}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidate.services.map((svc,i)=>(
                <tr key={i} style={{background:i%2===0?"#f9fafb":"white",borderBottom:"1px solid #e5e7eb"}}>
                  <td style={{padding:"11px 16px",fontSize:12,fontWeight:600,color:"#111827"}}>{svc.name}</td>
                  <td style={{padding:"11px 16px"}}>
                    <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:svc.outcome==="Verified"?"#dcfce7":svc.outcome==="Discrepancy"?"#fef3c7":"#fee2e2",color:outcomeColor(svc.outcome)}}>
                      {outcomeIcon(svc.outcome)} {svc.outcome.toUpperCase()}
                    </span>
                  </td>
                  <td style={{padding:"11px 16px",fontSize:12,color:"#6b7280"}}>{svc.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Disclaimer */}
          <div style={{borderTop:"1px solid #e5e7eb",paddingTop:20}}>
            <p style={{margin:"0 0 6px",fontSize:10,fontWeight:700,color:"#9ca3af",fontFamily:"system-ui,sans-serif",letterSpacing:.5}}>DISCLAIMER</p>
            <p style={{margin:0,fontSize:10,color:"#9ca3af",lineHeight:1.6,fontFamily:"system-ui,sans-serif"}}>
              This report was prepared by Dragnet Solutions Limited based on information obtained from third-party sources during the verification process. The findings are accurate as of the date of verification. Dragnet Solutions accepts no liability for decisions made based on this report. This document is confidential and intended solely for the named client.
            </p>
          </div>
        </div>
        {/* Footer */}
        <div style={{background:"#f8fafc",borderTop:"1px solid #e5e7eb",padding:"16px 48px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{margin:0,fontSize:10,color:"#9ca3af",fontFamily:"system-ui,sans-serif"}}>© {new Date().getFullYear()} Dragnet Solutions Limited. All rights reserved.</p>
          <p style={{margin:0,fontSize:10,color:"#9ca3af",fontFamily:"system-ui,sans-serif"}}>VeriPort · Ref: {refNo}</p>
        </div>
      </div>
    </div>
  );
}

// ─── CE: Finalized Batches ────────────────────────────────────────────────────
const FINALIZED_BATCHES = [
  {
    client:"Acme Corporation Limited", batch:"Acme September Batch",
    candidates:32, released:"Sep 26, 2024", duration:"8 days", deliveredTo:"Chike Eze",
    services:[
      {name:"Employment History Verification", total:32, completed:32, released:32, queried:0},
      {name:"Education Verification",          total:32, completed:32, released:32, queried:0},
      {name:"Identity Verification",           total:32, completed:32, released:32, queried:0},
      {name:"Criminal Record Check",           total:32, completed:32, released:32, queried:0},
      {name:"Address Verification",            total:32, completed:32, released:32, queried:0},
    ],
  },
  {
    client:"Delta Financial Services", batch:"Delta Finance New Hires",
    candidates:24, released:"Sep 30, 2024", duration:"14 days", deliveredTo:"Amara Obi",
    services:[
      {name:"Employment History Verification", total:24, completed:24, released:24, queried:0},
      {name:"Education Verification",          total:24, completed:24, released:24, queried:0},
      {name:"Reference Check",                 total:24, completed:24, released:24, queried:0},
    ],
  },
  {
    client:"Gamma Technologies Ltd", batch:"Gamma Previous Batch",
    candidates:48, released:"Oct 04, 2024", duration:"9 days", deliveredTo:"Funmi Adeyemi",
    services:[
      {name:"Employment History Verification",   total:48, completed:48, released:48, queried:0},
      {name:"Education Verification",            total:48, completed:48, released:48, queried:0},
      {name:"Identity Verification",             total:48, completed:48, released:48, queried:0},
      {name:"Professional License Verification", total:48, completed:48, released:48, queried:0},
      {name:"Social Media Check",                total:48, completed:48, released:48, queried:0},
    ],
  },
];

function FinalizedList({ onViewBatch }) {
  const [search, setSearch] = useState("");
  const rows = FINALIZED_BATCHES.filter(b =>
    b.client.toLowerCase().includes(search.toLowerCase()) ||
    b.batch.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>Finalized Batches</h1>
        <span style={{fontSize:13,color:"#6b7280"}}>{FINALIZED_BATCHES.length} batches fully released</span>
      </div>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>All candidate reports have been released to the client. No further action required.</p>

      {/* Summary stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
        {[
          {label:"Finalized Batches", value:FINALIZED_BATCHES.length, color:"#111827"},
          {label:"Total Candidates Released", value:FINALIZED_BATCHES.reduce((a,b)=>a+b.candidates,0), color:"#16a34a"},
          {label:"Total Services Delivered", value:FINALIZED_BATCHES.reduce((a,b)=>a+b.services.length,0), color:"#3b82f6"},
        ].map(({label,value,color})=>(
          <div key={label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{label.toUpperCase()}</p>
            <p style={{margin:0,fontSize:32,fontWeight:700,color}}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{marginBottom:16,position:"relative",maxWidth:400}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search batches..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>

      {/* Table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["CLIENT","BATCH","CANDIDATES","SERVICES","RELEASED DATE","DURATION","DELIVERED TO",""].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((b,i)=>(
              <tr key={i} onClick={()=>onViewBatch(b)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,color:"#111827",fontWeight:500}}>{b.client}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.batch}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.candidates}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.services.length}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.released}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.duration}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.deliveredTo}</td>
                <td style={{padding:"16px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:"#dcfce7",color:"#16a34a"}}>✓ Released</span>
                </td>
              </tr>
            ))}
            {rows.length===0 && (
              <tr><td colSpan={8} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No finalized batches found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FinalizedDetail({ batch, onBack }) {
  const totalCandidates = batch.candidates;
  const totalServices = batch.services.length;
  return (
    <div style={{padding:"28px 32px"}}>
      {/* Back */}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Finalized Batches
      </button>

      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#111827"}}>{batch.batch}</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{batch.client} · Released {batch.released} · {batch.duration}</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <span style={{padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:600,background:"#dcfce7",color:"#16a34a",display:"flex",alignItems:"center",gap:6}}>✓ Fully Released</span>
          <button style={{padding:"9px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Download Report</button>
        </div>
      </div>

      {/* Overall stats bar */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 28px",marginBottom:20,marginTop:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:600,color:"#374151"}}>Overall Release Progress</span>
          <div style={{display:"flex",gap:32}}>
            {[
              {label:"Total",     value:totalCandidates, color:"#111827"},
              {label:"Released",  value:totalCandidates, color:"#16a34a"},
              {label:"Queried",   value:0,               color:"#d97706"},
              {label:"Delivered", value:batch.deliveredTo,color:"#374151"},
            ].map(({label,value,color})=>(
              <div key={label} style={{textAlign:"center"}}>
                <p style={{margin:"0 0 2px",fontSize:18,fontWeight:700,color}}>{value}</p>
                <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{height:8,background:"#e5e7eb",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:"100%",background:"#16a34a",borderRadius:4}}/>
        </div>
      </div>

      {/* Service breakdown */}
      <div style={{marginBottom:20}}>
        <h2 style={{margin:"0 0 14px",fontSize:16,fontWeight:700,color:"#111827"}}>Service Breakdown</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {batch.services.map((svc,i)=>(
            <div key={i} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 20px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827",flex:1,paddingRight:8}}>{svc.name}</p>
                <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:"#dcfce7",color:"#16a34a",flexShrink:0}}>Complete</span>
              </div>
              <div style={{height:4,background:"#e5e7eb",borderRadius:2,overflow:"hidden",marginBottom:12}}>
                <div style={{height:"100%",width:"100%",background:"#16a34a",borderRadius:2}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4}}>
                {[
                  {label:"Total",     value:svc.total,     color:"#111827"},
                  {label:"Completed", value:svc.completed, color:"#374151"},
                  {label:"Released",  value:svc.released,  color:"#16a34a"},
                  {label:"Queried",   value:svc.queried,   color:svc.queried>0?"#d97706":"#9ca3af"},
                ].map(({label,value,color})=>(
                  <div key={label} style={{textAlign:"center"}}>
                    <p style={{margin:"0 0 2px",fontSize:16,fontWeight:700,color}}>{value}</p>
                    <p style={{margin:0,fontSize:11,color:"#9ca3af"}}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery info */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
        <h2 style={{margin:"0 0 16px",fontSize:14,fontWeight:700,color:"#374151",letterSpacing:.5}}>DELIVERY INFORMATION</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {[
            {label:"Client",         value:batch.client},
            {label:"Delivered To",   value:batch.deliveredTo},
            {label:"Release Date",   value:batch.released},
            {label:"Turnaround",     value:batch.duration},
          ].map(({label,value})=>(
            <div key={label}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500}}>{label}</p>
              <p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CEShell({ user, activeProfile, onSwitchProfile, onSignOut, ceReturns }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("drafts");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedActive, setSelectedActive] = useState(null);
  const [selectedComplete, setSelectedComplete] = useState(null);
  const [selectedFinalized, setSelectedFinalized] = useState(null);
  const [reportBatch, setReportBatch] = useState(null);
  const [reportCandidate, setReportCandidate] = useState(null);
  const tabs = ["drafts","collection","active","complete","returns"];
  const [showWizardMode, setShowWizardMode] = useState(null);
  const tabCount = { drafts: 3, collection: 3, active: 3, complete: 3, returns: (ceReturns||BATCH_RETURNS).length };
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
              {CE_NAV.map(item=>(
                <button key={item.label} onClick={()=>setActiveNav(item.label)}
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
        <div style={{flex:1,overflowY:"auto"}}>
          {/* Settings page */}
          {activeNav==="Settings" && <CESettings user={user}/>}
          {/* Help page */}
          {activeNav==="Help" && <CEHelp user={user}/>}
          {/* Reports page */}
          {activeNav==="Reports" && !reportBatch && <CEReportsList onSelectBatch={(b)=>{setReportBatch(b);setReportCandidate(null);}}/>}
          {activeNav==="Reports" && reportBatch && !reportCandidate && <CEReportsBatch batch={reportBatch} onBack={()=>setReportBatch(null)} onSelectCandidate={(c)=>setReportCandidate(c)}/>}
          {activeNav==="Reports" && reportBatch && reportCandidate && <CEReportCandidate candidate={reportCandidate} batch={reportBatch} onBack={()=>setReportCandidate(null)}/>}
          {/* Finalized page */}
          {activeNav==="Finalized" && !selectedFinalized && <FinalizedList onViewBatch={(b)=>setSelectedFinalized(b)}/>}
          {activeNav==="Finalized" && selectedFinalized && <FinalizedDetail batch={selectedFinalized} onBack={()=>setSelectedFinalized(null)}/>}
          {/* ── Dashboard content ── */}
          {activeNav==="Dashboard" && (<>
          {showWizardMode && <CreateBatchWizard initialClone={showWizardMode === "clone"} onCancel={()=>setShowWizardMode(null)} onDone={(type)=>{setShowWizardMode(null);setActiveTab("drafts");}}/>}
          {/* Detail screens - full-screen replacements */}
          {!showWizardMode && activeTab==="drafts"     && selectedDraft      && <DraftDetail      batch={selectedDraft}      onBack={()=>setSelectedDraft(null)}/>}
          {!showWizardMode && activeTab==="collection" && selectedCollection && <CollectionDetail batch={selectedCollection} onBack={()=>setSelectedCollection(null)}/>}
          {!showWizardMode && activeTab==="active"     && selectedActive     && <ActiveDetail     batch={selectedActive}     onBack={()=>setSelectedActive(null)}/>}
          {!showWizardMode && activeTab==="complete"   && selectedComplete   && <CompleteDetail   batch={selectedComplete}   onBack={()=>setSelectedComplete(null)}/>}

          {/* List view - only shown when no batch selected */}
          {!showWizardMode && !selectedDraft && !selectedCollection && !selectedActive && !selectedComplete && (
            <>
            <div style={{padding:"28px 32px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
                <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>Client Engagement</h1>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setShowWizardMode("new")} style={{padding:"10px 20px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>+ New Batch</button>
                  <button onClick={()=>setShowWizardMode("clone")} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:600,color:"#374151",cursor:"pointer"}}>Clone Existing</button>
                </div>
              </div>
              <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
                <div style={{display:"flex",borderBottom:"1px solid #e5e7eb",padding:"0 20px"}}>
                  {tabs.map(t=>{const label=t.charAt(0).toUpperCase()+t.slice(1);const isActive=activeTab===t;return(
                    <button key={t} onClick={()=>{setActiveTab(t);setSearch("");}}
                      style={{padding:"14px 16px",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:isActive?600:400,color:isActive?"#b91c1c":"#6b7280",borderBottom:isActive?"2px solid #b91c1c":"2px solid transparent",marginBottom:-1}}>
                      {label} <span style={{fontSize:13,color:isActive?"#b91c1c":"#9ca3af"}}>({tabCount[t]})</span>
                    </button>
                  );})}
                </div>
                {activeTab !== "complete" && (
                <div style={{padding:"16px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",gap:12}}>
                  <div style={{flex:1,position:"relative"}}>
                    <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
                    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
                      style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
                  </div>
                </div>
                )}
                {activeTab==="drafts"     && <DraftsTab     search={search} onRowClick={r=>{setSelectedDraft(r);}}/>}
                {activeTab==="collection" && <CollectionTab search={search} onRowClick={r=>{setSelectedCollection(r);}}/>}
                {activeTab==="active"     && <ActiveTab     search={search} onRowClick={r=>{setSelectedActive(r);}}/>}
                {activeTab==="returns"    && <ReturnsTab    search={search} rows={ceReturns||BATCH_RETURNS} onResubmit={(item)=>{ const updated=(ceReturns||BATCH_RETURNS).filter(r=>r!==item); setCeReturns(updated); }}/>}
              </div>
            </div>
            {activeTab==="complete" && <CompleteTab onArchive={(batch)=>{ setActiveNav("Finalized"); }}/>}
            </>
          )}
          </>)}
          {/* Other nav sections */}
          {activeNav!=="Dashboard" && activeNav!=="Finalized" && activeNav!=="Reports" && activeNav!=="Settings" && activeNav!=="Help" && (
            <div style={{padding:"28px 32px",color:"#9ca3af",fontSize:14}}>{activeNav}{" — coming soon"}</div>
          )}
        </div>
      </div>
    </div>
  );
}



export { CEShell };
