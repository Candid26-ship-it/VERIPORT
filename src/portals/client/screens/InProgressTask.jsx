import BackBtn from "../components/BackBtn.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function InProgressTask({ task, setSelectedTask }) {
  const STEPS = [
    { label:"Request Sent",        done:true,  date:"20 Feb 2026" },
    { label:"Contact Established", done:true,  date:"21 Feb 2026" },
    { label:"Documents Requested", done:true,  date:"22 Feb 2026" },
    { label:"Awaiting Response",   done:false, date:null },
    { label:"Verification Complete",done:false, date:null },
  ];
  return (
    <div style={{padding:"32px"}}>
      <BackBtn label={`Back to ${task.serviceName}`} onClick={()=>setSelectedTask(null)}/>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:680}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>{task.serviceName.toUpperCase()}</p>
          <StatusBadge status="In Progress"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          {[["Candidate",task.candidate],["Employer",task.employer||"—"]].map(([label,value])=>(
            <div key={label}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af"}}>{label}</p>
              <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{value}</p>
            </div>
          ))}
        </div>
        <p style={{margin:"0 0 16px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>VERIFICATION PROGRESS</p>
        <div style={{position:"relative",paddingLeft:28}}>
          <div style={{position:"absolute",left:8,top:8,bottom:8,width:2,background:"#e5e7eb"}}/>
          {STEPS.map((step,i)=>(
            <div key={i} style={{position:"relative",marginBottom:20,display:"flex",alignItems:"flex-start",gap:12}}>
              <div style={{position:"absolute",left:-20,top:2,width:16,height:16,borderRadius:"50%",background:step.done?"#16a34a":"#e5e7eb",border:`2px solid ${step.done?"#16a34a":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1}}>
                {step.done && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="9" height="9"><path d="M20 6L9 17l-5-5"/></svg>}
              </div>
              <div>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:step.done?"#111827":"#9ca3af"}}>{step.label}</p>
                {step.date && <p style={{margin:"2px 0 0",fontSize:12,color:"#9ca3af"}}>{step.date}</p>}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 16px",marginTop:8}}>
          <p style={{margin:0,fontSize:13,color:"#1d4ed8"}}>ⓘ Verification is currently in progress. Results will be available once complete.</p>
        </div>
      </div>
    </div>
  );
}
