function VMDashboard({ pendingEsc, setActiveNav }) {
  const SERVICE_HEALTH = [
    { service:"Employment Reference", active:42, risk:5, late:1, avgDays:4.2, sla:"10d", healthy:false },
    { service:"Guarantor",            active:38, risk:3, late:0, avgDays:3.8, sla:"10d", healthy:true  },
    { service:"Address Verification", active:67, risk:8, late:2, avgDays:5.1, sla:"7d",  healthy:false },
    { service:"WAEC Verification",    active:23, risk:0, late:0, avgDays:2.4, sla:"5d",  healthy:true  },
    { service:"Criminal Record",      active:15, risk:2, late:0, avgDays:8.3, sla:"14d", healthy:true  },
    { service:"NIN",                  active:127,risk:0, late:0, avgDays:0.1, sla:"1d",  healthy:true  },
  ];

  const TEAM_PERF = [
    { vo:"Damilola Adeyemi", completed:12, inProgress:8,  returned:0, onTime:"94%" },
    { vo:"Chinedu Okafor",   completed:15, inProgress:6,  returned:1, onTime:"91%" },
    { vo:"Ngozi Eze",        completed:8,  inProgress:10, returned:0, onTime:"88%" },
    { vo:"Adebayo Fashola",  completed:10, inProgress:4,  returned:2, onTime:"82%" },
  ];

  const ATTENTION_ITEMS = [
    { type:"escalation", icon:"🔴", label:"Escalation", item:"Chidi Nwosu - Discrepancy dispute", age:"2h",  action:"Review →", nav:"Escalation Queue" },
    { type:"escalation", icon:"🔴", label:"Escalation", item:"GTBank batch - Client complaint",   age:"4h",  action:"Review →", nav:"Escalation Queue" },
    { type:"expense",    icon:"💰", label:"Expense",    item:"Tunde Bakare - ₦12,500",            age:"1d",  action:"Approve →",nav:"Expense Approval"  },
    { type:"expense",    icon:"💰", label:"Expense",    item:"Amina Yusuf - ₦8,000",              age:"1d",  action:"Approve →",nav:"Expense Approval"  },
    { type:"sla",        icon:"⚠", label:"SLA Breach", item:"Shell batch - 3 tasks late",         age:"2d",  action:"View →",   nav:"Escalation Queue" },
  ];

  return (
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>Manager Dashboard</h1>
          <span style={{fontSize:14,color:"#6b7280"}}>Thursday, Feb 6, 2026</span>
        </div>

        {/* Top metric cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
          {[
            {label:"ACTIVE BATCHES",c:"#374151",val:47,sub:"12 in Collection"},
            {label:"TASKS TODAY",   c:"#374151",val:312,sub:"89 completed"},
            {label:"AT RISK",       c:"#d97706", val:18, sub:"⚠ needs attention"},
            {label:"ESCALATIONS",   c:"#b91c1c", val:pendingEsc, sub:"🔴 pending", nav:"Escalation Queue"},
          ].map(s=>(
            <div key={s.label} onClick={s.nav?()=>setActiveNav(s.nav):undefined}
              style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px",cursor:s.nav?"pointer":"default"}}
              onMouseEnter={e=>{if(s.nav)e.currentTarget.style.borderColor="#b91c1c";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";}}>
              <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
              <p style={{margin:"0 0 4px",fontSize:30,fontWeight:700,color:s.c}}>{s.val}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Attention items */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:20}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:"#111827"}}>Items Needing Attention</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["TYPE","ITEM","AGE","ACTION"].map(h=>(
                <th key={h} style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {ATTENTION_ITEMS.map((a,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 20px"}}>
                    <span style={{fontSize:13}}>{a.icon} </span>
                    <span style={{fontSize:13,color:"#374151",fontWeight:500}}>{a.label}</span>
                  </td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{a.item}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#6b7280"}}>{a.age}</td>
                  <td style={{padding:"13px 20px"}}>
                    <button onClick={()=>setActiveNav(a.nav)} style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,fontWeight:600,cursor:"pointer",padding:0}}>
                      {a.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Service Health */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:20}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:"#111827"}}>Service Health</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["SERVICE","ACTIVE","AT RISK","LATE","AVG DAYS","SLA","STATUS"].map(h=>(
                <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {SERVICE_HEALTH.map((s,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#111827",fontWeight:500}}>{s.service}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#374151"}}>{s.active}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:s.risk>3?"#d97706":"#374151",fontWeight:s.risk>3?600:400}}>{s.risk}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:s.late>0?"#b91c1c":"#374151",fontWeight:s.late>0?600:400}}>{s.late}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#374151"}}>{s.avgDays}</td>
                  <td style={{padding:"12px 16px",fontSize:13,color:"#6b7280"}}>{s.sla}</td>
                  <td style={{padding:"12px 16px",fontSize:16}}><span style={{color:s.healthy?"#16a34a":"#d97706"}}>{s.healthy?"●":"⚠"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Team Performance */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:"#111827"}}>Team Performance</p>
            <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Today</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["VO","COMPLETED","IN PROGRESS","RETURNED","ON-TIME RATE"].map(h=>(
                <th key={h} style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {TEAM_PERF.map((t,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.vo}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{t.completed}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:"#374151"}}>{t.inProgress}</td>
                  <td style={{padding:"13px 20px",fontSize:13,color:t.returned>1?"#d97706":"#374151",fontWeight:t.returned>1?600:400}}>{t.returned}</td>
                  <td style={{padding:"13px 20px"}}>
                    <span style={{fontSize:13,fontWeight:600,color:parseFloat(t.onTime)>=90?"#15803d":parseFloat(t.onTime)>=85?"#d97706":"#b91c1c"}}>{t.onTime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default VMDashboard;
