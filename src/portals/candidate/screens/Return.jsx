import { CANDIDATE_FIRST, DEADLINE } from "../data.js";
import PageWrap from "../components/PageWrap.jsx";
import DragnetLogo from "../components/DragnetLogo.jsx";
import Card from "../components/Card.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";

export default function Return({setDemoScreen, setScreen}) {
  return (
    <PageWrap>
      <DragnetLogo/>
      <Divider/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827",textAlign:"center"}}>Welcome Back, {CANDIDATE_FIRST}</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280",textAlign:"center"}}>You have a submission in progress.</p>
      <Card style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:14,fontWeight:600,color:"#111827"}}>Progress: 60% complete</span>
        </div>
        <div style={{height:8,background:"#e5e7eb",borderRadius:4,overflow:"hidden",marginBottom:16}}>
          <div style={{height:"100%",background:"#b91c1c",borderRadius:4,width:"60%"}}/>
        </div>
        {[
          {done:true,  label:"Privacy & Terms accepted"},
          {done:true,  label:"Identity verified"},
          {done:true,  label:"Consent provided"},
          {done:true,  label:"Personal data entered"},
          {done:false, label:"Documents pending (2 of 3)"},
          {done:false, label:"Final review"},
        ].map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            {s.done
              ? <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="15" height="15"><path d="M20 6L9 17l-5-5"/></svg>
              : <div style={{width:15,height:15,borderRadius:"50%",border:"2px solid #9ca3af"}}/>}
            <span style={{fontSize:13,color:s.done?"#374151":"#9ca3af"}}>{s.label}</span>
          </div>
        ))}
      </Card>
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"12px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:16}}>⏱️</span>
        <span style={{fontSize:13,color:"#92400e"}}>Deadline: <strong>{DEADLINE}</strong> (4 days remaining)</span>
      </div>
      <PrimaryBtn onClick={()=>{setDemoScreen(null);setScreen("documents");}}>Continue Where I Left Off →</PrimaryBtn>
      <Divider/>
      <p style={{margin:0,fontSize:13,color:"#6b7280",textAlign:"center"}}>Or start over: <button onClick={()=>{setDemoScreen(null);setScreen("welcome");}} style={{background:"none",border:"none",color:"#b91c1c",cursor:"pointer",fontSize:13,fontWeight:500}}>Clear and Restart</button></p>
    </PageWrap>
  );
}
