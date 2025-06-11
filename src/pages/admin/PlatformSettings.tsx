
import React from 'react';
import { Settings, Tag, FileText, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PlatformSettings = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">Manage site configuration and content</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Tag className="h-5 w-5" />
              <span>Campaign Categories</span>
            </CardTitle>
            <CardDescription>Manage available campaign categories</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Category management coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Site Content</span>
            </CardTitle>
            <CardDescription>Edit homepage and general site content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Content management coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformSettings;
