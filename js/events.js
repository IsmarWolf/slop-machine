import { $, REDUCED } from './dom.js';
import { TIERS } from './data/tiers.js';
import { money } from './utils/format.js';
import { blip, isSoundOn, setSound } from './audio.js';
import { resizeCoins } from './coins.js';
import { reels } from './reel.js';
import { state, locks, save } from './state.js';
import { toast } from './ui.js';
import { slug, setHash, showSlug } from './router.js';
import { pull, stopAuto } from './pull.js';

export function bindEvents() {
  $('pull').addEventListener('click', () => { if (state.auto) stopAuto(); pull(); });
  [0, 1, 2].forEach(k => $('hold' + k).addEventListener('click', e => {
    locks[k] = !locks[k]; e.currentTarget.setAttribute('aria-pressed', locks[k]); e.currentTarget.textContent = locks[k] ? 'HELD' : 'HOLD';
  }));
  $('sound').addEventListener('click', () => { setSound(!isSoundOn()); save(); if (isSoundOn()) blip(880, .08, 'square', .2); });
  $('auto').addEventListener('click', e => {
    if (state.auto) { stopAuto(); return; }
    state.auto = true; e.currentTarget.setAttribute('aria-pressed', 'true'); e.currentTarget.textContent = 'AUTO-GRIND: ON';
    toast('Free trial of the 399-coin Auto-Grind pass.');
    pull();
  });
  $('play').addEventListener('click', () => toast('There is no game yet. That is the last step, and it is optional.'));
  $('copy').addEventListener('click', async () => {
    const d = state.current; if (!d) return;
    const text = `${d.title}\n${TIERS[d.tier].stamp}\n\n${d.pitch}\n\nThe entire game:\n1. ${d.loop[0]}\n2. ${d.loop[1]}\n3. ${d.loop[2]}\n\nGross: ${money(d.gross)} a month. You keep: ${money(d.net)}.\n${d.retire}.\n\nSlop Machine is a joke. Not financial advice.`;
    try { await navigator.clipboard.writeText(text); toast('Pitch copied. Send it to your cousin.'); }
    catch (e) { toast('Your browser blocked copying. Select the pitch text by hand.'); }
  });
  $('vault').addEventListener('click', e => {
    const b = e.target.closest('button[data-slug]'); if (!b || state.spinning) return;
    stopAuto();
    if (showSlug(b.dataset.slug, true)) { setHash(state.current); $('machine').scrollIntoView({behavior: REDUCED ? 'auto' : 'smooth', block: 'center'}); }
  });
  addEventListener('hashchange', () => { if (!state.spinning && state.current && location.hash.slice(1) !== slug(state.current)) showSlug(location.hash.slice(1), true); });
  addEventListener('keydown', e => {
    if (e.code !== 'Space' || e.repeat) return;
    if (e.target.closest && e.target.closest('button, a, input, textarea, select')) return;
    e.preventDefault(); if (state.auto) stopAuto(); pull();
  });
  const eyes = $('eyes');
  addEventListener('pointermove', e => {
    if ($('head').dataset.mood === 'spin') return;
    const r = $('head').getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * .4);
    const len = Math.hypot(dx, dy) || 1, m = Math.min(5, len / 60);
    eyes.setAttribute('transform', `translate(${(dx / len * m).toFixed(1)} ${(dy / len * m).toFixed(1)})`);
  }, {passive: true});
  let rsz = 0;
  addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(() => { if (!state.spinning) reels.forEach(r => r.refresh()); }, 80); resizeCoins(); });
}
