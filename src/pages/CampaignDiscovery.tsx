
import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CampaignDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    'Education',
    'Health',
    'Environment',
    'Disaster Relief',
    'Poverty Alleviation',
    'Animal Welfare',
    'Community Development'
  ];

  const campaigns = [
    {
      id: 1,
      title: "Clean Water for Rural Communities",
      description: "Providing clean water access to 500 families in remote barangays",
      category: "Health",
      location: "Mindanao",
      goal: 500000,
      raised: 325000,
      progress: 65,
      daysLeft: 45,
      charity: "Water for Life Foundation",
      charityScore: 4.8,
      image: "/placeholder.svg",
      urgency: "high"
    },
    {
      id: 2,
      title: "Education Support for Indigenous Children",
      description: "School supplies and scholarships for Aeta children in Zambales",
      category: "Education",
      location: "Luzon",
      goal: 200000,
      raised: 180000,
      progress: 90,
      daysLeft: 15,
      charity: "Learn Together Foundation",
      charityScore: 4.6,
      image: "/placeholder.svg",
      urgency: "urgent"
    },
    {
      id: 3,
      title: "Reforestation Project Bataan",
      description: "Planting 10,000 native trees to restore forest ecosystem",
      category: "Environment",
      location: "Luzon",
      goal: 150000,
      raised: 75000,
      progress: 50,
      daysLeft: 60,
      charity: "Green Philippines Initiative",
      charityScore: 4.7,
      image: "/placeholder.svg",
      urgency: "medium"
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.charity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || campaign.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-clearcause-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Campaigns</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find meaningful causes to support across the Philippines. Every donation makes a transparent impact.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search campaigns, charities, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Philippines</SelectItem>
                    <SelectItem value="Luzon">Luzon</SelectItem>
                    <SelectItem value="Visayas">Visayas</SelectItem>
                    <SelectItem value="Mindanao">Mindanao</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="ending_soon">Ending Soon</SelectItem>
                    <SelectItem value="most_funded">Most Funded</SelectItem>
                    <SelectItem value="least_funded">Needs Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredCampaigns.length} campaigns
            </p>
          </div>

          {/* Campaign Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                  <Badge className={`absolute top-3 right-3 ${getUrgencyColor(campaign.urgency)}`}>
                    {campaign.urgency}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2 mb-2">{campaign.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {campaign.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {campaign.daysLeft} days left
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">₱{campaign.raised.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">₱{campaign.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-clearcause-primary h-2 rounded-full" 
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{campaign.progress}% funded</p>
                    </div>

                    {/* Charity Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{campaign.charity}</p>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400 text-xs">
                            {'★'.repeat(Math.floor(campaign.charityScore))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">{campaign.charityScore}</span>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{campaign.category}</Badge>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full" asChild>
                      <a href={`/campaigns/${campaign.id}`}>
                        View Campaign
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or browse all campaigns.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CampaignDiscovery;
