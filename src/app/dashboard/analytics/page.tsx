// components/admin/AnalyticsDashboard.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useDashboardStats } from '@/hooks/useAdmin';


// Chart components (we'll use Chart.js with react-chartjs-2)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useDashboardStats();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'properties' | 'engagement'>('overview');

  // Process and memoize chart data
  const chartData = useMemo(() => {
    if (!dashboardData?.data) return null;

    const { userMetrics, propertyMetrics, engagement, analytics, systemHealth } = dashboardData.data;

    return {
      // User registration trends
      userRegistrationTrends: {
        labels: analytics?.userGrowth?.map((item: any) => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }) || [],
        datasets: [
          {
            label: 'User Registrations',
            data: analytics?.userGrowth?.map((item: any) => item.count) || [],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
          },
        ],
      },

      // Property creation trends
      propertyCreationTrends: {
        labels: analytics?.propertyGrowth?.map((item: any) => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }) || [],
        datasets: [
          {
            label: 'Properties Added',
            data: analytics?.propertyGrowth?.map((item: any) => item.count) || [],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
          },
        ],
      },

      // User role distribution
      userRoleDistribution: {
        labels: Object.keys(userMetrics?.byRole || {}),
        datasets: [
          {
            data: Object.values(userMetrics?.byRole || {}),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(99, 102, 241, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(249, 115, 22, 0.8)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(139, 92, 246)',
              'rgb(99, 102, 241)',
              'rgb(239, 68, 68)',
              'rgb(249, 115, 22)',
            ],
            borderWidth: 2,
          },
        ],
      },

      // Property type distribution
      propertyTypeDistribution: {
        labels: Object.keys(propertyMetrics?.byType || {}),
        datasets: [
          {
            data: Object.values(propertyMetrics?.byType || {}),
            backgroundColor: [
              'rgba(16, 185, 129, 0.8)',
              'rgba(14, 165, 233, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(20, 184, 166, 0.8)',
              'rgba(249, 115, 22, 0.8)',
            ],
            borderColor: [
              'rgb(16, 185, 129)',
              'rgb(14, 165, 233)',
              'rgb(245, 158, 11)',
              'rgb(139, 92, 246)',
              'rgb(236, 72, 153)',
              'rgb(59, 130, 246)',
              'rgb(20, 184, 166)',
              'rgb(249, 115, 22)',
            ],
            borderWidth: 2,
          },
        ],
      },

      // Property status distribution
      propertyStatusDistribution: {
        labels: Object.keys(propertyMetrics?.byStatus || {}),
        datasets: [
          {
            data: Object.values(propertyMetrics?.byStatus || {}),
            backgroundColor: [
              'rgba(16, 185, 129, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(107, 114, 128, 0.8)',
            ],
            borderColor: [
              'rgb(16, 185, 129)',
              'rgb(59, 130, 246)',
              'rgb(245, 158, 11)',
              'rgb(107, 114, 128)',
            ],
            borderWidth: 2,
          },
        ],
      },

      // Engagement metrics
      engagementMetrics: {
        labels: ['Views', 'Favorites', 'Ratings', 'Complaints'],
        datasets: [
          {
            label: 'Engagement Metrics',
            data: [
              engagement?.totalViews || 0,
              engagement?.totalFavorites || 0,
              engagement?.totalRatings || 0,
              systemHealth?.pendingComplaints || 0,
            ],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(236, 72, 153)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 2,
          },
        ],
      },
    };
  }, [dashboardData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load analytics</h3>
          <p className="text-gray-600 mb-4">Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
          <p className="text-gray-600">Analytics data is not available at the moment.</p>
        </div>
      </div>
    );
  }

  const { userMetrics, propertyMetrics, systemHealth, engagement, analytics, recentActivity } = dashboardData.data;

  // Calculate growth percentages
  const userGrowthPercentage = userMetrics?.newLast30Days && userMetrics?.totalUsers 
    ? ((userMetrics.newLast30Days / userMetrics.totalUsers) * 100).toFixed(1)
    : '0';

  const propertyGrowthPercentage = analytics?.propertyGrowth?.length 
    ? ((analytics.propertyGrowth[analytics.propertyGrowth.length - 1]?.count || 0) / propertyMetrics?.totalProperties * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Comprehensive insights into your platform performance
              </p>
            </div>
            <div className="flex space-x-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'users', name: 'Users', icon: '👥' },
                { id: 'properties', name: 'Properties', icon: '🏠' },
                { id: 'engagement', name: 'Engagement', icon: '🔥' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Users */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">👥</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                        <dd className="text-lg font-medium text-gray-900">{userMetrics?.totalUsers || 0}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-green-600">
                      +{userMetrics?.newLast30Days || 0} new ({userGrowthPercentage}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Properties */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🏠</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Properties</dt>
                        <dd className="text-lg font-medium text-gray-900">{propertyMetrics?.totalProperties || 0}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-green-600">
                      +{analytics?.propertyGrowth?.slice(-1)[0]?.count || 0} new ({propertyGrowthPercentage}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Verifications */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">⏳</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Verifications</dt>
                        <dd className="text-lg font-medium text-gray-900">{systemHealth?.pendingVerifications || 0}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">Requires attention</div>
                  </div>
                </div>
              </div>

              {/* Engagement Score */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🔥</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Engagement</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {((engagement?.totalViews || 0) + (engagement?.totalFavorites || 0) + (engagement?.totalRatings || 0)).toLocaleString()}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">Views, Favorites & Ratings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Registration Trends */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Registration Trends</h3>
                <div className="h-80">
                  {chartData?.userRegistrationTrends && (
                    <Line data={chartData.userRegistrationTrends} options={chartOptions} />
                  )}
                </div>
              </div>

              {/* Property Creation Trends */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Creation Trends</h3>
                <div className="h-80">
                  {chartData?.propertyCreationTrends && (
                    <Line data={chartData.propertyCreationTrends} options={chartOptions} />
                  )}
                </div>
              </div>

              {/* User Role Distribution */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Role Distribution</h3>
                <div className="h-80">
                  {chartData?.userRoleDistribution && (
                    <Doughnut data={chartData.userRoleDistribution} options={pieChartOptions} />
                  )}
                </div>
              </div>

              {/* Property Type Distribution */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Type Distribution</h3>
                <div className="h-80">
                  {chartData?.propertyTypeDistribution && (
                    <Pie data={chartData.propertyTypeDistribution} options={pieChartOptions} />
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentActivity?.recentUsers?.slice(0, 5).map((user: any) => (
                    <div key={user.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-sm">
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.role} • {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.verificationStatus === 'VERIFIED' 
                              ? 'bg-green-100 text-green-800'
                              : user.verificationStatus === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.verificationStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Properties */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Properties</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentActivity?.recentProperties?.slice(0, 5).map((property: any) => (
                    <div key={property.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {property.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {property.type} • {property.listingType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {property.location} • ₦{property.price?.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-900">
                            {property.views} views
                          </div>
                          <div className="text-sm text-gray-500">
                            {property.favorites} favorites
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Role Distribution */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Role Distribution</h3>
                <div className="h-80">
                  {chartData?.userRoleDistribution && (
                    <Doughnut data={chartData.userRoleDistribution} options={pieChartOptions} />
                  )}
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Status</h3>
                <div className="space-y-4">
                  {Object.entries(userMetrics?.byVerificationStatus || {}).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{status}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">{count as number}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              status === 'VERIFIED' ? 'bg-green-500' :
                              status === 'PENDING' ? 'bg-yellow-500' :
                              status === 'REJECTED' ? 'bg-red-500' : 'bg-gray-500'
                            }`}
                            style={{
                              width: `${((count as number) / userMetrics.totalUsers) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Engagement Metrics */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{engagement?.totalViews || 0}</div>
                  <div className="text-sm text-gray-500">Total Views</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">{engagement?.totalFavorites || 0}</div>
                  <div className="text-sm text-gray-500">Total Favorites</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{engagement?.totalRatings || 0}</div>
                  <div className="text-sm text-gray-500">Total Ratings</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{systemHealth?.pendingComplaints || 0}</div>
                  <div className="text-sm text-gray-500">Pending Complaints</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Property Type Distribution */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Type Distribution</h3>
                <div className="h-80">
                  {chartData?.propertyTypeDistribution && (
                    <Pie data={chartData.propertyTypeDistribution} options={pieChartOptions} />
                  )}
                </div>
              </div>

              {/* Property Status Distribution */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Status Distribution</h3>
                <div className="h-80">
                  {chartData?.propertyStatusDistribution && (
                    <Doughnut data={chartData.propertyStatusDistribution} options={pieChartOptions} />
                  )}
                </div>
              </div>
            </div>

            {/* Listing Type & Pricing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Listing Type Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(propertyMetrics?.byListingType || {}).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{type.replace('_', ' ')}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">{count as number}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              type === 'FOR_RENT' ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                            style={{
                              width: `${((count as number) / propertyMetrics.totalProperties) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Average Price</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₦{propertyMetrics?.averagePrice?.toLocaleString() || '0'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Properties Value</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₦{(propertyMetrics?.averagePrice * propertyMetrics?.totalProperties).toLocaleString() || '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Properties */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Top Performing Properties</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {analytics?.topProperties?.slice(0, 10).map((property: any, index: number) => (
                  <div key={property.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">
                            {property.type} • {property.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">₦{property.price?.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          {property.views} views • {property.favorites} favorites
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Engagement Tab */}
        {activeTab === 'engagement' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Engagement Metrics */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Metrics</h3>
                <div className="h-80">
                  {chartData?.engagementMetrics && (
                    <Bar data={chartData.engagementMetrics} options={chartOptions} />
                  )}
                </div>
              </div>

              {/* User Activity Heatmap */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Active Users (30 days)</span>
                    <span className="text-lg font-bold text-blue-600">{userMetrics?.newLast30Days || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Properties Viewed</span>
                    <span className="text-lg font-bold text-green-600">{engagement?.totalViews || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Properties Favorited</span>
                    <span className="text-lg font-bold text-pink-600">{engagement?.totalFavorites || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Ratings Submitted</span>
                    <span className="text-lg font-bold text-yellow-600">{engagement?.totalRatings || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Health & Maintenance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{systemHealth?.pendingVerifications || 0}</div>
                  <div className="text-sm text-gray-500">Pending Verifications</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{systemHealth?.pendingComplaints || 0}</div>
                  <div className="text-sm text-gray-500">Pending Complaints</div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(((userMetrics?.totalUsers - (systemHealth?.pendingVerifications || 0)) / userMetrics?.totalUsers) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">Verification Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;