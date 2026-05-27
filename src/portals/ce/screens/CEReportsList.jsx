import { useState } from "react";
import { ChevronRight, SearchSm } from "../../../components/Icons.jsx";
import { FINALIZED_BATCHES } from "../data.js";

function CEReportsList({ onSelectBatch }) {
  const [search, setSearch] = useState("");
  const rows = FINALIZED_BATCHES.filter(b =>
    b.client.toLowerCase().includes(search.toLowerCase()) ||
    b.batch.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{padding:"28px 32px"}}>
      <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>Reports</h1>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Select a batch to view and download candidate verification reports.</p>
      <div style={{marginBottom:16,position:"relative",maxWidth:400}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search batches or clients..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["CLIENT","BATCH","CANDIDATES","RELEASED DATE","STATUS",""].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((b,i)=>(
              <tr key={i} onClick={()=>onSelectBatch(b)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{b.client}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.batch}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.candidates}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{b.released}</td>
                <td style={{padding:"16px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:"#dcfce7",color:"#16a34a"}}>✓ Finalized</span>
                </td>
                <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
            {rows.length===0 && <tr><td colSpan={6} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No batches found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CEReportsList;
