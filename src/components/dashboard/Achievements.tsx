
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements } from "@/data/mockData";
import { Award, Flame, MessageSquare, TrendingUp, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const iconMap: Record<string, JSX.Element> = {
  flame: <Flame className="h-5 w-5" />,
  trophy: <Trophy className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  "trending-up": <TrendingUp className="h-5 w-5" />,
  "message-square": <MessageSquare className="h-5 w-5" />,
};

export function Achievements() {
  const earnedAchievements = achievements.filter(a => a.earnedAt);
  const inProgressAchievements = achievements.filter(a => !a.earnedAt);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-streak-gold" />
          Achievements
        </CardTitle>
        <CardDescription>
          Earn badges by maintaining your streak and engaging with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {earnedAchievements.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Earned</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {earnedAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="flex flex-col items-center justify-center rounded-lg bg-accent/20 p-3 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-streak-gold text-white">
                      {iconMap[achievement.icon]}
                    </div>
                    <h4 className="mt-2 text-sm font-medium">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Earned {new Date(achievement.earnedAt!).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {inProgressAchievements.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">In Progress</h3>
              <div className="space-y-3">
                {inProgressAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                        {iconMap[achievement.icon]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{achievement.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <Progress 
                          value={(achievement.progress! / achievement.target!) * 100} 
                          className="mt-2 h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
