import { $ } from './dom.js';
import { ING, NOUNS, ART_KEYS } from './data/words.js';
import { TIERS } from './data/tiers.js';
import { buildDossier } from './dossier.js';
import { reels } from './reel.js';
import { render } from './render.js';
import { state } from './state.js';

export const slug = d => `${d.verb}-${d.art}-${d.noun}`.toLowerCase();
export function setHash(d) { try { if (location.hash.slice(1) !== slug(d)) location.hash = slug(d); } catch (e) {} }

export function parseSlug(s) {
  const p = (s || '').toUpperCase().split('-');
  if (p.length !== 3 || !ING[p[0]] || !NOUNS[p[2]]) return null;
  const key = p[1] === 'AN' ? 'A' : p[1];
  if (!ART_KEYS.includes(key)) return null;
  return {verb: p[0], artKey: key, noun: p[2]};
}
export function showSlug(s, animate) {
  const o = parseSlug(s); if (!o) return false;
  state.verb = o.verb; state.artKey = o.artKey; state.noun = o.noun;
  const d = buildDossier(o.verb, o.artKey, o.noun);
  reels[0].set(d.verb); reels[1].set(d.art); reels[2].set(d.noun);
  $('head').dataset.mood = TIERS[d.tier].mood;
  render(d, animate);
  return true;
}
