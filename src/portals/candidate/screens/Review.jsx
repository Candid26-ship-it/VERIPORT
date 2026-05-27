import { CANDIDATE_NAME } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import BackBtn from "../components/BackBtn.jsx";
import StepBar from "../components/StepBar.jsx";
import Card from "../components/Card.jsx";
import Check from "../components/Check.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";

export default function Review({
  setScreen, setSubmitted, confirmCheck, setConfirmCheck,
  phone, email, street, city, addrState, lga, duration,
  employer, jobTitle, startDate, currentJob, hrName,
  university, degree, grade, gradYear,
  guarantorName, guarantorRel, guarantorPhone,
  uploadedDocs,
}) {
  return (
    <PageWrap>
      <BackBtn to="documents" setScreen={setScreen}/>
      <StepBar step={6}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Review Your Submission</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please review your information before submitting.</p>

      {[
        {title:"PERSONAL DETAILS", to:"personal", lines:[`Name: ${CANDIDATE_NAME}`,`DOB: 15 March 1995`,`Phone: ${phone}`,`Email: ${email}`]},
        {title:"CURRENT ADDRESS",  to:"personal", lines:[street,`${city}, ${addrState}`,`${lga} LGA`,`Duration: ${duration}`]},
        {title:"EMPLOYMENT",       to:"personal", lines:[employer,jobTitle,`${startDate} – ${currentJob?"Present":"—"}`,`Contact: ${hrName}`]},
        {title:"EDUCATION",        to:"personal", lines:[university,degree,`${grade} (${gradYear})`]},
        {title:"GUARANTOR",        to:"personal", lines:[guarantorName,`Relationship: ${guarantorRel}`,`Phone: ${guarantorPhone}`]},
        {title:"DOCUMENTS",        to:"documents", lines:Object.entries(uploadedDocs).filter(([,v])=>v).map(([,v])=>`✓ ${v}`)},
      ].map(s=>(
        <div key={s.title} style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>{s.title}</span>
            <button onClick={()=>setScreen(s.to)} style={{background:"none",border:"none",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>[Edit]</button>
          </div>
          <Card>
            {s.lines.map((l,i)=><p key={i} style={{margin:"0 0 4px",fontSize:13,color:"#374151"}}>{l}</p>)}
          </Card>
        </div>
      ))}

      <Divider/>
      <Check checked={confirmCheck} onChange={()=>setConfirmCheck(p=>!p)}>
        I confirm all information provided is true and accurate to the best of my knowledge.
      </Check>
      <Divider/>
      <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,padding:"12px 14px",marginBottom:20}}>
        <p style={{margin:0,fontSize:13,color:"#9a3412",fontWeight:500}}>⚠ After submission, you cannot edit your data. Ensure everything is correct.</p>
      </div>
      <PrimaryBtn onClick={()=>{setScreen("confirmation");setSubmitted(true);}} disabled={!confirmCheck}>
        Submit for Verification →
      </PrimaryBtn>
    </PageWrap>
  );
}
