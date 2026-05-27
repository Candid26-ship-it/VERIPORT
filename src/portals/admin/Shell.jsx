import { useState } from "react";
import { ChevronLeft } from "../../components/Icons.jsx";
import { ADMIN_NAV } from "../../data/index.js";
import { Topbar } from "../../components/Topbar.jsx";

import NewUserForm from "./screens/NewUserForm.jsx";
import RolePermissionsPage from "./screens/RolePermissionsPage.jsx";
import UserManagement from "./screens/UserManagement.jsx";
import AdminClientList from "./screens/AdminClientList.jsx";
import AdminClientDetail from "./screens/AdminClientDetail.jsx";
import ClientCredentialsScreen from "./screens/ClientCredentialsScreen.jsx";
import NewClientForm from "./screens/NewClientForm.jsx";
import AdminDashboard from "./screens/AdminDashboard.jsx";
import ServiceCatalog from "./screens/ServiceCatalog.jsx";
import ServiceDetail from "./screens/ServiceDetail.jsx";
import ServModeView from "./screens/ServModeView.jsx";
import NewServiceForm from "./screens/NewServiceForm.jsx";
import NewServModeForm from "./screens/NewServModeForm.jsx";
import CommunicationTemplates from "./screens/CommunicationTemplates.jsx";
import NewTemplateForm from "./screens/NewTemplateForm.jsx";
import VARegistry from "./screens/VARegistry.jsx";
import InviteFieldAgentsForm from "./screens/InviteFieldAgentsForm.jsx";
import CoverageAreas from "./screens/CoverageAreas.jsx";
import FieldAgents from "./screens/FieldAgents.jsx";
import SystemConfiguration from "./screens/SystemConfiguration.jsx";
import Integrations from "./screens/Integrations.jsx";
import AuditLogs from "./screens/AuditLogs.jsx";
import SystemSettings from "./screens/SystemSettings.jsx";
import ReferenceData from "./screens/ReferenceData.jsx";

function AdminShell({ user, activeProfile, onSwitchProfile, onSignOut }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [subPage, setSubPage] = useState(null); // null | "newuser" | "permissions"
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServMode, setSelectedServMode] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [credentialsData, setCredentialsData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = (target) => {
    if (target === "newuser")        { setActiveNav("Internal Users"); setSubPage("newuser"); }
    else if (target === "permissions"){ setActiveNav("Internal Users"); setSubPage("permissions"); }
    else if (target === "internalusers"){ setActiveNav("Internal Users"); setSubPage(null); }
    else if (target === "servicecatalog") { setActiveNav("Service Catalog"); setSubPage(null); setSelectedService(null); setSelectedServMode(null); }
    else if (target === "newservice")      { setActiveNav("Service Catalog"); setSubPage("newservice"); }
    else if (target === "fieldagents")    { setActiveNav("Field Agents"); setSubPage(null); }
    else if (target === "newagent")         { setActiveNav("Field Agents"); setSubPage("newagent"); }
    else if (target === "coveragemap")      { setActiveNav("Field Agents"); setSubPage("coveragemap"); }
    else if (target === "templates")      { setActiveNav("Communication Templates"); setSubPage(null); }
    else if (target === "newtemplate")    { setActiveNav("Communication Templates"); setSubPage("newtemplate"); }
    else if (target === "auditlogs")      { setActiveNav("Audit Logs"); setSubPage(null); }
    else if (target === "newclient")      { setActiveNav("Clients"); setSubPage("newclient"); setSelectedClient(null); }
    else if (target === "clients")        { setActiveNav("Clients"); setSubPage(null); setSelectedClient(null); }
    else { setSubPage(null); }
  };

  const handleNavClick = (label) => {
    setActiveNav(label);
    setSubPage(null);
  };

  const handleSaveUser = (data) => {
    setSubPage(null);
    setActiveNav("Internal Users");
  };

  const renderContent = () => {
    if (activeNav === "Dashboard" && !subPage) return <AdminDashboard onNavigate={navigate}/>;
    if (activeNav === "Internal Users") {
      if (subPage === "newuser") return <NewUserForm onSave={handleSaveUser} onCancel={()=>setSubPage(null)}/>;
      if (subPage === "permissions") return <RolePermissionsPage onBack={()=>setSubPage(null)}/>;
      return <UserManagement onNewUser={()=>setSubPage("newuser")} onViewPermissions={()=>setSubPage("permissions")}/>;
    }
    if (activeNav === "Service Catalog") {
      if (subPage === "newservice") return <NewServiceForm onSave={()=>setSubPage(null)} onCancel={()=>setSubPage(null)}/>;
      if (subPage === "newservform" && selectedService) {
        return <NewServModeForm service={selectedService} onSave={()=>setSubPage("servicedetail")} onCancel={()=>setSubPage("servicedetail")}/>;
      }
      if (subPage === "servicedetail" && selectedService && selectedServMode) {
        return <ServModeView servform={selectedServMode} service={selectedService}
          onBack={()=>setSelectedServMode(null)}/>;
      }
      if (subPage === "servicedetail" && selectedService) {
        return <ServiceDetail service={selectedService}
          onBack={()=>{setSubPage(null);setSelectedService(null);setSelectedServMode(null);}}
          onViewServMode={(sf)=>setSelectedServMode(sf)}
          onAddServMode={()=>setSubPage("newservform")}/>;
      }
      return <ServiceCatalog onNewService={()=>setSubPage("newservice")}
        onViewService={(s)=>{setSelectedService(s);setSelectedServMode(null);setSubPage("servicedetail");}}/>;
    }
    if (activeNav === "Communication Templates") {
      if (subPage === "newtemplate") return <NewTemplateForm onSave={()=>setSubPage(null)} onCancel={()=>setSubPage(null)}/>;
      return <CommunicationTemplates onNewTemplate={()=>setSubPage("newtemplate")}/>;
    }
    if (activeNav === "VA Registry") return <VARegistry/>;
    if (activeNav === "Field Agents") {
      if (subPage === "newagent")    return <InviteFieldAgentsForm onSave={()=>setSubPage(null)} onCancel={()=>setSubPage(null)}/>;
      if (subPage === "coveragemap") return <CoverageAreas onBack={()=>setSubPage(null)}/>;
      return <FieldAgents onNewAgent={()=>setSubPage("newagent")} onCoverageMap={()=>setSubPage("coveragemap")}/>;
    }
    if (activeNav === "System Configuration") return <SystemConfiguration/>;
    if (activeNav === "Reference Data") return <ReferenceData/>;
    if (activeNav === "Integrations") return <Integrations/>;
    if (activeNav === "Audit Logs") return <AuditLogs/>;
    if (activeNav === "System Settings") return <SystemSettings/>;
    if (activeNav === "Clients") {
      if (subPage === "newclient" && credentialsData) return <ClientCredentialsScreen
        client={credentialsData.client} username={credentialsData.username} password={credentialsData.password}
        onDone={()=>{setSubPage(null);setCredentialsData(null);}}
        onSendAgain={()=>{}}/>;
      if (subPage === "newclient") return <NewClientForm
        onCredentials={(data)=>setCredentialsData(data)}
        onCancel={()=>setSubPage(null)}/>;
      if (subPage === "clientdetail" && selectedClient) return <AdminClientDetail client={selectedClient} onBack={()=>{setSubPage(null);setSelectedClient(null);}}/>;
      return <AdminClientList onNewClient={()=>{setSubPage("newclient");setCredentialsData(null);}} onViewClient={(c)=>{setSelectedClient(c);setSubPage("clientdetail");}}/>;
    }
    return (
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontSize:15}}>
        {activeNav} — coming soon
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,sans-serif",background:"#f8f9fa"}}>
      <Topbar user={user} activeProfile={activeProfile} onSwitchProfile={onSwitchProfile} onToggleSidebar={()=>setSidebarOpen(p=>!p)}/>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {sidebarOpen && (
          <div className="vp-sidebar vp-sidebar-open" style={{width:240,background:"white",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
            <div style={{padding:"16px 12px 8px"}}>
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <p style={{margin:0,fontSize:11,fontWeight:600,color:"#b91c1c",letterSpacing:.5,marginBottom:2}}>CURRENT ROLE</p>
                  <p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{activeProfile.role}</p>
                </div>
                <button style={{background:"none",border:"none",cursor:"pointer",color:"#b91c1c",padding:2,display:"flex"}}>
                  <ChevronLeft/>
                </button>
              </div>
            </div>
            <nav style={{padding:"4px 8px",flex:1}}>
              {ADMIN_NAV.map(item => (
                <button key={item.label} onClick={()=>handleNavClick(item.label)}
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
        )}
        {renderContent()}
      </div>
    </div>
  );
}


export { AdminShell };
export default AdminShell;
