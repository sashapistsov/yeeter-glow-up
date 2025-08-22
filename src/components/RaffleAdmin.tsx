import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dice6, Eye, Users, TrendingUp, X } from "lucide-react";

interface RaffleAdminProps {
  communityName: string;
  totalMembers: string;
  onClose: () => void;
}

const RaffleAdmin = ({ communityName, totalMembers, onClose }: RaffleAdminProps) => {
  const [minRanking, setMinRanking] = useState("");
  const [minVolume, setMinVolume] = useState("");
  const [eligibleEntries, setEligibleEntries] = useState(142);

  const handleCalculateEntries = () => {
    // Mock calculation - in real app this would call an API
    const ranking = parseInt(minRanking) || 0;
    const volume = parseInt(minVolume) || 0;
    const baseMembers = parseInt(totalMembers.replace('K', '')) * 1000;
    
    // Simple logic to reduce eligible entries based on criteria
    let eligible = baseMembers;
    if (ranking > 0) eligible = Math.floor(eligible * 0.7);
    if (volume > 0) eligible = Math.floor(eligible * 0.5);
    
    setEligibleEntries(Math.max(1, eligible));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border shadow-glow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Dice6 className="h-6 w-6 text-primary" />
              Host Raffle
            </CardTitle>
            <Badge variant="secondary" className="mt-2">
              {communityName}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Raffle Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minRanking" className="text-sm font-medium">
                Minimum Ranking
              </Label>
              <Input
                id="minRanking"
                placeholder="Enter ranking threshold"
                value={minRanking}
                onChange={(e) => setMinRanking(e.target.value)}
                className="bg-secondary/50 border-border focus:border-primary/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minVolume" className="text-sm font-medium">
                Minimum Volume
              </Label>
              <Input
                id="minVolume"
                placeholder="Enter volume threshold"
                value={minVolume}
                onChange={(e) => setMinVolume(e.target.value)}
                className="bg-secondary/50 border-border focus:border-primary/50"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculateEntries}
            className="w-full bg-secondary hover:bg-primary transition-colors"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Calculate Eligible Entries
          </Button>

          {/* Eligible Entries Display */}
          <Card className="bg-secondary/30 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Eligible Entries</span>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1 border-primary/30 text-primary">
                  {eligibleEntries.toLocaleString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 shadow-glow"
              disabled={eligibleEntries === 0}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Wheel
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
            >
              Go Offline
            </Button>
          </div>

          {/* Community Stats */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Total Community Members</span>
              <span className="font-medium">{totalMembers}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaffleAdmin;