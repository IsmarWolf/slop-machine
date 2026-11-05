import { $ } from './dom.js';
import { NOUN_LIST, VERB_LIST } from './data/words.js';
import { REVIEWERS } from './data/copy.js';
import { rng, pick } from './utils/random.js';
import { articleFor } from './utils/text.js';

export function buildTicker() {
  const r = rng(Date.now() & 0xffff), bits = [];
  for (let i = 0; i < 14; i++) {
    const noun = pick(NOUN_LIST, r), d = articleFor('A', noun);
    bits.push(`<span>${pick(REVIEWERS, r)} just retired on <b>${pick(VERB_LIST, r)} ${d} ${noun}</b></span>`);
    if (i % 4 === 3) bits.push(`<span>THE ALGORITHM IS ACCEPTING NEW CONSULTATIONS</span>`);
  }
  const html = bits.join('');
  $('ticker').innerHTML = html + html;
}
