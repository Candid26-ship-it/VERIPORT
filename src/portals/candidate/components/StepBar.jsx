import { STEPS } from "../data.js";

export default function StepBar({step, total=7}) {
  return (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:12,color:"#6b7280"}}>Step {step} of {total}</span>
        <span style={{fontSize:12,color:"#6b7280"}}>{STEPS[step-1]}</span>
      </div>
      <div style={{height:4,background:"#e5e7eb",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",background:"#b91c1c",borderRadius:4,width:`${(step/total)*100}%`,transition:"width .3s"}}/>
      </div>
    </div>
  );
}
