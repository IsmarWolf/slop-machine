import { $, REDUCED } from './dom.js';

const coinCv = $('coins'), coinCtx = coinCv.getContext('2d');
let coins = [], coinRAF = 0;
function sizeCoins() { const dpr = Math.min(devicePixelRatio || 1, 2); coinCv.width = innerWidth * dpr; coinCv.height = innerHeight * dpr; coinCtx.setTransform(dpr, 0, 0, dpr, 0, 0); }
export function coinBurst(n) {
  if (REDUCED) return;
  sizeCoins();
  const rect = $('machine').getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = Math.max(120, rect.top + 40);
  for (let i = 0; i < n; i++) {
    const a = -Math.PI * (.08 + Math.random() * .84), sp = 6 + Math.random() * 13;
    coins.push({x: cx + (Math.random() - .5) * rect.width * .7, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 8 + Math.random() * 8, rot: Math.random() * 6, vr: .1 + Math.random() * .3});
  }
  if (!coinRAF) coinRAF = requestAnimationFrame(coinStep);
}
function clearCoins() { coinCtx.save(); coinCtx.setTransform(1, 0, 0, 1, 0, 0); coinCtx.clearRect(0, 0, coinCv.width, coinCv.height); coinCtx.restore(); }
function coinStep() {
  clearCoins();
  coins = coins.filter(c => c.y < innerHeight + 40);
  for (const c of coins) {
    c.vy += .42; c.x += c.vx; c.y += c.vy; c.rot += c.vr;
    const sq = Math.abs(Math.cos(c.rot));
    coinCtx.beginPath(); coinCtx.ellipse(c.x, c.y, c.r * Math.max(.14, sq), c.r, 0, 0, 7);
    coinCtx.fillStyle = sq > .5 ? '#ffe81a' : '#d7a400'; coinCtx.fill();
    coinCtx.lineWidth = 2; coinCtx.strokeStyle = '#000'; coinCtx.stroke();
  }
  coinRAF = coins.length ? requestAnimationFrame(coinStep) : 0;
  if (!coins.length) clearCoins();
}

/* Keep the canvas matched to the viewport while coins are still falling. */
export function resizeCoins() { if (coins.length) sizeCoins(); }
