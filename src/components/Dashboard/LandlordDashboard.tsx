// components/Dashboard/LandlordDashboard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useUserProperties } from '@/hooks/useProperties';
import { 
  Building, 
  Plus, 
  Eye, 
  Heart, 
  Star,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Users
} from 'lucide-react';

const LandlordDashboard = () => {
  const { data: properties, isLoading } = useUserProperties({ limit: 50 });

  const stats = [
    {
      name: 'Total Properties',
      value: properties?.length || 0,
      icon: Building,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      name: 'Available',
      value: properties?.filter((p: any) => p.status === 'AVAILABLE').length || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Total Views',
      value: properties?.reduce((sum: number, prop: any) => sum + (prop._count?.views || 0), 0) || 0,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Total Favorites',
      value: properties?.reduce((sum: number, prop: any) => sum + (prop._count?.favoritedBy || 0), 0) || 0,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'RENTED': return <Building className="w-4 h-4 text-blue-500" />;
      case 'UNDER_MAINTENANCE': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'UNAVAILABLE': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800';
      case 'RENTED': return 'bg-blue-100 text-blue-800';
      case 'UNDER_MAINTENANCE': return 'bg-yellow-100 text-yellow-800';
      case 'UNAVAILABLE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
          <Link
            href="/dashboard/properties/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </div>
        
        {properties && properties.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {properties.slice(0, 5).map((property: any) => (
              <div key={property.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                    {property.imageUrls?.[0] ? (
                      <img 
                        src={property.imageUrls[0]} 
                        alt={property.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <Building className="w-8 h-8 text-gray-400 m-4" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {property.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {getStatusIcon(property.status)}
                        <span className="ml-1">{property.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {property.address}, {property.city}, {property.state}
                    </p>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {property._count?.views || 0} views
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {property._count?.favoritedBy || 0} favorites
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {property._count?.ratings || 0} reviews
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ₦{property.price?.toLocaleString()}
                      {property.listingType === 'FOR_RENT' && '/month'}
                    </p>
                    <Link 
                      href={`/dashboard/properties/${property.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties listed</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first property</p>
            <Link
              href="/dashboard/properties/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </Link>
          </div>
        )}
        
        {properties && properties.length > 5 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <Link 
              href="/dashboard/my-properties"
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              View all properties →
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          href="/dashboard/properties/create"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
        >
          <Plus className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Add New Property</h3>
          <p className="text-sm text-gray-600">List a new property for rent or sale</p>
        </Link>
        
        <Link 
          href="/dashboard/analytics"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
        >
          <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
          <p className="text-sm text-gray-600">Track your property performance</p>
        </Link>
        
        <Link 
          href="/dashboard/agents"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
        >
          <Users className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Find Agents</h3>
          <p className="text-sm text-gray-600">Connect with professional agents</p>
        </Link>
      </div>
    </div>
  );
};

export default LandlordDashboard;