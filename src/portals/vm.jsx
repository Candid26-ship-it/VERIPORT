import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

// ─── VM VA Registry: Coverage Gaps View (item 11) ────────────────────────────
const COVERAGE_GAPS = [
  { institution:"Ahmadu Bello University",   short:"ABU",    role:"HOD",              faculty:"Engineering",    dept:"Mechanical Engineering", gapType:"Vacant",  pendingTasks:8,  lastKnown:"—",                           instId:"abu",    lastActivity:"never"   },
  { institution:"University of Benin",       short:"UNIBEN", role:"HOD",              faculty:"Science",        dept:"Biochemistry",           gapType:"Vacant",  pendingTasks:6,  lastKnown:"—",                           instId:"uniben", lastActivity:"never"   },
  { institution:"Ahmadu Bello University",   short:"ABU",    role:"HOD",              faculty:"Science",        dept:"Microbiology",           gapType:"Vacant",  pendingTasks:5,  lastKnown:"—",                           instId:"abu",    lastActivity:"never"   },
  { institution:"University of Lagos",       short:"UNILAG", role:"HOD",              faculty:"Medicine",       dept:"Medicine & Surgery",     gapType:"Vacated", pendingTasks:5,  lastKnown:"Prof. Kemi Adeola (vacated)",  instId:"unilag", lastActivity:"over180" },
  { institution:"University of Benin",       short:"UNIBEN", role:"HOD",              faculty:"Engineering",    dept:"Chemical Engineering",   gapType:"Vacant",  pendingTasks:4,  lastKnown:"—",                           instId:"uniben", lastActivity:"never"   },
  { institution:"Lagos State University",    short:"LASU",   role:"HOD",              faculty:"Social Science", dept:"Economics",              gapType:"Stale",   pendingTasks:4,  lastKnown:"Dr. Tunde Olawale (stale)",   instId:"lasu",   lastActivity:"90"      },
  { institution:"Obafemi Awolowo University",short:"OAU",    role:"Registrar",        faculty:"—",              dept:"—",                      gapType:"Stale",   pendingTasks:3,  lastKnown:"registrar@oauife.edu.ng",     instId:"oau",    lastActivity:"90"      },
  { institution:"University of Lagos",       short:"UNILAG", role:"Vice Chancellor",  faculty:"—",              dept:"—",                      gapType:"Vacant",  pendingTasks:3,  lastKnown:"—",                           instId:"unilag", lastActivity:"never"   },
  { institution:"Federal Univ. of Tech.",    short:"FUTA",   role:"HOD",              faculty:"Engineering",    dept:"Computer Engineering",   gapType:"Vacant",  pendingTasks:2,  lastKnown:"—",                           instId:"futa",   lastActivity:"never"   },
  { institution:"Moshood Abiola Polytechnic",short:"MAPOLY", role:"Deputy Registrar", faculty:"—",              dept:"—",                      gapType:"Vacated", pendingTasks:2,  lastKnown:"Mrs. Bisi Adeyemi (vacated)", instId:"mapoly", lastActivity:"over180" },
  { institution:"Ahmadu Bello University",   short:"ABU",    role:"HOD",              faculty:"Arts",           dept:"History",                gapType:"Stale",   pendingTasks:1,  lastKnown:"Dr. Musa Garba (stale)",      instId:"abu",    lastActivity:"180"     },
  { institution:"University of Ibadan",      short:"UI",     role:"HOD",              faculty:"Education",      dept:"Educational Psychology", gapType:"Vacant",  pendingTasks:1,  lastKnown:"—",                           instId:"ui",     lastActivity:"never"   },
];

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

// ─── VM VA Registry: Institution data ────────────────────────────────────────
const VM_INSTITUTIONS = [
  { id:"unilag", name:"University of Lagos",          short:"UNILAG", type:"University",   ownership:"Public",  state:"Lagos",  faculties:12, departments:68, vasOnFile:41, coverage:60, stale:4, vacant:8,  vacated:2, lastActivity:"30"    },
  { id:"oau",    name:"Obafemi Awolowo University",   short:"OAU",    type:"University",   ownership:"Public",  state:"Osun",   faculties:9,  departments:52, vasOnFile:28, coverage:54, stale:6, vacant:9,  vacated:3, lastActivity:"30"    },
  { id:"ui",     name:"University of Ibadan",         short:"UI",     type:"University",   ownership:"Public",  state:"Oyo",    faculties:13, departments:75, vasOnFile:52, coverage:69, stale:3, vacant:6,  vacated:1, lastActivity:"90"    },
  { id:"uniben", name:"University of Benin",          short:"UNIBEN", type:"University",   ownership:"Public",  state:"Edo",    faculties:11, departments:60, vasOnFile:33, coverage:55, stale:5, vacant:10, vacated:2, lastActivity:"90"    },
  { id:"abu",    name:"Ahmadu Bello University",      short:"ABU",    type:"University",   ownership:"Public",  state:"Kaduna", faculties:14, departments:80, vasOnFile:44, coverage:55, stale:7, vacant:12, vacated:4, lastActivity:"180"   },
  { id:"lasu",   name:"Lagos State University",       short:"LASU",   type:"University",   ownership:"State",   state:"Lagos",  faculties:8,  departments:45, vasOnFile:22, coverage:49, stale:3, vacant:8,  vacated:1, lastActivity:"30"    },
  { id:"futa",   name:"Federal Univ. of Tech., Akure",short:"FUTA",  type:"University",   ownership:"Federal", state:"Ondo",   faculties:7,  departments:38, vasOnFile:18, coverage:47, stale:4, vacant:6,  vacated:2, lastActivity:"over180"},
  { id:"mapoly", name:"Moshood Abiola Polytechnic",   short:"MAPOLY", type:"Polytechnic",  ownership:"State",   state:"Ogun",   faculties:6,  departments:30, vasOnFile:12, coverage:40, stale:2, vacant:5,  vacated:1, lastActivity:"over180"},
];

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

// ─── VM VA Registry: Institution Detail (item 8) ─────────────────────────────
const VA_REGISTRY_DATA = {
  unilag: {
    instLevel: [
      { role:"Registrar",        name:"Dr. Emeka Nwachukwu", email:"registrar@unilag.edu.ng",     phone:"+234-801-234-5678", source:"Direct",     lastConfirmed:"Feb 14, 2026", status:"Validated", onboardingStatus:"Onboarded",     evidencePointer:"Staff directory — registry.unilag.edu.ng"    },
      { role:"Deputy Registrar", name:"Mrs. Shade Okafor",   email:"deputyreg@unilag.edu.ng",     phone:"+234-802-345-6789", source:"Direct",     lastConfirmed:"Jan 10, 2026", status:"Stale",     onboardingStatus:"Onboarded",     evidencePointer:"Staff directory — registry.unilag.edu.ng"    },
      { role:"Dean of Students", name:"Prof. Jide Adekunle", email:"deanstudents@unilag.edu.ng",  phone:"+234-803-456-7890", source:"Direct",     lastConfirmed:"Feb 20, 2026", status:"Validated", onboardingStatus:"Onboarded",     evidencePointer:"Official appointment letter — Feb 2026"      },
      { role:"Vice Chancellor",  name:"",                    email:"",                            phone:"",                  source:"",           lastConfirmed:"—",            status:"Vacant",    onboardingStatus:"Not Onboarded", evidencePointer:"—"                                           },
    ],
    deptLevel: [
      { faculty:"Science",     dept:"Computer Science",       name:"Dr. Akpan Bassey",   email:"akpan@unilag.edu.ng",         phone:"+234-804-111-2222", source:"Direct",     lastConfirmed:"Feb 22, 2026", status:"Validated", onboardingStatus:"Onboarded",     evidencePointer:"Staff ID — FE campus visit Feb 2026"         },
      { faculty:"Science",     dept:"Mathematics",            name:"Dr. Funke Adeyemi",  email:"funke.adeyemi@unilag.edu.ng", phone:"+234-804-222-3333", source:"Scholar",    lastConfirmed:"Jan 30, 2026", status:"Stale",     onboardingStatus:"Onboarded",     evidencePointer:"Scholar candidate submission — Jan 2026"     },
      { faculty:"Science",     dept:"Physics",                name:"",                   email:"",                            phone:"",                  source:"",           lastConfirmed:"—",            status:"Vacant",    onboardingStatus:"Not Onboarded", evidencePointer:"—"                                           },
      { faculty:"Engineering", dept:"Civil Engineering",      name:"Prof. Olu Babatunde",email:"olu.babatunde@unilag.edu.ng", phone:"+234-804-333-4444", source:"Direct",     lastConfirmed:"Feb 18, 2026", status:"Validated", onboardingStatus:"Onboarded",     evidencePointer:"Staff directory — engineering.unilag.edu.ng" },
      { faculty:"Engineering", dept:"Electrical Engineering", name:"Dr. Ngozi Eze",      email:"ngozi.eze@unilag.edu.ng",     phone:"+234-804-444-5555", source:"FE-sourced", lastConfirmed:"Dec 10, 2025", status:"Stale",     onboardingStatus:"Onboarded",     evidencePointer:"FE campus visit — staff ID photo on file"    },
      { faculty:"Engineering", dept:"Mechanical Engineering", name:"",                   email:"",                            phone:"",                  source:"",           lastConfirmed:"—",            status:"Vacant",    onboardingStatus:"Not Onboarded", evidencePointer:"—"                                           },
      { faculty:"Law",         dept:"Public Law",             name:"Prof. Chidi Nnaji",  email:"chidi.nnaji@unilag.edu.ng",   phone:"+234-804-555-6666", source:"Direct",     lastConfirmed:"Feb 01, 2026", status:"Validated", onboardingStatus:"Onboarded",     evidencePointer:"Official appointment letter — Jan 2026"      },
      { faculty:"Medicine",    dept:"Medicine & Surgery",     name:"Prof. Kemi Adeola",  email:"",                            phone:"+234-804-666-7777", source:"Direct",     lastConfirmed:"Jan 05, 2026", status:"Vacated",   onboardingStatus:"Suspended",     evidencePointer:"Staff ID on file — contact now inactive"     },
    ],
  },
};

// Fallback data for other institutions
const defaultVAData = (inst) => ({
  instLevel:[
    { role:"Registrar",       name:`Registrar, ${inst.short}`, email:`registrar@${inst.short.toLowerCase()}.edu.ng`, phone:"",source:"Direct", lastConfirmed:"Jan 2026", status:"Validated", onboardingStatus:"Onboarded",     evidencePointer:"Staff directory" },
    { role:"Deputy Registrar",name:"",email:"",phone:"",source:"",lastConfirmed:"—",status:"Vacant", onboardingStatus:"Not Onboarded", evidencePointer:"—" },
    { role:"Dean of Students",name:"",email:"",phone:"",source:"",lastConfirmed:"—",status:"Vacant", onboardingStatus:"Not Onboarded", evidencePointer:"—" },
    { role:"Vice Chancellor", name:"",email:"",phone:"",source:"",lastConfirmed:"—",status:"Vacant", onboardingStatus:"Not Onboarded", evidencePointer:"—" },
  ],
  deptLevel:[
    { faculty:"Science",    dept:"Computer Science", name:`HOD CompSci, ${inst.short}`, email:`hod.cs@${inst.short.toLowerCase()}.edu.ng`, phone:"",source:"Direct", lastConfirmed:"Jan 2026", status:"Validated", onboardingStatus:"Onboarded",     evidencePointer:"Staff directory" },
    { faculty:"Science",    dept:"Mathematics",      name:"",email:"",phone:"",source:"",lastConfirmed:"—",status:"Vacant", onboardingStatus:"Not Onboarded", evidencePointer:"—" },
    { faculty:"Engineering",dept:"Civil Engineering",name:"",email:"",phone:"",source:"",lastConfirmed:"—",status:"Vacant", onboardingStatus:"Not Onboarded", evidencePointer:"—" },
  ],
});

function VMInstitutionDetail({ inst, onBack }) {
  const data = VA_REGISTRY_DATA[inst.id] || defaultVAData(inst);
  const [showAssignInst,  setShowAssignInst]  = useState(false);
  const [showAssignDept,  setShowAssignDept]  = useState(false);
  const [assignTarget,    setAssignTarget]    = useState(null);
  const [instVAs,         setInstVAs]         = useState(data.instLevel);
  const [deptVAs,         setDeptVAs]         = useState(data.deptLevel);
  const [saved,           setSaved]           = useState("");

  // Item 9 — Institution-level form state
  const [iRole,     setIRole]     = useState("Registrar");
  const [iName,     setIName]     = useState("");
  const [iEmail,    setIEmail]    = useState("");
  const [iPhone,    setIPhone]    = useState("");
  const [iDesig,    setIDesig]    = useState("");
  const [iOnboardSt,setIOnboardSt]= useState("Not Onboarded");
  const [iEvidence, setIEvidence] = useState("");
  const [iSource,   setISource]   = useState("Direct");
  const [iErrors,   setIErrors]   = useState({});
  const [iSaved,    setISaved]    = useState(false);

  // Item 10 — Department-level form state
  const [dFaculty,  setDFaculty]  = useState("");
  const [dDept,     setDDept]     = useState("");
  const [dName,     setDName]     = useState("");
  const [dEmail,    setDEmail]    = useState("");
  const [dPhone,    setDPhone]    = useState("");
  const [dDesig,    setDDesig]    = useState("");
  const [dOnboardSt,setDOnboardSt]= useState("Not Onboarded");
  const [dEvidence, setDEvidence] = useState("");
  const [dSource,   setDSource]   = useState("Direct");
  const [dErrors,   setDErrors]   = useState({});
  const [dSaved,    setDSaved]    = useState(false);

  const INST_ROLES = ["Registrar","Deputy Registrar","Dean of Students","Vice Chancellor","Rector"];
  const SOURCES    = ["Direct","FE-sourced","Scholar-sourced"];

  // Gap 4 & 5 — per-table filters and in-table search
  const [iSearchQ,    setISearchQ]    = useState("");
  const [iFilterRole, setIFilterRole] = useState("All");
  const [iFilterStat, setIFilterStat] = useState("All");
  const [iFilterSrc,  setIFilterSrc]  = useState("All");
  const [dSearchQ,    setDSearchQ]    = useState("");
  const [dFilterFac,  setDFilterFac]  = useState("All");
  const [dFilterDept, setDFilterDept] = useState("All");
  const [dFilterStat, setDFilterStat] = useState("All");
  const [dFilterSrc,  setDFilterSrc]  = useState("All");

  const faculties   = ["All", ...Array.from(new Set(deptVAs.map(v=>v.faculty).filter(f=>f&&f!=="—")))];
  const depts       = dFilterFac==="All"
    ? ["All", ...Array.from(new Set(deptVAs.map(v=>v.dept).filter(d=>d&&d!=="—")))]
    : ["All", ...Array.from(new Set(deptVAs.filter(v=>v.faculty===dFilterFac).map(v=>v.dept)))];

  const filteredInstVAs = instVAs.filter(v => {
    const q = iSearchQ.toLowerCase();
    const matchQ   = !q || v.role.toLowerCase().includes(q) || v.name.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || (v.phone||"").includes(q);
    const matchRole= iFilterRole==="All" || v.role===iFilterRole;
    const matchStat= iFilterStat==="All" || v.status===iFilterStat;
    const matchSrc = iFilterSrc==="All"  || v.source===iFilterSrc;
    return matchQ && matchRole && matchStat && matchSrc;
  });

  const filteredDeptVAs = deptVAs.filter(v => {
    const q = dSearchQ.toLowerCase();
    const matchQ   = !q || v.faculty.toLowerCase().includes(q) || v.dept.toLowerCase().includes(q) || (v.name||"").toLowerCase().includes(q) || (v.email||"").toLowerCase().includes(q);
    const matchFac = dFilterFac==="All"  || v.faculty===dFilterFac;
    const matchDpt = dFilterDept==="All" || v.dept===dFilterDept;
    const matchStat= dFilterStat==="All" || v.status===dFilterStat;
    const matchSrc = dFilterSrc==="All"  || v.source===dFilterSrc;
    return matchQ && matchFac && matchDpt && matchStat && matchSrc;
  });

  const selStyle = {padding:"6px 8px",border:"1.5px solid #e5e7eb",borderRadius:6,fontSize:12,color:"#374151",background:"white",outline:"none",cursor:"pointer"};
  const srchStyle = {padding:"6px 10px 6px 26px",border:"1.5px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",color:"#374151",width:160};

  const resetInstForm = () => { setIRole("Registrar");setIName("");setIEmail("");setIPhone("");setIDesig("");setIOnboardSt("Not Onboarded");setIEvidence("");setISource("Direct");setIErrors({});setISaved(false); };
  const resetDeptForm = () => { setDFaculty("");setDDept("");setDName("");setDEmail("");setDPhone("");setDDesig("");setDOnboardSt("Not Onboarded");setDEvidence("");setDSource("Direct");setDErrors({});setDSaved(false); };

  const handleSaveInst = () => {
    const e = {};
    if (!iName.trim())  e.iName  = "Name is required";
    if (!iEmail.trim()) e.iEmail = "Email is required";
    if (iEmail && !iEmail.includes("@")) e.iEmail = "Enter a valid email";
    setIErrors(e);
    if (Object.keys(e).length > 0) return;
    const today = new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}).replace(/ /g," ");
    setInstVAs(prev => {
      const exists = prev.findIndex(v => v.role === iRole);
      const record = { role:iRole, name:iName, email:iEmail, phone:iPhone, desig:iDesig, onboardingStatus:iOnboardSt, evidencePointer:iEvidence, source:iSource, lastConfirmed:"Today", status:"Validated" };
      return exists >= 0 ? prev.map((v,i) => i===exists ? record : v) : [...prev, record];
    });
    setISaved(true);
    setTimeout(() => { setShowAssignInst(false); resetInstForm(); }, 1200);
  };

  const handleSaveDept = () => {
    const e = {};
    if (!dFaculty.trim()) e.dFaculty = "Faculty is required";
    if (!dDept.trim())    e.dDept    = "Department is required";
    if (!dName.trim())    e.dName    = "Name is required";
    if (!dEmail.trim())   e.dEmail   = "Email is required";
    if (dEmail && !dEmail.includes("@")) e.dEmail = "Enter a valid email";
    setDErrors(e);
    if (Object.keys(e).length > 0) return;
    setDeptVAs(prev => {
      const exists = prev.findIndex(v => v.faculty===dFaculty && v.dept===dDept);
      const record = { faculty:dFaculty, dept:dDept, name:dName, email:dEmail, phone:dPhone, desig:dDesig, onboardingStatus:dOnboardSt, evidencePointer:dEvidence, source:dSource, lastConfirmed:"Today", status:"Validated" };
      return exists >= 0 ? prev.map((v,i) => i===exists ? record : v) : [...prev, record];
    });
    setDSaved(true);
    setTimeout(() => { setShowAssignDept(false); resetDeptForm(); }, 1200);
  };

  const inp = { width:"100%", padding:"9px 12px", border:"1.5px solid #e5e7eb", borderRadius:8, fontSize:14, outline:"none", boxSizing:"border-box", color:"#111827" };
  const lbl = { display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 };

  // Status badge helper
  const stColor = s => s==="Validated"?"#16a34a":s==="Stale"?"#d97706":s==="Vacated"?"#6b7280":"#b91c1c";
  const stBg    = s => s==="Validated"?"#dcfce7":s==="Stale"?"#fef3c7":s==="Vacated"?"#f3f4f6":"#fee2e2";

  const StatBadge = ({s}) => (
    <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:stBg(s),color:stColor(s)}}>{s}</span>
  );

  // Summary counts
  const allVAs   = [...instVAs, ...deptVAs];
  const validated = allVAs.filter(v=>v.status==="Validated").length;
  const stale     = allVAs.filter(v=>v.status==="Stale").length;
  const vacant    = allVAs.filter(v=>v.status==="Vacant").length;
  const vacated   = allVAs.filter(v=>v.status==="Vacated").length;
  const coverage  = Math.round((validated / allVAs.length)*100);

  const th = (label) => (
    <th style={{padding:"10px 18px",textAlign:"left",fontSize:11,fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,background:"#fafafa"}}>{label}</th>
  );
  const td = (content, opts={}) => (
    <td style={{padding:"13px 18px",fontSize:13,color:"#374151",...opts}}>{content||<span style={{color:"#d1d5db"}}>—</span>}</td>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Back */}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        VA Registry
      </button>

      {/* Header */}
      <div style={{marginBottom:24}}>
        <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{inst.name}</h1>
        <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{inst.short} · {inst.type} · {inst.ownership} · {inst.state} State</p>
      </div>

      {/* Summary stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:24}}>
        {[
          {label:"FACULTIES",    value:inst.faculties,  color:"#374151"},
          {label:"DEPARTMENTS",  value:inst.departments,color:"#374151"},
          {label:"VAs ON FILE",  value:allVAs.filter(v=>v.name).length, color:"#374151"},
          {label:"VALIDATED",    value:validated,       color:"#16a34a"},
          {label:"STALE",        value:stale,           color:"#d97706"},
          {label:"VACANT",       value:vacant+vacated,  color:"#b91c1c"},
        ].map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
            <p style={{margin:"0 0 4px",fontSize:10,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:22,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Coverage bar */}
      <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:16}}>
        <p style={{margin:0,fontSize:13,fontWeight:600,color:"#374151",flexShrink:0}}>Registry Coverage</p>
        <div style={{flex:1,background:"#f3f4f6",borderRadius:4,height:10,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${coverage}%`,background:coverage>=70?"#16a34a":coverage>=50?"#d97706":"#b91c1c",borderRadius:4,transition:"width .3s"}}/>
        </div>
        <span style={{fontSize:14,fontWeight:700,color:coverage>=70?"#16a34a":coverage>=50?"#d97706":"#b91c1c",flexShrink:0}}>{coverage}%</span>
        <span style={{fontSize:12,color:"#9ca3af",flexShrink:0}}>{validated} of {allVAs.length} roles have validated contacts</span>
      </div>

      {/* ── TOP TABLE: Institution-level VAs ─────────────────────────────────── */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <p style={{margin:"0 0 2px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>INSTITUTION-LEVEL VAs</p>
            <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Registrar, Deputy Registrar, Dean of Students, Vice Chancellor / Rector</p>
          </div>
          <button onClick={()=>{ setAssignTarget({type:"inst"}); setShowAssignInst(true); }}
            style={{padding:"8px 16px",border:"1.5px solid #b91c1c",borderRadius:7,background:"white",fontSize:13,fontWeight:500,color:"#b91c1c",cursor:"pointer"}}>
            + Assign VA
          </button>
        </div>
        {/* Filter row */}
        <div style={{padding:"10px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",background:"#fafafa"}}>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",fontSize:11}}>🔍</span>
            <input value={iSearchQ} onChange={e=>setISearchQ(e.target.value)} placeholder="Search role, name, email..."
              style={srchStyle}/>
          </div>
          <select value={iFilterRole} onChange={e=>setIFilterRole(e.target.value)} style={selStyle}>
            <option value="All">All Roles</option>
            {INST_ROLES.map(r=><option key={r}>{r}</option>)}
          </select>
          <select value={iFilterStat} onChange={e=>setIFilterStat(e.target.value)} style={selStyle}>
            {["All","Validated","Stale","Vacant","Vacated"].map(s=><option key={s} value={s==="All"?"All":s}>{s==="All"?"All Status":s}</option>)}
          </select>
          <select value={iFilterSrc} onChange={e=>setIFilterSrc(e.target.value)} style={selStyle}>
            <option value="All">All Sources</option>
            {SOURCES.map(s=><option key={s}>{s}</option>)}
          </select>
          <span style={{fontSize:12,color:"#9ca3af",marginLeft:"auto"}}>{filteredInstVAs.length} of {instVAs.length}</span>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["ROLE","NAME","EMAIL","PHONE","STATUS","ONBOARDING","EVIDENCE","SOURCE","LAST CONFIRMED"].map(h=>th(h))}</tr></thead>
          <tbody>
            {filteredInstVAs.map((v,i)=>{
              const obColor = v.onboardingStatus==="Onboarded"?"#16a34a":v.onboardingStatus==="Suspended"?"#b91c1c":"#6b7280";
              const obBg    = v.onboardingStatus==="Onboarded"?"#dcfce7":v.onboardingStatus==="Suspended"?"#fee2e2":"#f3f4f6";
              return (
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:v.status==="Vacant"||v.status==="Vacated"?"#fffbf0":"white"}}>
                  <td style={{padding:"13px 18px",fontSize:13,fontWeight:600,color:"#111827"}}>{v.role}</td>
                  {td(v.name,    {fontWeight:v.name?500:400})}
                  {td(v.email,   {color:v.email?"#3b82f6":"#d1d5db"})}
                  {td(v.phone)}
                  <td style={{padding:"13px 18px"}}><StatBadge s={v.status}/></td>
                  <td style={{padding:"13px 18px"}}><span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:obBg,color:obColor}}>{v.onboardingStatus||"Not Onboarded"}</span></td>
                  {td(v.evidencePointer||"—", {color:v.evidencePointer&&v.evidencePointer!=="—"?"#374151":"#d1d5db",fontSize:12})}
                  {td(v.source)}
                  {td(v.lastConfirmed,{color:v.lastConfirmed==="—"?"#d1d5db":"#6b7280"})}
                </tr>
              );
            })}
            {filteredInstVAs.length===0 && (
              <tr><td colSpan={9} style={{padding:"24px",textAlign:"center",color:"#9ca3af",fontSize:13}}>No records match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── BOTTOM TABLE: Department-level VAs (HODs) ────────────────────────── */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <p style={{margin:"0 0 2px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>DEPARTMENT-LEVEL VAs (HODs)</p>
            <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Head of Department per faculty and department</p>
          </div>
          <button onClick={()=>{ setAssignTarget({type:"dept"}); setShowAssignDept(true); }}
            style={{padding:"8px 16px",border:"1.5px solid #b91c1c",borderRadius:7,background:"white",fontSize:13,fontWeight:500,color:"#b91c1c",cursor:"pointer"}}>
            + Assign VA
          </button>
        </div>
        {/* Filter row */}
        <div style={{padding:"10px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",background:"#fafafa"}}>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",fontSize:11}}>🔍</span>
            <input value={dSearchQ} onChange={e=>setDSearchQ(e.target.value)} placeholder="Search faculty, dept, name..."
              style={srchStyle}/>
          </div>
          <select value={dFilterFac} onChange={e=>{setDFilterFac(e.target.value);setDFilterDept("All");}} style={selStyle}>
            {faculties.map(f=><option key={f} value={f}>{f==="All"?"All Faculties":f}</option>)}
          </select>
          <select value={dFilterDept} onChange={e=>setDFilterDept(e.target.value)} style={selStyle}>
            {depts.map(d=><option key={d} value={d}>{d==="All"?"All Depts":d}</option>)}
          </select>
          <select value={dFilterStat} onChange={e=>setDFilterStat(e.target.value)} style={selStyle}>
            {["All","Validated","Stale","Vacant","Vacated"].map(s=><option key={s} value={s==="All"?"All":s}>{s==="All"?"All Status":s}</option>)}
          </select>
          <select value={dFilterSrc} onChange={e=>setDFilterSrc(e.target.value)} style={selStyle}>
            <option value="All">All Sources</option>
            {SOURCES.map(s=><option key={s}>{s}</option>)}
          </select>
          <span style={{fontSize:12,color:"#9ca3af",marginLeft:"auto"}}>{filteredDeptVAs.length} of {deptVAs.length}</span>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["FACULTY","DEPARTMENT","HOD NAME","EMAIL","PHONE","STATUS","ONBOARDING","EVIDENCE","SOURCE","LAST CONFIRMED"].map(h=>th(h))}</tr></thead>
          <tbody>
            {filteredDeptVAs.map((v,i)=>{
              const obColor = v.onboardingStatus==="Onboarded"?"#16a34a":v.onboardingStatus==="Suspended"?"#b91c1c":"#6b7280";
              const obBg    = v.onboardingStatus==="Onboarded"?"#dcfce7":v.onboardingStatus==="Suspended"?"#fee2e2":"#f3f4f6";
              return (
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:v.status==="Vacant"||v.status==="Vacated"?"#fffbf0":"white"}}>
                  {td(v.faculty, {fontWeight:500,color:"#111827"})}
                  {td(v.dept,    {fontWeight:500,color:"#111827"})}
                  {td(v.name)}
                  {td(v.email,   {color:v.email?"#3b82f6":"#d1d5db"})}
                  {td(v.phone)}
                  <td style={{padding:"13px 18px"}}><StatBadge s={v.status}/></td>
                  <td style={{padding:"13px 18px"}}><span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:obBg,color:obColor}}>{v.onboardingStatus||"Not Onboarded"}</span></td>
                  {td(v.evidencePointer||"—", {color:v.evidencePointer&&v.evidencePointer!=="—"?"#374151":"#d1d5db",fontSize:12})}
                  {td(v.source)}
                  {td(v.lastConfirmed,{color:v.lastConfirmed==="—"?"#d1d5db":"#6b7280"})}
                </tr>
              );
            })}
            {filteredDeptVAs.length===0 && (
              <tr><td colSpan={10} style={{padding:"24px",textAlign:"center",color:"#9ca3af",fontSize:13}}>No records match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 20px",display:"flex",gap:20,flexWrap:"wrap"}}>
        <p style={{margin:0,fontSize:12,fontWeight:600,color:"#374151",flexShrink:0}}>Status legend:</p>
        {[["Validated","#16a34a","#dcfce7"],["Stale","#d97706","#fef3c7"],["Vacant","#b91c1c","#fee2e2"],["Vacated","#6b7280","#f3f4f6"]].map(([s,c,bg])=>(
          <span key={s} style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:bg,color:c}}>{s}</span>
        ))}
        <p style={{margin:0,fontSize:12,color:"#9ca3af",flexShrink:0}}>Rows highlighted in amber have Vacant or Vacated status.</p>
      </div>

      {/* ── Item 9: Assign Institution-Level VA ──────────────────────────────── */}
      {showAssignInst && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,width:"90%",maxWidth:520,boxShadow:"0 8px 32px rgba(0,0,0,0.18)",overflow:"hidden"}}>
            <div style={{padding:"16px 24px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <h3 style={{margin:"0 0 2px",fontSize:16,fontWeight:700,color:"#111827"}}>Assign Institution-Level VA</h3>
                <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{inst.name}</p>
              </div>
              <button onClick={()=>{setShowAssignInst(false);resetInstForm();}} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{padding:"24px 24px"}}>
              {/* Role */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Role <span style={{color:"#b91c1c"}}>*</span></label>
                <div style={{position:"relative"}}>
                  <select value={iRole} onChange={e=>setIRole(e.target.value)}
                    style={{...inp,appearance:"none",paddingRight:32,cursor:"pointer"}}>
                    {INST_ROLES.map(r=><option key={r}>{r}</option>)}
                  </select>
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
                </div>
              </div>
              {/* Name */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Full Name <span style={{color:"#b91c1c"}}>*</span></label>
                <input value={iName} onChange={e=>setIName(e.target.value)} placeholder="e.g. Dr. Emeka Nwachukwu"
                  style={{...inp,borderColor:iErrors.iName?"#ef4444":"#e5e7eb"}}/>
                {iErrors.iName && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{iErrors.iName}</p>}
              </div>
              {/* Email */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Institutional Email <span style={{color:"#b91c1c"}}>*</span></label>
                <input value={iEmail} onChange={e=>setIEmail(e.target.value)} placeholder={`e.g. registrar@${inst.short.toLowerCase()}.edu.ng`}
                  style={{...inp,borderColor:iErrors.iEmail?"#ef4444":"#e5e7eb"}}/>
                {iErrors.iEmail && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{iErrors.iEmail}</p>}
              </div>
              {/* Phone */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Phone <span style={{fontSize:11,fontWeight:400,color:"#9ca3af"}}>(optional)</span></label>
                <input value={iPhone} onChange={e=>setIPhone(e.target.value)} placeholder="e.g. +234-801-234-5678"
                  style={inp}/>
              </div>
              {/* Designation */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Designation <span style={{fontSize:11,fontWeight:400,color:"#9ca3af"}}>(optional)</span></label>
                <input value={iDesig} onChange={e=>setIDesig(e.target.value)} placeholder="e.g. Deputy Registrar, Academic Affairs"
                  style={inp}/>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Free-text title used in evidential reports. Different from Role — Role drives routing; Designation is descriptive.</p>
              </div>
              {/* Onboarding Status */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Onboarding Status <span style={{color:"#b91c1c"}}>*</span></label>
                <div style={{position:"relative"}}>
                  <select value={iOnboardSt} onChange={e=>setIOnboardSt(e.target.value)}
                    style={{...inp,appearance:"none",paddingRight:32,cursor:"pointer"}}>
                    {["Not Onboarded","Onboarded","Suspended"].map(s=><option key={s}>{s}</option>)}
                  </select>
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
                </div>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Not Onboarded = contact captured, OTP/PIN not yet completed. Onboarded = verified, eligible for assignment. Suspended = access blocked.</p>
              </div>
              {/* Evidence Pointer */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Evidence Pointer <span style={{fontSize:11,fontWeight:400,color:"#9ca3af"}}>(optional)</span></label>
                <input value={iEvidence} onChange={e=>setIEvidence(e.target.value)} placeholder="e.g. Staff ID — FE visit Feb 2026 / staff directory URL"
                  style={inp}/>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Reference to the document or artefact supporting this contact's legitimacy. Required for FE-sourced contacts.</p>
              </div>
              {/* Source */}
              <div style={{marginBottom:20}}>
                <label style={lbl}>Source <span style={{color:"#b91c1c"}}>*</span></label>
                <div style={{position:"relative"}}>
                  <select value={iSource} onChange={e=>setISource(e.target.value)}
                    style={{...inp,appearance:"none",paddingRight:32,cursor:"pointer"}}>
                    {SOURCES.map(s=><option key={s}>{s}</option>)}
                  </select>
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
                </div>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Direct = Ops-verified. FE-sourced = Field Executive visit. Scholar-sourced = candidate-provided.</p>
              </div>
              {iSaved && <div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:8,padding:"10px 14px",color:"#16a34a",fontSize:13,fontWeight:500,marginBottom:14}}>✓ VA assigned successfully — record updated</div>}
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",paddingTop:4}}>
                <button onClick={()=>{setShowAssignInst(false);resetInstForm();}} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
                <button onClick={handleSaveInst} disabled={iSaved}
                  style={{padding:"9px 24px",border:"none",borderRadius:8,background:iSaved?"#86efac":"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:iSaved?"default":"pointer"}}>
                  Save VA Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Item 10: Assign Department-Level VA (HOD) ─────────────────────────── */}
      {showAssignDept && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,width:"90%",maxWidth:520,boxShadow:"0 8px 32px rgba(0,0,0,0.18)",overflow:"hidden",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{padding:"16px 24px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"white",zIndex:1}}>
              <div>
                <h3 style={{margin:"0 0 2px",fontSize:16,fontWeight:700,color:"#111827"}}>Assign Department-Level VA (HOD)</h3>
                <p style={{margin:0,fontSize:12,color:"#6b7280"}}>{inst.name}</p>
              </div>
              <button onClick={()=>{setShowAssignDept(false);resetDeptForm();}} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{padding:"24px 24px"}}>
              {/* Faculty */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Faculty / School <span style={{color:"#b91c1c"}}>*</span></label>
                <input value={dFaculty} onChange={e=>setDFaculty(e.target.value)} placeholder="e.g. Faculty of Science"
                  style={{...inp,borderColor:dErrors.dFaculty?"#ef4444":"#e5e7eb"}}/>
                {dErrors.dFaculty && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{dErrors.dFaculty}</p>}
              </div>
              {/* Department */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Department <span style={{color:"#b91c1c"}}>*</span></label>
                <input value={dDept} onChange={e=>setDDept(e.target.value)} placeholder="e.g. Computer Science"
                  style={{...inp,borderColor:dErrors.dDept?"#ef4444":"#e5e7eb"}}/>
                {dErrors.dDept && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{dErrors.dDept}</p>}
              </div>
              {/* HOD Name */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>HOD Full Name <span style={{color:"#b91c1c"}}>*</span></label>
                <input value={dName} onChange={e=>setDName(e.target.value)} placeholder="e.g. Dr. Ngozi Adeleke"
                  style={{...inp,borderColor:dErrors.dName?"#ef4444":"#e5e7eb"}}/>
                {dErrors.dName && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{dErrors.dName}</p>}
              </div>
              {/* Email */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Institutional Email <span style={{color:"#b91c1c"}}>*</span></label>
                <input value={dEmail} onChange={e=>setDEmail(e.target.value)} placeholder={`e.g. hod.cs@${inst.short.toLowerCase()}.edu.ng`}
                  style={{...inp,borderColor:dErrors.dEmail?"#ef4444":"#e5e7eb"}}/>
                {dErrors.dEmail && <p style={{margin:"4px 0 0",fontSize:12,color:"#ef4444"}}>{dErrors.dEmail}</p>}
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Must be an official institutional email — not a personal address.</p>
              </div>
              {/* Phone */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Phone <span style={{fontSize:11,fontWeight:400,color:"#9ca3af"}}>(optional)</span></label>
                <input value={dPhone} onChange={e=>setDPhone(e.target.value)} placeholder="e.g. +234-801-234-5678"
                  style={inp}/>
              </div>
              {/* Designation */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Designation <span style={{fontSize:11,fontWeight:400,color:"#9ca3af"}}>(optional)</span></label>
                <input value={dDesig} onChange={e=>setDDesig(e.target.value)} placeholder="e.g. Head of Department, Computer Science"
                  style={inp}/>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Free-text title used in evidential reports. Different from Role — Role drives routing; Designation is descriptive.</p>
              </div>
              {/* Onboarding Status */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Onboarding Status <span style={{color:"#b91c1c"}}>*</span></label>
                <div style={{position:"relative"}}>
                  <select value={dOnboardSt} onChange={e=>setDOnboardSt(e.target.value)}
                    style={{...inp,appearance:"none",paddingRight:32,cursor:"pointer"}}>
                    {["Not Onboarded","Onboarded","Suspended"].map(s=><option key={s}>{s}</option>)}
                  </select>
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
                </div>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Not Onboarded = contact captured, OTP/PIN not yet completed. Onboarded = verified, eligible for assignment. Suspended = access blocked.</p>
              </div>
              {/* Evidence Pointer */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>Evidence Pointer <span style={{fontSize:11,fontWeight:400,color:"#9ca3af"}}>(optional)</span></label>
                <input value={dEvidence} onChange={e=>setDEvidence(e.target.value)} placeholder="e.g. Staff ID — FE visit Feb 2026 / staff directory URL"
                  style={inp}/>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Reference to the document or artefact supporting this contact's legitimacy. Required for FE-sourced contacts.</p>
              </div>
              {/* Source */}
              <div style={{marginBottom:20}}>
                <label style={lbl}>Source <span style={{color:"#b91c1c"}}>*</span></label>
                <div style={{position:"relative"}}>
                  <select value={dSource} onChange={e=>setDSource(e.target.value)}
                    style={{...inp,appearance:"none",paddingRight:32,cursor:"pointer"}}>
                    {SOURCES.map(s=><option key={s}>{s}</option>)}
                  </select>
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}>▾</span>
                </div>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Direct = Ops-verified. FE-sourced = Field Executive visit. Scholar-sourced = candidate-provided.</p>
              </div>
              {dSaved && <div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:8,padding:"10px 14px",color:"#16a34a",fontSize:13,fontWeight:500,marginBottom:14}}>✓ HOD assigned successfully — department record updated</div>}
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",paddingTop:4}}>
                <button onClick={()=>{setShowAssignDept(false);resetDeptForm();}} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
                <button onClick={handleSaveDept} disabled={dSaved}
                  style={{padding:"9px 24px",border:"none",borderRadius:8,background:dSaved?"#86efac":"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:dSaved?"default":"pointer"}}>
                  Save HOD Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VMShell({ user, activeProfile, onSwitchProfile, onSignOut }) {
  const [sidebarOpen,      setSidebarOpen]      = useState(true);
  const [activeNav,        setActiveNav]        = useState("Dashboard");
  const [escalations,      setEscalations]      = useState(VM_ESCALATIONS);
  const [expenses,         setExpenses]         = useState(VM_EXPENSES);
  const [selectedEsc,      setSelectedEsc]      = useState(VM_ESCALATIONS[0]);
  const [selectedExp,      setSelectedExp]      = useState(VM_EXPENSES[0]);
  const [escDecision,      setEscDecision]      = useState("");
  const [escNotes,         setEscNotes]         = useState("");
  const [expDecision,      setExpDecision]      = useState("Approve Full");
  const [expPartialAmt,    setExpPartialAmt]    = useState("");
  const [expNotes,         setExpNotes]         = useState("");
  const [resolvedEsc,      setResolvedEsc]      = useState(new Set());
  const [resolvedExp,      setResolvedExp]      = useState(new Set());

  const pendingEsc = escalations.filter(e=>!resolvedEsc.has(e.id)).length;
  const pendingExp = expenses.filter(e=>!resolvedExp.has(e.id)).length;
  const weeklyTotal= expenses.reduce((s,e)=>s+e.amount,0);

  const resolveEscalation = (id) => { setResolvedEsc(p=>new Set([...p,id])); setEscNotes(""); setEscDecision(""); };
  const resolveExpense    = (id) => { setResolvedExp(p=>new Set([...p,id])); setExpNotes(""); setExpDecision("Approve Full"); setExpPartialAmt(""); };

  const VM_NAV = [
    { label:"Dashboard",         d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { label:"Escalation Queue",  d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" },
    { label:"Expense Approval",  d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11v-2h2v2zm0-4H11V7h2v5z" },
    { label:"VA Registry",       d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { label:"Settings",          d:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
  ];

  const EscTypeBadge = ({t}) => {
    const cfg = {"Discrepancy":{bg:"#fef3c7",c:"#b45309"},"Client Issue":{bg:"#eff6ff",c:"#3b82f6"},"SLA Breach":{bg:"#fee2e2",c:"#b91c1c"},"Fraud Suspect":{bg:"#fdf2f8",c:"#a21caf"}};
    const s = cfg[t]||{bg:"#f3f4f6",c:"#374151"};
    return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:s.bg,color:s.c}}>{t}</span>;
  };

  const SERVICE_HEALTH = [
    { service:"Employment Reference", active:42, risk:5, late:1, avgDays:4.2, sla:"10d", healthy:false },
    { service:"Guarantor",            active:38, risk:3, late:0, avgDays:3.8, sla:"10d", healthy:true  },
    { service:"Address Verification", active:67, risk:8, late:2, avgDays:5.1, sla:"7d",  healthy:false },
    { service:"WAEC Verification",    active:23, risk:0, late:0, avgDays:2.4, sla:"5d",  healthy:true  },
    { service:"Criminal Record",      active:15, risk:2, late:0, avgDays:8.3, sla:"14d", healthy:true  },
    { service:"NIN",                  active:127,risk:0, late:0, avgDays:0.1, sla:"1d",  healthy:true  },
  ];

  const TEAM_PERF = [
    { vo:"Damilola Adeyemi", completed:12, inProgress:8,  returned:0, onTime:"94%" },
    { vo:"Chinedu Okafor",   completed:15, inProgress:6,  returned:1, onTime:"91%" },
    { vo:"Ngozi Eze",        completed:8,  inProgress:10, returned:0, onTime:"88%" },
    { vo:"Adebayo Fashola",  completed:10, inProgress:4,  returned:2, onTime:"82%" },
  ];

  const ATTENTION_ITEMS = [
    { type:"escalation", icon:"🔴", label:"Escalation", item:"Chidi Nwosu - Discrepancy dispute", age:"2h",  action:"Review →", nav:"Escalation Queue" },
    { type:"escalation", icon:"🔴", label:"Escalation", item:"GTBank batch - Client complaint",   age:"4h",  action:"Review →", nav:"Escalation Queue" },
    { type:"expense",    icon:"💰", label:"Expense",    item:"Tunde Bakare - ₦12,500",            age:"1d",  action:"Approve →",nav:"Expense Approval"  },
    { type:"expense",    icon:"💰", label:"Expense",    item:"Amina Yusuf - ₦8,000",              age:"1d",  action:"Approve →",nav:"Expense Approval"  },
    { type:"sla",        icon:"⚠", label:"SLA Breach", item:"Shell batch - 3 tasks late",         age:"2d",  action:"View →",   nav:"Escalation Queue" },
  ];

  const renderContent = () => {

    // ── VM-01: Manager Dashboard ────────────────────────────────────────────
    if (activeNav === "Dashboard") return (
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>Manager Dashboard</h1>
          <span style={{fontSize:14,color:"#6b7280"}}>Thursday, Feb 6, 2026</span>
        </div>

        {/* Top metric cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
          {[
            {label:"ACTIVE BATCHES",c:"#374151",val:47,sub:"12 in Collection"},
            {label:"TASKS TODAY",   c:"#374151",val:312,sub:"89 completed"},
            {label:"AT RISK",       c:"#d97706", val:18, sub:"⚠ needs attention"},
            {label:"ESCALATIONS",   c:"#b91c1c", val:pendingEsc, sub:"🔴 pending", nav:"Escalation Queue"},
          ].map(s=>(
            <div key={s.label} onClick={s.nav?()=>setActiveNav(s.nav):undefined}
              style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px",cursor:s.nav?"pointer":"default"}}
              onMouseEnter={e=>{if(s.nav)e.currentTarget.style.borderColor="#b91c1c";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";}}>
              <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
              <p style={{margin:"0 0 4px",fontSize:30,fontWeight:700,color:s.c}}>{s.val}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Attention items */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:20}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:"#111827"}}>Items Needing Attention</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["TYPE","ITEM","AGE","ACTION"].map(h=>(
                <th key={h} style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {ATTENTION_ITEMS.map((a,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 20px"}}>
                    <span style={{fontSize:13}}>{a.icon} </span>
                    <span style={{fontSize:13,color:"#374151",fontWeight:500}}>{a.label}</span>
                  </td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{a.item}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#6b7280"}}>{a.age}</td>
                  <td style={{padding:"13px 20px"}}>
                    <button onClick={()=>setActiveNav(a.nav)} style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,fontWeight:600,cursor:"pointer",padding:0}}>
                      {a.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Service Health */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:20}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:"#111827"}}>Service Health</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["SERVICE","ACTIVE","AT RISK","LATE","AVG DAYS","SLA","STATUS"].map(h=>(
                <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {SERVICE_HEALTH.map((s,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#111827",fontWeight:500}}>{s.service}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#374151"}}>{s.active}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:s.risk>3?"#d97706":"#374151",fontWeight:s.risk>3?600:400}}>{s.risk}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:s.late>0?"#b91c1c":"#374151",fontWeight:s.late>0?600:400}}>{s.late}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#374151"}}>{s.avgDays}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#6b7280"}}>{s.sla}</td>
                  <td style={{padding:"12px 16px",fontSize:16}}><span style={{color:s.healthy?"#16a34a":"#d97706"}}>{s.healthy?"●":"⚠"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Team Performance */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:"#111827"}}>Team Performance</p>
            <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Today</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["VO","COMPLETED","IN PROGRESS","RETURNED","ON-TIME RATE"].map(h=>(
                <th key={h} style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {TEAM_PERF.map((t,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.vo}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{t.completed}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{t.inProgress}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:t.returned>1?"#d97706":"#374151",fontWeight:t.returned>1?600:400}}>{t.returned}</td>
                  <td style={{padding:"13px 20px"}}>
                    <span style={{fontSize:13,fontWeight:600,color:parseFloat(t.onTime)>=90?"#15803d":parseFloat(t.onTime)>=85?"#d97706":"#b91c1c"}}>{t.onTime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    // ── VM-02: Escalation Queue ─────────────────────────────────────────────
    if (activeNav === "Escalation Queue") {
      const pendingList = escalations.filter(e=>!resolvedEsc.has(e.id));
      const resolvedToday = 2;
      return (
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <button onClick={()=>setActiveNav("Dashboard")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:14,fontWeight:500,padding:0}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Dashboard
            </button>
          </div>
          <h1 style={{margin:"0 0 20px",fontSize:26,fontWeight:700,color:"#111827"}}>Escalation Queue</h1>

          {/* Summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
            {[
              {label:"PENDING",       val:pendingEsc,    c:"#b91c1c"},
              {label:"RESOLVED TODAY",val:resolvedToday, c:"#15803d"},
              {label:"THIS WEEK",     val:11,            c:"#374151"},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:0,fontSize:30,fontWeight:700,color:s.c}}>{s.val}</p>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
            {/* Queue list */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#f9fafb"}}>
                  {["TYPE","ITEM","BY","AGE",""].map(h=>(
                    <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {escalations.map(e=>(
                    <tr key={e.id} onClick={()=>setSelectedEsc(e)}
                      style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:selectedEsc?.id===e.id?"#fef2f2":resolvedEsc.has(e.id)?"#f9fafb":"white"}}
                      onMouseEnter={ev=>{if(selectedEsc?.id!==e.id)ev.currentTarget.style.background="#fafafa";}}
                      onMouseLeave={ev=>{if(selectedEsc?.id!==e.id)ev.currentTarget.style.background=resolvedEsc.has(e.id)?"#f9fafb":"white";}}>
                      <td style={{padding:"11px 14px"}}><EscTypeBadge t={e.type}/></td>
                      <td style={{padding:"11px 14px",fontSize:12,color:resolvedEsc.has(e.id)?"#9ca3af":"#374151",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.item}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{e.escalatedBy}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{e.age}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:resolvedEsc.has(e.id)?"#9ca3af":"#b91c1c",fontWeight:500,whiteSpace:"nowrap"}}>{resolvedEsc.has(e.id)?"✓ Done":"View →"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Escalation detail */}
            {selectedEsc && (
              <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 22px"}}>
                <p style={{margin:"0 0 2px",fontSize:16,fontWeight:700,color:"#111827"}}>{selectedEsc.candidate} — {selectedEsc.service}</p>
                <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Type: <EscTypeBadge t={selectedEsc.type}/> · Escalated by: {selectedEsc.escalatedBy} · {selectedEsc.age} ago</p>

                <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px",marginBottom:14}}>
                  <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VE NOTES</p>
                  <p style={{margin:0,fontSize:13,color:"#374151",lineHeight:1.6}}>{selectedEsc.veNotes}</p>
                </div>

                {selectedEsc.employer!=="—" && (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                    <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                      <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>CANDIDATE DATA</p>
                      <p style={{margin:"0 0 4px",fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Employer:</span> {selectedEsc.employer}</p>
                      <p style={{margin:"0 0 4px",fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Title:</span> {selectedEsc.title}</p>
                      <p style={{margin:0,fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Period:</span> {selectedEsc.candidatePeriod}</p>
                    </div>
                    <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                      <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VERIFICATION RESULT</p>
                      <p style={{margin:"0 0 4px",fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Outcome:</span> {selectedEsc.outcome}</p>
                      <p style={{margin:0,fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>HR confirmed:</span> {selectedEsc.hrPeriod}</p>
                    </div>
                  </div>
                )}

                {!resolvedEsc.has(selectedEsc.id) && (
                  <div>
                    <div style={{marginBottom:12}}>
                      <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Decision</label>
                      <div style={{position:"relative"}}>
                        <select value={escDecision} onChange={e=>setEscDecision(e.target.value)}
                          style={{width:"100%",padding:"10px 36px 10px 12px",border:`1.5px solid ${!escDecision?"#fecaca":"#d1d5db"}`,borderRadius:8,fontSize:13,color:escDecision?"#374151":"#9ca3af",background:"white",outline:"none",appearance:"none"}}>
                          <option value="">Select decision...</option>
                          <option>Accept as Discrepancy (include in report)</option>
                          <option>Override to Verified (manager discretion)</option>
                          <option>Return to VE (need more info)</option>
                          <option>Contact Client (before finalizing)</option>
                        </select>
                        <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280",fontSize:11}}>▾</span>
                      </div>
                    </div>
                    <div style={{marginBottom:14}}>
                      <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Manager Notes</label>
                      <textarea value={escNotes} onChange={e=>setEscNotes(e.target.value)} rows={3} placeholder="Add notes..."
                        style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",color:"#374151"}}/>
                    </div>
                    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                      <button style={{padding:"8px 16px",border:"1.5px solid #d1d5db",borderRadius:7,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>Cancel</button>
                      <button onClick={()=>{if(escDecision)resolveEscalation(selectedEsc.id);}}
                        style={{padding:"8px 16px",border:"none",borderRadius:7,background:escDecision?"#b91c1c":"#d1d5db",color:"white",fontSize:13,fontWeight:600,cursor:escDecision?"pointer":"not-allowed"}}>
                        Resolve Escalation
                      </button>
                    </div>
                  </div>
                )}
                {resolvedEsc.has(selectedEsc.id) && (
                  <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",gap:8}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>Escalation resolved</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // ── VM-03: Expense Approval ─────────────────────────────────────────────
    if (activeNav === "Expense Approval") {
      const approvedWeek = 14;
      return (
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <button onClick={()=>setActiveNav("Dashboard")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:14,fontWeight:500,padding:0}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Dashboard
            </button>
          </div>
          <h1 style={{margin:"0 0 20px",fontSize:26,fontWeight:700,color:"#111827"}}>Expense Approval</h1>

          {/* Summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
            {[
              {label:"PENDING",         val:pendingExp,  c:"#b91c1c", fmt:String},
              {label:"APPROVED (WEEK)", val:approvedWeek,c:"#15803d", fmt:String},
              {label:"TOTAL (WEEK)",    val:weeklyTotal, c:"#374151", fmt:(v)=>`₦${v.toLocaleString()}`},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:0,fontSize:26,fontWeight:700,color:s.c}}>{s.fmt(s.val)}</p>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
            {/* Expense list */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#f9fafb"}}>
                  {["AGENT","TASK","AMOUNT","DATE",""].map(h=>(
                    <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {expenses.map(e=>(
                    <tr key={e.id} onClick={()=>setSelectedExp(e)}
                      style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:selectedExp?.id===e.id?"#fef2f2":resolvedExp.has(e.id)?"#f9fafb":"white"}}
                      onMouseEnter={ev=>{if(selectedExp?.id!==e.id)ev.currentTarget.style.background="#fafafa";}}
                      onMouseLeave={ev=>{if(selectedExp?.id!==e.id)ev.currentTarget.style.background=resolvedExp.has(e.id)?"#f9fafb":"white";}}>
                      <td style={{padding:"11px 14px",fontSize:13,fontWeight:500,color:resolvedExp.has(e.id)?"#9ca3af":"#111827"}}>{e.agent}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.task}</td>
                      <td style={{padding:"11px 14px",fontSize:13,fontWeight:600,color:e.amount>=10000?"#b91c1c":resolvedExp.has(e.id)?"#9ca3af":"#374151"}}>₦{e.amount.toLocaleString()}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{e.submitted}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:resolvedExp.has(e.id)?"#9ca3af":"#b91c1c",fontWeight:500,whiteSpace:"nowrap"}}>{resolvedExp.has(e.id)?"✓ Done":"Review →"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{padding:"12px 16px",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"flex-end"}}>
                <button onClick={()=>{expenses.filter(e=>e.amount<10000&&!resolvedExp.has(e.id)).forEach(e=>setResolvedExp(p=>new Set([...p,e.id])));}}
                  style={{padding:"8px 16px",border:"none",borderRadius:7,background:"#b91c1c",color:"white",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  Approve All Under ₦10,000
                </button>
              </div>
            </div>

            {/* Expense detail */}
            {selectedExp && (
              <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 22px"}}>
                <p style={{margin:"0 0 2px",fontSize:15,fontWeight:700,color:"#111827"}}>{selectedExp.agent} — {selectedExp.task}</p>
                <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Task {selectedExp.taskId} · Submitted: {selectedExp.submitted} · {selectedExp.location}</p>

                {/* Breakdown table */}
                <div style={{marginBottom:14}}>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>EXPENSE BREAKDOWN</p>
                  <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"}}>
                    <table style={{width:"100%",borderCollapse:"collapse"}}>
                      <thead><tr style={{background:"#f9fafb"}}>
                        {["ITEM","AMOUNT","RECEIPT"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.4}}>{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {selectedExp.items.map((item,i)=>(
                          <tr key={i} style={{borderBottom:i<selectedExp.items.length-1?"1px solid #f3f4f6":"none",background:"white"}}>
                            <td style={{padding:"9px 12px",fontSize:13,color:"#374151"}}>{item.label}</td>
                            <td style={{padding:"9px 12px",fontSize:13,color:"#374151"}}>₦{item.amt.toLocaleString()}</td>
                            <td style={{padding:"9px 12px"}}>{item.receipt?<button style={{background:"none",border:"1px solid #d1d5db",borderRadius:4,padding:"2px 8px",fontSize:11,cursor:"pointer",color:"#374151"}}>View</button>:<span style={{fontSize:12,color:"#9ca3af"}}>—</span>}</td>
                          </tr>
                        ))}
                        <tr style={{background:"#f9fafb",borderTop:"2px solid #e5e7eb"}}>
                          <td style={{padding:"9px 12px",fontSize:13,fontWeight:700,color:"#111827"}}>TOTAL</td>
                          <td style={{padding:"9px 12px",fontSize:13,fontWeight:700,color:"#111827"}}>₦{selectedExp.amount.toLocaleString()}</td>
                          <td/>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Agent notes */}
                <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"10px 12px",marginBottom:14}}>
                  <p style={{margin:"0 0 4px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>AGENT NOTES</p>
                  <p style={{margin:0,fontSize:12,color:"#374151",lineHeight:1.5}}>{selectedExp.agentNotes}</p>
                </div>

                <p style={{margin:"0 0 16px",fontSize:12,color:"#374151"}}>
                  Task Outcome: <span style={{color:"#15803d",fontWeight:600}}>✓ {selectedExp.taskOutcome}</span> · Evidence: {selectedExp.evidenceCount} files
                  <button style={{background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:12,marginLeft:8}}>View Task</button>
                </p>

                {!resolvedExp.has(selectedExp.id) && (
                  <div style={{borderTop:"1px solid #e5e7eb",paddingTop:14}}>
                    <p style={{margin:"0 0 10px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>APPROVAL DECISION</p>
                    <div style={{display:"flex",gap:16,marginBottom:12}}>
                      {["Approve Full","Approve Partial","Reject"].map(opt=>(
                        <label key={opt} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                          <div onClick={()=>setExpDecision(opt)} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${expDecision===opt?"#b91c1c":"#d1d5db"}`,background:"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                            {expDecision===opt&&<div style={{width:7,height:7,borderRadius:"50%",background:"#b91c1c"}}/>}
                          </div>
                          {opt}
                        </label>
                      ))}
                    </div>
                    {expDecision==="Approve Partial" && (
                      <div style={{marginBottom:10}}>
                        <label style={{display:"block",fontSize:12,color:"#374151",marginBottom:4}}>Approved amount: ₦</label>
                        <input value={expPartialAmt} onChange={e=>setExpPartialAmt(e.target.value)} type="number" placeholder="Enter amount..."
                          style={{padding:"8px 12px",border:"1.5px solid #d1d5db",borderRadius:7,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"}}/>
                      </div>
                    )}
                    {(expDecision==="Approve Partial"||expDecision==="Reject") && (
                      <div style={{marginBottom:12}}>
                        <label style={{display:"block",fontSize:12,color:"#374151",marginBottom:4}}>Notes (required)</label>
                        <textarea value={expNotes} onChange={e=>setExpNotes(e.target.value)} rows={3}
                          style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:7,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
                      </div>
                    )}
                    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                      <button style={{padding:"8px 16px",border:"1.5px solid #d1d5db",borderRadius:7,background:"white",color:"#374151",fontSize:12,cursor:"pointer"}}>Cancel</button>
                      <button onClick={()=>resolveExpense(selectedExp.id)}
                        style={{padding:"8px 16px",border:"none",borderRadius:7,background:"#b91c1c",color:"white",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                        Submit Decision
                      </button>
                    </div>
                  </div>
                )}
                {resolvedExp.has(selectedExp.id) && (
                  <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",gap:8}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>Decision submitted</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeNav === "VA Registry") return <VMVARegistry/>;
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#9ca3af",fontSize:15}}>{activeNav}{" — coming soon"}</div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      <Topbar user={user} activeProfile={activeProfile} onSwitchProfile={onSwitchProfile} onToggleSidebar={()=>setSidebarOpen(p=>!p)}/>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {sidebarOpen && (
          <div className="vp-sidebar vp-sidebar-open" style={{width:240,background:"white",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
            <div style={{padding:"16px 12px 8px"}}>
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 12px"}}>
                <p style={{margin:0,fontSize:11,fontWeight:600,color:"#b91c1c",letterSpacing:.5,marginBottom:2}}>CURRENT ROLE</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{activeProfile.role}</p>
              </div>
            </div>
            <nav style={{padding:"4px 8px",flex:1}}>
              {VM_NAV.map(item=>(
                <button key={item.label} onClick={()=>setActiveNav(item.label)}
                  style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:activeNav===item.label?600:400,
                    background:activeNav===item.label?"#b91c1c":"transparent",
                    color:activeNav===item.label?"white":"#374151",marginBottom:2,textAlign:"left"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d={item.d}/></svg>
                  {item.label}
                  {item.label==="Escalation Queue" && pendingEsc>0 && (
                    <span style={{marginLeft:"auto",background:"#b91c1c",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:activeNav===item.label?0.8:1}}>{pendingEsc}</span>
                  )}
                  {item.label==="Expense Approval" && pendingExp>0 && (
                    <span style={{marginLeft:"auto",background:"#d97706",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:activeNav===item.label?0.8:1}}>{pendingExp}</span>
                  )}
                </button>
              ))}
            </nav>
            <div style={{padding:"12px 8px",borderTop:"1px solid #e5e7eb"}}>
              <button onClick={onSignOut} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,color:"#6b7280",background:"transparent"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}



// ════════════════════════════════════════════════════════════════════════════════
// CANDIDATE PORTAL — CAND-01 through CAND-10
// Mobile-first, tokenized link flow. No login required.
// ════════════════════════════════════════════════════════════════════════════════


export { VMShell };
