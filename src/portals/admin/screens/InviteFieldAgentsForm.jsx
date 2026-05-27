import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

function InviteFieldAgentsForm({ onSave, onCancel }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile]         = useState(null);
  const [manualEmails, setManualEmails] = useState("");
  const [sent, setSent]         = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.endsWith(".csv") && !f.name.endsWith(".xlsx")) return;
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  // Parse a rough preview count from manual textarea
  const emailList = manualEmails.split(/[\n,;]+/).map(s=>s.trim()).filter(Boolean);
  const totalCount = file ? "from file" : emailList.length;

  if (sent) return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400}}>
      <div style={{width:64,height:64,background:"#dcfce7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
      </div>
      <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Invitations Sent</h2>
      <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280",textAlign:"center",maxWidth:360}}>
        Field agents will receive an email invitation to register on VeriPort. They can complete their profile, coverage areas, and banking details upon signup.
      </p>
      <button onClick={onSave} style={{padding:"11px 32px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Back to Field Agents</button>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Admin","Field Agents","Invite"]}/>
      <button onClick={onCancel} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Field Agents
      </button>
      <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:700,color:"#111827"}}>INVITE FIELD AGENTS</h1>
      <p style={{margin:"0 0 28px",fontSize:14,color:"#6b7280"}}>Upload a file of agent emails or enter them manually. Agents will receive an invite link to self-register.</p>

      {/* ── Upload CSV ── */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:16}}>
        <p style={{margin:"0 0 16px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>UPLOAD AGENT LIST</p>
        <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Upload a CSV or Excel file with one column: <strong>email</strong>. Optionally include a <strong>name</strong> column.</p>

        {/* Template download */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/></svg>
          <button style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer",padding:0,textDecoration:"underline"}}>Download CSV template</button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e=>{e.preventDefault();setDragOver(true);}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={handleDrop}
          style={{border:`2px dashed ${dragOver?"#b91c1c":"#d1d5db"}`,borderRadius:10,padding:"36px 24px",textAlign:"center",background:dragOver?"#fef2f2":"#fafafa",transition:"all .15s",cursor:"pointer"}}
          onClick={()=>document.getElementById("fa-file-input").click()}>
          <input id="fa-file-input" type="file" accept=".csv,.xlsx" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
          {file ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="32" height="32"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <p style={{margin:0,fontWeight:600,fontSize:14,color:"#111827"}}>{file.name}</p>
              <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{(file.size/1024).toFixed(1)} KB</p>
              <button onClick={e=>{e.stopPropagation();setFile(null);}} style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,cursor:"pointer",padding:0,textDecoration:"underline"}}>Remove</button>
            </div>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="36" height="36" style={{marginBottom:12}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#374151"}}>Drag & drop a CSV or Excel file here</p>
              <p style={{margin:0,fontSize:13,color:"#9ca3af"}}>or click to browse</p>
            </>
          )}
        </div>
      </div>

      {/* ── OR Manual Entry ── */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:24}}>
        <p style={{margin:"0 0 6px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>OR ENTER EMAILS MANUALLY</p>
        <p style={{margin:"0 0 14px",fontSize:13,color:"#6b7280"}}>Paste or type email addresses, one per line (or comma-separated).</p>
        <textarea
          value={manualEmails}
          onChange={e=>setManualEmails(e.target.value)}
          placeholder={"agent1@example.com\nagent2@example.com\nagent3@example.com"}
          style={{width:"100%",minHeight:120,padding:"12px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,color:"#111827",outline:"none",resize:"vertical",boxSizing:"border-box",fontFamily:"inherit"}}
        />
        {emailList.length > 0 && (
          <p style={{margin:"8px 0 0",fontSize:13,color:"#6b7280"}}>{emailList.length} email{emailList.length>1?"s":""} entered</p>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingBottom:32}}>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button
          onClick={()=>{ if(file||emailList.length>0) setSent(true); }}
          disabled={!file && emailList.length===0}
          style={{padding:"11px 28px",border:"none",borderRadius:8,background:(!file&&emailList.length===0)?"#e5e7eb":"#b91c1c",fontSize:14,fontWeight:600,color:(!file&&emailList.length===0)?"#9ca3af":"white",cursor:(!file&&emailList.length===0)?"not-allowed":"pointer"}}>
          Send Invitations {(file||emailList.length>0) ? `(${file?"from file":emailList.length})` : ""}
        </button>
      </div>
    </div>
  );
}

export default InviteFieldAgentsForm;
