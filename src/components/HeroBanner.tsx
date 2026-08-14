import React from 'react';
import { Play, Upload, Coins, Sparkles, Flame, Eye } from 'lucide-react';
import { Video } from '../types';
import { motion } from 'motion/react';
import { sounds } from '../utils/audio';

interface HeroBannerProps {
  featuredVideo: Video;
  onPlayFeatured: (video: Video) => void;
  onOpenUpload: () => void;
  onOpenWallet: () => void;
  walletBalance: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredVideo,
  onPlayFeatured,
  onOpenUpload,
  onOpenWallet,
  walletBalance,
}) => {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#121212] border border-[#272727] shadow-xl">
        
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={featuredVideo.thumbnail}
            alt={featuredVideo.title}
            className="w-full h-full object-cover opacity-20 scale-105 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-5 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="max-w-2xl flex flex-col gap-3">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 bg-[#FF0000] text-white font-bold text-xs px-3 py-1 rounded-lg">
                <Flame className="w-3.5 h-3.5 fill-white" />
                #1 Trending in India
              </span>

              <span className="bg-[#272727] text-gray-300 font-medium text-xs px-3 py-1 rounded-lg border border-[#333] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2BA640]" />
                Watch & Earn ₹5 Cash
              </span>
            </div>

            {/* Featured Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f1f1f1] leading-tight tracking-tight">
              {featuredVideo.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
              {featuredVideo.description}
            </p>

            {/* Channel Info */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <img
                  src={featuredVideo.channel.avatar}
                  alt={featuredVideo.channel.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#333]"
                />
                <span className="font-semibold text-gray-200">{featuredVideo.channel.name}</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {featuredVideo.views}
              </span>
            </div>

            {/* Primary Action Buttons: RED PLAY BUTTON and GREEN CREATE BUTTON */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* 1. SIGNATURE RED PLAY BUTTON */}
              <motion.button
                id="hero-red-play-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sounds.playTap();
                  onPlayFeatured(featuredVideo);
                }}
                className="flex items-center gap-2.5 px-6 py-2.5 bg-[#FF0000] hover:bg-red-600 text-white font-bold text-sm rounded-full shadow-lg shadow-red-600/30 cursor-pointer transition-all"
                title="Play Trending Desi Video"
              >
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
                <span>Play Video</span>
              </motion.button>

              {/* 2. GREEN CREATE/UPLOAD BUTTON */}
              <motion.button
                id="hero-green-upload-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sounds.playTap();
                  onOpenUpload();
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2BA640] hover:bg-[#259439] text-white font-semibold text-sm rounded-full shadow-md shadow-[#2BA640]/20 cursor-pointer transition-all"
                title="Upload Video & Earn ₹50"
              >
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Upload (+₹50)</span>
              </motion.button>

            </div>

          </div>

          {/* Right Card: Sleek Interface WALLET COUNTER SHOWING ₹780 */}
          <div 
            onClick={() => {
              sounds.playCoinChime();
              onOpenWallet();
            }}
            className="w-full lg:w-72 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] hover:border-[#2BA640]/80 p-5 rounded-2xl border border-[#333] shadow-xl cursor-pointer group transition-all shrink-0"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Premium Balance
              </span>
              <span className="text-[10px] font-bold bg-[#2BA640]/20 text-[#2BA640] px-2 py-0.5 rounded-full border border-[#2BA640]/30">
                Instant UPI
              </span>
            </div>

            <div className="mt-1">
              <p className="text-3xl font-bold text-[#2BA640] tracking-tight">
                ₹{walletBalance.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Available creator earnings & watch royalties
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-[#272727] flex items-center justify-between text-xs text-[#2BA640] font-semibold group-hover:text-emerald-300">
              <span>View Passbook & Withdraw</span>
              <span>→</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
