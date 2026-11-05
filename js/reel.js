import { $, REDUCED } from './dom.js';
import { pick } from './utils/random.js';
import { tick, thunk } from './audio.js';

const measure = document.createElement('canvas').getContext('2d');
function fitSize(word, width, height) {
  measure.font = '100px Anton, Impact, sans-serif';
  const w = measure.measureText(word).width || 1;
  return Math.min(height * .66, (width - 12) / w * 100);
}
export class Reel {
  constructor(el) { this.el = el; this.strip = el.querySelector('.strip'); this.word = ''; }
  node(word) {
    const s = document.createElement('span'); s.className = 'word'; s.textContent = word;
    const h = this.el.clientHeight, w = this.el.clientWidth;
    s.style.height = h + 'px'; s.style.lineHeight = h + 'px'; s.style.fontSize = fitSize(word, w, h) + 'px';
    return s;
  }
  set(word) { this.word = word; this.strip.replaceChildren(this.node(word)); this.strip.style.transform = ''; }
  refresh() { if (this.word) this.set(this.word); }
  spin(filler, final, duration, onDrag) {
    return new Promise(res => {
      if (REDUCED) { this.set(final); res(); return; }
      const h = this.el.clientHeight;
      const count = Math.max(10, Math.round(duration / 62));
      const seq = [pick(filler), final];
      for (let i = 0; i < count; i++) seq.push(pick(filler));
      seq.push(this.word);
      this.strip.replaceChildren(...seq.map(w => this.node(w)));
      const from = -(seq.length - 1) * h, to = -h;
      const start = performance.now();
      let lastIdx = -1;
      this.el.classList.remove('landed');
      this.el.classList.add('moving');
      const step = now => {
        const p = Math.min(1, (now - start) / duration);
        const c1 = .85, c3 = c1 + 1, q = p - 1;
        const e = 1 + c3 * q * q * q + c1 * q * q;
        const y = from + (to - from) * e;
        this.strip.style.transform = `translate3d(0,${y}px,0)`;
        const idx = Math.round(y / h);
        if (idx !== lastIdx) { lastIdx = idx; tick(); }
        if (p > .82) this.el.classList.remove('moving');
        if (p < 1) { requestAnimationFrame(step); return; }
        this.set(final);
        this.el.classList.add('landed');
        thunk();
        res();
      };
      requestAnimationFrame(step);
    });
  }
}
export const reels = [new Reel($('r0')), new Reel($('r1')), new Reel($('r2'))];
