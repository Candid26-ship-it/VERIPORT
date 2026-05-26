import { useState } from "react";
import { VM_INSTITUTIONS } from "../data.js";
import VMInstitutionDetail from "./VMInstitutionDetail.jsx";
import VMCoverageGaps from "./VMCoverageGaps.jsx";

function VMVARegistry() {
  const [view,            setView]            = useState("list");
  const [selectedInst,    setSelectedInst]    = useState(null);
  const [selectedBatch,   setSelectedBatch]   = useState(null);
  const [selectedDept,    setSelectedDept]    = useState(null);
  const [resolvedDepts,   setResolvedDepts]   = useState([]);
  const [search,          setSearch]          = useState("");
  const [filterType,         setFilterType]         = useState("All");
  const [filterOwnership,    setFilterOwnership]    = useState("All");
  const [filterVacant,       setFilterVacant]       = useState("All");
  const [filterState,        setFilterState]        = useState("All");
  const [filterCoverage,     setFilterCoverage]     = useState("All");
  const [filterLastActivity, setFilterLastActivity] = useState("All");
  const [localPage,       setLocalPage]       = useState(1);
  const [foreignPage,     setForeignPage]     = useState(1);
  const [batchPage,       setBatchPage]       = useState(1);
  const PER = 5;

  const handleResolve  = (dept) => { setSelectedDept(dept); setView("resolve"); };
  const handleValidate = (id)   => { setResolvedDepts(p=>[...p,id]); setView("batch"); };

  if (view==="resolve" && selectedDept) return <VADeptResolution dept={selectedDept} batchName={selectedBatch?.batch} onBack={()=>setView("batch")} onValidate={handleValidate}/>;
  if (view==="batch" && selectedBatch) {
    const batchWithResolved = {...selectedBatch, departments:selectedBatch.departments.map(d=>resolvedDepts.includes(d.id)?{...d,status:"validated",vaContact:"Manually validated",how:"Manual"}:d)};
    return <VABatchStatus batch={batchWithResolved} onBack={()=>setView("list")} onResolve={handleResolve}/>;
  }
  if (view==="institution" && selectedInst) {
    return <VMInstitutionDetail inst={selectedInst} onBack={()=>setView("list")}/>;
  }
  if (view==="gaps") {
    return <VMCoverageGaps onBack={()=>setView("list")} onResolve={(inst)=>{setSelectedInst(inst);setView("institution");}}/>;
  }

  const totalAutoConfirmed = VA_BATCHES.reduce((a,b)=>a+b.deptsCleared,0)*9;
  const totalPending       = VA_BATCHES.reduce((a,b)=>a+b.deptsPending,0)*6;
  const localTotal   = LOCAL_INSTITUTION_REGISTRY.length;
  const localPages   = Math.ceil(localTotal/PER);
  const localRows    = LOCAL_INSTITUTION_REGISTRY.slice((localPage-1)*PER, localPage*PER);
  const foreignTotal = FOREIGN_INSTITUTION_REGISTRY.length;
  const foreignPages = Math.ceil(foreignTotal/PER);
  const foreignRows  = FOREIGN_INSTITUTION_REGISTRY.slice((foreignPage-1)*PER, foreignPage*PER);
  const batchTotal   = VA_BATCHES.length;
  const batchPages   = Math.ceil(batchTotal/PER);
  const batchRows    = VA_BATCHES.slice((batchPage-1)*PER, batchPage*PER);

  const SectionHeader = ({title}) => (
    <div style={{display:"flex",alignItems:"center",padding:"16px 20px",background:"white",borderBottom:"1px solid #e5e7eb"}}>
      <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>{title}</p>
    </div>
  );

  const Pager = ({page,pages,set}) => (
    <div style={{padding:"12px 20px",borderTop:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <span style={{fontSize:13,color:"#6b7280"}}>Page {page} of {pages}</span>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>set(p=>Math.max(1,p-1))} disabled={page===1}
          style={{padding:"6px 14px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:page===1?"#d1d5db":"#374151",cursor:page===1?"not-allowed":"pointer"}}>← Prev</button>
        <button onClick={()=>set(p=>Math.min(pages,p+1))} disabled={page===pages}
          style={{padding:"6px 14px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:page===pages?"#d1d5db":"#374151",cursor:page===pages?"not-allowed":"pointer"}}>Next →</button>
      </div>
    </div>
  );

  const filteredInst = VM_INSTITUTIONS.filter(i => {
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.short.toLowerCase().includes(search.toLowerCase()) || i.state.toLowerCase().includes(search.toLowerCase());
    const matchType     = filterType==="All"         || i.type===filterType;
    const matchOwn      = filterOwnership==="All"    || i.ownership===filterOwnership;
    const matchVac      = filterVacant==="All"       || (filterVacant==="Yes" ? i.vacant>0 : i.vacant===0);
    const matchState    = filterState==="All"        || i.state===filterState;
    const matchCoverage = filterCoverage==="All"     ||
      (filterCoverage==="0-25"   && i.coverage<=25)  ||
      (filterCoverage==="26-50"  && i.coverage>25  && i.coverage<=50) ||
      (filterCoverage==="51-75"  && i.coverage>50  && i.coverage<=75) ||
      (filterCoverage==="76-100" && i.coverage>75);
    const matchAct      = filterLastActivity==="All" || i.lastActivity===filterLastActivity;
    return matchSearch && matchType && matchOwn && matchVac && matchState && matchCoverage && matchAct;
  });

  const covColor = c => c>=70?"#16a34a":c>=50?"#d97706":"#b91c1c";
  const covBg    = c => c>=70?"#dcfce7":c>=50?"#fef3c7":"#fee2e2";

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:4}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>VA REGISTRY MANAGEMENT</h1>
        <button onClick={()=>setView("gaps")}
          style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",border:"1.5px solid #b91c1c",borderRadius:8,background:"white",fontSize:13,fontWeight:600,color:"#b91c1c",cursor:"pointer",flexShrink:0}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
          Coverage Gaps
        </button>
      </div>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#374151"}}>Manage institution VA contacts, resolve exceptions, and oversee verification routing.</p>

      {/* Summary stats */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 24px",marginBottom:20,display:"flex",gap:28,flexWrap:"wrap"}}>
        {[
          {label:"INSTITUTIONS",   value:VM_INSTITUTIONS.length,                               color:"#111827"},
          {label:"AUTO-CONFIRMED", value:`${totalAutoConfirmed.toLocaleString()} students`,     color:"#16a34a"},
          {label:"PENDING REVIEW", value:`${totalPending} students`,                            color:"#d97706"},
          {label:"VACANT ROLES",   value:VM_INSTITUTIONS.reduce((a,i)=>a+i.vacant,0),          color:"#b91c1c"},
          {label:"STALE CONTACTS", value:VM_INSTITUTIONS.reduce((a,i)=>a+i.stale,0),           color:"#d97706"},
          {label:"BATCHES IN QUEUE",value:VA_BATCHES.length,                                    color:"#374151"},
        ].map((s,i,arr)=>(
          <div key={s.label} style={{flexShrink:0,paddingRight:i<arr.length-1?28:0,borderRight:i<arr.length-1?"1px solid #e5e7eb":"none"}}>
            <p style={{margin:"0 0 2px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.4}}>{s.label}</p>
            <p style={{margin:0,fontSize:20,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Institution Registry */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>INSTITUTION REGISTRY</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",fontSize:12}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search institution, state..."
                style={{padding:"7px 12px 7px 26px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",color:"#374151",width:200}}/>
            </div>
            {[
              [filterType,      setFilterType,      ["All","University","Polytechnic","College of Education","Other"]],
              [filterOwnership, setFilterOwnership, ["All","Public","Private","Federal","State"]],
            ].map(([val,set,opts],i)=>(
              <select key={i} value={val} onChange={e=>set(e.target.value)}
                style={{padding:"7px 10px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
            ))}
            <select value={filterState} onChange={e=>setFilterState(e.target.value)}
              style={{padding:"7px 10px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
              <option value="All">All States</option>
              {[...new Set(VM_INSTITUTIONS.map(i=>i.state))].sort().map(s=><option key={s}>{s}</option>)}
            </select>
            <select value={filterCoverage} onChange={e=>setFilterCoverage(e.target.value)}
              style={{padding:"7px 10px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
              <option value="All">All Coverage</option>
              <option value="0-25">0–25%</option>
              <option value="26-50">26–50%</option>
              <option value="51-75">51–75%</option>
              <option value="76-100">76–100%</option>
            </select>
            <select value={filterVacant} onChange={e=>setFilterVacant(e.target.value)}
              style={{padding:"7px 10px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
              <option value="All">All Roles</option>
              <option value="Yes">Has Vacant Roles</option>
              <option value="No">No Vacant Roles</option>
            </select>
            <select value={filterLastActivity} onChange={e=>setFilterLastActivity(e.target.value)}
              style={{padding:"7px 10px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",background:"white",outline:"none",cursor:"pointer"}}>
              <option value="All">All Activity</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 180 days</option>
              <option value="over180">Over 180 days</option>
            </select>
          </div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["INSTITUTION","TYPE","STATE","VAs ON FILE","COVERAGE","ISSUES",""].map((h,i)=>(
              <th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filteredInst.map((inst,i)=>(
              <tr key={inst.id} onClick={()=>{setSelectedInst(inst);setView("institution");}}
                style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px"}}>
                  <p style={{margin:"0 0 2px",fontSize:14,fontWeight:600,color:"#111827"}}>{inst.name}</p>
                  <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{inst.short} · {inst.departments} depts</p>
                </td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{inst.type}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{inst.state}</td>
                <td style={{padding:"14px 20px",fontSize:14,fontWeight:500,color:"#374151"}}>{inst.vasOnFile}</td>
                <td style={{padding:"14px 20px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:72,background:"#f3f4f6",borderRadius:4,height:7,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${inst.coverage}%`,background:covColor(inst.coverage),borderRadius:4}}/>
                    </div>
                    <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:covBg(inst.coverage),color:covColor(inst.coverage)}}>{inst.coverage}%</span>
                  </div>
                </td>
                <td style={{padding:"14px 20px"}}>
                  {inst.vacant>0  && <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:"#fee2e2",color:"#b91c1c",marginRight:4}}>{inst.vacant} Vacant</span>}
                  {inst.stale>0   && <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:"#fef3c7",color:"#d97706",marginRight:4}}>{inst.stale} Stale</span>}
                  {inst.vacated>0 && <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#6b7280"}}>{inst.vacated} Vacated</span>}
                  {inst.vacant===0&&inst.stale===0&&inst.vacated===0 && <span style={{fontSize:12,color:"#16a34a"}}>✓ Clean</span>}
                </td>
                <td style={{padding:"14px 20px",color:"#9ca3af"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
                </td>
              </tr>
            ))}
            {filteredInst.length===0 && (
              <tr><td colSpan={7} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No institutions match your filters.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{padding:"12px 20px",borderTop:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {filteredInst.length} of {VM_INSTITUTIONS.length} institutions</p>
        </div>
      </div>

      {/* Batches pending */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>BATCHES PENDING VA VALIDATION</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["BATCH","CLIENT","DEPTS TOTAL","AUTO CLEARED","PENDING REVIEW","PROGRESS",""].map((h,i)=>(
              <th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {batchRows.map((b,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px"}}>
                  <p style={{margin:"0 0 2px",fontSize:14,fontWeight:500,color:"#111827"}}>{b.batch}</p>
                  <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Created: {b.created}</p>
                </td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{b.client}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151",textAlign:"center"}}>{b.deptsTotal}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#16a34a",fontWeight:500,textAlign:"center"}}>{b.deptsCleared}</td>
                <td style={{padding:"14px 20px",textAlign:"center"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:"#fef2f2",color:"#b91c1c"}}>{b.deptsPending}</span>
                </td>
                <td style={{padding:"14px 20px",minWidth:160}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{flex:1,background:"#f3f4f6",borderRadius:4,height:8,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${b.progress}%`,background:"#b91c1c",borderRadius:4}}/>
                    </div>
                    <span style={{fontSize:12,fontWeight:600,color:"#374151",minWidth:32}}>{b.progress}%</span>
                  </div>
                </td>
                <td style={{padding:"14px 20px"}}>
                  <button onClick={()=>{setSelectedBatch(b);setView("batch");}}
                    style={{padding:"7px 16px",border:"1px solid #b91c1c",borderRadius:7,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager page={batchPage} pages={Math.max(1,batchPages)} set={setBatchPage}/>
      </div>

      {/* Local Institution Registry */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <SectionHeader title="LOCAL INSTITUTION REGISTRY (MERGED INTO VA)"/>
        <div style={{padding:"0 20px 12px",borderBottom:"1px solid #f3f4f6"}}>
          <p style={{margin:"12px 0 0",fontSize:13,color:"#374151"}}>Local institution data now expands beyond department VA records. Candidate-crowdsourced scholar submissions can enrich registrar email, exams & records email, and payment-required flags, subject to validation.</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["INSTITUTION","REGISTRAR EMAIL","EXAMS & RECORDS","PAYMENT REQUIRED","SOURCE"].map((h,i)=>(
              <th key={i} style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {localRows.map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                <td style={{padding:"13px 20px",fontSize:13,fontWeight:600,color:"#111827"}}>{r.institution}</td>
                <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{r.registrarEmail}</td>
                <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{r.examsRecordsEmail}</td>
                <td style={{padding:"13px 20px",fontSize:13,color:r.paymentRequired==="Yes"?"#b45309":"#166534",fontWeight:500}}>{r.paymentRequired}</td>
                <td style={{padding:"13px 20px",fontSize:12,color:"#374151"}}>{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager page={localPage} pages={Math.max(1,localPages)} set={setLocalPage}/>
      </div>

      {/* Foreign Institution Registry */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <SectionHeader title="FOREIGN INSTITUTION REGISTRY"/>
        <div style={{padding:"0 20px 12px",borderBottom:"1px solid #f3f4f6"}}>
          <p style={{margin:"12px 0 0",fontSize:13,color:"#374151"}}>Manual registry for foreign institutions where verification is performed through portal searches and email, not APIs.</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["INSTITUTION","PORTAL / SYSTEM","EMAIL","MODE"].map((h,i)=>(
              <th key={i} style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {foreignRows.map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                <td style={{padding:"13px 20px",fontSize:13,fontWeight:600,color:"#111827"}}>{r.institution}</td>
                <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{r.portalName}</td>
                <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{r.institutionEmail}</td>
                <td style={{padding:"13px 20px",fontSize:12,color:"#374151"}}>{r.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager page={foreignPage} pages={Math.max(1,foreignPages)} set={setForeignPage}/>
      </div>

      {/* Scholar Verification Intake */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <SectionHeader title="SCHOLAR VERIFICATION INTAKE"/>
        <div style={{padding:"16px 20px"}}>
          <p style={{margin:"0 0 12px",fontSize:13,color:"#374151"}}>Scholar flows now collect the routing information needed for verification, not just the downstream response. Type 1 carries full academic details; Type 2 carries admission-status-only fields.</p>
          <ul style={{margin:0,paddingLeft:18,fontSize:13,color:"#374151",lineHeight:1.8}}>
            <li>Existing Scholar vs New Scholar is captured at intake.</li>
            <li>Registrar + Exams & Records routing is captured where applicable.</li>
            <li>Candidate crowdsourcing can seed institution contact improvements for validation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VMVARegistry;
