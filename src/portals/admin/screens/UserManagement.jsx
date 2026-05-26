import { useState } from "react";
import { ChevronDown, ChevronRight, SearchSm } from "../../../components/Icons.jsx";
import { USERS_LIST } from "../../../data/index.js";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import UserDetail from "../components/UserDetail.jsx";

export default function UserManagement({ onNewUser, onViewPermissions }) {
  const [search,       setSearch]       = useState("");
  const [users,        setUsers]        = useState(USERS_LIST);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter,   setRoleFilter]   = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  if (selectedUser) return (
    <UserDetail
      user={selectedUser}
      onBack={()=>setSelectedUser(null)}
      onUpdate={(updated)=>{ setUsers(prev=>prev.map(u=>u.name===updated.name?updated:u)); setSelectedUser(updated); }}
    />
  );

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter==="All Roles"   || u.role===roleFilter;
    const matchStatus = statusFilter==="All Status" || u.status===statusFilter;
    return matchSearch && matchRole && matchStatus;
  });
  const uStats = [
    { label:"TOTAL USERS",  value:users.length,                                         color:"#111827" },
    { label:"ACTIVE",       value:users.filter(u=>u.status==="Active").length,           color:"#16a34a" },
    { label:"SUSPENDED",    value:users.filter(u=>u.status==="Suspended").length,        color:"#d97706" },
    { label:"DEACTIVATED",  value:users.filter(u=>u.status==="Deactivated").length,      color:"#b91c1c" },
  ];
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Internal Users"]}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>INTERNAL USERS</h1>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <button onClick={onViewPermissions} style={{background:"none",border:"none",color:"#374151",fontSize:14,cursor:"pointer",textDecoration:"underline",fontWeight:500}}>View Role Permissions</button>
          <button onClick={onNewUser} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>
            + New User
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
        {uStats.map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
            <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:12,marginBottom:20,alignItems:"center"}}>
        <div style={{flex:1,maxWidth:480,position:"relative"}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users..."
            style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:10}}>
          <div style={{position:"relative"}}>
            <select value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}
              style={{padding:"9px 32px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",cursor:"pointer",background:"white",appearance:"none",outline:"none"}}>
              {["All Roles","Admin","CE","VO","VE","VM"].map(r=><option key={r}>{r}</option>)}
            </select>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
          <div style={{position:"relative"}}>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              style={{padding:"9px 32px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",cursor:"pointer",background:"white",appearance:"none",outline:"none"}}>
              {["All Status","Active","Suspended","Deactivated"].map(s=><option key={s}>{s}</option>)}
            </select>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
      </div>

      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#fafafa"}}>
              {["NAME","EMAIL","ROLE","STATUS",""].map((h,i) => (
                <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u,i) => (
              <tr key={i} onClick={()=>setSelectedUser(u)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"16px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{u.name}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{u.email}</td>
                <td style={{padding:"16px 20px",fontSize:14,color:"#374151"}}>{u.role}</td>
                <td style={{padding:"16px 20px"}}>
                  <span style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:14,color:"#111827"}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:u.status==="Active"?"#16a34a":u.status==="Suspended"?"#d97706":"#b91c1c",flexShrink:0}}/>
                    {u.status}
                  </span>
                </td>
                <td style={{padding:"16px 20px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No users found.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{padding:"14px 20px",borderTop:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {filtered.length} user{filtered.length!==1?"s":""}</p>
        </div>
      </div>
    </div>
  );
}
