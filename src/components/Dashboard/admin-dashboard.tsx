// "use client"


// // components/Dashboard.tsx
// import React from 'react';
// import { useDashboardStats } from '@/hooks/useAdmin';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Users,
//   Home,
//   ShieldAlert,
//   MessageSquare,
//   Star,
//   Eye,
//   TrendingUp,
//   CheckCircle,
//   XCircle,
//   LucideIcon,
// } from 'lucide-react';
// import { PieChartComponent } from '../chart/chart1';
// import LineGraphComponent from '../chart/line-chart';

// interface StatCardProps {
//   title: string;
//   value: number;
//   icon: LucideIcon;
//   description: string;
//   trend: 'up' | 'down' | 'neutral';
//   alert?: boolean;
// }

// const StatCard: React.FC<StatCardProps> = ({ 
//   title, 
//   value, 
//   icon: Icon, 
//   description, 
//   trend, 
//   alert = false 
// }) => {
//   const trendColors = {
//     up: 'text-green-600',
//     down: 'text-red-600',
//     neutral: 'text-gray-600'
//   };

//   const bgColors = {
//     up: 'bg-green-50',
//     down: 'bg-red-50',
//     neutral: 'bg-gray-50'
//   };

//   return (
//     <Card className={alert ? 'border-red-200' : ''}>
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">{title}</p>
//             <p className="text-2xl font-bold mt-1">{value}</p>
//             <p className={`text-sm mt-1 ${alert ? 'text-red-600' : 'text-gray-500'}`}>
//               {description}
//             </p>
//           </div>
//           <div className={`p-3 rounded-full ${bgColors[trend]}`}>
//             <Icon className={`h-6 w-6 ${alert ? 'text-red-600' : trendColors[trend]}`} />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// interface EngagementItemProps {
//   icon: LucideIcon;
//   label: string;
//   value: number;
// }

// const EngagementItem: React.FC<EngagementItemProps> = ({ icon: Icon, label, value }) => (
//   <div className="flex items-center justify-between">
//     <div className="flex items-center gap-3">
//       <div className="p-2 bg-blue-50 rounded-lg">
//         <Icon className="h-4 w-4 text-blue-600" />
//       </div>
//       <span className="text-sm font-medium text-gray-700">{label}</span>
//     </div>
//     <span className="font-semibold">{value}</span>
//   </div>
// );

// const Dashboard: React.FC = () => {
//   const { data, isLoading, error } = useDashboardStats();

//   console.log('Admin Dashboard Data:', data);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center text-red-600">
//           <XCircle className="h-12 w-12 mx-auto mb-4" />
//           <p>Error loading dashboard: {error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center text-gray-600">
//           <p>No data available</p>
//         </div>
//       </div>
//     );
//   }

//   const {
//     userMetrics,
//     propertyMetrics,
//     systemHealth,
//     engagement,
//     recentActivity,
//     analytics
//   } = data.data;

//   console.log('User Metrics:', userMetrics);
//   console.log('Property Metrics:', propertyMetrics);
//   console.log('System Health:', systemHealth);
//   console.log('Engagement:', engagement);
//   console.log('Recent Activity:', recentActivity);
//   console.log('Analytics:', analytics);


//   // Pie chart data (user roles)
// const roleChartData = Object.entries(userMetrics.byRole).map(([role, count], idx) => ({
//   title: role,
//   values: count as number,
//   fill: `hsl(var(--chart-${idx + 1}))`, // dynamic colors
// }));

// // Line chart data (registrations over time)
// const registrationData = userMetrics.registrationTrends.map((item: any) => ({
//   month: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//   total_sales: item.count, // reuse LineGraphComponent's expected key
// }));

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
//           <p className="text-gray-600 mt-2">
//             Welcome to your admin dashboard. Here's what's happening with your platform.
//           </p>
//         </div>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Users"
//             value={userMetrics.totalUsers}
//             icon={Users}
//             description={`${userMetrics.newLast30Days} new this month`}
//             trend="up"
//           />
//           <StatCard
//             title="Total Properties"
//             value={propertyMetrics.totalProperties}
//             icon={Home}
//             description={`${propertyMetrics.averagePrice.toLocaleString()} avg price`}
//             trend="up"
//           />
//           <StatCard
//             title="Pending Verifications"
//             value={systemHealth.pendingVerifications}
//             icon={ShieldAlert}
//             description="Requires attention"
//             trend="neutral"
//             alert={systemHealth.pendingVerifications > 0}
//           />
//           <StatCard
//             title="Pending Complaints"
//             value={systemHealth.pendingComplaints}
//             icon={MessageSquare}
//             description="Needs review"
//             trend="neutral"
//             alert={systemHealth.pendingComplaints > 0}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Engagement Metrics */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <TrendingUp className="h-5 w-5" />
//                 Platform Engagement
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <EngagementItem
//                   icon={Star}
//                   label="Total Ratings"
//                   value={engagement.totalRatings}
//                 />
//                 <EngagementItem
//                   icon={Eye}
//                   label="Property Views"
//                   value={engagement.totalViews}
//                 />
//                 <EngagementItem
//                   icon={CheckCircle}
//                   label="Total Favorites"
//                   value={engagement.totalFavorites}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* User Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>User Distribution</CardTitle>
//               <CardDescription>By role and verification status</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-semibold mb-2">By Role</h4>
//                   <div className="space-y-2">
//                     {Object.entries(userMetrics.byRole).map(([role, count]) => (
//                       <div key={role} className="flex justify-between items-center">
//                         <span className="text-sm capitalize text-gray-600">{role.toLowerCase()}</span>
//                         <span className="font-semibold">{count as any}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-2">By Verification</h4>
//                   <div className="space-y-2">
//                     {Object.entries(userMetrics.byVerificationStatus).map(([status, count]) => (
//                       <div key={status} className="flex justify-between items-center">
//                         <span className="text-sm capitalize text-gray-600">{status.toLowerCase()}</span>
//                         <span className="font-semibold">{count as any}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Property Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Property Distribution</CardTitle>
//               <CardDescription>By status, type, and listing type</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-semibold mb-2">By Status</h4>
//                   <div className="space-y-2">
//                     {Object.entries(propertyMetrics.byStatus).map(([status, count]) => (
//                       <div key={status} className="flex justify-between items-center">
//                         <span className="text-sm capitalize text-gray-600">{status.toLowerCase().replace('_', ' ')}</span>
//                         <span className="font-semibold">{count as any}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-2">By Listing Type</h4>
//                   <div className="space-y-2">
//                     {Object.entries(propertyMetrics.byListingType).map(([type, count]) => (
//                       <div key={type} className="flex justify-between items-center">
//                         <span className="text-sm capitalize text-gray-600">{type.toLowerCase().replace('_', ' ')}</span>
//                         <span className="font-semibold">{count as any}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activity */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Recent Users */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="h-5 w-5" />
//                 Recent Users
//               </CardTitle>
//               <CardDescription>Latest registered users</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentActivity.recentUsers.map((user:any) => (
//                   <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                         <Users className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="font-semibold">{user.firstName} {user.lastName}</p>
//                         <p className="text-sm text-gray-600 capitalize">{user.role.toLowerCase()} • {user.verificationStatus.toLowerCase()}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
//                       <p className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleTimeString()}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//   {/* User Role Distribution Pie Chart */}
//   <PieChartComponent
//     chartData={roleChartData}
//     title="Users"
//     value={userMetrics.totalUsers}
//   />

//   {/* Registration Trends Line Chart */}
//   <LineGraphComponent data={registrationData} />
// </div>


//           {/* Recent Properties */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Home className="h-5 w-5" />
//                 Recent Properties
//               </CardTitle>
//               <CardDescription>Latest added properties</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentActivity.recentProperties.map((property:any) => (
//                   <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                         <Home className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="font-semibold">{property.title}</p>
//                         <p className="text-sm text-gray-600 capitalize">
//                           {property.type.toLowerCase()} • {property.listingType.toLowerCase().replace('_', ' ')}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold">₦{property.price.toLocaleString()}</p>
//                       <p className="text-xs text-gray-500">{property.location}</p>
//                     </div>
//                   </div>
//                 ))}
//                 {recentActivity.recentProperties.length === 0 && (
//                   <div className="text-center text-gray-500 py-8">
//                     <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
//                     <p>No recent properties</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* User Table */}
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>All Users</CardTitle>
//             <CardDescription>Complete user list with details</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-3 px-4">User</th>
//                     <th className="text-left py-3 px-4">Contact</th>
//                     <th className="text-left py-3 px-4">Role</th>
//                     <th className="text-left py-3 px-4">Status</th>
//                     <th className="text-left py-3 px-4">Properties</th>
//                     <th className="text-left py-3 px-4">Join Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userMetrics.userTableData.map((user:any) => (
//                     <tr key={user.id} className="border-b hover:bg-gray-50">
//                       <td className="py-3 px-4">
//                         <div>
//                           <p className="font-semibold">{user.name}</p>
//                           <p className="text-sm text-gray-600">{user.email}</p>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <p className="text-sm">{user.phone}</p>
//                       </td>
//                       <td className="py-3 px-4">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
//                           user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
//                           user.role === 'AGENT' ? 'bg-blue-100 text-blue-800' :
//                           user.role === 'LANDLORD' ? 'bg-green-100 text-green-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {user.role.toLowerCase()}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
//                           user.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' :
//                           user.verificationStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
//                           user.verificationStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {user.verificationStatus.toLowerCase()}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex gap-4 text-sm">
//                           <span>Posted: {user.propertiesCount}</span>
//                           <span>Favorites: {user.favoritesCount}</span>
//                           <span>Reviews: {user.reviewsCount}</span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <p className="text-sm text-gray-600">
//                           {new Date(user.joinDate).toLocaleDateString()}
//                         </p>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Property Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>All Properties</CardTitle>
//             <CardDescription>Complete property list with details</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-3 px-4">Property</th>
//                     <th className="text-left py-3 px-4">Type</th>
//                     <th className="text-left py-3 px-4">Price</th>
//                     <th className="text-left py-3 px-4">Location</th>
//                     <th className="text-left py-3 px-4">Posted By</th>
//                     <th className="text-left py-3 px-4">Engagement</th>
//                     <th className="text-left py-3 px-4">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {propertyMetrics.propertyTableData.map((property:any) => (
//                     <tr key={property.id} className="border-b hover:bg-gray-50">
//                       <td className="py-3 px-4">
//                         <div>
//                           <p className="font-semibold">{property.title}</p>
//                           <p className="text-sm text-gray-600">
//                             {new Date(property.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div>
//                           <span className="capitalize">{property.type.toLowerCase()}</span>
//                           <p className="text-sm text-gray-600 capitalize">
//                             {property.listingType.toLowerCase().replace('_', ' ')}
//                           </p>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <p className="font-semibold">₦{property.price.toLocaleString()}</p>
//                       </td>
//                       <td className="py-3 px-4">
//                         <p className="text-sm">{property.location}</p>
//                       </td>
//                       <td className="py-3 px-4">
//                         <p className="text-sm">{property.postedBy}</p>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex gap-3 text-sm">
//                           <span title="Views">👁 {property.views}</span>
//                           <span title="Favorites">⭐ {property.favorites}</span>
//                           <span title="Ratings">📝 {property.ratings}</span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
//                           property.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
//                           property.status === 'RENTED' ? 'bg-blue-100 text-blue-800' :
//                           property.status === 'UNAVAILABLE' ? 'bg-red-100 text-red-800' :
//                           'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {property.status.toLowerCase().replace('_', ' ')}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                   {propertyMetrics.propertyTableData.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="py-8 text-center text-gray-500">
//                         <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
//                         <p>No properties found</p>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

"use client";

import React from 'react';
import { useDashboardStats } from '@/hooks/useAdmin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  Home,
  ShieldAlert,
  MessageSquare,
  Star,
  Eye,
  TrendingUp,
  CheckCircle,
  XCircle,
  LucideIcon,
} from 'lucide-react';
import { PieChartComponent } from '../chart/chart1';
import LineGraphComponent from '../chart/line-chart';
import { PropertyTypeBarComponent } from '../ui/bar';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  alert = false 
}) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const bgColors = {
    up: 'bg-green-50',
    down: 'bg-red-50',
    neutral: 'bg-gray-50'
  };

  return (
    <Card className={alert ? 'border-red-200' : ''}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className={`text-sm mt-1 ${alert ? 'text-red-600' : 'text-gray-500'}`}>
              {description}
            </p>
          </div>
          <div className={`p-3 rounded-full ${bgColors[trend]}`}>
            <Icon className={`h-6 w-6 ${alert ? 'text-red-600' : trendColors[trend]}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EngagementItemProps {
  icon: LucideIcon;
  label: string;
  value: number;
}

const EngagementItem: React.FC<EngagementItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <span className="font-semibold">{value}</span>
  </div>
);

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useDashboardStats();

  console.log('Admin Dashboard Data:', data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <XCircle className="h-12 w-12 mx-auto mb-4" />
          <p>Error loading dashboard: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-gray-600">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const {
    userMetrics,
    propertyMetrics,
    systemHealth,
    engagement,
    recentActivity,
    analytics
  } = data.data;

  console.log('User Metrics:', userMetrics);
  console.log('Property Metrics:', propertyMetrics);
  console.log('System Health:', systemHealth);
  console.log('Engagement:', engagement);
  console.log('Recent Activity:', recentActivity);
  console.log('Analytics:', analytics);

// Role Distribution Pie Chart
const roleChartData = Object.entries(userMetrics.byRole || {}).map(([role, count]) => ({
  title: role.charAt(0) + role.slice(1).toLowerCase(),
  values: count as number,
  fill: role === 'ADMIN' ? '#E879F9' :           // Orchid
        role === 'AGENT' ? '#F97316' :           // Amber Orange
        role === 'LANDLORD' ? '#3B82F6' :        // Royal Blue
        '#64748B'                                // Neutral fallback
}));

// Verification Status Pie Chart
const verificationChartData = Object.entries(userMetrics.byVerificationStatus || {}).map(([status, count]) => ({
  title: status.charAt(0) + status.slice(1).toLowerCase(),
  values: count as number,
  fill: status === 'VERIFIED' ? '#10B981' :      // Emerald Green
        status === 'UNVERIFIED' ? '#F59E0B' :    // Golden Amber
        status === 'PENDING' ? '#8B5CF6' :       // Violet
        '#EF4444'                                // Premium Red fallback
}));



  // Prepare data for registration trends line graph
  const registrationTrendsData = userMetrics.registrationTrends?.map((trend:any) => ({
    month: new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total_sales: trend.count
  })) || [];

    // Prepare data for property growth trends line graph
    const propertyGrowthData = analytics.propertyGrowth
    ?.map((trend:any) => ({
      month: new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total_sales: trend.count
    })) || [];

  // Calculate total verified users for pie chart value
  const totalVerifiedUsers = userMetrics.byVerificationStatus?.VERIFIED || 0;

// Property Status Pie Chart
const propertyByStatusChartData = Object.entries(propertyMetrics?.byStatus || {}).map(([status, count]) => ({
  title: status.charAt(0) + status.slice(1).toLowerCase(),
  values: count as number,
  fill: status === 'AVAILABLE' ? '#2DD4BF' :      // Aquamarine
        status === 'RENTED' ? '#6366F1' :        // Indigo
        status === 'UNDER_MAINTENANCE' ? '#F43F5E' : // Crimson
        status === 'UNAVAILABLE' ? '#FACC15' :   // Gold
        '#94A3B8'                                // Slate fallback
}));

// Property Listing Type Pie Chart
const propertyByListingTypeChartData = Object.entries(propertyMetrics?.byListingType || {}).map(([listinType, count]) => ({
  title: listinType.charAt(0) + listinType.slice(1).toLowerCase(),
  values: count as number,
  fill: listinType === 'FOR_RENT' ? '#0EA5E9' :  // Bright Cyan
        listinType === 'FOR_SALE' ? '#D946EF' :  // Magenta
        '#22C55E'                                // Emerald fallback
}));



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">
            {` Welcome to your admin dashboard. Here's what's happening with your platform.`}
           
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={userMetrics.totalUsers}
            icon={Users}
            description={`${userMetrics.newLast30Days} new this month`}
            trend="up"
          />
          <StatCard
            title="Total Properties"
            value={propertyMetrics.totalProperties}
            icon={Home}
            description={`${propertyMetrics.averagePrice?.toLocaleString() || 0} avg price`}
            trend="up"
          />
          <StatCard
            title="Pending Verifications"
            value={systemHealth.pendingVerifications}
            icon={ShieldAlert}
            description="Requires attention"
            trend="neutral"
            alert={systemHealth.pendingVerifications > 0}
          />
          <StatCard
            title="Pending Complaints"
            value={systemHealth.pendingComplaints}
            icon={MessageSquare}
            description="Needs review"
            trend="neutral"
            alert={systemHealth.pendingComplaints > 0}
          />
        </div>

      
    {/* Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  {/* User Role Distribution Pie Chart */}
  <PieChartComponent
    chartData={roleChartData}
    title="Users by Role"
    value={userMetrics.totalUsers}
  />

  {/* Verification Status Pie Chart */}
  <PieChartComponent
    chartData={verificationChartData}
    title="Verification Status"
    value={userMetrics.totalUsers}
  />

  {/* Registration Trends Line Graph */}
  <LineGraphComponent 
    data={registrationTrendsData} 
    title="Registration Trends"
  />
</div>

<div className='grid grid-cols-1 mb-6'>
  
  <PropertyTypeBarComponent/>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  {/* User Role Distribution Pie Chart */}
  <PieChartComponent
    chartData={propertyByStatusChartData}
    title="Property Status"
    value={4}
  />

  {/* Verification Status Pie Chart */}
  <PieChartComponent
    chartData={propertyByListingTypeChartData}
    title="Property Listing Type"
    value={2}
  />
   <LineGraphComponent 
    data={propertyGrowthData} 
    title="Property Growth Trends"
  />

</div>


        <div className="grid grid-cols-1 mb-6">
          {/* Engagement Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Platform Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <EngagementItem
                  icon={Star}
                  label="Total Ratings"
                  value={engagement.totalRatings}
                />
                <EngagementItem
                  icon={Eye}
                  label="Property Views"
                  value={engagement.totalViews}
                />
                <EngagementItem
                  icon={CheckCircle}
                  label="Total Favorites"
                  value={engagement.totalFavorites}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Users
              </CardTitle>
              <CardDescription>Latest registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.recentUsers?.map((user:any) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-600 capitalize">{user.role.toLowerCase()} • {user.verificationStatus.toLowerCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Recent Properties
              </CardTitle>
              <CardDescription>Latest added properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.recentProperties?.map((property:any) => (
                  <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Home className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{property.title}</p>
                        <p className="text-sm text-gray-600 capitalize">
                          {property.type.toLowerCase()} • {property.listingType.toLowerCase().replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₦{property.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{property.location}</p>
                    </div>
                  </div>
                ))}
                {(!recentActivity.recentProperties || recentActivity.recentProperties.length === 0) && (
                  <div className="text-center text-gray-500 py-8">
                    <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No recent properties</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Complete user list with details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Properties</th>
                    <th className="text-left py-3 px-4">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userMetrics.userTableData?.map((user:any) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm">{user.phone}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'AGENT' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'LANDLORD' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role.toLowerCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          user.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                          user.verificationStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          user.verificationStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.verificationStatus.toLowerCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-4 text-sm">
                          <span>Posted: {user.propertiesCount}</span>
                          <span>Favorites: {user.favoritesCount}</span>
                          <span>Reviews: {user.reviewsCount}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Property Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
            <CardDescription>Complete property list with details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Property</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Location</th>
                    <th className="text-left py-3 px-4">Posted By</th>
                    <th className="text-left py-3 px-4">Engagement</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyMetrics.propertyTableData?.map((property:any) => (
                    <tr key={property.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">{property.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(property.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className="capitalize">{property.type.toLowerCase()}</span>
                          <p className="text-sm text-gray-600 capitalize">
                            {property.listingType.toLowerCase().replace('_', ' ')}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold">₦{property.price.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm">{property.location}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm">{property.postedBy}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3 text-sm">
                          <span title="Views">👁 {property.views}</span>
                          <span title="Favorites">⭐ {property.favorites}</span>
                          <span title="Ratings">📝 {property.ratings}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          property.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                          property.status === 'RENTED' ? 'bg-blue-100 text-blue-800' :
                          property.status === 'UNAVAILABLE' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status.toLowerCase().replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!propertyMetrics.propertyTableData || propertyMetrics.propertyTableData.length === 0) && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500">
                        <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No properties found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;