import { CANDIDATE_NAME, CLIENT } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import BackBtn from "../components/BackBtn.jsx";
import StepBar from "../components/StepBar.jsx";
import Card from "../components/Card.jsx";
import Check from "../components/Check.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import Label from "../components/Label.jsx";
import Inp from "../components/Inp.jsx";

export default function Consent({setScreen, consentChecks, setConsentChecks, allConsentChecked, signature, setSignature, signatureValid}) {
  const checks = [
    {key:"employment", label:"Employment Verification *", desc:"Contact my current and previous employers to verify employment dates, job titles, and obtain references."},
    {key:"education",  label:"Education Verification *",  desc:"Contact educational institutions to verify my academic qualifications and records."},
    {key:"address",    label:"Address Verification *",    desc:"Conduct a physical visit to my residential address to confirm I reside there."},
    {key:"guarantor",  label:"Guarantor Verification *",  desc:"Contact my listed guarantor(s) to confirm our relationship and obtain their reference."},
    {key:"criminal",   label:"Criminal Record Check *",   desc:"Request a criminal background check from the Nigeria Police Force using my biometric data and NIN."},
    {key:"share",      label:"Share Results with Requesting Organisation *", desc:`I authorize Dragnet Solutions to share the verification results with ${CLIENT} who has requested this background check.`},
  ];
  return (
    <PageWrap>
      <BackBtn to="nin" setScreen={setScreen}/>
      <StepBar step={3}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Authorization & Consent</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please review and authorize the verification activities below.</p>
      <Divider/>
      <p style={{margin:"0 0 16px",fontSize:14,color:"#374151"}}>I, <strong>{CANDIDATE_NAME}</strong>, authorize Dragnet Solutions Limited to perform the following:</p>
      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>VERIFICATION AUTHORIZATIONS</p>
      <div style={{marginBottom:10,padding:"10px 14px",background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb"}}>
        <Check checked={allConsentChecked} onChange={()=>{const val=!allConsentChecked;setConsentChecks({employment:val,education:val,address:val,guarantor:val,criminal:val,share:val});}}>
          <span style={{fontWeight:700,fontSize:14,color:"#111827"}}>Select All — Authorize all verification activities</span>
        </Check>
      </div>
      <Card style={{marginBottom:16}}>
        {checks.map((c,i)=>(
          <div key={c.key} style={{marginBottom:i<checks.length-1?16:0,paddingBottom:i<checks.length-1?16:0,borderBottom:i<checks.length-1?"1px solid #e5e7eb":"none"}}>
            <Check checked={consentChecks[c.key]} onChange={()=>setConsentChecks(p=>({...p,[c.key]:!p[c.key]}))}>
              <div>
                <p style={{margin:"0 0 3px",fontWeight:600,fontSize:14,color:"#111827"}}>{c.label}</p>
                <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.5}}>{c.desc}</p>
              </div>
            </Check>
          </div>
        ))}
      </Card>
      <Divider/>
      <div style={{background:"#f8f9fa",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px 16px",marginBottom:20,fontSize:13,color:"#374151",lineHeight:1.7}}>
        <p style={{margin:"0 0 6px"}}>• Providing false information may disqualify my application and may be reported to authorities.</p>
        <p style={{margin:"0 0 6px"}}>• I may withdraw consent at any time by contacting <span style={{color:"#b91c1c"}}>support@dragnet.ng</span>, which will stop verification.</p>
        <p style={{margin:0}}>• This consent is valid for 90 days from signing.</p>
      </div>
      <div style={{marginBottom:20}}>
        <Label required>Type your full name as signature</Label>
        <Inp value={signature} onChange={e=>setSignature(e.target.value)} placeholder={CANDIDATE_NAME}/>
        <p style={{margin:"6px 0 0",fontSize:12,color:"#9ca3af"}}>Must match: <strong>{CANDIDATE_NAME}</strong></p>
        {signature && !signatureValid && <p style={{margin:"4px 0 0",fontSize:12,color:"#b91c1c"}}>Name does not match. Please type exactly: {CANDIDATE_NAME}</p>}
        {signature && signatureValid && <p style={{margin:"4px 0 0",fontSize:12,color:"#15803d"}}>✓ Signature accepted</p>}
      </div>
      <p style={{margin:"0 0 20px",fontSize:13,color:"#6b7280"}}>Date: February 3, 2026</p>
      <PrimaryBtn onClick={()=>setScreen("personal")} disabled={!allConsentChecked||!signatureValid}>
        Sign & Continue →
      </PrimaryBtn>
    </PageWrap>
  );
}
