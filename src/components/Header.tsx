import React, { useState } from 'react';
import { 
  Play, 
  Upload, 
  Wallet, 
  Search, 
  Mic, 
  Bell, 
  Smartphone, 
  Monitor, 
  Menu, 
  X,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  walletBalance: number;
  onOpenWallet: () => void;
  onOpenUpload: () => void;
  onOpenApkModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isFlutterMode: boolean;
  onToggleFlutterMode: () => void;
  onSelectTab: (tab: 'home' | 'shorts' | 'subscriptions' | 'library' | 'trending') => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  walletBalance,
  onOpenWallet,
  onOpenUpload,
  onOpenApkModal,
  searchQuery,
  onSearchChange,
  isFlutterMode,
  onToggleFlutterMode,
  onSelectTab,
  activeTab
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  const handleVoiceSearch = () => {
    sounds.playTap();
    setIsListeningVoice(true);
    setTimeout(() => {
      onSearchChange('Cricket & Food');
      setIsListeningVoice(false);
    }, 1500);
  };

  const handleNotificationClick = () => {
    sounds.playTap();
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 3000);
  };

  return (
    <header className="h-16 sticky top-0 z-40 bg-[#0f0f0f] border-b border-[#272727] px-4 sm:px-6 flex items-center justify-between transition-colors">
      <div className="w-full flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Brand Logo with Red Play Button (visible on mobile / non-sidebar) */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            id="desitube-logo-btn"
            onClick={() => {
              sounds.playTap();
              onSelectTab('home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            title="DesiTube Home"
          >
            {/* The Signature RED PLAY BUTTON Logo */}
            <div className="bg-[#FF0000] w-10 h-7 rounded-lg flex items-center justify-center shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-xl text-[#f1f1f1] uppercase font-sans">
                Desi<span className="text-[#FF0000]">Tube</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#272727] text-amber-400 border border-[#333] hidden xs:inline-block">
                IN
              </span>
            </div>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-2 hidden sm:flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <input
              id="desitube-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos..."
              className="w-full bg-[#121212] text-[#f1f1f1] placeholder-gray-400 text-sm rounded-full py-2 px-6 border border-[#333] focus:outline-none focus:border-red-500 transition-colors"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 text-gray-400 hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute right-4 w-4 h-4 border-2 border-gray-500 rounded-full flex items-center justify-center pointer-events-none">
                <Search className="w-2.5 h-2.5 text-gray-500" />
              </div>
            )}
          </div>
          
          {/* Voice Search Mic */}
          <button
            id="desitube-voice-search-btn"
            onClick={handleVoiceSearch}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isListeningVoice 
                ? 'bg-[#FF0000] text-white border-[#FF0000] animate-pulse' 
                : 'bg-[#121212] hover:bg-[#272727] text-gray-300 border-[#333]'
            }`}
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Controls: Green Create, ₹780 Wallet Counter, View Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          
          {/* MOBILE SEARCH TOGGLE */}
          <button
            id="desitube-mobile-search-toggle"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="sm:hidden p-2 text-gray-300 hover:text-white rounded-full hover:bg-[#272727] transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* 🌟 1. THE GREEN UPLOAD/CREATE BUTTON (#2BA640) */}
          <motion.button
            id="desitube-green-upload-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sounds.playTap();
              onOpenUpload();
            }}
            className="bg-[#2BA640] hover:bg-[#259439] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold hover:opacity-95 shadow-md shadow-[#2BA640]/20 cursor-pointer transition-all"
            title="Create / Upload Video (+₹50)"
          >
            <span className="text-lg leading-none font-bold">+</span>
            <span>Create</span>
            <span className="hidden md:inline-block text-[10px] bg-black/20 text-white/90 px-1.5 py-0.5 rounded font-bold ml-0.5">
              +₹50
            </span>
          </motion.button>

          {/* 💰 2. THE WALLET COUNTER SHOWING ₹780 */}
          <motion.button
            id="desitube-wallet-counter-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sounds.playCoinChime();
              onOpenWallet();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#121212] hover:bg-[#272727] rounded-full border border-[#333] hover:border-[#2BA640]/80 cursor-pointer transition-all group"
            title="DesiTube Rewards Wallet"
          >
            <div className="w-5 h-5 rounded-full bg-[#2BA640]/20 text-[#2BA640] flex items-center justify-center font-bold text-xs">
              ₹
            </div>
            
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-[#f1f1f1] tracking-tight group-hover:text-[#2BA640] transition-colors">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>
          </motion.button>

          {/* APK / Install App Button */}
          <button
            id="desitube-apk-btn"
            onClick={() => {
              sounds.playTap();
              onOpenApkModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] hover:bg-[#272727] text-gray-300 hover:text-white rounded-full border border-[#333] hover:border-[#2BA640] text-xs font-semibold cursor-pointer transition-all"
            title="Download APK / Install App on Android"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#2BA640]" />
            <span className="hidden sm:inline">APK</span>
            <span className="text-[9px] bg-[#2BA640] text-white px-1 rounded-full font-bold">App</span>
          </button>

          {/* Flutter Mode / Desktop Mode Switcher */}
          <button
            id="desitube-flutter-view-toggle"
            onClick={() => {
              sounds.playTap();
              onToggleFlutterMode();
            }}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#272727] rounded-full transition-colors hidden md:flex items-center justify-center"
            title={isFlutterMode ? "Switch to Wide Desktop View" : "Switch to Flutter Mobile App Frame"}
          >
            {isFlutterMode ? (
              <Monitor className="w-5 h-5 text-amber-400" />
            ) : (
              <Smartphone className="w-5 h-5 text-gray-300" />
            )}
          </button>

          {/* Bell Notification */}
          <button
            id="desitube-notification-btn"
            onClick={handleNotificationClick}
            className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-[#272727] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF0000] rounded-full" />
          </button>

          {/* Creator Profile Avatar matching Sleek style */}
          <div 
            id="desitube-user-avatar"
            onClick={() => {
              sounds.playTap();
              onOpenWallet();
            }}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 border border-[#444] overflow-hidden cursor-pointer hover:border-white transition-all shrink-0"
            title="Creator Profile (Suraj)"
          >
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover opacity-90 hover:opacity-100"
            />
          </div>

        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden pt-2.5 pb-1 flex items-center gap-2 w-full bg-[#0f0f0f]"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 bg-[#121212] text-[#f1f1f1] placeholder-gray-400 text-sm rounded-full py-2 px-4 border border-[#333] focus:border-red-500 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setIsSearchExpanded(false)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 bg-[#1a1a1a] text-white text-xs border border-[#333] rounded-xl p-3 shadow-2xl z-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-[#2BA640]">₹25 Daily Check-in Bonus Ready!</p>
              <p className="text-gray-400">Open your wallet to claim daily reward.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
