
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Search, ChevronDown, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import DonorLayout from '@/components/layout/DonorLayout';

// Sample data - in a real app, this would come from an API
const donations = [
  { 
    id: "d1", 
    date: "2023-04-01", 
    campaignId: "101", 
    campaignName: "Clean Water for Village X",
    amount: 5000, 
    status: "Milestone Completed", 
    statusType: "success" 
  },
  { 
    id: "d2", 
    date: "2023-03-15", 
    campaignId: "102", 
    campaignName: "School Rebuilding Project",
    amount: 3500, 
    status: "In Progress", 
    statusType: "pending" 
  },
  { 
    id: "d3", 
    date: "2023-03-10", 
    campaignId: "103", 
    campaignName: "Medical Supplies for Rural Clinic",
    amount: 2000, 
    status: "Milestone Completed", 
    statusType: "success" 
  },
  { 
    id: "d4", 
    date: "2023-02-22", 
    campaignId: "104", 
    campaignName: "Food Distribution Program",
    amount: 1500, 
    status: "In Progress", 
    statusType: "pending" 
  },
  { 
    id: "d5", 
    date: "2023-02-15", 
    campaignId: "105", 
    campaignName: "Reforestation Initiative",
    amount: 8500, 
    status: "Milestone Completed", 
    statusType: "success" 
  },
  { 
    id: "d6", 
    date: "2023-02-01", 
    campaignId: "106", 
    campaignName: "Women's Entrepreneurship Fund",
    amount: 5000, 
    status: "In Progress", 
    statusType: "pending" 
  },
];

const DonorDonations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDonations = donations.filter(donation => 
    donation.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Status indicator component
  const StatusIndicator = ({ status, type }: { status: string, type: string }) => {
    return (
      <div className="flex items-center">
        {type === 'success' ? (
          <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
        ) : (
          <Clock className="h-4 w-4 text-amber-500 mr-1.5" />
        )}
        <span className={type === 'success' ? 'text-green-700' : 'text-amber-700'}>
          {status}
        </span>
      </div>
    );
  };

  return (
    <DonorLayout title="My Donation History">
      {/* Search and filter controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center sm:w-auto w-full justify-center">
          <CalendarDays className="h-4 w-4 mr-1.5" />
          Filter by date
          <ChevronDown className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
      
      {/* Donations table */}
      <div className="bg-white rounded-md shadow overflow-hidden mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {new Date(donation.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell>
                    <Link 
                      to={`/campaigns/${donation.campaignId}`} 
                      className="text-clearcause-primary hover:underline"
                    >
                      {donation.campaignName}
                    </Link>
                  </TableCell>
                  <TableCell>₱{donation.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <StatusIndicator status={donation.status} type={donation.statusType} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No donations found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
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
      
      <div className="mt-8 p-6 bg-white rounded-md shadow text-center">
        <h3 className="font-semibold text-lg mb-2">Want to make a bigger impact?</h3>
        <p className="text-gray-600 mb-4">
          Discover more campaigns that align with your interests and values.
        </p>
        <Button className="bg-clearcause-primary hover:bg-clearcause-secondary" asChild>
          <Link to="/campaigns">Browse More Campaigns</Link>
        </Button>
      </div>
    </DonorLayout>
  );
};

export default DonorDonations;
