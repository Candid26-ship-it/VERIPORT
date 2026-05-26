import { CP_SERVICE_TASKS } from "../data.js";
import BackBtn from "../components/BackBtn.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function BatchDetail({
  batch,
  setSelectedBatch,
  setSelectedService,
  setSelectedTask,
  setSvcFilter,
  setCandSearch,
}) {
  const pct = Math.round((batch.tasksComplete / batch.tasksTotal) * 100);
  const flaggedTotal = batch.serviceCards.reduce((n,s)=>n+s.flagged,0);

  const svcStatus = (svc) => {
    if (svc.flagged > 0) return "Flagged";
    if (svc.status === "Complete") return "Complete";
    if (svc.status === "Pending")  return "Pending";
    return "In Progress";
  };
  const svcBarColor = (svc) => {
    if (svc.flagged > 0) return "#b91c1c";
    if (svc.status === "Complete") return "#16a34a";
    if (svc.status === "Pending")  return "#d1d5db";
    return "#3b82f6";
  };

  return (
    <div style={{padding:"32px"}}>
      <BackBtn label="Back to Dashboard" onClick={()=>setSelectedBatch(null)}/>

      {/* Batch header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{batch.name}</h1>
        <StatusBadge status={batch.status}/>
      </div>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>
        {batch.candidates} candidates &nbsp;|&nbsp; {batch.services} services &nbsp;|&nbsp; Started: {batch.started}
      </p>

      {/* Overall progress */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:24}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:14,fontWeight:600,color:"#374151"}}>Overall Progress</span>
          <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{batch.tasksComplete}/{batch.tasksTotal} tasks ({pct}%)</span>
        </div>
        <div style={{height:10,background:"#f3f4f6",borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:"#b91c1c",borderRadius:99}}/>
        </div>
      </div>

      <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
      <h2 style={{margin:"0 0 16px",fontSize:15,fontWeight:600,color:"#111827"}}>Services</h2>

      {/* Service cards grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
        {batch.serviceCards.map((svc,i)=>{
          const svcPct = Math.round((svc.complete/svc.total)*100);
          const st = svcStatus(svc);
          const taskKey = `${batch.id}-${svc.name}`;
          const hasTaskData = !!CP_SERVICE_TASKS[taskKey];
          return (
            <div key={i}
              onClick={()=>{ setSvcFilter("All"); setCandSearch(""); setSelectedService({batchId:batch.id, batchName:batch.name, batchStatus:batch.status, serviceName:svc.name, svc}); setSelectedTask(null); }}
              style={{background:"white",borderRadius:12,border:`1px solid ${svc.flagged>0?"#fecaca":"#e5e7eb"}`,padding:"20px",cursor:"pointer",transition:"box-shadow .15s"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.08)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <p style={{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#111827"}}>{svc.name}</p>
              {/* Progress bar */}
              <div style={{height:6,background:"#f3f4f6",borderRadius:99,overflow:"hidden",marginBottom:8}}>
                <div style={{height:"100%",width:`${svcPct}%`,background:svcBarColor(svc),borderRadius:99}}/>
              </div>
              <p style={{margin:"0 0 12px",fontSize:13,color:"#374151"}}>{svc.complete}/{svc.total}</p>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {svc.flagged > 0
                  ? <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>⚠ {svc.flagged} flagged</span>
                  : <StatusBadge status={st}/>}
              </div>
            </div>
          );
        })}
      </div>

      {flaggedTotal > 0 && (
        <>
          <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:16}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:14,color:"#b91c1c",fontWeight:600}}>⚠ {flaggedTotal} item{flaggedTotal>1?"s":""} require your attention</span>
            <button
              onClick={()=>{ const svc = batch.serviceCards.find(s=>s.flagged>0); if(svc) { setSelectedService({batchId:batch.id,batchName:batch.name,batchStatus:batch.status,serviceName:svc.name,svc}); setSelectedTask(null); } }}
              style={{padding:"8px 20px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>
              Review Flagged
            </button>
          </div>
        </>
      )}
    </div>
  );
}
