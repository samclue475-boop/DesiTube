import React, { useState } from 'react';
import { Video } from '../types';
import { Play, CheckCircle, MoreVertical, Clock, Share2, Coins } from 'lucide-react';
import { sounds } from '../utils/audio';

interface VideoCardProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
  onToggleSubscribe?: (channelId: string) => void;
  onSaveToWatchLater?: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onSelectVideo,
  onSaveToWatchLater,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div 
      className="group flex flex-col cursor-pointer transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
      }}
    >
      {/* Thumbnail Container */}
      <div 
        id={`video-card-thumb-${video.id}`}
        onClick={() => {
          sounds.playTap();
          onSelectVideo(video);
        }}
        className="aspect-video bg-[#272727] rounded-xl overflow-hidden relative border border-[#272727] group-hover:border-[#444] transition-all"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Video Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-1.5 py-0.5 rounded text-[#f1f1f1] font-medium">
          {video.duration}
        </div>

        {/* Watch-to-Earn ₹5 Badge on Thumbnail */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#2BA640] text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-sm">
          <Coins className="w-3 h-3 text-white" />
          <span>+₹5 Earn</span>
        </div>

        {/* RED PLAY BUTTON Hover Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 scale-100 bg-black/40' : 'opacity-0 scale-75 pointer-events-none'}`}>
          <div className="bg-[#FF0000] w-12 h-8 rounded-lg flex items-center justify-center shadow-xl shadow-red-600/40">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
          </div>
        </div>
      </div>

      {/* Video Details */}
      <div className="flex gap-3 pt-3 px-0.5 relative">
        
        {/* Channel Avatar */}
        <div className="shrink-0">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border border-[#333] hover:border-white transition-colors"
          />
        </div>

        {/* Title and Metadata */}
        <div className="flex-1 min-w-0" onClick={() => onSelectVideo(video)}>
          <h3 
            id={`video-title-${video.id}`}
            className="font-semibold text-sm line-clamp-2 leading-snug text-[#f1f1f1] group-hover:text-red-400 transition-colors"
            title={video.title}
          >
            {video.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="truncate">{video.channel.name}</span>
            {video.channel.verified && (
              <CheckCircle className="w-3.5 h-3.5 text-gray-400 fill-gray-700 shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <span>{video.views}</span>
            <span>•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>

        {/* Quick Menu Button */}
        <div className="shrink-0 relative">
          <button
            id={`video-options-btn-${video.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#272727] transition-colors"
            title="Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Options Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-7 w-44 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-1 z-30 text-xs text-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveToWatchLater?.(video);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#272727] flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Save to Watch Later</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard?.writeText(window.location.href);
                  sounds.playTap();
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#272727] flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-gray-400" />
                <span>Copy Share Link</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
