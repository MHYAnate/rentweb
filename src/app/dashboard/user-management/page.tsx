// // components/admin/UserManagement.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useAllUsers, useUpdateUser, useDeleteUser } from '@/hooks/useAdmin';



// export enum Role {
//   CLIENT = 'CLIENT',
//   LANDLORD = 'LANDLORD',
//   AGENT = 'AGENT',
//   ADMIN = 'ADMIN',
//   SUPER_ADMIN = 'SUPER_ADMIN',
// }

// export enum VerificationStatus {
//   UNVERIFIED = 'UNVERIFIED',
//   PENDING = 'PENDING',
//   VERIFIED = 'VERIFIED',
//   REJECTED = 'REJECTED',
// }


// export interface User {
//   id: string;
//   email?: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   avatarUrl?: string;
//   role: Role;
//   isEmailVerified: boolean;
//   verificationStatus: VerificationStatus;
//   createdAt: Date;
//   updatedAt: Date;
//   lastLogin?: Date;

// }

// interface UserFilters {
//   role?: Role;
//   verificationStatus?: VerificationStatus;
//   search?: string;
// }

// interface UserManagementProps {
//   initialPage?: number;
// }

// const UserManagement: React.FC<UserManagementProps> = ({ initialPage = 1 }) => {
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [filters, setFilters] = useState<UserFilters>({});
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

//   const itemsPerPage = 10;

//   // Fetch users with pagination and filters
//   const { data: usersData, isLoading, error, refetch } = useAllUsers({
//     page: currentPage,
//     limit: itemsPerPage,
//     ...filters
//   });

//   const updateUserMutation = useUpdateUser();
//   const deleteUserMutation = useDeleteUser();

//   // Handle filter changes
//   const handleFilterChange = (key: keyof UserFilters, value: string) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value || undefined
//     }));
//     setCurrentPage(1); // Reset to first page when filters change
//   };

//   // Handle search
//   const handleSearch = (searchTerm: string) => {
//     handleFilterChange('search', searchTerm);
//   };

//   // Edit user
//   const handleEditUser = (user: User) => {
//     setSelectedUser(user);
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateUser = async (updatedData: Partial<User>) => {
//     if (!selectedUser) return;

//     try {
//       await updateUserMutation.mutateAsync({
//         id: selectedUser.id,
//         data: updatedData
//       });
//       setIsEditModalOpen(false);
//       setSelectedUser(null);
//       refetch();
//     } catch (error) {
//       console.error('Failed to update user:', error);
//     }
//   };

//   // Delete user
//   const handleDeleteUser = (user: User) => {
//     setSelectedUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDeleteUser = async () => {
//     if (!selectedUser) return;

//     try {
//       await deleteUserMutation.mutateAsync(selectedUser.id as any);
//       setIsDeleteModalOpen(false);
//       setSelectedUser(null);
//       refetch();
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//     }
//   };

//   // View user details
//   const handleViewUser = (user: User) => {
//     setSelectedUser(user);
//     setIsViewModalOpen(true);
//   };

//   // Status badges
//   const getVerificationStatusBadge = (status: VerificationStatus) => {
//     const statusConfig = {
//       UNVERIFIED: { color: 'bg-gray-100 text-gray-800', label: 'Unverified' },
//       PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
//       VERIFIED: { color: 'bg-green-100 text-green-800', label: 'Verified' },
//       REJECTED: { color: 'bg-red-100 text-red-800', label: 'Rejected' }
//     };
    
//     const config = statusConfig[status];
//     return (
//       <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
//         {config.label}
//       </span>
//     );
//   };

//   const getRoleBadge = (role: Role) => {
//     const roleConfig = {
//       CLIENT: { color: 'bg-blue-100 text-blue-800', label: 'Client' },
//       LANDLORD: { color: 'bg-purple-100 text-purple-800', label: 'Landlord' },
//       AGENT: { color: 'bg-indigo-100 text-indigo-800', label: 'Agent' },
//       ADMIN: { color: 'bg-red-100 text-red-800', label: 'Admin' },
//       SUPER_ADMIN: { color: 'bg-orange-100 text-orange-800', label: 'Super Admin' }
//     };
    
//     const config = roleConfig[role];
//     return (
//       <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
//         {config.label}
//       </span>
//     );
//   };

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <h3 className="text-sm font-medium text-red-800">
//               Error loading users
//             </h3>
//             <div className="mt-2 text-sm text-red-700">
//               <p>Failed to load user data. Please try again.</p>
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={() => refetch()}
//                 className="bg-red-100 text-red-800 px-3 py-2 rounded text-sm font-medium hover:bg-red-200"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="sm:flex sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
//             User Management
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage all users in the system including clients, landlords, agents, and administrators.
//           </p>
//         </div>
//         <div className="mt-4 sm:mt-0">
//           <div className="text-sm text-gray-500">
//             Total Users: {usersData?.pagination?.total || 0}
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
//             {/* Search */}
//             <div>
//               <label htmlFor="search" className="block text-sm font-medium text-gray-700">
//                 Search
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="search"
//                   id="search"
//                   placeholder="Search by name, email, or phone..."
//                   className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Role Filter */}
//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                 onChange={(e) => handleFilterChange('role', e.target.value)}
//                 value={filters.role || ''}
//               >
//                 <option value="">All Roles</option>
//                 <option value="CLIENT">Client</option>
//                 <option value="LANDLORD">Landlord</option>
//                 <option value="AGENT">Agent</option>
//                 <option value="ADMIN">Admin</option>
//                 <option value="SUPER_ADMIN">Super Admin</option>
//               </select>
//             </div>

//             {/* Verification Status Filter */}
//             <div>
//               <label htmlFor="verificationStatus" className="block text-sm font-medium text-gray-700">
//                 Verification Status
//               </label>
//               <select
//                 id="verificationStatus"
//                 name="verificationStatus"
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                 onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
//                 value={filters.verificationStatus || ''}
//               >
//                 <option value="">All Status</option>
//                 <option value="UNVERIFIED">Unverified</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="VERIFIED">Verified</option>
//                 <option value="REJECTED">Rejected</option>
//               </select>
//             </div>

//             {/* Reset Filters */}
//             <div className="flex items-end">
//               <button
//                 onClick={() => setFilters({})}
//                 className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow overflow-hidden sm:rounded-md">
//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <>
//             <ul className="divide-y divide-gray-200">
//               {usersData?.data?.map((user: any) => (
//                 <li key={user.id}>
//                   <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                           {user.avatarUrl ? (
//                             <img
//                               className="h-10 w-10 rounded-full"
//                               src={user.avatarUrl}
//                               alt={`${user.firstName} ${user.lastName}`}
//                             />
//                           ) : (
//                             <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
//                               <span className="text-gray-600 font-medium text-sm">
//                                 {user.firstName?.[0]}{user.lastName?.[0]}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="ml-4">
//                           <div className="flex items-center">
//                             <h4 className="text-sm font-medium text-gray-900">
//                               {user.firstName} {user.lastName}
//                             </h4>
//                             <div className="ml-2 flex space-x-1">
//                               {getRoleBadge(user.role)}
//                               {getVerificationStatusBadge(user.verificationStatus)}
//                               {user.isEmailVerified && (
//                                 <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
//                                   Email Verified
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           <div className="text-sm text-gray-500 mt-1">
//                             <div className="flex flex-wrap gap-4">
//                               <span>{user.email || 'No email'}</span>
//                               <span>{user.phone}</span>
//                               <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
//                               {user.lastLogin && (
//                                 <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleViewUser(user)}
//                           className="text-blue-600 hover:text-blue-900 text-sm font-medium"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleEditUser(user)}
//                           className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteUser(user)}
//                           className="text-red-600 hover:text-red-900 text-sm font-medium"
//                           disabled={user.role === 'SUPER_ADMIN'}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             {/* Pagination */}
//             {usersData?.pagination && usersData.pagination.totalPages > 1 && (
//               <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                 <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Showing{' '}
//                       <span className="font-medium">
//                         {(usersData.pagination.page - 1) * itemsPerPage + 1}
//                       </span>{' '}
//                       to{' '}
//                       <span className="font-medium">
//                         {Math.min(usersData.pagination.page * itemsPerPage, usersData.pagination.total)}
//                       </span>{' '}
//                       of <span className="font-medium">{usersData.pagination.total}</span> results
//                     </p>
//                   </div>
//                   <div>
//                     <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                       <button
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                       >
//                         Previous
//                       </button>
//                       {Array.from({ length: usersData.pagination.totalPages }, (_, i) => i + 1).map(page => (
//                         <button
//                           key={page}
//                           onClick={() => setCurrentPage(page)}
//                           className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                             currentPage === page
//                               ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                               : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       ))}
//                       <button
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, usersData.pagination.totalPages))}
//                         disabled={currentPage === usersData.pagination.totalPages}
//                         className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                       >
//                         Next
//                       </button>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Edit User Modal */}
//       {isEditModalOpen && selectedUser && (
//         <EditUserModal
//           user={selectedUser}
//           onSave={handleUpdateUser}
//           onClose={() => {
//             setIsEditModalOpen(false);
//             setSelectedUser(null);
//           }}
//           isLoading={updateUserMutation.isPending}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && selectedUser && (
//         <DeleteUserModal
//           user={selectedUser}
//           onConfirm={confirmDeleteUser}
//           onClose={() => {
//             setIsDeleteModalOpen(false);
//             setSelectedUser(null);
//           }}
//           isLoading={deleteUserMutation.isPending}
//         />
//       )}

//       {/* View User Modal */}
//       {isViewModalOpen && selectedUser && (
//         <ViewUserModal
//           user={selectedUser}
//           onClose={() => {
//             setIsViewModalOpen(false);
//             setSelectedUser(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// // Edit User Modal Component
// const EditUserModal: React.FC<{
//   user: any;
//   onSave: (data: Partial<User>) => void;
//   onClose: () => void;
//   isLoading: boolean;
// }> = ({ user, onSave, onClose, isLoading }) => {
//   const [formData, setFormData] = useState({
//     firstName: user.firstName || '',
//     lastName: user.lastName || '',
//     role: user.role,
//     verificationStatus: user.verificationStatus,
//     isEmailVerified: user.isEmailVerified || false
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
//         <div className="mt-3">
//           <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
//           <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">First Name</label>
//               <input
//                 type="text"
//                 value={formData.firstName}
//                 onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Last Name</label>
//               <input
//                 type="text"
//                 value={formData.lastName}
//                 onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Role</label>
//               <select
//                 value={formData.role}
//                 onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as Role }))}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="CLIENT">Client</option>
//                 <option value="LANDLORD">Landlord</option>
//                 <option value="AGENT">Agent</option>
//                 <option value="ADMIN">Admin</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Verification Status</label>
//               <select
//                 value={formData.verificationStatus}
//                 onChange={(e) => setFormData(prev => ({ ...prev, verificationStatus: e.target.value as VerificationStatus }))}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="UNVERIFIED">Unverified</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="VERIFIED">Verified</option>
//                 <option value="REJECTED">Rejected</option>
//               </select>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={formData.isEmailVerified}
//                 onChange={(e) => setFormData(prev => ({ ...prev, isEmailVerified: e.target.checked }))}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label className="ml-2 block text-sm text-gray-900">Email Verified</label>
//             </div>
//             <div className="flex justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {isLoading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Delete User Modal Component
// const DeleteUserModal: React.FC<{
//   user: any;
//   onConfirm: () => void;
//   onClose: () => void;
//   isLoading: boolean;
// }> = ({ user, onConfirm, onClose, isLoading }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
//         <div className="mt-3">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
//             <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mt-2">Delete User</h3>
//           <div className="mt-2">
//             <p className="text-sm text-gray-500">
//               Are you sure you want to delete {user.firstName} {user.lastName}? This action cannot be undone.
//             </p>
//           </div>
//           <div className="flex justify-end space-x-3 mt-4">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               disabled={isLoading}
//               className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
//             >
//               {isLoading ? 'Deleting...' : 'Delete User'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // View User Modal Component
// const ViewUserModal: React.FC<{
//   user: any;
//   onClose: () => void;
// }> = ({ user, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
//         <div className="mt-3">
//           <div className="flex justify-between items-start">
//             <h3 className="text-lg font-medium text-gray-900">User Details</h3>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <p className="mt-1 text-sm text-gray-900">{user.firstName} {user.lastName}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <p className="mt-1 text-sm text-gray-900">{user.email || 'Not provided'}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone</label>
//               <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Role</label>
//               <p className="mt-1 text-sm text-gray-900">{user.role}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Verification Status</label>
//               <p className="mt-1 text-sm text-gray-900">{user.verificationStatus}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email Verified</label>
//               <p className="mt-1 text-sm text-gray-900">{user.isEmailVerified ? 'Yes' : 'No'}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Joined Date</label>
//               <p className="mt-1 text-sm text-gray-900">{new Date(user.createdAt).toLocaleString()}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Last Login</label>
//               <p className="mt-1 text-sm text-gray-900">
//                 {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

"use client"

import type React from "react"
import { useState } from "react"
import { useAllUsers, useUpdateUser, useDeleteUser } from "@/hooks/useAdmin"
import { Users, Search, Filter, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, X, AlertCircle } from "lucide-react"

export enum Role {
  CLIENT = "CLIENT",
  LANDLORD = "LANDLORD",
  AGENT = "AGENT",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum VerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export interface User {
  id: string
  email?: string
  password: string
  firstName: string
  lastName: string
  phone: string
  avatarUrl?: string
  role: Role
  isEmailVerified: boolean
  verificationStatus: VerificationStatus
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

interface UserFilters {
  role?: Role
  verificationStatus?: VerificationStatus
  search?: string
}

interface UserManagementProps {
  initialPage?: number
}

const UserManagement: React.FC<UserManagementProps> = ({ initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [filters, setFilters] = useState<UserFilters>({})
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const itemsPerPage = 10

  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useAllUsers({
    page: currentPage,
    limit: itemsPerPage,
    ...filters,
  })

  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }))
    setCurrentPage(1)
  }

  const handleSearch = (searchTerm: string) => {
    handleFilterChange("search", searchTerm)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleUpdateUser = async (updatedData: Partial<User>) => {
    if (!selectedUser) return

    try {
      await updateUserMutation.mutateAsync({
        id: selectedUser.id,
        data: updatedData,
      })
      setIsEditModalOpen(false)
      setSelectedUser(null)
      refetch()
    } catch (error) {
      console.error("Failed to update user:", error)
    }
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteUser = async () => {
    if (!selectedUser) return

    try {
      await deleteUserMutation.mutateAsync(selectedUser.id as any)
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
      refetch()
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const getVerificationStatusBadge = (status: VerificationStatus) => {
    const statusConfig = {
      UNVERIFIED: { color: "bg-slate-100 text-slate-700", label: "Unverified" },
      PENDING: { color: "bg-amber-100 text-amber-700", label: "Pending" },
      VERIFIED: { color: "bg-emerald-100 text-emerald-700", label: "Verified" },
      REJECTED: { color: "bg-rose-100 text-rose-700", label: "Rejected" },
    }

    const config = statusConfig[status]
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config.color}`}>{config.label}</span>
  }

  const getRoleBadge = (role: Role) => {
    const roleConfig = {
      CLIENT: { color: "bg-blue-100 text-blue-700", label: "Client" },
      LANDLORD: { color: "bg-indigo-100 text-indigo-700", label: "Landlord" },
      AGENT: { color: "bg-cyan-100 text-cyan-700", label: "Agent" },
      ADMIN: { color: "bg-orange-100 text-orange-700", label: "Admin" },
      SUPER_ADMIN: { color: "bg-rose-100 text-rose-700", label: "Super Admin" },
    }

    const config = roleConfig[role]
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config.color}`}>{config.label}</span>
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-rose-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-rose-900">Error loading users</h3>
            <div className="mt-2 text-sm text-rose-700">
              <p>Failed to load user data. Please try again.</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => refetch()}
                className="bg-rose-100 text-rose-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-200 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage all users in the system including clients, landlords, agents, and administrators.
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
            <span className="text-sm font-semibold text-slate-700">Total Users:</span>
            <span className="text-lg font-bold text-slate-900">{usersData?.pagination?.total || 0}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-slate-600" />
            <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Name, email, phone..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-slate-700 mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onChange={(e) => handleFilterChange("role", e.target.value)}
                value={filters.role || ""}
              >
                <option value="">All Roles</option>
                <option value="CLIENT">Client</option>
                <option value="LANDLORD">Landlord</option>
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            {/* Verification Status Filter */}
            <div>
              <label htmlFor="verificationStatus" className="block text-sm font-semibold text-slate-700 mb-2">
                Verification Status
              </label>
              <select
                id="verificationStatus"
                name="verificationStatus"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onChange={(e) => handleFilterChange("verificationStatus", e.target.value)}
                value={filters.verificationStatus || ""}
              >
                <option value="">All Status</option>
                <option value="UNVERIFIED">Unverified</option>
                <option value="PENDING">Pending</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => setFilters({})}
                className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-blue-600"></div>
              <p className="text-sm text-slate-600">Loading users...</p>
            </div>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-slate-200">
              {usersData?.data?.map((user: any) => (
                <li key={user.id} className="hover:bg-slate-50 transition-colors">
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {user.avatarUrl ? (
                            <img
                              className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-200"
                              src={user.avatarUrl || "/placeholder.svg"}
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-slate-200">
                              <span className="text-white font-semibold text-sm">
                                {user.firstName?.[0]}
                                {user.lastName?.[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="text-sm font-semibold text-slate-900">
                              {user.firstName} {user.lastName}
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                              {getRoleBadge(user.role)}
                              {getVerificationStatusBadge(user.verificationStatus)}
                              {user.isEmailVerified && (
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                                  Email Verified
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-slate-600 mt-2 space-y-1">
                            <div className="flex flex-wrap gap-4">
                              <span>{user.email || "No email"}</span>
                              <span>{user.phone}</span>
                              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                              {user.lastLogin && (
                                <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                          title="View user details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2 text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={user.role === "SUPER_ADMIN"}
                          title={user.role === "SUPER_ADMIN" ? "Cannot delete Super Admin" : "Delete user"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {usersData?.pagination && usersData.pagination.totalPages > 1 && (
              <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-700">
                      Showing{" "}
                      <span className="font-semibold">{(usersData.pagination.page - 1) * itemsPerPage + 1}</span> to{" "}
                      <span className="font-semibold">
                        {Math.min(usersData.pagination.page * itemsPerPage, usersData.pagination.total)}
                      </span>{" "}
                      of <span className="font-semibold">{usersData.pagination.total}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      {Array.from({ length: usersData.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-white"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, usersData.pagination.totalPages))}
                        disabled={currentPage === usersData.pagination.totalPages}
                        className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {isEditModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onSave={handleUpdateUser}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedUser(null)
          }}
          isLoading={updateUserMutation.isPending}
        />
      )}

      {isDeleteModalOpen && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onConfirm={confirmDeleteUser}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedUser(null)
          }}
          isLoading={deleteUserMutation.isPending}
        />
      )}

      {isViewModalOpen && selectedUser && (
        <ViewUserModal
          user={selectedUser}
          onClose={() => {
            setIsViewModalOpen(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

const EditUserModal: React.FC<{
  user: any
  onSave: (data: Partial<User>) => void
  onClose: () => void
  isLoading: boolean
}> = ({ user, onSave, onClose, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    role: user.role,
    verificationStatus: user.verificationStatus,
    isEmailVerified: user.isEmailVerified || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Edit User</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as Role }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="CLIENT">Client</option>
              <option value="LANDLORD">Landlord</option>
              <option value="AGENT">Agent</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Verification Status</label>
            <select
              value={formData.verificationStatus}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, verificationStatus: e.target.value as VerificationStatus }))
              }
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="UNVERIFIED">Unverified</option>
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              checked={formData.isEmailVerified}
              onChange={(e) => setFormData((prev) => ({ ...prev, isEmailVerified: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label className="text-sm font-medium text-slate-900">Email Verified</label>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const DeleteUserModal: React.FC<{
  user: any
  onConfirm: () => void
  onClose: () => void
  isLoading: boolean
}> = ({ user, onConfirm, onClose, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-rose-100 mb-4">
            <AlertCircle className="h-7 w-7 text-rose-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 text-center">Delete User</h3>
          <div className="mt-3">
            <p className="text-sm text-slate-600 text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {user.firstName} {user.lastName}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ViewUserModal: React.FC<{
  user: any
  onClose: () => void
}> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">User Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Name</label>
              <p className="text-sm font-semibold text-slate-900">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Email</label>
              <p className="text-sm font-semibold text-slate-900">{user.email || "Not provided"}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Phone</label>
              <p className="text-sm font-semibold text-slate-900">{user.phone}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Role</label>
              <p className="text-sm font-semibold text-slate-900">{user.role}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                Verification Status
              </label>
              <p className="text-sm font-semibold text-slate-900">{user.verificationStatus}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                Email Verified
              </label>
              <p className="text-sm font-semibold text-slate-900">{user.isEmailVerified ? "Yes" : "No"}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                Joined Date
              </label>
              <p className="text-sm font-semibold text-slate-900">{new Date(user.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                Last Login
              </label>
              <p className="text-sm font-semibold text-slate-900">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagement
