import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Trophy, ArrowLeft, Medal, Crown, Award, TrendingUp, Users, Search } from "lucide-react";
import goldMedal from "@/assets/gold-medal.gif";
import silverMedal from "@/assets/silver-medal.gif";
import bronzeMedal from "@/assets/bronze-medal.gif";
import { Input } from "@/components/ui/input";
import { GiveawaySection, LeaderboardPeriod } from "@/components/GiveawaySection";
import RaffleAdmin from "@/components/RaffleAdmin";

// Import community images
import bearImage from "@/assets/communities/bear.jpg";
import bitcoinTalkImage from "@/assets/communities/bitcoin-talk.png";
import bodoggosImage from "@/assets/communities/bodoggos.jpg";
import disgrazzeImage from "@/assets/communities/disgrazze.jpeg";
import fomohourImage from "@/assets/communities/fomohour.jpg";
import gccryptoImage from "@/assets/communities/gccrypto.jpeg";
import jasperImage from "@/assets/communities/jasper.jpg";
import kaitoImage from "@/assets/communities/kaito.jpeg";
import mandoMinutesImage from "@/assets/communities/mando-minutes.png";

// Mock leaderboard data
const generateLeaderboardData = (communityId: string) => {
  const statuses = ["ELIGIBLE", "EXCLUDED", "ENTERED"];
  const baseData = [
    { name: "CryptoKing2024", volume: 15420, change: "+12.5%", avatar: "/api/placeholder/40/40", rank: 1, status: "ENTERED" },
    { name: "YeetMaster", volume: 14850, change: "+8.2%", avatar: "/api/placeholder/40/40", rank: 2, status: "ELIGIBLE" },
    { name: "DiamondHands", volume: 13990, change: "+15.1%", avatar: "/api/placeholder/40/40", rank: 3, status: "ENTERED" },
    { name: "MoonShot", volume: 12750, change: "-2.3%", avatar: "/api/placeholder/40/40", rank: 4, status: "EXCLUDED" },
    { name: "HODLer4Life", volume: 11900, change: "+5.7%", avatar: "/api/placeholder/40/40", rank: 5, status: "ENTERED" },
    { name: "AlphaTrade", volume: 11200, change: "+9.4%", avatar: "/api/placeholder/40/40", rank: 6, status: "ELIGIBLE" },
    { name: "BullMarket", volume: 10850, change: "+3.1%", avatar: "/api/placeholder/40/40", rank: 7, status: "ELIGIBLE" },
    { name: "DegenTrader", volume: 9950, change: "-1.5%", avatar: "/api/placeholder/40/40", rank: 8, status: "EXCLUDED" },
    { name: "GigaChad", volume: 9420, change: "+7.8%", avatar: "/api/placeholder/40/40", rank: 9, status: "ENTERED" },
    { name: "ProTrader", volume: 8900, change: "+4.2%", avatar: "/api/placeholder/40/40", rank: 10, status: "ELIGIBLE" }
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

const communityImages: { [key: string]: string } = {
  "207Bear_Dizkontinued": bearImage,
  "btctalk": bitcoinTalkImage,
  "bodoggos": bodoggosImage,
  "disgrazze": disgrazzeImage,
  "fomohour": fomohourImage,
  "GCCrypto": gccryptoImage,
  "jasper": jasperImage,
  "kaitoAI_August": kaitoImage,
  "mandominutes": mandoMinutesImage
};

const Leaderboard = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const communityName = communityNames[communityId || ""] || "Unknown Community";
  const communityImage = communityImages[communityId || ""];
  const allLeaderboardData = generateLeaderboardData(communityId || "");
  
  // Filter data based on search query
  const leaderboardData = allLeaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <img src={goldMedal} alt="1st place" className="h-6 w-6" />;
    if (rank === 2) return <img src={silverMedal} alt="2nd place" className="h-6 w-6" />;
    if (rank === 3) return <img src={bronzeMedal} alt="3rd place" className="h-6 w-6" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankBackground = (rank: number, status: string) => {
    const baseClasses = status === "ENTERED" ? "bg-gradient-to-r from-green-500/15 to-green-600/8 border-green-400/40" : "bg-card border-border";
    
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/20 shadow-lg";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/20 shadow-lg";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/10 to-amber-700/5 border-amber-600/20 shadow-lg";
    return `${baseClasses} shadow-lg`;
  };
  
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "ENTERED":
        return "bg-green-500/30 text-green-200 border-green-400/60 hover:bg-green-500/40";
      case "EXCLUDED":
        return "bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30";
      case "ELIGIBLE":
      default:
        return "border-muted-foreground/30 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-secondary/20">
        {/* Desktop Navigation */}
        <div className="hidden md:block p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Communities
                </Button>
              </Link>
              <img 
                src="/lovable-uploads/c6774c91-c8ec-4511-bc74-47506011436e.png" 
                alt="Boards Logo" 
                className="h-16 w-auto object-contain"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Connect to Kick.com
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Glass Header */}
          <div className="bg-black/40 backdrop-blur-md border-b border-white/10 p-4">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/decc2792-658a-4017-ab20-3889eca34d9e.png" 
                alt="Boards Logo" 
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Mobile Buttons */}
          <div className="bg-black/30 backdrop-blur-sm p-4 space-y-3">
            <Link to="/" className="block">
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-white justify-start">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Communities
              </Button>
            </Link>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Connect to Kick.com
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-8 animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000`}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-40 h-40 rounded-full bg-gradient-primary p-1 animate-scale-in">
                <div className="w-full h-full rounded-full bg-secondary overflow-hidden flex items-center justify-center">
                  {communityImage ? (
                    <img 
                      src={communityImage} 
                      alt={communityName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl font-bold text-primary">
                      {communityName.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-4">{communityName}</h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6 hidden sm:block">Community Leaderboard</p>
          </div>
        </div>
      </section>

      {/* Giveaway Section */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Host Raffle Admin - Only show for btctalk */}
          {communityId === "btctalk" && (
            <RaffleAdmin
              communityName={communityName}
              totalMembers="15.2K"
            />
          )}
          
          <GiveawaySection 
            isLive={true}
            endTime={new Date(Date.now() + 3 * 60 * 60 * 1000)} // 3 hours from now
            title="Weekly Raffle"
            description="Enter the codeword given by the raffle host before it expires to gain an entry to the weekly raffle. Winners announced every Sunday!"
          />
          
          <LeaderboardPeriod
            startDate={new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)} // 5 days ago
            endDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)} // 2 days from now
            isActive={true}
          />
        </div>
      </section>

      {/* Leaderboard */}
      <section className="px-4 md:px-6 pb-20">
        {/* Search */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 h-12 bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {leaderboardData.map((user, index) => (
              <Card
                key={user.name}
                className={`${getRankBackground(user.rank, user.status)} hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-1 animate-scale-in backdrop-blur-sm`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                        {getRankIcon(user.rank)}
                      </div>
                      
                      <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-primary/30 flex-shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs md:text-sm">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm md:text-base text-foreground truncate">{user.name}</h3>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Badge 
                            variant="outline"
                            className={`text-xs px-1.5 py-0.5 ${getStatusBadgeStyle(user.status)}`}
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="text-base md:text-xl font-bold text-primary">
                        ${user.volume.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-12 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/c6774c91-c8ec-4511-bc74-47506011436e.png" 
              alt="Boards Logo" 
              className="h-8 w-auto object-contain md:h-12"
            />
          </div>
          <p className="text-muted-foreground">
            Built by DegenTy • Copyright © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;