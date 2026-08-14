import React from 'react';
import { Video } from '../types';
import { VideoCard } from './VideoCard';
import { Bell, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SubscriptionsViewProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  onOpenUpload: () => void;
}

export const SubscriptionsView: React.FC<SubscriptionsViewProps> = ({
  videos,
  onSelectVideo,
  onOpenUpload,
}) => {
  // Extract unique channels
  const channelMap = new Map<string, typeof videos[0]['channel']>();
  videos.forEach(v => {
    if (!channelMap.has(v.channel.id)) {
      channelMap.set(v.channel.id, v.channel);
    }
  });
  const channels = Array.from(channelMap.values());

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Subscribed Channels Avatar Stories Scroll */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
          Your Subscribed Desi Channels
        </h2>
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
          {channels.map((ch) => (
            <div
              key={ch.id}
              onClick={() => sounds.playTap()}
              className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0"
            >
              <div className="relative">
                <img
                  src={ch.avatar}
                  alt={ch.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-red-500 p-0.5 group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-950 rounded-full"></span>
              </div>
              <span className="text-[11px] font-medium text-zinc-300 max-w-[70px] truncate text-center group-hover:text-white">
                {ch.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Videos from Subscriptions */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h1 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-500" />
          Latest Subscription Feed
        </h1>
        <span className="text-xs text-zinc-400">All • Today</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelectVideo={onSelectVideo}
          />
        ))}
      </div>
    </div>
  );
};
