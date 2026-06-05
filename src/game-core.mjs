const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 640;
const PLAYER_RADIUS = 16;
const PLAYER_SPEED = 260;
const CRYSTAL_RADIUS = 12;
const INITIAL_ASTEROIDS = 5;
const MAX_ASTEROIDS = 12;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const randomRange = (rng, min, max) => min + rng() * (max - min);

export function circleHit(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const radius = a.radius + b.radius;
  return dx * dx + dy * dy <= radius * radius;
}

export function spawnCrystal(width, height, rng = Math.random, avoid) {
  const pad = 44;
  let crystal = {
    x: randomRange(rng, pad, width - pad),
    y: randomRange(rng, pad, height - pad),
    radius: CRYSTAL_RADIUS,
    pulse: randomRange(rng, 0, Math.PI * 2),
  };

  if (avoid && circleHit(crystal, { ...avoid, radius: avoid.radius + 50 })) {
    crystal = {
      ...crystal,
      x: width - crystal.x,
      y: height - crystal.y,
    };
  }

  return crystal;
}

export function spawnAsteroid(width, height, rng = Math.random, level = 1, avoid) {
  const radius = randomRange(rng, 16, 30);
  let x = randomRange(rng, radius, width - radius);
  let y = randomRange(rng, radius, height - radius);

  if (avoid && circleHit({ x, y, radius }, { ...avoid, radius: avoid.radius + 90 })) {
    x = width - x;
    y = height - y;
  }

  const angle = randomRange(rng, 0, Math.PI * 2);
  const speed = randomRange(rng, 70, 115) + level * 7;

  return {
    x,
    y,
    radius,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    spin: randomRange(rng, -1.6, 1.6),
    rotation: randomRange(rng, 0, Math.PI * 2),
  };
}

export function createGameState({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  rng = Math.random,
} = {}) {
  const player = {
    x: width / 2,
    y: height / 2,
    radius: PLAYER_RADIUS,
    speed: PLAYER_SPEED,
  };

  return {
    bounds: { width, height },
    player,
    crystal: spawnCrystal(width, height, rng, player),
    asteroids: Array.from({ length: INITIAL_ASTEROIDS }, () =>
      spawnAsteroid(width, height, rng, 1, player)
    ),
    score: 0,
    lives: 3,
    combo: 0,
    elapsed: 0,
    invulnerability: 0,
    shake: 0,
    phase: 'ready',
  };
}

function copyState(state) {
  return {
    ...state,
    bounds: { ...state.bounds },
    player: { ...state.player },
    crystal: { ...state.crystal },
    asteroids: state.asteroids.map((asteroid) => ({ ...asteroid })),
  };
}

export function applyPlayerInput(state, input = {}, dt = 0) {
  const next = copyState(state);
  const horizontal = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  const vertical = (input.down ? 1 : 0) - (input.up ? 1 : 0);
  const length = Math.hypot(horizontal, vertical) || 1;
  const distance = next.player.speed * dt;

  next.player.x = clamp(
    next.player.x + (horizontal / length) * distance,
    next.player.radius,
    next.bounds.width - next.player.radius
  );
  next.player.y = clamp(
    next.player.y + (vertical / length) * distance,
    next.player.radius,
    next.bounds.height - next.player.radius
  );
  next.invulnerability = Math.max(0, next.invulnerability - dt);
  next.shake = Math.max(0, next.shake - dt);

  return next;
}

export function advanceAsteroids(state, dt = 0) {
  const next = copyState(state);

  next.asteroids = next.asteroids.map((asteroid) => {
    const moved = {
      ...asteroid,
      x: asteroid.x + asteroid.vx * dt,
      y: asteroid.y + asteroid.vy * dt,
      rotation: asteroid.rotation + asteroid.spin * dt,
    };

    if (moved.x < moved.radius || moved.x > next.bounds.width - moved.radius) {
      moved.x = clamp(moved.x, moved.radius, next.bounds.width - moved.radius);
      moved.vx *= -1;
    }

    if (moved.y < moved.radius || moved.y > next.bounds.height - moved.radius) {
      moved.y = clamp(moved.y, moved.radius, next.bounds.height - moved.radius);
      moved.vy *= -1;
    }

    return moved;
  });

  return next;
}

export function resolveCollisions(state, rng = Math.random) {
  let next = copyState(state);

  if (circleHit(next.player, next.crystal)) {
    next.score += 10 + next.combo * 2;
    next.combo += 1;
    next.crystal = spawnCrystal(next.bounds.width, next.bounds.height, rng, next.player);
  }

  const hitAsteroid = next.asteroids.some((asteroid) => circleHit(next.player, asteroid));

  if (hitAsteroid && next.invulnerability <= 0) {
    next.lives -= 1;
    next.combo = 0;
    next.invulnerability = 1.1;
    next.shake = 0.22;

    if (next.lives <= 0) {
      next.phase = 'gameover';
    }
  }

  return next;
}

export function stepGame(state, input = {}, dt = 0, rng = Math.random) {
  if (state.phase !== 'playing') {
    return copyState(state);
  }

  let next = applyPlayerInput(state, input, dt);
  next = advanceAsteroids(next, dt);
  next.elapsed += dt;
  next = resolveCollisions(next, rng);

  const targetAsteroids = clamp(5 + Math.floor(next.score / 50), 5, MAX_ASTEROIDS);
  if (next.asteroids.length < targetAsteroids) {
    next.asteroids.push(
      spawnAsteroid(next.bounds.width, next.bounds.height, rng, targetAsteroids, next.player)
    );
  }

  return next;
}
