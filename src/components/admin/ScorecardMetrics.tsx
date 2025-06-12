
import React from 'react';
import { Trophy, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ScorecardMetrics = () => {
  const metrics = [
    {
      title: "Average Score",
      value: "8.2",
      suffix: "/10",
      change: "+0.3",
      icon: Trophy,
      color: "text-green-600"
    },
    {
      title: "High Performers",
      value: "23",
      change: "+2 this month",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Need Attention",
      value: "5",
      change: "-1 this month",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Perfect Scores",
      value: "12",
      change: "+3 this month",
      icon: CheckCircle,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.value}
              {metric.suffix && <span className="text-sm text-muted-foreground">{metric.suffix}</span>}
            </div>
            <p className="text-xs text-muted-foreground">{metric.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScorecardMetrics;
