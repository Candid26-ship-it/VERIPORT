import { VE_TASKS_BASE } from "../data.js";

export default function BatchReviewQueue({ search, setSearch, filteredBatches, batches, setActiveBatch, setSelectedTask }) {
      const pendingReview = 12;
      const reviewedToday = 8;
      const returnedCount = 1;
      return (
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>Batch Review Queue</h1>
            <span style={{fontSize:14,color:"#6b7280"}}>Thursday, Feb 6</span>
          </div>

          {/* Summary cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
            {[
              {label:"PENDING REVIEW",  val:pendingReview, c:"#b91c1c",   sub:null},
              {label:"REVIEWED TODAY",  val:reviewedToday, c:"#15803d",   sub:null},
              {label:"RETURNED",        val:returnedCount, c:"#d97706",   sub:"needs rework"},
            ].map(s=>(
              <div key={s.label} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px"}}>
                <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.6}}>{s.label}</p>
                <p style={{margin:"0 0 4px",fontSize:30,fontWeight:700,color:s.c}}>{s.val}</p>
                {s.sub && <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{s.sub}</p>}
              </div>
            ))}
          </div>

          {/* Search / filter row */}
          <div style={{display:"flex",gap:12,marginBottom:16}}>
            <div style={{flex:1,position:"relative"}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search clients or batches..."
                style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"9px 14px",fontSize:13,color:"#374151",cursor:"pointer",background:"white",minWidth:130,justifyContent:"space-between"}}>
              All Clients <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"9px 14px",fontSize:13,color:"#374151",cursor:"pointer",background:"white",minWidth:140,justifyContent:"space-between"}}>
              Oldest First <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>

          {/* Batch table */}
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:12}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#f9fafb"}}>
                {["CLIENT","BATCH","TASKS","COMPLETED","AGE",""].map(h=>(
                  <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredBatches.map((b,i)=>(
                  <tr key={b.id} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <td style={{padding:"14px 20px",fontSize:14,color:"#111827",fontWeight:500}}>
                      {b.warning && <span style={{marginRight:6,color:"#d97706"}}>⚠</span>}
                      {b.client}
                    </td>
                    <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.batch}</td>
                    <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.tasks}</td>
                    <td style={{padding:"14px 20px",fontSize:13,color:"#374151"}}>{b.completed}</td>
                    <td style={{padding:"14px 20px",fontSize:13}}>
                      <span style={{color:b.age>=3?"#b91c1c":b.age>=2?"#d97706":"#374151",fontWeight:b.age>=3?600:400}}>{b.age}d{b.age>=3?" ⚠":""}</span>
                    </td>
                    <td style={{padding:"14px 20px"}}>
                      <button onClick={()=>{setActiveBatch(b);setSelectedTask(VE_TASKS_BASE[0].id);}}
                        style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",border:"none",borderRadius:7,background:"#b91c1c",color:"white",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                        Review →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBatches.some(b=>b.age>=3) && (
            <p style={{fontSize:13,color:"#d97706",margin:"0 0 8px",display:"flex",alignItems:"center",gap:6}}>⚠ Batches older than 3 days need priority attention</p>
          )}
          <p style={{fontSize:13,color:"#9ca3af",margin:0}}>Showing {filteredBatches.length} of {batches.length} batches pending review</p>
        </div>
      );
}
