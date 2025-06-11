
import React from 'react';
import { Clock, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const AdminStatsGrid = () => {
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

  return (
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
  );
};

export default AdminStatsGrid;
