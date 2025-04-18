
import { profileData, streakData } from "@/data/mockData";
import { Bell, Flame, Menu, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-streak-gold" />
          <span className="text-xl font-bold text-linkedin-DEFAULT">StreakIn</span>
        </div>
      </div>

      <div className={`${isSearchOpen ? "flex" : "hidden"} md:flex w-full max-w-md mx-4`}>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="w-full pl-9 pr-4"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Flame className="h-5 w-5 text-streak-gold" />
          <span>{streakData.currentStreak} day streak</span>
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback>{profileData.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:inline-block">
            {profileData.name}
          </span>
        </div>
      </div>
    </header>
  );
}
