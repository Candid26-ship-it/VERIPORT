import { useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import ScholarRegistrySettings from "./ScholarRegistrySettings.jsx";

function SystemConfiguration() {
  const [touFile, setTouFile]         = useState(null);
  const [ppFile, setPpFile]           = useState(null);
  const [touDragOver, setTouDragOver] = useState(false);
  const [ppDragOver, setPpDragOver]   = useState(false);
  const [touSaved, setTouSaved]       = useState(false);
  const [ppSaved, setPpSaved]         = useState(false);

  const handleDrop = (e, setter, savedSetter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) { setter(file); savedSetter(false); }
  };
  const handleFile = (e, setter, savedSetter) => {
    const file = e.target.files[0];
    if (file) { setter(file); savedSetter(false); }
  };

  const UploadZone = ({ label, desc, current, setCurrent, dragOver, setDragOver, saved, setSaved, inputId }) => (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:20}}>
      <p style={{margin:"0 0 4px",fontWeight:700,fontSize:15,color:"#111827"}}>{label}</p>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>{desc}</p>

      {current ? (
        <div style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#f9fafb",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:8,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" width="18" height="18"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/></svg>
            </div>
            <div>
              <p style={{margin:0,fontSize:14,fontWeight:500,color:"#111827"}}>{current.name}</p>
              <p style={{margin:"2px 0 0",fontSize:12,color:"#6b7280"}}>{(current.size/1024).toFixed(1)} KB · PDF</p>
            </div>
          </div>
          <button onClick={()=>{setCurrent(null);setSaved(false);}} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:13}}>Remove</button>
        </div>
      ) : (
        <div
          onDragOver={e=>{e.preventDefault();setDragOver(true);}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={e=>{setDragOver(false);handleDrop(e,setCurrent,setSaved);}}
          style={{border:`2px dashed ${dragOver?"#b91c1c":"#d1d5db"}`,borderRadius:10,padding:"36px 20px",textAlign:"center",background:dragOver?"#fef2f2":"#fafafa",marginBottom:16,cursor:"pointer"}}
          onClick={()=>document.getElementById(inputId).click()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="36" height="36" style={{margin:"0 auto 10px",display:"block"}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#374151"}}>Drag & drop your PDF here</p>
          <p style={{margin:0,fontSize:13,color:"#9ca3af"}}>or <span style={{color:"#b91c1c",fontWeight:500,textDecoration:"underline"}}>browse to upload</span></p>
          <p style={{margin:"8px 0 0",fontSize:12,color:"#d1d5db"}}>PDF only · Max 10MB</p>
          <input id={inputId} type="file" accept=".pdf" style={{display:"none"}} onChange={e=>handleFile(e,setCurrent,setSaved)}/>
        </div>
      )}

      {current && (
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <button onClick={()=>setSaved(true)} style={{padding:"10px 24px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>
            {saved ? "✓ Saved" : `Publish ${label}`}
          </button>
        </div>
      )}

      {saved && (
        <p style={{margin:"12px 0 0",fontSize:13,color:"#16a34a",fontWeight:500}}>✓ Published and live. Candidates will see this document during collection.</p>
      )}
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["System Configuration"]}/>
      <h1 style={{margin:"0 0 8px",fontSize:26,fontWeight:700,color:"#111827"}}>SYSTEM CONFIGURATION</h1>
      <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280"}}>Upload legal documents that candidates must agree to during the collection process.</p>

      <UploadZone
        label="Terms of Use"
        desc="Candidates must accept the Terms of Use before submitting their information."
        current={touFile} setCurrent={setTouFile}
        dragOver={touDragOver} setDragOver={setTouDragOver}
        saved={touSaved} setSaved={setTouSaved}
        inputId="tou-upload"
      />
      <UploadZone
        label="Privacy Policy"
        desc="The Privacy Policy explains how candidate data is collected, stored and used."
        current={ppFile} setCurrent={setPpFile}
        dragOver={ppDragOver} setDragOver={setPpDragOver}
        saved={ppSaved} setSaved={setPpSaved}
        inputId="pp-upload"
      />

      {/* ── Scholar Verification Registry Settings ────────────────────────── */}
      <ScholarRegistrySettings/>
    </div>
  );
}

export default SystemConfiguration;
