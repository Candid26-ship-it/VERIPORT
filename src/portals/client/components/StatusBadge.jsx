export default function StatusBadge({ status }) {
  const map = {
    "Active":      { bg:"#dbeafe", c:"#1d4ed8" },
    "Pending":     { bg:"#f3f4f6", c:"#6b7280" },
    "Ready":       { bg:"#fef9c3", c:"#a16207" },
    "Delivered":   { bg:"#dcfce7", c:"#15803d" },
    "Complete":    { bg:"#dcfce7", c:"#15803d" },
    "In Progress": { bg:"#dbeafe", c:"#1d4ed8" },
    "Flagged":     { bg:"#fee2e2", c:"#b91c1c" },
    "Verified":    { bg:"#dcfce7", c:"#15803d" },
    "Discrepancy": { bg:"#fef9c3", c:"#a16207" },
    "Released":    { bg:"#dcfce7", c:"#15803d" },
  };
  const s = map[status] || { bg:"#f3f4f6", c:"#6b7280" };
  return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:s.bg,color:s.c}}>{status}</span>;
}
