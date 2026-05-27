import { useState } from "react";
import { ChevronDown, ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

export default function NewServiceForm({ onSave, onCancel }) {
  const inp = {width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,boxSizing:"border-box",outline:"none",color:"#111827",background:"white"};
  const lbl = {display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6};

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("active");

  // Multiple instances
  const [allowMultiple, setAllowMultiple] = useState("no");

  // ServMode Configuration
  const [sfMode,            setSfMode]            = useState("Email");
  const [sfAutoEmail,       setSfAutoEmail]        = useState("yes");
  const [sfSla,             setSfSla]              = useState("10");
  const [sfWarn,            setSfWarn]             = useState("7");
  const [sfEscal,           setSfEscal]            = useState("9");
  const [sfAutoReminders,   setSfAutoReminders]    = useState(false);
  const [sfReminders,       setSfReminders]        = useState([]);
  const [sfReminderDay,     setSfReminderDay]      = useState("");
  const [sfReminderTpl,     setSfReminderTpl]      = useState("");
  const [sfReqTemplate,     setSfReqTemplate]      = useState("");
  const [sfNudgeTemplate,   setSfNudgeTemplate]    = useState("");
  const [sfVoAssignments,   setSfVoAssignments]    = useState([
    {name:"Mike Obi",assigned:false},{name:"Ada Nwosu",assigned:false},
    {name:"Emeka Udo",assigned:false},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false},
  ]);
  const [sfSkipVAReval,     setSfSkipVAReval]      = useState(false);
  const [sfReviewVE,        setSfReviewVE]         = useState(false);
  const [sfReviewVM,        setSfReviewVM]         = useState(false);
  const [sfReviewCE,        setSfReviewCE]         = useState(true);
  const [instanceLevels, setInstanceLevels] = useState("2");

  // Data requirements
  const [mandFields, setMandFields] = useState([]);
  const [optFields, setOptFields]   = useState([]);
  const [mandFieldName, setMandFieldName] = useState("");
  const [mandFieldType, setMandFieldType] = useState("Text");
  const [optFieldName, setOptFieldName]   = useState("");
  const [optFieldType, setOptFieldType]   = useState("Text");

  // Document requirements — each doc: { name, type, maxSize }
  const [reqDocs, setReqDocs] = useState([]);
  const [optDocs, setOptDocs] = useState([]);
  const [reqDocName, setReqDocName] = useState("");
  const [reqDocType, setReqDocType] = useState("PDF");
  const [reqDocSize, setReqDocSize] = useState("5");
  const [optDocName, setOptDocName] = useState("");
  const [optDocType, setOptDocType] = useState("PDF");
  const [optDocSize, setOptDocSize] = useState("5");
  const [fileTypes, setFileTypes] = useState({PDF:true,JPG:true,PNG:true,DOC:true});

  const fieldTypes = ["Text","Date","Email","Phone","Number","Dropdown","File"];
  const FIELD_GROUPS = [
    { group:"BASIC",       types:["Text","Number","Date","Email","Phone","File"] },
    { group:"CUSTOM LIST", types:["Dropdown"] },
    { group:"REFERENCE",   types:["Country","State","LGA","Local Institution","Foreign Institution","Degree Type","Degree Grade","Sex","Marital Status","Relationship"] },
  ];
  const REFERENCE_TYPES = new Set(["Country","State","LGA","Local Institution","Foreign Institution","Degree Type","Degree Grade","Sex","Marital Status","Relationship"]);
  const docTypes   = ["PDF","JPG","PNG","DOC","DOCX","XLS","XLSX","Any"];

  const CBx = ({checked,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={onChange} style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
      {label}
    </label>
  );

  const Rad = ({value,current,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={()=>onChange(value)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${current===value?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
        {current===value && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      {label}
    </label>
  );

  const fieldPlaceholder = t => ({
    Text:     "e.g. Full legal name",
    Date:     "e.g. 01/01/1990",
    Email:    "e.g. applicant@email.com",
    Phone:    "e.g. +234 801 234 5678",
    Number:   "e.g. 12345",
    Dropdown: null,
    File:     null,
  }[t] || (REFERENCE_TYPES.has(t) ? null : "Field name"));

  const NIGERIAN_STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

  const FieldAdder = ({items, setItems, fname, setFname, ftype, setFtype, label}) => (
    <div style={{flex:1}}>
      <p style={{margin:"0 0 12px",fontWeight:500,fontSize:14,color:"#374151"}}>{label}</p>
      <div style={{border:"1.5px solid #e5e7eb",borderRadius:8,padding:"16px"}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {ftype==="Dropdown" ? (
            <select style={{flex:1,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",background:"white"}}>
              <option value="">Select state / LGA...</option>
              {NIGERIAN_STATES.map(s=><option key={s}>{s}</option>)}
            </select>
          ) : ftype==="File" ? (
            <div style={{flex:1,padding:"8px 12px",border:"1.5px dashed #d1d5db",borderRadius:8,fontSize:13,color:"#9ca3af",background:"#f9fafb",display:"flex",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              Browse or drop file here...
            </div>
          ) : REFERENCE_TYPES.has(ftype) ? (
            <div style={{flex:1,padding:"8px 12px",border:"1.5px solid #dbeafe",borderRadius:8,fontSize:13,color:"#1d4ed8",background:"#eff6ff",display:"flex",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              Search {ftype}... <span style={{color:"#93c5fd",fontSize:11,marginLeft:4}}>(populated from platform registry)</span>
            </div>
          ) : (
            <input value={fname} onChange={e=>setFname(e.target.value)} placeholder={fieldPlaceholder(ftype)}
              style={{flex:1,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
          )}
          <div style={{position:"relative",minWidth:160}}>
            <select value={ftype} onChange={e=>{setFtype(e.target.value);setFname("");}}
              style={{padding:"9px 28px 9px 10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",color:"#111827",appearance:"none",width:"100%",background:"white"}}>
              {FIELD_GROUPS.map(g=>(
                <optgroup key={g.group} label={g.group}>
                  {g.types.map(t=><option key={t} value={t}>{t}</option>)}
                </optgroup>
              ))}
            </select>
            <span style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
          <button onClick={()=>{
            const canAdd = fname.trim() || ftype==="Dropdown" || ftype==="File" || REFERENCE_TYPES.has(ftype);
            if(canAdd){ setItems(p=>[...p,{name:fname||ftype,type:ftype,isReference:REFERENCE_TYPES.has(ftype)}]); setFname(""); }
          }} style={{padding:"9px 14px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>+ Add</button>
        </div>
        {REFERENCE_TYPES.has(ftype) && (
          <div style={{marginTop:8,padding:"7px 10px",background:"#f0f9ff",borderRadius:6,display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:11,color:"#0369a1"}}>ℹ</span>
            <span style={{fontSize:11,color:"#0369a1"}}>Reference type — platform registry. No extra config needed. Candidate sees a searchable picker; stored value is a registry ID.</span>
          </div>
        )}
        {items.map((f,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,padding:"8px 12px",background:f.isReference?"#eff6ff":"#f9fafb",border:`1px solid ${f.isReference?"#bfdbfe":"#e5e7eb"}`,borderRadius:6,fontSize:13,color:"#374151"}}>
            <span>{f.name} <span style={{color:f.isReference?"#1d4ed8":"#9ca3af",fontSize:11}}>({f.type}{f.isReference?" · ref":""})</span></span>
            <button onClick={()=>setItems(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
          </div>
        ))}
      </div>
    </div>
  );

  const DocAdder = ({items, setItems, dname, setDname, dtype, setDtype, dsize, setDsize, label}) => (
    <div style={{flex:1}}>
      <p style={{margin:"0 0 12px",fontWeight:500,fontSize:14,color:"#374151"}}>{label}</p>
      <div style={{border:"1.5px solid #e5e7eb",borderRadius:8,padding:"16px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <input value={dname} onChange={e=>setDname(e.target.value)} placeholder="Document name"
            style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={dtype} onChange={e=>setDtype(e.target.value)}
                style={{padding:"8px 28px 8px 10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",color:"#111827",appearance:"none",width:"100%",background:"white"}}>
                {docTypes.map(t=><option key={t}>{t}</option>)}
              </select>
              <span style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <input value={dsize} onChange={e=>setDsize(e.target.value)} placeholder="Max MB" type="number"
              style={{width:76,padding:"8px 10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",color:"#111827"}}/>
            <button onClick={()=>{if(dname.trim()){setItems(p=>[...p,{name:dname,type:dtype,maxSize:dsize}]);setDname("");setDsize("5");}}}
              style={{padding:"8px 14px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>+ Add</button>
          </div>
        </div>
        {items.map((d,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,padding:"8px 12px",background:"#f9fafb",borderRadius:6,fontSize:13,color:"#374151"}}>
            <span>{d.name} <span style={{color:"#9ca3af"}}>({d.type}, max {d.maxSize}MB)</span></span>
            <button onClick={()=>setItems(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Services","New"]}/>
      <button onClick={onCancel} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Service Catalog
      </button>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>NEW SERVICE</h1>

      {/* Basic Information */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>BASIC INFORMATION</p>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Service Name <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={name} onChange={e=>setName(e.target.value)} style={inp}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Service Code <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="e.g., EMP-VER-001" style={inp}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Category <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{position:"relative"}}>
            <select value={cat} onChange={e=>setCat(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              <option value="">Select category...</option>
              {["Employment","Education","Address","Criminal","Financial","Professional","Identity","Background"].map(c=><option key={c}>{c}</option>)}
            </select>
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Description <span style={{color:"#b91c1c"}}>*</span></label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} style={{...inp,resize:"vertical"}}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Status <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:24}}>
            <Rad value="active"   current={status} onChange={setStatus} label="Active"/>
            <Rad value="inactive" current={status} onChange={setStatus} label="Inactive"/>
          </div>
        </div>
        {/* VA Registry Settings — Education/Scholar only */}
        {(cat==="Education"||cat==="Scholar") && (
          <div style={{marginBottom:18,padding:"16px 20px",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8}}>
            <p style={{margin:"0 0 14px",fontWeight:700,fontSize:12,color:"#374151",letterSpacing:.5}}>VA REGISTRY SETTINGS</p>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:24}}>
              <div style={{flex:1}}>
                <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#374151"}}>Skip VA Revalidation</p>
                <p style={{margin:0,fontSize:13,color:"#6b7280"}}>When enabled, authorities sourced from the VA Registry bypass the Revalidation step and move directly to Confirmed.</p>
              </div>
              <div onClick={()=>setSfSkipVAReval(p=>!p)}
                style={{width:44,height:24,borderRadius:12,background:sfSkipVAReval?"#b91c1c":"#d1d5db",cursor:"pointer",flexShrink:0,position:"relative",transition:"background .15s",marginTop:2}}>
                <div style={{position:"absolute",top:3,left:sfSkipVAReval?23:3,width:18,height:18,borderRadius:"50%",background:"white",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",transition:"left .15s"}}/>
              </div>
            </div>
          </div>
        )}
        {/* Allow Multiple Instances */}
        <div style={{borderTop:"1px solid #e5e7eb",paddingTop:18}}>
          <label style={lbl}>Allow Multiple Instances <span style={{color:"#b91c1c"}}>*</span></label>
          <p style={{margin:"0 0 12px",fontSize:13,color:"#6b7280"}}>Allows a candidate to submit more than one instance of this service (e.g. two employment history records).</p>
          <div style={{display:"flex",gap:24}}>
            <Rad value="yes" current={allowMultiple} onChange={setAllowMultiple} label="Yes"/>
            <Rad value="no"  current={allowMultiple} onChange={setAllowMultiple} label="No"/>
          </div>
          {allowMultiple==="yes" && (
            <div style={{marginTop:14,padding:"16px 20px",background:"#fef9c3",border:"1px solid #fde68a",borderRadius:8}}>
              <label style={{...lbl,marginBottom:8}}>Number of Instances (Levels)</label>
              <p style={{margin:"0 0 10px",fontSize:12,color:"#92400e"}}>How many instances the candidate must complete. E.g. set to 2 to require two employment history entries.</p>
              <input value={instanceLevels} onChange={e=>setInstanceLevels(e.target.value)} type="number" min="2" max="10"
                style={{...inp,width:100}}/>
              <p style={{margin:"6px 0 0",fontSize:12,color:"#6b7280"}}>Min: 2 &nbsp;·&nbsp; Max: 10</p>
            </div>
          )}
        </div>
      </div>

      {/* Data Requirements */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>DATA REQUIREMENTS</p>
        <p style={{margin:"0 0 6px",fontSize:13,color:"#6b7280"}}>Define fields to collect from candidates for this service.</p>
        <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>Field Types: Text, Date, Email, Phone, Number, Dropdown, File</p>
        <div style={{display:"flex",gap:16}}>
          <FieldAdder items={mandFields} setItems={setMandFields} fname={mandFieldName} setFname={setMandFieldName} ftype={mandFieldType} setFtype={setMandFieldType} label="Mandatory Fields"/>
          <FieldAdder items={optFields}  setItems={setOptFields}  fname={optFieldName}  setFname={setOptFieldName}  ftype={optFieldType}  setFtype={setOptFieldType}  label="Optional Fields"/>
        </div>
      </div>

      {/* Document Requirements */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>DOCUMENT REQUIREMENTS</p>
        <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Each document has its own accepted file type and max file size.</p>
        <div style={{display:"flex",gap:16,marginBottom:16}}>
          <DocAdder items={reqDocs} setItems={setReqDocs} dname={reqDocName} setDname={setReqDocName} dtype={reqDocType} setDtype={setReqDocType} dsize={reqDocSize} setDsize={setReqDocSize} label="Required Documents"/>
          <DocAdder items={optDocs} setItems={setOptDocs} dname={optDocName} setDname={setOptDocName} dtype={optDocType} setDtype={setOptDocType} dsize={optDocSize} setDsize={setOptDocSize} label="Optional Documents"/>
        </div>
      </div>

      {/* ServMode Configuration */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>SERVMODE CONFIGURATION</p>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Configure the default ServMode for this service. You can edit it from the service detail page after saving.</p>

        {/* Basic config */}
        <div style={{marginBottom:16}}>
          <label style={lbl}>Execution Mode <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{position:"relative",maxWidth:300}}>
            <select value={sfMode} onChange={e=>setSfMode(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              {["Email","Field","Portal","Letter","Scholar"].map(m=><option key={m}>{m}</option>)}
            </select>
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Automatic Email Dispatch</label>
          <div style={{display:"flex",gap:24,marginTop:4}}>
            {["yes","no"].map(v=>(
              <label key={v} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:"#374151"}}>
                <div onClick={()=>setSfAutoEmail(v)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sfAutoEmail===v?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                  {sfAutoEmail===v && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {v==="yes"?"Yes":"No"}
              </label>
            ))}
          </div>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Emails are sent automatically when tasks are assigned.</p>
        </div>

        {/* SLA */}
        <div style={{marginBottom:16}}>
          <label style={lbl}>SLA Duration (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={sfSla} onChange={e=>setSfSla(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>SLA applies from the moment verification begins.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Warning Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={sfWarn} onChange={e=>setSfWarn(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Warn after this many days with no update. Must be less than SLA duration.</p>
        </div>
        <div style={{marginBottom:0}}>
          <label style={lbl}>Escalation Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={sfEscal} onChange={e=>setSfEscal(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Escalate after this many days. Must be greater than warning threshold.</p>
        </div>
      </div>

      {/* Auto-Reminder Schedule */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>AUTO-REMINDER SCHEDULE</p>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div onClick={()=>setSfAutoReminders(p=>!p)} style={{width:18,height:18,borderRadius:4,border:`2px solid ${sfAutoReminders?"#b91c1c":"#d1d5db"}`,background:sfAutoReminders?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
            {sfAutoReminders && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
          </div>
          <span style={{fontSize:14,color:"#374151",cursor:"pointer"}} onClick={()=>setSfAutoReminders(p=>!p)}>Enable Auto-Reminders</span>
        </div>
        {sfAutoReminders && (<>
          {sfReminders.length > 0 && (
            <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:12}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>DAY OFFSET</th>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>TEMPLATE</th>
                  <th style={{width:40,borderBottom:"1px solid #e5e7eb"}}></th>
                </tr></thead>
                <tbody>{sfReminders.map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.day}</td>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.template}</td>
                    <td style={{padding:"12px 16px",textAlign:"center"}}>
                      <button onClick={()=>setSfReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16}}>×</button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"14px 16px"}}>
            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:"#374151"}}>+ Add Reminder</p>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={sfReminderDay} onChange={e=>setSfReminderDay(e.target.value)} placeholder="Day offset"
                style={{width:120,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
              <div style={{position:"relative",flex:1}}>
                <select value={sfReminderTpl} onChange={e=>setSfReminderTpl(e.target.value)}
                  style={{width:"100%",padding:"9px 32px 9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",appearance:"none",background:"white"}}>
                  <option value="">Select template...</option>
                  <option>Reminder - Day 3</option><option>Reminder - Day 7</option><option>Reminder - Day 14</option>
                </select>
                <span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
              <button onClick={()=>{if(sfReminderDay&&sfReminderTpl){setSfReminders(p=>[...p,{day:`Day ${sfReminderDay}`,template:sfReminderTpl}]);setSfReminderDay("");setSfReminderTpl("");}}}
                style={{padding:"9px 18px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button>
            </div>
          </div>
        </>)}
      </div>

      {/* Communication Templates */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>COMMUNICATION TEMPLATES</p>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Request Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={sfReqTemplate} onChange={e=>setSfReqTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Email Request</option>
                <option>Standard - Email Request</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
        <div>
          <label style={lbl}>Candidate Nudge Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={sfNudgeTemplate} onChange={e=>setSfNudgeTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Nudge</option>
                <option>Standard - Nudge</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
      </div>

      {/* VO Assignment */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>VERIFICATION OFFICER (VO) ASSIGNMENT</p>
        <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:10}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"10px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>VO NAME</th>
              <th style={{padding:"10px 20px",textAlign:"right",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,width:100}}>ASSIGNED</th>
            </tr></thead>
            <tbody>{sfVoAssignments.map((vo,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                <td style={{padding:"13px 20px",fontSize:14,color:"#111827"}}>{vo.name}</td>
                <td style={{padding:"13px 20px",textAlign:"right"}}>
                  <div onClick={()=>setSfVoAssignments(p=>p.map((v,j)=>j===i?{...v,assigned:!v.assigned}:v))}
                    style={{width:18,height:18,borderRadius:4,border:`2px solid ${vo.assigned?"#b91c1c":"#d1d5db"}`,background:vo.assigned?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginLeft:"auto"}}>
                    {vo.assigned && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Tick the checkbox to assign a VO officer to this ServMode.</p>
      </div>

      {/* Post-VO Progression Path */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:24}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>POST-VO PROGRESSION PATH</p>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Configure the review stages work passes through after VO completes verification. Route always starts with VO and ends with Client.</p>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>VO</span>
          </div>
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          {[["VE",sfReviewVE,setSfReviewVE],["VM",sfReviewVM,setSfReviewVM],["CE",sfReviewCE,setSfReviewCE]].map(([label,val,set])=>(
            <div key={label}>
              <div onClick={()=>set(p=>!p)}
                style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:val?"#eff6ff":"#f9fafb",border:`1.5px solid ${val?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
                {val && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
                <span style={{fontSize:13,fontWeight:500,color:val?"#1d4ed8":"#6b7280"}}>{label}</span>
              </div>
            </div>
          ))}
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="14" height="14"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>Client</span>
          </div>
        </div>
        <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af"}}>Click VE, VM, or CE to include or exclude that review stage. VO and Client are always fixed.</p>
      </div>

      {/* Footer */}
      <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingBottom:32}}>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>
        <button onClick={onSave} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save</button>
      </div>
    </div>
  );
}
