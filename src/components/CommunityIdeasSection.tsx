import React from 'react';
import { Idea } from '../types/market';

interface CommunityIdeasSectionProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
  onToggleLike: (ideaId: string, e: React.MouseEvent) => void;
  onViewAll: () => void;
}

export const CommunityIdeasSection: React.FC<CommunityIdeasSectionProps> = ({
  ideas,
  onSelectIdea,
  onToggleLike,
  onViewAll,
}) => {
  return (
    <section className="py-6 px-4" data-purpose="community-ideas">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Community Ideas</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Top trader analysis and setups</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs text-blue-400 font-semibold hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="space-y-3.5">
        {ideas.slice(0, 2).map((idea) => {
          const isLong = idea.direction === 'Long';
          return (
            <article
              key={idea.id}
              onClick={() => onSelectIdea(idea)}
              className="bg-[#131722] border border-[#2a2e39] rounded-xl p-3.5 hover:border-zinc-700 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 rounded-full ${idea.avatarBg} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
                  >
                    {idea.authorInitials}
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {idea.author}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                    isLong
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-rose-500/15 text-rose-400'
                  }`}
                >
                  {idea.direction}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-blue-400 transition-colors">
                {idea.title}
              </h3>

              <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                {idea.description}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-[#2a2e39]">
                <span className="text-[11px] font-mono text-zinc-400">
                  {idea.symbol} · {idea.timeframe}
                </span>

                <div className="flex items-center space-x-3 text-[11px]">
                  {/* Like Button */}
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

                  {/* Comment Button */}
                  <span className="flex items-center space-x-1 text-zinc-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="tabular-nums">{idea.comments}</span>
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
