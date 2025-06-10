
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  Reply,
  Flag,
  Archive,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const SupportHandling = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  const supportTickets = [
    {
      id: 1,
      ticketNumber: "SUP-2024-001",
      subject: "Payment not processed",
      user: {
        name: "Maria Santos",
        email: "maria.santos@email.com",
        avatar: "/avatars/maria.jpg"
      },
      category: "payment",
      priority: "high",
      status: "open",
      createdDate: "2024-03-15 14:30:00",
      lastUpdate: "2024-03-15 16:45:00",
      messages: 3,
      assignedTo: "Admin",
      description: "I tried to donate ₱5,000 to the Clean Water campaign but the payment failed. The amount was deducted from my card but the donation doesn't show up in my account."
    },
    {
      id: 2,
      ticketNumber: "SUP-2024-002",
      subject: "Charity verification taking too long",
      user: {
        name: "Hope Foundation",
        email: "admin@hopefoundation.org",
        avatar: "/avatars/hope.jpg"
      },
      category: "verification",
      priority: "medium",
      status: "in_progress",
      createdDate: "2024-03-14 09:15:00",
      lastUpdate: "2024-03-15 11:20:00",
      messages: 5,
      assignedTo: "Verification Team",
      description: "We submitted our charity verification documents 2 weeks ago but haven't received any updates. Can you please check the status?"
    },
    {
      id: 3,
      ticketNumber: "SUP-2024-003",
      subject: "Unable to upload campaign photos",
      user: {
        name: "Children's Aid Society",
        email: "contact@childrensaid.ph",
        avatar: "/avatars/children.jpg"
      },
      category: "technical",
      priority: "low",
      status: "resolved",
      createdDate: "2024-03-13 16:20:00",
      lastUpdate: "2024-03-14 10:30:00",
      messages: 4,
      assignedTo: "Tech Support",
      description: "We're having trouble uploading photos to our campaign. The upload keeps failing with a file size error even though our images are under 5MB."
    },
    {
      id: 4,
      ticketNumber: "SUP-2024-004",
      subject: "Suspicious donation activity",
      user: {
        name: "Juan dela Cruz",
        email: "juan.delacruz@email.com",
        avatar: "/avatars/juan.jpg"
      },
      category: "security",
      priority: "high",
      status: "escalated",
      createdDate: "2024-03-15 08:45:00",
      lastUpdate: "2024-03-15 12:30:00",
      messages: 7,
      assignedTo: "Security Team",
      description: "I noticed some donations being made from my account that I didn't authorize. I think my account may have been compromised."
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      open: { variant: "destructive" as const, color: "bg-red-100 text-red-800", icon: AlertTriangle },
      in_progress: { variant: "default" as const, color: "bg-blue-100 text-blue-800", icon: Clock },
      resolved: { variant: "default" as const, color: "bg-green-100 text-green-800", icon: CheckCircle },
      escalated: { variant: "secondary" as const, color: "bg-orange-100 text-orange-800", icon: Flag }
    };
    
    const config = variants[status as keyof typeof variants] || variants.open;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive" as const,
      medium: "default" as const,
      low: "secondary" as const
    };
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      payment: "💳",
      verification: "✅",
      technical: "🔧",
      security: "🔒",
      general: "💬"
    };
    return icons[category as keyof typeof icons] || icons.general;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support Handling</h1>
        <p className="text-muted-foreground">
          Manage user support tickets and resolve platform issues
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Being resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">95% satisfaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">-0.5h from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>Manage and respond to user support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="open" className="space-y-4">
            <TabsList>
              <TabsTrigger value="open">Open (12)</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress (8)</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="escalated">Escalated (2)</TabsTrigger>
            </TabsList>

            <TabsContent value="open" className="space-y-4">
              {supportTickets.filter(ticket => ticket.status === 'open' || ticket.status === 'in_progress' || ticket.status === 'escalated').map((ticket) => (
                <Card key={ticket.id} className={`border-l-4 ${
                  ticket.priority === 'high' ? 'border-l-red-500' : 
                  ticket.priority === 'medium' ? 'border-l-yellow-500' : 
                  'border-l-green-500'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{getCategoryIcon(ticket.category)}</span>
                          <h3 className="font-semibold">{ticket.subject}</h3>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={ticket.user.avatar} />
                            <AvatarFallback>{ticket.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{ticket.user.name}</span>
                          <span className="text-sm text-muted-foreground">{ticket.user.email}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Ticket: {ticket.ticketNumber}</span>
                          <span>Created: {ticket.createdDate}</span>
                          <span>Messages: {ticket.messages}</span>
                          <span>Assigned: {ticket.assignedTo}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setSelectedTicket(ticket)}>
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Support Ticket #{ticket.ticketNumber}</DialogTitle>
                              <DialogDescription>{ticket.subject}</DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              {/* User Info */}
                              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                                <Avatar>
                                  <AvatarImage src={ticket.user.avatar} />
                                  <AvatarFallback>{ticket.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{ticket.user.name}</p>
                                  <p className="text-sm text-muted-foreground">{ticket.user.email}</p>
                                </div>
                                <div className="ml-auto flex space-x-2">
                                  {getStatusBadge(ticket.status)}
                                  {getPriorityBadge(ticket.priority)}
                                </div>
                              </div>
                              
                              {/* Original Message */}
                              <div className="space-y-2">
                                <h4 className="font-medium">Original Message</h4>
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-sm">{ticket.description}</p>
                                  <p className="text-xs text-muted-foreground mt-2">{ticket.createdDate}</p>
                                </div>
                              </div>
                              
                              {/* Reply Form */}
                              <div className="space-y-2">
                                <h4 className="font-medium">Reply to User</h4>
                                <Textarea
                                  placeholder="Type your reply here..."
                                  value={replyMessage}
                                  onChange={(e) => setReplyMessage(e.target.value)}
                                  rows={4}
                                />
                              </div>
                              
                              {/* Actions */}
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Mark as Resolved
                                </Button>
                                <Button size="sm" variant="outline">
                                  Escalate
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Archive className="h-4 w-4 mr-1" />
                                  Archive
                                </Button>
                              </div>
                            </div>
                            
                            <DialogFooter className="space-x-2">
                              <Button variant="outline">Save Draft</Button>
                              <Button>
                                <Reply className="h-4 w-4 mr-2" />
                                Send Reply
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button size="sm" variant="ghost">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportHandling;
