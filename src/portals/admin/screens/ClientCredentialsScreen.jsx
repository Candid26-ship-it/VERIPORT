import { useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

export default function ClientCredentialsScreen({ client, username, password, onDone, onSendAgain }) {
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
