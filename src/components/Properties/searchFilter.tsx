// // components/SearchFilters.tsx
// 'use client';

// import { useState } from 'react';

// interface SearchFiltersProps {
//   filters: any;
//   onFiltersChange: (filters: any) => void;
//   onApplyFilters: (filters: any) => void;
// }

// const PROPERTY_TYPES = [
//   'HOUSE', 'APARTMENT', 'SHOP', 'OFFICE', 'LAND', 'WAREHOUSE', 'COMMERCIAL', 'INDUSTRIAL'
// ];

// const LISTING_TYPES = ['FOR_RENT', 'FOR_SALE'];

// export function SearchFilters({ filters, onFiltersChange, onApplyFilters }: SearchFiltersProps) {
//   const [localFilters, setLocalFilters] = useState(filters);

//   const handleFilterChange = (key: string, value: string) => {
//     const newFilters = { ...localFilters, [key]: value };
//     setLocalFilters(newFilters);
//     onFiltersChange(newFilters);
//   };

//   const applyFilters = () => {
//     onApplyFilters(localFilters);
//   };

//   const resetFilters = () => {
//     const resetFilters = {
//       search: '',
//       listingType: '',
//       propertyType: '',
//       city: '',
//       state: '',
//       minPrice: '',
//       maxPrice: '',
//       bedrooms: '',
//       bathrooms: '',
//       sortBy: 'createdAt',
//       sortOrder: 'desc',
//     };
//     setLocalFilters(resetFilters);
//     onFiltersChange(resetFilters);
//     onApplyFilters(resetFilters);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//         <button
//           onClick={resetFilters}
//           className="text-sm text-blue-600 hover:text-blue-700"
//         >
//           Reset
//         </button>
//       </div>

//       <div className="space-y-6">
//         {/* Search */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Search
//           </label>
//           <input
//             type="text"
//             value={localFilters.search}
//             onChange={(e) => handleFilterChange('search', e.target.value)}
//             placeholder="Search properties..."
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Listing Type */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Listing Type
//           </label>
//           <select
//             value={localFilters.listingType}
//             onChange={(e) => handleFilterChange('listingType', e.target.value)}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Types</option>
//             {LISTING_TYPES.map(type => (
//               <option key={type} value={type}>
//                 {type === 'FOR_RENT' ? 'For Rent' : 'For Sale'}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Property Type */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Property Type
//           </label>
//           <select
//             value={localFilters.propertyType}
//             onChange={(e) => handleFilterChange('propertyType', e.target.value)}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Properties</option>
//             {PROPERTY_TYPES.map(type => (
//               <option key={type} value={type}>
//                 {type.charAt(0) + type.slice(1).toLowerCase()}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Location */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               City
//             </label>
//             <input
//               type="text"
//               value={localFilters.city}
//               onChange={(e) => handleFilterChange('city', e.target.value)}
//               placeholder="City"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               State
//             </label>
//             <input
//               type="text"
//               value={localFilters.state}
//               onChange={(e) => handleFilterChange('state', e.target.value)}
//               placeholder="State"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Price Range */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Price Range
//           </label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="number"
//               value={localFilters.minPrice}
//               onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//               placeholder="Min"
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <input
//               type="number"
//               value={localFilters.maxPrice}
//               onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//               placeholder="Max"
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Bedrooms & Bathrooms */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Bedrooms
//             </label>
//             <select
//               value={localFilters.bedrooms}
//               onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Any</option>
//               <option value="1">1+</option>
//               <option value="2">2+</option>
//               <option value="3">3+</option>
//               <option value="4">4+</option>
//               <option value="5">5+</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Bathrooms
//             </label>
//             <select
//               value={localFilters.bathrooms}
//               onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Any</option>
//               <option value="1">1+</option>
//               <option value="2">2+</option>
//               <option value="3">3+</option>
//               <option value="4">4+</option>
//             </select>
//           </div>
//         </div>

//         <button
//           onClick={applyFilters}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// }

// components/SearchFilters.tsx
'use client';

import { useState } from 'react';

interface SearchFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onApplyFilters: (filters: any) => void;
}

const PROPERTY_TYPES = [
  'HOUSE', 'APARTMENT', 'SHOP', 'OFFICE', 'LAND', 'WAREHOUSE', 'COMMERCIAL', 'INDUSTRIAL'
];

const LISTING_TYPES = ['FOR_RENT', 'FOR_SALE'];

export function SearchFilters({ filters, onFiltersChange, onApplyFilters }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: '',
      listingType: '',
      propertyType: '',
      city: '',
      state: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search properties..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Listing Type
          </label>
          <select
            value={localFilters.listingType}
            onChange={(e) => handleFilterChange('listingType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {LISTING_TYPES.map(type => (
              <option key={type} value={type}>
                {type === 'FOR_RENT' ? 'For Rent' : 'For Sale'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={localFilters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Properties</option>
            {PROPERTY_TYPES.map(type => (
              <option key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={localFilters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              placeholder="City"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={localFilters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              placeholder="State"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={localFilters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              placeholder="Min"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={localFilters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              placeholder="Max"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <select
              value={localFilters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms
            </label>
            <select
              value={localFilters.bathrooms}
              onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
