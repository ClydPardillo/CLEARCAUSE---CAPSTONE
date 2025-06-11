
import React from 'react';
import { 
  Shield, 
  CheckCircle, 
  DollarSign, 
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Pending Verifications",
      value: "15",
      change: "+3 new",
      icon: Clock,
      color: "text-orange-600",
      href: "/admin/verifications"
    },
    {
      title: "New Applications",
      value: "8",
      change: "This week",
      icon: FileText,
      color: "text-blue-600",
      href: "/admin/applications"
    },
    {
      title: "Pending Payouts",
      value: "₱450K",
      change: "12 releases",
      icon: DollarSign,
      color: "text-green-600",
      href: "/admin/payouts"
    },
    {
      title: "Active Campaigns",
      value: "156",
      change: "+8 this month",
      icon: TrendingUp,
      color: "text-purple-600",
      href: "/admin/campaigns"
    }
  ];

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

  const quickActions = [
    {
      title: "Verification Queue",
      description: "Review milestone proofs",
      icon: CheckCircle,
      href: "/admin/verifications",
      color: "bg-green-50 text-green-600",
      count: "15 pending"
    },
    {
      title: "Fund Releases",
      description: "Authorize approved payouts",
      icon: DollarSign,
      href: "/admin/payouts",
      color: "bg-blue-50 text-blue-600",
      count: "₱450K pending"
    },
    {
      title: "Charity Applications",
      description: "Review new registrations",
      icon: Shield,
      href: "/admin/applications",
      color: "bg-purple-50 text-purple-600",
      count: "8 new"
    },
    {
      title: "Platform Settings",
      description: "Manage site configuration",
      icon: FileText,
      href: "/admin/settings",
      color: "bg-orange-50 text-orange-600",
      count: null
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ClearCause Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor platform activity and manage verification processes
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Access key administrative functions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  {action.count && (
                    <Badge variant="outline" className="text-xs">
                      {action.count}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
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
                    {activity.status === 'urgent' && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    {activity.status === 'pending' && (
                      <Clock className="h-4 w-4 text-orange-500" />
                    )}
                    {activity.status === 'review' && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                    {activity.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge 
                        variant={
                          activity.status === 'urgent' ? 'destructive' :
                          activity.status === 'pending' ? 'secondary' :
                          'outline'
                        }
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
      </div>
    </div>
  );
};

export default AdminDashboard;
