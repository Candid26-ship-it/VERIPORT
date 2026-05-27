import PageWrap from "../components/PageWrap.jsx";
import Divider from "../components/Divider.jsx";
import Card from "../components/Card.jsx";

export default function Blocked() {
  return (
    <PageWrap>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48,marginBottom:8}}>🚫</div>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Submission Blocked</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151",lineHeight:1.7}}>Your submission has been temporarily blocked due to multiple unsuccessful verification attempts.</p>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151",lineHeight:1.7}}>Our team has been notified and will review your case. You will receive an email with next steps within 1–2 business days.</p>
      <Divider/>
      <p style={{margin:"0 0 10px",fontSize:14,color:"#374151"}}>If you believe this is an error, please contact support with your reference number below.</p>
      <Card style={{textAlign:"center"}}>
        <p style={{margin:"0 0 4px",fontSize:12,color:"#6b7280"}}>Reference Number</p>
        <p style={{margin:0,fontSize:16,fontWeight:700,color:"#111827",fontFamily:"monospace"}}>VER-2026-0128-YIB</p>
        <p style={{margin:"6px 0 0",fontSize:12,color:"#6b7280"}}>support@dragnet.ng</p>
      </Card>
    </PageWrap>
  );
}
