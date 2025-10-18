// app/dashboard/page.tsx
'use client';

import React from 'react';
import ClientDashboard from '@/components/Dashboard/ClientDashboard';
import LandlordDashboard from '@/components/Dashboard/LandlordDashboard';
import AgentProfile from '@/components/Agent/AgentProfile';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'CLIENT':
        return <ClientDashboard />;
      case 'LANDLORD':
        return <LandlordDashboard />;
      case 'AGENT':
        return <AgentProfile />;
      case 'ADMIN':
        // return <AdminDashboard />;
        return <div>Admin Dashboard Coming Soon</div>;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
   <> {renderDashboard()}</>
     
   
  );
};

export default DashboardPage;