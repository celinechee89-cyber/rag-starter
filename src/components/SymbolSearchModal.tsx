import React, { useState } from 'react';
import { Ticker, MarketCategory } from '../types/market';

interface SymbolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: Ticker[];
  onSelectTicker: (t: Ticker) => void;
}

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  isOpen,
  onClose,
  tickers,
  onSelectTicker,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'indices', label: 'Indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'forex', label: 'Forex' },
    { id: 'futures', label: 'Futures' },
  ];

  const filtered = tickers.filter((t) => {
    if (selectedCat !== 'all' && t.category !== selectedCat) return false;
    if (query) {
      const q = query.toLowerCase();
      return t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#131722] border border-[#2a2e39] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#2a2e39] flex items-center space-x-2">
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <input
            type="text"
            autoFocus
            placeholder="Search symbol (e.g. BTC, SPX, NVDA, EURUSD)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-3 py-2 border-b border-[#2a2e39] flex space-x-1.5 overflow-x-auto no-scrollbar bg-[#0f0f11]">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCat === c.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39] no-scrollbar">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-xs">
              No symbols found matching "{query}"
            </div>
          ) : (
            filtered.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTicker(t);
                  onClose();
                }}
                className="w-full p-3.5 flex items-center justify-between hover:bg-white/5 transition text-left cursor-pointer"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white tracking-wide">{t.symbol}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-mono bg-zinc-800 text-zinc-400">
                      {t.category}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 mt-0.5 block">{t.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold font-mono text-white block">
                    {t.currencyPrefix}{t.price.toLocaleString(undefined, { minimumFractionDigits: t.decimals })}
                  </span>
                  <span className={`text-xs font-semibold ${t.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.changePercent >= 0 ? '+' : ''}{t.changePercent.toFixed(2)}%
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
