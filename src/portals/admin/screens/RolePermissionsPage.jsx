import { CheckIcon, ChevronLeft } from "../../../components/Icons.jsx";
import { ROLE_PERMISSIONS } from "../../../data/index.js";
import { Breadcrumb } from "../../../components/Breadcrumb.jsx";

export default function RolePermissionsPage({ onBack }) {
  const Cell = ({ val }) => (
    <td style={{padding:"14px 20px",textAlign:"center",borderBottom:"1px solid #f3f4f6"}}>
      {val ? <CheckIcon/> : <span style={{color:"#d1d5db",fontSize:16}}>—</span>}
    </td>
  );
  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <Breadcrumb items={["Internal Users","Roles"]}/>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> Users
      </button>
      <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:700,color:"#111827"}}>ROLE PERMISSIONS</h1>
      <p style={{margin:"0 0 24px",color:"#6b7280",fontSize:14}}>View system access levels by role</p>

      <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#fafafa"}}>
              <th style={{padding:"14px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",width:"35%"}}>PERMISSION</th>
              {["ADMIN","CE","VO","VE","VM"].map(r => (
                <th key={r} style={{padding:"14px 20px",textAlign:"center",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLE_PERMISSIONS.map(group => (
              <>
                <tr key={group.section} style={{background:"#f9fafb"}}>
                  <td colSpan={6} style={{padding:"10px 20px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5,borderBottom:"1px solid #e5e7eb"}}>{group.section}</td>
                </tr>
                {group.perms.map(perm => (
                  <tr key={perm.label} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"14px 20px",fontSize:14,color:"#111827",borderBottom:"1px solid #f3f4f6"}}>{perm.label}</td>
                    <Cell val={perm.admin}/>
                    <Cell val={perm.ce}/>
                    <Cell val={perm.vo}/>
                    <Cell val={perm.ve}/>
                    <Cell val={perm.vm}/>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
        <div style={{padding:"16px 20px",borderTop:"1px solid #e5e7eb"}}>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Permissions are role-based and apply across the platform.</p>
        </div>
      </div>
    </div>
  );
}
