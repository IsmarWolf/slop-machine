import { ING, NOUNS, TAKEN, FORCED } from './data/words.js';
import { TIERS, VERDICTS } from './data/tiers.js';
import { STUDIOS, TAGS, REVIEWERS } from './data/copy.js';
import { hash, rng, pick, pickN, between } from './utils/random.js';
import { money, compact } from './utils/format.js';
import { articleFor, plural, cap } from './utils/text.js';

/* Seeded luck: one name always gets the same paperwork. */
export function buildDossier(verb, artKey, noun) {
  const art = articleFor(artKey, noun);
  const title = `${verb} ${art} ${noun}`;
  const r = rng(hash(title));
  const tierRoll = r();
  const tier = TAKEN.has(title) ? 'taken' : FORCED[title] || (tierRoll < .56 ? 'common' : tierRoll < .85 ? 'uncommon' : tierRoll < .97 ? 'rare' : 'mythic');
  const T = TIERS[tier];
  const v = verb.toLowerCase(), V = cap(verb), ving = ING[verb], Ving = cap(ving);
  const n = noun.toLowerCase(), N = cap(noun), ns = plural(noun);
  const a = `${art.toLowerCase()} ${n}`;

  const gross = Math.round(between(T.gross[0], T.gross[1], r));
  const cut = gross * .30, swap = (gross - cut) * .65, ads = gross * .08;
  const artist = 40 + Math.round(r() * 12) * 10;
  const cousin = 50 + Math.round(r() * 7) * 50;
  const net = gross - cut - swap - ads - artist - cousin;
  let retire;
  if (tier === 'taken') retire = 'SOMEBODY ELSE ALREADY RETIRED ON THIS';
  else if (net <= 0) retire = `RETIRE: NEVER. YOU OWE ${money(-net)} A MONTH`;
  else {
    const months = 1e6 / net;
    if (months < 1) { const dy = Math.max(1, Math.round(months * 30)); retire = `RETIRE IN ${dy} DAY${dy === 1 ? '' : 'S'}`; }
    else if (months < 24) { const mo = Math.round(months); retire = `RETIRE IN ${mo} MONTH${mo === 1 ? '' : 'S'}`; }
    else { const y = Math.round(months / 12); retire = y > 90 ? `RETIRE IN ${y.toLocaleString('en-US')} YEARS. START NOW` : `RETIRE IN ${y} YEAR${y === 1 ? '' : 'S'}`; }
  }

  const pitches = [
    `You ${v} ${a}. It makes coins. The coins buy a bigger ${n}. There is no ending, and nobody has asked for one.`,
    `${Ving} ${ns}, except every 40 seconds a popup asks whether you would like to be ${ving} ${ns} faster.`,
    `It is ${ving} ${ns} with a progress bar on top. The progress bar is the game.`,
    `Picture the last game you saw on the front page. Now add ${a}. Legally, you are probably fine.`,
    `A simulator where you ${v} ${a} until a 9-year-old with a 2x multiplier passes you anyway.`,
    `You ${v} ${a} on a flat green baseplate. Someone will call this cozy. Pay them no mind and raise the egg prices.`
  ];
  const step2 = ['Wait 4 hours. Or pay 49 coins and wait 3 hours 59 minutes.','Watch the number go up.','Open a lootbox. It contains a smaller lootbox.','Stand on the glowing square for a while.'];
  const step3 = ['Rebirth. Everything resets. The game calls this progress.',`Buy a bigger ${n}. Go to step 1.`,'Get told your friends are playing. They are not.','Claim your daily reward. It is a coupon for the shop.'];
  const passes = [`2x ${V} Speed`,`Golden ${N}`,`VIP ${N} Lounge`,'Skip the Part Where You Wait',`Auto-${V}`,`Legally Distinct ${N}`,'Starter Pack (It Never Ends)','1 Extra Inventory Slot',`Emotional Support ${N}`,'Remove the Popup Selling This'];
  const reviews = [
    `i have been ${ving} ${ns} for 9 hours and i do not know why`,
    `was better before the ${n} update`,
    `my dad asked what i do all day. told him i ${v} ${ns}. he is not mad just quiet`,
    `give free ${n} pls`,
    `this game changed my life. i am 11`,
    `scam. 10/10`,
    `why does the ${n} cost more than my bike`,
    `my ${n} got deleted and support is a guy named Kyle`,
    `peak. no notes. the shop has 400 buttons`
  ];
  const pr = [49, 99, 199, 399, 799, 1699, 2499];
  return {
    verb, artKey, noun, art, title, tier, net, gross, retire,
    display: `[${pick(TAGS, r)}] ${V} ${art === 'A' || art === 'AN' ? art.toLowerCase() : cap(art)} ${N} ${NOUNS[noun]}`,
    studio: pick(STUDIOS, r),
    active: compact(between(T.active[0], T.active[1], r)),
    visits: compact(between(T.visits[0], T.visits[1], r)),
    likes: Math.round(between(T.likes[0], T.likes[1], r)) + '%',
    clones: compact(between(T.clones[0], T.clones[1], r)),
    pitch: pick(pitches, r),
    verdict: pick(VERDICTS[tier], r),
    loop: [`${V} ${a}.`, pick(step2, r), pick(step3, r)],
    passes: pickN(passes, 4, r).map((name, i) => ({name, price: pr[i + Math.floor(r() * 3)]})),
    ledger: [
      ['Gross, in play money', money(gross), ''],
      ['Platform takes its cut', '-' + money(cut), 'neg'],
      ['Turning fake money into real money', '-' + money(swap), 'neg'],
      ['Ads for a game about ' + ns, '-' + money(ads), 'neg'],
      ['Thumbnail artist', '-' + money(artist), 'neg'],
      ['Your cousin, who scripts', '-' + money(cousin), 'neg']
    ],
    roadmap: [
      ['WEEK 1', 'Publish one map and forty shop buttons.'],
      ['WEEK 2', `Add a bigger ${n}. Announce it like a moon landing.`],
      ['WEEK 3', 'Admin Abuse Saturday. Hand out free coins, then sell the rest.'],
      ['WEEK 6', 'Reset everyone\'s progress. Call it Season 2.'],
      ['WEEK 12', 'Retire. Hand the game to a 14-year-old moderator.']
    ],
    reviews: (() => { const who = pickN(REVIEWERS, 3, r); return pickN(reviews, 3, r).map((text, i) => ({text, who: who[i], likes: compact(between(3, 4000, r))})); })(),
    hue: Math.floor(r() * 360),
    update: 2 + Math.floor(r() * 40)
  };
}
