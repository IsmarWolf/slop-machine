import { CONSONANT_U, IRREG } from '../data/words.js';

export const articleFor = (key, noun) => key === 'A' ? (/^[AEIOU]/.test(noun) && !CONSONANT_U.has(noun) ? 'AN' : 'A') : key;
export const plural = n => {
  if (IRREG[n]) return IRREG[n];
  const l = n.toLowerCase();
  if (/(x|ch|sh|s)$/.test(l)) return l + 'es';
  if (/[^aeiou]y$/.test(l)) return l.slice(0, -1) + 'ies';
  return l + 's';
};
export const cap = s => s[0].toUpperCase() + s.slice(1).toLowerCase();
