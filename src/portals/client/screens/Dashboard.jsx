import { SearchSm, ChevronDown, ChevronRight } from "../../../components/Icons.jsx";
import { CP_BATCHES, CP_DELIVERED_BATCHES } from "../data.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Dashboard({
  batchSearch, setBatchSearch,
  statusFilter, setStatusFilter,
  filterOpen, setFilterOpen,
  filterRef,
  setSelectedBatch,
  navigate,
}) {
  const activeBatches   = CP_BATCHES.filter(b => b.status === "Active").length;
  const actionRequired  = CP_BATCHES.reduce((n, b) => n + (b.flagged || 0), 0);
  const completedMonth  = CP_DELIVERED_BATCHES.length;

  const filtered = CP_BATCHES.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(batchSearch.toLowerCase());
    const matchStatus = statusFilter === "All Status" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{padding:"32px"}}>
      <h1 style={{margin:"0 0 24px",fontSize:24,fontWeight:700,color:"#111827"}}>Welcome back, Zenith Bank</h1>

      {/* Stat cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:32}}>
        {[
          { label:"Active Batches",     value:activeBatches,  sub:"Currently verifying",    color:"#3b82f6" },
          { label:"Action Required",    value:actionRequired, sub:"Items need your response",color:actionRequired>0?"#b91c1c":"#111827" },
          { label:"Completed This Month",value:completedMonth,sub:"Reports available",       color:"#15803d" },
        ].map(({label,value,sub,color})=>(
          <div key={label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:600,color:"#9ca3af",letterSpacing:.5}}>{label.toUpperCase()}</p>
            <p style={{margin:"0 0 2px",fontSize:28,fontWeight:700,color}}>{value}</p>
            <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{sub}</p>
          </div>
        ))}
      </div>

      <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
      <h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:600,color:"#111827"}}>Active Batches</h2>

      {/* Batch table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:32}}>
        {/* Search + filter row */}
        <div style={{padding:"14px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",gap:12,alignItems:"center"}}>
          <div style={{flex:1,position:"relative"}}>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
            <input value={batchSearch} onChange={e=>setBatchSearch(e.target.value)} placeholder="Search..."
              style={{width:"100%",padding:"8px 12px 8px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
          </div>
          <div ref={filterRef} style={{position:"relative"}}>
            <button onClick={()=>setFilterOpen(p=>!p)}
              style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,color:"#374151",cursor:"pointer"}}>
              {statusFilter} <ChevronDown/>
            </button>
            {filterOpen && (
              <div style={{position:"absolute",top:"calc(100%+6px)",right:0,background:"white",borderRadius:8,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",border:"1px solid #e5e7eb",zIndex:100,minWidth:140,overflow:"hidden"}}>
                {["All Status","Active","Ready","Pending","Delivered"].map(s=>(
                  <button key={s} onClick={()=>{setStatusFilter(s);setFilterOpen(false);}}
                    style={{display:"block",width:"100%",padding:"10px 16px",border:"none",background:statusFilter===s?"#fef2f2":"white",color:statusFilter===s?"#b91c1c":"#374151",fontSize:13,cursor:"pointer",textAlign:"left",fontWeight:statusFilter===s?600:400}}
                    onMouseEnter={e=>{if(statusFilter!==s)e.currentTarget.style.background="#f9fafb";}}
                    onMouseLeave={e=>{if(statusFilter!==s)e.currentTarget.style.background="white";}}>{s}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Batch","Progress","Services","Flagged","Status",""].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((b,i)=>{
              const pct = Math.round((b.tasksComplete/b.tasksTotal)*100);
              return (
                <tr key={i} onClick={()=>setSelectedBatch(b)}
                  style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{b.name}</td>
                  <td style={{padding:"15px 20px",minWidth:140}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:6,background:"#f3f4f6",borderRadius:4,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${pct}%`,background:"#b91c1c",borderRadius:4}}/>
                      </div>
                      <span style={{fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{b.tasksComplete}/{b.tasksTotal}</span>
                    </div>
                  </td>
                  <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{b.services}</td>
                  <td style={{padding:"15px 20px",fontSize:14}}>
                    {b.flagged > 0
                      ? <span style={{color:"#b91c1c",fontWeight:600}}>⚠ {b.flagged}</span>
                      : <span style={{color:"#9ca3af"}}>—</span>}
                  </td>
                  <td style={{padding:"15px 20px"}}><StatusBadge status={b.status}/></td>
                  <td style={{padding:"15px 20px",color:"#9ca3af"}}><ChevronRight/></td>
                </tr>
              );
            })}
            {filtered.length===0 && <tr><td colSpan={6} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No batches found.</td></tr>}
          </tbody>
        </table>
      </div>

      <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
      <button onClick={()=>navigate("Reports")}
        style={{fontSize:14,color:"#b91c1c",background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0}}>
        View Reports Archive →
      </button>
    </div>
  );
}
