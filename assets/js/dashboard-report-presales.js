(function(){
  "use strict";
  var STORE_KEY = "pmo-console-v5";
  var JIRA_CLOUD = "linkit360.atlassian.net";
  var JIRA_BASE = "https://linkit360.atlassian.net/browse/";

  /* =====================================================================
     DEMO DATA — real people, projects & issue keys pulled from Jira
     (linkit360.atlassian.net); day-by-day task detail below is illustrative
     demo data for layout/testing, not a live feed.
  ===================================================================== */

  var TEAM = [
    { id:"syiffa", name:"Syiffa Putri Meillani", role:"BA", title:"Business Analyst", accountId:"712020:474b4535-5077-472b-80ca-e874dbc1211a" },
    { id:"ricky", name:"Ricky Alexander Tanjaya", role:"BA", title:"Business Analyst", accountId:"63735f199960988ef6bc1512" },
    { id:"gilang", name:"Gilang Permana", role:"Dev", title:"Full-stack Developer", accountId:"5c3328c7cfa94f5e9739e605" },
    { id:"yaafi", name:"Yaafi Asyari", role:"Dev", title:"Backend Developer", accountId:"712020:5c8a8a70-1078-438f-90ed-0e6b21334959" },
    { id:"aldiama", name:"Aldiama Hari Octavian", role:"Dev", title:"Presales Developer", accountId:"712020:ef8b94d3-d216-4575-8477-52f33aa8a5f8" },
    { id:"budi", name:"Budi Setio Nugroho", role:"Dev", title:"Presales Developer", accountId:"628631d256b8470069785192" },
    { id:"diagy", name:"Diagy Ghaniyyu Muqsit", role:"Dev", title:"UI/UX Developer", accountId:"712020:d80c2f7e-b262-4ec4-a9e2-ddf6cf09a317" }
  ];

  var DIVISIONS = [
    { id:"BD", name:"Presales (BD)", jiraKey:"BR", url:"https://linkit360.atlassian.net/browse/BR",
      description:"Division that runs demo & presales builds for prospective clients. Not a single project — each client below is tracked as its own initiative (epic) inside the shared BR Jira space." }
  ];

  // status: active | hold | inactive | done · priority: P0 (most urgent) – P4 (least)
  var PROJECTS = [
    { id:"SYN", name:"SynapSea", category:"Project", division:null, status:"active", priority:"P0", url:"https://linkit360.atlassian.net/browse/SYN",
      description:"“Pesisir” marketplace for fishermen, cooperatives and buyers — FE/BE per module plus external API integrations (payment, file upload, GPS/weather). Largest scope, busiest backlog.",
      focus:"Ship the Market and Payment webhook API integrations before sprint review.",
      stats:{backlog:0, inProgress:10, review:0, done:36, hold:8} },
    { id:"GOR", name:"E-Governance", category:"Project", division:null, status:"active", priority:"P1", url:"https://linkit360.atlassian.net/browse/GOR",
      description:"Multi-country e-governance platform (Laos & others) — residence certificate, national ID, insurance menus, plus a new E-Learning module (design, requirements, documentation).",
      focus:"Push the overdue E-Learning docs (ERD, End-to-End) through before development resumes.",
      stats:{backlog:0, inProgress:1, review:0, done:20, hold:5} },
    { id:"DC", name:"DTF Camnexus", category:"Project", division:null, status:"hold", priority:"P1", url:"https://linkit360.atlassian.net/browse/DC",
      description:"New project, still early — only documentation and a PRD so far, development epics haven't started. On hold pending a fresh kickoff with the client.",
      focus:"Re-kick off with the client to unblock the initial documentation.",
      stats:{backlog:0, inProgress:0, review:0, done:1, hold:1} },
    { id:"EP", name:"EIR Project", category:"Project", division:null, status:"done", priority:"P4", url:"https://linkit360.atlassian.net/browse/EP",
      description:"Trader/registration platform for EIR — trader portal, public registration, CMS admin, country rollout (e.g. Burkina Faso). All core epics shipped.",
      focus:"Wrap up handover documentation — no active work.",
      stats:{backlog:0, inProgress:0, review:0, done:15, hold:0} },
    { id:"VLA", name:"VRBT LinkIT", category:"Project", division:null, status:"done", priority:"P4", url:"https://linkit360.atlassian.net/browse/VLA",
      description:"Ring-back-tone product (VRBT) for Mattel — FE/BE, infra, QA testing. Build complete, all tracked work closed.",
      focus:"Post-launch monitoring only — no active work.",
      stats:{backlog:0, inProgress:0, review:0, done:19, hold:0} },
    // Real client initiatives tracked as epics inside the shared BR (Presales/BD) Jira space
    { id:"BD-ADCE", name:"ADCE Cambodia", category:"Presales client", division:"BD", status:"active", priority:"P2", epicKey:"BR-84", url:JIRA_BASE+"BR-84",
      description:"Finalize the demo flow for prospect ADCE Cambodia.", stats:{backlog:1,inProgress:0,review:0,done:0,hold:0} },
    { id:"BD-DTF", name:"DTF (Demo & Flow)", category:"Presales client", division:"BD", status:"active", priority:"P1", epicKey:"BR-81", url:JIRA_BASE+"BR-81",
      description:"Flow adjustments per latest requirements plus demo prep for prospect DTF.", stats:{backlog:0,inProgress:1,review:1,done:0,hold:0} },
    { id:"BD-FCS", name:"FCS", category:"Presales client", division:"BD", status:"active", priority:"P2", epicKey:"BR-80", url:JIRA_BASE+"BR-80",
      description:"Demo feature enhancement for prospect FCS.", stats:{backlog:0,inProgress:1,review:0,done:0,hold:0} },
    { id:"BD-KOP", name:"KTP & Cooperative Registration", category:"Presales client", division:"BD", status:"active", priority:"P2", epicKey:"BR-83", url:JIRA_BASE+"BR-83",
      description:"Demo registration flow with ID-card and cooperative selection.", stats:{backlog:0,inProgress:1,review:0,done:0,hold:0} },
    { id:"BD-POLICE", name:"Police Application", category:"Presales client", division:"BD", status:"done", priority:"P4", epicKey:"BR-89", url:JIRA_BASE+"BR-89",
      description:"Demo portal for prospect Police Application.", stats:{backlog:0,inProgress:0,review:0,done:1,hold:0} },
    { id:"BD-EXPOCAM", name:"ExpoCam", category:"Presales client", division:"BD", status:"done", priority:"P4", epicKey:"BR-88", url:JIRA_BASE+"BR-88",
      description:"Demo portal for prospect ExpoCam.", stats:{backlog:0,inProgress:0,review:0,done:1,hold:0} },
    { id:"BD-COO", name:"Certificate of Origin", category:"Presales client", division:"BD", status:"done", priority:"P4", epicKey:"BR-87", url:JIRA_BASE+"BR-87",
      description:"Demo product for prospect Certificate of Origin.", stats:{backlog:0,inProgress:0,review:0,done:1,hold:0} },
    // Catch-all bucket for synced BR issues that don't map to a known client epic above
    { id:"BD-OTHER", name:"Other BD activity", category:"Presales client", division:"BD", status:"active", priority:"P3", url:JIRA_BASE+"BR",
      description:"Auto-filled by Jira sync for BR issues that aren't linked to one of the tracked client epics.", stats:{backlog:0,inProgress:0,review:0,done:0,hold:0} }
  ];

  // status: todo | inprogress | done | carryover | hold
  var ENTRIES = [
    {date:"2026-08-03", person:"ricky", project:"GOR", issueKey:"GOR-229", module:"E-Learning — BRD", status:"inprogress"},
    {date:"2026-08-03", person:"ricky", project:"GOR", issueKey:"GOR-230", module:"E-Learning — FSD", status:"inprogress"},
    {date:"2026-08-03", person:"diagy", project:"GOR", issueKey:"GOR-234", module:"E-Learning — UI/UX design (Dashboard & Materials)", status:"inprogress"},
    {date:"2026-08-03", person:"budi", project:"BD-ADCE", issueKey:"BR-84", module:"ADCE Cambodia — Demo flow", status:"inprogress"},
    {date:"2026-08-03", person:"aldiama", project:"BD-DTF", issueKey:"BR-81", module:"DTF — Requirement adjustment", status:"inprogress"},
    {date:"2026-08-03", person:"gilang", project:"SYN", issueKey:"SYN-45", module:"Cooperative module — FE (Dashboard, Members)", status:"inprogress"},
    {date:"2026-08-03", person:"yaafi", project:"SYN", issueKey:"SYN-4", module:"Fishermen module — BE (Auth, Dashboard API)", status:"inprogress"},
    {date:"2026-08-03", person:"gilang", project:"SYN", issueKey:"SYN-110", module:"Buyer module — FE (Market dashboard slicing)", status:"inprogress"},
    {date:"2026-08-04", person:"ricky", project:"GOR", issueKey:"GOR-229", module:"E-Learning — BRD", status:"done"},
    {date:"2026-08-04", person:"ricky", project:"GOR", issueKey:"GOR-231", module:"E-Learning — PRD", status:"inprogress"},
    {date:"2026-08-04", person:"diagy", project:"GOR", issueKey:"GOR-234", module:"E-Learning — UI/UX design (Dashboard & Materials)", status:"done"},
    {date:"2026-08-04", person:"diagy", project:"GOR", issueKey:"GOR-234", module:"E-Learning — UI/UX design (Quiz & Grades)", status:"inprogress"},
    {date:"2026-08-04", person:"budi", project:"BD-ADCE", issueKey:"BR-84", module:"ADCE Cambodia — Demo flow", status:"hold", note:"Waiting on client approval"},
    {date:"2026-08-04", person:"aldiama", project:"BD-DTF", issueKey:"BR-81", module:"DTF — Requirement adjustment", status:"done"},
    {date:"2026-08-04", person:"gilang", project:"SYN", issueKey:"SYN-45", module:"Cooperative module — FE (Dashboard, Members)", status:"carryover", note:"Scope grew, carried to tomorrow"},
    {date:"2026-08-04", person:"yaafi", project:"SYN", issueKey:"SYN-4", module:"Fishermen module — BE (Auth, Dashboard API)", status:"done"},
    {date:"2026-08-04", person:"yaafi", project:"SYN", issueKey:"SYN-4", module:"Fishermen module — BE (Sea map API)", status:"inprogress"},
    {date:"2026-08-04", person:"gilang", project:"SYN", issueKey:"SYN-110", module:"Buyer module — FE (Market dashboard slicing)", status:"hold", note:"Blocked, waiting on final design from BA"},
    {date:"2026-08-05", person:"ricky", project:"GOR", issueKey:"GOR-231", module:"E-Learning — PRD", status:"done"},
    {date:"2026-08-05", person:"ricky", project:"GOR", issueKey:"GOR-230", module:"E-Learning — FSD", status:"hold", note:"Still revising with the client"},
    {date:"2026-08-05", person:"diagy", project:"GOR", issueKey:"GOR-234", module:"E-Learning — UI/UX design (Quiz & Grades)", status:"done"},
    {date:"2026-08-05", person:"budi", project:"BD-ADCE", issueKey:"BR-84", module:"ADCE Cambodia — Demo flow", status:"done", note:"Approved by client"},
    {date:"2026-08-05", person:"aldiama", project:"BD-DTF", issueKey:"BR-91", module:"DTF — Demo preparation", status:"inprogress"},
    {date:"2026-08-05", person:"gilang", project:"SYN", issueKey:"SYN-45", module:"Cooperative module — FE (Dashboard, Members)", status:"done"},
    {date:"2026-08-05", person:"gilang", project:"SYN", issueKey:"SYN-45", module:"Cooperative module — FE (Finance, Procurement)", status:"inprogress"},
    {date:"2026-08-05", person:"yaafi", project:"SYN", issueKey:"SYN-4", module:"Fishermen module — BE (Sea map API)", status:"done"},
    {date:"2026-08-05", person:"yaafi", project:"SYN", issueKey:"SYN-4", module:"Fishermen module — BE (Sell fish, Wallet API)", status:"inprogress"},
    {date:"2026-08-05", person:"gilang", project:"SYN", issueKey:"SYN-110", module:"Buyer module — FE (Market dashboard slicing)", status:"inprogress", note:"Resumed, design is finalized"},
    {date:"2026-08-06", person:"ricky", project:"GOR", issueKey:"GOR-230", module:"E-Learning — FSD", status:"done"},
    {date:"2026-08-06", person:"ricky", project:"GOR", issueKey:"GOR-233", module:"E-Learning — ERD", status:"inprogress"},
    {date:"2026-08-06", person:"aldiama", project:"BD-DTF", issueKey:"BR-91", module:"DTF — Demo preparation", status:"done", note:"Moved to Review/QA"},
    {date:"2026-08-06", person:"diagy", project:"SYN", issueKey:"SYN-88", module:"Cooperative module — visual QA on FE", status:"inprogress"},
    {date:"2026-08-06", person:"gilang", project:"SYN", issueKey:"SYN-45", module:"Cooperative module — FE (Finance, Procurement)", status:"done"},
    {date:"2026-08-06", person:"yaafi", project:"SYN", issueKey:"SYN-4", module:"Fishermen module — BE (Sell fish, Wallet API)", status:"done"},
    {date:"2026-08-06", person:"yaafi", project:"SYN", issueKey:"SYN-47", module:"External API — Weather & GPS integration", status:"inprogress"},
    {date:"2026-08-06", person:"gilang", project:"SYN", issueKey:"SYN-110", module:"Buyer module — FE (Market dashboard slicing)", status:"hold", note:"Blocked on the Market API dependency from Yaafi"},
    {date:"2026-08-06", person:"gilang", project:"BD-POLICE", issueKey:"BR-89", module:"Police Application — Demo portal", status:"done"},
    {date:"2026-08-07", person:"ricky", project:"GOR", issueKey:"GOR-233", module:"E-Learning — ERD", status:"hold", note:"Waiting on the database team's review"},
    {date:"2026-08-07", person:"ricky", project:"GOR", issueKey:"GOR-232", module:"E-Learning — End-to-end documentation", status:"inprogress"},
    {date:"2026-08-07", person:"aldiama", project:"BD-DTF", issueKey:"BR-91", module:"DTF — Client demo", status:"done"},
    {date:"2026-08-07", person:"gilang", project:"SYN", issueKey:"SYN-110", module:"Buyer module — FE (Market dashboard slicing)", status:"done", note:"Market API was ready, finished the same day"},
    {date:"2026-08-07", person:"yaafi", project:"SYN", issueKey:"SYN-47", module:"External API — Weather & GPS integration", status:"done"},
    {date:"2026-08-07", person:"yaafi", project:"SYN", issueKey:"SYN-155", module:"External API — Payment webhook handler", status:"inprogress"},
    {date:"2026-08-07", person:"gilang", project:"SYN", issueKey:"SYN-166", module:"Order integration — connect create order & order list to API", status:"inprogress"},
    {date:"2026-08-07", person:"gilang", project:"SYN", issueKey:"SYN-165", module:"Market integration — connect invoice history to API", status:"todo"},
    {date:"2026-08-10", person:"ricky", project:"GOR", issueKey:"GOR-233", module:"E-Learning — ERD", status:"hold", note:"Still blocked, 3 days running"},
    {date:"2026-08-10", person:"ricky", project:"GOR", issueKey:"GOR-232", module:"E-Learning — End-to-end documentation", status:"inprogress"},
    {date:"2026-08-10", person:"syiffa", project:"GOR", issueKey:"GOR-224", module:"E-Learning — Requirement validation", status:"todo"},
    {date:"2026-08-10", person:"diagy", project:"GOR", issueKey:"GOR-234", module:"E-Learning — UI/UX design (Report card & Certificate)", status:"inprogress"},
    {date:"2026-08-10", person:"budi", project:"BD-COO", issueKey:"BR-87", module:"Certificate of Origin — Demo product", status:"inprogress"},
    {date:"2026-08-10", person:"aldiama", project:"DC", issueKey:"DC-1", module:"Initial project documentation", status:"hold", note:"New project, blocked pending client kickoff"},
    {date:"2026-08-10", person:"gilang", project:"SYN", issueKey:"SYN-166", module:"Order integration — connect create order & order list to API", status:"done"},
    {date:"2026-08-10", person:"gilang", project:"SYN", issueKey:"SYN-165", module:"Market integration — connect AI recommendations & pricing", status:"inprogress"},
    {date:"2026-08-10", person:"yaafi", project:"SYN", issueKey:"SYN-155", module:"External API — Payment webhook handler", status:"inprogress"},
    {date:"2026-08-10", person:"yaafi", project:"SYN", issueKey:"SYN-156", module:"External API — File upload service integration", status:"inprogress"},
    {date:"2026-08-10", person:"yaafi", project:"SYN", issueKey:"SYN-154", module:"External API — SMS notification integration", status:"todo"},
    {date:"2026-08-10", person:"gilang", project:"BD-EXPOCAM", issueKey:"BR-88", module:"ExpoCam — Demo portal", status:"done"}
  ];

  var WEEKS = [
    { key:"last", label:"Aug 3–7, 2026", days:["2026-08-03","2026-08-04","2026-08-05","2026-08-06","2026-08-07"] },
    { key:"current", label:"Aug 10–14, 2026", days:["2026-08-10","2026-08-11","2026-08-12","2026-08-13","2026-08-14"] }
  ];
  var TODAY = "2026-08-10";
  var DOW = ["Mon","Tue","Wed","Thu","Fri"];

  var STATUS = {
    done:      { key:"done", label:"Done", short:"Done", css:"status-done", cssVar:"--good" },
    inprogress:{ key:"inprogress", label:"In Progress", short:"In Progress", css:"status-inprogress", cssVar:"--accent" },
    todo:      { key:"todo", label:"To Do", short:"To Do", css:"status-todo", cssVar:"--muted-badge" },
    carryover: { key:"carryover", label:"Carry Over", short:"Carry Over", css:"status-carryover", cssVar:"--warning" },
    hold:      { key:"hold", label:"Hold", short:"Hold", css:"status-hold", cssVar:"--critical" }
  };
  var STATUS_ORDER = ["done","inprogress","todo","carryover","hold"];

  var PSTATUS = {
    active:   { label:"Active", css:"pstatus-active" },
    hold:     { label:"Hold", css:"pstatus-hold" },
    inactive: { label:"Inactive", css:"pstatus-inactive" },
    done:     { label:"Done", css:"pstatus-done" }
  };
  var PSTATUS_ORDER = ["active","hold","inactive","done"];

  var PRIORITY = {
    P0: { label:"P0 · Critical", cls:"tier-critical" },
    P1: { label:"P1 · High", cls:"tier-high" },
    P2: { label:"P2 · Medium", cls:"tier-medium" },
    P3: { label:"P3 · Low", cls:"tier-low" },
    P4: { label:"P4 · Lowest", cls:"tier-lowest" }
  };
  var PRIORITY_ORDER = ["P0","P1","P2","P3","P4"];

  var BLOCKER_ROWS = [
    { key:"GOR", text:"4 E-Learning docs (BRD/FSD/PRD) held up", due:"2026-06-12" },
    { key:"GOR", text:"Create ERD — E-Learning", due:"2026-08-07" },
    { key:"SYN", text:"Buyer module FE blocked on the Market API", due:"2026-08-06" },
    { key:"DC", text:"Initial project documentation", due:"2026-08-10" }
  ];

  var SEED = { projects: PROJECTS, entries: ENTRIES, manual: { availableCapacity:"", allocatedCapacity:"", deliveryConfidence:"" },
    weeklyGoals: {
      last: "Ship the SynapSea Market & Payment API integrations, get GOR E-Learning docs approved, and close 2 presales demos (ADCE Cambodia, DTF).",
      current: ""
    },
    lastSyncedAt: null };

  function loadState(){
    var s = null;
    try { var raw = localStorage.getItem(STORE_KEY); if (raw) s = JSON.parse(raw); } catch(e){}
    if (!s) s = JSON.parse(JSON.stringify(SEED));
    // defensive defaults for fields added after this state may have been saved
    s.weeklyGoals = s.weeklyGoals || JSON.parse(JSON.stringify(SEED.weeklyGoals));
    if (s.lastSyncedAt === undefined) s.lastSyncedAt = null;
    s.entries.forEach(function(e){ e.deliverables = e.deliverables || []; });
    return s;
  }
  function saveState(){ localStorage.setItem(STORE_KEY, JSON.stringify(state)); renderPage(); }

  var state = loadState();
  var nav = { page:"dashboard", dailyWeek:"current", dailyDay:TODAY, weeklyWeek:"last", projFilter:"all", projSearch:"", divisionDetail:null, taskFilter:null };

  function esc(s){ return String(s==null?"":s).replace(/[&<>\"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]; }); }
  function personOf(id){ return TEAM.find(function(t){ return t.id===id; }); }
  function projectOf(id){ return state.projects.find(function(p){ return p.id===id; }); }
  function standaloneProjects(){ return state.projects.filter(function(p){ return !p.division; }); }
  function divisionChildren(divId){ return state.projects.filter(function(p){ return p.division === divId; }); }
  function allTrackedProjects(){ return state.projects; }
  function initials(name){ return name.split(/\s+/).filter(Boolean).slice(0,2).map(function(w){ return w[0]; }).join("").toUpperCase(); }
  function fmtDateShort(iso){
    var d = new Date(iso+"T00:00:00");
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[d.getMonth()] + " " + d.getDate();
  }
  function dowLabel(iso){
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[new Date(iso+"T00:00:00").getDay()];
  }
  function toast(msg){
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._h); toast._h = setTimeout(function(){ t.classList.remove("show"); }, 2800);
  }
  function tierOf(priority){ return PRIORITY[priority] || PRIORITY.P2; }
  function overdueDays(due){ return Math.max(0, Math.round((new Date(TODAY+"T00:00:00") - new Date(due+"T00:00:00")) / 86400000)); }
  function jiraLinkHtml(issueKey, text){
    if (!issueKey) return esc(text);
    return '<a class="jira-link" href="'+JIRA_BASE+esc(issueKey)+'" target="_blank" rel="noopener" title="Open '+esc(issueKey)+' in Jira">'+esc(text)+'</a>';
  }

  function entriesForDay(date){ return state.entries.filter(function(e){ return e.date===date; }); }
  function entriesForWeek(days){ return state.entries.filter(function(e){ return days.indexOf(e.date) !== -1; }); }
  function entriesForProject(id){ return state.entries.filter(function(e){ return e.project===id; }).sort(function(a,b){ return a.date < b.date ? 1 : -1; }); }
  function countByStatus(list){
    var c = {done:0, inprogress:0, todo:0, carryover:0, hold:0};
    list.forEach(function(e){ if (c[e.status] !== undefined) c[e.status]++; });
    return c;
  }
  function dayStat(date){ var c = countByStatus(entriesForDay(date)); c.total = STATUS_ORDER.reduce(function(s,k){ return s+c[k]; },0); c.date = date; return c; }
  function greeting(){
    var h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }

  function statTileHtml(opts){
    var clickable = !!opts.filter;
    return '<button class="stat-tile'+(opts.cls?' '+opts.cls:'')+(clickable?' clickable':'')+'" '+(clickable?'data-taskfilter="'+esc(JSON.stringify(opts.filter))+'"':'')+' '+(clickable?'':'style="cursor:default"')+'>' +
      '<div class="label">'+esc(opts.label)+'</div>'+
      '<div class="value tabular">'+esc(opts.value)+'</div>'+
      (opts.sub ? '<div class="sub">'+esc(opts.sub)+'</div>' : '')+
    '</button>';
  }
  function statusPillHtml(statusKey){
    var s = STATUS[statusKey] || STATUS.todo;
    return '<span class="status-pill '+s.css+'"><span class="dot"></span>'+esc(s.short)+'</span>';
  }
  function pstatusBadgeHtml(key){
    var s = PSTATUS[key] || PSTATUS.active;
    return '<span class="pstatus-badge '+s.css+'">'+esc(s.label)+'</span>';
  }

  var tooltipEl = null;
  function ensureTooltip(){ if (!tooltipEl) tooltipEl = document.getElementById("chartTooltip"); return tooltipEl; }
  function showTip(evt, html){ var t = ensureTooltip(); t.innerHTML = html; t.style.left = evt.clientX + "px"; t.style.top = (evt.clientY - 10) + "px"; t.classList.add("show"); }
  function moveTip(evt){ var t = ensureTooltip(); t.style.left = evt.clientX + "px"; t.style.top = (evt.clientY - 10) + "px"; }
  function hideTip(){ ensureTooltip().classList.remove("show"); }

  function barChartHtml(id, days){
    var max = 1;
    days.forEach(function(d){ STATUS_ORDER.forEach(function(k){ if (d[k] > max) max = d[k]; }); });
    var clusters = days.map(function(d){
      var bars = STATUS_ORDER.map(function(k){
        var v = d[k];
        var h = v ? Math.max((v/max)*148, 4) : 2;
        return '<div class="bar-mini" style="height:'+h+'px;background:var('+STATUS[k].cssVar+')'+(v?'':';opacity:.25')+'" data-tip="'+esc(STATUS[k].label)+': '+v+'"></div>';
      }).join("");
      return '<div class="day-cluster"><div class="bars-mini">'+bars+'</div><div class="clabel">'+esc(d.label)+'</div><div class="cdate">'+fmtDateShort(d.date)+'</div></div>';
    }).join("");
    var legend = STATUS_ORDER.map(function(k){
      return '<div class="legend-item"><span class="legend-swatch" style="background:var('+STATUS[k].cssVar+')"></span>'+STATUS[k].label+'</div>';
    }).join("");
    var tableRows = days.map(function(d){
      return '<tr><td class="strong">'+esc(d.label)+' &middot; '+fmtDateShort(d.date)+'</td>'+STATUS_ORDER.map(function(k){ return '<td class="tabular">'+d[k]+'</td>'; }).join("")+ '<td class="tabular strong">'+(d.total!=null?d.total:STATUS_ORDER.reduce(function(s,k){return s+d[k];},0))+'</td></tr>';
    }).join("");
    return '<div class="chart-wrap">'+
      '<div class="cluster-row">'+clusters+'</div>'+
      '<div class="legend">'+legend+'<button class="btn ghost" style="margin-left:auto;padding:4px 9px;font-size:11px" id="'+id+'ToggleTable">View as table</button></div>'+
    '</div>'+
    '<div class="data-table-wrap" id="'+id+'Table"><div class="table-scroll"><table class="dtable">'+
      '<thead><tr><th>Day</th>'+STATUS_ORDER.map(function(k){ return '<th>'+STATUS[k].short+'</th>'; }).join("")+ '<th>Total</th></tr></thead>'+
      '<tbody>'+tableRows+'</tbody></table></div></div>';
  }
  function bindBarChart(id){
    var wrap = document.getElementById(id);
    if (!wrap) return;
    wrap.querySelectorAll(".bar-mini").forEach(function(seg){
      seg.addEventListener("mouseenter", function(e){ showTip(e, this.getAttribute("data-tip")); });
      seg.addEventListener("mousemove", moveTip);
      seg.addEventListener("mouseleave", hideTip);
    });
    var btn = document.getElementById(id+"ToggleTable");
    var table = document.getElementById(id+"Table");
    if (btn) btn.addEventListener("click", function(){
      table.classList.toggle("show");
      btn.textContent = table.classList.contains("show") ? "Hide table" : "View as table";
    });
  }

  function donutHtml(counts, colorMap, total){
    var offset = 0, stops = [];
    Object.keys(counts).forEach(function(k){
      var v = counts[k]; if (!v) return;
      var pct = total ? (v/total)*100 : 0;
      stops.push(colorMap[k] + " " + offset + "% " + (offset+pct) + "%");
      offset += pct;
    });
    var gradient = stops.length ? "conic-gradient(" + stops.join(",") + ")" : "var(--surface-2)";
    return '<div class="donut" style="background:'+gradient+'"><div class="donut-center"><div class="n tabular">'+total+'</div><div class="l">Total</div></div></div>';
  }

  function entryRowHtml(e, idx){
    var p = personOf(e.person);
    var proj = projectOf(e.project);
    var delivChips = (e.deliverables||[]).map(function(d){
      if (d.type === "file") return '<a class="deliv-chip file" href="'+esc(d.dataUrl)+'" download="'+esc(d.fileName)+'">📎 '+esc(d.label)+'</a>';
      return '<a class="deliv-chip" href="'+esc(d.url)+'" target="_blank" rel="noopener">🔗 '+esc(d.label)+'</a>';
    }).join("");
    var syncBadge = e.source === "sync" ? ' <span style="font-size:9.5px;color:var(--ink-muted);font-weight:600">· synced</span>' : '';
    return '<div class="entry-row" data-entry="'+idx+'">'+
      '<div class="entry-main">'+
        '<div class="entry-person"><div class="avatar">'+initials(p?p.name:e.person)+'</div><div class="pname">'+esc(p?p.name.split(" ")[0]:e.person)+'</div></div>'+
        '<div class="entry-mid"><span class="proj">'+esc(e.project)+(proj?' · '+esc(proj.name):'')+syncBadge+'</span>'+
          '<div class="module">'+jiraLinkHtml(e.issueKey, e.module)+' <button class="entry-edit-btn" data-editEntry="'+idx+'" title="Edit this task">✏️</button></div>'+
          (e.note ? '<div class="note">'+esc(e.note)+'</div>' : '')+
        '</div>'+
        statusPillHtml(e.status)+
      '</div>'+
      '<div class="edit-form" id="editForm'+idx+'">'+
        '<div class="full"><label class="field-label">Task description</label><input type="text" id="editModule'+idx+'" value="'+esc(e.module)+'"></div>'+
        '<div><label class="field-label">Status</label><select id="editStatus'+idx+'">'+STATUS_ORDER.map(function(k){ return '<option value="'+k+'"'+(k===e.status?" selected":"")+'>'+STATUS[k].label+'</option>'; }).join("")+'</select></div>'+
        '<div><label class="field-label">Jira issue key</label><input type="text" id="editIssueKey'+idx+'" value="'+esc(e.issueKey||"")+'" placeholder="e.g. SYN-45"></div>'+
        '<div class="full"><label class="field-label">Note</label><textarea id="editNote'+idx+'" rows="2">'+esc(e.note||"")+'</textarea></div>'+
        '<div class="actions"><button class="btn ghost small" data-cancelEdit="'+idx+'">Cancel</button><button class="btn primary small" data-saveEdit="'+idx+'">Save changes</button></div>'+
      '</div>'+
      '<div class="deliverables">'+delivChips+'<button class="deliv-add-btn" data-addDeliv="'+idx+'">+ Add deliverable</button></div>'+
      '<div class="deliv-form" id="delivForm'+idx+'">'+
        '<div class="drow"><span class="dor">Link</span><input type="text" placeholder="Label (e.g. Figma link, Staging URL)" id="delivLabel'+idx+'"><input type="text" placeholder="https://…" id="delivUrl'+idx+'"></div>'+
        '<div class="drow"><span class="dor">or file</span><input type="file" id="delivFile'+idx+'"></div>'+
        '<div class="deliv-hint">Files stay in this browser only (~1.5MB max) — for anything bigger, paste a link instead.</div>'+
        (e.issueKey ? '<label class="chk"><input type="checkbox" id="delivComment'+idx+'" checked> Also post to Jira as a comment</label>' : '')+
        '<button class="btn primary small" data-saveDeliv="'+idx+'">Save</button>'+
        '<button class="btn ghost small" data-cancelDeliv="'+idx+'">Cancel</button>'+
      '</div>'+
    '</div>';
  }
  function bindEntryInteractions(root, listRef){
    root.querySelectorAll("[data-editEntry]").forEach(function(btn){
      btn.addEventListener("click", function(){ document.getElementById("editForm"+this.getAttribute("data-editEntry")).classList.toggle("open"); });
    });
    root.querySelectorAll("[data-cancelEdit]").forEach(function(btn){
      btn.addEventListener("click", function(){ document.getElementById("editForm"+this.getAttribute("data-cancelEdit")).classList.remove("open"); });
    });
    root.querySelectorAll("[data-saveEdit]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var idx = this.getAttribute("data-saveEdit");
        var entry = listRef[idx];
        var newModule = document.getElementById("editModule"+idx).value.trim();
        if (!newModule){ toast("Task description can't be empty"); return; }
        entry.module = newModule;
        entry.status = document.getElementById("editStatus"+idx).value;
        entry.issueKey = document.getElementById("editIssueKey"+idx).value.trim();
        entry.note = document.getElementById("editNote"+idx).value.trim();
        entry.edited = true; // sync will never overwrite a manually-edited entry again
        saveState();
        toast("Task updated");
      });
    });
    root.querySelectorAll("[data-addDeliv]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var f = document.getElementById("delivForm"+this.getAttribute("data-addDeliv"));
        f.classList.toggle("open");
      });
    });
    root.querySelectorAll("[data-cancelDeliv]").forEach(function(btn){
      btn.addEventListener("click", function(){ document.getElementById("delivForm"+this.getAttribute("data-cancelDeliv")).classList.remove("open"); });
    });
    root.querySelectorAll("[data-saveDeliv]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var idx = this.getAttribute("data-saveDeliv");
        var label = document.getElementById("delivLabel"+idx).value.trim();
        var url = document.getElementById("delivUrl"+idx).value.trim();
        var fileInput = document.getElementById("delivFile"+idx);
        var file = fileInput && fileInput.files[0];
        var entry = listRef[idx];
        entry.deliverables = entry.deliverables || [];

        function finish(deliv){
          entry.deliverables.push(deliv);
          var commentChk = document.getElementById("delivComment"+idx);
          if (commentChk && commentChk.checked && entry.issueKey) postDeliverableComment(entry, deliv);
          saveState();
          toast("Deliverable added");
        }

        if (file) {
          if (!label){ toast("Give the file a label first"); return; }
          if (file.size > 1.5 * 1024 * 1024){ toast("File is too large to store in the browser (max ~1.5MB) — use a link instead for larger files (Drive/Confluence)."); return; }
          var reader = new FileReader();
          reader.onload = function(){ finish({ type:"file", label:label, fileName:file.name, size:file.size, dataUrl:reader.result }); };
          reader.readAsDataURL(file);
        } else {
          if (!label || !url){ toast("Fill in both a label and a URL, or choose a file"); return; }
          finish({ type:"link", label:label, url:url });
        }
      });
    });
  }

  function reportMarkdown(title, entries, statObj){
    var lines = ["# " + title, ""];
    lines.push("- Done: **" + statObj.done + "**  ·  In Progress: **" + statObj.inprogress + "**  ·  To Do: **" + statObj.todo + "**  ·  Carry Over: **" + statObj.carryover + "**  ·  Hold: **" + statObj.hold + "**");
    lines.push("");
    ["BA", "Dev"].forEach(function(role){
      lines.push("## " + role);
      var rows = entries.filter(function(e){ var p = personOf(e.person); return p && p.role === role; });
      if (!rows.length) lines.push("_No updates._");
      rows.forEach(function(e){
        var p = personOf(e.person);
        lines.push("- **" + (p?p.name:e.person) + "** [" + e.project + (e.issueKey?" · "+e.issueKey:"") + "] " + e.module + " — _" + STATUS[e.status].label + "_" + (e.note ? " (" + e.note + ")" : ""));
      });
      lines.push("");
    });
    return lines.join("\n");
  }
  function downloadFile(filename, data){
    if (!window.claude || !window.claude.downloads){ toast("Downloads aren't available in this viewer"); return; }
    window.claude.downloads.save({ filename: filename, data: data })
      .then(function(){ toast("Downloaded"); })
      .catch(function(err){ if (err && err.code === "declined") return; toast("Download failed: " + (err && err.message || "unknown")); });
  }
  function printReport(titleHtml){
    document.getElementById("printTitle").innerHTML = titleHtml;
    window.print();
  }

  /* ---------- comprehensive printable report builders ---------- */
  function groupBy(list, keyFn){
    var map = {}, order = [];
    list.forEach(function(item){ var k = keyFn(item); if (!map[k]){ map[k]=[]; order.push(k); } map[k].push(item); });
    return order.map(function(k){ return { key:k, items:map[k] }; });
  }
  function printEntryLine(e){
    var p = personOf(e.person);
    return '<div class="print-entry"><span class="ptag">'+esc(e.project)+(e.issueKey?' · '+esc(e.issueKey):'')+'</span> — '+esc(e.module)+
      ' <b>['+STATUS[e.status].label+']</b>'+(e.note?' · '+esc(e.note):'')+' <span class="pwho">('+esc(p?p.name:e.person)+', '+fmtDateShort(e.date)+')</span></div>';
  }
  function printStatRow(stat){
    return '<div class="print-stat-row">' + STATUS_ORDER.map(function(k){
      return '<div class="print-stat"><div class="pn">'+stat[k]+'</div><div class="pl">'+STATUS[k].short+'</div></div>';
    }).join("") + '</div>';
  }
  function printByPersonHtml(entries){
    if (!entries.length) return '<div class="print-empty">No updates.</div>';
    return groupBy(entries, function(e){ return e.person; }).map(function(g){
      var p = personOf(g.key);
      return '<div class="print-group"><div class="pgname">'+esc(p?p.name+" ("+p.role+")":g.key)+'</div>' + g.items.map(printEntryLine).join("") + '</div>';
    }).join("");
  }
  function printByProjectHtml(entries){
    if (!entries.length) return '<div class="print-empty">No updates.</div>';
    return groupBy(entries, function(e){ return e.project; }).map(function(g){
      var proj = projectOf(g.key);
      return '<div class="print-group"><div class="pgname">'+esc(g.key)+(proj?' — '+esc(proj.name):'')+'</div>' + g.items.map(printEntryLine).join("") + '</div>';
    }).join("");
  }
  function printRisksHtml(entries){
    var holds = entries.filter(function(e){ return e.status === "hold"; });
    var rows = holds.map(function(e){
      var p = personOf(e.person);
      return '<div class="print-risk"><b>['+esc(e.project)+(e.issueKey?' · '+esc(e.issueKey):'')+']</b> '+esc(e.module)+' — '+esc(e.note||"On hold")+' <span class="pwho">('+esc(p?p.name:e.person)+', '+fmtDateShort(e.date)+')</span></div>';
    }).join("");
    var blockerRows = BLOCKER_ROWS.map(function(b){
      return '<div class="print-risk"><b>['+esc(b.key)+']</b> '+esc(b.text)+' — open '+overdueDays(b.due)+' days</div>';
    }).join("");
    return (rows || '<div class="print-empty">No open hold items.</div>') +
      '<div class="pgname" style="margin-top:10px">Long-running blockers</div>' + (blockerRows || '<div class="print-empty">None.</div>');
  }
  function printDocWrap(eyebrow, title, subtitle, bodyHtml){
    return '<div class="print-doc">' +
      '<div class="print-cover"><div class="peyebrow">'+esc(eyebrow)+'</div><h1>'+esc(title)+'</h1><div class="psub">'+esc(subtitle)+'</div>'+
        '<div class="pmeta">Delivery Console · LinkIT360 PMO · Generated '+dowLabel(TODAY)+' '+fmtDateShort(TODAY)+', 2026</div></div>' +
      bodyHtml +
      '<div class="print-footer">Delivery Console — linkit360.atlassian.net</div>' +
    '</div>';
  }
  function buildDailyPrintHtml(date){
    var entries = entriesForDay(date);
    var stat = dayStat(date);
    return printDocWrap("Daily Report", dowLabel(date)+" "+fmtDateShort(date)+", 2026", "Full-day progress across BA and Dev, by person and by project.",
      printSectionHtml("Highlights", printStatRow(stat)) +
      printSectionHtml("Update by man-power", printByPersonHtml(entries)) +
      printSectionHtml("Update by project", printByProjectHtml(entries)) +
      printSectionHtml("Risks & issues", printRisksHtml(entries))
    );
  }
  function buildWeeklyPrintHtml(week){
    var weekEntries = entriesForWeek(week.days);
    var totals = countByStatus(weekEntries);
    var dayBlocks = week.days.map(function(d, i){
      var es = entriesForDay(d);
      if (!es.length) return "";
      return '<div class="print-day-block"><div class="pdtitle">'+DOW[i]+' · '+fmtDateShort(d)+'</div>' +
        '<div class="pgname">By man-power</div>' + printByPersonHtml(es) +
        '<div class="pgname" style="margin-top:8px">By project</div>' + printByProjectHtml(es) +
      '</div>';
    }).join("");
    var goal = state.weeklyGoals[week.key] || "Not set.";
    return printDocWrap("Weekly Report", week.label, "Weekly highlights, expected outcomes, day-by-day detail, and risks for the team.",
      printSectionHtml("Weekly highlights", printStatRow(totals)) +
      printSectionHtml("Expected this week", '<div class="print-goal">'+esc(goal)+'</div>') +
      printSectionHtml("Daily updates — by man-power & by project", dayBlocks || '<div class="print-empty">No activity logged this week.</div>') +
      printSectionHtml("Risks, issues & blockers", printRisksHtml(weekEntries))
    );
  }
  function buildProjectReportPrintHtml(){
    var body = allTrackedProjects().map(function(p){
      var all = entriesForProject(p.id);
      var wins = all.filter(function(e){ return e.status==="done"; });
      var issues = all.filter(function(e){ return e.status==="hold"; });
      return '<div class="print-group"><div class="pgname">'+esc(p.id)+' — '+esc(p.name)+' ('+tierOf(p.priority).label+', '+PSTATUS[p.status].label+')</div>' +
        '<div style="font-size:11px;color:#736c5c;margin-bottom:4px">'+esc(p.focus||p.description||"")+'</div>' +
        (wins.length ? wins.map(printEntryLine).join("") : '<div class="print-empty">No wins logged yet.</div>') +
        (issues.length ? issues.map(printEntryLine).join("") : "") +
      '</div>';
    }).join("");
    return printDocWrap("Project Report", "Portfolio Summary", "Wins, focus and open issues per project.", printSectionHtml("Projects", body));
  }
  function printSectionHtml(title, body){ return '<div class="print-section"><div class="print-section-title">'+esc(title)+'</div>'+body+'</div>'; }
  function printComprehensive(html){
    document.getElementById("printExtra").innerHTML = html;
    window.print();
  }

  var JIRA_SERVER_HINT = "atlassian";
  var jiraServerName = null;
  function mcpAvailable(){ return !!(window.claude && window.claude.mcp); }
  function resolveJiraServer(){
    if (jiraServerName) return Promise.resolve(jiraServerName);
    return window.claude.mcp.listTools().then(function(res){
      var match = (res.servers || []).find(function(s){
        return s.server.toLowerCase().indexOf(JIRA_SERVER_HINT) !== -1 && s.tools.some(function(t){ return t.name === "createJiraIssue"; });
      });
      if (!match) throw { code:"server_not_connected", message:"Atlassian connector isn't connected." };
      jiraServerName = match.server;
      return jiraServerName;
    });
  }
  function jiraErrorMessage(err){
    switch (err && err.code) {
      case "needs_reauth": return "Your Atlassian connection expired — reconnect via claude.ai Settings → Connectors.";
      case "server_not_connected": return "Atlassian isn't connected — add it via claude.ai Settings → Connectors.";
      case "selection_required": return "Multiple Atlassian accounts are connected — choose one in the viewer prompt, then try again.";
      case "blocked_by_policy": return "Blocked by an organization policy.";
      case "approval_required": return "This action needs organization approval first.";
      case "not_in_manifest": return "This tool isn't allowed for this page.";
      case "tool_error": return "Jira rejected the request: " + (err.message || "unknown error");
      case "server_unavailable": return "Atlassian is temporarily unreachable — try again shortly.";
      case "not_granted": case "capability_disabled": case "capability_removed": return "Jira integration isn't active in this viewer.";
      default: return "Failed: " + (err && err.message ? err.message : "unknown error");
    }
  }

  /* =====================================================================
     JIRA SYNC — auto every 30 min via watchTool, plus a manual "Sync now"
     button. Never overwrites entries the user has manually edited.
  ===================================================================== */
  var JIRA_SYNC_PROJECTS = ["SYN","GOR","DC","EP","VLA","BR"];
  var SYNC_INTERVAL_MS = 30 * 60 * 1000;
  var syncStatus = { state:"idle", message:"" }; // idle | syncing | ok | error
  var syncUnsubscribe = null;

  function buildSyncInput(){
    return {
      cloudId: JIRA_CLOUD,
      jql: "project in (" + JIRA_SYNC_PROJECTS.join(",") + ") AND updated >= -21d ORDER BY updated DESC",
      maxResults: 50,
      fields: ["summary","status","assignee","updated","duedate","project","parent"]
    };
  }
  function jiraStatusToOurs(status){
    if (!status) return "todo";
    var cat = status.statusCategory && status.statusCategory.key;
    var name = (status.name || "").toLowerCase();
    if (name.indexOf("delay") !== -1 || name.indexOf("block") !== -1 || name.indexOf("hold") !== -1) return "hold";
    if (cat === "done") return "done";
    if (cat === "new") return "todo";
    return "inprogress";
  }
  function mapJiraProjectToOurs(jiraKey, parentKey){
    if (["SYN","GOR","DC","EP","VLA"].indexOf(jiraKey) !== -1) return jiraKey;
    if (jiraKey === "BR") {
      var child = state.projects.find(function(p){ return p.division === "BD" && p.epicKey === parentKey; });
      return child ? child.id : "BD-OTHER";
    }
    return jiraKey;
  }
  function mapAssigneeToTeam(assignee){
    if (!assignee) return "Unassigned";
    var t = TEAM.find(function(x){ return x.accountId === assignee.accountId; });
    return t ? t.id : (assignee.displayName || "Unassigned");
  }
  function mergeSyncedIssues(payload){
    var nodes = (payload && payload.issues && payload.issues.nodes) || [];
    var touched = 0;
    nodes.forEach(function(issue){
      var key = issue.key;
      var f = issue.fields || {};
      var projectId = mapJiraProjectToOurs(f.project && f.project.key, f.parent && f.parent.key);
      var personId = mapAssigneeToTeam(f.assignee);
      var status = jiraStatusToOurs(f.status);
      var date = (f.updated || "").slice(0,10) || TODAY;
      var existing = state.entries.find(function(e){ return e.issueKey === key; });
      if (existing) {
        if (existing.edited) return; // respect manual overrides, never clobber
        existing.module = f.summary || existing.module;
        existing.status = status;
        existing.date = date;
        existing.project = projectId;
        existing.person = personId;
        existing.source = "sync";
      } else {
        state.entries.push({ date:date, person:personId, project:projectId, issueKey:key, module: f.summary || key, status:status, deliverables:[], source:"sync" });
      }
      touched++;
    });
    return touched;
  }
  function renderSyncIndicator(){
    var el = document.getElementById("syncIndicator");
    if (!el) return;
    var dotCls = syncStatus.state === "syncing" ? "syncing" : syncStatus.state === "error" ? "err" : "";
    var label;
    if (syncStatus.state === "syncing") label = "Syncing…";
    else if (syncStatus.state === "error") label = "Sync failed";
    else if (state.lastSyncedAt) label = "Synced " + timeAgo(state.lastSyncedAt);
    else label = "Not synced yet";
    el.innerHTML = '<span class="sdot ' + dotCls + '"></span>' + esc(label);
    el.title = syncStatus.state === "error" ? syncStatus.message : "Auto-syncs from Jira every 30 minutes";
  }
  function timeAgo(ts){
    var mins = Math.round((Date.now() - ts) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + "m ago";
    var hrs = Math.round(mins/60);
    return hrs + "h ago";
  }
  function handleSyncEvent(ev){
    if (ev.type === "error") {
      syncStatus = { state:"error", message: jiraErrorMessage(ev.error) };
      renderSyncIndicator();
      return;
    }
    try {
      var touched = mergeSyncedIssues(ev.result.payload);
      state.lastSyncedAt = Date.now();
      syncStatus = { state:"ok" };
      saveState();
      renderSyncIndicator();
      if (touched) toast("Synced " + touched + " tickets from Jira");
    } catch (e) {
      syncStatus = { state:"error", message:"Couldn't read the Jira response" };
      renderSyncIndicator();
    }
  }
  function startJiraSync(){
    if (!mcpAvailable()) return;
    syncStatus = { state:"syncing" };
    renderSyncIndicator();
    resolveJiraServer().then(function(server){
      syncUnsubscribe = window.claude.mcp.watchTool(server, "searchJiraIssuesUsingJql", buildSyncInput(), handleSyncEvent, { refetchInterval: SYNC_INTERVAL_MS });
    }).catch(function(err){
      syncStatus = { state:"error", message: jiraErrorMessage(err) };
      renderSyncIndicator();
    });
  }
  function manualSync(){
    if (!mcpAvailable()){ toast("Jira sync isn't available in this viewer"); return; }
    syncStatus = { state:"syncing" };
    renderSyncIndicator();
    if (!syncUnsubscribe) { startJiraSync(); return; }
    resolveJiraServer().then(function(server){
      return window.claude.mcp.invalidate(server, "searchJiraIssuesUsingJql", buildSyncInput());
    }).catch(function(err){
      syncStatus = { state:"error", message: jiraErrorMessage(err) };
      renderSyncIndicator();
    });
  }

  function postDeliverableComment(entry, deliv){
    if (!mcpAvailable()) return;
    var p = personOf(entry.person);
    var line = deliv.type === "file"
      ? "📎 " + deliv.label + " — file *" + deliv.fileName + "* attached in Delivery Console (not uploaded to Jira automatically)."
      : "🔗 [" + deliv.label + "](" + deliv.url + ")";
    var body = "**Deliverable added:** " + line + "\n\nLogged by " + (p?p.name:entry.person) + " via Delivery Console.";
    resolveJiraServer().then(function(server){
      return window.claude.mcp.callTool(server, "addCommentToJiraIssue", { cloudId: JIRA_CLOUD, issueIdOrKey: entry.issueKey, commentBody: body });
    }).then(function(){
      toast("Also posted to " + entry.issueKey + " on Jira");
    }).catch(function(err){
      toast("Deliverable saved, but Jira comment failed: " + jiraErrorMessage(err || {}));
    });
  }

  function setModalStatus(kind, text){ var el = document.getElementById("jiraModalStatus"); el.className = "modal-status show" + (kind?" "+kind:"" ); el.textContent = text; }
  function clearModalStatus(){ var el = document.getElementById("jiraModalStatus"); el.className = "modal-status"; el.textContent = ""; }

  function jiraSpaceOptionsHtml(){
    var opts = [];
    standaloneProjects().forEach(function(p){ opts.push({ value:p.id, label:p.id+" — "+p.name, jiraKey:p.id, parent:"" }); });
    DIVISIONS.forEach(function(d){
      divisionChildren(d.id).forEach(function(c){ opts.push({ value:c.id, label:d.name+" / "+c.name, jiraKey:d.jiraKey, parent:c.epicKey||"" }); });
    });
    return opts;
  }
  function openJiraModal(defaultProjectId){
    if (!mcpAvailable()){ toast("Jira connection (MCP) isn't available in this viewer"); return; }
    var opts = jiraSpaceOptionsHtml();
    var sel = document.getElementById("jiraProject");
    sel.innerHTML = opts.map(function(o){ return '<option value="'+esc(o.value)+'" data-jirakey="'+esc(o.jiraKey)+'" data-parent="'+esc(o.parent)+'"'+(o.value===defaultProjectId?' selected':'')+'>'+esc(o.label)+'</option>'; }).join("");
    var asg = document.getElementById("jiraAssignee");
    asg.innerHTML = '<option value="">Unassigned</option>' + TEAM.map(function(t){ return '<option value="'+esc(t.accountId)+'">'+esc(t.name)+' ('+esc(t.role)+')</option>'; }).join("");
    document.getElementById("jiraSummary").value = "";
    document.getElementById("jiraDesc").value = "";
    document.getElementById("jiraStart").value = "";
    document.getElementById("jiraDue").value = "";
    syncParentField();
    clearModalStatus();
    document.getElementById("jiraModalBackdrop").classList.add("show");
  }
  function syncParentField(){
    var sel = document.getElementById("jiraProject");
    var opt = sel.options[sel.selectedIndex];
    document.getElementById("jiraParent").value = opt ? opt.getAttribute("data-parent") : "";
  }
  function closeJiraModal(){ document.getElementById("jiraModalBackdrop").classList.remove("show"); }

  function submitJiraTicket(){
    var sel = document.getElementById("jiraProject");
    var opt = sel.options[sel.selectedIndex];
    var projectKey = opt ? opt.getAttribute("data-jirakey") : "";
    var issueTypeName = document.getElementById("jiraType").value;
    var assignee = document.getElementById("jiraAssignee").value;
    var parentKey = document.getElementById("jiraParent").value.trim();
    var summary = document.getElementById("jiraSummary").value.trim();
    var description = document.getElementById("jiraDesc").value.trim();
    var startDate = document.getElementById("jiraStart").value;
    var dueDate = document.getElementById("jiraDue").value;
    if (!summary){ setModalStatus("err", "Fill in a summary first."); return; }

    var btn = document.getElementById("jiraSubmit");
    btn.disabled = true; setModalStatus("info", "Creating ticket…");

    function buildPayload(includeStart){
      var payload = { cloudId: JIRA_CLOUD, projectKey: projectKey, issueTypeName: issueTypeName, summary: summary };
      if (description) payload.description = description;
      if (assignee) payload.assignee_account_id = assignee;
      if (parentKey) payload.parent = parentKey;
      var additional = {};
      if (dueDate) additional.duedate = dueDate;
      if (includeStart && startDate) additional.customfield_10015 = startDate;
      if (Object.keys(additional).length) payload.additional_fields = additional;
      return payload;
    }

    resolveJiraServer().then(function(server){
      return window.claude.mcp.callTool(server, "createJiraIssue", buildPayload(true)).catch(function(err){
        if (err && err.code === "tool_error" && startDate) {
          return window.claude.mcp.callTool(server, "createJiraIssue", buildPayload(false)).then(function(res){
            setModalStatus("info", "Created without the start date field (not available on this project).");
            return res;
          });
        }
        throw err;
      });
    }).then(function(result){
      var issue = null;
      try { issue = result.payload && result.payload.issues && result.payload.issues.nodes && result.payload.issues.nodes[0]; } catch(e){}
      if (issue && issue.key){ setModalStatus("ok", "Ticket " + issue.key + " created."); toast("Ticket " + issue.key + " created in Jira"); }
      else { setModalStatus("ok", "Ticket created."); toast("Ticket created in Jira"); }
      btn.disabled = false;
      setTimeout(closeJiraModal, 1400);
    }).catch(function(err){
      btn.disabled = false;
      setModalStatus("err", jiraErrorMessage(err || {}));
    });
  }
  function bindJiraModal(){
    document.getElementById("jiraCancel").addEventListener("click", closeJiraModal);
    document.getElementById("jiraModalBackdrop").addEventListener("click", function(e){ if (e.target === this) closeJiraModal(); });
    document.getElementById("jiraSubmit").addEventListener("click", submitJiraTicket);
    document.getElementById("jiraProject").addEventListener("change", syncParentField);
  }

  function goTaskList(filter, title){ nav.taskFilter = filter; nav.taskFilterTitle = title; nav.page = "tasklist"; renderPage(); }

  function renderDashboard(root){
    var lastWeek = WEEKS[0];
    var weekDays = lastWeek.days.map(function(d,i){ var s=dayStat(d); s.label=DOW[i]; return s; });
    var weekTotals = countByStatus(entriesForWeek(lastWeek.days));
    var todayStat = dayStat(TODAY);
    var top = allTrackedProjects();
    var statusCounts = {active:0,hold:0,inactive:0,done:0};
    top.forEach(function(p){ if (statusCounts[p.status]!==undefined) statusCounts[p.status]++; });
    var colorMap = { active:"var(--accent)", hold:"var(--warning)", inactive:"var(--muted-badge)", done:"var(--good)" };

    var tiles =
      statTileHtml({label:"Done this week", value:weekTotals.done, sub:lastWeek.label, cls:"kpi-solid", filter:{week:"last", status:"done"}}) +
      statTileHtml({label:"On hold today", value:todayStat.hold, sub:fmtDateShort(TODAY)+" · needs attention", cls:"kpi-red", filter:{date:TODAY, status:"hold"}}) +
      statTileHtml({label:"In progress today", value:todayStat.inprogress, sub:fmtDateShort(TODAY), cls:"kpi-amber", filter:{date:TODAY, status:"inprogress"}}) +
      statTileHtml({label:"Active projects", value:statusCounts.active, sub:top.length+" tracked in this console", cls:"kpi-violet", filter:{pstatus:"active"}});

    var donut = donutHtml(statusCounts, colorMap, top.length);
    var donutLegend = PSTATUS_ORDER.map(function(k){
      return '<div class="donut-legend-row" data-taskfilter=\''+JSON.stringify({pstatus:k})+'\'><span class="sw" style="background:'+colorMap[k]+'"></span><span class="nm">'+PSTATUS[k].label+'</span><span class="ct tabular">'+statusCounts[k]+'</span></div>';
    }).join("");

    var holdRows = top.filter(function(p){ return p.status === "hold" || (p.stats && p.stats.hold); }).map(function(p){
      return '<div class="entry-row" style="grid-template-columns:none"><div class="entry-main" style="grid-template-columns:70px 1fr auto">'+
        '<span style="font-size:10.5px;font-weight:750;color:var(--critical)">'+esc(p.id)+'</span>'+
        '<span style="font-size:12.5px;color:var(--ink-2)">'+esc(p.name)+(p.stats&&p.stats.hold?' — '+p.stats.hold+' item(s) on hold':'')+'</span>'+
        pstatusBadgeHtml(p.status) +
      '</div></div>';
    }).join("");

    var m = state.manual;
    root.innerHTML =
      '<div class="section"><h2 style="font-size:19px">'+greeting()+' 👋</h2><div class="hint" style="margin-top:4px;color:var(--ink-muted);font-size:12.5px">Here\'s where things stand across the portfolio.</div></div>' +
      '<div class="grid-4 section">' + tiles + '</div>' +
      '<div class="grid-2 section">' +
        '<div class="panel">' +
          '<div class="panel-head"><h3>Project status</h3><span class="sub">'+top.length+' tracked</span></div>' +
          '<div class="panel-pad"><div class="donut-wrap">' + donut + '<div class="donut-legend">' + donutLegend + '</div></div></div>' +
        '</div>' +
        '<div class="panel">' +
          '<div class="panel-head"><h3>Team capacity</h3><span class="sub">Manual</span></div>' +
          '<div class="panel-pad" style="display:flex;flex-direction:column;gap:12px;padding-top:10px">' +
            '<div><label class="field-label">Available capacity (person-days/week)</label><input type="text" id="mAvail" value="'+esc(m.availableCapacity)+'" placeholder="e.g. 35" style="width:100%"></div>' +
            '<div><label class="field-label">Allocated (person-days/week)</label><input type="text" id="mAlloc" value="'+esc(m.allocatedCapacity)+'" placeholder="e.g. 30" style="width:100%"></div>' +
            '<div><label class="field-label">Delivery confidence (%)</label><input type="text" id="mConf" value="'+esc(m.deliveryConfidence)+'" placeholder="e.g. 80" style="width:100%"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>Weekly progress</h2><span class="hint">Mon–Fri, '+lastWeek.label+'</span></div>' +
        '<div class="panel">' + barChartHtml("dashChart", weekDays) + '</div>' +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>Projects on hold</h2></div>' +
        '<div class="panel">' + (holdRows || '<div class="no-entries">Nothing on hold right now 🎉</div>') + '</div>' +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>Jump to</h2></div>' +
        '<div class="grid-4">' +
          quickLinkHtml("daily", "Daily Report", "Progress by day, BA & Dev") +
          quickLinkHtml("weekly", "Weekly Report", "Mon–Fri rollup") +
          quickLinkHtml("projreport", "Project Report", "Wins, to-do & issues") +
          quickLinkHtml("manpower", "Man-Power", "Tasks by person") +
        '</div>' +
      '</div>';

    bindBarChart("dashChart");
    document.getElementById("mAvail").addEventListener("change", function(){ state.manual.availableCapacity = this.value; saveState(); });
    document.getElementById("mAlloc").addEventListener("change", function(){ state.manual.allocatedCapacity = this.value; saveState(); });
    document.getElementById("mConf").addEventListener("change", function(){ state.manual.deliveryConfidence = this.value; saveState(); });
    root.querySelectorAll("[data-goto]").forEach(function(el){ el.addEventListener("click", function(){ nav.page = this.getAttribute("data-goto"); renderPage(); }); });
    root.querySelectorAll("[data-taskfilter]").forEach(function(el){
      el.addEventListener("click", function(){ goTaskList(JSON.parse(this.getAttribute("data-taskfilter")), this.querySelector(".label")?this.querySelector(".label").textContent:this.querySelector(".nm").textContent); });
    });
  }
  function quickLinkHtml(page, title, sub){
    return '<button class="stat-tile clickable" data-goto="'+page+'" style="text-align:left">' +
      '<div class="label">'+esc(sub)+'</div><div class="value" style="font-size:15px">'+esc(title)+' →</div>' +
    '</button>';
  }

  function renderTaskList(root){
    var f = nav.taskFilter || {};
    var list = state.entries.slice();
    if (f.date) list = list.filter(function(e){ return e.date === f.date; });
    if (f.week) { var w = WEEKS.find(function(x){return x.key===f.week;}); if (w) list = list.filter(function(e){ return w.days.indexOf(e.date)!==-1; }); }
    if (f.status) list = list.filter(function(e){ return e.status === f.status; });
    var pstatusNote = "";
    if (f.pstatus) {
      var matchIds = state.projects.filter(function(p){ return p.status===f.pstatus; }).map(function(p){ return p.id; });
      pstatusNote = '<div class="section"><div class="section-head"><h2>'+PSTATUS[f.pstatus].label+' projects</h2></div><div class="panel">' +
        matchIds.map(function(id){ var p=projectOf(id); return '<div class="entry-row"><div class="entry-main" style="grid-template-columns:70px 1fr auto"><span style="font-size:10.5px;font-weight:750;color:var(--accent)">'+esc(id)+'</span><span>'+esc(p.name)+'</span>'+pstatusBadgeHtml(p.status)+'</div></div>'; }).join("") +
        '</div></div>';
      list = [];
    }
    list.sort(function(a,b){ return a.date < b.date ? 1 : -1; });

    root.innerHTML =
      '<div class="section"><button class="btn ghost" id="backBtn">← Back</button></div>' +
      (pstatusNote || (
        '<div class="section"><div class="panel entry-list">' + (list.length ? list.map(entryRowHtml).join("") : '<div class="no-entries">No matching tasks.</div>') + '</div></div>'
      ));

    document.getElementById("backBtn").addEventListener("click", function(){ nav.page = "dashboard"; renderPage(); });
    if (!pstatusNote) bindEntryInteractions(root, state.entries);
  }

  function renderDaily(root){
    var week = WEEKS.find(function(w){ return w.key === nav.dailyWeek; });
    if (week.days.indexOf(nav.dailyDay) === -1) nav.dailyDay = week.days[0];
    var date = nav.dailyDay;
    var dayEntries = entriesForDay(date);
    var stat = dayStat(date);
    var baEntries = dayEntries.filter(function(e){ var p = personOf(e.person); return p && p.role === "BA"; });
    var devEntries = dayEntries.filter(function(e){ var p = personOf(e.person); return p && p.role === "Dev"; });

    var weekToggle = '<div class="segmented">' + WEEKS.map(function(w){
      return '<button data-week="'+w.key+'" class="'+(w.key===nav.dailyWeek?'active':'')+'">'+ (w.key==="last"?"Last Week":"This Week") +'</button>';
    }).join("") + '</div>';

    var pills = week.days.map(function(d,i){
      var has = entriesForDay(d).length > 0;
      return '<button class="day-pill'+(d===date?' active':'')+'" data-day="'+d+'" '+(!has?'disabled':'')+'>'+
        '<span class="dow">'+DOW[i]+'</span>'+fmtDateShort(d)+(d===TODAY?' · today':'')+
      '</button>';
    }).join("");

    var byProjectGroups = groupBy(dayEntries, function(e){ return e.project; });
    var byProjectHtml = byProjectGroups.length ? byProjectGroups.map(function(g){
      var proj = projectOf(g.key);
      var c = countByStatus(g.items);
      return '<div class="panel" style="margin-bottom:10px"><div class="panel-head"><h3>'+esc(g.key)+(proj?' — '+esc(proj.name):'')+'</h3>'+
        '<span class="sub">Done '+c.done+' · In Progress '+c.inprogress+' · Carry Over '+c.carryover+' · Hold '+c.hold+'</span></div>' +
        '<div class="panel-pad entry-list" style="padding-top:8px">' + g.items.map(function(e){ return entryRowHtml(e, state.entries.indexOf(e)); }).join("") + '</div>' +
      '</div>';
    }).join("") : '<div class="no-entries">No updates for this day.</div>';

    root.innerHTML =
      '<div class="screen-only">' +
      '<div class="section" style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap">' +
        weekToggle +
        '<div style="display:flex;gap:8px"><button class="btn" id="btnPrintDaily">🖨️ Print / Save PDF</button><button class="btn primary" id="btnExportDaily">Export .md</button></div>' +
      '</div>' +
      '<div class="section"><div class="day-pills">' + pills + '</div></div>' +
      '<div class="grid-4 section">' +
        statTileHtml({label:"Done", value:stat.done, sub:"of "+stat.total+" tasks", cls:"kpi-green", filter:{date:date,status:"done"}}) +
        statTileHtml({label:"In Progress", value:stat.inprogress, sub:"moving normally", cls:"kpi-violet", filter:{date:date,status:"inprogress"}}) +
        statTileHtml({label:"Carry Over", value:stat.carryover, sub:"pushed to the next day", cls:"kpi-amber", filter:{date:date,status:"carryover"}}) +
        statTileHtml({label:"Hold", value:stat.hold, sub:"needs attention", cls:"kpi-red", filter:{date:date,status:"hold"}}) +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>By man-power</h2><span class="hint">Design, UX/UI, requirements & documentation from BA · coding, testing & deployment from Dev</span></div>' +
        '<div class="section-head" style="margin-bottom:8px"><h3 style="font-size:12.5px;color:var(--violet)">BA</h3></div>' +
        '<div class="panel entry-list" id="baList" style="margin-bottom:16px">' + (baEntries.length ? baEntries.map(function(e){ return entryRowHtml(e, state.entries.indexOf(e)); }).join("") : '<div class="no-entries">No BA updates for this day.</div>') + '</div>' +
        '<div class="section-head" style="margin-bottom:8px"><h3 style="font-size:12.5px;color:var(--accent)">Dev</h3></div>' +
        '<div class="panel entry-list" id="devList">' + (devEntries.length ? devEntries.map(function(e){ return entryRowHtml(e, state.entries.indexOf(e)); }).join("") : '<div class="no-entries">No Dev updates for this day.</div>') + '</div>' +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>By project</h2><span class="hint">Same day, grouped by project instead of person</span></div>' +
        byProjectHtml +
      '</div>' +
      '</div>' +
      '<div class="print-only" id="printExtra"></div>';

    bindEntryInteractions(root, state.entries);
    root.querySelectorAll("[data-week]").forEach(function(b){ b.addEventListener("click", function(){ nav.dailyWeek = this.getAttribute("data-week"); nav.dailyDay = WEEKS.find(function(w){return w.key===nav.dailyWeek;}).days[0]; renderPage(); }); });
    root.querySelectorAll("[data-day]").forEach(function(b){ b.addEventListener("click", function(){ nav.dailyDay = this.getAttribute("data-day"); renderPage(); }); });
    root.querySelectorAll("[data-taskfilter]").forEach(function(el){ el.addEventListener("click", function(){ goTaskList(JSON.parse(this.getAttribute("data-taskfilter")), this.querySelector(".label").textContent); }); });
    document.getElementById("btnExportDaily").addEventListener("click", function(){
      var md = reportMarkdown("Daily Report — " + dowLabel(date) + " " + fmtDateShort(date) + ", 2026", dayEntries, stat);
      downloadFile("daily-report-" + date + ".md", md);
    });
    document.getElementById("btnPrintDaily").addEventListener("click", function(){ printComprehensive(buildDailyPrintHtml(date)); });
  }

  function renderWeekly(root){
    var week = WEEKS.find(function(w){ return w.key === nav.weeklyWeek; });
    var days = week.days.map(function(d,i){ var s = dayStat(d); s.label = DOW[i]; return s; });
    var weekEntries = entriesForWeek(week.days);
    var totals = countByStatus(weekEntries);
    var totalAll = STATUS_ORDER.reduce(function(s,k){ return s+totals[k]; }, 0);
    var completionRate = totalAll ? Math.round((totals.done/totalAll)*100) : 0;

    var weekToggle = '<div class="segmented">' + WEEKS.map(function(w){
      return '<button data-week="'+w.key+'" class="'+(w.key===nav.weeklyWeek?'active':'')+'">'+ (w.key==="last"?"Last Week (Aug 3–7)":"This Week (Aug 10–14)") +'</button>';
    }).join("") + '</div>';

    var projRows = allTrackedProjects().map(function(p){
      var es = weekEntries.filter(function(e){ return e.project === p.id; });
      if (!es.length) return null;
      var c = countByStatus(es);
      return '<tr><td class="strong">'+esc(p.id)+' — '+esc(p.name)+(p.division?' <span style="color:var(--ink-muted);font-weight:400">(Presales / BD)</span>':'')+'</td>'+STATUS_ORDER.map(function(k){ return '<td class="tabular">'+c[k]+'</td>'; }).join("")+ '<td class="tabular strong">'+es.length+'</td></tr>';
    }).filter(Boolean).join("");

    var personRows = TEAM.map(function(p){
      var es = weekEntries.filter(function(e){ return e.person === p.id; });
      if (!es.length) return null;
      var c = countByStatus(es);
      return '<tr><td class="strong">'+esc(p.name)+'</td><td>'+esc(p.role)+'</td>'+STATUS_ORDER.map(function(k){ return '<td class="tabular">'+c[k]+'</td>'; }).join("")+ '<td class="tabular strong">'+es.length+'</td></tr>';
    }).filter(Boolean).join("");

    var riskEntries = weekEntries.filter(function(e){ return e.status === "hold"; });
    var riskRows = riskEntries.length ? riskEntries.map(function(e){
      var p = personOf(e.person);
      return '<div class="risk-row"><span class="rtag">'+esc(e.project)+'</span><div class="rbody"><b>'+jiraLinkHtml(e.issueKey, e.module)+'</b> — '+esc(e.note||"On hold")+
        '<div class="rmeta">'+esc(p?p.name:e.person)+' · '+fmtDateShort(e.date)+'</div></div></div>';
    }).join("") : '';
    var blockerRows = BLOCKER_ROWS.map(function(b){
      return '<div class="risk-row"><span class="rtag">'+esc(b.key)+'</span><div class="rbody"><b>'+esc(b.text)+'</b><div class="rmeta">Open '+overdueDays(b.due)+' days</div></div></div>';
    }).join("");

    root.innerHTML =
      '<div class="screen-only">' +
      '<div class="section" style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap">' +
        weekToggle +
        '<div style="display:flex;gap:8px"><button class="btn" id="btnPrintWeekly">🖨️ Print / Save PDF</button><button class="btn primary" id="btnExportWeekly">Export .md</button></div>' +
      '</div>' +
      '<div class="goal-box"><span class="glabel">Expected this week</span><textarea id="weeklyGoalInput" rows="1" placeholder="What the team is aiming to finish this week...">'+esc(state.weeklyGoals[nav.weeklyWeek]||"")+'</textarea></div>' +
      '<div class="grid-4 section">' +
        statTileHtml({label:"Total Done", value:totals.done, sub:"this week", cls:"kpi-green", filter:{week:nav.weeklyWeek,status:"done"}}) +
        statTileHtml({label:"Total In Progress", value:totals.inprogress, sub:"this week", cls:"kpi-violet", filter:{week:nav.weeklyWeek,status:"inprogress"}}) +
        statTileHtml({label:"Total Carry Over", value:totals.carryover, sub:"to next week", cls:"kpi-amber", filter:{week:nav.weeklyWeek,status:"carryover"}}) +
        statTileHtml({label:"Total Hold", value:totals.hold, sub:"this week", cls:"kpi-red", filter:{week:nav.weeklyWeek,status:"hold"}}) +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>Mon–Fri</h2><span class="hint">Completion rate '+completionRate+'%</span></div>' +
        '<div class="panel">' + barChartHtml("weekChart", days) + '</div>' +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>Risks, issues & blockers</h2><span class="hint">On-hold tasks this week, plus long-running blockers</span></div>' +
        '<div class="panel">' + (riskRows || '<div class="no-entries">Nothing on hold this week 🎉</div>') + blockerRows + '</div>' +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>Rollup by project</h2><span class="hint">Only projects with activity this week</span></div>' +
        '<div class="panel table-scroll"><table class="dtable"><thead><tr><th>Project</th>'+STATUS_ORDER.map(function(k){return '<th>'+STATUS[k].short+'</th>';}).join("")+ '<th>Total</th></tr></thead><tbody>'+(projRows||'<tr><td colspan="7" style="color:var(--ink-muted)">No activity logged this week.</td></tr>')+'</tbody></table></div>' +
      '</div>' +
      '<div class="section">' +
        '<div class="section-head"><h2>Rollup by man-power</h2></div>' +
        '<div class="panel table-scroll"><table class="dtable"><thead><tr><th>Name</th><th>Role</th>'+STATUS_ORDER.map(function(k){return '<th>'+STATUS[k].short+'</th>';}).join("")+ '<th>Total</th></tr></thead><tbody>'+(personRows||'<tr><td colspan="8" style="color:var(--ink-muted)">No activity logged this week.</td></tr>')+'</tbody></table></div>' +
      '</div>' +
      '</div>' +
      '<div class="print-only" id="printExtra"></div>';

    bindBarChart("weekChart");
    document.getElementById("weeklyGoalInput").addEventListener("change", function(){ state.weeklyGoals[nav.weeklyWeek] = this.value; saveState(); });
    root.querySelectorAll("[data-week]").forEach(function(b){ b.addEventListener("click", function(){ nav.weeklyWeek = this.getAttribute("data-week"); renderPage(); }); });
    root.querySelectorAll("[data-taskfilter]").forEach(function(el){ el.addEventListener("click", function(){ goTaskList(JSON.parse(this.getAttribute("data-taskfilter")), this.querySelector(".label").textContent); }); });
    document.getElementById("btnExportWeekly").addEventListener("click", function(){
      var md = reportMarkdown("Weekly Report — " + week.label, weekEntries, totals);
      downloadFile("weekly-report-" + week.days[0] + ".md", md);
    });
    document.getElementById("btnPrintWeekly").addEventListener("click", function(){ printComprehensive(buildWeeklyPrintHtml(week)); });
  }

  function renderManpower(root){
    function personBlock(p){
      var es = state.entries.filter(function(e){ return e.person === p.id; }).sort(function(a,b){ return b.date < a.date ? -1 : 1; });
      var c = countByStatus(es);
      var recent = es.slice(0, 6);
      return '<div class="person-card">' +
        '<div class="person-head">' +
          '<div class="avatar lg">'+initials(p.name)+'</div>' +
          '<div><div class="pname">'+esc(p.name)+'</div><div class="ptitle">'+esc(p.title)+'</div></div>' +
          '<span class="role-tag '+(p.role==="BA"?"ba":"dev")+'">'+esc(p.role)+'</span>' +
          '<div class="person-mini-stats">' +
            STATUS_ORDER.map(function(k){ return '<div class="mini-stat"><div class="n tabular" style="color:var('+STATUS[k].cssVar+')">'+c[k]+'</div><div class="l">'+STATUS[k].short+'</div></div>'; }).join("") +
          '</div>' +
        '</div>' +
        '<div class="task-chip-list">' +
          (recent.length ? recent.map(function(e){
            var proj = projectOf(e.project);
            return '<div class="task-chip">'+statusPillHtml(e.status)+'<span class="tproj">'+esc(e.project)+'</span><span class="tmod">'+jiraLinkHtml(e.issueKey, e.module)+'</span><span class="tdate">'+fmtDateShort(e.date)+'</span></div>';
          }).join("") : '<div class="no-entries">No tasks logged yet.</div>') +
        '</div>' +
      '</div>';
    }
    var ba = TEAM.filter(function(t){ return t.role === "BA"; });
    var dev = TEAM.filter(function(t){ return t.role === "Dev"; });
    root.innerHTML =
      '<div class="section"><div class="section-head"><h2>BA team</h2><span class="hint">'+ba.length+' people</span></div>' + ba.map(personBlock).join("") + '</div>' +
      '<div class="section"><div class="section-head"><h2>Dev team</h2><span class="hint">'+dev.length+' people</span></div>' + dev.map(personBlock).join("") + '</div>';
  }

  function renderProjectReport(root){
    function projectCard(p){
      var all = entriesForProject(p.id);
      var wins = all.filter(function(e){ return e.status === "done"; });
      var todo = all.filter(function(e){ return e.status === "todo" || e.status === "inprogress" || e.status === "carryover"; });
      var issues = all.filter(function(e){ return e.status === "hold"; });
      var tier = tierOf(p.priority);

      function col(cls, title, list, cap){
        var shown = list.slice(0, cap);
        var body = shown.length ? shown.map(function(e){
          var pers = personOf(e.person);
          return '<div class="report-item"><div class="rmod">'+jiraLinkHtml(e.issueKey, e.module)+'</div><div class="rmeta">'+esc(pers?pers.name:e.person)+' · '+fmtDateShort(e.date)+(e.note?' · '+esc(e.note):'')+'</div></div>';
        }).join("") : '<div class="report-empty">None.</div>';
        var more = list.length > cap ? '<div class="report-empty">+'+(list.length-cap)+' more</div>' : '';
        return '<div class="report-col '+cls+'"><h4>'+esc(title)+' ('+list.length+')</h4>'+body+more+'</div>';
      }

      return '<div class="report-card">' +
        '<div class="report-top">' +
          '<div class="report-title"><span class="proj-key">'+esc(p.id)+'</span><h3>'+esc(p.name)+'</h3>'+pstatusBadgeHtml(p.status)+'<span class="tier-pill '+tier.cls+'">'+tier.label+'</span>'+(p.url?'<a class="proj-link" href="'+esc(p.url)+'" target="_blank" rel="noopener">Open in Jira ↗</a>':'')+'</div>' +
          '<button class="btn small" data-jira="'+esc(p.id)+'">+ Create Jira Ticket</button>' +
        '</div>' +
        (p.focus != null ? '<div class="focus-box"><span class="flabel">Main Focus</span><input type="text" data-focus="'+esc(p.id)+'" value="'+esc(p.focus||"")+'" placeholder="What this project is focused on this week..."></div>' : '') +
        '<div class="report-cols">' + col("wins", "Wins", wins, 5) + col("todo", "To Do", todo, 5) + col("issues", "Issues", issues, 8) + '</div>' +
      '</div>';
    }

    var cards = standaloneProjects().map(projectCard).join("") +
      DIVISIONS.map(function(d){
        var children = divisionChildren(d.id);
        return '<div class="section"><div class="section-head"><h2>'+esc(d.name)+'</h2><span class="hint">'+children.length+' client initiatives — presales is a division, not one project</span></div>' +
          children.map(projectCard).join("") + '</div>';
      }).join("");

    root.innerHTML = '<div class="screen-only"><div class="section-head section"><span class="hint">Wins, to-do and issues per project, pulled straight from the daily progress log.</span><button class="btn" id="btnPrintProjReport">🖨️ Print / Save PDF</button></div>' + cards + '</div>' +
      '<div class="print-only" id="printExtra"></div>';

    document.getElementById("btnPrintProjReport").addEventListener("click", function(){ printComprehensive(buildProjectReportPrintHtml()); });
    root.querySelectorAll("[data-focus]").forEach(function(el){
      el.addEventListener("change", function(){ var p = projectOf(this.getAttribute("data-focus")); if (p) { p.focus = this.value; saveState(); } });
    });
    root.querySelectorAll("[data-jira]").forEach(function(el){ el.addEventListener("click", function(){ openJiraModal(this.getAttribute("data-jira")); }); });
  }

  function renderProjects(root){
    if (nav.divisionDetail) { renderDivisionDetail(root); return; }

    var counts = { all: state.projects.length };
    PSTATUS_ORDER.forEach(function(k){ counts[k] = state.projects.filter(function(p){ return p.status===k; }).length; });
    var filterBar = '<div class="segmented">' +
      '<button data-filter="all" class="'+(nav.projFilter==="all"?"active":"")+'">All ('+counts.all+')</button>' +
      PSTATUS_ORDER.map(function(k){ return '<button data-filter="'+k+'" class="'+(nav.projFilter===k?"active":"")+'">'+PSTATUS[k].label+' ('+counts[k]+')</button>'; }).join("") +
    '</div>';
    var searchBar = '<div class="search-box"><span class="sicon">🔎</span><input type="search" id="projSearch" placeholder="Search projects…" value="'+esc(nav.projSearch)+'"></div>';

    var formHtml =
      '<div class="form-panel" id="addProjectForm">' +
        '<div><label class="field-label">Key</label><input id="npKey" placeholder="e.g. NEW" style="width:100%"></div>' +
        '<div><label class="field-label">Project name</label><input id="npName" placeholder="Client / project name" style="width:100%"></div>' +
        '<div><label class="field-label">Category</label><input id="npCategory" placeholder="e.g. Product OTT" style="width:100%"></div>' +
        '<div class="full"><label class="field-label">Jira link (optional)</label><input id="npUrl" placeholder="https://linkit360.atlassian.net/browse/..." style="width:100%"></div>' +
        '<div class="full"><label class="field-label">Description</label><textarea id="npDesc" rows="2" style="width:100%"></textarea></div>' +
        '<div class="actions"><button class="btn ghost" id="npCancel">Cancel</button><button class="btn primary" id="npSave">Save project</button></div>' +
      '</div>';

    function matchesQuery(p, q){ if (!q) return true; q = q.toLowerCase(); return p.name.toLowerCase().indexOf(q)!==-1 || p.id.toLowerCase().indexOf(q)!==-1; }

    var standaloneCards = standaloneProjects().filter(function(p){
      return (nav.projFilter==="all" || p.status===nav.projFilter) && matchesQuery(p, nav.projSearch);
    }).map(function(p){ return projectCardHtml(p); }).join("");

    var divisionCards = DIVISIONS.map(function(d){
      var children = divisionChildren(d.id);
      var childStatusCounts = {}; PSTATUS_ORDER.forEach(function(k){ childStatusCounts[k]=0; });
      children.forEach(function(c){ if (childStatusCounts[c.status]!=null) childStatusCounts[c.status]++; });
      var filterMatch = nav.projFilter==="all" || childStatusCounts[nav.projFilter] > 0;
      var searchMatch = !nav.projSearch || d.name.toLowerCase().indexOf(nav.projSearch.toLowerCase())!==-1 || children.some(function(c){ return matchesQuery(c, nav.projSearch); });
      if (!filterMatch || !searchMatch) return "";
      return '<div class="proj-card division" data-division="'+esc(d.id)+'">' +
        '<div class="proj-top">' +
          '<div class="proj-id"><span class="proj-key">DIVISION</span><span class="proj-name">'+esc(d.name)+'</span><span class="proj-cat">'+children.length+' client initiatives</span></div>' +
          '<div class="division-count">'+children.length+' →</div>' +
        '</div>' +
        '<div style="font-size:12.8px;color:var(--ink-2);margin-top:8px">'+esc(d.description)+'</div>' +
      '</div>';
    }).join("");

    root.innerHTML =
      '<div class="section-head section">' + filterBar + searchBar + '<button class="btn primary" id="btnAddProject">+ Add project</button>' + '</div>' +
      formHtml +
      '<div class="section" style="margin-bottom:4px"><span class="hint">Priority = P0 (most urgent) to P4 (least). Presales (BD) is a division — open it to see the real client projects tracked inside.</span></div>' +
      '<div class="section">' + (standaloneCards + divisionCards || '<div class="no-entries">No projects match this filter.</div>') + '</div>';

    root.querySelectorAll("[data-filter]").forEach(function(b){ b.addEventListener("click", function(){ nav.projFilter = this.getAttribute("data-filter"); renderPage(); }); });
    var searchInput = document.getElementById("projSearch");
    searchInput.addEventListener("input", function(){ nav.projSearch = this.value; renderPage(); });
    searchInput.focus(); searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    root.querySelectorAll("[data-division]").forEach(function(el){ el.addEventListener("click", function(){ nav.divisionDetail = this.getAttribute("data-division"); renderPage(); }); });
    bindProjectFormHandlers(root);
  }

  function renderDivisionDetail(root){
    var d = DIVISIONS.find(function(x){ return x.id === nav.divisionDetail; });
    var children = divisionChildren(d.id).filter(function(p){
      var statusOk = nav.projFilter==="all" || p.status===nav.projFilter;
      var q = nav.projSearch.toLowerCase();
      var searchOk = !q || p.name.toLowerCase().indexOf(q)!==-1 || p.id.toLowerCase().indexOf(q)!==-1;
      return statusOk && searchOk;
    });
    var counts = { all: divisionChildren(d.id).length };
    PSTATUS_ORDER.forEach(function(k){ counts[k] = divisionChildren(d.id).filter(function(p){ return p.status===k; }).length; });
    var filterBar = '<div class="segmented">' +
      '<button data-filter="all" class="'+(nav.projFilter==="all"?"active":"")+'">All ('+counts.all+')</button>' +
      PSTATUS_ORDER.map(function(k){ return '<button data-filter="'+k+'" class="'+(nav.projFilter===k?"active":"")+'">'+PSTATUS[k].label+' ('+counts[k]+')</button>'; }).join("") +
    '</div>';
    var searchBar = '<div class="search-box"><span class="sicon">🔎</span><input type="search" id="projSearch" placeholder="Search…" value="'+esc(nav.projSearch)+'"></div>';

    root.innerHTML =
      '<div class="section"><button class="btn ghost" id="backToProjects">← All projects</button></div>' +
      '<div class="section"><h2 style="font-size:18px">'+esc(d.name)+'</h2><div class="hint" style="margin-top:6px;color:var(--ink-muted)">'+esc(d.description)+' <a href="'+esc(d.url)+'" target="_blank" rel="noopener">Open BR in Jira ↗</a></div></div>' +
      '<div class="section-head section">' + filterBar + searchBar + '</div>' +
      '<div class="section">' + (children.length ? children.map(projectCardHtml).join("") : '<div class="no-entries">No client initiatives match this filter.</div>') + '</div>';

    document.getElementById("backToProjects").addEventListener("click", function(){ nav.divisionDetail = null; nav.projSearch = ""; renderPage(); });
    root.querySelectorAll("[data-filter]").forEach(function(b){ b.addEventListener("click", function(){ nav.projFilter = this.getAttribute("data-filter"); renderPage(); }); });
    var searchInput = document.getElementById("projSearch");
    searchInput.addEventListener("input", function(){ nav.projSearch = this.value; renderPage(); });
    searchInput.focus(); searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    bindProjectFormHandlers(root);
  }

  function projectCardHtml(p){
    var tier = tierOf(p.priority);
    var s = p.stats || {};
    var idx = state.projects.indexOf(p);
    return '<div class="proj-card">' +
      '<div class="proj-top">' +
        '<div class="proj-id">' +
          '<span class="proj-key">'+esc(p.id)+'</span><span class="proj-name">'+esc(p.name)+'</span>' +
          '<span class="proj-cat">'+esc(p.category)+'</span>' +
          pstatusBadgeHtml(p.status) +
          (p.url ? '<a class="proj-link" href="'+esc(p.url)+'" target="_blank" rel="noopener">Open in Jira ↗</a>' : '') +
        '</div>' +
        '<div style="display:flex;gap:4px">' +
          '<button class="icon-btn pos" data-jira="'+esc(p.id)+'">+ Ticket</button>' +
          '<button class="icon-btn" data-del="'+idx+'">Delete</button>' +
        '</div>' +
      '</div>' +
      '<textarea class="proj-desc" data-desc="'+idx+'" rows="2">'+esc(p.description)+'</textarea>' +
      '<div class="proj-bottom">' +
        '<div class="priority-block"><label>Priority</label>'+prioritySelectHtml("priority-"+idx, p.priority)+'</div>' +
        '<div class="priority-block"><label>Status</label>'+pstatusSelectHtml("pstatus-"+idx, p.status)+'</div>' +
        '<div class="priority-block"><span class="tier-pill '+tier.cls+'">'+tier.label+'</span></div>' +
        '<div class="stat-chips">' +
          (s.hold ? '<span class="stat-chip-mini" style="color:var(--critical)"><b>'+s.hold+'</b> hold</span>' : '') +
          (s.inProgress ? '<span class="stat-chip-mini"><b>'+s.inProgress+'</b> in progress</span>' : '') +
          '<span class="stat-chip-mini" style="color:var(--good)"><b>'+(s.done||0)+'</b> done</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  function bindProjectFormHandlers(root){
    var addBtn = document.getElementById("btnAddProject");
    if (addBtn) addBtn.addEventListener("click", function(){ document.getElementById("addProjectForm").classList.toggle("open"); });
    var cancelBtn = document.getElementById("npCancel");
    if (cancelBtn) cancelBtn.addEventListener("click", function(){ document.getElementById("addProjectForm").classList.remove("open"); });
    var saveBtn = document.getElementById("npSave");
    if (saveBtn) saveBtn.addEventListener("click", function(){
      var key = document.getElementById("npKey").value.trim().toUpperCase();
      var name = document.getElementById("npName").value.trim();
      if (!key || !name){ toast("Fill in a key & project name first"); return; }
      state.projects.push({ id:key, name:name, category: document.getElementById("npCategory").value.trim() || "Uncategorized",
        status:"active", url: document.getElementById("npUrl").value.trim(), description: document.getElementById("npDesc").value.trim(), focus:"",
        priority:"P2", stats:{backlog:0, inProgress:0, review:0, done:0, hold:0} });
      saveState(); toast("Project added");
    });
    root.querySelectorAll("[data-desc]").forEach(function(el){ el.addEventListener("change", function(){ state.projects[Number(this.getAttribute("data-desc"))].description = this.value; saveState(); }); });
    root.querySelectorAll("[data-del]").forEach(function(el){
      el.addEventListener("click", function(){ var idx = Number(this.getAttribute("data-del")); if (confirm("Delete project " + state.projects[idx].name + "?")) { state.projects.splice(idx,1); saveState(); } });
    });
    root.querySelectorAll("[data-jira]").forEach(function(el){ el.addEventListener("click", function(){ openJiraModal(this.getAttribute("data-jira")); }); });
    state.projects.forEach(function(p, idx){
      var i1 = document.getElementById("priority-"+idx), i2 = document.getElementById("pstatus-"+idx);
      if (i1) i1.addEventListener("change", function(){ p.priority = this.value; saveState(); });
      if (i2) i2.addEventListener("change", function(){ p.status = this.value; saveState(); });
    });
  }
  function prioritySelectHtml(id, val){
    return '<select id="'+id+'">'+PRIORITY_ORDER.map(function(k){ return '<option value="'+k+'"'+(k===val?" selected":"")+'>'+k+'</option>'; }).join("")+'</select>';
  }
  function pstatusSelectHtml(id, val){
    return '<select id="'+id+'">'+PSTATUS_ORDER.map(function(k){ return '<option value="'+k+'"'+(k===val?" selected":"")+'>'+PSTATUS[k].label+'</option>'; }).join("")+'</select>';
  }

  var PAGES = {
    dashboard:  { eyebrow:"Overview", title:"Dashboard", render: renderDashboard },
    tasklist:   { eyebrow:"Details", title:"", render: renderTaskList, dynamicTitle:true },
    daily:      { eyebrow:"Reports", title:"Daily Report", render: renderDaily },
    weekly:     { eyebrow:"Reports", title:"Weekly Report", render: renderWeekly },
    projreport: { eyebrow:"Reports", title:"Project Report", render: renderProjectReport },
    manpower:   { eyebrow:"Team", title:"Man-Power", render: renderManpower },
    projects:   { eyebrow:"Portfolio", title:"Projects", render: renderProjects }
  };

  function renderTopActions(){
    var el = document.getElementById("topActions");
    el.innerHTML =
      '<span class="sync-status" id="syncIndicator"><span class="sdot"></span>Not synced yet</span>' +
      '<button class="btn ghost small" id="btnSyncNow">🔄 Sync now</button>' +
      '<button class="btn ghost" id="btnImport">Import backup</button>' +
      '<button class="btn" id="btnExportJson">Export backup</button>' +
      '<button class="btn primary" id="btnNewTicket">+ Create Jira Ticket</button>';
    document.getElementById("btnImport").addEventListener("click", function(){ document.getElementById("fileImport").click(); });
    document.getElementById("btnExportJson").addEventListener("click", function(){ downloadFile("pmo-console-backup-" + TODAY + ".json", JSON.stringify(state, null, 2)); });
    document.getElementById("btnNewTicket").addEventListener("click", function(){ openJiraModal(); });
    document.getElementById("btnSyncNow").addEventListener("click", manualSync);
    renderSyncIndicator();
  }

  function renderPage(){
    var conf = PAGES[nav.page];
    document.getElementById("topEyebrow").textContent = conf.eyebrow;
    document.getElementById("topTitle").textContent = conf.dynamicTitle ? (nav.taskFilterTitle || "Details") : conf.title;
    document.querySelectorAll(".nav-item").forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-page") === nav.page); });
    var root = document.getElementById("pageRoot");
    root.innerHTML = '<div id="printTitle"></div>';
    conf.render(root);
  }

  document.querySelectorAll(".nav-item").forEach(function(btn){
    btn.addEventListener("click", function(){ nav.page = this.getAttribute("data-page"); nav.divisionDetail = null; nav.projSearch = ""; renderPage(); });
  });
  document.getElementById("fileImport").addEventListener("change", function(e){
    var file = e.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function(){
      try {
        var parsed = JSON.parse(reader.result);
        if (!parsed.projects || !parsed.entries) throw new Error("unexpected file format");
        state = parsed; saveState(); toast("Backup imported");
      } catch(err){ toast("Invalid file: " + err.message); }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  renderTopActions();
  bindJiraModal();
  renderPage();
  startJiraSync();
})();
