import assert from 'node:assert/strict';

import {
  createJuggleState,
  getJuggleConfig,
  isPointInsideBall,
  liftBall,
  stepJuggle,
} from '../src/juggle-core.mjs';

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('createJuggleState starts the ball in the center', () => {
  const state = createJuggleState();
  const config = getJuggleConfig();

  assert.equal(state.ball.x, config.width / 2);
  assert.equal(state.ball.y, config.height / 2);
  assert.equal(state.phase, 'ready');
  assert.equal(state.count, 0);
});

test('isPointInsideBall only accepts points inside the circular ball', () => {
  const state = createJuggleState();

  assert.equal(isPointInsideBall(state, state.ball.x, state.ball.y), true);
  assert.equal(isPointInsideBall(state, state.ball.x + state.ball.radius + 1, state.ball.y), false);
});

test('liftBall increments count and sends a right-side touch left', () => {
  const state = createJuggleState();
  const lifted = liftBall(state, state.ball.x + state.ball.radius * 0.7, state.ball.y);

  assert.equal(lifted.phase, 'playing');
  assert.equal(lifted.count, 1);
  assert.ok(lifted.ball.vx < 0);
  assert.ok(lifted.ball.vy < 0);
});

test('liftBall ignores touches outside the ball', () => {
  const state = createJuggleState();
  const lifted = liftBall(state, 10, 10);

  assert.equal(lifted.phase, 'ready');
  assert.equal(lifted.count, 0);
});

test('stepJuggle bounces off walls', () => {
  const state = createJuggleState();
  state.phase = 'playing';
  state.ball.x = state.ball.radius + 1;
  state.ball.vx = -260;

  const next = stepJuggle(state, 0.1);

  assert.equal(next.ball.x, next.ball.radius);
  assert.ok(next.ball.vx > 0);
});

test('stepJuggle ends the run when the ball reaches the bottom', () => {
  const state = createJuggleState();
  state.phase = 'playing';
  state.count = 4;
  state.ball.y = getJuggleConfig().height - state.ball.radius - 1;
  state.ball.vy = 220;

  const next = stepJuggle(state, 0.1);

  assert.equal(next.phase, 'gameover');
  assert.match(next.message, /4/);
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
