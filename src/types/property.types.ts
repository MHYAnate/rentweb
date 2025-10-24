import { User } from './users.types';
import { Complaint } from './users.types';
// types/property.types.ts

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  SHOP = 'SHOP',
  OFFICE = 'OFFICE',
  LAND = 'LAND',
  WAREHOUSE = 'WAREHOUSE',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL'
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  UNAVAILABLE = 'UNAVAILABLE'
}

export enum ListingType {
  FOR_RENT = 'FOR_RENT',
  FOR_SALE = 'FOR_SALE'
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  yearBuilt?: number;
  imageUrls: string[];
  videoUrls: string[];
  amenities: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  availableFrom?: string;
  postedById: string;
  managedByAgentId?: string;
  postedBy?: User;
  managedByAgent?: User;
  ratings?: Rating[];
  complaints?: Complaint[];
  views?: PropertyView[];
  favoritedBy?: Favorite[];
  _count?: {
    ratings: number;
    views: number;
    favoritedBy: number;
  };
}

export interface PropertyFilters {
  type?: PropertyType;
  listingType?: ListingType;
  status?: PropertyStatus;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  isFeatured?: boolean;
  postedById?: string;
  managedByAgentId?: string;
  search?: string;
  sortBy?: 'price' | 'createdAt' | 'area' | 'views';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PropertyFormData {
  title: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
  status?: PropertyStatus;
  price: number;
  currency?: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  yearBuilt?: number;
  imageUrls?: string[];
  videoUrls?: string[];
  amenities?: string[];
  availableFrom?: string;
  managedByAgentId?: string;
}

export interface PropertyView {
  id: string;
  propertyId: string;
  userId?: string;
  viewedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface Rating {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  propertyId: string;
  clientId: string;
  client?: User;
}

export interface Favorite {
  id: string;
  propertyId: string;
  userId: string;
  createdAt: string;
  property?: Property;
}