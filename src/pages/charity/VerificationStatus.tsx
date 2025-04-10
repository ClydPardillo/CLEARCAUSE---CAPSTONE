
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ChevronDown,
  Search,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CharityLayout from '@/components/layout/CharityLayout';

// Status type
type VerificationStatus = 'pending' | 'approved' | 'rejected';

// Verification item interface
interface VerificationItem {
  id: string;
  campaignId: string;
  campaignName: string;
  milestoneName: string;
  milestoneId: string;
  dateSubmitted: string;
  status: VerificationStatus;
  feedback?: string;
}

const VerificationStatus: React.FC = () => {
  // Filter states
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Sample verification items - in a real app would be fetched from an API
  const [verifications] = useState<VerificationItem[]>([
    {
      id: '1',
      campaignId: '1',
      campaignName: 'Clean Water Project',
      milestoneId: '1',
      milestoneName: 'Initial Assessment and Planning',
      dateSubmitted: '2025-01-20',
      status: 'approved',
    },
    {
      id: '2',
      campaignId: '1',
      campaignName: 'Clean Water Project',
      milestoneId: '2',
      milestoneName: 'Equipment Procurement',
      dateSubmitted: '2025-03-05',
      status: 'pending',
    },
    {
      id: '3',
      campaignId: '2',
      campaignName: 'School Rebuilding Program',
      milestoneId: '1',
      milestoneName: 'Architectural Planning',
      dateSubmitted: '2025-02-10',
      status: 'approved',
    },
    {
      id: '4',
      campaignId: '1',
      campaignName: 'Clean Water Project',
      milestoneId: '4',
      milestoneName: 'Community Training',
      dateSubmitted: '2025-02-15',
      status: 'rejected',
      feedback: 'The training materials are incomplete. Please include detailed handouts and attendance records.',
    },
    {
      id: '5',
      campaignId: '2',
      campaignName: 'School Rebuilding Program',
      milestoneId: '2',
      milestoneName: 'Foundation Work',
      dateSubmitted: '2025-03-15',
      status: 'pending',
    },
  ]);
  
  // Unique campaign names for the filter dropdown
  const uniqueCampaigns = [...new Set(verifications.map(item => item.campaignName))];
  
  // Filter verifications based on selected filters
  const filteredVerifications = verifications.filter(item => {
    const matchesCampaign = campaignFilter === 'all' || item.campaignName === campaignFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesCampaign && matchesStatus;
  });
  
  // Function to get status badge
  const getStatusBadge = (status: VerificationStatus) => {
    switch(status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  return (
    <CharityLayout title="Verification Status">
      {/* Filter controls */}
      <div className="bg-white p-4 rounded-md border mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="campaign-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Campaign
            </label>
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-full" id="campaign-filter">
                <SelectValue placeholder="All Campaigns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                {uniqueCampaigns.map(campaign => (
                  <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full" id="status-filter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 self-end">
            <Button variant="outline" className="w-full" onClick={() => {
              setCampaignFilter('all');
              setStatusFilter('all');
            }}>
              <Search className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      
      {/* Verification list table */}
      <div className="bg-white rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Milestone</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVerifications.length > 0 ? (
              filteredVerifications.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.campaignName}</TableCell>
                  <TableCell>{item.milestoneName}</TableCell>
                  <TableCell>{item.dateSubmitted}</TableCell>
                  <TableCell>
                    {getStatusBadge(item.status)}
                    {item.feedback && (
                      <div className="mt-2 text-xs text-red-600">
                        <p className="font-medium">Feedback:</p>
                        <p>{item.feedback}</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.status === 'rejected' && (
                      <Link to={`/charity/campaigns/${item.campaignId}/milestones/${item.milestoneId}/submit`}>
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" />
                          Resubmit
                        </Button>
                      </Link>
                    )}
                    <Link to={`/charity/campaigns/${item.campaignId}/milestones`}>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <p className="text-gray-500">No verification submissions found matching your filters.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {filteredVerifications.length > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </CharityLayout>
  );
};

export default VerificationStatus;
