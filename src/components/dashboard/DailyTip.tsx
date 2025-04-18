
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const contentSuggestions = [
  {
    type: "Story",
    icon: "📖",
    title: "Share Your Journey",
    description: "Tell an authentic story about a challenge you faced in your career and how you overcame it.",
    example: "Three years ago, I was rejected from my dream job. Here's what I learned and how it led me to something better...",
  },
  {
    type: "Tips",
    icon: "💡",
    title: "Professional Tips",
    description: "Share 3-5 actionable tips that helped you improve in your area of expertise.",
    example: "3 simple email templates that increased my response rate by 80% when networking with industry leaders...",
  },
  {
    type: "Poll",
    icon: "📊",
    title: "Engage with a Poll",
    description: "Create a poll to spark conversation and learn from your network.",
    example: "Which skill has been most valuable in your career? A) Technical expertise, B) Communication, C) Adaptability, D) Leadership",
  },
  {
    type: "Achievement",
    icon: "🏆",
    title: "Celebrate a Win",
    description: "Share a recent professional achievement and express gratitude.",
    example: "Excited to share that our team just launched [project] after months of hard work. Grateful to everyone who made it possible!",
  },
  {
    type: "Question",
    icon: "❓",
    title: "Ask a Thoughtful Question",
    description: "Pose an open-ended question about your industry or area of expertise.",
    example: "How do you balance innovation and reliability when building new products? I've found that...",
  },
];

export function DailyTip() {
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  
  const handleNextTip = () => {
    setCurrentSuggestion((prev) => (prev + 1) % contentSuggestions.length);
  };
  
  const handleLike = (index: number) => {
    if (liked.includes(index)) {
      setLiked(liked.filter((i) => i !== index));
    } else {
      setLiked([...liked, index]);
    }
  };
  
  const suggestion = contentSuggestions[currentSuggestion];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5 text-streak-gold" />
          Content Inspiration
        </CardTitle>
        <CardDescription>
          Keep your streak going with these content ideas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{suggestion.icon}</span>
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium">
                {suggestion.type}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-1 text-xs",
                liked.includes(currentSuggestion) && "text-destructive"
              )}
              onClick={() => handleLike(currentSuggestion)}
            >
              {liked.includes(currentSuggestion) ? "❤️ Saved" : "🤍 Save idea"}
            </Button>
          </div>
          
          <h3 className="mb-1 font-medium">{suggestion.title}</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {suggestion.description}
          </p>
          
          <div className="rounded-lg bg-accent/10 p-3">
            <h4 className="mb-1 text-xs font-medium">Example:</h4>
            <p className="text-sm italic text-muted-foreground">
              "{suggestion.example}"
            </p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm" className="text-sm" onClick={handleNextTip}>
              Next idea
            </Button>
            <Button size="sm" className="text-sm" onClick={() => window.open("https://www.linkedin.com/post/new", "_blank")}>
              Create post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
