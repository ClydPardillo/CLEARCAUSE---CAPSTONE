
import React, { useState } from 'react';
import { Badge, Award, Save, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DonorLayout from '@/components/layout/DonorLayout';

// Sample data - in a real app, this would come from an API
const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  isAnonymous: false,
  badges: [
    { id: "b1", name: "First Donation", icon: "🎖️", description: "Made your first donation" },
    { id: "b2", name: "Regular Giver", icon: "⭐", description: "Donated consistently for 3 months" },
    { id: "b3", name: "Water Advocate", icon: "💧", description: "Supported 3 water-related campaigns" }
  ]
};

const DonorProfile: React.FC = () => {
  const [profile, setProfile] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setIsEditing(false);
    // Show success message
  };
  
  return (
    <DonorLayout title="My Profile">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Information Section */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-500 hover:text-clearcause-primary"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-clearcause-primary border-clearcause-primary"
                  >
                    Change Password
                  </Button>
                </div>
                
                {isEditing && (
                  <div className="pt-4">
                    <Button type="submit" className="bg-clearcause-primary hover:bg-clearcause-secondary">
                      <Save className="h-4 w-4 mr-1.5" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow mt-6">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control how your information is displayed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous-mode" className="text-base">Anonymous Donations</Label>
                  <p className="text-sm text-gray-500">
                    When enabled, your name will not be shown on public donation lists
                  </p>
                </div>
                <Switch
                  id="anonymous-mode"
                  checked={profile.isAnonymous}
                  onCheckedChange={(checked) => setProfile({...profile, isAnonymous: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Badges Section */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Badge className="h-5 w-5 text-clearcause-primary" />
                <CardTitle>Achievements</CardTitle>
              </div>
              <CardDescription>Badges earned through your giving journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center bg-gray-50 p-3 rounded-md">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-clearcause-primary/10 text-clearcause-primary mr-3">
                      <span className="text-xl">{badge.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{badge.name}</h4>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-center bg-gray-50 p-4 rounded-md border-2 border-dashed border-gray-200 mt-4">
                  <div className="text-center">
                    <Award className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Continue donating to earn more badges!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorProfile;
