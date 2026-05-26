import { ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

function DraftDetail({ batch, onBack }) {
  const candidates = batch.tasks || 48;
  const services = 8;
  const totalTasks = candidates * services;
  const ninStatus = { pending: 12, awaiting: 30, verified: 6, failed: 0 };
  const Lbl = ({children}) => <p style={{margin:"0 0 2px",fontSize:12,color:"#9ca3af"}}>{children}</p>;
  const Val = ({children,bold}) => <p style={{margin:0,fontSize:15,fontWeight:bold?700:500,color:"#111827"}}>{children}</p>;
  const NinRow = ({label,count,note,color}) => (
    <div style={{display:"flex",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #f3f4f6"}}>
      <span style={{flex:1,fontSize:14,color:"#374151"}}>{label}</span>
      <span style={{fontWeight:600,fontSize:15,color:color||"#111827",width:40,textAlign:"right"}}>{count}</span>
      {note && <span style={{fontSize:13,color:"#9ca3af",marginLeft:32,width:140,textAlign:"right"}}>{note}</span>}
    </div>
  );
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Ce","Batches",batch.batch,"Draft"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:16,padding:0}}>
        <ChevronLeft/> Back to Draft
      </button>
      <h1 style={{margin:"0 0 20px",fontSize:26,fontWeight:700,color:"#111827"}}>{batch.batch}</h1>

      {/* Info card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,paddingBottom:20,borderBottom:"1px solid #f3f4f6",marginBottom:20}}>
          <div><Lbl>Client</Lbl><Val bold>{batch.client}</Val></div>
          <div><Lbl>Created</Lbl><Val bold>Jan 22, 2026</Val></div>
        </div>
        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="18" height="18"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
              <span style={{fontSize:13,color:"#6b7280"}}>Candidates</span>
            </div>
            <p style={{margin:"0 0 4px",fontSize:32,fontWeight:700,color:"#111827"}}>{candidates}</p>
            <button style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,cursor:"pointer",padding:0,fontWeight:500}}>View Candidates</button>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="18" height="18"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              <span style={{fontSize:13,color:"#6b7280"}}>Services</span>
            </div>
            <p style={{margin:0,fontSize:32,fontWeight:700,color:"#111827"}}>{services}</p>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="18" height="18"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              <span style={{fontSize:13,color:"#6b7280"}}>Total Tasks</span>
            </div>
            <p style={{margin:0,fontSize:32,fontWeight:700,color:"#111827"}}>{totalTasks} tasks</p>
          </div>
        </div>
      </div>

      {/* NIN Verification Status */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 12px",fontWeight:600,fontSize:15,color:"#111827"}}>NIN Verification Status</p>
        <NinRow label="Pending"  count={ninStatus.pending}  note="Links not sent"/>
        <NinRow label="Awaiting" count={ninStatus.awaiting} note="Sent, waiting"/>
        <NinRow label="Verified" count={ninStatus.verified} note="Ready" color="#16a34a"/>
        <NinRow label="Failed"   count={ninStatus.failed}/>
      </div>

      {/* Info banner */}
      <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" width="16" height="16" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <span style={{fontSize:13,color:"#1e40af"}}>All candidate data uploaded. Send NIN+Consent links to start collection. Batch moves to Collection stage.</span>
      </div>

      {/* CTAs */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
        <button style={{padding:"11px 22px",border:"1.5px solid #fca5a5",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#b91c1c",cursor:"pointer"}}>Delete Batch</button>
        <button style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Send Links</button>
      </div>
    </div>
  );
}

export default DraftDetail;
