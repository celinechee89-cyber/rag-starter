import React, { useState } from 'react';
import { LIVE_STREAMS, INITIAL_CHAT_MESSAGES } from '../data/marketData';
import { LiveStreamSession, CommunityChatMessage } from '../types/market';

export const CommunityScreen: React.FC = () => {
  const [activeStream, setActiveStream] = useState<LiveStreamSession | null>(LIVE_STREAMS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<CommunityChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'streams' | 'chat' | 'leaderboard'>('streams');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg: CommunityChatMessage = {
      id: 'msg-' + Date.now(),
      user: 'You',
      avatarBg: 'bg-blue-600',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: newMessage.trim(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    // Trigger simulated peer response after 1.5s
    setTimeout(() => {
      const peerMsg: CommunityChatMessage = {
        id: 'peer-' + Date.now(),
        user: 'MarketWizard_Jay',
        avatarBg: 'bg-emerald-600',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: 'Good point! Orderbook depth confirms high absorption there.',
      };
      setChatMessages((prev) => [...prev, peerMsg]);
    }, 1500);
  };

  const traders = [
    { rank: 1, name: 'SatoshiSamurai', winRate: '84%', roi: '+412%', followers: '94.2K', avatarBg: 'bg-blue-600' },
    { rank: 2, name: 'AlgoAlpha', winRate: '79%', roi: '+285%', followers: '68.5K', avatarBg: 'bg-purple-600' },
    { rank: 3, name: 'ForexValkyrie', winRate: '76%', roi: '+194%', followers: '45.1K', avatarBg: 'bg-orange-600' },
    { rank: 4, name: 'MacroSurfer', winRate: '72%', roi: '+140%', followers: '32.8K', avatarBg: 'bg-emerald-600' },
  ];

  return (
    <div className="pt-20 pb-24 px-4 bg-black min-h-screen text-white">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Trading Community</h1>
        <p className="text-xs text-zinc-400 mt-0.5">Live audio spaces, trader discussions, and leaderboards</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-1 p-1 bg-[#131722] rounded-xl border border-[#2a2e39] mb-4">
        <button
          onClick={() => setActiveSubTab('streams')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
            activeSubTab === 'streams' ? 'bg-[#1e222d] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          🎙️ Live Spaces
        </button>
        <button
          onClick={() => setActiveSubTab('chat')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
            activeSubTab === 'chat' ? 'bg-[#1e222d] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          💬 Chat Room
        </button>
        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
            activeSubTab === 'leaderboard' ? 'bg-[#1e222d] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* Active Tab Content */}
      {activeSubTab === 'streams' && (
        <div className="space-y-3">
          {/* Featured Live Stream Player Card */}
          {activeStream && (
            <div className="p-4 bg-gradient-to-br from-[#1a1f2e] to-[#131722] border border-blue-500/30 rounded-2xl relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-[10px] font-bold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>LIVE NOW</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  🎧 {activeStream.listeners.toLocaleString()} listening
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{activeStream.title}</h3>
              <p className="text-xs text-zinc-400 mb-4">Hosted by {activeStream.host}</p>

              {/* Simulated Audio Waveform Bar */}
              <div className="flex items-center space-x-1 h-8 mb-4 px-2 bg-black/40 rounded-lg">
                {[4, 12, 24, 16, 8, 20, 28, 14, 22, 10, 18, 26, 12, 16, 8, 22, 14, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isPlayingAudio ? `${(h * 1.2) % 28 + 4}px` : `${h}px` }}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio ? 'bg-blue-400 animate-pulse' : 'bg-zinc-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-98 rounded-xl font-bold text-xs text-white transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isPlayingAudio ? '⏸️ Pause Audio' : '▶️ Tune In & Listen Live'}</span>
              </button>
            </div>
          )}

          {/* Other Live Streams */}
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-4">Other Live Rooms</h4>
          {LIVE_STREAMS.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                setActiveStream(s);
                setIsPlayingAudio(true);
              }}
              className="p-3 bg-[#131722] border border-[#2a2e39] rounded-xl flex items-center justify-between hover:border-zinc-700 transition cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-blue-400">
                  {s.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{s.title}</h4>
                  <p className="text-[11px] text-zinc-400">{s.host}</p>
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono whitespace-nowrap">
                {s.listeners} 👥
              </span>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'chat' && (
        <div className="flex flex-col h-[520px] bg-[#131722] border border-[#2a2e39] rounded-2xl overflow-hidden">
          {/* Chat Room Header */}
          <div className="px-4 py-2.5 bg-[#1e222d] border-b border-[#2a2e39] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">#crypto-alpha-chat</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono">1,429 Online</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 no-scrollbar">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex space-x-2.5 text-xs">
                <div
                  className={`w-6 h-6 rounded-full ${msg.avatarBg} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5`}
                >
                  {msg.user.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-0.5">
                    <span className="font-semibold text-zinc-200">{msg.user}</span>
                    {msg.symbolTag && (
                      <span className="px-1.5 py-0.2 bg-blue-500/20 text-blue-400 text-[10px] font-mono rounded">
                        ${msg.symbolTag}
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-500 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} className="p-2 bg-[#1e222d] border-t border-[#2a2e39] flex items-center space-x-2">
            <input
              type="text"
              placeholder="Share analysis or say hello..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-black border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {activeSubTab === 'leaderboard' && (
        <div className="space-y-3">
          <div className="bg-[#131722] border border-[#2a2e39] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2e39] flex items-center justify-between">
              <span className="text-xs font-bold text-white">Monthly Verified Traders</span>
              <span className="text-[10px] text-zinc-400">Audited P&L</span>
            </div>
            <div className="divide-y divide-[#2a2e39]">
              {traders.map((t) => (
                <div key={t.rank} className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-sm text-zinc-500 w-4">
                      #{t.rank}
                    </span>
                    <div className={`w-8 h-8 rounded-full ${t.avatarBg} flex items-center justify-center text-xs font-bold text-white`}>
                      {t.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <span className="text-[11px] text-zinc-400">{t.followers} followers</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 font-mono block">{t.roi}</span>
                    <span className="text-[10px] text-zinc-400">{t.winRate} win rate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
