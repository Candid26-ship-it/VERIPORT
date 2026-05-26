import { useState } from "react";
import { ChevronRight, SearchSm } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { ADMIN_CLIENTS, CLIENT_PORTAL_USERS } from "../data.js";

export default function AdminClientList({ onNewClient, onViewClient }) {
  const [search, setSearch] = useState("");
  const rows = ADMIN_CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );
  const usersFor = (name) => CLIENT_PORTAL_USERS[name] || [];
  const count = (name, status) => usersFor(name).filter(u => u.status===status).length;

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Clients"]}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>CLIENT USER MANAGEMENT</h1>
        <button onClick={onNewClient} style={{padding:"10px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>+ New Client User</button>
      </div>
      <div style={{marginBottom:16,position:"relative",maxWidth:400}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search clients..."
          style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["CLIENT NAME","TOTAL USERS","ACTIVE","DORMANT","SUSPENDED",""].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((c,i)=>{
              const users = usersFor(c.name);
              return (
                <tr key={i} onClick={()=>onViewClient(c)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"16px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{c.name}</td>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#374151",fontWeight:600}}>{users.length}</td>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#16a34a",fontWeight:500}}>{count(c.name,"Active")}</td>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#d97706",fontWeight:500}}>{count(c.name,"Dormant")}</td>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#b91c1c",fontWeight:500}}>{count(c.name,"Suspended")}</td>
                  <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
