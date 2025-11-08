import { useState } from "react";
import URLInputForm from "@/components/URLInputForm";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import PlatformComparison from "@/components/PlatformComparison";
import CompetitorCard from "@/components/CompetitorCard";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import RecommendationCard from "@/components/RecommendationCard";
import GapDetectionCard from "@/components/GapDetectionCard";
import { TrendingUp, Target, Users, Zap } from "lucide-react";

export default function Home() {
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = (url: string) => {
    setIsLoading(true);
    console.log('Analyzing URL:', url);
    
    setTimeout(() => {
      setAnalyzedUrl(url);
      setIsLoading(false);
    }, 2000);
  };

  const handleNewAnalysis = () => {
    setAnalyzedUrl(null);
  };

  if (!analyzedUrl) {
    return <URLInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />;
  }

  const platformData = [
    { platform: 'ChatGPT', score: 82, color: 'hsl(var(--chart-1))' },
    { platform: 'Claude', score: 75, color: 'hsl(var(--chart-3))' },
    { platform: 'Gemini', score: 78, color: 'hsl(var(--chart-4))' },
    { platform: 'Perplexity', score: 71, color: 'hsl(var(--chart-2))' },
  ];

  const dimensionData = [
    { dimension: 'Mention Rate', score: 82, fullMark: 100 },
    { dimension: 'Context Quality', score: 75, fullMark: 100 },
    { dimension: 'Sentiment', score: 88, fullMark: 100 },
    { dimension: 'Prominence', score: 68, fullMark: 100 },
    { dimension: 'Comparison', score: 72, fullMark: 100 },
    { dimension: 'Recommendation', score: 78, fullMark: 100 },
  ];

  const competitors = [
    {
      rank: 1,
      name: "Industry Leader",
      domain: "industryleader.com",
      score: 94,
      marketOverlap: 85,
      strengths: ["Comprehensive FAQ section", "Strong comparison content", "Active blog presence"]
    },
    {
      rank: 2,
      name: "Your Website",
      domain: new URL(analyzedUrl).hostname,
      score: 78,
      marketOverlap: 100,
      strengths: ["Good technical content", "Clear product descriptions"],
      isCurrentBrand: true
    },
    {
      rank: 3,
      name: "Competitor Alpha",
      domain: "competitoralpha.com",
      score: 72,
      marketOverlap: 70,
      strengths: ["Detailed pricing info", "Customer testimonials"]
    },
    {
      rank: 4,
      name: "Competitor Beta",
      domain: "competitorbeta.com",
      score: 68,
      marketOverlap: 60,
      strengths: ["Use case documentation", "Integration guides"]
    }
  ];

  const gaps = [
    { element: 'FAQ Section', impact: 'high' as const, found: false },
    { element: 'Comparison Pages', impact: 'high' as const, found: false },
    { element: 'Customer Testimonials', impact: 'medium' as const, found: false },
    { element: 'Pricing Information', impact: 'medium' as const, found: true },
    { element: 'About Page', impact: 'low' as const, found: true },
    { element: 'Blog Content', impact: 'medium' as const, found: true },
    { element: 'Documentation', impact: 'high' as const, found: false },
    { element: 'Use Cases', impact: 'medium' as const, found: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader websiteUrl={analyzedUrl} onNewAnalysis={handleNewAnalysis} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Overall Score"
            value="78"
            subtitle="+12 points potential"
            icon={TrendingUp}
            trend="up"
          />
          <StatsCard
            title="Mention Rate"
            value="64%"
            subtitle="Mentioned in 64% of queries"
            icon={Target}
          />
          <StatsCard
            title="Competitor Position"
            value="#2"
            subtitle="Out of 4 competitors"
            icon={Users}
          />
          <StatsCard
            title="Platform Average"
            value="76"
            subtitle="Across 4 AI platforms"
            icon={Zap}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PlatformComparison data={platformData} />
          </div>
          <div className="lg:col-span-1">
            <GapDetectionCard gaps={gaps} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ScoreBreakdown data={dimensionData} />
          </div>
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold">Competitor Rankings</h2>
            {competitors.map(competitor => (
              <CompetitorCard key={competitor.rank} {...competitor} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">AI-Generated Recommendations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecommendationCard
              title="Add Comprehensive FAQ Section"
              description="Your website lacks a dedicated FAQ page. AI platforms favor websites with structured Q&A content that directly answers common questions."
              priority="high"
              category="content"
              actionItems={[
                "Create a dedicated FAQ page with at least 15-20 common questions",
                "Use schema markup for FAQ content (application/ld+json)",
                "Include questions that mention competitor comparisons",
                "Answer questions about pricing, features, and use cases"
              ]}
              estimatedImpact="+12-15 points"
            />
            
            <RecommendationCard
              title="Create Detailed Comparison Pages"
              description="AI platforms look for objective comparison content. Create dedicated pages comparing your product with competitors."
              priority="high"
              category="competitive"
              actionItems={[
                "Build 'vs [Competitor]' pages for top 3 competitors",
                "Include feature-by-feature comparison tables",
                "Add honest pros/cons sections",
                "Use neutral, informative tone"
              ]}
              estimatedImpact="+10-12 points"
            />
            
            <RecommendationCard
              title="Improve Technical SEO Signals"
              description="Missing Open Graph tags and incomplete schema markup reduce AI platform trust and content understanding."
              priority="medium"
              category="technical"
              actionItems={[
                "Add Open Graph meta tags to all pages",
                "Implement Organization schema markup",
                "Create and submit XML sitemap",
                "Fix broken internal links"
              ]}
              estimatedImpact="+8-10 points"
            />
            
            <RecommendationCard
              title="Expand Use Case Documentation"
              description="AI platforms recommend solutions based on use cases. Add detailed examples of how your product solves specific problems."
              priority="medium"
              category="content"
              actionItems={[
                "Create 5-7 detailed use case pages",
                "Include real-world examples and results",
                "Add industry-specific use cases",
                "Link use cases from product pages"
              ]}
              estimatedImpact="+7-9 points"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
