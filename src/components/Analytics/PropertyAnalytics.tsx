'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  totalFavorites: number;
  totalInquiries: number;
  averageRating: number;
  conversionRate: number;
  viewsGrowth: number;
  favoritesGrowth: number;
  inquiriesGrowth: number;
}

const PropertyAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const analyticsData: AnalyticsData = {
    totalViews: 12847,
    totalFavorites: 1542,
    totalInquiries: 324,
    averageRating: 4.7,
    conversionRate: 2.52,
    viewsGrowth: 18.2,
    favoritesGrowth: 12.8,
    inquiriesGrowth: -3.4,
  };

  const propertyPerformance = [
    {
      id: '1',
      title: 'Luxury Apartment in Victoria Island',
      views: 2341,
      favorites: 89,
      inquiries: 23,
      rating: 4.9,
      conversion: 0.98,
      trend: 'up'
    },
    {
      id: '2',
      title: 'Modern Office Space in Lekki',
      views: 1876,
      favorites: 67,
      inquiries: 18,
      rating: 4.6,
      conversion: 0.96,
      trend: 'up'
    },
    {
      id: '3',
      title: '3-Bedroom House in Ikeja',
      views: 1543,
      favorites: 45,
      inquiries: 12,
      rating: 4.4,
      conversion: 0.78,
      trend: 'down'
    },
  ];

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <>
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{change}%</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">{change}%</span>
              </>
            )}
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your property performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Views"
          value={analyticsData.totalViews.toLocaleString()}
          change={analyticsData.viewsGrowth}
          icon={<Eye className="w-6 h-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Total Favorites"
          value={analyticsData.totalFavorites.toLocaleString()}
          change={analyticsData.favoritesGrowth}
          icon={<Heart className="w-6 h-6 text-pink-600" />}
          color="bg-pink-100"
        />
        <StatCard
          title="Inquiries"
          value={analyticsData.totalInquiries.toLocaleString()}
          change={analyticsData.inquiriesGrowth}
          icon={<MessageCircle className="w-6 h-6 text-green-600" />}
          color="bg-green-100"
        />
        <StatCard
          title="Conversion Rate"
          value={`${analyticsData.conversionRate}%`}
          change={5.2}
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          color="bg-purple-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Property Views</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Last {timeRange} days</span>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-600">Chart visualization would go here</p>
              <p className="text-sm text-gray-500">Views trend over time</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Average Views per Property</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">847</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-pink-100 rounded-lg mr-3">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Favorite Rate</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">12.3%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Inquiry Rate</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">2.5%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Average Rating</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{analyticsData.averageRating}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Avg. Time on Page</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">3:24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Properties */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Properties</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Favorites
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inquiries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {propertyPerformance.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {property.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{property.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{property.favorites}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{property.inquiries}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-900">{property.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{property.conversion}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {property.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Peak Viewing Hours</p>
                <p className="text-sm text-gray-600">Most views occur between 6-9 PM on weekdays</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">High-Converting Content</p>
                <p className="text-sm text-gray-600">Properties with 5+ photos get 40% more inquiries</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Seasonal Trends</p>
                <p className="text-sm text-gray-600">December sees 25% increase in luxury property views</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900">Boost Visibility</span>
              </div>
              <p className="text-sm text-blue-800">
                Add more photos to your listings to increase inquiry rates by up to 40%
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-900">Optimal Timing</span>
              </div>
              <p className="text-sm text-green-800">
                Post new listings on Tuesday evenings for maximum initial exposure
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-900">Content Quality</span>
              </div>
              <p className="text-sm text-purple-800">
                Properties with detailed descriptions get 30% more favorites
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalytics;