
import React, { useState } from 'react';
import { Eye, Edit, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ScorecardList = () => {
  const [charities] = useState([
    {
      id: "1",
      name: "Water for Life Foundation",
      currentScore: 9.2,
      previousScore: 8.8,
      reportingFrequency: 95,
      verificationRate: 98,
      milestoneCompletion: 92,
      lastUpdated: "2024-01-15",
      campaigns: 8,
      status: "excellent"
    },
    {
      id: "2",
      name: "Hope Education Initiative",
      currentScore: 8.5,
      previousScore: 8.7,
      reportingFrequency: 88,
      verificationRate: 94,
      milestoneCompletion: 85,
      lastUpdated: "2024-01-14",
      campaigns: 5,
      status: "good"
    },
    {
      id: "3",
      name: "Community Health Network",
      currentScore: 7.1,
      previousScore: 7.0,
      reportingFrequency: 72,
      verificationRate: 86,
      milestoneCompletion: 78,
      lastUpdated: "2024-01-13",
      campaigns: 3,
      status: "needs_improvement"
    },
    {
      id: "4",
      name: "Green Future Foundation",
      currentScore: 6.2,
      previousScore: 6.8,
      reportingFrequency: 65,
      verificationRate: 79,
      milestoneCompletion: 65,
      lastUpdated: "2024-01-12",
      campaigns: 2,
      status: "at_risk"
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-green-600";
    if (score >= 7.0) return "text-blue-600";
    if (score >= 6.0) return "text-orange-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      excellent: { variant: "default", label: "Excellent" },
      good: { variant: "secondary", label: "Good" },
      needs_improvement: { variant: "outline", label: "Needs Improvement" },
      at_risk: { variant: "destructive", label: "At Risk" }
    };
    
    const config = variants[status] || variants.good;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Charity Scorecards</CardTitle>
        <CardDescription>
          Performance scores based on reporting frequency, verification rates, and milestone completion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {charities.map((charity) => (
          <div key={charity.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium">{charity.name}</h4>
                  {getStatusBadge(charity.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {charity.campaigns} active campaigns • Last updated: {charity.lastUpdated}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(charity.currentScore)}`}>
                      {charity.currentScore}
                    </span>
                    {getTrendIcon(charity.currentScore, charity.previousScore)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Previous: {charity.previousScore}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Adjust
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Reporting Frequency</span>
                  <span className="font-medium">{charity.reportingFrequency}%</span>
                </div>
                <Progress value={charity.reportingFrequency} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Verification Rate</span>
                  <span className="font-medium">{charity.verificationRate}%</span>
                </div>
                <Progress value={charity.verificationRate} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Milestone Completion</span>
                  <span className="font-medium">{charity.milestoneCompletion}%</span>
                </div>
                <Progress value={charity.milestoneCompletion} className="h-2" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ScorecardList;
