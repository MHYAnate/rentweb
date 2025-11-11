'use client';

import { use } from 'react';
import { useProperty, useSimilarProperties } from '@/hooks/useProperties';
import { PropertyGallery } from '@/components/Properties/propertyGallary';
import { PropertyDetails } from '@/components/Properties/propertyDetails';
import { PropertySidebar } from '@/components/Properties/propertySideBar';
import { SimilarProperties } from '@/components/Properties/similarProperties';
import Link from 'next/link';

export default function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the Promise using React.use()
  const resolvedParams = use(params);
  const propertyId = resolvedParams.id;

  const { data: property, isLoading, error } = useProperty(propertyId);
  const { data: similarProperties } = useSimilarProperties(propertyId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-300 rounded-lg mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
              <div className="h-64 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {`The property you're looking for doesn't exist or has been removed.`}
            
          </p>
          <Link
            href="/properties"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {property.title}
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <p className="text-lg font-semibold text-blue-600">
                  {property.currency} {property.price.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600 ml-1">
                    {property.listingType === 'FOR_RENT' ? '/month' : ''}
                  </span>
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {property.type}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {property.status}
                </span>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              {property.averageRating > 0 && (
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="ml-1 font-semibold">{property.averageRating}</span>
                  <span className="ml-1 text-gray-600">({property.totalRatings} reviews)</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-2 flex items-center">
            📍 {property.address}, {property.city}, {property.state}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery images={property.imageUrls} />
            <PropertyDetails property={property} />

            {property.ratings && property.ratings.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Ratings & Reviews ({property.ratings.length})
                </h3>
                <div className="space-y-6">
                  {property.ratings.map((rating: any) => (
                    <div key={rating.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {rating.client.firstName} {rating.client.lastName}
                          </h4>
                          <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400">
                              {'★'.repeat(rating.rating)}
                              {'☆'.repeat(5 - rating.rating)}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      {rating.comment && (
                        <p className="text-gray-700 mt-2">{rating.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <PropertySidebar property={property} />
          </div>
        </div>

        {similarProperties && similarProperties.length > 0 && (
          <div className="mt-16">
            <SimilarProperties
              properties={similarProperties}
              currentPropertyId={property.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
