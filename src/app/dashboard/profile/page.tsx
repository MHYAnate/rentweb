'use client';

import React from 'react';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import UserProfile from '../../../components/Profile/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <DashboardLayout
      title="Profile Settings"
      subtitle="Manage your personal information and account preferences"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <UserProfile />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;