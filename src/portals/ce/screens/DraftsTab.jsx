import { ChevronRight } from "../../../components/Icons.jsx";
import { BATCHES } from "../../../data/index.js";

function DraftsTab({ search, onRowClick }) {
  const rows = BATCHES.drafts.filter(r => r.client.toLowerCase().includes(search.toLowerCase()) || r.batch.toLowerCase().includes(search.toLowerCase()));
  return (
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr style={{background:"#fafafa"}}>{["Client","Batch","Tasks","Days","Notes",""].map((h,i)=><th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",width:h===""?40:undefined}}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i} onClick={()=>onRowClick&&onRowClick(r)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
            <td style={{padding:"16px 20px",fontSize:14,color:"#111827"}}>{r.client}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.batch}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.tasks}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.days}</td>
            <td style={{padding:"16px 20px",fontSize:14,color:"#9ca3af"}}>-</td>
            <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
          </tr>
        ))}
        {rows.length===0&&<tr><td colSpan={6} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No results found.</td></tr>}
      </tbody>
    </table>
  );
}

export default DraftsTab;
