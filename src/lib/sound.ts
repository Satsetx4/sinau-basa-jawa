import { safeStorage, STORAGE_KEYS } from './storage';

let audioCtx: AudioContext | null = null;

export const setMuted = (muted: boolean) => {
  safeStorage.setItem(STORAGE_KEYS.SOUND_MUTED, muted ? 'true' : 'false');
};

export const getMuted = (): boolean => {
  return safeStorage.getItem(STORAGE_KEYS.SOUND_MUTED) === 'true';
};

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playClick = () => {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};

export const playCorrect = () => {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.24);
    });
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};

export const playWrong = () => {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const notes = [290, 220];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.2);
    });
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};

export const playFanfare = () => {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const chords = [
      { time: 0.0, freq: 523.25 },
      { time: 0.12, freq: 659.25 },
      { time: 0.24, freq: 783.99 },
      { time: 0.40, freq: 1046.50 },
      { time: 0.55, freq: 1046.50 },
      { time: 0.70, freq: 1318.51 }
    ];
    chords.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);
      gain.gain.setValueAtTime(0.14, ctx.currentTime + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + note.time);
      osc.stop(ctx.currentTime + note.time + 0.38);
    });
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};
