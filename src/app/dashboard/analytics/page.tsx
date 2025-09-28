'use client';

import React from 'react';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import PropertyAnalytics from '../../../components/Analytics/PropertyAnalytics';

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Analytics Dashboard"
      subtitle="Track your property performance and get actionable insights"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <PropertyAnalytics />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;