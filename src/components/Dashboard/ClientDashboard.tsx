// components/Dashboard/ClientDashboard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { favoritesAPI, authAPI } from '@/services/api';
import { 
  Heart, 
  Star, 
  MessageSquare, 
  Eye, 
  Building,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';

const ClientDashboard = () => {
  const { data: favoritesData } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesAPI.getAll({ limit: 4 }),
    select: (response) => response.data.data,
  });

  const { data: userData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => authAPI.getProfile(),
    select: (response) => response.data.data,
  });

  const stats = [
    {
      name: 'Favorite Properties',
      value: favoritesData?.length || 0,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      name: 'Properties Viewed',
      value: userData?._count?.propertiesPosted || 0,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'My Reviews',
      value: userData?._count?.ratings || 0,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Complaints Filed',
      value: userData?._count?.complaints || 0,
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back!
        </h1>
        <p className="text-indigo-100">
          Ready to find your perfect property? Here's what's happening today.
        </p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Favorites */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Favorites</h2>
            <Link 
              href="/dashboard/favorites"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          {favoritesData && favoritesData.length > 0 ? (
            <div className="space-y-4">
              {favoritesData.slice(0, 4).map((favorite: any) => (
                <div key={favorite.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                    {favorite.property?.imageUrls?.[0] && (
                      <img 
                        src={favorite.property.imageUrls[0]} 
                        alt={favorite.property.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {favorite.property?.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {favorite.property?.city}, {favorite.property?.state}
                    </p>
                    <p className="text-sm font-semibold text-indigo-600">
                      ₦{favorite.property?.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No favorite properties yet</p>
              <Link 
                href="/properties"
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-2 inline-block"
              >
                Browse Properties
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/properties"
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-center"
            >
              <Building className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Browse Properties</span>
            </Link>
            
            <Link 
              href="/dashboard/favorites"
              className="p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors text-center"
            >
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">My Favorites</span>
            </Link>
            
            <Link 
              href="/dashboard/reviews"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors text-center"
            >
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">My Reviews</span>
            </Link>
            
            <Link 
              href="/dashboard/complaints"
              className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-center"
            >
              <MessageSquare className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Complaints</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;