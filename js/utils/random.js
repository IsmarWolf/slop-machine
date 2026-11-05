export function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
export function rng(seed) { let a = seed; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export const pick = (arr, r = Math.random) => arr[Math.floor(r() * arr.length)];
export function pickN(arr, n, r) { const c = arr.slice(), out = []; while (out.length < n && c.length) out.push(c.splice(Math.floor(r() * c.length), 1)[0]); return out; }
export const between = (lo, hi, r) => lo + (hi - lo) * r();
