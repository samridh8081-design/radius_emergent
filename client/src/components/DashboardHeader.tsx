import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  websiteUrl?: string;
  onNewAnalysis?: () => void;
}

export default function DashboardHeader({ websiteUrl, onNewAnalysis }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">GeoPulse</h1>
            </div>
            {websiteUrl && (
              <>
                <div className="h-6 w-px bg-border" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Analyzing</span>
                  <span className="text-sm font-medium" data-testid="text-analyzed-url">
                    {websiteUrl}
                  </span>
                </div>
              </>
            )}
          </div>
          
          {onNewAnalysis && (
            <Button 
              variant="outline" 
              onClick={onNewAnalysis}
              data-testid="button-new-analysis"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
