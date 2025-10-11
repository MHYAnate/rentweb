// 'use client';

// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../../contexts/AuthContext';
// import { authAPI, landingAPI } from '../../services/api';
// import DashboardLayout from '../../components/Dashboard/DashboardLayout';
// import {
//   Building,
//   TrendingUp,
//   Users,
//   Heart,
//   Eye,
//   Star,
//   MessageSquare,
//   Calendar,
//   DollarSign,
//   Home,
//   Plus,
//   ArrowUpRight,
//   ArrowDownRight,
//   Activity,
//   Clock,
//   Award,
//   Target,
//   BarChart3
// } from 'lucide-react';
// import Link from 'next/link';
// import PropertyCard from '../../components/Properties/PropertyCard';

// const DashboardPage: React.FC = () => {
//   const { user } = useAuth();

//   const { data: userStats, isLoading: userStatsLoading } = useQuery({
//     queryKey: ['userStats'],
//     queryFn: () => authAPI.getUserProperties({ limit: 5 }),
//     select: (response) => response.data,
//   });

//   const { data: landingData, isLoading: landingLoading } = useQuery({
//     queryKey: ['dashboardLanding'],
//     queryFn: () => landingAPI.getLandingData({ limit: 6 }),
//     select: (response) => response.data.data,
//   });

//   const renderUserSpecificCards = () => {
//     switch (user?.role) {
//       case 'LANDLORD':
//       case 'AGENT':
//         return (
//           <>
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Properties</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {user._count?.propertiesPosted || 0}
//                   </p>
//                   <div className="flex items-center mt-1">
//                     <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//                     <span className="text-sm text-green-600">+12% this month</span>
//                   </div>
//                 </div>
//                 <div className="p-3 bg-indigo-100 rounded-xl">
//                   <Building className="w-6 h-6 text-indigo-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Views</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {userStats?.data?.reduce((sum: number, p: any) => sum + (p._count?.views || 0), 0) || 0}
//                   </p>
//                   <div className="flex items-center mt-1">
//                     <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
//                     <span className="text-sm text-green-600">+8.2% this week</span>
//                   </div>
//                 </div>
//                 <div className="p-3 bg-blue-100 rounded-xl">
//                   <Eye className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Favorites</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {userStats?.data?.reduce((sum: number, p: any) => sum + (p._count?.favoritedBy || 0), 0) || 0}
//                   </p>
//                   <div className="flex items-center mt-1">
//                     <ArrowUpRight className="w-4 h-4 text-pink-500 mr-1" />
//                     <span className="text-sm text-pink-600">+15% this month</span>
//                   </div>
//                 </div>
//                 <div className="p-3 bg-pink-100 rounded-xl">
//                   <Heart className="w-6 h-6 text-pink-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Average Rating</p>
//                   <p className="text-2xl font-bold text-gray-900">4.8</p>
//                   <div className="flex items-center mt-1">
//                     <Star className="w-4 h-4 text-yellow-500 mr-1" />
//                     <span className="text-sm text-gray-600">Based on {user._count?.ratings || 0} reviews</span>
//                   </div>
//                 </div>
//                 <div className="p-3 bg-yellow-100 rounded-xl">
//                   <Star className="w-6 h-6 text-yellow-600" />
//                 </div>
//               </div>
//             </div>
//           </>
//         );

//       case 'CLIENT':
//         return (
//           <>
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Saved Properties</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {user._count?.favorites || 0}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">Properties in your wishlist</p>
//                 </div>
//                 <div className="p-3 bg-pink-100 rounded-xl">
//                   <Heart className="w-6 h-6 text-pink-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Reviews Written</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {user._count?.ratings || 0}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">Your property reviews</p>
//                 </div>
//                 <div className="p-3 bg-blue-100 rounded-xl">
//                   <Star className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Properties Viewed</p>
//                   <p className="text-2xl font-bold text-gray-900">24</p>
//                   <p className="text-sm text-gray-500 mt-1">This month</p>
//                 </div>
//                 <div className="p-3 bg-green-100 rounded-xl">
//                   <Eye className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Search Alerts</p>
//                   <p className="text-2xl font-bold text-gray-900">3</p>
//                   <p className="text-sm text-gray-500 mt-1">Active property alerts</p>
//                 </div>
//                 <div className="p-3 bg-purple-100 rounded-xl">
//                   <Activity className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </div>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   const renderQuickActions = () => {
//     switch (user?.role) {
//       case 'LANDLORD':
//       case 'AGENT':
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Link
//               href="/dashboard/propertiess/create"
//               className="flex items-center p-4 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors"
//             >
//               <div className="p-2 bg-indigo-600 rounded-lg mr-3">
//                 <Plus className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-indigo-900">Add Property</p>
//                 <p className="text-sm text-indigo-600">List new property</p>
//               </div>
//             </Link>

//             <Link
//               href="/dashboard/properties"
//               className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
//             >
//               <div className="p-2 bg-green-600 rounded-lg mr-3">
//                 <Building className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-green-900">Manage Properties</p>
//                 <p className="text-sm text-green-600">View all listings</p>
//               </div>
//             </Link>

//             <Link
//               href="/dashboard/analytics"
//               className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
//             >
//               <div className="p-2 bg-purple-600 rounded-lg mr-3">
//                 <BarChart3 className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-purple-900">View Analytics</p>
//                 <p className="text-sm text-purple-600">Performance insights</p>
//               </div>
//             </Link>

//             <Link
//               href="/dashboard/verification"
//               className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors"
//             >
//               <div className="p-2 bg-yellow-600 rounded-lg mr-3">
//                 <Award className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-yellow-900">Verification</p>
//                 <p className="text-sm text-yellow-600">Verify your account</p>
//               </div>
//             </Link>
//           </div>
//         );

//       case 'CLIENT':
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Link
//               href="/properties"
//               className="flex items-center p-4 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors"
//             >
//               <div className="p-2 bg-indigo-600 rounded-lg mr-3">
//                 <Home className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-indigo-900">Browse Properties</p>
//                 <p className="text-sm text-indigo-600">Find your dream home</p>
//               </div>
//             </Link>

//             <Link
//               href="/dashboard/favorites"
//               className="flex items-center p-4 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors"
//             >
//               <div className="p-2 bg-pink-600 rounded-lg mr-3">
//                 <Heart className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-pink-900">Saved Properties</p>
//                 <p className="text-sm text-pink-600">View favorites</p>
//               </div>
//             </Link>

//             <Link
//               href="/dashboard/reviews"
//               className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
//             >
//               <div className="p-2 bg-blue-600 rounded-lg mr-3">
//                 <Star className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-blue-900">My Reviews</p>
//                 <p className="text-sm text-blue-600">Reviews & ratings</p>
//               </div>
//             </Link>

//             <Link
//               href="/dashboard/alerts"
//               className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
//             >
//               <div className="p-2 bg-green-600 rounded-lg mr-3">
//                 <Activity className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-medium text-green-900">Search Alerts</p>
//                 <p className="text-sm text-green-600">Manage notifications</p>
//               </div>
//             </Link>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <DashboardLayout
//       title={`Welcome back, ${user?.firstName}!`}
//       subtitle="Here's what's happening with your properties today."
//     >
//       <div className="px-4 sm:px-6 lg:px-8 space-y-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {renderUserSpecificCards()}
//         </div>

//         {/* Quick Actions */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//           {renderQuickActions()}
//         </div>

//         {/* Recent Activity & Properties */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Recent Activity */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-3">
//                   <div className="p-2 bg-green-100 rounded-lg">
//                     <Eye className="w-4 h-4 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">New property view</p>
//                     <p className="text-xs text-gray-500">2 minutes ago</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <div className="p-2 bg-pink-100 rounded-lg">
//                     <Heart className="w-4 h-4 text-pink-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Property added to favorites</p>
//                     <p className="text-xs text-gray-500">1 hour ago</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <MessageSquare className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">New inquiry received</p>
//                     <p className="text-xs text-gray-500">3 hours ago</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <div className="p-2 bg-yellow-100 rounded-lg">
//                     <Star className="w-4 h-4 text-yellow-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">New review posted</p>
//                     <p className="text-xs text-gray-500">1 day ago</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Recent Properties or Featured Properties */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {user?.role === 'CLIENT' ? 'Featured Properties' : 'Your Recent Properties'}
//                 </h3>
//                 <Link
//                   href={user?.role === 'CLIENT' ? '/properties' : '/dashboard/properties'}
//                   className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
//                 >
//                   View all
//                 </Link>
//               </div>

//               {userStatsLoading || landingLoading ? (
//                 <div className="animate-pulse space-y-4">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i} className="flex space-x-4">
//                       <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"></div>
//                       <div className="flex-1 space-y-2">
//                         <div className="h-4 bg-gray-200 rounded"></div>
//                         <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {(user?.role === 'CLIENT' ? landingData?.featuredProperties : userStats?.data)
//                     ?.slice(0, 3)
//                     ?.map((property: any) => (
//                       <div key={property.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex-shrink-0 w-16 h-16">
//                           {property.imageUrls?.[0] ? (
//                             <img
//                               src={property.imageUrls[0]}
//                               alt={property.title}
//                               className="w-full h-full object-cover rounded-lg"
//                             />
//                           ) : (
//                             <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
//                               <Building className="w-6 h-6 text-gray-400" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900 truncate">
//                             {property.title}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {property.city}, {property.state}
//                           </p>
//                           <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
//                             <span className="flex items-center">
//                               <Eye className="w-3 h-3 mr-1" />
//                               {property._count?.views || 0}
//                             </span>
//                             <span className="flex items-center">
//                               <Heart className="w-3 h-3 mr-1" />
//                               {property._count?.favoritedBy || 0}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-medium text-gray-900">
//                             ₦{property.price?.toLocaleString()}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {property.listingType === 'FOR_RENT' ? '/month' : ''}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Performance Chart (for Landlords/Agents) */}
//         {['LANDLORD', 'AGENT'].includes(user?.role) && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md">
//                   7 days
//                 </button>
//                 <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
//                   30 days
//                 </button>
//                 <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
//                   90 days
//                 </button>
//               </div>
//             </div>
            
//             <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
//               <div className="text-center">
//                 <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-500">Performance chart will be displayed here</p>
//                 <p className="text-sm text-gray-400">Connect analytics service to view data</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DashboardPage;

// components/dashboard/PropertyManagement.tsx
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Building, Plus, Search, CreditCard as Edit3, Trash2, Eye, Heart, MapPin, Calendar, DollarSign, TrendingUp, Users, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useDeleteProperty } from '@/hooks/useProperties';

const PropertyManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const deleteProperty = useDeleteProperty();

  const { data: propertiesData, isLoading, refetch } = useQuery({
    queryKey: ['userProperties'],
    queryFn: () => authAPI.getUserProperties({ limit: 50 }),
    select: (response) => response.data.data,
  });

  const properties = propertiesData?.data || [];

  const filteredProperties = properties.filter((property: any) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || property.status === statusFilter;
    const matchesType = !typeFilter || property.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      await deleteProperty.mutateAsync(propertyId);
      setShowDeleteModal(false);
      setPropertyToDelete(null);
      refetch();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for properties:`, selectedProperties);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'RENTED':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'UNDER_MAINTENANCE':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'UNAVAILABLE':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'RENTED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'UNDER_MAINTENANCE':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'UNAVAILABLE':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage your property listings and track performance</p>
        </div>
        <Link
          href="/dashboard/properties/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Building className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {properties.filter((p: any) => p.status === 'AVAILABLE').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rented</p>
              <p className="text-2xl font-bold text-gray-900">
                {properties.filter((p: any) => p.status === 'RENTED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {properties.reduce((sum: number, p: any) => sum + (p._count?.views || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
              <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="SHOP">Shop</option>
              <option value="OFFICE">Office</option>
              <option value="LAND">Land</option>
            </select>
          </div>
        </div>

        {selectedProperties.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-indigo-50 rounded-lg">
            <span className="text-sm text-indigo-700 font-medium">
              {selectedProperties.length} properties selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                Make Available
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
              >
                Mark Unavailable
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 mb-6">
            {properties.length === 0
              ? "Get started by adding your first property listing"
              : "Try adjusting your search filters"
            }
          </p>
          {properties.length === 0 && (
            <Link
              href="/dashboard/properties/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProperties(filteredProperties.map((p: any) => p.id));
                        } else {
                          setSelectedProperties([]);
                        }
                      }}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property: any) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(property.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProperties([...selectedProperties, property.id]);
                          } else {
                            setSelectedProperties(selectedProperties.filter(id => id !== property.id));
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12">
                          {property.imageUrls?.[0] ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={property.imageUrls[0]}
                              alt={property.title}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Building className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {property.title}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.city}, {property.state}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                        {getStatusIcon(property.status)}
                        <span className="ml-1">{property.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                        {formatPrice(property.price, property.currency)}
                        {property.listingType === 'FOR_RENT' && (
                          <span className="text-gray-500 text-xs ml-1">/month</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {property._count?.views || 0}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {property._count?.favoritedBy || 0}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {property._count?.ratings || 0}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(property.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/properties/${property.id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/dashboard/properties/${property.id}/edit`}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setPropertyToDelete(property.id);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Property</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this property? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => propertyToDelete && handleDeleteProperty(propertyToDelete)}
                  disabled={deleteProperty.isPending}
                  className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {deleteProperty.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
