import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const requiredFiles = ["index.html", "styles.css", "app.js", "package.json"];
const requiredSelectors = [
  "humanApp",
  "agentApp",
  "markdownStream",
  "taskModal",
  "taskBoard",
  "contributionChart",
  "demoLab"
];

for (const file of requiredFiles) {
  const fullPath = resolve(root, file);
  const stat = statSync(fullPath);
  if (!stat.isFile() || stat.size === 0) {
    throw new Error(`${file} is missing or empty`);
  }
}

const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const js = readFileSync(resolve(root, "app.js"), "utf8");

for (const selector of requiredSelectors) {
  if (!html.includes(`id="${selector}"`)) {
    throw new Error(`index.html is missing #${selector}`);
  }
}

for (const token of ["data-mode=\"agent\"", "data-open-task", "data-stream=\"cicd\""]) {
  if (!html.includes(token)) {
    throw new Error(`index.html is missing ${token}`);
  }
}

for (const token of ["streamScripts", "function addTask", "function setMode", "function renderContributionChart"]) {
  if (!js.includes(token)) {
    throw new Error(`app.js is missing ${token}`);
  }
}

for (const token of ["@media (max-width: 760px)", ".agent-app", ".task-board", ".contribution-chart"]) {
  if (!css.includes(token)) {
    throw new Error(`styles.css is missing ${token}`);
  }
}

execFileSync("node", ["--check", resolve(root, "app.js")], { stdio: "inherit" });
console.log("Demo validation passed: static files, interactions, agent stream, and responsive styles are present.");
