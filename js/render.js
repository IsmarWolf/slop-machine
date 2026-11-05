import { $ } from './dom.js';
import { TIERS } from './data/tiers.js';
import { money } from './utils/format.js';
import { drawThumb } from './thumbnail.js';
import { state } from './state.js';

export function render(d, animate) {
  state.current = d;
  $('ruling').textContent = d.title;
  $('gtitle').textContent = d.display;
  $('byline').textContent = `By ${d.studio}`;
  $('sActive').textContent = d.active; $('sVisits').textContent = d.visits; $('sLikes').textContent = d.likes; $('sClones').textContent = d.clones;
  $('pitch').textContent = d.pitch;
  $('verdict').textContent = `The Algorithm: ${d.verdict}`;
  $('loop').replaceChildren(...d.loop.map(t => { const li = document.createElement('li'); const s = document.createElement('span'); s.textContent = t; li.append(s); return li; }));
  $('shop').replaceChildren(...d.passes.map(p => {
    const el = document.createElement('div'); el.className = 'pass';
    const n = document.createElement('span'); n.textContent = p.name;
    const b = document.createElement('b'); b.textContent = `${p.price.toLocaleString('en-US')} COINS`;
    el.append(n, b); return el;
  }));
  const rows = d.ledger.map(([k, v, cls]) => { const tr = document.createElement('tr'); if (cls) tr.className = cls; const a = document.createElement('td'), b = document.createElement('td'); a.textContent = k; b.textContent = v; tr.append(a, b); return tr; });
  const netTr = document.createElement('tr'); netTr.className = 'net';
  const na = document.createElement('td'), nb = document.createElement('td'); na.textContent = 'YOU KEEP, MONTHLY'; nb.textContent = money(d.net); netTr.append(na, nb);
  $('ledger').replaceChildren(...rows, netTr);
  $('retire').textContent = d.retire;
  $('roadmap').replaceChildren(...d.roadmap.map(([w, t]) => { const li = document.createElement('li'); const b = document.createElement('b'); b.textContent = w; const s = document.createElement('span'); s.textContent = t; li.append(b, s); return li; }));
  $('reviews').replaceChildren(...d.reviews.map(rv => {
    const q = document.createElement('blockquote'); q.className = 'bubble'; q.textContent = rv.text;
    const c = document.createElement('cite'); c.textContent = `${rv.who} / ${rv.likes} likes`; q.append(c); return q;
  }));
  const st = $('stamp'); st.textContent = TIERS[d.tier].stamp; st.className = `stamp t-${d.tier}`;
  drawThumb(d);
  if (animate) {
    st.classList.remove('slam'); void st.offsetWidth; st.classList.add('slam');
    const res = $('results'); res.classList.remove('fresh'); void res.offsetWidth; res.classList.add('fresh');
  }
}
export function renderVault() {
  const list = $('vault');
  list.replaceChildren(...state.vault.map(v => {
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.dataset.slug = v.slug;
    const t = document.createElement('b'); t.textContent = v.title;
    const s = document.createElement('small'); s.textContent = `${TIERS[v.tier] ? TIERS[v.tier].stamp : ''} / ${money(v.net)} a month`;
    b.append(t, s); li.append(b); return li;
  }));
  $('vaultEmpty').hidden = state.vault.length > 0;
  const total = state.vault.reduce((sum, v) => sum + v.net, 0);
  $('total').textContent = state.vault.length ? `Imaginary income: ${money(total)} a month` : '';
}
export function renderStatus(extra) {
  $('status').textContent = extra || `The Algorithm has been consulted ${state.pulls.toLocaleString('en-US')} time${state.pulls === 1 ? '' : 's'}. Retirements so far: ${state.retired}.`;
}
