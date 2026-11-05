import { $ } from './dom.js';
import { reels } from './reel.js';
import { state, load } from './state.js';
import { drawThumb } from './thumbnail.js';
import { renderVault, renderStatus } from './render.js';
import { parseSlug, showSlug } from './router.js';
import { buildTicker } from './ticker.js';
import { bindEvents } from './events.js';

bindEvents();
load();
buildTicker();
const startSlug = parseSlug(location.hash.slice(1)) ? location.hash.slice(1) : 'raise-a-tycoon';
showSlug(startSlug, false);
$('head').dataset.mood = 'idle';
renderVault(); renderStatus();
if (document.fonts && document.fonts.load) {
  Promise.all([document.fonts.load('40px Anton'), document.fonts.load('20px "Archivo Black"'), document.fonts.ready]).then(() => {
    reels.forEach(r => r.refresh()); if (state.current) drawThumb(state.current);
  }).catch(() => {});
}
