function EscTypeBadge({t}) {
    const cfg = {"Discrepancy":{bg:"#fef3c7",c:"#b45309"},"Client Issue":{bg:"#eff6ff",c:"#3b82f6"},"SLA Breach":{bg:"#fee2e2",c:"#b91c1c"},"Fraud Suspect":{bg:"#fdf2f8",c:"#a21caf"}};
    const s = cfg[t]||{bg:"#f3f4f6",c:"#374151"};
    return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:s.bg,color:s.c}}>{t}</span>;
  }

export default EscTypeBadge;
