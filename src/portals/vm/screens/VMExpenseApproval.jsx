function VMExpenseApproval({ expenses, selectedExp, setSelectedExp, expDecision, setExpDecision, expPartialAmt, setExpPartialAmt, expNotes, setExpNotes, resolvedExp, setResolvedExp, resolveExpense, pendingExp, weeklyTotal, setActiveNav }) {
      const approvedWeek = 14;
      return (
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <button onClick={()=>setActiveNav("Dashboard")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:14,fontWeight:500,padding:0}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Dashboard
            </button>
          </div>
          <h1 style={{margin:"0 0 20px",fontSize:26,fontWeight:700,color:"#111827"}}>Expense Approval</h1>

          {/* Summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
            {[
              {label:"PENDING",         val:pendingExp,  c:"#b91c1c", fmt:String},
              {label:"APPROVED (WEEK)", val:approvedWeek,c:"#15803d", fmt:String},
              {label:"TOTAL (WEEK)",    val:weeklyTotal, c:"#374151", fmt:(v)=>`₦${v.toLocaleString()}`},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:0,fontSize:26,fontWeight:700,color:s.c}}>{s.fmt(s.val)}</p>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
            {/* Expense list */}
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"#f9fafb"}}>
                  {["AGENT","TASK","AMOUNT","DATE",""].map(h=>(
                    <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {expenses.map(e=>(
                    <tr key={e.id} onClick={()=>setSelectedExp(e)}
                      style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:selectedExp?.id===e.id?"#fef2f2":resolvedExp.has(e.id)?"#f9fafb":"white"}}
                      onMouseEnter={ev=>{if(selectedExp?.id!==e.id)ev.currentTarget.style.background="#fafafa";}}
                      onMouseLeave={ev=>{if(selectedExp?.id!==e.id)ev.currentTarget.style.background=resolvedExp.has(e.id)?"#f9fafb":"white";}}>
                      <td style={{padding:"11px 14px",fontSize:13,fontWeight:500,color:resolvedExp.has(e.id)?"#9ca3af":"#111827"}}>{e.agent}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.task}</td>
                      <td style={{padding:"11px 14px",fontSize:13,fontWeight:600,color:e.amount>=10000?"#b91c1c":resolvedExp.has(e.id)?"#9ca3af":"#374151"}}>₦{e.amount.toLocaleString()}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{e.submitted}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:resolvedExp.has(e.id)?"#9ca3af":"#b91c1c",fontWeight:500,whiteSpace:"nowrap"}}>{resolvedExp.has(e.id)?"✓ Done":"Review →"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{padding:"12px 16px",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"flex-end"}}>
                <button onClick={()=>{expenses.filter(e=>e.amount<10000&&!resolvedExp.has(e.id)).forEach(e=>setResolvedExp(p=>new Set([...p,e.id])));}}
                  style={{padding:"8px 16px",border:"none",borderRadius:7,background:"#b91c1c",color:"white",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  Approve All Under ₦10,000
                </button>
              </div>
            </div>

            {/* Expense detail */}
            {selectedExp && (
              <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 22px"}}>
                <p style={{margin:"0 0 2px",fontSize:15,fontWeight:700,color:"#111827"}}>{selectedExp.agent} — {selectedExp.task}</p>
                <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>Task {selectedExp.taskId} · Submitted: {selectedExp.submitted} · {selectedExp.location}</p>

                {/* Breakdown table */}
                <div style={{marginBottom:14}}>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>EXPENSE BREAKDOWN</p>
                  <div style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"}}>
                    <table style={{width:"100%",borderCollapse:"collapse"}}>
                      <thead><tr style={{background:"#f9fafb"}}>
                        {["ITEM","AMOUNT","RECEIPT"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.4}}>{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {selectedExp.items.map((item,i)=>(
                          <tr key={i} style={{borderBottom:i<selectedExp.items.length-1?"1px solid #f3f4f6":"none",background:"white"}}>
                            <td style={{padding:"9px 12px",fontSize:13,color:"#374151"}}>{item.label}</td>
                            <td style={{padding:"9px 12px",fontSize:13,color:"#374151"}}>₦{item.amt.toLocaleString()}</td>
                            <td style={{padding:"9px 12px"}}>{item.receipt?<button style={{background:"none",border:"1px solid #d1d5db",borderRadius:4,padding:"2px 8px",fontSize:11,cursor:"pointer",color:"#374151"}}>View</button>:<span style={{fontSize:12,color:"#9ca3af"}}>—</span>}</td>
                          </tr>
                        ))}
                        <tr style={{background:"#f9fafb",borderTop:"2px solid #e5e7eb"}}>
                          <td style={{padding:"9px 12px",fontSize:13,fontWeight:700,color:"#111827"}}>TOTAL</td>
                          <td style={{padding:"9px 12px",fontSize:13,fontWeight:700,color:"#111827"}}>₦{selectedExp.amount.toLocaleString()}</td>
                          <td/>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Agent notes */}
                <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"10px 12px",marginBottom:14}}>
                  <p style={{margin:"0 0 4px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>AGENT NOTES</p>
                  <p style={{margin:0,fontSize:12,color:"#374151",lineHeight:1.5}}>{selectedExp.agentNotes}</p>
                </div>

                <p style={{margin:"0 0 16px",fontSize:12,color:"#374151"}}>
                  Task Outcome: <span style={{color:"#15803d",fontWeight:600}}>✓ {selectedExp.taskOutcome}</span> · Evidence: {selectedExp.evidenceCount} files
                  <button style={{background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:12,marginLeft:8}}>View Task</button>
                </p>

                {!resolvedExp.has(selectedExp.id) && (
                  <div style={{borderTop:"1px solid #e5e7eb",paddingTop:14}}>
                    <p style={{margin:"0 0 10px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>APPROVAL DECISION</p>
                    <div style={{display:"flex",gap:16,marginBottom:12}}>
                      {["Approve Full","Approve Partial","Reject"].map(opt=>(
                        <label key={opt} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                          <div onClick={()=>setExpDecision(opt)} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${expDecision===opt?"#b91c1c":"#d1d5db"}`,background:"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                            {expDecision===opt&&<div style={{width:7,height:7,borderRadius:"50%",background:"#b91c1c"}}/>}
                          </div>
                          {opt}
                        </label>
                      ))}
                    </div>
                    {expDecision==="Approve Partial" && (
                      <div style={{marginBottom:10}}>
                        <label style={{display:"block",fontSize:12,color:"#374151",marginBottom:4}}>Approved amount: ₦</label>
                        <input value={expPartialAmt} onChange={e=>setExpPartialAmt(e.target.value)} type="number" placeholder="Enter amount..."
                          style={{padding:"8px 12px",border:"1.5px solid #d1d5db",borderRadius:7,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"}}/>
                      </div>
                    )}
                    {(expDecision==="Approve Partial"||expDecision==="Reject") && (
                      <div style={{marginBottom:12}}>
                        <label style={{display:"block",fontSize:12,color:"#374151",marginBottom:4}}>Notes (required)</label>
                        <textarea value={expNotes} onChange={e=>setExpNotes(e.target.value)} rows={3}
                          style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:7,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
                      </div>
                    )}
                    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                      <button style={{padding:"8px 16px",border:"1.5px solid #d1d5db",borderRadius:7,background:"white",color:"#374151",fontSize:12,cursor:"pointer"}}>Cancel</button>
                      <button onClick={()=>resolveExpense(selectedExp.id)}
                        style={{padding:"8px 16px",border:"none",borderRadius:7,background:"#b91c1c",color:"white",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                        Submit Decision
                      </button>
                    </div>
                  </div>
                )}
                {resolvedExp.has(selectedExp.id) && (
                  <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",gap:8}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>Decision submitted</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
}

export default VMExpenseApproval;
