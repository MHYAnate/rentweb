// 'use client';

// import React, { useState } from 'react';
// import { useProperties } from '@/hooks/useProperties';
// import PropertyCard from '@/components/Properties/PropertyCard';
// import SearchFilters from '@/components/Properties/SearchFilters';
// import { Building, ChevronLeft, ChevronRight } from 'lucide-react';

// const PropertiesPage: React.FC = () => {
//   const [filters, setFilters] = useState({});
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');

//   const { data, isLoading, error } = useProperties({
//     ...filters,
//     search: searchQuery,
//     page: currentPage,
//     limit: 12,
//     sortBy,
//     sortOrder,
//   });

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const handleFiltersChange = (newFilters: any) => {
//     setFilters(newFilters);
//     setCurrentPage(1);
//   };

//   const handleSortChange = (newSortBy: string) => {
//     if (newSortBy === sortBy) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(newSortBy);
//       setSortOrder('desc');
//     }
//     setCurrentPage(1);
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             Error loading properties
//           </h2>
//           <p className="text-gray-600">
//             Please try again later or contact support if the problem persists.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const { properties, pagination } = data?.data || {};

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Properties
//           </h1>
//           <p className="text-gray-600">
//             Discover your perfect property from our extensive collection
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <SearchFilters
//           filters={filters}
//           onFiltersChange={handleFiltersChange}
//           onSearch={handleSearch}
//         />

//         {/* Sort Options */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-gray-600">Sort by:</span>
//             <div className="flex space-x-2">
//               {[
//                 { key: 'createdAt', label: 'Latest' },
//                 { key: 'price', label: 'Price' },
//                 { key: 'title', label: 'Name' },
//               ].map((option) => (
//                 <button
//                   key={option.key}
//                   onClick={() => handleSortChange(option.key)}
//                   className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//                     sortBy === option.key
//                       ? 'bg-indigo-100 text-indigo-800'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {option.label}
//                   {sortBy === option.key && (
//                     <span className="ml-1">
//                       {sortOrder === 'asc' ? '↑' : '↓'}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {pagination && (
//             <div className="text-sm text-gray-600">
//               Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
//               {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
//               {pagination.total} properties
//             </div>
//           )}
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {Array.from({ length: 8 }).map((_, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
//                 <div className="h-48 bg-gray-200"></div>
//                 <div className="p-4">
//                   <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-6 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Properties Grid */}
//         {!isLoading && properties && properties.length > 0 && (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//               {properties.map((property: any) => (
//                 <PropertyCard key={property.id} property={property} />
//               ))}
//             </div>

//             {/* Pagination */}
//             {pagination && pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   <span>Previous</span>
//                 </button>

//                 <div className="flex space-x-1">
//                   {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (pagination.totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= pagination.totalPages - 2) {
//                       pageNum = pagination.totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`px-3 py-2 text-sm font-medium rounded-lg ${
//                           currentPage === pageNum
//                             ? 'bg-indigo-600 text-white'
//                             : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
//                   disabled={currentPage === pagination.totalPages}
//                   className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <span>Next</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}

//         {/* Empty State */}
//         {!isLoading && (!properties || properties.length === 0) && (
//           <div className="text-center py-12">
//             <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No properties found
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Try adjusting your search filters or check back later for new listings.
//             </p>
//             <button
//               onClick={() => {
//                 setFilters({});
//                 setSearchQuery('');
//                 setCurrentPage(1);
//               }}
//               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertiesPage;

// app/properties/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useProperties, useSearchSuggestions } from '@/hooks/useProperties';
// import { PropertyCard } from '@/components/Properties/proCard';
// import { SearchFilters } from '@/components/Properties/searchFilter';
// // import { Pagination } from '@/components/Properties/Pagination';

// interface SearchParams {
//   page?: string;
//   search?: string;
//   listingType?: string;
//   propertyType?: string;
//   city?: string;
//   state?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   bedrooms?: string;
//   bathrooms?: string;
//   sortBy?: string;
//   sortOrder?: string;
// }

// export default function PropertiesPage({
//   searchParams,
// }: {
//   searchParams: SearchParams;
// }) {
//   const [filters, setFilters] = useState({
//     search: searchParams.search || '',
//     listingType: searchParams.listingType || '',
//     propertyType: searchParams.propertyType || '',
//     city: searchParams.city || '',
//     state: searchParams.state || '',
//     minPrice: searchParams.minPrice || '',
//     maxPrice: searchParams.maxPrice || '',
//     bedrooms: searchParams.bedrooms || '',
//     bathrooms: searchParams.bathrooms || '',
//     sortBy: searchParams.sortBy || 'createdAt',
//     sortOrder: searchParams.sortOrder || 'desc',
//   });

//   const currentPage = parseInt(searchParams.page || '1');

//   const { data, isLoading, error } = useProperties({
//     ...filters,
//     page: currentPage,
//     limit: 12,
//   });

//   const updateFilters = (newFilters: Partial<typeof filters>) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   };

//   const updateURL = (newParams: Record<string, string>) => {
//     const url = new URL(window.location.href);
//     Object.entries(newParams).forEach(([key, value]) => {
//       if (value) {
//         url.searchParams.set(key, value);
//       } else {
//         url.searchParams.delete(key);
//       }
//     });
//     url.searchParams.set('page', '1'); // Reset to page 1 when filters change
//     window.history.pushState({}, '', url.toString());
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Error loading properties
//           </h2>
//           <p className="text-gray-600">
//             Please try refreshing the page or check your connection.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Find Your Perfect Property
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Discover amazing properties for rent and sale
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:w-1/4">
//             <SearchFilters
//               filters={filters}
//               onFiltersChange={updateFilters}
//               onApplyFilters={updateURL}
//             />
//           </div>

//           {/* Properties Grid */}
//           <div className="lg:w-3/4">
//             {/* Results Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {isLoading ? 'Loading...' : `${data?.pagination?.total || 0} Properties Found`}
//                 </h2>
//                 {filters.search && (
//                   <p className="text-gray-600 text-sm mt-1">
//                     Search results for "{filters.search}"
//                   </p>
//                 )}
//               </div>

//               {/* Sort Options */}
//               <select
//                 value={`${filters.sortBy}-${filters.sortOrder}`}
//                 onChange={(e) => {
//                   const [sortBy, sortOrder] = e.target.value.split('-');
//                   updateFilters({ sortBy, sortOrder });
//                   updateURL({ sortBy, sortOrder });
//                 }}
//                 className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="createdAt-desc">Newest First</option>
//                 <option value="createdAt-asc">Oldest First</option>
//                 <option value="price-asc">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//                 <option value="title-asc">Name: A to Z</option>
//                 <option value="title-desc">Name: Z to A</option>
//               </select>
//             </div>

//             {/* Properties Grid */}
//             {isLoading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
//                     <div className="h-48 bg-gray-300 rounded-t-lg"></div>
//                     <div className="p-4 space-y-3">
//                       <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                       <div className="h-3 bg-gray-300 rounded w-1/2"></div>
//                       <div className="h-3 bg-gray-300 rounded w-1/4"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : data?.data && data.data.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {data.data.map((property:any) => (
//                     <PropertyCard key={property.id} property={property} />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {/* {data.pagination && data.pagination.totalPages > 1 && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={currentPage}
//                       totalPages={data.pagination.totalPages}
//                       onPageChange={(page) => {
//                         updateURL({ page: page.toString() });
//                       }}
//                     />
//                   </div>
//                 )} */}
//               </>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 text-6xl mb-4">🏠</div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   No properties found
//                 </h3>
//                 <p className="text-gray-600">
//                   Try adjusting your search filters or search terms.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/properties/page.tsx
'use client';

import { use, useState, useEffect } from 'react';
import { useProperties } from '@/hooks/useProperties';
import { PropertyCard } from '@/components/Properties/proCard';
import { SearchFilters } from '@/components/Properties/searchFilter';

interface SearchParams {
  page?: string;
  search?: string;
  listingType?: string;
  propertyType?: string;
  city?: string;
  state?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  sortBy?: string;
  sortOrder?: string;
}

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Unwrap the Promise using React.use()
  const resolvedSearchParams = use(searchParams);

  const [filters, setFilters] = useState({
    search: resolvedSearchParams.search || '',
    listingType: resolvedSearchParams.listingType || '',
    propertyType: resolvedSearchParams.propertyType || '',
    city: resolvedSearchParams.city || '',
    state: resolvedSearchParams.state || '',
    minPrice: resolvedSearchParams.minPrice || '',
    maxPrice: resolvedSearchParams.maxPrice || '',
    bedrooms: resolvedSearchParams.bedrooms || '',
    bathrooms: resolvedSearchParams.bathrooms || '',
    sortBy: resolvedSearchParams.sortBy || 'createdAt',
    sortOrder: resolvedSearchParams.sortOrder || 'desc',
  });

  const currentPage = parseInt(resolvedSearchParams.page || '1');

  const { data, isLoading, error } = useProperties({
    ...filters,
    page: currentPage,
    limit: 12,
  });

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updateURL = (newParams: Record<string, string>) => {
    const url = new URL(window.location.href);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    url.searchParams.set('page', '1');
    window.history.pushState({}, '', url.toString());
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error loading properties
          </h2>
          <p className="text-gray-600">
            Please try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Your Perfect Property
          </h1>
          <p className="text-gray-600 mt-2">
            Discover amazing properties for rent and sale
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <SearchFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onApplyFilters={updateURL}
            />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {isLoading ? 'Loading...' : `${data?.pagination?.total || 0} Properties Found`}
                </h2>
                {filters.search && (
                  <p className="text-gray-600 text-sm mt-1">
                    Search results for "{filters.search}"
                  </p>
                )}
              </div>

              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  updateFilters({ sortBy, sortOrder });
                  updateURL({ sortBy, sortOrder });
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Name: A to Z</option>
                <option value="title-desc">Name: Z to A</option>
              </select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : data?.data && data.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.data.map((property: any) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
