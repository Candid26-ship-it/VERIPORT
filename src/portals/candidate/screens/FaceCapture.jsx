import PageWrap from "../components/PageWrap.jsx";
import BackBtn from "../components/BackBtn.jsx";
import StepBar from "../components/StepBar.jsx";
import Card from "../components/Card.jsx";
import Divider from "../components/Divider.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import SecondaryBtn from "../components/SecondaryBtn.jsx";

export default function FaceCapture({setScreen, faceCapture, faceCamState, faceCamError, faceVideoRef, startCamera, stopCamera, capturePhoto, retakePhoto, handleFaceFileUpload}) {
  return (
    <PageWrap>
      <BackBtn to="nin" setScreen={setScreen}/>
      <StepBar step={3}/>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700,color:"#111827"}}>Facial Recognition</h2>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>We need to capture a photo of your face to confirm your identity before continuing.</p>

      {faceCamState !== "active" && faceCamState !== "captured" && (
        <Card style={{marginBottom:20}}>
          <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:"#374151"}}>Before you begin:</p>
          {["Be in a well-lit area","Face the camera directly","Remove hats, dark glasses, or anything covering your face","Keep your face centered in the frame"].map((tip,i) => (
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="14" height="14" style={{flexShrink:0,marginTop:2}}><path d="M20 6L9 17l-5-5"/></svg>
              <p style={{margin:0,fontSize:13,color:"#374151"}}>{tip}</p>
            </div>
          ))}
        </Card>
      )}

      {faceCamState === "error" && (
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"12px 16px",marginBottom:16}}>
          <p style={{margin:0,fontSize:13,fontWeight:600,color:"#b91c1c"}}>{faceCamError}</p>
        </div>
      )}

      {faceCamState === "active" && (
        <div style={{marginBottom:16}}>
          <div style={{position:"relative",borderRadius:12,overflow:"hidden",background:"#000",marginBottom:12}}>
            <video ref={faceVideoRef} autoPlay playsInline muted style={{width:"100%",display:"block",maxHeight:320,objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
              <div style={{width:160,height:200,border:"2px dashed rgba(255,255,255,0.6)",borderRadius:"50%"}}/>
            </div>
          </div>
          <PrimaryBtn onClick={capturePhoto}>📸 Capture Photo</PrimaryBtn>
        </div>
      )}

      {faceCamState === "captured" && faceCapture && (
        <div style={{marginBottom:16}}>
          <div style={{borderRadius:12,overflow:"hidden",marginBottom:12,border:"2px solid #bbf7d0"}}>
            <img src={faceCapture} alt="Captured face" style={{width:"100%",display:"block",maxHeight:320,objectFit:"cover"}}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,padding:"10px 14px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
            <span style={{fontSize:13,fontWeight:600,color:"#15803d"}}>Photo captured successfully</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <PrimaryBtn onClick={()=>{ stopCamera(); setScreen("consent"); }}>Confirm & Continue →</PrimaryBtn>
            <SecondaryBtn onClick={retakePhoto}>↺ Retake Photo</SecondaryBtn>
          </div>
        </div>
      )}

      {(faceCamState === "idle" || faceCamState === "error") && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <PrimaryBtn onClick={startCamera}>Start Camera</PrimaryBtn>
          <div style={{textAlign:"center"}}><span style={{fontSize:12,color:"#9ca3af"}}>or</span></div>
          <label style={{width:"100%",padding:"13px",border:"1.5px solid #d1d5db",borderRadius:10,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer",textAlign:"center",display:"block",boxSizing:"border-box"}}>
            Upload Photo Instead
            <input type="file" accept="image/*" onChange={handleFaceFileUpload} style={{display:"none"}}/>
          </label>
        </div>
      )}

      <Divider/>
      <p style={{margin:0,fontSize:12,color:"#9ca3af",textAlign:"center"}}>Your photo is used only to confirm your identity for this verification.</p>
    </PageWrap>
  );
}
