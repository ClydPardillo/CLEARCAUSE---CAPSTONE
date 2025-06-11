
import React from 'react';
import { CheckCircle, DollarSign, Shield, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const AdminQuickActions = () => {
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
  );
};

export default AdminQuickActions;
