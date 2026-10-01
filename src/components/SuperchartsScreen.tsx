import React, { useState, useEffect } from 'react';
import { Ticker, PaperPosition } from '../types/market';

interface SuperchartsScreenProps {
  selectedTicker: Ticker;
  onOpenSearch: () => void;
  onExecuteTrade: (type: 'BUY' | 'SELL', symbol: string, price: number, amount: number) => void;
  openPositions: PaperPosition[];
  onClosePosition: (id: string) => void;
}

export const SuperchartsScreen: React.FC<SuperchartsScreenProps> = ({
  selectedTicker,
  onOpenSearch,
  onExecuteTrade,
  openPositions,
  onClosePosition,
}) => {
  const [timeframe, setTimeframe] = useState<string>('4h');
  const [chartType, setChartType] = useState<'candles' | 'line' | 'area'>('candles');
  const [showRsi, setShowRsi] = useState<boolean>(true);
  const [showMa, setShowMa] = useState<boolean>(true);
  const [activeDrawingTool, setActiveDrawingTool] = useState<'crosshair' | 'trendline' | 'horizontal' | 'fib' | null>('crosshair');
  const [tradeAmount, setTradeAmount] = useState<number>(0.1);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Simulated live fluctuating price
  const [livePrice, setLivePrice] = useState<number>(selectedTicker.price);
  const [tickDirection, setTickDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    setLivePrice(selectedTicker.price);
  }, [selectedTicker]);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.49) * (livePrice * 0.001);
      const newPrice = Number((livePrice + delta).toFixed(selectedTicker.decimals));
      setTickDirection(newPrice >= livePrice ? 'up' : 'down');
      setLivePrice(newPrice);
    }, 2400);

    return () => clearInterval(interval);
  }, [livePrice, selectedTicker.decimals]);

  // Generate dynamic candles based on live price
  const basePrice = livePrice;
  const numCandles = 20;
  const candleData = React.useMemo(() => {
    const arr = [];
    let p = basePrice * 0.96;
    for (let i = 0; i < numCandles; i++) {
      const isUp = (i % 3 !== 0) || i === numCandles - 1;
      const move = (Math.sin(i * 0.8) + 1.2) * (basePrice * 0.004);
      const open = p;
      const close = isUp ? p + move : p - move * 0.8;
      const high = Math.max(open, close) + move * 0.4;
      const low = Math.min(open, close) - move * 0.35;
      const vol = 100 + Math.floor(Math.sin(i) * 60 + 80);
      arr.push({ open, high, low, close, isUp, vol, idx: i });
      p = close;
    }
    // Update last candle close to livePrice
    if (arr.length > 0) {
      arr[arr.length - 1].close = basePrice;
      arr[arr.length - 1].high = Math.max(arr[arr.length - 1].high, basePrice);
      arr[arr.length - 1].low = Math.min(arr[arr.length - 1].low, basePrice);
      arr[arr.length - 1].isUp = arr[arr.length - 1].close >= arr[arr.length - 1].open;
    }
    return arr;
  }, [basePrice, numCandles]);

  // Range calculation for SVG scaling
  const minP = Math.min(...candleData.map(c => c.low)) * 0.998;
  const maxP = Math.max(...candleData.map(c => c.high)) * 1.002;
  const pRange = maxP - minP || 1;

  const getY = (val: number, height = 220, top = 20) => {
    return top + height - ((val - minP) / pRange) * height;
  };

  const handleBuy = () => {
    onExecuteTrade('BUY', selectedTicker.symbol, livePrice, tradeAmount);
    setOrderNotification(`Bought ${tradeAmount} ${selectedTicker.symbol} @ ${livePrice}`);
    setTimeout(() => setOrderNotification(null), 3500);
  };

  const handleSell = () => {
    onExecuteTrade('SELL', selectedTicker.symbol, livePrice, tradeAmount);
    setOrderNotification(`Sold ${tradeAmount} ${selectedTicker.symbol} @ ${livePrice}`);
    setTimeout(() => setOrderNotification(null), 3500);
  };

  const currentPosition = openPositions.find(p => p.symbol === selectedTicker.symbol);

  return (
    <div className="pt-16 pb-20 bg-black min-h-screen text-white select-none">
      {/* Chart Top Header & Symbol Switcher */}
      <div className="px-4 py-2.5 bg-[#131722] border-b border-[#2a2e39] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-1.5 bg-[#1e222d] hover:bg-[#2a2e39] px-2.5 py-1 rounded text-sm font-bold text-white transition cursor-pointer"
          >
            <span>{selectedTicker.symbol}</span>
            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>

          <span
            className={`font-mono text-sm font-bold px-1.5 py-0.5 rounded transition-colors ${
              tickDirection === 'up'
                ? 'text-emerald-400 bg-emerald-500/10'
                : tickDirection === 'down'
                ? 'text-rose-400 bg-rose-500/10'
                : 'text-zinc-200'
            }`}
          >
            {selectedTicker.currencyPrefix}
            {livePrice.toLocaleString(undefined, {
              minimumFractionDigits: selectedTicker.decimals,
              maximumFractionDigits: selectedTicker.decimals,
            })}
          </span>

          <span
            className={`text-xs font-semibold ${
              selectedTicker.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {selectedTicker.changePercent >= 0 ? '+' : ''}
            {selectedTicker.changePercent.toFixed(2)}%
          </span>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setChartType(chartType === 'candles' ? 'line' : 'candles')}
            className="p-1.5 text-xs text-zinc-300 hover:text-white bg-[#1e222d] rounded transition cursor-pointer"
            title="Toggle Candle / Line"
          >
            {chartType === 'candles' ? '📊' : '📈'}
          </button>
          <button
            onClick={() => setShowRsi(!showRsi)}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer transition ${
              showRsi ? 'bg-blue-600 text-white' : 'bg-[#1e222d] text-zinc-400'
            }`}
          >
            RSI
          </button>
          <button
            onClick={() => setShowMa(!showMa)}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer transition ${
              showMa ? 'bg-amber-500/20 text-amber-300' : 'bg-[#1e222d] text-zinc-400'
            }`}
          >
            EMA
          </button>
        </div>
      </div>

      {/* Timeframe Bar */}
      <div className="px-3 py-1.5 bg-[#0f0f11] border-b border-[#2a2e39] flex items-center justify-between text-xs text-zinc-400">
        <div className="flex space-x-3 overflow-x-auto no-scrollbar">
          {['1m', '5m', '15m', '1h', '4h', '1D', '1W'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`cursor-pointer font-medium transition ${
                timeframe === tf ? 'text-blue-400 font-bold' : 'hover:text-zinc-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-zinc-500">
          <span>O: {candleData[candleData.length - 1]?.open.toFixed(selectedTicker.decimals)}</span>
          <span>H: {candleData[candleData.length - 1]?.high.toFixed(selectedTicker.decimals)}</span>
          <span>L: {candleData[candleData.length - 1]?.low.toFixed(selectedTicker.decimals)}</span>
        </div>
      </div>

      {/* Order notification toast */}
      {orderNotification && (
        <div className="mx-4 mt-2 p-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg flex items-center justify-between animate-fade-in">
          <span>{orderNotification}</span>
          <button onClick={() => setOrderNotification(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Chart Station with Left Tool Ribbon */}
      <div className="flex bg-[#131722] border-b border-[#2a2e39] relative">
        {/* Left Drawing Ribbon */}
        <div className="w-10 border-r border-[#2a2e39] bg-[#131722] flex flex-col items-center py-2 space-y-2 text-zinc-400">
          <button
            onClick={() => setActiveDrawingTool('crosshair')}
            className={`p-1.5 rounded hover:text-white cursor-pointer ${
              activeDrawingTool === 'crosshair' ? 'bg-blue-600 text-white' : ''
            }`}
            title="Crosshair"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 2v20M2 12h20" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
          <button
            onClick={() => setActiveDrawingTool('trendline')}
            className={`p-1.5 rounded hover:text-white cursor-pointer ${
              activeDrawingTool === 'trendline' ? 'bg-blue-600 text-white' : ''
            }`}
            title="Trendline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 20L20 4M4 20h4M20 4v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <button
            onClick={() => setActiveDrawingTool('horizontal')}
            className={`p-1.5 rounded hover:text-white cursor-pointer ${
              activeDrawingTool === 'horizontal' ? 'bg-blue-600 text-white' : ''
            }`}
            title="Horizontal Line"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 12h18" strokeLinecap="round" strokeWidth="2" strokeDasharray="2 2" />
            </svg>
          </button>
          <button
            onClick={() => setActiveDrawingTool('fib')}
            className={`p-1.5 rounded hover:text-white cursor-pointer ${
              activeDrawingTool === 'fib' ? 'bg-blue-600 text-white' : ''
            }`}
            title="Fibonacci"
          >
            <span className="text-[10px] font-bold">Fib</span>
          </button>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <svg className="w-full h-72" viewBox="0 0 400 280">
            {/* Horizontal Grid lines & price labels */}
            {[0.2, 0.4, 0.6, 0.8].map((fraction, idx) => {
              const y = 20 + fraction * 220;
              const pVal = maxP - fraction * pRange;
              return (
                <g key={idx}>
                  <line x1="0" x2="350" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <text x="355" y={y + 3} fill="#787b86" fontSize="9" fontFamily="monospace">
                    {pVal.toFixed(selectedTicker.decimals > 2 ? 4 : 0)}
                  </text>
                </g>
              );
            })}

            {/* EMA 20 Overlay Line */}
            {showMa && (
              <path
                d={candleData
                  .map((c, i) => {
                    const x = 15 + i * (330 / (numCandles - 1));
                    const avg = (c.open + c.close + c.high + c.low) / 4;
                    const y = getY(avg);
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                opacity="0.85"
              />
            )}

            {/* Candlesticks or Line */}
            {chartType === 'candles' ? (
              candleData.map((c, i) => {
                const x = 15 + i * (330 / (numCandles - 1));
                const yHigh = getY(c.high);
                const yLow = getY(c.low);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const color = c.isUp ? '#089981' : '#f23645';

                const rectY = Math.min(yOpen, yClose);
                const rectH = Math.max(Math.abs(yClose - yOpen), 2);

                return (
                  <g key={i}>
                    {/* Wick */}
                    <line x1={x} x2={x} y1={yHigh} y2={yLow} stroke={color} strokeWidth="1.2" />
                    {/* Body */}
                    <rect x={x - 4} y={rectY} width="8" height={rectH} fill={color} rx="1" />
                    {/* Volume Bar */}
                    <rect
                      x={x - 3}
                      y={260 - (c.vol / 250) * 35}
                      width="6"
                      height={(c.vol / 250) * 35}
                      fill={color}
                      opacity="0.35"
                    />
                  </g>
                );
              })
            ) : (
              <g>
                <path
                  d={
                    candleData
                      .map((c, i) => {
                        const x = 15 + i * (330 / (numCandles - 1));
                        const y = getY(c.close);
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ') + ` L 345 250 L 15 250 Z`
                  }
                  fill="url(#chartGradient)"
                  opacity="0.25"
                />
                <path
                  d={candleData
                    .map((c, i) => {
                      const x = 15 + i * (330 / (numCandles - 1));
                      const y = getY(c.close);
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2962ff"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2962ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
              </g>
            )}

            {/* Current Price Line & Badge */}
            {(() => {
              const liveY = getY(livePrice);
              return (
                <g>
                  <line
                    x1="0"
                    x2="350"
                    y1={liveY}
                    y2={liveY}
                    stroke="#2962ff"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <rect x="345" y={liveY - 8} width="52" height="16" rx="2" fill="#2962ff" />
                  <text
                    x="371"
                    y={liveY + 3}
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {livePrice.toFixed(selectedTicker.decimals > 2 ? 4 : 0)}
                  </text>
                </g>
              );
            })()}
          </svg>

          {/* Optional RSI Sub-Panel */}
          {showRsi && (
            <div className="px-4 py-2 border-t border-[#2a2e39] bg-[#0d1017]">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-blue-400 font-semibold">RSI 14</span>
                <span className="text-zinc-400 font-mono">62.4</span>
              </div>
              <div className="relative h-10 w-full bg-[#131722] rounded border border-zinc-800 flex items-center px-2">
                <div className="absolute top-2 left-0 right-0 border-b border-rose-500/20 border-dashed" />
                <div className="absolute bottom-2 left-0 right-0 border-b border-emerald-500/20 border-dashed" />
                <svg className="w-full h-8" viewBox="0 0 300 30" preserveAspectRatio="none">
                  <path
                    d="M 0 18 Q 40 22 80 12 T 160 8 T 240 16 T 300 11"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Paper Trading Execution Panel */}
      <div className="p-4 bg-[#131722] border-b border-[#2a2e39]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-zinc-300">Paper Trading Simulator</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">$100,000 Demo Balance</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-zinc-400">Qty:</span>
            <input
              type="number"
              step="0.05"
              min="0.01"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
              className="w-16 bg-[#1e222d] border border-zinc-700 rounded px-1.5 py-0.5 text-xs text-white text-center font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleBuy}
            className="py-3 px-4 bg-[#089981] hover:bg-[#067a67] active:scale-98 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span className="text-sm">BUY (Long)</span>
            <span className="text-xs opacity-80 font-mono">
              @{livePrice.toFixed(selectedTicker.decimals)}
            </span>
          </button>
          <button
            onClick={handleSell}
            className="py-3 px-4 bg-[#f23645] hover:bg-[#c92432] active:scale-98 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span className="text-sm">SELL (Short)</span>
            <span className="text-xs opacity-80 font-mono">
              @{livePrice.toFixed(selectedTicker.decimals)}
            </span>
          </button>
        </div>

        {/* Active Open Position Card if any */}
        {currentPosition && (
          <div className="mt-3 p-3 bg-[#1e222d] border border-zinc-700 rounded-lg flex items-center justify-between text-xs">
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold ${currentPosition.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {currentPosition.type} {currentPosition.amount} {currentPosition.symbol}
                </span>
                <span className="text-zinc-400 font-mono">@ {currentPosition.entryPrice}</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                Current P&L:{' '}
                <span
                  className={`font-mono font-bold ${
                    (livePrice - currentPosition.entryPrice) * (currentPosition.type === 'BUY' ? 1 : -1) >= 0
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  ${((livePrice - currentPosition.entryPrice) * currentPosition.amount * (currentPosition.type === 'BUY' ? 1 : -1)).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => onClosePosition(currentPosition.id)}
              className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded text-xs font-semibold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Asset Overview & Key Stats */}
      <div className="p-4 bg-black">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Key Statistics</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-[#131722] p-2.5 rounded-lg border border-[#2a2e39]">
            <span className="text-zinc-500 block text-[11px]">24h High</span>
            <span className="font-semibold font-mono text-zinc-200">{selectedTicker.high}</span>
          </div>
          <div className="bg-[#131722] p-2.5 rounded-lg border border-[#2a2e39]">
            <span className="text-zinc-500 block text-[11px]">24h Low</span>
            <span className="font-semibold font-mono text-zinc-200">{selectedTicker.low}</span>
          </div>
          <div className="bg-[#131722] p-2.5 rounded-lg border border-[#2a2e39]">
            <span className="text-zinc-500 block text-[11px]">Volume</span>
            <span className="font-semibold font-mono text-zinc-200">{selectedTicker.volume}</span>
          </div>
          <div className="bg-[#131722] p-2.5 rounded-lg border border-[#2a2e39]">
            <span className="text-zinc-500 block text-[11px]">Market Category</span>
            <span className="font-semibold capitalize text-zinc-200">{selectedTicker.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
