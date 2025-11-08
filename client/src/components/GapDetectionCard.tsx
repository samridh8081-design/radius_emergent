import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, XCircle } from "lucide-react";

interface Gap {
  element: string;
  impact: "high" | "medium" | "low";
  found: boolean;
}

interface GapDetectionCardProps {
  gaps: Gap[];
}

export default function GapDetectionCard({ gaps }: GapDetectionCardProps) {
  const missingGaps = gaps.filter(g => !g.found);
  const foundElements = gaps.filter(g => g.found);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-chart-4";
      case "low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card data-testid="card-gap-detection">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-chart-4" />
            Missing Elements Detected
          </CardTitle>
          <Badge variant="outline">
            {missingGaps.length} gaps found
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {missingGaps.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Missing:</h4>
            <div className="space-y-2">
              {missingGaps.map((gap, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  data-testid={`item-missing-${gap.element.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium">{gap.element}</span>
                  </div>
                  <Badge variant="outline" className={getImpactColor(gap.impact)}>
                    {gap.impact} impact
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            All essential elements detected! Great job.
          </p>
        )}

        {foundElements.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm font-semibold text-chart-2">Present:</h4>
            <div className="flex flex-wrap gap-2">
              {foundElements.map((gap, idx) => (
                <Badge key={idx} variant="outline" className="text-chart-2">
                  ✓ {gap.element}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
