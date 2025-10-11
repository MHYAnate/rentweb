// // components/SimilarProperties.tsx
// import Link from 'next/link';
// import { PropertyCard } from './proCard';

// interface SimilarPropertiesProps {
//   properties: any[];
//   currentPropertyId: string;
// }

// export function SimilarProperties({ properties, currentPropertyId }: SimilarPropertiesProps) {
//   // Filter out the current property and limit to 4 similar properties
//   const similarProperties = properties
//     .filter(property => property.id !== currentPropertyId)
//     .slice(0, 4);

//   if (similarProperties.length === 0) {
//     return null;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>
//         <Link
//           href="/properties"
//           className="text-blue-600 hover:text-blue-700 font-medium"
//         >
//           View All Properties →
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {similarProperties.map((property) => (
//           <PropertyCard key={property.id} property={property} />
//         ))}
//       </div>

//       {similarProperties.length === 0 && (
//         <div className="text-center py-8">
//           <div className="text-gray-400 text-4xl mb-4">🏠</div>
//           <p className="text-gray-600">No similar properties found.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// components/SimilarProperties.tsx
'use client';

import Link from 'next/link';
import { PropertyCard } from './proCard';

interface SimilarPropertiesProps {
  properties: any[];
  currentPropertyId: string;
}

export function SimilarProperties({ properties, currentPropertyId }: SimilarPropertiesProps) {
  const similarProperties = properties
    .filter(property => property.id !== currentPropertyId)
    .slice(0, 4);

  if (similarProperties.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>
        <Link
          href="/properties"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View All Properties →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {similarProperties.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">🏠</div>
          <p className="text-gray-600">No similar properties found.</p>
        </div>
      )}
    </div>
  );
}
