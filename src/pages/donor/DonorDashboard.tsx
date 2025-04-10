
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, Heart, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DonorLayout from '@/components/layout/DonorLayout';

// Sample data - in a real app, this would come from an API
const donorName = "John Doe";
const stats = [
  { label: "Total Donated", value: "₱25,500", icon: <Landmark className="h-5 w-5 text-blue-600" /> },
  { label: "Campaigns Supported", value: "12", icon: <Heart className="h-5 w-5 text-rose-600" /> },
  { label: "Active Donations", value: "2", icon: <Clock className="h-5 w-5 text-amber-600" /> },
];

const impactUpdates = [
  {
    id: "1",
    campaignId: "101",
    campaignName: "Clean Water for Village X",
    date: "2023-04-01",
    content: "Water purification system installation complete, now serving 250 families with clean drinking water.",
    charityName: "Water For All"
  },
  {
    id: "2",
    campaignId: "102",
    campaignName: "School Rebuilding Project",
    date: "2023-03-28",
    content: "Foundation completed! Construction of walls begins next week.",
    charityName: "Education First"
  },
  {
    id: "3",
    campaignId: "103",
    campaignName: "Medical Supplies for Rural Clinic",
    date: "2023-03-25",
    content: "First shipment of medical supplies delivered, clinic now able to treat 40% more patients daily.",
    charityName: "Health Access Initiative"
  }
];

const suggestedCampaigns = [
  {
    id: "201",
    title: "Solar Power for Remote Communities",
    description: "Help bring sustainable electricity to isolated villages.",
    raised: 68000,
    goal: 120000,
    image: "/placeholder.svg"
  },
  {
    id: "202",
    title: "Emergency Food Relief",
    description: "Support families affected by recent flooding in coastal regions.",
    raised: 125000,
    goal: 200000,
    image: "/placeholder.svg"
  },
  {
    id: "203",
    title: "Youth Education Program",
    description: "Fund scholarships for underprivileged children to attend school.",
    raised: 85000,
    goal: 150000,
    image: "/placeholder.svg"
  }
];

const DonorDashboard: React.FC = () => {
  return (
    <DonorLayout title={`Welcome, ${donorName}!`}>
      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="rounded-full bg-blue-50 p-2">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Impact Updates */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Impact Updates</h2>
          <Link to="/donor/donations" className="text-clearcause-primary hover:text-clearcause-secondary text-sm font-medium flex items-center">
            View all your donations <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {impactUpdates.map((update) => (
            <Card key={update.id} className="bg-white overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">
                      <Link to={`/campaigns/${update.campaignId}`} className="hover:text-clearcause-primary">
                        {update.campaignName}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      by {update.charityName} • {new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </CardDescription>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700">{update.content}</p>
              </CardContent>
              <CardFooter className="pt-0 border-t">
                <Link 
                  to={`/campaigns/${update.campaignId}`} 
                  className="text-xs text-clearcause-primary hover:text-clearcause-secondary flex items-center"
                >
                  View campaign details <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Suggested Campaigns */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Campaigns You Might Like</h2>
          <Link to="/campaigns" className="text-clearcause-primary hover:text-clearcause-secondary text-sm font-medium flex items-center">
            Browse all campaigns <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedCampaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-white overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1">{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {campaign.description}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className="bg-clearcause-primary h-2 rounded-full" 
                    style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-semibold">₱{campaign.raised.toLocaleString()}</span>
                  <span className="text-gray-600">of ₱{campaign.goal.toLocaleString()}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  size="sm" 
                  className="w-full bg-clearcause-primary hover:bg-clearcause-secondary"
                  asChild
                >
                  <Link to={`/campaigns/${campaign.id}`}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DonorLayout>
  );
};

export default DonorDashboard;
