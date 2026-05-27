import { ChevronRight } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { AGENTS } from "../data.js";

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

export default FieldAgents;
