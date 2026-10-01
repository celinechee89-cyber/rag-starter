import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onOpenSpaceStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onOpenSpaceStory,
}) => {
  return (
    <section className="pt-28 pb-14 px-6 text-center flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient Backlight */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/12 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-white max-w-sm sm:max-w-md mx-auto">
        Where the world does markets
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xs sm:max-w-sm mx-auto">
        Join 100 million traders and investors taking the future into their own hands.
      </p>

      {/* Primary CTA Button */}
      <div className="mt-8 flex flex-col items-center w-full max-w-xs">
        <button
          onClick={onGetStarted}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-zinc-100 text-black font-bold text-base rounded-full shadow-md transition transform active:scale-98 cursor-pointer"
        >
          Get started for free
        </button>
        <span className="mt-3 text-xs text-zinc-400 font-medium tracking-wide">
          $0 forever, no credit card needed
        </span>
      </div>

      {/* Astronaut Promo Pill Badge */}
      <div className="mt-14 w-full max-w-sm">
        <button
          onClick={onOpenSpaceStory}
          className="w-full space-pill-border rounded-full p-2 pr-4 flex items-center space-x-3.5 hover:border-zinc-500 transition-colors shadow-2xl cursor-pointer text-left focus:outline-none"
        >
          {/* Scott Poteet Avatar SVG Portrait */}
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800 border border-white/20">
            <svg className="w-full h-full object-cover" viewBox="0 0 80 80">
              <rect width="80" height="80" fill="#1e293b" />
              <circle cx="40" cy="30" r="18" fill="#e2e8f0" />
              <path d="M12 76 C12 52, 28 48, 40 48 C52 48, 68 52, 68 76 Z" fill="#0f172a" />
              {/* Space Mission patch element */}
              <rect x="25" y="58" width="10" height="8" rx="2" fill="#3b82f6" />
              <rect x="45" y="58" width="10" height="8" rx="2" fill="#ef4444" />
            </svg>
          </div>

          {/* Text Labels */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center text-sm font-semibold text-white truncate">
              <span>See our space story</span>
              <svg className="w-4 h-4 ml-1 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs text-zinc-400 truncate mt-0.5">
              With astronaut Scott "Kidd" Poteet
            </p>
          </div>
        </button>
      </div>
    </section>
  );
};
