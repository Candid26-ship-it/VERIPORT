import { useState, useRef, useEffect } from "react";
import { ShieldIcon, LockIcon, EyeIcon, SI, ChevronRight, ChevronDown, ChevronLeft, MenuIcon, SearchSm, BellIcon, PeopleIcon, CheckIcon, HomeIcon } from "../components/Icons.jsx";
import { LOGIN_USERS, ROLE_PROFILES, USERS_LIST, ROLE_PERMISSIONS, BATCHES, BATCH_RETURNS, ADMIN_NAV, CE_NAV } from "../data/index.js";
import { Topbar } from "../components/Topbar.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

// ─── Client Portal Data ──────────────────────────────────────────────────────

const CP_BATCHES = [
  {
    id:"cpb1", name:"Q1 2026 Graduate Intake", status:"Active",
    candidates:48, services:6, flagged:2,
    tasksComplete:312, tasksTotal:480, started:"15 Feb 2026",
    serviceCards:[
      { name:"NIN Verification",       complete:48, total:48, flagged:0, status:"Complete"    },
      { name:"Employment Reference",   complete:32, total:48, flagged:2, status:"In Progress" },
      { name:"Academic Verification",  complete:24, total:48, flagged:0, status:"In Progress" },
      { name:"Address Verification",   complete:8,  total:48, flagged:0, status:"In Progress" },
      { name:"Guarantor Verification", complete:48, total:48, flagged:0, status:"Complete"    },
      { name:"Criminal Check",         complete:0,  total:48, flagged:0, status:"Pending"     },
    ],
  },
  {
    id:"cpb2", name:"Executive Hires Feb", status:"Active",
    candidates:7, services:8, flagged:0,
    tasksComplete:42, tasksTotal:56, started:"10 Feb 2026",
    serviceCards:[
      { name:"NIN Verification",              complete:7, total:7, flagged:0, status:"Complete"    },
      { name:"Employment Reference",          complete:7, total:7, flagged:0, status:"Complete"    },
      { name:"Academic Verification",         complete:6, total:7, flagged:0, status:"In Progress" },
      { name:"Address Verification",          complete:7, total:7, flagged:0, status:"Complete"    },
      { name:"Criminal Check",                complete:6, total:7, flagged:0, status:"In Progress" },
      { name:"Professional Membership",       complete:5, total:7, flagged:0, status:"In Progress" },
      { name:"Guarantor Verification",        complete:4, total:7, flagged:0, status:"In Progress" },
      { name:"Reference Check",               complete:0, total:7, flagged:0, status:"Pending"     },
    ],
  },
  {
    id:"cpb3", name:"Contract Staff Wave 3", status:"Ready",
    candidates:45, services:4, flagged:0,
    tasksComplete:180, tasksTotal:180, started:"01 Feb 2026",
    serviceCards:[
      { name:"NIN Verification",      complete:45, total:45, flagged:0, status:"Complete" },
      { name:"Employment Reference",  complete:45, total:45, flagged:0, status:"Complete" },
      { name:"Address Verification",  complete:45, total:45, flagged:0, status:"Complete" },
      { name:"Criminal Check",        complete:45, total:45, flagged:0, status:"Complete" },
    ],
  },
  {
    id:"cpb4", name:"IT Department Backfill", status:"Pending",
    candidates:16, services:6, flagged:0,
    tasksComplete:0, tasksTotal:96, started:"28 Feb 2026",
    serviceCards:[
      { name:"NIN Verification",      complete:0, total:16, flagged:0, status:"Pending" },
      { name:"Employment Reference",  complete:0, total:16, flagged:0, status:"Pending" },
      { name:"Academic Verification", complete:0, total:16, flagged:0, status:"Pending" },
      { name:"Address Verification",  complete:0, total:16, flagged:0, status:"Pending" },
      { name:"Criminal Check",        complete:0, total:16, flagged:0, status:"Pending" },
      { name:"Reference Check",       complete:0, total:16, flagged:0, status:"Pending" },
    ],
  },
];

const CP_DELIVERED_BATCHES = [
  { id:"cpd1", name:"Contract Staff Wave 2", candidates:45,  delivered:"28 Feb 2026" },
  { id:"cpd2", name:"IT Hires January",      candidates:12,  delivered:"15 Feb 2026" },
  { id:"cpd3", name:"Q4 2025 Graduate Intake",candidates:120,delivered:"18 Jan 2026" },
  { id:"cpd4", name:"Executive Search Dec",  candidates:8,   delivered:"22 Dec 2025" },
  { id:"cpd5", name:"Operations Staff Q4",   candidates:35,  delivered:"10 Dec 2025" },
];

// Task-level data per service per batch (for CP-04)
const CP_SERVICE_TASKS = {
  "cpb1-NIN Verification": {
    released: false,
    tasks: [
      { candidate:"John Doe",     employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 12345678901", positionVerified:"NIN: 12345678901", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"16 Feb 2026", notes:"NIN verified successfully against NIMC database." } },
      { candidate:"Jane Smith",   employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 23456789012", positionVerified:"NIN: 23456789012", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"16 Feb 2026", notes:"NIN verified successfully." } },
      { candidate:"Mike Brown",   employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 34567890123", positionVerified:"NIN: 34567890123", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"16 Feb 2026", notes:"NIN verified successfully." } },
      { candidate:"Sarah Green",  employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 45678901234", positionVerified:"NIN: 45678901234", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"17 Feb 2026", notes:"NIN verified successfully." } },
      { candidate:"Peter Obi",    employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 56789012345", positionVerified:"NIN: 56789012345", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"17 Feb 2026", notes:"NIN verified successfully." } },
      { candidate:"Grace Lee",    employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 67890123456", positionVerified:"NIN: 67890123456", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"17 Feb 2026", notes:"NIN verified successfully." } },
      { candidate:"David Ade",    employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 78901234567", positionVerified:"NIN: 78901234567", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"18 Feb 2026", notes:"NIN verified successfully." } },
      { candidate:"Mary Johnson", employer:"—", status:"Complete",   flagged:false, result:{ outcome:"Verified", positionClaimed:"NIN: 89012345678", positionVerified:"NIN: 89012345678", periodClaimed:"—", periodVerified:"—", contact:"NIMC Portal", verifiedOn:"18 Feb 2026", notes:"NIN verified successfully." } },
    ],
  },
  "cpb1-Guarantor Verification": {
    released: false,
    tasks: [
      { candidate:"John Doe",     employer:"Mr. Ade Bello",   status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Mr. Ade Bello", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08012345678", verifiedOn:"19 Feb 2026", notes:"Guarantor confirmed candidate's identity and good standing." } },
      { candidate:"Jane Smith",   employer:"Mrs. Ngozi Obi",  status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Mrs. Ngozi Obi", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08023456789", verifiedOn:"19 Feb 2026", notes:"Guarantor verified." } },
      { candidate:"Mike Brown",   employer:"Mr. Kola Ade",    status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Mr. Kola Ade", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08034567890", verifiedOn:"20 Feb 2026", notes:"Guarantor verified." } },
      { candidate:"Sarah Green",  employer:"Dr. Emeka Nwose", status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Dr. Emeka Nwose", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08045678901", verifiedOn:"20 Feb 2026", notes:"Guarantor verified." } },
      { candidate:"Peter Obi",    employer:"Mr. Tunde Sule",  status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Mr. Tunde Sule", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08056789012", verifiedOn:"20 Feb 2026", notes:"Guarantor verified." } },
      { candidate:"Grace Lee",    employer:"Mrs. Bisi Ojo",   status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Mrs. Bisi Ojo", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08067890123", verifiedOn:"21 Feb 2026", notes:"Guarantor verified." } },
      { candidate:"David Ade",    employer:"Mr. Chidi Eze",   status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Mr. Chidi Eze", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08078901234", verifiedOn:"21 Feb 2026", notes:"Guarantor verified." } },
      { candidate:"Mary Johnson", employer:"Mr. Seun Lawal",  status:"Complete", flagged:false, result:{ outcome:"Verified", positionClaimed:"Guarantor: Mr. Seun Lawal", positionVerified:"Confirmed", periodClaimed:"—", periodVerified:"—", contact:"08089012345", verifiedOn:"21 Feb 2026", notes:"Guarantor verified." } },
    ],
  },
  "cpb1-Employment Reference": {
    released: false,
    tasks: [
      { candidate:"John Doe",     employer:"Acme Corporation",  status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Software Engineer", positionVerified:"Software Engineer", periodClaimed:"Jan 2021 – Dec 2024", periodVerified:"Jan 2021 – Dec 2024", contact:"Jane HR (jane@acme.ng)", verifiedOn:"20 Feb 2026", notes:"Employment confirmed with positive reference." } },
      { candidate:"Jane Smith",   employer:"Beta Industries",   status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Marketing Executive", positionVerified:"Marketing Executive", periodClaimed:"Mar 2020 – Nov 2024", periodVerified:"Mar 2020 – Nov 2024", contact:"HR Dept (hr@beta.ng)", verifiedOn:"20 Feb 2026", notes:"All details confirmed." } },
      { candidate:"Mike Brown",   employer:"Gamma Holdings",    status:"Flagged",    flagged:true,  result:null,
        discrepancy:{ issue:"Job title mismatch", claimed:"Senior Manager", confirmed:"Manager (not Senior)", contact:"Bob HR (bob@gamma.ng)", verifiedOn:"22 Feb 2026" } },
      { candidate:"Sarah Green",  employer:"Delta Corp",        status:"In Progress",flagged:false, result:null },
      { candidate:"Peter Obi",    employer:"Echo Limited",      status:"In Progress",flagged:false, result:null },
      { candidate:"Grace Lee",    employer:"—",                 status:"Pending",    flagged:false, result:null },
      { candidate:"David Ade",    employer:"Foxtrot Inc",       status:"Flagged",    flagged:true,  result:null,
        discrepancy:{ issue:"Period mismatch", claimed:"Jan 2020 – Dec 2023", confirmed:"Jun 2021 – Dec 2023", contact:"HR Team (hr@foxtrot.ng)", verifiedOn:"21 Feb 2026" } },
      { candidate:"Mary Johnson", employer:"Golf Services",     status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Accountant", positionVerified:"Accountant", periodClaimed:"Apr 2019 – Jan 2025", periodVerified:"Apr 2019 – Jan 2025", contact:"Finance HR (hr@golf.ng)", verifiedOn:"21 Feb 2026", notes:"Confirmed." } },
    ],
  },
  "cpb1-Academic Verification": {
    released: false,
    tasks: [
      { candidate:"John Doe",     employer:"University of Lagos",   status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"B.Sc Computer Science", positionVerified:"B.Sc Computer Science", periodClaimed:"2015 – 2019", periodVerified:"2015 – 2019", contact:"Registry (registry@unilag.edu.ng)", verifiedOn:"21 Feb 2026", notes:"Degree confirmed with First Class." } },
      { candidate:"Jane Smith",   employer:"Lagos State University", status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"B.Sc Business Administration", positionVerified:"B.Sc Business Administration", periodClaimed:"2016 – 2020", periodVerified:"2016 – 2020", contact:"Examinations Office (exams@lasu.edu.ng)", verifiedOn:"21 Feb 2026", notes:"Degree confirmed." } },
      { candidate:"Mike Brown",   employer:"University of Ibadan",  status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"B.Sc Economics", positionVerified:"B.Sc Economics", periodClaimed:"2014 – 2018", periodVerified:"2014 – 2018", contact:"Registry (registry@ui.edu.ng)", verifiedOn:"22 Feb 2026", notes:"Degree confirmed." } },
      { candidate:"Sarah Green",  employer:"Covenant University",   status:"In Progress",flagged:false, result:null },
      { candidate:"Peter Obi",    employer:"ABU Zaria",             status:"In Progress",flagged:false, result:null },
      { candidate:"Grace Lee",    employer:"—",                     status:"Pending",    flagged:false, result:null },
      { candidate:"David Ade",    employer:"—",                     status:"Pending",    flagged:false, result:null },
      { candidate:"Mary Johnson", employer:"OAU Ile-Ife",           status:"In Progress",flagged:false, result:null },
    ],
  },
  "cpb1-Address Verification": {
    released: false,
    tasks: [
      { candidate:"John Doe",     employer:"12 Adeyemi St, Lagos",     status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"12 Adeyemi St, Surulere, Lagos", positionVerified:"12 Adeyemi St, Surulere, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Emeka O.", verifiedOn:"22 Feb 2026", notes:"Address confirmed. Candidate resides at stated address." } },
      { candidate:"Jane Smith",   employer:"5 Bode Thomas, Lagos",     status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"5 Bode Thomas, Surulere, Lagos", positionVerified:"5 Bode Thomas, Surulere, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Kemi A.", verifiedOn:"22 Feb 2026", notes:"Address confirmed." } },
      { candidate:"Mike Brown",   employer:"44 Allen Ave, Ikeja",      status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"44 Allen Ave, Ikeja, Lagos", positionVerified:"44 Allen Ave, Ikeja, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Tunde B.", verifiedOn:"23 Feb 2026", notes:"Address confirmed." } },
      { candidate:"Sarah Green",  employer:"22 Victoria Island, Lagos",status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"22 Adeola Odeku, V/I, Lagos", positionVerified:"22 Adeola Odeku, V/I, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Ngozi C.", verifiedOn:"23 Feb 2026", notes:"Address confirmed." } },
      { candidate:"Peter Obi",    employer:"8 Oba Akran, Ikeja",       status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"8 Oba Akran Ave, Ikeja, Lagos", positionVerified:"8 Oba Akran Ave, Ikeja, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Emeka O.", verifiedOn:"24 Feb 2026", notes:"Address confirmed." } },
      { candidate:"Grace Lee",    employer:"—",                        status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"3 Opebi Road, Ikeja, Lagos", positionVerified:"3 Opebi Road, Ikeja, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Kemi A.", verifiedOn:"24 Feb 2026", notes:"Address confirmed." } },
      { candidate:"David Ade",    employer:"—",                        status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"19 Oregun Road, Ikeja, Lagos", positionVerified:"19 Oregun Road, Ikeja, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Tunde B.", verifiedOn:"25 Feb 2026", notes:"Address confirmed." } },
      { candidate:"Mary Johnson", employer:"—",                        status:"Complete",   flagged:false,
        result:{ outcome:"Verified", positionClaimed:"7 Ikorodu Road, Lagos", positionVerified:"7 Ikorodu Road, Lagos", periodClaimed:"—", periodVerified:"—", contact:"Field Agent: Ngozi C.", verifiedOn:"25 Feb 2026", notes:"Address confirmed." } },
    ],
  },
  "cpb1-Criminal Check": {
    released: false,
    tasks: [
      { candidate:"John Doe",     employer:"—", status:"Pending", flagged:false, result:null },
      { candidate:"Jane Smith",   employer:"—", status:"Pending", flagged:false, result:null },
      { candidate:"Mike Brown",   employer:"—", status:"Pending", flagged:false, result:null },
      { candidate:"Sarah Green",  employer:"—", status:"Pending", flagged:false, result:null },
      { candidate:"Peter Obi",    employer:"—", status:"Pending", flagged:false, result:null },
      { candidate:"Grace Lee",    employer:"—", status:"Pending", flagged:false, result:null },
      { candidate:"David Ade",    employer:"—", status:"Pending", flagged:false, result:null },
      { candidate:"Mary Johnson", employer:"—", status:"Pending", flagged:false, result:null },
    ],
  },
  "cpb3-Employment Reference": {
    released: true,
    tasks: [
      { candidate:"John Doe",     employer:"Acme Corporation", status:"Complete", flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Senior Software Engineer", positionVerified:"Senior Software Engineer", periodClaimed:"Jan 2020 – Dec 2023", periodVerified:"Jan 2020 – Dec 2023", contact:"Jane HR (jane@acme.ng)", verifiedOn:"22 Feb 2026", notes:"Employment confirmed with positive reference." } },
      { candidate:"Jane Smith",   employer:"Beta Industries",  status:"Complete", flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Marketing Lead", positionVerified:"Marketing Lead", periodClaimed:"Mar 2019 – Nov 2023", periodVerified:"Mar 2019 – Nov 2023", contact:"HR Dept (hr@beta.ng)", verifiedOn:"22 Feb 2026", notes:"All details confirmed." } },
      { candidate:"Mike Brown",   employer:"Gamma Holdings",   status:"Complete", flagged:true,
        result:{ outcome:"Discrepancy", positionClaimed:"Senior Manager", positionVerified:"Manager", periodClaimed:"Jan 2018 – Dec 2022", periodVerified:"Jan 2018 – Dec 2022", contact:"Bob HR (bob@gamma.ng)", verifiedOn:"22 Feb 2026", notes:"Job title mismatch noted. Client accepted employer's version." } },
      { candidate:"Sarah Green",  employer:"Delta Corp",       status:"Complete", flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Analyst", positionVerified:"Analyst", periodClaimed:"Jun 2020 – Aug 2023", periodVerified:"Jun 2020 – Aug 2023", contact:"HR (hr@delta.ng)", verifiedOn:"21 Feb 2026", notes:"All details verified." } },
      { candidate:"Peter Obi",    employer:"Echo Limited",     status:"Complete", flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Developer", positionVerified:"Developer", periodClaimed:"Feb 2021 – Jan 2024", periodVerified:"Feb 2021 – Jan 2024", contact:"Admin (admin@echo.ng)", verifiedOn:"21 Feb 2026", notes:"Confirmed." } },
      { candidate:"Grace Lee",    employer:"Foxtrot Inc",      status:"Complete", flagged:false,
        result:{ outcome:"Verified", positionClaimed:"Officer", positionVerified:"Officer", periodClaimed:"Apr 2020 – Dec 2023", periodVerified:"Apr 2020 – Dec 2023", contact:"HR (hr@foxtrot.ng)", verifiedOn:"20 Feb 2026", notes:"Confirmed." } },
    ],
  },
};

// ─── Client Portal ────────────────────────────────────────────────────────────

function ClientPortal({ activeProfile, onSwitchProfile, onSignOut }) {
  const [activeNav, setActiveNav]           = useState("Dashboard");
  const [selectedBatch, setSelectedBatch]   = useState(null);
  const [selectedService, setSelectedService] = useState(null); // { batchId, serviceName }
  const [selectedTask, setSelectedTask]     = useState(null);   // task object
  const [reportSearch, setReportSearch]     = useState("");
  const [taskResponses, setTaskResponses]   = useState({});     // key: "batchId-service-candidate" => response
  const [downloadOpen, setDownloadOpen]     = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);     // { batch }
  const [reportCandidate, setReportCandidate] = useState(null);   // candidate object from report list
  // Dashboard state
  const [batchSearch, setBatchSearch]       = useState("");
  const [statusFilter, setStatusFilter]     = useState("All Status");
  const [filterOpen, setFilterOpen]         = useState(false);
  // Service tasks state
  const [svcFilter, setSvcFilter]           = useState("All");
  const [candSearch, setCandSearch]         = useState("");
  // Flagged task state
  const [discChoice, setDiscChoice]         = useState("");
  const [discNote, setDiscNote]             = useState("");

  const downloadRef = useRef();
  const filterRef   = useRef();

  useEffect(() => {
    const h = e => {
      if (downloadRef.current && !downloadRef.current.contains(e.target)) setDownloadOpen(null);
      if (filterRef.current   && !filterRef.current.contains(e.target))   setFilterOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const navigate = (nav) => {
    setActiveNav(nav);
    setSelectedBatch(null);
    setSelectedService(null);
    setSelectedTask(null);
    setSelectedReport(null);
    setReportCandidate(null);
  };

  // ── Shared sub-components ──────────────────────────────────────────────────
  const CPTopbar = () => (
    <div style={{display:"flex",alignItems:"center",padding:"0 24px",height:56,background:"white",borderBottom:"1px solid #e5e7eb",flexShrink:0,zIndex:10}}>
      <div style={{display:"flex",alignItems:"center",gap:8,fontWeight:700,fontSize:15,color:"#111827"}}>
        <div style={{width:28,height:28,background:"#b91c1c",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
        </div>
        DRAGNET SOLUTIONS
        <span style={{fontSize:12,fontWeight:400,color:"#9ca3af",marginLeft:4}}>Verification Portal</span>
      </div>
      <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:12}}>ZB</div>
          <span style={{fontSize:14,fontWeight:600,color:"#111827"}}>Zenith Bank</span>
        </div>
        <button onClick={onSignOut}
          style={{padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
          Logout
        </button>
      </div>
    </div>
  );

  const BackBtn = ({ label, onClick }) => (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0,fontWeight:500}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      {label}
    </button>
  );

  const StatusBadge = ({ status }) => {
    const map = {
      "Active":      { bg:"#dbeafe", c:"#1d4ed8" },
      "Pending":     { bg:"#f3f4f6", c:"#6b7280" },
      "Ready":       { bg:"#fef9c3", c:"#a16207" },
      "Delivered":   { bg:"#dcfce7", c:"#15803d" },
      "Complete":    { bg:"#dcfce7", c:"#15803d" },
      "In Progress": { bg:"#dbeafe", c:"#1d4ed8" },
      "Flagged":     { bg:"#fee2e2", c:"#b91c1c" },
      "Verified":    { bg:"#dcfce7", c:"#15803d" },
      "Discrepancy": { bg:"#fef9c3", c:"#a16207" },
      "Released":    { bg:"#dcfce7", c:"#15803d" },
    };
    const s = map[status] || { bg:"#f3f4f6", c:"#6b7280" };
    return <span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:s.bg,color:s.c}}>{status}</span>;
  };

  const GatedBanner = () => (
    <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"10px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      <span style={{fontSize:13,color:"#1e40af"}}>Verification results will be available after the batch is released by your account manager.</span>
    </div>
  );

  // ── CP-02: Dashboard ───────────────────────────────────────────────────────
  const renderDashboard = () => {
    const activeBatches   = CP_BATCHES.filter(b => b.status === "Active").length;
    const actionRequired  = CP_BATCHES.reduce((n, b) => n + (b.flagged || 0), 0);
    const completedMonth  = CP_DELIVERED_BATCHES.length;

    const filtered = CP_BATCHES.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(batchSearch.toLowerCase());
      const matchStatus = statusFilter === "All Status" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });

    return (
      <div style={{padding:"32px"}}>
        <h1 style={{margin:"0 0 24px",fontSize:24,fontWeight:700,color:"#111827"}}>Welcome back, Zenith Bank</h1>

        {/* Stat cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:32}}>
          {[
            { label:"Active Batches",     value:activeBatches,  sub:"Currently verifying",    color:"#3b82f6" },
            { label:"Action Required",    value:actionRequired, sub:"Items need your response",color:actionRequired>0?"#b91c1c":"#111827" },
            { label:"Completed This Month",value:completedMonth,sub:"Reports available",       color:"#15803d" },
          ].map(({label,value,sub,color})=>(
            <div key={label} style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px"}}>
              <p style={{margin:"0 0 4px",fontSize:12,fontWeight:600,color:"#9ca3af",letterSpacing:.5}}>{label.toUpperCase()}</p>
              <p style={{margin:"0 0 2px",fontSize:28,fontWeight:700,color}}>{value}</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>{sub}</p>
            </div>
          ))}
        </div>

        <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
        <h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:600,color:"#111827"}}>Active Batches</h2>

        {/* Batch table */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:32}}>
          {/* Search + filter row */}
          <div style={{padding:"14px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",gap:12,alignItems:"center"}}>
            <div style={{flex:1,position:"relative"}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
              <input value={batchSearch} onChange={e=>setBatchSearch(e.target.value)} placeholder="Search..."
                style={{width:"100%",padding:"8px 12px 8px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
            </div>
            <div ref={filterRef} style={{position:"relative"}}>
              <button onClick={()=>setFilterOpen(p=>!p)}
                style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:14,color:"#374151",cursor:"pointer"}}>
                {statusFilter} <ChevronDown/>
              </button>
              {filterOpen && (
                <div style={{position:"absolute",top:"calc(100%+6px)",right:0,background:"white",borderRadius:8,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",border:"1px solid #e5e7eb",zIndex:100,minWidth:140,overflow:"hidden"}}>
                  {["All Status","Active","Ready","Pending","Delivered"].map(s=>(
                    <button key={s} onClick={()=>{setStatusFilter(s);setFilterOpen(false);}}
                      style={{display:"block",width:"100%",padding:"10px 16px",border:"none",background:statusFilter===s?"#fef2f2":"white",color:statusFilter===s?"#b91c1c":"#374151",fontSize:13,cursor:"pointer",textAlign:"left",fontWeight:statusFilter===s?600:400}}
                      onMouseEnter={e=>{if(statusFilter!==s)e.currentTarget.style.background="#f9fafb";}}
                      onMouseLeave={e=>{if(statusFilter!==s)e.currentTarget.style.background="white";}}>{s}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["Batch","Progress","Services","Flagged","Status",""].map((h,i)=>(
                <th key={i} style={{padding:"12px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((b,i)=>{
                const pct = Math.round((b.tasksComplete/b.tasksTotal)*100);
                return (
                  <tr key={i} onClick={()=>setSelectedBatch(b)}
                    style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{b.name}</td>
                    <td style={{padding:"15px 20px",minWidth:140}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{flex:1,height:6,background:"#f3f4f6",borderRadius:4,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:"#b91c1c",borderRadius:4}}/>
                        </div>
                        <span style={{fontSize:12,color:"#6b7280",whiteSpace:"nowrap"}}>{b.tasksComplete}/{b.tasksTotal}</span>
                      </div>
                    </td>
                    <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{b.services}</td>
                    <td style={{padding:"15px 20px",fontSize:14}}>
                      {b.flagged > 0
                        ? <span style={{color:"#b91c1c",fontWeight:600}}>⚠ {b.flagged}</span>
                        : <span style={{color:"#9ca3af"}}>—</span>}
                    </td>
                    <td style={{padding:"15px 20px"}}><StatusBadge status={b.status}/></td>
                    <td style={{padding:"15px 20px",color:"#9ca3af"}}><ChevronRight/></td>
                  </tr>
                );
              })}
              {filtered.length===0 && <tr><td colSpan={6} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No batches found.</td></tr>}
            </tbody>
          </table>
        </div>

        <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
        <button onClick={()=>navigate("Reports")}
          style={{fontSize:14,color:"#b91c1c",background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0}}>
          View Reports Archive →
        </button>
      </div>
    );
  };

  // ── CP-03: Batch Detail (service cards) ────────────────────────────────────
  const renderBatchDetail = (batch) => {
    const pct = Math.round((batch.tasksComplete / batch.tasksTotal) * 100);
    const flaggedTotal = batch.serviceCards.reduce((n,s)=>n+s.flagged,0);

    const svcStatus = (svc) => {
      if (svc.flagged > 0) return "Flagged";
      if (svc.status === "Complete") return "Complete";
      if (svc.status === "Pending")  return "Pending";
      return "In Progress";
    };
    const svcBarColor = (svc) => {
      if (svc.flagged > 0) return "#b91c1c";
      if (svc.status === "Complete") return "#16a34a";
      if (svc.status === "Pending")  return "#d1d5db";
      return "#3b82f6";
    };

    return (
      <div style={{padding:"32px"}}>
        <BackBtn label="Back to Dashboard" onClick={()=>setSelectedBatch(null)}/>

        {/* Batch header */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{batch.name}</h1>
          <StatusBadge status={batch.status}/>
        </div>
        <p style={{margin:"0 0 20px",fontSize:14,color:"#6b7280"}}>
          {batch.candidates} candidates &nbsp;|&nbsp; {batch.services} services &nbsp;|&nbsp; Started: {batch.started}
        </p>

        {/* Overall progress */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px 24px",marginBottom:24}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:14,fontWeight:600,color:"#374151"}}>Overall Progress</span>
            <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>{batch.tasksComplete}/{batch.tasksTotal} tasks ({pct}%)</span>
          </div>
          <div style={{height:10,background:"#f3f4f6",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"#b91c1c",borderRadius:99}}/>
          </div>
        </div>

        <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
        <h2 style={{margin:"0 0 16px",fontSize:15,fontWeight:600,color:"#111827"}}>Services</h2>

        {/* Service cards grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
          {batch.serviceCards.map((svc,i)=>{
            const svcPct = Math.round((svc.complete/svc.total)*100);
            const st = svcStatus(svc);
            const taskKey = `${batch.id}-${svc.name}`;
            const hasTaskData = !!CP_SERVICE_TASKS[taskKey];
            return (
              <div key={i}
                onClick={()=>{ setSvcFilter("All"); setCandSearch(""); setSelectedService({batchId:batch.id, batchName:batch.name, batchStatus:batch.status, serviceName:svc.name, svc}); setSelectedTask(null); }}
                style={{background:"white",borderRadius:12,border:`1px solid ${svc.flagged>0?"#fecaca":"#e5e7eb"}`,padding:"20px",cursor:"pointer",transition:"box-shadow .15s"}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.08)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <p style={{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#111827"}}>{svc.name}</p>
                {/* Progress bar */}
                <div style={{height:6,background:"#f3f4f6",borderRadius:99,overflow:"hidden",marginBottom:8}}>
                  <div style={{height:"100%",width:`${svcPct}%`,background:svcBarColor(svc),borderRadius:99}}/>
                </div>
                <p style={{margin:"0 0 12px",fontSize:13,color:"#374151"}}>{svc.complete}/{svc.total}</p>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {svc.flagged > 0
                    ? <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>⚠ {svc.flagged} flagged</span>
                    : <StatusBadge status={st}/>}
                </div>
              </div>
            );
          })}
        </div>

        {flaggedTotal > 0 && (
          <>
            <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:16}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:14,color:"#b91c1c",fontWeight:600}}>⚠ {flaggedTotal} item{flaggedTotal>1?"s":""} require your attention</span>
              <button
                onClick={()=>{ const svc = batch.serviceCards.find(s=>s.flagged>0); if(svc) { setSelectedService({batchId:batch.id,batchName:batch.name,batchStatus:batch.status,serviceName:svc.name,svc}); setSelectedTask(null); } }}
                style={{padding:"8px 20px",background:"#b91c1c",color:"white",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                Review Flagged
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  // ── CP-04: Service Tasks ───────────────────────────────────────────────────
  const renderServiceTasks = ({ batchId, batchName, batchStatus, serviceName, svc }) => {
    const taskKey = `${batchId}-${serviceName}`;
    const serviceData = CP_SERVICE_TASKS[taskKey];
    const isReleased = serviceData?.released || false;
    const tasks = serviceData?.tasks || [];
    const isCardComplete = svc.status === "Complete";

    const filtered = tasks.filter(t => {
      const matchSearch = t.candidate.toLowerCase().includes(candSearch.toLowerCase());
      if (!matchSearch) return false;
      if (isCardComplete || svcFilter === "All") return true;
      if (svcFilter === "Flagged") return t.flagged;
      return t.status === svcFilter;
    });

    return (
      <div style={{padding:"32px"}}>
        <BackBtn label="Back to Batch" onClick={()=>{ setSelectedService(null); setSelectedTask(null); }}/>

        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:4}}>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{serviceName}</h1>
          <span style={{fontSize:14,fontWeight:600,color:"#374151"}}>{svc.complete}/{svc.total} tasks</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <span style={{fontSize:14,color:"#6b7280"}}>{batchName}</span>
          <StatusBadge status={isReleased ? "Released" : svc.status}/>
        </div>

        {!isReleased && <GatedBanner/>}

        {/* Filter tabs — only for incomplete service cards */}
        {!isCardComplete && (
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
            {["All","Complete","In Progress","Flagged","Pending"].map(f=>(
              <button key={f} onClick={()=>setSvcFilter(f)}
                style={{padding:"7px 16px",border:`1.5px solid ${svcFilter===f?"#b91c1c":"#e5e7eb"}`,borderRadius:20,background:svcFilter===f?"#b91c1c":"white",color:svcFilter===f?"white":"#374151",fontSize:13,fontWeight:500,cursor:"pointer"}}>
                {f==="Flagged"?"⚠ Flagged":f}
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div style={{position:"relative",maxWidth:360,marginBottom:16}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
          <input value={candSearch} onChange={e=>setCandSearch(e.target.value)} placeholder="Search candidate..."
            style={{width:"100%",padding:"8px 12px 8px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
        </div>

        {/* Task table */}
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["Candidate","Employer","Status","Action"].map((h,i)=>(
                <th key={i} style={{padding:"12px 20px",textAlign:i===3?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((t,i)=>{
                const responseKey = `${batchId}-${serviceName}-${t.candidate}`;
                const hasResponse = !!taskResponses[responseKey];
                const isComplete = t.status === "Complete";
                const isInProgress = t.status === "In Progress";
                const isFlagged = t.flagged;
                const canAct = isReleased || isFlagged || isComplete || isInProgress;
                return (
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white",cursor:canAct?"pointer":"default"}}
                    onMouseEnter={e=>{if(canAct)e.currentTarget.style.background="#fafafa";}}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}
                    onClick={()=>{
                      if (isReleased || (isComplete && serviceData?.tasks?.every(tk=>tk.result))) {
                        setSelectedTask({...t, batchId, batchName, serviceName, responseKey});
                      } else if (isComplete) {
                        setSelectedTask({...t, batchId, batchName, serviceName, responseKey, viewMode:"report"});
                      } else if (isInProgress) {
                        setSelectedTask({...t, batchId, batchName, serviceName, responseKey, viewMode:"progress"});
                      } else if (isFlagged) {
                        setSelectedTask({...t, batchId, batchName, serviceName, responseKey});
                      }
                    }}>
                    <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{t.candidate}</td>
                    <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{t.employer}</td>
                    <td style={{padding:"15px 20px"}}>
                      {isFlagged
                        ? <span style={{fontSize:13,fontWeight:600,color:"#b91c1c"}}>⚠ Flagged</span>
                        : <StatusBadge status={t.status}/>}
                    </td>
                    <td style={{padding:"15px 20px",textAlign:"right"}}>
                      {isComplete
                        ? <span style={{fontSize:13,color:"#b91c1c",fontWeight:600}}>View Report →</span>
                        : isInProgress
                          ? <span style={{fontSize:13,color:"#3b82f6",fontWeight:600}}>View Progress →</span>
                          : isFlagged
                            ? hasResponse
                              ? <span style={{fontSize:13,color:"#15803d",fontWeight:500}}>✓ Responded</span>
                              : <span style={{fontSize:13,color:"#b91c1c",fontWeight:600}}>Review →</span>
                            : <span style={{color:"#9ca3af",fontSize:13}}>—</span>}
                    </td>
                  </tr>
                );
              })}
              {filtered.length===0 && <tr><td colSpan={4} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No results found.</td></tr>}
            </tbody>
          </table>
        </div>

        {!isReleased && (
          <p style={{fontSize:13,color:"#6b7280",fontStyle:"italic"}}>
            ⓘ Verification results will be available after the batch is released.
          </p>
        )}
      </div>
    );
  };

  // ── CP-05A: Verified Task Detail (released, read-only) ─────────────────────
  const renderVerifiedTask = (task) => {
    const r = task.result;
    const Row = ({label, value, tag}) => (
      <div style={{display:"flex",padding:"12px 0",borderBottom:"1px solid #f3f4f6",alignItems:"center"}}>
        <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
        <span style={{fontSize:14,color:"#111827",flex:1}}>{value}</span>
        {tag && <span style={{fontSize:12,fontWeight:600,color:tag==="Match"?"#15803d":"#b91c1c",background:tag==="Match"?"#dcfce7":"#fee2e2",padding:"2px 10px",borderRadius:20,border:`1px solid ${tag==="Match"?"#bbf7d0":"#fecaca"}`}}>✓ {tag}</span>}
      </div>
    );
    return (
      <div style={{padding:"32px"}}>
        <BackBtn label={`Back to ${task.serviceName}`} onClick={()=>setSelectedTask(null)}/>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:720}}>
          {/* Header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>{task.serviceName.toUpperCase()}</p>
            <StatusBadge status={r.outcome}/>
          </div>
          {/* Claimed info */}
          <Row label="Candidate"        value={task.candidate}/>
          <Row label="Employer"         value={task.employer}/>
          <Row label="Position Claimed" value={r.positionClaimed}/>
          <Row label="Period Claimed"   value={r.periodClaimed}/>
          <div style={{margin:"20px 0 4px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>VERIFICATION RESULT</div>
          <div style={{borderTop:"1px solid #e5e7eb",marginBottom:4}}/>
          <Row label="Position Verified" value={r.positionVerified} tag={r.positionVerified===r.positionClaimed?"Match":"Mismatch"}/>
          <Row label="Period Verified"   value={r.periodVerified}   tag={r.periodVerified===r.periodClaimed?"Match":"Mismatch"}/>
          <Row label="HR Contact"        value={r.contact}/>
          <Row label="Verified On"       value={r.verifiedOn}/>
          <div style={{padding:"12px 0",display:"flex"}}>
            <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>Notes</span>
            <span style={{fontSize:14,color:"#111827"}}>{r.notes}</span>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:16,maxWidth:720}}>
          <button onClick={()=>setSelectedTask(null)}
            style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
            ← Back to List
          </button>
        </div>
      </div>
    );
  };

  // ── CP-05C: In Progress Task Detail ───────────────────────────────────────
  const renderInProgressTask = (task) => {
    const STEPS = [
      { label:"Request Sent",        done:true,  date:"20 Feb 2026" },
      { label:"Contact Established", done:true,  date:"21 Feb 2026" },
      { label:"Documents Requested", done:true,  date:"22 Feb 2026" },
      { label:"Awaiting Response",   done:false, date:null },
      { label:"Verification Complete",done:false, date:null },
    ];
    return (
      <div style={{padding:"32px"}}>
        <BackBtn label={`Back to ${task.serviceName}`} onClick={()=>setSelectedTask(null)}/>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:680}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>{task.serviceName.toUpperCase()}</p>
            <StatusBadge status="In Progress"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
            {[["Candidate",task.candidate],["Employer",task.employer||"—"]].map(([label,value])=>(
              <div key={label}>
                <p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af"}}>{label}</p>
                <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{value}</p>
              </div>
            ))}
          </div>
          <p style={{margin:"0 0 16px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>VERIFICATION PROGRESS</p>
          <div style={{position:"relative",paddingLeft:28}}>
            <div style={{position:"absolute",left:8,top:8,bottom:8,width:2,background:"#e5e7eb"}}/>
            {STEPS.map((step,i)=>(
              <div key={i} style={{position:"relative",marginBottom:20,display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{position:"absolute",left:-20,top:2,width:16,height:16,borderRadius:"50%",background:step.done?"#16a34a":"#e5e7eb",border:`2px solid ${step.done?"#16a34a":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1}}>
                  {step.done && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="9" height="9"><path d="M20 6L9 17l-5-5"/></svg>}
                </div>
                <div>
                  <p style={{margin:0,fontSize:14,fontWeight:600,color:step.done?"#111827":"#9ca3af"}}>{step.label}</p>
                  {step.date && <p style={{margin:"2px 0 0",fontSize:12,color:"#9ca3af"}}>{step.date}</p>}
                </div>
              </div>
            ))}
          </div>
          <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 16px",marginTop:8}}>
            <p style={{margin:0,fontSize:13,color:"#1d4ed8"}}>ⓘ Verification is currently in progress. Results will be available once complete.</p>
          </div>
        </div>
      </div>
    );
  };

  // ── CP-05B: Flagged Task (discrepancy response) ────────────────────────────
  const renderFlaggedTask = (task) => {
    const d = task.discrepancy;
    const submitted = !!taskResponses[task.responseKey];

    const submit = () => {
      if (!discChoice) return;
      setTaskResponses(prev => ({ ...prev, [task.responseKey]: { choice: discChoice, note: discNote } }));
      setDiscChoice("");
      setDiscNote("");
    };

    return (
      <div style={{padding:"32px"}}>
        <BackBtn label={`Back to ${task.serviceName}`} onClick={()=>setSelectedTask(null)}/>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:720}}>
          {/* Header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>{task.serviceName.toUpperCase()}</p>
            <StatusBadge status="Flagged"/>
          </div>
          {/* Candidate info */}
          {[["Candidate",task.candidate],["Employer",task.employer],["Position Claimed",d.claimed],["Period Claimed",task.result?.periodClaimed||"—"]].map(([label,value])=>(
            <div key={label} style={{display:"flex",padding:"11px 0",borderBottom:"1px solid #f3f4f6"}}>
              <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
              <span style={{fontSize:14,color:"#111827"}}>{value}</span>
            </div>
          ))}
          {/* Discrepancy block */}
          <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,padding:"16px 20px",margin:"20px 0"}}>
            <p style={{margin:"0 0 12px",fontSize:13,fontWeight:700,color:"#9a3412",letterSpacing:.5}}>⚠ DISCREPANCY FOUND</p>
            <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
              <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Issue</span>
              <span style={{fontSize:13,color:"#111827",fontWeight:500}}>{d.issue}</span>
            </div>
            <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
              <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Candidate Claimed</span>
              <span style={{fontSize:13,color:"#111827"}}>{d.claimed}</span>
            </div>
            <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
              <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Employer Confirmed</span>
              <span style={{fontSize:13,color:"#b91c1c",fontWeight:500}}>{d.confirmed}</span>
            </div>
            <div style={{display:"flex",padding:"8px 0",borderBottom:"1px solid #fed7aa"}}>
              <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>HR Contact</span>
              <span style={{fontSize:13,color:"#111827"}}>{d.contact}</span>
            </div>
            <div style={{display:"flex",padding:"8px 0"}}>
              <span style={{width:160,fontSize:13,color:"#7c3d12",flexShrink:0}}>Verified On</span>
              <span style={{fontSize:13,color:"#111827"}}>{d.verifiedOn}</span>
            </div>
          </div>

          {submitted ? (
            <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"16px 20px",textAlign:"center"}}>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#15803d"}}>✓ Response Submitted</p>
              <p style={{margin:0,fontSize:13,color:"#374151"}}>Your response has been recorded. The verification team has been notified.</p>
            </div>
          ) : (
            <>
              <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>YOUR RESPONSE REQUIRED</p>
              <p style={{margin:"0 0 16px",fontSize:14,color:"#374151"}}>How would you like to proceed?</p>
              {[
                { value:"accept",    label:"Accept employer's version",       sub:"Proceed with employer data as verified truth" },
                { value:"adverse",   label:"Flag as adverse finding",         sub:"Mark candidate with discrepancy in final report" },
                { value:"investigate",label:"Request further investigation",  sub:"Ask verification team to investigate further" },
              ].map(opt=>(
                <label key={opt.value} onClick={()=>setDiscChoice(opt.value)}
                  style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 16px",border:`1.5px solid ${discChoice===opt.value?"#b91c1c":"#e5e7eb"}`,borderRadius:8,cursor:"pointer",marginBottom:10,background:discChoice===opt.value?"#fef2f2":"white"}}>
                  <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${discChoice===opt.value?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                    {discChoice===opt.value && <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c"}}/>}
                  </div>
                  <div>
                    <p style={{margin:"0 0 2px",fontSize:14,fontWeight:600,color:"#111827"}}>{opt.label}</p>
                    <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{opt.sub}</p>
                  </div>
                </label>
              ))}
              <div style={{marginTop:16}}>
                <p style={{margin:"0 0 8px",fontSize:13,fontWeight:500,color:"#374151"}}>Notes (optional)</p>
                <textarea value={discNote} onChange={e=>setDiscNote(e.target.value)}
                  style={{width:"100%",height:80,padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,resize:"vertical",boxSizing:"border-box",outline:"none",color:"#374151"}}/>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
                <button onClick={()=>setSelectedTask(null)}
                  style={{padding:"9px 20px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,cursor:"pointer",color:"#374151"}}>Cancel</button>
                <button onClick={submit} disabled={!discChoice}
                  style={{padding:"9px 24px",border:"none",borderRadius:8,background:discChoice?"#b91c1c":"#e5e7eb",color:discChoice?"white":"#9ca3af",fontSize:13,fontWeight:600,cursor:discChoice?"pointer":"not-allowed"}}>
                  Submit Response
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ── CP-06: Reports Archive ─────────────────────────────────────────────────
  const renderReports = () => {
    // Level 3: candidate report detail (complete or in-progress)
    if (selectedReport && reportCandidate) {
      const c = reportCandidate;
      if (c.status === "In Progress") {
        const STEPS = [
          { label:"Request Sent",         done:true,  date:"20 Feb 2026" },
          { label:"Contact Established",  done:true,  date:"21 Feb 2026" },
          { label:"Documents Requested",  done:true,  date:"22 Feb 2026" },
          { label:"Awaiting Response",    done:false, date:null },
          { label:"Verification Complete",done:false, date:null },
        ];
        return (
          <div style={{padding:"32px"}}>
            <BackBtn label={`Back to ${selectedReport.batch.name}`} onClick={()=>setReportCandidate(null)}/>
            <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:680}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
                <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>INDIVIDUAL REPORT</p>
                <StatusBadge status="In Progress"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
                <div><p style={{margin:"0 0 4px",fontSize:12,color:"#9ca3af"}}>Candidate</p><p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{c.name}</p></div>
              </div>
              <p style={{margin:"0 0 16px",fontSize:13,fontWeight:700,color:"#374151",letterSpacing:.5}}>VERIFICATION PROGRESS</p>
              <div style={{position:"relative",paddingLeft:28}}>
                <div style={{position:"absolute",left:8,top:8,bottom:8,width:2,background:"#e5e7eb"}}/>
                {STEPS.map((step,i)=>(
                  <div key={i} style={{position:"relative",marginBottom:20,display:"flex",alignItems:"flex-start",gap:12}}>
                    <div style={{position:"absolute",left:-20,top:2,width:16,height:16,borderRadius:"50%",background:step.done?"#16a34a":"#e5e7eb",border:`2px solid ${step.done?"#16a34a":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1}}>
                      {step.done && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="9" height="9"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                    <div>
                      <p style={{margin:0,fontSize:14,fontWeight:600,color:step.done?"#111827":"#9ca3af"}}>{step.label}</p>
                      {step.date && <p style={{margin:"2px 0 0",fontSize:12,color:"#9ca3af"}}>{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"12px 16px",marginTop:8}}>
                <p style={{margin:0,fontSize:13,color:"#1d4ed8"}}>ⓘ Verification is currently in progress. Results will be available once complete.</p>
              </div>
            </div>
          </div>
        );
      }
      // Complete — full report
      const Row = ({label, value, tag}) => (
        <div style={{display:"flex",padding:"12px 0",borderBottom:"1px solid #f3f4f6",alignItems:"center"}}>
          <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
          <span style={{fontSize:14,color:"#111827",flex:1}}>{value}</span>
          {tag && <span style={{fontSize:12,fontWeight:600,color:tag==="Match"?"#15803d":"#b91c1c",background:tag==="Match"?"#dcfce7":"#fee2e2",padding:"2px 10px",borderRadius:20,border:`1px solid ${tag==="Match"?"#bbf7d0":"#fecaca"}`}}>✓ {tag}</span>}
        </div>
      );
      const r = c.result;
      return (
        <div style={{padding:"32px"}}>
          <BackBtn label={`Back to ${selectedReport.batch.name}`} onClick={()=>setReportCandidate(null)}/>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"28px",maxWidth:720}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #e5e7eb"}}>
              <p style={{margin:0,fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>INDIVIDUAL REPORT</p>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <StatusBadge status={r.outcome}/>
                <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Download Report
                </button>
              </div>
            </div>
            <Row label="Candidate"        value={c.name}/>
            <Row label="Employer"         value={c.employer||"—"}/>
            <Row label="Position Claimed" value={r.positionClaimed}/>
            <Row label="Period Claimed"   value={r.periodClaimed}/>
            <div style={{margin:"20px 0 4px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.8}}>VERIFICATION RESULT</div>
            <div style={{borderTop:"1px solid #e5e7eb",marginBottom:4}}/>
            <Row label="Position Verified" value={r.positionVerified} tag={r.positionVerified===r.positionClaimed?"Match":"Mismatch"}/>
            <Row label="Period Verified"   value={r.periodVerified}   tag={r.periodVerified===r.periodClaimed?"Match":"Mismatch"}/>
            <Row label="HR Contact"        value={r.contact}/>
            <Row label="Verified On"       value={r.verifiedOn}/>
            <div style={{padding:"12px 0",display:"flex"}}>
              <span style={{width:180,fontSize:13,color:"#6b7280",flexShrink:0}}>Notes</span>
              <span style={{fontSize:14,color:"#111827"}}>{r.notes}</span>
            </div>
          </div>
        </div>
      );
    }

    // Level 2: candidate list for a batch
    if (selectedReport) {
      const b = selectedReport.batch;
      const REPORT_CANDIDATES = [
        { name:"John Doe",    status:"Complete",   employer:"Acme Corporation", result:{ outcome:"Verified", positionClaimed:"Software Engineer", positionVerified:"Software Engineer", periodClaimed:"Jan 2021 – Dec 2024", periodVerified:"Jan 2021 – Dec 2024", contact:"Jane HR (jane@acme.ng)", verifiedOn:"20 Feb 2026", notes:"Employment confirmed with positive reference." } },
        { name:"Jane Smith",  status:"Complete",   employer:"Beta Industries",  result:{ outcome:"Verified", positionClaimed:"Marketing Lead", positionVerified:"Marketing Lead", periodClaimed:"Mar 2019 – Nov 2023", periodVerified:"Mar 2019 – Nov 2023", contact:"HR Dept (hr@beta.ng)", verifiedOn:"22 Feb 2026", notes:"All details confirmed." } },
        { name:"Mike Brown",  status:"Complete",   employer:"Gamma Holdings",   result:{ outcome:"Discrepancy", positionClaimed:"Senior Manager", positionVerified:"Manager", periodClaimed:"Jan 2018 – Dec 2022", periodVerified:"Jan 2018 – Dec 2022", contact:"Bob HR (bob@gamma.ng)", verifiedOn:"22 Feb 2026", notes:"Job title mismatch noted." } },
        { name:"Sarah Green", status:"Complete",   employer:"Delta Corp",       result:{ outcome:"Verified", positionClaimed:"Analyst", positionVerified:"Analyst", periodClaimed:"Jun 2020 – Aug 2023", periodVerified:"Jun 2020 – Aug 2023", contact:"HR (hr@delta.ng)", verifiedOn:"21 Feb 2026", notes:"All details verified." } },
        { name:"Peter Obi",   status:"In Progress",employer:"Echo Limited",     result:null },
      ];
      return (
        <div style={{padding:"32px"}}>
          <BackBtn label="Back to Reports Archive" onClick={()=>setSelectedReport(null)}/>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:4}}>
            <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{b.name}</h1>
            <button style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Download Report
            </button>
          </div>
          <p style={{margin:"0 0 24px",fontSize:14,color:"#6b7280"}}>Delivered: {b.delivered} &nbsp;|&nbsp; {b.candidates} candidates</p>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#fafafa"}}>
                {["Candidate","Status","Action"].map((h,i)=>(
                  <th key={i} style={{padding:"12px 20px",textAlign:i===2?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {REPORT_CANDIDATES.map((c,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6",cursor:"pointer",background:"white"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}
                    onClick={()=>setReportCandidate(c)}>
                    <td style={{padding:"15px 20px",fontSize:14,fontWeight:600,color:"#111827"}}>{c.name}</td>
                    <td style={{padding:"15px 20px"}}><StatusBadge status={c.status}/></td>
                    <td style={{padding:"15px 20px",textAlign:"right"}}>
                      <span style={{fontSize:13,color:"#b91c1c",fontWeight:600}}>View Report →</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    const filtered = CP_DELIVERED_BATCHES.filter(b => b.name.toLowerCase().includes(reportSearch.toLowerCase()));
    return (
      <div style={{padding:"32px"}}>
        <h1 style={{margin:"0 0 24px",fontSize:22,fontWeight:700,color:"#111827"}}>Reports Archive</h1>
        <hr style={{border:"none",borderTop:"1px solid #e5e7eb",marginBottom:24}}/>
        {/* Search */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{position:"relative",maxWidth:360}}>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af"}}><SearchSm/></span>
            <input value={reportSearch} onChange={e=>setReportSearch(e.target.value)} placeholder="Search batch..."
              style={{width:"100%",padding:"8px 12px 8px 34px",border:"1.5px solid #e5e7eb",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",color:"#374151"}}/>
          </div>
        </div>
        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden"}} ref={downloadRef}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafafa"}}>
              {["Batch","Candidates","Delivered","Actions"].map((h,i)=>(
                <th key={i} style={{padding:"12px 20px",textAlign:i===3?"right":"left",fontSize:13,fontWeight:600,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((b,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #f3f4f6",background:"white"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{padding:"15px 20px",fontSize:14,fontWeight:500,color:"#111827"}}>{b.name}</td>
                  <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{b.candidates}</td>
                  <td style={{padding:"15px 20px",fontSize:14,color:"#374151"}}>{b.delivered}</td>
                  <td style={{padding:"15px 20px",textAlign:"right",position:"relative"}}>
                    <button onClick={()=>setDownloadOpen(downloadOpen===b.id?null:b.id)}
                      style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>
                      Download <ChevronDown/>
                    </button>
                    {downloadOpen===b.id && (
                      <div style={{position:"absolute",right:20,top:"calc(100% - 6px)",background:"white",borderRadius:8,boxShadow:"0 8px 24px rgba(0,0,0,0.14)",border:"1px solid #e5e7eb",zIndex:200,minWidth:200,overflow:"hidden"}}>
                        <p style={{margin:0,padding:"10px 16px",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:.5,borderBottom:"1px solid #f3f4f6"}}>DOWNLOAD</p>
                        {["Summary Report (PDF)","Full Data (Excel)","Evidence Package (ZIP)"].map(opt=>(
                          <button key={opt} onClick={()=>setDownloadOpen(null)}
                            style={{display:"block",width:"100%",padding:"10px 16px",border:"none",background:"white",fontSize:13,color:"#374151",cursor:"pointer",textAlign:"left"}}
                            onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                            onMouseLeave={e=>e.currentTarget.style.background="white"}>
                            {opt}
                          </button>
                        ))}
                        <button onClick={()=>{setSelectedReport({batch:b});setDownloadOpen(null);}}
                          style={{display:"block",width:"100%",padding:"10px 16px",border:"none",background:"white",fontSize:13,color:"#b91c1c",fontWeight:600,cursor:"pointer",textAlign:"left"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
                          onMouseLeave={e=>e.currentTarget.style.background="white"}>
                          Individual Reports →
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length===0 && <tr><td colSpan={4} style={{padding:"32px",textAlign:"center",color:"#9ca3af",fontSize:14}}>No reports found.</td></tr>}
            </tbody>
          </table>
          <div style={{padding:"14px 20px",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>Showing 1–{filtered.length} of {CP_DELIVERED_BATCHES.length}</span>
            <div style={{display:"flex",gap:8}}>
              <button style={{padding:"6px 14px",border:"1.5px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>← Prev</button>
              <button style={{padding:"6px 14px",border:"1.5px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Nav items ──────────────────────────────────────────────────────────────
  const CP_NAV = [
    { label:"Dashboard", d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { label:"Reports",   d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" },
  ];

  // ── Main render router ─────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeNav === "Reports") return renderReports();

    // Dashboard nav — drill-down chain
    if (selectedTask) {
      if (selectedTask.viewMode === "progress") return renderInProgressTask(selectedTask);
      if (selectedTask.flagged && !selectedTask.result?.outcome) return renderFlaggedTask(selectedTask);
      if (selectedTask.result) return renderVerifiedTask(selectedTask);
      return renderInProgressTask(selectedTask);
    }
    if (selectedService) return renderServiceTasks(selectedService);
    if (selectedBatch)   return renderBatchDetail(selectedBatch);
    return renderDashboard();
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      <CPTopbar/>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Sidebar */}
        <div className="vp-sidebar vp-sidebar-open" style={{width:220,background:"white",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0}}>
          <nav style={{padding:"8px 8px",flex:1}}>
            {CP_NAV.map(item=>(
              <button key={item.label} onClick={()=>navigate(item.label)}
                style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:activeNav===item.label?600:400,background:activeNav===item.label?"#b91c1c":"transparent",color:activeNav===item.label?"white":"#374151",marginBottom:2,textAlign:"left"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d={item.d}/></svg>
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{padding:"12px 8px",borderTop:"1px solid #e5e7eb"}}>
            <button onClick={onSignOut} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,color:"#6b7280",background:"transparent"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              Sign Out
            </button>
          </div>
        </div>
        {/* Content */}
        <div style={{flex:1,overflowY:"auto"}}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export { ClientPortal };
