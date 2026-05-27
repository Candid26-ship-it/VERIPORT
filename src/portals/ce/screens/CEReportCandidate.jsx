import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";
import CEReportPDF from "./CEReportPDF.jsx";

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

export default CEReportCandidate;
