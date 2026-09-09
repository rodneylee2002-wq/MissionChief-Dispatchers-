const KEY = "mcd_combined_v1";
const defaultRules = [
  {
    title: "Welcome to the Alliance!",
    body: "Welcome to our official MissionChief Dispatchers alliance server. Please read the rules below and follow the instructions to get fully verified."
  },
  {
    title: "Article 1 — General Rules",
    body: "1.1. The rules are for all members of the MissionChief Dispatchers alliance.\n1.2. Members agree to abide by the rules & any changes made by leadership.\n1.3. Ignorance of the rules will not exempt any member from compliance."
  },
  {
    title: "Article 2 — Conduct & Respect",
    body: "2.1. All members shall maintain professionalism & courtesy in alliance communications.\n2.2. Discrimination, harassment, or disruptive behavior is prohibited.\n2.3. Members shall uphold integrity & realism in gameplay.\n2.4. No missions about terrorism, school shootings, attacks against governmental or first responders, or anything of that nature will be allowed. MCD Administration reserves the right to remove any mission posted by any members which violates this rule.\n2.5. Violations may result in disciplinary action, including suspension or removal."
  },
  {
    title: "Article 4 — Shared Infrastructure",
    body: "4.1. Alliance buildings are communal assets.\n4.2. We may reassign or modify facilities to optimize efficiency."
  },
  {
    title: "Article 5 — Financial Contributions",
    body: "5.1. Donations in game are voluntary but encouraged.\n5.2. Members using shared resources are expected to contribute when able.\n5.3. Misuse of alliance funds or assets shall result in immediate review."
  },
  {
    title: "Article 6 — Leadership Auth",
    body: "6.1. Leadership shall oversee alliance ops, training, & infrastructure.\n6.2. Members may submit proposals or grievances through proper channels.\n6.3. Decisions rendered by leadership are final unless appealed under Article 7.\n6.4. Leadership positions may be reviewed to ensure accountability.\n6.5. Advertising will be allowed if you ask and it's related to the game. The only exception to that is RLM."
  },
  {
    title: "Article 7 — Enforcement & Appeals",
    body: "7.1. Violations shall be investigated by alliance leadership.\n7.2. Penalties may include warnings, temporary restrictions, or expulsion.\n7.3. Members may appeal disciplinary actions within seven days of notice.\n7.4. Appeals will be reviewed by a panel of senior officers, whose decision is final."
  },
  {
    title: "Article 8 — MissionChief Dispatchers Purpose",
    body: "The MissionChief Dispatchers alliance exists to promote coordinated emergency response, professional training, & mutual support among all members.\nEvery dispatcher, firefighter, medic, & officer shall act with honor, realism, & teamwork in service of the alliance's mission."
  }
];

function state() {
  return JSON.parse(
    localStorage.getItem(KEY) ||
      '{"rules":null,"acceptances":[],"requests":[],"trainingRequests":[],"avatar":""}'
  );
}

function save(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

function sendWebhook(type, data) {
  fetch("/api/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data })
  }).catch(() => {});
}

function go(p) {
  location.hash = p;
}

function render() {
  const p = location.hash.slice(1) || "home";
  document.querySelectorAll(".side-nav button, nav button").forEach((b) =>
    b.classList.toggle("active", b.dataset.page === p)
  );
  const s = state();
  const rules = s.rules || defaultRules;
  const app = document.getElementById("app");
  if (p === "rules") app.innerHTML = rulesPage(rules);
  else if (p === "request") app.innerHTML = requestPage();
  else if (p === "training") app.innerHTML = trainingPage();
  else if (p === "maps") app.innerHTML = mapsPage();
  else if (p === "admin") app.innerHTML = adminPage(s, rules);
  else app.innerHTML = homePage();
  bind();
}

function homePage() {
  return `
<div class="hero-banner">
  <img src="https://media.base44.com/images/public/6a9f74dd44a484093e958b7e/2ef61f3f5_image_1f261f2.jpg" alt="MissionChief Dispatchers — emergency services composite" class="hero-banner-img">
</div>
<section class="hero">
  <div class="eyebrow">FIRST RESPONDERS • DISPATCHERS COMMUNITY</div>
  <h1>MISSIONCHIEF<br><span>DISPATCHERS</span></h1>
  <p>Coordinate. Respond. Protect. A multi-world emergency dispatch community connecting the UK, US & AU while keeping MissionChief operations organized.</p>
  <button class="btn primary" onclick="go('rules')">Open rules & verification</button>
  <button class="btn danger" onclick="go('request')">Request a building</button>
  <button class="btn" onclick="go('training')">Request training</button>
  <button class="btn" onclick="go('maps')">Alliance maps</button>
</section>

<div class="grid">
  <div class="card"><div class="stat">3<small>Active worlds</small></div></div>
  <div class="card"><div class="stat">24/7<small>Dispatch support</small></div></div>
  <div class="card"><div class="stat">1<small>Unified alliance portal</small></div></div>
</div>
<section class="section">
  <div class="eyebrow">DISPATCH SERVICES</div>
  <h2>Our <span>response divisions</span></h2>
  <p class="lead">From the control room to the field — our alliance coordinates four core emergency services across all three regions.</p>
  <div class="dispatch-img-wrap dispatch-img-sm">
    <img src="https://media.base44.com/images/public/6a9f74dd44a484093e958b7e/aaaf65bd1_DQD1f.jpg" alt="MissionChief Dispatchers control room" class="dispatch-img">
  </div>
  <div class="grid svc-grid">
    <div class="card svc-card" style="--svc:#4dabf7">
      <div class="svc-img" style="background-image:url('https://images.pexels.com/photos/532001/pexels-photo-532001.jpeg?cs=tinysrgb&dpr=2&w=600')"></div>
      <div class="svc-body">
        <h3>Police</h3>
        <p>Law enforcement operations, SWAT, K-9, aviation, and traffic control across all worlds.</p>
      </div>
    </div>
    <div class="card svc-card" style="--svc:#ff6b35">
      <div class="svc-img" style="background-image:url('https://images.pexels.com/photos/21838999/pexels-photo-21838999.jpeg?cs=tinysrgb&dpr=2&w=600')"></div>
      <div class="svc-body">
        <h3>Fire</h3>
        <p>Firefighting, hazmat, ARFF, wildland, technical rescue, and airborne operations.</p>
      </div>
    </div>
    <div class="card svc-card" style="--svc:#20d77b">
      <div class="svc-img" style="background-image:url('https://images.pexels.com/photos/6519935/pexels-photo-6519935.jpeg?cs=tinysrgb&dpr=2&w=600')"></div>
      <div class="svc-body">
        <h3>EMS</h3>
        <p>Emergency medical services, critical care, tactical medics, and mountain rescue.</p>
      </div>
    </div>
    <div class="card svc-card" style="--svc:#22b8cf">
      <div class="svc-img" style="background-image:url('https://images.pexels.com/photos/38153652/pexels-photo-38153652.jpeg?cs=tinysrgb&dpr=2&w=600')"></div>
      <div class="svc-body">
        <h3>Coastal Rescue</h3>
        <p>Coastal air rescue, lifeguard operations, ocean navigation, and swift water rescue.</p>
      </div>
    </div>
  </div>
</section>
<section class="section">
  <div class="eyebrow">REGIONAL NETWORK</div>
  <h2>One alliance. <span>Three regions.</span></h2>
  <p class="lead">Select a world to jump into MissionChief operations or submit a building request for that world.</p>
  <div class="grid">
    ${["🇬🇧 United Kingdom", "🇺🇸 United States", "🇦🇺 Australia"]
      .map(
        (x, i) =>
          `<div class="card"><h3>${x}</h3><p>Connected dispatchers supporting ${
            ["UK", "US", "Australian"][i]
          } operations.</p><button class="btn" onclick="go('request')">Open world →</button></div>`
      )
      .join("")}
  </div>
</section>
<section class="section">
  <div class="eyebrow">ENTRY</div>
  <h2>How to join</h2>
  <div class="grid">
    <div class="card"><h3>01 Apply in MissionChief</h3><p>Submit an alliance application on your world.</p></div>
    <div class="card"><h3>02 Join Discord</h3><p>Enter the MissionChief Dispatchers Discord and complete verification.</p></div>
    <div class="card"><h3>03 Operate</h3><p>Use region channels, request buildings, and coordinate missions.</p></div>
  </div>
</section>`;
}

function rulesPage(rules) {
  return `
<section class="hero">
  <div class="eyebrow">OFFICIAL ALLIANCE RULES</div>
  <h1>Read. Accept. <span>Get verified.</span></h1>
  <p>Read the complete rules below, then submit your information to confirm that you have read and agreed to follow them.</p>
</section>
<div class="rules">${rules
    .map(
      (r) =>
        `<article class="rule"><h2>${esc(r.title)}</h2><p>${esc(r.body)}</p></article>`
    )
    .join("")}</div>
<form class="form" id="acceptForm">
  <label class="check">
    <input id="agree" type="checkbox">
    <span>I have read the complete MissionChief Dispatchers rules above and agree to abide by them, including changes made by leadership.</span>
  </label>
  <div class="field"><label>Discord Username</label><input id="discord" required placeholder="username"></div>
  <div class="field"><label>MissionChief Username</label><input id="mc" required placeholder="username"></div>
  <button class="btn primary" type="submit">ACCEPT RULES & GET VERIFIED</button>
  <p class="lead" style="font-size:13px;margin-top:16px">Your acceptance record includes your usernames, acceptance time, and the current rules version.</p>
  <div id="acceptMsg"></div>
</form>`;
}

function requestPage() {
  return `
<section class="hero">
  <div class="eyebrow">SHARED INFRASTRUCTURE</div>
  <h1>Building <span>request</span></h1>
  <p>Request hospitals, prisons, academies and other shared infrastructure so worlds stay consistent and usable for the whole alliance.</p>
</section>
<div class="card">
  <h3>DISPATCHERS EMERGENCY NUMBERS</h3>
  <div class="grid">
    <div class="card"><b>🇺🇸 United States</b><strong>911</strong></div>
    <div class="card"><b>🇬🇧 United Kingdom</b><strong>999</strong></div>
    <div class="card"><b>🇦🇺 Australia</b><strong>000</strong></div>
  </div>
  <p>In-game reference only — always call your real local emergency number in an actual emergency.</p>
</div>
<form class="form" id="requestForm">
  <div class="field"><label>Player name *</label><input id="player" required placeholder="Your in-game name"></div>
  <div class="field">
    <label>Server *</label>
    <div class="choices" id="serverChoices">${[
      {v:"🇺🇸 US", c:"server-us"},
      {v:"🇬🇧 UK", c:"server-uk"},
      {v:"🇦🇺 AU", c:"server-au"}
    ].map(
        (x) =>
          `<div class="choice ${x.c}" data-v="${x.v}" onclick="selectChoice(this,'serverChoices')">${x.v}</div>`
      )
      .join("")}</div>
  </div>
  <div class="field">
    <label>Type of building *</label>
    <div class="choices" id="typeChoices">${[
      "Prison",
      "Hospital",
      "Fire Academy",
      "EMS / Rescue Academy",
      "Police Academy",
      "Coastal Rescue Academy"
    ]
      .map(
        (x) =>
          `<div class="choice" data-v="${x}" onclick="selectChoice(this,'typeChoices')">${x}</div>`
      )
      .join("")}</div>
  </div>
  <div class="field"><label>Building name *</label><input id="building" required placeholder="e.g. Central City Hospital"></div>
  <div class="field"><label>Building address *</label><input id="address" required placeholder="Street / location in game"></div>
  <button class="btn primary" type="submit">Submit request</button>
  <div id="requestMsg"></div>
</form>`;
}

const SERVER_TRAINING = {
  "🇺🇸 US": {
    Fire: [
      "ALS Medical Training for Fire Apparatus (3 days)",
      "ARFF (3 days)",
      "Airborne Firefighting (5 days)",
      "Critical Care (5 days)",
      "EMS Mobile Command (7 days)",
      "Hazmat (3 days)",
      "Heavy Machinery Operating (3 days)",
      "Hooklift Truck Driving (4 days)",
      "Hotshot Training (3 days)",
      "Law Enforcement for Arson Investigation (4 days)",
      "Lifeguard Supervisor (5 days)",
      "Lifeguard Training (5 days)",
      "Mobile Command (5 days)",
      "Ocean Navigation (5 days)",
      "Search and Rescue Training (4 days)",
      "Smoke Jumper Training (3 days)",
      "Swift Water Rescue (4 days)",
      "Tactical Medic Training (4 days)",
      "Technical Rescue Training (4 days)",
      "Traffic Control Training (3 days)",
      "Truck Driver's License (2 days)",
      "Wildland Lead Pilot Training (7 days)",
      "Wildland Mobile Command Center Training (5 days)"
    ],
    Police: [
      "Drone Operator (5 days)",
      "Environmental Game Warden (4 days)",
      "FBI Bomb Technician (5 days)",
      "FBI Mobile Center Commander (7 days)",
      "K-9 (5 days)",
      "Ocean Navigation (5 days)",
      "Police Aviation (7 days)",
      "Police Motorcycle (3 days)",
      "Police Operations Management (5 days)",
      "Police Supervisor/Sheriff (5 days)",
      "Riot Police (3 days)",
      "SWAT (5 days)",
      "Sharpshooter Training (5 days)",
      "Swift Water Rescue (4 days)",
      "Tactical Rescue (5 days)",
      "Traffic Control Training (3 days)"
    ],
    EMS: [
      "ALS Medical Training for Fire Apparatus (3 days)",
      "Critical Care (5 days)",
      "EMS Mobile Command (7 days)",
      "Hazmat Medic Training (3 days)",
      "Mountain Dog Training (5 days)",
      "Mountain Rescue Certificate (5 days)",
      "Tactical Medic Training (4 days)",
      "Truck Driver's License (2 days)"
    ],
    "Coastal Rescue": [
      "Coastal Air Rescue (5 days)",
      "Lifeguard Supervisor (5 days)",
      "Lifeguard Training (5 days)",
      "Ocean Navigation (5 days)",
      "Sharpshooter Training (5 days)",
      "Swift Water Rescue (4 days)",
      "TACLET (3 days)"
    ]
  },
  "🇬🇧 UK": {
    Fire: [
      "HazMat (3 days)",
      "Mobile Command (5 days)",
      "ARFF-Training (3 days)",
      "Swift Water Rescue (4 days)",
      "Ocean Navigation (5 days)",
      "Co-Responder Training (3 days)",
      "High Volume Pump Training (3 days)"
    ],
    EMS: [
      "Ambulance Officer (5 days)",
      "Critical Care (5 days)",
      "HART Training (5 days)",
      "Midwifery (5 days)",
      "SORT Training (3 days)",
      "Specialist Paramedic Training (5 days)",
      "Tactical Command Course (5 days)"
    ],
    Police: [
      "Police Aviation (7 days)",
      "Firearms Training (5 days)",
      "Dog Handling (5 days)",
      "Roads Policing Officer Training (3 days)",
      "Level 1 Public Order Training (5 days)",
      "Level 2 Public Order Training (5 days)",
      "Police Medic Training (4 days)",
      "Police Sergeant Training (4 days)",
      "Police Inspector Training (4 days)",
      "Mounted Training (4 days)"
    ],
    "Search and Rescue": [
      "Cave Rescue Training (5 days)",
      "Coastal Air Rescue (5 days)",
      "Coastal Command (5 days)",
      "Coastguard Search Advisor (3 days)",
      "Dog Handling (5 days)",
      "Drone Operator (5 days)",
      "Flood First Responder (3 days)",
      "Hovercraft Commander (3 days)",
      "Jet Ski Handling (3 days)",
      "Lifeboat Operations (5 days)",
      "Lifeguard Training (5 days)",
      "Mud Rescue Training (3 days)"
    ]
  },
  "🇦🇺 AU": {
    Fire: [
      "Airborne Firefighting Training (5 days)",
      "Emergency Stairs Training (5 days)",
      "HAZMAT (3 days)",
      "Intensive Care Education (5 days)",
      "Mobile Command (5 days)",
      "ULFV Crash Tender (3 days)"
    ],
    EMS: ["Intensive Care Education (5 days)"],
    Police: [
      "K-9 (5 days)",
      "Mounted Police Training (3 days)",
      "Police Air Wing (7 days)",
      "Police Motorcycle (3 days)",
      "Riot Police Equipment Training (5 days)",
      "Senior Sergeant (5 days)",
      "TOG (5 days)"
    ],
    "Coast Guard": [
      "Boat Captain Training (3 days)",
      "Coastal Rescue Pilot (7 days)",
      "Mobile Command (3 days)",
      "Ocean Navigation",
      "SES Rescue"
    ]
  }
};

const TRAIN_COLORS = {
  Fire: "#ff6b35",
  Police: "#4dabf7",
  EMS: "#20d77b",
  "Coastal Rescue": "#22b8cf",
  "Search and Rescue": "#fcc419",
  "Coast Guard": "#748ffc"
};

function trainingTypeChoices(server) {
  const catalog = SERVER_TRAINING[server];
  if (!catalog) {
    return `<p class="lead" style="font-size:15px;margin:0">No training catalog for this server yet.</p>`;
  }
  return Object.entries(catalog)
    .map(([cat, list]) => {
      const color = TRAIN_COLORS[cat] || "#ff8e98";
      return `<div class="train-cat">
        <h3 class="train-cat-title" style="color:${color}">${esc(cat)}</h3>
        <div class="choices">
          ${list
            .map(
              (x) =>
                `<div class="choice train-choice" data-v="${esc(x)}" data-cat="${esc(
                  cat
                )}" style="border-color:${color}55;--train-color:${color}" onclick="selectTraining(this)">${esc(x)}</div>`
            )
            .join("")}
        </div>
      </div>`;
    })
    .join("");
}

function trainingPage() {
  return `
<section class="hero">
  <div class="eyebrow">TRAINING & DEVELOPMENT</div>
  <h1>Training <span>request</span></h1>
  <p>Select your server and course, then enter your username and how many seats you need. Each classroom holds <strong>10 seats</strong>.</p>
</section>
<form class="form" id="trainingForm">
  <div class="field"><label>Username *</label><input id="tPlayer" required placeholder="Your username"></div>
  <div class="field">
    <label>Server *</label>
    <div class="choices" id="tServerChoices">
      <div class="choice server-us active" data-v="🇺🇸 US" onclick="selectServer(this)"><strong>US</strong></div>
      <div class="choice server-uk" data-v="🇬🇧 UK" onclick="selectServer(this)"><strong>UK</strong></div>
      <div class="choice server-au" data-v="🇦🇺 AU" onclick="selectServer(this)"><strong>AU</strong></div>
    </div>
  </div>
  <div class="field">
    <label>Training type * <span id="trainServerLabel" style="color:var(--blue);font-weight:800">— <strong>US</strong></span></label>
    <div id="trainTypeArea">${trainingTypeChoices("🇺🇸 US")}</div>
  </div>
  <div class="field">
    <label>Seats needed *</label>
    <input id="tSeats" type="number" min="1" step="1" required placeholder="e.g. 10">
    <p class="lead" style="font-size:13px;margin:8px 0 0">Each classroom holds 10 seats. Classrooms required will be calculated automatically.</p>
  </div>
  <button class="btn primary" type="submit">Submit training request</button>
  <div id="trainingMsg"></div>
</form>`;
}

function selectServer(el) {
  document.querySelectorAll("#tServerChoices .choice").forEach((x) =>
    x.classList.remove("active")
  );
  el.classList.add("active");
  const server = el.dataset.v;
  const label = document.getElementById("trainServerLabel");
  if (label) {
    const short = server.includes("US")
      ? "US"
      : server.includes("UK")
      ? "UK"
      : "AU";
    label.innerHTML = "— <strong>" + short + "</strong>";
  }
  const area = document.getElementById("trainTypeArea");
  if (area) area.innerHTML = trainingTypeChoices(server);
}

function selectTraining(el) {
  document.querySelectorAll("#trainTypeArea .choice").forEach((x) =>
    x.classList.remove("active")
  );
  el.classList.add("active");
}

function mapsPage() {
  return `
<section class="hero">
  <div class="eyebrow">ALLIANCE OPERATIONS MAP</div>
  <h1>Shared <span>maps</span></h1>
  <p>View and edit the live alliance Google Map used for shared infrastructure, response zones, and regional coordination.</p>
</section>
<div class="card">
  <h2>MissionChief Dispatchers Map</h2>
  <p class="lead">This map is maintained by alliance leadership. Open it to view current placements or request edit access if you need to update a location.</p>
  <p style="margin:20px 0">
    <a class="btn primary" href="https://www.google.com/maps/d/u/0/edit?mid=1e-5mRjE78NVFdQrDYShnduHf56zSlqI&usp=sharing" target="_blank" rel="noopener noreferrer">
      Open Alliance Google Map →
    </a>
  </p>
  <p style="color:var(--muted);font-size:14px">
    Link: <a href="https://www.google.com/maps/d/u/0/edit?mid=1e-5mRjE78NVFdQrDYShnduHf56zSlqI&usp=sharing" target="_blank" rel="noopener noreferrer" style="color:var(--blue)">
      https://www.google.com/maps/d/u/0/edit?mid=1e-5mRjE78NVFdQrDYShnduHf56zSlqI&usp=sharing
    </a>
  </p>
</div>
<div class="section">
  <div class="card">
    <h3>How to use the map</h3>
    <p>1. Open the map with the button above.</p>
    <p>2. Browse layers for each region (UK / US / AU) and shared infrastructure.</p>
    <p>3. If you need edit rights or a new layer, contact leadership via Discord or submit a building request with map notes.</p>
  </div>
</div>`;
}

function adminPage(s, rules) {
  const training = s.trainingRequests || [];
  return `
<section class="hero">
  <div class="eyebrow">ALLIANCE CONTROL ROOM</div>
  <h1>Alliance <span>admin</span></h1>
  <p>Manage rules, verification records, building requests, training requests, and alliance branding from one portal.</p>
  <button class="btn" onclick="go('home')">Back to main website</button>
</section>
<div class="admin-grid">
  <div class="card"><div class="stat">${s.acceptances.length}<small>Rule acceptances</small></div></div>
  <div class="card"><div class="stat">${s.requests.length}<small>Building requests</small></div></div>
  <div class="card"><div class="stat">${training.length}<small>Training requests</small></div></div>
</div>
<section class="section">
  <div class="card">
    <h2>Alliance avatar</h2>
    <input type="file" id="avatar" accept="image/*">
    <div style="margin-top:15px">${
      s.avatar
        ? `<img class="image-preview" src="${s.avatar}">`
        : "No avatar uploaded"
    }</div>
  </div>
</section>
<section class="section">
  <div class="card">
    <h2>Discord rules</h2>
    <p class="lead">Edit the rules text used by the verification page. This browser-only build stores the content locally; connect a backend to publish it to Discord.</p>
    <textarea id="rulesText" style="width:100%;min-height:320px;background:#060a14;color:#fff;border:1px solid #1e3a5f;border-radius:9px;padding:14px">${esc(
      rules.map((x) => x.title + "\n" + x.body).join("\n\n")
    )}</textarea>
    <div style="margin-top:12px"><button class="btn primary" id="saveRules">Save rules</button></div>
    <div id="adminMsg"></div>
  </div>
</section>
<section class="section">
  <div class="card">
    <h2>Verification records</h2>
    ${
      s.acceptances.length
        ? `<table class="table"><tr><th>Discord</th><th>MissionChief</th><th>Time</th><th>Version</th></tr>${s.acceptances
            .map(
              (a) =>
                `<tr><td>${esc(a.discord)}</td><td>${esc(
                  a.mc
                )}</td><td>${new Date(a.time).toLocaleString()}</td><td><span class="pill">${
                  a.version
                }</span></td></tr>`
            )
            .join("")}</table>`
        : "<p>No acceptances recorded on this device.</p>"
    }
  </div>
</section>
<section class="section">
  <div class="card">
    <h2>Building requests</h2>
    ${
      s.requests.length
        ? `<table class="table"><tr><th>Player</th><th>Server</th><th>Type</th><th>Building</th></tr>${s.requests
            .map(
              (a) =>
                `<tr><td>${esc(a.player)}</td><td>${esc(a.server)}</td><td>${esc(
                  a.type
                )}</td><td>${esc(a.building)}<br>${esc(a.address)}</td></tr>`
            )
            .join("")}</table>`
        : "<p>No requests recorded on this device.</p>"
    }
  </div>
</section>
<section class="section">
  <div class="card">
    <h2>Training requests</h2>
    ${
      training.length
        ? `<table class="table"><tr><th>Username</th><th>Server</th><th>Category</th><th>Type</th><th>Seats</th><th>Classrooms</th><th>Time</th></tr>${training
            .map(
              (a) =>
                `<tr><td>${esc(a.player)}</td><td>${esc(a.server)}</td><td>${esc(
                  a.category || "—"
                )}</td><td>${esc(a.type)}</td><td>${esc(a.seats)}</td><td>${esc(
                  a.classrooms
                )}</td><td>${new Date(a.time).toLocaleString()}</td></tr>`
            )
            .join("")}</table>`
        : "<p>No training requests recorded on this device.</p>"
    }
  </div>
</section>`;
}

function selectChoice(el, id) {
  document.querySelectorAll("#" + id + " .choice").forEach((x) =>
    x.classList.remove("active")
  );
  el.classList.add("active");
}

let utcInterval = null;
function startUTCClock() {
  if (utcInterval) clearInterval(utcInterval);
  const update = () => {
    const now = new Date();
    const clock = document.getElementById("utcClock");
    if (!clock) { clearInterval(utcInterval); return; }
    const h = String(now.getUTCHours()).padStart(2, "0");
    const m = String(now.getUTCMinutes()).padStart(2, "0");
    const s = String(now.getUTCSeconds()).padStart(2, "0");
    clock.textContent = `${h}:${m}:${s}`;
  };
  update();
  utcInterval = setInterval(update, 1000);
}

function bind() {
  startUTCClock();
  const af = document.getElementById("acceptForm");
  if (af)
    af.onsubmit = (e) => {
      e.preventDefault();
      let s = state();
      if (!document.getElementById("agree").checked)
        return msg(
          "acceptMsg",
          "Please confirm that you have read and accepted the rules.",
          "danger"
        );
      s.acceptances.push({
        discord: discord.value.trim(),
        mc: mc.value.trim(),
        time: new Date().toISOString(),
        version: "MCD-" + (s.rulesVersion || 1)
      });
      save(s);
      sendWebhook("rules", {
        discord: discord.value.trim(),
        mc: mc.value.trim(),
        version: "MCD-" + (s.rulesVersion || 1)
      });
      msg(
        "acceptMsg",
        "Rules accepted. Your verification record has been saved on this device.",
        "success"
      );
      af.reset();
    };

  const rf = document.getElementById("requestForm");
  if (rf)
    rf.onsubmit = (e) => {
      e.preventDefault();
      let server = document.querySelector("#serverChoices .active"),
        type = document.querySelector("#typeChoices .active");
      if (!server || !type)
        return msg("requestMsg", "Select a server and building type.", "danger");
      let s = state();
      s.requests.push({
        player: player.value.trim(),
        server: server.dataset.v,
        type: type.dataset.v,
        building: building.value.trim(),
        address: address.value.trim(),
        time: new Date().toISOString()
      });
      save(s);
      sendWebhook("building", {
        player: player.value.trim(),
        server: server.dataset.v,
        type: type.dataset.v,
        building: building.value.trim(),
        address: address.value.trim()
      });
      msg("requestMsg", "Building request submitted.", "success");
      rf.reset();
      document.querySelectorAll(".choice").forEach((x) => x.classList.remove("active"));
    };

  const tf = document.getElementById("trainingForm");
  if (tf)
    tf.onsubmit = (e) => {
      e.preventDefault();
      let server = document.querySelector("#tServerChoices .active"),
        type = document.querySelector("#trainTypeArea .choice.active");
      if (!server || !type)
        return msg("trainingMsg", "Select a server and training type.", "danger");
      const seats = parseInt(tSeats.value, 10);
      if (!seats || seats < 1)
        return msg("trainingMsg", "Enter a valid number of seats needed.", "danger");
      const classrooms = Math.ceil(seats / 10);
      let s = state();
      if (!s.trainingRequests) s.trainingRequests = [];
      s.trainingRequests.push({
        player: tPlayer.value.trim(),
        server: server.dataset.v,
        type: type.dataset.v,
        category: type.dataset.cat || "",
        seats,
        classrooms,
        time: new Date().toISOString()
      });
      save(s);
      sendWebhook("training", {
        player: tPlayer.value.trim(),
        server: server.dataset.v,
        category: type.dataset.cat || "",
        type: type.dataset.v,
        seats: seats,
        classrooms: classrooms
      });
      msg(
        "trainingMsg",
        "Training request submitted — " + seats + " seat(s) = " + classrooms + " classroom(s).",
        "success"
      );
      tf.reset();
      const usBtn = document.querySelector('#tServerChoices .choice[data-v="🇺🇸 US"]');
      if (usBtn) selectServer(usBtn);
      document.querySelectorAll("#trainTypeArea .choice").forEach((x) =>
        x.classList.remove("active")
      );
    };

  const sr = document.getElementById("saveRules");
  if (sr)
    sr.onclick = () => {
      let s = state();
      let blocks = document
        .getElementById("rulesText")
        .value.split(/\n\s*\n/)
        .filter(Boolean);
      s.rules = blocks.map((b) => {
        let a = b.split("\n");
        return { title: a.shift() || "Rule", body: a.join("\n") };
      });
      s.rulesVersion = (s.rulesVersion || 0) + 1;
      save(s);
      msg("adminMsg", "Rules saved. Verification will use the new version.", "success");
    };

  const av = document.getElementById("avatar");
  if (av)
    av.onchange = () => {
      let f = av.files[0];
      if (!f) return;
      let rd = new FileReader();
      rd.onload = () => {
        let s = state();
        s.avatar = rd.result;
        save(s);
        render();
      };
      rd.readAsDataURL(f);
    };
}

function msg(id, t, c) {
  document.getElementById(id).innerHTML = `<div class="notice ${
    c || ""
  }" style="margin-top:14px">${t}</div>`;
}

function esc(x) {
  return String(x ?? "").replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[m])
  );
}

window.addEventListener("hashchange", render);
document.querySelectorAll(".side-nav button, nav button").forEach((b) => {
  b.onclick = () => {
    go(b.dataset.page);
    const menu = document.getElementById("sideMenu");
    if (menu) menu.classList.remove("open");
  };
});
const menuToggle = document.getElementById("menuToggle");
if (menuToggle) {
  menuToggle.onclick = () => {
    const menu = document.getElementById("sideMenu");
    if (menu) menu.classList.toggle("open");
  };
}
render();
