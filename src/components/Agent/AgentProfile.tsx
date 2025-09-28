// // 'use client';

// // import React, { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import * as yup from 'yup';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { Briefcase, MapPin, Phone, Mail, Globe, Award, Star, Building, Users, Calendar, CreditCard as Edit3, Save, X, Plus, Trash2, CheckCircle } from 'lucide-react';

// // const agentProfileSchema = yup.object({
// //   bio: yup.string().max(1000, 'Bio must be less than 1000 characters'),
// //   experience: yup.number().nullable().min(0, 'Experience cannot be negative'),
// //   websiteUrl: yup.string().url('Invalid URL').nullable(),
// //   languages: yup.array().of(yup.string()),
// //   specialties: yup.array().of(yup.string()),
// //   certifications: yup.array().of(yup.string()),
// // });

// // type AgentProfileFormData = yup.InferType<typeof agentProfileSchema>;

// // const AgentProfile: React.FC = () => {
// //   const { user } = useAuth();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [newLanguage, setNewLanguage] = useState('');
// //   const [newSpecialty, setNewSpecialty] = useState('');
// //   const [newCertification, setNewCertification] = useState('');
// //   const [agentData, setAgentData] = useState({
// //     bio: user?.agentProfile?.bio || '',
// //     experience: user?.agentProfile?.experience || 0,
// //     websiteUrl: user?.agentProfile?.websiteUrl || '',
// //     languages: user?.agentProfile?.languages || ['English'],
// //     specialties: user?.agentProfile?.specialties || [],
// //     certifications: user?.agentProfile?.certifications || [],
// //   });

// //   const form = useForm<AgentProfileFormData>({
// //     resolver: yupResolver(agentProfileSchema),
// //     defaultValues: agentData,
// //   });

// //   const commonSpecialties = [
// //     'Residential Sales',
// //     'Commercial Properties',
// //     'Luxury Homes',
// //     'First-Time Buyers',
// //     'Investment Properties',
// //     'Property Management',
// //     'Land Development',
// //     'Industrial Properties',
// //   ];

// //   const commonLanguages = [
// //     'English',
// //     'Yoruba',
// //     'Igbo',
// //     'Hausa',
// //     'French',
// //     'Arabic',
// //     'Portuguese',
// //   ];

// //   const handleSubmit = async (data: AgentProfileFormData) => {
// //     console.log('Updating agent profile:', data);
// //     setIsEditing(false);
// //     // API call would go here
// //   };

// //   const addItem = (type: 'languages' | 'specialties' | 'certifications', value: string) => {
// //     if (!value.trim()) return;
    
// //     const currentItems = agentData[type] || [];
// //     if (!currentItems.includes(value)) {
// //       setAgentData(prev => ({
// //         ...prev,
// //         [type]: [...currentItems, value]
// //       }));
// //     }

// //     // Clear input
// //     if (type === 'languages') setNewLanguage('');
// //     if (type === 'specialties') setNewSpecialty('');
// //     if (type === 'certifications') setNewCertification('');
// //   };

// //   const removeItem = (type: 'languages' | 'specialties' | 'certifications', value: string) => {
// //     setAgentData(prev => ({
// //       ...prev,
// //       [type]: (prev[type] || []).filter((item :any) => item !== value)
// //     }));
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto space-y-8">
// //       {/* Agent Header */}
// //       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
// //         <div className="px-8 py-10 text-white">
// //           <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
// //             <div className="flex-shrink-0 mb-6 md:mb-0">
// //               <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
// //                 {user?.avatarUrl ? (
// //                   <img
// //                     src={user.avatarUrl}
// //                     alt={`${user.firstName} ${user.lastName}`}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 ) : (
// //                   <span className="text-4xl font-bold text-white">
// //                     {user?.firstName?.[0]}{user?.lastName?.[0]}
// //                   </span>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex-1">
// //               <div className="flex items-center space-x-3 mb-3">
// //                 <h1 className="text-3xl font-bold">
// //                   {user?.firstName} {user?.lastName}
// //                 </h1>
// //                 <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
// //                   <span className="text-sm font-medium">Real Estate Agent</span>
// //                 </div>
// //               </div>

// //               <div className="space-y-2 text-blue-100 mb-4">
// //                 <div className="flex items-center space-x-2">
// //                   <Mail className="w-4 h-4" />
// //                   <span>{user?.email}</span>
// //                 </div>
// //                 {user?.phone && (
// //                   <div className="flex items-center space-x-2">
// //                     <Phone className="w-4 h-4" />
// //                     <span>{user.phone}</span>
// //                   </div>
// //                 )}
// //                 {agentData.websiteUrl && (
// //                   <div className="flex items-center space-x-2">
// //                     <Globe className="w-4 h-4" />
// //                     <a
// //                       href={agentData.websiteUrl}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="hover:text-white transition-colors"
// //                     >
// //                       {agentData.websiteUrl}
// //                     </a>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="flex items-center space-x-6 text-sm">
// //                 <div className="flex items-center space-x-1">
// //                   <Briefcase className="w-4 h-4" />
// //                   <span>{agentData.experience || 0} years experience</span>
// //                 </div>
// //                 <div className="flex items-center space-x-1">
// //                   <Star className="w-4 h-4" />
// //                   <span>4.8 rating</span>
// //                 </div>
// //                 <div className="flex items-center space-x-1">
// //                   <Building className="w-4 h-4" />
// //                   <span>{user?._count?.propertiesPosted || 0} properties</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-6 md:mt-0">
// //               {!isEditing ? (
// //                 <button
// //                   onClick={() => setIsEditing(true)}
// //                   className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
// //                 >
// //                   <Edit3 className="w-4 h-4 inline mr-2" />
// //                   Edit Profile
// //                 </button>
// //               ) : (
// //                 <div className="flex space-x-2">
// //                   <button
// //                     onClick={form.handleSubmit(handleSubmit)}
// //                     className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
// //                   >
// //                     <Save className="w-4 h-4 inline mr-1" />
// //                     Save
// //                   </button>
// //                   <button
// //                     onClick={() => setIsEditing(false)}
// //                     className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
// //                   >
// //                     <X className="w-4 h-4 inline mr-1" />
// //                     Cancel
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //         {/* Main Content */}
// //         <div className="lg:col-span-2 space-y-8">
// //           {/* About Section */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
// //             {isEditing ? (
// //               <textarea
// //                 {...form.register('bio')}
// //                 rows={6}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Tell potential clients about your experience, approach, and what makes you unique..."
// //                 defaultValue={agentData.bio}
// //               />
// //             ) : (
// //               <p className="text-gray-600 leading-relaxed">
// //                 {agentData.bio || 'No bio available. Click Edit Profile to add one.'}
// //               </p>
// //             )}
// //           </div>

// //           {/* Experience & Credentials */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience & Credentials</h3>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Years of Experience
// //                 </label>
// //                 {isEditing ? (
// //                   <input
// //                     {...form.register('experience')}
// //                     type="number"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     defaultValue={agentData.experience}
// //                   />
// //                 ) : (
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {agentData.experience || 0} years
// //                   </p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Website
// //                 </label>
// //                 {isEditing ? (
// //                   <input
// //                     {...form.register('websiteUrl')}
// //                     type="url"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     placeholder="https://yourwebsite.com"
// //                     defaultValue={agentData.websiteUrl}
// //                   />
// //                 ) : (
// //                   <p className="text-gray-600">
// //                     {agentData.websiteUrl ? (
// //                       <a
// //                         href={agentData.websiteUrl}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="text-blue-600 hover:underline"
// //                       >
// //                         {agentData.websiteUrl}
// //                       </a>
// //                     ) : (
// //                       'No website provided'
// //                     )}
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Specialties */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
// //               {isEditing && (
// //                 <div className="flex space-x-2">
// //                   <select
// //                     value={newSpecialty}
// //                     onChange={(e) => setNewSpecialty(e.target.value)}
// //                     className="px-3 py-1 text-sm border border-gray-300 rounded-md"
// //                   >
// //                     <option value="">Select specialty</option>
// //                     {commonSpecialties
// //                       .filter(s => !agentData.specialties?.includes(s))
// //                       .map(specialty => (
// //                         <option key={specialty} value={specialty}>
// //                           {specialty}
// //                         </option>
// //                       ))
// //                     }
// //                   </select>
// //                   <button
// //                     type="button"
// //                     onClick={() => addItem('specialties', newSpecialty)}
// //                     disabled={!newSpecialty}
// //                     className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
// //                   >
// //                     Add
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="flex flex-wrap gap-2">
// //               {agentData.specialties?.map((specialty) => (
// //                 <span
// //                   key={specialty}
// //                   className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
// //                 >
// //                   {specialty}
// //                   {isEditing && (
// //                     <button
// //                       type="button"
// //                       onClick={() => removeItem('specialties', specialty)}
// //                       className="ml-2 text-blue-600 hover:text-blue-800"
// //                     >
// //                       <X className="w-3 h-3" />
// //                     </button>
// //                   )}
// //                 </span>
// //               ))}
// //               {(!agentData.specialties || agentData.specialties.length === 0) && (
// //                 <p className="text-gray-500 italic">No specialties listed</p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Languages */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
// //               {isEditing && (
// //                 <div className="flex space-x-2">
// //                   <select
// //                     value={newLanguage}
// //                     onChange={(e) => setNewLanguage(e.target.value)}
// //                     className="px-3 py-1 text-sm border border-gray-300 rounded-md"
// //                   >
// //                     <option value="">Select language</option>
// //                     {commonLanguages
// //                       .filter(lang => !agentData.languages?.includes(lang))
// //                       .map(language => (
// //                         <option key={language} value={language}>
// //                           {language}
// //                         </option>
// //                       ))
// //                     }
// //                   </select>
// //                   <button
// //                     type="button"
// //                     onClick={() => addItem('languages', newLanguage)}
// //                     disabled={!newLanguage}
// //                     className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
// //                   >
// //                     Add
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="flex flex-wrap gap-2">
// //               {agentData.languages?.map((language) => (
// //                 <span
// //                   key={language}
// //                   className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
// //                 >
// //                   {language}
// //                   {isEditing && language !== 'English' && (
// //                     <button
// //                       type="button"
// //                       onClick={() => removeItem('languages', language)}
// //                       className="ml-2 text-green-600 hover:text-green-800"
// //                     >
// //                       <X className="w-3 h-3" />
// //                     </button>
// //                   )}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Certifications */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
// //               {isEditing && (
// //                 <div className="flex space-x-2">
// //                   <input
// //                     type="text"
// //                     value={newCertification}
// //                     onChange={(e) => setNewCertification(e.target.value)}
// //                     placeholder="Certification name"
// //                     className="px-3 py-1 text-sm border border-gray-300 rounded-md"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => addItem('certifications', newCertification)}
// //                     disabled={!newCertification}
// //                     className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
// //                   >
// //                     Add
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="space-y-3">
// //               {agentData.certifications?.map((cert) => (
// //                 <div
// //                   key={cert}
// //                   className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
// //                 >
// //                   <div className="flex items-center">
// //                     <Award className="w-5 h-5 text-yellow-600 mr-3" />
// //                     <span className="font-medium text-gray-900">{cert}</span>
// //                   </div>
// //                   {isEditing && (
// //                     <button
// //                       type="button"
// //                       onClick={() => removeItem('certifications', cert)}
// //                       className="text-red-600 hover:text-red-800"
// //                     >
// //                       <Trash2 className="w-4 h-4" />
// //                     </button>
// //                   )}
// //                 </div>
// //               ))}
// //               {(!agentData.certifications || agentData.certifications.length === 0) && (
// //                 <p className="text-gray-500 italic text-center py-4">No certifications listed</p>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Sidebar */}
// //         <div className="lg:col-span-1 space-y-6">
// //           {/* Performance Stats */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
// //             <div className="space-y-4">
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-gray-600">Properties Listed</span>
// //                 <span className="font-semibold">{user?._count?.propertiesPosted || 0}</span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-gray-600">Properties Managed</span>
// //                 <span className="font-semibold">{user?._count?.propertiesManaged || 0}</span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-gray-600">Client Reviews</span>
// //                 <span className="font-semibold">{user?._count?.ratings || 0}</span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-gray-600">Average Rating</span>
// //                 <div className="flex items-center">
// //                   <Star className="w-4 h-4 text-yellow-500 mr-1" />
// //                   <span className="font-semibold">4.8</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Verification Status */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
// //             <div className="space-y-3">
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-gray-600">Email Verified</span>
// //                 {user?.isEmailVerified ? (
// //                   <CheckCircle className="w-5 h-5 text-green-500" />
// //                 ) : (
// //                   <X className="w-5 h-5 text-red-500" />
// //                 )}
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-gray-600">Identity Verified</span>
// //                 {user?.verificationStatus === 'VERIFIED' ? (
// //                   <CheckCircle className="w-5 h-5 text-green-500" />
// //                 ) : (
// //                   <X className="w-5 h-5 text-red-500" />
// //                 )}
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-gray-600">License Verified</span>
// //                 <X className="w-5 h-5 text-red-500" />
// //               </div>
// //             </div>

// //             {user?.verificationStatus !== 'VERIFIED' && (
// //               <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
// //                 Complete Verification
// //               </button>
// //             )}
// //           </div>

// //           {/* Contact Actions */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
// //             <div className="space-y-3">
// //               <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
// //                 View Public Profile
// //               </button>
// //               <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
// //                 Download Business Card
// //               </button>
// //               <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
// //                 Share Profile Link
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AgentProfile;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useAuth } from '../../contexts/AuthContext';
// import { authAPI } from '../../services/api'; // Assuming this exists
// import toast from 'react-hot-toast';
// import { Briefcase, MapPin, Phone, Mail, Globe, Award, Star, Building, Users, Calendar, CreditCard as Edit3, Save, X, Plus, Trash2, CheckCircle } from 'lucide-react';
// import { ObjectSchema } from 'yup';


// // 1. Explicitly define the form data type with optional properties
// type AgentProfileFormData = {
//   bio?: string;
//   experience?: number | null;
//   websiteUrl?: string | null;
//   languages?: string[];
//   specialties?: string[];
//   certifications?: string[];
// };

// // 2. Apply the explicit type to the Yup schema
// const agentProfileSchema: ObjectSchema<AgentProfileFormData> = yup.object({
//   bio: yup.string().max(1000, 'Bio must be less than 1000 characters'),
//   experience: yup.number().nullable().min(0, 'Experience cannot be negative'),
//   websiteUrl: yup.string().url('Invalid URL').nullable(),
//   languages: yup.array(yup.string().required()),
//   specialties: yup.array(yup.string().required()),
//   certifications: yup.array(yup.string().required()),
// });



// const AgentProfile: React.FC = () => {
//   const { user, updateUser } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [newLanguage, setNewLanguage] = useState('');
//   const [newSpecialty, setNewSpecialty] = useState('');
//   const [newCertification, setNewCertification] = useState('');

//   // Using a single state for all profile data
//   const [agentData, setAgentData] = useState({
//     bio: user?.agentProfile?.bio || '',
//     experience: user?.agentProfile?.experience || 0,
//     websiteUrl: user?.agentProfile?.websiteUrl || '',
//     languages: user?.agentProfile?.languages || ['English'],
//     specialties: user?.agentProfile?.specialties || [],
//     certifications: user?.agentProfile?.certifications || [],
//   });

//   const form = useForm<AgentProfileFormData>({
//     resolver: yupResolver(agentProfileSchema),
//     defaultValues: agentData,
//   });

//   // Sync form with state changes
//   useEffect(() => {
//     form.reset(agentData);
//   }, [agentData, form]);

//   const commonSpecialties = [
//     'Residential Sales', 'Commercial Properties', 'Luxury Homes', 'First-Time Buyers',
//     'Investment Properties', 'Property Management', 'Land Development', 'Industrial Properties',
//   ];

//   const commonLanguages = ['English', 'Yoruba', 'Igbo', 'Hausa', 'French', 'Arabic', 'Portuguese'];

//   // FIX 2: Implemented API call for profile update.
//   const handleSubmit = async (data: AgentProfileFormData) => {
//     setIsLoading(true);
//     const updatedProfileData = {
//       ...data,
//       languages: agentData.languages,
//       specialties: agentData.specialties,
//       certifications: agentData.certifications,
//     };

//     try {
//       // Assuming an endpoint like `updateAgentProfile` exists
//       const response = await authAPI.updateProfile({ agentProfile: updatedProfileData });
//       updateUser(response.data.data);
//       toast.success('Profile updated successfully!');
//       setIsEditing(false);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to update profile.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addItem = (type: 'languages' | 'specialties' | 'certifications', value: string) => {
//     if (!value.trim()) return;
    
//     const currentItems = agentData[type] || [];
//     if (!currentItems.includes(value)) {
//       setAgentData(prev => ({ ...prev, [type]: [...currentItems, value] }));
//     }

//     if (type === 'languages') setNewLanguage('');
//     if (type === 'specialties') setNewSpecialty('');
//     if (type === 'certifications') setNewCertification('');
//   };

//   const removeItem = (type: 'languages' | 'specialties' | 'certifications', value: string) => {
//     setAgentData(prev => ({ ...prev, [type]: (prev[type] || []).filter((item:any) => item !== value) }));
//   };

//   const handleCancel = () => {
//     // Reset state to original user data
//     setAgentData({
//         bio: user?.agentProfile?.bio || '',
//         experience: user?.agentProfile?.experience || 0,
//         websiteUrl: user?.agentProfile?.websiteUrl || '',
//         languages: user?.agentProfile?.languages || ['English'],
//         specialties: user?.agentProfile?.specialties || [],
//         certifications: user?.agentProfile?.certifications || [],
//     });
//     setIsEditing(false);
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
//         <div className="px-8 py-10 text-white">
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
//             <div className="flex-shrink-0 mb-6 md:mb-0">
//               <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
//                 {user?.avatarUrl ? (
//                   <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl font-bold text-white">{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center space-x-3 mb-3">
//                 <h1 className="text-3xl font-bold">{user?.firstName} {user?.lastName}</h1>
//                 <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"><span className="text-sm font-medium">Real Estate Agent</span></div>
//               </div>
//               <div className="space-y-2 text-blue-100 mb-4">
//                 <div className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>{user?.email}</span></div>
//                 {user?.phone && <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>{user.phone}</span></div>}
//                 {agentData.websiteUrl && <div className="flex items-center space-x-2"><Globe className="w-4 h-4" /><a href={agentData.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{agentData.websiteUrl}</a></div>}
//               </div>
//               <div className="flex items-center space-x-6 text-sm">
//                 <div className="flex items-center space-x-1"><Briefcase className="w-4 h-4" /><span>{agentData.experience || 0} years experience</span></div>
//                 <div className="flex items-center space-x-1"><Star className="w-4 h-4" /><span>4.8 rating</span></div>
//                 <div className="flex items-center space-x-1"><Building className="w-4 h-4" /><span>{user?._count?.propertiesPosted || 0} properties</span></div>
//               </div>
//             </div>
//             <div className="mt-6 md:mt-0">
//               {!isEditing ? (
//                 <button onClick={() => setIsEditing(true)} className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4 inline mr-2" />Edit Profile</button>
//               ) : (
//                 <div className="flex space-x-2">
//                   <button onClick={form.handleSubmit(handleSubmit)} disabled={isLoading} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"><Save className="w-4 h-4 inline mr-1" />{isLoading ? 'Saving...' : 'Save'}</button>
//                   <button onClick={handleCancel} className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"><X className="w-4 h-4 inline mr-1" />Cancel</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content & Sidebar */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           {/* About Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
//             {isEditing ? (
//               <textarea {...form.register('bio')} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tell potential clients about yourself..." />
//             ) : (
//               <p className="text-gray-600 leading-relaxed">{agentData.bio || 'No bio available. Click Edit Profile to add one.'}</p>
//             )}
//           </div>
          
//           {/* Experience & Credentials */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience & Credentials</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
//                 {isEditing ? (
//                   <input {...form.register('experience')} type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                 ) : (
//                   <p className="text-2xl font-bold text-gray-900">{agentData.experience || 0} years</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
//                 {isEditing ? (
//                   <input {...form.register('websiteUrl')} type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://yourwebsite.com" />
//                 ) : (
//                   <p className="text-gray-600">{agentData.websiteUrl ? <a href={agentData.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{agentData.websiteUrl}</a> : 'No website provided'}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Specialties */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
//               {isEditing && (
//                 <div className="flex space-x-2">
//                   <select value={newSpecialty} onChange={(e) => setNewSpecialty(e.target.value)} className="px-3 py-1 text-sm border border-gray-300 rounded-md">
//                     <option value="">Select specialty</option>
//                     {commonSpecialties.filter(s => !agentData.specialties?.includes(s)).map(specialty => (<option key={specialty} value={specialty}>{specialty}</option>))}
//                   </select>
//                   <button type="button" onClick={() => addItem('specialties', newSpecialty)} disabled={!newSpecialty} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">Add</button>
//                 </div>
//               )}
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {/* FIX 3: Added explicit 'string' type to map parameter */}
//               {agentData.specialties?.map((specialty: string) => (
//                 <span key={specialty} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
//                   {specialty}
//                   {isEditing && <button type="button" onClick={() => removeItem('specialties', specialty)} className="ml-2 text-blue-600 hover:text-blue-800"><X className="w-3 h-3" /></button>}
//                 </span>
//               ))}
//               {(!agentData.specialties || agentData.specialties.length === 0) && <p className="text-gray-500 italic">No specialties listed</p>}
//             </div>
//           </div>

//           {/* Languages */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
//                 {isEditing && (
//                     <div className="flex space-x-2">
//                         <select value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} className="px-3 py-1 text-sm border border-gray-300 rounded-md">
//                             <option value="">Select language</option>
//                             {commonLanguages.filter(lang => !agentData.languages?.includes(lang)).map(language => (<option key={language} value={language}>{language}</option>))}
//                         </select>
//                         <button type="button" onClick={() => addItem('languages', newLanguage)} disabled={!newLanguage} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">Add</button>
//                     </div>
//                 )}
//             </div>
//             <div className="flex flex-wrap gap-2">
//                 {agentData.languages?.map((language: string) => (
//                     <span key={language} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
//                         {language}
//                         {isEditing && language !== 'English' && <button type="button" onClick={() => removeItem('languages', language)} className="ml-2 text-green-600 hover:text-green-800"><X className="w-3 h-3" /></button>}
//                     </span>
//                 ))}
//             </div>
//           </div>

//           {/* Certifications */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
//                 {isEditing && (
//                     <div className="flex space-x-2">
//                         <input type="text" value={newCertification} onChange={(e) => setNewCertification(e.target.value)} placeholder="Certification name" className="px-3 py-1 text-sm border border-gray-300 rounded-md" />
//                         <button type="button" onClick={() => addItem('certifications', newCertification)} disabled={!newCertification} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">Add</button>
//                     </div>
//                 )}
//             </div>
//             <div className="space-y-3">
//                 {agentData.certifications?.map((cert: string) => (
//                     <div key={cert} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div className="flex items-center"><Award className="w-5 h-5 text-yellow-600 mr-3" /><span className="font-medium text-gray-900">{cert}</span></div>
//                         {isEditing && <button type="button" onClick={() => removeItem('certifications', cert)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>}
//                     </div>
//                 ))}
//                 {(!agentData.certifications || agentData.certifications.length === 0) && <p className="text-gray-500 italic text-center py-4">No certifications listed</p>}
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="lg:col-span-1 space-y-6">
//             {/* ... Sidebar content remains the same ... */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentProfile;

'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { Briefcase, MapPin, Phone, Mail, Globe, Award, Star, Building, Users, Calendar, CreditCard as Edit3, Save, X, Plus, Trash2, CheckCircle } from 'lucide-react';
import { ObjectSchema } from 'yup';

// 1. Explicitly define the form data type with optional properties
type AgentProfileFormData = {
  bio?: string;
  experience?: number | null;
  websiteUrl?: string | null;
  languages?: string[];
  specialties?: string[];
  certifications?: string[];
};

// 2. Apply the explicit type to the Yup schema
const agentProfileSchema: ObjectSchema<AgentProfileFormData> = yup.object({
  bio: yup.string().max(1000, 'Bio must be less than 1000 characters'),
  experience: yup.number().nullable().min(0, 'Experience cannot be negative'),
  websiteUrl: yup.string().url('Invalid URL').nullable(),
  languages: yup.array().of(yup.string().required()),
  specialties: yup.array().of(yup.string().required()),
  certifications: yup.array().of(yup.string().required()),
});

const AgentProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');

  // Using a single state for all profile data
  const [agentData, setAgentData] = useState({
    bio: user?.agentProfile?.bio || '',
    experience: user?.agentProfile?.experience || 0,
    websiteUrl: user?.agentProfile?.websiteUrl || '',
    languages: user?.agentProfile?.languages || ['English'],
    specialties: user?.agentProfile?.specialties || [],
    certifications: user?.agentProfile?.certifications || [],
  });

  const form = useForm<AgentProfileFormData>({
    resolver: yupResolver(agentProfileSchema),
    defaultValues: agentData,
  });

  // Sync form with state changes
  useEffect(() => {
    form.reset(agentData);
  }, [agentData, form]);

  const commonSpecialties = [
    'Residential Sales', 'Commercial Properties', 'Luxury Homes', 'First-Time Buyers',
    'Investment Properties', 'Property Management', 'Land Development', 'Industrial Properties',
  ];

  const commonLanguages = ['English', 'Yoruba', 'Igbo', 'Hausa', 'French', 'Arabic', 'Portuguese'];

  // FIX 2: Implemented API call for profile update.
  const handleSubmit = async (data: AgentProfileFormData) => {
    setIsLoading(true);
    const updatedProfileData = {
      ...data,
      languages: agentData.languages,
      specialties: agentData.specialties,
      certifications: agentData.certifications,
    };

    try {
      const response = await authAPI.updateProfile({ agentProfile: updatedProfileData });
      updateUser(response.data.data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = (type: 'languages' | 'specialties' | 'certifications', value: string) => {
    if (!value.trim()) return;
    
    const currentItems = agentData[type] || [];
    if (!currentItems.includes(value)) {
      setAgentData(prev => ({ ...prev, [type]: [...currentItems, value] }));
    }

    if (type === 'languages') setNewLanguage('');
    if (type === 'specialties') setNewSpecialty('');
    if (type === 'certifications') setNewCertification('');
  };

  const removeItem = (type: 'languages' | 'specialties' | 'certifications', value: string) => {
    setAgentData(prev => ({ ...prev, [type]: (prev[type] || []).filter((item: string) => item !== value) }));
  };

  const handleCancel = () => {
    setAgentData({
      bio: user?.agentProfile?.bio || '',
      experience: user?.agentProfile?.experience || 0,
      websiteUrl: user?.agentProfile?.websiteUrl || '',
      languages: user?.agentProfile?.languages || ['English'],
      specialties: user?.agentProfile?.specialties || [],
      certifications: user?.agentProfile?.certifications || [],
    });
    setIsEditing(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Agent Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-10 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-3xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h1>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Real Estate Agent</span>
                </div>
              </div>

              <div className="space-y-2 text-blue-100 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {agentData.websiteUrl && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <a
                      href={agentData.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {agentData.websiteUrl}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{agentData.experience || 0} years experience</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>4.8 rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{user?._count?.propertiesPosted || 0} properties</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={form.handleSubmit(handleSubmit)}
                    disabled={isLoading}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 inline mr-1" />
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
            {isEditing ? (
              <textarea
                {...form.register('bio')}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell potential clients about your experience, approach, and what makes you unique..."
                defaultValue={agentData.bio}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {agentData.bio || 'No bio available. Click Edit Profile to add one.'}
              </p>
            )}
          </div>

          {/* Experience & Credentials */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience & Credentials</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                {isEditing ? (
                  <input
                    {...form.register('experience')}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={agentData.experience}
                  />
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    {agentData.experience || 0} years
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                {isEditing ? (
                  <input
                    {...form.register('websiteUrl')}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                    defaultValue={agentData.websiteUrl}
                  />
                ) : (
                  <p className="text-gray-600">
                    {agentData.websiteUrl ? (
                      <a
                        href={agentData.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {agentData.websiteUrl}
                      </a>
                    ) : (
                      'No website provided'
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
              {isEditing && (
                <div className="flex space-x-2">
                  <select
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="">Select specialty</option>
                    {commonSpecialties
                      .filter(s => !agentData.specialties?.includes(s))
                      .map(specialty => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))
                    }
                  </select>
                  <button
                    type="button"
                    onClick={() => addItem('specialties', newSpecialty)}
                    disabled={!newSpecialty}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {agentData.specialties?.map((specialty: string) => (
                <span
                  key={specialty}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {specialty}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeItem('specialties', specialty)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {(!agentData.specialties || agentData.specialties.length === 0) && (
                <p className="text-gray-500 italic">No specialties listed</p>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
              {isEditing && (
                <div className="flex space-x-2">
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="">Select language</option>
                    {commonLanguages
                      .filter(lang => !agentData.languages?.includes(lang))
                      .map(language => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))
                    }
                  </select>
                  <button
                    type="button"
                    onClick={() => addItem('languages', newLanguage)}
                    disabled={!newLanguage}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {agentData.languages?.map((language: string) => (
                <span
                  key={language}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {language}
                  {isEditing && language !== 'English' && (
                    <button
                      type="button"
                      onClick={() => removeItem('languages', language)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Certification name"
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => addItem('certifications', newCertification)}
                    disabled={!newCertification}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {agentData.certifications?.map((cert: string) => (
                <div
                  key={cert}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-yellow-600 mr-3" />
                    <span className="font-medium text-gray-900">{cert}</span>
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeItem('certifications', cert)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {(!agentData.certifications || agentData.certifications.length === 0) && (
                <p className="text-gray-500 italic text-center py-4">No certifications listed</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Performance Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Properties Listed</span>
                <span className="font-semibold">{user?._count?.propertiesPosted || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Properties Managed</span>
                <span className="font-semibold">{user?._count?.propertiesManaged || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Client Reviews</span>
                <span className="font-semibold">{user?._count?.ratings || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Rating</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Verified</span>
                {user?.isEmailVerified ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Identity Verified</span>
                {user?.verificationStatus === 'VERIFIED' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">License Verified</span>
                <X className="w-5 h-5 text-red-500" />
              </div>
            </div>

            {user?.verificationStatus !== 'VERIFIED' && (
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Complete Verification
              </button>
            )}
          </div>

          {/* Contact Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                View Public Profile
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Download Business Card
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Share Profile Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;