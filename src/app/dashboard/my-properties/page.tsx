// 'use client';

// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { authAPI } from '@/services/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { Building, Plus, Search, CreditCard as Edit3, Trash2, Eye, Heart, MapPin, Calendar, DollarSign, TrendingUp, Users, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
// import Link from 'next/link';
// import { useDeleteProperty } from '@/hooks/useProperties';

// const PropertyManagement: React.FC = () => {
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
//   const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

//   const deleteProperty = useDeleteProperty();

//   const { data: propertiesData, isLoading, refetch } = useQuery({
//     queryKey: ['userProperties'],
//     queryFn: () => authAPI.getUserProperties({ limit: 50 }),
//     select: (response) => response.data.data,
//   });

//   const properties = propertiesData || [];

//   const filteredProperties = properties.filter((property: any) => {
//     const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          property.address.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = !statusFilter || property.status === statusFilter;
//     const matchesType = !typeFilter || property.type === typeFilter;

//     return matchesSearch && matchesStatus && matchesType;
//   });

//   const handleDeleteProperty = async (propertyId: string) => {
//     try {
//       await deleteProperty.mutateAsync(propertyId);
//       setShowDeleteModal(false);
//       setPropertyToDelete(null);
//       refetch();
//     } catch (error) {
//       console.error('Error deleting property:', error);
//     }
//   };

//   const handleBulkAction = (action: string) => {
//     console.log(`Bulk ${action} for properties:`, selectedProperties);
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'AVAILABLE':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'RENTED':
//         return <Users className="w-4 h-4 text-blue-500" />;
//       case 'UNDER_MAINTENANCE':
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'UNAVAILABLE':
//         return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'AVAILABLE':
//         return 'bg-green-50 text-green-700 border-green-200';
//       case 'RENTED':
//         return 'bg-blue-50 text-blue-700 border-blue-200';
//       case 'UNDER_MAINTENANCE':
//         return 'bg-yellow-50 text-yellow-700 border-yellow-200';
//       case 'UNAVAILABLE':
//         return 'bg-red-50 text-red-700 border-red-200';
//       default:
//         return 'bg-gray-50 text-gray-700 border-gray-200';
//     }
//   };

//   const formatPrice = (price: number, currency: string) => {
//     return new Intl.NumberFormat('en-NG', {
//       style: 'currency',
//       currency: currency || 'NGN',
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-96 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Building, Plus, Search, CreditCard as Edit3, Trash2, Eye, Heart, MapPin, Calendar, DollarSign, TrendingUp, Users, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
// Import the new custom hooks
import { useDeleteProperty, useUserProperties } from '@/hooks/useProperties';

const PropertyManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Use the custom mutation hook for deleting
  const deleteProperty = useDeleteProperty();
  
  // Use the new custom hook to fetch data. It's much cleaner!
  const { data: properties, isLoading } = useUserProperties({ limit: 50 });

  const filteredProperties = (properties || []).filter((property: any) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || property.status === statusFilter;
    const matchesType = !typeFilter || property.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      // The mutateAsync function handles the API call
      await deleteProperty.mutateAsync(propertyId);
      setShowDeleteModal(false);
      setPropertyToDelete(null);
      // No need to call refetch() manually. 
      // The onSuccess callback in useDeleteProperty invalidates the query, triggering an automatic refetch.
    } catch (error) {
      // The onError callback in the hook will show a toast.
      // You can still log the error for debugging.
      console.error('Error deleting property:', error);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for properties:`, selectedProperties);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'RENTED':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'UNDER_MAINTENANCE':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'UNAVAILABLE':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'RENTED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'UNDER_MAINTENANCE':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'UNAVAILABLE':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage your property listings and track performance</p>
        </div>
        {/* <Link
          href="/dashboard/properties/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Building className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {properties.filter((p: any) => p.status === 'AVAILABLE').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rented</p>
              <p className="text-2xl font-bold text-gray-900">
                {properties.filter((p: any) => p.status === 'RENTED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {properties.reduce((sum: number, p: any) => sum + (p._count?.views || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
              <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="SHOP">Shop</option>
              <option value="OFFICE">Office</option>
              <option value="LAND">Land</option>
            </select>
          </div>
        </div>

        {selectedProperties.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-indigo-50 rounded-lg">
            <span className="text-sm text-indigo-700 font-medium">
              {selectedProperties.length} properties selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                Make Available
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
              >
                Mark Unavailable
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 mb-6">
            {properties.length === 0
              ? "Get started by adding your first property listing"
              : "Try adjusting your search filters"
            }
          </p>
          {properties.length === 0 && (
            <Link
              href="/dashboard/properties/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProperties(filteredProperties.map((p: any) => p.id));
                        } else {
                          setSelectedProperties([]);
                        }
                      }}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property: any) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(property.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProperties([...selectedProperties, property.id]);
                          } else {
                            setSelectedProperties(selectedProperties.filter(id => id !== property.id));
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12">
                          {property.imageUrls?.[0] ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={property.imageUrls[0]}
                              alt={property.title}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Building className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {property.title}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.city}, {property.state}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                        {getStatusIcon(property.status)}
                        <span className="ml-1">{property.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                        {formatPrice(property.price, property.currency)}
                        {property.listingType === 'FOR_RENT' && (
                          <span className="text-gray-500 text-xs ml-1">/month</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {property._count?.views || 0}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {property._count?.favoritedBy || 0}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {property._count?.ratings || 0}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(property.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/properties/${property.id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/dashboard/properties/${property.id}/edit`}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setPropertyToDelete(property.id);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Property</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this property? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => propertyToDelete && handleDeleteProperty(propertyToDelete)}
                  disabled={deleteProperty.isPending}
                  className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {deleteProperty.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;

// app/dashboard/my-properties/page.tsx
// 'use client';

// import React, { useState } from 'react';

// import { useUserProperties, useDeleteProperty } from '@/hooks/useProperties';
// import { 
//   Building, 
//   Plus, 
//   Search, 
//   Edit3, 
//   Trash2, 
//   Eye, 
//   Heart, 
//   MapPin, 
//   Calendar,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   Users,
//   Star
// } from 'lucide-react';
// import Link from 'next/link';

// const MyPropertiesPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

//   const { data: properties, isLoading } = useUserProperties({ limit: 50 });
//   const deleteProperty = useDeleteProperty();

//   const filteredProperties = (properties || []).filter((property: any) => {
//     const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          property.address.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = !statusFilter || property.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleDeleteProperty = async (propertyId: string) => {
//     try {
//       await deleteProperty.mutateAsync(propertyId);
//       setShowDeleteModal(false);
//       setPropertyToDelete(null);
//     } catch (error) {
//       console.error('Error deleting property:', error);
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'AVAILABLE': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'RENTED': return <Users className="w-4 h-4 text-blue-500" />;
//       case 'UNDER_MAINTENANCE': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'UNAVAILABLE': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'AVAILABLE': return 'bg-green-50 text-green-700 border-green-200';
//       case 'RENTED': return 'bg-blue-50 text-blue-700 border-blue-200';
//       case 'UNDER_MAINTENANCE': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
//       case 'UNAVAILABLE': return 'bg-red-50 text-red-700 border-red-200';
//       default: return 'bg-gray-50 text-gray-700 border-gray-200';
//     }
//   };

//   const formatPrice = (price: number, currency: string) => {
//     return new Intl.NumberFormat('en-NG', {
//       style: 'currency',
//       currency: currency || 'NGN',
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   if (isLoading) {
//     return (
     
//         <div className="min-h-96 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         </div>
      
//     );
//   }

//   return (
//   <>
//         <Link
//           href="/dashboard/properties/create"
//           className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Property
//         </Link>
    
//       <div className="space-y-6">
//         {/* Search and Filters */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex flex-col lg:flex-row lg:items-center gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search properties..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               >
//                 <option value="">All Status</option>
//                 <option value="AVAILABLE">Available</option>
//                 <option value="RENTED">Rented</option>
//                 <option value="UNDER_MAINTENANCE">Under Maintenance</option>
//                 <option value="UNAVAILABLE">Unavailable</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Properties Table */}
//         {filteredProperties.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//             <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
//             <p className="text-gray-500 mb-6">
//               {properties?.length === 0
//                 ? "Get started by adding your first property listing"
//                 : "Try adjusting your search filters"
//               }
//             </p>
//             {properties?.length === 0 && (
//               <Link
//                 href="/dashboard/properties/create"
//                 className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Your First Property
//               </Link>
//             )}
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Property
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Performance
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created
//                     </th>
//                     <th scope="col" className="relative px-6 py-3">
//                       <span className="sr-only">Actions</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredProperties.map((property: any) => (
//                     <tr key={property.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 w-12 h-12">
//                             {property.imageUrls?.[0] ? (
//                               <img
//                                 className="h-12 w-12 rounded-lg object-cover"
//                                 src={property.imageUrls[0]}
//                                 alt={property.title}
//                               />
//                             ) : (
//                               <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
//                                 <Building className="w-6 h-6 text-gray-400" />
//                               </div>
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {property.title}
//                             </div>
//                             <div className="text-sm text-gray-500 flex items-center">
//                               <MapPin className="w-3 h-3 mr-1" />
//                               {property.city}, {property.state}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
//                           {getStatusIcon(property.status)}
//                           <span className="ml-1">{property.status.replace('_', ' ')}</span>
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <div className="flex items-center">
//                           {formatPrice(property.price, property.currency)}
//                           {property.listingType === 'FOR_RENT' && (
//                             <span className="text-gray-500 text-xs ml-1">/month</span>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <div className="flex space-x-4">
//                           <div className="flex items-center">
//                             <Eye className="w-4 h-4 mr-1" />
//                             {property._count?.views || 0}
//                           </div>
//                           <div className="flex items-center">
//                             <Heart className="w-4 h-4 mr-1" />
//                             {property._count?.favoritedBy || 0}
//                           </div>
//                           <div className="flex items-center">
//                             <Star className="w-4 h-4 mr-1" />
//                             {property._count?.ratings || 0}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <div className="flex items-center">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {new Date(property.createdAt).toLocaleDateString()}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex items-center space-x-2">
//                           <Link
//                             href={`/properties/${property.id}`}
//                             className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
//                             title="View"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </Link>
//                           <Link
//                             href={`/dashboard/properties/${property.id}/edit`}
//                             className="text-gray-600 hover:text-gray-900 p-1 rounded"
//                             title="Edit"
//                           >
//                             <Edit3 className="w-4 h-4" />
//                           </Link>
//                           <button
//                             onClick={() => {
//                               setPropertyToDelete(property.id);
//                               setShowDeleteModal(true);
//                             }}
//                             className="text-red-600 hover:text-red-900 p-1 rounded"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {showDeleteModal && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//             <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//               <div className="mt-3 text-center">
//                 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
//                   <Trash2 className="h-6 w-6 text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Property</h3>
//                 <div className="mt-2 px-7 py-3">
//                   <p className="text-sm text-gray-500">
//                     Are you sure you want to delete this property? This action cannot be undone.
//                   </p>
//                 </div>
//                 <div className="flex gap-4 px-4 py-3">
//                   <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => propertyToDelete && handleDeleteProperty(propertyToDelete)}
//                     disabled={deleteProperty.isPending}
//                     className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
//                   >
//                     {deleteProperty.isPending ? 'Deleting...' : 'Delete'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       </>
//   );
// };

// export default MyPropertiesPage;