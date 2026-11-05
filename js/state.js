import { isSoundOn, setSound } from './audio.js';

export const state = {verb: 'RAISE', artKey: 'A', noun: 'TYCOON', spinning: false, auto: false, pulls: 0, retired: 0, vault: [], current: null};
export const locks = [false, false, false];

export function save() { try { localStorage.setItem('van-state', JSON.stringify({pulls: state.pulls, retired: state.retired, vault: state.vault, sound: isSoundOn()})); } catch (e) {} }
export function load() { try { const s = JSON.parse(localStorage.getItem('van-state') || '{}'); state.pulls = s.pulls || 0; state.retired = s.retired || 0; state.vault = Array.isArray(s.vault) ? s.vault : []; if (s.sound === false) setSound(false); } catch (e) {} }
