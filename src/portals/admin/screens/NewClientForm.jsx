import { useState } from "react";
import { ChevronDown, ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { ADMIN_CLIENTS } from "../data.js";

export default function NewClientForm({ onSave, onCancel, onCredentials }) {
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
