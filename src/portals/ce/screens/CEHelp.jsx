import { useState } from "react";
import { SearchSm } from "../../../components/Icons.jsx";

function CEHelp({ user }) {
  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [msgSent, setMsgSent] = useState(false);
  const [message, setMessage] = useState("");

  const STEPS = [
    { n:1, title:"Create a new batch",              desc:"Go to Dashboard and click '+ New Batch'. Fill in client, batch name, select services and upload candidates." },
    { n:2, title:"Set up collection",               desc:"After saving as draft, move the batch to Collection. Set the collection window and share the candidate link." },
    { n:3, title:"Monitor active verifications",    desc:"Once candidates submit, the batch moves to Active. Track progress per candidate and service in real time." },
    { n:4, title:"Review and release in Complete",  desc:"When all verifications are done, the batch enters the Release Workbench. Review each service and release candidate reports to the client." },
    { n:5, title:"View finalized reports",          desc:"Fully released batches move to Finalized. Open Reports to download individual candidate PDF reports." },
  ];

  const FAQS = [
    { q:"How do I clone an existing batch?",              a:"On the Dashboard, click 'Clone Existing' next to '+ New Batch'. Select the source batch and adjust the details as needed." },
    { q:"What does the 'Returns' tab mean?",              a:"Returns are tasks sent back from the Verification Officer (VO) due to data issues — wrong candidate info, missing documents, etc. You'll find them in the Returns tab and need to fix and resubmit." },
    { q:"How do I download a candidate report as PDF?",   a:"Go to Reports in the sidebar, select the batch, click the candidate name, then click 'Download PDF' at the top right of the candidate report screen." },
    { q:"What happens after I archive a batch?",          a:"Archived batches move to Finalized. They are read-only — no further changes can be made. You can still view and download all candidate reports." },
    { q:"How do I add a new client?",                     a:"Go to Admin and use '+ New Client' in the Quick Actions. If you don't have Admin access, contact your System Administrator." },
    { q:"Who do I contact if a VO hasn't responded?",     a:"Use the Remind action in the Active tab to send a reminder. If the issue persists, contact your Manager or raise a support ticket below." },
    { q:"Can I edit a batch after it moves to Active?",   a:"Limited edits are allowed — you can add notes but cannot change services or candidate list once verification has started." },
    { q:"How long does a verification typically take?",   a:"Standard turnaround is 5–14 days depending on the services requested and responsiveness of third parties." },
  ];

  const SHORTCUTS = [
    { key:"Ctrl + K",   action:"Global search" },
    { key:"N",          action:"New batch (on Dashboard)" },
    { key:"← / →",     action:"Switch between tabs" },
    { key:"Esc",        action:"Close modal or drawer" },
    { key:"Enter",      action:"Confirm action in modal" },
  ];

  const filtered = (items, keys) => items.filter(item =>
    !search.trim() || keys.some(k => item[k]?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredSteps    = filtered(STEPS,    ["title","desc"]);
  const filteredFAQs     = filtered(FAQS,     ["q","a"]);
  const filteredShortcuts= filtered(SHORTCUTS, ["key","action"]);

  return (
    <div style={{padding:"28px 32px",maxWidth:860}}>
      {/* Header + search */}
      <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:700,color:"#111827"}}>Help Centre</h1>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Find answers, guides and support for the CE Officer workflow.</p>
      <div style={{position:"relative",marginBottom:36}}>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search help topics..."
          style={{width:"100%",padding:"12px 16px 12px 42px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:15,outline:"none",boxSizing:"border-box",color:"#374151",background:"white"}}/>
      </div>

      {/* Quick Start Guide */}
      {filteredSteps.length > 0 && (
        <div style={{marginBottom:36}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Quick Start Guide</h2>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {filteredSteps.map(s=>(
              <div key={s.n} style={{display:"flex",gap:16,background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 20px",alignItems:"flex-start"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"#b91c1c",color:"white",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{s.n}</div>
                <div>
                  <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827"}}>{s.title}</p>
                  <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.6}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {filteredFAQs.length > 0 && (
        <div style={{marginBottom:36}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Frequently Asked Questions</h2>
          <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
            {filteredFAQs.map((f,i)=>(
              <div key={i} style={{borderBottom:i<filteredFAQs.length-1?"1px solid #f3f4f6":"none"}}>
                <button onClick={()=>setOpenFAQ(openFAQ===i?null:i)}
                  style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                  <span style={{fontSize:14,fontWeight:500,color:"#111827",paddingRight:16}}>{f.q}</span>
                  <span style={{fontSize:18,color:"#9ca3af",flexShrink:0,transform:openFAQ===i?"rotate(45deg)":"none",transition:"transform .2s"}}>+</span>
                </button>
                {openFAQ===i && (
                  <div style={{padding:"0 20px 16px",fontSize:13,color:"#6b7280",lineHeight:1.7,borderTop:"1px solid #f3f4f6"}}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts */}
      {filteredShortcuts.length > 0 && (
        <div style={{marginBottom:36}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Keyboard Shortcuts</h2>
          <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#fafafa"}}>
                {["Shortcut","Action"].map((h,i)=>(
                  <th key={i} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredShortcuts.map((s,i)=>(
                  <tr key={i} style={{borderBottom:i<filteredShortcuts.length-1?"1px solid #f3f4f6":"none"}}>
                    <td style={{padding:"13px 20px"}}>
                      <kbd style={{padding:"3px 10px",background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:5,fontSize:12,fontWeight:600,color:"#374151",fontFamily:"monospace"}}>{s.key}</kbd>
                    </td>
                    <td style={{padding:"13px 20px",fontSize:14,color:"#374151"}}>{s.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Support */}
      {(!search.trim() || "contact support help".includes(search.toLowerCase())) && (
        <div style={{marginBottom:8}}>
          <h2 style={{margin:"0 0 16px",fontSize:17,fontWeight:700,color:"#111827"}}>Contact Support</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            {[
              {icon:"✉",label:"Email",value:"support@dragnet.ng"},
              {icon:"☎",label:"Phone",value:"+234-800-DRAGNET"},
            ].map(({icon,label,value})=>(
              <div key={label} style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                <span style={{fontSize:22}}>{icon}</span>
                <div>
                  <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:.4}}>{label.toUpperCase()}</p>
                  <p style={{margin:0,fontSize:14,fontWeight:500,color:"#374151"}}>{value}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Contact form */}
          <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"24px"}}>
            <p style={{margin:"0 0 16px",fontSize:14,fontWeight:600,color:"#111827"}}>Send a Message</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div>
                <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Name</label>
                <input value={user?.name||"Emeka Nwosu"} readOnly style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#6b7280",background:"#f9fafb",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Email</label>
                <input value={user?.email||"emeka@dragnet.ng"} readOnly style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#6b7280",background:"#f9fafb",boxSizing:"border-box"}}/>
              </div>
            </div>
            <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:5}}>Message</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Describe your issue or question..."
              rows={4} style={{width:"100%",padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,color:"#374151",boxSizing:"border-box",outline:"none",resize:"vertical",marginBottom:12}}/>
            {msgSent
              ? <div style={{padding:"10px 16px",background:"#dcfce7",border:"1px solid #86efac",borderRadius:7,color:"#16a34a",fontSize:13,fontWeight:500}}>✓ Message sent! Our support team will respond within 24 hours.</div>
              : <button onClick={()=>{if(message.trim())setMsgSent(true);}}
                  style={{padding:"10px 24px",border:"none",borderRadius:7,background:message.trim()?"#b91c1c":"#fca5a5",color:"white",fontSize:14,fontWeight:600,cursor:message.trim()?"pointer":"not-allowed"}}>
                  Send Message
                </button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default CEHelp;
