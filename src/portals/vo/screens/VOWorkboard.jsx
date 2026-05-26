import { useState } from "react";
import { ChevronLeft } from "../../../components/Icons.jsx";
import {
  EMAIL_QUEUED, EMAIL_AWAITING, EMAIL_REPLIED, EMAIL_DONE,
  FIELD_READY, FIELD_DISPATCHED, FIELD_INPROG, FIELD_QA, FIELD_DONE,
  PORTAL_READY, PORTAL_EVIDENCE, PORTAL_DONE,
  LETTER_GENERATED, LETTER_SENT, LETTER_ACKED, LETTER_REPLIED, LETTER_DONE,
  SCHOLAR_REVAL, SCHOLAR_CONFIRMED, SCHOLAR_SENT, SCHOLAR_QA,
} from "../data.js";
import SLABadge from "../components/SLABadge.jsx";
import OutcomeBadge from "../components/OutcomeBadge.jsx";
import ExecBadge from "../components/ExecBadge.jsx";
import VOTable from "../components/VOTable.jsx";
import TD from "../components/TD.jsx";
import VAInfoPanel from "../components/VAInfoPanel.jsx";
import PivotDrawer from "../components/PivotDrawer.jsx";
import ReturnToCEDrawer from "../components/ReturnToCEDrawer.jsx";
import NudgeDrawer from "../components/NudgeDrawer.jsx";
import RemindDrawer from "../components/RemindDrawer.jsx";
import SubmitDrawer from "../components/SubmitDrawer.jsx";
import AgentSelectDrawer from "../components/AgentSelectDrawer.jsx";
import LetterPreviewDrawer from "../components/LetterPreviewDrawer.jsx";

function VOWorkboard({ sf, onBack, onReturnToCE }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState({});
  const [drawer, setDrawer] = useState(null); // {type, task}
  const [taskDetail, setTaskDetail] = useState(null); // {task, context} — full-screen task detail
  const [portalSession, setPortalSession] = useState(null);
  const [sessionResult, setSessionResult] = useState("");
  const [skipVAReval, setSkipVAReval] = useState(sf.skipVARevalidation || false);
  const [selectedRevalRow, setSelectedRevalRow] = useState(null); // VA info panel — Revalidation tab
  const [selectedConfRow,  setSelectedConfRow]  = useState(null); // VA info panel — Confirmed tab

  // Derive SCHOLAR lane list and data from skipVAReval flag
  const scholarLanes  = skipVAReval ? ["Confirmed","Sent","QA"] : ["Revalidation","Confirmed","Sent","QA"];
  // When skip is enabled, any rows previously in Revalidation migrate to Confirmed
  const scholarConfirmedRows = skipVAReval
    ? [...SCHOLAR_REVAL.map(r=>({...r})), ...SCHOLAR_CONFIRMED]
    : SCHOLAR_CONFIRMED;
  // Map tab index to lane name for Scholar mode
  const scholarTabName = scholarLanes[activeTab] || "";

  const Tabs = () => {
    const lanes  = sf.mode==="Scholar" ? scholarLanes : sf.lanes;
    const counts = sf.mode==="Scholar"
      ? (skipVAReval
          ? [scholarConfirmedRows.length, 8, 27]
          : [sf.counts[0], scholarConfirmedRows.length, 8, 27])
      : sf.counts;
    return (
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #e5e7eb",marginBottom:20,flexWrap:"wrap"}}>
        {lanes.map((lane,i)=>(
          <button key={i} onClick={()=>setActiveTab(i)}
            style={{padding:"11px 18px",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:activeTab===i?600:400,
              color:activeTab===i?"#b91c1c":"#6b7280",borderBottom:activeTab===i?"2px solid #b91c1c":"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap"}}>
            {lane} <span style={{fontSize:13,color:activeTab===i?"#b91c1c":"#9ca3af"}}>({counts[i]})</span>
          </button>
        ))}
      </div>
    );
  };

  const BulkBar = ({ actions }) => (
    <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
      {actions.map((a,i)=>(
        <button key={i} onClick={a.onClick} style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer"}}>{a.label}</button>
      ))}
    </div>
  );

  const renderEmailMode = () => {
    if (activeTab===0) {
      const allQueuedSelected = EMAIL_QUEUED.every((_,i) => selectedRows[`q-${i}`]);
      const toggleAllQueued = () => {
        const next = {};
        if (!allQueuedSelected) EMAIL_QUEUED.forEach((_,i) => { next[`q-${i}`] = true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label:"☑ Select All", onClick: toggleAllQueued},
            {label:`📧 Send (${EMAIL_QUEUED.length})`, onClick:()=>{}}
          ]}/>
          <VOTable
            cols={["☐","CANDIDATE","EMPLOYER","CONTACT","SLA"]}
            rows={EMAIL_QUEUED.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`q-${i}`]} onChange={e=>setSelectedRows(p=>({...p,[`q-${i}`]:e.target.checked}))} style={{cursor:"pointer"}}/></TD>,
              <TD key="n" bold>{r.candidate}</TD>,
              <TD key="e">{r.employer}</TD>,
              <TD key="co" style={{fontSize:13,color:"#6b7280"}}>{r.contact}</TD>,
              <td key="s" style={{padding:"14px 18px"}}><SLABadge val={r.sla} risk={r.slaRisk} breach={r.slaBreach}/></td>,
            ])}
          />
        </>
      );
    }
    if (activeTab===1) {
      const allAwaitingSelected = EMAIL_AWAITING.every((_,i) => selectedRows[`a-${i}`]);
      const toggleAllAwaiting = () => {
        const next = {};
        if (!allAwaitingSelected) EMAIL_AWAITING.forEach((_,i) => { next[`a-${i}`] = true; });
        setSelectedRows(next);
      };
      const selectedAwaitingTasks = EMAIL_AWAITING.filter((_,i) => selectedRows[`a-${i}`]);
      const firstSelected = selectedAwaitingTasks[0];
      return (
        <>
          <BulkBar actions={[
            {label:"☑ Select All",    onClick: toggleAllAwaiting},
            {label:"🔄 Remind",       onClick:()=>setDrawer({type:"remind",  task: firstSelected ? {candidate:firstSelected.candidate, ext:firstSelected.ext} : {candidate:"Selected",ext:"—"}})},
            {label:"📲 Nudge",        onClick:()=>setDrawer({type:"nudge",   task: firstSelected ? {candidate:firstSelected.candidate, ext:firstSelected.ext} : {candidate:"Selected",ext:"—"}})},
            {label:"↩ Pivot",         onClick:()=>setDrawer({type:"pivot",   task:{servform:sf.id}})},
            {label:"↰ Return to CE",  onClick:()=>setDrawer({type:"returnce",task: firstSelected ? {candidate:firstSelected.candidate, ext:firstSelected.ext, servform:sf.id} : {servform:sf.id}})},
          ]}/>
          <VOTable
            cols={["☐","CANDIDATE","EXT. PARTY","DAYS","REMIND","NUDGE","STATUS","ACT."]}
            rows={EMAIL_AWAITING.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`a-${i}`]} onChange={e=>setSelectedRows(p=>({...p,[`a-${i}`]:e.target.checked}))} style={{cursor:"pointer"}}/></TD>,
              <TD key="n" bold>{r.candidate}</TD>,
              <TD key="e">{r.ext}</TD>,
              <td key="d" style={{padding:"14px 18px"}}><SLABadge val={r.days} risk={r.slaRisk} breach={r.slaBreach}/></td>,
              <TD key="r">{r.remind}</TD>,
              <TD key="nu">{r.nudge}</TD>,
              <td key="s" style={{padding:"14px 18px"}}><span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:r.status==="Opened"?"#eff6ff":r.status==="Delivered"?"#f0fdf4":"#f3f4f6",color:r.status==="Opened"?"#3b82f6":r.status==="Delivered"?"#16a34a":"#6b7280"}}>{r.status}</span></td>,
              <td key="a" style={{padding:"14px 18px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>setDrawer({type:"remind",task:{candidate:r.candidate,ext:r.ext}})} style={{padding:"5px 10px",border:"1px solid #3b82f6",borderRadius:6,background:"white",color:"#3b82f6",fontSize:12,fontWeight:500,cursor:"pointer"}}>Remind</button>
                  <button onClick={()=>setDrawer({type:"nudge",task:{candidate:r.candidate,ext:r.ext}})} style={{padding:"5px 10px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>Nudge</button>
                </div>
              </td>
            ])}
          />
          <p style={{fontSize:12,color:"#6b7280",marginTop:10}}>ⓘ Remind = resend to external party. Nudge = message to CANDIDATE to chase up.</p>
        </>
      );
    }
    if (activeTab===2) return ( // Responses (merged Replied + Done)
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>RESPONSES — All received responses. Review each individually before submitting.</p>
        <VOTable
          cols={["#","CANDIDATE","EXT. PARTY","REPLIED","RESPONSE VIA","OUTCOME","ACTION"]}
          rows={[...EMAIL_REPLIED.map((r,i)=>([
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.ext}</TD>,
            <TD key="d">{r.replied}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:r.via==="Secure Link"?"#eff6ff":"#f9fafb",color:r.via==="Secure Link"?"#3b82f6":"#374151"}}>{r.via}</span></td>,
            <td key="o" style={{padding:"14px 18px"}}><span style={{padding:"2px 8px",borderRadius:20,fontSize:12,fontWeight:500,background:"#fef9c3",color:"#854d0e"}}>Pending Review</span></td>,
            <td key="a" style={{padding:"14px 18px"}}>
              <button onClick={()=>setDrawer({type:"submit",task:{candidate:r.candidate,ext:r.ext}})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])), ...EMAIL_DONE.map((r,i)=>([
            <TD key="n">{EMAIL_REPLIED.length+i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.ext}</TD>,
            <TD key="d">{r.completed}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:"#f9fafb",color:"#374151"}}>—</span></td>,
            <td key="o" style={{padding:"14px 18px"}}><OutcomeBadge val={r.outcome}/></td>,
            <td key="a" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ]))]}
        />
      </>
    );
  };

  const renderFieldMode = () => {
    if (activeTab===0) return (
      <>
        <BulkBar actions={[{label:`🚗 Auto-Assign (${FIELD_READY.length})`},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","ADDRESS","STATE","SLA","ACTION"]}
          rows={FIELD_READY.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="a">{r.address}</TD>,
            <TD key="s">{r.state}</TD>,
            <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDrawer({type:"agentselect",task:r})} style={{padding:"5px 12px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:12,fontWeight:500,cursor:"pointer"}}>Offer</button>
                <button onClick={()=>setTaskDetail({task:{...r,sla:r.sla},context:"Field — Ready"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===1) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DISPATCHED — Agent accepted, planning/en route. ⓘ Monitoring only. Agent updates status via mobile app.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","ACCEPTED","STATE","STATUS","ACTION"]}
          rows={FIELD_DISPATCHED.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <TD key="ac">{r.accepted}</TD>,
            <TD key="s">{r.state}</TD>,
            <td key="st" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,background:"#eff6ff",color:"#3b82f6",fontWeight:500}}>{r.status}</span></td>,
            <td key="ac2" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:5},context:"Field — Dispatched"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===2) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>IN PROGRESS — Agent on-site or submitting. Task auto-moves to QA when agent submits evidence.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","LOCATION","STATUS","ACTION"]}
          rows={FIELD_INPROG.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <TD key="l">{r.location}</TD>,
            <td key="s" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,background:r.status==="On-site"?"#dcfce7":"#fef3c7",color:r.status==="On-site"?"#16a34a":"#d97706",fontWeight:500}}>{r.status}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:4},context:"Field — In Progress"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===3) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>QA — Review agent submissions. Each submission is unique — individual review required.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","SUBMITTED","PHOTOS","GPS","ACTION"]}
          rows={FIELD_QA.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <TD key="s">{r.submitted}</TD>,
            <td key="p" style={{padding:"14px 18px"}}><span style={{fontSize:13,fontWeight:500,color:r.photos==="4/4"?"#16a34a":"#d97706"}}>{r.photos}</span></td>,
            <td key="g" style={{padding:"14px 18px"}}><span style={{fontSize:16}}>{r.gps==="ok"?"✅":r.gps==="warn"?"⚠️":"❌"}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <button onClick={()=>setTaskDetail({task:{...r,sla:5},context:"Field — QA"})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===4) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DONE — Completed, submitted for Executive review.</p>
        <VOTable
          cols={["#","CANDIDATE","AGENT","OUTCOME","COMPLETED","EXEC REVIEW"]}
          rows={FIELD_DONE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="a">{r.agent}</TD>,
            <td key="o" style={{padding:"14px 18px"}}><OutcomeBadge val={r.outcome}/></td>,
            <TD key="d">{r.completed}</TD>,
            <td key="ex" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ])}
        />
      </>
    );
  };

  const renderPortalMode = () => {

    if (portalSession) return (
      <div>
        <button onClick={()=>setPortalSession(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
          <ChevronLeft/> Back to Queue
        </button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>PORTAL RUN SESSION</h2>
          <span style={{fontSize:13,color:"#6b7280"}}>Task 1 of {PORTAL_READY.length}</span>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"10px 16px",marginBottom:16,fontSize:13,color:"#374151",display:"flex",gap:24}}>
          <span><b>Candidate:</b> {portalSession.candidate}</span>
          <span><b>Exam:</b> WAEC {portalSession.year}</span>
          <span><b>No:</b> {portalSession.examNo}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CANDIDATE DATA (from batch)</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Name:</b> {portalSession.candidate}</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Exam Year:</b> {portalSession.year}</p>
            <p style={{margin:"0 0 12px",fontSize:13,color:"#374151"}}><b>Exam No:</b> {portalSession.examNo}</p>
            {["Mathematics A1","English B2","Physics B3","Chemistry A1","Biology C4","Geography B2","Agric Science B3","Economics A1","Civic Ed B2"].map((s,i)=>(
              <p key={i} style={{margin:"0 0 3px",fontSize:12,color:"#374151"}}>Subject {i+1}: {s}</p>
            ))}
          </div>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>PORTAL RESULT</p>
            <div style={{background:"#f9fafb",border:"2px dashed #d1d5db",borderRadius:8,padding:"32px 16px",textAlign:"center",marginBottom:16,cursor:"pointer"}}>
              <p style={{margin:"0 0 4px",fontSize:14,color:"#6b7280"}}>Paste screenshot here</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Ctrl+V or drag & drop</p>
            </div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:600,color:"#374151"}}>RESULT</p>
            {["Match","Partial","No Match","Not Found","Portal Error"].map(o=>(
              <label key={o} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                <div onClick={()=>setSessionResult(o)} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${sessionResult===o?"#b91c1c":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                  {sessionResult===o&&<div style={{width:7,height:7,borderRadius:"50%",background:"#b91c1c"}}/>}
                </div>
                {o}
              </label>
            ))}
            <div style={{display:"flex",gap:10,marginTop:16}}>
              <button onClick={()=>setPortalSession(null)} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>✅ Submit</button>
              <button style={{flex:1,padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>⏭ Next</button>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button onClick={()=>setDrawer({type:"returnce",task:{candidate:portalSession.candidate}})} style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>↩ Return to CE</button>
          <button onClick={()=>setDrawer({type:"pivot",task:{candidate:portalSession.candidate}})} style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>🔀 Pivot to WAEC-LETTER</button>
        </div>
      </div>
    );

    if (activeTab===0) return (
      <>
        <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setPortalSession(PORTAL_READY[0])} style={{padding:"10px 20px",border:"none",borderRadius:8,background:"#b91c1c",color:"white",fontWeight:600,fontSize:14,cursor:"pointer"}}>🚀 Start Batch Run ({PORTAL_READY.length})</button>
          <span style={{fontSize:13,color:"#6b7280"}}>Run portal checks sequentially</span>
        </div>
        <VOTable
          cols={["#","CANDIDATE","EXAM YEAR","EXAM NO","SUBJECTS","SLA","ACTION"]}
          rows={PORTAL_READY.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="y">{r.year}</TD>,
            <TD key="e">{r.examNo}</TD>,
            <TD key="s">{r.subjects}</TD>,
            <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setPortalSession(r)} style={{padding:"5px 12px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:12,fontWeight:500,cursor:"pointer"}}>Run</button>
                <button onClick={()=>setTaskDetail({task:{...r,sla:r.sla},context:"Portal — Ready"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===1) return (
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#111827"}}>PORTAL RUN SESSION</h2>
          <span style={{fontSize:13,color:"#6b7280"}}>Task 1 of {PORTAL_READY.length}</span>
        </div>
        <div style={{background:"#f9fafb",borderRadius:8,padding:"10px 16px",marginBottom:16,fontSize:13,color:"#374151",display:"flex",gap:24}}>
          <span><b>Candidate:</b> {PORTAL_READY[0].candidate}</span>
          <span><b>Exam:</b> WAEC {PORTAL_READY[0].year}</span>
          <span><b>No:</b> {PORTAL_READY[0].examNo}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>CANDIDATE DATA (from batch)</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Name:</b> {PORTAL_READY[0].candidate}</p>
            <p style={{margin:"0 0 6px",fontSize:13,color:"#374151"}}><b>Exam Year:</b> {PORTAL_READY[0].year}</p>
            <p style={{margin:"0 0 12px",fontSize:13,color:"#374151"}}><b>Exam No:</b> {PORTAL_READY[0].examNo}</p>
            {["Mathematics A1","English B2","Physics B3","Chemistry A1","Biology C4","Geography B2","Agric Science B3","Economics A1","Civic Ed B2"].map((s,i)=>(
              <p key={i} style={{margin:"0 0 3px",fontSize:12,color:"#374151"}}>Subject {i+1}: {s}</p>
            ))}
          </div>
          <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:"20px"}}>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#374151",letterSpacing:.5}}>PORTAL RESULT</p>
            <div style={{background:"#f9fafb",border:"2px dashed #d1d5db",borderRadius:8,padding:"32px 16px",textAlign:"center",marginBottom:16,cursor:"pointer"}}>
              <p style={{margin:"0 0 4px",fontSize:14,color:"#6b7280"}}>Paste screenshot here</p>
              <p style={{margin:0,fontSize:12,color:"#9ca3af"}}>Ctrl+V or drag & drop</p>
            </div>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:600,color:"#374151"}}>RESULT</p>
            {["Match","Partial","No Match","Not Found","Portal Error"].map(o=>(
              <label key={o} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer",fontSize:13,color:"#374151"}}>
                <div style={{width:16,height:16,borderRadius:"50%",border:"2px solid #d1d5db",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}/>
                {o}
              </label>
            ))}
            <p style={{margin:"12px 0 6px",fontSize:12,fontWeight:600,color:"#374151"}}>NOTES</p>
            <textarea placeholder="Optional notes..." style={{width:"100%",padding:"9px 12px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:60,outline:"none",boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:10,marginTop:12}}>
              <button style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>✅ Submit</button>
              <button style={{flex:1,padding:"10px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>⏭ Next Candidate</button>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>↩ Return to CE — Portal error / candidate data wrong</button>
          <button style={{padding:"8px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,color:"#374151",cursor:"pointer"}}>🔀 Pivot → Portal down, switch to WAEC-LETTER</button>
        </div>
      </div>
    );
    if (activeTab===2) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>EVIDENCE REVIEW — Verify screenshot + result accuracy before submission.</p>
        <VOTable
          cols={["#","CANDIDATE","EXAM","RESULT","SCREENSHOT","ACTION"]}
          rows={PORTAL_EVIDENCE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.exam}</TD>,
            <td key="r" style={{padding:"14px 18px"}}><OutcomeBadge val={r.result}/></td>,
            <td key="s" style={{padding:"14px 18px"}}><span style={{fontSize:14}}>{r.screenshot==="ok"?"✅ Clear":"⚠️ Blurry"}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                {r.screenshot==="ok"
                  ? <button onClick={()=>setDrawer({type:"submit",task:{candidate:r.candidate}})} style={{padding:"6px 14px",border:"1px solid #16a34a",borderRadius:6,background:"white",color:"#16a34a",fontSize:13,fontWeight:500,cursor:"pointer"}}>Confirm</button>
                  : <button onClick={()=>setTaskDetail({task:{...r,sla:3},context:"Portal — Flag"})} style={{padding:"6px 14px",border:"1px solid #d97706",borderRadius:6,background:"white",color:"#d97706",fontSize:13,fontWeight:500,cursor:"pointer"}}>Redo</button>
                }
                <button onClick={()=>setTaskDetail({task:{...r,sla:3},context:"Portal — Flag"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>Flag →</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===3) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DONE — Completed, submitted for Executive review.</p>
        <VOTable
          cols={["#","CANDIDATE","EXAM","RESULT","COMPLETED","EXEC REVIEW"]}
          rows={PORTAL_DONE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="e">{r.exam}</TD>,
            <td key="r" style={{padding:"14px 18px"}}><OutcomeBadge val={r.result}/></td>,
            <TD key="d">{r.completed}</TD>,
            <td key="ex" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ])}
        />
      </>
    );
  };

  const renderLetterMode = () => {
    if (activeTab===0) return (
      <>
        <BulkBar actions={[{label:"📧 Send via Email"},{label:"🚗 Dispatch via FE"},{label:"👤 VO Hand Deliver"},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","INSTITUTION","LETTER REF","SLA","ACTION"]}
          rows={LETTER_GENERATED.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <TD key="r">{r.ref}</TD>,
            <td key="s" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDrawer({type:"letterpreview",task:r})} style={{padding:"5px 12px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:12,fontWeight:500,cursor:"pointer"}}>Preview</button>
                <button onClick={()=>setTaskDetail({task:{...r,sla:r.sla},context:"Letter — Generated"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button>
              </div>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===1) return (
      <>
        <BulkBar actions={[{label:"🔄 Chase >5d"},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","INSTITUTION","VIA","DAYS","CHASES","ACTION"]}
          rows={LETTER_SENT.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:"#f3f4f6",color:"#374151"}}>{r.via}</span></td>,
            <td key="d" style={{padding:"14px 18px"}}><SLABadge val={r.days} risk={r.days>=5} breach={r.days>=8}/></td>,
            <TD key="ch">{r.chases}</TD>,
            <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:r.days},context:"Letter — Sent"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===2) return (
      <>
        <BulkBar actions={[{label:"🔄 Chase for Reply >3d"},{label:"☑ Select All"}]}/>
        <VOTable
          cols={["☐","CANDIDATE","INSTITUTION","ACK DATE","DAYS SINCE","ACTION"]}
          rows={LETTER_ACKED.map(r=>[
            <TD key="c"><input type="checkbox" style={{cursor:"pointer"}}/></TD>,
            <TD key="n" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <TD key="a">{r.ackDate}</TD>,
            <td key="d" style={{padding:"14px 18px"}}><SLABadge val={r.daysSince} risk={r.daysSince>=3} breach={r.daysSince>=6}/></td>,
            <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setTaskDetail({task:{...r,sla:r.daysSince},context:"Letter — Acknowledged"})} style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:13,cursor:"pointer"}}>→</button></td>
          ])}
        />
      </>
    );
    if (activeTab===3) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>REPLY RECEIVED — Review and capture evidence. Each reply is unique — individual review required.</p>
        <VOTable
          cols={["#","CANDIDATE","INSTITUTION","REPLIED","REPLY VIA","ACTION"]}
          rows={LETTER_REPLIED.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <TD key="d">{r.replied}</TD>,
            <td key="v" style={{padding:"14px 18px"}}><span style={{padding:"3px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:"#f3f4f6",color:"#374151"}}>{r.via}</span></td>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <button onClick={()=>setTaskDetail({task:{...r,sla:5},context:"Letter — Reply"})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])}
        />
      </>
    );
    if (activeTab===4) return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>DONE — Completed, submitted for Executive review.</p>
        <VOTable
          cols={["#","CANDIDATE","INSTITUTION","OUTCOME","COMPLETED","EXEC REVIEW"]}
          rows={LETTER_DONE.map((r,i)=>[
            <TD key="n">{i+1}</TD>,
            <TD key="c" bold>{r.candidate}</TD>,
            <TD key="i">{r.institution}</TD>,
            <td key="o" style={{padding:"14px 18px"}}><OutcomeBadge val={r.outcome}/></td>,
            <TD key="d">{r.completed}</TD>,
            <td key="ex" style={{padding:"14px 18px"}}><ExecBadge val={r.exec}/></td>
          ])}
        />
      </>
    );
  };

  const renderScholarMode = () => {
    // — Revalidation tab (only visible when skipVAReval=false) —
    if (scholarTabName==="Revalidation") {
      const allSel = SCHOLAR_REVAL.every((_,i)=>selectedRows[`rv-${i}`]);
      const toggleAll = () => {
        const next = {};
        if (!allSel) SCHOLAR_REVAL.forEach((_,i)=>{ next[`rv-${i}`]=true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label:`📧 Send Revalidation Emails (${SCHOLAR_REVAL.length})`, onClick:()=>{}},
            {label: allSel ? "☑ Deselect All" : "☑ Select All", onClick: toggleAll},
          ]}/>
          <VOTable
            cols={["☐","INSTITUTION","FACULTY","DEPARTMENT","VA","STUDENTS","SLA","→"]}
            rows={SCHOLAR_REVAL.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`rv-${i}`]} onChange={e=>{const n={...selectedRows};e.target.checked?n[`rv-${i}`]=true:delete n[`rv-${i}`];setSelectedRows(n);}} style={{cursor:"pointer"}}/></TD>,
              <TD key="i" bold>{r.inst}</TD>,
              <TD key="f">{r.faculty}</TD>,
              <TD key="d">{r.dept}</TD>,
              <TD key="v">{r.va}</TD>,
              <TD key="s">{r.students}</TD>,
              <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla} risk={r.atRisk}/></td>,
              <td key="ac" style={{padding:"14px 18px"}}><button onClick={()=>setSelectedRevalRow(r)} style={{padding:"5px 12px",border:"1px solid #7c3aed",borderRadius:6,background:"white",color:"#7c3aed",fontSize:13,cursor:"pointer"}}>VA Info →</button></td>
            ])}
          />
          {selectedRevalRow && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
              <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
                <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
                  <div>
                    <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                    <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedRevalRow.inst} · {selectedRevalRow.dept}</p>
                  </div>
                  <button onClick={()=>setSelectedRevalRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
                </div>
                <div style={{padding:"24px 20px",flex:1}}><VAInfoPanel row={selectedRevalRow}/></div>
              </div>
            </div>
          )}
        </>
      );
    }

    // — Confirmed tab —
    if (scholarTabName==="Confirmed") {
      const rows = scholarConfirmedRows;
      const allSel = rows.every((_,i)=>selectedRows[`cf-${i}`]);
      const toggleAll = () => {
        const next = {};
        if (!allSel) rows.forEach((_,i)=>{ next[`cf-${i}`]=true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label:`📧 Send Verification Requests (${rows.length})`, onClick:()=>{}},
            {label: allSel ? "☑ Deselect All" : "☑ Select All", onClick: toggleAll},
          ]}/>
          <VOTable
            cols={["☐","INSTITUTION","FACULTY","DEPARTMENT","VA","STUDENTS","SLA","ACTION"]}
            rows={rows.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`cf-${i}`]} onChange={e=>{const n={...selectedRows};e.target.checked?n[`cf-${i}`]=true:delete n[`cf-${i}`];setSelectedRows(n);}} style={{cursor:"pointer"}}/></TD>,
              <TD key="i" bold>{r.inst}</TD>,
              <TD key="f">{r.faculty||"—"}</TD>,
              <TD key="d">{r.dept}</TD>,
              <TD key="v">{r.va}</TD>,
              <TD key="s">{r.students}</TD>,
              <td key="sl" style={{padding:"14px 18px"}}><SLABadge val={r.sla}/></td>,
              <td key="ac" style={{padding:"14px 18px",display:"flex",gap:6}}>
                <button style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"#b91c1c",color:"white",fontSize:13,fontWeight:500,cursor:"pointer"}}>Send Request</button>
                <button onClick={()=>setSelectedConfRow(r)} style={{padding:"6px 10px",border:"1px solid #7c3aed",borderRadius:6,background:"white",color:"#7c3aed",fontSize:12,cursor:"pointer"}}>VA</button>
              </td>
            ])}
          />
          {selectedConfRow && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
              <div style={{background:"white",height:"100%",width:"100%",maxWidth:420,boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",overflowY:"auto",display:"flex",flexDirection:"column"}}>
                <div style={{background:"#7c3aed",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
                  <div>
                    <p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:.8}}>VA ASSIGNMENT — READ ONLY</p>
                    <p style={{margin:0,fontSize:14,fontWeight:600,color:"white"}}>{selectedConfRow.inst} · {selectedConfRow.dept}</p>
                  </div>
                  <button onClick={()=>setSelectedConfRow(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
                </div>
                <div style={{padding:"24px 20px",flex:1}}><VAInfoPanel row={selectedConfRow}/></div>
              </div>
            </div>
          )}
        </>
      );
    }

    // — Sent tab — Pivot + Return to CE live here —
    if (scholarTabName==="Sent") {
      const allSel = SCHOLAR_SENT.every((_,i)=>selectedRows[`st-${i}`]);
      const toggleAll = () => {
        const next = {};
        if (!allSel) SCHOLAR_SENT.forEach((_,i)=>{ next[`st-${i}`]=true; });
        setSelectedRows(next);
      };
      return (
        <>
          <BulkBar actions={[
            {label: allSel ? "☑ Deselect All" : "☑ Select All", onClick: toggleAll},
            {label:"🔄 Remind",       onClick:()=>setDrawer({type:"remind",task:{candidate:"Selected VAs",ext:"Institution"}})},
            {label:"📲 Nudge",        onClick:()=>setDrawer({type:"nudge", task:{candidate:"Selected Students",ext:"Institution"}})},
            {label:"🔀 Pivot",        onClick:()=>setDrawer({type:"pivot",task:{servform:sf.id}})},
            {label:"↩ Return to CE",  onClick:()=>setDrawer({type:"returnce",task:{servform:sf.id}})},
          ]}/>
          <VOTable
            cols={["☐","INSTITUTION","DEPARTMENT","VA","STUDENTS","SENT","DAYS","REMINDS","NUDGES","ACTION"]}
            rows={SCHOLAR_SENT.map((r,i)=>[
              <TD key="c"><input type="checkbox" checked={!!selectedRows[`st-${i}`]} onChange={e=>{const n={...selectedRows};e.target.checked?n[`st-${i}`]=true:delete n[`st-${i}`];setSelectedRows(n);}} style={{cursor:"pointer"}}/></TD>,
              <TD key="i" bold>{r.inst}</TD>,
              <TD key="d">{r.dept}</TD>,
              <TD key="v">{r.va}</TD>,
              <TD key="s">{r.students}</TD>,
              <TD key="se">{r.sent}</TD>,
              <td key="days" style={{padding:"14px 18px"}}><SLABadge val={r.days} risk={r.slaRisk} breach={r.slaBreach}/></td>,
              <TD key="r">{r.reminds}</TD>,
              <TD key="nu">{r.nudges}</TD>,
              <td key="ac" style={{padding:"14px 18px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>setDrawer({type:"remind",task:{candidate:r.va,ext:r.inst}})} style={{padding:"5px 10px",border:"1px solid #3b82f6",borderRadius:6,background:"white",color:"#3b82f6",fontSize:12,fontWeight:500,cursor:"pointer"}}>Remind</button>
                  <button onClick={()=>setDrawer({type:"nudge", task:{candidate:"Students",ext:r.va}})} style={{padding:"5px 10px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>Nudge</button>
                </div>
              </td>
            ])}
          />
          <p style={{fontSize:12,color:"#6b7280",marginTop:10}}>ⓘ Remind = resend to VA/HOD. Nudge = message to CANDIDATES to chase their HOD.</p>
        </>
      );
    }

    // — QA tab —
    if (scholarTabName==="QA") return (
      <>
        <p style={{fontSize:13,color:"#6b7280",marginBottom:12}}>QA — Review VA submissions per student. {SCHOLAR_QA.length} students awaiting review.</p>
        <VOTable
          cols={["STUDENT","DEPARTMENT","MATRIC NO","STATUS","RESULT","ACTION"]}
          rows={SCHOLAR_QA.map(r=>[
            <TD key="s" bold>{r.student}</TD>,
            <TD key="d">{r.dept}</TD>,
            <TD key="m">{r.matric}</TD>,
            <td key="st" style={{padding:"14px 18px"}}><span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:r.status==="Confirmed"?"#dcfce7":r.status==="Discrepancy"?"#fef3c7":"#fee2e2",color:r.status==="Confirmed"?"#16a34a":r.status==="Discrepancy"?"#d97706":"#b91c1c"}}>{r.status}</span></td>,
            <TD key="r">{r.result}</TD>,
            <td key="ac" style={{padding:"14px 18px"}}>
              <button onClick={()=>setDrawer({type:"submit",task:{candidate:r.student,ext:"Scholar VA"}})} style={{padding:"6px 14px",border:"1px solid #b91c1c",borderRadius:6,background:"white",color:"#b91c1c",fontSize:13,fontWeight:500,cursor:"pointer"}}>Review →</button>
            </td>
          ])}
        />
      </>
    );
  };

  const renderContent = () => {
    if (sf.mode==="Email")   return renderEmailMode();
    if (sf.mode==="Field")   return renderFieldMode();
    if (sf.mode==="Portal")  return renderPortalMode();
    if (sf.mode==="Letter")  return renderLetterMode();
    if (sf.mode==="Scholar") return renderScholarMode();
    return <p style={{color:"#9ca3af"}}>Mode not yet implemented.</p>;
  };

  // ── Task Detail full-screen view ──────────────────────────────────────────
  const renderTaskDetail = () => {
    const { task, context } = taskDetail;
    const TRow = ({label,value}) => (
      <div style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
        <span style={{minWidth:160,fontSize:13,color:"#6b7280",flexShrink:0}}>{label}</span>
        <span style={{fontSize:13,color:"#111827",fontWeight:500}}>{value||"—"}</span>
      </div>
    );
    const Section = ({title,children}) => (
      <div style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"18px 22px",marginBottom:12}}>
        <p style={{margin:"0 0 12px",fontSize:11,fontWeight:700,color:"#374151",letterSpacing:.6,textTransform:"uppercase"}}>{title}</p>
        {children}
      </div>
    );
    const slaColor = task.sla<=2?"#b91c1c":task.sla<=4?"#d97706":"#16a34a";
    return (
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        <button onClick={()=>setTaskDetail(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
          <ChevronLeft/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:20,fontWeight:700,color:"#111827"}}>{task.candidate}</h1>
            <span style={{fontSize:13,color:"#6b7280"}}>{sf.id} · {context}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:task.sla<=2?"#fef2f2":task.sla<=4?"#fffbeb":"#f0fdf4",borderRadius:8,border:`1px solid ${task.sla<=2?"#fecaca":task.sla<=4?"#fde68a":"#bbf7d0"}`}}>
            <span style={{fontSize:12,fontWeight:600,color:slaColor}}>SLA: {task.sla}d remaining</span>
          </div>
        </div>

        <Section title="Candidate Info">
          <TRow label="Candidate" value={task.candidate}/>
          <TRow label="External Party" value={task.ext||task.institution||task.agent||"—"}/>
          {task.address && <TRow label="Address" value={task.address}/>}
          {task.state   && <TRow label="State" value={task.state}/>}
          {task.landmark && <TRow label="Landmark" value={task.landmark||"Not provided"}/>}
        </Section>

        {/* Context-specific sections */}
        {context==="Field — Ready" && (
          <Section title="Field Details">
            <TRow label="Address" value={task.address}/>
            <TRow label="State" value={task.state}/>
            <TRow label="Landmark" value="Opposite First Bank (demo)"/>
            <TRow label="Documents" value="NIN Slip, Utility Bill"/>
          </Section>
        )}
        {context==="Field — Dispatched" && (
          <Section title="Agent Profile">
            <TRow label="Agent" value={task.agent}/>
            <TRow label="Contact" value="+234 812 000 0001 (demo)"/>
            <TRow label="Acceptance Rate" value="94%"/>
            <TRow label="Est. Visit Time" value="Within 24 hrs"/>
            <TRow label="Status" value={task.status}/>
            <TRow label="Task Brief" value="Address verification — confirm residency, photograph premises"/>
          </Section>
        )}
        {context==="Field — In Progress" && (
          <Section title="Live Agent Status">
            <TRow label="Agent" value={task.agent}/>
            <TRow label="Location" value={task.location}/>
            <TRow label="Status" value={task.status}/>
            <TRow label="GPS" value="🟢 Live tracking active (demo)"/>
            <TRow label="Photos Uploaded" value="2 / 4"/>
            <TRow label="Agent Notes" value="On-site. Resident confirmed present."/>
          </Section>
        )}
        {context==="Field — QA" && (<>
          <Section title="Submission Evidence">
            <TRow label="Agent" value={task.agent}/>
            <TRow label="Submitted" value={task.submitted}/>
            <TRow label="Photos" value={task.photos}/>
            <TRow label="GPS Status" value={task.gps==="ok"?"✅ Verified":task.gps==="warn"?"⚠️ Weak signal — review required":"❌ Not captured"}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
              {["📷 Photo_1.jpg","📷 Photo_2.jpg","📷 Photo_3.jpg","📷 Photo_4.jpg"].map((p,i)=>(
                <div key={i} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"28px 12px",textAlign:"center",fontSize:12,color:"#6b7280",cursor:"pointer"}}>
                  {p}<br/><span style={{fontSize:11,color:"#9ca3af"}}>Tap to enlarge</span>
                </div>
              ))}
            </div>
          </Section>
          <Section title="GPS Trail">
            <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"16px",marginBottom:12,textAlign:"center",color:"#15803d",fontSize:13}}>
              🗺 GPS trail: Agent checked in at {task.location||"target address"} at 10:42 AM · Departed 11:18 AM
            </div>
            <TRow label="Lat / Long" value="6.5244° N, 3.3792° E (demo)"/>
            <TRow label="On-site Duration" value="36 minutes"/>
          </Section>
          <Section title="Agent Notes & Attestation">
            <TRow label="Agent Notes" value="Property confirmed. Resident present and cooperative. Utility bill sighted."/>
            <TRow label="Neighbour Attestation" value="✅ Confirmed by neighbour (Mrs. Adaeze — Flat 2B)"/>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              <button onClick={()=>setDrawer({type:"submit",task})} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>✅ Approve Submission</button>
              <button onClick={()=>setDrawer({type:"returnce",task})} style={{padding:"10px 16px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,cursor:"pointer"}}>↩ Return to CE</button>
            </div>
          </Section>
        </>)}
        {context==="Portal — Ready" && (
          <Section title="Exam Details">
            <TRow label="Exam Year" value={task.year}/>
            <TRow label="Exam Number" value={task.examNo}/>
            <TRow label="Subjects" value={`${task.subjects} subjects`}/>
          </Section>
        )}
        {context==="Portal — Flag" && (
          <Section title="Evidence Review">
            <TRow label="Exam" value={task.exam}/>
            <TRow label="Result" value={task.result}/>
            <TRow label="Screenshot" value={task.screenshot==="ok"?"✅ Clear":"⚠️ Blurry — needs re-run"}/>
            <div style={{marginTop:12}}>
              <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>DISCREPANCY NOTES</label>
              <textarea placeholder="Describe the discrepancy..." style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:13,resize:"vertical",minHeight:70,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <button onClick={()=>setTaskDetail(null)} style={{marginTop:12,padding:"9px 20px",border:"1px solid #d97706",borderRadius:8,background:"white",color:"#d97706",fontSize:13,fontWeight:600,cursor:"pointer"}}>🚩 Flag & Save</button>
          </Section>
        )}
        {context==="Letter — Generated" && (
          <Section title="Letter Details">
            <TRow label="Institution" value={task.institution}/>
            <TRow label="Letter Ref" value={task.ref}/>
            <TRow label="SLA" value={`${task.sla} days`}/>
            <div style={{marginTop:12,padding:"12px 16px",background:"#fafafa",borderRadius:8,border:"1px solid #e5e7eb"}}>
              <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#374151"}}>Edit before dispatch</p>
              <textarea defaultValue="Dear Sir/Madam,\n\nWe write to verify the employment records of the above-named individual..." style={{width:"100%",padding:"10px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:12,resize:"vertical",minHeight:100,outline:"none",boxSizing:"border-box",fontFamily:"monospace"}}/>
            </div>
          </Section>
        )}
        {context==="Letter — Sent" && (
          <Section title="Delivery & Chase">
            <TRow label="Institution" value={task.institution}/>
            <TRow label="Via" value={task.via}/>
            <TRow label="Days Waiting" value={`${task.days} days`}/>
            <TRow label="Chases Sent" value={task.chases}/>
            <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
              <button onClick={()=>setTaskDetail(null)} style={{padding:"9px 18px",border:"1px solid #3b82f6",borderRadius:8,background:"white",color:"#3b82f6",fontSize:13,fontWeight:500,cursor:"pointer"}}>🔄 Chase Now</button>
              <button onClick={()=>setDrawer({type:"returnce",task})} style={{padding:"9px 18px",border:"1px solid #e5e7eb",borderRadius:8,background:"white",fontSize:13,cursor:"pointer"}}>↩ Return to CE</button>
            </div>
          </Section>
        )}
        {context==="Letter — Acknowledged" && (
          <Section title="Acknowledgment">
            <TRow label="Institution" value={task.institution}/>
            <TRow label="Acknowledged" value={task.ackDate}/>
            <TRow label="Days Since Ack" value={`${task.daysSince} days`}/>
            <TRow label="Chase History" value="1 chase sent (demo)"/>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              <button onClick={()=>setTaskDetail(null)} style={{padding:"9px 18px",border:"1px solid #3b82f6",borderRadius:8,background:"white",color:"#3b82f6",fontSize:13,fontWeight:500,cursor:"pointer"}}>🔄 Chase for Reply</button>
            </div>
          </Section>
        )}
        {context==="Letter — Reply" && (
          <>
            <Section title="Reply Received">
              <TRow label="Institution" value={task.institution}/>
              <TRow label="Replied" value={task.replied}/>
              <TRow label="Via" value={task.via}/>
            </Section>
            <Section title="Evidence & Actions">
              <div style={{background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb",padding:"14px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:13,color:"#374151"}}>📄 Institution_Response_{task.candidate?.split(" ")[0]}.pdf</span>
                <button style={{padding:"5px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>View</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button onClick={()=>setDrawer({type:"submit",task})} style={{padding:"11px",border:"none",borderRadius:8,background:"#16a34a",color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>✅ Accept as Evidence → Done</button>
                <button onClick={()=>setDrawer({type:"submit",task})} style={{padding:"11px",border:"1.5px solid #d97706",borderRadius:8,background:"white",color:"#d97706",fontSize:14,fontWeight:600,cursor:"pointer"}}>🚩 Flag Discrepancy → Done (flagged)</button>
                <button onClick={()=>setTaskDetail(null)} style={{padding:"11px",border:"1.5px solid #3b82f6",borderRadius:8,background:"white",color:"#3b82f6",fontSize:14,fontWeight:600,cursor:"pointer"}}>📧 Request More Info → Sent</button>
                <button onClick={()=>setDrawer({type:"returnce",task})} style={{padding:"11px",border:"1.5px solid #e5e7eb",borderRadius:8,background:"white",color:"#374151",fontSize:14,fontWeight:500,cursor:"pointer"}}>↩ Return to CE</button>
              </div>
            </Section>
          </>
        )}

        <Section title="Activity Timeline">
          {["Task created","NIN verified","Batch dispatched","VO assigned","Task opened"].map((e,i)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:8,marginBottom:8,borderBottom:i<4?"1px solid #f3f4f6":"none"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#b91c1c",flexShrink:0,marginTop:5}}/>
              <span style={{fontSize:13,color:"#374151"}}>{e}</span>
            </div>
          ))}
        </Section>

        <Section title="Documents">
          {["NIN_Slip.pdf","Candidate_Consent.pdf","Supporting_Doc.pdf"].map((d,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:i<2?"1px solid #f3f4f6":"none"}}>
              <span style={{fontSize:13,color:"#374151"}}>📄 {d}</span>
              <button style={{padding:"4px 12px",border:"1px solid #e5e7eb",borderRadius:6,background:"white",fontSize:12,cursor:"pointer"}}>View</button>
            </div>
          ))}
        </Section>
      </div>
    );
  };

  const modeBadgeColor = { Email:"#eff6ff", Letter:"#fef3c7", Field:"#dcfce7", Portal:"#f0fdf4", Scholar:"#f5f3ff" };
  const modeTxtColor   = { Email:"#3b82f6", Letter:"#d97706", Field:"#16a34a", Portal:"#059669", Scholar:"#7c3aed" };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      {/* Full-screen Task Detail — replaces workboard content */}
      {taskDetail && renderTaskDetail()}
      {!taskDetail && (<>
      {/* Header */}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:14,marginBottom:20,padding:0}}>
        <ChevronLeft/> All ServModes
      </button>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#111827"}}>{sf.id}</h1>
          <span style={{padding:"4px 12px",borderRadius:20,fontSize:13,fontWeight:500,background:modeBadgeColor[sf.mode],color:modeTxtColor[sf.mode]}}>{sf.mode}</span>
        </div>
      </div>
      {/* Stats row */}
      <div style={{display:"flex",gap:12,marginBottom:20}}>
        {[["Total Tasks",sf.tasks,"#111827"],["Active",sf.active,"#16a34a"],["Awaiting",sf.awaiting,"#d97706"],["At Risk",sf.atRisk,"#b91c1c"]].map(([k,v,c])=>(
          <div key={k} style={{background:"white",borderRadius:10,border:"1px solid #e5e7eb",padding:"14px 20px",minWidth:100}}>
            <p style={{margin:"0 0 4px",fontSize:11,fontWeight:600,color:"#6b7280",letterSpacing:.4}}>{k.toUpperCase()}</p>
            <p style={{margin:0,fontSize:22,fontWeight:700,color:c}}>{v}</p>
          </div>
        ))}
      </div>
      <Tabs/>
      {renderContent()}

      {/* Drawers */}
      {drawer?.type==="pivot"       && <PivotDrawer      task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="returnce"    && <ReturnToCEDrawer  task={drawer.task} onClose={()=>setDrawer(null)} onSent={onReturnToCE}/>}
      {drawer?.type==="nudge"       && <NudgeDrawer       task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="remind"      && <RemindDrawer      task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="submit"      && <SubmitDrawer      task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="agentselect" && <AgentSelectDrawer task={drawer.task} onClose={()=>setDrawer(null)}/>}
      {drawer?.type==="letterpreview"&&<LetterPreviewDrawer task={drawer.task} onClose={()=>setDrawer(null)}/>}
      </>)}
    </div>
  );
}

export default VOWorkboard;
