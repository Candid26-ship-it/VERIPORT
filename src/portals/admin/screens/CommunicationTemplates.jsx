import { useState } from "react";
import { ChevronRight, ChevronDown, SearchSm } from "../../../components/Icons.jsx";
import { TEMPLATES } from "../data.js";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";
import TemplateDetail from "./TemplateDetail.jsx";

function CommunicationTemplates({ onNewTemplate }) {
  const [activeCat,    setActiveCat]    = useState("All");
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected,     setSelected]     = useState(null);

  const CATS = ["All","Candidate","VA/Institutional","Internal Ops","Field Ops","Client","System & Security"];
  const priColor = p => p==="Critical"?"#b91c1c":p==="High"?"#d97706":p==="Medium"?"#3b82f6":"#6b7280";
  const priBg    = p => p==="Critical"?"#fee2e2":p==="High"?"#fef3c7":p==="Medium"?"#eff6ff":"#f3f4f6";
  const stColor  = s => s==="Existing"?"#16a34a":"#d97706";
  const stBg     = s => s==="Existing"?"#dcfce7":"#fef3c7";

  const filtered = TEMPLATES.filter(t => {
    const matchCat    = activeCat==="All" || t.cat===activeCat;
    const matchStatus = statusFilter==="All" || t.status===statusFilter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.ref.toLowerCase().includes(search.toLowerCase()) ||
                        t.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  if (selected) return <TemplateDetail template={selected} onBack={()=>setSelected(null)}/>;

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Communication Templates"]}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#111827"}}>COMMUNICATION TEMPLATES</h1>
        <button onClick={onNewTemplate} style={{padding:"10px 18px",border:"none",borderRadius:8,background:"#b91c1c",fontSize:14,fontWeight:600,color:"white",cursor:"pointer"}}>+ New Template</button>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {[
          {label:"TOTAL TEMPLATES",   value:TEMPLATES.length,                                   color:"#111827"},
          {label:"EXISTING",          value:TEMPLATES.filter(t=>t.status==="Existing").length,   color:"#16a34a"},
          {label:"REQUIRED",          value:TEMPLATES.filter(t=>t.status==="Required").length,   color:"#d97706"},
          {label:"CRITICAL PRIORITY", value:TEMPLATES.filter(t=>t.pri==="Critical").length,      color:"#b91c1c"},
        ].map(s=>(
          <div key={s.label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px"}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.5}}>{s.label}</p>
            <p style={{margin:0,fontSize:26,fontWeight:700,color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Category tabs */}
      <div style={{display:"flex",borderBottom:"1px solid #e5e7eb",marginBottom:16,overflowX:"auto"}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)}
            style={{padding:"10px 14px",border:"none",background:"none",cursor:"pointer",fontSize:13,fontWeight:activeCat===c?600:400,color:activeCat===c?"#b91c1c":"#6b7280",borderBottom:activeCat===c?"2px solid #b91c1c":"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap"}}>
            {c} <span style={{fontSize:11,color:activeCat===c?"#b91c1c":"#9ca3af"}}>({TEMPLATES.filter(t=>c==="All"||t.cat===c).length})</span>
          </button>
        ))}
      </div>

      {/* Search + Status filter */}
      <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"center"}}>
        <div style={{position:"relative",maxWidth:360,flex:1}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search templates..."
            style={{width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
        </div>
        <div style={{position:"relative"}}>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
            style={{padding:"9px 32px 9px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,color:"#374151",background:"white",appearance:"none",outline:"none",cursor:"pointer"}}>
            {["All","Existing","Required"].map(s=><option key={s}>{s}</option>)}
          </select>
          <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#6b7280"}}><ChevronDown/></span>
        </div>
      </div>

      {/* Table */}
      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#fafafa"}}>
            {["REF","TEMPLATE NAME","CATEGORY","CHANNEL","PRIORITY","STATUS","LAST MODIFIED",""].map((h,i)=>(
              <th key={i} style={{padding:"12px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((t,i)=>(
              <tr key={i} onClick={()=>setSelected(t)} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{padding:"14px 16px",fontSize:12,fontWeight:700,color:"#9ca3af"}}>{t.ref}</td>
                <td style={{padding:"14px 16px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.name}</td>
                <td style={{padding:"14px 16px",fontSize:13,color:"#374151"}}>{t.cat}</td>
                <td style={{padding:"14px 16px",fontSize:13,color:"#374151"}}>{t.channel}</td>
                <td style={{padding:"14px 16px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:priBg(t.pri),color:priColor(t.pri)}}>{t.pri}</span>
                </td>
                <td style={{padding:"14px 16px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:stBg(t.status),color:stColor(t.status)}}>{t.status}</span>
                </td>
                <td style={{padding:"14px 16px",fontSize:13,color:"#9ca3af"}}>{t.modified}</td>
                <td style={{padding:"14px 16px",color:"#9ca3af"}}><ChevronRight/></td>
              </tr>
            ))}
            {filtered.length===0 && (
              <tr><td colSpan={8} style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No templates found.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{padding:"12px 16px",borderTop:"1px solid #f3f4f6"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Showing {filtered.length} of {TEMPLATES.length} templates</p>
        </div>
      </div>
    </div>
  );
}

export default CommunicationTemplates;
