const FIELD_WIDTH = 900;
const FIELD_HEIGHT = 560;
const BALL_START = { x: FIELD_WIDTH / 2, y: 478 };
const GOAL = {
  left: 212,
  right: 688,
  top: 74,
  bottom: 196,
  y: 142,
};
const MAX_ROUNDS = 7;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;

export function getFieldConfig() {
  return {
    width: FIELD_WIDTH,
    height: FIELD_HEIGHT,
    ballStart: { ...BALL_START },
    goal: { ...GOAL },
    maxRounds: MAX_ROUNDS,
  };
}

export function createSoccerState() {
  return {
    phase: 'ready',
    score: 0,
    round: 1,
    streak: 0,
    aimX: FIELD_WIDTH / 2,
    power: 0.62,
    powerDirection: 1,
    keeper: {
      x: FIELD_WIDTH / 2,
      y: GOAL.y,
      width: 88,
      height: 24,
      speed: 172,
      direction: 1,
    },
    ball: {
      x: BALL_START.x,
      y: BALL_START.y,
      radius: 12,
    },
    shot: null,
    message: '골키퍼를 보고 빈 곳으로 슛하세요.',
    resultTimer: 0,
  };
}

function copyState(state) {
  return {
    ...state,
    keeper: { ...state.keeper },
    ball: { ...state.ball },
    shot: state.shot ? { ...state.shot } : null,
  };
}

export function moveAim(state, direction, dt = 0) {
  const next = copyState(state);
  const amount = 360 * dt * direction;
  next.aimX = clamp(next.aimX + amount, GOAL.left + 18, GOAL.right - 18);
  return next;
}

export function setAim(state, x) {
  const next = copyState(state);
  next.aimX = clamp(x, GOAL.left + 18, GOAL.right - 18);
  return next;
}

export function advanceKeeper(state, dt = 0) {
  const next = copyState(state);
  const min = GOAL.left + next.keeper.width / 2;
  const max = GOAL.right - next.keeper.width / 2;
  next.keeper.x += next.keeper.speed * next.keeper.direction * dt;

  if (next.keeper.x <= min || next.keeper.x >= max) {
    next.keeper.x = clamp(next.keeper.x, min, max);
    next.keeper.direction *= -1;
  }

  return next;
}

export function advancePower(state, dt = 0) {
  const next = copyState(state);
  next.power += next.powerDirection * dt * 0.86;

  if (next.power >= 1 || next.power <= 0.28) {
    next.power = clamp(next.power, 0.28, 1);
    next.powerDirection *= -1;
  }

  return next;
}

export function beginShot(state) {
  if (state.phase !== 'playing') {
    return copyState(state);
  }

  const next = copyState(state);
  const powerArc = 164 - next.power * 92;
  const accuracyPenalty = Math.abs(next.power - 0.72) * 38;

  next.phase = 'shot';
  next.shot = {
    elapsed: 0,
    duration: 0.76,
    startX: BALL_START.x,
    startY: BALL_START.y,
    targetX: clamp(next.aimX + accuracyPenalty * Math.sign(next.aimX - FIELD_WIDTH / 2), GOAL.left, GOAL.right),
    targetY: clamp(powerArc, GOAL.top + 12, GOAL.bottom - 10),
    power: next.power,
  };
  next.message = '슛!';
  return next;
}

export function evaluateShot(state) {
  const next = copyState(state);

  if (!next.shot) {
    return next;
  }

  const { targetX, targetY } = next.shot;
  const insideGoal = targetX >= GOAL.left && targetX <= GOAL.right && targetY >= GOAL.top && targetY <= GOAL.bottom;
  const keeperReach = next.keeper.width / 2 + next.ball.radius * 1.8;
  const saved = Math.abs(targetX - next.keeper.x) <= keeperReach;

  next.phase = 'result';
  next.resultTimer = 1.15;
  next.ball = { ...next.ball, x: targetX, y: targetY };

  if (insideGoal && !saved) {
    const streakBonus = next.streak * 5;
    next.score += 100 + streakBonus;
    next.streak += 1;
    next.message = streakBonus > 0 ? `골! 연속 보너스 +${streakBonus}` : '골!';
  } else if (saved) {
    next.streak = 0;
    next.message = '골키퍼 선방';
  } else {
    next.streak = 0;
    next.message = '아깝게 빗나감';
  }

  return next;
}

export function continueAfterResult(state) {
  const next = copyState(state);

  if (next.phase !== 'result') {
    return next;
  }

  if (next.round >= MAX_ROUNDS) {
    next.phase = 'finished';
    next.message = `최종 점수 ${next.score}`;
    return next;
  }

  next.phase = 'playing';
  next.round += 1;
  next.aimX = FIELD_WIDTH / 2;
  next.power = 0.62;
  next.powerDirection = 1;
  next.ball = { x: BALL_START.x, y: BALL_START.y, radius: 12 };
  next.shot = null;
  next.message = '다음 슛을 준비하세요.';
  next.resultTimer = 0;
  return next;
}

export function startGame(state = createSoccerState()) {
  const next = createSoccerState();
  next.phase = 'playing';
  next.score = state.phase === 'ready' ? 0 : next.score;
  return next;
}

export function stepSoccer(state, input = {}, dt = 0) {
  let next = copyState(state);

  if (next.phase === 'playing') {
    next = advanceKeeper(next, dt);
    next = advancePower(next, dt);

    const aimDirection = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    if (aimDirection !== 0) {
      next = moveAim(next, aimDirection, dt);
    }
  }

  if (next.phase === 'shot' && next.shot) {
    next = advanceKeeper(next, dt);
    next.shot.elapsed += dt;
    const t = clamp(next.shot.elapsed / next.shot.duration, 0, 1);
    const eased = 1 - (1 - t) * (1 - t);
    const lift = Math.sin(t * Math.PI) * 48;
    next.ball.x = lerp(next.shot.startX, next.shot.targetX, eased);
    next.ball.y = lerp(next.shot.startY, next.shot.targetY, eased) - lift;

    if (t >= 1) {
      next = evaluateShot(next);
    }
  }

  if (next.phase === 'result') {
    next.resultTimer -= dt;
    if (next.resultTimer <= 0) {
      next = continueAfterResult(next);
    }
  }

  return next;
}
