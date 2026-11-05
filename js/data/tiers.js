/* Rarity tiers and the verdicts the Algorithm hands out for each. */
export const TIERS = {
  common:   {stamp:'COMMON SLOP',   gross:[40, 900],        active:[0, 14],        visits:[60, 4000],       likes:[41, 62], clones:[2800, 9400], mood:'meh'},
  uncommon: {stamp:'UNCOMMON SLOP', gross:[1500, 11000],    active:[30, 400],      visits:[12e3, 4e5],      likes:[58, 74], clones:[700, 2800],  mood:'idle'},
  rare:     {stamp:'RARE SLOP',     gross:[46000, 240000],  active:[1800, 22000],  visits:[3e6, 9e7],       likes:[72, 88], clones:[90, 700],    mood:'grin'},
  mythic:   {stamp:'MYTHIC SLOP',   gross:[900000, 6000000],active:[90000, 900000],visits:[4e8, 6e9],       likes:[89, 97], clones:[2, 40],      mood:'rich'},
  taken:    {stamp:'ALREADY TAKEN', gross:[9000000, 22000000],active:[800000, 4000000],visits:[8e9, 3e10],  likes:[90, 96], clones:[9000, 12000],mood:'shock'}
};
export const VERDICTS = {
  common: ['Statistically identical to everything else on the page. The Algorithm calls this a strong start.','One player will join, stand still for 9 minutes, and leave. That is your launch event.','The Algorithm looked at this and went to get a snack.'],
  uncommon: ['Somebody\'s nephew will love this for one weekend. That is your seed round.','With a better thumbnail, this could be a worse game that earns more.','The Algorithm is mildly curious, which is the most it has felt since March.'],
  rare: ['The thumbnail alone does six figures. The game is optional.','The Algorithm recommends telling your boss something vague and confident.','This one has legs. Add a mystery egg and it has more legs.'],
  mythic: ['The Algorithm has wept. Quit your job and tell nobody.','The angel\'s eyes turned into dollar signs. That has only happened twice.','Nothing about this makes sense, which is exactly what the front page wants.'],
  taken: ['This game already exists. Somebody is reading this on a yacht.','Too late. The Algorithm has already given this one to somebody else, and they bought a boat.']
};
