import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Heart, TrendingUp, Users } from "lucide-react";


import heroBackground from "@/assets/hero-background.jpg";

interface LandingPageHeroProps {
  onScrollToForm: () => void;
}

export function LandingPageHero({ onScrollToForm }: LandingPageHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-12">
            <div className="space-y-6">
              <Badge className="bg-passion/20 text-passion border-passion/30 text-sm px-4 py-1">
                💘 The Ultimate VC Dating Guide
              </Badge>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="text-passion block">
                  How Raising Capital and Hitting on Women Are More Alike Than You Think
                </span>
                <span className="text-muted-foreground block mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">
                  And Why You Need to Change Your Approach
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light">
                The insider secrets, unspoken rules, and counterintuitive strategies that actually work in both boardrooms and bedrooms.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-3 text-confident">
                <TrendingUp className="h-6 w-6" />
                <span className="font-semibold text-lg">10+ Chapters</span>
              </div>
              <div className="flex items-center gap-3 text-romantic">
                <Heart className="h-6 w-6" />
                <span className="font-semibold text-lg">Real Stories</span>
              </div>
              <div className="flex items-center gap-3 text-sophisticated">
                <Users className="h-6 w-6" />
                <span className="font-semibold text-lg">Insider Access</span>
              </div>
            </div>

            <div className="space-y-6">
              <Button 
                size="lg" 
                className="bg-[var(--gradient-passion)] hover:shadow-[var(--shadow-passion)] text-white px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105 rounded-xl"
                onClick={onScrollToForm}
              >
                Get Exclusive Early Access
                <ArrowDown className="ml-3 h-6 w-6" />
              </Button>
              
              <p className="text-base text-muted-foreground">
                Join <span className="text-passion font-semibold">500+</span> VCs and founders already on the list
              </p>
            </div>
          </div>

          {/* Right Column - Book Cover */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--gradient-passion)] opacity-20 blur-3xl transform scale-110" />
              <img 
                src="/lovable-uploads/8ffc4963-12ed-41af-9dc4-14e1ccf5f6da.png" 
                alt="Book Cover"
                className="relative z-10 w-80 md:w-96 lg:w-[28rem] shadow-[var(--shadow-card)] rounded-lg transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating elements */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}