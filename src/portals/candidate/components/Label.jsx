export default function Label({children, required}) {
  return (
    <label style={{display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6}}>
      {children}{required && <span style={{color:"#b91c1c",marginLeft:2}}>*</span>}
    </label>
  );
}
