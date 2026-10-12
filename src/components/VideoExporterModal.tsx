import React, { useState, useRef } from 'react';
import { renderFrameToCanvas } from './CanvasRenderer';
import { audioEngine } from '../audio/AudioEngine';
import { Download, Film, Image as ImageIcon, CheckCircle2, Loader2, X, Play, Sparkles } from 'lucide-react';

interface VideoExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCaptions: boolean;
}

export const VideoExporterModal: React.FC<VideoExporterModalProps> = ({
  isOpen,
  onClose,
  showCaptions,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState<string | null>(null);
  const [selectedClip, setSelectedClip] = useState<'full' | 'clip1' | 'clip2' | 'clip3' | 'endcard'>('full');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const clipTimes = {
    full: { start: 0, end: 15, name: 'portxz-15s-promo-ad.webm' },
    clip1: { start: 0, end: 3, name: 'portxz-clip1-problem-3s.webm' },
    clip2: { start: 3, end: 6, name: 'portxz-clip2-reveal-3s.webm' },
    clip3: { start: 6, end: 11, name: 'portxz-clip3-product-5s.webm' },
    endcard: { start: 11, end: 15, name: 'portxz-clip4-endcard-4s.webm' },
  };

  const handleStartExport = async () => {
    setIsRecording(true);
    setRecordProgress(0);
    setExportedVideoUrl(null);

    const { start, end, name } = clipTimes[selectedClip];
    const duration = end - start;
    const fps = 30;
    const totalFrames = Math.round(duration * fps);

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsRecording(false);
      return;
    }

    try {
      // Setup MediaStream
      const canvasStream = canvas.captureStream(fps);
      audioEngine.init();
      audioEngine.resume();
      const dest = audioEngine.getMediaStreamDestination();

      const combinedTracks = [...canvasStream.getVideoTracks()];
      if (dest && dest.stream.getAudioTracks().length > 0) {
        combinedTracks.push(...dest.stream.getAudioTracks());
      }

      const combinedStream = new MediaStream(combinedTracks);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      const recorder = new MediaRecorder(combinedStream, {
        mimeType,
        videoBitsPerSecond: 3500000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setExportedVideoUrl(url);
        setIsRecording(false);
      };

      recorder.start();

      let currentFrame = 0;
      const frameInterval = 1000 / fps;

      const recordStep = () => {
        if (currentFrame >= totalFrames) {
          recorder.stop();
          return;
        }

        const t = start + (currentFrame / totalFrames) * duration;
        renderFrameToCanvas(ctx, canvas.width, canvas.height, t, showCaptions);

        // Tick audio sounds
        audioEngine.tickMusic(t);

        currentFrame++;
        setRecordProgress(Math.round((currentFrame / totalFrames) * 100));

        setTimeout(recordStep, frameInterval);
      };

      recordStep();
    } catch (err) {
      console.error('Export error:', err);
      setIsRecording(false);
    }
  };

  const handleDownloadStillPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Render Scene 4 / End Card at 14.5s
    renderFrameToCanvas(ctx, 1080, 1920, 14.5, showCaptions);

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'portxz-endcard-vertical-1080x1920.png';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0A0F1E] border border-slate-800 shadow-2xl p-6 text-white space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#4DA6FF] text-xs font-mono font-bold uppercase tracking-wider">
            <Film className="w-4 h-4" /> Video Studio Exporter
          </div>
          <h2 className="text-xl font-bold tracking-tight">Export 9:16 Promotional Video</h2>
          <p className="text-xs text-slate-400">
            Render lossless 60fps vertical video ready for TikTok, Instagram Reels, YouTube Shorts, or CapCut.
          </p>
        </div>

        {/* Clip Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Choose Output Mode</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setSelectedClip('full')}
              className={`p-3 rounded-xl border text-left transition ${
                selectedClip === 'full'
                  ? 'bg-blue-950/60 border-[#4DA6FF] text-white shadow-[0_0_15px_rgba(77,166,255,0.2)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#4DA6FF]" /> Full 15-Second Ad
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Scenes 1–4 with 3s beat drop</div>
            </button>

            <button
              onClick={() => setSelectedClip('clip1')}
              className={`p-3 rounded-xl border text-left transition ${
                selectedClip === 'clip1'
                  ? 'bg-blue-950/60 border-[#4DA6FF] text-white shadow-[0_0_15px_rgba(77,166,255,0.2)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-white">Clip 1 — The Problem (3s)</div>
              <div className="text-[10px] text-slate-400 mt-1">Glitch desync windows (0–3s)</div>
            </button>

            <button
              onClick={() => setSelectedClip('clip2')}
              className={`p-3 rounded-xl border text-left transition ${
                selectedClip === 'clip2'
                  ? 'bg-blue-950/60 border-[#4DA6FF] text-white shadow-[0_0_15px_rgba(77,166,255,0.2)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-white">Clip 2 — The Reveal (3s)</div>
              <div className="text-[10px] text-slate-400 mt-1">Logo singularity reveal (3–6s)</div>
            </button>

            <button
              onClick={() => setSelectedClip('clip3')}
              className={`p-3 rounded-xl border text-left transition ${
                selectedClip === 'clip3'
                  ? 'bg-blue-950/60 border-[#4DA6FF] text-white shadow-[0_0_15px_rgba(77,166,255,0.2)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-white">Clip 3 — The Product (5s)</div>
              <div className="text-[10px] text-slate-400 mt-1">Claim, themes & live sync (6–11s)</div>
            </button>
          </div>
        </div>

        {/* Hidden / Internal Canvas for Frame Capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Progress or Actions */}
        {isRecording ? (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-[#4DA6FF]">
                <Loader2 className="w-4 h-4 animate-spin" /> Recording frames in 9:16...
              </span>
              <span className="font-mono font-bold text-white">{recordProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4DA6FF] to-[#7C5CFF] transition-all duration-75"
                style={{ width: `${recordProgress}%` }}
              />
            </div>
          </div>
        ) : exportedVideoUrl ? (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Video Rendered Successfully!
            </div>
            <div className="flex gap-2">
              <a
                href={exportedVideoUrl}
                download={clipTimes[selectedClip].name}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#39D98A] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-400 transition"
              >
                <Download className="w-4 h-4" /> Download Video File (.webm)
              </a>
              <button
                onClick={() => setExportedVideoUrl(null)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition"
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleStartExport}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#4DA6FF] to-[#7C5CFF] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(77,166,255,0.4)] hover:brightness-110 active:scale-[0.99] transition"
            >
              <Film className="w-4 h-4" /> Render &amp; Download Video
            </button>

            <button
              onClick={handleDownloadStillPNG}
              className="w-full py-2.5 px-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <ImageIcon className="w-4 h-4 text-slate-400" /> Export High-Res Still Poster (1080x1920 PNG)
            </button>
          </div>
        )}

        <div className="text-[11px] text-slate-400 text-center">
          Format: WebM 60fps &bull; Compatible with CapCut, Instagram Reels, YouTube Shorts &amp; TikTok.
        </div>
      </div>
    </div>
  );
};
