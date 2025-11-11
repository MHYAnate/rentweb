'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useSearchSuggestions } from '../../hooks/useProperties';

interface SearchFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onSearch: (query: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce the search query for fetching suggestions
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  
  const { data: suggestions } = useSearchSuggestions(debouncedSearchQuery);

  const propertyTypes = [
    { value: 'HOUSE', label: 'House' },
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'SHOP', label: 'Shop' },
    { value: 'OFFICE', label: 'Office' },
    { value: 'LAND', label: 'Land' },
    { value: 'WAREHOUSE', label: 'Warehouse' },
    { value: 'COMMERCIAL', label: 'Commercial' },
    { value: 'INDUSTRIAL', label: 'Industrial' },
  ];

  // --- BUG FIX: Correctly handle suggestion clicks ---
  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'location') {
      const [city, state] = suggestion.value.split(',').map((s: string) => s.trim());
      
      // 1. Update the search bar's text for user feedback
      setSearchQuery(suggestion.value);
      
      // 2. Clear the generic search parameter for the API call
      onSearch(''); 

      // 3. Set the specific location filters for the API call
      onFiltersChange({
        ...filters,
        city: city || undefined,
        state: state || undefined,
      });

    } else if (suggestion.type === 'property') {
      // This remains the same, redirects to property page
      window.location.href = `/properties/${suggestion.value}`;
    }
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // When doing a generic text search, clear specific location filters
    // that might have been set by a suggestion click.
    const { city, state, ...restFilters } = filters;
    onFiltersChange(restFilters);

    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setSearchQuery('');
    onSearch('');
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== '' && value !== null && value !== false
  ).length;

  return (
    <>
      <div className="flex items-center space-x-2 w-full">
        {/* Search Bar with Suggestions */}
        <form onSubmit={handleSearchSubmit} className="relative flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search by city, state, or property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
              className="w-full pl-10 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {showSuggestions && suggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 mt-1">
              {suggestions.map((suggestion: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to fire before onBlur
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{suggestion.label}</div>
                    {suggestion.subtitle && <div className="text-xs text-gray-500">{suggestion.subtitle}</div>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* --- UI Revamp: Advanced Filters Button --- */}
        <button
          onClick={() => setShowAdvancedFilters(true)}
          className="flex-shrink-0 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 h-[46px] text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 relative"
        >
          <Filter className="w-5 h-5" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* --- UI Revamp: Glassmorphism Modal for Filters --- */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out animate-fadeIn">
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-white/30 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-900/10 dark:border-white/10 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advanced Filters</h2>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-2 rounded-full hover:bg-black/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body (Scrollable Filters) */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 overflow-y-auto">
              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Listing Type</label>
                <select value={filters.listingType || ''} onChange={(e) => handleFilterChange('listingType', e.target.value || undefined)} className="w-full bg-white/70 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800/70 dark:border-gray-600 dark:text-white">
                  <option value="">All</option>
                  <option value="FOR_RENT">For Rent</option>
                  <option value="FOR_SALE">For Sale</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property Type</label>
                <select value={filters.propertyType || ''} onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)} className="w-full bg-white/70 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800/70 dark:border-gray-600 dark:text-white">
                  <option value="">All Properties</option>
                  {propertyTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Bedrooms</label>
                <select value={filters.bedrooms || ''} onChange={(e) => handleFilterChange('bedrooms', e.target.value ? Number(e.target.value) : undefined)} className="w-full bg-white/70 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800/70 dark:border-gray-600 dark:text-white">
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5, 6].map((num) => <option key={num} value={num}>{num}+ Bedrooms</option>)}
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Bathrooms</label>
                <select value={filters.bathrooms || ''} onChange={(e) => handleFilterChange('bathrooms', e.target.value ? Number(e.target.value) : undefined)} className="w-full bg-white/70 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800/70 dark:border-gray-600 dark:text-white">
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map((num) => <option key={num} value={num}>{num}+ Bathrooms</option>)}
                </select>
              </div>

              {/* Price Range */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Price</label>
                    <input type="number" placeholder="e.g., 500000" value={filters.minPrice || ''} onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)} className="w-full bg-white/70 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800/70 dark:border-gray-600 dark:text-white"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Price</label>
                    <input type="number" placeholder="e.g., 2000000" value={filters.maxPrice || ''} onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)} className="w-full bg-white/70 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800/70 dark:border-gray-600 dark:text-white"/>
                  </div>
              </div>

              {/* Featured Only Checkbox */}
              <div className="flex items-center justify-center pt-4">
                <input type="checkbox" id="featured" checked={filters.isFeatured || false} onChange={(e) => handleFilterChange('isFeatured', e.target.checked || undefined)} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Featured Only</label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-900/10 dark:border-white/10 flex-shrink-0">
              <button onClick={clearFilters} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400">
                Clear All Filters
              </button>
              <button onClick={() => setShowAdvancedFilters(false)} className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Add these keyframes to your global CSS file (e.g., globals.css) for the animations
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  .animate-scaleUp {
    animation: scaleUp 0.3s ease-in-out;
  }
}
*/

export default SearchFilters;