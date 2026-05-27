import { useState } from "react";
import { VA_REGISTRY_DATA, defaultVAData } from "../data.js";

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

export default VMInstitutionDetail;
