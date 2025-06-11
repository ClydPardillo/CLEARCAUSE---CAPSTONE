
import React from 'react';
import { Users, Eye, Ban } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DonorManagement = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donor Management</h1>
        <p className="text-muted-foreground">Manage donor accounts and activity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,156</div>
            <p className="text-xs text-muted-foreground">+12% this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donor Accounts</CardTitle>
          <CardDescription>All registered donors on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Donor management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorManagement;
