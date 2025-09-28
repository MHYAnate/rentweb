'use client';

import React from 'react';
import DashboardLayout from '../../../../components/Dashboard/DashboardLayout';
import PropertyForm from '../../../../components/Properties/PropertyForm';

const CreatePropertyPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Add New Property"
      subtitle="Create a new property listing to attract potential buyers or tenants"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <PropertyForm />
      </div>
    </DashboardLayout>
  );
};

export default CreatePropertyPage;