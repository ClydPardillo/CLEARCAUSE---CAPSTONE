
import React from 'react';
import { Calendar, TrendingUp, Heart, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DonationTracking = () => {
  const donations = [
    {
      id: 1,
      campaign: "Clean Water for Rural Communities",
      amount: 5000,
      date: "2024-03-15",
      status: "active",
      progress: 65,
      milestoneReached: "Milestone 2: Water pumps installed",
      charity: "Water for Life Foundation",
      impact: "Helped provide clean water to 150 families"
    },
    {
      id: 2,
      campaign: "Education Support Program", 
      amount: 2500,
      date: "2024-03-10",
      status: "completed",
      progress: 100,
      milestoneReached: "Campaign Goal Achieved",
      charity: "Learn Together Foundation",
      impact: "Provided school supplies to 200 students"
    },
    {
      id: 3,
      campaign: "Emergency Food Relief",
      amount: 1000,
      date: "2024-03-08",
      status: "active",
      progress: 45,
      milestoneReached: "Milestone 1: Initial food distribution",
      charity: "Hope Kitchen",
      impact: "Fed 50 families in crisis"
    }
  ];

  const badges = [
    { name: "First Donation", icon: Heart, earned: true },
    { name: "Regular Giver", icon: TrendingUp, earned: true },
    { name: "Impact Champion", icon: Award, earned: false },
    { name: "Monthly Supporter", icon: Calendar, earned: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Donation Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱8,500</div>
            <p className="text-xs text-muted-foreground">Across 3 campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">400+</div>
            <p className="text-xs text-muted-foreground">People helped</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Out of 4 available</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Badges</CardTitle>
          <CardDescription>Recognition for your generous contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {badges.map((badge, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg text-center ${
                  badge.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <badge.icon className={`h-8 w-8 mx-auto mb-2 ${
                  badge.earned ? 'text-green-600' : 'text-gray-400'
                }`} />
                <p className={`text-sm font-medium ${
                  badge.earned ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Donation History */}
      <Card>
        <CardHeader>
          <CardTitle>Your Donation History</CardTitle>
          <CardDescription>Track the impact of your contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id} className="border-l-4 border-l-clearcause-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{donation.campaign}</h3>
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{donation.charity}</p>
                      <p className="text-sm font-medium text-green-600">{donation.impact}</p>
                      
                      {/* Progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Campaign Progress</span>
                          <span>{donation.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-clearcause-primary h-2 rounded-full" 
                            style={{ width: `${donation.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">{donation.milestoneReached}</p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1 ml-4">
                      <p className="font-semibold">₱{donation.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{donation.date}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/campaigns/${donation.id}`}>
                          View Updates
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationTracking;
