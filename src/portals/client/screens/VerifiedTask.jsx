import BackBtn from "../components/BackBtn.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function VerifiedTask({ task, setSelectedTask }) {
  const r = task.result;
  const Row = ({label, value, tag}) => (
    <div style={{display:"flex",padding:"12px 0",borderBottom:"1px solid #f3f4f6",alignItems:"center"}}>
      <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
      <span style={{fontSize:14,color:"#111827",flex:1}}>{value}</span>
      {tag && <span style={{fontSize:12,fontWeight:600,color:tag==="Match"?"#15803d":"#b91c1c",background:tag==="Match"?"#dcfce7":"#fee2e2",padding:"2px 10px",borderRadius:20,border:`1px solid ${tag==="Match"?"#bbf7d0":"#fecaca"}`}}>✓ {tag}</span>}
    </div>
  );
  return (
    <div style={{padding:"32px"}}>
      <BackBtn label={`Back to ${task.serviceName}`} onClick={()=>setSelectedTask(null)}/>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:720}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>{task.serviceName.toUpperCase()}</p>
          <StatusBadge status={r.outcome}/>
        </div>
        {/* Claimed info */}
        <Row label="Candidate"        value={task.candidate}/>
        <Row label="Employer"         value={task.employer}/>
        <Row label="Position Claimed" value={r.positionClaimed}/>
        <Row label="Period Claimed"   value={r.periodClaimed}/>
        <div style={{margin:"20px 0 4px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>VERIFICATION RESULT</div>
        <div style={{borderTop:"1px solid #e5e7eb",marginBottom:4}}/>
        <Row label="Position Verified" value={r.positionVerified} tag={r.positionVerified===r.positionClaimed?"Match":"Mismatch"}/>
        <Row label="Period Verified"   value={r.periodVerified}   tag={r.periodVerified===r.periodClaimed?"Match":"Mismatch"}/>
        <Row label="HR Contact"        value={r.contact}/>
        <Row label="Verified On"       value={r.verifiedOn}/>
        <div style={{padding:"12px 0",display:"flex"}}>
          <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>Notes</span>
          <span style={{fontSize:14,color:"#111827"}}>{r.notes}</span>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:16,maxWidth:720}}>
        <button onClick={()=>setSelectedTask(null)}
          style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
          ← Back to List
        </button>
      </div>
    </div>
  );
}
