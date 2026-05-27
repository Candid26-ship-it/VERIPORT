import { ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

function CollectionDetail({ batch, onBack }) {
  const parts = (batch.received||"32 / 48").split("/");
  const recv = parseInt(parts[0].trim());
  const total = parseInt(parts[1].trim());
  const pct = Math.round((recv/total)*100);
  const daysLeft = typeof batch.days === "string" ? parseInt(batch.days.split("/")[0]) : 5;

  const SBRow = ({icon, label, note, count, color}) => (
    <div style={{display:"flex",alignItems:"center",padding:"13px 0",borderBottom:"1px solid #f3f4f6"}}>
      <div style={{width:22,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,flexShrink:0}}>
        {icon}
      </div>
      <span style={{flex:1,fontSize:14,color:"#374151"}}>{label}</span>
      {note && <span style={{fontSize:13,color:"#9ca3af",marginRight:24}}>{note}</span>}
      <span style={{fontWeight:600,fontSize:14,color:color||"#111827",minWidth:24,textAlign:"right"}}>{count}</span>
    </div>
  );
  const TRow = ({label,value,bold}) => (
    <div style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid #f3f4f6"}}>
      <span style={{fontSize:14,color:"#6b7280"}}>{label}</span>
      <span style={{fontSize:14,fontWeight:bold?600:400,color:"#111827"}}>{value}</span>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Ce","Batches",batch.batch,"Collection"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:16,padding:0}}>
        <ChevronLeft/> Back to Collection
      </button>

      {/* Header card: client + title + stat cards + CTAs */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontSize:12,fontWeight:600,color:"#374151",letterSpacing:.5}}>{batch.client.toUpperCase()}</p>
        <h1 style={{margin:"0 0 20px",fontSize:24,fontWeight:700,color:"#111827"}}>{batch.batch}</h1>

        {/* 3 stat cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20}}>
          <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 20px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>CANDIDATES</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:"#111827"}}>{total}</p>
          </div>
          <div style={{border:"1px solid #bbf7d0",borderRadius:10,padding:"16px 20px",background:"#f0fdf4"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#16a34a",letterSpacing:.5}}>NIN VERIFIED</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:"#16a34a"}}>{recv}/{total}</p>
          </div>
          <div style={{border:"1px solid #fde68a",borderRadius:10,padding:"16px 20px",background:"#fffbeb"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#d97706",letterSpacing:.5}}>DAYS LEFT</p>
            <p style={{margin:0,fontSize:28,fontWeight:700,color:"#d97706"}}>{daysLeft}</p>
          </div>
        </div>

        {/* CTAs — at top as requested */}
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>View Candidates</button>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>Add Candidates</button>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>Send Reminder</button>
          <button style={{flex:1,padding:"11px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",textAlign:"center"}}>Extend Deadline</button>
          <button style={{flex:"0 0 auto",padding:"11px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:13,fontWeight:600,color:"white",cursor:"pointer"}}>Close Collection</button>
        </div>
      </div>

      {/* Collection Progress */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 12px",fontWeight:600,fontSize:15,color:"#111827"}}>Collection Progress</p>
        <p style={{margin:"0 0 8px",fontSize:14,color:"#374151"}}>{recv}/{total} ({pct}%)</p>
        <div style={{background:"#f3f4f6",borderRadius:8,height:12,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:"#16a34a",borderRadius:8,transition:"width .3s"}}/>
        </div>
      </div>

      {/* Gates */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:600,fontSize:15,color:"#111827"}}>Gates</p>
        <SBRow label="Submitted"      count={6}  icon={<div style={{width:8,height:8,borderRadius:"50%",background:"#e5e7eb"}}/>}/>
        <SBRow label="Pre-Screen (0 review)" count={0} color="#3b82f6"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>}/>
        <SBRow label="Ready for Active" count={15} icon={<div style={{width:8,height:8,borderRadius:"50%",background:"#e5e7eb"}}/>}/>
      </div>

      {/* Status Breakdown */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:600,fontSize:15,color:"#111827"}}>Status Breakdown</p>
        <SBRow label="Collected"          count={15} color="#16a34a"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10" stroke="#16a34a"/><path d="M9 12l2 2 4-4"/></svg>}/>
        <SBRow label="Awaiting NIN"       count={6}  icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Awaiting delivery"  count={6}  icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Delivered"          count={6}  note="Email delivered, not opened"
          icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Opened"             count={6}  note="Opened email, no action yet"
          icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Engaged"            count={6}  note="Started form, not complete"
          icon={<div style={{width:12,height:12,borderRadius:"50%",border:"2px solid #d1d5db"}}/>}/>
        <SBRow label="Bounced"            count={1}  note="Email could not be delivered" color="#d97706"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>}/>
        <SBRow label="Expired"            count={1}  note="Link expired before completion" color="#d97706"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="14" height="14"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>}/>
        <SBRow label="Failed"             count={1}  note="NIN verification failed" color="#dc2626"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg>}/>
        <div style={{display:"flex",justifyContent:"space-between",padding:"13px 0 0"}}>
          <span style={{fontSize:14,fontWeight:600,color:"#374151"}}>Total</span>
          <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{total}</span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontWeight:600,fontSize:15,color:"#111827"}}>Timeline</p>
        <TRow label="Links Sent"          value="Jan 15, 2024 10:00 AM"/>
        <TRow label="Submission Deadline" value="Feb 6, 2024 (5 days left)" bold/>
        <TRow label="Link Expiry"         value="Feb 13, 2024"/>
        <TRow label="Next Reminder"       value="Tomorrow (Day 4)" bold/>
      </div>

      {/* Tasks */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"22px 28px",marginBottom:16}}>
        <TRow label="Tasks"  value={`384 tasks (${total} candidates)`}/>
      </div>

      {/* Attention banner */}
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"14px 18px",marginBottom:32,display:"flex",alignItems:"flex-start",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" width="16" height="16" style={{flexShrink:0,marginTop:2}}><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        <span style={{fontSize:13,color:"#92400e"}}><strong>2 candidates need attention:</strong> 1 expired + 1 bounced. CE should click [View Candidates] and filter by status to address these issues.</span>
      </div>
    </div>
  );
}

export default CollectionDetail;
