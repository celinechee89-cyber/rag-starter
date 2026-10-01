import React from 'react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenMenu: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAuth,
  onOpenMenu,
  onGoHome,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md px-4 h-16 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="p-1.5 -ml-1 text-white hover:text-zinc-300 focus:outline-none transition-colors cursor-pointer"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* TradingView Logo Monogram */}
        <button
          onClick={onGoHome}
          aria-label="TradingView Home"
          className="flex items-center hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
        >
          <svg className="h-6 w-auto text-white" fill="currentColor" viewBox="0 0 36 28">
            <path d="M14 2H2V9.5H14V2Z" />
            <path d="M8 9.5H2V26H8V9.5Z" />
            <circle cx="21" cy="6" r="4.2" />
            <path d="M34 2L24.5 26H18.5L28 2H34Z" />
          </svg>
        </button>
      </div>

      {/* Right Action Items */}
      <div className="flex items-center space-x-3">
        {/* Search Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Search markets and symbols"
          className="p-2 text-white hover:text-zinc-300 transition-colors cursor-pointer rounded-full hover:bg-white/5"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Get Started Button */}
        <button
          onClick={onOpenAuth}
          className="get-started-gradient text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
