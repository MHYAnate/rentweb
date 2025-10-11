'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import { useFavorites } from '../../../hooks/useFavorites';
import PropertyCard from '../../../components/Properties/PropertyCard';
import { Heart, Filter, Grid2x2 as Grid, List, Search, Calendar } from 'lucide-react';
import Link from 'next/link';

const FavoritesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('createdAt');
  const [filterType, setFilterType] = useState('');

  const { data, isLoading, error } = useFavorites();

  const favorites = data?.data || [];

  const filteredFavorites = favorites.filter((favorite: any) => {
    if (!filterType) return true;
    return favorite.property.type === filterType;
  });

  const sortedFavorites = filteredFavorites.sort((a: any, b: any) => {
    switch (sortBy) {
      case 'price_asc':
        return a.property.price - b.property.price;
      case 'price_desc':
        return b.property.price - a.property.price;
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout
        title="Saved Properties"
        subtitle="Properties you've marked as favorites"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        title="Saved Properties"
        subtitle="Properties you've marked as favorites"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error loading favorites
            </h3>
            <p className="text-gray-600">
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Saved Properties"
      subtitle={`${favorites.length} properties in your favorites`}
      action={
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      }
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search saved properties..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="SHOP">Shop</option>
                <option value="OFFICE">Office</option>
                <option value="LAND">Land</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="createdAt">Recently Added</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Favorites Content */}
        {sortedFavorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {favorites.length === 0 ? 'No saved properties yet' : 'No properties match your filters'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {favorites.length === 0 
                ? 'Start exploring properties and save the ones you love by clicking the heart icon.'
                : 'Try adjusting your search filters to see more results.'
              }
            </p>
            {favorites.length === 0 && (
              <Link
                href="/properties"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Browse Properties
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing {sortedFavorites.length} of {favorites.length} saved properties
              </p>
              <div className="text-sm text-gray-500">
                Last updated {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Properties Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedFavorites.map((favorite: any) => (
                  <div key={favorite.id} className="relative">
                    <PropertyCard property={favorite.property} showFavoriteButton={true} />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        Saved {new Date(favorite.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {sortedFavorites.map((favorite: any) => (
                    <div key={favorite.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-24 h-24">
                          {favorite.property.imageUrls?.[0] ? (
                            <img
                              src={favorite.property.imageUrls[0]}
                              alt={favorite.property.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <Heart className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {favorite.property.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {favorite.property.address}, {favorite.property.city}, {favorite.property.state}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>{favorite.property.type}</span>
                            <span>{favorite.property.bedrooms} beds</span>
                            <span>{favorite.property.bathrooms} baths</span>
                            <span>Saved {new Date(favorite.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ₦{favorite.property.price?.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {favorite.property.listingType === 'FOR_RENT' ? '/month' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FavoritesPage;