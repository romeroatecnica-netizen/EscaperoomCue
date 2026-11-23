let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext || (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) {
    audioCtx = new Ctor();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playFeedbackTone(kind: 'click' | 'unlock' | 'error' | 'victory', enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const playNote = (freq: number, start: number, duration: number, gainPeak: number, type: OscillatorType = 'sine') => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(gainPeak, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  };

  if (kind === 'click') {
    playNote(520, now, 0.06, 0.04, 'triangle');
  } else if (kind === 'error') {
    playNote(210, now, 0.14, 0.06, 'sawtooth');
    playNote(175, now + 0.09, 0.16, 0.05, 'sawtooth');
  } else if (kind === 'unlock') {
    playNote(523.25, now, 0.12, 0.07, 'triangle');
    playNote(659.25, now + 0.08, 0.14, 0.07, 'triangle');
    playNote(783.99, now + 0.16, 0.22, 0.08, 'sine');
  } else if (kind === 'victory') {
    playNote(523.25, now, 0.12, 0.08, 'triangle');
    playNote(659.25, now + 0.1, 0.12, 0.08, 'triangle');
    playNote(783.99, now + 0.2, 0.14, 0.08, 'triangle');
    playNote(1046.5, now + 0.32, 0.36, 0.09, 'sine');
  }
}
