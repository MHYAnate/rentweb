'use client';

import React from 'react';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import PropertyManagement from '../../../components/Properties/PropertyManagement';

const PropertiesPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Property Management"
      subtitle="Manage your property listings and track performance"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <PropertyManagement />
      </div>
    </DashboardLayout>
  );
};

export default PropertiesPage;