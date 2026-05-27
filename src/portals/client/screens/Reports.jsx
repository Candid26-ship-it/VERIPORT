import { SearchSm, ChevronDown } from "../../../components/Icons.jsx";
import { CP_DELIVERED_BATCHES } from "../data.js";
import BackBtn from "../components/BackBtn.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Reports({
  reportSearch, setReportSearch,
  selectedReport, setSelectedReport,
  reportCandidate, setReportCandidate,
  downloadOpen, setDownloadOpen,
  downloadRef,
}) {
  // Level 3: candidate report detail (complete or in-progress)
  if (selectedReport && reportCandidate) {
    const c = reportCandidate;
    if (c.status === "In Progress") {
      const STEPS = [
        { label:"Request Sent",         done:true,  date:"20 Feb 2026" },
        { label:"Contact Established",  done:true,  date:"21 Feb 2026" },
        { label:"Documents Requested",  done:true,  date:"22 Feb 2026" },
        { label:"Awaiting Response",    done:false, date:null },
        { label:"Verification Complete",done:false, date:null },
      ];
      return (
        <div style={{padding:"32px"}}>
          <BackBtn label={`Back to ${selectedReport.batch.name}`} onClick={()=>setReportCandidate(null)}/>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:680}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
              <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>INDIVIDUAL REPORT</p>
              <StatusBadge status="In Progress"/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
              <div><p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af"}}>Candidate</p><p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{c.name}</p></div>
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
    // Complete — full report
    const Row = ({label, value, tag}) => (
      <div style={{display:"flex",padding:"12px 0",borderBottom:"1px solid #f3f4f6",alignItems:"center"}}>
        <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
        <span style={{fontSize:14,color:"#111827",flex:1}}>{value}</span>
        {tag && <span style={{fontSize:12,fontWeight:600,color:tag==="Match"?"#15803d":"#b91c1c",background:tag==="Match"?"#dcfce7":"#fee2e2",padding:"2px 10px",borderRadius:20,border:`1px solid ${tag==="Match"?"#bbf7d0":"#fecaca"}`}}>✓ {tag}</span>}
      </div>
    );
    const r = c.result;
    return (
      <div style={{padding:"32px"}}>
        <BackBtn label={`Back to ${selectedReport.batch.name}`} onClick={()=>setReportCandidate(null)}/>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:720}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>INDIVIDUAL REPORT</p>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <StatusBadge status={r.outcome}/>
              <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download Report
              </button>
            </div>
          </div>
          <Row label="Candidate"        value={c.name}/>
          <Row label="Employer"         value={c.employer||"—"}/>
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
      </div>
    );
  }

  // Level 2: candidate list for a batch
  if (selectedReport) {
    const b = selectedReport.batch;
    const REPORT_CANDIDATES = [
      { name:"John Doe",    status:"Complete",   employer:"Acme Corporation", result:{ outcome:"Verified", positionClaimed:"Software Engineer", positionVerified:"Software Engineer", periodClaimed:"Jan 2021 – Dec 2024", periodVerified:"Jan 2021 – Dec 2024", contact:"Jane HR (jane@acme.ng)", verifiedOn:"20 Feb 2026", notes:"Employment confirmed with positive reference." } },
      { name:"Jane Smith",  status:"Complete",   employer:"Beta Industries",  result:{ outcome:"Verified", positionClaimed:"Marketing Lead", positionVerified:"Marketing Lead", periodClaimed:"Mar 2019 – Nov 2023", periodVerified:"Mar 2019 – Nov 2023", contact:"HR Dept (hr@beta.ng)", verifiedOn:"22 Feb 2026", notes:"All details confirmed." } },
      { name:"Mike Brown",  status:"Complete",   employer:"Gamma Holdings",   result:{ outcome:"Discrepancy", positionClaimed:"Senior Manager", positionVerified:"Manager", periodClaimed:"Jan 2018 – Dec 2022", periodVerified:"Jan 2018 – Dec 2022", contact:"Bob HR (bob@gamma.ng)", verifiedOn:"22 Feb 2026", notes:"Job title mismatch noted." } },
      { name:"Sarah Green", status:"Complete",   employer:"Delta Corp",       result:{ outcome:"Verified", positionClaimed:"Analyst", positionVerified:"Analyst", periodClaimed:"Jun 2020 – Aug 2023", periodVerified:"Jun 2020 – Aug 2023", contact:"HR (hr@delta.ng)", verifiedOn:"21 Feb 2026", notes:"All details verified." } },
      { name:"Peter Obi",   status:"In Progress",employer:"Echo Limited",     result:null },
    ];
    return (
      <div style={{padding:"32px"}}>
        <BackBtn label="Back to Reports Archive" onClick={()=>setSelectedReport(null)}/>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:4}}>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{b.name}</h1>
          <button style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Download Report
          </button>
        </div>
        <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Delivered: {b.delivered} &nbsp;|&nbsp; {b.candidates} candidates</p>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["Candidate","Status","Action"].map((h,i)=>(
                <th key={i} style={{padding:"12px 20px",textAlign:i===2?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {REPORT_CANDIDATES.map((c,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}
                  onClick={()=>setReportCandidate(c)}>
                  <td style={{padding:"15px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{c.name}</td>
                  <td style={{padding:"15px 20px"}}><StatusBadge status={c.status}/></td>
                  <td style={{padding:"15px 20px",textAlign:"right"}}>
                    <span style={{fontSize:13,color:"#b91c1c",fontWeight:600}}>View Report →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const filtered = CP_DELIVERED_BATCHES.filter(b => b.name.toLowerCase().includes(reportSearch.toLowerCase()));
  return (
    <div style={{padding:"32px"}}>
      <h1 style={{margin:"0 0 24px",fontSize:22,fontWeight:700,color:"#111827"}}>Reports Archive</h1>
      <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
      {/* Search */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{position:"relative",maxWidth:360}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input value={reportSearch} onChange={e=>setReportSearch(e.target.value)} placeholder="Search batch..."
            style={{width:"100%",padding:"8px 12px 8px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
        </div>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}} ref={downloadRef}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Batch","Candidates","Delivered","Actions"].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:i===3?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((b,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{b.name}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{b.candidates}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{b.delivered}</td>
                <td style={{padding:"15px 20px",textAlign:"right",position:"relative"}}>
                  <button onClick={()=>setDownloadOpen(downloadOpen===b.id?null:b.id)}
                    style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
                    Download <ChevronDown/>
                  </button>
                  {downloadOpen===b.id && (
                    <div style={{position:"absolute",right:20,top:"calc(100% - 6px)",background:"white",borderRadius:8,boxShadow:"0 8px 24px rgba(0,0,0,0.14)",border:"1px solid #e5e7eb",zIndex:200,minWidth:200,overflow:"hidden"}}>
                      <p style={{margin:0,padding:"10px 16px",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:.5,borderBottom:"1px solid #f3f4f6"}}>DOWNLOAD</p>
                      {["Summary Report (PDF)","Full Data (Excel)","Evidence Package (ZIP)"].map(opt=>(
                        <button key={opt} onClick={()=>setDownloadOpen(null)}
                          style={{display:"block",width:"100%",padding:"10px 16px",border:"none",background:"white",fontSize:13,color:"#374151",cursor:"pointer",textAlign:"left"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                          onMouseLeave={e=>e.currentTarget.style.background="white"}>
                          {opt}
                        </button>
                      ))}
                      <button onClick={()=>{setSelectedReport({batch:b});setDownloadOpen(null);}}
                        style={{display:"block",width:"100%",padding:"10px 16px",border:"none",background:"white",fontSize:13,color:"#b91c1c",fontWeight:600,cursor:"pointer",textAlign:"left"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
                        onMouseLeave={e=>e.currentTarget.style.background="white"}>
                        Individual Reports →
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={4} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No reports found.</td></tr>}
          </tbody>
        </table>
        <div style={{padding:"14px 20px",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:13,color:"#9ca3af"}}>Showing 1–{filtered.length} of {CP_DELIVERED_BATCHES.length}</span>
          <div style={{display:"flex",gap:8}}>
            <button style={{padding:"6px 14px",border:"1.5px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>← Prev</button>
            <button style={{padding:"6px 14px",border:"1.5px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
