// // components/PropertyDetails.tsx
// import {
//   HomeIcon,
//   MapPinIcon,
//   CalendarIcon,
//   ClockIcon,
//   WrenchScrewdriverIcon,
// } from '@heroicons/react/24/outline';

// interface PropertyDetailsProps {
//   property: any;
// }

// export function PropertyDetails({ property }: PropertyDetailsProps) {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const getPropertyTypeLabel = (type: string) => {
//     const typeMap: { [key: string]: string } = {
//       HOUSE: 'House',
//       APARTMENT: 'Apartment',
//       SHOP: 'Shop',
//       OFFICE: 'Office',
//       LAND: 'Land',
//       WAREHOUSE: 'Warehouse',
//       COMMERCIAL: 'Commercial',
//       INDUSTRIAL: 'Industrial',
//     };
//     return typeMap[type] || type;
//   };

//   const getListingTypeLabel = (type: string) => {
//     return type === 'FOR_RENT' ? 'For Rent' : 'For Sale';
//   };

//   const features = [
//     {
//       icon: HomeIcon,
//       label: 'Property Type',
//       value: getPropertyTypeLabel(property.type),
//     },
//     {
//       icon: MapPinIcon,
//       label: 'Listing Type',
//       value: getListingTypeLabel(property.listingType),
//     },
//     ...(property.bedrooms
//       ? [
//           {
//             icon: HomeIcon,
//             label: 'Bedrooms',
//             value: `${property.bedrooms} ${property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`,
//           },
//         ]
//       : []),
//     ...(property.bathrooms
//       ? [
//           {
//             icon: WrenchScrewdriverIcon,
//             label: 'Bathrooms',
//             value: `${property.bathrooms} ${property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}`,
//           },
//         ]
//       : []),
//     ...(property.area
//       ? [
//           {
//             icon: MapPinIcon,
//             label: 'Area',
//             value: `${property.area.toLocaleString()} sq ft`,
//           },
//         ]
//       : []),
//     ...(property.yearBuilt
//       ? [
//           {
//             icon: CalendarIcon,
//             label: 'Year Built',
//             value: property.yearBuilt,
//           },
//         ]
//       : []),
//     {
//       icon: ClockIcon,
//       label: 'Listed',
//       value: formatDate(property.createdAt),
//     },
//     ...(property.availableFrom
//       ? [
//           {
//             icon: CalendarIcon,
//             label: 'Available From',
//             value: formatDate(property.availableFrom),
//           },
//         ]
//       : []),
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>

//       {/* Description */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
//         <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//           {property.description}
//         </p>
//       </div>

//       {/* Key Features Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {features.map((feature, index) => (
//           <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//             <feature.icon className="h-6 w-6 text-blue-600 flex-shrink-0" />
//             <div>
//               <p className="text-sm text-gray-600">{feature.label}</p>
//               <p className="font-semibold text-gray-900">{feature.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Amenities */}
//       {property.amenities && property.amenities.length > 0 && (
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Features</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//             {property.amenities.map((amenity: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200"
//               >
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-sm text-gray-700">{amenity}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Location Details */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
//         <div className="space-y-2">
//           <p className="text-gray-700">
//             <span className="font-medium">Address:</span> {property.address}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-medium">City:</span> {property.city}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-medium">State:</span> {property.state}
//           </p>
//           {property.zipCode && (
//             <p className="text-gray-700">
//               <span className="font-medium">ZIP Code:</span> {property.zipCode}
//             </p>
//           )}
//           {property.latitude && property.longitude && (
//             <p className="text-gray-700">
//               <span className="font-medium">Coordinates:</span>{' '}
//               {property.latitude.toFixed(6)}, {property.longitude.toFixed(6)}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Video Links */}
//       {property.videoUrls && property.videoUrls.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Videos</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {property.videoUrls.map((videoUrl: string, index: number) => (
//               <div key={index} className="bg-gray-100 rounded-lg p-4">
//                 <a
//                   href={videoUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
//                 >
//                   <span>🎬</span>
//                   {index &&  <span>Watch Video {index + 1}</span>}
                 
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// components/PropertyDetails.tsx
'use client';

import {
  HomeIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

interface PropertyDetailsProps {
  property: any;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPropertyTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      HOUSE: 'House',
      APARTMENT: 'Apartment',
      SHOP: 'Shop',
      OFFICE: 'Office',
      LAND: 'Land',
      WAREHOUSE: 'Warehouse',
      COMMERCIAL: 'Commercial',
      INDUSTRIAL: 'Industrial',
    };
    return typeMap[type] || type;
  };

  const getListingTypeLabel = (type: string) => {
    return type === 'FOR_RENT' ? 'For Rent' : 'For Sale';
  };

  const features = [
    {
      icon: HomeIcon,
      label: 'Property Type',
      value: getPropertyTypeLabel(property.type),
    },
    {
      icon: MapPinIcon,
      label: 'Listing Type',
      value: getListingTypeLabel(property.listingType),
    },
    ...(property.bedrooms
      ? [
          {
            icon: HomeIcon,
            label: 'Bedrooms',
            value: `${property.bedrooms} ${property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`,
          },
        ]
      : []),
    ...(property.bathrooms
      ? [
          {
            icon: WrenchScrewdriverIcon,
            label: 'Bathrooms',
            value: `${property.bathrooms} ${property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}`,
          },
        ]
      : []),
    ...(property.area
      ? [
          {
            icon: MapPinIcon,
            label: 'Area',
            value: `${property.area.toLocaleString()} sq ft`,
          },
        ]
      : []),
    ...(property.yearBuilt
      ? [
          {
            icon: CalendarIcon,
            label: 'Year Built',
            value: property.yearBuilt,
          },
        ]
      : []),
    {
      icon: ClockIcon,
      label: 'Listed',
      value: formatDate(property.createdAt),
    },
    ...(property.availableFrom
      ? [
          {
            icon: CalendarIcon,
            label: 'Available From',
            value: formatDate(property.availableFrom),
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {property.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <feature.icon className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">{feature.label}</p>
              <p className="font-semibold text-gray-900">{feature.value}</p>
            </div>
          </div>
        ))}
      </div>

      {property.amenities && property.amenities.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {property.amenities.map((amenity: string, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Address:</span> {property.address}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">City:</span> {property.city}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">State:</span> {property.state}
          </p>
          {property.zipCode && (
            <p className="text-gray-700">
              <span className="font-medium">ZIP Code:</span> {property.zipCode}
            </p>
          )}
          {property.latitude && property.longitude && (
            <p className="text-gray-700">
              <span className="font-medium">Coordinates:</span>{' '}
              {property.latitude.toFixed(6)}, {property.longitude.toFixed(6)}
            </p>
          )}
        </div>
      </div>

      {property.videoUrls && property.videoUrls.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.videoUrls.map((videoUrl: string, index: number) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
                >
                  <span>🎬</span>
                  <span>Watch Video {index + 1}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
