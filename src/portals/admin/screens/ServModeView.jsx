import { useState } from "react";
import { ChevronDown, ChevronLeft } from "../../../components/Icons.jsx";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

export default function ServModeView({ servform: sfInit, service, onBack }) {
  const [editing, setEditing] = useState(false);
  const [sf, setSf] = useState(sfInit);
  const [voAssignments, setVoAssignments] = useState(sfInit.voAssignments || []);
  const [assignMethod, setAssignMethod] = useState(sfInit.assignMethod || "auto");
  const [slaDays, setSlaDays] = useState(sfInit.slaDays || "10");
  const [warnThreshold, setWarnThreshold] = useState(sfInit.warnThreshold || "70");
  const [escalThreshold, setEscalThreshold] = useState(sfInit.escalThreshold || "90");
  const [escalRecipient, setEscalRecipient] = useState(sfInit.escalRecipient || "Manager");
  const [autoReminders, setAutoReminders] = useState(sfInit.autoReminders || false);
  const [reminders, setReminders] = useState(sfInit.reminders || []);
  const [reminderDay, setReminderDay] = useState("");
  const [reminderTemplate, setReminderTemplate] = useState("");
  const [reqTemplate, setReqTemplate] = useState(sfInit.reqTemplate || "");
  const [nudgeTemplate, setNudgeTemplate] = useState(sfInit.nudgeTemplate || "");
  const [isPrimary, setIsPrimary] = useState(sfInit.primary || false);
  const [execMode, setExecMode] = useState(sfInit.mode || "Email");
  const [sfStatus, setSfStatus] = useState(sfInit.status || "Active");
  // Scholar-specific
  const [skipVAReval, setSkipVAReval] = useState(sfInit.skipVARevalidation || false);
  // Post-VO Progression
  const [postVOFlow, setPostVOFlow] = useState(sfInit.postVOFlow || {reviewVE:false,reviewVM:false,reviewCE:false});

  const inp = {width:"100%",padding:"11px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,boxSizing:"border-box",outline:"none",color:"#111827",background:"white"};
  const lbl = {display:"block",fontWeight:500,fontSize:14,color:"#374151",marginBottom:6};
  const Section = ({title, children}) => (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:16}}>
      <p style={{margin:"0 0 20px",fontWeight:700,fontSize:13,color:"#374151",letterSpacing:.5}}>{title}</p>
      {children}
    </div>
  );
  const Row = ({label, value, children}) => (
    <div style={{display:"flex",gap:8,marginBottom:14}}>
      <span style={{fontSize:14,fontWeight:500,color:"#374151",minWidth:200}}>{label}:</span>
      {children || <span style={{fontSize:14,color:"#111827"}}>{value}</span>}
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Service Catalog", service.name, "ServModes", sf.code]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Back to Service
      </button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <p style={{margin:"0 0 4px",fontSize:13,color:"#6b7280"}}>Service: {service.name.toUpperCase()}</p>
          <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>SERVMODE CONFIGURATION</h1>
        </div>
        {!editing && (
          <button onClick={()=>setEditing(true)} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit ServMode
          </button>
        )}
      </div>

      {/* Basic Configuration */}
      <Section title="BASIC CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>ServMode Code</label>
          <input value={sf.code} readOnly style={{...inp,background:"#f9fafb",color:"#6b7280"}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Auto-generated</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Execution Mode <span style={{color:"#b91c1c"}}>*</span></label>
          {editing ? (
            <div style={{position:"relative"}}>
              <select value={execMode} onChange={e=>setExecMode(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
              {["Email","Letter","Field Agent","API","Portal"].map(m=><option key={m}>{m}</option>)}
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
          ) : (
            <input value={execMode} readOnly style={{...inp,background:"#f9fafb"}}/>
          )}
        </div>
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div onClick={()=>{if(editing)setIsPrimary(p=>!p);}} style={{width:18,height:18,borderRadius:4,border:`2px solid ${isPrimary?"#b91c1c":"#d1d5db"}`,background:isPrimary?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
              {isPrimary && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <label style={{fontSize:14,fontWeight:500,color:"#374151",cursor:editing?"pointer":"default"}} onClick={()=>{if(editing)setIsPrimary(p=>!p);}}>Primary ServMode</label>
          </div>
          <p style={{margin:"4px 0 0 28px",fontSize:12,color:"#6b7280"}}>Primary ServMode receives new tasks. Only one ServMode per service can be primary.</p>
          {isPrimary && editing && <div style={{marginTop:8,padding:"10px 14px",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,fontSize:13,color:"#92400e"}}>⚑ Setting this as primary will replace the existing primary ServMode.</div>}
        </div>
        <div>
          <label style={lbl}>Status <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:24}}>
            {["Active","Inactive"].map(s=>(
              <label key={s} style={{display:"flex",alignItems:"center",gap:8,cursor:editing?"pointer":"default",fontSize:14,color:"#374151"}}>
                <div onClick={()=>{if(editing)setSfStatus(s);}} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sfStatus===s?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
                  {sfStatus===s && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {s}
              </label>
            ))}
          </div>
        </div>
      </Section>

      {/* SLA Configuration */}
      <Section title="SLA CONFIGURATION">
        <div style={{marginBottom:16}}>
          <label style={lbl}>SLA Duration (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={slaDays} onChange={e=>{if(editing)setSlaDays(e.target.value);}} readOnly={!editing} type="number"
            style={{...inp,background:editing?"white":"#f9fafb",width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>SLA applies from the moment verification begins.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Warning Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={warnThreshold} onChange={e=>{if(editing)setWarnThreshold(e.target.value);}} readOnly={!editing} type="number"
            style={{...inp,background:editing?"white":"#f9fafb",width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Warn after this many days with no update. Must be less than SLA duration.</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Escalation Threshold (days) <span style={{color:"#b91c1c"}}>*</span></label>
          <input value={escalThreshold} onChange={e=>{if(editing)setEscalThreshold(e.target.value);}} readOnly={!editing} type="number"
            style={{...inp,background:editing?"white":"#f9fafb",width:120}}/>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>Escalate after this many days. Must be greater than warning threshold.</p>
        </div>
        <div>
          <label style={lbl}>Escalation Recipient <span style={{color:"#b91c1c"}}>*</span></label>
          {editing ? (
            <div style={{position:"relative",maxWidth:300}}>
              <select value={escalRecipient} onChange={e=>setEscalRecipient(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                {["Manager","Executive","Admin"].map(r=><option key={r}>{r}</option>)}
              </select>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
            </div>
          ) : (
            <input value={escalRecipient} readOnly style={{...inp,background:"#f9fafb",maxWidth:300}}/>
          )}
        </div>
      </Section>

      {/* Auto-Reminder Schedule */}
      <Section title="AUTO-REMINDER SCHEDULE">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div onClick={()=>{if(editing)setAutoReminders(p=>!p);}} style={{width:18,height:18,borderRadius:4,border:`2px solid ${autoReminders?"#b91c1c":"#d1d5db"}`,background:autoReminders?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
            {autoReminders && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
          </div>
          <label style={{fontSize:14,fontWeight:500,color:"#374151",cursor:editing?"pointer":"default"}} onClick={()=>{if(editing)setAutoReminders(p=>!p);}}>Enable Auto-Reminders</label>
        </div>
        {autoReminders && (<>
          <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:12}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#fafafa"}}>
                <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>DAY OFFSET</th>
                <th style={{padding:"10px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>TEMPLATE</th>
                {editing && <th style={{width:40,borderBottom:"1px solid #e5e7eb"}}></th>}
              </tr></thead>
              <tbody>
                {reminders.map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.day}</td>
                    <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.template}</td>
                    {editing && <td style={{padding:"12px 16px",textAlign:"center"}}>
                      <button onClick={()=>setReminders(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:16,lineHeight:1}}>×</button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editing && (
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
                <button onClick={()=>{if(reminderDay&&reminderTemplate){setReminders(p=>[...p,{day:reminderDay,template:reminderTemplate}]);setReminderDay("");setReminderTemplate("");}}}
                  style={{padding:"9px 18px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button>
              </div>
            </div>
          )}
        </>)}
      </Section>

      {/* Communication Templates */}
      <Section title="COMMUNICATION TEMPLATES">
        <div style={{marginBottom:16}}>
          <label style={lbl}>Request Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {editing ? (
              <div style={{position:"relative",flex:1}}>
                <select value={reqTemplate} onChange={e=>setReqTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                  <option>Employment Reference - Email Request</option>
                  <option>Employment Reference - Phone Request</option>
                  <option>Employment Reference - Field Request</option>
                  <option>Standard - Email Request</option>
                </select>
                <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
            ) : (
              <input value={reqTemplate} readOnly style={{...inp,background:"#f9fafb",flex:1}}/>
            )}
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
        <div>
          <label style={lbl}>Candidate Nudge Template <span style={{color:"#b91c1c"}}>*</span></label>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {editing ? (
              <div style={{position:"relative",flex:1}}>
                <select value={nudgeTemplate} onChange={e=>setNudgeTemplate(e.target.value)} style={{...inp,appearance:"none",paddingRight:36}}>
                  <option>Employment Reference - Nudge</option>
                  <option>Standard - Nudge</option>
                </select>
                <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
              </div>
            ) : (
              <input value={nudgeTemplate} readOnly style={{...inp,background:"#f9fafb",flex:1}}/>
            )}
            <button style={{padding:"9px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>Preview</button>
          </div>
        </div>
      </Section>

      {/* VO Assignment — only Name + Assigned */}
      <Section title="VERIFICATION OFFICER (VO) ASSIGNMENT">
        <div style={{marginBottom:16}}>
          <label style={lbl}>Assignment Method</label>
          <div style={{display:"flex",gap:24}}>
            {["manual","auto"].map(m=>(
              <label key={m} style={{display:"flex",alignItems:"center",gap:8,cursor:editing?"pointer":"default",fontSize:14,color:"#374151"}}>
                <div onClick={()=>{if(editing)setAssignMethod(m);}} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${assignMethod===m?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default"}}>
                  {assignMethod===m && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {m==="manual"?"Manual":"Auto (Load Balanced / Geo)"}
              </label>
            ))}
          </div>
        </div>
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
                    <div onClick={()=>{if(editing)setVoAssignments(p=>p.map((v,j)=>j===i?{...v,assigned:!v.assigned}:v));}}
                      style={{width:18,height:18,borderRadius:4,border:`2px solid ${vo.assigned?"#b91c1c":"#d1d5db"}`,background:vo.assigned?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default",marginLeft:"auto"}}>
                      {vo.assigned && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Tasks are distributed based on selected assignment method.</p>
      </Section>

      {/* Skip VA Revalidation — Scholar only */}
      {sfInit.mode==="Scholar" && (
        <Section title="SCHOLAR SETTINGS">
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",paddingBottom:8}}>
            <div style={{paddingRight:24}}>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:"#111827"}}>Skip VA Revalidation</p>
              <p style={{margin:0,fontSize:13,color:"#6b7280"}}>When enabled, departments sourced from the VA Registry bypass the Revalidation step and proceed directly to Confirmed.</p>
            </div>
            <div onClick={()=>{if(editing)setSkipVAReval(p=>!p);}}
              style={{width:20,height:20,borderRadius:4,border:`2px solid ${skipVAReval?"#b91c1c":"#d1d5db"}`,background:skipVAReval?"#b91c1c":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default",flexShrink:0,marginTop:2}}>
              {skipVAReval && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="12" height="12"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
          </div>
        </Section>
      )}

      {/* Post-VO Progression Path */}
      <Section title="POST-VO PROGRESSION PATH">
        <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Configure the review stages work passes through after VO completes verification. Route always starts with VO and ends with Client.</p>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <div style={{padding:"8px 16px",background:"#1e3a5f",color:"white",borderRadius:8,fontSize:13,fontWeight:600}}>VO</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
          <div onClick={()=>{if(editing)setPostVOFlow(p=>({...p,reviewVE:!p.reviewVE}));}}
            style={{padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:editing?"pointer":"default",border:`2px solid ${postVOFlow.reviewVE?"#b91c1c":"#e5e7eb"}`,background:postVOFlow.reviewVE?"#fef2f2":"#f9fafb",color:postVOFlow.reviewVE?"#b91c1c":"#9ca3af"}}>
            VE {postVOFlow.reviewVE?"✓":"○"}
          </div>
          {postVOFlow.reviewVE && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>}
          <div onClick={()=>{if(editing)setPostVOFlow(p=>({...p,reviewVM:!p.reviewVM}));}}
            style={{padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:editing?"pointer":"default",border:`2px solid ${postVOFlow.reviewVM?"#b91c1c":"#e5e7eb"}`,background:postVOFlow.reviewVM?"#fef2f2":"#f9fafb",color:postVOFlow.reviewVM?"#b91c1c":"#9ca3af"}}>
            VM {postVOFlow.reviewVM?"✓":"○"}
          </div>
          {postVOFlow.reviewVM && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>}
          <div onClick={()=>{if(editing)setPostVOFlow(p=>({...p,reviewCE:!p.reviewCE}));}}
            style={{padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:editing?"pointer":"default",border:`2px solid ${postVOFlow.reviewCE?"#b91c1c":"#e5e7eb"}`,background:postVOFlow.reviewCE?"#fef2f2":"#f9fafb",color:postVOFlow.reviewCE?"#b91c1c":"#9ca3af"}}>
            CE {postVOFlow.reviewCE?"✓":"○"}
          </div>
          {postVOFlow.reviewCE && <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>}
          <div style={{padding:"8px 16px",background:"#1e3a5f",color:"white",borderRadius:8,fontSize:13,fontWeight:600}}>Client</div>
        </div>
        {!editing && <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af"}}>Click Edit ServMode to configure the progression path.</p>}
        {editing  && <p style={{margin:"12px 0 0",fontSize:12,color:"#6b7280"}}>ⓘ Toggle stages on/off. Enabled stages appear in route order: VO → VE → VM → CE → Client.</p>}
      </Section>

      {/* Footer */}
      {editing && (
        <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingBottom:32}}>
          <button onClick={()=>setEditing(false)} style={{padding:"11px 28px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>setEditing(false)} style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save</button>
          <button style={{padding:"11px 28px",border:"none",borderRadius:8,background:"#1e3a5f",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>Save & Activate</button>
        </div>
      )}
    </div>
  );
}
