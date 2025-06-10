
import React from 'react';
import { 
  Users, 
  CheckCircle, 
  Edit3, 
  FileText, 
  HeadphonesIcon,
  TrendingUp,
  AlertTriangle,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Pending Verifications",
      value: "23",
      change: "-5%",
      icon: CheckCircle,
      color: "text-orange-600"
    },
    {
      title: "Active Campaigns",
      value: "156",
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Total Funds Raised",
      value: "₱2.3M",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "verification",
      message: "New charity verification submitted by Hope Foundation",
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      type: "milestone",
      message: "Milestone proof submitted for Education for All campaign",
      time: "4 hours ago",
      status: "review"
    },
    {
      id: 3,
      type: "support",
      message: "User reported payment issue",
      time: "6 hours ago",
      status: "urgent"
    },
    {
      id: 4,
      type: "user",
      message: "User account flagged for suspicious activity",
      time: "1 day ago",
      status: "warning"
    }
  ];

  const quickActions = [
    {
      title: "User Management",
      description: "Manage donor and charity accounts",
      icon: Users,
      href: "/admin/users",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Milestone Verification",
      description: "Review proof submissions",
      icon: CheckCircle,
      href: "/admin/milestones",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Content Management",
      description: "Edit homepage and announcements",
      icon: Edit3,
      href: "/admin/content",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Reports & Logs",
      description: "Generate system reports",
      icon: FileText,
      href: "/admin/reports",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Support Handling",
      description: "Manage user concerns",
      icon: HeadphonesIcon,
      href: "/admin/support",
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users, verify milestones, and oversee platform operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
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
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system events requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.status === 'urgent' && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                  {activity.status === 'warning' && (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                  {activity.status === 'pending' && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                  {activity.status === 'review' && (
                    <FileText className="h-5 w-5 text-purple-500" />
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
                        activity.status === 'warning' ? 'secondary' :
                        'outline'
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
