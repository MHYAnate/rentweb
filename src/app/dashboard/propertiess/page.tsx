'use client';

import React, { useState } from 'react';
import { useLandingData } from '@/hooks/useProperties';
import PropertyCard from '@/components/Properties/PropertyCard';
import SearchFilters from '@/components/Properties/SearchFilters';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  Building, 
  Eye,
  Star,
  ArrowRight,
  MapPin
} from 'lucide-react';

const PropertiesPage: React.FC = () => {
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const { data: landingData, isLoading } = useLandingData({
      ...filters,
      search: searchQuery,
      limit: 12,
    });

    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      );
    }
  
    const { properties, featuredProperties, metrics, pagination } = landingData || {};
  
  return (
    <>
        <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>
      </section>
       {/* Recent Properties */}
       <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Latest Properties
                  </h2>
                  <p className="text-gray-600">
                    Recently added properties in your area
                  </p>
                </div>
                <Link
                  href="/properties"
                  className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
    
              {properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {properties.map((property: any) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search filters or check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
    </>
         
  );
};

export default PropertiesPage;