import { useState } from "react";
import { SearchSm, ChevronRight, ChevronLeft } from "../../components/Icons.jsx";
import { BATCH_RETURNS, CE_NAV } from "../../data/index.js";
import { Topbar } from "../../components/Topbar.jsx";
import { FINALIZED_BATCHES } from "./data.js";
import DraftsTab from "./screens/DraftsTab.jsx";
import CollectionTab from "./screens/CollectionTab.jsx";
import ActiveTab from "./screens/ActiveTab.jsx";
import ReturnsTab from "./screens/ReturnsTab.jsx";
import CompleteTab from "./screens/CompleteTab.jsx";
import DraftDetail from "./screens/DraftDetail.jsx";
import CollectionDetail from "./screens/CollectionDetail.jsx";
import ActiveDetail from "./screens/ActiveDetail.jsx";
import CompleteDetail from "./screens/CompleteDetail.jsx";
import CreateBatchWizard from "./screens/CreateBatchWizard.jsx";
import CESettings from "./screens/CESettings.jsx";
import CEHelp from "./screens/CEHelp.jsx";
import CEReportsList from "./screens/CEReportsList.jsx";
import CEReportsBatch from "./screens/CEReportsBatch.jsx";
import CEReportCandidate from "./screens/CEReportCandidate.jsx";

// ─── CE: Finalized Batches ────────────────────────────────────────────────────
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
export default CEShell;
