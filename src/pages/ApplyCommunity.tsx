import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Users, MessageSquare, Globe, Zap, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const applicationSchema = z.object({
  communityName: z.string().min(2, "Community name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  yeetUsername: z.string().min(1, "Yeet username is required"),
  telegramHandle: z.string().min(1, "Telegram handle is required"),
  twitterUrl: z.string().url("Please enter a valid Twitter URL").optional().or(z.literal("")),
  discordUrl: z.string().url("Please enter a valid Discord URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  otherSocials: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplyCommunity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      communityName: "",
      email: "",
      yeetUsername: "",
      telegramHandle: "",
      twitterUrl: "",
      discordUrl: "",
      websiteUrl: "",
      otherSocials: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Communities</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dac2b823-067c-4665-a3c5-d8f98846a854.png" 
              alt="Boards Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-16 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/1ada8b13-4538-41a4-878e-8d60e406960a.png" 
            alt="Desert UFO Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-25% via-background/75 via-50% to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Apply to Create</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Your Community</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Join our network of creators and build a thriving community with prizes and competitions.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-glow animate-scale-in">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-foreground">Community Application</CardTitle>
              <p className="text-muted-foreground">Tell us about your community and how you'd like to engage your audience</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Community Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Community Details</h3>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="communityName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Community Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your community name" 
                              className="h-12 bg-secondary/50 border-border focus:border-primary/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type="email"
                                placeholder="your@email.com" 
                                className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary/50"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="yeetUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Yeet Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="your-yeet-username" 
                                className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary/50"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telegramHandle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Telegram Handle</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
                              <Input 
                                placeholder="telegram-handle" 
                                className="pl-8 h-12 bg-secondary/50 border-border focus:border-primary/50"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Globe className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Social Links</h3>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="twitterUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Twitter/X URL (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://twitter.com/your-handle" 
                              className="h-12 bg-secondary/50 border-border focus:border-primary/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discordUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Discord URL (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://discord.gg/your-server" 
                              className="h-12 bg-secondary/50 border-border focus:border-primary/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Website URL (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://your-website.com" 
                              className="h-12 bg-secondary/50 border-border focus:border-primary/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="otherSocials"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Other Social Links (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any other social media links or platforms where your community is active..."
                              className="min-h-[80px] bg-secondary/50 border-border focus:border-primary/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 shadow-glow text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
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

export default ApplyCommunity;