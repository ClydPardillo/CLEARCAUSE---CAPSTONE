
import React, { useState } from 'react';
import { 
  Edit3, 
  Save, 
  Plus, 
  Eye, 
  Trash2,
  Star,
  Megaphone,
  Home,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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

const ContentManagement = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [homepageContent, setHomepageContent] = useState({
    heroTitle: "Make a Difference Today",
    heroSubtitle: "Support verified charities and track your impact with our transparent platform",
    featuredCampaignsTitle: "Featured Campaigns",
    aboutText: "ClearCause connects generous donors with verified charitable organizations across the Philippines."
  });

  const announcements = [
    {
      id: 1,
      title: "Platform Maintenance Scheduled",
      content: "We will be performing system maintenance on March 20th from 2:00 AM to 4:00 AM PST.",
      type: "maintenance",
      isActive: true,
      priority: "high",
      createdDate: "2024-03-15",
      expiryDate: "2024-03-20"
    },
    {
      id: 2,
      title: "New Charity Verification Process",
      content: "We've updated our charity verification process to ensure even greater transparency and security.",
      type: "update",
      isActive: true,
      priority: "medium",
      createdDate: "2024-03-10",
      expiryDate: "2024-04-10"
    },
    {
      id: 3,
      title: "Holiday Campaign Drive",
      content: "Join our special holiday campaign drive and help make this season brighter for families in need.",
      type: "promotion",
      isActive: false,
      priority: "low",
      createdDate: "2024-03-05",
      expiryDate: "2024-03-25"
    }
  ];

  const featuredCampaigns = [
    {
      id: 1,
      title: "Emergency Food Relief for Typhoon Victims",
      charity: "Hope Kitchen Foundation",
      currentAmount: "₱450,000",
      targetAmount: "₱500,000",
      isFeatured: true,
      featuredDate: "2024-03-15"
    },
    {
      id: 2,
      title: "Clean Water for Rural Communities",
      charity: "Water for Life Foundation",
      currentAmount: "₱320,000",
      targetAmount: "₱800,000",
      isFeatured: true,
      featuredDate: "2024-03-14"
    },
    {
      id: 3,
      title: "Education Support Program",
      charity: "Learn Together Foundation",
      currentAmount: "₱150,000",
      targetAmount: "₱300,000",
      isFeatured: false,
      featuredDate: null
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive" as const,
      medium: "default" as const,
      low: "secondary" as const
    };
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      maintenance: "bg-orange-100 text-orange-800",
      update: "bg-blue-100 text-blue-800",
      promotion: "bg-green-100 text-green-800"
    };
    return <Badge className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">
          Manage homepage content, announcements, and featured campaigns
        </p>
      </div>

      <Tabs defaultValue="homepage" className="space-y-6">
        <TabsList>
          <TabsTrigger value="homepage">Homepage Content</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="featured">Featured Campaigns</TabsTrigger>
        </TabsList>

        {/* Homepage Content */}
        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Homepage Content</span>
              </CardTitle>
              <CardDescription>Edit the main content sections of your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Title</label>
                    <Input
                      value={homepageContent.heroTitle}
                      onChange={(e) => setHomepageContent({...homepageContent, heroTitle: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Subtitle</label>
                    <Textarea
                      value={homepageContent.heroSubtitle}
                      onChange={(e) => setHomepageContent({...homepageContent, heroSubtitle: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Campaigns Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Featured Campaigns Section</h3>
                <div>
                  <label className="text-sm font-medium">Section Title</label>
                  <Input
                    value={homepageContent.featuredCampaignsTitle}
                    onChange={(e) => setHomepageContent({...homepageContent, featuredCampaignsTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About Section</h3>
                <div>
                  <label className="text-sm font-medium">About Text</label>
                  <Textarea
                    value={homepageContent.aboutText}
                    onChange={(e) => setHomepageContent({...homepageContent, aboutText: e.target.value})}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements */}
        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Megaphone className="h-5 w-5" />
                    <span>Announcements</span>
                  </CardTitle>
                  <CardDescription>Manage system announcements and notifications</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Announcement</DialogTitle>
                      <DialogDescription>Add a new announcement for all users</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input placeholder="Announcement title" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <Textarea placeholder="Announcement content" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Type</label>
                          <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2">
                            <option value="maintenance">Maintenance</option>
                            <option value="update">Update</option>
                            <option value="promotion">Promotion</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Priority</label>
                          <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Expiry Date</label>
                        <Input type="date" className="mt-1" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Create Announcement</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className={`border-l-4 ${announcement.isActive ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{announcement.title}</h4>
                            {getTypeBadge(announcement.type)}
                            {getPriorityBadge(announcement.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground">{announcement.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Created: {announcement.createdDate}</span>
                            <span>Expires: {announcement.expiryDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Switch checked={announcement.isActive} />
                          <Button size="sm" variant="ghost">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Campaigns */}
        <TabsContent value="featured">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Featured Campaigns</span>
              </CardTitle>
              <CardDescription>Manage which campaigns appear in the featured section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredCampaigns.map((campaign) => (
                  <Card key={campaign.id} className={`border-l-4 ${campaign.isFeatured ? 'border-l-yellow-500' : 'border-l-gray-300'}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{campaign.title}</h4>
                            {campaign.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{campaign.charity}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Raised: {campaign.currentAmount}</span>
                            <span>Target: {campaign.targetAmount}</span>
                            {campaign.featuredDate && (
                              <span className="text-muted-foreground">Featured: {campaign.featuredDate}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Switch checked={campaign.isFeatured} />
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
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

export default ContentManagement;
