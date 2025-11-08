import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface DimensionScore {
  dimension: string;
  score: number;
  fullMark: number;
}

interface ScoreBreakdownProps {
  data: DimensionScore[];
}

export default function ScoreBreakdown({ data }: ScoreBreakdownProps) {
  return (
    <Card data-testid="card-score-breakdown">
      <CardHeader>
        <CardTitle>Score Breakdown</CardTitle>
        <CardDescription>
          Performance across 6 key visibility dimensions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid className="stroke-border" />
            <PolarAngleAxis 
              dataKey="dimension" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.dimension} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.dimension}</span>
                <span className="font-semibold">{item.score}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
