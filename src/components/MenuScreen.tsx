import React, { useState } from 'react';
import { PaperPosition, Alert, Ticker } from '../types/market';

interface MenuScreenProps {
  openPositions: PaperPosition[];
  onClosePosition: (id: string) => void;
  alerts: Alert[];
  onAddAlert: (symbol: string, price: number, condition: 'above' | 'below') => void;
  onDeleteAlert: (id: string) => void;
  onOpenSpaceStory: () => void;
  onOpenAuth: () => void;
  tickers: Ticker[];
  onSelectTicker: (t: Ticker) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  openPositions,
  onClosePosition,
  alerts,
  onAddAlert,
  onDeleteAlert,
  onOpenSpaceStory,
  onOpenAuth,
  tickers,
  onSelectTicker,
}) => {
  const [newAlertSymbol, setNewAlertSymbol] = useState<string>('BTC/USD');
  const [newAlertPrice, setNewAlertPrice] = useState<string>('85000');
  const [newAlertCondition, setNewAlertCondition] = useState<'above' | 'below'>('above');
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const initialBalance = 100000;
  const totalPnL = openPositions.reduce((acc, p) => acc + p.pnl, 0);
  const currentEquity = initialBalance + totalPnL;

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(newAlertPrice);
    if (!p) return;
    onAddAlert(newAlertSymbol, p, newAlertCondition);
    setShowAlertModal(false);
  };

  return (
    <div className="pt-20 pb-24 px-4 bg-black min-h-screen text-white">
      {/* User Header Profile Card */}
      <div className="p-4 bg-gradient-to-r from-[#181d29] to-[#131722] border border-[#2a2e39] rounded-2xl mb-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-md">
            TV
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Guest Trader</h2>
            <p className="text-xs text-zinc-400">Paper Trading Account</p>
          </div>
        </div>
        <button
          onClick={onOpenAuth}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow transition cursor-pointer"
        >
          Sign In
        </button>
      </div>

      {/* Paper Trading Portfolio Box */}
      <div className="p-4 bg-[#131722] border border-[#2a2e39] rounded-2xl mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Account Balance</span>
          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-mono">
            Demo Real-Time
          </span>
        </div>

        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-2xl font-extrabold text-white font-mono">
            ${currentEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className={`text-xs font-semibold font-mono ${totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
          </span>
        </div>

        {/* Positions Table */}
        <h4 className="text-xs font-semibold text-zinc-300 mb-2">Open Positions ({openPositions.length})</h4>
        {openPositions.length === 0 ? (
          <p className="text-xs text-zinc-500 italic py-2">
            No active positions. Open a trade from the Supercharts tab!
          </p>
        ) : (
          <div className="space-y-2">
            {openPositions.map((pos) => (
              <div key={pos.id} className="p-2.5 bg-[#1e222d] rounded-lg flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${pos.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {pos.type}
                    </span>
                    <span className="font-semibold text-white">{pos.symbol}</span>
                    <span className="text-zinc-400 font-mono">x{pos.amount}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Entry: ${pos.entryPrice}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-mono font-bold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onClosePosition(pos.id)}
                    className="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-[11px] text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Space Story Feature Spotlight */}
      <div className="mb-5">
        <button
          onClick={onOpenSpaceStory}
          className="w-full space-pill-border rounded-2xl p-4 flex items-center justify-between hover:border-zinc-500 transition shadow-xl text-left cursor-pointer"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-white/20 flex-shrink-0">
              <svg className="w-full h-full object-cover" viewBox="0 0 80 80">
                <rect width="80" height="80" fill="#1e293b" />
                <circle cx="40" cy="30" r="18" fill="#e2e8f0" />
                <path d="M12 76 C12 52, 28 48, 40 48 C52 48, 68 52, 68 76 Z" fill="#0f172a" />
                <rect x="25" y="58" width="10" height="8" rx="2" fill="#3b82f6" />
                <rect x="45" y="58" width="10" height="8" rx="2" fill="#ef4444" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center">
                <span>See our space story</span>
                <span className="ml-1 text-blue-400">→</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">With astronaut Scott "Kidd" Poteet</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">
            Read
          </span>
        </button>
      </div>

      {/* Price Alerts Manager */}
      <div className="p-4 bg-[#131722] border border-[#2a2e39] rounded-2xl mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="text-xs font-bold text-white">Price Alerts</span>
          </div>
          <button
            onClick={() => setShowAlertModal(!showAlertModal)}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
          >
            + New Alert
          </button>
        </div>

        {showAlertModal && (
          <form onSubmit={handleCreateAlert} className="mb-4 p-3 bg-[#1e222d] rounded-xl border border-zinc-700">
            <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
              <div>
                <label className="text-zinc-400 block text-[10px] mb-1">Symbol</label>
                <select
                  value={newAlertSymbol}
                  onChange={(e) => setNewAlertSymbol(e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded p-1.5 text-xs text-white"
                >
                  {tickers.map((t) => (
                    <option key={t.id} value={t.symbol}>
                      {t.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-zinc-400 block text-[10px] mb-1">Target Price</label>
                <input
                  type="number"
                  step="any"
                  value={newAlertPrice}
                  onChange={(e) => setNewAlertPrice(e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded p-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-semibold text-white cursor-pointer"
              >
                Set Alert
              </button>
              <button
                type="button"
                onClick={() => setShowAlertModal(false)}
                className="px-3 py-1.5 bg-zinc-700 rounded text-xs text-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {alerts.length === 0 ? (
          <p className="text-xs text-zinc-500 italic py-1">No price alerts set. Tap '+ New Alert' to create one.</p>
        ) : (
          <div className="space-y-2">
            {alerts.map((al) => (
              <div key={al.id} className="p-2.5 bg-[#1e222d] rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{al.symbol}</span>
                  <span className="text-zinc-400 ml-1.5">
                    {al.condition === 'above' ? '▲ rises above' : '▼ falls below'}{' '}
                    <span className="font-mono text-amber-300 font-semibold">${al.targetPrice}</span>
                  </span>
                </div>
                <button
                  onClick={() => onDeleteAlert(al.id)}
                  className="text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fast Watchlist Quick Jump */}
      <div className="p-4 bg-[#131722] border border-[#2a2e39] rounded-2xl">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Your Watchlist</h4>
        <div className="divide-y divide-[#2a2e39]">
          {tickers.slice(0, 5).map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTicker(t)}
              className="w-full py-2 flex items-center justify-between text-xs hover:bg-white/5 px-1 rounded transition cursor-pointer"
            >
              <div className="text-left">
                <span className="font-bold text-white block">{t.symbol}</span>
                <span className="text-[11px] text-zinc-400">{t.name}</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-semibold text-white block">
                  {t.currencyPrefix}{t.price.toLocaleString(undefined, { minimumFractionDigits: t.decimals })}
                </span>
                <span className={`text-[10px] font-semibold ${t.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {t.changePercent >= 0 ? '+' : ''}{t.changePercent.toFixed(2)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
