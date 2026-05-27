import PageWrap from "../components/PageWrap.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";

export default function NINFailed({ninAttempts, setNinValue, setNinState, setScreen}) {
  return (
    <PageWrap>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48,marginBottom:8}}>⚠️</div>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Verification Unsuccessful</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151"}}>We were unable to verify your identity using the NIN you provided.</p>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:"#374151"}}>This may happen if:</p>
      {["The NIN was entered incorrectly","The NIN does not match your registered name","There is an issue with NIMC records"].map((d,i)=>(
        <p key={i} style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}>• {d}</p>
      ))}
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:"#374151"}}>What you can do:</p>
      {["Double-check your NIN and try again","Ensure you're using YOUR NIN, not someone else's","If the problem persists, contact support"].map((d,i)=>(
        <p key={i} style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}>{i+1}. {d}</p>
      ))}
      <Divider/>
      <div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:20}}>
        <p style={{margin:0,fontSize:13,color:"#92400e",fontWeight:600}}>Attempts remaining: {3-ninAttempts} of 3</p>
      </div>
      <PrimaryBtn onClick={()=>{setNinValue("");setNinState("idle");setScreen("nin");}}>Try Again</PrimaryBtn>
      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Need help? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
      <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Reference: VER-2026-0128-YIB</p>
    </PageWrap>
  );
}
