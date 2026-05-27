import { useState } from "react";
import { ChevronDown, ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

export default function NewUserForm({ onSave, onCancel }) {
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
