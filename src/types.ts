export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  views: string;
  viewCount: number;
  uploadedAt: string;
  category: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscribers: string;
    verified?: boolean;
    isSubscribed?: boolean;
  };
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  isSaved?: boolean;
  comments: Comment[];
  isShort?: boolean;
  earningsPerView?: number;
}

export interface WalletTransaction {
  id: string;
  title: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'processing';
  iconType: 'watch' | 'upload' | 'bonus' | 'withdraw' | 'superchat';
}

export type ActiveTab = 'home' | 'shorts' | 'subscriptions' | 'library' | 'trending';

export type VideoCategory = 
  | 'All'
  | 'Trending 🇮🇳'
  | 'Street Food'
  | 'Tech in Hindi'
  | 'Comedy & Vines'
  | 'Bollywood Hits'
  | 'Village Cooking'
  | 'Cricket & IPL'
  | 'Desi Gaming'
  | 'Bhakti & Mantras';
