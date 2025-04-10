
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CharityLayout from '@/components/layout/CharityLayout';

const ManageCampaigns: React.FC = () => {
  // Sample campaigns data
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      title: 'Clean Water Project',
      status: 'Active',
      createdAt: '2025-01-15',
      totalRaised: 125000,
      goal: 200000,
    },
    {
      id: '2',
      title: 'School Rebuilding Program',
      status: 'Active',
      createdAt: '2025-02-20',
      totalRaised: 150000,
      goal: 500000,
    },
    {
      id: '3',
      title: 'Community Garden Project',
      status: 'Completed',
      createdAt: '2024-10-05',
      totalRaised: 75000,
      goal: 75000,
    },
    {
      id: '4',
      title: 'Healthcare Outreach Initiative',
      status: 'Draft',
      createdAt: '2025-03-10',
      totalRaised: 0,
      goal: 300000,
    },
    {
      id: '5',
      title: 'Youth Education Program',
      status: 'Pending Approval',
      createdAt: '2025-04-01',
      totalRaised: 0,
      goal: 150000,
    },
  ]);

  // Function to delete a campaign (just for UI demonstration)
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  // Function to get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <CharityLayout title="Manage Campaigns">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Manage all your campaigns in one place</p>
        <Link to="/charity/campaigns/new">
          <Button className="bg-clearcause-accent hover:bg-clearcause-accent/90">
            <Plus className="mr-2 h-4 w-4" /> Create New Campaign
          </Button>
        </Link>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.title}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </TableCell>
                <TableCell>{campaign.createdAt}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span>{formatCurrency(campaign.totalRaised)}</span>
                      <span>{formatCurrency(campaign.goal)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-clearcause-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (campaign.totalRaised / campaign.goal) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/campaigns/${campaign.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/charity/campaigns/edit/${campaign.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/charity/campaigns/${campaign.id}/updates`}>
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Updates</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(campaign.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">No campaigns yet</h3>
          <p className="mt-1 text-gray-500">Get started by creating your first campaign</p>
          <div className="mt-6">
            <Link to="/charity/campaigns/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Campaign
              </Button>
            </Link>
          </div>
        </div>
      )}
    </CharityLayout>
  );
};

export default ManageCampaigns;
