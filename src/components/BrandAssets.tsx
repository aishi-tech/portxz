import React from 'react';

/**
 * Official Portxz Logo Icon (Blue-to-Purple Rounded Square with white letter "P")
 */
export const PortxzLogo: React.FC<{ size?: number; className?: string; glow?: boolean }> = ({
  size = 64,
  className = '',
  glow = false,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: `${size * 0.24}px`,
        background: 'linear-gradient(135deg, #4DA6FF 0%, #7C5CFF 100%)',
        boxShadow: glow
          ? '0 0 32px rgba(77, 166, 255, 0.75), 0 0 64px rgba(124, 92, 255, 0.5)'
          : '0 4px 16px rgba(0, 0, 0, 0.4)',
      }}
      className={`relative flex items-center justify-center font-extrabold select-none ${className}`}
    >
      <span
        style={{
          fontSize: `${size * 0.58}px`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: 1,
        }}
        className="text-white font-black tracking-tighter drop-shadow-sm transform -translate-y-[1%]"
      >
        P
      </span>
      {/* Gloss overlay */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 55%)',
        }}
      />
    </div>
  );
};

/**
 * Official Portxz Wordmark Badge
 */
export const PortxzWordmark: React.FC<{ scale?: number; className?: string }> = ({
  scale = 1,
  className = '',
}) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#090f1d]/90 border border-slate-800/80 backdrop-blur-md shadow-xl ${className}`}
    >
      <PortxzLogo size={28} />
      <div className="flex items-center text-xl font-bold tracking-tight">
        <span className="text-white font-black">Port</span>
        <span className="text-[#4DA6FF] font-black">xz</span>
      </div>
    </div>
  );
};

/**
 * Terminal Style Portfolio Preview Component
 */
export const TerminalPreview: React.FC<{ className?: string; mini?: boolean }> = ({
  className = '',
  mini = false,
}) => {
  return (
    <div
      className={`w-full rounded-xl bg-[#080d19]/95 border border-slate-800/80 shadow-2xl overflow-hidden font-mono text-left ${className}`}
    >
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0e1628]/90 border-b border-slate-800/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-[10px] text-slate-400 font-mono">visitor@you ~ portfolio</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-[#4DA6FF] font-bold uppercase tracking-wider">
          LIVE
        </span>
      </div>

      {/* Terminal Content */}
      <div className={`p-3.5 text-xs text-slate-300 space-y-2.5 ${mini ? 'text-[10px] p-2 space-y-1.5' : ''}`}>
        <div>
          <span className="text-[#39D98A] font-semibold">visitor@you:~$ </span>
          <span className="text-white">whoami</span>
          <div className="text-slate-400 pl-2 text-[11px] mt-0.5">designer · developer · shipping real things</div>
        </div>

        <div>
          <span className="text-[#39D98A] font-semibold">visitor@you:~$ </span>
          <span className="text-white">resume</span>
          <div className="text-slate-400 pl-2 text-[11px] mt-0.5">view resume | download PDF — always in sync</div>
        </div>

        <div>
          <span className="text-[#39D98A] font-semibold">visitor@you:~$ </span>
          <span className="text-white">sudo hire-me</span>
          <div className="text-[#39D98A] pl-2 text-[11px] mt-0.5 font-medium flex items-center gap-1">
            <span>✓</span> permission granted.
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[#39D98A] font-semibold">visitor@you:~$ </span>
          <span className="w-2 h-4 bg-[#4DA6FF] animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
};

/**
 * ATS Resume PDF Preview Card
 */
export const ResumePreview: React.FC<{ className?: string; mini?: boolean }> = ({
  className = '',
  mini = false,
}) => {
  return (
    <div
      className={`w-full rounded-xl bg-[#0b1322]/95 border border-slate-800/80 shadow-2xl p-3.5 text-left font-sans ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div>
          <div className="text-white font-bold text-xs">Alex Chen, Senior Engineer</div>
          <div className="text-[10px] text-slate-400">alex@portxz.dev · GitHub: alexdev</div>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-[#7C5CFF] font-semibold">
          ATS-OPTIMIZED PDF
        </span>
      </div>

      <div className="space-y-2 text-[10px]">
        <div>
          <div className="text-[#4DA6FF] font-semibold uppercase text-[9px] tracking-wider">Experience</div>
          <div className="text-slate-300 font-medium text-[10px]">Staff Full-Stack Architect @ TechFlow</div>
          <div className="text-slate-400 text-[9px]">Shipped distributed sync engine with 99.99% uptime</div>
        </div>

        <div>
          <div className="text-[#4DA6FF] font-semibold uppercase text-[9px] tracking-wider">Core Skills</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Cloud'].map((sk) => (
              <span key={sk} className="px-1.5 py-0.5 bg-slate-800/80 text-slate-300 rounded text-[8px]">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * GitHub Profile README Preview Card
 */
export const ReadmePreview: React.FC<{ className?: string; mini?: boolean }> = ({
  className = '',
  mini = false,
}) => {
  return (
    <div
      className={`w-full rounded-xl bg-[#0a101d]/95 border border-slate-800/80 shadow-2xl p-3.5 text-left font-sans ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 mb-2">
        <span className="text-slate-400 text-xs font-mono">alexdev / README.md</span>
        <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#39D98A] font-medium">
          SYNCED
        </span>
      </div>

      <div className="space-y-2 text-[10px]">
        <div className="text-white font-semibold flex items-center gap-1.5">
          <span>👋 Hi, I&apos;m Alex — Building developer tools</span>
        </div>
        <div className="p-2 rounded bg-[#0e1628] border border-slate-800/60 font-mono text-[9px] text-slate-300">
          <span className="text-[#39D98A]">const</span> <span className="text-yellow-400">status</span> = &apos;Available for contracts&apos;;
          <br />
          <span className="text-[#7C5CFF]">portfolio</span>: portxz.com/@alex
        </div>
        <div className="flex items-center gap-1">
          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[#4DA6FF] text-[8px]">38 Repos</span>
          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-[#7C5CFF] text-[8px]">1,420 Stars</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#39D98A] text-[8px]">Streak: 142d</span>
        </div>
      </div>
    </div>
  );
};
