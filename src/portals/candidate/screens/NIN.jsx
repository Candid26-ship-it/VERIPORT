import { CANDIDATE_NAME } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import BackBtn from "../components/BackBtn.jsx";
import StepBar from "../components/StepBar.jsx";
import Card from "../components/Card.jsx";
import Check from "../components/Check.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import Label from "../components/Label.jsx";
import Inp from "../components/Inp.jsx";

export default function NIN({setScreen, ninState, ninValue, setNinValue, confirmCheck, setConfirmCheck, verifyNIN}) {
  return (
    <PageWrap>
      <BackBtn to="privacy" setScreen={setScreen}/>
      <StepBar step={2}/>

      {ninState === "verifying" && (
        <div style={{textAlign:"center",padding:"40px 20px"}}>
          <h2 style={{margin:"0 0 24px",fontSize:20,fontWeight:700,color:"#111827"}}>Verify Your Identity</h2>
          <div style={{fontSize:32,marginBottom:16,animation:"spin 1s linear infinite"}}>◌</div>
          <p style={{margin:"0 0 8px",fontSize:16,fontWeight:600,color:"#374151"}}>Verifying your NIN...</p>
          <p style={{margin:0,fontSize:14,color:"#9ca3af"}}>Please wait a moment.</p>
        </div>
      )}

      {ninState === "success" && (
        <>
          <h2 style={{margin:"0 0 20px",fontSize:20,fontWeight:700,color:"#111827"}}>Identity Verified ✓</h2>
          <Card style={{borderColor:"#bbf7d0",background:"#f0fdf4",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="18" height="18"><path d="M20 6L9 17l-5-5"/></svg>
              <span style={{fontSize:14,fontWeight:700,color:"#15803d"}}>NIN Verified</span>
            </div>
            {[["Name",CANDIDATE_NAME],["Gender","Male"],["DOB","15 March 1995"]].map(([k,v])=>(
              <p key={k} style={{margin:"0 0 6px",fontSize:14,color:"#374151"}}><span style={{color:"#6b7280",marginRight:8}}>{k}:</span><strong>{v}</strong></p>
            ))}
            <p style={{margin:"12px 0 0",fontSize:13,color:"#374151",fontStyle:"italic"}}>Please confirm this information is correct.</p>
          </Card>
          <Check checked={confirmCheck} onChange={()=>setConfirmCheck(p=>!p)}>
            I confirm this is my information
          </Check>
          <Divider/>
          <PrimaryBtn onClick={()=>setScreen("face")} disabled={!confirmCheck}>Continue →</PrimaryBtn>
          <p style={{margin:"14px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Not your information? Contact support immediately.</p>
        </>
      )}

      {ninState === "idle" && (
        <>
          <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Verify Your Identity</h2>
          <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please enter your National Identification Number (NIN) to verify your identity.</p>
          <Divider/>
          <div style={{marginBottom:20}}>
            <Label required>National Identification Number (NIN)</Label>
            <Inp value={ninValue} onChange={e=>setNinValue(e.target.value.replace(/\D/g,"").slice(0,11))} placeholder="e.g. 12345678901"/>
            <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af"}}>11 digits. Find this on your NIN slip or card.</p>
          </div>
          <Card style={{marginBottom:20}}>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" width="16" height="16" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <span style={{fontSize:13,fontWeight:600,color:"#1e40af"}}>Why we need your NIN</span>
            </div>
            <p style={{margin:"0 0 8px",fontSize:13,color:"#374151",lineHeight:1.6}}>Your NIN confirms your identity through the National Identity Management Commission (NIMC). This protects both you and the organization requesting verification.</p>
            <p style={{margin:0,fontSize:13,color:"#374151"}}>Your NIN data is handled securely and only used for identity verification purposes.</p>
          </Card>
          <PrimaryBtn onClick={verifyNIN} disabled={ninValue.length!==11}>Verify NIN →</PrimaryBtn>
          <Divider/>
          <p style={{margin:0,fontSize:13,color:"#6b7280",textAlign:"center"}}>Don't know your NIN? Dial <strong>*346#</strong> from your registered phone to retrieve it.</p>
          <p style={{margin:"8px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Demo: enter any 11 digits to verify. Enter "00000000000" to simulate failure.</p>
        </>
      )}
    </PageWrap>
  );
}
