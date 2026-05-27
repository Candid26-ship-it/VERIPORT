const OutcomeBadge = ({ val }) => {
  const map = { Verified:["#dcfce7","#16a34a"], "Not Verified":["#fee2e2","#b91c1c"], Inconclusive:["#f3f4f6","#6b7280"], Discrepancy:["#fef3c7","#d97706"], Enrolled:["#dcfce7","#16a34a"], Graduated:["#eff6ff","#3b82f6"], "Not Found":["#fee2e2","#b91c1c"], Match:["#dcfce7","#16a34a"], "No Match":["#fee2e2","#b91c1c"], Partial:["#fef3c7","#d97706"] };
  const [bg, color] = map[val] || ["#f3f4f6","#6b7280"];
  return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:bg,color}}>{val}</span>;
};

export default OutcomeBadge;
