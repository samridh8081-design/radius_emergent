import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function StatsCard({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) {
  const getTrendColor = () => {
    if (!trend) return "";
    return trend === "up" ? "text-chart-2" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  };

  return (
    <Card data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        {subtitle && (
          <p className={`text-xs mt-1 ${getTrendColor()}`}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
