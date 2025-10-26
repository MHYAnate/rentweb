'use client';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesAPI } from '@/services/api';
import { useAllPropertiesAdmin, useUpdatePropertyAdmin, useDeletePropertyAdmin } from '@/hooks/useAdmin';
import { Property, PropertyType, PropertyStatus, ListingType } from './types';
import { Search, Filter, Edit, Trash2, Eye, MoreVertical, Plus, Download, Upload, Star, MapPin, Home, Users, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

// Types based on your Prisma schema
interface PropertyTableData {
  id: string;
  title: string;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  price: number;
  currency: string;
  city: string;
  state: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  isFeatured: boolean;
  createdAt: string;
  imageUrls: string[];
  postedBy: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  _count: {
    views: number;
    favorites: number;
    ratings: number;
    complaints: number;
  };
}

interface Filters {
  search: string;
  status: PropertyStatus | '';
  type: PropertyType | '';
  listingType: ListingType | '';
  city: string;
  state: string;
  minPrice: string;
  maxPrice: string;
  isFeatured: string;
  bedrooms: string;
  bathrooms: string;
}

// Property Detail Modal Component
const PropertyDetailModal = ({ property, isOpen, onClose }: { property: PropertyTableData | null; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
              <p className="text-gray-600 mt-1">{property.type} • {property.listingType.replace('_', ' ')}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Images */}
            <div>
              <div className="bg-gray-200 rounded-lg h-64 mb-4 flex items-center justify-center">
                {property.imageUrls && property.imageUrls.length > 0 ? (
                  <img
                    src={property.imageUrls[0]}
                    alt={property.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <Home className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {property.imageUrls?.slice(0, 3).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${property.title} ${index + 1}`}
                    className="h-20 w-full object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {property.currency} {property.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600">Price</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                  property.status === 'RENTED' ? 'bg-blue-100 text-blue-800' :
                  property.status === 'UNDER_MAINTENANCE' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {property.status.replace('_', ' ')}
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.city}, {property.state}
                </div>
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    {property.bedrooms} bed
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {property.bathrooms} bath
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center">
                    <span className="mr-1">📐</span>
                    {property.area} sq ft
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{property._count.views}</div>
                  <div className="text-sm text-gray-600">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{property._count.favorites}</div>
                  <div className="text-sm text-gray-600">Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{property._count.ratings}</div>
                  <div className="text-sm text-gray-600">Ratings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{property._count.complaints}</div>
                  <div className="text-sm text-gray-600">Complaints</div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Posted By</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {property.postedBy.firstName} {property.postedBy.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{property.postedBy.email}</p>
                    <p className="text-sm text-gray-600">{property.postedBy.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created: {new Date(property.createdAt).toLocaleDateString()}
                </div>
                {property.isFeatured && (
                  <div className="flex items-center text-yellow-600">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Featured
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Actions Dropdown
const PropertyActionsDropdown = ({ property, onView, onEdit, onDelete, onToggleFeatured }: {
  property: PropertyTableData;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
            <button
              onClick={() => { onView(); setIsOpen(false); }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </button>
            <button
              onClick={() => { onEdit(); setIsOpen(false); }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Property
            </button>
            <button
              onClick={() => { onToggleFeatured(); setIsOpen(false); }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Star className="w-4 h-4 mr-2" />
              {property.isFeatured ? 'Remove Featured' : 'Mark Featured'}
            </button>
            <div className="border-t my-1"></div>
            <button
              onClick={() => { onDelete(); setIsOpen(false); }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Property
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default function AdminPropertiesPage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: '',
    type: '',
    listingType: '',
    city: '',
    state: '',
    minPrice: '',
    maxPrice: '',
    isFeatured: '',
    bedrooms: '',
    bathrooms: '',
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyTableData | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);

  const queryParams = {
    page,
    limit,
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    ),
  };

  const { data, isLoading, error } = useAllPropertiesAdmin(queryParams);
  const updateMutation = useUpdatePropertyAdmin();
  const deleteMutation = useDeletePropertyAdmin();
  const queryClient = useQueryClient();
  

  console.log('Properties Data:', data);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      type: '',
      listingType: '',
      city: '',
      state: '',
      minPrice: '',
      maxPrice: '',
      isFeatured: '',
      bedrooms: '',
      bathrooms: '',
    });
    setPage(1);
  };

  const handleStatusUpdate = (propertyId: string, newStatus: PropertyStatus) => {
    updateMutation.mutate({
      id: propertyId,
      data: { status: newStatus }
    });
  };

  const handleToggleFeatured = (propertyId: string, currentFeatured: boolean) => {
    updateMutation.mutate({
      id: propertyId,
      data: { isFeatured: !currentFeatured }
    });
  };

  const handleDelete = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteMutation.mutate(propertyId as any);
    }
  };

  const handleBulkDelete = () => {
    if (selectedProperties.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) {
      selectedProperties.forEach(propertyId => {
        deleteMutation.mutate(propertyId as any);
      });
      toast.success(`${selectedProperties.length} properties deleted successfully`);
      setSelectedProperties([]);
    }
  };

  const handleBulkStatusUpdate = (newStatus: PropertyStatus) => {
    if (selectedProperties.length === 0) return;
    
    selectedProperties.forEach(propertyId => {
      updateMutation.mutate({
        id: propertyId,
        data: { status: newStatus }
      });
    });
    toast.success(`Updated status for ${selectedProperties.length} properties`);
    setSelectedProperties([]);
  };

  const handleBulkFeaturedUpdate = (featured: boolean) => {
    if (selectedProperties.length === 0) return;
    
    selectedProperties.forEach(propertyId => {
      updateMutation.mutate({
        id: propertyId,
        data: { isFeatured: featured }
      });
    });
    toast.success(`${featured ? 'Featured' : 'Unfeatured'} ${selectedProperties.length} properties`);
    setSelectedProperties([]);
  };

  const toggleSelectAll = () => {
    if (selectedProperties.length === data?.data.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(data?.data.map((p: PropertyTableData) => p.id) || []);
    }
  };

  const toggleSelectProperty = (propertyId: string) => {
    setSelectedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const viewPropertyDetails = (property: PropertyTableData) => {
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">Error loading properties</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage all properties in the system</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{data?.pagination?.total || 0}</div>
          <div className="text-gray-600">Total Properties</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {data?.data?.filter((p: PropertyTableData) => p.status === 'AVAILABLE').length || 0}
          </div>
          <div className="text-gray-600">Available</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">
            {data?.data?.filter((p: PropertyTableData) => p.isFeatured).length || 0}
          </div>
          <div className="text-gray-600">Featured</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">
            {data?.data?.filter((p: PropertyTableData) => p.status === 'UNDER_MAINTENANCE').length || 0}
          </div>
          <div className="text-gray-600">Under Maintenance</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">All Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="RENTED">Rented</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">All Types</option>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="SHOP">Shop</option>
                <option value="OFFICE">Office</option>
                <option value="LAND">Land</option>
                <option value="WAREHOUSE">Warehouse</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
              <select
                value={filters.listingType}
                onChange={(e) => handleFilterChange('listingType', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">All Listing Types</option>
                <option value="FOR_RENT">For Rent</option>
                <option value="FOR_SALE">For Sale</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
              <select
                value={filters.isFeatured}
                onChange={(e) => handleFilterChange('isFeatured', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">All</option>
                <option value="true">Featured</option>
                <option value="false">Not Featured</option>
              </select>
            </div>

            {/* Additional Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedProperties.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="text-blue-800 font-medium">
              {selectedProperties.length} properties selected
            </div>
            <div className="flex space-x-3">
              <select
                onChange={(e) => handleBulkStatusUpdate(e.target.value as PropertyStatus)}
                className="border border-blue-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Update Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="RENTED">Rented</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
              <select
                onChange={(e) => handleBulkFeaturedUpdate(e.target.value === 'true')}
                className="border border-blue-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Featured Status</option>
                <option value="true">Mark Featured</option>
                <option value="false">Remove Featured</option>
              </select>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Properties Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <div className="mt-2 text-gray-600">Loading properties...</div>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedProperties.length === data?.data.length && data?.data.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.data.map((property: PropertyTableData) => (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProperties.includes(property.id)}
                          onChange={() => toggleSelectProperty(property.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-lg overflow-hidden">
                            {property.imageUrls && property.imageUrls.length > 0 ? (
                              <img
                                src={property.imageUrls[0]}
                                alt={property.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                <Home className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {property.listingType.replace('_', ' ')}
                            </div>
                          </div>
                          {property.isFeatured && (
                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {property.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={property.status}
                          onChange={(e) => handleStatusUpdate(property.id, e.target.value as PropertyStatus)}
                          className={`text-sm px-3 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 transition-colors ${
                            property.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                            property.status === 'RENTED' ? 'bg-blue-100 text-blue-800' :
                            property.status === 'UNDER_MAINTENANCE' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="AVAILABLE">Available</option>
                          <option value="RENTED">Rented</option>
                          <option value="UNDER_MAINTENANCE">Maintenance</option>
                          <option value="UNAVAILABLE">Unavailable</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {property.currency} {property.price.toLocaleString()}
                        </div>
                        {property.bedrooms && property.bathrooms && (
                          <div className="text-sm text-gray-500">
                            {property.bedrooms} bed • {property.bathrooms} bath
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {property.city}, {property.state}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <div title="Views" className="flex flex-col items-center">
                            <span className="text-gray-900 font-medium">{property._count.views}</span>
                            <span className="text-xs">Views</span>
                          </div>
                          <div title="Favorites" className="flex flex-col items-center">
                            <span className="text-gray-900 font-medium">{property._count.favorites}</span>
                            <span className="text-xs">Likes</span>
                          </div>
                          <div title="Ratings" className="flex flex-col items-center">
                            <span className="text-gray-900 font-medium">{property._count.ratings}</span>
                            <span className="text-xs">Ratings</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">
                            {property.postedBy.firstName} {property.postedBy.lastName}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {property.postedBy.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            title="Toggle Featured"
                            onClick={() => handleToggleFeatured(property.id, property.isFeatured)}
                            className={`p-2 rounded-lg transition-colors ${
                              property.isFeatured 
                                ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                                : 'text-gray-400 hover:text-yellow-600 hover:bg-gray-50'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${property.isFeatured ? 'fill-current' : ''}`} />
                          </button>
                          <PropertyActionsDropdown
                            property={property}
                            onView={() => viewPropertyDetails(property)}
                            onEdit={() => {/* Implement edit modal */}}
                            onDelete={() => handleDelete(property.id)}
                            onToggleFeatured={() => handleToggleFeatured(property.id, property.isFeatured)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data?.pagination && (
              <div className="bg-white px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {((data.pagination.page - 1) * data.pagination.limit) + 1} to{' '}
                    {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{' '}
                    {data.pagination.total} properties
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      disabled={data.pagination.page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      {data.pagination.page}
                    </span>
                    <button
                      onClick={() => setPage(prev => prev + 1)}
                      disabled={data.pagination.page >= data.pagination.totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={showPropertyModal}
        onClose={() => setShowPropertyModal(false)}
      />
    </div>
  );
}