
import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VerificationQueue = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const verifications = [
    {
      id: "1",
      campaignTitle: "Clean Water for Rural Communities",
      milestoneNumber: 2,
      milestoneTitle: "Install 10 Water Pumps",
      charityName: "Water for Life Foundation",
      submissionDate: "2024-03-15",
      status: "pending",
      amount: "₱150,000",
      priority: "high"
    },
    {
      id: "2",
      campaignTitle: "Education Support Program",
      milestoneNumber: 1,
      milestoneTitle: "Distribute School Supplies",
      charityName: "Learn Together Foundation",
      submissionDate: "2024-03-14",
      status: "under_review",
      amount: "₱75,000",
      priority: "medium"
    },
    {
      id: "3",
      campaignTitle: "Emergency Food Relief",
      milestoneNumber: 3,
      milestoneTitle: "Feed 500 Families",
      charityName: "Hope Kitchen",
      submissionDate: "2024-03-13",
      status: "needs_revision",
      amount: "₱200,000",
      priority: "urgent"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800", icon: Clock },
      under_review: { variant: "default" as const, color: "bg-blue-100 text-blue-800", icon: Eye },
      needs_revision: { variant: "destructive" as const, color: "bg-red-100 text-red-800", icon: AlertTriangle }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      urgent: "bg-red-50 text-red-700 border-red-200",
      high: "bg-orange-50 text-orange-700 border-orange-200",
      medium: "bg-blue-50 text-blue-700 border-blue-200",
      low: "bg-gray-50 text-gray-700 border-gray-200"
    };
    
    return (
      <Badge variant="outline" className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Milestone Verification Queue</h1>
        <p className="text-muted-foreground">
          Review milestone proof submissions and approve fund releases
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">₱450,000 released</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">-30min vs last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Queue</CardTitle>
          <CardDescription>Milestone proof submissions awaiting review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns or charities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pending (15)</TabsTrigger>
              <TabsTrigger value="under_review">Under Review (8)</TabsTrigger>
              <TabsTrigger value="needs_revision">Needs Revision (5)</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {verifications.map((verification) => (
                <Card key={verification.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{verification.campaignTitle}</h3>
                          {getStatusBadge(verification.status)}
                          {getPriorityBadge(verification.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Milestone {verification.milestoneNumber}:</span> {verification.milestoneTitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Organization:</span> {verification.charityName}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span><span className="font-medium">Amount:</span> {verification.amount}</span>
                          <span><span className="font-medium">Submitted:</span> {verification.submissionDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" asChild>
                          <Link to={`/admin/verifications/${verification.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationQueue;
