
import React, { useState } from 'react';
import { 
  BankIcon, 
  Building2, 
  DollarSign, 
  Download, 
  FileText, 
  Filter, 
  PencilIcon, 
  Save
} from 'lucide-react';
import { format } from 'date-fns';
import CharityLayout from '@/components/layout/CharityLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Sample data for demonstration
const SAMPLE_TRANSACTIONS = [
  {
    id: '1',
    date: new Date('2023-11-15'),
    type: 'Donation Received',
    campaign: 'Clean Water for Barangay Malakas',
    amount: 50000,
    status: 'Held',
    reference: 'DON-123456'
  },
  {
    id: '2',
    date: new Date('2023-11-13'),
    type: 'Funds Released',
    campaign: 'Clean Water for Barangay Malakas',
    amount: 100000,
    status: 'Released',
    reference: 'REL-123456'
  },
  {
    id: '3',
    date: new Date('2023-11-10'),
    type: 'Donation Received',
    campaign: 'School Building Renovation Project',
    amount: 75000,
    status: 'Held',
    reference: 'DON-234567'
  },
  {
    id: '4',
    date: new Date('2023-11-05'),
    type: 'Donation Received',
    campaign: 'Clean Water for Barangay Malakas',
    amount: 25000,
    status: 'Held',
    reference: 'DON-345678'
  },
  {
    id: '5',
    date: new Date('2023-11-01'),
    type: 'Funds Released',
    campaign: 'School Building Renovation Project',
    amount: 150000,
    status: 'Released',
    reference: 'REL-234567'
  },
];

// Bank account form schema
const bankAccountSchema = z.object({
  bankName: z.string().min(2, { message: "Bank name is required" }),
  accountHolder: z.string().min(2, { message: "Account holder name is required" }),
  accountNumber: z.string().min(8, { message: "Valid account number is required" }),
  branchCode: z.string().optional(),
});

const FundsManagement: React.FC = () => {
  const [editingBankDetails, setEditingBankDetails] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: 'BDO Unibank',
    accountHolder: 'Water For All Foundation',
    accountNumber: '1234567890',
    branchCode: 'BDOPH12345',
    status: 'Verified'
  });

  // Calculate totals
  const totalRaised = SAMPLE_TRANSACTIONS.reduce((sum, tx) => 
    tx.type === 'Donation Received' ? sum + tx.amount : sum, 0);
  
  const totalHeld = SAMPLE_TRANSACTIONS.reduce((sum, tx) => 
    (tx.type === 'Donation Received' && tx.status === 'Held') ? sum + tx.amount : sum, 0);
  
  const totalReleased = SAMPLE_TRANSACTIONS.reduce((sum, tx) => 
    tx.type === 'Funds Released' ? sum + tx.amount : sum, 0);

  // Bank details form
  const form = useForm<z.infer<typeof bankAccountSchema>>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      bankName: bankDetails.bankName,
      accountHolder: bankDetails.accountHolder,
      accountNumber: bankDetails.accountNumber,
      branchCode: bankDetails.branchCode,
    },
  });

  const handleSaveBankDetails = (values: z.infer<typeof bankAccountSchema>) => {
    setBankDetails({
      ...bankDetails,
      ...values
    });
    setEditingBankDetails(false);
  };
  
  return (
    <CharityLayout title="Funds Management">
      <div className="space-y-8">
        {/* Funds Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-clearcause-primary" />
                Total Raised
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₱{totalRaised.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Across all campaigns</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-500" />
                Funds Held
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₱{totalHeld.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Awaiting milestone verification</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Funds Released
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₱{totalReleased.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total transferred to your account</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Bank Account Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BankIcon className="h-5 w-5" />
                Payout Bank Account Details
              </span>
              {!editingBankDetails && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditingBankDetails(true)}
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit Details
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingBankDetails ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveBankDetails)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., BDO Unibank" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="accountHolder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Water For All Foundation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="branchCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Branch / Code (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., BDOPH12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingBankDetails(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-1" />
                      Save Bank Details
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Bank Name</Label>
                  <p className="font-medium">{bankDetails.bankName}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Account Holder Name</Label>
                  <p className="font-medium">{bankDetails.accountHolder}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Account Number</Label>
                  <p className="font-medium">{bankDetails.accountNumber}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Bank Branch / Code</Label>
                  <p className="font-medium">{bankDetails.branchCode || '-'}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <div className="mt-1">
                    <Badge variant={bankDetails.status === 'Verified' ? 'default' : 'outline'} className={bankDetails.status === 'Verified' ? 'bg-green-500' : ''}>
                      {bankDetails.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Transaction History Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Transaction History
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SAMPLE_TRANSACTIONS.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{format(transaction.date, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={transaction.type === 'Donation Received' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-green-600 border-green-200 bg-green-50'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{transaction.campaign}</TableCell>
                    <TableCell className="text-right font-medium">₱{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={transaction.status === 'Held' ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-green-600 border-green-200 bg-green-50'}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{transaction.reference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination would go here */}
            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="mx-1">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CharityLayout>
  );
};

export default FundsManagement;
