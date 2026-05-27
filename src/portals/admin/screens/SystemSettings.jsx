import { useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

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

export default SystemSettings;
