
import React from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const AdminRecentActivity = () => {
  const recentActivity = [
    {
      id: 1,
      type: "verification",
      message: "Milestone proof submitted for Clean Water Project",
      time: "2 hours ago",
      status: "pending",
      href: "/admin/verifications/1"
    },
    {
      id: 2,
      type: "application",
      message: "New charity application from Hope Foundation",
      time: "4 hours ago",
      status: "review",
      href: "/admin/applications"
    },
    {
      id: 3,
      type: "payout",
      message: "Fund release approved for Education for All",
      time: "6 hours ago",
      status: "completed",
      href: "/admin/payouts"
    },
    {
      id: 4,
      type: "alert",
      message: "Campaign flagged for review by community",
      time: "1 day ago",
      status: "urgent",
      href: "/admin/campaigns"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'review':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest platform events requiring attention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivity.map((activity) => (
          <Link key={activity.id} to={activity.href}>
            <div className="flex items-start space-x-3 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  <Badge 
                    variant={getStatusVariant(activity.status)}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/admin/logs">View All Activity</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivity;
