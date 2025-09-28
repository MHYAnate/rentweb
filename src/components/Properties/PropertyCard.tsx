'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
// import { Property } from '../../types';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  Star,
  Calendar,
} from 'lucide-react';
import { useFavoriteStatus, useToggleFavorite } from '../../hooks/useFavorites';
import { useAuth } from '../../contexts/AuthContext';

interface PropertyCardProps {
  property: any;
  showFavoriteButton?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  showFavoriteButton = true,
}) => {
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

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <Link href={`/properties/${property.id}`} className="block">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
            {property.imageUrls && property.imageUrls.length > 0 ? (
            <Image
              src={property.imageUrls[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              unoptimized
            />
            ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Square className="w-12 h-12 text-gray-400" />
            </div>
            )}

          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {property.type.replace('_', ' ')}
            </span>
          </div>

          {/* Listing Type Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                property.listingType === 'FOR_RENT'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {property.listingType === 'FOR_RENT' ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          {/* Favorite Button */}
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

          {/* Featured Badge */}
          {property.isFeatured && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>Featured</span>
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price, property.currency)}
            </span>
            {property.listingType === 'FOR_RENT' && (
              <span className="text-gray-500 text-sm">/month</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {property.city}, {property.state}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3">
            {property.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center space-x-1">
                <Square className="w-4 h-4" />
                <span>{property.area} sqft</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{property._count?.views || 0} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{property._count?.favoritedBy || 0}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(property.createdAt)}</span>
            </div>
          </div>

          {/* Posted By */}
          {property.postedBy && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                {property.postedBy.avatarUrl ? (
                  <img
                    src={property.postedBy.avatarUrl}
                    alt={`${property.postedBy.firstName} ${property.postedBy.lastName}`}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-600">
                      {property.postedBy.firstName?.[0]}
                    </span>
                  </div>
                )}
                <span className="text-xs text-gray-600">
                  {property.postedBy.firstName} {property.postedBy.lastName}
                </span>
              </div>
              <span className="text-xs text-gray-500 capitalize">
                {property.postedBy.role?.toLowerCase()}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;