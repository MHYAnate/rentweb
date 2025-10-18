'use client';

import React from 'react';
import UserProfile from '../../../components/Profile/UserProfile';

const ProfilePage: React.FC = () => {
  return (

    <UserProfile />
  );
};

export default ProfilePage;

// app/dashboard/profile/page.tsx
// 'use client';

// import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { authAPI } from '@/services/api';
// import toast from 'react-hot-toast';
// import { User, Mail, Phone, Calendar, Edit3, Save, X } from 'lucide-react';

// const ProfilePage = () => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     avatarUrl: ''
//   });

//   const { data: userData, isLoading } = useQuery({
//     queryKey: ['userProfile'],
//     queryFn: async () => {
//       const response = await authAPI.getProfile();
//       const data = response.data.data;
//       setFormData({
//         firstName: data.firstName || '',
//         lastName: data.lastName || '',
//         email: data.email || '',
//         phone: data.phone || '',
//         avatarUrl: data.avatarUrl || ''
//       });
//       return data;
//     }
//   });

//   const updateProfileMutation = useMutation({
//     mutationFn: (data: any) => authAPI.updateProfile(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['userProfile'] });
//       toast.success('Profile updated successfully');
//       setIsEditing(false);
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'Failed to update profile');
//     }
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateProfileMutation.mutate(formData);
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: userData?.firstName || '',
//       lastName: userData?.lastName || '',
//       email: userData?.email || '',
//       phone: userData?.phone || '',
//       avatarUrl: userData?.avatarUrl || ''
//     });
//     setIsEditing(false);
//   };

//   if (isLoading) {
//     return (
      
//         <div className="min-h-96 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         </div>
   
//     );
//   }

//   return (
//     <>{
//         !isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//           >
//             <Edit3 className="w-4 h-4 mr-2" />
//             Edit Profile
//           </button>
//         ) : (
//           <div className="flex space-x-3">
//             <button
//               onClick={handleCancel}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//             >
//               <X className="w-4 h-4 mr-2" />
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={updateProfileMutation.isPending}
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
//             >
//               <Save className="w-4 h-4 mr-2" />
//               {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         )
//       }
    
//       <div className="max-w-2xl">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           {/* Profile Header */}
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-white">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 {userData?.avatarUrl ? (
//                   <img
//                     src={userData.avatarUrl}
//                     alt={`${userData.firstName} ${userData.lastName}`}
//                     className="w-20 h-20 rounded-full border-4 border-white"
//                   />
//                 ) : (
//                   <div className="w-20 h-20 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center">
//                     <span className="text-2xl font-bold text-indigo-800">
//                       {userData?.firstName?.[0]}{userData?.lastName?.[0]}
//                     </span>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">
//                   {userData?.firstName} {userData?.lastName}
//                 </h1>
//                 <p className="text-indigo-100 capitalize">{userData?.role?.toLowerCase()}</p>
//               </div>
//             </div>
//           </div>

//           {/* Profile Form */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={formData.firstName}
//                     onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={formData.lastName}
//                     onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     disabled={!isEditing}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     disabled={!isEditing}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-2">
//                   Avatar URL
//                 </label>
//                 <input
//                   type="url"
//                   id="avatarUrl"
//                   value={formData.avatarUrl}
//                   onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
//                   disabled={!isEditing}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="https://example.com/avatar.jpg"
//                 />
//               </div>
//             </form>

//             {/* Account Info */}
//             <div className="mt-8 pt-8 border-t border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-3">
//                   <User className="w-5 h-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Role</p>
//                     <p className="text-sm text-gray-500 capitalize">{userData?.role?.toLowerCase()}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-3">
//                   <Calendar className="w-5 h-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Member since</p>
//                     <p className="text-sm text-gray-500">
//                       {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <Mail className="w-5 h-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Email Verified</p>
//                     <p className="text-sm text-gray-500">
//                       {userData?.isEmailVerified ? 'Verified' : 'Not Verified'}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <Calendar className="w-5 h-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Last Login</p>
//                     <p className="text-sm text-gray-500">
//                       {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleDateString() : 'N/A'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;