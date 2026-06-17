import {
  createJuggleState,
  getJuggleConfig,
  liftBall,
  resetJuggle,
  stepJuggle,
} from './juggle-core.mjs';

const STORAGE_KEY = 'juggle-keeper-best';
const config = getJuggleConfig();

const canvas = document.querySelector('#juggleCanvas');
const ctx = canvas.getContext('2d');
const countEl = document.querySelector('#count');
const bestEl = document.querySelector('#best');
const phaseEl = document.querySelector('#phase');
const overlay = document.querySelector('#overlay');
const overlayTitle = document.querySelector('#overlayTitle');
const overlayText = document.querySelector('#overlayText');
const startButton = document.querySelector('#startButton');
const restartButton = document.querySelector('#restartButton');
const hint = document.querySelector('#hint');

let state = createJuggleState();
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

function toFieldPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left - offsetX) / scale,
    y: (event.clientY - rect.top - offsetY) / scale,
  };
}

function saveBest() {
  if (state.count > best) {
    best = state.count;
    localStorage.setItem(STORAGE_KEY, String(best));
  }
}

function reset() {
  state = resetJuggle();
  lastTime = performance.now();
}

function handleLift(event) {
  event.preventDefault();
  const point = toFieldPoint(event);
  state = liftBall(state, point.x, point.y);
}

canvas.addEventListener('pointerdown', handleLift);
startButton.addEventListener('click', () => {
  if (state.phase === 'gameover') {
    reset();
  }

  state = liftBall(state, state.ball.x, state.ball.y);
});
restartButton.addEventListener('click', reset);
window.addEventListener('resize', resizeCanvas);

function drawField() {
  const stripe = config.height / 8;

  for (let i = 0; i < 8; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? '#17643d' : '#125635';
    ctx.fillRect(0, i * stripe, config.width, stripe + 1);
  }

  ctx.fillStyle = 'rgba(8, 21, 16, 0.42)';
  ctx.fillRect(0, config.height - 82, config.width, 82);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
  ctx.lineWidth = 4;
  ctx.strokeRect(44, 42, config.width - 88, config.height - 84);
  ctx.beginPath();
  ctx.moveTo(44, config.height - 86);
  ctx.lineTo(config.width - 44, config.height - 86);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(config.width / 2, config.height - 86, 122, Math.PI, Math.PI * 2);
  ctx.stroke();
}

function drawBall() {
  const { ball } = state;
  ctx.save();
  ctx.translate(ball.x, ball.y);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
  ctx.beginPath();
  ctx.ellipse(0, ball.radius + 14, ball.radius * 1.2, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(ball.spin);
  ctx.fillStyle = '#f8f8f4';
  ctx.strokeStyle = '#15201a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#15201a';
  for (let i = 0; i < 5; i += 1) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * 13, Math.sin(angle) * 13, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawContactCue() {
  if (state.phase === 'gameover') {
    return;
  }

  const { ball } = state;
  ctx.save();
  ctx.strokeStyle = 'rgba(245, 206, 91, 0.7)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 7]);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius + 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  if (Math.abs(state.lastHitOffset) > 0.08) {
    ctx.fillStyle = 'rgba(245, 206, 91, 0.85)';
    ctx.beginPath();
    ctx.moveTo(ball.x - state.lastHitOffset * 30, ball.y - 46);
    ctx.lineTo(ball.x - state.lastHitOffset * 52, ball.y - 34);
    ctx.lineTo(ball.x - state.lastHitOffset * 30, ball.y - 22);
    ctx.fill();
  }
  ctx.restore();
}

function drawMessage() {
  ctx.save();
  ctx.fillStyle = 'rgba(5, 18, 13, 0.68)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(290, 74, 320, 42, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#f8fff8';
  ctx.font = '800 18px "Malgun Gothic", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(state.message, 450, 95, 292);
  ctx.restore();
}

function draw() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  drawField();
  drawContactCue();
  drawBall();
  if (state.phase !== 'ready') {
    drawMessage();
  }
  ctx.restore();
}

function updateHud() {
  if (state.phase === 'gameover') {
    saveBest();
  }

  countEl.textContent = String(state.count);
  bestEl.textContent = String(best);
  phaseEl.textContent = state.phase;
  hint.hidden = state.phase === 'gameover';

  const showOverlay = state.phase === 'ready' || state.phase === 'gameover';
  overlay.hidden = !showOverlay;
  overlayTitle.textContent = state.phase === 'gameover' ? '공을 놓쳤어요' : 'Juggle Keeper';
  overlayText.textContent = state.phase === 'gameover'
    ? `리프팅 ${state.count}회. 최고 기록은 ${best}회입니다.`
    : '공을 터치하면 리프팅이 시작됩니다. 공의 왼쪽을 치면 오른쪽으로, 오른쪽을 치면 왼쪽으로 튑니다.';
  startButton.textContent = state.phase === 'gameover' ? '다시 시작' : '시작';
}

function frame(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  state = stepJuggle(state, dt);
  draw();
  updateHud();
  requestAnimationFrame(frame);
}

resizeCanvas();
updateHud();
requestAnimationFrame(frame);
