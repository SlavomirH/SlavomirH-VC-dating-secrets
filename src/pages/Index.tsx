import { useRef } from "react";
import { LandingPageHero } from "@/components/LandingPageHero";
import { ChapterPreview } from "@/components/ChapterPreview";
import { BookPreorderForm } from "@/components/BookPreorderForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, Star, Users, TrendingUp, Heart, Target, Zap, Handshake } from "lucide-react";

// Import chapter icons
import iconPerfectMatch from "@/assets/icon-perfect-match.jpg";
import iconFirstImpressions from "@/assets/icon-first-impressions.jpg";
import iconChemistry from "@/assets/icon-chemistry.jpg";
import iconDeal from "@/assets/icon-deal.jpg";

// Import profile pictures
import sarahChenProfile from "@/assets/sarah-chen-profile.jpg";
import marcusRiveraProfile from "@/assets/marcus-rivera-profile.jpg";
import jenniferWalshProfile from "@/assets/jennifer-walsh-profile.jpg";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const chapters = [
    {
      icon: iconPerfectMatch,
      title: "Finding Your Perfect Match",
      emoji: "🧭",
      description: "How VCs decide if founders are portfolio-worthy, and what makes them immediately pass. Learn the traits that create instant alignment.",
      isHighlighted: true
    },
    {
      icon: iconFirstImpressions,
      title: "First Impressions Matter",
      emoji: "🎯",
      description: "The most memorable pitches and what drives that crucial first judgment. Discover the biggest turn-offs in opening moments."
    },
    {
      icon: iconChemistry,
      title: "Chemistry & Connection",
      emoji: "🤝",
      description: "How founder-investor chemistry affects investment decisions and subtle ways to build rapport in early meetings."
    },
    {
      icon: iconDeal,
      title: "Sealing the Deal",
      emoji: "📝",
      description: "Signals that founders are ready to confidently close rounds and memorable term sheet negotiations."
    }
  ];

  const testimonials = [
    {
      quote: "Investor meetings feel completely different after this. It's like switching from blind dates to a tailored match.",
      author: "Sarah Chen",
      role: "Series A Founder",
      company: "TechFlow",
      image: sarahChenProfile
    },
    {
      quote: "The honesty in these pages is refreshing, and the tactics deliver.",
      author: "Marcus Rivera",
      role: "Partner",
      company: "Venture Labs",
      image: marcusRiveraProfile
    },
    {
      quote: "This reframes fundraising in a way I've never seen before. Once you see the parallels, you can't unsee them.",
      author: "Jennifer Walsh",
      role: "Serial Entrepreneur",
      company: "TechCorp",
      image: jenniferWalshProfile
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <LandingPageHero onScrollToForm={scrollToForm} />

      {/* Problem Statement */}
      <section className="py-24 bg-[var(--gradient-section)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
              The Game Everyone Plays,
              <span className="text-passion block mt-2"> Nobody Talks About</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light">
              You've mastered the pitch deck. You know your metrics cold. But you're still getting "we'll think about it" instead of term sheets. 
              Meanwhile, other founders with weaker businesses are closing rounds left and right.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-card/50 border-destructive/20">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 mx-auto text-destructive mb-4" />
                  <CardTitle className="text-lg">The Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    95% of founders focus only on the rational side: metrics, market size, product-market fit.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-confident/20">
                <CardHeader className="text-center">
                  <Zap className="h-12 w-12 mx-auto text-confident mb-4" />
                  <CardTitle className="text-lg">The Reality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    VCs make emotional decisions first, then justify them rationally. Just like dating.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-passion/20">
                <CardHeader className="text-center">
                  <Heart className="h-12 w-12 mx-auto text-passion mb-4" />
                  <CardTitle className="text-lg">The Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Master the psychology of attraction, chemistry, and persuasion that wins both hearts and checks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Previews */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-passion/20 text-passion border-passion/30 mb-4">
              📚 Inside the Book
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              The Chapters Everyone's
              <span className="text-passion block"> Talking About</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light">
              10 chapters of unfiltered insights from VCs who've seen it all, plus the bonus chapter with secrets they'll never say on panels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {chapters.map((chapter, index) => (
              <ChapterPreview key={index} {...chapter} />
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              + 6 more chapters covering rejection, long-term relationships, red flags, and more
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToForm}
              className="border-passion/30 text-passion hover:bg-passion/10"
            >
              See Full Chapter List
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-[var(--gradient-section)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              What Early Readers Are Saying
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-confident text-confident" />
              ))}
              <span className="text-lg font-semibold ml-2">5.0 from early reviewers</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 border-sophisticated/20">
                <CardHeader>
                  <Quote className="h-8 w-8 text-passion mb-4" />
                  <CardDescription className="text-base italic">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.author} profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-passion">100+</div>
              <div className="text-muted-foreground">VCs Interviewed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-confident">50+</div>
              <div className="text-muted-foreground">Investor Insights Uncovered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-romantic">$2B+</div>
              <div className="text-muted-foreground">in Growth Capital Mobilized</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-sophisticated">10</div>
              <div className="text-muted-foreground">Game-Changing Chapters</div>
            </div>
          </div>
        </div>
      </section>

      {/* Preorder Form */}
      <section id="preorder" className="py-24 bg-[var(--gradient-section)]" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Get The Playbook That
              <span className="text-red-500 block"> Changes Everything</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light">
              Join the VIP list for exclusive early access, bonus content, and launch day discounts.
            </p>
          </div>
          
          <BookPreorderForm />
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              No spam, ever. Unsubscribe anytime. Your email stays between us.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-sophisticated/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold bg-[var(--gradient-passion)] bg-clip-text text-transparent">
              VC Dating Secrets
            </h3>
            <p className="text-muted-foreground">
              The unspoken rules of raising capital and finding love.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 VC Dating Secrets</span>
              <span>•</span>
              <span>Made with ❤️ for founders and VCs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
