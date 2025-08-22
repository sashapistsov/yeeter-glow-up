import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, ArrowLeft, Medal, Crown, Award, TrendingUp, Users } from "lucide-react";

// Mock leaderboard data
const generateLeaderboardData = (communityId: string) => {
  const baseData = [
    { name: "CryptoKing2024", points: 15420, change: "+12.5%", avatar: "/api/placeholder/40/40", rank: 1 },
    { name: "YeetMaster", points: 14850, change: "+8.2%", avatar: "/api/placeholder/40/40", rank: 2 },
    { name: "DiamondHands", points: 13990, change: "+15.1%", avatar: "/api/placeholder/40/40", rank: 3 },
    { name: "MoonShot", points: 12750, change: "-2.3%", avatar: "/api/placeholder/40/40", rank: 4 },
    { name: "HODLer4Life", points: 11900, change: "+5.7%", avatar: "/api/placeholder/40/40", rank: 5 },
    { name: "AlphaTrade", points: 11200, change: "+9.4%", avatar: "/api/placeholder/40/40", rank: 6 },
    { name: "BullMarket", points: 10850, change: "+3.1%", avatar: "/api/placeholder/40/40", rank: 7 },
    { name: "DegenTrader", points: 9950, change: "-1.5%", avatar: "/api/placeholder/40/40", rank: 8 },
    { name: "GigaChad", points: 9420, change: "+7.8%", avatar: "/api/placeholder/40/40", rank: 9 },
    { name: "ProTrader", points: 8900, change: "+4.2%", avatar: "/api/placeholder/40/40", rank: 10 }
  ];
  return baseData;
};

const communityNames: { [key: string]: string } = {
  "207Bear_Dizkontinued": "207Bear x Dizkontinued",
  "btctalk": "Bitcoin Talk",
  "bodoggos": "Bodoggos",
  "disgrazze": "Disgrazze",
  "fomohour": "Fomo Hour",
  "GCCrypto": "GC Crypto",
  "jasper": "Jasper",
  "kaitoAI_August": "KaitoAI - August",
  "mandominutes": "Mando Minutes"
};

const Leaderboard = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("weekly");
  
  const communityName = communityNames[communityId || ""] || "Unknown Community";
  const leaderboardData = generateLeaderboardData(communityId || "");

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankBackground = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30";
    return "bg-gradient-card border-secondary/20";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="relative z-50 p-6 border-b border-secondary/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Communities
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                YEETER
              </span>
              <span className="text-lg font-bold text-primary">BOARDS</span>
            </div>
          </div>
          <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-8 animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000`}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-primary p-0.5 animate-scale-in">
                <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {communityName.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">{communityName}</h1>
            <p className="text-muted-foreground text-lg mb-6">Community Leaderboard</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">2.5K members</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">+15% this week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <Card
                    key={user.name}
                    className={`${getRankBackground(user.rank)} hover:border-primary/30 transition-all duration-500 hover:shadow-glow hover:-translate-y-1 animate-scale-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankIcon(user.rank)}
                          </div>
                          
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={user.change.startsWith('+') ? 'default' : 'destructive'}
                                className={user.change.startsWith('+') ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                              >
                                {user.change}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {user.points.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
              Load More Rankings
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              YEETER
            </span>
            <span className="text-xl font-bold text-primary">BOARDS</span>
          </div>
          <p className="text-muted-foreground">
            The ultimate community leaderboard platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;