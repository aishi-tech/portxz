import React, { useMemo } from 'react';
import { PortxzLogo, PortxzWordmark, TerminalPreview, ResumePreview, ReadmePreview } from './BrandAssets';
import { AlertTriangle, CheckCircle2, RefreshCw, Zap, Sparkles, Terminal, Palette, Flame, ArrowRight, ShieldCheck, Globe, FileText, GitBranch } from 'lucide-react';

interface VideoStageProps {
  currentTime: number; // 0 to 15 seconds
  showCaptions?: boolean;
}

export const VideoStage: React.FC<VideoStageProps> = ({
  currentTime,
  showCaptions = true,
}) => {
  const t = Math.max(0, Math.min(15, currentTime));

  // Determine current scene index (0, 1, 2, 3)
  const sceneIndex = useMemo(() => {
    if (t < 3) return 0;
    if (t < 6) return 1;
    if (t < 11) return 2;
    return 3;
  }, [t]);

  // Captions text logic
  const currentCaption = useMemo(() => {
    if (t < 3) return '3 versions of you. None current.';
    if (t < 6) return 'Meet Portxz.';
    if (t < 11) return 'Edit once → update everywhere';
    return 'Claim your username — free';
  }, [t]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A0F1E] font-sans text-white select-none flex flex-col justify-between">
      {/* Dynamic Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow orb 1 - Electric Blue */}
        <div
          className="absolute rounded-full blur-[90px] transition-all duration-300 pointer-events-none"
          style={{
            width: '320px',
            height: '320px',
            top: t < 3 ? '15%' : t < 6 ? '35%' : t < 11 ? '20%' : '10%',
            left: t < 3 ? '10%' : '20%',
            background:
              t < 3
                ? 'radial-gradient(circle, rgba(255, 77, 109, 0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(77, 166, 255, 0.35) 0%, transparent 70%)',
            transform: `scale(${1 + Math.sin(t * 2) * 0.1})`,
          }}
        />

        {/* Glow orb 2 - Purple */}
        <div
          className="absolute rounded-full blur-[100px] transition-all duration-300 pointer-events-none"
          style={{
            width: '300px',
            height: '300px',
            bottom: '15%',
            right: '5%',
            background:
              t < 3
                ? 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(124, 92, 255, 0.3) 0%, transparent 70%)',
          }}
        />

        {/* Cyber Desk Grid Lines (Scene 1 & 2) */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(77, 166, 255, 0.15) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(77, 166, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            perspective: '600px',
            transform: 'rotateX(40deg) translateY(-20%)',
          }}
        />
      </div>

      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(12)].map((_, i) => {
          const speed = (i % 3) + 1;
          const yPos = (100 - ((t * speed * 12 + i * 18) % 110)) % 100;
          const xPos = (i * 23) % 90 + 5;
          const opacity = Math.sin((t + i) * 1.5) * 0.4 + 0.5;
          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-300 shadow-[0_0_8px_#4DA6FF]"
              style={{
                top: `${yPos}%`,
                left: `${xPos}%`,
                opacity: t >= 3 ? opacity : 0.2,
                transform: `scale(${i % 2 === 0 ? 1.5 : 1})`,
              }}
            />
          );
        })}
      </div>

      {/* Top Header Bar (App branding watermark / Timecode) */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-5 pb-2">
        <div className="flex items-center gap-2">
          <PortxzLogo size={24} />
          <span className="font-extrabold text-sm tracking-tight">
            Port<span className="text-[#4DA6FF]">xz</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300 font-mono backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39D98A] animate-pulse" />
          <span>SCENE 0{sceneIndex + 1}</span>
          <span className="text-slate-500">|</span>
          <span className="text-[#4DA6FF] font-semibold">{t.toFixed(1)}s</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 1 (0.0s - 3.0s): The Desync Nightmare */}
      {/* ======================================================== */}
      {t < 3 && (
        <div className="relative flex-1 flex flex-col items-center justify-center px-4 z-20 overflow-hidden">
          {/* Alarming Red Warning Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse"
            style={{
              transform: `translateY(${Math.sin(t * 10) * 2}px)`,
            }}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>OUT OF SYNC DETECTED</span>
          </div>

          {/* 3 Glitching Floating Windows on Dark Desk Setup */}
          <div className="relative w-full max-w-[320px] h-[360px] flex items-center justify-center">
            {/* Window 1: Outdated Portfolio (Tilted Left) */}
            <div
              className="absolute w-[240px] rounded-lg bg-[#0d1527]/90 border border-red-500/40 shadow-[0_8px_30px_rgba(239,68,68,0.2)] p-2.5 backdrop-blur-md transition-transform"
              style={{
                top: '10px',
                left: '10px',
                transform: `rotate(-7deg) scale(0.92) translate(${Math.sin(t * 14) * 3}px, ${Math.cos(t * 12) * 2}px)`,
                filter: t % 0.4 < 0.08 ? 'hue-rotate(90deg) contrast(150%)' : 'none',
              }}
            >
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-red-500/30">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                </div>
                <span className="text-[9px] text-red-400 font-mono flex items-center gap-0.5">
                  <AlertTriangle className="w-2.5 h-2.5" /> 2021 Portfolio
                </span>
              </div>
              <div className="text-[10px] text-slate-300 space-y-1">
                <div className="font-bold text-white">Alex Chen &bull; Web Dev</div>
                <div className="text-[9px] text-slate-400 line-through">Stacks: jQuery, PHP 5, CSS2</div>
                <div className="text-[8px] text-red-400 bg-red-950/60 p-1 rounded font-mono">
                  ⚠ Error: Last modified 892 days ago
                </div>
              </div>
            </div>

            {/* Window 2: Outdated Resume Document (Tilted Right) */}
            <div
              className="absolute w-[230px] rounded-lg bg-[#0e1726]/90 border border-amber-500/40 shadow-[0_8px_30px_rgba(245,158,11,0.2)] p-2.5 backdrop-blur-md transition-transform"
              style={{
                top: '90px',
                right: '10px',
                transform: `rotate(6deg) scale(0.95) translate(${Math.cos(t * 15) * 3}px, ${Math.sin(t * 11) * 2}px)`,
              }}
            >
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-amber-500/30">
                <div className="flex items-center gap-1 text-[9px] text-amber-300 font-mono">
                  <FileText className="w-2.5 h-2.5" /> Resume_v4_FINAL_2.pdf
                </div>
                <span className="text-[8px] px-1 bg-amber-500/20 text-amber-400 rounded">DESYNC</span>
              </div>
              <div className="text-[9px] space-y-1 text-slate-300">
                <div className="text-white font-semibold">Missing 3 Recent Jobs</div>
                <div className="text-slate-400 text-[8px]">Projects section empty &bull; Old phone number</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[45%]" />
                </div>
              </div>
            </div>

            {/* Window 3: Stale GitHub README (Bottom Center) */}
            <div
              className="absolute w-[250px] rounded-lg bg-[#070b14]/95 border border-red-500/50 shadow-[0_12px_40px_rgba(239,68,68,0.3)] p-2.5 backdrop-blur-md transition-transform"
              style={{
                bottom: '20px',
                transform: `rotate(-2deg) scale(0.98) translate(${Math.sin(t * 18) * 4}px, 0)`,
                filter: t % 0.6 < 0.1 ? 'invert(15%)' : 'none',
              }}
            >
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono">
                  <GitBranch className="w-2.5 h-2.5 text-red-400" /> alexdev / README.md
                </div>
                <span className="text-[8px] px-1 bg-red-500/20 text-red-400 rounded font-mono animate-pulse">
                  ⚠ 404 STALE
                </span>
              </div>
              <div className="text-[9px] text-slate-300 space-y-1">
                <div className="text-red-300 font-mono"># Hi there 👋 (TODO: update this)</div>
                <div className="text-[8px] text-slate-500">Pinned repo &quot;todo-app&quot; from 2019</div>
                <div className="flex gap-1 text-[7px] text-red-400 font-mono">
                  <span className="px-1 py-0.5 bg-red-950/70 border border-red-500/40 rounded">
                    commits: 0 in 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Glitch Scanline Laser */}
            <div
              className="absolute inset-x-0 h-1 bg-red-500/70 shadow-[0_0_15px_#EF4444] pointer-events-none"
              style={{
                top: `${(t * 70) % 100}%`,
                opacity: 0.8,
              }}
            />
          </div>

          <div className="text-center mt-3 text-xs text-red-300 font-mono tracking-wide">
            Portfolio &bull; Resume &bull; README out of sync
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 2 (3.0s - 6.0s): The Reveal & Singularity */}
      {/* ======================================================== */}
      {t >= 3 && t < 6 && (
        <div className="relative flex-1 flex flex-col items-center justify-center px-4 z-20 overflow-hidden">
          {/* Relative time in scene 2: 0 to 3s */}
          {(() => {
            const st = t - 3; // 0 to 3
            // In first 0.8s: implosion / suction collapsing inward
            // At 0.8s+: explosion of light and massive push in of the "P" logo
            const isImploding = st < 0.7;
            const implosionScale = Math.max(0.01, 1 - st * 1.4);
            const revealScale = isImploding ? 0.3 : Math.min(1.4, 0.6 + (st - 0.7) * 0.45);
            const shockwaveSize = Math.max(0, (st - 0.7) * 350);

            return (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Collapsing Ghost Windows during suction */}
                {isImploding && (
                  <div
                    className="absolute transition-transform duration-75 flex items-center justify-center"
                    style={{
                      transform: `scale(${implosionScale}) rotate(${st * 240}deg)`,
                      filter: 'blur(3px) brightness(200%)',
                    }}
                  >
                    <div className="w-32 h-20 bg-blue-500/50 rounded-lg border border-blue-300 absolute -top-8 -left-12" />
                    <div className="w-32 h-20 bg-purple-500/50 rounded-lg border border-purple-300 absolute top-8 right-4" />
                    <div className="w-28 h-16 bg-cyan-400/50 rounded-lg border border-cyan-200 absolute -bottom-10 left-4" />
                  </div>
                )}

                {/* Beat Drop Shockwave Rings */}
                {st >= 0.7 && (
                  <>
                    <div
                      className="absolute rounded-full border-4 border-[#4DA6FF] pointer-events-none"
                      style={{
                        width: `${shockwaveSize}px`,
                        height: `${shockwaveSize}px`,
                        opacity: Math.max(0, 1 - (st - 0.7) / 1.5),
                        boxShadow: '0 0 50px #4DA6FF, inset 0 0 30px #7C5CFF',
                      }}
                    />
                    <div
                      className="absolute rounded-full border-2 border-[#7C5CFF] pointer-events-none"
                      style={{
                        width: `${shockwaveSize * 1.3}px`,
                        height: `${shockwaveSize * 1.3}px`,
                        opacity: Math.max(0, 1 - (st - 0.7) / 1.8),
                      }}
                    />
                  </>
                )}

                {/* Massive Blue Light Flash Burst at drop */}
                {st >= 0.7 && st < 1.4 && (
                  <div
                    className="absolute inset-0 bg-[#4DA6FF]/30 blur-2xl pointer-events-none transition-opacity duration-300"
                    style={{
                      opacity: Math.max(0, 1 - (st - 0.7) * 1.4),
                    }}
                  />
                )}

                {/* Radiant Hero Logo Pushing In */}
                <div
                  className="relative z-30 flex flex-col items-center justify-center transition-transform"
                  style={{
                    transform: `scale(${revealScale}) translateY(${Math.sin(st * 3) * 6}px)`,
                  }}
                >
                  <PortxzLogo size={130} glow={true} />

                  <div className="mt-8 flex items-center text-3xl font-black tracking-tight drop-shadow-xl">
                    <span className="text-white">Port</span>
                    <span className="text-[#4DA6FF]">xz</span>
                  </div>

                  <div className="mt-3 px-4 py-1.5 rounded-full bg-[#4DA6FF]/15 border border-[#4DA6FF]/40 text-[#4DA6FF] text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_20px_rgba(77,166,255,0.3)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ONE PROFILE &bull; INFINITE SYNC</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 3 (6.0s - 11.0s): The Sync Engine in Action */}
      {/* ======================================================== */}
      {t >= 6 && t < 11 && (
        <div className="relative flex-1 flex flex-col items-center justify-start px-4 pt-3 z-20 overflow-hidden">
          {(() => {
            const st = t - 6; // 0 to 5s

            // Sub-phases:
            // 0 - 1.5s: Step 1 - Claim username with typing & checkmark
            // 1.5 - 3.2s: Step 2 - Dynamic Theme Switcher (Terminal, Black&Gold, Aurora)
            // 3.2 - 5.0s: Step 3 - Triple Screen Sync in real-time
            const isPhase1 = st < 1.5;
            const isPhase2 = st >= 1.5 && st < 3.2;
            const isPhase3 = st >= 3.2;

            return (
              <div className="w-full flex flex-col items-center justify-center h-full max-w-[340px]">
                {/* Mini Step Indicator Pill */}
                <div className="flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPhase1 ? 'bg-[#39D98A] shadow-[0_0_8px_#39D98A]' : 'bg-slate-600'
                    }`}
                  />
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPhase2 ? 'bg-[#7C5CFF] shadow-[0_0_8px_#7C5CFF]' : 'bg-slate-600'
                    }`}
                  />
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPhase3 ? 'bg-[#4DA6FF] shadow-[0_0_8px_#4DA6FF]' : 'bg-slate-600'
                    }`}
                  />
                  <span className="ml-1 text-[10px] font-mono uppercase text-slate-400">
                    {isPhase1 ? '01 Claim Profile' : isPhase2 ? '02 Instant Themes' : '03 3-Way Live Sync'}
                  </span>
                </div>

                {/* PHASE 1: Username Field + Flying Project Cards */}
                {isPhase1 && (
                  <div className="w-full space-y-3 animate-fadeIn">
                    <div className="p-3.5 rounded-xl bg-[#090f1e]/95 border border-[#4DA6FF]/40 shadow-[0_0_25px_rgba(77,166,255,0.15)] backdrop-blur-md">
                      <div className="text-[10px] text-slate-400 font-mono mb-1">CLAIM YOUR PORTXZ HANDLE</div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#0e1628] border border-slate-700/80">
                        <div className="flex items-center font-mono text-xs">
                          <span className="text-slate-500">portxz.com/@</span>
                          <span className="text-white font-bold">
                            {st < 0.6 ? 'al' : st < 1.0 ? 'alex' : 'alexdev'}
                          </span>
                          <span className="w-1.5 h-3.5 bg-[#4DA6FF] ml-0.5 animate-pulse inline-block" />
                        </div>
                        {st >= 1.0 && (
                          <div className="flex items-center gap-1 text-[10px] text-[#39D98A] font-semibold bg-[#39D98A]/10 px-2 py-0.5 rounded-full border border-[#39D98A]/30">
                            <CheckCircle2 className="w-3 h-3" /> Available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Flying Project Cards */}
                    <div className="space-y-2">
                      <div
                        className="p-2.5 rounded-lg bg-[#0e182e]/90 border border-slate-800 flex items-center justify-between transition-all"
                        style={{
                          transform: `translateX(${Math.max(0, (1 - st * 2) * 50)}px)`,
                          opacity: Math.min(1, st * 2),
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-blue-500/20 text-[#4DA6FF] flex items-center justify-center font-bold text-xs">
                            AI
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Motion Video Studio</div>
                            <div className="text-[9px] text-slate-400">Next.js &bull; WebGL &bull; 9.4k stars</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#39D98A] font-mono">
                          Imported
                        </span>
                      </div>

                      <div
                        className="p-2.5 rounded-lg bg-[#0e182e]/90 border border-slate-800 flex items-center justify-between transition-all"
                        style={{
                          transform: `translateX(${Math.max(0, (1 - (st - 0.3) * 2) * 60)}px)`,
                          opacity: Math.min(1, Math.max(0, (st - 0.3) * 2)),
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-purple-500/20 text-[#7C5CFF] flex items-center justify-center font-bold text-xs">
                            ⚡
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">HyperScale Sync Engine</div>
                            <div className="text-[9px] text-slate-400">Rust &bull; Distributed State</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#39D98A] font-mono">
                          Imported
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PHASE 2: Instant Theme Switcher Morphing */}
                {isPhase2 && (
                  <div className="w-full space-y-2.5 animate-fadeIn">
                    {/* Theme Selector Tabs */}
                    {(() => {
                      const themeProgress = (st - 1.5) / 1.7; // 0 to 1
                      const activeTheme = themeProgress < 0.33 ? 0 : themeProgress < 0.66 ? 1 : 2;

                      return (
                        <>
                          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-[10px]">
                            <div
                              className={`py-1 rounded-lg text-center font-mono flex items-center justify-center gap-1 transition-all ${
                                activeTheme === 0
                                  ? 'bg-emerald-950/80 text-[#39D98A] border border-[#39D98A]/50 font-bold shadow-[0_0_10px_rgba(57,217,138,0.3)]'
                                  : 'text-slate-500'
                              }`}
                            >
                              <Terminal className="w-3 h-3" /> Terminal
                            </div>
                            <div
                              className={`py-1 rounded-lg text-center flex items-center justify-center gap-1 transition-all ${
                                activeTheme === 1
                                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                                  : 'text-slate-500'
                              }`}
                            >
                              <Palette className="w-3 h-3" /> Luxury
                            </div>
                            <div
                              className={`py-1 rounded-lg text-center flex items-center justify-center gap-1 transition-all ${
                                activeTheme === 2
                                  ? 'bg-purple-950/80 text-purple-300 border border-purple-500/50 font-bold shadow-[0_0_10px_rgba(124,92,255,0.3)]'
                                  : 'text-slate-500'
                              }`}
                            >
                              <Flame className="w-3 h-3" /> Aurora
                            </div>
                          </div>

                          {/* Theme 1: Terminal Style */}
                          {activeTheme === 0 && <TerminalPreview />}

                          {/* Theme 2: Black & Gold Luxury Style */}
                          {activeTheme === 1 && (
                            <div className="w-full rounded-xl bg-[#080808] border border-amber-500/40 p-4 shadow-[0_0_30px_rgba(245,158,11,0.2)] text-left">
                              <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                                CURATED PORTFOLIO
                              </div>
                              <div className="text-lg font-serif text-amber-100 font-bold mt-1">
                                Alex Chen &bull; Principal Architect
                              </div>
                              <div className="text-[11px] text-stone-400 mt-1 italic">
                                Crafting resilient distributed systems with elegance.
                              </div>
                              <div className="mt-3 flex gap-2">
                                <span className="px-2 py-0.5 rounded border border-amber-500/40 text-amber-300 text-[9px]">
                                  Selected Works (14)
                                </span>
                                <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-bold text-[9px]">
                                  Contact Me
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Theme 3: Aurora Neon Gradient Style */}
                          {activeTheme === 2 && (
                            <div className="w-full rounded-xl bg-gradient-to-br from-[#120a2e] to-[#061834] border border-[#7C5CFF]/60 p-4 shadow-[0_0_35px_rgba(124,92,255,0.3)] text-left">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-[#4DA6FF] font-bold text-[9px]">
                                  AURORA ENGINE
                                </span>
                                <span className="text-[10px] text-purple-300">Live 99.9%</span>
                              </div>
                              <div className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4DA6FF] via-[#7C5CFF] to-pink-400 mt-2">
                                Building the Future of Developer Platforms
                              </div>
                              <div className="text-[10px] text-slate-300 mt-1">
                                142k monthly readers &bull; Featured in Hacker News
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* PHASE 3: Triple Screen Synchronized Update at the Same Instant */}
                {isPhase3 && (
                  <div className="w-full space-y-2 animate-fadeIn relative">
                    {/* Live Sync Banner */}
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-[#39D98A]/60 text-[#39D98A] text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(57,217,138,0.25)]">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#39D98A] animate-bounce" />
                        <span>SYNCHRONIZED IN 12ms</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-900/60 px-1.5 py-0.5 rounded">
                        ALL 3 CHANNELS LIVE
                      </span>
                    </div>

                    {/* Three Screens Side by Side */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {/* Screen 1: Web Portfolio */}
                      <div className="p-2 rounded-lg bg-[#0a1224] border border-[#4DA6FF]/60 shadow-lg text-left">
                        <div className="flex items-center gap-1 mb-1 pb-1 border-b border-slate-800">
                          <Globe className="w-2.5 h-2.5 text-[#4DA6FF]" />
                          <span className="text-[8px] font-bold text-white">PORTFOLIO</span>
                        </div>
                        <div className="text-[8px] text-slate-300 space-y-0.5 font-mono">
                          <div className="text-[#39D98A]">✓ Live Web</div>
                          <div className="text-slate-400">Custom domain</div>
                          <div className="w-full bg-[#4DA6FF]/30 h-1 rounded mt-1" />
                        </div>
                      </div>

                      {/* Screen 2: ATS Resume PDF */}
                      <div className="p-2 rounded-lg bg-[#0a1224] border border-[#7C5CFF]/60 shadow-lg text-left">
                        <div className="flex items-center gap-1 mb-1 pb-1 border-b border-slate-800">
                          <FileText className="w-2.5 h-2.5 text-[#7C5CFF]" />
                          <span className="text-[8px] font-bold text-white">RESUME PDF</span>
                        </div>
                        <div className="text-[8px] text-slate-300 space-y-0.5 font-mono">
                          <div className="text-[#7C5CFF]">✓ ATS Ready</div>
                          <div className="text-slate-400">PDF compiled</div>
                          <div className="w-full bg-[#7C5CFF]/30 h-1 rounded mt-1" />
                        </div>
                      </div>

                      {/* Screen 3: GitHub README */}
                      <div className="p-2 rounded-lg bg-[#0a1224] border border-[#39D98A]/60 shadow-lg text-left">
                        <div className="flex items-center gap-1 mb-1 pb-1 border-b border-slate-800">
                          <GitBranch className="w-2.5 h-2.5 text-[#39D98A]" />
                          <span className="text-[8px] font-bold text-white">README.md</span>
                        </div>
                        <div className="text-[8px] text-slate-300 space-y-0.5 font-mono">
                          <div className="text-[#39D98A]">✓ Auto-Committed</div>
                          <div className="text-slate-400">Stats dynamic</div>
                          <div className="w-full bg-[#39D98A]/30 h-1 rounded mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Sync Laser Ripple Across Screens */}
                    <div
                      className="h-1 rounded-full bg-gradient-to-r from-[#4DA6FF] via-[#39D98A] to-[#7C5CFF] shadow-[0_0_15px_#39D98A] animate-pulse"
                      style={{
                        transform: `scaleX(${Math.min(1, (st - 3.2) * 2)})`,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 4 (11.0s - 15.0s): High-Converting End Card */}
      {/* (Exact match to banner-vertical.png with slow cinematic push-in) */}
      {/* ======================================================== */}
      {t >= 11 && (
        <div className="relative flex-1 flex flex-col items-center justify-between px-5 pt-3 pb-4 z-20 overflow-hidden text-center">
          {(() => {
            const st = t - 11; // 0 to 4s
            // Slow cinematic push in (scale 1.0 to 1.06)
            const zoom = 1.0 + (st / 4) * 0.06;

            return (
              <div
                className="w-full h-full flex flex-col items-center justify-between transition-transform duration-100"
                style={{
                  transform: `scale(${zoom})`,
                }}
              >
                {/* 1. Wordmark Header */}
                <div className="flex items-center gap-2">
                  <PortxzLogo size={36} glow={true} />
                  <div className="text-2xl font-black tracking-tight">
                    <span className="text-white">Port</span>
                    <span className="text-[#4DA6FF]">xz</span>
                  </div>
                </div>

                {/* 2. Launch Offer Capsule */}
                <div className="px-3.5 py-1 rounded-full bg-[#0a1824]/90 border border-[#39D98A]/50 text-[#39D98A] text-[11px] font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(57,217,138,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39D98A] animate-ping" />
                  <span>Launch offer — Pro for ₹49 &bull; first 50 users</span>
                </div>

                {/* 3. Hero Statement Typography */}
                <div className="space-y-1 my-1">
                  <div className="text-3xl font-black tracking-tight leading-tight text-white">
                    One profile.
                  </div>
                  <div className="text-3xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4DA6FF] to-[#7C5CFF]">
                    Portfolio, resume
                  </div>
                  <div className="text-3xl font-black tracking-tight leading-tight text-white">
                    &amp; README
                  </div>
                  <div className="text-3xl font-black tracking-tight leading-tight text-white">
                    always in sync.
                  </div>

                  <p className="text-xs text-slate-300 font-normal max-w-[280px] mx-auto mt-2 leading-relaxed">
                    Edit once — your portfolio, resume PDF, and GitHub README update instantly.
                  </p>
                </div>

                {/* 4. Mini Terminal Preview Card (Matching banner-vertical) */}
                <div className="w-full max-w-[280px]">
                  <TerminalPreview mini={true} />
                </div>

                {/* 5. High-Converting CTA Button */}
                <div className="w-full max-w-[280px] space-y-1.5">
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#4DA6FF] to-[#7C5CFF] opacity-75 blur-md animate-pulse" />
                    <button className="relative w-full py-3 px-6 rounded-xl bg-[#4DA6FF] text-slate-950 font-black text-sm tracking-wide shadow-2xl flex items-center justify-center gap-2 border border-blue-300/40 transform active:scale-95 transition-all">
                      <span>Claim your username — free</span>
                      <ArrowRight className="w-4 h-4 text-slate-950 font-bold" />
                    </button>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono">
                    live in 3 minutes &bull; free plan forever
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ======================================================== */}
      {/* CAPTION OVERLAY BAR (CapCut / TikTok Style) */}
      {/* ======================================================== */}
      {showCaptions && (
        <div className="relative z-30 px-4 pb-4 pt-1 pointer-events-none flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black/85 border border-white/20 text-white font-extrabold text-xs shadow-2xl backdrop-blur-md tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#4DA6FF] animate-pulse" />
            <span className="drop-shadow-md">{currentCaption}</span>
          </div>
        </div>
      )}
    </div>
  );
};
