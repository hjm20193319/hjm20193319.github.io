import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const script = readFileSync(resolve("worldcup.js"), "utf8");
const sandbox = {
  window: {},
  document: {
    addEventListener() {},
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return {
        className: "",
        dataset: {},
        setAttribute() {},
        append() {},
        addEventListener() {},
      };
    },
  },
};
sandbox.window.document = sandbox.document;
vm.createContext(sandbox);
vm.runInContext(script, sandbox);

const {
  sampleData,
  calculateStandings,
  sanitizeScore,
  evaluateQualification,
  updateMatchScore,
} = sandbox.window.WorldCupCalculator;

test("calculates current Korea Group A points from actual-style results", () => {
  const data = structuredClone(sampleData);
  const standings = calculateStandings(data.matches, "A");
  const korea = standings.find((team) => team.teamId === "KOR");

  assert.equal(korea.points, 3);
  assert.equal(korea.wins, 1);
  assert.equal(korea.losses, 2);
  assert.equal(korea.goalsFor, 2);
});

test("sorts standings by points, goal difference, goals for, then name", () => {
  const matches = [
    { id: "T1", group: "T", homeTeam: "ALP", awayTeam: "BRV", homeScore: 2, awayScore: 0, status: "completed" },
    { id: "T2", group: "T", homeTeam: "CRN", awayTeam: "DEL", homeScore: 1, awayScore: 0, status: "completed" },
    { id: "T3", group: "T", homeTeam: "ALP", awayTeam: "CRN", homeScore: 0, awayScore: 1, status: "completed" },
    { id: "T4", group: "T", homeTeam: "BRV", awayTeam: "DEL", homeScore: 3, awayScore: 0, status: "completed" },
    { id: "T5", group: "T", homeTeam: "ALP", awayTeam: "DEL", homeScore: 0, awayScore: 0, status: "scheduled" },
    { id: "T6", group: "T", homeTeam: "BRV", awayTeam: "CRN", homeScore: 0, awayScore: 0, status: "scheduled" },
  ];

  const standings = calculateStandings(matches, "T", {
    ALP: { id: "ALP", name: "Alpha" },
    BRV: { id: "BRV", name: "Bravo" },
    CRN: { id: "CRN", name: "Crown" },
    DEL: { id: "DEL", name: "Delta" },
  });

  assert.deepEqual(
    Array.from(standings.map((team) => team.teamId)),
    ["CRN", "BRV", "ALP", "DEL"],
  );
});

test("sanitizes empty and negative score input", () => {
  assert.equal(sanitizeScore(""), 0);
  assert.equal(sanitizeScore("-4"), 0);
  assert.equal(sanitizeScore("3"), 3);
});

test("updates scenario card status when target match results change", () => {
  const data = structuredClone(sampleData);
  updateMatchScore(data, "group-f", 1, 1);

  const result = evaluateQualification(data);
  const japanScenario = result.scenarios.find((scenario) => scenario.id === "group-f");

  assert.equal(japanScenario.status, "failed");
  assert.equal(japanScenario.symbol, "×");
});

test("starts with Scotland third-place scenario counted and requires four successful cards", () => {
  const data = structuredClone(sampleData);
  const result = evaluateQualification(data);
  const scotlandScenario = result.scenarios.find((scenario) => scenario.id === "group-c-third");
  const japanScenario = result.scenarios.find((scenario) => scenario.id === "group-f");

  assert.equal(scotlandScenario.status, "met");
  assert.equal(scotlandScenario.symbol, "○");
  assert.equal(japanScenario.status, "failed");
  assert.equal(japanScenario.symbol, "×");
  assert.equal(result.conditions.met, 1);
  assert.equal(result.conditions.required, 4);
});

test("requires four successful scenario cards for qualification state", () => {
  const data = structuredClone(sampleData);
  updateMatchScore(data, "group-h", 1, 0);
  updateMatchScore(data, "group-i", 1, 1);
  updateMatchScore(data, "group-k", 0, 0);

  const result = evaluateQualification(data);

  assert.equal(result.conditions.required, 4);
  assert.equal(result.conditions.met >= 4, true);
  assert.equal(result.statusLabel, "조건 충족");
});
