'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI, landingAPI } from '../../services/api';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import {
  Building,
  TrendingUp,
  Users,
  Heart,
  Eye,
  Star,
  MessageSquare,
  Calendar,
  DollarSign,
  Home,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Award,
  Target,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import PropertyCard from '../../components/Properties/PropertyCard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const { data: userStats, isLoading: userStatsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => authAPI.getUserProperties({ limit: 5 }),
    select: (response) => response.data,
  });

  const { data: landingData, isLoading: landingLoading } = useQuery({
    queryKey: ['dashboardLanding'],
    queryFn: () => landingAPI.getLandingData({ limit: 6 }),
    select: (response) => response.data.data,
  });

  const renderUserSpecificCards = () => {
    switch (user?.role) {
      case 'LANDLORD':
      case 'AGENT':
        return (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user._count?.propertiesPosted || 0}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% this month</span>
                  </div>
                </div>
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Building className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userStats?.data?.reduce((sum: number, p: any) => sum + (p._count?.views || 0), 0) || 0}
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8.2% this week</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userStats?.data?.reduce((sum: number, p: any) => sum + (p._count?.favoritedBy || 0), 0) || 0}
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-pink-500 mr-1" />
                    <span className="text-sm text-pink-600">+15% this month</span>
                  </div>
                </div>
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">Based on {user._count?.ratings || 0} reviews</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </>
        );

      case 'CLIENT':
        return (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user._count?.favorites || 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Properties in your wishlist</p>
                </div>
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reviews Written</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user._count?.ratings || 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Your property reviews</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Properties Viewed</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-sm text-gray-500 mt-1">This month</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Search Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-500 mt-1">Active property alerts</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderQuickActions = () => {
    switch (user?.role) {
      case 'LANDLORD':
      case 'AGENT':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/dashboard/propertiess/create"
              className="flex items-center p-4 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <div className="p-2 bg-indigo-600 rounded-lg mr-3">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-indigo-900">Add Property</p>
                <p className="text-sm text-indigo-600">List new property</p>
              </div>
            </Link>

            <Link
              href="/dashboard/properties"
              className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
            >
              <div className="p-2 bg-green-600 rounded-lg mr-3">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-900">Manage Properties</p>
                <p className="text-sm text-green-600">View all listings</p>
              </div>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <div className="p-2 bg-purple-600 rounded-lg mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-purple-900">View Analytics</p>
                <p className="text-sm text-purple-600">Performance insights</p>
              </div>
            </Link>

            <Link
              href="/dashboard/verification"
              className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors"
            >
              <div className="p-2 bg-yellow-600 rounded-lg mr-3">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-yellow-900">Verification</p>
                <p className="text-sm text-yellow-600">Verify your account</p>
              </div>
            </Link>
          </div>
        );

      case 'CLIENT':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/properties"
              className="flex items-center p-4 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <div className="p-2 bg-indigo-600 rounded-lg mr-3">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-indigo-900">Browse Properties</p>
                <p className="text-sm text-indigo-600">Find your dream home</p>
              </div>
            </Link>

            <Link
              href="/dashboard/favorites"
              className="flex items-center p-4 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors"
            >
              <div className="p-2 bg-pink-600 rounded-lg mr-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-pink-900">Saved Properties</p>
                <p className="text-sm text-pink-600">View favorites</p>
              </div>
            </Link>

            <Link
              href="/dashboard/reviews"
              className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="p-2 bg-blue-600 rounded-lg mr-3">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-blue-900">My Reviews</p>
                <p className="text-sm text-blue-600">Reviews & ratings</p>
              </div>
            </Link>

            <Link
              href="/dashboard/alerts"
              className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
            >
              <div className="p-2 bg-green-600 rounded-lg mr-3">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-900">Search Alerts</p>
                <p className="text-sm text-green-600">Manage notifications</p>
              </div>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.firstName}!`}
      subtitle="Here's what's happening with your properties today."
    >
      <div className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderUserSpecificCards()}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          {renderQuickActions()}
        </div>

        {/* Recent Activity & Properties */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Eye className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New property view</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Heart className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Property added to favorites</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New inquiry received</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New review posted</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Properties or Featured Properties */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user?.role === 'CLIENT' ? 'Featured Properties' : 'Your Recent Properties'}
                </h3>
                <Link
                  href={user?.role === 'CLIENT' ? '/properties' : '/dashboard/properties'}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>

              {userStatsLoading || landingLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(user?.role === 'CLIENT' ? landingData?.featuredProperties : userStats?.data)
                    ?.slice(0, 3)
                    ?.map((property: any) => (
                      <div key={property.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-16 h-16">
                          {property.imageUrls?.[0] ? (
                            <img
                              src={property.imageUrls[0]}
                              alt={property.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <Building className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {property.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {property.city}, {property.state}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {property._count?.views || 0}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {property._count?.favoritedBy || 0}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ₦{property.price?.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {property.listingType === 'FOR_RENT' ? '/month' : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Chart (for Landlords/Agents) */}
        {['LANDLORD', 'AGENT'].includes(user?.role) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md">
                  7 days
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                  30 days
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                  90 days
                </button>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Performance chart will be displayed here</p>
                <p className="text-sm text-gray-400">Connect analytics service to view data</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;