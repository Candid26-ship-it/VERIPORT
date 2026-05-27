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

export default CEReportPDF;
