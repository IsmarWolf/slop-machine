import { $ } from './dom.js';
import { NOUNS } from './data/words.js';

function drawHead(x, cx, cy, w, h, shocked) {
  const l = cx - w / 2, t = cy - h / 2;
  const g = x.createLinearGradient(l, 0, l + w, 0);
  g.addColorStop(0, '#b98c00'); g.addColorStop(.25, '#f1c315'); g.addColorStop(.5, '#ffe13f'); g.addColorStop(.8, '#ecba0d'); g.addColorStop(1, '#a97f00');
  x.beginPath(); if (x.roundRect) x.roundRect(l, t, w, h, w * .32); else x.rect(l, t, w, h); x.fillStyle = g; x.fill();
  x.lineWidth = 5; x.strokeStyle = '#000'; x.stroke();
  x.fillStyle = '#0c0806';
  x.beginPath(); x.arc(cx - w * .17, cy - h * .13, w * .085, 0, 7); x.arc(cx + w * .17, cy - h * .13, w * .085, 0, 7); x.fill();
  x.beginPath(); x.ellipse(cx, cy + h * .2, w * .15, h * .17, 0, 0, 7); x.fill();
}
export function drawThumb(d) {
  const cv = $('thumb'), x = cv.getContext('2d'), W = 640, H = 360, k = 2;
  x.setTransform(k, 0, 0, k, 0, 0);
  const g = x.createRadialGradient(W * .68, H * .42, 20, W * .68, H * .42, 460);
  g.addColorStop(0, `hsl(${d.hue} 100% 66%)`); g.addColorStop(.6, `hsl(${(d.hue + 28) % 360} 90% 44%)`); g.addColorStop(1, `hsl(${(d.hue + 60) % 360} 90% 22%)`);
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.save(); x.translate(W * .68, H * .42); x.fillStyle = 'rgba(255,255,255,.17)';
  for (let i = 0; i < 14; i++) { x.rotate(Math.PI * 2 / 14); x.beginPath(); x.moveTo(0, 0); x.lineTo(760, -58); x.lineTo(760, 58); x.fill(); }
  x.restore();

  /* giant noun with a sticker outline */
  const emoji = NOUNS[d.noun];
  x.font = '176px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  const ex = 448, ey = 142;
  x.save(); x.shadowColor = '#fff'; x.shadowBlur = 0;
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.shadowOffsetX = Math.cos(a) * 14; x.shadowOffsetY = Math.sin(a) * 14; x.fillText(emoji, ex, ey); }
  x.restore();
  x.fillText(emoji, ex, ey);

  /* shocked block, red arrow */
  x.save(); x.translate(120, 118); x.rotate(-.12); drawHead(x, 0, 0, 132, 158, true); x.restore();
  x.lineCap = 'round';
  const arrow = (col, w) => { x.beginPath(); x.moveTo(196, 84); x.quadraticCurveTo(262, 40, 316, 92); x.strokeStyle = col; x.lineWidth = w; x.stroke(); };
  arrow('#fff', 24); arrow('#e4122b', 14);
  x.beginPath(); x.moveTo(346, 122); x.lineTo(286, 106); x.lineTo(330, 62); x.closePath(); x.fillStyle = '#e4122b'; x.strokeStyle = '#fff'; x.lineWidth = 5; x.lineJoin = 'round'; x.stroke(); x.fill();

  /* title */
  x.save(); x.translate(26, 335); x.rotate(-.035);
  x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.lineJoin = 'round';
  const line2 = d.noun, line1 = `${d.verb} ${d.art}`;
  const size = (t, want, room) => { x.font = `${want}px Anton, Impact, sans-serif`; const w = x.measureText(t).width; return w > room ? want * room / w : want; };
  const s1 = size(line1, 58, 560), s2 = size(line2, 92, 570);
  const text = (t, s, yy, fill) => { x.font = `${s}px Anton, Impact, sans-serif`; x.lineWidth = s * .2; x.strokeStyle = '#000'; x.strokeText(t, 0, yy); x.fillStyle = fill; x.fillText(t, 0, yy); };
  text(line1, s1, -s2 - 2, '#fff'); text(line2, s2, 0, '#ffe81a');
  x.restore();

  /* update badge */
  x.save(); x.translate(556, 40); x.rotate(.1);
  x.fillStyle = '#c5177d'; x.fillRect(-72, -22, 144, 44); x.lineWidth = 4; x.strokeStyle = '#000'; x.strokeRect(-72, -22, 144, 44);
  x.fillStyle = '#fff'; x.font = '26px Anton, Impact, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`UPDATE ${d.update}!`, 0, 1);
  x.restore();
}
