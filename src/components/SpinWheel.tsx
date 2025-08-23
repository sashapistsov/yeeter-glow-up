import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, X, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinWheelProps {
  isOpen: boolean;
  onClose: () => void;
  eligibleUsers: Array<{
    name: string;
    rank: number;
    volume: number;
    status: string;
  }>;
}

const SpinWheel = ({ isOpen, onClose, eligibleUsers }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winners, setWinners] = useState<Array<{ name: string; rank: number }>>([]);
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [winningSegment, setWinningSegment] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Filter only eligible users (ELIGIBLE or ENTERED status)
  const spinEligibleUsers = eligibleUsers.filter(user => 
    user.status === "ELIGIBLE" || user.status === "ENTERED"
  );

  // Create wheel segments
  const segments = spinEligibleUsers.length;
  const segmentAngle = 360 / segments;

  const getSegmentColor = (index: number, isWinning: boolean = false) => {
    if (isWinning) {
      return "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary)/0.8))";
    }
    const colors = [
      "#3B82F6", // Blue
      "#10B981", // Green  
      "#F59E0B", // Yellow
      "#EF4444", // Red
      "#8B5CF6", // Purple
      "#06B6D4", // Cyan
      "#F97316", // Orange
      "#84CC16", // Lime
    ];
    return colors[index % colors.length];
  };

  const spinWheel = () => {
    if (isSpinning || spinEligibleUsers.length === 0) return;

    setIsSpinning(true);
    setSelectedWinner(null);
    setWinningSegment(null);

    // Random spin between 3-6 full rotations plus random segment
    const fullRotations = 3 + Math.random() * 3;
    const randomSegment = Math.floor(Math.random() * segments);
    const finalRotation = fullRotations * 360 + randomSegment * segmentAngle;
    
    setRotation(prev => prev + finalRotation);

    // Determine winner after spin completes
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const winnerIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segments;
      const winner = spinEligibleUsers[winnerIndex];
      
      setWinningSegment(winnerIndex);
      setSelectedWinner(winner.name);
      setWinners(prev => [...prev, { name: winner.name, rank: winner.rank }]);
      setIsSpinning(false);
    }, 3000);
  };

  const resetWheel = () => {
    setSelectedWinner(null);
    setWinningSegment(null);
    setIsSpinning(false);
  };

  const clearWinners = () => {
    setWinners([]);
    setSelectedWinner(null);
    setWinningSegment(null);
  };

  useEffect(() => {
    if (!isOpen) {
      setRotation(0);
      setSelectedWinner(null);
      setWinningSegment(null);
      setIsSpinning(false);
    }
  }, [isOpen]);

  if (spinEligibleUsers.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Raffle Wheel
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No eligible users found for the raffle.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Raffle Wheel - {spinEligibleUsers.length} Eligible Users
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Wheel Container */}
          <div className="relative flex items-center justify-center">
            {/* Large, Clear White Pointer Arrow that overlaps wheel */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-30">
              <div className="flex flex-col items-center">
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-white drop-shadow-lg"></div>
                <div className="w-4 h-2 bg-white rounded-b-lg shadow-lg"></div>
              </div>
            </div>

            {/* Wheel */}
            <div className="relative">
              <div
                ref={wheelRef}
                className={cn(
                  "w-80 h-80 rounded-full border-4 border-primary overflow-hidden transition-transform shadow-2xl",
                  isSpinning ? "duration-[3s] ease-out" : "duration-300"
                )}
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {spinEligibleUsers.map((user, index) => {
                  const startAngle = index * segmentAngle;
                  const isWinning = winningSegment === index && !isSpinning;
                  const textAngle = startAngle + segmentAngle / 2;
                  
                  return (
                    <div
                      key={user.name}
                      className={cn(
                        "absolute w-full h-full transition-all duration-500",
                        isWinning && "z-10"
                      )}
                      style={{
                        background: getSegmentColor(index, isWinning),
                        clipPath: `polygon(50% 50%, ${
                          50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)
                        }% ${
                          50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)
                        }%, ${
                          50 + 50 * Math.cos((startAngle + segmentAngle - 90) * Math.PI / 180)
                        }% ${
                          50 + 50 * Math.sin((startAngle + segmentAngle - 90) * Math.PI / 180)
                        }%)`,
                        boxShadow: isWinning ? "inset 0 0 20px rgba(255,255,255,0.3)" : "none",
                      }}
                    >
                      {/* User name positioned along the segment */}
                      <div
                        className="absolute"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `rotate(${textAngle}deg)`,
                          transformOrigin: "0 0",
                        }}
                      >
                        <div
                          className="flex items-center justify-center"
                          style={{
                            transform: "translate(60px, -8px)",
                            width: "100px",
                            height: "16px",
                          }}
                        >
                          <span
                            className={cn(
                              "font-bold text-center truncate px-1 transition-all duration-300 block w-full text-white",
                              segments > 12 ? "text-xs" : segments > 8 ? "text-sm" : "text-base",
                              isWinning && "scale-110 drop-shadow-lg"
                            )}
                            style={{
                              textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7), -1px -1px 2px rgba(0,0,0,0.5)",
                              transform: `rotate(-${textAngle}deg)`,
                              lineHeight: "1",
                              fontWeight: "900",
                            }}
                          >
                            {user.name}
                          </span>
                        </div>
                      </div>
                      
                      {/* Segment border lines */}
                      <div
                        className="absolute inset-0"
                        style={{
                          borderRight: "2px solid rgba(255,255,255,0.3)",
                          transformOrigin: "50% 50%",
                          transform: `rotate(${segmentAngle}deg)`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full border-4 border-white shadow-lg z-20 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Winner Announcement */}
          {selectedWinner && (
            <div className="text-center animate-scale-in">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 rounded-lg p-6 mb-4">
                <Crown className="h-12 w-12 text-primary mx-auto mb-3 animate-pulse" />
                <h3 className="text-2xl font-bold text-primary mb-2">🎉 Winner! 🎉</h3>
                <p className="text-xl font-semibold">{selectedWinner}</p>
              </div>
            </div>
          )}

          {/* Spin Button */}
          <div className="text-center">
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-glow"
            >
              {isSpinning ? (
                <>
                  <RotateCcw className="mr-2 h-5 w-5 animate-spin" />
                  Spinning...
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-5 w-5" />
                  Spin the Wheel
                </>
              )}
            </Button>
          </div>

          {/* Winners List */}
          {winners.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">Winners ({winners.length})</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearWinners}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {winners.map((winner, index) => (
                  <div
                    key={`${winner.name}-${index}`}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="font-medium">{winner.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Rank #{winner.rank}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              onClick={resetWheel}
              variant="outline"
              className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
              disabled={isSpinning}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Spin Again
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpinWheel;