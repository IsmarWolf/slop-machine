# Slop Machine

Three words stand between you and early retirement.

A slot machine that spins up VERB / ARTICLE / NOUN game names. No build step, but the code now uses ES modules, so serve the folder over HTTP instead of opening `index.html` directly:

```
python -m http.server 8000   # then open http://localhost:8000
```

**Play it:** https://ismarwolf.github.io/slop-machine/

## Layout

```
index.html          markup only
assets/angel.webp   the statue (was inlined as base64)
css/                base, ticker, shrine, machine, paperwork, overlays, responsive
js/
  main.js           startup
  events.js         all event wiring
  state.js          shared state, save/load
  pull.js           the spin + auto-grind
  render.js         DOM rendering; router.js: URL hash <-> game
  dossier.js        seeded paperwork for each name
  reel.js thumbnail.js coins.js audio.js ticker.js ui.js dom.js
  data/             words, tiers, flavour text
  utils/            random, format, text
```

All rights reserved. No license is granted for the code or the images.
