
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calendarData } from "@/data/mockData";
import { CalendarView, PostActivity } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, CalendarRange, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityCalendar() {
  const [view, setView] = useState<CalendarView>("week");
  
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  
  // Calculate date ranges based on view and current date
  const getDateRange = () => {
    const ranges: Record<CalendarView, { start: Date; end: Date }> = {
      day: {
        start: new Date(currentDate),
        end: new Date(currentDate),
      },
      week: {
        start: new Date(currentDate),
        end: new Date(currentDate),
      },
      month: {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
      },
      year: {
        start: new Date(currentDate.getFullYear(), 0, 1),
        end: new Date(currentDate.getFullYear(), 11, 31),
      },
    };
    
    // Set start of week to Sunday
    if (view === "week") {
      const day = currentDate.getDay();
      ranges.week.start.setDate(currentDate.getDate() - day);
      ranges.week.end.setDate(ranges.week.start.getDate() + 6);
    }
    
    return ranges[view];
  };
  
  const dateRange = getDateRange();
  
  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    
    if (view === "day") {
      return currentDate.toLocaleDateString("en-US", { 
        weekday: "long", 
        month: "long", 
        day: "numeric" 
      });
    }
    
    if (view === "month") {
      return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
    
    if (view === "year") {
      return currentDate.getFullYear().toString();
    }
    
    // Week view
    return `${dateRange.start.toLocaleDateString("en-US", options)} - ${dateRange.end.toLocaleDateString("en-US", options)}`;
  };
  
  // Navigation functions
  const previous = () => {
    const newDate = new Date(currentDate);
    if (view === "day") newDate.setDate(newDate.getDate() - 1);
    else if (view === "week") newDate.setDate(newDate.getDate() - 7);
    else if (view === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (view === "year") newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };
  
  const next = () => {
    const newDate = new Date(currentDate);
    if (view === "day") newDate.setDate(newDate.getDate() + 1);
    else if (view === "week") newDate.setDate(newDate.getDate() + 7);
    else if (view === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (view === "year") newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Filter activities for current date range
  const activitiesInRange = calendarData.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate >= dateRange.start && activityDate <= dateRange.end;
  });
  
  // Generate days for the week view
  const generateWeekDays = () => {
    const days = [];
    const startDate = new Date(dateRange.start);
    
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      
      const dayStr = currentDay.toISOString().split("T")[0];
      const activity = calendarData.find(a => a.date === dayStr) || {
        date: dayStr,
        posted: false,
        postCount: 0,
      };
      
      const isToday = currentDay.toDateString() === today.toDateString();
      
      days.push({ date: currentDay, activity, isToday });
    }
    
    return days;
  };
  
  const weekDays = generateWeekDays();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Activity Calendar</CardTitle>
          <CardDescription>Track your posting consistency</CardDescription>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(view === "day" && "bg-secondary/20")}
            onClick={() => setView("day")}
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(view === "week" && "bg-secondary/20")}
            onClick={() => setView("week")}
          >
            <CalendarRange className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(view === "month" && "bg-secondary/20")}
            onClick={() => setView("month")}
          >
            <CalendarDays className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(view === "year" && "bg-secondary/20")}
            onClick={() => setView("year")}
          >
            <BarChart2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium">{formatDateRange()}</h3>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={previous}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {view === "week" && (
          <div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {weekDays.map(({ date, activity, isToday }) => (
                <div key={date.toISOString()} className="aspect-square">
                  <button
                    className={cn(
                      "flex h-full w-full flex-col items-center justify-center rounded-md p-2 transition-colors",
                      isToday && !activity.posted && "border border-linkedin-DEFAULT",
                      isToday && activity.posted && "border border-streak-gold",
                      activity.posted && "bg-streak-gold bg-opacity-80 text-white hover:bg-streak-gold",
                      !activity.posted && "bg-secondary/10 hover:bg-secondary/20"
                    )}
                  >
                    <span className="text-xs font-medium">{date.getDate()}</span>
                    {activity.posted && (
                      <span className="mt-1 text-[10px]">{activity.postCount} post{activity.postCount !== 1 ? 's' : ''}</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {view === "day" && (
          <div className="flex flex-col items-center justify-center p-8">
            <div 
              className={cn(
                "flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold",
                activitiesInRange[0]?.posted 
                  ? "bg-streak-gold text-white" 
                  : "bg-secondary/20 text-muted-foreground"
              )}
            >
              {currentDate.getDate()}
            </div>
            <p className="mt-4 text-center">
              {activitiesInRange[0]?.posted 
                ? `Posted ${activitiesInRange[0]?.postCount} ${activitiesInRange[0]?.postCount === 1 ? 'time' : 'times'} today!` 
                : "No posts yet today"}
            </p>
          </div>
        )}
        
        {view === "month" && (
          <div className="overflow-hidden">
            <div className="text-center text-sm text-muted-foreground">
              Month view coming soon
            </div>
          </div>
        )}
        
        {view === "year" && (
          <div className="overflow-hidden">
            <div className="pt-2">
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 12 }).map((_, monthIndex) => {
                  const date = new Date(currentDate.getFullYear(), monthIndex, 1);
                  return (
                    <div key={monthIndex} className="text-center">
                      <div className="text-xs text-muted-foreground">
                        {date.toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="mt-1 grid grid-cols-2 gap-[2px]">
                        {Array.from({ length: 15 }).map((_, i) => {
                          // Approximate 30 days per month by showing 15 cells in a 2-column grid
                          const dayActivity = calendarData.find(
                            activity => {
                              const activityDate = new Date(activity.date);
                              return (
                                activityDate.getMonth() === monthIndex && 
                                activityDate.getDate() === i + 1 &&
                                activityDate.getFullYear() === currentDate.getFullYear()
                              );
                            }
                          );
                          
                          const intensity = dayActivity?.posted 
                            ? dayActivity.engagement 
                              ? Math.min(Math.floor(dayActivity.engagement / 2), 5) 
                              : 1
                            : 0;
                            
                          const bgColor = !dayActivity?.posted 
                            ? 'bg-secondary/10' 
                            : intensity <= 1 
                              ? 'bg-streak-gold/30' 
                              : intensity <= 3 
                                ? 'bg-streak-gold/60' 
                                : 'bg-streak-gold';
                          
                          return (
                            <div
                              key={i}
                              className={`aspect-square w-full rounded-sm ${bgColor}`}
                              title={dayActivity?.posted ? `Posted on day ${i+1}` : `No post on day ${i+1}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="h-3 w-3 rounded-sm bg-secondary/10"></div>
                  <span>No posts</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="h-3 w-3 rounded-sm bg-streak-gold/30"></div>
                  <div className="h-3 w-3 rounded-sm bg-streak-gold/60"></div>
                  <div className="h-3 w-3 rounded-sm bg-streak-gold"></div>
                  <span>Engagement level</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
