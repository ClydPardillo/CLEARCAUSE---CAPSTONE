
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, BarChart2, Clock, Eye, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CharityLayout from '@/components/layout/CharityLayout';

const CharityDashboard: React.FC = () => {
  // Sample data - in a real app this would come from an API
  const stats = {
    activeCampaigns: 3,
    totalFundsRaised: 275000,
    totalFundsReleased: 125000,
    pendingProofs: 2,
    pendingVerifications: 1
  };
  
  const recentActivity = [
    { id: 1, type: 'donation', description: 'New donation of ₱5,000 to "Clean Water Project"', time: '2 hours ago' },
    { id: 2, type: 'milestone', description: 'Milestone "Initial Assessment" was verified', time: '1 day ago' },
    { id: 3, type: 'milestone', description: 'Milestone "Purchase Equipment" proof was rejected. Please resubmit.', time: '2 days ago' },
    { id: 4, type: 'donation', description: 'New donation of ₱10,000 to "School Rebuilding Program"', time: '3 days ago' },
    { id: 5, type: 'payout', description: 'Payout of ₱75,000 initiated for "Community Garden Project"', time: '5 days ago' },
  ];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <CharityLayout title="Charity Dashboard">
      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Campaigns</p>
                <h3 className="text-2xl font-bold mt-1">{stats.activeCampaigns}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Funds Raised</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalFundsRaised)}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Funds Released</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalFundsReleased)}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-800">Pending Actions</p>
                <h3 className="text-2xl font-bold mt-1 text-amber-900">{stats.pendingProofs + stats.pendingVerifications}</h3>
                <div className="mt-2">
                  <p className="text-xs text-amber-800">
                    <span className="font-medium">{stats.pendingProofs}</span> proofs to submit
                  </p>
                  <p className="text-xs text-amber-800">
                    <span className="font-medium">{stats.pendingVerifications}</span> pending verifications
                  </p>
                </div>
              </div>
              <div className="bg-amber-200 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Primary Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link to="/charity/campaigns">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Manage Campaigns</h3>
                <p className="text-sm text-gray-500">View and edit your campaigns</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/charity/verifications">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Verification Status</h3>
                <p className="text-sm text-gray-500">Track milestone approvals</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/charity/funds">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6 flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Funds Management</h3>
                <p className="text-sm text-gray-500">Review payouts and transactions</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* Create Campaign Button */}
      <div className="text-center mb-8">
        <Link to="/charity/campaigns/new">
          <Button className="py-6 px-8" size="lg">
            <PlusCircle className="mr-2" />
            Create New Campaign
          </Button>
        </Link>
      </div>
      
      {/* Recent Activity Feed */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0 mr-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-700">{activity.description}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </CharityLayout>
  );
};

export default CharityDashboard;
