import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChapterPreviewProps {
  icon: string;
  title: string;
  emoji: string;
  description: string;
  isHighlighted?: boolean;
}

export function ChapterPreview({ icon, title, emoji, description, isHighlighted = false }: ChapterPreviewProps) {
  return (
    <Card className={`h-full transition-all duration-300 hover:scale-105 ${
      isHighlighted 
        ? 'bg-passion/10 border-passion/30 shadow-[var(--shadow-passion)]' 
        : 'bg-card/50 border-sophisticated/20 hover:border-passion/40'
    } backdrop-blur-sm`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <img 
              src={icon} 
              alt={title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="absolute -top-1 -right-1 text-xl">{emoji}</div>
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground group-hover:text-passion transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
    </Card>
  );
}