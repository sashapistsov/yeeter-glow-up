import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Clock, Users } from "lucide-react";

interface GiveawayProps {
  isLive?: boolean;
  endTime?: Date;
  title?: string;
  description?: string;
}

export const GiveawaySection = ({ 
  isLive = true, 
  endTime = new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  title = "Raffle",
  description = "Enter the codeword given by the raffle host before it expires to gain an entry to the raffle."
}: GiveawayProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [codeword, setCodeword] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft("EXPIRED");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 shadow-glow animate-fade-in">
      <CardContent className="p-4 md:p-6">
        {/* Mobile: Stack header vertically, Desktop: Keep horizontal */}
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Gift className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <h3 className="text-lg md:text-xl font-bold text-foreground">{title}:</h3>
            <Badge
              className={`text-xs ${
                isLive && timeLeft !== "EXPIRED" 
                  ? "bg-green-500 text-white animate-pulse" 
                  : "bg-red-500 text-white"
              }`}
            >
              {isLive && timeLeft !== "EXPIRED" ? "LIVE!" : "ENDED"}
            </Badge>
          </div>
          
          {timeLeft !== "EXPIRED" && (
            <div className="flex items-center space-x-2 text-primary">
              <Clock className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-mono text-base md:text-lg font-bold">{timeLeft}</span>
            </div>
          )}
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-4">
          {description}
        </p>

        {isLive && timeLeft !== "EXPIRED" ? (
          <div className="space-y-3 md:space-y-4">
            {/* Mobile: Stack input and button vertically, Desktop: Keep horizontal */}
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <Input
                placeholder="Enter codeword..."
                value={codeword}
                onChange={(e) => setCodeword(e.target.value)}
                className="w-full bg-secondary border-primary/20 text-foreground h-10 md:h-auto"
              />
              <Button 
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-10 md:h-auto"
                disabled={!codeword.trim()}
              >
                Submit Entry
              </Button>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              You must be logged in to enter raffles.
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
              Sign in with Kick
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface LeaderboardPeriodProps {
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
}

export const LeaderboardPeriod = ({ 
  startDate, 
  endDate, 
  isActive = false 
}: LeaderboardPeriodProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!isActive) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${hours}h ${minutes}m`);
        }
      } else {
        setTimeLeft("Concluded");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [endDate, isActive]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <Card className="bg-card border-border animate-fade-in">
      <CardContent className="p-4 md:p-6">
        {/* Mobile: Stack header vertically, Desktop: Keep horizontal */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground">Leaderboard Period</h3>
          {isActive && (
            <Badge className="bg-primary text-primary-foreground text-xs w-fit">
              {timeLeft === "Concluded" ? "Concluded" : `${timeLeft} left`}
            </Badge>
          )}
        </div>

        <div className="relative">
          {/* Timeline bar */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-secondary rounded-full">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                isActive ? "bg-primary" : "bg-muted-foreground"
              }`}
              style={{
                width: isActive ? 
                  `${Math.min(100, ((Date.now() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100)}%` : 
                  "100%"
              }}
            />
          </div>

          {/* Start and end dates - Better mobile spacing */}
          <div className="flex justify-between items-center pt-10 md:pt-8 space-x-2">
            <div className="text-center flex-1">
              <Badge variant="outline" className="mb-1 md:mb-2 border-primary/20 text-primary text-xs">
                {formatDate(startDate)}
              </Badge>
              <div className="text-xs md:text-sm text-muted-foreground">Start</div>
            </div>
            
            <div className="text-center flex-1">
              <Badge variant="outline" className="mb-1 md:mb-2 border-primary/20 text-primary text-xs">
                {formatDate(endDate)}
              </Badge>
              <div className="text-xs md:text-sm text-muted-foreground">End</div>
            </div>
          </div>
        </div>

        {timeLeft === "Concluded" && (
          <div className="text-center mt-4 text-muted-foreground">
            Leaderboard Concluded
          </div>
        )}
      </CardContent>
    </Card>
  );
};