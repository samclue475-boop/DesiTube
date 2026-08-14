import React from 'react';
import { Home, Flame, Plus, Bell, User, Wallet } from 'lucide-react';
import { ActiveTab } from '../types';
import { sounds } from '../utils/audio';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenUpload: () => void;
  walletBalance: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenUpload,
  walletBalance,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#0f0f0f] border-t border-[#272727] px-2 py-2 flex items-center justify-around lg:hidden">
      
      {/* Home Tab */}
      <button
        id="nav-tab-home"
        onClick={() => {
          sounds.playTap();
          onSelectTab('home');
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          activeTab === 'home' ? 'text-[#f1f1f1] font-bold' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-white' : 'text-gray-400'}`} />
        <span className="text-[10px]">Home</span>
      </button>

      {/* Shorts Tab */}
      <button
        id="nav-tab-shorts"
        onClick={() => {
          sounds.playTap();
          onSelectTab('shorts');
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          activeTab === 'shorts' ? 'text-[#FF0000] font-bold' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Flame className={`w-5 h-5 ${activeTab === 'shorts' ? 'fill-[#FF0000] text-[#FF0000]' : 'text-gray-400'}`} />
        <span className="text-[10px]">Shorts</span>
      </button>

      {/* Center Action: THE GREEN CREATE BUTTON (#2BA640) */}
      <button
        id="nav-tab-green-upload"
        onClick={() => {
          sounds.playTap();
          onOpenUpload();
        }}
        className="flex items-center justify-center -mt-4 cursor-pointer group"
        title="Create / Upload Video"
      >
        <div className="w-12 h-12 rounded-full bg-[#2BA640] hover:bg-[#259439] text-white flex items-center justify-center shadow-lg shadow-[#2BA640]/30 border-2 border-[#0f0f0f] group-hover:scale-105 group-active:scale-95 transition-all">
          <Plus className="w-7 h-7 stroke-[3]" />
        </div>
      </button>

      {/* Subscriptions Tab */}
      <button
        id="nav-tab-subscriptions"
        onClick={() => {
          sounds.playTap();
          onSelectTab('subscriptions');
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          activeTab === 'subscriptions' ? 'text-[#f1f1f1] font-bold' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Bell className={`w-5 h-5 ${activeTab === 'subscriptions' ? 'text-white' : 'text-gray-400'}`} />
        <span className="text-[10px]">Subs</span>
      </button>

      {/* Library / ₹780 Wallet Tab */}
      <button
        id="nav-tab-library"
        onClick={() => {
          sounds.playTap();
          onSelectTab('library');
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          activeTab === 'library' ? 'text-[#2BA640] font-bold' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <div className="relative">
          <Wallet className="w-5 h-5" />
          <span className="absolute -top-1 -right-2 text-[8px] font-black bg-[#2BA640] text-white px-1 rounded-full">
            ₹
          </span>
        </div>
        <span className="text-[10px]">₹{walletBalance}</span>
      </button>

    </nav>
  );
};
