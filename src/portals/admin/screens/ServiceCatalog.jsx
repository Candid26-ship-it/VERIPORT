import { useState } from "react";
import { ChevronRight, SearchSm } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { SERVICES } from "../data.js";

export default function ServiceCatalog({ onNewService, onViewService }) {
  const [search, setSearch] = useState("");
  const rows = SERVICES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Service Catalog"]}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>SERVICE CATALOG</h1>
        <button onClick={onNewService} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>+ New Service</button>
      </div>
      <div style={{marginBottom:16,position:"relative",maxWidth:400}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search services..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["SERVICE NAME","CATEGORY","SERVMODES","STATUS",""].map((h,i)=><th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {rows.map((s,i)=>(
              <tr key={i} onClick={()=>onViewService(s)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{s.name}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{s.category}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{s.servforms}</td>
                <td style={{padding:"15px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:s.status==="Active"?"#dcfce7":"#fef9c3",color:s.status==="Active"?"#16a34a":"#ca8a04"}}>{s.status}</span>
                </td>
                <td style={{padding:"15px 20px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:"14px 20px",borderTop:"1px solid #f3f4f6"}}><p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {rows.length} services</p></div>
      </div>
    </div>
  );
}
