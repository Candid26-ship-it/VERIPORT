import PageWrap from "../components/PageWrap.jsx";
import BackBtn from "../components/BackBtn.jsx";
import StepBar from "../components/StepBar.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import SecondaryBtn from "../components/SecondaryBtn.jsx";
import UploadZone from "../components/UploadZone.jsx";

export default function Documents({setScreen, setShowSaveModal, uploadedDocs, setUploadedDocs, uploadedCount}) {
  return (
    <PageWrap>
      <BackBtn to="personal" setScreen={setScreen}/>
      <StepBar step={5}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Upload Documents</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>Please upload the following documents. Accepted formats: PDF, JPG, PNG (max 5MB each)</p>

      <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>REQUIRED DOCUMENTS</p>
      <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"16px",marginBottom:20}}>
        <UploadZone docKey="govId"    label="Government-Issued ID"    required={true} description="Front and back of NIN card or passport" uploadedDocs={uploadedDocs} setUploadedDocs={setUploadedDocs}/>
        <div style={{borderTop:"1px solid #f3f4f6",margin:"0 0 16px"}}/>
        <UploadZone docKey="academic" label="Academic Certificate(s)" required={true} description="Upload your highest qualification" uploadedDocs={uploadedDocs} setUploadedDocs={setUploadedDocs}/>
        <div style={{borderTop:"1px solid #f3f4f6",margin:"0 0 16px"}}/>
        <UploadZone docKey="address"  label="Proof of Address"        required={true} description="Utility bill or bank statement (last 3 months)" uploadedDocs={uploadedDocs} setUploadedDocs={setUploadedDocs}/>
      </div>

      <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>OPTIONAL DOCUMENTS</p>
      <div style={{border:"1px solid #e5e7eb",borderRadius:10,padding:"16px",marginBottom:20}}>
        <UploadZone docKey="employment" label="Employment Letter" description="Letter from current employer (if available)" uploadedDocs={uploadedDocs} setUploadedDocs={setUploadedDocs}/>
        <div style={{borderTop:"1px solid #f3f4f6",margin:"0 0 16px"}}/>
        <UploadZone docKey="extra"      label="Additional Documents" description="Any other supporting documents" uploadedDocs={uploadedDocs} setUploadedDocs={setUploadedDocs}/>
      </div>

      <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 14px",marginBottom:20}}>
        <p style={{margin:0,fontSize:13,color:"#1e40af",fontWeight:500}}>Uploaded: {uploadedCount} of 3 required</p>
        {uploadedCount < 3 && <p style={{margin:"4px 0 0",fontSize:12,color:"#3b82f6"}}>{3-uploadedCount} more required document{3-uploadedCount>1?"s":""} to upload</p>}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <SecondaryBtn onClick={()=>setShowSaveModal(true)}>Save & Exit</SecondaryBtn>
        <PrimaryBtn onClick={()=>setScreen("review")} disabled={uploadedCount<3} style={{width:"auto"}}>Continue →</PrimaryBtn>
      </div>
    </PageWrap>
  );
}
