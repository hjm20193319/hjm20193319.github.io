import {
  beginShot,
  createSoccerState,
  getFieldConfig,
  setAim,
  startGame,
  stepSoccer,
} from './soccer-core.mjs';

const STORAGE_KEY = 'penalty-pulse-best';
const config = getFieldConfig();
const canvas = document.querySelector('#pitch');
const ctx = canvas.getContext('2d');

const scoreEl = document.querySelector('#score');
const roundEl = document.querySelector('#round');
const streakEl = document.querySelector('#streak');
const bestEl = document.querySelector('#best');
const phaseEl = document.querySelector('#phase');
const powerFill = document.querySelector('#powerFill');
const overlay = document.querySelector('#overlay');
const overlayTitle = document.querySelector('#overlayTitle');
const overlayText = document.querySelector('#overlayText');
const startButton = document.querySelector('#startButton');
const kickButton = document.querySelector('#kickButton');

const input = {
  left: false,
  right: false,
};

let state = createSoccerState();
let best = Number(localStorage.getItem(STORAGE_KEY) || 0);
let lastTime = performance.now();
let scale = 1;
let offsetX = 0;
let offsetY = 0;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  scale = Math.min(rect.width / config.width, rect.height / config.height);
  offsetX = (rect.width - config.width * scale) / 2;
  offsetY = (rect.height - config.height * scale) / 2;
}

function clientToFieldX(clientX) {
  const rect = canvas.getBoundingClientRect();
  return (clientX - rect.left - offsetX) / scale;
}

function updateBest() {
  if (state.phase === 'finished' && state.score > best) {
    best = state.score;
    localStorage.setItem(STORAGE_KEY, String(best));
  }
}

function resetRun() {
  state = startGame(state);
  lastTime = performance.now();
}

function kick() {
  state = beginShot(state);
}

function setAimButton(direction, value) {
  input[direction] = value;
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
    event.preventDefault();
    input.left = true;
  }

  if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
    event.preventDefault();
    input.right = true;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    state.phase === 'playing' ? kick() : resetRun();
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
    event.preventDefault();
    input.left = false;
  }

  if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
    event.preventDefault();
    input.right = false;
  }
});

document.querySelectorAll('[data-aim]').forEach((button) => {
  const direction = button.dataset.aim;
  button.addEventListener('pointerdown', () => setAimButton(direction, true));
  button.addEventListener('pointerup', () => setAimButton(direction, false));
  button.addEventListener('pointercancel', () => setAimButton(direction, false));
  button.addEventListener('pointerleave', () => setAimButton(direction, false));
});

canvas.addEventListener('pointerdown', (event) => {
  if (state.phase === 'playing') {
    state = setAim(state, clientToFieldX(event.clientX));
  }
});

canvas.addEventListener('pointermove', (event) => {
  if (event.buttons && state.phase === 'playing') {
    state = setAim(state, clientToFieldX(event.clientX));
  }
});

startButton.addEventListener('click', resetRun);
kickButton.addEventListener('click', kick);
window.addEventListener('resize', resizeCanvas);

function drawPitch() {
  const { width, height, goal } = config;
  const stripeHeight = height / 7;

  for (let i = 0; i < 7; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? '#166a41' : '#145b39';
    ctx.fillRect(0, i * stripeHeight, width, stripeHeight + 1);
  }

  ctx.fillStyle = '#78bee0';
  ctx.fillRect(0, 0, width, 64);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.84)';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 62, width - 96, height - 110);
  ctx.beginPath();
  ctx.arc(width / 2, 324, 86, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width / 2 - 7, 324);
  ctx.lineTo(width / 2 + 7, 324);
  ctx.moveTo(width / 2, 317);
  ctx.lineTo(width / 2, 331);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(goal.left - 18, goal.top - 16, goal.right - goal.left + 36, 18);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fillRect(goal.left, goal.top, goal.right - goal.left, goal.bottom - goal.top);
  ctx.strokeStyle = '#f8fff8';
  ctx.lineWidth = 7;
  ctx.strokeRect(goal.left, goal.top, goal.right - goal.left, goal.bottom - goal.top);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
  ctx.lineWidth = 1;
  for (let x = goal.left + 32; x < goal.right; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, goal.top);
    ctx.lineTo(x, goal.bottom);
    ctx.stroke();
  }
  for (let y = goal.top + 24; y < goal.bottom; y += 24) {
    ctx.beginPath();
    ctx.moveTo(goal.left, y);
    ctx.lineTo(goal.right, y);
    ctx.stroke();
  }
}

function drawKeeper() {
  const { keeper } = state;
  ctx.save();
  ctx.translate(keeper.x, keeper.y);
  ctx.fillStyle = '#ff6f61';
  ctx.strokeStyle = '#4a140e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(-keeper.width / 2, -keeper.height / 2, keeper.width, keeper.height, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#ffe2ce';
  ctx.beginPath();
  ctx.arc(0, -28, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawAim() {
  const { goal } = config;
  ctx.save();
  ctx.strokeStyle = 'rgba(247, 209, 90, 0.88)';
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.moveTo(state.ball.x, state.ball.y);
  ctx.lineTo(state.aimX, goal.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#f7d15a';
  ctx.beginPath();
  ctx.arc(state.aimX, goal.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBall() {
  const { ball } = state;
  ctx.save();
  ctx.translate(ball.x, ball.y);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(2, ball.radius + 10, ball.radius * 1.3, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f8f8f4';
  ctx.strokeStyle = '#19201d';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#19201d';
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMessage() {
  ctx.save();
  ctx.fillStyle = 'rgba(4, 14, 12, 0.72)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(274, 222, 352, 48, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#f7fff8';
  ctx.font = '800 20px "Malgun Gothic", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(state.message, 450, 246, 320);
  ctx.restore();
}

function draw() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  drawPitch();
  drawKeeper();
  if (state.phase === 'playing') {
    drawAim();
  }
  drawBall();
  if (state.phase === 'result') {
    drawMessage();
  }
  ctx.restore();
}

function updateHud() {
  updateBest();
  scoreEl.textContent = String(state.score);
  roundEl.textContent = `${Math.min(state.round, config.maxRounds)}/${config.maxRounds}`;
  streakEl.textContent = String(state.streak);
  bestEl.textContent = String(best);
  phaseEl.textContent = state.phase;
  powerFill.style.width = `${Math.round(state.power * 100)}%`;
  kickButton.disabled = state.phase !== 'playing';

  const showOverlay = state.phase === 'ready' || state.phase === 'finished';
  overlay.hidden = !showOverlay;
  overlayTitle.textContent = state.phase === 'finished' ? '경기 종료' : 'Penalty Pulse';
  overlayText.textContent = state.phase === 'finished'
    ? `최종 점수 ${state.score}. 최고 기록은 ${best}점입니다.`
    : '골키퍼 움직임을 읽고 빈 곳으로 조준한 뒤 슛하세요.';
  startButton.textContent = state.phase === 'finished' ? '다시 시작' : '시작';
}

function frame(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  state = stepSoccer(state, input, dt);
  draw();
  updateHud();
  requestAnimationFrame(frame);
}

resizeCanvas();
updateHud();
requestAnimationFrame(frame);
