import { Property } from './property.types';
export enum Role {
  CLIENT = 'CLIENT',
  LANDLORD = 'LANDLORD',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl?: string;
  role: Role;
  isEmailVerified: boolean;
  verificationStatus: VerificationStatus;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  agentProfile?: AgentProfile;
}

export interface AgentProfile {
  id: string;
  userId: string;
  bio?: string;
  experience?: number;
  specialties: string[];
  languages: string[];
  websiteUrl?: string;
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

// types/complaint.types.ts
export enum ComplaintStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}

export interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: ComplaintStatus;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  propertyId?: string;
  property?: Property;
  clientId: string;
  client?: User;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNotes?: string;
}