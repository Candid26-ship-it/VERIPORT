import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";

export default function UserDetail({ user, onBack, onUpdate }) {
  const [confirm, setConfirm]   = useState(null); // {action, msg}
  const [roleModal, setRoleModal] = useState(false);
  const [newRole, setNewRole]   = useState(user.role);
  const [u, setU]               = useState(user);

  const statusColor = s => s==="Active"?"#16a34a":s==="Suspended"?"#d97706":"#b91c1c";
  const statusBg    = s => s==="Active"?"#dcfce7":s==="Suspended"?"#fef3c7":"#fee2e2";

  const handleConfirm = () => {
    if (confirm.action==="suspend")    { const updated={...u,status:"Suspended"}; setU(updated); onUpdate&&onUpdate(updated); }
    if (confirm.action==="deactivate") { const updated={...u,status:"Deactivated"}; setU(updated); onUpdate&&onUpdate(updated); }
    setConfirm(null);
  };
  const handleChangeRole = () => {
    const updated={...u,role:newRole}; setU(updated); onUpdate&&onUpdate(updated); setRoleModal(false);
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Internal Users
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:18,flexShrink:0}}>
            {u.name.split(" ").map(n=>n[0]).join("").substring(0,2)}
          </div>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{u.name}</h1>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:statusBg(u.status),color:statusColor(u.status)}}>{u.status}</span>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setRoleModal(true)}
            style={{padding:"9px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>
            Change Role
          </button>
          <button onClick={()=>setConfirm({action:"suspend",msg:`Are you sure you want to suspend ${u.name}? They will temporarily lose access to VeriPort.`})}
            disabled={u.status!=="Active"}
            style={{padding:"9px 18px",border:"1.5px solid #d97706",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#d97706",cursor:u.status!=="Active"?"not-allowed":"pointer",opacity:u.status!=="Active"?0.4:1}}>
            Suspend
          </button>
          <button onClick={()=>setConfirm({action:"deactivate",msg:`Are you sure you want to permanently deactivate ${u.name}? This action cannot be undone.`})}
            disabled={u.status==="Deactivated"}
            style={{padding:"9px 18px",border:"1.5px solid #b91c1c",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#b91c1c",cursor:u.status==="Deactivated"?"not-allowed":"pointer",opacity:u.status==="Deactivated"?0.4:1}}>
            Deactivate
          </button>
        </div>
      </div>

      {/* User details card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px",maxWidth:640}}>
        <p style={{margin:"0 0 16px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>USER DETAILS</p>
        {[
          ["Full Name", u.name],
          ["Email",     u.email],
          ["Role",      u.role],
          ["Status",    u.status],
        ].map(([label,value])=>(
          <div key={label} style={{display:"flex",padding:"12px 0",borderBottom:"1px solid #f3f4f6"}}>
            <span style={{width:140,fontSize:13,color:"#9ca3af",fontWeight:500,flexShrink:0}}>{label}</span>
            <span style={{fontSize:14,color:"#111827",fontWeight:500}}>{value}</span>
          </div>
        ))}
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

      {/* Change Role modal */}
      {roleModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,padding:"28px 32px",width:"90%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <h3 style={{margin:"0 0 6px",fontSize:17,fontWeight:700,color:"#111827"}}>Change Role</h3>
            <p style={{margin:"0 0 16px",fontSize:14,color:"#6b7280"}}>Select a new role for {u.name}</p>
            <select value={newRole} onChange={e=>setNewRole(e.target.value)}
              style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",marginBottom:24,color:"#111827"}}>
              {["Admin","CE","VO","VE","VM"].map(r=><option key={r} value={r}>{r}</option>)}
            </select>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setRoleModal(false)} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
              <button onClick={handleChangeRole} style={{padding:"9px 20px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Save Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
