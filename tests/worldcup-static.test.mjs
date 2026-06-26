import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const html = readFileSync("worldcup.html", "utf8");
const css = readFileSync("worldcup.css", "utf8");
const js = readFileSync("worldcup.js", "utf8");
const index = readFileSync("index.html", "utf8");

test("hub links to the standalone World Cup dashboard", () => {
  assert.equal(index.includes('href="./worldcup.html"'), true);
  assert.equal(index.includes("대한민국 32강 경우의 수"), true);
});

test("dashboard uses classic scripts for direct local opening", () => {
  assert.equal(html.includes('<script src="./worldcup.js"></script>'), true);
  assert.equal(html.includes('type="module"'), false);
});

test("dashboard exposes required dynamic regions and score constraints", () => {
  ["group-standings", "third-standings", "match-grid", "scenario-grid", "condition-counter", "probability-value"].forEach((id) => {
    assert.equal(html.includes(id), true);
  });
  assert.equal(js.includes('type="number" min="0"'), true);
  assert.equal(js.includes("sanitizeScore"), true);
});

test("styles include mobile and semantic status rules", () => {
  assert.equal(css.includes("@media (max-width: 720px)"), true);
  assert.equal(css.includes("grid-template-columns: 1fr"), true);
  ["--met", "--failed", "--progress", "--scheduled", "--korea-red", "--korea-blue"].forEach((token) => {
    assert.equal(css.includes(token), true);
  });
});
