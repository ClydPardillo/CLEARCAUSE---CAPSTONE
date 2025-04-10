
import React, { useState } from 'react';
import { Bell, Mail, Save, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DonorLayout from '@/components/layout/DonorLayout';

// Sample data - in a real app, this would come from an API
const initialSettings = {
  donations: {
    email: true,
    push: false
  },
  milestones: {
    email: true,
    push: true
  },
  updates: {
    email: false,
    push: true
  },
  suggestions: {
    email: true,
    push: false
  },
  platform: {
    email: false,
    push: false
  }
};

const DonorSettings: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (category: keyof typeof settings, channel: 'email' | 'push', value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the updated settings to an API
    setHasChanges(false);
    // Show success message
  };

  // Notification type components
  const NotificationType = ({ 
    title, 
    description, 
    category, 
    icon 
  }: { 
    title: string, 
    description: string, 
    category: keyof typeof settings,
    icon: React.ReactNode
  }) => {
    return (
      <div className="py-4 border-b last:border-0">
        <div className="flex items-start mb-3">
          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-clearcause-primary/10 text-clearcause-primary mr-3">
            {icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        
        <div className="ml-11 grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <Label htmlFor={`${category}-email`} className="text-sm">Email</Label>
            </div>
            <Switch
              id={`${category}-email`}
              checked={settings[category].email}
              onCheckedChange={(checked) => updateSetting(category, 'email', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-gray-500" />
              <Label htmlFor={`${category}-push`} className="text-sm">Push</Label>
            </div>
            <Switch
              id={`${category}-push`}
              checked={settings[category].push}
              onCheckedChange={(checked) => updateSetting(category, 'push', checked)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DonorLayout title="Notification Settings">
      <form onSubmit={handleSubmit}>
        <Card className="bg-white shadow mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-clearcause-primary" />
              <CardTitle>Manage Your Notifications</CardTitle>
            </div>
            <CardDescription>Control which notifications you receive and how</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationType
              title="Donation Confirmations"
              description="Receive confirmations when your donations are processed"
              category="donations"
              icon={<Bell className="h-4 w-4" />}
            />
            
            <NotificationType
              title="Milestone Updates"
              description="Get updates when campaigns you've supported reach milestones"
              category="milestones"
              icon={<Bell className="h-4 w-4" />}
            />
            
            <NotificationType
              title="Impact Updates"
              description="Receive updates about the impact of campaigns you've supported"
              category="updates"
              icon={<Bell className="h-4 w-4" />}
            />
            
            <NotificationType
              title="Campaign Suggestions"
              description="Get personalized campaign recommendations"
              category="suggestions"
              icon={<Bell className="h-4 w-4" />}
            />
            
            <NotificationType
              title="Platform News"
              description="Stay informed about ClearCause platform updates and features"
              category="platform"
              icon={<Bell className="h-4 w-4" />}
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-clearcause-primary hover:bg-clearcause-secondary"
            disabled={!hasChanges}
          >
            <Save className="h-4 w-4 mr-1.5" />
            Save Preferences
          </Button>
        </div>
      </form>
    </DonorLayout>
  );
};

export default DonorSettings;
