import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

// ─── Admin: New User Form ──────────────────────────────────────────────────────
function NewUserForm({ onSave, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const inp = {
    width:"100%", padding:"11px 14px", border:"1.5px solid #d1d5db", borderRadius:8,
    fontSize:14, boxSizing:"border-box", outline:"none", color:"#111827", background:"white"
  };
  const lbl = { display:"block", fontWeight:500, fontSize:14, color:"#374151", marginBottom:6 };
  return (
    <div style={{flex:1, overflowY:"auto", padding:"28px 32px"}}>
      <Breadcrumb items={["Internal Users","New"]}/>
      <button onClick={onCancel} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Users
      </button>
      <h1 style={{margin:"0 0 28px",fontSize:26,fontWeight:700,color:"#111827"}}>NEW USER</h1>

      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",maxWidth:860}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>BASIC INFORMATION</p>

        <div style={{marginBottom:18}}>
          <label style={lbl}>Full Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter full name" style={inp}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@example.com" style={inp}/>
        </div>
        <div style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <label style={{...lbl,marginBottom:0}}>Role</label>
            <span style={{fontSize:13,color:"#b91c1c",cursor:"pointer",textDecoration:"underline"}}>View role permissions</span>
          </div>
          <div style={{position:"relative"}}>
            <select value={role} onChange={e=>setRole(e.target.value)} style={{...inp, appearance:"none", paddingRight:36}}>
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="CE">CE (Client Engagement)</option>
              <option value="VO">VO (Verification Officer)</option>
              <option value="VE">VE (Verification Executive)</option>
              <option value="VM">VM (Verification Manager)</option>
            </select>
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"flex-end",gap:12,marginTop:24}}>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={()=>onSave({name,email,role,status:"Active"})} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save</button>
      </div>
    </div>
  );
}

// ─── Admin: Role Permissions ──────────────────────────────────────────────────
function RolePermissionsPage({ onBack }) {
  const Cell = ({ val }) => (
    <td style={{padding:"14px 20px",textAlign:"center",borderBottom:"1px solid #f3f4f6"}}>
      {val ? <CheckIcon/> : <span style={{color:"#d1d5db",fontSize:16}}>—</span>}
    </td>
  );
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Internal Users","Roles"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Users
      </button>
      <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>ROLE PERMISSIONS</h1>
      <p style={{margin:"0 0 24px",color:"#6b7280",fontSize:14}}>View system access levels by role</p>

      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#fafafa"}}>
              <th style={{padding:"14px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",width:"35%"}}>PERMISSION</th>
              {["ADMIN","CE","VO","VE","VM"].map(r => (
                <th key={r} style={{padding:"14px 20px",textAlign:"center",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLE_PERMISSIONS.map(group => (
              <>
                <tr key={group.section} style={{background:"#f9fafb"}}>
                  <td colSpan={6} style={{padding:"10px 20px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5,borderBottom:"1px solid #e5e7eb"}}>{group.section}</td>
                </tr>
                {group.perms.map(perm => (
                  <tr key={perm.label} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"14px 20px",fontSize:14,color:"#111827",borderBottom:"1px solid #f3f4f6"}}>{perm.label}</td>
                    <Cell val={perm.admin}/>
                    <Cell val={perm.ce}/>
                    <Cell val={perm.vo}/>
                    <Cell val={perm.ve}/>
                    <Cell val={perm.vm}/>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
        <div style={{padding:"16px 20px",borderTop:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Permissions are role-based and apply across the platform.</p>
        </div>
      </div>
    </div>
  );
}

function UserDetail({ user, onBack, onUpdate }) {
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

// ─── Admin: User Management ───────────────────────────────────────────────────
function UserManagement({ onNewUser, onViewPermissions }) {
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

// ─── Admin: Dashboard ─────────────────────────────────────────────────────────
// ─── Admin: Client User Management ───────────────────────────────────────────
const ADMIN_CLIENTS = [
  { name:"Shell Nigeria Ltd",   industry:"Oil & Gas",         contact:"Emeka Obi",     email:"emeka.obi@shell.ng",        phone:"+234-801-234-5678", address:"1 Shell Close, Victoria Island, Lagos",         active:12, completed:45, lastActivity:"Feb 18, 2026", status:"Active"   },
  { name:"Zenith Bank",         industry:"Banking & Finance",  contact:"Amaka Nwosu",   email:"amaka.nwosu@zenithbank.ng", phone:"+234-802-345-6789", address:"84 Ajose Adeogun St, Victoria Island, Lagos",   active:8,  completed:30, lastActivity:"Feb 20, 2026", status:"Active"   },
  { name:"MTN Nigeria",         industry:"Telecommunications", contact:"Chidi Adeleke", email:"chidi.adeleke@mtn.ng",      phone:"+234-803-456-7890", address:"30 Afribank St, Victoria Island, Lagos",         active:5,  completed:20, lastActivity:"Jan 15, 2026", status:"Inactive" },
  { name:"Dangote Group",       industry:"Manufacturing",      contact:"Fatima Dangote",email:"fatima@dangote.ng",         phone:"+234-804-567-8901", address:"Union Marble House, 1 Alfred Rewane Rd, Lagos",  active:3,  completed:14, lastActivity:"Feb 22, 2026", status:"Active"   },
  { name:"First Bank Nigeria",  industry:"Banking & Finance",  contact:"Olu Adesanya",  email:"olu.adesanya@firstbank.ng", phone:"+234-805-678-9012", address:"Samuel Asabia House, 35 Marina, Lagos",          active:6,  completed:22, lastActivity:"Feb 19, 2026", status:"Active"   },
];

const CLIENT_PORTAL_USERS = {
  "Shell Nigeria Ltd": [
    { name:"Emeka Obi",      email:"emeka.obi@shell.ng",        role:"HR Manager",        lastLogin:"May 12, 2026", status:"Active" },
    { name:"Ngozi Eze",      email:"ngozi.eze@shell.ng",         role:"Talent Acquisition",lastLogin:"May 10, 2026", status:"Active" },
    { name:"Tunde Bakare",   email:"tunde.bakare@shell.ng",      role:"HR Officer",        lastLogin:"Mar 28, 2026", status:"Dormant" },
  ],
  "Zenith Bank": [
    { name:"Amaka Nwosu",    email:"amaka.nwosu@zenithbank.ng",  role:"HR Director",       lastLogin:"May 11, 2026", status:"Active" },
    { name:"Chukwuma Eze",   email:"chukwuma.eze@zenithbank.ng", role:"HR Analyst",        lastLogin:"Apr 02, 2026", status:"Dormant" },
  ],
  "MTN Nigeria": [
    { name:"Chidi Adeleke",  email:"chidi.adeleke@mtn.ng",       role:"HR Manager",        lastLogin:"Jan 15, 2026", status:"Dormant" },
    { name:"Fatima Ali",     email:"fatima.ali@mtn.ng",           role:"HR Officer",        lastLogin:"—",            status:"Suspended" },
  ],
  "Dangote Group": [
    { name:"Fatima Dangote", email:"fatima@dangote.ng",           role:"Group HR Lead",     lastLogin:"May 13, 2026", status:"Active" },
  ],
  "First Bank Nigeria": [
    { name:"Olu Adesanya",   email:"olu.adesanya@firstbank.ng",  role:"HR Manager",        lastLogin:"May 09, 2026", status:"Active" },
    { name:"Bisi Adeyemi",   email:"bisi.adeyemi@firstbank.ng",  role:"Talent Officer",    lastLogin:"May 01, 2026", status:"Active" },
    { name:"Kemi Okafor",    email:"kemi.okafor@firstbank.ng",   role:"HR Coordinator",    lastLogin:"Feb 14, 2026", status:"Suspended" },
  ],
};

function AdminClientList({ onNewClient, onViewClient }) {
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

function AdminClientDetail({ client, onBack }) {
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

function ClientCredentialsScreen({ client, username, password, onDone, onSendAgain }) {
  const [copied, setCopied] = useState({u:false,p:false});
  const [resent,  setResent]  = useState(false);
  const copy = (text, key) => {
    navigator.clipboard?.writeText(text).catch(()=>{});
    setCopied(p=>({...p,[key]:true}));
    setTimeout(()=>setCopied(p=>({...p,[key]:false})),2000);
  };
  const linkedBatches = (FINALIZED_BATCHES||[]).filter(b=>b.client===client.name);

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Clients","Portal Access Created"]}/>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>✓</div>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>Portal Access Created</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>Credentials have been generated for {client.name}</p>
        </div>
      </div>

      {/* Email sent banner */}
      <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:8,padding:"12px 18px",marginBottom:24,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:14,color:"#16a34a",fontWeight:500}}>✉ Credentials sent to <strong>{client.email}</strong></span>
        <button onClick={()=>{setResent(true);setTimeout(()=>setResent(false),3000);onSendAgain&&onSendAgain();}}
          style={{padding:"5px 14px",border:"1px solid #86efac",borderRadius:6,background:"white",fontSize:13,color:"#16a34a",fontWeight:500,cursor:"pointer"}}>
          {resent?"Sent!":"Send Again"}
        </button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {/* Client Details */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
          <p style={{margin:"0 0 14px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CLIENT DETAILS</p>
          {[
            ["Client Name",    client.name],
            ["Contact Person", client.contact],
            ["Email",          client.email],
          ].map(([l,v])=>(
            <div key={l} style={{marginBottom:12}}>
              <p style={{margin:"0 0 2px",fontSize:11,color:"#9ca3af",fontWeight:600}}>{l.toUpperCase()}</p>
              <p style={{margin:0,fontSize:14,color:"#111827",fontWeight:500}}>{v}</p>
            </div>
          ))}
        </div>

        {/* Portal Credentials */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
          <p style={{margin:"0 0 14px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>PORTAL CREDENTIALS</p>
          {[
            {label:"Username", value:username, key:"u"},
            {label:"Temporary Password", value:password, key:"p"},
          ].map(({label,value,key})=>(
            <div key={key} style={{marginBottom:14}}>
              <p style={{margin:"0 0 5px",fontSize:11,color:"#9ca3af",fontWeight:600}}>{label.toUpperCase()}</p>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <code style={{flex:1,padding:"8px 12px",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,fontWeight:600,color:"#111827",fontFamily:"monospace"}}>{value}</code>
                <button onClick={()=>copy(value,key)}
                  style={{padding:"8px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,fontWeight:500,color:copied[key]?"#16a34a":"#374151",cursor:"pointer",flexShrink:0,minWidth:56}}>
                  {copied[key]?"✓ Copied":"Copy"}
                </button>
              </div>
            </div>
          ))}
          <p style={{margin:"8px 0 0",fontSize:12,color:"#9ca3af"}}>Client must change password on first login.</p>
        </div>
      </div>

      {/* Linked Batches */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:24}}>
        <div style={{padding:"16px 24px",borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>LINKED BATCHES</p>
          <p style={{margin:"2px 0 0",fontSize:12,color:"#9ca3af"}}>The client will be able to view these batches in their portal</p>
        </div>
        {linkedBatches.length > 0 ? (
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["BATCH","SERVICES","RELEASED DATE","STATUS"].map((h,i)=>(
                <th key={i} style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {linkedBatches.map((b,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"14px 20px",fontSize:13,fontWeight:500,color:"#111827"}}>{b.batch}</td>
                  <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.services.length} services</td>
                  <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.released}</td>
                  <td style={{padding:"14px 20px"}}>
                    <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:"#dcfce7",color:"#16a34a"}}>✓ Finalized</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{padding:"20px 24px",fontSize:13,color:"#9ca3af"}}>No finalized batches linked to this client yet.</div>
        )}
      </div>

      {/* Done button */}
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button onClick={onDone} style={{padding:"11px 32px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Done</button>
      </div>
    </div>
  );
}

function NewClientForm({ onSave, onCancel, onCredentials }) {
  const [selectedClient, setSelectedClientLocal] = useState(null);
  const [dropdownOpen, setDropdownOpen]  = useState(false);
  const [contact,  setContact]  = useState("");
  const [email,    setEmail]    = useState("");
  const [confirm,  setConfirm]  = useState(false);

  const lbl = {display:"block",fontSize:14,fontWeight:600,color:"#374151",marginBottom:6};
  const inp = {width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827",marginBottom:20};

  const handleSelect = (c) => {
    setSelectedClientLocal(c);
    setContact(c.contact);
    setEmail(c.email);
    setDropdownOpen(false);
  };

  const genUsername = (name) => name.toLowerCase().replace(/\s+/g,".").replace(/[^a-z.]/g,"").substring(0,20) + "@veriport";
  const genPassword = (name) => "VP-2026-" + name.replace(/\s+/g,"").substring(0,2).toUpperCase() + Math.floor(10+Math.random()*89);

  const disabled = !selectedClient || !contact.trim() || !email.trim();

  const handleCreate = () => {
    setConfirm(false);
    onCredentials({
      client: { name:selectedClient.name, contact, email },
      username: genUsername(selectedClient.name),
      password: genPassword(selectedClient.name),
    });
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Clients","New Client"]}/>
      <button onClick={onCancel} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Client User Management
      </button>
      <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:700,color:"#111827"}}>CREATE PORTAL ACCESS</h1>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Select an existing client and generate their login credentials for the client portal.</p>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",maxWidth:640}}>

        {/* Client Name dropdown */}
        <label style={lbl}>Client Name *</label>
        <div style={{position:"relative",marginBottom:20}}>
          <div onClick={()=>setDropdownOpen(p=>!p)}
            style={{...inp,marginBottom:0,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",color:selectedClient?"#111827":"#9ca3af"}}>
            <span>{selectedClient ? selectedClient.name : "Select an existing client..."}</span>
            <ChevronDown/>
          </div>
          {dropdownOpen && (
            <div style={{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #e5e7eb",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",zIndex:100,overflow:"hidden",marginTop:4}}>
              {ADMIN_CLIENTS.map((c,i)=>(
                <div key={i} onClick={()=>handleSelect(c)}
                  style={{padding:"12px 16px",fontSize:14,color:"#374151",cursor:"pointer",borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <span style={{fontWeight:500}}>{c.name}</span>
                  <span style={{fontSize:12,color:"#9ca3af",marginLeft:8}}>{c.industry}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Person */}
        <label style={lbl}>Contact Person *</label>
        <input value={contact} onChange={e=>setContact(e.target.value)} placeholder="Full name" style={inp}/>

        {/* Email */}
        <label style={lbl}>Email Address *</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="contact@company.ng" style={inp}/>

        {/* Username preview */}
        {selectedClient && (
          <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 16px",marginBottom:20}}>
            <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:.5}}>AUTO-GENERATED USERNAME PREVIEW</p>
            <code style={{fontSize:14,fontWeight:600,color:"#374151"}}>{genUsername(selectedClient.name)}</code>
          </div>
        )}

        <div style={{display:"flex",gap:10,justifyContent:"flex-end",paddingTop:8,borderTop:"1px solid #f3f4f6"}}>
          <button onClick={onCancel} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>!disabled&&setConfirm(true)} disabled={disabled}
            style={{padding:"10px 24px",border:"none",borderRadius:8,background:disabled?"#fca5a5":"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:disabled?"not-allowed":"pointer"}}>
            Create Access
          </button>
        </div>
      </div>

      {/* Confirm modal */}
      {confirm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:12,padding:"28px 32px",width:"90%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <h3 style={{margin:"0 0 10px",fontSize:17,fontWeight:700,color:"#111827"}}>Confirm Portal Access</h3>
            <p style={{margin:"0 0 8px",fontSize:14,color:"#6b7280",lineHeight:1.6}}>
              You are about to create portal access for <strong style={{color:"#111827"}}>{selectedClient?.name}</strong>.
            </p>
            <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280",lineHeight:1.6}}>
              Login credentials will be generated and sent to <strong style={{color:"#111827"}}>{email}</strong>.
            </p>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setConfirm(false)} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
              <button onClick={handleCreate} style={{padding:"9px 24px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Admin: Dashboard ─────────────────────────────────────────────────────────
function AdminDashboard({ onNavigate }) {
  const today = new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"short",day:"numeric"});

  const perf = [
    { label:"TOTAL BATCHES HANDLED", value:"847", sub:"All time",           color:"#111827" },
    { label:"SUCCESSFULLY COMPLETED",value:"731", sub:"86% completion rate", color:"#16a34a" },
    { label:"COMPLETION RATE",       value:"86%", sub:"Platform average",    color:"#16a34a" },
    { label:"CURRENTLY ACTIVE",      value:"94",  sub:"Across all clients",  color:"#3b82f6" },
    { label:"RETURNED / FLAGGED",    value:"22",  sub:"Awaiting CE action",  color:"#d97706" },
    { label:"AVG TURNAROUND",        value:"9d",  sub:"Days per job",        color:"#7c3aed" },
  ];

  const clientStats = [
    { label:"TOTAL CLIENTS",   value: ADMIN_CLIENTS.length,                                        color:"#111827" },
    { label:"ACTIVE",          value: ADMIN_CLIENTS.filter(c=>c.status==="Active").length,          color:"#16a34a" },
    { label:"INACTIVE",        value: ADMIN_CLIENTS.filter(c=>c.status!=="Active").length,          color:"#6b7280" },
    { label:"NEW THIS MONTH",  value:"2",                                                           color:"#3b82f6" },
  ];

  const teamStats = [
    { label:"TOTAL USERS",        value:"11", color:"#111827" },
    { label:"ACTIVE VOs",         value:"8",  color:"#16a34a" },
    { label:"FIELD AGENTS AVAIL", value:"6",  color:"#3b82f6" },
    { label:"TEMPLATES ASSIGNED", value:"24", color:"#7c3aed" },
  ];

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>ADMIN DASHBOARD</h1>
        <span style={{fontSize:14,color:"#6b7280"}}>{today}</span>
      </div>

      {/* Section 1 — Platform Performance */}
      <div style={{marginBottom:8}}>
        <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.6}}>PLATFORM PERFORMANCE</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:14,marginBottom:24}}>
          {perf.map(s=>(
            <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 20px"}}>
              <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5,lineHeight:1.4}}>{s.label}</p>
              <p style={{margin:"0 0 4px",fontSize:28,fontWeight:700,color:s.color}}>{s.value}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Quick Actions (unchanged) */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:20}}>
        <p style={{margin:"0 0 16px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>QUICK ACTIONS</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {[
            { label:"+ New Service",  nav:"newservice" },
            { label:"+ New User",     nav:"newuser" },
            { label:"+ New Agent",    nav:"newagent" },
            { label:"+ New Client User", nav:"newclient" },
            { label:"+ Template",     nav:"newtemplate" },
            { label:"View Audit Log", nav:"auditlogs" },
          ].map(a=>(
            <button key={a.label} onClick={()=>a.nav && onNavigate(a.nav)}
              style={{padding:"10px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 3 — Client Overview + Team Overview */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

        {/* Left — Client Overview */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CLIENT OVERVIEW</p>
            <button onClick={()=>onNavigate&&onNavigate("clients")}
              style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,color:"#374151",cursor:"pointer"}}>View All</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {clientStats.map(s=>(
              <div key={s.label} style={{background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                <p style={{margin:"0 0 6px",fontSize:10,fontWeight:700,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
                <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Team Overview */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>TEAM OVERVIEW</p>
            <button onClick={()=>onNavigate&&onNavigate("internalusers")}
              style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,color:"#374151",cursor:"pointer"}}>View All</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {teamStats.map(s=>(
              <div key={s.label} style={{background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                <p style={{margin:"0 0 6px",fontSize:10,fontWeight:700,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
                <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}


// ─── Admin: Service Catalog ───────────────────────────────────────────────────
const SERVICES = [
  { name: "Employment Verification",   category: "Employment",  method: "Digital",    servforms: 4, status: "Active" },
  { name: "Educational Verification",  category: "Education",   method: "Digital",    servforms: 3, status: "Active" },
  { name: "Address Verification",      category: "Address",     method: "Field",      servforms: 2, status: "Active" },
  { name: "Criminal Records Check",    category: "Criminal",    method: "Government", servforms: 2, status: "Active" },
  { name: "Credit Check",              category: "Financial",   method: "Digital",    servforms: 1, status: "Active" },
  { name: "Professional License",      category: "Professional",method: "Digital",    servforms: 2, status: "Active" },
  { name: "Reference Check",           category: "Employment",  method: "Phone",      servforms: 1, status: "Active" },
  { name: "NIN Verification",          category: "Identity",    method: "Government", servforms: 1, status: "Active" },
  { name: "Bank Statement Analysis",   category: "Financial",   method: "Digital",    servforms: 1, status: "Active" },
  { name: "Social Media Screening",    category: "Background",  method: "Digital",    servforms: 1, status: "Draft"  },
  { name: "Driving License Check",     category: "Identity",    method: "Government", servforms: 1, status: "Active" },
  { name: "International Verification",category: "Background",  method: "Manual",     servforms: 1, status: "Active" },
];

// ─── ServMode sample data ─────────────────────────────────────────────────────
const SERVMODE_DATA = {
  "Employment Verification": [
    { code:"EMP-REF-EMAIL", mode:"Email",  sla:"10 days", primary:true,  vosAssigned:3, activeTasks:12, status:"Active",
      voAssignments:[{name:"Mike Obi",assigned:true},{name:"Ada Nwosu",assigned:true},{name:"Emeka Udo",assigned:true},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
      assignMethod:"auto", slaDays:"10", warnThreshold:"70", escalThreshold:"90", escalRecipient:"Manager",
      autoReminders:true, reminders:[{day:"Day 3",template:"Reminder - Day 3"},{day:"Day 7",template:"Reminder - Day 7"}],
      reqTemplate:"Employment Reference - Email Request", nudgeTemplate:"Employment Reference - Nudge" },
    { code:"EMP-REF-PHONE", mode:"Phone",  sla:"7 days",  primary:false, vosAssigned:2, activeTasks:5,  status:"Active",
      voAssignments:[{name:"Mike Obi",assigned:true},{name:"Ada Nwosu",assigned:true},{name:"Emeka Udo",assigned:false},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
      assignMethod:"manual", slaDays:"7",  warnThreshold:"70", escalThreshold:"90", escalRecipient:"Manager",
      autoReminders:false, reminders:[], reqTemplate:"Employment Reference - Phone Request", nudgeTemplate:"Employment Reference - Nudge" },
    { code:"EMP-REF-FIELD", mode:"Field",  sla:"14 days", primary:false, vosAssigned:1, activeTasks:0,  status:"Active",
      voAssignments:[{name:"Mike Obi",assigned:false},{name:"Ada Nwosu",assigned:false},{name:"Emeka Udo",assigned:true},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
      assignMethod:"manual", slaDays:"14", warnThreshold:"80", escalThreshold:"95", escalRecipient:"Executive",
      autoReminders:false, reminders:[], reqTemplate:"Employment Reference - Field Request", nudgeTemplate:"Employment Reference - Nudge" },
  ],
};
const getServModes = (svcName) => SERVMODE_DATA[svcName] || [
  { code: svcName.replace(/\s+/g,"-").toUpperCase().slice(0,8)+"-EMAIL", mode:"Email", sla:"10 days", primary:true, vosAssigned:1, activeTasks:3, status:"Active",
    voAssignments:[{name:"Mike Obi",assigned:true},{name:"Ada Nwosu",assigned:false},{name:"Emeka Udo",assigned:false},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false}],
    assignMethod:"auto", slaDays:"10", warnThreshold:"70", escalThreshold:"90", escalRecipient:"Manager",
    autoReminders:true, reminders:[{day:"Day 3",template:"Reminder - Day 3"}],
    reqTemplate:"Standard - Email Request", nudgeTemplate:"Standard - Nudge" },
];

function ServiceCatalog({ onNewService, onViewService }) {
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

// ─── Admin: Service Detail (lists ServModes) ──────────────────────────────────
function ServiceDetail({ service, onBack, onViewServMode, onAddServMode }) {
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

// ─── Admin: ServMode View/Edit ────────────────────────────────────────────────
function ServModeView({ servform: sfInit, service, onBack }) {
  const [editing, setEditing] = useState(false);
  const [sf, setSf] = useState(sfInit);
  const [voAssignments, setVoAssignments] = useState(sfInit.voAssignments || []);
  const [assignMethod, setAssignMethod] = useState(sfInit.assignMethod || "auto");
  const [slaDays, setSlaDays] = useState(sfInit.slaDays || "10");
  const [warnThreshold, setWarnThreshold] = useState(sfInit.warnThreshold || "70");
  const [escalThreshold, setEscalThreshold] = useState(sfInit.escalThreshold || "90");
  const [escalRecipient, setEscalRecipient] = useState(sfInit.escalRecipient || "Manager");
  const [autoReminders, setAutoReminders] = useState(sfInit.autoReminders || false);
  const [reminders, setReminders] = useState(sfInit.reminders || []);
  const [reminderDay, setReminderDay] = useState("");
  const [reminderTemplate, setReminderTemplate] = useState("");
  const [reqTemplate, setReqTemplate] = useState(sfInit.reqTemplate || "");
  const [nudgeTemplate, setNudgeTemplate] = useState(sfInit.nudgeTemplate || "");
  const [isPrimary, setIsPrimary] = useState(sfInit.primary || false);
  const [execMode, setExecMode] = useState(sfInit.mode || "Email");
  const [sfStatus, setSfStatus] = useState(sfInit.status || "Active");
  // Scholar-specific
  const [skipVAReval, setSkipVAReval] = useState(sfInit.skipVARevalidation || false);
  // Post-VO Progression
  const [postVOFlow, setPostVOFlow] = useState(sfInit.postVOFlow || {reviewVE:false,reviewVM:false,reviewCE:false});

  const inp = {width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,boxSizing:"border-box",outline:"none",color:"#111827",background:"white"};
  const lbl = {display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6};
  const Section = ({title, children}) => (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
      <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>{title}</p>
      {children}
    </div>
  );
  const Row = ({label, value, children}) => (
    <div style={{display:"flex",gap:8,marginBottom:14}}>
      <span style={{fontSize:14,fontWeight:500,color:"#374151",minWidth:200}}>{label}:</span>
      {children || <span style={{fontSize:14,color:"#111827"}}>{value}</span>}
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Service Catalog", service.name, "ServModes", sf.code]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Service
      </button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <p style={{margin:"0 0 4px",fontSize:13,color:"#6b7280"}}>Service: {service.name.toUpperCase()}</p>
          <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>SERVMODE CONFIGURATION</h1>
        </div>
        {!editing && (
          <button onClick={()=>setEditing(true)} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit ServMode
          </button>
        )}
      </div>

      {/* Basic Configuration */}
      <Section title="BASIC CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>ServMode Code</label>
          <input value={sf.code} readOnly style={{...inp,background:"#f9fafb",color:"#6b7280"}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Auto-generated</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Execution Mode <span style={{color:"#b91c1c"}}>*</span></label>
          {editing ? (
            <div style={{position:"relative"}}>
              <select value={execMode} onChange={e=>setExecMode(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              {["Email","Letter","Field Agent","API","Portal"].map(m=><option key={m}>{m}</option>)}
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
          ) : (
            <input value={execMode} readOnly style={{...inp,background:"#f9fafb"}}/>
          )}
        </div>
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div onClick={()=>{if(editing)setIsPrimary(p=>!p);}} style={{width:18,height:18,borderRadius:4,border:`2px solid ${isPrimary?"#b91c1c":"#d1d5db"}`,background:isPrimary?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
              {isPrimary && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <label style={{fontSize:14,fontWeight:500,color:"#374151",cursor:editing?"pointer":"default"}} onClick={()=>{if(editing)setIsPrimary(p=>!p);}}>Primary ServMode</label>
          </div>
          <p style={{margin:"4px 0 0 28px",fontSize:12,color:"#6b7280"}}>Primary ServMode receives new tasks. Only one ServMode per service can be primary.</p>
          {isPrimary && editing && <div style={{marginTop:8,padding:"10px 14px",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,fontSize:13,color:"#92400e"}}>⚑ Setting this as primary will replace the existing primary ServMode.</div>}
        </div>
        <div>
          <label style={lbl}>Status <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:24}}>
            {["Active","Inactive"].map(s=>(
              <label key={s} style={{display:"flex",alignItems:"center",gap:8,cursor:editing?"pointer":"default",fontSize:14,color:"#374151"}}>
                <div onClick={()=>{if(editing)setSfStatus(s);}} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sfStatus===s?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
                  {sfStatus===s && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {s}
              </label>
            ))}
          </div>
        </div>
      </Section>

      {/* SLA Configuration */}
      <Section title="SLA CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>SLA Duration (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={slaDays} onChange={e=>{if(editing)setSlaDays(e.target.value);}} readOnly={!editing} type="number"
            style={{...inp,background:editing?"white":"#f9fafb",width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>SLA applies from the moment verification begins.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Warning Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={warnThreshold} onChange={e=>{if(editing)setWarnThreshold(e.target.value);}} readOnly={!editing} type="number"
            style={{...inp,background:editing?"white":"#f9fafb",width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Warn after this many days with no update. Must be less than SLA duration.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Escalation Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={escalThreshold} onChange={e=>{if(editing)setEscalThreshold(e.target.value);}} readOnly={!editing} type="number"
            style={{...inp,background:editing?"white":"#f9fafb",width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Escalate after this many days. Must be greater than warning threshold.</p>
        </div>
        <div>
          <label style={lbl}>Escalation Recipient <span style={{color:"#b91c1c"}}>*</span></label>
          {editing ? (
            <div style={{position:"relative",maxWidth:300}}>
              <select value={escalRecipient} onChange={e=>setEscalRecipient(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                {["Manager","Executive","Admin"].map(r=><option key={r}>{r}</option>)}
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
          ) : (
            <input value={escalRecipient} readOnly style={{...inp,background:"#f9fafb",maxWidth:300}}/>
          )}
        </div>
      </Section>

      {/* Auto-Reminder Schedule */}
      <Section title="AUTO-REMINDER SCHEDULE">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div onClick={()=>{if(editing)setAutoReminders(p=>!p);}} style={{width:18,height:18,borderRadius:4,border:`2px solid ${autoReminders?"#b91c1c":"#d1d5db"}`,background:autoReminders?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
            {autoReminders && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
          </div>
          <label style={{fontSize:14,fontWeight:500,color:"#374151",cursor:editing?"pointer":"default"}} onClick={()=>{if(editing)setAutoReminders(p=>!p);}}>Enable Auto-Reminders</label>
        </div>
        {autoReminders && (<>
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:12}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#fafafa"}}>
                <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>DAY OFFSET</th>
                <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>TEMPLATE</th>
                {editing && <th style={{width:40,borderBottom:"1px solid #e5e7eb"}}></th>}
              </tr></thead>
              <tbody>
                {reminders.map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.day}</td>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.template}</td>
                    {editing && <td style={{padding:"12px 16px",textAlign:"center"}}>
                      <button onClick={()=>setReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editing && (
            <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"14px 16px"}}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:"#374151"}}>+ Add Reminder</p>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input value={reminderDay} onChange={e=>setReminderDay(e.target.value)} placeholder="Day offset"
                  style={{width:120,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
                <div style={{position:"relative",flex:1}}>
                  <select value={reminderTemplate} onChange={e=>setReminderTemplate(e.target.value)}
                    style={{width:"100%",padding:"9px 32px 9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",appearance:"none",background:"white"}}>
                    <option value="">Select template...</option>
                    <option>Reminder - Day 3</option><option>Reminder - Day 7</option><option>Reminder - Day 14</option>
                  </select>
                  <span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
                </div>
                <button onClick={()=>{if(reminderDay&&reminderTemplate){setReminders(p=>[...p,{day:reminderDay,template:reminderTemplate}]);setReminderDay("");setReminderTemplate("");}}}
                  style={{padding:"9px 18px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button>
              </div>
            </div>
          )}
        </>)}
      </Section>

      {/* Communication Templates */}
      <Section title="COMMUNICATION TEMPLATES">
        <div style={{marginBottom:16}}>
          <label style={lbl}>Request Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {editing ? (
              <div style={{position:"relative",flex:1}}>
                <select value={reqTemplate} onChange={e=>setReqTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                  <option>Employment Reference - Email Request</option>
                  <option>Employment Reference - Phone Request</option>
                  <option>Employment Reference - Field Request</option>
                  <option>Standard - Email Request</option>
                </select>
                <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
            ) : (
              <input value={reqTemplate} readOnly style={{...inp,background:"#f9fafb",flex:1}}/>
            )}
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
        <div>
          <label style={lbl}>Candidate Nudge Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {editing ? (
              <div style={{position:"relative",flex:1}}>
                <select value={nudgeTemplate} onChange={e=>setNudgeTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                  <option>Employment Reference - Nudge</option>
                  <option>Standard - Nudge</option>
                </select>
                <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
            ) : (
              <input value={nudgeTemplate} readOnly style={{...inp,background:"#f9fafb",flex:1}}/>
            )}
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
      </Section>

      {/* VO Assignment — only Name + Assigned */}
      <Section title="VERIFICATION OFFICER (VO) ASSIGNMENT">
        <div style={{marginBottom:16}}>
          <label style={lbl}>Assignment Method</label>
          <div style={{display:"flex",gap:24}}>
            {["manual","auto"].map(m=>(
              <label key={m} style={{display:"flex",alignItems:"center",gap:8,cursor:editing?"pointer":"default",fontSize:14,color:"#374151"}}>
                <div onClick={()=>{if(editing)setAssignMethod(m);}} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${assignMethod===m?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
                  {assignMethod===m && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {m==="manual"?"Manual":"Auto (Load Balanced / Geo)"}
              </label>
            ))}
          </div>
        </div>
        <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:10}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"10px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>VO NAME</th>
              <th style={{padding:"10px 20px",textAlign:"right",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,width:100}}>ASSIGNED</th>
            </tr></thead>
            <tbody>
              {voAssignments.map((vo,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"13px 20px",fontSize:14,color:"#111827"}}>{vo.name}</td>
                  <td style={{padding:"13px 20px",textAlign:"right"}}>
                    <div onClick={()=>{if(editing)setVoAssignments(p=>p.map((v,j)=>j===i?{...v,assigned:!v.assigned}:v));}}
                      style={{width:18,height:18,borderRadius:4,border:`2px solid ${vo.assigned?"#b91c1c":"#d1d5db"}`,background:vo.assigned?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default",marginLeft:"auto"}}>
                      {vo.assigned && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Tasks are distributed based on selected assignment method.</p>
      </Section>

      {/* Skip VA Revalidation — Scholar only */}
      {sfInit.mode==="Scholar" && (
        <Section title="SCHOLAR SETTINGS">
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",paddingBottom:8}}>
            <div style={{paddingRight:24}}>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#111827"}}>Skip VA Revalidation</p>
              <p style={{margin:0,fontSize:13,color:"#6b7280"}}>When enabled, departments sourced from the VA Registry bypass the Revalidation step and proceed directly to Confirmed.</p>
            </div>
            <div onClick={()=>{if(editing)setSkipVAReval(p=>!p);}}
              style={{width:20,height:20,borderRadius:4,border:`2px solid ${skipVAReval?"#b91c1c":"#d1d5db"}`,background:skipVAReval?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default",flexShrink:0,marginTop:2}}>
              {skipVAReval && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="12" height="12"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
          </div>
        </Section>
      )}

      {/* Post-VO Progression Path */}
      <Section title="POST-VO PROGRESSION PATH">
        <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Configure the review stages work passes through after VO completes verification. Route always starts with VO and ends with Client.</p>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <div style={{padding:"8px 16px",background:"#1e3a5f",color:"white",borderRadius:8,fontSize:13,fontWeight:600}}>VO</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
          <div onClick={()=>{if(editing)setPostVOFlow(p=>({...p,reviewVE:!p.reviewVE}));}}
            style={{padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:editing?"pointer":"default",border:`2px solid ${postVOFlow.reviewVE?"#b91c1c":"#e5e7eb"}`,background:postVOFlow.reviewVE?"#fef2f2":"#f9fafb",color:postVOFlow.reviewVE?"#b91c1c":"#9ca3af"}}>
            VE {postVOFlow.reviewVE?"✓":"○"}
          </div>
          {postVOFlow.reviewVE && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>}
          <div onClick={()=>{if(editing)setPostVOFlow(p=>({...p,reviewVM:!p.reviewVM}));}}
            style={{padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:editing?"pointer":"default",border:`2px solid ${postVOFlow.reviewVM?"#b91c1c":"#e5e7eb"}`,background:postVOFlow.reviewVM?"#fef2f2":"#f9fafb",color:postVOFlow.reviewVM?"#b91c1c":"#9ca3af"}}>
            VM {postVOFlow.reviewVM?"✓":"○"}
          </div>
          {postVOFlow.reviewVM && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>}
          <div onClick={()=>{if(editing)setPostVOFlow(p=>({...p,reviewCE:!p.reviewCE}));}}
            style={{padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:editing?"pointer":"default",border:`2px solid ${postVOFlow.reviewCE?"#b91c1c":"#e5e7eb"}`,background:postVOFlow.reviewCE?"#fef2f2":"#f9fafb",color:postVOFlow.reviewCE?"#b91c1c":"#9ca3af"}}>
            CE {postVOFlow.reviewCE?"✓":"○"}
          </div>
          {postVOFlow.reviewCE && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>}
          <div style={{padding:"8px 16px",background:"#1e3a5f",color:"white",borderRadius:8,fontSize:13,fontWeight:600}}>Client</div>
        </div>
        {!editing && <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af"}}>Click Edit ServMode to configure the progression path.</p>}
        {editing  && <p style={{margin:"12px 0 0",fontSize:12,color:"#6b7280"}}>ⓘ Toggle stages on/off. Enabled stages appear in route order: VO → VE → VM → CE → Client.</p>}
      </Section>

      {/* Footer */}
      {editing && (
        <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingBottom:32}}>
          <button onClick={()=>setEditing(false)} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>setEditing(false)} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save</button>
          <button style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#1e3a5f",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save & Activate</button>
        </div>
      )}
    </div>
  );
}

function NewServiceForm({ onSave, onCancel }) {
  const inp = {width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,boxSizing:"border-box",outline:"none",color:"#111827",background:"white"};
  const lbl = {display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6};

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("active");

  // Multiple instances
  const [allowMultiple, setAllowMultiple] = useState("no");

  // ServMode Configuration
  const [sfMode,            setSfMode]            = useState("Email");
  const [sfAutoEmail,       setSfAutoEmail]        = useState("yes");
  const [sfSla,             setSfSla]              = useState("10");
  const [sfWarn,            setSfWarn]             = useState("7");
  const [sfEscal,           setSfEscal]            = useState("9");
  const [sfAutoReminders,   setSfAutoReminders]    = useState(false);
  const [sfReminders,       setSfReminders]        = useState([]);
  const [sfReminderDay,     setSfReminderDay]      = useState("");
  const [sfReminderTpl,     setSfReminderTpl]      = useState("");
  const [sfReqTemplate,     setSfReqTemplate]      = useState("");
  const [sfNudgeTemplate,   setSfNudgeTemplate]    = useState("");
  const [sfVoAssignments,   setSfVoAssignments]    = useState([
    {name:"Mike Obi",assigned:false},{name:"Ada Nwosu",assigned:false},
    {name:"Emeka Udo",assigned:false},{name:"Fatima Bello",assigned:false},{name:"Chidi Okeke",assigned:false},
  ]);
  const [sfSkipVAReval,     setSfSkipVAReval]      = useState(false);
  const [sfReviewVE,        setSfReviewVE]         = useState(false);
  const [sfReviewVM,        setSfReviewVM]         = useState(false);
  const [sfReviewCE,        setSfReviewCE]         = useState(true);
  const [instanceLevels, setInstanceLevels] = useState("2");

  // Data requirements
  const [mandFields, setMandFields] = useState([]);
  const [optFields, setOptFields]   = useState([]);
  const [mandFieldName, setMandFieldName] = useState("");
  const [mandFieldType, setMandFieldType] = useState("Text");
  const [optFieldName, setOptFieldName]   = useState("");
  const [optFieldType, setOptFieldType]   = useState("Text");

  // Document requirements — each doc: { name, type, maxSize }
  const [reqDocs, setReqDocs] = useState([]);
  const [optDocs, setOptDocs] = useState([]);
  const [reqDocName, setReqDocName] = useState("");
  const [reqDocType, setReqDocType] = useState("PDF");
  const [reqDocSize, setReqDocSize] = useState("5");
  const [optDocName, setOptDocName] = useState("");
  const [optDocType, setOptDocType] = useState("PDF");
  const [optDocSize, setOptDocSize] = useState("5");
  const [fileTypes, setFileTypes] = useState({PDF:true,JPG:true,PNG:true,DOC:true});

  const fieldTypes = ["Text","Date","Email","Phone","Number","Dropdown","File"];
  const FIELD_GROUPS = [
    { group:"BASIC",       types:["Text","Number","Date","Email","Phone","File"] },
    { group:"CUSTOM LIST", types:["Dropdown"] },
    { group:"REFERENCE",   types:["Country","State","LGA","Local Institution","Foreign Institution","Degree Type","Degree Grade","Sex","Marital Status","Relationship"] },
  ];
  const REFERENCE_TYPES = new Set(["Country","State","LGA","Local Institution","Foreign Institution","Degree Type","Degree Grade","Sex","Marital Status","Relationship"]);
  const docTypes   = ["PDF","JPG","PNG","DOC","DOCX","XLS","XLSX","Any"];

  const CBx = ({checked,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={onChange} style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
      {label}
    </label>
  );

  const Rad = ({value,current,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={()=>onChange(value)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${current===value?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
        {current===value && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      {label}
    </label>
  );

  const fieldPlaceholder = t => ({
    Text:     "e.g. Full legal name",
    Date:     "e.g. 01/01/1990",
    Email:    "e.g. applicant@email.com",
    Phone:    "e.g. +234 801 234 5678",
    Number:   "e.g. 12345",
    Dropdown: null,
    File:     null,
  }[t] || (REFERENCE_TYPES.has(t) ? null : "Field name"));

  const NIGERIAN_STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

  const FieldAdder = ({items, setItems, fname, setFname, ftype, setFtype, label}) => (
    <div style={{flex:1}}>
      <p style={{margin:"0 0 12px",fontWeight:500,fontSize:14,color:"#374151"}}>{label}</p>
      <div style={{border:"1.5px solid #e5e7eb",borderRadius:8,padding:"16px"}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {ftype==="Dropdown" ? (
            <select style={{flex:1,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",background:"white"}}>
              <option value="">Select state / LGA...</option>
              {NIGERIAN_STATES.map(s=><option key={s}>{s}</option>)}
            </select>
          ) : ftype==="File" ? (
            <div style={{flex:1,padding:"8px 12px",border:"1.5px dashed #d1d5db",borderRadius:8,fontSize:13,color:"#9ca3af",background:"#f9fafb",display:"flex",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              Browse or drop file here...
            </div>
          ) : REFERENCE_TYPES.has(ftype) ? (
            <div style={{flex:1,padding:"8px 12px",border:"1.5px solid #dbeafe",borderRadius:8,fontSize:13,color:"#1d4ed8",background:"#eff6ff",display:"flex",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              Search {ftype}... <span style={{color:"#93c5fd",fontSize:11,marginLeft:4}}>(populated from platform registry)</span>
            </div>
          ) : (
            <input value={fname} onChange={e=>setFname(e.target.value)} placeholder={fieldPlaceholder(ftype)}
              style={{flex:1,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
          )}
          <div style={{position:"relative",minWidth:160}}>
            <select value={ftype} onChange={e=>{setFtype(e.target.value);setFname("");}}
              style={{padding:"9px 28px 9px 10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",color:"#111827",appearance:"none",width:"100%",background:"white"}}>
              {FIELD_GROUPS.map(g=>(
                <optgroup key={g.group} label={g.group}>
                  {g.types.map(t=><option key={t} value={t}>{t}</option>)}
                </optgroup>
              ))}
            </select>
            <span style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
          <button onClick={()=>{
            const canAdd = fname.trim() || ftype==="Dropdown" || ftype==="File" || REFERENCE_TYPES.has(ftype);
            if(canAdd){ setItems(p=>[...p,{name:fname||ftype,type:ftype,isReference:REFERENCE_TYPES.has(ftype)}]); setFname(""); }
          }} style={{padding:"9px 14px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>+ Add</button>
        </div>
        {REFERENCE_TYPES.has(ftype) && (
          <div style={{marginTop:8,padding:"7px 10px",background:"#f0f9ff",borderRadius:6,display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:11,color:"#0369a1"}}>ℹ</span>
            <span style={{fontSize:11,color:"#0369a1"}}>Reference type — platform registry. No extra config needed. Candidate sees a searchable picker; stored value is a registry ID.</span>
          </div>
        )}
        {items.map((f,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,padding:"8px 12px",background:f.isReference?"#eff6ff":"#f9fafb",border:`1px solid ${f.isReference?"#bfdbfe":"#e5e7eb"}`,borderRadius:6,fontSize:13,color:"#374151"}}>
            <span>{f.name} <span style={{color:f.isReference?"#1d4ed8":"#9ca3af",fontSize:11}}>({f.type}{f.isReference?" · ref":""})</span></span>
            <button onClick={()=>setItems(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
          </div>
        ))}
      </div>
    </div>
  );

  const DocAdder = ({items, setItems, dname, setDname, dtype, setDtype, dsize, setDsize, label}) => (
    <div style={{flex:1}}>
      <p style={{margin:"0 0 12px",fontWeight:500,fontSize:14,color:"#374151"}}>{label}</p>
      <div style={{border:"1.5px solid #e5e7eb",borderRadius:8,padding:"16px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <input value={dname} onChange={e=>setDname(e.target.value)} placeholder="Document name"
            style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={dtype} onChange={e=>setDtype(e.target.value)}
                style={{padding:"8px 28px 8px 10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",color:"#111827",appearance:"none",width:"100%",background:"white"}}>
                {docTypes.map(t=><option key={t}>{t}</option>)}
              </select>
              <span style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <input value={dsize} onChange={e=>setDsize(e.target.value)} placeholder="Max MB" type="number"
              style={{width:76,padding:"8px 10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",color:"#111827"}}/>
            <button onClick={()=>{if(dname.trim()){setItems(p=>[...p,{name:dname,type:dtype,maxSize:dsize}]);setDname("");setDsize("5");}}}
              style={{padding:"8px 14px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>+ Add</button>
          </div>
        </div>
        {items.map((d,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,padding:"8px 12px",background:"#f9fafb",borderRadius:6,fontSize:13,color:"#374151"}}>
            <span>{d.name} <span style={{color:"#9ca3af"}}>({d.type}, max {d.maxSize}MB)</span></span>
            <button onClick={()=>setItems(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Services","New"]}/>
      <button onClick={onCancel} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Service Catalog
      </button>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>NEW SERVICE</h1>

      {/* Basic Information */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>BASIC INFORMATION</p>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Service Name <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={name} onChange={e=>setName(e.target.value)} style={inp}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Service Code <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="e.g., EMP-VER-001" style={inp}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Category <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{position:"relative"}}>
            <select value={cat} onChange={e=>setCat(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              <option value="">Select category...</option>
              {["Employment","Education","Address","Criminal","Financial","Professional","Identity","Background"].map(c=><option key={c}>{c}</option>)}
            </select>
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Description <span style={{color:"#b91c1c"}}>*</span></label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} style={{...inp,resize:"vertical"}}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>Status <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:24}}>
            <Rad value="active"   current={status} onChange={setStatus} label="Active"/>
            <Rad value="inactive" current={status} onChange={setStatus} label="Inactive"/>
          </div>
        </div>
        {/* VA Registry Settings — Education/Scholar only */}
        {(cat==="Education"||cat==="Scholar") && (
          <div style={{marginBottom:18,padding:"16px 20px",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8}}>
            <p style={{margin:"0 0 14px",fontWeight:700,fontSize:12,color:"#374151",letterSpacing:.5}}>VA REGISTRY SETTINGS</p>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:24}}>
              <div style={{flex:1}}>
                <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#374151"}}>Skip VA Revalidation</p>
                <p style={{margin:0,fontSize:13,color:"#6b7280"}}>When enabled, authorities sourced from the VA Registry bypass the Revalidation step and move directly to Confirmed.</p>
              </div>
              <div onClick={()=>setSfSkipVAReval(p=>!p)}
                style={{width:44,height:24,borderRadius:12,background:sfSkipVAReval?"#b91c1c":"#d1d5db",cursor:"pointer",flexShrink:0,position:"relative",transition:"background .15s",marginTop:2}}>
                <div style={{position:"absolute",top:3,left:sfSkipVAReval?23:3,width:18,height:18,borderRadius:"50%",background:"white",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",transition:"left .15s"}}/>
              </div>
            </div>
          </div>
        )}
        {/* Allow Multiple Instances */}
        <div style={{borderTop:"1px solid #e5e7eb",paddingTop:18}}>
          <label style={lbl}>Allow Multiple Instances <span style={{color:"#b91c1c"}}>*</span></label>
          <p style={{margin:"0 0 12px",fontSize:13,color:"#6b7280"}}>Allows a candidate to submit more than one instance of this service (e.g. two employment history records).</p>
          <div style={{display:"flex",gap:24}}>
            <Rad value="yes" current={allowMultiple} onChange={setAllowMultiple} label="Yes"/>
            <Rad value="no"  current={allowMultiple} onChange={setAllowMultiple} label="No"/>
          </div>
          {allowMultiple==="yes" && (
            <div style={{marginTop:14,padding:"16px 20px",background:"#fef9c3",border:"1px solid #fde68a",borderRadius:8}}>
              <label style={{...lbl,marginBottom:8}}>Number of Instances (Levels)</label>
              <p style={{margin:"0 0 10px",fontSize:12,color:"#92400e"}}>How many instances the candidate must complete. E.g. set to 2 to require two employment history entries.</p>
              <input value={instanceLevels} onChange={e=>setInstanceLevels(e.target.value)} type="number" min="2" max="10"
                style={{...inp,width:100}}/>
              <p style={{margin:"6px 0 0",fontSize:12,color:"#6b7280"}}>Min: 2 &nbsp;·&nbsp; Max: 10</p>
            </div>
          )}
        </div>
      </div>

      {/* Data Requirements */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>DATA REQUIREMENTS</p>
        <p style={{margin:"0 0 6px",fontSize:13,color:"#6b7280"}}>Define fields to collect from candidates for this service.</p>
        <p style={{margin:"0 0 20px",fontSize:12,color:"#9ca3af"}}>Field Types: Text, Date, Email, Phone, Number, Dropdown, File</p>
        <div style={{display:"flex",gap:16}}>
          <FieldAdder items={mandFields} setItems={setMandFields} fname={mandFieldName} setFname={setMandFieldName} ftype={mandFieldType} setFtype={setMandFieldType} label="Mandatory Fields"/>
          <FieldAdder items={optFields}  setItems={setOptFields}  fname={optFieldName}  setFname={setOptFieldName}  ftype={optFieldType}  setFtype={setOptFieldType}  label="Optional Fields"/>
        </div>
      </div>

      {/* Document Requirements */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>DOCUMENT REQUIREMENTS</p>
        <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Each document has its own accepted file type and max file size.</p>
        <div style={{display:"flex",gap:16,marginBottom:16}}>
          <DocAdder items={reqDocs} setItems={setReqDocs} dname={reqDocName} setDname={setReqDocName} dtype={reqDocType} setDtype={setReqDocType} dsize={reqDocSize} setDsize={setReqDocSize} label="Required Documents"/>
          <DocAdder items={optDocs} setItems={setOptDocs} dname={optDocName} setDname={setOptDocName} dtype={optDocType} setDtype={setOptDocType} dsize={optDocSize} setDsize={setOptDocSize} label="Optional Documents"/>
        </div>
      </div>

      {/* ServMode Configuration */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>SERVMODE CONFIGURATION</p>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Configure the default ServMode for this service. You can edit it from the service detail page after saving.</p>

        {/* Basic config */}
        <div style={{marginBottom:16}}>
          <label style={lbl}>Execution Mode <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{position:"relative",maxWidth:300}}>
            <select value={sfMode} onChange={e=>setSfMode(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              {["Email","Field","Portal","Letter","Scholar"].map(m=><option key={m}>{m}</option>)}
            </select>
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Automatic Email Dispatch</label>
          <div style={{display:"flex",gap:24,marginTop:4}}>
            {["yes","no"].map(v=>(
              <label key={v} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:"#374151"}}>
                <div onClick={()=>setSfAutoEmail(v)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sfAutoEmail===v?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                  {sfAutoEmail===v && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {v==="yes"?"Yes":"No"}
              </label>
            ))}
          </div>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Emails are sent automatically when tasks are assigned.</p>
        </div>

        {/* SLA */}
        <div style={{marginBottom:16}}>
          <label style={lbl}>SLA Duration (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={sfSla} onChange={e=>setSfSla(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>SLA applies from the moment verification begins.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Warning Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={sfWarn} onChange={e=>setSfWarn(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Warn after this many days with no update. Must be less than SLA duration.</p>
        </div>
        <div style={{marginBottom:0}}>
          <label style={lbl}>Escalation Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={sfEscal} onChange={e=>setSfEscal(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Escalate after this many days. Must be greater than warning threshold.</p>
        </div>
      </div>

      {/* Auto-Reminder Schedule */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>AUTO-REMINDER SCHEDULE</p>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div onClick={()=>setSfAutoReminders(p=>!p)} style={{width:18,height:18,borderRadius:4,border:`2px solid ${sfAutoReminders?"#b91c1c":"#d1d5db"}`,background:sfAutoReminders?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
            {sfAutoReminders && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
          </div>
          <span style={{fontSize:14,color:"#374151",cursor:"pointer"}} onClick={()=>setSfAutoReminders(p=>!p)}>Enable Auto-Reminders</span>
        </div>
        {sfAutoReminders && (<>
          {sfReminders.length > 0 && (
            <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:12}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>DAY OFFSET</th>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>TEMPLATE</th>
                  <th style={{width:40,borderBottom:"1px solid #e5e7eb"}}></th>
                </tr></thead>
                <tbody>{sfReminders.map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.day}</td>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.template}</td>
                    <td style={{padding:"12px 16px",textAlign:"center"}}>
                      <button onClick={()=>setSfReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16}}>×</button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"14px 16px"}}>
            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:"#374151"}}>+ Add Reminder</p>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={sfReminderDay} onChange={e=>setSfReminderDay(e.target.value)} placeholder="Day offset"
                style={{width:120,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
              <div style={{position:"relative",flex:1}}>
                <select value={sfReminderTpl} onChange={e=>setSfReminderTpl(e.target.value)}
                  style={{width:"100%",padding:"9px 32px 9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",appearance:"none",background:"white"}}>
                  <option value="">Select template...</option>
                  <option>Reminder - Day 3</option><option>Reminder - Day 7</option><option>Reminder - Day 14</option>
                </select>
                <span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
              <button onClick={()=>{if(sfReminderDay&&sfReminderTpl){setSfReminders(p=>[...p,{day:`Day ${sfReminderDay}`,template:sfReminderTpl}]);setSfReminderDay("");setSfReminderTpl("");}}}
                style={{padding:"9px 18px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button>
            </div>
          </div>
        </>)}
      </div>

      {/* Communication Templates */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>COMMUNICATION TEMPLATES</p>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Request Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={sfReqTemplate} onChange={e=>setSfReqTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Email Request</option>
                <option>Standard - Email Request</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
        <div>
          <label style={lbl}>Candidate Nudge Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={sfNudgeTemplate} onChange={e=>setSfNudgeTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Nudge</option>
                <option>Standard - Nudge</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
      </div>

      {/* VO Assignment */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>VERIFICATION OFFICER (VO) ASSIGNMENT</p>
        <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:10}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"10px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>VO NAME</th>
              <th style={{padding:"10px 20px",textAlign:"right",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,width:100}}>ASSIGNED</th>
            </tr></thead>
            <tbody>{sfVoAssignments.map((vo,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                <td style={{padding:"13px 20px",fontSize:14,color:"#111827"}}>{vo.name}</td>
                <td style={{padding:"13px 20px",textAlign:"right"}}>
                  <div onClick={()=>setSfVoAssignments(p=>p.map((v,j)=>j===i?{...v,assigned:!v.assigned}:v))}
                    style={{width:18,height:18,borderRadius:4,border:`2px solid ${vo.assigned?"#b91c1c":"#d1d5db"}`,background:vo.assigned?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginLeft:"auto"}}>
                    {vo.assigned && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Tick the checkbox to assign a VO officer to this ServMode.</p>
      </div>

      {/* Post-VO Progression Path */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:24}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>POST-VO PROGRESSION PATH</p>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Configure the review stages work passes through after VO completes verification. Route always starts with VO and ends with Client.</p>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>VO</span>
          </div>
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          {[["VE",sfReviewVE,setSfReviewVE],["VM",sfReviewVM,setSfReviewVM],["CE",sfReviewCE,setSfReviewCE]].map(([label,val,set])=>(
            <div key={label}>
              <div onClick={()=>set(p=>!p)}
                style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:val?"#eff6ff":"#f9fafb",border:`1.5px solid ${val?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
                {val && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
                <span style={{fontSize:13,fontWeight:500,color:val?"#1d4ed8":"#6b7280"}}>{label}</span>
              </div>
            </div>
          ))}
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="14" height="14"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>Client</span>
          </div>
        </div>
        <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af"}}>Click VE, VM, or CE to include or exclude that review stage. VO and Client are always fixed.</p>
      </div>

      {/* Footer */}
      <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingBottom:32}}>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>
        <button onClick={onSave} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save</button>
      </div>
    </div>
  );
}

// ─── Admin: New ServMode Form ────────────────────────────────────────────────
function NewServModeForm({ service, onSave, onCancel }) {
  const inp = {width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,boxSizing:"border-box",outline:"none",color:"#111827",background:"white"};
  const lbl = {display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6};
  const Section = ({title,children}) => (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
      <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>{title}</p>
      {children}
    </div>
  );
  const Rad = ({value,current,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={()=>onChange(value)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${current===value?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
        {current===value && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      {label}
    </label>
  );
  const CBx = ({checked,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={onChange} style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
      {label}
    </label>
  );

  const [execMode, setExecMode] = useState("Email");
  const [emailDispatch, setEmailDispatch] = useState("Yes");
  const [isPrimary, setIsPrimary] = useState(false);
  const [sfStatus, setSfStatus] = useState("Active");
  const [slaDays, setSlaDays] = useState("10");
  const [warnThreshold, setWarnThreshold] = useState("70");
  const [escalThreshold, setEscalThreshold] = useState("90");
  const [escalRecipient, setEscalRecipient] = useState("Manager");
  const [autoReminders, setAutoReminders] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminderDay, setReminderDay] = useState("");
  const [reminderTemplate, setReminderTemplate] = useState("");
  const [reqTemplate, setReqTemplate] = useState("");
  const [nudgeTemplate, setNudgeTemplate] = useState("");
  const [voAssignments, setVoAssignments] = useState([
    {name:"Mike Obi",    assigned:false},
    {name:"Ada Nwosu",   assigned:false},
    {name:"Emeka Udo",   assigned:false},
    {name:"Fatima Bello",assigned:false},
    {name:"Chidi Okeke", assigned:false},
  ]);
  const [skipVAReval, setSkipVAReval] = useState(false);
  const [reviewVE, setReviewVE] = useState(false);
  const [reviewVM, setReviewVM] = useState(false);
  const [reviewCE, setReviewCE] = useState(false);

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Service Catalog", service?.name || "Service", "ServModes", "New"]}/>
      <button onClick={onCancel} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Service
      </button>
      <div style={{marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontSize:13,color:"#6b7280"}}>Service: {(service?.name||"").toUpperCase()}</p>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>NEW SERVMODE</h1>
      </div>

      {/* Basic Configuration */}
      <Section title="BASIC CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>ServMode Code</label>
          <input value="Auto-generated" readOnly style={{...inp,background:"#f9fafb",color:"#9ca3af"}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Auto-generated upon save</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Execution Mode <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{position:"relative"}}>
            <select value={execMode} onChange={e=>setExecMode(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              {["Email","Letter","Field Agent","API","Portal"].map(m=><option key={m}>{m}</option>)}
            </select>
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
        {execMode==="Email" && (
          <div style={{marginBottom:16}}>
            <label style={lbl}>Automatic Email Dispatch</label>
            <div style={{display:"flex",gap:24,marginTop:4}}>
              <Rad value="Yes" current={emailDispatch} onChange={setEmailDispatch} label="Yes"/>
              <Rad value="No"  current={emailDispatch} onChange={setEmailDispatch} label="No"/>
            </div>
            <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af"}}>{emailDispatch==="Yes"?"Emails are sent automatically when tasks are assigned.":"Emails require manual review and approval before sending."}</p>
          </div>
        )}
        <div style={{marginBottom:16}}>
          <CBx checked={isPrimary} onChange={()=>setIsPrimary(p=>!p)} label="Primary ServMode"/>
          <p style={{margin:"4px 0 0 26px",fontSize:12,color:"#6b7280"}}>Primary ServMode receives new tasks. Only one ServMode per service can be primary.</p>
          {isPrimary && <div style={{marginTop:8,padding:"10px 14px",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,fontSize:13,color:"#92400e"}}>⚑ Setting this as primary will replace the existing primary ServMode.</div>}
        </div>
        <div>
          <label style={lbl}>Status <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:24}}>
            <Rad value="Active"   current={sfStatus} onChange={setSfStatus} label="Active"/>
            <Rad value="Inactive" current={sfStatus} onChange={setSfStatus} label="Inactive"/>
          </div>
        </div>
      </Section>

      {/* SLA Configuration */}
      <Section title="SLA CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>SLA Duration (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={slaDays} onChange={e=>setSlaDays(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>SLA applies from the moment verification begins.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Warning Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={warnThreshold} onChange={e=>setWarnThreshold(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Warn after this many days with no update. Must be less than SLA duration.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Escalation Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={escalThreshold} onChange={e=>setEscalThreshold(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Escalate after this many days. Must be greater than warning threshold.</p>
        </div>
      </Section>

      {/* Auto-Reminder Schedule */}
      <Section title="AUTO-REMINDER SCHEDULE">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <CBx checked={autoReminders} onChange={()=>setAutoReminders(p=>!p)} label="Enable Auto-Reminders"/>
        </div>
        {autoReminders && (<>
          {reminders.length > 0 && (
            <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:12}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>DAY OFFSET</th>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>TEMPLATE</th>
                  <th style={{width:40,borderBottom:"1px solid #e5e7eb"}}></th>
                </tr></thead>
                <tbody>
                  {reminders.map((r,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                      <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.day}</td>
                      <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.template}</td>
                      <td style={{padding:"12px 16px",textAlign:"center"}}>
                        <button onClick={()=>setReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"14px 16px"}}>
            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:"#374151"}}>+ Add Reminder</p>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={reminderDay} onChange={e=>setReminderDay(e.target.value)} placeholder="Day offset"
                style={{width:120,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
              <div style={{position:"relative",flex:1}}>
                <select value={reminderTemplate} onChange={e=>setReminderTemplate(e.target.value)}
                  style={{width:"100%",padding:"9px 32px 9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",appearance:"none",background:"white"}}>
                  <option value="">Select template...</option>
                  <option>Reminder - Day 3</option><option>Reminder - Day 7</option><option>Reminder - Day 14</option>
                </select>
                <span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
              <button onClick={()=>{if(reminderDay&&reminderTemplate){setReminders(p=>[...p,{day:`Day ${reminderDay}`,template:reminderTemplate}]);setReminderDay("");setReminderTemplate("");}}}
                style={{padding:"9px 18px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button>
            </div>
          </div>
        </>)}
      </Section>

      {/* Communication Templates */}
      <Section title="COMMUNICATION TEMPLATES">
        <div style={{marginBottom:16}}>
          <label style={lbl}>Request Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={reqTemplate} onChange={e=>setReqTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Email Request</option>
                <option>Employment Reference - Phone Request</option>
                <option>Employment Reference - Field Request</option>
                <option>Standard - Email Request</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
        <div>
          <label style={lbl}>Candidate Nudge Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={nudgeTemplate} onChange={e=>setNudgeTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Nudge</option>
                <option>Standard - Nudge</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
      </Section>

      {/* VO Assignment */}
      <Section title="VERIFICATION OFFICER (VO) ASSIGNMENT">
        <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:10}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"10px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>VO NAME</th>
              <th style={{padding:"10px 20px",textAlign:"right",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,width:100}}>ASSIGNED</th>
            </tr></thead>
            <tbody>
              {voAssignments.map((vo,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"13px 20px",fontSize:14,color:"#111827"}}>{vo.name}</td>
                  <td style={{padding:"13px 20px",textAlign:"right"}}>
                    <div onClick={()=>setVoAssignments(p=>p.map((v,j)=>j===i?{...v,assigned:!v.assigned}:v))}
                      style={{width:18,height:18,borderRadius:4,border:`2px solid ${vo.assigned?"#b91c1c":"#d1d5db"}`,background:vo.assigned?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginLeft:"auto"}}>
                      {vo.assigned && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Tick the checkbox to assign a VO officer to this ServMode.</p>
      </Section>

      {/* VA Registry Settings — Education/Scholar only */}
      {(service?.category === "Education" || service?.category === "Scholar" || service?.mode === "Scholar") && (
      <Section title="VA REGISTRY SETTINGS">
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:24}}>
          <div style={{flex:1}}>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#374151"}}>Skip VA Revalidation</p>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>When enabled, authorities sourced from the VA Registry bypass the Revalidation step and move directly to Confirmed.</p>
          </div>
          <div onClick={()=>setSkipVAReval(p=>!p)}
            style={{width:44,height:24,borderRadius:12,background:skipVAReval?"#b91c1c":"#d1d5db",cursor:"pointer",flexShrink:0,position:"relative",transition:"background .15s",marginTop:2}}>
            <div style={{position:"absolute",top:3,left:skipVAReval?23:3,width:18,height:18,borderRadius:"50%",background:"white",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",transition:"left .15s"}}/>
          </div>
        </div>
      </Section>
      )}

      {/* Post-VO Progression Path */}
      <Section title="POST-VO PROGRESSION PATH">
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Configure the review stages work passes through after VO completes verification. Route always starts with VO and ends with Client.</p>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          {/* Fixed: VO */}
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>VO</span>
          </div>
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          {/* Toggle: VE */}
          <div onClick={()=>setReviewVE(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:reviewVE?"#eff6ff":"#f9fafb",border:`1.5px solid ${reviewVE?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
            {reviewVE && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
            <span style={{fontSize:13,fontWeight:500,color:reviewVE?"#1d4ed8":"#6b7280"}}>VE</span>
          </div>
          {reviewVE && <span style={{color:"#9ca3af",fontSize:16}}>→</span>}
          {/* Toggle: VM */}
          <div onClick={()=>setReviewVM(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:reviewVM?"#eff6ff":"#f9fafb",border:`1.5px solid ${reviewVM?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
            {reviewVM && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
            <span style={{fontSize:13,fontWeight:500,color:reviewVM?"#1d4ed8":"#6b7280"}}>VM</span>
          </div>
          {reviewVM && <span style={{color:"#9ca3af",fontSize:16}}>→</span>}
          {/* Toggle: CE */}
          <div onClick={()=>setReviewCE(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:reviewCE?"#eff6ff":"#f9fafb",border:`1.5px solid ${reviewCE?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
            {reviewCE && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
            <span style={{fontSize:13,fontWeight:500,color:reviewCE?"#1d4ed8":"#6b7280"}}>CE</span>
          </div>
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          {/* Fixed: Client */}
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="14" height="14"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>Client</span>
          </div>
        </div>
        <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af"}}>Click VE, VM, or CE to include or exclude that review stage. VO and Client are always fixed.</p>
      </Section>

      {/* Footer */}
      <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingBottom:32}}>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>
        <button onClick={onSave} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save ServMode</button>
      </div>
    </div>
  );
}

// ─── Admin: Communication Templates ──────────────────────────────────────────
const TEMPLATES = [
  // Candidate
  { ref:"C-01", name:"Candidate Invitation",       cat:"Candidate",      channel:"Email",     pri:"High",     status:"Required", owner:"CE",     retry:"Resend after 48 hrs inactivity. Max 3 reminders.",              vars:["{{CandidateName}}","{{CollectionLink}}","{{ExpiryDate}}","{{BatchName}}","{{ClientName}}"],                                        modified:"Jan 12, 2026", subject:"Your Verification Has Been Initiated — Action Required" },
  { ref:"C-02", name:"Collection Reminder",        cat:"Candidate",      channel:"Email/SMS", pri:"High",     status:"Existing", owner:"CE",     retry:"Day 3, Day 7 after invitation. Stop after 3 sends.",            vars:["{{CandidateName}}","{{CollectionLink}}","{{ExpiryDate}}","{{DaysRemaining}}"],                                                      modified:"Jan 10, 2026", subject:"Reminder: Please Complete Your Verification Submission" },
  { ref:"C-03", name:"Link Expiry Warning",         cat:"Candidate",      channel:"Email/SMS", pri:"Medium",   status:"Existing", owner:"System", retry:"Single send 24 hrs before expiry.",                             vars:["{{CandidateName}}","{{CollectionLink}}","{{ExpiryDate}}","{{HoursRemaining}}"],                                                      modified:"Jan 11, 2026", subject:"Your Verification Link Expires Soon" },
  { ref:"C-04", name:"Consent Confirmation",       cat:"Candidate",      channel:"Email",     pri:"Medium",   status:"Required", owner:"System", retry:"Single send on consent capture. No retry.",                    vars:["{{CandidateName}}","{{ConsentDate}}","{{PlatformName}}","{{DataUsageSummary}}"],                                                      modified:"—",            subject:"Your Consent Has Been Recorded" },
  { ref:"C-05", name:"NIN Verification Failure",   cat:"Candidate",      channel:"In-App",    pri:"High",     status:"Required", owner:"System", retry:"Triggered on each failed attempt. Max 3.",                     vars:["{{CandidateName}}","{{FailureReason}}","{{RetryLink}}","{{SupportEmail}}"],                                                           modified:"Dec 28, 2025", subject:"NIN Verification Unsuccessful — Please Retry" },
  { ref:"C-06", name:"Face Capture Retry",         cat:"Candidate",      channel:"In-App",    pri:"Medium",   status:"Required", owner:"System", retry:"Immediate on failure. Max 3 attempts before escalation.",       vars:["{{CandidateName}}","{{AttemptNumber}}","{{RetryLink}}","{{SupportContact}}"],                                                      modified:"—",            subject:"Face Capture Unsuccessful — Please Try Again" },
  { ref:"C-07", name:"Document Upload Reminder",   cat:"Candidate",      channel:"Email/SMS", pri:"Medium",   status:"Required", owner:"System", retry:"After 24 hrs if docs still missing. Max 2 reminders.",          vars:["{{CandidateName}}","{{MissingDocuments}}","{{UploadLink}}","{{Deadline}}"],                                                        modified:"—",            subject:"Action Required: Missing Documents for Your Verification" },
  { ref:"C-08", name:"Candidate Nudge",            cat:"Candidate",      channel:"Email/SMS", pri:"Medium",   status:"Required", owner:"VO",     retry:"Manual trigger by VO. No auto-retry.",                          vars:["{{CandidateName}}","{{InstitutionName}}","{{NudgeReason}}","{{ContactDetails}}"],                                                     modified:"—",            subject:"Follow-Up Required: Your Verification Is Pending" },
  // VA / Institutional
  { ref:"I-01", name:"VA Validation Request",      cat:"VA/Institutional",channel:"Email",    pri:"Critical", status:"Required", owner:"VO",     retry:"Reminder after SLA warning threshold. Escalate after 2 failed.", vars:["{{CandidateName}}","{{Institution}}","{{Department}}","{{VerificationLink}}","{{DueDate}}","{{VOName}}"],                         modified:"Jan 05, 2026", subject:"Verification Request — {{CandidateName}} / {{Department}}" },
  { ref:"I-02", name:"VA Reminder",                cat:"VA/Institutional",channel:"Email",    pri:"High",     status:"Required", owner:"System", retry:"Day 3, Day 7, Day 14. Escalate to VM after Day 14.",            vars:["{{CandidateName}}","{{Institution}}","{{Department}}","{{OriginalRequestDate}}","{{DueDate}}"],                                      modified:"—",            subject:"Reminder: Verification Response Required" },
  { ref:"I-03", name:"Verification Acknowledgment",cat:"VA/Institutional",channel:"Email",   pri:"Low",      status:"Required", owner:"System", retry:"Single send on response receipt. No retry.",                    vars:["{{InstitutionName}}","{{CandidateName}}","{{ResponseDate}}","{{VOName}}"],                                                           modified:"—",            subject:"Thank You — Verification Response Received" },
  { ref:"I-04", name:"Request More Information",   cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"VO",     retry:"Manual trigger by VO. No auto-retry.",                          vars:["{{RecipientName}}","{{CandidateName}}","{{InformationRequired}}","{{Deadline}}","{{VOName}}"],                                       modified:"—",            subject:"Additional Information Required — {{CandidateName}}" },
  { ref:"I-05", name:"Portal Verification Request",cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"VO",     retry:"Manual trigger. Reminder after 5 days if no response.",         vars:["{{InstitutionName}}","{{PortalURL}}","{{CandidateName}}","{{ReferenceNumber}}","{{VOName}}"],                                      modified:"—",            subject:"Verification Request via Portal — {{CandidateName}}" },
  { ref:"I-06", name:"Letter Generated",           cat:"VA/Institutional",channel:"In-App",  pri:"Low",      status:"Required", owner:"System", retry:"Single in-app. No retry.",                                      vars:["{{VOName}}","{{LetterReference}}","{{CandidateName}}","{{Institution}}","{{GeneratedDate}}"],                                       modified:"—",            subject:"Letter Ready for Dispatch" },
  { ref:"I-07", name:"Letter Dispatch Notice",     cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"System", retry:"Single email on dispatch. Reminder if no reply after 7 days.",  vars:["{{InstitutionName}}","{{LetterReference}}","{{CandidateName}}","{{DispatchDate}}","{{ExpectedReply}}"],                           modified:"—",            subject:"Official Verification Letter Sent — {{CandidateName}}" },
  { ref:"I-08", name:"Acknowledgement Reminder",   cat:"VA/Institutional",channel:"Email",   pri:"Medium",   status:"Required", owner:"System", retry:"Day 7 after dispatch. Day 14 if still no reply.",               vars:["{{InstitutionName}}","{{LetterReference}}","{{OriginalDispatchDate}}","{{DueDate}}"],                                             modified:"—",            subject:"Reminder: Acknowledgement Required for Verification Letter" },
  // Internal Ops
  { ref:"OP-01",name:"Task Assigned (VO)",         cat:"Internal Ops",   channel:"In-App",   pri:"High",     status:"Required", owner:"System", retry:"Email if unacknowledged after 2 hrs.",                          vars:["{{VOName}}","{{TaskID}}","{{CandidateName}}","{{ServiceName}}","{{SLADueDate}}","{{BatchName}}"],                                    modified:"—",            subject:"New Task Assigned — {{ServiceName}} / {{CandidateName}}" },
  { ref:"OP-02",name:"Field Task Assigned",        cat:"Field Ops",      channel:"SMS",      pri:"High",     status:"Required", owner:"System", retry:"Resend SMS if unacknowledged after 1 hr.",                      vars:["{{AgentName}}","{{TaskID}}","{{CandidateName}}","{{Location}}","{{AppointmentDate}}","{{Instructions}}"],                         modified:"—",            subject:"Field Assignment: {{CandidateName}} — {{Location}}" },
  { ref:"OP-03",name:"Task Return to CE",          cat:"Internal Ops",   channel:"In-App",   pri:"High",     status:"Existing", owner:"System", retry:"Single in-app on return. No retry.",                            vars:["{{CEName}}","{{TaskID}}","{{CandidateName}}","{{ReturnReason}}","{{VOName}}","{{SLARemaining}}"],                                    modified:"Jan 08, 2026", subject:"Task Returned: {{CandidateName}} — Action Required" },
  { ref:"OP-04",name:"Escalation Alert",           cat:"Internal Ops",   channel:"In-App",   pri:"Critical", status:"Required", owner:"VM",     retry:"Immediate on SLA breach. Resend every 4 hrs until resolved.",   vars:["{{TaskID}}","{{SLAHours}}","{{AssignedOfficer}}","{{EscalationLevel}}","{{BatchName}}"],                                          modified:"—",            subject:"ESCALATION: SLA Breached — {{BatchName}}" },
  { ref:"OP-05",name:"Evidence Approved",          cat:"Internal Ops",   channel:"In-App",   pri:"Low",      status:"Required", owner:"System", retry:"Single in-app. No retry.",                                      vars:["{{VOName}}","{{CandidateName}}","{{EvidenceType}}","{{ApprovedBy}}","{{TaskID}}"],                                                  modified:"—",            subject:"Evidence Approved — {{CandidateName}}" },
  { ref:"OP-06",name:"Evidence Rejected",          cat:"Internal Ops",   channel:"In-App",   pri:"Medium",   status:"Required", owner:"System", retry:"Follow-up after 24 hrs if not resubmitted.",                    vars:["{{RecipientName}}","{{CandidateName}}","{{RejectionReason}}","{{RedoDeadline}}","{{TaskID}}"],                                     modified:"—",            subject:"Evidence Rejected — Redo Required" },
  { ref:"OP-07",name:"Reply Received Notice",      cat:"Internal Ops",   channel:"In-App",   pri:"Medium",   status:"Required", owner:"System", retry:"Single in-app on receipt. No retry.",                           vars:["{{VOName}}","{{InstitutionName}}","{{CandidateName}}","{{ReplyDate}}","{{TaskID}}"],                                               modified:"—",            subject:"Reply Received from {{InstitutionName}}" },
  { ref:"OP-08",name:"Batch Returned",             cat:"Internal Ops",   channel:"In-App",   pri:"High",     status:"Existing", owner:"System", retry:"Email if unacknowledged after 2 hrs.",                          vars:["{{CEName}}","{{BatchName}}","{{ReturnReason}}","{{ReturnedBy}}","{{SLAImpact}}"],                                                  modified:"—",            subject:"Batch Returned — {{BatchName}}" },
  // Client
  { ref:"CL-01",name:"Batch Created",             cat:"Client",         channel:"Email",     pri:"Low",      status:"Required", owner:"CE",     retry:"Single email. No retry.",                                       vars:["{{ClientName}}","{{BatchName}}","{{CandidateCount}}","{{Services}}","{{ExpectedTAT}}"],                                          modified:"—",            subject:"Batch Created: {{BatchName}} — Verification Underway" },
  { ref:"CL-02",name:"Report Ready",              cat:"Client",         channel:"Email",     pri:"Medium",   status:"Existing", owner:"CE",     retry:"Single notification. No retry.",                                vars:["{{ClientName}}","{{BatchID}}","{{ReportLink}}","{{CandidateCount}}","{{ReleasedBy}}"],                                           modified:"Jan 15, 2026", subject:"Verification Report Ready — {{BatchID}}" },
  { ref:"CL-03",name:"Batch Completion Notice",   cat:"Client",         channel:"Email",     pri:"Medium",   status:"Required", owner:"CE",     retry:"Single email. No retry.",                                       vars:["{{ClientName}}","{{BatchName}}","{{CompletionDate}}","{{TotalCandidates}}","{{SummaryLink}}"],                                    modified:"—",            subject:"Batch Complete: {{BatchName}} — All Reports Available" },
  // System & Security
  { ref:"SY-01",name:"Client Credentials",        cat:"System & Security",channel:"Email",   pri:"Critical", status:"Existing", owner:"Admin",  retry:"Admin can resend manually. No auto-retry.",                     vars:["{{ClientName}}","{{Username}}","{{TemporaryPassword}}","{{PortalURL}}","{{ExpiryDate}}"],                                          modified:"—",            subject:"Your VeriPort Portal Access Credentials" },
  { ref:"SY-02",name:"Internal User Invite",      cat:"System & Security",channel:"Email",   pri:"High",     status:"Required", owner:"Admin",  retry:"Admin can resend manually. No auto-retry.",                     vars:["{{UserName}}","{{Role}}","{{Username}}","{{TemporaryPassword}}","{{PortalURL}}","{{AdminName}}"],                                  modified:"—",            subject:"Welcome to VeriPort — Your Account Is Ready" },
  { ref:"SY-03",name:"Password Reset",            cat:"System & Security",channel:"Email",   pri:"Critical", status:"Required", owner:"System", retry:"User can request again. Link expires in 30 mins.",              vars:["{{UserName}}","{{ResetLink}}","{{ExpiryTime}}","{{SupportEmail}}"],                                                             modified:"—",            subject:"VeriPort Password Reset Request" },
  { ref:"SY-04",name:"MFA Verification",          cat:"System & Security",channel:"SMS",     pri:"Critical", status:"Existing", owner:"System", retry:"Retry once after failed delivery. Code expires in 5 mins.",    vars:["{{UserName}}","{{OTPCode}}","{{ExpiryTime}}","{{IPAddress}}"],                                                                 modified:"—",            subject:"Your VeriPort Verification Code" },
];



function TemplateDetail({ template, onBack }) {
  const priColor = p => p==="Critical"?"#b91c1c":p==="High"?"#d97706":p==="Medium"?"#3b82f6":"#6b7280";
  const priBg    = p => p==="Critical"?"#fee2e2":p==="High"?"#fef3c7":p==="Medium"?"#eff6ff":"#f3f4f6";
  const stColor  = s => s==="Existing"?"#16a34a":"#d97706";
  const stBg     = s => s==="Existing"?"#dcfce7":"#fef3c7";
  const [bodyText, setBodyText] = useState("Dear {{CandidateName}},\n\nThis is the template for the " + template.name + " communication.\n\nPlease update the body content as required.\n\nRegards,\nDragnet Solutions");
  const [subject,  setSubject]  = useState(template.subject);
  const [saved,    setSaved]    = useState(false);
  const [preview,  setPreview]  = useState(false);

  const previewBody = bodyText
    .replace(/\{\{CandidateName\}\}/g,"Amaka Okonkwo")
    .replace(/\{\{Institution\}\}/g,"UNILAG")
    .replace(/\{\{Department\}\}/g,"Computer Science")
    .replace(/\{\{CollectionLink\}\}/g,"https://veriport.dragnet.ng/collect/abc123")
    .replace(/\{\{ExpiryDate\}\}/g,"May 30, 2026")
    .replace(/\{\{DaysRemaining\}\}/g,"5")
    .replace(/\{\{BatchName\}\}/g,"May Graduate Intake")
    .replace(/\{\{ClientName\}\}/g,"Shell Nigeria Ltd")
    .replace(/\{\{VOName\}\}/g,"Damilola Adeyemi")
    .replace(/\{\{DueDate\}\}/g,"May 25, 2026")
    .replace(/\{\{Username\}\}/g,"shell.nigeria@veriport")
    .replace(/\{\{TemporaryPassword\}\}/g,"VP-2026-SH42")
    .replace(/\{\{PortalURL\}\}/g,"https://portal.veriport.ng");

  if (preview) return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <button onClick={()=>setPreview(false)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Edit
      </button>
      <h1 style={{margin:"0 0 24px",fontSize:22,fontWeight:700,color:"#111827"}}>TEMPLATE PREVIEW — {template.ref}</h1>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",maxWidth:680}}>
        <div style={{background:"#b91c1c",padding:"16px 24px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,background:"white",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="16" height="16"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
          </div>
          <span style={{color:"white",fontWeight:700,fontSize:15}}>VERIPORT</span>
        </div>
        <div style={{padding:"28px 36px"}}>
          <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500}}>FROM: noreply@dragnet.ng</p>
          <p style={{margin:"0 0 20px",fontSize:13,fontWeight:600,color:"#374151"}}>SUBJECT: {subject}</p>
          <div style={{borderTop:"1px solid #e5e7eb",paddingTop:20}}>
            <p style={{margin:0,fontSize:14,color:"#374151",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{previewBody}</p>
          </div>
          <div style={{borderTop:"1px solid #e5e7eb",marginTop:24,paddingTop:16,fontSize:12,color:"#9ca3af"}}>Dragnet Solutions Limited · noreply@dragnet.ng · This is an automated message.</div>
        </div>
      </div>
      <div style={{display:"flex",gap:12,justifyContent:"flex-end",marginTop:20}}>
        <button onClick={()=>setPreview(false)} style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>← Edit</button>
        <button onClick={()=>{setSaved(true);setPreview(false);setTimeout(()=>setSaved(false),2000);}} style={{padding:"9px 24px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Save Template</button>
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Communication Templates
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <span style={{fontSize:13,fontWeight:700,color:"#9ca3af"}}>{template.ref}</span>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:priBg(template.pri),color:priColor(template.pri)}}>{template.pri}</span>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:stBg(template.status),color:stColor(template.status)}}>{template.status}</span>
          </div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{template.name}</h1>
          <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{template.cat} · {template.channel} · Owner: {template.owner}</p>
        </div>
        <button onClick={()=>setPreview(true)} style={{padding:"9px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Preview</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>SUBJECT LINE</p>
            <input value={subject} onChange={e=>setSubject(e.target.value)}
              style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#111827"}}/>
          </div>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>BODY</p>
            <textarea id={"tmpl-"+template.ref} value={bodyText} onChange={e=>setBodyText(e.target.value)} rows={12}
              style={{width:"100%",padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:13,outline:"none",boxSizing:"border-box",color:"#374151",resize:"vertical",lineHeight:1.7}}/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>TEMPLATE VARIABLES</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:"#9ca3af"}}>Click to insert at cursor position</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {template.vars.map((v,i)=>(
                <button key={i} onClick={()=>{
                  const ta=document.getElementById("tmpl-"+template.ref);
                  if(ta){const s=ta.selectionStart,e=ta.selectionEnd,n=bodyText.slice(0,s)+v+bodyText.slice(e);setBodyText(n);setTimeout(()=>{ta.selectionStart=ta.selectionEnd=s+v.length;ta.focus();},0);}
                  else setBodyText(b=>b+v);
                }} style={{padding:"4px 10px",border:"1.5px solid #dbeafe",borderRadius:6,background:"#eff6ff",fontSize:12,color:"#3b82f6",cursor:"pointer",fontFamily:"monospace",fontWeight:500}}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
            <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>RETRY / REMINDER LOGIC</p>
            <p style={{margin:0,fontSize:13,color:"#374151",lineHeight:1.7}}>{template.retry}</p>
          </div>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
            <p style={{margin:"0 0 14px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>DELIVERY INFO</p>
            {[["Channel",template.channel],["Owner",template.owner],["Category",template.cat],["Last Modified",template.modified]].map(([l,v])=>(
              <div key={l} style={{display:"flex",marginBottom:10}}>
                <span style={{width:140,fontSize:12,color:"#9ca3af",fontWeight:500,flexShrink:0}}>{l}</span>
                <span style={{fontSize:13,color:"#111827",fontWeight:500}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"flex-end"}}>
        {saved && <span style={{fontSize:14,color:"#16a34a",fontWeight:500}}>✓ Template saved</span>}
        <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}}
          style={{padding:"10px 28px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Save Template</button>
      </div>
    </div>
  );
}

function CommunicationTemplates({ onNewTemplate }) {
  const [activeCat,    setActiveCat]    = useState("All");
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected,     setSelected]     = useState(null);

  const CATS = ["All","Candidate","VA/Institutional","Internal Ops","Field Ops","Client","System & Security"];
  const priColor = p => p==="Critical"?"#b91c1c":p==="High"?"#d97706":p==="Medium"?"#3b82f6":"#6b7280";
  const priBg    = p => p==="Critical"?"#fee2e2":p==="High"?"#fef3c7":p==="Medium"?"#eff6ff":"#f3f4f6";
  const stColor  = s => s==="Existing"?"#16a34a":"#d97706";
  const stBg     = s => s==="Existing"?"#dcfce7":"#fef3c7";

  const filtered = TEMPLATES.filter(t => {
    const matchCat    = activeCat==="All" || t.cat===activeCat;
    const matchStatus = statusFilter==="All" || t.status===statusFilter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.ref.toLowerCase().includes(search.toLowerCase()) ||
                        t.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  if (selected) return <TemplateDetail template={selected} onBack={()=>setSelected(null)}/>;

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Communication Templates"]}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>COMMUNICATION TEMPLATES</h1>
        <button onClick={onNewTemplate} style={{padding:"10px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>+ New Template</button>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {[
          {label:"TOTAL TEMPLATES",   value:TEMPLATES.length,                                   color:"#111827"},
          {label:"EXISTING",          value:TEMPLATES.filter(t=>t.status==="Existing").length,   color:"#16a34a"},
          {label:"REQUIRED",          value:TEMPLATES.filter(t=>t.status==="Required").length,   color:"#d97706"},
          {label:"CRITICAL PRIORITY", value:TEMPLATES.filter(t=>t.pri==="Critical").length,      color:"#b91c1c"},
        ].map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Category tabs */}
      <div style={{display:"flex",borderBottom:"1px solid #e5e7eb",marginBottom:16,overflowX:"auto"}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)}
            style={{padding:"10px 14px",border:"none",background:"none",cursor:"pointer",fontSize:13,fontWeight:activeCat===c?600:400,color:activeCat===c?"#b91c1c":"#6b7280",borderBottom:activeCat===c?"2px solid #b91c1c":"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap"}}>
            {c} <span style={{fontSize:11,color:activeCat===c?"#b91c1c":"#9ca3af"}}>({TEMPLATES.filter(t=>c==="All"||t.cat===c).length})</span>
          </button>
        ))}
      </div>

      {/* Search + Status filter */}
      <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"center"}}>
        <div style={{position:"relative",maxWidth:360,flex:1}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search templates..."
            style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
        </div>
        <div style={{position:"relative"}}>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
            style={{padding:"9px 32px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",appearance:"none",outline:"none",cursor:"pointer"}}>
            {["All","Existing","Required"].map(s=><option key={s}>{s}</option>)}
          </select>
          <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
        </div>
      </div>

      {/* Table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["REF","TEMPLATE NAME","CATEGORY","CHANNEL","PRIORITY","STATUS","LAST MODIFIED",""].map((h,i)=>(
              <th key={i} style={{padding:"12px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((t,i)=>(
              <tr key={i} onClick={()=>setSelected(t)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 16px",fontSize:12,fontWeight:700,color:"#9ca3af"}}>{t.ref}</td>
                <td style={{padding:"14px 16px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.name}</td>
                <td style={{padding:"14px 16px",fontSize:13,color:"#374151"}}>{t.cat}</td>
                <td style={{padding:"14px 16px",fontSize:13,color:"#374151"}}>{t.channel}</td>
                <td style={{padding:"14px 16px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:priBg(t.pri),color:priColor(t.pri)}}>{t.pri}</span>
                </td>
                <td style={{padding:"14px 16px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:stBg(t.status),color:stColor(t.status)}}>{t.status}</span>
                </td>
                <td style={{padding:"14px 16px",fontSize:13,color:"#9ca3af"}}>{t.modified}</td>
                <td style={{padding:"14px 16px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
            {filtered.length===0 && (
              <tr><td colSpan={8} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No templates found.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{padding:"12px 16px",borderTop:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {filtered.length} of {TEMPLATES.length} templates</p>
        </div>
      </div>
    </div>
  );
}

// ─── Admin: New Template Form ─────────────────────────────────────────────────
function NewTemplateForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ name:"", category:"", channel:"" });
  const [bodyText, setBodyText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useState(null);

  const CATEGORIES = ["Collection","Gate","Release","VA","Ops"];
  const CHANNELS = ["Email","SMS","Email/SMS","In-App"];
  const VARIABLES = ["{candidate_name}","{hr_contact_name}","{employer_name}","{start_date}","{end_date}","{job_title}","{response_link}","{deadline_date}","{days_remaining}"];

  const insertVariable = (v) => {
    const ta = document.getElementById("template-body");
    if (!ta) { setBodyText(b => b + v); return; }
    const start = ta.selectionStart; const end = ta.selectionEnd;
    const newText = bodyText.slice(0,start) + v + bodyText.slice(end);
    setBodyText(newText);
    setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + v.length; ta.focus(); }, 0);
  };

  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const inp = {width:"100%",padding:"10px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",boxSizing:"border-box",background:"white"};
  const sel = {...inp,appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",paddingRight:36};

  if (showPreview) {
    const previewBody = bodyText
      .replace("{candidate_name}","John Okafor")
      .replace("{hr_contact_name}","Mary Adeyemi")
      .replace("{employer_name}","Acme Corporation")
      .replace("{start_date}","Jan 20, 2026")
      .replace("{end_date}","Jan 30, 2026")
      .replace("{job_title}","Software Engineer")
      .replace("{response_link}","https://veriport.dragnet.ng/verify/abc123")
      .replace("{deadline_date}","Feb 05, 2026")
      .replace("{days_remaining}","10");
    return (
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        <Breadcrumb items={["Admin","Templates","New","Preview"]}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>TEMPLATE PREVIEW</h1>
          <button onClick={()=>setShowPreview(false)} style={{padding:"10px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>← Back to Edit</button>
        </div>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",maxWidth:680}}>
          <div style={{background:"#b91c1c",padding:"16px 24px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:28,height:28,background:"white",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="16" height="16"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg></div>
            <span style={{color:"white",fontWeight:700,fontSize:15}}>VERIPORT</span>
          </div>
          <div style={{padding:"32px 40px"}}>
            <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500}}>FROM: noreply@dragnet.ng</p>
            <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af",fontWeight:500}}>SUBJECT: {form.name || "Template Subject"}</p>
            <p style={{margin:"0 0 24px",fontSize:12,color:"#9ca3af",fontWeight:500}}>CHANNEL: {form.channel || "—"}</p>
            <div style={{borderTop:"1px solid #e5e7eb",paddingTop:24}}>
              <p style={{margin:0,fontSize:14,color:"#374151",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{previewBody || <span style={{color:"#9ca3af",fontStyle:"italic"}}>No body content yet.</span>}</p>
            </div>
            <div style={{borderTop:"1px solid #e5e7eb",marginTop:32,paddingTop:16,display:"flex",gap:12,flexWrap:"wrap"}}>
              {Object.entries({Category:form.category||"—",Channel:form.channel||"—"}).map(([k,v])=>(
                <div key={k} style={{background:"#f9fafb",borderRadius:8,padding:"8px 14px"}}>
                  <p style={{margin:0,fontSize:11,fontWeight:600,color:"#9ca3af",letterSpacing:.4}}>{k.toUpperCase()}</p>
                  <p style={{margin:"2px 0 0",fontSize:13,fontWeight:500,color:"#374151"}}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:12,justifyContent:"flex-end",marginTop:24}}>
          <button onClick={onCancel} style={{padding:"10px 24px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>setShowPreview(false)} style={{padding:"10px 24px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Edit</button>
          <button onClick={onSave} style={{padding:"10px 24px",border:"none",borderRadius:8,background:"#111827",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Admin","Templates","New"]}/>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>NEW TEMPLATE</h1>

      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:24}}>
        <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>BASIC INFORMATION</p>

        {/* Template Name */}
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6}}>Template Name</label>
          <input value={form.name} onChange={e=>set("name",e.target.value)} style={inp} placeholder="e.g. Candidate Invitation Email"/>
        </div>

        {/* Category + Channel side by side */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
          <div>
            <label style={{display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6}}>Category</label>
            <div style={{position:"relative"}}>
              <select value={form.category} onChange={e=>set("category",e.target.value)} style={sel}>
                <option value="">Select category</option>
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6}}>Channel</label>
            <div style={{position:"relative"}}>
              <select value={form.channel} onChange={e=>set("channel",e.target.value)} style={sel}>
                <option value="">Select channel</option>
                {CHANNELS.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Available Variables */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>AVAILABLE VARIABLES</p>
            <span style={{fontSize:12,color:"#9ca3af"}}>Click to insert at cursor</span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {VARIABLES.map(v=>(
              <button key={v} onClick={()=>insertVariable(v)}
                style={{padding:"6px 12px",border:"1.5px solid #d1d5db",borderRadius:6,background:"#f9fafb",color:"#374151",fontSize:13,fontFamily:"monospace",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#fef2f2";e.currentTarget.style.borderColor="#b91c1c";e.currentTarget.style.color="#b91c1c";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#f9fafb";e.currentTarget.style.borderColor="#d1d5db";e.currentTarget.style.color="#374151";}}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Body */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:24}}>
        <p style={{margin:"0 0 12px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>TEMPLATE BODY</p>
        <textarea
          id="template-body"
          value={bodyText}
          onChange={e=>setBodyText(e.target.value)}
          placeholder="Write your template content here. Click variable chips above to insert them at the cursor position."
          style={{...inp,minHeight:200,resize:"vertical",lineHeight:1.6,fontFamily:"system-ui,sans-serif"}}
        />
      </div>

      {/* Footer actions */}
      <div style={{display:"flex",justifyContent:"flex-end",gap:12}}>
        <button onClick={onCancel} style={{padding:"10px 24px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={()=>setShowPreview(true)} style={{padding:"10px 24px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Preview</button>
        <button onClick={onSave} style={{padding:"10px 24px",border:"none",borderRadius:8,background:"#111827",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save</button>
      </div>
    </div>
  );
}

// ─── Admin: VA Registry (ADM-VA-01, 02, 03) ──────────────────────────────────

const VA_BATCHES = [
  {
    id: "b1",
    batch: "Q1 2026 Scholars",
    client: "ABC Foundation",
    created: "Jan 15",
    deptsTotal: 15,
    deptsCleared: 12,
    deptsPending: 3,
    progress: 80,
    departments: [
      // Pending
      { id:"d1", institution:"UNILAG", dept:"Computer Science", issue:"Contact changed",   issueType:"changed",   students:15, status:"pending",
        validatedContact:{ name:"Dr. John Okafor",     position:"Head of Department", email:"j.okafor@unilag.edu.ng",  phone:"+234-802-111-2222", lastUsed:"March 2025",   history:"Verified 8 students (June 2025), 100% response rate" },
        crowdsourced:[
          { name:"Dr. Emeka Nwosu",        position:"Head of Department", email:"e.nwosu@unilag.edu.ng",   phone:"+234-803-333-4444", votes:12, total:15, pct:80, submittedBy:"Blessing Okoro, Chidi Nnamdi, Grace Adebayo, +9 more", warning:null, recommended:true },
          { name:"Dr. John Okafor",        position:"Head of Department", email:"j.okafor@gmail.com",      phone:"+234-802-111-2222", votes:3,  total:15, pct:20, submittedBy:null, warning:"Personal email", recommended:false },
        ]
      },
      { id:"d2", institution:"OAU",    dept:"Medicine",         issue:"Conflict (2 opts)", issueType:"conflict",  students:12, status:"pending",
        validatedContact:{ name:"Prof. Adebayo Williams", position:"Head of Department", email:"a.williams@oau.edu.ng",   phone:"+234-805-555-6666", lastUsed:"August 2025",  history:null },
        crowdsourced:[
          { name:"Prof. Adebayo Williams", position:"Head of Department", email:"a.williams@yahoo.com",    phone:"+234-805-555-6666", votes:5,  total:12, pct:42, submittedBy:null, warning:"⚠ Personal email", recommended:false },
          { name:"Dr. Funke Adeola",       position:"Course Adviser",     email:"f.adeola@oau.edu.ng",     phone:"+234-806-777-8888", votes:4,  total:12, pct:33, submittedBy:null, warning:null, recommended:false },
          { name:"Mrs. Janet Obi",         position:"Secretary",          email:"j.obi@oau.edu.ng",        phone:"+234-807-999-0000", votes:3,  total:12, pct:25, submittedBy:null, warning:null, recommended:false },
        ],
        recommendation:"Keep validated contact (HOD with official email)"
      },
      { id:"d3", institution:"UI",     dept:"Law",              issue:"New department",    issueType:"new",       students:8,  status:"pending",
        validatedContact:null,
        crowdsourced:[
          { name:"Dr. Chukwuma Eze",       position:"Head of Department", email:"c.eze@ui.edu.ng",         phone:"+234-808-111-2222", votes:7,  total:8,  pct:88, submittedBy:null, warning:"✓ Official domain", recommended:true },
          { name:"Prof. Bola Akande",      position:"Dean",               email:"b.akande@ui.edu.ng",      phone:"+234-809-333-4444", votes:1,  total:8,  pct:12, submittedBy:null, warning:null, recommended:false },
        ]
      },
      // Validated
      { id:"d4",  institution:"UNILAG", dept:"Medicine",          issue:null, issueType:null, students:10, status:"validated", vaContact:"Dr. Ade Bello",       how:"Auto" },
      { id:"d5",  institution:"UNILAG", dept:"Engineering",       issue:null, issueType:null, students:18, status:"validated", vaContact:"Prof. Chidi Eze",     how:"Auto" },
      { id:"d6",  institution:"ABU",    dept:"Economics",         issue:null, issueType:null, students:14, status:"validated", vaContact:"Dr. Musa Ibrahim",    how:"Auto" },
      { id:"d7",  institution:"UI",     dept:"Political Science", issue:null, issueType:null, students:11, status:"validated", vaContact:"Prof. Ngozi Eze",     how:"Auto" },
      { id:"d8",  institution:"LASU",   dept:"Accounting",        issue:null, issueType:null, students:9,  status:"validated", vaContact:"Dr. Tunde Bakare",    how:"Manual" },
      { id:"d9",  institution:"OAU",    dept:"Chemistry",         issue:null, issueType:null, students:13, status:"validated", vaContact:"Dr. Segun Adewale",   how:"Auto" },
      { id:"d10", institution:"UNIBEN", dept:"Pharmacy",          issue:null, issueType:null, students:7,  status:"validated", vaContact:"Prof. Emeka Okafor",  how:"Auto" },
      { id:"d11", institution:"ABU",    dept:"Mathematics",       issue:null, issueType:null, students:16, status:"validated", vaContact:"Dr. Halima Suleiman", how:"Auto" },
      { id:"d12", institution:"UNILAG", dept:"Physics",           issue:null, issueType:null, students:12, status:"validated", vaContact:"Prof. Ada Okonkwo",   how:"Auto" },
      { id:"d13", institution:"UI",     dept:"English",           issue:null, issueType:null, students:8,  status:"validated", vaContact:"Dr. Bisi Afolabi",    how:"Auto" },
      { id:"d14", institution:"LASU",   dept:"History",           issue:null, issueType:null, students:6,  status:"validated", vaContact:"Prof. Kunle Bello",   how:"Auto" },
      { id:"d15", institution:"UNIBEN", dept:"Architecture",      issue:null, issueType:null, students:14, status:"validated", vaContact:"Dr. Chike Nweze",     how:"Manual" },
    ]
  },
  {
    id: "b2",
    batch: "Jan Intake Cohort",
    client: "XYZ Trust",
    created: "Jan 18",
    deptsTotal: 22,
    deptsCleared: 20,
    deptsPending: 2,
    progress: 91,
    departments: [
      { id:"e1", institution:"UNILAG", dept:"Biochemistry",   issue:"Contact changed", issueType:"changed", students:9, status:"pending",
        validatedContact:{ name:"Dr. Chidi Obi", position:"Head of Department", email:"c.obi@unilag.edu.ng", phone:"+234-801-222-3333", lastUsed:"Oct 2025", history:"Verified 5 students, 100% response" },
        crowdsourced:[
          { name:"Dr. Amara Osei", position:"Head of Department", email:"a.osei@unilag.edu.ng", phone:"+234-802-444-5555", votes:8, total:9, pct:89, submittedBy:null, warning:null, recommended:true },
          { name:"Dr. Chidi Obi",  position:"Head of Department", email:"c.obi@gmail.com",      phone:"+234-801-222-3333", votes:1, total:9, pct:11, submittedBy:null, warning:"Personal email", recommended:false },
        ]
      },
      { id:"e2", institution:"ABU",    dept:"Statistics",     issue:"New department",  issueType:"new",     students:6, status:"pending",
        validatedContact:null,
        crowdsourced:[
          { name:"Prof. Yusuf Musa", position:"Head of Department", email:"y.musa@abu.edu.ng", phone:"+234-803-666-7777", votes:6, total:6, pct:100, submittedBy:null, warning:"✓ Official domain", recommended:true },
        ]
      },
    ]
  },
  {
    id: "b3",
    batch: "Special Grant Program",
    client: "DEF Fund",
    created: "Jan 20",
    deptsTotal: 8,
    deptsCleared: 5,
    deptsPending: 3,
    progress: 63,
    departments: [
      { id:"f1", institution:"LASU",   dept:"Sociology",      issue:"Missing contact", issueType:"missing", students:4, status:"pending",
        validatedContact:null,
        crowdsourced:[]
      },
      { id:"f2", institution:"UNIBEN", dept:"Fine Arts",      issue:"Conflict (3 opts)",issueType:"conflict",students:7, status:"pending",
        validatedContact:{ name:"Dr. Ngozi Okeke", position:"Head of Department", email:"n.okeke@uniben.edu.ng", phone:"+234-804-888-9999", lastUsed:"Jul 2025", history:null },
        crowdsourced:[
          { name:"Dr. Ngozi Okeke",   position:"Head of Department", email:"n.okeke@uniben.edu.ng", phone:"+234-804-888-9999", votes:3, total:7, pct:43, submittedBy:null, warning:null, recommended:false },
          { name:"Prof. Eze Nwosu",   position:"Associate Dean",     email:"e.nwosu@uniben.edu.ng", phone:"+234-805-000-1111", votes:2, total:7, pct:29, submittedBy:null, warning:null, recommended:false },
          { name:"Mrs. Ada Okafor",   position:"Secretary",          email:"a.okafor@gmail.com",    phone:"+234-806-222-3333", votes:2, total:7, pct:29, submittedBy:null, warning:"Personal email", recommended:false },
        ],
        recommendation:"Keep validated contact (only HOD with official university email)"
      },
      { id:"f3", institution:"OAU",    dept:"Theatre Arts",   issue:"Contact changed", issueType:"changed", students:5, status:"pending",
        validatedContact:{ name:"Prof. Sola Ogundimu", position:"Head of Department", email:"s.ogundimu@oau.edu.ng", phone:"+234-807-444-5555", lastUsed:"May 2025", history:"Verified 3 students, 100% response" },
        crowdsourced:[
          { name:"Dr. Kemi Adeyemi",    position:"Head of Department", email:"k.adeyemi@oau.edu.ng", phone:"+234-808-666-7777", votes:4, total:5, pct:80, submittedBy:null, warning:null, recommended:true },
          { name:"Prof. Sola Ogundimu", position:"Head of Department", email:"s.ogundimu@gmail.com", phone:"+234-807-444-5555", votes:1, total:5, pct:20, submittedBy:null, warning:"Personal email", recommended:false },
        ]
      },
    ]
  },
];

const LOCAL_INSTITUTION_REGISTRY = [
  { institution:"UNILAG", registrarEmail:"registrar@unilag.edu.ng", examsRecordsEmail:"records@unilag.edu.ng", paymentRequired:"No", source:"Merged VA / validated" },
  { institution:"OAU", registrarEmail:"registrar@oauife.edu.ng", examsRecordsEmail:"exams@oauife.edu.ng", paymentRequired:"Yes", source:"Candidate-crowdsourced pending confirmation" },
  { institution:"UI", registrarEmail:"registrar@ui.edu.ng", examsRecordsEmail:"records@ui.edu.ng", paymentRequired:"No", source:"Merged VA / validated" },
];

const FOREIGN_INSTITUTION_REGISTRY = [
  { institution:"University of Ghana", portalName:"UG Student Portal", institutionEmail:"academic@ug.edu.gh", mode:"Portal + email" },
  { institution:"University of Nairobi", portalName:"UoN Student Management", institutionEmail:"registrar-academic@uonbi.ac.ke", mode:"Email" },
  { institution:"University of Pretoria", portalName:"UP Student Centre", institutionEmail:"records@up.ac.za", mode:"Portal" },
];

// ADM-VA-03: Department Resolution
function VADeptResolution({ dept, batchName, onBack, onValidate }) {
  const [selected, setSelected] = useState(dept.issueType === "new" || dept.issueType === "missing" ? "crowdsourced_0" : (dept.recommended_index || "crowdsourced_0"));
  const [manualName, setManualName]   = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showManual, setShowManual]   = useState(false);

  const inp = {width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:7,fontSize:13,outline:"none",color:"#111827",boxSizing:"border-box"};
  const Radio = ({id,checked,onChange}) => (
    <div onClick={onChange} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
      {checked && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
    </div>
  );

  const issueLabel = {changed:"Contact changed",conflict:"Conflict — no clear majority",new:"New department — no validated record",missing:"Missing contact — no contact provided"}[dept.issueType]||dept.issue;

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Batch VA Status
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>RESOLVE VA CONTACT</h1>
        <span style={{fontSize:13,color:"#6b7280",fontWeight:500}}>{dept.institution} › {dept.dept}</span>
      </div>
      <div style={{display:"flex",gap:16,marginBottom:24,alignItems:"center"}}>
        <span style={{padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,
          background:dept.issueType==="conflict"?"#fef3c7":dept.issueType==="new"?"#eff6ff":dept.issueType==="missing"?"#f3f4f6":"#fef2f2",
          color:dept.issueType==="conflict"?"#d97706":dept.issueType==="new"?"#3b82f6":dept.issueType==="missing"?"#6b7280":"#b91c1c"}}>
          {dept.issue}
        </span>
        <span style={{fontSize:13,color:"#6b7280"}}>{dept.students} students waiting</span>
      </div>

      {/* Validated Contact */}
      {dept.validatedContact ? (
        <div style={{marginBottom:16}}>
          <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>VALIDATED CONTACT <span style={{color:"#9ca3af",fontWeight:400}}>Last used: {dept.validatedContact.lastUsed}</span></p>
          <div style={{background:"white",border:`2px solid ${selected==="validated"?"#b91c1c":"#e5e7eb"}`,borderRadius:12,padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
              <Radio id="validated" checked={selected==="validated"} onChange={()=>setSelected("validated")}/>
              <div style={{flex:1}}>
                <p style={{margin:"0 0 2px",fontSize:13,fontWeight:600,color:"#b91c1c"}}>Keep this contact</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 24px",marginTop:10}}>
                  {[["Name",dept.validatedContact.name],["Position",dept.validatedContact.position],["Email",dept.validatedContact.email],["Phone",dept.validatedContact.phone]].map(([k,v])=>(
                    <div key={k}><span style={{fontSize:12,color:"#9ca3af",fontWeight:500}}>{k}: </span><span style={{fontSize:13,color:"#111827"}}>{v}</span></div>
                  ))}
                </div>
                {dept.validatedContact.history && <p style={{margin:"10px 0 0",fontSize:12,color:"#6b7280",background:"#f9fafb",borderRadius:6,padding:"6px 10px"}}>{dept.validatedContact.history}</p>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{marginBottom:16,background:"#f9fafb",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 18px"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>No validated record — first time verifying students from {dept.institution} › {dept.dept}.</p>
        </div>
      )}

      {/* Crowdsourced contacts */}
      {dept.crowdsourced.length > 0 && (
        <div style={{marginBottom:16}}>
          <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>
            CROWDSOURCED THIS BATCH ({dept.students} candidates){dept.issueType==="conflict"?" — NO CLEAR MAJORITY":""}
          </p>
          {dept.recommendation && (
            <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:10,display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:16}}>⚠</span>
              <span style={{fontSize:13,color:"#92400e"}}>Recommendation: {dept.recommendation}</span>
            </div>
          )}
          {dept.crowdsourced.map((c,i)=>{
            const key = `crowdsourced_${i}`;
            return (
              <div key={i} style={{background:"white",border:`2px solid ${selected===key?"#b91c1c":"#e5e7eb"}`,borderRadius:12,padding:"16px 20px",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <Radio id={key} checked={selected===key} onChange={()=>setSelected(key)}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <p style={{margin:0,fontSize:13,fontWeight:600,color:c.recommended?"#059669":"#374151"}}>
                        {c.recommended ? "● Accept this contact" : "Accept this contact"}
                      </p>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        {c.recommended && <span style={{fontSize:11,background:"#dcfce7",color:"#16a34a",padding:"2px 8px",borderRadius:10,fontWeight:600}}>Recommended</span>}
                        <span style={{fontSize:13,fontWeight:700,color:"#374151"}}>{c.votes}/{c.total} <span style={{fontWeight:400,color:"#6b7280"}}>({c.pct}%)</span></span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{background:"#f3f4f6",borderRadius:4,height:6,marginBottom:10,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${c.pct}%`,background:c.recommended?"#b91c1c":"#9ca3af",borderRadius:4}}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 24px"}}>
                      {[["Name",c.name],["Position",c.position],["Email",`${c.email}${c.warning?" "+c.warning:""}`],["Phone",c.phone]].map(([k,v])=>(
                        <div key={k}><span style={{fontSize:12,color:"#9ca3af",fontWeight:500}}>{k}: </span>
                        <span style={{fontSize:13,color:k==="Email"&&c.warning?"#d97706":"#111827"}}>{v}</span></div>
                      ))}
                    </div>
                    {c.submittedBy && <p style={{margin:"8px 0 0",fontSize:12,color:"#6b7280"}}>Submitted by: {c.submittedBy}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Missing contact fallback */}
      {dept.issueType === "missing" && dept.crowdsourced.length === 0 && (
        <div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:10,padding:"14px 18px",marginBottom:16}}>
          <p style={{margin:0,fontSize:13,color:"#92400e"}}>⚠ No contact submitted by candidates. Please enter the VA contact manually below.</p>
        </div>
      )}

      {/* Manual entry */}
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,cursor:"pointer"}} onClick={()=>setShowManual(p=>!p)}>
          <Radio id="manual" checked={selected==="manual"} onChange={()=>{setSelected("manual");setShowManual(true);}}/>
          <span style={{fontSize:14,color:"#374151",fontWeight:500}}>Enter different contact manually</span>
        </div>
        {(showManual||selected==="manual") && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,background:"#f9fafb",borderRadius:10,padding:"16px",marginLeft:30}}>
            {[["Name",manualName,setManualName,"Full name"],["Email",manualEmail,setManualEmail,"email@university.edu"],["Phone",manualPhone,setManualPhone,"+234-800-000-0000"]].map(([label,val,setter,ph])=>(
              <div key={label}>
                <label style={{display:"block",fontSize:12,fontWeight:600,color:"#6b7280",marginBottom:4}}>{label.toUpperCase()}</label>
                <input value={val} onChange={e=>setter(e.target.value)} placeholder={ph} style={{...inp,fontSize:13}}/>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div style={{marginBottom:24}}>
        <label style={{display:"block",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5,marginBottom:6}}>NOTES (OPTIONAL)</label>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Add reasoning for your decision…"
          style={{...inp,width:"100%",minHeight:80,resize:"vertical",lineHeight:1.5,fontFamily:"system-ui,sans-serif"}}/>
      </div>

      {/* Actions */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={onBack} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={()=>onValidate(dept.id)} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Validate & Clear Department</button>
      </div>
    </div>
  );
}

// ADM-VA-02: Batch VA Status
function VABatchStatus({ batch, onBack, onResolve }) {
  const [activeTab, setActiveTab] = useState("pending");
  const [resolvedDepts, setResolvedDepts] = useState([]);

  const pending   = batch.departments.filter(d => d.status==="pending"   && !resolvedDepts.includes(d.id));
  const validated = batch.departments.filter(d => d.status==="validated" || resolvedDepts.includes(d.id));
  const totalValidated = validated.length;
  const totalDepts = batch.departments.length;
  const progress = Math.round((totalValidated / totalDepts) * 100);
  const studentsTotal   = batch.departments.reduce((a,d)=>a+d.students,0);
  const studentsReady   = validated.reduce((a,d)=>a+d.students,0);
  const studentsWaiting = studentsTotal - studentsReady;

  const issueColor = (type) => ({changed:"#fef2f2",conflict:"#fef3c7",new:"#eff6ff",missing:"#f3f4f6"}[type]||"#f3f4f6");
  const issueTxt   = (type) => ({changed:"#b91c1c",conflict:"#d97706",new:"#3b82f6",missing:"#6b7280"}[type]||"#374151");

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Exception Queue
      </button>

      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>BATCH VA STATUS</h1>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{batch.client}</p>
        </div>
        <div style={{textAlign:"right"}}>
          <p style={{margin:"0 0 2px",fontSize:20,fontWeight:700,color:"#111827"}}>{batch.batch}</p>
          <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Created: {batch.created}</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:14,fontWeight:500,color:"#374151"}}>Progress: {totalValidated}/{totalDepts} departments validated</span>
          <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{progress}%</span>
        </div>
        <div style={{background:"#f3f4f6",borderRadius:8,height:10,overflow:"hidden",marginBottom:10}}>
          <div style={{height:"100%",width:`${progress}%`,background:"#b91c1c",borderRadius:8,transition:"width .4s"}}/>
        </div>
        <div style={{display:"flex",gap:24,fontSize:13,color:"#6b7280"}}>
          <span><b style={{color:"#111827"}}>{studentsTotal}</b> total students</span>
          <span><b style={{color:"#16a34a"}}>{studentsReady}</b> ready</span>
          <span><b style={{color:"#d97706"}}>{studentsWaiting}</b> waiting on VA</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:"1px solid #e5e7eb"}}>
        {[["all","All",totalDepts],["validated","Validated",totalValidated],["pending","Pending",pending.length]].map(([key,label,count])=>(
          <button key={key} onClick={()=>setActiveTab(key)}
            style={{padding:"10px 20px",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:activeTab===key?600:400,
              color:activeTab===key?"#b91c1c":"#6b7280",borderBottom:activeTab===key?"2px solid #b91c1c":"2px solid transparent",marginBottom:-1}}>
            {label} ({count}){key==="pending"&&pending.length>0?" ●":""}
          </button>
        ))}
      </div>

      {/* Pending table */}
      {(activeTab==="pending"||activeTab==="all") && pending.length > 0 && (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between"}}>
            <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>PENDING REVIEW</p>
            <span style={{fontSize:13,color:"#9ca3af"}}>{pending.length} depts</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["INSTITUTION","DEPARTMENT","ISSUE","STUDENTS","ACTION"].map((h,i)=><th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {pending.map((d,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"14px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{d.institution}</td>
                  <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{d.dept}</td>
                  <td style={{padding:"14px 20px"}}>
                    <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:issueColor(d.issueType),color:issueTxt(d.issueType)}}>{d.issue}</span>
                  </td>
                  <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{d.students}</td>
                  <td style={{padding:"14px 20px"}}>
                    <button onClick={()=>onResolve(d)} style={{padding:"7px 16px",border:"1px solid #b91c1c",borderRadius:7,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>
                      Resolve →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Validated table */}
      {(activeTab==="validated"||activeTab==="all") && validated.length > 0 && (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between"}}>
            <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>VALIDATED</p>
            <span style={{fontSize:13,color:"#9ca3af"}}>{validated.length} depts</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["INSTITUTION","DEPARTMENT","VA CONTACT","STUDENTS","HOW"].map((h,i)=><th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {validated.map((d,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"14px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{d.institution}</td>
                  <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{d.dept}</td>
                  <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{d.vaContact || "—"}</td>
                  <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{d.students}</td>
                  <td style={{padding:"14px 20px"}}>
                    <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,
                      background:d.how==="Auto"?"#eff6ff":"#f0fdf4",
                      color:d.how==="Auto"?"#3b82f6":"#16a34a"}}>{d.how||"Manual"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pending.length === 0 && activeTab === "pending" && (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"48px 32px",textAlign:"center"}}>
          <p style={{margin:"0 0 4px",fontSize:15,fontWeight:500,color:"#16a34a"}}>✓ All departments resolved</p>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>All pending VA contacts have been validated for this batch.</p>
        </div>
      )}
    </div>
  );
}

// ADM-VA-01: Exception Queue (entry point)
function VARegistry() {
  const AUDIT_LOG = [
    { date:"Feb 22, 2026", actor:"Olumide Bakare (VM)", action:"Validated VA contact",   institution:"UNILAG — Computer Science", detail:"Dr. Emeka Nwosu confirmed as HOD. Contact updated.", status:"Resolved" },
    { date:"Feb 20, 2026", actor:"Olumide Bakare (VM)", action:"Resolved exception",     institution:"OAU — Medicine",           detail:"Conflict resolved. Registrar email corrected to registrar@oauife.edu.ng.", status:"Resolved" },
    { date:"Feb 18, 2026", actor:"Olumide Bakare (VM)", action:"Added foreign institution",institution:"University of Ghana",      detail:"UG Student Portal added to Foreign Institution Registry.", status:"Resolved" },
    { date:"Feb 15, 2026", actor:"Olumide Bakare (VM)", action:"Flagged exception",      institution:"UI — Law",                  detail:"Payment requirement flag pending confirmation from institution.", status:"Pending" },
    { date:"Feb 12, 2026", actor:"Olumide Bakare (VM)", action:"Validated VA contact",   institution:"UNIBEN — Economics",        detail:"Prof. Chukwuma Eze confirmed. Last validated Feb 12, 2026.", status:"Resolved" },
    { date:"Feb 10, 2026", actor:"Olumide Bakare (VM)", action:"Resolved exception",     institution:"LASU — Engineering",        detail:"New department — contact sourced from candidate crowdsource, validated.", status:"Resolved" },
    { date:"Feb 08, 2026", actor:"Olumide Bakare (VM)", action:"Updated registry",       institution:"University of Nairobi",     detail:"Email contact updated after portal verification.", status:"Resolved" },
    { date:"Feb 05, 2026", actor:"Olumide Bakare (VM)", action:"Flagged exception",      institution:"ABU — Sciences",            detail:"Missing contact — no contact provided by candidates. Escalated.", status:"Escalated" },
    { date:"Feb 03, 2026", actor:"Olumide Bakare (VM)", action:"Validated VA contact",   institution:"FUTA — Computer Engineering",detail:"Dr. Seun Adeyemi confirmed as HOD.", status:"Resolved" },
    { date:"Jan 30, 2026", actor:"Olumide Bakare (VM)", action:"Resolved exception",     institution:"UNILAG — Pharmacy",         detail:"Registrar conflict resolved. New registrar email confirmed.", status:"Resolved" },
  ];

  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const totalPages = Math.ceil(AUDIT_LOG.length / PER_PAGE);
  const pageRows = AUDIT_LOG.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const statusColor = s => s==="Resolved"?"#16a34a":s==="Pending"?"#d97706":"#b91c1c";
  const statusBg    = s => s==="Resolved"?"#dcfce7":s==="Pending"?"#fef3c7":"#fee2e2";

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["VA Registry"]}/>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>VA REGISTRY — AUDIT LOG</h1>
          <p style={{margin:0,fontSize:14,color:"#374151"}}>Read-only record of all VA Registry activity. Managed operationally by the Verification Manager.</p>
        </div>
        <span style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,background:"#f3f4f6",color:"#6b7280"}}>Read Only</span>
      </div>

      {/* Summary stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
        {[
          {label:"TOTAL ACTIONS",  value:AUDIT_LOG.length,                                    color:"#111827"},
          {label:"RESOLVED",       value:AUDIT_LOG.filter(r=>r.status==="Resolved").length,    color:"#16a34a"},
          {label:"PENDING / OPEN", value:AUDIT_LOG.filter(r=>r.status!=="Resolved").length,    color:"#d97706"},
        ].map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Audit log table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>ACTIVITY HISTORY</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["DATE","ACTOR","ACTION","INSTITUTION","DETAIL","STATUS"].map((h,i)=>(
              <th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {pageRows.map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151",whiteSpace:"nowrap"}}>{r.date}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151",whiteSpace:"nowrap"}}>{r.actor}</td>
                <td style={{padding:"14px 20px",fontSize:13,fontWeight:500,color:"#111827"}}>{r.action}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{r.institution}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#374151",maxWidth:280}}>{r.detail}</td>
                <td style={{padding:"14px 20px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:statusBg(r.status),color:statusColor(r.status)}}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div style={{padding:"14px 20px",borderTop:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE,AUDIT_LOG.length)} of {AUDIT_LOG.length} entries</p>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
              style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:page===1?"#d1d5db":"#374151",cursor:page===1?"not-allowed":"pointer",fontWeight:500}}>
              ← Previous
            </button>
            <span style={{padding:"7px 14px",fontSize:13,color:"#374151",fontWeight:500}}>{page} / {totalPages}</span>
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
              style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:page===totalPages?"#d1d5db":"#374151",cursor:page===totalPages?"not-allowed":"pointer",fontWeight:500}}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin: New Field Agent Form ─────────────────────────────────────────────
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



// ─── Admin: Field Agents ──────────────────────────────────────────────────────
const AGENTS = [
  { name: "Bola Adewale",   zone: "Lagos Island",    tasks: 14, completed: 11, performance: "79%", status: "Active"   },
  { name: "Segun Okonkwo",  zone: "Abuja Central",   tasks: 9,  completed: 9,  performance: "100%",status: "Active"   },
  { name: "Amina Bello",    zone: "Kano North",      tasks: 6,  completed: 4,  performance: "67%", status: "Active"   },
  { name: "Chuka Eze",      zone: "Port Harcourt",   tasks: 11, completed: 10, performance: "91%", status: "Active"   },
  { name: "Tunde Fashola",  zone: "Ibadan",          tasks: 7,  completed: 5,  performance: "71%", status: "Active"   },
  { name: "Grace Nwachukwu",zone: "Enugu",           tasks: 3,  completed: 0,  performance: "—",   status: "Inactive" },
];
const NIGERIA_STATES = [
  { name:"Abia",          capital:"Umuahia" },
  { name:"Adamawa",       capital:"Yola" },
  { name:"Akwa Ibom",     capital:"Uyo" },
  { name:"Anambra",       capital:"Awka" },
  { name:"Bauchi",        capital:"Bauchi" },
  { name:"Bayelsa",       capital:"Yenagoa" },
  { name:"Benue",         capital:"Makurdi" },
  { name:"Borno",         capital:"Maiduguri" },
  { name:"Cross River",   capital:"Calabar" },
  { name:"Delta",         capital:"Asaba" },
  { name:"Ebonyi",        capital:"Abakaliki" },
  { name:"Edo",           capital:"Benin City" },
  { name:"Ekiti",         capital:"Ado Ekiti" },
  { name:"Enugu",         capital:"Enugu" },
  { name:"FCT Abuja",     capital:"Abuja" },
  { name:"Gombe",         capital:"Gombe" },
  { name:"Imo",           capital:"Owerri" },
  { name:"Jigawa",        capital:"Dutse" },
  { name:"Kaduna",        capital:"Kaduna" },
  { name:"Kano",          capital:"Kano" },
  { name:"Katsina",       capital:"Katsina" },
  { name:"Kebbi",         capital:"Birnin Kebbi" },
  { name:"Kogi",          capital:"Lokoja" },
  { name:"Kwara",         capital:"Ilorin" },
  { name:"Lagos",         capital:"Ikeja" },
  { name:"Nasarawa",      capital:"Lafia" },
  { name:"Niger",         capital:"Minna" },
  { name:"Ogun",          capital:"Abeokuta" },
  { name:"Ondo",          capital:"Akure" },
  { name:"Osun",          capital:"Osogbo" },
  { name:"Oyo",           capital:"Ibadan" },
  { name:"Plateau",       capital:"Jos" },
  { name:"Rivers",        capital:"Port Harcourt" },
  { name:"Sokoto",        capital:"Sokoto" },
  { name:"Taraba",        capital:"Jalingo" },
  { name:"Yobe",          capital:"Damaturu" },
  { name:"Zamfara",       capital:"Gusau" },
];

const LGA_DATA = {
  "Lagos": [
    { lga:"Ikeja",           agent:"Adewale Ogunleye", tasks:12 },
    { lga:"Surulere",        agent:"Adewale Ogunleye", tasks:8  },
    { lga:"Ikorodu",         agent:"Chioma Nwosu",     tasks:6  },
    { lga:"Epe",             agent:"Chioma Nwosu",     tasks:4  },
    { lga:"Lagos Island",    agent:"Adewale Ogunleye", tasks:15 },
    { lga:"Lagos Mainland",  agent:null,               tasks:0  },
    { lga:"Apapa",           agent:"Adewale Ogunleye", tasks:9  },
    { lga:"Badagry",         agent:"Chioma Nwosu",     tasks:3  },
    { lga:"Ibeju-Lekki",     agent:"Chioma Nwosu",     tasks:5  },
    { lga:"Eti-Osa",         agent:"Adewale Ogunleye", tasks:11 },
    { lga:"Kosofe",          agent:"Adewale Ogunleye", tasks:7  },
    { lga:"Mushin",          agent:"Adewale Ogunleye", tasks:10 },
    { lga:"Ojo",             agent:null,               tasks:0  },
    { lga:"Oshodi-Isolo",    agent:"Adewale Ogunleye", tasks:8  },
    { lga:"Shomolu",         agent:"Adewale Ogunleye", tasks:6  },
    { lga:"Alimosho",        agent:"Adewale Ogunleye", tasks:14 },
    { lga:"Amuwo-Odofin",    agent:null,               tasks:0  },
    { lga:"Ifako-Ijaiye",    agent:null,               tasks:0  },
    { lga:"Agege",           agent:null,               tasks:0  },
    { lga:"Ajeromi-Ifelodun",agent:"Adewale Ogunleye", tasks:5  },
  ],
  "FCT Abuja": [
    { lga:"Abuja Municipal", agent:"Segun Okonkwo",    tasks:18 },
    { lga:"Gwagwalada",      agent:"Segun Okonkwo",    tasks:8  },
    { lga:"Kuje",            agent:"Segun Okonkwo",    tasks:7  },
    { lga:"Bwari",           agent:"Segun Okonkwo",    tasks:5  },
    { lga:"Kwali",           agent:null,               tasks:0  },
    { lga:"Abaji",           agent:null,               tasks:0  },
  ],
  "Rivers": [
    { lga:"Port Harcourt",   agent:"Chuka Eze",        tasks:22 },
    { lga:"Obio-Akpor",      agent:"Chuka Eze",        tasks:14 },
    { lga:"Eleme",           agent:"Chuka Eze",        tasks:8  },
    { lga:"Ikwerre",         agent:"Chuka Eze",        tasks:6  },
    { lga:"Oyigbo",          agent:"Chuka Eze",        tasks:5  },
    { lga:"Tai",             agent:null,               tasks:0  },
    { lga:"Gokana",          agent:null,               tasks:0  },
    { lga:"Khana",           agent:null,               tasks:0  },
    { lga:"Ogu-Bolo",        agent:null,               tasks:0  },
    { lga:"Andoni",          agent:null,               tasks:0  },
    { lga:"Abua-Odual",      agent:null,               tasks:0  },
    { lga:"Ahoada East",     agent:null,               tasks:0  },
  ],
};

const STATE_SUMMARY = [
  { state:"Lagos",    agents:2, lgasCovered:"16/20", tasks:123, status:"Partial" },
  { state:"FCT Abuja",agents:1, lgasCovered:"4/6",   tasks:38,  status:"Partial" },
  { state:"Rivers",   agents:1, lgasCovered:"5/12",  tasks:55,  status:"Partial" },
];

function CoverageAreas({ onBack }) {
  const [selectedState, setSelectedState] = useState("Lagos");
  const lgas = LGA_DATA[selectedState] || [];
  const uncovered = lgas.filter(l=>!l.agent).length;

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Field Agents","Coverage"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#374151",cursor:"pointer",fontSize:14,fontWeight:500,padding:"0 0 16px",marginBottom:4}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Field Agents
      </button>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>COVERAGE AREAS</h1>

      {/* Main card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:28}}>
        {/* State selector row */}
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:8}}>Select State</label>
            <div style={{position:"relative",display:"inline-block"}}>
              <select value={selectedState} onChange={e=>setSelectedState(e.target.value)}
                style={{padding:"10px 40px 10px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,color:"#111827",background:"white",outline:"none",appearance:"none",cursor:"pointer",minWidth:180}}>
                {NIGERIA_STATES.map(s=>(
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" width="14" height="14"
                style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>

          {uncovered > 0 && (
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"10px 16px"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="16" height="16"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
              <span style={{fontSize:13,color:"#92400e",fontWeight:500}}>{uncovered} LGA{uncovered>1?"s":""} have no assigned field agent</span>
            </div>
          )}
        </div>

        {/* LGA table */}
        <h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#111827"}}>LGA Coverage - {selectedState}</h2>
        <div style={{border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["LGA","ASSIGNED AGENTS","MONTHLY TASKS","COVERAGE STATUS"].map(h=>(
                <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {lgas.map((l,i)=>(
                <tr key={i} style={{borderBottom:i<lgas.length-1?"1px solid #f3f4f6":"none",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{l.lga}</td>
                  <td style={{padding:"13px 20px",fontSize:14,color:l.agent?"#374151":"#9ca3af"}}>{l.agent||"None"}</td>
                  <td style={{padding:"13px 20px",fontSize:14,color:"#374151"}}>{l.tasks}</td>
                  <td style={{padding:"13px 20px"}}>
                    <span style={{display:"inline-flex",alignItems:"center",gap:7,fontSize:14,color:l.agent?"#15803d":"#6b7280"}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:l.agent?"#16a34a":"#9ca3af",flexShrink:0}}/>
                      {l.agent?"Covered":"Uncovered"}
                    </span>
                  </td>
                </tr>
              ))}
              {lgas.length === 0 && (
                <tr><td colSpan={4} style={{padding:"28px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No LGA data available for this state yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* State Summary */}
      <h2 style={{margin:"0 0 14px",fontSize:16,fontWeight:700,color:"#111827"}}>State Summary</h2>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#f9fafb"}}>
            {["STATE","AGENTS","LGAS COVERED","MONTHLY TASKS","STATUS"].map(h=>(
              <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {STATE_SUMMARY.map((s,i)=>(
              <tr key={i} style={{borderBottom:i<STATE_SUMMARY.length-1?"1px solid #f3f4f6":"none",background:"white",cursor:"pointer"}}
                onClick={()=>setSelectedState(s.state==="FCT Abuja"?"FCT Abuja":s.state)}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{s.state}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{s.agents}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{s.lgasCovered}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{s.tasks}</td>
                <td style={{padding:"14px 20px"}}>
                  <span style={{display:"inline-flex",alignItems:"center",gap:7,fontSize:14,color:"#92400e"}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:"#f59e0b",flexShrink:0}}/>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FieldAgents({ onNewAgent, onCoverageMap }) {
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Field Agents"]}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>FIELD AGENTS</h1>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onCoverageMap} style={{padding:"10px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>View Coverage Map</button>
          <button onClick={onNewAgent} style={{padding:"10px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>+ Invite Agents</button>
        </div>
      </div>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["AGENT NAME","ZONE","TASKS ASSIGNED","COMPLETED","PERFORMANCE","STATUS",""].map((h,i)=><th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {AGENTS.map((a,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{a.name}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{a.zone}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{a.tasks}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{a.completed}</td>
                <td style={{padding:"15px 20px",fontSize:14,color:"#374151",fontWeight:500}}>{a.performance}</td>
                <td style={{padding:"15px 20px"}}>
                  <span style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:14,color:"#111827"}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:a.status==="Active"?"#16a34a":"#9ca3af",flexShrink:0}}/>
                    {a.status}
                  </span>
                </td>
                <td style={{padding:"15px 20px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Admin: System Configuration ─────────────────────────────────────────────
// ─── Admin: Scholar Verification Registry Settings (item 12) ─────────────────
function ScholarRegistrySettings() {
  const [freshnessWindow,  setFreshnessWindow]  = useState("6");
  const [delegationCap,    setDelegationCap]    = useState("3");
  const [otpValidity,      setOtpValidity]      = useState("10");
  const [otpRetries,       setOtpRetries]       = useState("3");
  const [otpCooldown,      setOtpCooldown]      = useState("60");
  const [escalDays,        setEscalDays]        = useState(["0","3","5","7","10"]);
  const [priorityOrder,    setPriorityOrder]    = useState(["HOD","Registrar","Deputy Registrar","Dean of Students","VC / Rector"]);
  const [saved,            setSaved]            = useState(false);

  const movePriority = (idx, dir) => {
    const next = [...priorityOrder];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setPriorityOrder(next);
  };

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  const inp = { width:"100%", padding:"9px 12px", border:"1.5px solid #e5e7eb", borderRadius:8, fontSize:14, outline:"none", boxSizing:"border-box", color:"#111827" };
  const lbl = { display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 };
  const hint = (text) => <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>{text}</p>;

  const Section = ({title, children}) => (
    <div style={{marginBottom:24}}>
      <p style={{margin:"0 0 14px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>{title}</p>
      {children}
    </div>
  );

  const Field = ({label, hintText, children}) => (
    <div style={{marginBottom:18}}>
      <label style={lbl}>{label}</label>
      {children}
      {hintText && hint(hintText)}
    </div>
  );

  const updateEscalDay = (i, val) => {
    const next = [...escalDays];
    next[i] = val.replace(/\D/g,"");
    setEscalDays(next);
  };

  return (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:20}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <p style={{margin:0,fontWeight:700,fontSize:15,color:"#111827"}}>SCHOLAR VERIFICATION REGISTRY SETTINGS</p>
          </div>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Configure operational parameters for the VA Registry and Scholar verification execution flow.</p>
        </div>
        <span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:"#f5f3ff",color:"#7c3aed",flexShrink:0}}>Scholar</span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>

        {/* Left column */}
        <div>
          <Section title="VA REGISTRY — FRESHNESS">
            <Field
              label="Named-Person Address Freshness Window"
              hintText="Named-person emails (e.g. j.okafor@institution.edu.ng) are marked Stale after this many months with no verification activity. Role-based emails (e.g. registrar@) do not expire.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={freshnessWindow} onChange={e=>setFreshnessWindow(e.target.value.replace(/\D/g,""))} type="number" min="1" max="24"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>months</span>
              </div>
            </Field>
          </Section>

          <Section title="DELEGATION">
            <Field
              label="Delegation Hop Cap"
              hintText="Maximum number of times a VA can delegate a verification task in a single chain. At this limit, VeriPort pauses and surfaces the task to the VO for review before proceeding.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={delegationCap} onChange={e=>setDelegationCap(e.target.value.replace(/\D/g,""))} type="number" min="1" max="10"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>hops</span>
              </div>
            </Field>
          </Section>

          <Section title="MULTI-VA LOOKUP PRIORITY ORDER">
            <Field
              label="VA Contact Priority"
              hintText="When a task is released to an institution with multiple assigned VAs, the engine contacts them in this order. Drag ↑ ↓ to reorder. HOD is always first for department-level tasks.">
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {priorityOrder.map((role, idx) => (
                  <div key={role} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#f9fafb",border:"1.5px solid #e5e7eb",borderRadius:8}}>
                    <span style={{fontSize:12,fontWeight:700,color:"#9ca3af",width:20,textAlign:"center",flexShrink:0}}>{idx+1}</span>
                    <span style={{flex:1,fontSize:13,fontWeight:500,color:"#111827"}}>{role}</span>
                    <div style={{display:"flex",gap:4}}>
                      <button onClick={()=>movePriority(idx,-1)} disabled={idx===0}
                        style={{width:26,height:26,border:"1.5px solid #e5e7eb",borderRadius:5,background:"white",fontSize:13,cursor:idx===0?"not-allowed":"pointer",color:idx===0?"#d1d5db":"#374151",display:"flex",alignItems:"center",justifyContent:"center"}}>↑</button>
                      <button onClick={()=>movePriority(idx,1)} disabled={idx===priorityOrder.length-1}
                        style={{width:26,height:26,border:"1.5px solid #e5e7eb",borderRadius:5,background:"white",fontSize:13,cursor:idx===priorityOrder.length-1?"not-allowed":"pointer",color:idx===priorityOrder.length-1?"#d1d5db":"#374151",display:"flex",alignItems:"center",justifyContent:"center"}}>↓</button>
                    </div>
                  </div>
                ))}
              </div>
            </Field>
          </Section>

          <Section title="ESCALATION CADENCE">
            <Field
              label="Escalation Days"
              hintText="Days on which an unresponded Scholar verification task is escalated. Day 0 = immediate on assignment. Add up to 5 escalation checkpoints.">
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {escalDays.map((d,i)=>(
                  <div key={i} style={{position:"relative"}}>
                    <input value={d} onChange={e=>updateEscalDay(i,e.target.value)} type="text" maxLength={2}
                      style={{...inp,width:64,textAlign:"center",paddingRight:20}}/>
                    <span style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",fontSize:10,color:"#9ca3af",pointerEvents:"none"}}>d</span>
                  </div>
                ))}
                {escalDays.length < 7 && (
                  <button onClick={()=>setEscalDays(p=>[...p,""])}
                    style={{width:64,padding:"9px 0",border:"1.5px dashed #d1d5db",borderRadius:8,background:"white",fontSize:18,color:"#9ca3af",cursor:"pointer",lineHeight:1}}>+</button>
                )}
              </div>
            </Field>
          </Section>
        </div>

        {/* Right column */}
        <div>
          <Section title="OTP CONFIGURATION">
            <Field
              label="OTP Validity Window"
              hintText="How long a one-time code sent to a VA's institutional email remains valid before expiring. Shorter windows are more secure.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={otpValidity} onChange={e=>setOtpValidity(e.target.value.replace(/\D/g,""))} type="number" min="1" max="60"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>minutes</span>
              </div>
            </Field>

            <Field
              label="OTP Retry Attempts"
              hintText="How many times a VA can request a new OTP before being locked out and needing to contact support.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={otpRetries} onChange={e=>setOtpRetries(e.target.value.replace(/\D/g,""))} type="number" min="1" max="10"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>attempts</span>
              </div>
            </Field>

            <Field
              label="OTP Re-issue Cooldown"
              hintText="Minimum wait time between consecutive OTP requests from the same VA. Prevents request spam.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={otpCooldown} onChange={e=>setOtpCooldown(e.target.value.replace(/\D/g,""))} type="number" min="10" max="300"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>seconds</span>
              </div>
            </Field>
          </Section>
        </div>
      </div>

      {/* Current values summary */}
      <div style={{background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:8,padding:"12px 16px",marginBottom:20}}>
        <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#6d28d9"}}>Current configuration summary</p>
        <p style={{margin:0,fontSize:12,color:"#7c3aed",lineHeight:1.8}}>
          Named-person freshness: <strong>{freshnessWindow} months</strong> · Delegation cap: <strong>{delegationCap} hops</strong> · OTP validity: <strong>{otpValidity} mins</strong> · OTP retries: <strong>{otpRetries}</strong> · OTP cooldown: <strong>{otpCooldown}s</strong> · Escalation days: <strong>{escalDays.filter(d=>d!=="").join(", ")}</strong> · Priority: <strong>{priorityOrder.join(" → ")}</strong>
        </p>
      </div>

      {/* Save */}
      <div style={{display:"flex",alignItems:"center",gap:14,justifyContent:"flex-end"}}>
        {saved && <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✓ Settings saved successfully</span>}
        <button onClick={handleSave}
          style={{padding:"10px 28px",border:"none",borderRadius:8,background:"#7c3aed",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
          Save Registry Settings
        </button>
      </div>
    </div>
  );
}

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

// ─── Admin: Integrations ──────────────────────────────────────────────────────
const INTEGRATIONS = [
  { name: "NIMC API",    desc: "National Identity Management Commission — NIN verification",  status: "Connected", lastSync: "2 mins ago",   color: "#16a34a" },
  { name: "SendGrid",    desc: "Transactional email delivery for candidate communications",   status: "Connected", lastSync: "5 mins ago",   color: "#16a34a" },
  { name: "Twilio",      desc: "SMS notifications and reminders to candidates",               status: "Connected", lastSync: "8 mins ago",   color: "#16a34a" },
  { name: "QuickBooks",  desc: "Finance and invoicing integration for client billing",        status: "Disconnected",lastSync:"Never",        color: "#dc2626" },
];
function Integrations() {
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Integrations"]}/>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>INTEGRATIONS</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
        {INTEGRATIONS.map((intg,i)=>(
          <div key={i} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px"}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
              <div style={{width:44,height:44,borderRadius:10,background:"#f9fafb",border:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:"#374151"}}>{intg.name[0]}</div>
              <span style={{padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:intg.status==="Connected"?"#dcfce7":"#fee2e2",color:intg.color}}>{intg.status}</span>
            </div>
            <p style={{margin:"0 0 4px",fontWeight:600,fontSize:15,color:"#111827"}}>{intg.name}</p>
            <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>{intg.desc}</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:12,color:"#9ca3af"}}>Last sync: {intg.lastSync}</span>
              <button style={{padding:"7px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>{intg.status==="Connected"?"Configure":"Connect"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin: Audit Logs ────────────────────────────────────────────────────────
const AUDIT_LOGS = [
  { time: "2026-02-26 09:14:22", actor: "Alice Okafor",   action: "Created user",      entity: "Fatima Bello",            details: "Role: VE" },
  { time: "2026-02-26 08:55:10", actor: "Sarah Adeniyi",  action: "Created batch",     entity: "Zenith Bank Q1 Intake",   details: "384 candidates" },
  { time: "2026-02-25 17:30:44", actor: "Alice Okafor",   action: "Updated config",    entity: "Link Expiry",             details: "Changed to 7 days" },
  { time: "2026-02-25 16:12:08", actor: "Damilola Adeyemi",action:"Completed task",    entity: "Acme Q4 - Batch 1",       details: "ServMode: Employment" },
  { time: "2026-02-25 14:48:33", actor: "Alice Okafor",   action: "Deactivated user",  entity: "Old User Account",        details: "Reason: Left company" },
  { time: "2026-02-25 11:22:19", actor: "Sarah Adeniyi",  action: "Released report",   entity: "Beta Industries Q3",      details: "32 candidates" },
  { time: "2026-02-24 16:05:55", actor: "Alice Okafor",   action: "Added VA",          entity: "Prof. Adebayo Okafor",    details: "Institution: UNILAG" },
  { time: "2026-02-24 10:33:11", actor: "Chinedu Okafor", action: "Submitted evidence",entity: "Acme Q4 Batch 1 - Task 3",details: "ServMode: Education" },
];
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

// ─── Admin: System Settings ───────────────────────────────────────────────────
function SystemSettings() {
  const [tab, setTab] = useState("Personal");
  const tabs = ["Personal","Notifications","Accessibility","Regional"];
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [batchAlerts, setBatchAlerts] = useState(true);
  const Toggle = ({val, set}) => (
    <div onClick={()=>set(p=>!p)} style={{width:44,height:24,borderRadius:12,background:val?"#b91c1c":"#d1d5db",cursor:"pointer",position:"relative",transition:"background .2s"}}>
      <div style={{width:18,height:18,borderRadius:"50%",background:"white",position:"absolute",top:3,left:val?23:3,transition:"left .2s"}}/>
    </div>
  );
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["System Settings"]}/>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>SYSTEM SETTINGS</h1>
      <div style={{display:"flex",gap:2,background:"#f3f4f6",borderRadius:8,padding:3,marginBottom:24,width:"fit-content"}}>
        {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"8px 20px",borderRadius:6,border:"none",cursor:"pointer",fontSize:14,fontWeight:500,background:tab===t?"#b91c1c":"transparent",color:tab===t?"white":"#6b7280"}}>{t}</button>)}
      </div>
      {tab==="Notifications" ? (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",maxWidth:680}}>
          <p style={{margin:"0 0 24px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>NOTIFICATION PREFERENCES</p>
          {[
            {label:"Email Notifications",desc:"Receive updates via email",val:emailNotifs,set:setEmailNotifs},
            {label:"SMS Notifications",  desc:"Receive SMS alerts for urgent items",val:smsNotifs,set:setSmsNotifs},
            {label:"Batch Status Alerts",desc:"Get notified when batches change status",val:batchAlerts,set:setBatchAlerts},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",borderTop:i>0?"1px solid #f3f4f6":"none"}}>
              <div><p style={{margin:0,fontWeight:500,fontSize:14,color:"#111827"}}>{item.label}</p><p style={{margin:"2px 0 0",fontSize:13,color:"#6b7280"}}>{item.desc}</p></div>
              <Toggle val={item.val} set={item.set}/>
            </div>
          ))}
          <div style={{marginTop:24,display:"flex",justifyContent:"flex-end"}}>
            <button style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save Preferences</button>
          </div>
        </div>
      ) : (
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",maxWidth:680}}>
          <p style={{margin:"0 0 24px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>{tab.toUpperCase()} SETTINGS</p>
          <p style={{margin:0,fontSize:14,color:"#9ca3af"}}>{tab} settings — coming soon</p>
        </div>
      )}
    </div>
  );
}

// ─── Admin Dashboard Shell ────────────────────────────────────────────────────
// ─── Admin: Reference Data ────────────────────────────────────────────────────
const REFERENCE_REGISTRIES = [
  { name:"Country",            records:249,   updated:"2026-01-12", icon:"🌍", dep:null },
  { name:"State",              records:37,    updated:"2025-11-03", icon:"🗺",  dep:"Country" },
  { name:"LGA",                records:774,   updated:"2025-11-03", icon:"📍", dep:"State" },
  { name:"Local Institution",  records:264,   updated:"2026-02-09", icon:"🏫", dep:null },
  { name:"Foreign Institution",records:1820,  updated:"2026-02-09", icon:"🌐", dep:"Country" },
  { name:"Degree Type",        records:42,    updated:"2025-09-21", icon:"🎓", dep:null },
  { name:"Degree Grade",       records:7,     updated:"2025-09-21", icon:"📊", dep:null },
  { name:"Sex",                records:3,     updated:"2025-09-21", icon:"👤", dep:null },
  { name:"Marital Status",     records:5,     updated:"2025-09-21", icon:"💍", dep:null },
  { name:"Relationship",       records:12,    updated:"2025-09-21", icon:"🤝", dep:null },
];

const SAMPLE_RECORDS = {
  "Country":             [{id:"CTR-001",value:"Nigeria"},{id:"CTR-002",value:"Ghana"},{id:"CTR-003",value:"United Kingdom"},{id:"CTR-004",value:"United States"},{id:"CTR-005",value:"Canada"}],
  "State":               [{id:"STT-001",value:"Lagos",dep:"Nigeria"},{id:"STT-002",value:"Ogun",dep:"Nigeria"},{id:"STT-003",value:"Oyo",dep:"Nigeria"},{id:"STT-004",value:"Abuja (FCT)",dep:"Nigeria"},{id:"STT-005",value:"Rivers",dep:"Nigeria"}],
  "LGA":                 [{id:"LGA-001",value:"Ikeja",dep:"Lagos"},{id:"LGA-002",value:"Eti-Osa",dep:"Lagos"},{id:"LGA-003",value:"Abeokuta South",dep:"Ogun"},{id:"LGA-004",value:"Ibadan North",dep:"Oyo"},{id:"LGA-005",value:"Port Harcourt",dep:"Rivers"}],
  "Local Institution":   [{id:"INST-NG-0142",value:"University of Lagos",dep:"Nigeria"},{id:"INST-NG-0201",value:"Obafemi Awolowo University",dep:"Nigeria"},{id:"INST-NG-0089",value:"University of Ibadan",dep:"Nigeria"},{id:"INST-NG-0310",value:"Ahmadu Bello University",dep:"Nigeria"},{id:"INST-NG-0178",value:"Lagos State University",dep:"Nigeria"}],
  "Foreign Institution": [{id:"INST-UK-0041",value:"University of London",dep:"United Kingdom"},{id:"INST-UK-0012",value:"University of Oxford",dep:"United Kingdom"},{id:"INST-US-0301",value:"Harvard University",dep:"United States"},{id:"INST-GH-0022",value:"University of Ghana",dep:"Ghana"},{id:"INST-US-0188",value:"MIT",dep:"United States"}],
  "Degree Type":         [{id:"DEG-001",value:"BSc"},{id:"DEG-002",value:"BA"},{id:"DEG-003",value:"BEng"},{id:"DEG-004",value:"LLB"},{id:"DEG-005",value:"MBBS"}],
  "Degree Grade":        [{id:"GRD-001",value:"First Class"},{id:"GRD-002",value:"Second Class Upper (2:1)"},{id:"GRD-003",value:"Second Class Lower (2:2)"},{id:"GRD-004",value:"Third Class"},{id:"GRD-005",value:"Pass"},{id:"GRD-006",value:"Distinction"},{id:"GRD-007",value:"Merit"}],
  "Sex":                 [{id:"SEX-001",value:"Male"},{id:"SEX-002",value:"Female"},{id:"SEX-003",value:"Prefer not to say"}],
  "Marital Status":      [{id:"MAR-001",value:"Single"},{id:"MAR-002",value:"Married"},{id:"MAR-003",value:"Divorced"},{id:"MAR-004",value:"Widowed"},{id:"MAR-005",value:"Separated"}],
  "Relationship":        [{id:"REL-001",value:"Father"},{id:"REL-002",value:"Mother"},{id:"REL-003",value:"Spouse"},{id:"REL-004",value:"Sibling"},{id:"REL-005",value:"Child"}],
};

function ReferenceData() {
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState("");
  const [newVal,   setNewVal]   = useState("");
  const [records,  setRecords]  = useState(SAMPLE_RECORDS);
  const [saved,    setSaved]    = useState(false);

  const handleAdd = () => {
    if (!newVal.trim()) return;
    const reg = selected.name;
    const prefix = reg.replace(/\s+/g,"").slice(0,3).toUpperCase();
    const id = `${prefix}-${String((records[reg]||[]).length+1).padStart(3,"0")}`;
    setRecords(p=>({...p,[reg]:[...(p[reg]||[]),{id,value:newVal}]}));
    setNewVal("");
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  if (selected) {
    const recs = (records[selected.name]||[]).filter(r=>r.value.toLowerCase().includes(search.toLowerCase()));
    return (
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        <button onClick={()=>{setSelected(null);setSearch("");setNewVal("");}}
          style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Reference Data
        </button>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{selected.icon} {selected.name}</h1>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{(records[selected.name]||[]).length.toLocaleString()} records · Last updated {selected.updated}{selected.dep&&` · Depends on: ${selected.dep}`}</p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>
              ⬇ Import CSV
            </button>
          </div>
        </div>

        {/* Add new record */}
        <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"16px 20px",marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
          <input value={newVal} onChange={e=>setNewVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdd()} placeholder={`Add new ${selected.name.toLowerCase()}...`}
            style={{flex:1,padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
          <button onClick={handleAdd}
            style={{padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
            + Add Record
          </button>
          {saved && <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✓ Added</span>}
        </div>

        {/* Search + table */}
        <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",gap:10}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}>
              <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",fontSize:12}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${selected.name.toLowerCase()}...`}
                style={{width:"100%",padding:"7px 12px 7px 26px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",color:"#374151",boxSizing:"border-box"}}/>
            </div>
            <span style={{fontSize:13,color:"#6b7280"}}>Showing {recs.length} of {(records[selected.name]||[]).length}</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["REGISTRY ID","VALUE",selected.dep&&"DEPENDENCY",""].filter(Boolean).map(h=>(
                <th key={h} style={{padding:"10px 18px",textAlign:"left",fontSize:11,fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {recs.map((r,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"12px 18px",fontSize:12,fontFamily:"monospace",color:"#6b7280"}}>{r.id}</td>
                  <td style={{padding:"12px 18px",fontSize:13,fontWeight:500,color:"#111827"}}>{r.value}</td>
                  {selected.dep && <td style={{padding:"12px 18px",fontSize:12,color:"#9ca3af"}}>{r.dep||"—"}</td>}
                  <td style={{padding:"12px 18px",textAlign:"right"}}>
                    <button onClick={()=>setRecords(p=>({...p,[selected.name]:(p[selected.name]||[]).filter((_,j)=>j!==i)}))}
                      style={{background:"none",border:"none",cursor:"pointer",color:"#d1d5db",fontSize:16,lineHeight:1}}>×</button>
                  </td>
                </tr>
              ))}
              {recs.length===0 && <tr><td colSpan={4} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:13}}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Reference Data"]}/>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
        <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>REFERENCE DATA</h1>
      </div>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#374151"}}>Platform-owned reference registries used across the Service Catalog. Candidates see searchable pickers; stored values are registry IDs — not free text.</p>

      <div style={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:10,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:10}}>
        <span style={{fontSize:16,flexShrink:0}}>ℹ</span>
        <p style={{margin:0,fontSize:13,color:"#92400e",lineHeight:1.6}}>These registries power the <strong>Reference</strong> field types in the Service Catalog. When a service creator picks "Local Institution" or "State", candidates see data from here — not free text. Downstream agents key off registry IDs for automated routing.</p>
      </div>

      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["REGISTRY","RECORDS","DEPENDENCY","LAST UPDATED",""].map(h=>(
              <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {REFERENCE_REGISTRIES.map((reg,i)=>(
              <tr key={i} onClick={()=>{setSelected(reg);setSearch("");}}
                style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:18}}>{reg.icon}</span>
                    <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{reg.name}</p>
                  </div>
                </td>
                <td style={{padding:"14px 20px",fontSize:14,fontWeight:500,color:"#374151"}}>{reg.records.toLocaleString()}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:reg.dep?"#374151":"#d1d5db"}}>{reg.dep||"—"}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#9ca3af"}}>{reg.updated}</td>
                <td style={{padding:"14px 20px",color:"#9ca3af"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:"12px 20px",borderTop:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{REFERENCE_REGISTRIES.length} registries · {REFERENCE_REGISTRIES.reduce((a,r)=>a+r.records,0).toLocaleString()} total records</p>
        </div>
      </div>
    </div>
  );
}

function AdminShell({ user, activeProfile, onSwitchProfile, onSignOut }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [subPage, setSubPage] = useState(null); // null | "newuser" | "permissions"
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServMode, setSelectedServMode] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [credentialsData, setCredentialsData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = (target) => {
    if (target === "newuser")        { setActiveNav("Internal Users"); setSubPage("newuser"); }
    else if (target === "permissions"){ setActiveNav("Internal Users"); setSubPage("permissions"); }
    else if (target === "internalusers"){ setActiveNav("Internal Users"); setSubPage(null); }
    else if (target === "servicecatalog") { setActiveNav("Service Catalog"); setSubPage(null); setSelectedService(null); setSelectedServMode(null); }
    else if (target === "newservice")      { setActiveNav("Service Catalog"); setSubPage("newservice"); }
    else if (target === "fieldagents")    { setActiveNav("Field Agents"); setSubPage(null); }
    else if (target === "newagent")         { setActiveNav("Field Agents"); setSubPage("newagent"); }
    else if (target === "coveragemap")      { setActiveNav("Field Agents"); setSubPage("coveragemap"); }
    else if (target === "templates")      { setActiveNav("Communication Templates"); setSubPage(null); }
    else if (target === "newtemplate")    { setActiveNav("Communication Templates"); setSubPage("newtemplate"); }
    else if (target === "auditlogs")      { setActiveNav("Audit Logs"); setSubPage(null); }
    else if (target === "newclient")      { setActiveNav("Clients"); setSubPage("newclient"); setSelectedClient(null); }
    else if (target === "clients")        { setActiveNav("Clients"); setSubPage(null); setSelectedClient(null); }
    else { setSubPage(null); }
  };

  const handleNavClick = (label) => {
    setActiveNav(label);
    setSubPage(null);
  };

  const handleSaveUser = (data) => {
    setSubPage(null);
    setActiveNav("Internal Users");
  };

  const renderContent = () => {
    if (activeNav === "Dashboard" && !subPage) return <AdminDashboard onNavigate={navigate}/>;
    if (activeNav === "Internal Users") {
      if (subPage === "newuser") return <NewUserForm onSave={handleSaveUser} onCancel={()=>setSubPage(null)}/>;
      if (subPage === "permissions") return <RolePermissionsPage onBack={()=>setSubPage(null)}/>;
      return <UserManagement onNewUser={()=>setSubPage("newuser")} onViewPermissions={()=>setSubPage("permissions")}/>;
    }
    if (activeNav === "Service Catalog") {
      if (subPage === "newservice") return <NewServiceForm onSave={()=>setSubPage(null)} onCancel={()=>setSubPage(null)}/>;
      if (subPage === "newservform" && selectedService) {
        return <NewServModeForm service={selectedService} onSave={()=>setSubPage("servicedetail")} onCancel={()=>setSubPage("servicedetail")}/>;
      }
      if (subPage === "servicedetail" && selectedService && selectedServMode) {
        return <ServModeView servform={selectedServMode} service={selectedService}
          onBack={()=>setSelectedServMode(null)}/>;
      }
      if (subPage === "servicedetail" && selectedService) {
        return <ServiceDetail service={selectedService}
          onBack={()=>{setSubPage(null);setSelectedService(null);setSelectedServMode(null);}}
          onViewServMode={(sf)=>setSelectedServMode(sf)}
          onAddServMode={()=>setSubPage("newservform")}/>;
      }
      return <ServiceCatalog onNewService={()=>setSubPage("newservice")}
        onViewService={(s)=>{setSelectedService(s);setSelectedServMode(null);setSubPage("servicedetail");}}/>;
    }
    if (activeNav === "Communication Templates") {
      if (subPage === "newtemplate") return <NewTemplateForm onSave={()=>setSubPage(null)} onCancel={()=>setSubPage(null)}/>;
      return <CommunicationTemplates onNewTemplate={()=>setSubPage("newtemplate")}/>;
    }
    if (activeNav === "VA Registry") return <VARegistry/>;
    if (activeNav === "Field Agents") {
      if (subPage === "newagent")    return <InviteFieldAgentsForm onSave={()=>setSubPage(null)} onCancel={()=>setSubPage(null)}/>;
      if (subPage === "coveragemap") return <CoverageAreas onBack={()=>setSubPage(null)}/>;
      return <FieldAgents onNewAgent={()=>setSubPage("newagent")} onCoverageMap={()=>setSubPage("coveragemap")}/>;
    }
    if (activeNav === "System Configuration") return <SystemConfiguration/>;
    if (activeNav === "Reference Data") return <ReferenceData/>;
    if (activeNav === "Integrations") return <Integrations/>;
    if (activeNav === "Audit Logs") return <AuditLogs/>;
    if (activeNav === "System Settings") return <SystemSettings/>;
    if (activeNav === "Clients") {
      if (subPage === "newclient" && credentialsData) return <ClientCredentialsScreen
        client={credentialsData.client} username={credentialsData.username} password={credentialsData.password}
        onDone={()=>{setSubPage(null);setCredentialsData(null);}}
        onSendAgain={()=>{}}/>;
      if (subPage === "newclient") return <NewClientForm
        onCredentials={(data)=>setCredentialsData(data)}
        onCancel={()=>setSubPage(null)}/>;
      if (subPage === "clientdetail" && selectedClient) return <AdminClientDetail client={selectedClient} onBack={()=>{setSubPage(null);setSelectedClient(null);}}/>;
      return <AdminClientList onNewClient={()=>{setSubPage("newclient");setCredentialsData(null);}} onViewClient={(c)=>{setSelectedClient(c);setSubPage("clientdetail");}}/>;
    }
    return (
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontSize:15}}>
        {activeNav} — coming soon
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      <Topbar user={user} activeProfile={activeProfile} onSwitchProfile={onSwitchProfile} onToggleSidebar={()=>setSidebarOpen(p=>!p)}/>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {sidebarOpen && (
          <div className="vp-sidebar vp-sidebar-open" style={{width:240,background:"white",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
            <div style={{padding:"16px 12px 8px"}}>
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <p style={{margin:0,fontSize:11,fontWeight:600,color:"#b91c1c",letterSpacing:.5,marginBottom:2}}>CURRENT ROLE</p>
                  <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{activeProfile.role}</p>
                </div>
                <button style={{background:"none",border:"none",cursor:"pointer",color:"#b91c1c",padding:2,display:"flex"}}>
                  <ChevronLeft/>
                </button>
              </div>
            </div>
            <nav style={{padding:"4px 8px",flex:1}}>
              {ADMIN_NAV.map(item => (
                <button key={item.label} onClick={()=>handleNavClick(item.label)}
                  style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:activeNav===item.label?600:400,background:activeNav===item.label?"#b91c1c":"transparent",color:activeNav===item.label?"white":"#374151",marginBottom:2,textAlign:"left"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d={item.d}/></svg>
                  {item.label}
                </button>
              ))}
            </nav>
            <div style={{padding:"12px 8px",borderTop:"1px solid #e5e7eb"}}>
              <button onClick={onSignOut} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,color:"#6b7280",background:"transparent"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}


export { AdminShell };
