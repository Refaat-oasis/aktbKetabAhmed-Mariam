/**
 * Web Audio Synthesizer for warm, romantic Oud/Harp plucking melodies
 * based on traditional Hijaz / Nahawand romantic scale notes.
 */
export class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  public isPlaying: boolean = false;
  private intervalId: number | null = null;
  private step: number = 0;

  // Hijaz / Nahawand inspired warm romantic scale frequencies (Hz)
  private readonly melodyNotes: number[] = [
    293.66, // D4
    349.23, // F4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    523.25, // C5
    466.16, // Bb4
    440.00, // A4
    392.00, // G4
    349.23, // F4
    329.63, // E4
    293.66, // D4
    349.23, // F4
    392.00, // G4
    440.00, // A4
    293.66  // D4
  ];

  public init(): void {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playPluck(freq: number, duration: number = 1.6, volume: number = 0.08): void {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      subOsc.type = 'sine';

      osc.frequency.setValueAtTime(freq, now);
      subOsc.frequency.setValueAtTime(freq * 0.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + duration);
      subOsc.stop(now + duration);
    } catch {
      // Ignore audio errors if browser restricts playback
    }
  }

  public start(): void {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }

    // Play immediate welcoming chord arpeggio
    [293.66, 349.23, 440.0, 587.33].forEach((n, idx) => {
      window.setTimeout(() => this.playPluck(n, 2.2, 0.06), idx * 140);
    });

    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      const note = this.melodyNotes[this.step % this.melodyNotes.length];
      this.playPluck(note, 1.8, 0.065);
      this.step++;
    }, 650);
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public dispose(): void {
    this.stop();
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        void this.ctx.close();
      } catch {
        // ignore
      }
      this.ctx = null;
    }
  }
}

