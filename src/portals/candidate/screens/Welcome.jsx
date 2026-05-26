import { CANDIDATE_FIRST, CLIENT, DEADLINE } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import DragnetLogo from "../components/DragnetLogo.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";

export default function Welcome({setScreen}) {
  return (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Background Verification Request</h2>
        <p style={{margin:0,fontSize:14,color:"#374151"}}>Hello <strong>{CANDIDATE_FIRST}</strong>,</p>
      </div>
      <p style={{fontSize:14,color:"#374151",lineHeight:1.7,margin:"0 0 4px"}}>
        <strong>{CLIENT}</strong> has requested a background verification as part of your application.
      </p>
      <p style={{fontSize:14,color:"#6b7280",lineHeight:1.7,margin:"0 0 20px"}}>
        This process takes about <strong>10–15 minutes</strong>. You can save your progress and return anytime before the deadline.
      </p>
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>WHAT YOU'LL NEED:</p>
      {["Your NIN (National Identification Number)","Employment history details","Educational qualifications","Current residential address","Guarantor contact information"].map((item,i)=>(
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="15" height="15" style={{flexShrink:0,marginTop:2}}><path d="M20 6L9 17l-5-5"/></svg>
          <span style={{fontSize:14,color:"#374151"}}>{item}</span>
        </div>
      ))}
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>DOCUMENTS TO UPLOAD:</p>
      {["Government-issued ID (front & back)","Academic certificates","Employment letters (if available)","Utility bill or proof of address"].map((item,i)=>(
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
          <span style={{color:"#6b7280",fontSize:14,flexShrink:0}}>•</span>
          <span style={{fontSize:14,color:"#374151"}}>{item}</span>
        </div>
      ))}
      <Divider/>
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"12px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:18}}>⏱️</span>
        <span style={{fontSize:13,color:"#92400e"}}>Deadline: <strong>{DEADLINE}</strong> (7 days remaining)</span>
      </div>
      <PrimaryBtn onClick={()=>setScreen("privacy")}>Get Started →</PrimaryBtn>
      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Questions? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
      <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Powered by Dragnet Verification Services</p>
    </PageWrap>
  );
}
