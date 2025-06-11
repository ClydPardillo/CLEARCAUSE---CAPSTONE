
import React from 'react';
import { DollarSign, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FundReleaseManagement = () => {
  const pendingReleases = [
    {
      id: "1",
      campaignTitle: "Clean Water Project",
      charityName: "Water for Life Foundation",
      amount: "₱150,000",
      approvedDate: "2024-03-15",
      bankAccount: "BPI - ****1234",
      status: "approved"
    },
    {
      id: "2", 
      campaignTitle: "Education Support",
      charityName: "Learn Together Foundation",
      amount: "₱75,000",
      approvedDate: "2024-03-14",
      bankAccount: "BDO - ****5678",
      status: "processing"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fund Release Management</h1>
        <p className="text-muted-foreground">Authorize and track approved fund releases</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Authorization</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">₱450,000 total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Fund Releases</CardTitle>
          <CardDescription>Approved milestones awaiting fund authorization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingReleases.map((release) => (
            <div key={release.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{release.campaignTitle}</h4>
                <p className="text-sm text-muted-foreground">{release.charityName}</p>
                <p className="text-sm text-muted-foreground">Bank: {release.bankAccount}</p>
              </div>
              <div className="text-right space-y-2">
                <p className="font-semibold">{release.amount}</p>
                <Badge variant="outline">
                  {release.status}
                </Badge>
                <div>
                  <Button size="sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Authorize Release
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FundReleaseManagement;
