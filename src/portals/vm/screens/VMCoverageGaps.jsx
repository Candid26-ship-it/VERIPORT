import { useState } from "react";
import { COVERAGE_GAPS, VM_INSTITUTIONS } from "../data.js";

function VMCoverageGaps({ onBack, onResolve }) {
  const [filterGap,          setFilterGap]          = useState("All");
  const [filterInst,         setFilterInst]         = useState("All");
  const [filterLastActivity, setFilterLastActivity] = useState("All");
  const [search,             setSearch]             = useState("");

  const gapColor = g => g==="Vacant"?"#b91c1c":g==="Vacated"?"#6b7280":"#d97706";
  const gapBg    = g => g==="Vacant"?"#fee2e2":g==="Vacated"?"#f3f4f6":"#fef3c7";

  const institutions = ["All", ...Array.from(new Set(COVERAGE_GAPS.map(g=>g.short)))];

  const filtered = COVERAGE_GAPS.filter(g => {
    const matchGap  = filterGap==="All"  || g.gapType===filterGap;
    const matchInst = filterInst==="All" || g.short===filterInst;
    const matchAct  = filterLastActivity==="All" || g.lastActivity===filterLastActivity;
    const matchSearch = !search ||
      g.institution.toLowerCase().includes(search.toLowerCase()) ||
      g.dept.toLowerCase().includes(search.toLowerCase()) ||
      g.role.toLowerCase().includes(search.toLowerCase()) ||
      g.faculty.toLowerCase().includes(search.toLowerCase());
    return matchGap && matchInst && matchAct && matchSearch;
  });

  const totalPending = filtered.reduce((a,g)=>a+g.pendingTasks,0);

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Header */}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        VA Registry
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>COVERAGE GAPS</h1>
          <p style={{margin:0,fontSize:14,color:"#374151"}}>VA roles that are Vacant, Vacated, or Stale — sorted by tasks at risk. Resolve before releasing a batch.</p>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24,marginTop:20}}>
        {[
          {label:"TOTAL GAPS",      value:COVERAGE_GAPS.length,                              color:"#374151"},
          {label:"VACANT",          value:COVERAGE_GAPS.filter(g=>g.gapType==="Vacant").length,  color:"#b91c1c"},
          {label:"VACATED",         value:COVERAGE_GAPS.filter(g=>g.gapType==="Vacated").length, color:"#6b7280"},
          {label:"STALE",           value:COVERAGE_GAPS.filter(g=>g.gapType==="Stale").length,   color:"#d97706"},
        ].map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Warning banner */}
      <div style={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:10,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="18" height="18" style={{flexShrink:0,marginTop:1}}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
        <p style={{margin:0,fontSize:13,color:"#92400e",lineHeight:1.6}}>
          <strong>{totalPending} pending tasks</strong> are currently blocked by these gaps. Rows are sorted by tasks affected — resolve the top rows first before releasing any batch containing these departments.
        </p>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,maxWidth:300}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",fontSize:12}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search institution, role, department..."
            style={{width:"100%",padding:"8px 12px 8px 26px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",color:"#374151",boxSizing:"border-box"}}/>
        </div>
        <select value={filterGap} onChange={e=>setFilterGap(e.target.value)}
          style={{padding:"8px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
          {["All","Vacant","Vacated","Stale"].map(o=><option key={o}>{o}</option>)}
        </select>
        <select value={filterInst} onChange={e=>setFilterInst(e.target.value)}
          style={{padding:"8px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
          {institutions.map(o=><option key={o}>{o}</option>)}
        </select>
        <select value={filterLastActivity} onChange={e=>setFilterLastActivity(e.target.value)}
          style={{padding:"8px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
          <option value="All">All Activity</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="180">Last 180 days</option>
          <option value="over180">Over 180 days</option>
          <option value="never">Never active</option>
        </select>
      </div>

      {/* Gaps table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["INSTITUTION","ROLE","FACULTY / DEPT","GAP TYPE","TASKS AT RISK","LAST KNOWN CONTACT","ACTION"].map((h,i)=>(
              <th key={i} style={{padding:"11px 18px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((g,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:i%2===0?"white":"#fafafa"}}
                onMouseEnter={e=>e.currentTarget.style.background="#f0f9ff"}
                onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"white":"#fafafa"}>
                <td style={{padding:"13px 18px"}}>
                  <p style={{margin:"0 0 2px",fontSize:13,fontWeight:600,color:"#111827"}}>{g.short}</p>
                  <p style={{margin:0,fontSize:11,color:"#9ca3af"}}>{g.institution}</p>
                </td>
                <td style={{padding:"13px 18px",fontSize:13,color:"#374151",fontWeight:500}}>{g.role}</td>
                <td style={{padding:"13px 18px"}}>
                  {g.faculty!=="—" && <p style={{margin:"0 0 2px",fontSize:12,color:"#6b7280"}}>{g.faculty}</p>}
                  <p style={{margin:0,fontSize:13,color:"#374151"}}>{g.dept!=="—"?g.dept:"Institution-level"}</p>
                </td>
                <td style={{padding:"13px 18px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:gapBg(g.gapType),color:gapColor(g.gapType)}}>{g.gapType}</span>
                </td>
                <td style={{padding:"13px 18px"}}>
                  <span style={{fontSize:14,fontWeight:700,color:g.pendingTasks>=5?"#b91c1c":g.pendingTasks>=3?"#d97706":"#374151"}}>{g.pendingTasks}</span>
                  <span style={{fontSize:12,color:"#9ca3af",marginLeft:4}}>task{g.pendingTasks!==1?"s":""}</span>
                </td>
                <td style={{padding:"13px 18px",fontSize:12,color:"#6b7280",maxWidth:200}}>{g.lastKnown==="—"?<span style={{color:"#d1d5db"}}>No contact on file</span>:g.lastKnown}</td>
                <td style={{padding:"13px 18px"}}>
                  <button onClick={()=>onResolve(VM_INSTITUTIONS.find(i=>i.id===g.instId)||VM_INSTITUTIONS[0])}
                    style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:12,fontWeight:500,cursor:"pointer"}}>
                    Resolve →
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length===0 && (
              <tr><td colSpan={7} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No gaps match your filters.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{padding:"12px 18px",borderTop:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {filtered.length} of {COVERAGE_GAPS.length} gaps</p>
          <p style={{margin:0,fontSize:13,color:totalPending>0?"#b91c1c":"#16a34a",fontWeight:600}}>{totalPending} tasks at risk</p>
        </div>
      </div>

      {/* Legend */}
      <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 20px",marginTop:16,display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"}}>
        <p style={{margin:0,fontSize:12,fontWeight:600,color:"#374151",flexShrink:0}}>Gap types:</p>
        <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:"#fee2e2",color:"#b91c1c"}}>Vacant — no contact on file</span>
        <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#6b7280"}}>Vacated — person left, no replacement</span>
        <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:"#fef3c7",color:"#d97706"}}>Stale — contact exists but freshness window elapsed</span>
      </div>
    </div>
  );
}

export default VMCoverageGaps;
