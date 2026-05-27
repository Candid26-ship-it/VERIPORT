import { useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { LGA_DATA, NIGERIA_STATES, STATE_SUMMARY } from "../data.js";

function CoverageAreas({ onBack }) {
  const [selectedState, setSelectedState] = useState("Lagos");
  const lgas = LGA_DATA[selectedState] || [];
  const uncovered = lgas.filter(l=>!l.agent).length;

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Field Agents","Coverage"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#374151",cursor:"pointer",fontSize:14,fontWeight:500,padding:"0 0 16px",marginBottom:4}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Field Agents
      </button>
      <h1 style={{margin:"0 0 24px",fontSize:26,fontWeight:700,color:"#111827"}}>COVERAGE AREAS</h1>

      {/* Main card */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"24px 28px",marginBottom:28}}>
        {/* State selector row */}
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:8}}>Select State</label>
            <div style={{position:"relative",display:"inline-block"}}>
              <select value={selectedState} onChange={e=>setSelectedState(e.target.value)}
                style={{padding:"10px 40px 10px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:14,color:"#111827",background:"white",outline:"none",appearance:"none",cursor:"pointer",minWidth:180}}>
                {NIGERIA_STATES.map(s=>(
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" width="14" height="14"
                style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>

          {uncovered > 0 && (
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"10px 16px"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="16" height="16"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
              <span style={{fontSize:13,color:"#92400e",fontWeight:500}}>{uncovered} LGA{uncovered>1?"s":""} have no assigned field agent</span>
            </div>
          )}
        </div>

        {/* LGA table */}
        <h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#111827"}}>LGA Coverage - {selectedState}</h2>
        <div style={{border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              {["LGA","ASSIGNED AGENTS","MONTHLY TASKS","COVERAGE STATUS"].map(h=>(
                <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {lgas.map((l,i)=>(
                <tr key={i} style={{borderBottom:i<lgas.length-1?"1px solid #f3f4f6":"none",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"13px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{l.lga}</td>
                  <td style={{padding:"13px 20px",fontSize:14,color:l.agent?"#374151":"#9ca3af"}}>{l.agent||"None"}</td>
                  <td style={{padding:"13px 20px",fontSize:14,color:"#374151"}}>{l.tasks}</td>
                  <td style={{padding:"13px 20px"}}>
                    <span style={{display:"inline-flex",alignItems:"center",gap:7,fontSize:14,color:l.agent?"#15803d":"#6b7280"}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:l.agent?"#16a34a":"#9ca3af",flexShrink:0}}/>
                      {l.agent?"Covered":"Uncovered"}
                    </span>
                  </td>
                </tr>
              ))}
              {lgas.length === 0 && (
                <tr><td colSpan={4} style={{padding:"28px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No LGA data available for this state yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* State Summary */}
      <h2 style={{margin:"0 0 14px",fontSize:16,fontWeight:700,color:"#111827"}}>State Summary</h2>
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#f9fafb"}}>
            {["STATE","AGENTS","LGAS COVERED","MONTHLY TASKS","STATUS"].map(h=>(
              <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6b7280",borderBottom:"1px solid #e5e7eb",letterSpacing:.5}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {STATE_SUMMARY.map((s,i)=>(
              <tr key={i} style={{borderBottom:i<STATE_SUMMARY.length-1?"1px solid #f3f4f6":"none",background:"white",cursor:"pointer"}}
                onClick={()=>setSelectedState(s.state==="FCT Abuja"?"FCT Abuja":s.state)}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{s.state}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{s.agents}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{s.lgasCovered}</td>
                <td style={{padding:"14px 20px",fontSize:14,color:"#374151"}}>{s.tasks}</td>
                <td style={{padding:"14px 20px"}}>
                  <span style={{display:"inline-flex",alignItems:"center",gap:7,fontSize:14,color:"#92400e"}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:"#f59e0b",flexShrink:0}}/>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoverageAreas;
