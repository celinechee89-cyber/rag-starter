import React, { useState } from 'react';
import { Idea } from '../types/market';

interface IdeasScreenProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
  onToggleLike: (ideaId: string, e: React.MouseEvent) => void;
  onOpenPublishModal: () => void;
}

export const IdeasScreen: React.FC<IdeasScreenProps> = ({
  ideas,
  onSelectIdea,
  onToggleLike,
  onOpenPublishModal,
}) => {
  const [filterDirection, setFilterDirection] = useState<'All' | 'Long' | 'Short'>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIdeas = ideas.filter((idea) => {
    if (filterDirection !== 'All' && idea.direction !== filterDirection) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        idea.title.toLowerCase().includes(q) ||
        idea.symbol.toLowerCase().includes(q) ||
        idea.author.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="pt-20 pb-24 px-4 bg-black min-h-screen text-white">
      {/* Top Header & Publish CTA */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Community Ideas</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Top trader analysis, setups, and macro thesis</p>
        </div>
        <button
          onClick={onOpenPublishModal}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow transition flex items-center space-x-1.5 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeWidth="2.5" />
          </svg>
          <span>Publish idea</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Search setups, symbols (BTC, NVDA...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#131722] border border-[#2a2e39] rounded-xl px-9 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
        />
        <svg
          className="w-4 h-4 text-zinc-500 absolute left-3 top-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-3 mb-2">
        {(['All', 'Long', 'Short'] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => setFilterDirection(dir)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              filterDirection === dir
                ? 'bg-white text-black'
                : 'bg-[#131722] text-zinc-400 border border-[#2a2e39] hover:text-white'
            }`}
          >
            {dir === 'All' ? 'All Directions' : dir === 'Long' ? '🟢 Long Only' : '🔴 Short Only'}
          </button>
        ))}
      </div>

      {/* Idea Feed List */}
      <div className="space-y-4">
        {filteredIdeas.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-xs bg-[#131722] rounded-xl border border-[#2a2e39]">
            No trading ideas found matching your criteria. Try adjusting the search query or publish one!
          </div>
        ) : (
          filteredIdeas.map((idea) => {
            const isLong = idea.direction === 'Long';
            return (
              <article
                key={idea.id}
                onClick={() => onSelectIdea(idea)}
                className="bg-[#131722] border border-[#2a2e39] rounded-xl p-4 hover:border-zinc-700 transition cursor-pointer group shadow-sm"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-7 h-7 rounded-full ${idea.avatarBg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                    >
                      {idea.authorInitials}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-zinc-200 group-hover:text-white block">
                        {idea.author}
                      </span>
                      <span className="text-[10px] text-zinc-500">{idea.date}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                      isLong
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-rose-500/15 text-rose-400'
                    }`}
                  >
                    {idea.direction}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                  {idea.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {idea.description}
                </p>

                {/* Targets Preview if provided */}
                {(idea.entryPrice || idea.targetPrice) && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center space-x-4 text-[11px] font-mono text-zinc-400">
                    {idea.entryPrice && <span>Entry: <span className="text-zinc-200">${idea.entryPrice}</span></span>}
                    {idea.targetPrice && <span>Target: <span className="text-emerald-400 font-bold">${idea.targetPrice}</span></span>}
                    {idea.stopLoss && <span>Stop: <span className="text-rose-400">${idea.stopLoss}</span></span>}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-[#2a2e39]">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {idea.symbol} · {idea.timeframe}
                  </span>

                  <div className="flex items-center space-x-3 text-[11px]">
                    <button
                      onClick={(e) => onToggleLike(idea.id, e)}
                      className={`flex items-center space-x-1 transition-colors cursor-pointer ${
                        idea.isLiked ? 'text-blue-400 font-semibold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill={idea.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2m-5 0H4a1 1 0 00-1 1v7a1 1 0 001 1h2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <span className="tabular-nums">{idea.likes}</span>
                    </button>

                    <span className="flex items-center space-x-1 text-zinc-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <span className="tabular-nums">{idea.commentsList.length}</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
