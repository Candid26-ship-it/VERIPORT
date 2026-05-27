import { useState } from "react";
import { ChevronRight, ChevronDown, ChevronLeft, SearchSm } from "../../components/Icons.jsx";
import { ADMIN_NAV } from "../../data/index.js";
import { Topbar } from "../../components/Topbar.jsx";
import { Breadcrumb } from "../../components/Breadcrumb.jsx";
import {
  TEMPLATES,
  AGENTS,
  NIGERIA_STATES,
  LGA_DATA,
  STATE_SUMMARY,
  INTEGRATIONS,
  AUDIT_LOGS,
  REFERENCE_REGISTRIES,
  SAMPLE_RECORDS,
} from "./data.js";

import NewUserForm from "./screens/NewUserForm.jsx";
import RolePermissionsPage from "./screens/RolePermissionsPage.jsx";
import UserManagement from "./screens/UserManagement.jsx";
import AdminClientList from "./screens/AdminClientList.jsx";
import AdminClientDetail from "./screens/AdminClientDetail.jsx";
import ClientCredentialsScreen from "./screens/ClientCredentialsScreen.jsx";
import NewClientForm from "./screens/NewClientForm.jsx";
import AdminDashboard from "./screens/AdminDashboard.jsx";
import ServiceCatalog from "./screens/ServiceCatalog.jsx";
import ServiceDetail from "./screens/ServiceDetail.jsx";
import ServModeView from "./screens/ServModeView.jsx";
import NewServiceForm from "./screens/NewServiceForm.jsx";
import NewServModeForm from "./screens/NewServModeForm.jsx";

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
export default AdminShell;
