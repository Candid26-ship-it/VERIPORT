export default function OutcomeBadge({o}) {
    const cfg = {Verified:{bg:"#dcfce7",c:"#15803d"},Discrepancy:{bg:"#fef3c7",c:"#b45309"},"Not Verified":{bg:"#fee2e2",c:"#b91c1c"},Inconclusive:{bg:"#f3f4f6",c:"#6b7280"}};
    const s = cfg[o]||cfg.Inconclusive;
    return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:s.bg,color:s.c}}>{o}</span>;
  }
