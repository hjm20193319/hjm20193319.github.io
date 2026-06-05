import assert from 'node:assert/strict';

import {
  applyPlayerInput,
  createGameState,
  resolveCollisions,
} from '../src/game-core.mjs';

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('createGameState starts the player centered with default counters', () => {
  const state = createGameState({ width: 800, height: 600, rng: () => 0.5 });

  assert.equal(state.player.x, 400);
  assert.equal(state.player.y, 300);
  assert.equal(state.score, 0);
  assert.equal(state.lives, 3);
  assert.equal(state.phase, 'ready');
});

test('applyPlayerInput moves the player and keeps them inside the arena', () => {
  const state = createGameState({ width: 200, height: 120, rng: () => 0.5 });
  const moved = applyPlayerInput(state, { left: true, up: true }, 2);
  const pinned = applyPlayerInput(moved, { left: true, up: true }, 10);

  assert.ok(moved.player.x < state.player.x);
  assert.ok(moved.player.y < state.player.y);
  assert.equal(pinned.player.x, pinned.player.radius);
  assert.equal(pinned.player.y, pinned.player.radius);
});

test('resolveCollisions awards points and relocates collected crystals', () => {
  const state = createGameState({ width: 300, height: 220, rng: () => 0.5 });
  state.crystal = { x: state.player.x, y: state.player.y, radius: 10 };

  const next = resolveCollisions(state, () => 0.75);

  assert.equal(next.score, 10);
  assert.notEqual(next.crystal.x, state.crystal.x);
  assert.notEqual(next.crystal.y, state.crystal.y);
});

test('resolveCollisions removes one life on asteroid hit and respects invulnerability', () => {
  const state = createGameState({ width: 300, height: 220, rng: () => 0.5 });
  state.asteroids = [{ x: state.player.x, y: state.player.y, radius: 20, vx: 0, vy: 0 }];

  const hit = resolveCollisions(state, () => 0.5);
  const guarded = resolveCollisions(hit, () => 0.5);

  assert.equal(hit.lives, 2);
  assert.ok(hit.invulnerability > 0);
  assert.equal(guarded.lives, 2);
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
