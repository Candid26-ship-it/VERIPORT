export default function DragnetLogo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:24}}>
      <div style={{width:40,height:40,background:"#b91c1c",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg viewBox="0 0 24 24" fill="white" width={22} height={22}><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
      </div>
      <div>
        <p style={{margin:0,fontSize:16,fontWeight:800,color:"#111827",letterSpacing:.5}}>DRAGNET</p>
        <p style={{margin:0,fontSize:10,color:"#6b7280",letterSpacing:.5}}>VERIFICATION SERVICES</p>
      </div>
    </div>
  );
}
