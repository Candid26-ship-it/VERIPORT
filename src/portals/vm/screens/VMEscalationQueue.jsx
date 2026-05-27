import EscTypeBadge from "../components/EscTypeBadge.jsx";

function VMEscalationQueue({ escalations, selectedEsc, setSelectedEsc, escDecision, setEscDecision, escNotes, setEscNotes, resolvedEsc, resolveEscalation, pendingEsc, setActiveNav }) {
      const pendingList = escalations.filter(e=>!resolvedEsc.has(e.id));
      const resolvedToday = 2;
      return (
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <button onClick={()=>setActiveNav("Dashboard")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:14,fontWeight:500,padding:0}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Dashboard
            </button>
          </div>
          <h1 style={{margin:"0 0 20px",fontSize:26,fontWeight:700,color:"#111827"}}>Escalation Queue</h1>

          {/* Summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
            {[
              {label:"PENDING",       val:pendingEsc,    c:"#b91c1c"},
              {label:"RESOLVED TODAY",val:resolvedToday, c:"#15803d"},
              {label:"THIS WEEK",     val:11,            c:"#374151"},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:0,fontSize:30,fontWeight:700,color:s.c}}>{s.val}</p>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
            {/* Queue list */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#f9fafb"}}>
                  {["TYPE","ITEM","BY","AGE",""].map(h=>(
                    <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {escalations.map(e=>(
                    <tr key={e.id} onClick={()=>setSelectedEsc(e)}
                      style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:selectedEsc?.id===e.id?"#fef2f2":resolvedEsc.has(e.id)?"#f9fafb":"white"}}
                      onMouseEnter={ev=>{if(selectedEsc?.id!==e.id)ev.currentTarget.style.background="#fafafa";}}
                      onMouseLeave={ev=>{if(selectedEsc?.id!==e.id)ev.currentTarget.style.background=resolvedEsc.has(e.id)?"#f9fafb":"white";}}>
                      <td style={{padding:"11px 14px"}}><EscTypeBadge t={e.type}/></td>
                      <td style={{padding:"11px 14px",fontSize:12,color:resolvedEsc.has(e.id)?"#9ca3af":"#374151",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.item}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{e.escalatedBy}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{e.age}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:resolvedEsc.has(e.id)?"#9ca3af":"#b91c1c",fontWeight:500,whiteSpace:"nowrap"}}>{resolvedEsc.has(e.id)?"✓ Done":"View →"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Escalation detail */}
            {selectedEsc && (
              <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 22px"}}>
                <p style={{margin:"0 0 2px",fontSize:16,fontWeight:700,color:"#111827"}}>{selectedEsc.candidate} — {selectedEsc.service}</p>
                <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Type: <EscTypeBadge t={selectedEsc.type}/> · Escalated by: {selectedEsc.escalatedBy} · {selectedEsc.age} ago</p>

                <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px",marginBottom:14}}>
                  <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VE NOTES</p>
                  <p style={{margin:0,fontSize:13,color:"#374151",lineHeight:1.6}}>{selectedEsc.veNotes}</p>
                </div>

                {selectedEsc.employer!=="—" && (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                    <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                      <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>CANDIDATE DATA</p>
                      <p style={{margin:"0 0 4px",fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Employer:</span> {selectedEsc.employer}</p>
                      <p style={{margin:"0 0 4px",fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Title:</span> {selectedEsc.title}</p>
                      <p style={{margin:0,fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Period:</span> {selectedEsc.candidatePeriod}</p>
                    </div>
                    <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                      <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VERIFICATION RESULT</p>
                      <p style={{margin:"0 0 4px",fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>Outcome:</span> {selectedEsc.outcome}</p>
                      <p style={{margin:0,fontSize:12,color:"#374151"}}><span style={{color:"#6b7280"}}>HR confirmed:</span> {selectedEsc.hrPeriod}</p>
                    </div>
                  </div>
                )}

                {!resolvedEsc.has(selectedEsc.id) && (
                  <div>
                    <div style={{marginBottom:12}}>
                      <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Decision</label>
                      <div style={{position:"relative"}}>
                        <select value={escDecision} onChange={e=>setEscDecision(e.target.value)}
                          style={{width:"100%",padding:"10px 36px 10px 12px",border:`1.5px solid ${!escDecision?"#fecaca":"#d1d5db"}`,borderRadius:8,fontSize:13,color:escDecision?"#374151":"#9ca3af",background:"white",outline:"none",appearance:"none"}}>
                          <option value="">Select decision...</option>
                          <option>Accept as Discrepancy (include in report)</option>
                          <option>Override to Verified (manager discretion)</option>
                          <option>Return to VE (need more info)</option>
                          <option>Contact Client (before finalizing)</option>
                        </select>
                        <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280",fontSize:11}}>▾</span>
                      </div>
                    </div>
                    <div style={{marginBottom:14}}>
                      <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>Manager Notes</label>
                      <textarea value={escNotes} onChange={e=>setEscNotes(e.target.value)} rows={3} placeholder="Add notes..."
                        style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",color:"#374151"}}/>
                    </div>
                    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                      <button style={{padding:"8px 16px",border:"1.5px solid #d1d5db",borderRadius:7,background:"white",color:"#374151",fontSize:13,cursor:"pointer"}}>Cancel</button>
                      <button onClick={()=>{if(escDecision)resolveEscalation(selectedEsc.id);}}
                        style={{padding:"8px 16px",border:"none",borderRadius:7,background:escDecision?"#b91c1c":"#d1d5db",color:"white",fontSize:13,fontWeight:600,cursor:escDecision?"pointer":"not-allowed"}}>
                        Resolve Escalation
                      </button>
                    </div>
                  </div>
                )}
                {resolvedEsc.has(selectedEsc.id) && (
                  <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",gap:8}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>Escalation resolved</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
}

export default VMEscalationQueue;
