import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";
import { CLIENT_PORTAL_USERS } from "../data.js";

export default function AdminClientDetail({ client, onBack }) {
  const [users, setUsers] = useState(
    (CLIENT_PORTAL_USERS[client.name] || []).map((u,i)=>({...u, id:i}))
  );
  const [confirm, setConfirm] = useState(null); // {action, userId, msg}

  const statusColor = s => s==="Active"?"#16a34a":s==="Dormant"?"#d97706":s==="Suspended"?"#b91c1c":"#6b7280";
  const statusBg    = s => s==="Active"?"#dcfce7":s==="Dormant"?"#fef3c7":s==="Suspended"?"#fee2e2":"#f3f4f6";

  const handleConfirm = () => {
    if (!confirm) return;
    if (confirm.action==="suspend")    setUsers(p=>p.map(u=>u.id===confirm.userId?{...u,status:"Suspended"}:u));
    if (confirm.action==="deactivate") setUsers(p=>p.map(u=>u.id===confirm.userId?{...u,status:"Dormant"}:u));
    setConfirm(null);
  };

  const inp = {width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827",marginBottom:14};

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Client User Management
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#111827"}}>{client.name}</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{client.industry} · {users.length} portal user{users.length!==1?"s":""}</p>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
        {[
          {label:"TOTAL USERS",  value:users.length,                               color:"#111827"},
          {label:"ACTIVE",       value:users.filter(u=>u.status==="Active").length, color:"#16a34a"},
          {label:"DORMANT",      value:users.filter(u=>u.status==="Dormant").length,color:"#d97706"},
          {label:"SUSPENDED",    value:users.filter(u=>u.status==="Suspended").length,color:"#b91c1c"},
        ].map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["NAME","EMAIL","LAST LOGIN","STATUS","ACTIONS"].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {users.map((u,i)=>(
              <tr key={u.id} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{u.name}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{u.email}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#6b7280"}}>{u.lastLogin}</td>
                <td style={{padding:"14px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:statusBg(u.status),color:statusColor(u.status)}}>{u.status}</span>
                </td>
                <td style={{padding:"14px 20px"}}>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setConfirm({action:"suspend",userId:u.id,msg:`Suspend ${u.name}? They will temporarily lose portal access.`})}
                      disabled={u.status==="Suspended"}
                      style={{padding:"5px 12px",border:"1.5px solid #d97706",borderRadius:6,background:"white",fontSize:12,fontWeight:500,color:"#d97706",cursor:u.status==="Suspended"?"not-allowed":"pointer",opacity:u.status==="Suspended"?0.4:1}}>
                      Suspend
                    </button>
                    <button onClick={()=>setConfirm({action:"deactivate",userId:u.id,msg:`Deactivate ${u.name}? Their account will be marked dormant.`})}
                      disabled={u.status==="Dormant"}
                      style={{padding:"5px 12px",border:"1.5px solid #6b7280",borderRadius:6,background:"white",fontSize:12,fontWeight:500,color:"#6b7280",cursor:u.status==="Dormant"?"not-allowed":"pointer",opacity:u.status==="Dormant"?0.4:1}}>
                      Deactivate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length===0 && (
              <tr><td colSpan={6} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No portal users for this client.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm modal */}
      {confirm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,padding:"28px 32px",width:"90%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <h3 style={{margin:"0 0 10px",fontSize:17,fontWeight:700,color:"#111827"}}>Confirm Action</h3>
            <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280",lineHeight:1.6}}>{confirm.msg}</p>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setConfirm(null)} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
              <button onClick={handleConfirm} style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Continue</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
