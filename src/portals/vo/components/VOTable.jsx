const VOTable = ({ cols, rows, onRow, emptyMsg="No tasks." }) => (
  <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr style={{background:"#fafafa"}}>
        {cols.map((c,i)=><th key={i} style={{padding:"11px 18px",textAlign:"left",fontSize:12,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb",letterSpacing:.3,whiteSpace:"nowrap"}}>{c}</th>)}
      </tr></thead>
      <tbody>
        {rows.length===0 && <tr><td colSpan={cols.length} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>{emptyMsg}</td></tr>}
        {rows.map((r,i)=>(
          <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white",cursor:onRow?"pointer":"default"}}
            onMouseEnter={e=>{if(onRow)e.currentTarget.style.background="#fafafa";}}
            onMouseLeave={e=>e.currentTarget.style.background="white"}
            onClick={()=>onRow&&onRow(r,i)}>
            {r}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default VOTable;
