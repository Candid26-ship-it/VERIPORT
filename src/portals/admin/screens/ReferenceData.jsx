import { useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import { SAMPLE_RECORDS, REFERENCE_REGISTRIES } from "../data.js";

function ReferenceData() {
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState("");
  const [newVal,   setNewVal]   = useState("");
  const [records,  setRecords]  = useState(SAMPLE_RECORDS);
  const [saved,    setSaved]    = useState(false);

  const handleAdd = () => {
    if (!newVal.trim()) return;
    const reg = selected.name;
    const prefix = reg.replace(/\s+/g,"").slice(0,3).toUpperCase();
    const id = `${prefix}-${String((records[reg]||[]).length+1).padStart(3,"0")}`;
    setRecords(p=>({...p,[reg]:[...(p[reg]||[]),{id,value:newVal}]}));
    setNewVal("");
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  if (selected) {
    const recs = (records[selected.name]||[]).filter(r=>r.value.toLowerCase().includes(search.toLowerCase()));
    return (
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        <button onClick={()=>{setSelected(null);setSearch("");setNewVal("");}}
          style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Reference Data
        </button>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>{selected.icon} {selected.name}</h1>
            <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{(records[selected.name]||[]).length.toLocaleString()} records · Last updated {selected.updated}{selected.dep&&` · Depends on: ${selected.dep}`}</p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:7,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>
              ⬇ Import CSV
            </button>
          </div>
        </div>

        {/* Add new record */}
        <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"16px 20px",marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
          <input value={newVal} onChange={e=>setNewVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdd()} placeholder={`Add new ${selected.name.toLowerCase()}...`}
            style={{flex:1,padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",color:"#111827"}}/>
          <button onClick={handleAdd}
            style={{padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>
            + Add Record
          </button>
          {saved && <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✓ Added</span>}
        </div>

        {/* Search + table */}
        <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",gap:10}}>
            <div style={{position:"relative",flex:1,maxWidth:320}}>
              <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",fontSize:12}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${selected.name.toLowerCase()}...`}
                style={{width:"100%",padding:"7px 12px 7px 26px",border:"1.5px solid #e5e7eb",borderRadius:7,fontSize:13,outline:"none",color:"#374151",boxSizing:"border-box"}}/>
            </div>
            <span style={{fontSize:13,color:"#6b7280"}}>Showing {recs.length} of {(records[selected.name]||[]).length}</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["REGISTRY ID","VALUE",selected.dep&&"DEPENDENCY",""].filter(Boolean).map(h=>(
                <th key={h} style={{padding:"10px 18px",textAlign:"left",fontSize:11,fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {recs.map((r,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"12px 18px",fontSize:12,fontFamily:"monospace",color:"#6b7280"}}>{r.id}</td>
                  <td style={{padding:"12px 18px",fontSize:13,fontWeight:500,color:"#111827"}}>{r.value}</td>
                  {selected.dep && <td style={{padding:"12px 18px",fontSize:12,color:"#9ca3af"}}>{r.dep||"—"}</td>}
                  <td style={{padding:"12px 18px",textAlign:"right"}}>
                    <button onClick={()=>setRecords(p=>({...p,[selected.name]:(p[selected.name]||[]).filter((_,j)=>j!==i)}))}
                      style={{background:"none",border:"none",cursor:"pointer",color:"#d1d5db",fontSize:16,lineHeight:1}}>×</button>
                  </td>
                </tr>
              ))}
              {recs.length===0 && <tr><td colSpan={4} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:13}}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Reference Data"]}/>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
        <h1 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,color:"#111827"}}>REFERENCE DATA</h1>
      </div>
      <p style={{margin:"0 0 24px",fontSize:14,color:"#374151"}}>Platform-owned reference registries used across the Service Catalog. Candidates see searchable pickers; stored values are registry IDs — not free text.</p>

      <div style={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:10,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:10}}>
        <span style={{fontSize:16,flexShrink:0}}>ℹ</span>
        <p style={{margin:0,fontSize:13,color:"#92400e",lineHeight:1.6}}>These registries power the <strong>Reference</strong> field types in the Service Catalog. When a service creator picks "Local Institution" or "State", candidates see data from here — not free text. Downstream agents key off registry IDs for automated routing.</p>
      </div>

      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["REGISTRY","RECORDS","DEPENDENCY","LAST UPDATED",""].map(h=>(
              <th key={h} style={{padding:"11px 20px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {REFERENCE_REGISTRIES.map((reg,i)=>(
              <tr key={i} onClick={()=>{setSelected(reg);setSearch("");}}
                style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 20px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:18}}>{reg.icon}</span>
                    <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{reg.name}</p>
                  </div>
                </td>
                <td style={{padding:"14px 20px",fontSize:14,fontWeight:500,color:"#374151"}}>{reg.records.toLocaleString()}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:reg.dep?"#374151":"#d1d5db"}}>{reg.dep||"—"}</td>
                <td style={{padding:"14px 20px",fontSize:13,color:"#9ca3af"}}>{reg.updated}</td>
                <td style={{padding:"14px 20px",color:"#9ca3af"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:"12px 20px",borderTop:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{REFERENCE_REGISTRIES.length} registries · {REFERENCE_REGISTRIES.reduce((a,r)=>a+r.records,0).toLocaleString()} total records</p>
        </div>
      </div>
    </div>
  );
}

export default ReferenceData;
