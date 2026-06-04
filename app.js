const statusLabels = {
  backlog: "Backlog",
  inProgress: "In progress",
  review: "Review",
  done: "Done"
};

const statusOrder = ["backlog", "inProgress", "review", "done"];

const state = {
  view: "dashboard",
  mode: "human",
  range: "weekly",
  search: "",
  streamTimer: null,
  tasks: [
    {
      id: "GIT-4826",
      title: "Optimize dashboard query fanout from O(n^2) to O(n log n)",
      repo: "forge/api",
      status: "inProgress",
      priority: "Urgent",
      owner: "Alistair",
      due: "Today, 5:00 PM",
      estimate: 8,
      comments: 13,
      summary: "Hot path regression affects the home dashboard and the agent issue stream. Pair API profiling with cache key cleanup.",
      tags: ["performance", "dashboard"]
    },
    {
      id: "GIT-4921",
      title: "Ship agent-only Markdown output for issue and CI triage",
      repo: "forge/agents",
      status: "review",
      priority: "High",
      owner: "Maya",
      due: "Tomorrow",
      estimate: 5,
      comments: 9,
      summary: "Expose the same operating picture to agents without rendering the rich UI shell.",
      tags: ["agent-mode", "markdown"]
    },
    {
      id: "GIT-4890",
      title: "Add backlog dedupe assistant for imported GitHub issues",
      repo: "forge/web",
      status: "backlog",
      priority: "Normal",
      owner: "Nikhil",
      due: "Jun 7",
      estimate: 3,
      comments: 4,
      summary: "Cluster imported issues by stack trace, endpoint, and related pull request.",
      tags: ["backlog", "imports"]
    },
    {
      id: "GIT-4874",
      title: "Create production branch protection simulator",
      repo: "forge/runner",
      status: "backlog",
      priority: "Low",
      owner: "Jules",
      due: "Jun 11",
      estimate: 2,
      comments: 2,
      summary: "Demo policy gates for signed commits, required reviews, and green checks.",
      tags: ["repo", "policy"]
    },
    {
      id: "GIT-4855",
      title: "Resolve flaky Playwright shard in billing workflow",
      repo: "forge/web",
      status: "inProgress",
      priority: "High",
      owner: "Ari",
      due: "Today, 8:00 PM",
      estimate: 5,
      comments: 7,
      summary: "Shard 4 fails after the feature flag cache warms. Add deterministic test data and retry guard.",
      tags: ["tests", "ci"]
    },
    {
      id: "GIT-4812",
      title: "Publish release health summary to workspace digest",
      repo: "forge/api",
      status: "done",
      priority: "Normal",
      owner: "Maya",
      due: "Yesterday",
      estimate: 3,
      comments: 6,
      summary: "Delivery digest now includes merged PRs, incidents, build health, and deployment blockers.",
      tags: ["release", "digest"]
    },
    {
      id: "GIT-4807",
      title: "Add package provenance timeline to repo overview",
      repo: "forge/packages",
      status: "done",
      priority: "Normal",
      owner: "Nikhil",
      due: "May 31",
      estimate: 3,
      comments: 5,
      summary: "Repository fleet now shows SBOM age, package freshness, and deploy provenance.",
      tags: ["security", "packages"]
    }
  ],
  repositories: [
    { name: "forge/web", language: "TypeScript", health: 94, prs: 7, issues: 18, builds: "green", deploy: "production", coverage: 88, accent: "var(--green)", summary: "Dashboard shell, backlog board, repo views, and human workspace flows." },
    { name: "forge/api", language: "Go", health: 82, prs: 5, issues: 24, builds: "running", deploy: "canary", coverage: 81, accent: "var(--amber)", summary: "GraphQL gateway, task intelligence, permissions, and audit trails." },
    { name: "forge/agents", language: "Python", health: 89, prs: 3, issues: 12, builds: "green", deploy: "staging", coverage: 92, accent: "var(--cyan)", summary: "Markdown stream mode, triage agents, review agents, and release summarizers." },
    { name: "forge/runner", language: "Rust", health: 76, prs: 2, issues: 9, builds: "red", deploy: "blocked", coverage: 79, accent: "var(--red)", summary: "CI runner, branch protection, cache orchestration, and test isolation." },
    { name: "forge/mobile", language: "Swift", health: 91, prs: 4, issues: 15, builds: "green", deploy: "beta", coverage: 84, accent: "var(--blue)", summary: "Mobile inbox, code review notifications, and task capture on the go." },
    { name: "forge/packages", language: "Node", health: 87, prs: 1, issues: 7, builds: "green", deploy: "registry", coverage: 85, accent: "var(--pink)", summary: "Internal packages, design system primitives, and release provenance." }
  ],
  pullRequests: [
    { id: "PR-1182", title: "Agent markdown stream: issues and CI/CD", repo: "forge/agents", author: "Maya", status: "Ready", checks: "5/5", review: "1 approval needed", age: "42m", risk: "medium" },
    { id: "PR-1179", title: "Dashboard contribution chart range toggle", repo: "forge/web", author: "Jules", status: "Approved", checks: "8/8", review: "merge when queue clears", age: "2h", risk: "low" },
    { id: "PR-1174", title: "Runner cache namespace isolation", repo: "forge/runner", author: "Ari", status: "Changes requested", checks: "6/7", review: "flaky shard remains", age: "5h", risk: "high" },
    { id: "PR-1168", title: "Audit log export for enterprise workspaces", repo: "forge/api", author: "Nikhil", status: "Draft", checks: "3/6", review: "security review pending", age: "1d", risk: "medium" }
  ],
  pipelines: [
    { name: "web / deploy-preview", branch: "feature/home-dashboard", state: "pass", duration: "6m 12s", steps: ["pass", "pass", "pass", "pass"], sha: "9f3c1a2" },
    { name: "api / canary", branch: "perf/dashboard-fanout", state: "run", duration: "11m 04s", steps: ["pass", "pass", "run", "idle"], sha: "d8b60ac" },
    { name: "runner / integration", branch: "cache-isolation", state: "fail", duration: "18m 40s", steps: ["pass", "pass", "fail", "idle"], sha: "35b22fd" },
    { name: "agents / markdown-stream", branch: "agent-md-mode", state: "pass", duration: "4m 31s", steps: ["pass", "pass", "pass", "pass"], sha: "7a91fb0" },
    { name: "packages / provenance", branch: "release/v2.8", state: "pass", duration: "3m 19s", steps: ["pass", "pass", "pass", "pass"], sha: "ee20b8c" },
    { name: "mobile / beta", branch: "mobile-notifications", state: "run", duration: "9m 52s", steps: ["pass", "run", "idle", "idle"], sha: "a03d9c1" }
  ],
  incidents: [
    { id: "INC-2957", title: "Increased error rate in staging API", status: "Active", severity: "Low", service: "forge-api", owner: "Ari", impact: "checkout preview", mttr: "18m", accent: "var(--amber)" },
    { id: "INC-2952", title: "Runner pods restarting in prod shard", status: "Watching", severity: "Medium", service: "forge-runner", owner: "Nikhil", impact: "CI queue latency", mttr: "41m", accent: "var(--red)" },
    { id: "INC-2944", title: "Elevated latency in auth callbacks", status: "Resolved", severity: "Low", service: "forge-web", owner: "Maya", impact: "login retry", mttr: "24m", accent: "var(--green)" },
    { id: "INC-2938", title: "Package registry provenance lag", status: "Resolved", severity: "Low", service: "forge-packages", owner: "Jules", impact: "release notes", mttr: "16m", accent: "var(--cyan)" }
  ],
  contributions: {
    weekly: [5, 8, 4, 10, 7, 3, 9],
    monthly: [2, 4, 0, 5, 7, 3, 8, 6, 4, 9, 12, 8, 7, 3, 5, 6, 11, 10, 8, 4, 6, 13, 12, 9, 5, 7, 11, 14, 9, 8]
  }
};

const streamScripts = {
  issues: [
    "# Agent Issue Triage - Gitbsh DevFlow",
    "",
    "Workspace: `Vector release`",
    "Generated for: engineering home dashboard",
    "",
    "## Priority Queue",
    "| Rank | Issue | Severity | Owner | Recommended next action |",
    "| --- | --- | --- | --- | --- |",
    "| 1 | GIT-4826 Optimize dashboard query fanout | Urgent | Alistair | Pair on API profiling, ship cache key fix before 5 PM |",
    "| 2 | GIT-4855 Resolve flaky Playwright shard | High | Ari | Isolate billing fixture, rerun shard 4 only |",
    "| 3 | GIT-4921 Agent Markdown stream | High | Maya | Merge after one accessibility pass |",
    "",
    "## Backlog Dedupe",
    "- Clustered 24 backlog items into 15 unique product asks.",
    "- Found 4 likely duplicates related to branch protection policies.",
    "- Suggested closing 2 stale imports after repo owner confirmation.",
    "",
    "## Suggested Human Handoff",
    "Ask Maya to review PR-1182, then promote `forge/agents` to staging once checks remain green for 30 minutes."
  ],
  cicd: [
    "# CI/CD Stream - Production Control Tower",
    "",
    "## Current Runs",
    "| Pipeline | Branch | State | Duration | SHA |",
    "| --- | --- | --- | --- | --- |",
    "| web / deploy-preview | feature/home-dashboard | pass | 6m 12s | 9f3c1a2 |",
    "| api / canary | perf/dashboard-fanout | running | 11m 04s | d8b60ac |",
    "| runner / integration | cache-isolation | failed | 18m 40s | 35b22fd |",
    "",
    "## Failure Analysis",
    "- `forge/runner` fails during integration shard 4 after cache namespace reuse.",
    "- Blast radius is limited to queued CI jobs; production deploys are currently blocked by policy.",
    "- Recommended fix: invalidate shared namespace, rerun failed job, then require one additional green full run.",
    "",
    "## Agent Action Plan",
    "1. Keep deploy lock active for `forge/runner`.",
    "2. Notify PR-1174 author with failed step context.",
    "3. Recompute release readiness after the rerun completes."
  ],
  release: [
    "# Release Readiness - Vector release",
    "",
    "## Summary",
    "- Readiness: 82%",
    "- Open blockers: 2",
    "- Merged this week: 14 PRs",
    "- Build health: 92% green",
    "",
    "## Ship / Hold Decision",
    "Hold the production release until `GIT-4826` and `PR-1174` clear. Canary can continue for `forge/api` because rollback windows and telemetry are healthy.",
    "",
    "## Notes for Humans",
    "- Product demo surface is ready for stakeholder review.",
    "- Agent mode can now produce Markdown-only issue, CI/CD, release, and incident streams.",
    "- Backlog create flow is wired and updates board counts immediately."
  ],
  incident: [
    "# Incident Response Stream - Reliability Desk",
    "",
    "## Active Incident",
    "`INC-2957` Increased error rate in staging API",
    "",
    "- Severity: Low",
    "- Service: forge-api",
    "- Impact: checkout preview",
    "- Owner: Ari",
    "- Current MTTR: 18m",
    "",
    "## Timeline",
    "- T+00: Alert triggered from staging synthetic checkout.",
    "- T+06: Error burst correlated with dashboard fanout canary.",
    "- T+11: Rollback guard enabled while API profiling continues.",
    "",
    "## Recommended Next Step",
    "Keep production unaffected by holding the canary at 10%, then merge the cache key patch after PR review."
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const normalize = (value) => String(value || "").toLowerCase();

const matchesSearch = (item) => {
  const query = normalize(state.search);
  if (!query) return true;
  return normalize(Object.values(item).flat().join(" ")).includes(query);
};

function init() {
  bindEvents();
  renderAll();
  startStream("issues");
}

function bindEvents() {
  $$("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  $$("[data-open-task]").forEach((button) => {
    button.addEventListener("click", openTaskModal);
  });

  $("[data-close-modal]").addEventListener("click", closeTaskModal);
  $("#taskModal").addEventListener("click", (event) => {
    if (event.target.id === "taskModal") closeTaskModal();
  });

  $("#taskForm").addEventListener("submit", addTask);

  $("#globalSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    renderAll();
  });

  $$("[data-range]").forEach((button) => {
    button.addEventListener("click", () => {
      state.range = button.dataset.range;
      $$("[data-range]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderContributionChart();
    });
  });

  $$("[data-view-shortcut]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewShortcut));
  });

  $("[data-focus-backlog]").addEventListener("click", () => setView("backlog"));
  $("[data-agent-shortcut]").addEventListener("click", () => setMode("agent", "release"));

  $$("[data-agent-scenario]").forEach((button) => {
    button.addEventListener("click", () => setMode("agent", button.dataset.agentScenario));
  });

  $$("[data-stream]").forEach((button) => {
    button.addEventListener("click", () => startStream(button.dataset.stream));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTaskModal();
  });
}

function setMode(mode, stream = "issues") {
  state.mode = mode;
  const isAgent = mode === "agent";
  $("#humanApp").hidden = isAgent;
  $("#agentApp").hidden = !isAgent;
  $$(".mode-option").forEach((button) => button.classList.toggle("is-active", button.dataset.mode === mode));

  if (isAgent) {
    startStream(stream);
  } else if (state.streamTimer) {
    window.clearInterval(state.streamTimer);
    state.streamTimer = null;
  }
}

function setView(view) {
  state.view = view;
  $$("[data-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  $$(".view-panel").forEach((panel) => panel.classList.remove("is-active"));
  const target = $(`#${view}View`);
  if (target) target.classList.add("is-active");

  const labels = {
    dashboard: "Command center",
    backlog: "Backlog intelligence",
    repositories: "Repository fleet",
    pulls: "Pull requests",
    cicd: "CI/CD control tower",
    incidents: "Incidents",
    demo: "Demo app simulation"
  };
  $("#viewTitle").textContent = labels[view] || "Command center";
}

function renderAll() {
  renderCounters();
  renderNextAction();
  renderVelocity();
  renderStats();
  renderContributionChart();
  renderFocusQueue();
  renderTaskBoard();
  renderBacklogDeepDive();
  renderRepositories();
  renderPullRequests();
  renderPipelines();
  renderIncidents();
  renderDemoPreview();
  renderDemoLab();
}

function filteredTasks() {
  return state.tasks.filter(matchesSearch);
}

function renderCounters() {
  $("#backlogCount").textContent = state.tasks.filter((task) => task.status === "backlog").length;
  $("#prCount").textContent = state.pullRequests.length;
  $("#buildCount").textContent = state.pipelines.filter((pipeline) => pipeline.state !== "pass").length;
  $("#incidentCount").textContent = state.incidents.filter((incident) => incident.status !== "Resolved").length;
}

function renderNextAction() {
  const urgent = state.tasks.find((task) => task.priority === "Urgent") || state.tasks[0];
  $("#nextActionTitle").textContent = urgent.title;
  $("#nextActionSummary").textContent = urgent.summary;
  $("#nextActionMeta").innerHTML = [
    chip(urgent.id),
    statusChip(urgent.status),
    priorityChip(urgent.priority),
    chip(urgent.repo),
    chip(`${urgent.estimate} pts`),
    chip(`Due ${urgent.due}`)
  ].join("");
}

function renderVelocity() {
  const values = [18, 28, 22, 36, 31, 44, 38, 51, 46];
  $("#velocitySparkline").innerHTML = lineChart(values, "var(--green)");
}

function renderStats() {
  const stats = [
    { label: "Open tasks", value: state.tasks.filter((task) => task.status !== "done").length, trend: "+4 captured today", accent: "var(--cyan)" },
    { label: "Merged PRs", value: "14", trend: "+18% vs last week", accent: "var(--green)" },
    { label: "Build health", value: "92%", trend: "2 pipelines need attention", accent: "var(--amber)" },
    { label: "Incidents", value: state.incidents.filter((incident) => incident.status !== "Resolved").length, trend: "No production impact", accent: "var(--red)" }
  ];

  $("#statsGrid").innerHTML = stats.map((stat) => `
    <article class="stat-card" style="--accent: ${stat.accent}">
      <span>${stat.label}</span>
      <strong>${stat.value}</strong>
      <p>${stat.trend}</p>
    </article>
  `).join("");
}

function renderContributionChart() {
  const values = state.contributions[state.range];
  const max = Math.max(...values);
  const labels = state.range === "weekly"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : values.map((_, index) => String(index + 1));
  const total = values.reduce((sum, value) => sum + value, 0);
  const best = Math.max(...values);
  const average = Math.round((total / values.length) * 10) / 10;

  $("#contributionChart").style.setProperty("--bars", values.length);
  $("#contributionChart").innerHTML = `
    <div class="chart-bars" style="--bars: ${values.length}">
      ${values.map((value, index) => `
        <div class="bar-wrap" title="${labels[index]}: ${value} contributions">
          <div class="bar" style="height: ${Math.max(7, (value / max) * 150)}px; animation-delay: ${index * 28}ms"></div>
          <span>${labels[index]}</span>
        </div>
      `).join("")}
    </div>
    <div class="chart-summary">
      <span><strong>${total}</strong> contributions</span>
      <span><strong>${best}</strong> best day</span>
      <span><strong>${average}</strong> daily avg</span>
    </div>
  `;
}

function renderFocusQueue() {
  const focus = [
    { icon: "CI", title: "Runner integration failed", detail: "PR-1174 is blocking release readiness", action: "Inspect" },
    { icon: "PR", title: "1 approval needed", detail: "Agent Markdown stream is ready for final review", action: "Review" },
    { icon: "IR", title: "Staging API error burst", detail: "Canary held at 10% while profiling continues", action: "Watch" }
  ];

  $("#focusQueue").innerHTML = focus.map((item) => `
    <article class="focus-item">
      <span class="focus-icon">${item.icon}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
      </div>
      <span class="chip">${item.action}</span>
    </article>
  `).join("");
}

function renderTaskBoard() {
  const tasks = filteredTasks();
  $("#taskBoard").innerHTML = statusOrder.map((status) => {
    const cards = tasks.filter((task) => task.status === status);
    return `
      <section class="task-column" aria-label="${statusLabels[status]}">
        <div class="column-header">
          <strong>${statusLabels[status]}</strong>
          <span>${cards.length}</span>
        </div>
        <div class="card-stack">
          ${cards.length ? cards.map(taskCard).join("") : `<div class="empty-state">No matching tasks</div>`}
        </div>
      </section>
    `;
  }).join("");
}

function renderBacklogDeepDive() {
  const backlog = filteredTasks().filter((task) => task.status === "backlog");
  const allOpen = filteredTasks().filter((task) => task.status !== "done");
  $("#backlogDeepDive").innerHTML = `
    <section class="deep-card">
      <h3>Backlog board</h3>
      <p>Prioritized work ready for grooming, dedupe, or sprint pull-in.</p>
      <div class="card-stack">
        ${backlog.length ? backlog.map(taskCard).join("") : `<div class="empty-state">No backlog items match your search.</div>`}
      </div>
    </section>
    <section class="deep-card">
      <h3>Planning signals</h3>
      <p>${allOpen.length} open tasks, ${sumEstimates(allOpen)} estimated points, ${countByPriority("Urgent")} urgent item.</p>
      <div class="heatmap" aria-label="Backlog heatmap">
        ${Array.from({ length: 45 }, (_, index) => `<span class="heat-cell" data-level="${(index * 7 + 3) % 5}"></span>`).join("")}
      </div>
    </section>
  `;
}

function renderRepositories() {
  const repos = state.repositories.filter(matchesSearch);
  $("#repoGrid").innerHTML = repos.length ? repos.map((repo) => `
    <article class="repo-card" style="--accent: ${repo.accent}">
      <h3>${repo.name}</h3>
      <p>${repo.summary}</p>
      <span class="repo-score">${repo.health}<small>/100 health</small></span>
      <div class="repo-meta">
        ${chip(repo.language)}${chip(`${repo.prs} PRs`)}${chip(`${repo.issues} issues`)}${chip(`${repo.coverage}% coverage`)}${chip(repo.deploy)}
      </div>
    </article>
  `).join("") : empty("No repositories match your search.");
}

function renderPullRequests() {
  const prs = state.pullRequests.filter(matchesSearch);
  $("#pullRequestList").innerHTML = prs.length ? prs.map((pr) => `
    <article class="timeline-item">
      <div class="section-heading compact">
        <div>
          <h3>${pr.id} - ${pr.title}</h3>
          <p>${pr.repo} by ${pr.author}</p>
        </div>
        ${riskChip(pr.risk)}
      </div>
      <div class="timeline-meta">
        ${chip(pr.status)}${chip(`${pr.checks} checks`)}${chip(pr.review)}${chip(pr.age)}
      </div>
    </article>
  `).join("") : empty("No pull requests match your search.");
}

function renderPipelines() {
  const pipelines = state.pipelines.filter(matchesSearch);
  $("#pipelineGrid").innerHTML = pipelines.length ? pipelines.map((pipeline) => `
    <article class="pipeline-card" style="--accent: ${pipelineColor(pipeline.state)}">
      <h3>${pipeline.name}</h3>
      <p>${pipeline.branch}</p>
      <div class="pipeline-steps" aria-label="Pipeline steps">
        ${pipeline.steps.map((step) => `<span class="step-dot ${step}"></span>`).join("")}
      </div>
      <div class="pipeline-meta">
        ${chip(pipeline.state)}${chip(pipeline.duration)}${chip(pipeline.sha)}
      </div>
    </article>
  `).join("") : empty("No pipelines match your search.");
}

function renderIncidents() {
  const incidents = state.incidents.filter(matchesSearch);
  $("#incidentGrid").innerHTML = incidents.length ? incidents.map((incident) => `
    <article class="incident-card" style="--accent: ${incident.accent}">
      <h3>${incident.id}</h3>
      <p>${incident.title}</p>
      <div class="incident-meta">
        ${chip(incident.status)}${chip(incident.severity)}${chip(incident.service)}${chip(`Owner ${incident.owner}`)}${chip(`MTTR ${incident.mttr}`)}
      </div>
    </article>
  `).join("") : empty("No incidents match your search.");
}

function renderDemoPreview() {
  const demos = [
    { title: "Repository intelligence", copy: "Fleet health, branch policies, packages, deploys, and code ownership in one production console.", accent: "var(--green)", cta: "Open repos", view: "repositories" },
    { title: "Task and issue operations", copy: "Backlog, imported issues, dedupe suggestions, owner routing, and sprint-ready cards.", accent: "var(--cyan)", cta: "Open backlog", view: "backlog" },
    { title: "Agent Markdown mode", copy: "Hide the UI and stream issue, CI/CD, incident, and release state as Markdown for agents.", accent: "var(--amber)", cta: "Stream MD", agent: "issues" }
  ];

  $("#demoPreview").innerHTML = demos.map((demo) => `
    <article class="demo-card" style="--accent: ${demo.accent}">
      <h3>${demo.title}</h3>
      <p>${demo.copy}</p>
      <div class="task-card-footer">
        <button class="soft-btn small" type="button" ${demo.agent ? `data-agent-scenario="${demo.agent}"` : `data-view-shortcut="${demo.view}"`}>${demo.cta}</button>
      </div>
    </article>
  `).join("");

  bindDynamicShortcuts($("#demoPreview"));
}

function renderDemoLab() {
  $("#demoLab").innerHTML = `
    <section class="deep-card">
      <h3>Production GitHub alternative surface</h3>
      <p>This simulation combines project management, source control, reviews, packages, deployments, incidents, and agent operations into one post-login home.</p>
      <div class="repo-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 14px;">
        ${state.repositories.slice(0, 4).map((repo) => `
          <article class="repo-card" style="--accent: ${repo.accent}">
            <h3>${repo.name}</h3>
            <p>${repo.summary}</p>
            <div class="repo-meta">${chip(`${repo.health} health`)}${chip(repo.builds)}${chip(repo.deploy)}</div>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="deep-card">
      <h3>Agent contract</h3>
      <p>When Agent mode is active, rich cards and charts disappear. The same state streams as Markdown that can be logged, copied, parsed, or handed to another agent.</p>
      <div class="card-stack" style="margin-top: 14px;">
        <button class="soft-btn" type="button" data-agent-scenario="issues">Stream issue triage</button>
        <button class="soft-btn" type="button" data-agent-scenario="cicd">Stream CI/CD status</button>
        <button class="soft-btn" type="button" data-agent-scenario="release">Stream release readiness</button>
        <button class="soft-btn" type="button" data-agent-scenario="incident">Stream incident response</button>
      </div>
    </section>
  `;

  bindDynamicShortcuts($("#demoLab"));
}

function bindDynamicShortcuts(root) {
  $$('[data-view-shortcut]', root).forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewShortcut));
  });
  $$('[data-agent-scenario]', root).forEach((button) => {
    button.addEventListener("click", () => setMode("agent", button.dataset.agentScenario));
  });
}

function taskCard(task) {
  return `
    <article class="task-card">
      <div class="task-card-footer" style="margin-top: 0; margin-bottom: 10px;">
        ${chip(task.id)}${priorityChip(task.priority)}
      </div>
      <h3>${task.title}</h3>
      <p>${task.summary}</p>
      <div class="task-card-footer">
        <span class="owner-avatar" title="${task.owner}">${task.owner.slice(0, 1)}</span>
        ${chip(task.repo)}${chip(`${task.estimate} pts`)}${chip(`${task.comments} comments`)}${chip(task.due)}
      </div>
    </article>
  `;
}

function chip(label) {
  return `<span class="chip">${label}</span>`;
}

function statusChip(status) {
  return `<span class="status-chip status-${status}">${statusLabels[status] || status}</span>`;
}

function priorityChip(priority) {
  return `<span class="priority-chip priority-${priority}">${priority}</span>`;
}

function riskChip(risk) {
  const className = risk === "high" ? "danger" : risk === "medium" ? "warning" : "positive";
  return `<span class="trend-pill ${className}">${risk} risk</span>`;
}

function pipelineColor(stateName) {
  if (stateName === "pass") return "var(--green)";
  if (stateName === "fail") return "var(--red)";
  return "var(--amber)";
}

function sumEstimates(tasks) {
  return tasks.reduce((sum, task) => sum + Number(task.estimate || 0), 0);
}

function countByPriority(priority) {
  return state.tasks.filter((task) => task.priority === priority && task.status !== "done").length;
}

function empty(copy) {
  return `<div class="empty-state">${copy}</div>`;
}

function openTaskModal() {
  const modal = $("#taskModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  $("#taskForm input[name='title']").focus();
}

function closeTaskModal() {
  const modal = $("#taskModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function addTask(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const nextNumber = 5000 + state.tasks.length + 1;
  const task = {
    id: `GIT-${nextNumber}`,
    title: data.get("title").trim(),
    repo: data.get("repo"),
    status: data.get("status"),
    priority: data.get("priority"),
    owner: data.get("owner") || "Maya",
    due: "New",
    estimate: Number(data.get("estimate") || 3),
    comments: 0,
    summary: data.get("summary") || "Newly captured from the dashboard home page.",
    tags: ["captured"]
  };

  state.tasks.unshift(task);
  form.reset();
  form.elements.owner.value = "Maya";
  form.elements.estimate.value = 3;
  closeTaskModal();
  renderAll();
  setView("backlog");
  showToast(`${task.id} added to ${statusLabels[task.status]}.`);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function startStream(type) {
  const output = $("#markdownStream");
  if (!output) return;
  const script = streamScripts[type] || streamScripts.issues;
  $$("[data-stream]").forEach((button) => button.classList.toggle("is-active", button.dataset.stream === type));

  if (state.streamTimer) window.clearInterval(state.streamTimer);
  output.textContent = "";

  const text = script.join("\n") + "\n";
  let index = 0;
  state.streamTimer = window.setInterval(() => {
    output.textContent += text[index] || "";
    output.scrollTop = output.scrollHeight;
    index += 1;
    if (index >= text.length) {
      window.clearInterval(state.streamTimer);
      state.streamTimer = null;
    }
  }, 9);
}

function lineChart(values, color) {
  const width = 360;
  const height = 120;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 18) - 9;
    return [x, y];
  });
  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Velocity trend line">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.32" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <polyline points="0,96 ${width},96" fill="none" stroke="rgba(255,255,255,0.09)" stroke-dasharray="4 6" />
      <polygon points="${area}" fill="url(#sparkFill)" />
      <polyline points="${line}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      ${points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${color}" />`).join("")}
    </svg>
  `;
}

init();
