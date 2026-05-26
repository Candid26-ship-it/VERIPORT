const ExecBadge = ({ val }) => {
  if (val==="Approved") return <span style={{fontSize:13,color:"#16a34a",fontWeight:500}}>✅ Approved</span>;
  if (val==="Pending")  return <span style={{fontSize:13,color:"#d97706",fontWeight:500}}>⏳ Pending</span>;
  return <span style={{fontSize:13,color:"#b91c1c",fontWeight:500}}>🔄 Returned</span>;
};

export default ExecBadge;
