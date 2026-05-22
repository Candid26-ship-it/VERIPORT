import { HomeIcon } from "./Icons.jsx";

export function Breadcrumb({ items }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:20,fontSize:13,color:"#6b7280",flexWrap:"wrap"}}>
      <span style={{color:"#9ca3af",display:"flex",alignItems:"center"}}><HomeIcon/></span>
      {items.map((item, i) => (
        <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{color:"#9ca3af"}}>›</span>
          <span style={{color: i === items.length-1 ? "#111827" : "#6b7280", fontWeight: i === items.length-1 ? 500 : 400}}>{item}</span>
        </span>
      ))}
    </div>
  );
}
