
import React from 'react';
import { TrendingUp, Eye, Flag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CampaignManagement = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
        <p className="text-muted-foreground">Monitor and manage all campaigns on the platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Monitor campaign activity and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Campaign management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignManagement;
