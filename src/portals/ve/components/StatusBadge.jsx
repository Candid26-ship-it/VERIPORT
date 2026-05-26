export default function StatusBadge({s}) {
    const cfg = {Review:{bg:"#eff6ff",c:"#3b82f6",label:"○ Review"},Approved:{bg:"#dcfce7",c:"#15803d",label:"✓ Approved"},Returned:{bg:"#fef3c7",c:"#b45309",label:"↩ Returned"},Flagged:{bg:"#fee2e2",c:"#b91c1c",label:"⚠ Flagged"}};
    const d = cfg[s]||cfg.Review;
    return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:d.bg,color:d.c}}>{d.label}</span>;
  }
