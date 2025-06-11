
import React from 'react';
import { Shield, Eye, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const CharityManagement = () => {
  const charities = [
    {
      id: "1",
      name: "Water for Life Foundation",
      email: "contact@waterforlife.org",
      status: "verified",
      campaigns: 5,
      totalRaised: "₱500,000",
      joinDate: "2023-11-05"
    },
    {
      id: "2",
      name: "Hope Foundation",
      email: "info@hopefoundation.org", 
      status: "pending",
      campaigns: 0,
      totalRaised: "₱0",
      joinDate: "2024-02-20"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Charity Management</h1>
          <p className="text-muted-foreground">Manage registered charity organizations</p>
        </div>
        <Button asChild>
          <Link to="/admin/applications">View Applications</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Charities</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Charities</CardTitle>
          <CardDescription>All charity organizations on the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {charities.map((charity) => (
            <div key={charity.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{charity.name}</h4>
                <p className="text-sm text-muted-foreground">{charity.email}</p>
                <p className="text-sm text-muted-foreground">
                  {charity.campaigns} campaigns • {charity.totalRaised} raised
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={charity.status === 'verified' ? 'default' : 'secondary'}>
                  {charity.status}
                </Badge>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CharityManagement;
