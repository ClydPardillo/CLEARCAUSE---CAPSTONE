
import React, { useState } from 'react';
import { 
  Download, 
  Filter, 
  Calendar,
  BarChart3,
  Users,
  DollarSign,
  Activity,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const ReportsAndLogs = () => {
  const [dateRange, setDateRange] = useState('30d');

  const donationData = [
    { month: 'Jan', amount: 145000 },
    { month: 'Feb', amount: 180000 },
    { month: 'Mar', amount: 220000 },
    { month: 'Apr', amount: 190000 },
    { month: 'May', amount: 250000 },
    { month: 'Jun', amount: 280000 }
  ];

  const userGrowthData = [
    { month: 'Jan', donors: 150, charities: 12 },
    { month: 'Feb', donors: 200, charities: 15 },
    { month: 'Mar', donors: 280, charities: 18 },
    { month: 'Apr', donors: 320, charities: 22 },
    { month: 'May', donors: 410, charities: 25 },
    { month: 'Jun', donors: 480, charities: 28 }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: "2024-03-15 14:30:25",
      action: "User Registration",
      user: "maria.santos@email.com",
      details: "New donor account created",
      status: "success",
      ipAddress: "192.168.1.100"
    },
    {
      id: 2,
      timestamp: "2024-03-15 14:25:18",
      action: "Fund Release",
      user: "admin@clearcause.ph",
      details: "₱50,000 released to Hope Foundation",
      status: "success",
      ipAddress: "10.0.0.5"
    },
    {
      id: 3,
      timestamp: "2024-03-15 14:20:45",
      action: "Failed Login",
      user: "suspicious@email.com",
      details: "Multiple failed login attempts",
      status: "warning",
      ipAddress: "45.123.45.67"
    },
    {
      id: 4,
      timestamp: "2024-03-15 14:15:33",
      action: "Charity Verification",
      user: "admin@clearcause.ph",
      details: "Children's Aid Society verified",
      status: "success",
      ipAddress: "10.0.0.5"
    }
  ];

  const transactionLogs = [
    {
      id: 1,
      timestamp: "2024-03-15 14:30:00",
      type: "Donation",
      amount: "₱5,000",
      donor: "Maria Santos",
      campaign: "Clean Water Project",
      status: "completed",
      reference: "TXN-2024031501"
    },
    {
      id: 2,
      timestamp: "2024-03-15 14:25:00",
      type: "Fund Release",
      amount: "₱50,000",
      donor: "System",
      campaign: "Education Support",
      status: "completed",
      reference: "REL-2024031501"
    },
    {
      id: 3,
      timestamp: "2024-03-15 14:20:00",
      type: "Donation",
      amount: "₱2,500",
      donor: "Juan dela Cruz",
      campaign: "Food Relief",
      status: "pending",
      reference: "TXN-2024031502"
    }
  ];

  const reportTypes = [
    {
      title: "Donation Report",
      description: "Comprehensive donation analytics and trends",
      icon: DollarSign,
      frequency: "Daily/Weekly/Monthly"
    },
    {
      title: "User Activity Report",
      description: "User registration and engagement metrics",
      icon: Users,
      frequency: "Weekly/Monthly"
    },
    {
      title: "Campaign Performance",
      description: "Campaign success rates and completion metrics",
      icon: TrendingUp,
      frequency: "Monthly/Quarterly"
    },
    {
      title: "Verification Report",
      description: "Charity and milestone verification statistics",
      icon: FileText,
      frequency: "Monthly"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "default" as const,
      warning: "secondary" as const,
      error: "destructive" as const,
      pending: "outline" as const,
      completed: "default" as const
    };
    
    const colors = {
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      pending: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800"
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Logs</h1>
        <p className="text-muted-foreground">
          Generate system reports and monitor platform activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱1.2M</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,732</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.2%</div>
            <p className="text-xs text-muted-foreground">-0.1% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system-logs">System Logs</TabsTrigger>
          <TabsTrigger value="transaction-logs">Transaction Logs</TabsTrigger>
          <TabsTrigger value="reports">Generate Reports</TabsTrigger>
        </TabsList>

        {/* Analytics */}
        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Monthly donation amounts over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={donationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₱${value.toLocaleString()}`, 'Amount']} />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donors" fill="#3b82f6" name="Donors" />
                    <Bar dataKey="charities" fill="#10b981" name="Charities" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Logs */}
        <TabsContent value="system-logs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Activity Logs</CardTitle>
                  <CardDescription>Monitor all system events and user actions</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction Logs */}
        <TabsContent value="transaction-logs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction Logs</CardTitle>
                  <CardDescription>Track all financial transactions and fund movements</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.type}</TableCell>
                      <TableCell className="font-semibold">{log.amount}</TableCell>
                      <TableCell>{log.donor}</TableCell>
                      <TableCell>{log.campaign}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{log.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generate Reports */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create comprehensive reports for different aspects of the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {reportTypes.map((report, index) => (
                  <Card key={index} className="border-2 border-dashed border-muted hover:border-primary/50 cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <report.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                          <p className="text-xs text-muted-foreground">Available: {report.frequency}</p>
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Generate
                            </Button>
                            <Button size="sm" variant="outline">
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAndLogs;
