import React from 'react';
import { SCENES, TOTAL_DURATION } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, MicOff, Music, Zap, Sparkles, Film, FileText, FastForward, Check } from 'lucide-react';

interface TimelineControlsProps {
  currentTime: number;
  isPlaying: boolean;
  playbackSpeed: number;
  isLooping: boolean;
  showCaptions: boolean;
  audioSettings: {
    music: boolean;
    sfx: boolean;
    voiceover: boolean;
  };
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onSpeedChange: (speed: number) => void;
  onToggleLoop: () => void;
  onToggleCaptions: () => void;
  onToggleMusic: () => void;
  onToggleSfx: () => void;
  onToggleVoiceover: () => void;
  onOpenExporter: () => void;
  onOpenNotes: () => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  currentTime,
  isPlaying,
  playbackSpeed,
  isLooping,
  showCaptions,
  audioSettings,
  onPlayPause,
  onSeek,
  onSpeedChange,
  onToggleLoop,
  onToggleCaptions,
  onToggleMusic,
  onToggleSfx,
  onToggleVoiceover,
  onOpenExporter,
  onOpenNotes,
}) => {
  const progressPercent = (currentTime / TOTAL_DURATION) * 100;

  return (
    <div className="w-full bg-[#080D1A]/95 border-t border-slate-800/80 backdrop-blur-md p-4 text-white space-y-3">
      {/* 1. Scrub Timeline Bar with Scene Markers */}
      <div className="space-y-1.5">
        <div className="relative w-full h-8 flex items-center cursor-pointer group">
          {/* Track background */}
          <div
            className="relative w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              onSeek(ratio * TOTAL_DURATION);
            }}
          >
            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-[#4DA6FF] via-[#7C5CFF] to-[#39D98A] transition-all duration-75 relative"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Scene Marker Pins on Track */}
          <div className="absolute inset-x-0 pointer-events-none flex justify-between h-full items-center px-0.5">
            {SCENES.map((scene) => {
              const markerPercent = (scene.startTime / TOTAL_DURATION) * 100;
              return (
                <div
                  key={scene.id}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${markerPercent}%` }}
                >
                  <div className="w-0.5 h-4 bg-white/40" />
                  <span className="text-[9px] font-mono text-slate-400 mt-1">
                    {scene.startTime}s
                  </span>
                </div>
              );
            })}
          </div>

          {/* Current playhead handle */}
          <div
            className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#4DA6FF] border-2 border-[#4DA6FF] pointer-events-none transition-all duration-75 transform -translate-x-1/2"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* Scene Jump Pills */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {SCENES.map((scene) => {
            const isActive = currentTime >= scene.startTime && currentTime < scene.endTime;
            return (
              <button
                key={scene.id}
                onClick={() => onSeek(scene.startTime)}
                className={`py-1.5 px-2 rounded-lg text-left transition border ${
                  isActive
                    ? 'bg-blue-950/70 border-[#4DA6FF] text-white shadow-[0_0_12px_rgba(77,166,255,0.25)]'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={isActive ? 'text-[#4DA6FF] font-bold' : ''}>
                    0{scene.number} ({scene.startTime}s)
                  </span>
                  {scene.number === 2 && (
                    <span className="text-[8px] px-1 bg-purple-500/30 text-purple-300 rounded font-bold">
                      DROP
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium truncate mt-0.5">
                  {scene.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
        {/* Play/Pause & Time Display */}
        <div className="flex items-center gap-3">
          <button
            onClick={onPlayPause}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#4DA6FF] to-[#7C5CFF] text-slate-950 flex items-center justify-center font-bold shadow-[0_0_20px_rgba(77,166,255,0.4)] hover:brightness-110 active:scale-95 transition"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-slate-950" />
            ) : (
              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
            )}
          </button>

          <button
            onClick={() => onSeek(0)}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Reset to 0:00"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="font-mono text-sm tracking-tight text-white flex items-center gap-1">
            <span className="text-[#4DA6FF] font-bold">{currentTime.toFixed(2)}s</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{TOTAL_DURATION.toFixed(2)}s</span>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 rounded-lg p-0.5 border border-slate-800 text-xs font-mono">
            {[0.5, 1, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`px-1.5 py-0.5 rounded ${
                  playbackSpeed === speed
                    ? 'bg-[#4DA6FF] text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Audio & Display Toggles */}
        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            className={`p-2 rounded-lg border flex items-center gap-1.5 text-xs transition ${
              audioSettings.music
                ? 'bg-blue-950/60 border-[#4DA6FF]/60 text-[#4DA6FF]'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title="Toggle Synthesizer Music"
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Music</span>
          </button>

          {/* Voiceover Toggle */}
          <button
            onClick={onToggleVoiceover}
            className={`p-2 rounded-lg border flex items-center gap-1.5 text-xs transition ${
              audioSettings.voiceover
                ? 'bg-purple-950/60 border-[#7C5CFF]/60 text-[#7C5CFF]'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title="Toggle Voiceover Audio"
          >
            {audioSettings.voiceover ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Voiceover</span>
          </button>

          {/* Captions Toggle */}
          <button
            onClick={onToggleCaptions}
            className={`p-2 rounded-lg border flex items-center gap-1.5 text-xs transition ${
              showCaptions
                ? 'bg-emerald-950/60 border-[#39D98A]/60 text-[#39D98A]'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title="Toggle On-Screen Captions"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Captions</span>
          </button>

          {/* Production Notes */}
          <button
            onClick={onOpenNotes}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition"
            title="View Prompts & Voiceover Script"
          >
            <FileText className="w-3.5 h-3.5 text-[#4DA6FF]" />
            <span className="hidden md:inline">Prompts &amp; Script</span>
          </button>

          {/* Video Export Button */}
          <button
            onClick={onOpenExporter}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#4DA6FF] to-[#7C5CFF] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(77,166,255,0.4)] hover:brightness-110 active:scale-95 transition"
          >
            <Film className="w-4 h-4 fill-slate-950" />
            <span>Export 9:16 Video</span>
          </button>
        </div>
      </div>
    </div>
  );
};
