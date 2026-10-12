import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VideoStage } from './components/VideoStage';
import { TimelineControls } from './components/TimelineControls';
import { VideoExporterModal } from './components/VideoExporterModal';
import { ProductionNotesModal } from './components/ProductionNotesModal';
import { PortxzLogo, PortxzWordmark } from './components/BrandAssets';
import { audioEngine } from './audio/AudioEngine';
import { SCENES, TOTAL_DURATION } from './types';
import {
  Smartphone,
  Maximize2,
  Film,
  FileText,
  Volume2,
  Sparkles,
  Zap,
  Info,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [isExporterOpen, setIsExporterOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  const [audioSettings, setAudioSettings] = useState({
    music: true,
    sfx: true,
    voiceover: true,
  });

  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const currentTimeRef = useRef<number>(0);
  currentTimeRef.current = currentTime;

  // Sync Audio Engine on start / user interaction
  const ensureAudioReady = useCallback(() => {
    audioEngine.init();
    audioEngine.resume();
  }, []);

  // Main high-precision animation loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaSeconds = ((timestamp - lastTimeRef.current) / 1000) * playbackSpeed;
      lastTimeRef.current = timestamp;

      let nextTime = currentTimeRef.current + deltaSeconds;

      if (nextTime >= TOTAL_DURATION) {
        if (isLooping) {
          nextTime = 0;
          audioEngine.stopAll();
        } else {
          nextTime = TOTAL_DURATION;
          setIsPlaying(false);
        }
      }

      setCurrentTime(nextTime);

      // Tick music & sound cues
      audioEngine.tickMusic(nextTime);

      // Trigger voiceover cue for scene
      const sceneIdx = nextTime < 3 ? 0 : nextTime < 6 ? 1 : nextTime < 11 ? 2 : 3;
      audioEngine.triggerVoiceoverCue(sceneIdx);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, isLooping]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        ensureAudioReady();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setCurrentTime((prev) => Math.max(0, prev - 1));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setCurrentTime((prev) => Math.min(TOTAL_DURATION, prev + 1));
      } else if (e.key === 'c' || e.key === 'C') {
        setShowCaptions((prev) => !prev);
      } else if (e.key === 'e' || e.key === 'E') {
        setIsExporterOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ensureAudioReady]);

  // User actions
  const handlePlayPause = () => {
    ensureAudioReady();
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (time: number) => {
    ensureAudioReady();
    setCurrentTime(time);
    const sceneIdx = time < 3 ? 0 : time < 6 ? 1 : time < 11 ? 2 : 3;
    audioEngine.triggerVoiceoverCue(sceneIdx);
  };

  const handleToggleMusic = () => {
    ensureAudioReady();
    setAudioSettings((prev) => {
      const nextVal = !prev.music;
      audioEngine.setMusicEnabled(nextVal);
      return { ...prev, music: nextVal };
    });
  };

  const handleToggleSfx = () => {
    ensureAudioReady();
    setAudioSettings((prev) => {
      const nextVal = !prev.sfx;
      audioEngine.setSfxEnabled(nextVal);
      return { ...prev, sfx: nextVal };
    });
  };

  const handleToggleVoiceover = () => {
    ensureAudioReady();
    setAudioSettings((prev) => {
      const nextVal = !prev.voiceover;
      audioEngine.setVoEnabled(nextVal);
      if (!nextVal && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return { ...prev, voiceover: nextVal };
    });
  };

  const currentScene = SCENES.find(
    (s) => currentTime >= s.startTime && currentTime < s.endTime
  ) || SCENES[SCENES.length - 1];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#060913] text-white select-none">
      {/* Top Navbar */}
      <header className="h-14 border-b border-slate-800/80 bg-[#0A0F1E]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <PortxzLogo size={32} glow={true} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight text-white">
                Port<span className="text-[#4DA6FF]">xz</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-[#4DA6FF]/30 text-[#4DA6FF] text-[10px] font-mono font-bold">
                15s PROMO AD (9:16)
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              One profile &bull; Live Portfolio + ATS Resume PDF + GitHub README in sync
            </p>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2">
          {/* Frame Style Toggle */}
          <button
            onClick={() => setIsPhoneFrame((prev) => !prev)}
            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs transition ${
              isPhoneFrame
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title={isPhoneFrame ? 'Switch to borderless cinema' : 'Switch to mobile device frame'}
          >
            {isPhoneFrame ? <Smartphone className="w-3.5 h-3.5 text-[#4DA6FF]" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPhoneFrame ? '9:16 Phone' : 'Fullscreen'}</span>
          </button>

          {/* Prompts & Script Brief */}
          <button
            onClick={() => setIsNotesOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Prompts &amp; Script</span>
          </button>

          {/* Export Video Modal Button */}
          <button
            onClick={() => setIsExporterOpen(true)}
            className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-[#4DA6FF] to-[#7C5CFF] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(77,166,255,0.4)] hover:brightness-110 active:scale-95 transition"
          >
            <Film className="w-4 h-4 fill-slate-950" />
            <span>Export Video</span>
          </button>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side Scene Sidebar (Desktop / Tablet) */}
        <aside className="w-72 border-r border-slate-800/80 bg-[#080D1A]/80 p-4 hidden lg:flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-[11px] font-mono text-[#4DA6FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Storyboard Breakdown
              </div>
              <h3 className="text-sm font-bold text-white">4 Scenes &bull; 15 Seconds</h3>
            </div>

            <div className="space-y-2.5">
              {SCENES.map((scene) => {
                const isActive = currentTime >= scene.startTime && currentTime < scene.endTime;
                return (
                  <div
                    key={scene.id}
                    onClick={() => handleSeek(scene.startTime)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-blue-950/70 border-[#4DA6FF] shadow-[0_0_20px_rgba(77,166,255,0.25)]'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className={isActive ? 'text-[#4DA6FF] font-bold' : 'text-slate-400'}>
                        SCENE 0{scene.number} ({scene.startTime}s - {scene.endTime}s)
                      </span>
                      {scene.number === 2 ? (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[9px]">
                          ⚡ BEAT DROP
                        </span>
                      ) : isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#39D98A] animate-pulse" />
                      ) : null}
                    </div>

                    <div className="text-xs font-bold text-white">{scene.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {scene.description}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-300 italic">
                      &quot;{scene.voiceover}&quot;
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Offer Badge */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#0b162a] to-[#120d2c] border border-blue-500/30 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 text-[#39D98A] font-bold">
              <Zap className="w-3.5 h-3.5" /> Launch Offer Active
            </div>
            <div className="text-slate-300 text-[10px]">
              Pro for ₹49 &bull; First 50 users claim their custom domain &amp; real-time ATS sync.
            </div>
          </div>
        </aside>

        {/* Center: The 9:16 Video Player Container */}
        <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden relative">
          {/* Subtle Cybernetic Background Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

          {/* 9:16 Screen or Phone Mockup */}
          <div
            className={`relative transition-all duration-300 flex flex-col items-center justify-center ${
              isPhoneFrame
                ? 'w-[320px] sm:w-[360px] md:w-[380px] aspect-[9/16] max-h-[calc(100vh-12rem)] rounded-[38px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(77,166,255,0.2)] border-2 border-slate-600/60'
                : 'w-full max-w-[420px] aspect-[9/16] max-h-[calc(100vh-12rem)] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden'
            }`}
          >
            {/* Phone Speaker Notch (if phone frame) */}
            {isPhoneFrame && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-full z-40 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-1 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-900/60 ml-2 border border-blue-500/40" />
              </div>
            )}

            {/* Inner Video Canvas */}
            <div
              className={`w-full h-full overflow-hidden relative cursor-pointer ${
                isPhoneFrame ? 'rounded-[28px]' : 'rounded-xl'
              }`}
              onClick={handlePlayPause}
            >
              <VideoStage currentTime={currentTime} showCaptions={showCaptions} />
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Timeline & Playback Bar */}
      <footer className="shrink-0 z-30">
        <TimelineControls
          currentTime={currentTime}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          isLooping={isLooping}
          showCaptions={showCaptions}
          audioSettings={audioSettings}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onSpeedChange={setPlaybackSpeed}
          onToggleLoop={() => setIsLooping((prev) => !prev)}
          onToggleCaptions={() => setShowCaptions((prev) => !prev)}
          onToggleMusic={handleToggleMusic}
          onToggleSfx={handleToggleSfx}
          onToggleVoiceover={handleToggleVoiceover}
          onOpenExporter={() => setIsExporterOpen(true)}
          onOpenNotes={() => setIsNotesOpen(true)}
        />
      </footer>

      {/* Video Exporter Modal */}
      <VideoExporterModal
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
        showCaptions={showCaptions}
      />

      {/* Production Notes & Prompts Modal */}
      <ProductionNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentTime={currentTime}
      />
    </div>
  );
}
