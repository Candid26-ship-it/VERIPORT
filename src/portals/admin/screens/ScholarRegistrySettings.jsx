import { useState } from "react";

function ScholarRegistrySettings() {
  const [freshnessWindow,  setFreshnessWindow]  = useState("6");
  const [delegationCap,    setDelegationCap]    = useState("3");
  const [otpValidity,      setOtpValidity]      = useState("10");
  const [otpRetries,       setOtpRetries]       = useState("3");
  const [otpCooldown,      setOtpCooldown]      = useState("60");
  const [escalDays,        setEscalDays]        = useState(["0","3","5","7","10"]);
  const [priorityOrder,    setPriorityOrder]    = useState(["HOD","Registrar","Deputy Registrar","Dean of Students","VC / Rector"]);
  const [saved,            setSaved]            = useState(false);

  const movePriority = (idx, dir) => {
    const next = [...priorityOrder];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setPriorityOrder(next);
  };

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  const inp = { width:"100%", padding:"9px 12px", border:"1.5px solid #e5e7eb", borderRadius:8, fontSize:14, outline:"none", boxSizing:"border-box", color:"#111827" };
  const lbl = { display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:5 };
  const hint = (text) => <p style={{margin:"4px 0 0",fontSize:12,color:"#9ca3af"}}>{text}</p>;

  const Section = ({title, children}) => (
    <div style={{marginBottom:24}}>
      <p style={{margin:"0 0 14px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>{title}</p>
      {children}
    </div>
  );

  const Field = ({label, hintText, children}) => (
    <div style={{marginBottom:18}}>
      <label style={lbl}>{label}</label>
      {children}
      {hintText && hint(hintText)}
    </div>
  );

  const updateEscalDay = (i, val) => {
    const next = [...escalDays];
    next[i] = val.replace(/\D/g,"");
    setEscalDays(next);
  };

  return (
    <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px 32px",marginBottom:20}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <p style={{margin:0,fontWeight:700,fontSize:15,color:"#111827"}}>SCHOLAR VERIFICATION REGISTRY SETTINGS</p>
          </div>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Configure operational parameters for the VA Registry and Scholar verification execution flow.</p>
        </div>
        <span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:"#f5f3ff",color:"#7c3aed",flexShrink:0}}>Scholar</span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>

        {/* Left column */}
        <div>
          <Section title="VA REGISTRY — FRESHNESS">
            <Field
              label="Named-Person Address Freshness Window"
              hintText="Named-person emails (e.g. j.okafor@institution.edu.ng) are marked Stale after this many months with no verification activity. Role-based emails (e.g. registrar@) do not expire.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={freshnessWindow} onChange={e=>setFreshnessWindow(e.target.value.replace(/\D/g,""))} type="number" min="1" max="24"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>months</span>
              </div>
            </Field>
          </Section>

          <Section title="DELEGATION">
            <Field
              label="Delegation Hop Cap"
              hintText="Maximum number of times a VA can delegate a verification task in a single chain. At this limit, VeriPort pauses and surfaces the task to the VO for review before proceeding.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={delegationCap} onChange={e=>setDelegationCap(e.target.value.replace(/\D/g,""))} type="number" min="1" max="10"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>hops</span>
              </div>
            </Field>
          </Section>

          <Section title="MULTI-VA LOOKUP PRIORITY ORDER">
            <Field
              label="VA Contact Priority"
              hintText="When a task is released to an institution with multiple assigned VAs, the engine contacts them in this order. Drag ↑ ↓ to reorder. HOD is always first for department-level tasks.">
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {priorityOrder.map((role, idx) => (
                  <div key={role} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#f9fafb",border:"1.5px solid #e5e7eb",borderRadius:8}}>
                    <span style={{fontSize:12,fontWeight:700,color:"#9ca3af",width:20,textAlign:"center",flexShrink:0}}>{idx+1}</span>
                    <span style={{flex:1,fontSize:13,fontWeight:500,color:"#111827"}}>{role}</span>
                    <div style={{display:"flex",gap:4}}>
                      <button onClick={()=>movePriority(idx,-1)} disabled={idx===0}
                        style={{width:26,height:26,border:"1.5px solid #e5e7eb",borderRadius:5,background:"white",fontSize:13,cursor:idx===0?"not-allowed":"pointer",color:idx===0?"#d1d5db":"#374151",display:"flex",alignItems:"center",justifyContent:"center"}}>↑</button>
                      <button onClick={()=>movePriority(idx,1)} disabled={idx===priorityOrder.length-1}
                        style={{width:26,height:26,border:"1.5px solid #e5e7eb",borderRadius:5,background:"white",fontSize:13,cursor:idx===priorityOrder.length-1?"not-allowed":"pointer",color:idx===priorityOrder.length-1?"#d1d5db":"#374151",display:"flex",alignItems:"center",justifyContent:"center"}}>↓</button>
                    </div>
                  </div>
                ))}
              </div>
            </Field>
          </Section>

          <Section title="ESCALATION CADENCE">
            <Field
              label="Escalation Days"
              hintText="Days on which an unresponded Scholar verification task is escalated. Day 0 = immediate on assignment. Add up to 5 escalation checkpoints.">
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {escalDays.map((d,i)=>(
                  <div key={i} style={{position:"relative"}}>
                    <input value={d} onChange={e=>updateEscalDay(i,e.target.value)} type="text" maxLength={2}
                      style={{...inp,width:64,textAlign:"center",paddingRight:20}}/>
                    <span style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",fontSize:10,color:"#9ca3af",pointerEvents:"none"}}>d</span>
                  </div>
                ))}
                {escalDays.length < 7 && (
                  <button onClick={()=>setEscalDays(p=>[...p,""])}
                    style={{width:64,padding:"9px 0",border:"1.5px dashed #d1d5db",borderRadius:8,background:"white",fontSize:18,color:"#9ca3af",cursor:"pointer",lineHeight:1}}>+</button>
                )}
              </div>
            </Field>
          </Section>
        </div>

        {/* Right column */}
        <div>
          <Section title="OTP CONFIGURATION">
            <Field
              label="OTP Validity Window"
              hintText="How long a one-time code sent to a VA's institutional email remains valid before expiring. Shorter windows are more secure.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={otpValidity} onChange={e=>setOtpValidity(e.target.value.replace(/\D/g,""))} type="number" min="1" max="60"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>minutes</span>
              </div>
            </Field>

            <Field
              label="OTP Retry Attempts"
              hintText="How many times a VA can request a new OTP before being locked out and needing to contact support.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={otpRetries} onChange={e=>setOtpRetries(e.target.value.replace(/\D/g,""))} type="number" min="1" max="10"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>attempts</span>
              </div>
            </Field>

            <Field
              label="OTP Re-issue Cooldown"
              hintText="Minimum wait time between consecutive OTP requests from the same VA. Prevents request spam.">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input value={otpCooldown} onChange={e=>setOtpCooldown(e.target.value.replace(/\D/g,""))} type="number" min="10" max="300"
                  style={{...inp,width:100}}/>
                <span style={{fontSize:14,color:"#6b7280"}}>seconds</span>
              </div>
            </Field>
          </Section>
        </div>
      </div>

      {/* Current values summary */}
      <div style={{background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:8,padding:"12px 16px",marginBottom:20}}>
        <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#6d28d9"}}>Current configuration summary</p>
        <p style={{margin:0,fontSize:12,color:"#7c3aed",lineHeight:1.8}}>
          Named-person freshness: <strong>{freshnessWindow} months</strong> · Delegation cap: <strong>{delegationCap} hops</strong> · OTP validity: <strong>{otpValidity} mins</strong> · OTP retries: <strong>{otpRetries}</strong> · OTP cooldown: <strong>{otpCooldown}s</strong> · Escalation days: <strong>{escalDays.filter(d=>d!=="").join(", ")}</strong> · Priority: <strong>{priorityOrder.join(" → ")}</strong>
        </p>
      </div>

      {/* Save */}
      <div style={{display:"flex",alignItems:"center",gap:14,justifyContent:"flex-end"}}>
        {saved && <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✓ Settings saved successfully</span>}
        <button onClick={handleSave}
          style={{padding:"10px 28px",border:"none",borderRadius:8,background:"#7c3aed",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
          Save Registry Settings
        </button>
      </div>
    </div>
  );
}

export default ScholarRegistrySettings;
