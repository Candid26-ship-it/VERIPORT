import BackBtn from "../components/BackBtn.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function FlaggedTask({
  task,
  setSelectedTask,
  taskResponses, setTaskResponses,
  discChoice, setDiscChoice,
  discNote, setDiscNote,
}) {
  const d = task.discrepancy;
  const submitted = !!taskResponses[task.responseKey];

  const submit = () => {
    if (!discChoice) return;
    setTaskResponses(prev => ({ ...prev, [task.responseKey]: { choice: discChoice, note: discNote } }));
    setDiscChoice("");
    setDiscNote("");
  };

  return (
    <div style={{padding:"32px"}}>
      <BackBtn label={`Back to ${task.serviceName}`} onClick={()=>setSelectedTask(null)}/>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:720}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>{task.serviceName.toUpperCase()}</p>
          <StatusBadge status="Flagged"/>
        </div>
        {/* Candidate info */}
        {[["Candidate",task.candidate],["Employer",task.employer],["Position Claimed",d.claimed],["Period Claimed",task.result?.periodClaimed||"—"]].map(([label,value])=>(
          <div key={label} style={{display:"flex",padding:"11px 0",borderBottom:"1px solid #f3f4f6"}}>
            <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
            <span style={{fontSize:14,color:"#111827"}}>{value}</span>
          </div>
        ))}
        {/* Discrepancy block */}
        <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,padding:"16px 20px",margin:"20px 0"}}>
          <p style={{margin:"0 0 12px",fontSize:13,fontWeight:700,color:"#9a3412",letterSpacing:.5}}>⚠ DISCREPANCY FOUND</p>
          <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
            <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Issue</span>
            <span style={{fontSize:13,color:"#111827",fontWeight:500}}>{d.issue}</span>
          </div>
          <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
            <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Candidate Claimed</span>
            <span style={{fontSize:13,color:"#111827"}}>{d.claimed}</span>
          </div>
          <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
            <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Employer Confirmed</span>
            <span style={{fontSize:13,color:"#b91c1c",fontWeight:500}}>{d.confirmed}</span>
          </div>
          <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
            <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>HR Contact</span>
            <span style={{fontSize:13,color:"#111827"}}>{d.contact}</span>
          </div>
          <div style={{display:"flex",padding:"8px 0"}}>
            <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Verified On</span>
            <span style={{fontSize:13,color:"#111827"}}>{d.verifiedOn}</span>
          </div>
        </div>

        {submitted ? (
          <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"16px 20px",textAlign:"center"}}>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#15803d"}}>✓ Response Submitted</p>
            <p style={{margin:0,fontSize:13,color:"#374151"}}>Your response has been recorded. The verification team has been notified.</p>
          </div>
        ) : (
          <>
            <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>YOUR RESPONSE REQUIRED</p>
            <p style={{margin:"0 0 16px",fontSize:14,color:"#374151"}}>How would you like to proceed?</p>
            {[
              { value:"accept",    label:"Accept employer's version",       sub:"Proceed with employer data as verified truth" },
              { value:"adverse",   label:"Flag as adverse finding",         sub:"Mark candidate with discrepancy in final report" },
              { value:"investigate",label:"Request further investigation",  sub:"Ask verification team to investigate further" },
            ].map(opt=>(
              <label key={opt.value} onClick={()=>setDiscChoice(opt.value)}
                style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 16px",border:`1.5px solid ${discChoice===opt.value?"#b91c1c":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",marginBottom:10,background:discChoice===opt.value?"#fef2f2":"white"}}>
                <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${discChoice===opt.value?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                  {discChoice===opt.value && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                <div>
                  <p style={{margin:"0 0 2px",fontSize:14,fontWeight:600,color:"#111827"}}>{opt.label}</p>
                  <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{opt.sub}</p>
                </div>
              </label>
            ))}
            <div style={{marginTop:16}}>
              <p style={{margin:"0 0 8px",fontSize:13,fontWeight:500,color:"#374151"}}>Notes (optional)</p>
              <textarea value={discNote} onChange={e=>setDiscNote(e.target.value)}
                style={{width:"100%",height:80,padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,resize:"vertical",boxSizing:"border-box",outline:"none",color:"#374151"}}/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
              <button onClick={()=>setSelectedTask(null)}
                style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,cursor:"pointer",color:"#374151"}}>Cancel</button>
              <button onClick={submit} disabled={!discChoice}
                style={{padding:"9px 24px",border:"none",borderRadius:8,background:discChoice?"#b91c1c":"#e5e7eb",color:discChoice?"white":"#9ca3af",fontSize:13,fontWeight:600,cursor:discChoice?"pointer":"not-allowed"}}>
                Submit Response
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
