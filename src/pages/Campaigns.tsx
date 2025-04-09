
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CampaignGrid from '@/components/ui/campaign/CampaignGrid';
import { Search, Filter, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  "All Categories",
  "Clean Water",
  "Education",
  "Food Security",
  "Healthcare",
  "Environment",
  "Disaster Relief",
  "Animal Welfare",
];

const SAMPLE_CAMPAIGNS = [
  {
    id: "1",
    title: "Build Clean Water Wells in Rural Villages",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    charity: "Water For All Foundation",
    description: "Help us build 10 clean water wells that will provide safe drinking water to over 5,000 people in rural communities.",
    raised: 850000,
    goal: 1000000,
    daysLeft: 15,
    verified: true,
    category: "Clean Water",
  },
  {
    id: "2",
    title: "Rebuild School After Typhoon Damage",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    charity: "EducateNow",
    description: "Help rebuild the elementary school that was severely damaged during the recent typhoon, affecting 500 students.",
    raised: 320000,
    goal: 750000,
    daysLeft: 24,
    verified: true,
    category: "Education",
  },
  {
    id: "3",
    title: "Community Food Bank Expansion",
    imageUrl: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    charity: "Food For Everyone",
    description: "Help us expand our food bank to serve an additional 200 families per week in the local community.",
    raised: 175000,
    goal: 350000,
    daysLeft: 30,
    verified: false,
    category: "Food Security",
  },
  {
    id: "4",
    title: "Medical Equipment for Rural Clinic",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    charity: "Healthcare Access Initiative",
    description: "Help us purchase vital medical equipment for a rural clinic serving over 2,000 patients monthly with limited resources.",
    raised: 475000,
    goal: 600000,
    daysLeft: 12,
    verified: true,
    category: "Healthcare",
  },
  {
    id: "5",
    title: "Mangrove Reforestation Project",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    charity: "Earth Guardians",
    description: "Support our initiative to plant 10,000 mangrove trees to protect coastal communities from erosion and provide habitat for marine life.",
    raised: 230000,
    goal: 500000,
    daysLeft: 45,
    verified: true,
    category: "Environment",
  },
  {
    id: "6",
    title: "Emergency Shelter for Typhoon Victims",
    imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    charity: "Disaster Response Network",
    description: "Provide temporary shelters for 200 families displaced by the recent typhoon that devastated coastal communities.",
    raised: 920000,
    goal: 1200000,
    daysLeft: 5,
    verified: true,
    category: "Disaster Relief",
  },
];

const Campaigns: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Filter campaigns based on selected filters
  const filteredCampaigns = SAMPLE_CAMPAIGNS.filter(campaign => {
    // Filter by category
    if (selectedCategory !== "All Categories" && campaign.category !== selectedCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !campaign.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by verified status
    if (verifiedOnly && !campaign.verified) {
      return false;
    }
    
    return true;
  });

  // Sort campaigns based on selected sort option
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch(sortBy) {
      case "most-funded":
        return b.raised - a.raised;
      case "ending-soon":
        return a.daysLeft - b.daysLeft;
      case "newest":
      default:
        return parseInt(b.id) - parseInt(a.id);
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover verified campaigns and track your impact in real-time
            </p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="bg-white border-b py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-auto md:flex-grow md:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 bg-white py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-clearcause-primary focus:border-clearcause-primary"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-clearcause-primary focus:border-clearcause-primary"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                {/* Sort By Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-clearcause-primary focus:border-clearcause-primary"
                >
                  <option value="newest">Newest First</option>
                  <option value="most-funded">Most Funded</option>
                  <option value="ending-soon">Ending Soon</option>
                </select>
                
                {/* Verified Only Toggle */}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={() => setVerifiedOnly(!verifiedOnly)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-clearcause-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-clearcause-primary"></div>
                  <span className="ml-2 text-sm font-medium text-gray-900">Verified Only</span>
                </label>
              </div>
            </div>
          </div>
        </section>
        
        {/* Campaigns Grid Section */}
        <section className="py-10 bg-clearcause-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sortedCampaigns.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-gray-500">
                  Showing {sortedCampaigns.length} of {SAMPLE_CAMPAIGNS.length} campaigns
                </div>
                
                <CampaignGrid campaigns={sortedCampaigns} />
              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium text-gray-900 mb-3">No campaigns found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters to find campaigns.</p>
                <Button 
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSearchQuery("");
                    setVerifiedOnly(false);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Campaigns;
