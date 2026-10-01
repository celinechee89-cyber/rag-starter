import React, { useState } from 'react';
import { Idea } from '../types/market';

interface IdeaDetailModalProps {
  idea: Idea | null;
  onClose: () => void;
  onToggleLike: (ideaId: string) => void;
  onAddComment: (ideaId: string, commentText: string) => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  idea,
  onClose,
  onToggleLike,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState('');

  if (!idea) return null;

  const isLong = idea.direction === 'Long';

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(idea.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#131722] border border-[#2a2e39] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center justify-between bg-black/30">
          <div className="flex items-center space-x-2.5">
            <div
              className={`w-7 h-7 rounded-full ${idea.avatarBg} flex items-center justify-center text-xs font-bold text-white`}
            >
              {idea.authorInitials}
            </div>
            <div>
              <span className="text-xs font-bold text-white block">{idea.author}</span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {idea.symbol} · {idea.timeframe}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`px-2.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                isLong
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-rose-500/15 text-rose-400'
              }`}
            >
              {idea.direction}
            </span>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white rounded-lg transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          <h2 className="text-base font-bold text-white leading-snug">{idea.title}</h2>

          {/* Trade Parameters Grid */}
          {(idea.entryPrice || idea.targetPrice || idea.stopLoss) && (
            <div className="grid grid-cols-3 gap-2 bg-[#1e222d] p-3 rounded-xl border border-zinc-800 text-center font-mono">
              <div>
                <span className="text-[10px] text-zinc-400 block font-sans">Entry</span>
                <span className="text-xs font-bold text-zinc-200">${idea.entryPrice}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block font-sans">Target</span>
                <span className="text-xs font-bold text-emerald-400">${idea.targetPrice}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block font-sans">Stop Loss</span>
                <span className="text-xs font-bold text-rose-400">${idea.stopLoss}</span>
              </div>
            </div>
          )}

          {/* Full Analytical Thesis */}
          <div className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line bg-[#0f1118] p-4 rounded-xl border border-zinc-800/80">
            {idea.fullAnalysis || idea.description}
          </div>

          {/* Reactions bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2a2e39] text-xs">
            <button
              onClick={() => onToggleLike(idea.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                idea.isLiked
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-[#1e222d] border-zinc-700 text-zinc-300 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill={idea.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2m-5 0H4a1 1 0 00-1 1v7a1 1 0 001 1h2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>{idea.likes} Boosts</span>
            </button>
            <span className="text-zinc-400 font-mono text-[11px]">{idea.commentsList.length} Comments</span>
          </div>

          {/* Comments List */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-bold text-zinc-300">Trader Discussions</h4>
            {idea.commentsList.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              idea.commentsList.map((c) => (
                <div key={c.id} className="p-3 bg-[#1e222d] rounded-xl text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-zinc-200">{c.author}</span>
                    <span className="text-[10px] text-zinc-500">{c.time}</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="p-3 border-t border-[#2a2e39] bg-black/40 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a comment or counter-analysis..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-[#1e222d] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition cursor-pointer"
          >
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};
