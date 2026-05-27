import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "../../../components/Icons.jsx";
import { BATCHES } from "../../../data/index.js";
import { WORKBENCH_SERVICES } from "../data.js";
import ServiceDrillDown from "../components/ServiceDrillDown.jsx";

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

export default CompleteTab;
