import { useState, useRef } from "react";
import { CANDIDATE_NAME } from "./data.js";
import CandidateTopbar from "./components/CandidateTopbar.jsx";
import SaveModal from "./components/SaveModal.jsx";
import Welcome from "./screens/Welcome.jsx";
import Privacy from "./screens/Privacy.jsx";
import NIN from "./screens/NIN.jsx";
import NINFailed from "./screens/NINFailed.jsx";
import Blocked from "./screens/Blocked.jsx";
import FaceCapture from "./screens/FaceCapture.jsx";
import Consent from "./screens/Consent.jsx";
import Personal from "./screens/Personal.jsx";
import Documents from "./screens/Documents.jsx";
import Review from "./screens/Review.jsx";
import Confirmation from "./screens/Confirmation.jsx";
import Return from "./screens/Return.jsx";
import Expired from "./screens/Expired.jsx";

function CandidatePortal({ activeProfile, onSwitchProfile, onSignOut }) {
  // Global demo selector — show Return Visit or Link Expired for demo
  const [demoScreen, setDemoScreen] = useState(null); // null | "return" | "expired"
  const [screen, setScreen] = useState("welcome"); // welcome|privacy|nin|consent|personal|documents|review|confirmation|ninfailed|blocked
  const [ninAttempts, setNinAttempts] = useState(0);
  const [ninValue, setNinValue] = useState("");
  const [ninState, setNinState] = useState("idle"); // idle|verifying|success|error
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [consentChecks, setConsentChecks] = useState({employment:false,education:false,address:false,guarantor:false,criminal:false,share:false});
  const [signature, setSignature] = useState("");
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Personal data state
  const [phone, setPhone] = useState("+234 803 456 7890");
  const [email, setEmail] = useState("yusuf.ibrahim@gmail.com");
  const [street, setStreet] = useState("15 Ahmadu Bello Way, Apt 3B");
  const [city, setCity] = useState("Victoria Island");
  const [addrState, setAddrState] = useState("Lagos");
  const [lga, setLga] = useState("Eti-Osa");
  const [duration, setDuration] = useState("2 years, 3 months");
  const [landmark, setLandmark] = useState("Opposite First Bank");
  const [employer, setEmployer] = useState("Access Bank PLC");
  const [jobTitle, setJobTitle] = useState("Senior Analyst");
  const [startDate, setStartDate] = useState("March 2022");
  const [currentJob, setCurrentJob] = useState(true);
  const [hrName, setHrName] = useState("Mrs. Folake Adeyemi");
  const [hrEmail, setHrEmail] = useState("hr@accessbank.ng");
  const [hrPhone, setHrPhone] = useState("+234 802 345 6789");
  const [university, setUniversity] = useState("University of Lagos");
  const [degree, setDegree] = useState("B.Sc. Computer Science");
  const [grade, setGrade] = useState("Second Class Upper");
  const [gradYear, setGradYear] = useState("2018");
  const [guarantorName, setGuarantorName] = useState("Dr. Chukwuma Okonkwo");
  const [guarantorRel, setGuarantorRel] = useState("Former Manager");
  const [guarantorPhone, setGuarantorPhone] = useState("+234 805 678 9012");
  const [expandedSection, setExpandedSection] = useState("personal");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Document upload state
  const [uploadedDocs, setUploadedDocs] = useState({govId:"NIN_Slip_Yusuf.pdf", academic:null, address:null, employment:null, extra:null});

  // Face capture state
  const [faceCapture, setFaceCapture] = useState(null);
  const [faceCamState, setFaceCamState] = useState("idle"); // idle|active|captured|error
  const [faceCamError, setFaceCamError] = useState("");

  // Simulate NIN verification
  const verifyNIN = () => {
    if (ninValue.length !== 11) return;
    setNinState("verifying");
    setTimeout(() => {
      if (ninValue === "00000000000") {
        // simulate failed
        const newAttempts = ninAttempts + 1;
        setNinAttempts(newAttempts);
        if (newAttempts >= 3) { setScreen("blocked"); setNinState("idle"); }
        else { setScreen("ninfailed"); setNinState("idle"); }
      } else {
        setNinState("success");
      }
    }, 2000);
  };

  const allConsentChecked = Object.values(consentChecks).every(Boolean);
  const signatureValid = signature.toLowerCase().trim() === CANDIDATE_NAME.toLowerCase().trim();
  const requiredDocs = [uploadedDocs.govId, uploadedDocs.academic, uploadedDocs.address];
  const uploadedCount = requiredDocs.filter(Boolean).length;

  const faceVideoRef = useRef(null);
  const faceStreamRef = useRef(null);

  const startCamera = async () => {
    setFaceCamError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      faceStreamRef.current = stream;
      if (faceVideoRef.current) {
        faceVideoRef.current.srcObject = stream;
        faceVideoRef.current.play();
      }
      setFaceCamState("active");
    } catch (err) {
      const msg = err.name === "NotAllowedError"
        ? "Camera access was denied. Please allow camera access to continue."
        : "We could not access your camera on this device.";
      setFaceCamError(msg);
      setFaceCamState("error");
    }
  };

  const stopCamera = () => {
    if (faceStreamRef.current) {
      faceStreamRef.current.getTracks().forEach(t => t.stop());
      faceStreamRef.current = null;
    }
  };

  const capturePhoto = () => {
    const video = faceVideoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    setFaceCapture(dataUrl);
    setFaceCamState("captured");
  };

  const retakePhoto = () => {
    setFaceCapture(null);
    setFaceCamState("idle");
    setFaceCamError("");
  };

  const handleFaceFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setFaceCapture(ev.target.result); setFaceCamState("captured"); };
    reader.readAsDataURL(file);
  };

  // ═══ SCREEN ROUTER ════════════════════════════════════════════════════════════
  const renderPortalScreen = () => {

    // Demo overrides
    if (demoScreen === "expired") return <Expired/>;
    if (demoScreen === "return")  return <Return setDemoScreen={setDemoScreen} setScreen={setScreen}/>;

    switch(screen) {
      case "welcome":      return <Welcome setScreen={setScreen}/>;
      case "privacy":      return <Privacy setScreen={setScreen} privacyChecked={privacyChecked} setPrivacyChecked={setPrivacyChecked} termsChecked={termsChecked} setTermsChecked={setTermsChecked}/>;
      case "nin":          return <NIN setScreen={setScreen} ninState={ninState} ninValue={ninValue} setNinValue={setNinValue} confirmCheck={confirmCheck} setConfirmCheck={setConfirmCheck} verifyNIN={verifyNIN}/>;
      case "ninfailed":    return <NINFailed ninAttempts={ninAttempts} setNinValue={setNinValue} setNinState={setNinState} setScreen={setScreen}/>;
      case "blocked":      return <Blocked/>;
      case "face":         return <FaceCapture setScreen={setScreen} faceCapture={faceCapture} faceCamState={faceCamState} faceCamError={faceCamError} faceVideoRef={faceVideoRef} startCamera={startCamera} stopCamera={stopCamera} capturePhoto={capturePhoto} retakePhoto={retakePhoto} handleFaceFileUpload={handleFaceFileUpload}/>;
      case "consent":      return <Consent setScreen={setScreen} consentChecks={consentChecks} setConsentChecks={setConsentChecks} allConsentChecked={allConsentChecked} signature={signature} setSignature={setSignature} signatureValid={signatureValid}/>;
      case "personal":     return <Personal
        setScreen={setScreen} setShowSaveModal={setShowSaveModal} expandedSection={expandedSection} setExpandedSection={setExpandedSection}
        phone={phone} setPhone={setPhone} email={email} setEmail={setEmail}
        street={street} setStreet={setStreet} city={city} setCity={setCity} addrState={addrState} setAddrState={setAddrState} lga={lga} setLga={setLga} duration={duration} setDuration={setDuration} landmark={landmark} setLandmark={setLandmark}
        employer={employer} setEmployer={setEmployer} jobTitle={jobTitle} setJobTitle={setJobTitle} startDate={startDate} setStartDate={setStartDate} currentJob={currentJob} setCurrentJob={setCurrentJob}
        hrName={hrName} setHrName={setHrName} hrEmail={hrEmail} setHrEmail={setHrEmail} hrPhone={hrPhone} setHrPhone={setHrPhone}
        university={university} setUniversity={setUniversity} degree={degree} setDegree={setDegree} grade={grade} setGrade={setGrade} gradYear={gradYear} setGradYear={setGradYear}
        guarantorName={guarantorName} setGuarantorName={setGuarantorName} guarantorRel={guarantorRel} setGuarantorRel={setGuarantorRel} guarantorPhone={guarantorPhone} setGuarantorPhone={setGuarantorPhone}
      />;
      case "documents":    return <Documents setScreen={setScreen} setShowSaveModal={setShowSaveModal} uploadedDocs={uploadedDocs} setUploadedDocs={setUploadedDocs} uploadedCount={uploadedCount}/>;
      case "review":       return <Review
        setScreen={setScreen} setSubmitted={setSubmitted} confirmCheck={confirmCheck} setConfirmCheck={setConfirmCheck}
        phone={phone} email={email} street={street} city={city} addrState={addrState} lga={lga} duration={duration}
        employer={employer} jobTitle={jobTitle} startDate={startDate} currentJob={currentJob} hrName={hrName}
        university={university} degree={degree} grade={grade} gradYear={gradYear}
        guarantorName={guarantorName} guarantorRel={guarantorRel} guarantorPhone={guarantorPhone}
        uploadedDocs={uploadedDocs}
      />;
      case "confirmation": return <Confirmation email={email}/>;
      default:             return <Welcome setScreen={setScreen}/>;
    }
  };

  // ─── Main render ─────────────────────────────────────────────────────────────
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f1f5f9"}}>
      <CandidateTopbar demoScreen={demoScreen} setDemoScreen={setDemoScreen} activeProfile={activeProfile} onSwitchProfile={onSwitchProfile}/>
      {renderPortalScreen()}

      {/* Save & Exit Modal */}
      {showSaveModal && <SaveModal setShowSaveModal={setShowSaveModal}/>}
    </div>
  );
}

export { CandidatePortal };
export default CandidatePortal;
