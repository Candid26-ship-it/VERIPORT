import { SearchSm } from "../../../components/Icons.jsx";
import { CP_SERVICE_TASKS } from "../data.js";
import BackBtn from "../components/BackBtn.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import GatedBanner from "../components/GatedBanner.jsx";

export default function ServiceTasks({
  batchId, batchName, batchStatus, serviceName, svc,
  setSelectedService,
  setSelectedTask,
  svcFilter, setSvcFilter,
  candSearch, setCandSearch,
  taskResponses,
}) {
  const taskKey = `${batchId}-${serviceName}`;
  const serviceData = CP_SERVICE_TASKS[taskKey];
  const isReleased = serviceData?.released || false;
  const tasks = serviceData?.tasks || [];
  const isCardComplete = svc.status === "Complete";

  const filtered = tasks.filter(t => {
    const matchSearch = t.candidate.toLowerCase().includes(candSearch.toLowerCase());
    if (!matchSearch) return false;
    if (isCardComplete || svcFilter === "All") return true;
    if (svcFilter === "Flagged") return t.flagged;
    return t.status === svcFilter;
  });

  return (
    <div style={{padding:"32px"}}>
      <BackBtn label="Back to Batch" onClick={()=>{ setSelectedService(null); setSelectedTask(null); }}/>

      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:4}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{serviceName}</h1>
        <span style={{fontSize:14,fontWeight:600,color:"#374151"}}>{svc.complete}/{svc.total} tasks</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <span style={{fontSize:14,color:"#6b7280"}}>{batchName}</span>
        <StatusBadge status={isReleased ? "Released" : svc.status}/>
      </div>

      {!isReleased && <GatedBanner/>}

      {/* Filter tabs — only for incomplete service cards */}
      {!isCardComplete && (
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          {["All","Complete","In Progress","Flagged","Pending"].map(f=>(
            <button key={f} onClick={()=>setSvcFilter(f)}
              style={{padding:"7px 16px",border:`1.5px solid ${svcFilter===f?"#b91c1c":"#e5e7eb"}`,borderRadius:20,background:svcFilter===f?"#b91c1c":"white",color:svcFilter===f?"white":"#374151",fontSize:13,fontWeight:500,cursor:"pointer"}}>
              {f==="Flagged"?"⚠ Flagged":f}
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      <div style={{position:"relative",maxWidth:360,marginBottom:16}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={candSearch} onChange={e=>setCandSearch(e.target.value)} placeholder="Search candidate..."
          style={{width:"100%",padding:"8px 12px 8px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>

      {/* Task table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Candidate","Employer","Status","Action"].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:i===3?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((t,i)=>{
              const responseKey = `${batchId}-${serviceName}-${t.candidate}`;
              const hasResponse = !!taskResponses[responseKey];
              const isComplete = t.status === "Complete";
              const isInProgress = t.status === "In Progress";
              const isFlagged = t.flagged;
              const canAct = isReleased || isFlagged || isComplete || isInProgress;
              return (
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white",cursor:canAct?"pointer":"default"}}
                  onMouseEnter={e=>{if(canAct)e.currentTarget.style.background="#fafafa";}}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}
                  onClick={()=>{
                    if (isReleased || (isComplete && serviceData?.tasks?.every(tk=>tk.result))) {
                      setSelectedTask({...t, batchId, batchName, serviceName, responseKey});
                    } else if (isComplete) {
                      setSelectedTask({...t, batchId, batchName, serviceName, responseKey, viewMode:"report"});
                    } else if (isInProgress) {
                      setSelectedTask({...t, batchId, batchName, serviceName, responseKey, viewMode:"progress"});
                    } else if (isFlagged) {
                      setSelectedTask({...t, batchId, batchName, serviceName, responseKey});
                    }
                  }}>
                  <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.candidate}</td>
                  <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{t.employer}</td>
                  <td style={{padding:"15px 20px"}}>
                    {isFlagged
                      ? <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>⚠ Flagged</span>
                      : <StatusBadge status={t.status}/>}
                  </td>
                  <td style={{padding:"15px 20px",textAlign:"right"}}>
                    {isComplete
                      ? <span style={{fontSize:13,color:"#b91c1c",fontWeight:600}}>View Report →</span>
                      : isInProgress
                        ? <span style={{fontSize:13,color:"#3b82f6",fontWeight:600}}>View Progress →</span>
                        : isFlagged
                          ? hasResponse
                            ? <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>✓ Responded</span>
                            : <span style={{fontSize:13,color:"#b91c1c",fontWeight:600}}>Review →</span>
                          : <span style={{color:"#9ca3af",fontSize:13}}>—</span>}
                  </td>
                </tr>
              );
            })}
            {filtered.length===0 && <tr><td colSpan={4} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No results found.</td></tr>}
          </tbody>
        </table>
      </div>

      {!isReleased && (
        <p style={{fontSize:13,color:"#6b7280",fontStyle:"italic"}}>
          ⓘ Verification results will be available after the batch is released.
        </p>
      )}
    </div>
  );
}
