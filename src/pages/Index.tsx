import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, TrendingUp, Star, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
// import RaffleAdmin from "@/components/RaffleAdmin";

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
import mirreytvImage from "@/assets/communities/mirreytv.jpeg";
import modernMarketImage from "@/assets/communities/modern-market.jpeg";
import morningMinuteImage from "@/assets/communities/morning-minute.png";
import rektRadioImage from "@/assets/communities/rekt-radio.jpg";
import sellingripsImage from "@/assets/communities/sellingrips.png";
import duckImage from "@/assets/communities/duck.png";
import wizardOfSohoImage from "@/assets/communities/wizard-of-soho.jpg";

// Mock community data
const communities = [
  {
    id: "207Bear_Dizkontinued",
    name: "207Bear x Dizkontinued",
    image: bearImage,
    members: "2.5K",
    isHighlighted: true
  },
  {
    id: "btctalk",
    name: "Bitcoin Talk",
    image: bitcoinTalkImage,
    members: "15.2K"
  },
  {
    id: "bodoggos",
    name: "Bodoggos",
    image: bodoggosImage,
    members: "8.7K"
  },
  {
    id: "disgrazze",
    name: "Disgrazze",
    image: disgrazzeImage,
    members: "3.1K"
  },
  {
    id: "fomohour",
    name: "Fomo Hour",
    image: fomohourImage,
    members: "12.4K"
  },
  {
    id: "GCCrypto",
    name: "GC Crypto",
    image: gccryptoImage,
    members: "6.8K"
  },
  {
    id: "jasper",
    name: "Jasper",
    image: jasperImage,
    members: "4.2K"
  },
  {
    id: "kaitoAI_August",
    name: "KaitoAI - August",
    image: kaitoImage,
    members: "9.3K"
  },
  {
    id: "mandominutes",
    name: "Mando Minutes",
    image: mandoMinutesImage,
    members: "5.6K"
  },
  {
    id: "mirreytv",
    name: "MirreyTV",
    image: mirreytvImage,
    members: "7.2K"
  },
  {
    id: "modernmarket",
    name: "Modern Market",
    image: modernMarketImage,
    members: "4.8K"
  },
  {
    id: "morningminute",
    name: "Morning Minute",
    image: morningMinuteImage,
    members: "6.1K"
  },
  {
    id: "rektradio",
    name: "Rekt Radio",
    image: rektRadioImage,
    members: "11.3K"
  },
  {
    id: "sellingrips",
    name: "SellingRips",
    image: sellingripsImage,
    members: "3.7K"
  },
  {
    id: "tehepikduck",
    name: "TEH EPIK DUCK",
    image: duckImage,
    members: "8.9K"
  },
  {
    id: "wizardofsoho",
    name: "Wizard of Soho",
    image: wizardOfSohoImage,
    members: "5.4K"
  }
];

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">{/* Community Leaderboards */}  
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Desktop logo */}
            <img 
              src="/lovable-uploads/dac2b823-067c-4665-a3c5-d8f98846a854.png" 
              alt="Boards Logo" 
              className="h-16 w-auto object-contain hidden md:block"
            />
            {/* Mobile logo */}
            <img 
              src="/lovable-uploads/decc2792-658a-4017-ab20-3889eca34d9e.png" 
              alt="Boards Logo" 
              className="h-16 w-auto object-contain md:hidden"
            />
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Connect WITH KICK
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-12 md:pt-40 md:pb-12 lg:py-20 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/1ada8b13-4538-41a4-878e-8d60e406960a.png" 
            alt="Desert UFO Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-25% via-background/75 via-50% to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <Badge 
            className={`mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in hidden lg:inline-flex ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Win prizes every week
          </Badge>
          
          <h1 className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 delay-200`}>
            <span className="text-foreground">
              Community
            </span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Leaderboards</span>
          </h1>
          
          <p className={`text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 delay-400`}>
            Compete for prizes, raffles and other rewards.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 delay-600`}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-glow"
              onClick={() => {
                document.getElementById('communities-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Explore Communities
            </Button>
            <Link to="/apply">
              <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                Apply to create your own
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section id="communities-section" className="px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-4xl font-bold mb-4">Communities</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Find your favorite community
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 h-12 bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community, index) => (
              <Card
                key={community.id}
                className={`group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 animate-scale-in backdrop-blur-sm relative ${
                  community.isHighlighted ? 'border-primary/50 shadow-glow' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
                        <img 
                          src={community.image} 
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {community.isHighlighted && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="h-5 w-5 text-primary fill-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors text-foreground">
                        {community.name}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        {community.members} members
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/leaderboards/${community.id}`}>
                    <Button 
                      className="w-full bg-secondary hover:bg-primary transition-all duration-300 group-hover:bg-primary text-secondary-foreground group-hover:text-primary-foreground"
                    >
                      View Rankings
                      <Trophy className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/c6774c91-c8ec-4511-bc74-47506011436e.png" 
              alt="Boards Logo" 
              className="h-12 w-auto object-contain"
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

export default Index;
