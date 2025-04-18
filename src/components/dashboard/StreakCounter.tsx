
import { useEffect, useState } from "react";
import { Flame, Medal, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { streakData } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function StreakCounter() {
  const [animateFlame, setAnimateFlame] = useState(false);
  
  // Add flame animation effect
  useEffect(() => {
    // Immediate animation on load
    setAnimateFlame(true);
    setTimeout(() => setAnimateFlame(false), 1000);
    
    // Periodic animation
    const interval = setInterval(() => {
      setAnimateFlame(true);
      setTimeout(() => setAnimateFlame(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Add keyframe animation for the counter
  useEffect(() => {
    const element = document.getElementById('streak-counter');
    if (element) {
      element.classList.add('animate-in');
      setTimeout(() => {
        element.classList.remove('animate-in');
      }, 1000);
    }
  }, []);

  const progress = (streakData.currentStreak / streakData.nextMilestone) * 100;
  const daysToNextMilestone = streakData.nextMilestone - streakData.currentStreak;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-linkedin-DEFAULT pb-2 text-white">
        <CardTitle className="flex items-center justify-between">
          <span>Current Streak</span>
          <div className="flex items-center gap-1">
            <Flame className="h-5 w-5 text-streak-gold" />
            <span>Streak Freezes: {streakData.streakFreezes}</span>
          </div>
        </CardTitle>
        <CardDescription className="text-white/80">
          Keep posting daily to maintain your streak!
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className={cn(
              "absolute -inset-1 rounded-full bg-streak-gold/30 transition-all",
              animateFlame ? "scale-125 opacity-100" : "scale-100 opacity-0"
            )} />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-streak-gold bg-white">
              <Flame className={cn(
                "h-12 w-12 text-streak-gold transition-transform animate-flame-flicker",
                animateFlame ? "scale-110" : "scale-100"
              )} />
            </div>
          </div>
          
          <span id="streak-counter" className="mt-2 text-4xl font-bold transition-all duration-300">{streakData.currentStreak}</span>
          <span className="text-sm text-muted-foreground">days</span>
          
          <div className="mt-4 w-full">
            <div className="mb-1 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Next milestone: {streakData.nextMilestone} days</span>
              </div>
              <span>{daysToNextMilestone} days to go</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="mt-6 flex w-full items-center justify-between">
            <div className="flex flex-col items-center">
              <Trophy className="h-5 w-5 text-streak-gold" />
              <span className="mt-1 text-sm font-medium">{streakData.longestStreak} days</span>
              <span className="text-xs text-muted-foreground">Longest</span>
            </div>
            <div className="flex flex-col items-center">
              <Medal className="h-5 w-5 text-linkedin-DEFAULT" />
              <span className="mt-1 text-sm font-medium">3rd</span>
              <span className="text-xs text-muted-foreground">Rank</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
