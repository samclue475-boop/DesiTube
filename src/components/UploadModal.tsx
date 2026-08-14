import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  Sparkles, 
  Video as VideoIcon, 
  Image as ImageIcon, 
  Tag, 
  CheckCircle2, 
  Film,
  Coins
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Video, VideoCategory } from '../types';
import { sounds } from '../utils/audio';

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: (video: Video) => void;
}

const PRESET_SAMPLE_VIDEOS = [
  {
    title: 'Desi Mumbai Street Vada Pav & Chai Masterclass ☕',
    category: 'Street Food' as VideoCategory,
    thumbnail: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '08:45',
    description: 'Crispy batata vada with spicy red garlic chutney and steaming masala cutting chai at Dadar station.'
  },
  {
    title: 'How to Build an AI App in Hindi in 10 Minutes! 💻 Beginner Tutorial',
    category: 'Tech in Hindi' as VideoCategory,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '10:20',
    description: 'Complete step-by-step Hindi guide on building modern full-stack web applications without prior experience.'
  },
  {
    title: 'Cricket Gali Match Rules: One Tip One Hand Out! 😂 Hilarious Memories',
    category: 'Comedy & Vines' as VideoCategory,
    thumbnail: 'https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '07:15',
    description: 'Reliving 90s Indian street cricket moments where whoever brought the bat batted first!'
  }
];

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<VideoCategory>('Street Food');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80');
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [tags, setTags] = useState('desitube, viral, india, trending');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number | null>(null);

  const handleSelectPreset = (idx: number) => {
    sounds.playTap();
    setSelectedPresetIdx(idx);
    const preset = PRESET_SAMPLE_VIDEOS[idx];
    setTitle(preset.title);
    setDescription(preset.description);
    setCategory(preset.category);
    setThumbnailUrl(preset.thumbnail);
    setVideoUrl(preset.videoUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sounds.playTap();
      setTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sounds.playTap();
    setIsUploading(true);

    // Simulate Flutter smooth progress bar upload
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newVideo: Video = {
            id: `v-upload-${Date.now()}`,
            title: title.trim(),
            description: description.trim() || 'Uploaded via DesiTube Green Studio',
            videoUrl: videoUrl,
            thumbnail: thumbnailUrl,
            duration: '06:30',
            views: '1 view',
            viewCount: 1,
            uploadedAt: 'Just now',
            category: category,
            channel: {
              id: 'ch-user',
              name: 'Suraj (You)',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
              subscribers: '1.2K',
              verified: true,
              isSubscribed: false,
            },
            likes: 1,
            dislikes: 0,
            comments: [],
            isLiked: true,
          };

          sounds.playSuccessFanfare();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#059669', '#34D399', '#FBBF24']
          });

          onUploadSuccess(newVideo);
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-zinc-950 border border-emerald-500/50 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-emerald-950/50 my-auto"
      >
        {/* Modal Green Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 p-4 sm:p-5 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40">
              <Upload className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
                DesiTube <span className="text-emerald-400">Green Studio</span>
              </h2>
              <p className="text-xs text-emerald-300/80">
                Upload Indian Video & Earn Instant ₹50 Creator Bonus
              </p>
            </div>
          </div>

          <button
            id="close-upload-modal-btn"
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 flex flex-col gap-4 text-xs sm:text-sm">
          
          {/* Creator Incentive Banner */}
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Coins className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-xs sm:text-sm">
                  +₹50 Monetization Incentive
                </p>
                <p className="text-[11px] text-emerald-300">
                  Instant credit to your ₹780 DesiTube Rewards Wallet upon upload.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-emerald-500 text-zinc-950 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>

          {/* Quick Presets for instant testing */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Quick Sample Video Templates (or use your own file):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_SAMPLE_VIDEOS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleSelectPreset(idx)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    selectedPresetIdx === idx
                      ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-md'
                      : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <p className="font-bold text-[11px] line-clamp-1">{preset.title}</p>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-400">
                    <span>{preset.category}</span>
                    <span className="text-emerald-400 font-bold">HD</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Video File Selector / Drag-drop */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <VideoIcon className="w-3.5 h-3.5 text-emerald-400" />
              Video Source:
            </label>
            <div className="border-2 border-dashed border-zinc-800 hover:border-emerald-500 rounded-2xl p-4 text-center bg-zinc-900/40 transition-colors">
              <input
                type="file"
                id="file-upload-input"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-1 text-zinc-400 hover:text-zinc-200"
              >
                <Film className="w-6 h-6 text-emerald-400" />
                <span className="font-medium text-xs">
                  Click to choose MP4 / MOV video from computer or phone
                </span>
                <span className="text-[10px] text-zinc-500">
                  Supports up to 4K 60fps DesiTube Video
                </span>
              </label>
            </div>
          </div>

          {/* Video Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Video Title (Desi Hook & Topic) *
            </label>
            <input
              id="upload-video-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Secret Recipe of Delhi Chole Bhature 🔥 Must Watch!"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
            />
          </div>

          {/* Category & Thumbnail URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VideoCategory)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-emerald-500 text-xs"
              >
                <option value="Street Food">Street Food 🍛</option>
                <option value="Tech in Hindi">Tech in Hindi 📱</option>
                <option value="Comedy & Vines">Comedy & Vines 🤣</option>
                <option value="Cricket & IPL">Cricket & IPL 🏏</option>
                <option value="Village Cooking">Village Cooking 🍃</option>
                <option value="Bollywood Hits">Bollywood Hits 💃</option>
                <option value="Desi Gaming">Desi Gaming 🎮</option>
                <option value="Bhakti & Mantras">Bhakti & Mantras 🙏</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                Thumbnail Image URL
              </label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell DesiTube viewers about your video..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>

          {/* Upload Progress Bar if submitting */}
          {isUploading && (
            <div className="flex flex-col gap-1.5 bg-zinc-900 p-3 rounded-xl border border-emerald-500/40">
              <div className="flex justify-between text-xs text-zinc-300 font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 animate-spin" />
                  Publishing to DesiTube Servers...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-400 h-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Button: THE GREEN UPLOAD ACTION */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                onClose();
              }}
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              id="submit-green-upload-btn"
              type="submit"
              disabled={isUploading || !title.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/40 border border-emerald-300/40 cursor-pointer disabled:opacity-50 transition-all duration-200"
            >
              <Upload className="w-4 h-4 stroke-[3]" />
              <span>{isUploading ? 'Publishing...' : 'Publish & Earn ₹50'}</span>
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
