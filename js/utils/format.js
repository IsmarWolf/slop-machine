export const money = v => (v < 0 ? '-$' : '$') + Math.round(Math.abs(v)).toLocaleString('en-US');
export const compact = v => v >= 1e9 ? (v / 1e9).toFixed(1) + 'B' : v >= 1e6 ? (v / 1e6).toFixed(1) + 'M' : v >= 1e4 ? Math.round(v / 1e3) + 'K' : v >= 1e3 ? (v / 1e3).toFixed(1) + 'K' : String(Math.round(v));
