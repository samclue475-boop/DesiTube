import React from 'react';
import { Video } from '../types';
import { VideoCard } from './VideoCard';
import { 
  History, 
  Clock, 
  ThumbsUp, 
  Coins, 
  Download, 
  Film, 
  TrendingUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface LibraryViewProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  walletBalance: number;
  onOpenWallet: () => void;
  onOpenUpload: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  videos,
  onSelectVideo,
  walletBalance,
  onOpenWallet,
  onOpenUpload,
}) => {
  const watchHistory = videos.slice(0, 3);
  const watchLater = videos.slice(2, 5);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Creator Profile & Wallet Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 p-5 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-amber-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-white text-lg sm:text-xl">Suraj (Desi Creator)</h2>
              <span className="text-[10px] font-bold uppercase bg-red-600 text-white px-2 py-0.5 rounded-full">
                Partner Pro
              </span>
            </div>
            <p className="text-xs text-zinc-400">@youtubersuraj6 • 1.2K subscribers • 4 uploads</p>
          </div>
        </div>

        {/* Big Wallet Quick Access */}
        <button
          onClick={() => {
            sounds.playCoinChime();
            onOpenWallet();
          }}
          className="bg-zinc-950/80 hover:bg-zinc-950 p-3.5 rounded-2xl border border-amber-500/50 flex items-center gap-3 cursor-pointer group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-600 text-zinc-950 flex items-center justify-center font-black text-xl">
            ₹
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-amber-400 uppercase">Available Payout</span>
            <p className="text-lg font-black text-white group-hover:text-amber-300">
              ₹{walletBalance.toLocaleString('en-IN')}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => {
            sounds.playTap();
            onOpenWallet();
          }}
          className="bg-zinc-900/80 hover:bg-zinc-800 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center gap-2 text-center transition-colors cursor-pointer"
        >
          <Coins className="w-6 h-6 text-amber-400" />
          <span className="text-xs font-bold text-white">₹780 Wallet</span>
          <span className="text-[10px] text-zinc-400">Instant UPI payout</span>
        </button>

        <button
          onClick={() => {
            sounds.playTap();
            onOpenUpload();
          }}
          className="bg-zinc-900/80 hover:bg-zinc-800 p-4 rounded-2xl border border-emerald-500/40 flex flex-col items-center gap-2 text-center transition-colors cursor-pointer"
        >
          <Film className="w-6 h-6 text-emerald-400" />
          <span className="text-xs font-bold text-white">Upload Video</span>
          <span className="text-[10px] text-emerald-300">+₹50 bonus</span>
        </button>

        <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center gap-2 text-center">
          <Download className="w-6 h-6 text-sky-400" />
          <span className="text-xs font-bold text-white">Downloads</span>
          <span className="text-[10px] text-zinc-400">3 offline videos</span>
        </div>

        <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center gap-2 text-center">
          <ThumbsUp className="w-6 h-6 text-red-400" />
          <span className="text-xs font-bold text-white">Liked Videos</span>
          <span className="text-[10px] text-zinc-400">48 favorites</span>
        </div>
      </div>

      {/* Watch History */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <History className="w-4 h-4 text-zinc-400" />
            Watch History
          </h3>
          <span className="text-xs text-red-500 font-semibold cursor-pointer">See all</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchHistory.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onSelectVideo={onSelectVideo}
            />
          ))}
        </div>
      </div>

      {/* Watch Later */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            Saved for Later
          </h3>
          <span className="text-xs text-red-500 font-semibold cursor-pointer">See all</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchLater.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onSelectVideo={onSelectVideo}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
