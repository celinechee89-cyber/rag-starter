import React, { useState } from 'react';
import { Candle } from '../types/market';

interface SuperchartsPreviewProps {
  onOpenFullChart: () => void;
  currentPrice: number;
}

export const SuperchartsPreview: React.FC<SuperchartsPreviewProps> = ({
  onOpenFullChart,
  currentPrice,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '5D' | '1M' | '1Y' | 'ALL'>('1Y');
  const [activeIndicator, setActiveIndicator] = useState<string | null>(null);
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

  // 11 distinct candlesticks matching the HTML SVG layout
  const candlesData: {
    wickY1: number;
    wickY2: number;
    bodyY: number;
    bodyH: number;
    isBull: boolean;
    volH: number;
    open: number;
    high: number;
    low: number;
    close: number;
    time: string;
  }[] = [
    { wickY1: 90, wickY2: 135, bodyY: 98, bodyH: 28, isBull: true, volH: 15, open: 81200, high: 81700, low: 80800, close: 81550, time: 'Nov 02' },
    { wickY1: 92, wickY2: 128, bodyY: 102, bodyH: 20, isBull: false, volH: 10, open: 81550, high: 81650, low: 81000, close: 81300, time: 'Nov 03' },
    { wickY1: 80, wickY2: 120, bodyY: 86, bodyH: 28, isBull: true, volH: 20, open: 81300, high: 81900, low: 81100, close: 81750, time: 'Nov 04' },
    { wickY1: 70, wickY2: 110, bodyY: 74, bodyH: 24, isBull: true, volH: 22, open: 81750, high: 82250, low: 81600, close: 82100, time: 'Nov 05' },
    { wickY1: 65, wickY2: 100, bodyY: 72, bodyH: 18, isBull: false, volH: 12, open: 82100, high: 82200, low: 81800, close: 81950, time: 'Nov 06' },
    { wickY1: 60, wickY2: 115, bodyY: 65, bodyH: 14, isBull: true, volH: 18, open: 81950, high: 82400, low: 81700, close: 82200, time: 'Nov 07' },
    { wickY1: 42, wickY2: 85, bodyY: 48, bodyH: 26, isBull: true, volH: 28, open: 82200, high: 82900, low: 82100, close: 82750, time: 'Nov 08' },
    { wickY1: 45, wickY2: 78, bodyY: 52, bodyH: 15, isBull: false, volH: 14, open: 82750, high: 82850, low: 82400, close: 82550, time: 'Nov 09' },
    { wickY1: 30, wickY2: 70, bodyY: 36, bodyH: 30, isBull: true, volH: 34, open: 82550, high: 83400, low: 82450, close: 83200, time: 'Nov 10' },
    { wickY1: 32, wickY2: 62, bodyY: 38, bodyH: 14, isBull: false, volH: 15, open: 83200, high: 83300, low: 82950, close: 83050, time: 'Nov 11' },
    { wickY1: 18, wickY2: 58, bodyY: 22, bodyH: 26, isBull: true, volH: 38, open: 83050, high: 83800, low: 83000, close: currentPrice, time: 'Live' },
  ];

  const currentCandle = hoveredCandle !== null ? candlesData[hoveredCandle] : candlesData[candlesData.length - 1];

  return (
    <section className="py-8 px-4" data-purpose="supercharts-preview">
      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center">
          Supercharged Supercharts
        </h2>
        <p className="text-xs text-zinc-400 mt-1">Explore all features for every level of analysis.</p>
      </div>

      {/* Chart Mockup Card */}
      <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl overflow-hidden shadow-2xl">
        {/* Mockup Toolbar */}
        <div className="px-3 py-2.5 border-b border-[#2a2e39] flex items-center justify-between bg-[#1e222d]/60 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white tracking-wide">BTCUSDT</span>
            <span className="text-zinc-400">·</span>
            <span className="text-zinc-300 font-medium">{selectedTimeframe === '1D' ? '1h' : '4h'}</span>
            <span className="text-emerald-400 font-mono text-[11px] font-semibold tabular-nums">
              {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setActiveIndicator(activeIndicator === 'RSI' ? null : 'RSI')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer transition-colors ${
                activeIndicator === 'RSI'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25'
              }`}
            >
              RSI 62
            </button>
            <button
              onClick={() => setActiveIndicator(activeIndicator === 'MACD' ? null : 'MACD')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer transition-colors ${
                activeIndicator === 'MACD'
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'bg-purple-500/15 text-purple-400 hover:bg-purple-500/25'
              }`}
            >
              MACD Bull
            </button>
          </div>
        </div>

        {/* Hover Inspector Banner */}
        <div className="px-3 py-1 bg-[#131722] border-b border-zinc-900 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
          <span>{currentCandle.time}</span>
          <div className="flex items-center space-x-2 tabular-nums">
            <span>O: <span className="text-zinc-200">{currentCandle.open}</span></span>
            <span>H: <span className="text-zinc-200">{currentCandle.high}</span></span>
            <span>L: <span className="text-zinc-200">{currentCandle.low}</span></span>
            <span>C: <span className={currentCandle.isBull ? 'text-emerald-400' : 'text-rose-400'}>{currentCandle.close}</span></span>
          </div>
        </div>

        {/* Interactive Candlestick SVG Chart Visualization */}
        <div className="p-3 bg-[#131722] relative select-none">
          <svg className="w-full h-44" viewBox="0 0 340 160">
            {/* Gridlines */}
            <line className="chart-grid-line" x1="0" x2="340" y1="30" y2="30" />
            <line className="chart-grid-line" x1="0" x2="340" y1="70" y2="70" />
            <line className="chart-grid-line" x1="0" x2="340" y1="110" y2="110" />

            {/* Price line indicator */}
            <line stroke="#2962ff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="340" y1="52" y2="52" />
            <rect fill="#2962ff" height="16" rx="3" width="54" x="286" y="44" />
            <text fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" x="313" y="55" className="font-mono">
              {Math.round(currentPrice).toLocaleString()}
            </text>

            {/* Interactive Candle Columns */}
            {candlesData.map((c, i) => {
              const xPos = 20 + i * 25;
              const isHovered = hoveredCandle === i;
              const color = c.isBull ? '#089981' : '#f23645';

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCandle(i)}
                  onMouseLeave={() => setHoveredCandle(null)}
                  onTouchStart={() => setHoveredCandle(i)}
                >
                  {/* Subtle hover column highlight */}
                  {isHovered && (
                    <rect
                      x={xPos - 10}
                      y="10"
                      width="20"
                      height="145"
                      fill="rgba(255, 255, 255, 0.05)"
                      rx="2"
                    />
                  )}

                  {/* Candle Wick */}
                  <line
                    stroke={color}
                    strokeWidth="1.5"
                    x1={xPos}
                    x2={xPos}
                    y1={c.wickY1}
                    y2={c.wickY2}
                  />

                  {/* Candle Body */}
                  <rect
                    fill={color}
                    height={c.bodyH}
                    rx="1"
                    width="10"
                    x={xPos - 5}
                    y={c.bodyY}
                  />

                  {/* Volume Bar Bottom */}
                  <rect
                    fill={color}
                    height={c.volH}
                    opacity={isHovered ? 0.8 : 0.4}
                    width="8"
                    x={xPos - 4}
                    y={160 - c.volH}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Timeframe Toolbar */}
        <div className="px-3 py-2 border-t border-[#2a2e39] flex items-center justify-between text-xs text-zinc-400">
          <div className="flex space-x-3">
            {(['1D', '5D', '1M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`transition-colors cursor-pointer font-medium ${
                  selectedTimeframe === tf
                    ? 'text-blue-400 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <button
            onClick={onOpenFullChart}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>Full chart</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
