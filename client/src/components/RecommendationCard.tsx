import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info, TrendingUp } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "content" | "technical" | "seo" | "competitive";
  actionItems: string[];
  estimatedImpact: string;
}

export default function RecommendationCard({
  title,
  description,
  priority,
  category,
  actionItems,
  estimatedImpact
}: RecommendationCardProps) {
  const getPriorityIcon = () => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "medium":
        return <Info className="w-5 h-5 text-chart-4" />;
      case "low":
        return <CheckCircle className="w-5 h-5 text-chart-2" />;
    }
  };

  const getPriorityVariant = (): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
    }
  };

  return (
    <Card data-testid={`card-recommendation-${category}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {getPriorityIcon()}
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge variant={getPriorityVariant()} className="text-xs">
              {priority.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Action Items:</h4>
          <ul className="space-y-2">
            {actionItems.map((item, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-3 border-t flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-chart-2" />
          <span className="text-muted-foreground">Estimated Impact:</span>
          <span className="font-semibold">{estimatedImpact}</span>
        </div>
      </CardContent>
    </Card>
  );
}
