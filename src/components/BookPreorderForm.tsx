import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Sparkles } from "lucide-react";

interface FormData {
  email: string;
  interestedChapters: string[];
  marketingConsent: boolean;
}

const chapters = [
  "Finding Your Perfect Match",
  "First Impressions Matter",
  "Playing Hard to Get: Creating FOMO",
  "Chemistry & Connection",
  "Sealing the Deal",
  "Handling Rejection",
  "Long-Term Commitment",
  "Spotting Bad Investors",
  "Fundraising = Dating?",
  "Knowing When to Walk Away"
];

export function BookPreorderForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    interestedChapters: [],
    marketingConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('book_preorders')
        .insert({
          email: formData.email,
          interested_chapters: formData.interestedChapters,
          marketing_consent: formData.marketingConsent
        });

      if (error) throw error;

      toast({
        title: "Success! 🎉",
        description: "You've been added to our exclusive preorder list. We'll notify you when the book is ready!",
      });

      // Reset form
      setFormData({
        email: "",
        interestedChapters: [],
        marketingConsent: false
      });
    } catch (error) {
      console.error('Error submitting preorder:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChapterChange = (chapter: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interestedChapters: checked 
        ? [...prev.interestedChapters, chapter]
        : prev.interestedChapters.filter(c => c !== chapter)
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-sophisticated/20 shadow-[var(--shadow-card)]">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-6 w-6 text-passion" />
          <Sparkles className="h-6 w-6 text-romantic" />
        </div>
        <CardTitle className="text-2xl bg-[var(--gradient-passion)] bg-clip-text text-transparent">
          Get Exclusive Early Access
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Join our VIP list and be the first to get the insider secrets that actually work
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Which chapters interest you most?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {chapters.map((chapter) => (
                <div key={chapter} className="flex items-start space-x-2">
                  <Checkbox
                    id={chapter}
                    checked={formData.interestedChapters.includes(chapter)}
                    onCheckedChange={(checked) => handleChapterChange(chapter, checked as boolean)}
                    className="mt-1"
                  />
                  <Label 
                    htmlFor={chapter} 
                    className="text-sm leading-5 cursor-pointer hover:text-passion transition-colors"
                  >
                    {chapter}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketing"
              checked={formData.marketingConsent}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingConsent: checked as boolean }))}
              className="mt-1"
            />
            <Label htmlFor="marketing" className="text-sm leading-5 cursor-pointer">
              I'd like to receive updates about the book launch and related content
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[var(--gradient-passion)] hover:shadow-[var(--shadow-passion)] transition-all duration-300 text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining the VIP List..." : "Get Early Access 🚀"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}