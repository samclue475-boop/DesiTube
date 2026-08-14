import React, { useState, useEffect, useRef } from 'react';
import { Video, Comment } from '../types';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  Bookmark, 
  X, 
  Send, 
  Coins, 
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface VideoPlayerModalProps {
  video: Video;
  onClose: () => void;
  onSelectRelatedVideo: (video: Video) => void;
  relatedVideos: Video[];
  onEarnCoins: (amount: number, reason: string) => void;
  onToggleSubscribe: (channelId: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onSelectRelatedVideo,
  relatedVideos,
  onEarnCoins,
  onToggleSubscribe,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchProgress, setWatchProgress] = useState(0);
  const [hasClaimedWatchReward, setHasClaimedWatchReward] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(video.isDisliked || false);
  const [isSaved, setIsSaved] = useState(video.isSaved || false);
  const [isSubscribed, setIsSubscribed] = useState(video.channel.isSubscribed || false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(video.comments || []);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Watch reward timer: after 6 seconds of watching, unlock +₹5!
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !hasClaimedWatchReward) {
      timer = setInterval(() => {
        setWatchProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setHasClaimedWatchReward(true);
            onEarnCoins(5, `Watched "${video.title.slice(0, 30)}..."`);
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#10B981', '#F59E0B', '#EF4444']
            });
            return 100;
          }
          return prev + 15;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, hasClaimedWatchReward, video, onEarnCoins]);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      sounds.playTap();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleLike = () => {
    sounds.playLikePop();
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      if (isDisliked) setIsDisliked(false);
      onEarnCoins(2, 'Liked a DesiTube video');
    } else {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleDislike = () => {
    sounds.playTap();
    setIsDisliked(!isDisliked);
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    sounds.playTap();
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const handleDownload = () => {
    sounds.playTap();
    setShowDownloadToast(true);
    setTimeout(() => setShowDownloadToast(false), 3000);
  };

  const handleSubscribeToggle = () => {
    sounds.playTap();
    const newState = !isSubscribed;
    setIsSubscribed(newState);
    onToggleSubscribe(video.channel.id);
    if (newState) {
      sounds.playCoinChime();
      onEarnCoins(5, `Subscribed to ${video.channel.name}`);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    sounds.playTap();
    const newComment: Comment = {
      id: `c-user-${Date.now()}`,
      author: 'You (Desi Creator)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 1,
      isLiked: true,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    onEarnCoins(2, 'Commented on video');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = Math.floor(secs % 60);
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  const changePlaybackSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
    sounds.playTap();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col overflow-y-auto">
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-6 bg-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-600/40">
            <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
          </div>
          <span className="font-bold text-white text-sm">
            Desi<span className="text-red-500">Player</span>
          </span>
          <span className="text-xs text-zinc-400 border-l border-zinc-800 pl-2 ml-1">
            {video.category}
          </span>
        </div>

        {/* Watch-to-Earn Floating Pill */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-full border border-amber-500/30">
            <Coins className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="text-xs">
              {hasClaimedWatchReward ? (
                <span className="text-emerald-400 font-bold">✓ ₹5 Reward Credited!</span>
              ) : (
                <span className="text-amber-300 font-medium">
                  Watch to Earn: <span className="font-bold">{watchProgress}%</span>
                </span>
              )}
            </div>
          </div>

          <button
            id="close-video-player-btn"
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            title="Close Player"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Video Player + Actions + Comments */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Custom Video Container */}
          <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 group">
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.thumbnail}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* RED PLAY BUTTON Center Overlay when paused */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-red-600 to-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/80 border-2 border-red-400"
                >
                  <Play className="w-10 h-10 fill-white text-white ml-1.5" />
                </motion.button>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6 flex flex-col gap-2 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
              
              {/* Progress Seekbar */}
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Bottom Control Buttons */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="p-1 hover:text-red-400 transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <button onClick={toggleMute} className="p-1 hover:text-red-400 transition-colors">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration || 120)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={changePlaybackSpeed}
                    className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-bold border border-zinc-700"
                    title="Playback Speed"
                  >
                    {playbackSpeed}x
                  </button>
                  <button 
                    onClick={() => {
                      if (videoRef.current) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          videoRef.current.requestFullscreen();
                        }
                      }
                    }}
                    className="p-1 hover:text-red-400 transition-colors"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Title & Actions */}
          <div className="flex flex-col gap-3">
            <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {video.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              {/* Channel Info */}
              <div className="flex items-center gap-3">
                <img
                  src={video.channel.avatar}
                  alt={video.channel.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-red-500/40"
                />
                <div>
                  <div className="flex items-center gap-1 font-semibold text-white text-sm sm:text-base">
                    <span>{video.channel.name}</span>
                    {video.channel.verified && (
                      <CheckCircle className="w-4 h-4 text-zinc-400 fill-zinc-700" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">{video.channel.subscribers} subscribers</p>
                </div>

                <button
                  id="subscribe-channel-btn"
                  onClick={handleSubscribeToggle}
                  className={`ml-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    isSubscribed
                      ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                      : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                  }`}
                >
                  {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>

              {/* Action Buttons: Like, Dislike, Share, Download */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {/* Like / Dislike pill */}
                <div className="flex items-center bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden">
                  <button
                    id="video-like-btn"
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition-colors ${
                      isLiked ? 'text-red-400 bg-red-950/40' : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-red-400' : ''}`} />
                    <span>{likesCount.toLocaleString('en-IN')}</span>
                  </button>
                  <div className="w-px h-5 bg-zinc-800" />
                  <button
                    id="video-dislike-btn"
                    onClick={handleDislike}
                    className={`px-3 py-2 text-xs transition-colors ${
                      isDisliked ? 'text-red-400 bg-red-950/40' : 'text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-red-400' : ''}`} />
                  </button>
                </div>

                {/* Share */}
                <button
                  id="video-share-btn"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                {/* Download */}
                <button
                  id="video-download-btn"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                {/* Save */}
                <button
                  id="video-save-btn"
                  onClick={() => {
                    sounds.playTap();
                    setIsSaved(!isSaved);
                  }}
                  className={`p-2 rounded-full border transition-colors ${
                    isSaved ? 'bg-amber-950/50 border-amber-500 text-amber-400' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                  title="Save Video"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-3 font-semibold text-zinc-200 mb-2">
                <span>{video.views}</span>
                <span>•</span>
                <span>{video.uploadedAt}</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 text-[11px] font-bold">
                  {video.category}
                </span>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{video.description}</p>
            </div>

            {/* Comments Section */}
            <div className="mt-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">
                  Comments ({comments.length})
                </h3>
                <span className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> +₹2 for every comment
                </span>
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  alt="You"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                />
                <input
                  id="new-comment-input"
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add a Desi comment (e.g. Mast video bhai!)..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full py-2 px-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="p-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white rounded-full transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Comments List */}
              <div className="flex flex-col gap-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-zinc-200">{comment.author}</span>
                        <span className="text-[11px] text-zinc-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-xs text-zinc-300 mt-1">{comment.text}</p>
                      
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-400">
                        <button 
                          onClick={() => {
                            sounds.playLikePop();
                            setComments(comments.map(c => c.id === comment.id ? { ...c, likes: c.likes + (c.isLiked ? -1 : 1), isLiked: !c.isLiked } : c));
                          }}
                          className={`flex items-center gap-1 hover:text-white ${comment.isLiked ? 'text-red-400 font-bold' : ''}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="hover:text-white">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Right 1 Col: Up Next / Related Desi Videos */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h3 className="font-bold text-white text-sm">Up Next (Desi Hits)</h3>
            <span className="text-xs text-zinc-400">Autoplay ON</span>
          </div>

          <div className="flex flex-col gap-3">
            {relatedVideos.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sounds.playTap();
                  onSelectRelatedVideo(item);
                }}
                className="group flex gap-2.5 bg-zinc-900/60 hover:bg-zinc-800/80 p-2 rounded-xl border border-zinc-800/70 hover:border-zinc-700 cursor-pointer transition-all"
              >
                {/* Thumbnail */}
                <div className="relative w-36 aspect-video rounded-lg overflow-hidden shrink-0 bg-zinc-950">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1.5 py-0.2 rounded font-semibold">
                    {item.duration}
                  </div>
                  {/* Small red play button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                    <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-zinc-100 group-hover:text-red-400 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    <p className="truncate">{item.channel.name}</p>
                    <p className="text-zinc-500">{item.views}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 border border-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium z-50 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Link copied to clipboard! Share on WhatsApp 🇮🇳</span>
        </div>
      )}

      {/* Download Toast */}
      {showDownloadToast && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 border border-sky-500 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium z-50">
          <Download className="w-4 h-4 text-sky-400" />
          <span>Video saved offline in 1080p DesiTube Library!</span>
        </div>
      )}
    </div>
  );
};
