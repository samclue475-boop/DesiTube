import React from 'react';
import { Home, Flame, Bell, User, Clock, Wallet, Sparkles, Compass, Smartphone, Download } from 'lucide-react';
import { ActiveTab } from '../types';
import { sounds } from '../utils/audio';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  walletBalance: number;
  onOpenWallet: () => void;
  onOpenApkModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  walletBalance,
  onOpenWallet,
  onOpenApkModal,
}) => {
  return (
    <aside 
      id="sleek-desktop-sidebar"
      className="hidden lg:flex w-60 flex-shrink-0 border-r border-[#272727] bg-[#0f0f0f] flex-col p-4 select-none"
    >
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 mb-6 px-2">
        <div className="bg-[#FF0000] w-10 h-7 rounded-lg flex items-center justify-center shadow-md shadow-red-600/30">
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
        </div>
        <span className="text-xl font-bold tracking-tight uppercase text-[#f1f1f1]">
          Desi<span className="text-[#FF0000]">Tube</span>
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1">
        <button
          id="sidebar-nav-home"
          onClick={() => {
            sounds.playTap();
            onSelectTab('home');
          }}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer text-left ${
            activeTab === 'home'
              ? 'bg-[#272727] text-[#f1f1f1] font-medium'
              : 'text-gray-300 hover:bg-[#272727] hover:text-[#f1f1f1]'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-white' : 'text-gray-400'}`} />
          <span className="text-sm">Home</span>
        </button>

        <button
          id="sidebar-nav-shorts"
          onClick={() => {
            sounds.playTap();
            onSelectTab('shorts');
          }}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer text-left ${
            activeTab === 'shorts'
              ? 'bg-[#272727] text-[#f1f1f1] font-medium'
              : 'text-gray-300 hover:bg-[#272727] hover:text-[#f1f1f1]'
          }`}
        >
          <Flame className={`w-5 h-5 ${activeTab === 'shorts' ? 'text-[#FF0000] fill-[#FF0000]' : 'text-gray-400'}`} />
          <span className="text-sm">Shorts</span>
        </button>

        <button
          id="sidebar-nav-subscriptions"
          onClick={() => {
            sounds.playTap();
            onSelectTab('subscriptions');
          }}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer text-left ${
            activeTab === 'subscriptions'
              ? 'bg-[#272727] text-[#f1f1f1] font-medium'
              : 'text-gray-300 hover:bg-[#272727] hover:text-[#f1f1f1]'
          }`}
        >
          <Bell className={`w-5 h-5 ${activeTab === 'subscriptions' ? 'text-white' : 'text-gray-400'}`} />
          <span className="text-sm">Subscriptions</span>
        </button>

        <div className="h-[1px] bg-[#272727] my-3" />

        <button
          id="sidebar-nav-library"
          onClick={() => {
            sounds.playTap();
            onSelectTab('library');
          }}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer text-left ${
            activeTab === 'library'
              ? 'bg-[#272727] text-[#f1f1f1] font-medium'
              : 'text-gray-300 hover:bg-[#272727] hover:text-[#f1f1f1]'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'library' ? 'text-white' : 'text-gray-400'}`} />
          <span className="text-sm">You & Library</span>
        </button>

        <button
          id="sidebar-nav-wallet-entry"
          onClick={() => {
            sounds.playCoinChime();
            onOpenWallet();
          }}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-300 hover:bg-[#272727] hover:text-[#f1f1f1] transition-colors cursor-pointer text-left"
        >
          <Wallet className="w-5 h-5 text-amber-400" />
          <span className="text-sm">Rewards Passbook</span>
        </button>

        <button
          id="sidebar-nav-apk-entry"
          onClick={() => {
            sounds.playTap();
            onOpenApkModal();
          }}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-300 hover:bg-[#272727] hover:text-[#f1f1f1] transition-colors cursor-pointer text-left group"
        >
          <Smartphone className="w-5 h-5 text-[#2BA640] group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-2">
            <span className="text-sm">Android APK</span>
            <span className="text-[10px] bg-[#2BA640] text-white px-1.5 py-0.2 rounded font-bold">
              Install
            </span>
          </div>
        </button>
      </nav>

      {/* Sleek Interface Premium Balance Widget */}
      <div 
        onClick={() => {
          sounds.playCoinChime();
          onOpenWallet();
        }}
        className="mt-auto p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-2xl cursor-pointer hover:border-[#2BA640]/60 transition-all group shadow-lg"
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            Premium Balance
          </p>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 opacity-80 group-hover:opacity-100" />
        </div>
        <p className="text-2xl font-bold text-[#2BA640] tracking-tight flex items-baseline gap-1">
          ₹{walletBalance.toLocaleString('en-IN')}
        </p>
        <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1 group-hover:text-gray-300">
          <span>Click to withdraw via UPI</span>
          <span className="text-[#2BA640]">→</span>
        </p>
      </div>
    </aside>
  );
};
