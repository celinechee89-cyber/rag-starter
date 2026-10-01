import React from 'react';
import { MarketCategory, Ticker } from '../types/market';

interface LiveMarketsProps {
  tickers: Ticker[];
  activeCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  onSelectTicker: (ticker: Ticker) => void;
}

export const LiveMarkets: React.FC<LiveMarketsProps> = ({
  tickers,
  activeCategory,
  onSelectCategory,
  onSelectTicker,
}) => {
  const categories: { id: MarketCategory; label: string }[] = [
    { id: 'indices', label: 'Major indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'stocks', label: 'Stocks' },
  ];

  const filteredTickers = tickers.filter((t) => t.category === activeCategory);
  // If the filtered category has fewer items, also include other popular ones so the scroll row is always full
  const displayTickers = filteredTickers.length >= 3 ? filteredTickers : tickers;

  return (
    <section className="py-6 border-t border-zinc-900 bg-black" data-purpose="live-markets">
      {/* Market Category Filter Pills */}
      <div className="px-4 mb-4 flex space-x-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Horizontal Scrolling Market Cards */}
      <div className="flex space-x-3 overflow-x-auto no-scrollbar px-4 pb-2">
        {displayTickers.map((ticker) => {
          const isPositive = ticker.changePercent >= 0;
          return (
            <button
              key={ticker.id}
              onClick={() => onSelectTicker(ticker)}
              className="flex-shrink-0 w-44 bg-[#131722] border border-[#2a2e39] hover:border-zinc-500 rounded-xl p-3 flex flex-col justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">
                  {ticker.symbol}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded tabular-nums ${
                    isPositive
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-rose-400 bg-rose-500/10'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {ticker.changePercent.toFixed(2)}%
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 truncate mt-0.5 w-full">
                {ticker.name}
              </p>

              <div className="mt-2.5 flex items-baseline justify-between w-full">
                <span className="text-sm font-semibold text-white font-mono tabular-nums">
                  {ticker.currencyPrefix}
                  {ticker.price.toLocaleString(undefined, {
                    minimumFractionDigits: ticker.decimals,
                    maximumFractionDigits: ticker.decimals,
                  })}
                </span>

                {/* Sparkline SVG */}
                <svg
                  className={`w-14 h-5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}
                  fill="none"
                  viewBox="0 0 60 20"
                >
                  {isPositive ? (
                    <path
                      d="M1 18 L15 14 L28 16 L40 7 L59 2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  ) : (
                    <path
                      d="M1 3 L14 5 L30 14 L42 10 L59 18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
