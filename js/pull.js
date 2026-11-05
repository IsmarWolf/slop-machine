import { $, REDUCED } from './dom.js';
import { VERB_LIST, NOUN_LIST, ARTS, ARTICLE_FILLERS } from './data/words.js';
import { TIERS } from './data/tiers.js';
import { BUSY } from './data/copy.js';
import { pick } from './utils/random.js';
import { buildDossier } from './dossier.js';
import { audio, fanfare } from './audio.js';
import { coinBurst } from './coins.js';
import { reels } from './reel.js';
import { state, locks, save } from './state.js';
import { render, renderVault, renderStatus } from './render.js';
import { slug, setHash } from './router.js';

let autoTimer = 0;

function nextOutcome() {
  let verb = state.verb, artKey = state.artKey, noun = state.noun;
  for (let tries = 0; tries < 8; tries++) {
    if (!locks[0]) verb = pick(VERB_LIST);
    if (!locks[1]) artKey = pick(ARTS);
    if (!locks[2]) noun = pick(NOUN_LIST);
    if (verb !== state.verb || artKey !== state.artKey || noun !== state.noun) break;
  }
  return {verb, artKey, noun};
}
export async function pull() {
  if (state.spinning) return;
  if (locks.every(Boolean)) { renderStatus('You are holding all three reels. Let go of one so the Algorithm has something to do.'); stopAuto(); return; }
  state.spinning = true;
  const pullBtn = $('pull'), page = $('page'), head = $('head');
  const out = nextOutcome();
  const d = buildDossier(out.verb, out.artKey, out.noun);
  const drama = d.tier === 'mythic' || d.tier === 'taken';
  audio();
  page.classList.add('is-spinning');
  head.dataset.mood = 'spin';
  pullBtn.setAttribute('aria-busy', 'true');
  let i = 0; pullBtn.textContent = BUSY[0];
  const busyTimer = setInterval(() => { i = (i + 1) % BUSY.length; pullBtn.textContent = BUSY[i]; }, 620);
  $('stamp').textContent = '...'; $('stamp').className = 'stamp t-common';

  const finals = [d.verb, d.art, d.noun];
  const fillers = [VERB_LIST, ARTICLE_FILLERS, NOUN_LIST];
  const durations = [1250, 1800, 2450];
  if (state.auto) durations.forEach((_, k) => durations[k] *= .7);
  const jobs = reels.map((reel, k) => {
    if (locks[k]) { if (reel.word !== finals[k]) reel.set(finals[k]); return Promise.resolve(); }
    let dur = durations[k];
    if (k === 2 && drama) dur += 1300;
    return reel.spin(fillers[k], finals[k], dur);
  });
  if (drama && !locks[2]) setTimeout(() => { clearInterval(busyTimer); pullBtn.textContent = 'Wait. Wait. Wait.'; $('r2').classList.add('flash'); }, durations[1] + 200);
  await Promise.all(jobs);
  clearInterval(busyTimer);
  $('r2').classList.remove('flash');

  state.verb = d.verb; state.artKey = d.artKey; state.noun = d.noun;
  state.pulls++;
  if (d.tier === 'mythic') state.retired++;
  state.vault = [{slug: slug(d), title: d.title, tier: d.tier, net: Math.round(d.net)}, ...state.vault.filter(v => v.slug !== slug(d))].slice(0, 24);
  page.classList.remove('is-spinning');
  head.dataset.mood = TIERS[d.tier].mood;
  pullBtn.removeAttribute('aria-busy');
  pullBtn.textContent = 'Consult the Algorithm';
  state.spinning = false;
  render(d, true);
  renderVault(); renderStatus(); save(); setHash(d);
  fanfare(d.tier);
  coinBurst({common: 0, uncommon: 18, rare: 70, mythic: 240, taken: 40}[d.tier]);
  if (drama && !REDUCED) { const w = $('machineWrap'); w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake'); }
  if (state.auto) autoTimer = setTimeout(() => { if (state.auto) pull(); }, drama ? 3800 : 1500);
}
export function stopAuto() { state.auto = false; clearTimeout(autoTimer); const b = $('auto'); b.setAttribute('aria-pressed', 'false'); b.textContent = 'AUTO-GRIND: OFF'; }
