import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { HeroSection } from './components/HeroSection';
import { LiveMarkets } from './components/LiveMarkets';
import { SuperchartsPreview } from './components/SuperchartsPreview';
import { CommunityIdeasSection } from './components/CommunityIdeasSection';
import { SuperchartsScreen } from './components/SuperchartsScreen';
import { IdeasScreen } from './components/IdeasScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { MenuScreen } from './components/MenuScreen';
import { SymbolSearchModal } from './components/SymbolSearchModal';
import { SpaceStoryModal } from './components/SpaceStoryModal';
import { AuthModal } from './components/AuthModal';
import { IdeaDetailModal } from './components/IdeaDetailModal';
import { PublishIdeaModal } from './components/PublishIdeaModal';

import { INITIAL_TICKERS, INITIAL_IDEAS } from './data/marketData';
import { Ticker, MarketCategory, Idea, Alert, PaperPosition } from './types/market';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('markets');
  const [tickers, setTickers] = useState<Ticker[]>(INITIAL_TICKERS);
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('indices');
  const [selectedTicker, setSelectedTicker] = useState<Ticker>(INITIAL_TICKERS[2]); // BTC default
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSpaceStoryOpen, setIsSpaceStoryOpen] = useState(false);
  const [selectedIdeaDetail, setSelectedIdeaDetail] = useState<Idea | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // User state & paper trading
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [openPositions, setOpenPositions] = useState<PaperPosition[]>([
    {
      id: 'pos-1',
      symbol: 'BTC/USD',
      type: 'BUY',
      entryPrice: 82500,
      currentPrice: 83330,
      amount: 0.25,
      pnl: 207.50,
      pnlPercent: 1.01,
      timestamp: 'Today, 10:15',
    }
  ]);
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'al-1',
      symbol: 'BTC/USD',
      targetPrice: 85000,
      condition: 'above',
      active: true,
      triggered: false,
      created: 'Today',
    },
    {
      id: 'al-2',
      symbol: 'SPX',
      targetPrice: 5900,
      condition: 'above',
      active: true,
      triggered: false,
      created: 'Yesterday',
    }
  ]);

  // Live market price tick simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((t) => {
          // 40% chance of small price fluctuation
          if (Math.random() > 0.4) {
            const deltaPercent = (Math.random() - 0.49) * 0.0015;
            const newPrice = Number((t.price * (1 + deltaPercent)).toFixed(t.decimals));
            const newChange = Number((t.change + (newPrice - t.price)).toFixed(t.decimals));
            const newChangePercent = Number(((newChange / (t.price - t.change)) * 100).toFixed(2));
            return {
              ...t,
              prevPrice: t.price,
              price: newPrice,
              change: newChange,
              changePercent: newChangePercent,
            };
          }
          return t;
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Sync selected ticker with live price updates
  const currentLiveTicker = tickers.find((t) => t.id === selectedTicker.id) || selectedTicker;

  // Handlers
  const handleSelectTicker = (t: Ticker) => {
    setSelectedTicker(t);
    setActiveTab('charts');
  };

  const handleToggleLike = (ideaId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const isLiked = !idea.isLiked;
          return {
            ...idea,
            isLiked,
            likes: isLiked ? idea.likes + 1 : idea.likes - 1,
          };
        }
        return idea;
      })
    );
    if (selectedIdeaDetail && selectedIdeaDetail.id === ideaId) {
      setSelectedIdeaDetail((prev) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1,
            }
          : null
      );
    }
  };

  const handleAddComment = (ideaId: string, commentText: string) => {
    const newComment = {
      id: 'c-' + Date.now(),
      author: userEmail ? userEmail.split('@')[0] : 'Trader_You',
      avatarBg: 'bg-blue-600',
      time: 'Just now',
      text: commentText,
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            comments: idea.comments + 1,
            commentsList: [...idea.commentsList, newComment],
          };
        }
        return idea;
      })
    );

    if (selectedIdeaDetail && selectedIdeaDetail.id === ideaId) {
      setSelectedIdeaDetail((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments + 1,
              commentsList: [...prev.commentsList, newComment],
            }
          : null
      );
    }
  };

  const handlePublishIdea = (
    newIdeaData: Omit<Idea, 'id' | 'likes' | 'comments' | 'commentsList' | 'date'>
  ) => {
    const created: Idea = {
      ...newIdeaData,
      id: 'idea-' + Date.now(),
      likes: 1,
      isLiked: true,
      comments: 0,
      commentsList: [],
      date: 'Just now',
    };
    setIdeas((prev) => [created, ...prev]);
    setActiveTab('ideas');
  };

  const handleExecuteTrade = (
    type: 'BUY' | 'SELL',
    symbol: string,
    price: number,
    amount: number
  ) => {
    const newPos: PaperPosition = {
      id: 'pos-' + Date.now(),
      symbol,
      type,
      entryPrice: price,
      currentPrice: price,
      amount,
      pnl: 0,
      pnlPercent: 0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setOpenPositions((prev) => [newPos, ...prev]);
  };

  const handleClosePosition = (id: string) => {
    setOpenPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddAlert = (symbol: string, price: number, condition: 'above' | 'below') => {
    const newAlert: Alert = {
      id: 'al-' + Date.now(),
      symbol,
      targetPrice: price,
      condition,
      active: true,
      triggered: false,
      created: 'Just now',
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-black min-h-screen text-white flex justify-center selection:bg-blue-600 selection:text-white">
      {/* Centered device container matching the exact mobile screenshot dimensions */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl min-h-screen relative bg-black shadow-2xl flex flex-col border-x border-zinc-900/60">
        {/* Top Navigation */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenMenu={() => setActiveTab('menu')}
          onGoHome={() => setActiveTab('markets')}
        />

        {/* Tab View Screens */}
        <main className="flex-1 pb-16">
          {activeTab === 'markets' && (
            <div>
              {/* Screen 1: Hero & Main markets feed (Exact match to screenshot) */}
              <HeroSection
                onGetStarted={() => setIsAuthOpen(true)}
                onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
              />

              <LiveMarkets
                tickers={tickers}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                onSelectTicker={handleSelectTicker}
              />

              <SuperchartsPreview
                onOpenFullChart={() => setActiveTab('charts')}
                currentPrice={currentLiveTicker.price}
              />

              <CommunityIdeasSection
                ideas={ideas}
                onSelectIdea={(idea) => setSelectedIdeaDetail(idea)}
                onToggleLike={handleToggleLike}
                onViewAll={() => setActiveTab('ideas')}
              />
            </div>
          )}

          {activeTab === 'charts' && (
            <SuperchartsScreen
              selectedTicker={currentLiveTicker}
              onOpenSearch={() => setIsSearchOpen(true)}
              onExecuteTrade={handleExecuteTrade}
              openPositions={openPositions}
              onClosePosition={handleClosePosition}
            />
          )}

          {activeTab === 'ideas' && (
            <IdeasScreen
              ideas={ideas}
              onSelectIdea={(idea) => setSelectedIdeaDetail(idea)}
              onToggleLike={handleToggleLike}
              onOpenPublishModal={() => setIsPublishModalOpen(true)}
            />
          )}

          {activeTab === 'community' && <CommunityScreen />}

          {activeTab === 'menu' && (
            <MenuScreen
              openPositions={openPositions}
              onClosePosition={handleClosePosition}
              alerts={alerts}
              onAddAlert={handleAddAlert}
              onDeleteAlert={handleDeleteAlert}
              onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
              onOpenAuth={() => setIsAuthOpen(true)}
              tickers={tickers}
              onSelectTicker={handleSelectTicker}
            />
          )}
        </main>

        {/* Bottom Fixed Navigation Bar */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Modals & Overlays */}
        <SymbolSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          tickers={tickers}
          onSelectTicker={handleSelectTicker}
        />

        <SpaceStoryModal
          isOpen={isSpaceStoryOpen}
          onClose={() => setIsSpaceStoryOpen(false)}
          onGetStarted={() => setIsAuthOpen(true)}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(email) => setUserEmail(email)}
        />

        <IdeaDetailModal
          idea={selectedIdeaDetail}
          onClose={() => setSelectedIdeaDetail(null)}
          onToggleLike={(id) => handleToggleLike(id)}
          onAddComment={handleAddComment}
        />

        <PublishIdeaModal
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          tickers={tickers}
          onPublish={handlePublishIdea}
        />
      </div>
    </div>
  );
}
