import { CLIENT } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import DragnetLogo from "../components/DragnetLogo.jsx";
import Card from "../components/Card.jsx";
import Divider from "../components/Divider.jsx";

export default function Expired() {
  return (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48,marginBottom:8}}>⚠️</div>
        <h2 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,color:"#111827"}}>Link Expired</h2>
      </div>
      <Divider/>
      <p style={{margin:"0 0 14px",fontSize:14,color:"#374151",lineHeight:1.7}}>This verification link is no longer active.</p>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#374151",lineHeight:1.7}}>The submission deadline has passed or the link has been deactivated.</p>
      <Divider/>
      <p style={{margin:"0 0 16px",fontSize:14,color:"#374151",lineHeight:1.7}}>If you still need to complete your verification, please contact the organization that requested it (<strong>{CLIENT}</strong>) to request a new link.</p>
      <Card style={{textAlign:"center",marginBottom:16}}>
        <p style={{margin:"0 0 4px",fontSize:12,color:"#6b7280"}}>Reference</p>
        <p style={{margin:0,fontSize:15,fontWeight:700,color:"#111827",fontFamily:"monospace"}}>VER-2026-0128-YIB</p>
      </Card>
      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Questions? Contact <span style={{color:"#b91c1c"}}>support@dragnet.ng</span></p>
    </PageWrap>
  );
}
