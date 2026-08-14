import React, { useState, useRef } from 'react';
import { Video } from '../types';
import { 
  Play, 
  Pause, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Share2, 
  Music2, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle,
  Coins
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ShortsViewProps {
  shorts: Video[];
  onEarnCoins: (amount: number, reason: string) => void;
  onToggleSubscribe: (channelId: string) => void;
}

export const ShortsView: React.FC<ShortsViewProps> = ({
  shorts,
  onEarnCoins,
  onToggleSubscribe
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedShorts, setLikedShorts] = useState<Record<string, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentShort = shorts[currentIndex] || shorts[0];

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      sounds.playTap();
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
      onEarnCoins(3, 'Swiped & watched Desi Short');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sounds.playTap();
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      sounds.playTap();
    }
  };

  const toggleLike = (id: string) => {
    sounds.playLikePop();
    const isLiked = !!likedShorts[id];
    setLikedShorts({ ...likedShorts, [id]: !isLiked });
    if (!isLiked) {
      onEarnCoins(2, 'Liked Desi Short');
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-2 sm:p-6 bg-zinc-950 min-h-[calc(100vh-120px)]">
      <div className="flex items-center gap-4 max-w-lg w-full justify-center">
        
        {/* Main Vertical Short Card */}
        <div className="relative w-full max-w-[380px] h-[580px] sm:h-[640px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col justify-between">
          
          {/* Top Info Bar */}
          <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[11px] font-extrabold text-white uppercase tracking-wider">
                Desi Shorts
              </span>
            </div>

            <div className="flex items-center gap-1 bg-amber-500/90 text-zinc-950 font-black text-[11px] px-2.5 py-1 rounded-full shadow-lg">
              <Coins className="w-3.5 h-3.5" />
              <span>+₹3 Swipe Earn</span>
            </div>
          </div>

          {/* Video Player */}
          <video
            ref={videoRef}
            key={currentShort.videoUrl}
            src={currentShort.videoUrl}
            poster={currentShort.thumbnail}
            autoPlay
            loop
            playsInline
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* RED PLAY BUTTON Overlay if paused */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/70 border border-red-400">
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Gradient & Video Details */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 pt-12 z-20 flex flex-col gap-2 pointer-events-auto">
            
            {/* Channel Info */}
            <div className="flex items-center gap-2.5">
              <img
                src={currentShort.channel.avatar}
                alt={currentShort.channel.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-red-500"
              />
              <div className="flex items-center gap-1">
                <span className="font-bold text-white text-xs sm:text-sm">
                  {currentShort.channel.name}
                </span>
                {currentShort.channel.verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-zinc-400 fill-zinc-700" />
                )}
              </div>
              <button
                onClick={() => {
                  sounds.playTap();
                  onToggleSubscribe(currentShort.channel.id);
                }}
                className="ml-2 px-3 py-1 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] transition-colors"
              >
                Subscribe
              </button>
            </div>

            {/* Short Title */}
            <p className="text-white text-xs sm:text-sm font-semibold line-clamp-2 leading-snug">
              {currentShort.title}
            </p>

            {/* Audio Track Tag */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-300">
              <Music2 className="w-3.5 h-3.5 text-red-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="truncate">Original Desi Sound - Trending Bollywood Mix</span>
            </div>
          </div>

          {/* Right Action Floating Column */}
          <div className="absolute right-3 bottom-20 z-30 flex flex-col items-center gap-4">
            
            {/* Like */}
            <button
              onClick={() => toggleLike(currentShort.id)}
              className="flex flex-col items-center text-white group cursor-pointer"
            >
              <div className={`p-3 rounded-full backdrop-blur-md transition-all ${
                likedShorts[currentShort.id] 
                  ? 'bg-red-600 text-white scale-110' 
                  : 'bg-black/50 text-white hover:bg-black/80'
              }`}>
                <ThumbsUp className={`w-5 h-5 ${likedShorts[currentShort.id] ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[11px] font-bold mt-1 drop-shadow">
                {(currentShort.likes + (likedShorts[currentShort.id] ? 1 : 0)).toLocaleString('en-IN')}
              </span>
            </button>

            {/* Dislike */}
            <button className="flex flex-col items-center text-white cursor-pointer">
              <div className="p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white">
                <ThumbsDown className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold mt-1">Dislike</span>
            </button>

            {/* Comments */}
            <button className="flex flex-col items-center text-white cursor-pointer">
              <div className="p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold mt-1">1.2K</span>
            </button>

            {/* Share */}
            <button 
              onClick={() => {
                sounds.playTap();
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="flex flex-col items-center text-white cursor-pointer"
            >
              <div className="p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold mt-1">Share</span>
            </button>
          </div>

        </div>

        {/* Vertical Swipe Navigation Arrows */}
        <div className="hidden sm:flex flex-col gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 text-white border border-zinc-800 transition-all cursor-pointer"
            title="Previous Short"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <span className="text-center text-xs font-bold text-zinc-500">
            {currentIndex + 1}/{shorts.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === shorts.length - 1}
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 text-white border border-zinc-800 transition-all cursor-pointer"
            title="Next Short"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
