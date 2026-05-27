import React, { useState } from "react";
import { ChevronRight, SearchSm } from "../../../components/Icons.jsx";
import { ALL_SERVICES, SERVICE_SELECTION_OPTIONS, CLONE_SOURCE_BATCHES, SCHOLAR_INTAKE_FIELDS, CE_CLIENTS } from "../data.js";

function CreateBatchWizard({ onCancel, onDone, initialClone=false }) {
  // wizard state
  const [step, setStep] = useState(1);
  const [client, setClient]         = useState(null);
  const [batchName, setBatchName]   = useState("");
  const [collMode, setCollMode]     = useState("decentralized"); // only decentralized
  const [selectedServices, setSelectedServices] = useState([]);
  const [cloneMode, setCloneMode]   = useState(initialClone ? "clone" : "new");
  const [cloneSource, setCloneSource] = useState(initialClone ? CLONE_SOURCE_BATCHES[0]?.id || "" : "");
  const [fileInfo, setFileInfo]     = useState(null); // { name, total, valid, errors }
  const [hasErrors, setHasErrors]   = useState(false);
  const [subDeadline, setSubDeadline] = useState("5");
  const [linkExpiry, setLinkExpiry]   = useState("7");
  const [reminders, setReminders]     = useState([]);
  const [reminderInput, setReminderInput] = useState("3");
  const [clientSearch, setClientSearch]   = useState("");
  const [success, setSuccess]             = useState(false);

  const selectedServiceObjects = SERVICE_SELECTION_OPTIONS.filter(s => selectedServices.includes(s.name));
  const hasScholarService = selectedServiceObjects.some(s => s.isScholar || /Academic|Educational/i.test(s.name));
  const hasFieldService = selectedServiceObjects.some(s => s.fieldBased);
  const hasManualRegistryService = selectedServiceObjects.some(s => /Educational|Academic|Criminal Record Check|Credit Check/i.test(s.name));
  const cloneSourceObj = CLONE_SOURCE_BATCHES.find(b => b.id === cloneSource) || null;

  const buildRequiredColumns = () => {
    const base = collMode === "decentralized"
      ? ["Name", "Email"]
      : ["Name", "Email", "NIN", "Date of Birth", "Address"];
    const extras = [];
    if (selectedServices.includes("Address Verification") && !base.includes("Address")) extras.push("Address");
    if (selectedServices.includes("Guarantor Verification")) extras.push("Guarantor Name", "Guarantor Phone", "Guarantor Relationship");
    if (selectedServices.includes("Employment Reference Verification")) extras.push("Employer Name", "Employer Email");
    if (hasScholarService) extras.push(...SCHOLAR_INTAKE_FIELDS);
    return [...new Set([...base, ...extras])];
  };

  const buildOptionalColumns = () => {
    const extras = collMode === "decentralized" ? ["Phone"] : ["Phone", "Middle Name"];
    if (hasScholarService) extras.push("Other academic office email", "Candidate notes on contact source");
    if (hasManualRegistryService) extras.push("Portal URL / clue", "Source notes");
    return [...new Set(extras)];
  };

  // dynamic steps: 1 Select Client, 2 Batch Details,
  // 3 Service Selection, 4 Upload Candidates, 5 Review Errors (conditional), 6 Collection Settings (decentralized only), 7 Review & Create
  const stepLabels = ["Select Client","Batch Details","Select Services","Upload Candidates",
    ...(hasErrors ? ["Review Errors"] : []),
    ...(collMode==="decentralized" ? ["Collection Settings"] : []),
    "Review & Create"];
  const totalSteps = stepLabels.length;

  // map logical step to position label index
  const STEP_SELECT_CLIENT = 1;
  const STEP_BATCH_DETAILS = 2;
  const STEP_SERVICES      = 3;
  const STEP_UPLOAD        = 4;
  const STEP_ERRORS        = hasErrors ? 5 : null;
  const STEP_COLL_SETTINGS = collMode==="decentralized" ? (hasErrors ? 6 : 5) : null;
  const STEP_REVIEW        = totalSteps;

  const StepIndicator = () => (
    <div style={{display:"flex",alignItems:"center",marginBottom:32}}>
      {stepLabels.map((label,i)=>{
        const n = i+1;
        const done = n < step;
        const active = n === step;
        return (
          <React.Fragment key={n}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,minWidth:80}}>
              <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                background: done?"#16a34a": active?"#b91c1c":"#e5e7eb",
                color: (done||active)?"white":"#9ca3af", fontWeight:700,fontSize:14,flexShrink:0}}>
                {done ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg> : n}
              </div>
              <span style={{fontSize:11,color:active?"#b91c1c":done?"#374151":"#9ca3af",fontWeight:active?600:400,textAlign:"center",whiteSpace:"nowrap"}}>{label}</span>
            </div>
            {i<stepLabels.length-1 && (
              <div style={{flex:1,height:2,background:done?"#16a34a":"#e5e7eb",margin:"0 4px",marginBottom:18}}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const Footer = ({ backFn, nextFn, nextLabel="Next →", nextDisabled=false, showDraft=false }) => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:32,paddingTop:20,borderTop:"1px solid #f3f4f6"}}>
      <div>
        {backFn && <button onClick={backFn} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>← Back</button>}
      </div>
      <div style={{display:"flex",gap:10}}>
        {showDraft && <button onClick={()=>onDone("draft")} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>}
        <button onClick={onCancel} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={nextFn} disabled={nextDisabled}
          style={{padding:"10px 24px",border:"none",borderRadius:8,background:nextDisabled?"#fca5a5":"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:nextDisabled?"not-allowed":"pointer"}}>
          {nextLabel}
        </button>
      </div>
    </div>
  );

  const Card = ({ children }) => (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px"}}>
      {children}
    </div>
  );

  // ── Step 1: Select Client ──
  const Step1 = () => {
    const filtered = CE_CLIENTS.filter(c=>c.name.toLowerCase().includes(clientSearch.toLowerCase()));
    return (
      <Card>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Select Client</h2>
        <div style={{height:1,background:"#f3f4f6",margin:"16px 0 20px"}}/>
        <div style={{position:"relative",marginBottom:20}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input value={clientSearch} onChange={e=>setClientSearch(e.target.value)} placeholder="Search clients..."
            style={{width:"100%",padding:"10px 12px 10px 36px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{borderBottom:"1px solid #e5e7eb"}}>
            <th style={{width:40,padding:"10px 12px"}}></th>
            {["Client Name","Active Batches","Last Batch",""].map((h,i)=>(
              <th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((c,i)=>(
              <tr key={i} onClick={()=>setClient(c)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:client?.name===c.name?"#fef2f2":"white"}}
                onMouseEnter={e=>{if(client?.name!==c.name)e.currentTarget.style.background="#fafafa";}}
                onMouseLeave={e=>{if(client?.name!==c.name)e.currentTarget.style.background="white";}}>
                <td style={{padding:"14px 12px",textAlign:"center"}}>
                  <div onClick={e=>{e.stopPropagation();setClient(c);}} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${client?.name===c.name?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",margin:"auto"}}>
                    {client?.name===c.name && <div style={{width:9,height:9,borderRadius:"50%",background:"#b91c1c"}}/>}
                  </div>
                </td>
                <td style={{padding:"14px 16px",fontSize:14,color:"#111827",fontWeight:500}}>{c.name}</td>
                <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>{c.activeBatches}</td>
                <td style={{padding:"14px 16px",fontSize:14,color:"#9ca3af"}}>-</td>
                <td style={{padding:"14px 16px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Footer nextFn={()=>setStep(2)} nextDisabled={!client}/>
      </Card>
    );
  };

  // ── Step 2: Batch Details ──
  const Step2 = () => (
    <Card>
      <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Batch Details</h2>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Client: {client?.name}</p>
      <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:8}}>Batch Name *</label>
      <input value={batchName} onChange={e=>setBatchName(e.target.value)} placeholder="January 2026 Graduate Intake"
        style={{width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827",marginBottom:24}}/>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:12}}>Collection Mode</label>
      {[
        {id:"decentralized", title:"Decentralized (Candidate Self-Service)", desc:"You upload Name + Email only. Candidates receive links to submit their own NIN, consent, and all required data."},
      ].map(opt=>{
        const sel = collMode===opt.id;
        return (
          <div key={opt.id} onClick={()=>setCollMode(opt.id)}
            style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 20px",border:`1.5px solid ${sel?"#b91c1c":"#e5e7eb"}`,borderRadius:10,cursor:"pointer",background:sel?"#fef2f2":"white",marginBottom:12}}
            onMouseEnter={e=>{if(!sel){e.currentTarget.style.background="#fafafa";e.currentTarget.style.borderColor="#d1d5db";}}}
            onMouseLeave={e=>{if(!sel){e.currentTarget.style.background="white";e.currentTarget.style.borderColor="#e5e7eb";}}}>
            <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sel?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
              {sel && <div style={{width:9,height:9,borderRadius:"50%",background:"#b91c1c"}}/>}
            </div>
            <div>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{opt.title}</p>
              <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{opt.desc}</p>
            </div>
          </div>
        );
      })}
      <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid #f3f4f6"}}>
        <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:12}}>Batch Setup Option</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          {[
            {id:"new", title:"Start fresh", desc:"Create a new batch from scratch while preserving existing system defaults."},
            {id:"clone", title:"Clone existing batch", desc:"Reuse a prior batch structure, then edit only what is needed."},
          ].map(opt=>{
            const sel = cloneMode === opt.id;
            return (
              <div key={opt.id} onClick={()=>setCloneMode(opt.id)} style={{border:`1.5px solid ${sel?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",background:sel?"#fef2f2":"white"}}>
                <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{opt.title}</p>
                <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{opt.desc}</p>
              </div>
            );
          })}
        </div>
        {cloneMode === "clone" && (
          <div>
            <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:8}}>Source Batch</label>
            <select value={cloneSource} onChange={e=>setCloneSource(e.target.value)} style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",outline:"none"}}>
              <option value="">Select batch to clone…</option>
              {CLONE_SOURCE_BATCHES.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
            </select>
          </div>
        )}
      </div>
      <Footer backFn={()=>setStep(1)} nextFn={()=>setStep(STEP_SERVICES)} nextDisabled={!batchName.trim()||!collMode||(cloneMode==="clone"&&!cloneSource)} showDraft/>
    </Card>
  );

  // ── Step 3: Select Services ──
  const Step3 = () => {
    const toggleService = (name) => setSelectedServices(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
    return (
      <Card>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Select Services</h2>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Choose the services to include in this batch. This replaces the old bundle-led setup and preserves the existing batch structure around direct service selection.</p>
        <div style={{height:1,background:"#f3f4f6",marginBottom:20}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {SERVICE_SELECTION_OPTIONS.map((svc)=>{
            const sel = selectedServices.includes(svc.name);
            return (
              <div key={svc.name} onClick={()=>toggleService(svc.name)} style={{border:`1.5px solid ${sel?"#b91c1c":"#e5e7eb"}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",background:sel?"#fef2f2":"white"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
                  <div>
                    <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{svc.name}</p>
                    <p style={{margin:"0 0 6px",fontSize:12,color:"#6b7280"}}>{svc.category} · SLA {ALL_SERVICES.find(s=>s.name===svc.name)?.sla || "—"}</p>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {svc.nudgeEligible && <span style={{fontSize:11,background:"#eff6ff",color:"#1d4ed8",padding:"2px 8px",borderRadius:999}}>Nudge</span>}
                      {svc.fieldBased && <span style={{fontSize:11,background:"#ecfccb",color:"#3f6212",padding:"2px 8px",borderRadius:999}}>Field</span>}
                      {svc.isScholar && <span style={{fontSize:11,background:"#f5f3ff",color:"#7c3aed",padding:"2px 8px",borderRadius:999}}>Scholar</span>}
                      {svc.mayUseBulkResponse && <span style={{fontSize:11,background:"#fff7ed",color:"#c2410c",padding:"2px 8px",borderRadius:999}}>Bulk response</span>}
                    </div>
                  </div>
                  <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${sel?"#b91c1c":"#d1d5db"}`,background:sel?"#b91c1c":"white"}}/>
                </div>
              </div>
            );
          })}
        </div>
        {hasScholarService && (
          <div style={{marginTop:18,background:"#f8fafc",border:"1px solid #e5e7eb",borderRadius:10,padding:"14px 16px"}}>
            <p style={{margin:"0 0 6px",fontSize:13,fontWeight:600,color:"#374151"}}>Scholar / VA intake impact</p>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Because VA coverage is expanding, candidate-crowdsourced academic records will increase and scholar verifications will collect the institution, registrar, exams & records, and related academic-routing data up front.</p>
          </div>
        )}
        <Footer backFn={()=>setStep(STEP_BATCH_DETAILS)} nextFn={()=>setStep(STEP_UPLOAD)} nextDisabled={selectedServices.length===0} showDraft/>
      </Card>
    );
  };

  // ── Step 4: Upload Candidates ──
  const Step4 = () => {
    const simulateUpload = () => {
      const info = { name:"Estate Database - Estate Database.csv", total:50, valid:48, errors:2, dupes:0 };
      setFileInfo(info);
      setHasErrors(info.errors > 0);
    };
    const nextStep = () => {
      if (hasErrors) setStep(STEP_ERRORS);
      else if (collMode==="decentralized") setStep(STEP_COLL_SETTINGS);
      else setStep(STEP_REVIEW);
    };
    const reqCols = buildRequiredColumns().join(", ");
    const optCols = buildOptionalColumns().join(", ");
    return (
      <Card>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Upload Candidates</h2>
        <p style={{margin:"0 0 2px",fontSize:13,color:"#6b7280"}}>Client: {client?.name}</p>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Mode: {collMode==="decentralized"?"Decentralized":"DIY"}</p>
        <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
        <div style={{border:"2px dashed #d1d5db",borderRadius:12,padding:"48px 32px",textAlign:"center",marginBottom:16,background:"#fafafa"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" style={{margin:"0 auto 12px"}}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          <p style={{margin:"0 0 16px",fontSize:14,color:"#6b7280"}}>Drag CSV file here or click to browse</p>
          <div style={{display:"flex",gap:10,justifyContent:"center"}}>
            <button onClick={simulateUpload} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>Choose File</button>
            <button style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>Download Template</button>
          </div>
        </div>
        {fileInfo && (
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"16px 20px",marginBottom:16,background:"#f8fafc"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:13,fontWeight:600,color:"#374151"}}>{fileInfo.name} <span style={{color:"#6b7280",fontWeight:400,cursor:"pointer"}}>[Remove]</span></span>
              <span style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>✓ {fileInfo.total} rows processed</span>
            </div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>• Total rows: {fileInfo.total}</p>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>• Valid: {fileInfo.valid}</p>
            {fileInfo.errors>0 && <p style={{margin:"0 0 4px",fontSize:13,color:"#b91c1c"}}>• Errors: {fileInfo.errors}</p>}
            <p style={{margin:0,fontSize:13,color:"#374151"}}>• Duplicates (skipped): {fileInfo.dupes}</p>
          </div>
        )}
        <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><strong>Required columns:</strong> {reqCols}</p>
        <p style={{margin:"0 0 10px",fontSize:13,color:"#374151"}}><strong>Optional columns:</strong> {optCols}</p>
        {hasScholarService && (
          <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"12px 14px",marginBottom:18}}>
            <p style={{margin:"0 0 6px",fontSize:13,fontWeight:600,color:"#92400e"}}>Academic / scholar intake required</p>
            <p style={{margin:0,fontSize:13,color:"#92400e"}}>Candidate-crowdsourced institution records must now include registrar email, exams & records email, payment-required clues for local institutions, and portal / institution email clues for foreign institutions where known.</p>
          </div>
        )}
        <Footer backFn={()=>setStep(STEP_SERVICES)} nextFn={nextStep} nextDisabled={!fileInfo} showDraft/>
      </Card>
    );
  };

  // ── Step 5: Review Errors (conditional) ──
  const StepErrors = () => (
    <Card>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
        <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>Review Errors</h2>
        <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Download CSV
        </button>
      </div>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>2 rows have errors. Fix and re-upload, or continue with valid rows only.</p>
      <div style={{height:1,background:"#f3f4f6",marginBottom:20}}/>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:20}}>
        <thead><tr style={{borderBottom:"1px solid #e5e7eb"}}>
          {["Row","Field","Error"].map((h,i)=><th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151"}}>{h}</th>)}
        </tr></thead>
        <tbody>
          <tr style={{borderBottom:"1px solid #f3f4f6"}}>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>12</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>Email</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#b91c1c"}}>Invalid email format</td>
          </tr>
          <tr>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>34</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#374151"}}>Email</td>
            <td style={{padding:"14px 16px",fontSize:14,color:"#b91c1c"}}>Missing required field</td>
          </tr>
        </tbody>
      </table>
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"14px 16px",marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14" style={{marginRight:6,verticalAlign:"middle"}}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          Valid rows: 48 - Will be added to batch
        </p>
        <p style={{margin:0,fontSize:13,color:"#374151"}}>Error rows: 2 - Will be excluded</p>
      </div>
      <Footer backFn={()=>setStep(STEP_UPLOAD)} nextFn={()=>setStep(collMode==="decentralized" ? STEP_COLL_SETTINGS : STEP_REVIEW)} nextLabel="Continue with Valid →" showDraft/>
    </Card>
  );

  // ── Step 6: Collection Settings (decentralized only) ──
  const StepCollSettings = () => (
    <Card>
      <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#111827"}}>Collection Settings</h2>
      <p style={{margin:"0 0 2px",fontSize:13,color:"#6b7280"}}>Client: {client?.name}</p>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Mode: Decentralized</p>
      <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:8}}>Submission Deadline</label>
      <select value={subDeadline} onChange={e=>setSubDeadline(e.target.value)}
        style={{padding:"9px 36px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",cursor:"pointer",marginBottom:6,outline:"none",appearance:"none",
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",backgroundSize:"16px"}}>
        {["3","5","7","10","14"].map(d=><option key={d} value={d}>{d} days</option>)}
      </select>
      <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>(Max: 14 days)</p>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:8}}>Link Expiry</label>
      <select value={linkExpiry} onChange={e=>setLinkExpiry(e.target.value)}
        style={{padding:"9px 36px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",cursor:"pointer",marginBottom:6,outline:"none",appearance:"none",
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",backgroundSize:"16px"}}>
        {["3","5","7","10","14","21","30"].map(d=><option key={d} value={d}>{d} days</option>)}
      </select>
      <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>(Max: 30 days)</p>
      <label style={{display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:4}}>Automatic Reminders</label>
      <p style={{margin:"0 0 12px",fontSize:13,color:"#6b7280"}}>Add the days (after link is sent) when reminders should be sent.</p>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:reminders.length?12:0}}>
        <input value={reminderInput} onChange={e=>setReminderInput(e.target.value)} type="number" min="1"
          style={{width:160,padding:"9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",color:"#374151"}}/>
        <button onClick={()=>{if(reminderInput)setReminders(p=>[...p,reminderInput]);setReminderInput("");}}
          style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#374151",color:"white",fontSize:14,fontWeight:500,cursor:"pointer"}}>Add</button>
      </div>
      {reminders.length>0 && (
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:4}}>
          {reminders.map((r,i)=>(
            <span key={i} style={{padding:"4px 12px",background:"#f3f4f6",borderRadius:20,fontSize:13,color:"#374151",display:"flex",alignItems:"center",gap:6}}>
              Day {r}
              <button onClick={()=>setReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:14,padding:0,lineHeight:1}}>×</button>
            </span>
          ))}
        </div>
      )}
      <Footer backFn={()=>setStep(hasErrors?STEP_ERRORS:STEP_UPLOAD)} nextFn={()=>setStep(STEP_REVIEW)} showDraft/>
    </Card>
  );

  // ── Step 6: Review & Create ──
  const StepReview = () => {
    const candidates = fileInfo ? fileInfo.valid : 0;
    const totalLoad = candidates;
    return (
      <Card>
        <h2 style={{margin:"0 0 20px",fontSize:18,fontWeight:700,color:"#111827"}}>Review Batch Details</h2>
        <div style={{height:1,background:"#f3f4f6",marginBottom:24}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
          {[
            {label:"Client",      val:client?.name},
            {label:"Batch Name",  val:batchName},
            {label:"Collection Mode", val:collMode==="decentralized"?"Decentralized":"DIY"},
            {label:"Setup", val:cloneMode==="clone" ? `Cloned from ${cloneSourceObj?.batch || "selected batch"}` : "Created fresh"},
            {label:"Services", val:selectedServices.join(", ") || "—"},
          ].map(({label,val},i)=>(
            <div key={i} style={{padding:"16px 0",borderBottom:"1px solid #f3f4f6"}}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500,textTransform:"uppercase",letterSpacing:.4}}>{label}</p>
              <p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{val}</p>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,marginTop:0}}>
          {[
            {label:"Candidates",  val:candidates},
            {label:"Services Selected", val:selectedServices.length},
            {label:"Total Load",  val:`${Math.max(totalLoad,1) * Math.max(selectedServices.length,1)} tasks`},
            ...(collMode==="decentralized"?[
              {label:"Submission Deadline", val:`${subDeadline} days`},
              {label:"Link Expiry",         val:`${linkExpiry} days`},
              {label:"Reminders",           val:reminders.length?reminders.map(r=>`Day ${r}`).join(", "):"None"},
            ]:[]),
          ].map(({label,val},i)=>(
            <div key={i} style={{padding:"16px 0",borderBottom:"1px solid #f3f4f6"}}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500,textTransform:"uppercase",letterSpacing:.4}}>{label}</p>
              <p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{val}</p>
            </div>
          ))}
        </div>
        {/* Success modal */}
        {success && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
            <div style={{background:"white",borderRadius:16,padding:"48px 40px",width:400,textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:"#f0fdf4",border:"2px solid #bbf7d0",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="32" height="32"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 style={{margin:"0 0 8px",fontSize:22,fontWeight:700,color:"#111827"}}>Success</h2>
              <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280"}}>Links sent successfully.</p>
              <button onClick={()=>onDone("sent")} style={{width:"100%",padding:14,background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:16,cursor:"pointer"}}>Done</button>
            </div>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:32,paddingTop:20,borderTop:"1px solid #f3f4f6"}}>
          <button onClick={()=>setStep(collMode==="decentralized" ? STEP_COLL_SETTINGS : (hasErrors ? STEP_ERRORS : STEP_UPLOAD))} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>← Back</button>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>onDone("draft")} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>
            <button onClick={()=>setSuccess(true)} style={{padding:"10px 24px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>
              {collMode==="decentralized"?"Send Links":"Create Batch"}
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#6b7280",marginBottom:20}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <ChevronRight/>
        <span style={{cursor:"pointer"}} onClick={onCancel}>Batches</span>
        <ChevronRight/>
        <span style={{color:"#111827",fontWeight:500}}>{cloneMode === "clone" ? "Clone Batch" : "Create"}</span>
      </div>
      <h1 style={{margin:"0 0 12px",fontSize:22,fontWeight:800,color:"#111827",letterSpacing:-.5}}>{cloneMode === "clone" ? "CLONE BATCH" : "CREATE BATCH"}</h1>
      {cloneMode === "clone" && <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Only the selected setup elements are being reused. Existing flow logic and downstream screens remain intact.</p>}
      <StepIndicator/>
      {step===STEP_SELECT_CLIENT && <Step1/>}
      {step===STEP_BATCH_DETAILS && <Step2/>}
      {step===STEP_SERVICES      && <Step3/>}
      {step===STEP_UPLOAD        && <Step4/>}
      {step===STEP_ERRORS        && <StepErrors/>}
      {step===STEP_COLL_SETTINGS && <StepCollSettings/>}
      {step===STEP_REVIEW        && <StepReview/>}
    </div>
  );
}

export default CreateBatchWizard;
