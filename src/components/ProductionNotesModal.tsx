import React, { useState } from 'react';
import { SCENES } from '../types';
import { Copy, Check, FileText, Sparkles, Volume2, Palette, X, ExternalLink } from 'lucide-react';

interface ProductionNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTime: number;
}

export const ProductionNotesModal: React.FC<ProductionNotesModalProps> = ({
  isOpen,
  onClose,
  currentTime,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fullPrompt = `Create a 15-second vertical (9:16) promotional ad for "Portxz", a SaaS web app that turns one profile into a live portfolio website, an ATS resume PDF, and a GitHub README that always stay in sync.

Visual style: sleek modern tech ad, dark navy background (#0A0F1E), glowing electric blue (#4DA6FF) and purple (#7C5CFF) light, soft green (#39D98A) accents, glassy UI cards, smooth camera moves, fast energetic cuts, cinematic lighting, high detail, no people's faces.

Scene 1 (0–3s): Three floating browser windows on a dark desk setup — an old portfolio site, a resume document, and a code README. They flicker and glitch out of sync, red warning glow.

Scene 2 (3–6s): The three windows get pulled together and collapse into a single glowing blue-purple rounded-square logo with a white letter "P". Burst of blue light, camera pushes in.

Scene 3 (6–11s): Fast cuts of a clean dark dashboard UI: a username field with a green checkmark, project cards flying in, a portfolio page switching between different design themes (terminal style, black-and-gold, glowing gradient), then three screens side by side updating at the same moment.

Scene 4 (11–15s): The three screens settle into a clean end card on the dark navy background with the glowing "P" logo centered and a bright blue button below it. Slow push-in, soft particle glow.

Audio: upbeat modern electronic music, beat drop at second 3.
Voiceover (confident, friendly male or female voice): "Portfolio, resume, README — all out of date? Meet Portxz. One profile. Edit once — your portfolio, resume PDF, and GitHub README update together. Live in three minutes. Start free — Pro just 49 rupees for the first 50 users."`;

  const voiceoverFull = `Portfolio, resume, README — all out of date? Meet Portxz. One profile. Edit once — your portfolio, resume PDF, and GitHub README update together. Live in three minutes. Start free — Pro just 49 rupees for the first 50 users.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[88vh] rounded-2xl bg-[#0A0F1E] border border-slate-800 shadow-2xl p-6 text-white flex flex-col space-y-5 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#4DA6FF] text-xs font-mono font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" /> Production Brief &amp; AI Prompts
          </div>
          <h2 className="text-xl font-bold tracking-tight">Portxz 15-Second Ad Blueprint</h2>
          <p className="text-xs text-slate-400">
            Copy prompts, script, voiceover lines, captions, and brand design tokens.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs">
          {/* 1. Voiceover Script with Scene Cues */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Volume2 className="w-4 h-4 text-[#4DA6FF]" /> Voiceover Script (15s)
              </div>
              <button
                onClick={() => copyToClipboard(voiceoverFull, 'vo')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1.5 transition"
              >
                {copiedKey === 'vo' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'vo' ? 'Copied' : 'Copy Voiceover'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {SCENES.map((scene) => {
                const isActive = currentTime >= scene.startTime && currentTime < scene.endTime;
                return (
                  <div
                    key={scene.id}
                    className={`p-2.5 rounded-lg border transition ${
                      isActive
                        ? 'bg-blue-950/60 border-[#4DA6FF] text-white shadow-[0_0_15px_rgba(77,166,255,0.2)]'
                        : 'bg-[#0e1628]/60 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>
                        SCENE 0{scene.number} ({scene.startTime}s - {scene.endTime}s) &bull; {scene.name}
                      </span>
                      {isActive && <span className="text-[#39D98A] font-bold">● CURRENT</span>}
                    </div>
                    <div className="text-xs font-medium text-white italic">
                      &quot;{scene.voiceover}&quot;
                    </div>
                    <div className="text-[10px] text-[#4DA6FF] mt-1 font-semibold">
                      Caption: {scene.caption}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. CapCut On-Screen Captions */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> High-Impact On-Screen Captions
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800">
                <div className="text-[10px] text-slate-500 font-mono">0–3s</div>
                <div className="text-white font-bold text-xs mt-1">3 versions of you. None current.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800">
                <div className="text-[10px] text-slate-500 font-mono">6–11s</div>
                <div className="text-[#4DA6FF] font-bold text-xs mt-1">Edit once → update everywhere</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800">
                <div className="text-[10px] text-slate-500 font-mono">11–15s</div>
                <div className="text-[#39D98A] font-bold text-xs mt-1">Claim your username — free</div>
              </div>
            </div>
          </div>

          {/* 3. Brand Color Palette Tokens */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#39D98A]" /> Brand Color Tokens
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#0A0F1E] border border-slate-700">
                <div className="w-full h-5 rounded bg-[#0A0F1E] border border-slate-600 mb-1" />
                <div className="font-mono text-[10px] text-white">#0A0F1E</div>
                <div className="text-[9px] text-slate-400">Dark Navy</div>
              </div>
              <div className="p-2 rounded-lg bg-[#0e1628] border border-slate-700">
                <div className="w-full h-5 rounded bg-[#4DA6FF] mb-1" />
                <div className="font-mono text-[10px] text-white">#4DA6FF</div>
                <div className="text-[9px] text-slate-400">Electric Blue</div>
              </div>
              <div className="p-2 rounded-lg bg-[#0e1628] border border-slate-700">
                <div className="w-full h-5 rounded bg-[#7C5CFF] mb-1" />
                <div className="font-mono text-[10px] text-white">#7C5CFF</div>
                <div className="text-[9px] text-slate-400">Purple Violet</div>
              </div>
              <div className="p-2 rounded-lg bg-[#0e1628] border border-slate-700">
                <div className="w-full h-5 rounded bg-[#39D98A] mb-1" />
                <div className="font-mono text-[10px] text-white">#39D98A</div>
                <div className="text-[9px] text-slate-400">Soft Neon Green</div>
              </div>
            </div>
          </div>

          {/* 4. Full AI Prompt Copy */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-white text-sm">Full 15-Second Master Prompt</div>
              <button
                onClick={() => copyToClipboard(fullPrompt, 'prompt')}
                className="px-2.5 py-1 rounded-lg bg-[#4DA6FF]/20 text-[#4DA6FF] hover:bg-[#4DA6FF]/30 font-semibold text-[11px] flex items-center gap-1.5 transition"
              >
                {copiedKey === 'prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'prompt' ? 'Copied!' : 'Copy Full Prompt'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-black/60 border border-slate-800 text-slate-300 text-[10px] font-mono leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
              {fullPrompt}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
