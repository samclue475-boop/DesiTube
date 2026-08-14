import React, { useState, useMemo } from 'react';
import { 
  MOCK_VIDEOS, 
  MOCK_SHORTS, 
  INITIAL_WALLET_BALANCE, 
  INITIAL_TRANSACTIONS 
} from './data/mockVideos';
import { Video, VideoCategory, ActiveTab, WalletTransaction } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CategoryChips } from './components/CategoryChips';
import { HeroBanner } from './components/HeroBanner';
import { VideoCard } from './components/VideoCard';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { UploadModal } from './components/UploadModal';
import { WalletModal } from './components/WalletModal';
import { ApkModal } from './components/ApkModal';
import { ShortsView } from './components/ShortsView';
import { SubscriptionsView } from './components/SubscriptionsView';
import { LibraryView } from './components/LibraryView';
import { BottomNavBar } from './components/BottomNavBar';
import { FlutterPhoneFrame } from './components/FlutterPhoneFrame';
import { sounds } from './utils/audio';
import { Sparkles, Coins, Flame, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [shorts, setShorts] = useState<Video[]>(MOCK_SHORTS);
  const [walletBalance, setWalletBalance] = useState<number>(INITIAL_WALLET_BALANCE);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePlayingVideo, setActivePlayingVideo] = useState<Video | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);
  const [hasClaimedDailyBonus, setHasClaimedDailyBonus] = useState<boolean>(false);
  const [isFlutterMode, setIsFlutterMode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show a momentary rewards popup
  const showRewardToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Earn Coins Handler (e.g. Watch video, Upload video, Like/Comment)
  const handleEarnCoins = (amount: number, reason: string) => {
    sounds.playCoinChime();
    setWalletBalance((prev) => prev + amount);
    
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      title: reason,
      type: 'credit',
      amount: amount,
      date: 'Just now',
      description: 'Earned on DesiTube rewards program',
      status: 'completed',
      iconType: amount >= 50 ? 'upload' : 'watch'
    };

    setTransactions((prev) => [newTx, ...prev]);
    showRewardToast(`+₹${amount} Added to Wallet! (${reason})`);
  };

  // Withdraw Handler
  const handleWithdraw = (amount: number, upiId: string) => {
    setWalletBalance((prev) => Math.max(0, prev - amount));
    const newTx: WalletTransaction = {
      id: `tx-with-${Date.now()}`,
      title: `UPI Payout to ${upiId}`,
      type: 'debit',
      amount: amount,
      date: 'Just now',
      description: `NPCI Instant Transfer to ${upiId}`,
      status: 'completed',
      iconType: 'withdraw'
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Daily Bonus
  const handleClaimDailyBonus = () => {
    if (hasClaimedDailyBonus) return;
    setHasClaimedDailyBonus(true);
    handleEarnCoins(25, 'Daily Indian Creator Login Bonus');
  };

  // Upload Video Handler (User clicks green upload button)
  const handleUploadSuccess = (newVideo: Video) => {
    setVideos((prev) => [newVideo, ...prev]);
    setIsUploadModalOpen(false);
    handleEarnCoins(50, 'Green Upload Video Creator Incentive');
    setActiveTab('home');
  };

  // Toggle Subscribe for channels
  const handleToggleSubscribe = (channelId: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.channel.id === channelId) {
          const currentStatus = v.channel.isSubscribed;
          return {
            ...v,
            channel: {
              ...v.channel,
              isSubscribed: !currentStatus,
            },
          };
        }
        return v;
      })
    );
  };

  // Filtered Videos based on category & search query
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Trending 🇮🇳' ? v.viewCount > 3000000 : v.category === selectedCategory);
      const matchesSearch =
        searchQuery.trim() === '' ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channel.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [videos, selectedCategory, searchQuery]);

  const featuredVideo = videos[0];

  return (
    <FlutterPhoneFrame 
      isFlutterMode={isFlutterMode} 
      onToggleFlutterMode={() => setIsFlutterMode(!isFlutterMode)}
      onOpenApkModal={() => setIsApkModalOpen(true)}
    >
      <div className={`w-full ${isFlutterMode ? 'flex flex-col' : 'flex min-h-screen bg-[#0f0f0f]'}`}>
        
        {/* Desktop Sleek Sidebar (hidden in phone frame mode or mobile view) */}
        {!isFlutterMode && (
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            walletBalance={walletBalance}
            onOpenWallet={() => setIsWalletModalOpen(true)}
            onOpenApkModal={() => setIsApkModalOpen(true)}
          />
        )}

        <div className="flex-1 flex flex-col min-w-0">
          {/* 1. Header with Red Play Logo, Green Upload, and ₹780 Wallet Counter */}
          <Header
            walletBalance={walletBalance}
            onOpenWallet={() => setIsWalletModalOpen(true)}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onOpenApkModal={() => setIsApkModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isFlutterMode={isFlutterMode}
            onToggleFlutterMode={() => setIsFlutterMode(!isFlutterMode)}
            onSelectTab={setActiveTab}
            activeTab={activeTab}
          />

          {/* Main Tab Content */}
          <main className="flex-1 pb-20 overflow-y-auto">
            {activeTab === 'home' && (
              <div className="flex flex-col">
                {/* Category Chips Scroll */}
                <CategoryChips
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Top Spotlight Banner with Big Red Play Button & Green Upload Action */}
                {!searchQuery && selectedCategory === 'All' && (
                  <HeroBanner
                    featuredVideo={featuredVideo}
                    onPlayFeatured={(v) => setActivePlayingVideo(v)}
                    onOpenUpload={() => setIsUploadModalOpen(true)}
                    onOpenWallet={() => setIsWalletModalOpen(true)}
                    walletBalance={walletBalance}
                  />
                )}

                {/* Video Feed Grid */}
                <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                  {filteredVideos.length === 0 ? (
                    <div className="text-center py-16 bg-[#121212] rounded-2xl border border-[#272727] my-4">
                      <Flame className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-white">No videos found</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Try searching for different keywords or clear the category filter.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All');
                        }}
                        className="mt-4 px-4 py-2 rounded-full bg-[#272727] text-gray-200 text-xs font-semibold hover:bg-[#3f3f3f] cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {filteredVideos.map((video) => (
                        <VideoCard
                          key={video.id}
                          video={video}
                          onSelectVideo={(v) => setActivePlayingVideo(v)}
                          onToggleSubscribe={handleToggleSubscribe}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Shorts */}
            {activeTab === 'shorts' && (
              <ShortsView
                shorts={shorts}
                onEarnCoins={handleEarnCoins}
                onToggleSubscribe={handleToggleSubscribe}
              />
            )}

            {/* Tab 3: Subscriptions */}
            {activeTab === 'subscriptions' && (
              <SubscriptionsView
                videos={videos}
                onSelectVideo={(v) => setActivePlayingVideo(v)}
                onOpenUpload={() => setIsUploadModalOpen(true)}
              />
            )}

            {/* Tab 4: Library & Account */}
            {activeTab === 'library' && (
              <LibraryView
                videos={videos}
                onSelectVideo={(v) => setActivePlayingVideo(v)}
                walletBalance={walletBalance}
                onOpenWallet={() => setIsWalletModalOpen(true)}
                onOpenUpload={() => setIsUploadModalOpen(true)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar for Mobile / Flutter feel */}
      <BottomNavBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        walletBalance={walletBalance}
      />

      {/* Video Player Modal with Red Play Button Theater & Comments */}
      {activePlayingVideo && (
        <VideoPlayerModal
          video={activePlayingVideo}
          onClose={() => setActivePlayingVideo(null)}
          onSelectRelatedVideo={(v) => setActivePlayingVideo(v)}
          relatedVideos={videos.filter((v) => v.id !== activePlayingVideo.id)}
          onEarnCoins={handleEarnCoins}
          onToggleSubscribe={handleToggleSubscribe}
        />
      )}

      {/* GREEN UPLOAD MODAL */}
      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {/* WALLET COUNTER MODAL (Showing ₹780) */}
      {isWalletModalOpen && (
        <WalletModal
          balance={walletBalance}
          transactions={transactions}
          onClose={() => setIsWalletModalOpen(false)}
          onWithdraw={handleWithdraw}
          onClaimDailyBonus={handleClaimDailyBonus}
          hasClaimedDailyBonus={hasClaimedDailyBonus}
        />
      )}

      {/* ANDROID APK & INSTALL MODAL */}
      <ApkModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Reward Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] border border-[#2BA640] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold"
          >
            <div className="w-5 h-5 rounded-full bg-[#2BA640] text-white flex items-center justify-center font-black text-xs">
              ₹
            </div>
            <span className="text-[#2BA640]">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </FlutterPhoneFrame>
  );
}
