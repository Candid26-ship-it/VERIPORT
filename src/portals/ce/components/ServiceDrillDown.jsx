import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";
import { WORKBENCH_CANDIDATES } from "../data.js";

function ServiceDrillDown({ service, batchName, onBack }) {
  const [taskStates, setTaskStates] = useState(() => {
    const s = {};
    const total = WORKBENCH_CANDIDATES.length;
    // Cap so Pending is majority: max 3 Released, max 1 Queried from the initial data
    const relCap = Math.min(service.released, Math.floor(total * 0.25));
    const qryCap = Math.min(service.queried, Math.floor(total * 0.08));
    WORKBENCH_CANDIDATES.forEach((c, i) => {
      s[i] = i < relCap ? "Released" : i < relCap + qryCap ? "Queried" : "Pending";
    });
    return s;
  });
  const [evidenceFor, setEvidenceFor] = useState(null);
  const [queryFor, setQueryFor]       = useState(null);
  const [queryNote, setQueryNote]     = useState("");
  const [docView, setDocView]         = useState(null); // { candName, docName }
  const serviceName = service?.name || "";
  const supportsSignatureEvidence = service?.mode === "Scholar" || /Academic|Educational|Guarantor/i.test(serviceName);
  const supportsBulkMetadata = /Academic|Educational/i.test(serviceName) || service?.mode === "Scholar";

  const StatusPill = ({ status }) => {
    const map = {
      Released:{ bg:"#f0fdf4", c:"#16a34a", b:"#bbf7d0" },
      Queried: { bg:"#fffbeb", c:"#d97706", b:"#fde68a" },
      Pending: { bg:"#f1f5f9", c:"#475569", b:"#cbd5e1" },
    };
    const s = map[status] || map.Pending;
    return <span style={{padding:"4px 12px",background:s.bg,color:s.c,border:`1px solid ${s.b}`,borderRadius:20,fontSize:12,fontWeight:500}}>{status}</span>;
  };

  const released = Object.values(taskStates).filter(s=>s==="Released").length;
  const queried  = Object.values(taskStates).filter(s=>s==="Queried").length;
  const pending  = Object.values(taskStates).filter(s=>s==="Pending").length;

  // Query modal — defined here so it's available in all early-return branches
  const QueryModal = () => (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{background:"white",borderRadius:16,padding:"36px",width:460,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>Query Task</h2>
          <button onClick={()=>{setQueryFor(null);setQueryNote("");}} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:20,lineHeight:1,padding:0}}>×</button>
        </div>
        <p style={{margin:"0 0 16px",fontSize:14,color:"#374151"}}>Query task <strong>{service.name}</strong> for candidate <strong>{WORKBENCH_CANDIDATES[queryFor]}</strong></p>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Reason</label>
        <textarea value={queryNote} onChange={e=>setQueryNote(e.target.value)} placeholder="Enter reason for query..."
          style={{width:"100%",height:120,padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,resize:"vertical",boxSizing:"border-box",outline:"none",color:"#374151"}}/>
        <div style={{display:"flex",gap:10,marginTop:20,justifyContent:"flex-end"}}>
          <button onClick={()=>{setQueryFor(null);setQueryNote("");}} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,cursor:"pointer",color:"#374151"}}>Cancel</button>
          <button onClick={()=>{setTaskStates(p=>({...p,[queryFor]:"Queried"}));setQueryFor(null);setQueryNote("");if(evidenceFor!==null)setEvidenceFor(null);}}
            style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#d97706",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Submit Query</button>
        </div>
      </div>
    </div>
  );

  // Document viewer
  if (docView !== null) {
    return (
      <div style={{padding:"28px 32px"}}>
        <button onClick={()=>setDocView(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
          <ChevronLeft/> Back to Evidence
        </button>
        <h1 style={{margin:"0 0 4px",fontSize:20,fontWeight:700,color:"#111827"}}>{docView.docName}</h1>
        <p style={{margin:"0 0 24px",fontSize:13,color:"#6b7280"}}>{docView.candName} · {service.name} · {batchName}</p>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          {/* Dummy PDF viewer */}
          <div style={{background:"#374151",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:"white",fontSize:13,fontWeight:500}}>{docView.docName}</span>
            <span style={{color:"#9ca3af",fontSize:12}}>Page 1 of 1</span>
          </div>
          <div style={{background:"#f8f8f8",padding:"40px",minHeight:480,display:"flex",alignItems:"flex-start",justifyContent:"center"}}>
            <div style={{background:"white",width:"100%",maxWidth:600,padding:"48px",boxShadow:"0 2px 16px rgba(0,0,0,0.1)",borderRadius:4,fontFamily:"serif"}}>
              <div style={{textAlign:"center",marginBottom:32}}>
                <div style={{width:56,height:56,background:"#b91c1c",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                  <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
                </div>
                <p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:"#111827"}}>DRAGNET SOLUTIONS</p>
                <p style={{margin:0,fontSize:12,color:"#6b7280"}}>Verification Report</p>
              </div>
              <hr style={{border:"none",borderTop:"2px solid #e5e7eb",margin:"20px 0"}}/>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Document Type</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{docView.docName.replace(".pdf","")}</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Candidate Name</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{docView.candName}</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Service</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{service.name}</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Batch</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#111827"}}>{batchName}</p>
              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",margin:"20px 0"}}/>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Verification Status</p>
              <p style={{margin:"0 0 20px",fontSize:15,fontWeight:600,color:"#16a34a"}}>✓ Verified</p>
              <p style={{margin:"0 0 8px",fontSize:13,color:"#6b7280"}}>Date Issued</p>
              <p style={{margin:0,fontSize:15,fontWeight:600,color:"#111827"}}>07 Mar 2026</p>
              <hr style={{border:"none",borderTop:"1px solid #e5e7eb",margin:"20px 0"}}/>
              <p style={{fontSize:11,color:"#9ca3af",textAlign:"center",margin:0}}>This document is generated by Dragnet Solutions and is valid for official use only.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Evidence viewer
  if (evidenceFor !== null) {
    const cand = WORKBENCH_CANDIDATES[evidenceFor];
    return (
      <div style={{padding:"28px 32px"}}>
        {queryFor !== null && <QueryModal/>}
        <button onClick={()=>setEvidenceFor(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
          <ChevronLeft/> Back to {service.name}
        </button>
        <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{cand}</h1>
        <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>{service.name} · {batchName}</p>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"32px",marginBottom:20}}>
          <p style={{margin:"0 0 16px",fontSize:14,fontWeight:600,color:"#374151"}}>Evidence Documents</p>
          {["Verification Certificate.pdf","Source Response Letter.pdf","Supporting Document.pdf"].map((doc,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",border:"1px solid #e5e7eb",borderRadius:8,marginBottom:10,background:"#fafafa"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/></svg>
                <span style={{fontSize:14,color:"#111827",fontWeight:500}}>{doc}</span>
              </div>
              <button onClick={()=>setDocView({candName:cand,docName:doc})} style={{padding:"6px 16px",background:"#1d4ed8",color:"white",border:"none",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer"}}>View</button>
            </div>
          ))}
        </div>
        {supportsBulkMetadata && (
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px",marginBottom:20}}>
            <p style={{margin:"0 0 14px",fontSize:14,fontWeight:600,color:"#374151"}}>Bulk Response Metadata</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
              {[
                ["Letter dated","07 Mar 2026"],
                ["Signed by","Mrs. Janet Obi"],
                ["Received on","09 Mar 2026"],
                ["Uploaded by","A. Musa (VE)"],
                ["Upload date","09 Mar 2026 · 14:22"],
                ["Candidates covered","12 candidates"],
              ].map(([k,v]) => (<div key={k}><p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:600,textTransform:"uppercase"}}>{k}</p><p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{v}</p></div>))}
            </div>
            <p style={{margin:"12px 0 0",fontSize:12,color:"#6b7280"}}>The underlying response sheet remains internal evidence. Only metadata is surfaced here.</p>
          </div>
        )}
        {supportsSignatureEvidence && (
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px",marginBottom:20}}>
            <p style={{margin:"0 0 14px",fontSize:14,fontWeight:600,color:"#374151"}}>Signature Evidence Metadata</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:"#6b7280"}}>Shown only where the response actually involves a captured digital signature event.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
              {[
                ["Signed date","07 Mar 2026"],
                ["Signed time","13:47 WAT"],
                ["IP address","102.89.14.221"],
                ["Location","Lagos, Nigeria"],
                ["NIN Verified","Yes"],
                ["Face Verified","Yes"],
              ].map(([k,v]) => (<div key={k}><p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:600,textTransform:"uppercase"}}>{k}</p><p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{v}</p></div>))}
            </div>
          </div>
        )}
        {taskStates[evidenceFor]!=="Released" && (
        <div style={{display:"flex",gap:12,justifyContent:"flex-end"}}>
          <button onClick={()=>{setQueryFor(evidenceFor);}}
            style={{padding:"10px 24px",border:"1.5px solid #d97706",borderRadius:8,background:"white",color:"#d97706",fontSize:14,fontWeight:600,cursor:"pointer"}}>Query</button>
          <button onClick={()=>{setTaskStates(p=>({...p,[evidenceFor]:"Released"}));setEvidenceFor(null);}}
            style={{padding:"10px 24px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Release</button>
        </div>
        )}
      </div>
    );
  }

  return (
    <div style={{padding:"28px 32px"}}>
      {queryFor !== null && <QueryModal/>}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
        <ChevronLeft/> Back to Release Workbench
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{service.name}</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{batchName}</p>
        </div>
        <div style={{display:"flex",gap:20}}>
          {[{label:"Total",val:WORKBENCH_CANDIDATES.length,c:"#374151"},{label:"Released",val:released,c:"#16a34a"},{label:"Queried",val:queried,c:"#d97706"},{label:"Pending",val:pending,c:"#475569"}].map(({label,val,c})=>(
            <div key={label} style={{textAlign:"center"}}>
              <p style={{margin:0,fontSize:22,fontWeight:700,color:c}}>{val}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Candidate","Status","Actions"].map((h,i)=>(
              <th key={i} style={{padding:"13px 20px",textAlign:i===2?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[...WORKBENCH_CANDIDATES.map((cand,i)=>({cand,i}))].sort((a,b)=>{const order={Pending:0,Queried:1,Released:2};return order[taskStates[a.i]]-order[taskStates[b.i]];}).map(({cand,i})=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{cand}</td>
                <td style={{padding:"16px 20px"}}><StatusPill status={taskStates[i]}/></td>
                <td style={{padding:"16px 20px",textAlign:"right"}}>
                  <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                    <button onClick={()=>setEvidenceFor(i)}
                      style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>View Evidence</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceDrillDown;
