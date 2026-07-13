import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const healthPath = new URL("../health.html", import.meta.url);
const hubPath = new URL("../index.html", import.meta.url);

test("health gacha exposes required choices and controls", async () => {
  const html = await readFile(healthPath, "utf8");

  assert.match(html, /오늘 어디/);
  assert.match(html, /하체/);
  assert.match(html, /가슴/);
  assert.match(html, /등/);
  assert.match(html, /어깨/);
  assert.match(html, /id="drawButton"/);
  assert.match(html, /aria-pressed/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /viewport-fit=cover/);
});

test("shared hub links to health gacha", async () => {
  const html = await readFile(hubPath, "utf8");

  assert.match(html, /href="\.\/health\.html"/);
  assert.match(html, /운동 부위 뽑기/);
});
