
export interface Post {
  id: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastWeekActivity: boolean[];
  nextMilestone: number;
  streakFreezes: number;
}

export interface CreatorStats {
  followers: number;
  followersGrowth: number;
  averageEngagement: number;
  postsThisMonth: number;
  totalPosts: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
  progress?: number;
  target?: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  level: string;
  points: number;
  rank: number;
}

export type CalendarView = 'day' | 'week' | 'month' | 'year';

export interface PostActivity {
  date: string;
  posted: boolean;
  postCount: number;
  engagement?: number;
}
