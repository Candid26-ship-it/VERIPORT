import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { getServModes } from "../data.js";

export default function ServiceDetail({ service, onBack, onViewServMode, onAddServMode }) {
  const [editDocsOpen, setEditDocsOpen] = useState(false);
  const [docReqs, setDocReqs] = useState({
    required: ["Employment Letter","ID Copy"],
    optional: ["Pay Slip"],
    fileTypes: "PDF, JPG, PNG, DOC",
    maxSize: "5 MB",
  });
  const servforms = getServModes(service.name);
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Service Catalog", service.name]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Service Catalog
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:700,color:"#111827"}}>{service.name.toUpperCase()}</h1>
          <div style={{display:"flex",gap:16,fontSize:13,color:"#6b7280"}}>
            <span>Category: <strong style={{color:"#374151"}}>{service.category}</strong></span>
            <span>Method: <strong style={{color:"#374151"}}>{service.method}</strong></span>
            <span style={{padding:"2px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:service.status==="Active"?"#dcfce7":"#fef9c3",color:service.status==="Active"?"#16a34a":"#ca8a04"}}>{service.status}</span>
          </div>
        </div>
      </div>

      {/* Document Requirements summary */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>DOCUMENT REQUIREMENTS</p>
          <button onClick={()=>setEditDocsOpen(true)} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 14px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit Docs
          </button>
        </div>
        <p style={{margin:"0 0 4px",fontSize:14,color:"#374151"}}><strong>Required:</strong> {docReqs.required.join(", ")||"—"}</p>
        <p style={{margin:"0 0 4px",fontSize:14,color:"#374151"}}><strong>Optional:</strong> {docReqs.optional.join(", ")||"—"}</p>
        <p style={{margin:"0 0 4px",fontSize:14,color:"#374151"}}><strong>File Types:</strong> {docReqs.fileTypes}</p>
        <p style={{margin:0,fontSize:14,color:"#374151"}}><strong>Max Size:</strong> {docReqs.maxSize}</p>
      </div>

      {/* Edit Docs Modal */}
      {editDocsOpen && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,padding:"28px 32px",width:"90%",maxWidth:500,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <h3 style={{margin:"0 0 20px",fontSize:17,fontWeight:700,color:"#111827"}}>Edit Document Requirements</h3>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Required Documents</label>
              <input value={docReqs.required.join(", ")} onChange={e=>setDocReqs(p=>({...p,required:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)}))}
                placeholder="e.g. Employment Letter, ID Copy"
                style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827"}}/>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Optional Documents</label>
              <input value={docReqs.optional.join(", ")} onChange={e=>setDocReqs(p=>({...p,optional:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)}))}
                placeholder="e.g. Pay Slip"
                style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827"}}/>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Accepted File Types</label>
              <input value={docReqs.fileTypes} onChange={e=>setDocReqs(p=>({...p,fileTypes:e.target.value}))}
                placeholder="e.g. PDF, JPG, PNG, DOC"
                style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827"}}/>
            </div>
            <div style={{marginBottom:24}}>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6}}>Max File Size</label>
              <input value={docReqs.maxSize} onChange={e=>setDocReqs(p=>({...p,maxSize:e.target.value}))}
                placeholder="e.g. 5 MB"
                style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827"}}/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setEditDocsOpen(false)} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>setEditDocsOpen(false)} style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ServModes table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>SERVMODES</p>
          <button onClick={onAddServMode} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
            Edit ServMode
          </button>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["SERVMODE","MODE","SLA","PRIMARY","VOS ASSIGNED","ACTIVE TASKS","ACTION"].map((h,i)=><th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {servforms.map((sf,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{sf.code}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{sf.mode}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{sf.sla}</td>
                <td style={{padding:"14px 20px"}}>
                  {sf.primary && <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:"#eff6ff",color:"#3b82f6"}}>Primary</span>}
                </td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{sf.vosAssigned}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{sf.activeTasks}</td>
                <td style={{padding:"14px 20px"}}>
                  <button onClick={()=>onViewServMode(sf, service)} style={{background:"none",border:"none",color:"#b91c1c",fontWeight:500,fontSize:13,cursor:"pointer",padding:0}}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:"12px 20px",background:"#fffbeb",borderTop:"1px solid #fde68a"}}>
          <p style={{margin:0,fontSize:12,color:"#92400e"}}>⚑ Primary ServMode receives new tasks. Others are pivot targets only.</p>
        </div>
      </div>
    </div>
  );
}
