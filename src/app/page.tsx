// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useLandingData } from '../hooks/useProperties';
// import PropertyCard from '../components/Properties/PropertyCard';
// import SearchFilters from '../components/Properties/SearchFilters';
// import { 
//   TrendingUp, 
//   Users, 
//   Building, 
//   Eye,
//   Star,
//   ArrowRight,
//   MapPin
// } from 'lucide-react';
// import { PremiumCarousel } from '@/components/carousel/carousel';
// import { useAllUsers } from '@/hooks/useAdmin';
// import Hero from '@/components/hero/hero';

// const HomePage: React.FC = () => {
//   const [filters, setFilters] = useState({});
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const { data: landingData, isLoading } = useLandingData({
//     ...filters,
//     search: searchQuery,
//     limit: 12,
//   });

//   const {data: usersData} = useAllUsers({});

//   console.log('Users Data:', usersData);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   const { properties, featuredProperties, metrics, pagination } = landingData || {};

//   return (
//     <div className="min-h-screen">

//       <Hero filters={filters} setFilters={setFilters} handleSearch={handleSearch}/>

//       {/* Featured Properties */}
//       {featuredProperties && featuredProperties.length > 0 && (
//         <section className="py-16">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                   Featured Properties
//                 </h2>
//                 <p className="text-gray-600">
//                   Hand-picked properties that offer exceptional value
//                 </p>
//               </div>
//               <Link
//                 href="/properties?isFeatured=true"
//                 className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
//               >
//                 <span>View All</span>
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {featuredProperties.slice(0, 6).map((property: any) => (
//                 <PropertyCard key={property.id} property={property} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Recent Properties */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Latest Properties
//               </h2>
//               <p className="text-gray-600">
//                 Recently added properties in your area
//               </p>
//             </div>
//             <Link
//               href="/properties"
//               className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
//             >
//               <span>View All</span>
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {properties && properties.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {properties.map((property: any) => (
//                 <PropertyCard key={property.id} property={property} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No properties found
//               </h3>
//               <p className="text-gray-600">
//                 Try adjusting your search filters or check back later.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Top Cities */}
//       {metrics?.topCities && metrics.topCities.length > 0 && (
//         <section className="py-16">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//               Popular Cities
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//               {metrics.topCities.map((city: any, index: number) => (
//                 <Link
//                   key={city.city}
//                   href={`/properties?city=${encodeURIComponent(city.city)}`}
//                   className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center border border-gray-200"
//                 >
//                   <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
//                   <h3 className="font-semibold text-gray-900 mb-1">
//                     {city.city}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {city.count} properties
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Platform Stats */}
//        <section className="py-16 bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Ppoint?</h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Join our fast growing set of satisfied users who have found their perfect properties through our platform
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div className="text-center">
//             <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Building className="w-8 h-8 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Verified Properties</h3>
//             <p className="text-muted-foreground">
//               All properties that are lebeled verified by our team are authentic with quality
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-8 h-8 text-emerald-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Trusted Agents</h3>
//             <p className="text-muted-foreground">Work with verified and experienced real estate professionals</p>
//           </div>

//           <div className="text-center">
//             <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Star className="w-8 h-8 text-amber-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Quality Service</h3>
//             <p className="text-muted-foreground">Exceptional customer service and support throughout your journey</p>
//           </div>

//           <div className="text-center">
//             <div className="bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <TrendingUp className="w-8 h-8 text-rose-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Market Insights</h3>
//             <p className="text-muted-foreground">Get access to real-time market data and property analytics</p>
//           </div>
//         </div>
//       </div>
//     </section>
//     </div>
//   );
// };

// export default HomePage;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLandingData } from '../hooks/useProperties';
import PropertyCard from '../components/Properties/PropertyCard';
import { 
  TrendingUp, 
  Users, 
  Building, 
  Eye,
  Star,
  ArrowRight,
  MapPin
} from 'lucide-react';
import Hero from '@/components/hero/hero';

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: landingData, isLoading } = useLandingData({
    ...filters,
    search: searchQuery,
    limit: 8, // Changed to 8 to fit a 4-column layout nicely
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

  const { properties, featuredProperties, metrics } = landingData || {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero filters={filters} setFilters={setFilters} handleSearch={handleSearch}/>

      {/* Featured Properties */}
      {featuredProperties && featuredProperties.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* --- Centered Header --- */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Properties
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Hand-picked properties that offer exceptional value and quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 3).map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {/* --- Centered "View All" Button --- */}
            <div className="mt-12 text-center">
              <Link
                href="/featured?isFeatured=true"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
              >
                View All Featured Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- Centered Header --- */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Latest Properties
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Discover the most recently added properties available for rent or sale.
            </p>
          </div>

          {properties && properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map((property: any) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              {/* --- Centered "View All" Button --- */}
              <div className="mt-12 text-center">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                >
                  Explore All Properties
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </>
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
      </section>

      {/* Top Cities */}
      {metrics?.topCities && metrics.topCities.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Popular Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {metrics.topCities.map((city: any) => (
                <Link
                  key={city.city}
                  href={`/properties?city=${encodeURIComponent(city.city)}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center border border-gray-200"
                >
                  <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {city.city}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {city.count} properties
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Platform Stats */}
       <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Ppoint?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our fast growing set of satisfied users who have found their perfect properties through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Verified Properties</h3>
              <p className="text-muted-foreground">
                All properties that are lebeled verified by our team are authentic with quality
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Trusted Agents</h3>
              <p className="text-muted-foreground">Work with verified and experienced real estate professionals</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quality Service</h3>
              <p className="text-muted-foreground">Exceptional customer service and support throughout your journey</p>
            </div>

            <div className="text-center">
              <div className="bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Market Insights</h3>
              <p className="text-muted-foreground">Get access to real-time market data and property analytics</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;