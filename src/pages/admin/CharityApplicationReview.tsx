
import React from 'react';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CharityApplicationReview = () => {
  const applications = [
    {
      id: "1",
      organizationName: "Hope Foundation",
      contactPerson: "Maria Santos",
      email: "maria@hopefoundation.org",
      submissionDate: "2024-03-15",
      status: "pending",
      registrationNumber: "SEC-2024-001"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Charity Application Review</h1>
        <p className="text-muted-foreground">Review and approve new charity registrations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">New applications</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Applications</CardTitle>
          <CardDescription>Charity registration applications awaiting review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{app.organizationName}</h4>
                <p className="text-sm text-muted-foreground">{app.contactPerson} • {app.email}</p>
                <p className="text-sm text-muted-foreground">
                  {app.registrationNumber} • Submitted {app.submissionDate}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">pending</Badge>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CharityApplicationReview;
