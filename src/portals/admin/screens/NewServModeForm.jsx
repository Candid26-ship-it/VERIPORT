import { useState } from "react";
import { ChevronDown, ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

export default function NewServModeForm({ service, onSave, onCancel }) {
  const inp = {width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,boxSizing:"border-box",outline:"none",color:"#111827",background:"white"};
  const lbl = {display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6};
  const Section = ({title,children}) => (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
      <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>{title}</p>
      {children}
    </div>
  );
  const Rad = ({value,current,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={()=>onChange(value)} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${current===value?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
        {current===value && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
      </div>
      {label}
    </label>
  );
  const CBx = ({checked,onChange,label}) => (
    <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:14,color:"#374151"}}>
      <div onClick={onChange} style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked?"#b91c1c":"#d1d5db"}`,background:checked?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
        {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
      </div>
      {label}
    </label>
  );

  const [execMode, setExecMode] = useState("Email");
  const [emailDispatch, setEmailDispatch] = useState("Yes");
  const [isPrimary, setIsPrimary] = useState(false);
  const [sfStatus, setSfStatus] = useState("Active");
  const [slaDays, setSlaDays] = useState("10");
  const [warnThreshold, setWarnThreshold] = useState("70");
  const [escalThreshold, setEscalThreshold] = useState("90");
  const [escalRecipient, setEscalRecipient] = useState("Manager");
  const [autoReminders, setAutoReminders] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminderDay, setReminderDay] = useState("");
  const [reminderTemplate, setReminderTemplate] = useState("");
  const [reqTemplate, setReqTemplate] = useState("");
  const [nudgeTemplate, setNudgeTemplate] = useState("");
  const [voAssignments, setVoAssignments] = useState([
    {name:"Mike Obi",    assigned:false},
    {name:"Ada Nwosu",   assigned:false},
    {name:"Emeka Udo",   assigned:false},
    {name:"Fatima Bello",assigned:false},
    {name:"Chidi Okeke", assigned:false},
  ]);
  const [skipVAReval, setSkipVAReval] = useState(false);
  const [reviewVE, setReviewVE] = useState(false);
  const [reviewVM, setReviewVM] = useState(false);
  const [reviewCE, setReviewCE] = useState(false);

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Service Catalog", service?.name || "Service", "ServModes", "New"]}/>
      <button onClick={onCancel} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Service
      </button>
      <div style={{marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontSize:13,color:"#6b7280"}}>Service: {(service?.name||"").toUpperCase()}</p>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>NEW SERVMODE</h1>
      </div>

      {/* Basic Configuration */}
      <Section title="BASIC CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>ServMode Code</label>
          <input value="Auto-generated" readOnly style={{...inp,background:"#f9fafb",color:"#9ca3af"}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Auto-generated upon save</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Execution Mode <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{position:"relative"}}>
            <select value={execMode} onChange={e=>setExecMode(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              {["Email","Letter","Field Agent","API","Portal"].map(m=><option key={m}>{m}</option>)}
            </select>
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
          </div>
        </div>
        {execMode==="Email" && (
          <div style={{marginBottom:16}}>
            <label style={lbl}>Automatic Email Dispatch</label>
            <div style={{display:"flex",gap:24,marginTop:4}}>
              <Rad value="Yes" current={emailDispatch} onChange={setEmailDispatch} label="Yes"/>
              <Rad value="No"  current={emailDispatch} onChange={setEmailDispatch} label="No"/>
            </div>
            <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af"}}>{emailDispatch==="Yes"?"Emails are sent automatically when tasks are assigned.":"Emails require manual review and approval before sending."}</p>
          </div>
        )}
        <div style={{marginBottom:16}}>
          <CBx checked={isPrimary} onChange={()=>setIsPrimary(p=>!p)} label="Primary ServMode"/>
          <p style={{margin:"4px 0 0 26px",fontSize:12,color:"#6b7280"}}>Primary ServMode receives new tasks. Only one ServMode per service can be primary.</p>
          {isPrimary && <div style={{marginTop:8,padding:"10px 14px",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,fontSize:13,color:"#92400e"}}>⚑ Setting this as primary will replace the existing primary ServMode.</div>}
        </div>
        <div>
          <label style={lbl}>Status <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:24}}>
            <Rad value="Active"   current={sfStatus} onChange={setSfStatus} label="Active"/>
            <Rad value="Inactive" current={sfStatus} onChange={setSfStatus} label="Inactive"/>
          </div>
        </div>
      </Section>

      {/* SLA Configuration */}
      <Section title="SLA CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>SLA Duration (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={slaDays} onChange={e=>setSlaDays(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>SLA applies from the moment verification begins.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Warning Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={warnThreshold} onChange={e=>setWarnThreshold(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Warn after this many days with no update. Must be less than SLA duration.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Escalation Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={escalThreshold} onChange={e=>setEscalThreshold(e.target.value)} type="number" style={{...inp,width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Escalate after this many days. Must be greater than warning threshold.</p>
        </div>
      </Section>

      {/* Auto-Reminder Schedule */}
      <Section title="AUTO-REMINDER SCHEDULE">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <CBx checked={autoReminders} onChange={()=>setAutoReminders(p=>!p)} label="Enable Auto-Reminders"/>
        </div>
        {autoReminders && (<>
          {reminders.length > 0 && (
            <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:12}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#fafafa"}}>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>DAY OFFSET</th>
                  <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>TEMPLATE</th>
                  <th style={{width:40,borderBottom:"1px solid #e5e7eb"}}></th>
                </tr></thead>
                <tbody>
                  {reminders.map((r,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                      <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.day}</td>
                      <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.template}</td>
                      <td style={{padding:"12px 16px",textAlign:"center"}}>
                        <button onClick={()=>setReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"14px 16px"}}>
            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:"#374151"}}>+ Add Reminder</p>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={reminderDay} onChange={e=>setReminderDay(e.target.value)} placeholder="Day offset"
                style={{width:120,padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
              <div style={{position:"relative",flex:1}}>
                <select value={reminderTemplate} onChange={e=>setReminderTemplate(e.target.value)}
                  style={{width:"100%",padding:"9px 32px 9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",color:"#111827",appearance:"none",background:"white"}}>
                  <option value="">Select template...</option>
                  <option>Reminder - Day 3</option><option>Reminder - Day 7</option><option>Reminder - Day 14</option>
                </select>
                <span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
              <button onClick={()=>{if(reminderDay&&reminderTemplate){setReminders(p=>[...p,{day:`Day ${reminderDay}`,template:reminderTemplate}]);setReminderDay("");setReminderTemplate("");}}}
                style={{padding:"9px 18px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button>
            </div>
          </div>
        </>)}
      </Section>

      {/* Communication Templates */}
      <Section title="COMMUNICATION TEMPLATES">
        <div style={{marginBottom:16}}>
          <label style={lbl}>Request Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={reqTemplate} onChange={e=>setReqTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Email Request</option>
                <option>Employment Reference - Phone Request</option>
                <option>Employment Reference - Field Request</option>
                <option>Standard - Email Request</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
        <div>
          <label style={lbl}>Candidate Nudge Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <select value={nudgeTemplate} onChange={e=>setNudgeTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                <option value="">Select template...</option>
                <option>Employment Reference - Nudge</option>
                <option>Standard - Nudge</option>
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
      </Section>

      {/* VO Assignment */}
      <Section title="VERIFICATION OFFICER (VO) ASSIGNMENT">
        <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:10}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              <th style={{padding:"10px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>VO NAME</th>
              <th style={{padding:"10px 20px",textAlign:"right",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,width:100}}>ASSIGNED</th>
            </tr></thead>
            <tbody>
              {voAssignments.map((vo,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"13px 20px",fontSize:14,color:"#111827"}}>{vo.name}</td>
                  <td style={{padding:"13px 20px",textAlign:"right"}}>
                    <div onClick={()=>setVoAssignments(p=>p.map((v,j)=>j===i?{...v,assigned:!v.assigned}:v))}
                      style={{width:18,height:18,borderRadius:4,border:`2px solid ${vo.assigned?"#b91c1c":"#d1d5db"}`,background:vo.assigned?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginLeft:"auto"}}>
                      {vo.assigned && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Tick the checkbox to assign a VO officer to this ServMode.</p>
      </Section>

      {/* VA Registry Settings — Education/Scholar only */}
      {(service?.category === "Education" || service?.category === "Scholar" || service?.mode === "Scholar") && (
      <Section title="VA REGISTRY SETTINGS">
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:24}}>
          <div style={{flex:1}}>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#374151"}}>Skip VA Revalidation</p>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>When enabled, authorities sourced from the VA Registry bypass the Revalidation step and move directly to Confirmed.</p>
          </div>
          <div onClick={()=>setSkipVAReval(p=>!p)}
            style={{width:44,height:24,borderRadius:12,background:skipVAReval?"#b91c1c":"#d1d5db",cursor:"pointer",flexShrink:0,position:"relative",transition:"background .15s",marginTop:2}}>
            <div style={{position:"absolute",top:3,left:skipVAReval?23:3,width:18,height:18,borderRadius:"50%",background:"white",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",transition:"left .15s"}}/>
          </div>
        </div>
      </Section>
      )}

      {/* Post-VO Progression Path */}
      <Section title="POST-VO PROGRESSION PATH">
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Configure the review stages work passes through after VO completes verification. Route always starts with VO and ends with Client.</p>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          {/* Fixed: VO */}
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>VO</span>
          </div>
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          {/* Toggle: VE */}
          <div onClick={()=>setReviewVE(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:reviewVE?"#eff6ff":"#f9fafb",border:`1.5px solid ${reviewVE?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
            {reviewVE && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
            <span style={{fontSize:13,fontWeight:500,color:reviewVE?"#1d4ed8":"#6b7280"}}>VE</span>
          </div>
          {reviewVE && <span style={{color:"#9ca3af",fontSize:16}}>→</span>}
          {/* Toggle: VM */}
          <div onClick={()=>setReviewVM(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:reviewVM?"#eff6ff":"#f9fafb",border:`1.5px solid ${reviewVM?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
            {reviewVM && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
            <span style={{fontSize:13,fontWeight:500,color:reviewVM?"#1d4ed8":"#6b7280"}}>VM</span>
          </div>
          {reviewVM && <span style={{color:"#9ca3af",fontSize:16}}>→</span>}
          {/* Toggle: CE */}
          <div onClick={()=>setReviewCE(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:reviewCE?"#eff6ff":"#f9fafb",border:`1.5px solid ${reviewCE?"#3b82f6":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
            {reviewCE && <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>}
            <span style={{fontSize:13,fontWeight:500,color:reviewCE?"#1d4ed8":"#6b7280"}}>CE</span>
          </div>
          <span style={{color:"#9ca3af",fontSize:16}}>→</span>
          {/* Fixed: Client */}
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="14" height="14"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>Client</span>
          </div>
        </div>
        <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af"}}>Click VE, VM, or CE to include or exclude that review stage. VO and Client are always fixed.</p>
      </Section>

      {/* Footer */}
      <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingBottom:32}}>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
        <button onClick={onCancel} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Save as Draft</button>
        <button onClick={onSave} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save ServMode</button>
      </div>
    </div>
  );
}
