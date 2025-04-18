
import { Button } from "@/components/ui/button";
import { profileData } from "@/data/mockData";
import { Award, BarChart2, Calendar, Flame, Home, LayoutDashboard, LogOut, MessageSquare, Settings, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-screen w-64 flex-col border-r bg-white", className)}>
      <div className="flex items-center gap-2 border-b p-4">
        <Flame className="h-6 w-6 text-streak-gold" />
        <span className="text-xl font-bold text-linkedin-DEFAULT">StreakIn</span>
      </div>
      
      <div className="flex flex-col items-center border-b p-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profileData.avatar} alt={profileData.name} />
          <AvatarFallback>{profileData.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <h2 className="mt-2 text-lg font-medium">{profileData.name}</h2>
        <p className="text-sm text-muted-foreground">{profileData.title}</p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <Flame className="h-4 w-4 text-streak-gold" />
          <span className="font-medium text-linkedin-DEFAULT">{profileData.level}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Button variant="ghost" className="justify-start gap-2">
            <Home className="h-5 w-5" />
            Home
          </Button>
          <Button variant="ghost" className="justify-start gap-2 bg-accent">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Calendar className="h-5 w-5" />
            Calendar
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <BarChart2 className="h-5 w-5" />
            Analytics
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Users className="h-5 w-5" />
            Community
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages
          </Button>
        </nav>
      </div>
      
      <div className="border-t p-2">
        <nav className="grid gap-1">
          <Button variant="ghost" className="justify-start gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="justify-start gap-2 text-muted-foreground">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  );
}
