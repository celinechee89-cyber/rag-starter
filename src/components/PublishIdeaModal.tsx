import React, { useState } from 'react';
import { Idea, Ticker } from '../types/market';

interface PublishIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: Ticker[];
  onPublish: (newIdea: Omit<Idea, 'id' | 'likes' | 'comments' | 'commentsList' | 'date'>) => void;
}

export const PublishIdeaModal: React.FC<PublishIdeaModalProps> = ({
  isOpen,
  onClose,
  tickers,
  onPublish,
}) => {
  const [symbol, setSymbol] = useState(tickers[0]?.symbol || 'BTCUSDT');
  const [direction, setDirection] = useState<'Long' | 'Short'>('Long');
  const [timeframe, setTimeframe] = useState('1D');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onPublish({
      author: 'You (Trader)',
      authorInitials: 'YT',
      avatarBg: 'bg-blue-600',
      direction,
      symbol,
      timeframe,
      title: title.trim(),
      description: description.trim(),
      fullAnalysis: description.trim(),
      entryPrice: entryPrice ? parseFloat(entryPrice) : undefined,
      targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#131722] border border-[#2a2e39] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center justify-between bg-black/30">
          <h2 className="text-sm font-bold text-white">Publish Trading Idea</h2>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 no-scrollbar text-xs">
          {/* Symbol & Direction */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 block mb-1 font-semibold">Symbol</label>
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full bg-[#1e222d] border border-zinc-700 rounded-xl px-3 py-2 text-white"
              >
                {tickers.map((t) => (
                  <option key={t.id} value={t.symbol}>
                    {t.symbol} - {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1 font-semibold">Market Bias</label>
              <div className="grid grid-cols-2 gap-1.5 p-0.5 bg-[#1e222d] rounded-xl border border-zinc-700">
                <button
                  type="button"
                  onClick={() => setDirection('Long')}
                  className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    direction === 'Long' ? 'bg-emerald-600 text-white' : 'text-zinc-400'
                  }`}
                >
                  🟢 Long
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('Short')}
                  className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    direction === 'Short' ? 'bg-rose-600 text-white' : 'text-zinc-400'
                  }`}
                >
                  🔴 Short
                </button>
              </div>
            </div>
          </div>

          {/* Timeframe */}
          <div>
            <label className="text-zinc-400 block mb-1 font-semibold">Chart Timeframe</label>
            <div className="flex space-x-2">
              {['15m', '1h', '4h', '1D', '1W'].map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
                    timeframe === tf
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-[#1e222d] border-zinc-700 text-zinc-400'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-zinc-400 block mb-1 font-semibold">Idea Headline</label>
            <input
              type="text"
              required
              placeholder="e.g. BTC: Confirmed breakout above resistance targeting $90k"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1e222d] border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Analysis Thesis */}
          <div>
            <label className="text-zinc-400 block mb-1 font-semibold">Trade Thesis & Technical Setup</label>
            <textarea
              required
              rows={4}
              placeholder="Explain the technical factors: support/resistance levels, indicators, moving averages, volume confirmation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1e222d] border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>

          {/* Target Levels */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-zinc-400 block mb-1">Entry ($)</label>
              <input
                type="number"
                step="any"
                placeholder="Optional"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="w-full bg-[#1e222d] border border-zinc-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Target ($)</label>
              <input
                type="number"
                step="any"
                placeholder="Optional"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full bg-[#1e222d] border border-zinc-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Stop Loss ($)</label>
              <input
                type="number"
                step="any"
                placeholder="Optional"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="w-full bg-[#1e222d] border border-zinc-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition cursor-pointer mt-2"
          >
            Publish to TradingView Community
          </button>
        </form>
      </div>
    </div>
  );
};
