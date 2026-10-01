import { Ticker, Idea, Candle, LiveStreamSession, CommunityChatMessage } from '../types/market';

export const INITIAL_TICKERS: Ticker[] = [
  {
    id: 'spx',
    symbol: 'SPX',
    name: 'S&P 500 Index',
    category: 'indices',
    price: 5864.67,
    change: 24.50,
    changePercent: 0.42,
    high: 5872.10,
    low: 5841.30,
    volume: '3.82B',
    sparkline: [14, 15, 13, 16, 17, 15, 18, 19, 21, 22],
    decimals: 2,
    currencyPrefix: '',
  },
  {
    id: 'ndx',
    symbol: 'NDX',
    name: 'Nasdaq 100',
    category: 'indices',
    price: 20412.30,
    change: 137.80,
    changePercent: 0.68,
    high: 20450.15,
    low: 20290.40,
    volume: '5.14B',
    sparkline: [12, 11, 14, 13, 16, 17, 18, 19, 20, 23],
    decimals: 2,
    currencyPrefix: '',
  },
  {
    id: 'btcusd',
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'crypto',
    price: 83330.00,
    change: 1755.00,
    changePercent: 2.15,
    high: 84120.00,
    low: 81450.00,
    volume: '$42.1B',
    sparkline: [10, 12, 11, 15, 14, 18, 20, 22, 21, 25],
    decimals: 2,
    currencyPrefix: '$',
  },
  {
    id: 'xauusd',
    symbol: 'XAU/USD',
    name: 'Gold Spot',
    category: 'futures',
    price: 4148.50,
    change: -14.20,
    changePercent: -0.34,
    high: 4172.00,
    low: 4135.20,
    volume: '184K',
    sparkline: [24, 22, 23, 20, 18, 19, 16, 15, 14, 13],
    decimals: 2,
    currencyPrefix: '$',
  },
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'forex',
    price: 1.0842,
    change: -0.0007,
    changePercent: -0.06,
    high: 1.0875,
    low: 1.0831,
    volume: '1.2M',
    sparkline: [19, 18, 17, 18, 16, 15, 14, 14, 13, 12],
    decimals: 4,
    currencyPrefix: '',
  },
  {
    id: 'ethusd',
    symbol: 'ETH/USD',
    name: 'Ethereum',
    category: 'crypto',
    price: 3410.85,
    change: 58.20,
    changePercent: 1.74,
    high: 3445.00,
    low: 3320.00,
    volume: '$18.4B',
    sparkline: [11, 13, 12, 14, 16, 18, 17, 19, 21, 23],
    decimals: 2,
    currencyPrefix: '$',
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    category: 'stocks',
    price: 142.60,
    change: 3.45,
    changePercent: 2.48,
    high: 144.20,
    low: 139.50,
    volume: '48.9M',
    sparkline: [12, 13, 15, 14, 17, 19, 20, 22, 23, 25],
    decimals: 2,
    currencyPrefix: '$',
  },
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'stocks',
    price: 234.80,
    change: 1.15,
    changePercent: 0.49,
    high: 236.10,
    low: 233.20,
    volume: '34.2M',
    sparkline: [15, 16, 16, 17, 18, 17, 18, 19, 19, 20],
    decimals: 2,
    currencyPrefix: '$',
  },
  {
    id: 'cl1',
    symbol: 'CL',
    name: 'Crude Oil WTI',
    category: 'commodities',
    price: 71.85,
    change: -0.92,
    changePercent: -1.26,
    high: 73.10,
    low: 71.40,
    volume: '280K',
    sparkline: [22, 20, 21, 18, 19, 16, 15, 14, 13, 12],
    decimals: 2,
    currencyPrefix: '$',
  }
];

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    author: 'KlejdiCuni',
    authorInitials: 'KC',
    avatarBg: 'bg-blue-600',
    direction: 'Long',
    symbol: 'BTCUSDT',
    timeframe: '1D',
    title: 'BTC: Bullish accumulation suggests BTC is likely to rise further',
    description: 'Bitcoin has broken key resistance near previous highs with volume expansion. Support held cleanly on the pullback.',
    fullAnalysis: `Bitcoin is exhibiting classic Wyckoff re-accumulation characteristics on the daily timeframe. 

1. Volume Confirmation: On the breakout above $81,500, aggregate spot exchange volumes printed 45% above the 20-day moving average.
2. Market Structure: The recent pullback to $82,400 formed a confirmed higher-low on decreasing volume, testing previous supply as newfound structural demand.
3. On-chain Liquidity: Exchange reserve outflows reached multi-month highs this week, indicating continued institutional absorption.

Key Targets:
- Target 1: $86,400 (Local 1.272 extension)
- Target 2: $91,200 (1.618 golden expansion)
- Invalidation / Stop Loss: Daily close below $80,800.`,
    likes: 482,
    comments: 64,
    date: '2h ago',
    entryPrice: 82950,
    targetPrice: 89000,
    stopLoss: 80800,
    commentsList: [
      {
        id: 'c1',
        author: 'TraderVanguard',
        avatarBg: 'bg-emerald-600',
        time: '1h ago',
        text: 'Clean setup! That volume shelf at $82k is rock solid. Riding this long with you.'
      },
      {
        id: 'c2',
        author: 'MacroAlpha',
        avatarBg: 'bg-purple-600',
        time: '45m ago',
        text: 'Watch out for tomorrow\'s FOMC commentary. Might produce a brief wick down before the leg higher.'
      }
    ]
  },
  {
    id: 'idea-2',
    author: 'FOREX.com',
    authorInitials: 'FX',
    avatarBg: 'bg-orange-600',
    direction: 'Short',
    symbol: 'EURUSD',
    timeframe: '4h',
    title: 'EUR/USD Fresh Yearly Low - Most Oversold Since March',
    description: 'Euro continues its downward drift against the greenback ahead of next week\'s policy meetings.',
    fullAnalysis: `The Euro remains heavy against the US Dollar as divergent macroeconomic momentum between the Federal Reserve and ECB continues to dictate directional flow.

Technical Factors:
- Bearish trendline intact since the breakdown from 1.0950.
- RSI(14) reading at 28.5 indicates sustained downward momentum rather than immediate bullish reversal.
- Price is testing the lower Bollinger Band with expanding bandwidth.

Forecast:
Look for counter-trend rallies toward 1.0880 to be met with active institutional sellers. Sustained move below 1.0820 opens the psychological 1.0750 handle.`,
    likes: 219,
    comments: 31,
    date: '4h ago',
    entryPrice: 1.0860,
    targetPrice: 1.0750,
    stopLoss: 1.0920,
    commentsList: [
      {
        id: 'c3',
        author: 'FXPipsPro',
        avatarBg: 'bg-amber-600',
        time: '3h ago',
        text: 'Target 1.0750 seems very realistic considering the rate spread.'
      }
    ]
  },
  {
    id: 'idea-3',
    author: 'TechMomentum',
    authorInitials: 'TM',
    avatarBg: 'bg-indigo-600',
    direction: 'Long',
    symbol: 'NVDA',
    timeframe: '1D',
    title: 'NVIDIA: Bull flag breakout aiming for $155 psychological resistance',
    description: 'Data center Blackwell demand catalysts continuing into quarterly updates. Consolidation triangle resolved to the upside.',
    fullAnalysis: `NVIDIA (NVDA) has concluded a 3-week ascending flag consolidation following the previous earnings gap.

Key observations:
1. Relative Strength: NVDA is leading the semiconductors basket (SMH) by a wide margin.
2. Volume profile shows strong point-of-control defense at $138.
3. Options open interest heavily skewed to $150 and $160 calls for next month's expiry.`,
    likes: 358,
    comments: 42,
    date: '6h ago',
    entryPrice: 141.20,
    targetPrice: 155.00,
    stopLoss: 136.50,
    commentsList: []
  },
  {
    id: 'idea-4',
    author: 'GoldBullionHQ',
    authorInitials: 'GB',
    avatarBg: 'bg-amber-600',
    direction: 'Long',
    symbol: 'XAUUSD',
    timeframe: '1W',
    title: 'Gold: Historic macro breakout testing higher boundaries of parabolic channel',
    description: 'Central bank physical reserve accumulation continues at historic pace. Mild pullbacks remain high-probability dip buying opportunities.',
    fullAnalysis: `Gold remains in one of the strongest secular bull markets in decades. Despite temporary dollar firmness, dip buyers aggressively support the $4,120-$4,140 zone.

Target: $4,350 by Q4.`,
    likes: 194,
    comments: 18,
    date: '12h ago',
    entryPrice: 4140,
    targetPrice: 4350,
    stopLoss: 4050,
    commentsList: []
  }
];

export const BTC_CANDLES_DEFAULT: Candle[] = [
  { time: '10:00', open: 80800, high: 81400, low: 80200, close: 81200, volume: 140 },
  { time: '11:00', open: 81200, high: 81350, low: 80700, close: 80900, volume: 95 },
  { time: '12:00', open: 80900, high: 81900, low: 80850, close: 81750, volume: 180 },
  { time: '13:00', open: 81750, high: 82400, low: 81600, close: 82200, volume: 210 },
  { time: '14:00', open: 82200, high: 82300, low: 81700, close: 81850, volume: 120 },
  { time: '15:00', open: 81850, high: 82600, low: 81800, close: 82500, volume: 165 },
  { time: '16:00', open: 82500, high: 83200, low: 82350, close: 83100, volume: 270 },
  { time: '17:00', open: 83100, high: 83150, low: 82600, close: 82800, volume: 135 },
  { time: '18:00', open: 82800, high: 83600, low: 82750, close: 83500, volume: 320 },
  { time: '19:00', open: 83500, high: 83550, low: 83050, close: 83200, volume: 150 },
  { time: '20:00', open: 83200, high: 83950, low: 83100, close: 83330, volume: 380 },
];

export const LIVE_STREAMS: LiveStreamSession[] = [
  {
    id: 'stream-1',
    title: 'Crypto Moonshot & BTC $85k Liquidity Hunt',
    host: 'Alex "Satoshi" Miller',
    listeners: 3420,
    isLive: true,
    tag: 'Crypto',
    avatar: 'AM',
  },
  {
    id: 'stream-2',
    title: 'Fed Rate Watch & US Equities Power Hour',
    host: 'WallStreetDaily Live',
    listeners: 1840,
    isLive: true,
    tag: 'Stocks',
    avatar: 'WS',
  },
  {
    id: 'stream-3',
    title: 'London Forex Open: EUR/USD & GBP Scenarios',
    host: 'FX Maestro',
    listeners: 920,
    isLive: true,
    tag: 'Forex',
    avatar: 'FX',
  }
];

export const INITIAL_CHAT_MESSAGES: CommunityChatMessage[] = [
  {
    id: 'm1',
    user: 'CyberTrader99',
    avatarBg: 'bg-blue-600',
    time: '23:25',
    symbolTag: 'BTCUSDT',
    message: 'Huge bid wall just stepped in at $83,100! Looks like market makers want $84k before Asian open.'
  },
  {
    id: 'm2',
    user: 'Sophia_Trades',
    avatarBg: 'bg-emerald-600',
    time: '23:26',
    symbolTag: 'SPX',
    message: '5,860 on S&P was rejected 3 times, but breadth is holding up. Not shorting into this momentum.'
  },
  {
    id: 'm3',
    user: 'QuantumQuant',
    avatarBg: 'bg-purple-600',
    time: '23:27',
    symbolTag: 'NVDA',
    message: 'NVDA implied volatility dropping while spot rises. Classic institutional accumulation signal.'
  }
];
