
import { Achievements } from "@/components/dashboard/Achievements";
import { ActivityCalendar } from "@/components/dashboard/ActivityCalendar";
import { DailyTip } from "@/components/dashboard/DailyTip";
import { EngagementStats } from "@/components/dashboard/EngagementStats";
import { Header } from "@/components/dashboard/Header";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar (hidden on mobile unless toggled) */}
      {showSidebar && (
        <Sidebar className="fixed inset-y-0 left-0 z-50 md:relative" />
      )}
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full bg-linkedin-DEFAULT text-white shadow-lg"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Menu />
          </Button>
        )}
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Streak counter card */}
              <div className="lg:col-span-1">
                <StreakCounter />
              </div>
              
              {/* Activity calendar card */}
              <div className="lg:col-span-2">
                <ActivityCalendar />
              </div>
            </div>
            
            {/* Engagement stats */}
            {/* Middle section - left and right columns */}
            <div className="mb-6 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <EngagementStats />
              </div>
              <div className="lg:col-span-1">
                <DailyTip />
              </div>
            </div>
            
            {/* Lower section - achievements and leaderboard */}
            <div className="grid gap-6 md:grid-cols-2">
              <Achievements />
              <Leaderboard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
