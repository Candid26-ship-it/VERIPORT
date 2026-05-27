import { useState, useRef, useEffect } from "react";
import CPTopbar from "./components/CPTopbar.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import BatchDetail from "./screens/BatchDetail.jsx";
import ServiceTasks from "./screens/ServiceTasks.jsx";
import VerifiedTask from "./screens/VerifiedTask.jsx";
import InProgressTask from "./screens/InProgressTask.jsx";
import FlaggedTask from "./screens/FlaggedTask.jsx";
import Reports from "./screens/Reports.jsx";

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

  // ── Nav items ──────────────────────────────────────────────────────────────
  const CP_NAV = [
    { label:"Dashboard", d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { label:"Reports",   d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" },
  ];

  // ── Main render router ─────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeNav === "Reports") return (
      <Reports
        reportSearch={reportSearch} setReportSearch={setReportSearch}
        selectedReport={selectedReport} setSelectedReport={setSelectedReport}
        reportCandidate={reportCandidate} setReportCandidate={setReportCandidate}
        downloadOpen={downloadOpen} setDownloadOpen={setDownloadOpen}
        downloadRef={downloadRef}
      />
    );

    // Dashboard nav — drill-down chain
    if (selectedTask) {
      if (selectedTask.viewMode === "progress") return <InProgressTask task={selectedTask} setSelectedTask={setSelectedTask}/>;
      if (selectedTask.flagged && !selectedTask.result?.outcome) return (
        <FlaggedTask
          task={selectedTask}
          setSelectedTask={setSelectedTask}
          taskResponses={taskResponses} setTaskResponses={setTaskResponses}
          discChoice={discChoice} setDiscChoice={setDiscChoice}
          discNote={discNote} setDiscNote={setDiscNote}
        />
      );
      if (selectedTask.result) return <VerifiedTask task={selectedTask} setSelectedTask={setSelectedTask}/>;
      return <InProgressTask task={selectedTask} setSelectedTask={setSelectedTask}/>;
    }
    if (selectedService) return (
      <ServiceTasks
        {...selectedService}
        setSelectedService={setSelectedService}
        setSelectedTask={setSelectedTask}
        svcFilter={svcFilter} setSvcFilter={setSvcFilter}
        candSearch={candSearch} setCandSearch={setCandSearch}
        taskResponses={taskResponses}
      />
    );
    if (selectedBatch) return (
      <BatchDetail
        batch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        setSelectedService={setSelectedService}
        setSelectedTask={setSelectedTask}
        setSvcFilter={setSvcFilter}
        setCandSearch={setCandSearch}
      />
    );
    return (
      <Dashboard
        batchSearch={batchSearch} setBatchSearch={setBatchSearch}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        filterOpen={filterOpen} setFilterOpen={setFilterOpen}
        filterRef={filterRef}
        setSelectedBatch={setSelectedBatch}
        navigate={navigate}
      />
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      <CPTopbar onSignOut={onSignOut}/>
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
export default ClientPortal;
