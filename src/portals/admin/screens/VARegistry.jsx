import { useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

function VARegistry() {
  const AUDIT_LOG = [
    { date:"Feb 22, 2026", actor:"Olumide Bakare (VM)", action:"Validated VA contact",   institution:"UNILAG — Computer Science", detail:"Dr. Emeka Nwosu confirmed as HOD. Contact updated.", status:"Resolved" },
    { date:"Feb 20, 2026", actor:"Olumide Bakare (VM)", action:"Resolved exception",     institution:"OAU — Medicine",           detail:"Conflict resolved. Registrar email corrected to registrar@oauife.edu.ng.", status:"Resolved" },
    { date:"Feb 18, 2026", actor:"Olumide Bakare (VM)", action:"Added foreign institution",institution:"University of Ghana",      detail:"UG Student Portal added to Foreign Institution Registry.", status:"Resolved" },
    { date:"Feb 15, 2026", actor:"Olumide Bakare (VM)", action:"Flagged exception",      institution:"UI — Law",                  detail:"Payment requirement flag pending confirmation from institution.", status:"Pending" },
    { date:"Feb 12, 2026", actor:"Olumide Bakare (VM)", action:"Validated VA contact",   institution:"UNIBEN — Economics",        detail:"Prof. Chukwuma Eze confirmed. Last validated Feb 12, 2026.", status:"Resolved" },
    { date:"Feb 10, 2026", actor:"Olumide Bakare (VM)", action:"Resolved exception",     institution:"LASU — Engineering",        detail:"New department — contact sourced from candidate crowdsource, validated.", status:"Resolved" },
    { date:"Feb 08, 2026", actor:"Olumide Bakare (VM)", action:"Updated registry",       institution:"University of Nairobi",     detail:"Email contact updated after portal verification.", status:"Resolved" },
    { date:"Feb 05, 2026", actor:"Olumide Bakare (VM)", action:"Flagged exception",      institution:"ABU — Sciences",            detail:"Missing contact — no contact provided by candidates. Escalated.", status:"Escalated" },
    { date:"Feb 03, 2026", actor:"Olumide Bakare (VM)", action:"Validated VA contact",   institution:"FUTA — Computer Engineering",detail:"Dr. Seun Adeyemi confirmed as HOD.", status:"Resolved" },
    { date:"Jan 30, 2026", actor:"Olumide Bakare (VM)", action:"Resolved exception",     institution:"UNILAG — Pharmacy",         detail:"Registrar conflict resolved. New registrar email confirmed.", status:"Resolved" },
  ];

  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const totalPages = Math.ceil(AUDIT_LOG.length / PER_PAGE);
  const pageRows = AUDIT_LOG.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const statusColor = s => s==="Resolved"?"#16a34a":s==="Pending"?"#d97706":"#b91c1c";
  const statusBg    = s => s==="Resolved"?"#dcfce7":s==="Pending"?"#fef3c7":"#fee2e2";

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["VA Registry"]}/>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>VA REGISTRY — AUDIT LOG</h1>
          <p style={{margin:0,fontSize:14,color:"#374151"}}>Read-only record of all VA Registry activity. Managed operationally by the Verification Manager.</p>
        </div>
        <span style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,background:"#f3f4f6",color:"#6b7280"}}>Read Only</span>
      </div>

      {/* Summary stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
        {[
          {label:"TOTAL ACTIONS",  value:AUDIT_LOG.length,                                    color:"#111827"},
          {label:"RESOLVED",       value:AUDIT_LOG.filter(r=>r.status==="Resolved").length,    color:"#16a34a"},
          {label:"PENDING / OPEN", value:AUDIT_LOG.filter(r=>r.status!=="Resolved").length,    color:"#d97706"},
        ].map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Audit log table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>ACTIVITY HISTORY</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["DATE","ACTOR","ACTION","INSTITUTION","DETAIL","STATUS"].map((h,i)=>(
              <th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {pageRows.map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151",whiteSpace:"nowrap"}}>{r.date}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151",whiteSpace:"nowrap"}}>{r.actor}</td>
                <td style={{padding:"14px 20px",fontSize:13,fontWeight:500,color:"#111827"}}>{r.action}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{r.institution}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151",maxWidth:280}}>{r.detail}</td>
                <td style={{padding:"14px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:statusBg(r.status),color:statusColor(r.status)}}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div style={{padding:"14px 20px",borderTop:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE,AUDIT_LOG.length)} of {AUDIT_LOG.length} entries</p>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
              style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:page===1?"#d1d5db":"#374151",cursor:page===1?"not-allowed":"pointer",fontWeight:500}}>
              ← Previous
            </button>
            <span style={{padding:"7px 14px",fontSize:13,color:"#374151",fontWeight:500}}>{page} / {totalPages}</span>
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
              style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:page===totalPages?"#d1d5db":"#374151",cursor:page===totalPages?"not-allowed":"pointer",fontWeight:500}}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VARegistry;
