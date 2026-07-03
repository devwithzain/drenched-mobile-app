export interface Meditation {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  image: any;
  audioUrl?: string;
}

export interface Story {
  id: string;
  title: string;
  duration: string;
  image: any;
  narrator: string;
  audioUrl?: string;
}

export interface MusicItem {
  id: string;
  quote: string;
  reference: string;
  image: any;
  audioUrl?: string;
}

export interface Prayer {
  id: string;
  title: string;
  time: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

export interface PrayerCollection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface BibleVerse {
  number: string;
  text: string;
}

export interface RecentListened {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  completed: boolean;
}

export interface ProfileMenuItem {
  id: string;
  title: string;
  icon: string;
  screen: string | null;
  subtitle?: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  enabled: boolean;
  time: string;
  day?: string;
}

export interface SubscriptionFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
}

export const MEDITATIONS: Meditation[] = [
  {
    id: '1',
    title: 'Finding Peace in Chaos',
    subtitle: 'Guided session on Psalm 46:10',
    duration: '10 MIN',
    image: require("../assets/images/daily01.png"),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Morning Mercies',
    subtitle: 'Lamentations 3',
    duration: '15 MIN',
    image: require('../assets/images/daily02.png'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
];

export const STORIES: Story[] = [
  {
    id: '1',
    title: "The Shepherd's Rest",
    duration: '18 mins',
    image: require('../assets/images/story01.png'),
    narrator: 'Drenched Worship',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '2',
    title: 'Psalms of Asaph',
    duration: '15 mins',
    image: require('../assets/images/story02.png'),
    narrator: 'Drenched Worship',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
];

export const MUSIC: MusicItem[] = [
  {
    id: '1',
    quote: '"Then God\'s temple in heaven was opened..."',
    reference: 'Revelation 11:19',
    image: require('../assets/images/music01.png'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: '2',
    quote: '"Then God\'s temple in heaven was opened..."',
    reference: 'Revelation 11:19',
    image: require('../assets/images/music02.png'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
];

export const PRAYERS: Prayer[] = [
  {
    id: '1',
    title: 'Prayer for Clarity',
    time: 'Added yesterday',
    icon: 'heart',
    iconColor: '#0891b2',
    iconBg: '#cffafe',
  },
  {
    id: '2',
    title: 'Evening Gratitude',
    time: '3 days ago',
    icon: 'star',
    iconColor: '#0284c7',
    iconBg: '#e0f2fe',
  },
];

export const PRAYER_COLLECTIONS: PrayerCollection[] = [
  {
    id: '1',
    title: 'Morning Devotion',
    subtitle: 'Start your day in grace \u2022 8 mins',
    icon: 'sun',
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    id: '2',
    title: 'Healing Prayers',
    subtitle: 'Comfort for soul and body \u2022 12 mins',
    icon: 'heart',
    iconBg: '#fce7f3',
    iconColor: '#db2777',
  },
  {
    id: '3',
    title: 'Peaceful Sleep',
    subtitle: 'Release the day\'s burden \u2022 15 mins',
    icon: 'moon',
    iconBg: '#f3e8ff',
    iconColor: '#9333ea',
  },
  {
    id: '4',
    title: 'Anxiety Relief',
    subtitle: 'Quiet the mind in Him \u2022 10 mins',
    icon: 'brain',
    iconBg: '#d1fae5',
    iconColor: '#059669',
  },
];

export const BIBLE_VERSES: BibleVerse[] = [
  { number: '1', text: 'The Lord is my shepherd; I shall not want.' },
  { number: '2', text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
  { number: '3', text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.' },
  { number: '4', text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
  { number: '5', text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
  { number: '6', text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever.' },
];

export const FILTER_TABS: string[] = ['Recommendations', 'All Stories', 'Old Testament', 'New Testament'];

export const RECENT_LISTENED: RecentListened[] = [
  {
    id: '1',
    title: 'The Good Shepherd',
    subtitle: 'Psalm 23 \u2022 15:42 left',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200',
    completed: false,
  },
  {
    id: '2',
    title: 'Morning Mercies',
    subtitle: 'Lamentations 3 \u2022 Completed',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200',
    completed: true,
  },
];

export const PROFILE_MENU: ProfileMenuItem[] = [
  { id: '1', title: 'Settings', icon: 'cog', screen: 'settings' },
  { id: '2', title: 'Download History', icon: 'download', screen: null },
  { id: '3', title: 'Notification', icon: 'bell', screen: 'notifications' },
  { id: '4', title: 'Subscription Plan', icon: 'credit-card', screen: 'subscription', subtitle: 'Annual Pro Plan' },
  { id: '5', title: 'Help & Support', icon: 'question-circle', screen: null },
];

export const REMINDERS: Reminder[] = [
  {
    id: '1',
    title: 'Morning Devotion',
    description: 'Begin your day with intention and a quiet mind.',
    icon: 'sun',
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
    enabled: true,
    time: '07:00 AM',
  },
  {
    id: '2',
    title: 'Daily Verse',
    description: 'A small seed of wisdom delivered to your screen.',
    icon: 'book-open',
    iconBg: '#ccfbf1',
    iconColor: '#0d9488',
    enabled: true,
    time: '12:30 PM',
  },
  {
    id: '3',
    title: 'Bedtime Story',
    description: 'Winding down with peaceful narratives.',
    icon: 'moon',
    iconBg: '#fce7f3',
    iconColor: '#db2777',
    enabled: false,
    time: '09:45 PM',
  },
  {
    id: '4',
    title: 'Weekly Reflection',
    description: 'Look back on your journey every Sunday.',
    icon: 'calendar-alt',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    enabled: true,
    time: '06:00 PM',
    day: 'Sunday',
  },
];

export const SUBSCRIPTION_FEATURES: SubscriptionFeature[] = [
  {
    id: '1',
    title: 'Unlimited Access to All Stories',
    description: 'Dive into our entire library of curated narratives and biblical meditations without limits.',
    icon: 'book-open',
  },
  {
    id: '2',
    title: 'Offline Downloads',
    description: 'Take your sanctuary wherever you go, even without an internet connection.',
    icon: 'download',
  },
  {
    id: '3',
    title: 'Daily Personalized Meditations',
    description: 'Content tailored to your current season of life and spiritual needs.',
    icon: 'sparkles',
  },
  {
    id: '4',
    title: 'Ad-free Experience',
    description: 'Pure, uninterrupted focus on what matters most. No distractions, just peace.',
    icon: 'ban',
  },
];

export const PLANS: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Annual Pro Plan',
    price: '$4.99',
    period: 'per month',
    description: 'Billed annually at $59.99/year',
    popular: true,
  },
  {
    id: '2',
    name: 'Monthly Plan',
    price: '$7.99',
    period: 'per month',
    description: 'Cancel anytime',
    popular: false,
  },
];

export const recommendationStories = [
  {
    id: "asaph-1",
    title: "Psalms of Asaph",
    subtitle: "Restorative Melody",
    duration: "15 mins",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400",
    narrator: "Drenched Worship",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "quiet-stillness",
    title: "Quiet Stillness",
    subtitle: "12 min Scripture",
    duration: "12 mins",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    narrator: "Drenched Worship",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

export const recentlyListenedItems = [
  {
    id: "recent-1",
    title: "The Good Shepherd",
    subtitle: "Psalm 23 \u2022 15:42 left",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200",
    completed: false,
    narrator: "Drenched Worship",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "recent-2",
    title: "Morning Mercies",
    subtitle: "Lamentations 3 \u2022 Completed",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200",
    completed: true,
    narrator: "Drenched Worship",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

export const discoverPeaceStories = [
  {
    id: "dp-1",
    title: "Walking with the Spirit",
    tag: "FEATURED PRAYER",
    duration: "12:45",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
    narrator: "John Doe",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "dp-2",
    title: "Quiet Waters",
    duration: "8:20 \u2022 Nature Sound",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    narrator: "John Doe",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "dp-3",
    title: "Sowing Hope",
    duration: "15:00 \u2022 Devotion",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    narrator: "John Doe",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "dp-4",
    title: "The High Place",
    duration: "10:15 \u2022 Stories",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
    narrator: "John Doe",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "dp-5",
    title: "Rain of Grace",
    duration: "22:30 \u2022 Bedtime",
    image: "https://images.unsplash.com/photo-1533836555383-8c5aa1844aaf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    narrator: "John Doe",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

export const musicItems = [
  {
    id: "gm-1",
    quote: '"Then God\'s temple in heaven was opened, and within his temple was seen the ark of his covenant. And there came flashes of lightning, rumblings, peals of thunder, an earthquake and a severe hailstorm."',
    reference: "Revelation 11:19",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "gm-2",
    quote: '"Then God\'s temple in heaven was opened, and within his temple was seen the ark of his covenant. And there came flashes of lightning, rumblings, peals of thunder, an earthquake and a severe hailstorm."',
    reference: "Revelation 11:19",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "gm-3",
    quote: '"Then God\'s temple in heaven was opened, and within his temple was seen the ark of his covenant. And there came flashes of lightning, rumblings, peals of thunder, an earthquake and a severe hailstorm."',
    reference: "Revelation 11:19",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "gm-4",
    quote: '"Then God\'s temple in heaven was opened, and within his temple was seen the ark of his covenant. And there came flashes of lightning, rumblings, peals of thunder, an earthquake and a severe hailstorm."',
    reference: "Revelation 11:19",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "gm-5",
    quote: '"Then God\'s temple in heaven was opened, and within his temple was seen the ark of his covenant. And there came flashes of lightning, rumblings, peals of thunder, an earthquake and a severe hailstorm."',
    reference: "Revelation 11:19",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
  {
    id: "gm-6",
    quote: '"Then God\'s temple in heaven was opened, and within his temple was seen the ark of his covenant. And there came flashes of lightning, rumblings, peals of thunder, an earthquake and a severe hailstorm."',
    reference: "Revelation 11:19",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
];