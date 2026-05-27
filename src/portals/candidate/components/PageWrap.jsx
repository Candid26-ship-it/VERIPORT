export default function PageWrap({children, noPad}) {
  return (
    <div style={{flex:1,overflowY:"auto",background:"#f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",padding:noPad?"0":"24px 16px 40px"}}>
      <div style={{width:"100%",maxWidth:520,background:"white",borderRadius:16,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",padding:noPad?"0":"28px 28px 32px"}}>
        {children}
      </div>
    </div>
  );
}
