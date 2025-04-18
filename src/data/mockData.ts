
import { Achievement, CreatorStats, LeaderboardEntry, Post, PostActivity, StreakData } from "@/types/dashboard";

// Mock current user profile data
export const profileData = {
  name: "Alex Johnson",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  title: "Digital Marketing Specialist",
  company: "Growth Hackers Inc.",
  level: "Consistency Expert",
  joined: "2023-01-15",
};

// Mock streak data for the current user
export const streakData: StreakData = {
  currentStreak: 14,
  longestStreak: 31,
  lastWeekActivity: [true, true, true, true, true, false, true], // last 7 days, oldest to newest
  nextMilestone: 21, // next streak milestone to reach
  streakFreezes: 2, // number of streak freezes available
};

// Mock creator statistics
export const creatorStats: CreatorStats = {
  followers: 2543,
  followersGrowth: 127, // growth in last 30 days
  averageEngagement: 4.2, // percentage
  postsThisMonth: 22,
  totalPosts: 187,
};

// Mock recent posts data
export const recentPosts: Post[] = [
  {
    id: "post1",
    date: "2023-04-18",
    content: "Just published my latest article on content marketing strategies for 2023!",
    likes: 127,
    comments: 32,
    shares: 18,
    views: 1503,
  },
  {
    id: "post2",
    date: "2023-04-17",
    content: "Excited to share that I've been nominated for the Marketing Excellence Award! #Grateful",
    likes: 215,
    comments: 45,
    shares: 27,
    views: 2104,
  },
  {
    id: "post3",
    date: "2023-04-16",
    content: "5 tips to improve your LinkedIn engagement rate that worked for me this quarter.",
    likes: 98,
    comments: 24,
    shares: 12,
    views: 1187,
  },
  {
    id: "post4",
    date: "2023-04-15",
    content: "Reflections on my journey from intern to marketing specialist in 3 years.",
    likes: 156,
    comments: 38,
    shares: 22,
    views: 1879,
  },
  {
    id: "post5",
    date: "2023-04-14",
    content: "Poll: What content type gets you the most engagement on LinkedIn?",
    likes: 87,
    comments: 56,
    shares: 9,
    views: 1632,
  },
];

// Mock achievements data
export const achievements: Achievement[] = [
  {
    id: "streak7",
    title: "First Week Warrior",
    description: "Maintained a 7-day posting streak",
    icon: "flame",
    earnedAt: "2023-03-21",
  },
  {
    id: "streak30",
    title: "Monthly Maven",
    description: "Maintained a 30-day posting streak",
    icon: "trophy",
    earnedAt: "2023-04-13",
  },
  {
    id: "engagement100",
    title: "Engagement Expert",
    description: "Received 100+ reactions on a single post",
    icon: "trending-up",
    earnedAt: "2023-04-02",
  },
  {
    id: "streak100",
    title: "Century Clubber",
    description: "Maintain a 100-day posting streak",
    icon: "award",
    progress: 14,
    target: 100,
  },
  {
    id: "comments50",
    title: "Conversation Starter",
    description: "Receive 50+ comments on a single post",
    icon: "message-square",
    progress: 38,
    target: 50,
  },
];

// Mock leaderboard data
export const leaderboardData: LeaderboardEntry[] = [
  {
    id: "user1",
    name: "Sarah Miller",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    streak: 47,
    level: "Consistency Master",
    points: 235,
    rank: 1,
  },
  {
    id: "user2",
    name: "David Chen",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    streak: 32,
    level: "Engagement Pro",
    points: 187,
    rank: 2,
  },
  {
    id: "currentUser",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    streak: 14,
    level: "Consistency Expert",
    points: 142,
    rank: 3,
  },
  {
    id: "user3",
    name: "Maria Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    streak: 12,
    level: "Rising Star",
    points: 118,
    rank: 4,
  },
  {
    id: "user4",
    name: "Thomas Wright",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    streak: 8,
    level: "Content Creator",
    points: 96,
    rank: 5,
  },
];

// Mock calendar data for heatmap (last 90 days)
export const calendarData: PostActivity[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 89 + i);
  
  // More frequent posting in recent days, with some random gaps
  const recentPeriod = i > 60;
  const midPeriod = i > 30 && i <= 60;
  
  // Determine posting probability based on period
  let postingProbability = 0.3; // Early period
  if (midPeriod) postingProbability = 0.5;
  if (recentPeriod) postingProbability = 0.8;
  
  // Ensure the last 14 days match our current streak (except for the one missed day)
  let posted = Math.random() < postingProbability;
  
  // Override for the last 14 days to match our streak data
  if (i >= 75) {
    const dayIndex = i - 75;
    if (dayIndex < streakData.lastWeekActivity.length) {
      posted = streakData.lastWeekActivity[dayIndex];
    } else {
      posted = true; // continued streak before the last 7 days
    }
  }
  
  // Random engagement level between 1-10 if posted
  const engagement = posted ? 1 + Math.floor(Math.random() * 10) : 0;
  
  return {
    date: date.toISOString().split("T")[0],
    posted,
    postCount: posted ? 1 : 0,
    engagement,
  };
});

// Helper function to get posts for a specific day
export const getPostsForDay = (date: string): Post[] => {
  return recentPosts.filter(post => post.date === date);
};

// Helper function to get activity data for a specific date range
export const getActivityForRange = (startDate: string, endDate: string): PostActivity[] => {
  return calendarData.filter(day => {
    return day.date >= startDate && day.date <= endDate;
  });
};
