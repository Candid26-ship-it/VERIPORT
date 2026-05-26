export default function Card({children, style={}}) {
  return (
    <div style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:10,padding:"16px 18px",...style}}>{children}</div>
  );
}
