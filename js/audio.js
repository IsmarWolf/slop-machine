import { $ } from './dom.js';

let ac = null, soundOn = true, master = null;
export function audio() {
  if (!soundOn) return null;
  try {
    if (!ac) { ac = new (window.AudioContext || window.webkitAudioContext)(); master = ac.createGain(); master.gain.value = .32; master.connect(ac.destination); }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  } catch (e) { return null; }
}
export function blip(freq, dur, type = 'square', vol = .3, when = 0, to = null) {
  const a = audio(); if (!a) return;
  const t = a.currentTime + when, o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0008, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .02);
}
export const tick = () => blip(1250, .018, 'square', .13);
export const thunk = () => blip(170, .14, 'sine', .9, 0, 55);
export function choir() {
  const a = audio(); if (!a) return;
  const t = a.currentTime, f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1500; f.connect(master);
  [261.6, 329.6, 392, 523.3, 659.3].forEach(hz => [-5, 5].forEach(det => {
    const o = a.createOscillator(), g = a.createGain(); o.type = 'sawtooth'; o.frequency.value = hz; o.detune.value = det;
    g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(.05, t + .5); g.gain.setValueAtTime(.05, t + 2.1); g.gain.linearRampToValueAtTime(.0001, t + 3.5);
    o.connect(g); g.connect(f); o.start(t); o.stop(t + 3.6);
  }));
}
export function fanfare(tier) {
  if (tier === 'common') { blip(196, .22, 'sawtooth', .22); blip(147, .34, 'sawtooth', .22, .2); return; }
  if (tier === 'taken') { [392, 370, 349, 247].forEach((f, i) => blip(f, .3, 'sawtooth', .25, i * .22)); return; }
  const notes = tier === 'uncommon' ? [523, 659] : tier === 'rare' ? [523, 659, 784, 1047] : [523, 659, 784, 1047, 1319, 1568];
  notes.forEach((f, i) => { blip(f, .22, 'square', .17, i * .085); blip(f * 2, .16, 'triangle', .14, i * .085 + .03); });
  if (tier === 'mythic') choir();
}

export const isSoundOn = () => soundOn;
export function setSound(on) { soundOn = on; const b = $('sound'); b.setAttribute('aria-pressed', on); b.textContent = `SOUND: ${on ? 'ON' : 'OFF'}`; }
