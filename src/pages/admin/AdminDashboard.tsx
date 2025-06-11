
import React from 'react';
import AdminStatsGrid from '@/components/admin/AdminStatsGrid';
import AdminQuickActions from '@/components/admin/AdminQuickActions';
import AdminRecentActivity from '@/components/admin/AdminRecentActivity';

const AdminDashboard = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ClearCause Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor platform activity and manage verification processes
        </p>
      </div>

      {/* Stats Grid */}
      <AdminStatsGrid />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <AdminQuickActions />

        {/* Recent Activity */}
        <AdminRecentActivity />
      </div>
    </div>
  );
};

export default AdminDashboard;
