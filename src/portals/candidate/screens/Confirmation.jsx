import { CANDIDATE_FIRST, CLIENT } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import DragnetLogo from "../components/DragnetLogo.jsx";
import Divider from "../components/Divider.jsx";

export default function Confirmation({email}) {
  return (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="32" height="32"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 style={{margin:"0 0 6px",fontSize:22,fontWeight:700,color:"#111827"}}>Submission Complete</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#374151",lineHeight:1.7}}>Thank you, <strong>{CANDIDATE_FIRST}</strong>. Your information has been submitted for verification. Here's what happens next:</p>
      {[
        {n:"1",title:"VERIFICATION",text:"Our team will verify the information you provided. This typically takes 5–7 business days."},
        {n:"2",title:"THIRD-PARTY CONTACT",text:"We may contact your employers, institutions, and references for confirmation."},
        {n:"3",title:"RESULTS",text:`The verification results will be shared with ${CLIENT}. They will contact you regarding next steps in your application.`},
      ].map(s=>(
        <div key={s.n} style={{display:"flex",gap:12,marginBottom:16}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"#b91c1c",color:"white",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.n}</div>
          <div>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.4}}>{s.title}</p>
            <p style={{margin:0,fontSize:13,color:"#6b7280",lineHeight:1.6}}>{s.text}</p>
          </div>
        </div>
      ))}
      <Divider/>
      <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 14px",marginBottom:16}}>
        <p style={{margin:0,fontSize:13,color:"#1e40af"}}>A confirmation email has been sent to: <strong>{email}</strong></p>
      </div>
      <Divider/>
      <p style={{margin:"0 0 6px",fontSize:12,color:"#9ca3af",textAlign:"center"}}>Questions? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>You may now close this page.</p>
    </PageWrap>
  );
}
