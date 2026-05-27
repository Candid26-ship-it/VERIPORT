import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { INTEGRATIONS } from "../data.js";

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

export default Integrations;
