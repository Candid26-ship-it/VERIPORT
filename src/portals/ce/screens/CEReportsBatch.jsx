import { useState } from "react";
import { ChevronLeft, SearchSm } from "../../../components/Icons.jsx";
import { REPORT_CANDIDATES } from "../data.js";

function CEReportsBatch({ batch, onBack, onSelectCandidate }) {
  const [search, setSearch] = useState("");
  const candidates = (REPORT_CANDIDATES[batch.batch] || []).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Reports
      </button>
      <div style={{marginBottom:24}}>
        <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#111827"}}>{batch.batch}</h1>
        <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{batch.client} · Released {batch.released} · {batch.candidates} candidates</p>
      </div>
      {/* Summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
        {[
          {label:"Total Candidates", value:batch.candidates,                                                                      color:"#111827"},
          {label:"Clean",           value:(REPORT_CANDIDATES[batch.batch]||[]).filter(c=>c.status==="Clean").length,              color:"#16a34a"},
          {label:"Flagged",         value:(REPORT_CANDIDATES[batch.batch]||[]).filter(c=>c.status==="Flagged").length,            color:"#d97706"},
        ].map(({label,value,color})=>(
          <div key={label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:600,color:"#6b7280",letterSpacing:.4}}>{label.toUpperCase()}</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color}}>{value}</p>
          </div>
        ))}
      </div>
      {/* Search */}
      <div style={{marginBottom:16,position:"relative",maxWidth:400}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search candidates..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>
      {/* Candidates table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["CANDIDATE","ROLE","SERVICES","OVERALL STATUS","ACTION"].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {candidates.map((c,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{c.name}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{c.role}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{c.services.length}</td>
                <td style={{padding:"16px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,
                    background:c.status==="Clean"?"#dcfce7":"#fef3c7",
                    color:c.status==="Clean"?"#16a34a":"#d97706"}}>
                    {c.status==="Clean"?"✓ Clean":"⚠ Flagged"}
                  </span>
                </td>
                <td style={{padding:"16px 20px"}}>
                  <button onClick={()=>onSelectCandidate(c)} style={{padding:"7px 16px",border:"1.5px solid #b91c1c",borderRadius:7,background:"white",color:"#b91c1c",fontSize:13,fontWeight:600,cursor:"pointer"}}>View Report</button>
                </td>
              </tr>
            ))}
            {candidates.length===0 && <tr><td colSpan={5} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No candidates found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CEReportsBatch;
