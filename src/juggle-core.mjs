const WIDTH = 900;
const HEIGHT = 560;
const BALL_RADIUS = 28;
const GRAVITY = 1120;
const LIFT_VELOCITY = -650;
const SIDE_IMPULSE = 390;
const MAX_X_SPEED = 520;
const WALL_RESTITUTION = 0.86;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function getJuggleConfig() {
  return {
    width: WIDTH,
    height: HEIGHT,
    ballRadius: BALL_RADIUS,
    floorY: HEIGHT - BALL_RADIUS - 14,
  };
}

export function createJuggleState() {
  return {
    phase: 'ready',
    count: 0,
    ball: {
      x: WIDTH / 2,
      y: HEIGHT / 2,
      vx: 0,
      vy: 0,
      radius: BALL_RADIUS,
      spin: 0,
    },
    lastHitOffset: 0,
    message: '공을 터치해 첫 리프팅을 시작하세요.',
  };
}

function copyState(state) {
  return {
    ...state,
    ball: { ...state.ball },
  };
}

export function isPointInsideBall(state, x, y) {
  const dx = x - state.ball.x;
  const dy = y - state.ball.y;
  return dx * dx + dy * dy <= state.ball.radius * state.ball.radius;
}

export function liftBall(state, x, y) {
  const next = copyState(state);

  if (next.phase === 'gameover' || !isPointInsideBall(next, x, y)) {
    return next;
  }

  const offset = clamp((x - next.ball.x) / next.ball.radius, -1, 1);
  const centerBoost = 1 - Math.abs(offset) * 0.18;
  next.phase = 'playing';
  next.count += 1;
  next.lastHitOffset = offset;
  next.ball.vx = clamp(next.ball.vx - offset * SIDE_IMPULSE, -MAX_X_SPEED, MAX_X_SPEED);
  next.ball.vy = LIFT_VELOCITY * centerBoost - Math.min(next.count * 5, 85);
  next.ball.spin += -offset * 0.42;
  next.message = offset < -0.18 ? '오른쪽으로 전환' : offset > 0.18 ? '왼쪽으로 전환' : '중앙 리프팅';
  return next;
}

export function resetJuggle() {
  return createJuggleState();
}

export function stepJuggle(state, dt = 0) {
  const next = copyState(state);

  if (next.phase !== 'playing') {
    return next;
  }

  next.ball.vy += GRAVITY * dt;
  next.ball.x += next.ball.vx * dt;
  next.ball.y += next.ball.vy * dt;
  next.ball.spin += next.ball.vx * dt * 0.01;

  if (next.ball.x - next.ball.radius <= 0) {
    next.ball.x = next.ball.radius;
    next.ball.vx = Math.abs(next.ball.vx) * WALL_RESTITUTION;
  }

  if (next.ball.x + next.ball.radius >= WIDTH) {
    next.ball.x = WIDTH - next.ball.radius;
    next.ball.vx = -Math.abs(next.ball.vx) * WALL_RESTITUTION;
  }

  if (next.ball.y - next.ball.radius <= 0) {
    next.ball.y = next.ball.radius;
    next.ball.vy = Math.abs(next.ball.vy) * 0.34;
  }

  if (next.ball.y + next.ball.radius >= HEIGHT) {
    next.ball.y = HEIGHT - next.ball.radius;
    next.ball.vy = 0;
    next.ball.vx = 0;
    next.phase = 'gameover';
    next.message = `기록 ${next.count}`;
  }

  return next;
}
