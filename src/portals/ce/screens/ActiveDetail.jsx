import { ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

function ActiveDetail({ batch, onBack }) {
  const title = batch.batch || "Acme Q4 New Hires - Batch 1";
  const client = batch.client || "Acme Corporation Limited";
  const candidates = 40;
  const services = 8;
  const totalTasks = candidates * services;
  const completedTasks = 142;
  const pendingTasks = totalTasks - completedTasks;
  const pct = Math.round((completedTasks / totalTasks) * 100);

  const SERVICE_PROGRESS = [
    { name: "NIN Verification",                  complete: 40, total: 40 },
    { name: "Pre-screening",                     complete: 40, total: 40 },
    { name: "Employment History Verification",   complete: 28, total: 40 },
    { name: "Education Verification",            complete: 35, total: 40 },
    { name: "Criminal Record Check",             complete: 22, total: 40 },
    { name: "Professional License Verification", complete: 10, total: 40 },
    { name: "Address Verification",              complete: 2,  total: 40 },
    { name: "Reference Check",                   complete: 5,  total: 40 },
  ];

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Ce","Batches","Active"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Active
      </button>

      {/* Header card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:16}}>
        <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#111827"}}>{title}</h1>
        <p style={{margin:"0 0 20px",fontSize:13,fontWeight:600,color:"#6b7280",letterSpacing:.5,textTransform:"uppercase"}}>{client}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,borderTop:"1px solid #f3f4f6",paddingTop:20}}>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#9ca3af"}}>Total Tasks</p>
            <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{totalTasks} tasks ({candidates} candidates)</p>
          </div>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#9ca3af"}}>Days Active</p>
            <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{batch.days || 508} days</p>
          </div>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,color:"#9ca3af"}}>Status</p>
            <span style={{display:"inline-block",padding:"4px 12px",background:"#eff6ff",color:"#3b82f6",borderRadius:20,fontSize:12,fontWeight:500,border:"1px solid #bfdbfe"}}>Verifying</span>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 32px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <p style={{margin:0,fontWeight:700,fontSize:16,color:"#111827"}}>Overall Progress</p>
          <span style={{fontSize:22,fontWeight:700,color:"#111827"}}>{pct}%</span>
        </div>
        <div style={{background:"#e5e7eb",borderRadius:8,height:12,overflow:"hidden",marginBottom:10}}>
          <div style={{height:"100%",width:`${pct}%`,background:"#16a34a",borderRadius:8,transition:"width .3s"}}/>
        </div>
        <div style={{display:"flex",gap:24}}>
          <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✓ {completedTasks} tasks completed</span>
          <span style={{fontSize:13,color:"#d97706",fontWeight:500}}>⏳ {pendingTasks} tasks pending</span>
        </div>
      </div>

      {/* Service Breakdown */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:32}}>
        <div style={{padding:"20px 32px",borderBottom:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontWeight:700,fontSize:16,color:"#111827"}}>Service Breakdown</p>
          <p style={{margin:"4px 0 0",fontSize:13,color:"#9ca3af"}}>Verification progress per service</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["Service","Progress","Complete","Pending"].map((h,i)=>(
              <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {SERVICE_PROGRESS.map((s,i)=>{
              const sp = Math.round((s.complete/s.total)*100);
              const pending = s.total - s.complete;
              return (
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#111827",fontWeight:500}}>{s.name}</td>
                  <td style={{padding:"16px 20px",minWidth:160}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{flex:1,background:"#e5e7eb",borderRadius:4,height:8,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${sp}%`,background:sp===100?"#16a34a":"#3b82f6",borderRadius:4}}/>
                      </div>
                      <span style={{fontSize:12,color:"#6b7280",width:32,textAlign:"right"}}>{sp}%</span>
                    </div>
                  </td>
                  <td style={{padding:"16px 20px",fontSize:14,color:"#16a34a",fontWeight:600}}>{s.complete}</td>
                  <td style={{padding:"16px 20px",fontSize:14,color:pending>0?"#d97706":"#16a34a",fontWeight:600}}>{pending}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveDetail;
