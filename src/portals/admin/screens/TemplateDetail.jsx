import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";

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

export default TemplateDetail;
