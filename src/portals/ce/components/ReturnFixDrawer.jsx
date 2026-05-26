import { useState } from "react";

function ReturnFixDrawer({ item, onClose, onResubmit }) {
  const [confirm, setConfirm] = useState(false);
  // Field values — pre-populated from existing data, CE edits them
  const [fixNote, setFixNote] = useState("");
  const [field1,  setField1]  = useState(
    item.mode==="Email"  ? item.candidate + "@corrected-domain.com" :
    item.mode==="Field"  ? "12B Corrected Street, Lagos" :
    item.mode==="Phone"  ? "+234-801-000-0000" : ""
  );
  const fieldLabel =
    item.mode==="Email"  ? "Corrected Email Address" :
    item.mode==="Field"  ? "Corrected Address" :
    item.mode==="Phone"  ? "Corrected Phone Number" : "Correction";

  const handleResubmit = () => {
    if (!fixNote.trim() || !field1.trim()) return;
    setConfirm(true);
  };
  const handleConfirm = () => { setConfirm(false); onResubmit(item); };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:460,background:"white",overflowY:"auto",padding:"28px",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:"#111827"}}>FIX RETURNED TASK</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6b7280"}}>✕</button>
        </div>

        {/* Issue context */}
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"14px 16px",marginBottom:20}}>
          <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:"#b91c1c",letterSpacing:.5}}>ISSUE FLAGGED BY VO</p>
          <p style={{margin:0,fontSize:14,color:"#111827",lineHeight:1.6}}>{item.issue}</p>
        </div>

        {/* Task details */}
        <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"14px 16px",marginBottom:20}}>
          {[
            ["Candidate",  item.candidate],
            ["Batch",      item.batch],
            ["ServMode",   item.servform],
            ["Mode",       item.mode],
            ["SLA",        item.sla],
          ].map(([l,v])=>(
            <div key={l} style={{display:"flex",marginBottom:6}}>
              <span style={{width:100,fontSize:12,color:"#9ca3af",fontWeight:600,flexShrink:0}}>{l.toUpperCase()}</span>
              <span style={{fontSize:13,color:"#374151",fontWeight:500}}>{v}</span>
            </div>
          ))}
        </div>

        {/* Fix fields */}
        <p style={{margin:"0 0 6px",fontSize:13,fontWeight:700,color:"#374151"}}>YOUR CORRECTIONS</p>
        <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>{fieldLabel} *</label>
        <input value={field1} onChange={e=>setField1(e.target.value)}
          style={{width:"100%",padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",boxSizing:"border-box",color:"#111827",marginBottom:14}}/>
        <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Fix Note to VO *</label>
        <textarea value={fixNote} onChange={e=>setFixNote(e.target.value)}
          placeholder="Explain what you corrected and why..."
          rows={4} style={{width:"100%",padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",boxSizing:"border-box",color:"#111827",resize:"vertical",marginBottom:20}}/>

        {/* Resubmit CTA */}
        <button onClick={handleResubmit} disabled={!fixNote.trim()||!field1.trim()}
          style={{padding:"11px",border:"none",borderRadius:8,background:(!fixNote.trim()||!field1.trim())?"#fca5a5":"#1d4ed8",color:"white",fontSize:14,fontWeight:700,cursor:(!fixNote.trim()||!field1.trim())?"not-allowed":"pointer",marginTop:"auto"}}>
          Resubmit to VO →
        </button>
      </div>

      {/* Confirm modal */}
      {confirm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,padding:"28px 32px",width:"90%",maxWidth:400,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <h3 style={{margin:"0 0 10px",fontSize:17,fontWeight:700,color:"#111827"}}>Confirm Resubmit</h3>
            <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280",lineHeight:1.6}}>Are you sure you want to resubmit this task to the VO? The task will be removed from your Returns queue.</p>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setConfirm(false)} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
              <button onClick={handleConfirm} style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#1d4ed8",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Resubmit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReturnFixDrawer;
