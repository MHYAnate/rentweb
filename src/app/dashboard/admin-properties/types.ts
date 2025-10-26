export type Role = 'CLIENT' | 'LANDLORD' | 'AGENT' | 'ADMIN' | 'SUPER_ADMIN';
export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
export type PropertyType = 'HOUSE' | 'APARTMENT' | 'SHOP' | 'OFFICE' | 'LAND' | 'WAREHOUSE' | 'COMMERCIAL' | 'INDUSTRIAL';
export type PropertyStatus = 'AVAILABLE' | 'RENTED' | 'UNDER_MAINTENANCE' | 'UNAVAILABLE';
export type ListingType = 'FOR_RENT' | 'FOR_SALE';
export type ComplaintStatus = 'PENDING' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';

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
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl?: string;
  role: Role;
  isEmailVerified: boolean;
  verificationStatus: VerificationStatus;
}