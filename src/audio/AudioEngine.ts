/**
 * Web Audio API Engine for the 15-second Portxz promotional ad.
 * Features:
 * - Upbeat modern electronic synth music with 3.0s beat drop
 * - Precision SFX: glitch static, riser, bass drop impact, UI clicks, sync chime
 * - Speech synthesis voiceover synchronized to scene cues
 * - MediaStream destination support for full video recording export
 */

class AdAudioEngine {
  private ctx: AudioContext | null = null;
  private destNode: MediaStreamAudioDestinationNode | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicEnabled: boolean = true;
  private isSfxEnabled: boolean = true;
  private isVoEnabled: boolean = true;
  private isRunning: boolean = false;
  private loopInterval: number | null = null;

  // Track state
  private lastFiredDrop: boolean = false;
  private lastFiredSync: boolean = false;
  private lastVoiceoverScene: number = -1;

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.destNode = this.ctx.createMediaStreamDestination();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.isMusicEnabled ? 0.75 : 0;

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.isSfxEnabled ? 0.9 : 0;

      // Connect to speakers
      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Connect also to recording stream
      this.masterGain.connect(this.destNode);
    } catch (e) {
      console.warn('AudioContext init error:', e);
    }
  }

  public getMediaStreamDestination(): MediaStreamAudioDestinationNode | null {
    this.init();
    return this.destNode;
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.isMusicEnabled = enabled;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setTargetAtTime(enabled ? 0.75 : 0, this.ctx.currentTime, 0.05);
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.isSfxEnabled = enabled;
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(enabled ? 0.9 : 0, this.ctx.currentTime, 0.05);
    }
  }

  public setVoEnabled(enabled: boolean) {
    this.isVoEnabled = enabled;
  }

  public getSettings() {
    return {
      music: this.isMusicEnabled,
      sfx: this.isSfxEnabled,
      voiceover: this.isVoEnabled,
    };
  }

  public stopAll() {
    this.isRunning = false;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.lastVoiceoverScene = -1;
    this.lastFiredDrop = false;
    this.lastFiredSync = false;
  }

  /**
   * Sound effect: Glitch Zap / Error Static
   */
  public playGlitchZap() {
    if (!this.isSfxEnabled || !this.ctx || !this.sfxGain) return;
    this.resume();
    const now = this.ctx.currentTime;
    
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800 + Math.random() * 2000, now);
    filter.Q.value = 4.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.15);
  }

  /**
   * Sound effect: The Beat Drop Impact at 3.0s!
   * Heavy 808 sub kick, transient punch, and shockwave air release.
   */
  public playBeatDrop() {
    if (!this.isSfxEnabled || !this.ctx || !this.sfxGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    // Sub-bass 808 boom
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.7);

    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 1.0);

    // Punch transient
    const punchOsc = this.ctx.createOscillator();
    const punchGain = this.ctx.createGain();
    punchOsc.type = 'triangle';
    punchOsc.frequency.setValueAtTime(260, now);
    punchOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    punchGain.gain.setValueAtTime(0.8, now);
    punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    punchOsc.connect(punchGain);
    punchGain.connect(this.sfxGain);
    punchOsc.start(now);
    punchOsc.stop(now + 0.2);

    // Air blast noise
    const noiseLen = this.ctx.sampleRate * 0.4;
    const noiseBuf = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(2400, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(200, now + 0.4);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noiseSrc.start(now);
    noiseSrc.stop(now + 0.4);
  }

  /**
   * Sound effect: Suction Whoosh leading to singularity (at ~2.7s)
   */
  public playSuctionWhoosh() {
    if (!this.isSfxEnabled || !this.ctx || !this.sfxGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.35);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  /**
   * Sound effect: Triple Screen Sync Chime
   */
  public playSyncSuccessChime() {
    if (!this.isSfxEnabled || !this.ctx || !this.sfxGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.05;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.35, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  }

  /**
   * Sound effect: UI Click / Key tap
   */
  public playKeyClick() {
    if (!this.isSfxEnabled || !this.ctx || !this.sfxGain) return;
    this.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Generates continuous music pulses / synth chords at current second t
   */
  public tickMusic(t: number) {
    if (!this.isMusicEnabled || !this.ctx || !this.musicGain) return;
    this.resume();

    // Scene 1 (0 to 3s): Tense low drone + riser
    if (t < 2.9) {
      if (Math.random() < 0.08) {
        this.playLowTensePulse(t);
      }
    }

    // Beat Drop cue
    if (t >= 2.95 && t <= 3.2 && !this.lastFiredDrop) {
      this.lastFiredDrop = true;
      this.playBeatDrop();
    }
    if (t < 2.5) {
      this.lastFiredDrop = false;
    }

    // Scene 3 Sync Chime cue
    if (t >= 9.8 && t <= 10.3 && !this.lastFiredSync) {
      this.lastFiredSync = true;
      this.playSyncSuccessChime();
    }
    if (t < 9.5) {
      this.lastFiredSync = false;
    }

    // High energy electronic beats during Scene 2, 3, 4 (3.0s to 15.0s)
    if (t >= 3.0 && t <= 14.8) {
      // 128 BPM -> ~0.46875s per beat, 0.117s per 16th note
      const beatProgress = (t - 3.0) % 0.46875;
      if (beatProgress < 0.06 && Math.random() < 0.6) {
        this.playGrooveBassNote(t);
      }
    }
  }

  private playLowTensePulse(t: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const freq = 55 + (t / 3.0) * 45; // pitch climbs subtly
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180 + (t / 3.0) * 400, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  private playGrooveBassNote(t: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    const scale = [65.41, 77.78, 87.31, 98.0, 116.54, 130.81]; // C2, Eb2, F2, G2, Bb2, C3 (Cyberpunk electro scale)
    const note = scale[Math.floor((t * 4) % scale.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(note, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(160, now + 0.18);
    filter.Q.value = 6;

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * Voiceover Trigger aligned to scene timestamps:
   * Scene 1 (0–3s): "Portfolio, resume, README — all out of date?"
   * Scene 2 (3–6s): "Meet Portxz. One profile."
   * Scene 3 (6–11s): "Edit once — your portfolio, resume PDF, and GitHub README update together."
   * Scene 4 (11–15s): "Live in three minutes. Start free — Pro just 49 rupees for the first 50 users."
   */
  public triggerVoiceoverCue(sceneIndex: number) {
    if (!this.isVoEnabled || !window.speechSynthesis) return;
    if (this.lastVoiceoverScene === sceneIndex) return;
    this.lastVoiceoverScene = sceneIndex;

    const scriptByScene = [
      "Portfolio, resume, README — all out of date?",
      "Meet Portxz. One profile.",
      "Edit once — your portfolio, resume PDF, and GitHub README update together.",
      "Live in three minutes. Start free — Pro just forty-nine rupees for the first fifty users."
    ];

    const text = scriptByScene[sceneIndex];
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.15; // upbeat, energetic tech ad pacing
    utterance.pitch = 1.05;

    // Pick a high-quality voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Alex'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const audioEngine = new AdAudioEngine();
