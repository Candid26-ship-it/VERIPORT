import { CANDIDATE_NAME } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import BackBtn from "../components/BackBtn.jsx";
import StepBar from "../components/StepBar.jsx";
import Check from "../components/Check.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import SecondaryBtn from "../components/SecondaryBtn.jsx";
import Label from "../components/Label.jsx";
import Inp from "../components/Inp.jsx";
import SectionHeader from "../components/SectionHeader.jsx";

export default function Personal({
  setScreen, setShowSaveModal, expandedSection, setExpandedSection,
  phone, setPhone, email, setEmail,
  street, setStreet, city, setCity, addrState, setAddrState, lga, setLga, duration, setDuration, landmark, setLandmark,
  employer, setEmployer, jobTitle, setJobTitle, startDate, setStartDate, currentJob, setCurrentJob,
  hrName, setHrName, hrEmail, setHrEmail, hrPhone, setHrPhone,
  university, setUniversity, degree, setDegree, grade, setGrade, gradYear, setGradYear,
  guarantorName, setGuarantorName, guarantorRel, setGuarantorRel, guarantorPhone, setGuarantorPhone,
}) {
  const sections = [
    {id:"personal", title:"PERSONAL DETAILS"},
    {id:"address",  title:"CURRENT ADDRESS"},
    {id:"employment",title:"EMPLOYMENT HISTORY"},
    {id:"education",title:"EDUCATION"},
    {id:"guarantor",title:"GUARANTOR INFORMATION"},
  ];
  const sectionDone = {personal:!!(phone&&email),address:!!(street&&city),employment:!!(employer&&jobTitle),education:!!(university&&degree),guarantor:!!(guarantorName&&guarantorPhone)};

  return (
    <PageWrap>
      <BackBtn to="consent" setScreen={setScreen}/>
      <StepBar step={4}/>
      <h2 style={{margin:"0 0 20px",fontSize:20,fontWeight:700,color:"#111827"}}>Your Information</h2>
      {sections.map(s=>(
        <div key={s.id} style={{marginBottom:4}}>
          <SectionHeader id={s.id} title={s.title} status={sectionDone[s.id]?"done":"pending"} expanded={expandedSection===s.id} onToggle={()=>setExpandedSection(expandedSection===s.id?null:s.id)}/>
          {expandedSection===s.id && (
            <div style={{padding:"16px 0 8px"}}>
              {s.id==="personal" && <>
                <div style={{marginBottom:12}}>
                  <Label>Full Name (from NIN)</Label>
                  <Inp value={CANDIDATE_NAME} locked={true}/>
                </div>
                <div style={{marginBottom:12}}>
                  <Label>Date of Birth (from NIN)</Label>
                  <Inp value="15 March 1995" locked={true}/>
                </div>
                <div style={{marginBottom:12}}>
                  <Label required>Phone Number</Label>
                  <Inp value={phone} onChange={e=>setPhone(e.target.value)}/>
                </div>
                <div style={{marginBottom:4}}>
                  <Label required>Email Address</Label>
                  <Inp value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
              </>}
              {s.id==="address" && <>
                <div style={{marginBottom:12}}>
                  <Label required>Street Address</Label>
                  <Inp value={street} onChange={e=>setStreet(e.target.value)}/>
                </div>
                <div style={{marginBottom:12}}>
                  <Label required>City/Town</Label>
                  <Inp value={city} onChange={e=>setCity(e.target.value)}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  <div>
                    <Label required>State</Label>
                    <Inp value={addrState} onChange={e=>setAddrState(e.target.value)}/>
                  </div>
                  <div>
                    <Label required>LGA</Label>
                    <Inp value={lga} onChange={e=>setLga(e.target.value)}/>
                  </div>
                </div>
                <div style={{marginBottom:12}}>
                  <Label required>How long at this address?</Label>
                  <Inp value={duration} onChange={e=>setDuration(e.target.value)} placeholder="e.g. 2 years, 3 months"/>
                </div>
                <div style={{marginBottom:4}}>
                  <Label>Landmark (optional)</Label>
                  <Inp value={landmark} onChange={e=>setLandmark(e.target.value)} placeholder="e.g. Opposite First Bank"/>
                </div>
              </>}
              {s.id==="employment" && <>
                <p style={{margin:"0 0 12px",fontSize:13,fontWeight:600,color:"#374151"}}>Current / Most Recent Employer</p>
                <div style={{marginBottom:12}}><Label required>Company Name</Label><Inp value={employer} onChange={e=>setEmployer(e.target.value)}/></div>
                <div style={{marginBottom:12}}><Label required>Job Title</Label><Inp value={jobTitle} onChange={e=>setJobTitle(e.target.value)}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  <div><Label required>Start Date</Label><Inp value={startDate} onChange={e=>setStartDate(e.target.value)} placeholder="Month Year"/></div>
                  <div style={{paddingTop:28}}>
                    <Check checked={currentJob} onChange={()=>setCurrentJob(p=>!p)}>Currently here</Check>
                  </div>
                </div>
                <div style={{marginBottom:12}}><Label required>HR/Manager Name</Label><Inp value={hrName} onChange={e=>setHrName(e.target.value)}/></div>
                <div style={{marginBottom:12}}><Label required>HR/Manager Email</Label><Inp value={hrEmail} onChange={e=>setHrEmail(e.target.value)}/></div>
                <div style={{marginBottom:4}}><Label>HR/Manager Phone</Label><Inp value={hrPhone} onChange={e=>setHrPhone(e.target.value)}/></div>
                <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #e5e7eb"}}>
                  <p style={{margin:"0 0 12px",fontSize:13,fontWeight:600,color:"#374151"}}>Previous Employer</p>
                  <div style={{marginBottom:12}}><Label>Company Name</Label><Inp placeholder="e.g. GTBank PLC"/></div>
                  <div style={{marginBottom:12}}><Label>Job Title</Label><Inp placeholder="e.g. Analyst"/></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                    <div><Label>Start Date</Label><Inp placeholder="Month Year"/></div>
                    <div><Label>End Date</Label><Inp placeholder="Month Year"/></div>
                  </div>
                  <div style={{marginBottom:12}}><Label>HR/Manager Name</Label><Inp/></div>
                  <div style={{marginBottom:12}}><Label>HR/Manager Email</Label><Inp/></div>
                  <div style={{marginBottom:4}}><Label>HR/Manager Phone</Label><Inp/></div>
                </div>
              </>}
              {s.id==="education" && <>
                <div style={{marginBottom:12}}><Label required>Institution Name</Label><Inp value={university} onChange={e=>setUniversity(e.target.value)}/></div>
                <div style={{marginBottom:12}}><Label required>Degree / Qualification</Label><Inp value={degree} onChange={e=>setDegree(e.target.value)}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
                  <div><Label>Grade / Class</Label><Inp value={grade} onChange={e=>setGrade(e.target.value)}/></div>
                  <div><Label>Year</Label><Inp value={gradYear} onChange={e=>setGradYear(e.target.value)} placeholder="YYYY"/></div>
                </div>
              </>}
              {s.id==="guarantor" && <>
                <div style={{marginBottom:12}}><Label required>Guarantor Full Name</Label><Inp value={guarantorName} onChange={e=>setGuarantorName(e.target.value)}/></div>
                <div style={{marginBottom:12}}><Label required>Relationship</Label><Inp value={guarantorRel} onChange={e=>setGuarantorRel(e.target.value)}/></div>
                <div style={{marginBottom:4}}><Label required>Phone Number</Label><Inp value={guarantorPhone} onChange={e=>setGuarantorPhone(e.target.value)}/></div>
              </>}
            </div>
          )}
        </div>
      ))}
      <Divider/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <SecondaryBtn onClick={()=>setShowSaveModal(true)}>Save & Exit</SecondaryBtn>
        <PrimaryBtn onClick={()=>setScreen("documents")} style={{width:"auto"}}>Continue →</PrimaryBtn>
      </div>
      <p style={{margin:"12px 0 0",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Your progress is saved automatically.</p>
    </PageWrap>
  );
}
