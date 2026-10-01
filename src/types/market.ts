export type MarketCategory = 'indices' | 'crypto' | 'futures' | 'forex' | 'stocks' | 'commodities';

export interface Ticker {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  sparkline: number[];
  decimals: number;
  currencyPrefix: string;
  prevPrice?: number;
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IdeaComment {
  id: string;
  author: string;
  avatarBg: string;
  time: string;
  text: string;
}

export interface Idea {
  id: string;
  author: string;
  authorInitials: string;
  avatarBg: string;
  direction: 'Long' | 'Short';
  title: string;
  description: string;
  fullAnalysis: string;
  symbol: string;
  timeframe: string;
  likes: number;
  comments: number;
  commentsList: IdeaComment[];
  isLiked?: boolean;
  date: string;
  entryPrice?: number;
  targetPrice?: number;
  stopLoss?: number;
}

export interface Alert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  active: boolean;
  triggered: boolean;
  created: string;
}

export interface PaperPosition {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  currentPrice: number;
  amount: number;
  pnl: number;
  pnlPercent: number;
  timestamp: string;
}

export interface LiveStreamSession {
  id: string;
  title: string;
  host: string;
  listeners: number;
  isLive: boolean;
  tag: string;
  avatar: string;
}

export interface CommunityChatMessage {
  id: string;
  user: string;
  avatarBg: string;
  time: string;
  message: string;
  symbolTag?: string;
}
