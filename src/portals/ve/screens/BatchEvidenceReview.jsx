import OutcomeBadge from "../components/OutcomeBadge.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function BatchEvidenceReview({ activeBatch, setActiveBatch, batchTasks, selectedTask, setSelectedTask, toReview, approved, returned, flagged, canFinish, approveTask, setReturnModal, setFlagModal, approveAll }) {
      const filteredTasks = batchTasks;
      const task = selectedTask ? batchTasks.find(t=>t.id===selectedTask) : batchTasks[0];

      return (
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {/* Back + batch header */}
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <button onClick={()=>{setActiveBatch(null);setSelectedTask(null);}}
              style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:14,fontWeight:500,padding:0}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Batch Review Queue
            </button>
          </div>

          <div style={{marginBottom:20}}>
            <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{activeBatch.client} — {activeBatch.batch}</h1>
            <p style={{margin:0,fontSize:14,color:"#6b7280"}}>{activeBatch.tasks} tasks · Completed: {activeBatch.completed} · CE: Sarah Adeniyi</p>
          </div>

          {/* VE-02 summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
            {[
              {label:"TO REVIEW",  val:toReview,  c:"#3b82f6"},
              {label:"APPROVED",   val:approved,  c:"#16a34a"},
              {label:"RETURNED",   val:returned,  c:"#d97706"},
              {label:"FLAGGED",    val:flagged,   c:"#b91c1c"},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"16px 20px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:0,fontSize:28,fontWeight:700,color:s.c}}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Task list */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#f9fafb"}}>
                {["#","CANDIDATE","SERVICE","OUTCOME","EVIDENCE","STATUS"].map(h=>(
                  <th key={h} style={{padding:"11px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredTasks.map((t,i)=>(
                  <tr key={t.id} onClick={()=>setSelectedTask(t.id)}
                    style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:selectedTask===t.id?"#fef2f2":"white"}}
                    onMouseEnter={e=>{if(selectedTask!==t.id)e.currentTarget.style.background="#fafafa";}}
                    onMouseLeave={e=>{if(selectedTask!==t.id)e.currentTarget.style.background="white";}}>
                    <td style={{padding:"12px 16px",fontSize:13,color:"#6b7280"}}>{i+1}</td>
                    <td style={{padding:"12px 16px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.candidate}</td>
                    <td style={{padding:"12px 16px",fontSize:13,color:"#374151"}}>{t.service}</td>
                    <td style={{padding:"12px 16px"}}><OutcomeBadge o={t.outcome}/></td>
                    <td style={{padding:"12px 16px",fontSize:13,color:"#6b7280"}}>{t.evidence} files</td>
                    <td style={{padding:"12px 16px"}}><StatusBadge s={t.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Task detail panel */}
          {task && (
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
              <div style={{background:"#f9fafb",padding:"14px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <p style={{margin:"0 0 2px",fontSize:16,fontWeight:700,color:"#111827"}}>{task.candidate} — {task.service}</p>
                  <p style={{margin:0,fontSize:13,color:"#6b7280"}}>VO: {task.vo} · Completed: {task.date} · Mode: {task.mode}</p>
                </div>
                <div style={{display:"flex",gap:8}}>
                  {task.status==="Review" && (<>
                    <button onClick={()=>approveTask(task.id)} style={{padding:"8px 16px",border:"none",borderRadius:7,background:"#15803d",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>Approve</button>
                    <button onClick={()=>setReturnModal(task)} style={{padding:"8px 16px",border:"1.5px solid #d1d5db",borderRadius:7,background:"white",color:"#374151",fontWeight:500,fontSize:13,cursor:"pointer"}}>Return</button>
                    <button onClick={()=>setFlagModal(task)} style={{padding:"8px 16px",border:"1.5px solid #fecaca",borderRadius:7,background:"#fef2f2",color:"#b91c1c",fontWeight:500,fontSize:13,cursor:"pointer"}}>Flag</button>
                  </>)}
                  {task.status!=="Review" && <StatusBadge s={task.status}/>}
                </div>
              </div>
              <div style={{padding:"20px 24px"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                    <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>CANDIDATE DATA</p>
                    {task.employer!=="—" && <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Employer:</span> {task.employer}</p>}
                    {task.title!=="—"    && <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Title:</span> {task.title}</p>}
                    {task.period!=="—"   && <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Period:</span> {task.period}</p>}
                    {task.hrEmail!=="—"  && <p style={{margin:0,fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>HR Email:</span> {task.hrEmail}</p>}
                    {task.employer==="—" && <p style={{margin:0,fontSize:13,color:"#9ca3af",fontStyle:"italic"}}>No candidate data for this service type</p>}
                  </div>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px"}}>
                    <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VERIFICATION RESULT</p>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151",display:"flex",alignItems:"center",gap:6}}><span style={{color:"#6b7280"}}>Outcome:</span> <OutcomeBadge o={task.outcome}/></p>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>External Party:</span> {task.extParty}</p>
                    <p style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Response:</span> {task.response}</p>
                    <p style={{margin:0,fontSize:13,color:"#374151"}}><span style={{color:"#6b7280"}}>Response Date:</span> {task.date}</p>
                  </div>
                </div>

                <div style={{marginBottom:16}}>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>EVIDENCE FILES</p>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                    {Array.from({length:task.evidence},(_,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<task.evidence-1?"1px solid #e5e7eb":"none"}}>
                        <span style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#374151"}}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" width="14" height="14"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                          {["HR_Response_SecureLink.pdf","Email_Thread_Screenshot.png","Employment_Letter_Scan.pdf","Supporting_Doc.pdf","Additional_Evidence.jpg","Final_Confirmation.pdf"][i]}
                        </span>
                        <button style={{background:"none",border:"1px solid #d1d5db",borderRadius:5,padding:"3px 10px",fontSize:12,color:"#374151",cursor:"pointer"}}>View</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>VO NOTES</p>
                  <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 14px"}}>
                    <p style={{margin:0,fontSize:13,color:"#374151",lineHeight:1.6}}>{task.voNotes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Finish batch bar */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{toReview > 0 ? `${toReview} task${toReview>1?"s":""} remaining to review` : "All tasks reviewed — batch ready to finish"}</p>
            <div style={{display:"flex",gap:10}}>
              {toReview > 0 && (
                <button onClick={approveAll} style={{padding:"9px 16px",border:"1.5px solid #d1d5db",borderRadius:8,background:"white",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer"}}>Approve All Remaining</button>
              )}
              <button onClick={()=>setActiveBatch(null)} disabled={!canFinish}
                style={{padding:"9px 20px",border:"none",borderRadius:8,background:canFinish?"#b91c1c":"#d1d5db",color:"white",fontSize:13,fontWeight:600,cursor:canFinish?"pointer":"not-allowed"}}>
                Finish Batch
              </button>
            </div>
          </div>
        </div>
      );
}
