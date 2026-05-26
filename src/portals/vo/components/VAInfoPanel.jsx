import { VA_INFO_MAP } from "../data.js";

function VAInfoPanel({ row }) {
  const vaData = VA_INFO_MAP[row.va] || null;
  const stColor = s => s==="Validated"?"#16a34a":s==="Stale"?"#d97706":s==="Vacated"?"#6b7280":"#b91c1c";
  const stBg    = s => s==="Validated"?"#dcfce7":s==="Stale"?"#fef3c7":s==="Vacated"?"#f3f4f6":"#fee2e2";

  return (
    <div>
      {/* Read-only notice */}
      <div style={{background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:8,padding:"10px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" width="15" height="15"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <p style={{margin:0,fontSize:12,color:"#6d28d9",lineHeight:1.5}}>Registry data is <strong>read-only</strong> in the VO portal. Contact the VM to update VA records.</p>
      </div>

      {/* Task context */}
      <div style={{marginBottom:20}}>
        <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>TASK CONTEXT</p>
        {[
          ["Institution", row.inst],
          ["Faculty",     row.faculty || "—"],
          ["Department",  row.dept],
          ["Students",    `${row.students} students`],
        ].map(([l,v])=>(
          <div key={l} style={{display:"flex",marginBottom:8}}>
            <span style={{width:110,fontSize:12,color:"#9ca3af",fontWeight:500,flexShrink:0}}>{l}</span>
            <span style={{fontSize:13,color:"#111827",fontWeight:500}}>{v}</span>
          </div>
        ))}
      </div>

      <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:20}}/>

      {/* VA Assignment */}
      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>ASSIGNED VA</p>
      <div style={{background:"white",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 16px",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <p style={{margin:0,fontSize:15,fontWeight:700,color:"#111827"}}>{row.va}</p>
          {vaData && <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:stBg(vaData.status),color:stColor(vaData.status)}}>{vaData.status}</span>}
        </div>
        {vaData ? (
          <>
            {[
              ["Role",           vaData.role],
              ["Email",          vaData.email],
              ["Source",         vaData.source],
              ["Last Confirmed", vaData.lastConfirmed],
            ].map(([l,v])=>(
              <div key={l} style={{display:"flex",marginBottom:7}}>
                <span style={{width:120,fontSize:12,color:"#9ca3af",fontWeight:500,flexShrink:0}}>{l}</span>
                <span style={{fontSize:12,color:l==="Email"?"#3b82f6":"#374151"}}>{v}</span>
              </div>
            ))}
          </>
        ) : (
          <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>No registry record found for this VA name.</p>
        )}
      </div>

      {/* Status warning if not Validated */}
      {vaData && vaData.status !== "Validated" && (
        <div style={{background:vaData.status==="Stale"?"#fffbeb":"#fef2f2",border:`1px solid ${vaData.status==="Stale"?"#fcd34d":"#fecaca"}`,borderRadius:8,padding:"12px 14px",marginBottom:16}}>
          <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:vaData.status==="Stale"?"#92400e":"#b91c1c"}}>
            {vaData.status==="Stale" ? "⚠ Stale Contact" : vaData.status==="Vacant" ? "✗ Vacant Role" : "✗ Vacated Role"}
          </p>
          <p style={{margin:0,fontSize:12,color:vaData.status==="Stale"?"#b45309":"#b91c1c",lineHeight:1.5}}>
            {vaData.status==="Stale"
              ? "This VA contact has passed the freshness window. Verify manually before sending. Contact the VM to refresh the registry record."
              : "No validated VA is assigned to this role. Tasks may be delayed. Contact the VM to assign a replacement."}
          </p>
        </div>
      )}

      {/* Lookup chain note */}
      <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px"}}>
        <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#374151"}}>Lookup chain used</p>
        <p style={{margin:0,fontSize:12,color:"#6b7280",lineHeight:1.6}}>HOD → Registrar → Deputy Registrar → Dean of Students → VC/Rector. Assignment was made at the first available Validated record in this chain.</p>
      </div>
    </div>
  );
}

export default VAInfoPanel;
