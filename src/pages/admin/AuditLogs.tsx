
import React from 'react';
import { FileText, Clock, User, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AuditLogs = () => {
  const logs = [
    {
      id: "1",
      action: "Milestone Approved",
      user: "Admin User",
      details: "Clean Water Project - Milestone 2 approved",
      timestamp: "2024-03-15 14:30:00"
    },
    {
      id: "2", 
      action: "Fund Released",
      user: "System",
      details: "₱150,000 released to Water for Life Foundation",
      timestamp: "2024-03-15 14:35:00"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">System activity and administrative actions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Actions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Administrative actions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system and administrative actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 p-3 border rounded">
              <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-muted-foreground">{log.details}</p>
                <p className="text-xs text-muted-foreground">{log.user} • {log.timestamp}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
