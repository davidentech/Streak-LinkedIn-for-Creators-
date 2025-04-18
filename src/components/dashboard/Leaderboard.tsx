
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { leaderboardData } from "@/data/mockData";
import { Crown, Medal, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Leaderboard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-streak-gold" />
          Creator Leaderboard
        </CardTitle>
        <CardDescription>
          See how you rank against other creators this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((entry) => {
            const isCurrentUser = entry.id === "currentUser";
            const rankIcons = {
              1: <Crown className="h-4 w-4 text-streak-gold" />,
              2: <Medal className="h-4 w-4 text-zinc-400" />,
              3: <Medal className="h-4 w-4 text-amber-700" />,
            };
            
            return (
              <div 
                key={entry.id}
                className={cn(
                  "flex items-center justify-between rounded-lg p-2",
                  isCurrentUser && "bg-accent/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {entry.rank in rankIcons ? rankIcons[entry.rank as keyof typeof rankIcons] : entry.rank}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback>{entry.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{entry.name}</span>
                      {isCurrentUser && (
                        <span className="rounded-sm bg-accent px-1 py-0.5 text-[10px] text-accent-foreground">You</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.level}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      {entry.streak} <span className="text-xs text-muted-foreground">days</span>
                    </div>
                    <p className="text-xs text-muted-foreground">streak</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{entry.points}</div>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
