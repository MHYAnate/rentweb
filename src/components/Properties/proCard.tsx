'use client';

import Link from 'next/link';
import { useFavoriteStatus, useToggleFavorite } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';
import { Heart } from 'lucide-react';

interface PropertyCardProps {
  property: any;
  showFavoriteButton?: boolean;
}

export function PropertyCard({ property, showFavoriteButton = true }: PropertyCardProps) {
  const { isAuthenticated } = useAuth();
  const { data: favoriteStatus } = useFavoriteStatus(property.id);
  const toggleFavorite = useToggleFavorite();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return;

    toggleFavorite.mutate({
      propertyId: property.id,
      isFavorited: favoriteStatus?.isFavorited || false,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/properties/${property.id}`}>
        <div className="relative">
          <img
            src={property.imageUrls[0] || '/placeholder-property.jpg'}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
              {property.listingType === 'FOR_RENT' ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          {showFavoriteButton && isAuthenticated && (
            <button
              onClick={handleFavoriteClick}
              className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  favoriteStatus?.isFavorited
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600'
                }`}
              />
            </button>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {property.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mt-1 flex items-center">
          📍 {property.city}, {property.state}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-blue-600">
            {property.currency} {property.price.toLocaleString()}
            {property.listingType === 'FOR_RENT' && (
              <span className="text-sm font-normal text-gray-600">/year</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          {property.bedrooms && (
            <span>🛏️ {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          )}
          {property.bathrooms && (
            <span>🚿 {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          )}
          {property.area && (
            <span>📐 {property.area} sq ft</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <span>👁️ {property._count?.views || 0} views</span>
            <span className="mx-2">•</span>
            <span>❤️ {property._count?.favoritedBy || 0}</span>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(property.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
