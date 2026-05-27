import { useState } from "react";
import { SearchSm } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { AUDIT_LOGS } from "../data.js";

function AuditLogs() {
  const [search, setSearch] = useState("");
  const rows = AUDIT_LOGS.filter(r => r.actor.toLowerCase().includes(search.toLowerCase()) || r.action.toLowerCase().includes(search.toLowerCase()) || r.entity.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Audit Logs"]}/>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>AUDIT LOGS</h1>
      <div style={{marginBottom:16,maxWidth:400,position:"relative"}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search logs..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["TIMESTAMP","ACTOR","ACTION","ENTITY","DETAILS"].map((h,i)=><th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"13px 20px",fontSize:13,color:"#6b7280",whiteSpace:"nowrap"}}>{r.time}</td>
                <td style={{padding:"13px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{r.actor}</td>
                <td style={{padding:"13px 20px",fontSize:14,color:"#374151"}}>{r.action}</td>
                <td style={{padding:"13px 20px",fontSize:14,color:"#374151"}}>{r.entity}</td>
                <td style={{padding:"13px 20px",fontSize:13,color:"#6b7280"}}>{r.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLogs;
