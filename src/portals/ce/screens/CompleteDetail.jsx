import { useState } from "react";
import { ChevronLeft, SearchSm } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

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

export default CompleteDetail;
