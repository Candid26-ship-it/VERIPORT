import { CLIENT } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import BackBtn from "../components/BackBtn.jsx";
import StepBar from "../components/StepBar.jsx";
import Card from "../components/Card.jsx";
import Check from "../components/Check.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";

export default function Privacy({setScreen, privacyChecked, setPrivacyChecked, termsChecked, setTermsChecked}) {
  return (
    <PageWrap>
      <BackBtn to="welcome" setScreen={setScreen}/>
      <StepBar step={1}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Privacy & Terms</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please read and accept the following to continue.</p>

      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>DATA PRIVACY AGREEMENT</p>
      <Card style={{maxHeight:220,overflowY:"auto",marginBottom:14,fontSize:13,color:"#374151",lineHeight:1.7}}>
        <p style={{margin:"0 0 10px",fontWeight:600}}>In accordance with the Nigeria Data Protection Regulation (NDPR) 2019, we are required to inform you of the following:</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>1. PURPOSE OF DATA COLLECTION</p>
        <p style={{margin:"0 0 10px"}}>Your personal data is being collected solely for the purpose of conducting background verification as requested by {CLIENT}.</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>2. DATA WE COLLECT</p>
        {["National Identification Number (NIN)","Biographical information","Employment history","Educational records","Residential address","Contact information of references","Supporting documents you upload"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 6px",fontWeight:600}}>3. HOW WE USE YOUR DATA</p>
        {["Verify information provided","Contact third parties (employers, institutions, references) for confirmation","Generate verification report for client"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 6px",fontWeight:600}}>4. DATA SHARING</p>
        <p style={{margin:"0 0 10px"}}>Your verification results will be shared with {CLIENT}. We do not sell or share your data with any other third parties.</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>5. DATA RETENTION</p>
        <p style={{margin:"0 0 10px"}}>Your data will be retained for 7 years in accordance with regulatory requirements, after which it will be securely disposed.</p>
        <p style={{margin:"0 0 6px",fontWeight:600}}>6. YOUR RIGHTS</p>
        {["Access your personal data","Request correction of inaccurate data","Request deletion (subject to legal holds)","Withdraw consent (verification will stop)"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 6px",fontWeight:600}}>7. DATA CONTROLLER</p>
        <p style={{margin:0}}>Dragnet Solutions Limited · privacy@dragnet.ng</p>
      </Card>
      <Check checked={privacyChecked} onChange={()=>setPrivacyChecked(p=>!p)}>
        I have read and agree to the Data Privacy Agreement
      </Check>

      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>TERMS OF USE</p>
      <Card style={{maxHeight:180,overflowY:"auto",marginBottom:14,fontSize:13,color:"#374151",lineHeight:1.7}}>
        <p style={{margin:"0 0 8px",fontWeight:600}}>By using this portal, you agree to:</p>
        {["Provide truthful and accurate information","Upload authentic documents only","Not impersonate another person","Complete submission by the deadline"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
        <p style={{margin:"10px 0 8px",fontWeight:600}}>Providing false information may result in:</p>
        {["Rejection of your application","Reporting to relevant authorities","Legal action where applicable"].map((d,i)=><p key={i} style={{margin:"0 0 3px"}}>• {d}</p>)}
      </Card>
      <Check checked={termsChecked} onChange={()=>setTermsChecked(p=>!p)}>
        I have read and agree to the Terms of Use
      </Check>

      <Divider/>
      <PrimaryBtn onClick={()=>setScreen("nin")} disabled={!privacyChecked||!termsChecked}>
        Accept & Continue →
      </PrimaryBtn>
      <p style={{margin:"16px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>If you do not agree, you may close this page. Your verification cannot proceed without consent.</p>
    </PageWrap>
  );
}
