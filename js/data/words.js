/* Word bank: verbs, nouns, articles and the naming rules around them. */
export const VERBS = 'GROW:growing RAISE:raising STEAL:stealing BUILD:building ADOPT:adopting HATCH:hatching MERGE:merging FEED:feeding PET:petting MINE:mining WASH:washing DIG:digging FLIP:flipping SMASH:smashing CLICK:clicking RESCUE:rescuing UPGRADE:upgrading EVOLVE:evolving POLISH:polishing DELIVER:delivering SHEAR:shearing MILK:milking HIRE:hiring FIRE:firing AUDIT:auditing TAX:taxing SUE:suing INHERIT:inheriting DIVORCE:divorcing MARRY:marrying INSURE:insuring LAUNDER:laundering UNIONIZE:unionizing EVICT:evicting BAKE:baking MICROWAVE:microwaving YEET:yeeting OUTRUN:outrunning SURVIVE:surviving ESCAPE:escaping'
  .split(' ').map(s => s.split(':'));
export const ING = Object.fromEntries(VERBS);
export const VERB_LIST = VERBS.map(v => v[0]);
export const NOUNS = {TYCOON:'🤑',GARDEN:'🌱',BRAINROT:'🧠',OBBY:'🧗',FROG:'🐸',CAPYBARA:'🦫',TOILET:'🚽',POTATO:'🥔',PIGEON:'🐦',GOBLIN:'👺',LANDLORD:'🏠',INTERN:'☕',ACCOUNTANT:'🧮',MORTGAGE:'🏦',GOOSE:'🪿',RACCOON:'🦝',HAMSTER:'🐹',SAUSAGE:'🌭',DUCK:'🦆',SHRIMP:'🍤',BILLIONAIRE:'💰',NOOB:'🤓',BASEPLATE:'🟩',SANDWICH:'🥪',LOOTBOX:'🎁',EGG:'🥚',DRAGON:'🐉',MOP:'🧹',CARWASH:'🚿',SHEEP:'🐑',ICEBERG:'🧊',UNCLE:'👨',UNICORN:'🦄',OCTOPUS:'🐙',ALPACA:'🦙',MANGO:'🥭',COIN:'🪙',SHARK:'🦈',VOLCANO:'🌋',BUTLER:'🤵',WIZARD:'🧙',ROBOT:'🤖',ALIEN:'👽',GHOST:'👻',CACTUS:'🌵',PIZZA:'🍕',TAXI:'🚕',RAT:'🐀',CRAB:'🦀',LLAMA:'🦙',DONUT:'🍩',MOTEL:'🏨',PRISON:'🔒',COW:'🐄',BANANA:'🍌',SNAIL:'🐌',OWL:'🦉',ANT:'🐜'};
export const NOUN_LIST = Object.keys(NOUNS);
export const ARTS = ['A','A','A','A','A','A','A','A','THE','YOUR','MY','ONE','EVERY','ANOTHER'];
export const ART_KEYS = ['A','THE','YOUR','MY','ONE','EVERY','ANOTHER'];
export const CONSONANT_U = new Set(['UNICORN']);
export const IRREG = {GOOSE:'geese',SHEEP:'sheep',SHRIMP:'shrimp',CACTUS:'cacti',POTATO:'potatoes',VOLCANO:'volcanoes',MANGO:'mangoes'};
export const TAKEN = new Set(['GROW A GARDEN','STEAL A BRAINROT','ADOPT A PET','RAISE A FLOPPA']);
export const FORCED = {'RAISE A TYCOON':'rare'};
export const ARTICLE_FILLERS = ['A','AN','A','THE','YOUR','MY','ONE','EVERY','ANOTHER'];
