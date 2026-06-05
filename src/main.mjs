import { createGameState, stepGame } from './game-core.mjs';

const WIDTH = 960;
const HEIGHT = 640;
const STORAGE_KEY = 'crystal-rush-best';

const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.querySelector('#score');
const livesEl = document.querySelector('#lives');
const timeEl = document.querySelector('#time');
const bestEl = document.querySelector('#best');
const phaseEl = document.querySelector('#phase');
const overlay = document.querySelector('#overlay');
const overlayTitle = document.querySelector('#overlayTitle');
const overlayScore = document.querySelector('#overlayScore');
const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');

const input = {
  left: false,
  right: false,
  up: false,
  down: false,
};

let state = createGameState({ width: WIDTH, height: HEIGHT });
let best = Number(localStorage.getItem(STORAGE_KEY) || 0);
let lastTime = performance.now();
let scale = 1;
let offsetX = 0;
let offsetY = 0;

const stars = Array.from({ length: 130 }, (_, index) => {
  const x = ((index * 193) % WIDTH) + ((index * 17) % 23);
  const y = ((index * 109) % HEIGHT) + ((index * 11) % 19);
  return {
    x: x % WIDTH,
    y: y % HEIGHT,
    size: 1 + (index % 4) * 0.45,
    alpha: 0.25 + (index % 7) * 0.08,
  };
});

function resetRun() {
  state = {
    ...createGameState({ width: WIDTH, height: HEIGHT }),
    phase: 'playing',
  };
  lastTime = performance.now();
}

function updateBest() {
  if (state.score > best) {
    best = state.score;
    localStorage.setItem(STORAGE_KEY, String(best));
  }
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  scale = Math.min(rect.width / WIDTH, rect.height / HEIGHT);
  offsetX = (rect.width - WIDTH * scale) / 2;
  offsetY = (rect.height - HEIGHT * scale) / 2;
}

function setDirection(direction, value) {
  if (direction in input) {
    input[direction] = value;
  }
}

const keyMap = new Map([
  ['ArrowLeft', 'left'],
  ['a', 'left'],
  ['A', 'left'],
  ['ArrowRight', 'right'],
  ['d', 'right'],
  ['D', 'right'],
  ['ArrowUp', 'up'],
  ['w', 'up'],
  ['W', 'up'],
  ['ArrowDown', 'down'],
  ['s', 'down'],
  ['S', 'down'],
]);

window.addEventListener('keydown', (event) => {
  const direction = keyMap.get(event.key);
  if (direction) {
    event.preventDefault();
    setDirection(direction, true);
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (state.phase !== 'playing') {
      resetRun();
    }
  }

  if (event.key === 'Escape' || event.key === 'p' || event.key === 'P') {
    togglePause();
  }
});

window.addEventListener('keyup', (event) => {
  const direction = keyMap.get(event.key);
  if (direction) {
    event.preventDefault();
    setDirection(direction, false);
  }
});

document.querySelectorAll('[data-dir]').forEach((button) => {
  const direction = button.dataset.dir;
  button.addEventListener('pointerdown', () => setDirection(direction, true));
  button.addEventListener('pointerup', () => setDirection(direction, false));
  button.addEventListener('pointercancel', () => setDirection(direction, false));
  button.addEventListener('pointerleave', () => setDirection(direction, false));
});

startButton.addEventListener('click', resetRun);
pauseButton.addEventListener('click', togglePause);
window.addEventListener('resize', resizeCanvas);

function togglePause() {
  if (state.phase === 'playing') {
    state = { ...state, phase: 'paused' };
    return;
  }

  if (state.phase === 'paused') {
    state = { ...state, phase: 'playing' };
    lastTime = performance.now();
  }
}

function drawBackdrop(now) {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#17181b');
  gradient.addColorStop(0.45, '#10151a');
  gradient.addColorStop(1, '#1d1918');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.save();
  stars.forEach((star, index) => {
    const shimmer = Math.sin(now * 0.0015 + index) * 0.08;
    ctx.globalAlpha = star.alpha + shimmer;
    ctx.fillStyle = index % 3 === 0 ? '#ffd36a' : index % 3 === 1 ? '#7fffd4' : '#f1f5f9';
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
  ctx.restore();

  ctx.strokeStyle = 'rgba(127, 255, 212, 0.13)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= WIDTH; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y <= HEIGHT; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }
}

function drawCrystal(crystal, now) {
  const pulse = Math.sin(now * 0.006 + crystal.pulse) * 3;
  const radius = crystal.radius + pulse;

  ctx.save();
  ctx.translate(crystal.x, crystal.y);
  ctx.rotate(Math.PI / 4);
  ctx.shadowColor = '#ffd36a';
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#ffd36a';
  ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#fff2b2';
  ctx.fillRect(-radius * 0.45, -radius * 0.45, radius * 0.9, radius * 0.9);
  ctx.restore();
}

function drawAsteroid(asteroid) {
  const points = 9;

  ctx.save();
  ctx.translate(asteroid.x, asteroid.y);
  ctx.rotate(asteroid.rotation);
  ctx.beginPath();
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const jag = i % 2 === 0 ? 1 : 0.72;
    const x = Math.cos(angle) * asteroid.radius * jag;
    const y = Math.sin(angle) * asteroid.radius * jag;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fillStyle = '#f46d55';
  ctx.strokeStyle = '#ffb36b';
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPlayer(player, now) {
  const invulnerable = state.invulnerability > 0;
  const flicker = invulnerable && Math.sin(now * 0.03) > 0;

  if (flicker) {
    return;
  }

  ctx.save();
  ctx.translate(player.x, player.y);
  const angle = Math.atan2((input.down ? 1 : 0) - (input.up ? 1 : 0), (input.right ? 1 : 0) - (input.left ? 1 : 0));
  if (Number.isFinite(angle) && (input.left || input.right || input.up || input.down)) {
    ctx.rotate(angle + Math.PI / 2);
  }

  ctx.shadowColor = '#7fffd4';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(0, -player.radius * 1.5);
  ctx.lineTo(player.radius * 1.15, player.radius * 1.1);
  ctx.lineTo(0, player.radius * 0.65);
  ctx.lineTo(-player.radius * 1.15, player.radius * 1.1);
  ctx.closePath();
  ctx.fillStyle = '#7fffd4';
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#f6fff9';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawWorld(now) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  const shake = state.shake > 0 ? Math.sin(now * 0.08) * state.shake * 18 : 0;
  ctx.translate(shake, -shake * 0.6);

  drawBackdrop(now);
  drawCrystal(state.crystal, now);
  state.asteroids.forEach(drawAsteroid);
  drawPlayer(state.player, now);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, WIDTH - 4, HEIGHT - 4);
  ctx.restore();
}

function draw(now) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWorld(now);
}

function updateHud() {
  scoreEl.textContent = String(state.score);
  livesEl.textContent = String(Math.max(0, state.lives));
  timeEl.textContent = `${Math.floor(state.elapsed)}s`;
  bestEl.textContent = String(best);
  phaseEl.textContent = state.phase === 'gameover' ? 'Game Over' : state.phase;

  const showOverlay = state.phase !== 'playing';
  overlay.hidden = !showOverlay;

  if (state.phase === 'gameover') {
    overlayTitle.textContent = 'Run Complete';
    overlayScore.textContent = `Score ${state.score}`;
    startButton.textContent = 'Restart';
    pauseButton.disabled = true;
    return;
  }

  if (state.phase === 'paused') {
    overlayTitle.textContent = 'Paused';
    overlayScore.textContent = `Score ${state.score}`;
    startButton.textContent = 'New Run';
    pauseButton.disabled = false;
    return;
  }

  overlayTitle.textContent = 'Crystal Rush';
  overlayScore.textContent = `Best ${best}`;
  startButton.textContent = 'Start Run';
  pauseButton.disabled = state.phase !== 'playing' && state.phase !== 'paused';
}

function frame(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;

  if (state.phase === 'playing') {
    state = stepGame(state, input, dt);
    if (state.phase === 'gameover') {
      updateBest();
    }
  }

  draw(now);
  updateHud();
  requestAnimationFrame(frame);
}

resizeCanvas();
updateHud();
requestAnimationFrame(frame);
