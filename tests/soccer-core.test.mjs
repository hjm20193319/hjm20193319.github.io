import assert from 'node:assert/strict';

import {
  beginShot,
  continueAfterResult,
  createSoccerState,
  evaluateShot,
  moveAim,
  startGame,
} from '../src/soccer-core.mjs';

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('startGame enters playing state with default counters', () => {
  const state = startGame();

  assert.equal(state.phase, 'playing');
  assert.equal(state.score, 0);
  assert.equal(state.round, 1);
  assert.equal(state.streak, 0);
});

test('moveAim clamps the target inside the goal mouth', () => {
  const state = startGame();
  const farLeft = moveAim(state, -1, 20);
  const farRight = moveAim(state, 1, 20);

  assert.equal(farLeft.aimX, 230);
  assert.equal(farRight.aimX, 670);
});

test('beginShot converts a playing state into a shot', () => {
  const state = startGame();
  const shot = beginShot(state);

  assert.equal(shot.phase, 'shot');
  assert.ok(shot.shot);
  assert.equal(shot.shot.startY, 478);
});

test('evaluateShot scores when the target avoids the keeper', () => {
  const state = beginShot({ ...startGame(), aimX: 250, keeper: { ...createSoccerState().keeper, x: 620 } });
  const result = evaluateShot(state);

  assert.equal(result.phase, 'result');
  assert.equal(result.score, 100);
  assert.equal(result.streak, 1);
});

test('evaluateShot resets streak when the keeper saves', () => {
  const state = beginShot({ ...startGame(), streak: 2, aimX: 450 });
  const result = evaluateShot(state);

  assert.equal(result.score, 0);
  assert.equal(result.streak, 0);
  assert.match(result.message, /선방/);
});

test('continueAfterResult advances rounds and finishes after the last round', () => {
  const result = { ...startGame(), phase: 'result', round: 1, resultTimer: 0 };
  const next = continueAfterResult(result);
  const last = continueAfterResult({ ...result, round: 7, score: 300 });

  assert.equal(next.phase, 'playing');
  assert.equal(next.round, 2);
  assert.equal(last.phase, 'finished');
  assert.match(last.message, /300/);
});

let failures = 0;

for (const { name, fn } of tests) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`not ok - ${name}`);
    console.error(error);
  }
}

if (failures > 0) {
  process.exitCode = 1;
}
