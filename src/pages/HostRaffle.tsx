import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Settings, 
  Play, 
  Square, 
  Users, 
  DollarSign, 
  Hash,
  Link as LinkIcon,
  Sparkles,
  Trophy,
  Eye
} from "lucide-react";

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

const HostRaffle = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [mounted, setMounted] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [codeword, setCodeword] = useState("");
  const [promotedTweet, setPromotedTweet] = useState("");
  const [minRanking, setMinRanking] = useState("");
  const [minVolume, setMinVolume] = useState("");
  const [eligibleEntries] = useState(142); // Mock data
  
  const communityName = communityNames[communityId || ""] || "Unknown Community";
  const communityImage = communityImages[communityId || ""];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoLive = () => {
    setIsLive(!isLive);
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
                src="/lovable-uploads/c6774c91-c8ec-4511-bc74-47506011436e.png" 
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
              <div className="w-32 h-32 rounded-full bg-gradient-primary p-1 animate-scale-in">
                <div className="w-full h-full rounded-full bg-secondary overflow-hidden flex items-center justify-center">
                  {communityImage ? (
                    <img 
                      src={communityImage} 
                      alt={communityName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-primary">
                      {communityName.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-4">Host Raffle - {communityName}</h1>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Settings className="h-3 w-3 mr-1" />
              Admin Panel
            </Badge>
          </div>
        </div>
      </section>

      {/* Host Raffle Controls */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Raffle Status Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Raffle Status</span>
                </CardTitle>
                <Badge className={isLive ? "bg-green-500/20 text-green-300 border-green-400/50" : "bg-gray-500/20 text-gray-300 border-gray-400/50"}>
                  {isLive ? "LIVE" : "OFFLINE"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={handleGoLive}
                  className={isLive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}
                >
                  {isLive ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Go Offline
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Go Live
                    </>
                  )}
                </Button>
                <span className="text-muted-foreground">
                  {isLive ? "Raffle is currently active" : "Raffle is not accepting entries"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Raffle Configuration */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Raffle Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="codeword" className="flex items-center space-x-2">
                    <Hash className="h-4 w-4" />
                    <span>Codeword</span>
                  </Label>
                  <Input
                    id="codeword"
                    placeholder="Enter raffle codeword"
                    value={codeword}
                    onChange={(e) => setCodeword(e.target.value)}
                    className="bg-secondary/50 border-border focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promoted-tweet" className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Promoted Tweet</span>
                  </Label>
                  <Input
                    id="promoted-tweet"
                    placeholder="Tweet URL or handle"
                    value={promotedTweet}
                    onChange={(e) => setPromotedTweet(e.target.value)}
                    className="bg-secondary/50 border-border focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-ranking" className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4" />
                    <span>Minimum Ranking</span>
                  </Label>
                  <Input
                    id="min-ranking"
                    type="number"
                    placeholder="Enter minimum rank"
                    value={minRanking}
                    onChange={(e) => setMinRanking(e.target.value)}
                    className="bg-secondary/50 border-border focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-volume" className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Minimum Volume</span>
                  </Label>
                  <Input
                    id="min-volume"
                    type="number"
                    placeholder="Enter minimum volume"
                    value={minVolume}
                    onChange={(e) => setMinVolume(e.target.value)}
                    className="bg-secondary/50 border-border focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span className="text-lg font-semibold text-primary">
                    {eligibleEntries} eligible entries
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Eye className="h-4 w-4 mr-2" />
                  View Wheel
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Winners Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span>Winners</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No winners yet. Start a raffle to see results here.</p>
              </div>
            </CardContent>
          </Card>
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

export default HostRaffle;