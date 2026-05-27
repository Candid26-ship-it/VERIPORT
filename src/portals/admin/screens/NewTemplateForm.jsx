import { useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

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

export default NewTemplateForm;
