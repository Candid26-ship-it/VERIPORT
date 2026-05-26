const SLABadge = ({ val, risk, breach }) => (
  <span style={{fontSize:13,fontWeight:600,color:breach?"#b91c1c":risk?"#d97706":"#374151"}}>
    {val}d{breach?" 🔴":risk?" ⚠️":""}
  </span>
);

export default SLABadge;
