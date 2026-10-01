import React from 'react';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({
  isOpen,
  onClose,
  onGetStarted,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#131722] border border-[#2a2e39] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Mission Archive</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-5 no-scrollbar text-sm leading-relaxed">
          {/* Astronaut Visual Lockup */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#182138] to-[#0c0f17] p-6 border border-blue-500/20 text-center flex flex-col items-center">
            {/* Space Avatar SVG */}
            <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-blue-400/40 p-1 shadow-2xl mb-3">
              <svg className="w-full h-full rounded-full" viewBox="0 0 80 80">
                <rect width="80" height="80" fill="#0f172a" />
                <circle cx="40" cy="30" r="18" fill="#e2e8f0" />
                <path d="M12 76 C12 52, 28 48, 40 48 C52 48, 68 52, 68 76 Z" fill="#1e293b" />
                <rect x="25" y="58" width="10" height="8" rx="2" fill="#3b82f6" />
                <rect x="45" y="58" width="10" height="8" rx="2" fill="#ef4444" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Lt. Col. Scott "Kidd" Poteet</h2>
            <p className="text-xs text-blue-400 font-medium">Polaris Dawn Mission Pilot & Active Investor</p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">Tracking Markets From Low Earth Orbit</h3>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              When humanity reaches outward into the stars, commerce, communication, and free market discovery follow. During the historic Polaris Dawn flight—reaching over 1,400 kilometers above the Earth—mission pilot Scott "Kidd" Poteet highlighted how digital financial infrastructure connects people across every coordinate on the globe.
            </p>
            <blockquote className="p-3.5 bg-blue-600/10 border-l-2 border-blue-500 rounded-r-lg text-xs text-zinc-200 italic my-3">
              "Whether navigating supersonic flight paths in the Air Force or tracking macroeconomic trends from orbit, having high-fidelity, real-time data at your fingertips is paramount. TradingView is the cockpit for millions of traders worldwide."
            </blockquote>
          </div>

          {/* Mission Telemetry Stats */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-[#1e222d] p-2.5 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">Apogee Altitude</span>
              <span className="text-sm font-bold text-white font-mono">1,400 km</span>
            </div>
            <div className="bg-[#1e222d] p-2.5 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">Orbital Velocity</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">27,500 km/h</span>
            </div>
            <div className="bg-[#1e222d] p-2.5 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">Global Traders</span>
              <span className="text-sm font-bold text-blue-400 font-mono">100M+</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-[#2a2e39] bg-black/30 flex items-center justify-between">
          <span className="text-xs text-zinc-400">Join the journey</span>
          <button
            onClick={() => {
              onClose();
              onGetStarted();
            }}
            className="get-started-gradient text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg hover:brightness-110 transition cursor-pointer"
          >
            Get started for free
          </button>
        </div>
      </div>
    </div>
  );
};
