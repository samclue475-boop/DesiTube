import { Video, WalletTransaction } from '../types';

export const INITIAL_WALLET_BALANCE = 780;

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    title: 'DesiTube Creator Welcome Bonus',
    type: 'credit',
    amount: 500,
    date: 'Today, 10:15 AM',
    description: 'Welcome gift for joining DesiTube Partner Program 🇮🇳',
    status: 'completed',
    iconType: 'bonus'
  },
  {
    id: 'tx-2',
    title: 'Daily Watch-to-Earn Milestone',
    type: 'credit',
    amount: 150,
    date: 'Today, 11:30 AM',
    description: 'Watched 15 Desi Trending Videos',
    status: 'completed',
    iconType: 'watch'
  },
  {
    id: 'tx-3',
    title: 'Shorts Engagement Royalty',
    type: 'credit',
    amount: 80,
    date: 'Today, 01:05 PM',
    description: 'Received 120 likes on your shared comments',
    status: 'completed',
    iconType: 'superchat'
  },
  {
    id: 'tx-4',
    title: 'Green Upload Creator Incentive',
    type: 'credit',
    amount: 50,
    date: 'Yesterday, 04:20 PM',
    description: 'Bonus for uploading in 1080p HD quality',
    status: 'completed',
    iconType: 'upload'
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v-1',
    title: 'World Famous Butter Chicken & Garlic Naan Recipe! 🍛 Delhi Street Food Style',
    description: 'Namaste dosto! Aaj hum banayenge authentic Old Delhi style Butter Chicken with special creamy gravy aur tandoori garlic naan at home without tandoor.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80',
    duration: '14:28',
    views: '2.4M views',
    viewCount: 2420000,
    uploadedAt: '2 days ago',
    category: 'Street Food',
    channel: {
      id: 'ch-1',
      name: 'Desi Khana Khazana',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      subscribers: '4.8M',
      verified: true,
      isSubscribed: true
    },
    likes: 184000,
    dislikes: 1200,
    comments: [
      {
        id: 'c-1',
        author: 'Rahul Sharma',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: 'Bhai kya mast recipe batayi hai! Sunday ko zarur try karunga 🔥',
        timestamp: '1 day ago',
        likes: 428
      },
      {
        id: 'c-2',
        author: 'Pooja Verma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'The color of the gravy looks absolute restaurant quality! Subscribed! ❤️',
        timestamp: '18 hours ago',
        likes: 115
      }
    ]
  },
  {
    id: 'v-2',
    title: 'Top 5 Best 5G Smartphones Under ₹15,000 in India! 🔥 Full Comparison & Camera Test',
    description: 'Chaliye dosto shuru karte hain! In this video we test the best budget smartphones with Snapdragon processors, 120Hz AMOLED displays, and 5000mAh batteries.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    duration: '11:45',
    views: '1.8M views',
    viewCount: 1840000,
    uploadedAt: '1 day ago',
    category: 'Tech in Hindi',
    channel: {
      id: 'ch-2',
      name: 'Technical Desi Gyan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      subscribers: '6.2M',
      verified: true,
      isSubscribed: false
    },
    likes: 142000,
    dislikes: 980,
    comments: [
      {
        id: 'c-3',
        author: 'Aman Gupta',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        text: 'Phone #2 camera sample in low light was genuinely surprising!',
        timestamp: '14 hours ago',
        likes: 89
      }
    ]
  },
  {
    id: 'v-3',
    title: 'Desi Wedding Chaos: Mummy vs Phupaji! 🤣 Full Family Comedy Drama',
    description: 'When Phupaji doesn’t get special paneer and DJ stops playing Bollywood songs at 10 PM. Pure hilarious Indian family wedding scenes!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    duration: '09:12',
    views: '5.6M views',
    viewCount: 5600000,
    uploadedAt: '3 days ago',
    category: 'Comedy & Vines',
    channel: {
      id: 'ch-3',
      name: 'Desi Bakar Vines',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      subscribers: '8.9M',
      verified: true,
      isSubscribed: true
    },
    likes: 490000,
    dislikes: 3100,
    comments: [
      {
        id: 'c-4',
        author: 'Kunal Patil',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        text: 'Every Indian family has that one Phupaji jinko sabse alag treatment chahiye hota hai 😂😂😂',
        timestamp: '2 days ago',
        likes: 1204
      }
    ]
  },
  {
    id: 'v-4',
    title: 'Last Over Thriller! India vs Pakistan Match Final Ball Decider 🏏 Super 4 Analysis',
    description: 'Unbelievable 6 hitting in the 20th over! King Kohli masterclass and Bumrah precision yorkers. Watch our post-match dugout breakdown.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?w=800&auto=format&fit=crop&q=80',
    duration: '18:50',
    views: '8.9M views',
    viewCount: 8900000,
    uploadedAt: '5 hours ago',
    category: 'Cricket & IPL',
    channel: {
      id: 'ch-4',
      name: 'Cricket Adda Live',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      subscribers: '3.4M',
      verified: true,
      isSubscribed: true
    },
    likes: 620000,
    dislikes: 1500,
    comments: [
      {
        id: 'c-5',
        author: 'Sunil Gavaskar Fan',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        text: 'What a goosebumps match! Team India never fails to deliver under pressure 🇮🇳💙',
        timestamp: '3 hours ago',
        likes: 3120
      }
    ]
  },
  {
    id: 'v-5',
    title: '100KG Traditional Village Biryani Cooking in Huge Handi! 🍃 Grand Feast for Orphanage',
    description: 'Cooking aromatic Basmati rice biryani with woodfire in green village fields, served with spicy mirchi ka salan and refreshing raita.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    duration: '22:10',
    views: '4.1M views',
    viewCount: 4100000,
    uploadedAt: '4 days ago',
    category: 'Village Cooking',
    channel: {
      id: 'ch-5',
      name: 'Desi Village Chefs',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      subscribers: '7.1M',
      verified: true,
      isSubscribed: false
    },
    likes: 350000,
    dislikes: 890,
    comments: []
  },
  {
    id: 'v-6',
    title: 'Dholak Beats & Bollywood Dance Medley 2026 💃 Nonstop Sangeet Performance Hits',
    description: 'Best energetic Bollywood dance choreography for upcoming wedding seasons with live dholak percussion beats.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    duration: '16:30',
    views: '3.7M views',
    viewCount: 3700000,
    uploadedAt: '6 days ago',
    category: 'Bollywood Hits',
    channel: {
      id: 'ch-6',
      name: 'Desi Beats Studio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      subscribers: '2.9M',
      verified: true,
      isSubscribed: false
    },
    likes: 210000,
    dislikes: 1100,
    comments: []
  },
  {
    id: 'v-7',
    title: 'Hanuman Chalisa Full Aarti with Divine Flute & Sanskrit Chants 🙏 Peace & Power',
    description: 'Powerful morning mantra chanting for positive vibes, strength, mental clarity, and peace of mind.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1609137144822-0d127602330a?w=800&auto=format&fit=crop&q=80',
    duration: '15:00',
    views: '12.4M views',
    viewCount: 12400000,
    uploadedAt: '1 week ago',
    category: 'Bhakti & Mantras',
    channel: {
      id: 'ch-7',
      name: 'Divya Sanskriti TV',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      subscribers: '10.5M',
      verified: true,
      isSubscribed: true
    },
    likes: 980000,
    dislikes: 400,
    comments: []
  },
  {
    id: 'v-8',
    title: 'PUBG / BGMI 1v4 Clutch in Bootcamp! 🔥 Pro Desi Sniper Highlights with Hindi Commentary',
    description: 'Nonstop insane reflex gameplay, AWM headshots, squad wipes, and funny voice chat moments.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    duration: '13:15',
    views: '1.2M views',
    viewCount: 1200000,
    uploadedAt: '4 hours ago',
    category: 'Desi Gaming',
    channel: {
      id: 'ch-8',
      name: 'Dynamo Desi Gamer',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
      subscribers: '5.3M',
      verified: true,
      isSubscribed: false
    },
    likes: 125000,
    dislikes: 650,
    comments: []
  }
];

export const MOCK_SHORTS: Video[] = [
  {
    id: 's-1',
    title: 'Street Food Bhaiya making 1000 Pani Puris in 1 minute! ⚡ Golgappe King',
    description: 'Craziest speed pani puri vendor in Mumbai Chowpatty #shorts #streetfood #desitube',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    duration: '0:45',
    views: '4.2M views',
    viewCount: 4200000,
    uploadedAt: '1 day ago',
    category: 'Street Food',
    channel: {
      id: 'ch-1',
      name: 'Mumbai Foodie Bites',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      subscribers: '1.2M',
      verified: true
    },
    likes: 320000,
    dislikes: 1200,
    comments: [],
    isShort: true
  },
  {
    id: 's-2',
    title: 'Unboxing ₹1,50,000 Gold Edition Smartwatch! ⌚ Is it worth it?',
    description: 'Diamond studded dial test and hidden features in Hindi #shorts #tech #gadgets',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    duration: '0:58',
    views: '2.1M views',
    viewCount: 2100000,
    uploadedAt: '2 days ago',
    category: 'Tech in Hindi',
    channel: {
      id: 'ch-2',
      name: 'Technical Desi Gyan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      subscribers: '6.2M',
      verified: true
    },
    likes: 195000,
    dislikes: 820,
    comments: [],
    isShort: true
  },
  {
    id: 's-3',
    title: 'Desi Mom finding anything you lost in 2 seconds flat 🤣 #relatable',
    description: 'Mummy magic when you searched whole room for 1 hour #comedy #indianmemes #shorts',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    duration: '0:34',
    views: '6.8M views',
    viewCount: 6800000,
    uploadedAt: '3 days ago',
    category: 'Comedy & Vines',
    channel: {
      id: 'ch-3',
      name: 'Desi Bakar Vines',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      subscribers: '8.9M',
      verified: true
    },
    likes: 850000,
    dislikes: 4200,
    comments: [],
    isShort: true
  }
];
