
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { creatorStats, recentPosts } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { Eye, MessageSquare, Share2, ThumbsUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function EngagementStats() {
  // Create engagement data for chart from recent posts (newest to oldest)
  const engagementData = [...recentPosts]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(post => ({
      date: format(new Date(post.date), "MMM dd"),
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
      views: post.views,
      engagement: ((post.likes + post.comments + post.shares) / post.views) * 100,
    }));

  // Interaction distribution for pie chart
  const interactionData = [
    { name: "Likes", value: recentPosts.reduce((sum, post) => sum + post.likes, 0), color: "#0A66C2" },
    { name: "Comments", value: recentPosts.reduce((sum, post) => sum + post.comments, 0), color: "#57C7FF" },
    { name: "Shares", value: recentPosts.reduce((sum, post) => sum + post.shares, 0), color: "#FFD700" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-linkedin-DEFAULT" />
          Engagement Analytics
        </CardTitle>
        <CardDescription>
          Track how your content is performing with your audience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-linkedin-DEFAULT/20 p-2">
                <Users className="h-4 w-4 text-linkedin-DEFAULT" />
              </div>
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{creatorStats.followers.toLocaleString()}</span>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <span>+{creatorStats.followersGrowth}</span>
                <span className="text-muted-foreground">last 30 days</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-linkedin-DEFAULT/20 p-2">
                <Eye className="h-4 w-4 text-linkedin-DEFAULT" />
              </div>
              <span className="text-sm text-muted-foreground">Avg. Views</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">
                {Math.round(recentPosts.reduce((sum, post) => sum + post.views, 0) / recentPosts.length).toLocaleString()}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>per post</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-linkedin-DEFAULT/20 p-2">
                <ThumbsUp className="h-4 w-4 text-linkedin-DEFAULT" />
              </div>
              <span className="text-sm text-muted-foreground">Engagement</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{creatorStats.averageEngagement}%</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>avg. rate</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-streak-gold/20 p-2">
                <MessageSquare className="h-4 w-4 text-streak-gold" />
              </div>
              <span className="text-sm text-muted-foreground">Posts</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{creatorStats.postsThisMonth}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>this month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 space-y-1">
          <h3 className="text-sm font-medium">Engagement Trend</h3>
          <p className="text-xs text-muted-foreground">Last 5 posts engagement rate</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={engagementData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0A66C2" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }} 
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10 }} 
                  tickLine={false}
                  axisLine={false}
                  unit="%" 
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#0A66C2" 
                  fillOpacity={1} 
                  fill="url(#colorEngagement)" 
                  name="Engagement Rate"
                  unit="%"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Interaction Types</h3>
            <p className="text-xs text-muted-foreground">Distribution of audience engagement</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={interactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {interactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Recent Post Performance</h3>
            <p className="text-xs text-muted-foreground">Engagement metrics by post</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={engagementData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="likes" name="Likes" fill="#0A66C2" barSize={8} />
                  <Bar dataKey="comments" name="Comments" fill="#57C7FF" barSize={8} />
                  <Bar dataKey="shares" name="Shares" fill="#FFD700" barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
