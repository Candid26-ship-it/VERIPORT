import { useState } from "react";
import { ChevronDown } from "../../../components/Icons.jsx";
import { BATCH_RETURNS } from "../../../data/index.js";
import ReturnFixDrawer from "../components/ReturnFixDrawer.jsx";

function ReturnsTab({ search, rows, onResubmit }) {
  const data = rows || BATCH_RETURNS;
  const [clientFilter, setClientFilter] = useState("All Clients");
  const [filterOpen,   setFilterOpen]   = useState(false);
  const [fixItem,      setFixItem]       = useState(null);

  const clients = ["All Clients", ...Array.from(new Set(data.map(r=>r.client)))];

  const filtered = data.filter(r => {
    const matchSearch =
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.batch.toLowerCase().includes(search.toLowerCase()) ||
      r.candidate.toLowerCase().includes(search.toLowerCase()) ||
      r.servform.toLowerCase().includes(search.toLowerCase());
    const matchClient = clientFilter==="All Clients" || r.client===clientFilter;
    return matchSearch && matchClient;
  });

  return (
    <>
      {/* Client filter row */}
      <div style={{padding:"12px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"flex-end",position:"relative"}}>
        <div onClick={()=>setFilterOpen(p=>!p)}
          style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"8px 14px",fontSize:14,color:"#374151",cursor:"pointer",minWidth:180,justifyContent:"space-between",background:"white",userSelect:"none"}}>
          {clientFilter} <ChevronDown/>
        </div>
        {filterOpen && (
          <div style={{position:"absolute",top:52,right:20,background:"white",border:"1px solid #e5e7eb",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",zIndex:100,minWidth:220,overflow:"hidden"}}>
            {clients.map(c=>(
              <div key={c} onClick={()=>{setClientFilter(c);setFilterOpen(false);}}
                style={{padding:"11px 16px",fontSize:14,color:c===clientFilter?"#b91c1c":"#374151",fontWeight:c===clientFilter?600:400,cursor:"pointer",background:"white",borderBottom:"1px solid #f3f4f6"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                {c===clientFilter ? "✓ " : "   "}{c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#fafafa"}}>
          {["Client","Batch","ServMode","Mode","Candidate","Issue","SLA Remaining","Action"].map((h,i)=>(
            <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {filtered.map((r,i)=>(
            <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
              onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
              onMouseLeave={e=>e.currentTarget.style.background="white"}>
              <td style={{padding:"16px 20px",fontSize:14,color:"#111827",fontWeight:500}}>{r.client}</td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.batch}</td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151",fontWeight:500}}>{r.servform}</td>
              <td style={{padding:"16px 20px"}}>
                <span style={{padding:"3px 10px",background:"#f3f4f6",color:"#374151",borderRadius:20,fontSize:12,fontWeight:500,border:"1px solid #e5e7eb"}}>{r.mode}</span>
              </td>
              <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{r.candidate}</td>
              <td style={{padding:"16px 20px",fontSize:13,color:"#6b7280",maxWidth:240}}>{r.issue}</td>
              <td style={{padding:"16px 20px"}}>
                <span style={{padding:"4px 10px",background:r.slaOver?"#fef2f2":"#f0fdf4",color:r.slaOver?"#dc2626":"#16a34a",borderRadius:20,fontSize:12,fontWeight:600,border:`1px solid ${r.slaOver?"#fecaca":"#bbf7d0"}`}}>
                  {r.sla}
                </span>
              </td>
              <td style={{padding:"16px 20px"}}>
                <button onClick={()=>setFixItem(r)} style={{padding:"7px 18px",background:"#1d4ed8",color:"white",border:"none",borderRadius:6,fontSize:13,fontWeight:600,cursor:"pointer"}}>Fix</button>
              </td>
            </tr>
          ))}
          {filtered.length===0 && (
            <tr><td colSpan={8} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No returned tasks found.</td></tr>
          )}
        </tbody>
      </table>

      {/* Fix drawer */}
      {fixItem && (
        <ReturnFixDrawer
          item={fixItem}
          onClose={()=>setFixItem(null)}
          onResubmit={(item)=>{ onResubmit && onResubmit(item); setFixItem(null); }}
        />
      )}
    </>
  );
}

export default ReturnsTab;
