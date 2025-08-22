import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, TrendingUp, Star } from "lucide-react";

// Mock community data
const communities = [
  {
    id: "207Bear_Dizkontinued",
    name: "207Bear x Dizkontinued",
    image: "/api/placeholder/80/80",
    members: "2.5K",
    isHighlighted: true
  },
  {
    id: "btctalk",
    name: "Bitcoin Talk",
    image: "/api/placeholder/80/80",
    members: "15.2K"
  },
  {
    id: "bodoggos",
    name: "Bodoggos",
    image: "/api/placeholder/80/80",
    members: "8.7K"
  },
  {
    id: "disgrazze",
    name: "Disgrazze",
    image: "/api/placeholder/80/80",
    members: "3.1K"
  },
  {
    id: "fomohour",
    name: "Fomo Hour",
    image: "/api/placeholder/80/80",
    members: "12.4K"
  },
  {
    id: "GCCrypto",
    name: "GC Crypto",
    image: "/api/placeholder/80/80",
    members: "6.8K"
  },
  {
    id: "jasper",
    name: "Jasper",
    image: "/api/placeholder/80/80",
    members: "4.2K"
  },
  {
    id: "kaitoAI_August",
    name: "KaitoAI - August",
    image: "/api/placeholder/80/80",
    members: "9.3K"
  },
  {
    id: "mandominutes",
    name: "Mando Minutes",
    image: "/api/placeholder/80/80",
    members: "5.6K"
  }
];

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dac2b823-067c-4665-a3c5-d8f98846a854.png" 
              alt="Boards Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <Badge 
            className={`mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            🏆 Community Leaderboards Platform
          </Badge>
          
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 delay-200`}>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Compete.
            </span>
            <br />
            <span className="text-foreground">Rise. Win.</span>
          </h1>
          
          <p className={`text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 delay-400`}>
            Track rankings, compete with friends, and climb to the top of your favorite communities.
            The ultimate leaderboard platform for crypto communities.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-slide-up ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 delay-600`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-glow">
              <Trophy className="mr-2 h-5 w-5" />
              Explore Communities
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
              <TrendingUp className="mr-2 h-5 w-5" />
              View Rankings
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float">
          <Star className="h-6 w-6 text-primary/30" />
        </div>
        <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Trophy className="h-8 w-8 text-primary/20" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Users className="h-7 w-7 text-primary/25" />
        </div>
      </section>

      {/* Communities Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Communities</h2>
            <p className="text-muted-foreground text-lg">
              Join the competition in your favorite communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <Card
                key={community.id}
                className={`group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 animate-scale-in backdrop-blur-sm ${
                  community.isHighlighted ? 'border-primary/50 shadow-glow' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary p-0.5">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">
                            {community.name.charAt(0)}
                          </span>
                        </div>
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

      {/* Stats Section */}
      <section className="px-6 py-20 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Communities</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Rankings Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/dac2b823-067c-4665-a3c5-d8f98846a854.png" 
              alt="Boards Logo" 
              className="h-6 w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground">
            The ultimate community leaderboard platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;