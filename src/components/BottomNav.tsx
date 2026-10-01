import React from 'react';

export type TabType = 'markets' | 'charts' | 'ideas' | 'community' | 'menu';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f11]/95 backdrop-blur-md border-t border-[#2a2e39] px-2 py-1.5 flex items-center justify-around safe-bottom">
      {/* Tab: Markets */}
      <button
        onClick={() => onTabChange('markets')}
        className={`flex flex-col items-center py-1 px-3 transition-colors cursor-pointer ${
          activeTab === 'markets' ? 'text-blue-500 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 19h16v2H4zM4 10h4v7H4zm6-5h4v12h-4zm6 3h4v9h-4z" />
        </svg>
        <span className="text-[10px] tracking-tight">Markets</span>
      </button>

      {/* Tab: Charts */}
      <button
        onClick={() => onTabChange('charts')}
        className={`flex flex-col items-center py-1 px-3 transition-colors cursor-pointer ${
          activeTab === 'charts' ? 'text-blue-500 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 3v18h18M7 14l4-4 4 4 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] tracking-tight">Charts</span>
      </button>

      {/* Tab: Ideas */}
      <button
        onClick={() => onTabChange('ideas')}
        className={`flex flex-col items-center py-1 px-3 transition-colors cursor-pointer ${
          activeTab === 'ideas' ? 'text-blue-500 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] tracking-tight">Ideas</span>
      </button>

      {/* Tab: Community */}
      <button
        onClick={() => onTabChange('community')}
        className={`flex flex-col items-center py-1 px-3 transition-colors cursor-pointer ${
          activeTab === 'community' ? 'text-blue-500 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] tracking-tight">Community</span>
      </button>

      {/* Tab: Menu */}
      <button
        onClick={() => onTabChange('menu')}
        className={`flex flex-col items-center py-1 px-3 transition-colors cursor-pointer ${
          activeTab === 'menu' ? 'text-blue-500 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] tracking-tight">Menu</span>
      </button>
    </nav>
  );
};
