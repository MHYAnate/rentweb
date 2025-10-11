// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useCreateProperty, useUpdateProperty } from '../../hooks/useProperties';
// import { useRouter } from 'next/navigation';
// import {
//   Upload,
//   X,
//   MapPin,
//   Home,
//   DollarSign,
//   Calendar,
//   Square,
//   Bed,
//   Bath,
//   Wifi,
//   Car,
//   Shield,
//   Zap,
//   Waves,
//   TreePine,
//   Building,
//   Plus,
//   Minus,
//   Camera,
//   Video,
//   Info
// } from 'lucide-react';
// import { ObjectSchema } from 'yup';

// const propertySchema = yup.object({
//   title: yup.string().required('Title is required').max(100, 'Title must be less than 100 characters'),
//   description: yup.string().required('Description is required').max(2000, 'Description must be less than 2000 characters'),
//   type: yup.string().required('Property type is required'),
//   listingType: yup.string().required('Listing type is required'),
//   price: yup.number().required('Price is required').positive('Price must be positive'),
//   currency: yup.string().default('NGN'),
//   address: yup.string().required('Address is required'),
//   city: yup.string().required('City is required'),
//   state: yup.string().required('State is required'),
//   zipCode: yup.string(),
//   latitude: yup.number().nullable(),
//   longitude: yup.number().nullable(),
//   bedrooms: yup.number().nullable().positive('Bedrooms must be positive'),
//   bathrooms: yup.number().nullable().positive('Bathrooms must be positive'),
//   area: yup.number().nullable().positive('Area must be positive'),
//   yearBuilt: yup.number().nullable().min(1800, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
//   availableFrom: yup.date().nullable(),
// });

// type PropertyFormData = yup.InferType<typeof propertySchema>;

// interface PropertyFormProps {
//   initialData?: any;
//   isEditing?: boolean;
// }

// const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, isEditing = false }) => {
//   const [imageUrls, setImageUrls] = useState<string[]>(initialData?.imageUrls || []);
//   const [videoUrls, setVideoUrls] = useState<string[]>(initialData?.videoUrls || []);
//   const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || []);
//   const [customAmenity, setCustomAmenity] = useState('');
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter();
//   const createProperty = useCreateProperty();
//   const updateProperty = useUpdateProperty();

//   const form = useForm<PropertyFormData>({
//     resolver: yupResolver(propertySchema),
//     defaultValues: {
//       title: initialData?.title || '',
//       description: initialData?.description || '',
//       type: initialData?.type || '',
//       listingType: initialData?.listingType || '',
//       price: initialData?.price || 0,
//       currency: initialData?.currency || 'NGN',
//       address: initialData?.address || '',
//       city: initialData?.city || '',
//       state: initialData?.state || '',
//       zipCode: initialData?.zipCode || '',
//       latitude: initialData?.latitude || null,
//       longitude: initialData?.longitude || null,
//       bedrooms: initialData?.bedrooms || null,
//       bathrooms: initialData?.bathrooms || null,
//       area: initialData?.area || null,
//       yearBuilt: initialData?.yearBuilt || null,
//       availableFrom: initialData?.availableFrom ? new Date(initialData.availableFrom).toISOString().split('T')[0] : '',
//     }
//   });

//   const propertyTypes = [
//     { value: 'HOUSE', label: 'House', icon: Home },
//     { value: 'APARTMENT', label: 'Apartment', icon: Building },
//     { value: 'SHOP', label: 'Shop', icon: Building },
//     { value: 'OFFICE', label: 'Office', icon: Building },
//     { value: 'LAND', label: 'Land', icon: Square },
//     { value: 'WAREHOUSE', label: 'Warehouse', icon: Building },
//     { value: 'COMMERCIAL', label: 'Commercial', icon: Building },
//     { value: 'INDUSTRIAL', label: 'Industrial', icon: Building },
//   ];

//   const commonAmenities = [
//     { name: 'Parking', icon: Car },
//     { name: 'Security', icon: Shield },
//     { name: 'Generator', icon: Zap },
//     { name: 'Swimming Pool', icon: Waves },
//     { name: 'Garden', icon: TreePine },
//     { name: 'WiFi', icon: Wifi },
//     { name: 'Air Conditioning', icon: Building },
//     { name: 'Furnished', icon: Home },
//     { name: 'Balcony', icon: Building },
//     { name: 'Elevator', icon: Building },
//   ];

//   const nigerianStates = [
//     'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
//     'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
//     'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
//     'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
//     'Yobe', 'Zamfara'
//   ];

//   const addImageUrl = (url: string) => {
//     if (url && !imageUrls.includes(url)) {
//       setImageUrls([...imageUrls, url]);
//     }
//   };

//   const removeImageUrl = (url: string) => {
//     setImageUrls(imageUrls.filter(image => image !== url));
//   };

//   const addVideoUrl = (url: string) => {
//     if (url && !videoUrls.includes(url)) {
//       setVideoUrls([...videoUrls, url]);
//     }
//   };

//   const removeVideoUrl = (url: string) => {
//     setVideoUrls(videoUrls.filter(video => video !== url));
//   };

//   const toggleAmenity = (amenityName: string) => {
//     if (amenities.includes(amenityName)) {
//       setAmenities(amenities.filter(a => a !== amenityName));
//     } else {
//       setAmenities([...amenities, amenityName]);
//     }
//   };

//   const addCustomAmenity = () => {
//     if (customAmenity && !amenities.includes(customAmenity)) {
//       setAmenities([...amenities, customAmenity]);
//       setCustomAmenity('');
//     }
//   };

//   const onSubmit = async (data: PropertyFormData) => {
//     setIsSubmitting(true);
    
//     const submitData = {
//       ...data,
//       imageUrls,
//       videoUrls,
//       amenities,
//       availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
//     };

//     try {
//       if (isEditing && initialData?.id) {
//         await updateProperty.mutateAsync({ id: initialData.id, data: submitData });
//       } else {
//         await createProperty.mutateAsync(submitData);
//       }
//       router.push('/dashboard/properties');
//     } catch (error) {
//       // Error handled by mutations
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const nextStep = async () => {
//     const fieldsToValidate = getFieldsForStep(currentStep);
//     const isValid = await form.trigger(fieldsToValidate);
//     if (isValid) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const getFieldsForStep = (step: number): (keyof PropertyFormData)[] => {
//     switch (step) {
//       case 1:
//         return ['title', 'description', 'type', 'listingType'];
//       case 2:
//         return ['price', 'address', 'city', 'state'];
//       case 3:
//         return []; // Optional fields
//       default:
//         return [];
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Property Title *
//               </label>
//               <input
//                 {...form.register('title')}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="e.g., Beautiful 3-bedroom apartment in Victoria Island"
//               />
//               {form.formState.errors.title && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 {...form.register('description')}
//                 rows={6}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Describe your property in detail. Include features, nearby amenities, and what makes it special..."
//               />
//               {form.formState.errors.description && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Property Type *
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   {propertyTypes.map((type) => (
//                     <label key={type.value} className="relative">
//                       <input
//                         {...form.register('type')}
//                         type="radio"
//                         value={type.value}
//                         className="sr-only peer"
//                       />
//                       <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                         <type.icon className="w-6 h-6 text-gray-600 peer-checked:text-indigo-600" />
//                         <span className="mt-2 text-sm font-medium text-gray-700 peer-checked:text-indigo-700">
//                           {type.label}
//                         </span>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//                 {form.formState.errors.type && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.type.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Listing Type *
//                 </label>
//                 <div className="space-y-3">
//                   <label className="relative">
//                     <input
//                       {...form.register('listingType')}
//                       type="radio"
//                       value="FOR_RENT"
//                       className="sr-only peer"
//                     />
//                     <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                       <div className="flex items-center">
//                         <Calendar className="w-5 h-5 text-gray-600 mr-3" />
//                         <div>
//                           <span className="font-medium text-gray-900">For Rent</span>
//                           <p className="text-sm text-gray-500">Monthly rental property</p>
//                         </div>
//                       </div>
//                     </div>
//                   </label>

//                   <label className="relative">
//                     <input
//                       {...form.register('listingType')}
//                       type="radio"
//                       value="FOR_SALE"
//                       className="sr-only peer"
//                     />
//                     <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                       <div className="flex items-center">
//                         <DollarSign className="w-5 h-5 text-gray-600 mr-3" />
//                         <div>
//                           <span className="font-medium text-gray-900">For Sale</span>
//                           <p className="text-sm text-gray-500">Property for purchase</p>
//                         </div>
//                       </div>
//                     </div>
//                   </label>
//                 </div>
//                 {form.formState.errors.listingType && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.listingType.message}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price *
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <span className="text-gray-500 sm:text-sm">₦</span>
//                 </div>
//                 <input
//                   {...form.register('price')}
//                   type="number"
//                   className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="0"
//                 />
//               </div>
//               {form.formState.errors.price && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.price.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address *
//               </label>
//               <input
//                 {...form.register('address')}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Enter full address"
//               />
//               {form.formState.errors.address && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.address.message}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   City *
//                 </label>
//                 <input
//                   {...form.register('city')}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter city"
//                 />
//                 {form.formState.errors.city && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.city.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   State *
//                 </label>
//                 <select
//                   {...form.register('state')}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 >
//                   <option value="">Select State</option>
//                   {nigerianStates.map((state) => (
//                     <option key={state} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                 </select>
//                 {form.formState.errors.state && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.state.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 ZIP Code (Optional)
//               </label>
//               <input
//                 {...form.register('zipCode')}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Enter ZIP code"
//               />
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bedrooms
//                 </label>
//                 <div className="relative">
//                   <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     {...form.register('bedrooms')}
//                     type="number"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bathrooms
//                 </label>
//                 <div className="relative">
//                   <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     {...form.register('bathrooms')}
//                     type="number"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Area (sqft)
//                 </label>
//                 <div className="relative">
//                   <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     {...form.register('area')}
//                     type="number"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Year Built
//                 </label>
//                 <input
//                   {...form.register('yearBuilt')}
//                   type="number"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="e.g., 2020"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Available From
//                 </label>
//                 <input
//                   {...form.register('availableFrom')}
//                   type="date"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Amenities */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Amenities
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {commonAmenities.map((amenity) => (
//                   <label key={amenity.name} className="relative">
//                     <input
//                       type="checkbox"
//                       checked={amenities.includes(amenity.name)}
//                       onChange={() => toggleAmenity(amenity.name)}
//                       className="sr-only peer"
//                     />
//                     <div className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                       <amenity.icon className="w-4 h-4 text-gray-600 mr-2" />
//                       <span className="text-sm text-gray-700">{amenity.name}</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>

//               {/* Custom Amenity */}
//               <div className="mt-4 flex gap-2">
//                 <input
//                   type="text"
//                   value={customAmenity}
//                   onChange={(e) => setCustomAmenity(e.target.value)}
//                   placeholder="Add custom amenity"
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//                 <button
//                   type="button"
//                   onClick={addCustomAmenity}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Add
//                 </button>
//               </div>

//               {/* Selected Amenities */}
//               {amenities.length > 0 && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {amenities.map((amenity) => (
//                     <span
//                       key={amenity}
//                       className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
//                     >
//                       {amenity}
//                       <button
//                         type="button"
//                         onClick={() => setAmenities(amenities.filter(a => a !== amenity))}
//                         className="ml-2 text-indigo-600 hover:text-indigo-800"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             {/* Images */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Property Images
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <div className="space-y-2">
//                   <input
//                     type="url"
//                     placeholder="Enter image URL and press Enter"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         e.preventDefault();
//                         addImageUrl(e.currentTarget.value);
//                         e.currentTarget.value = '';
//                       }
//                     }}
//                   />
//                   <p className="text-xs text-gray-500">
//                     Add image URLs one by one. Press Enter to add each URL.
//                   </p>
//                 </div>
//               </div>

//               {imageUrls.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//                   {imageUrls.map((url, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={url}
//                         alt={`Property image ${index + 1}`}
//                         className="w-full h-32 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImageUrl(url)}
//                         className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Videos */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Property Videos (Optional)
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <div className="space-y-2">
//                   <input
//                     type="url"
//                     placeholder="Enter video URL and press Enter"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         e.preventDefault();
//                         addVideoUrl(e.currentTarget.value);
//                         e.currentTarget.value = '';
//                       }
//                     }}
//                   />
//                   <p className="text-xs text-gray-500">
//                     Add video URLs (YouTube, Vimeo, etc.). Press Enter to add each URL.
//                   </p>
//                 </div>
//               </div>

//               {videoUrls.length > 0 && (
//                 <div className="space-y-2 mt-4">
//                   {videoUrls.map((url, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <Video className="w-4 h-4 text-gray-400 mr-2" />
//                         <span className="text-sm text-gray-700 truncate">{url}</span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeVideoUrl(url)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   const steps = [
//     { number: 1, title: 'Basic Info', description: 'Property details and type' },
//     { number: 2, title: 'Location & Price', description: 'Address and pricing' },
//     { number: 3, title: 'Details', description: 'Rooms and amenities' },
//     { number: 4, title: 'Media', description: 'Photos and videos' },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={step.number} className="flex items-center">
//               <div className="flex items-center">
//                 <div
//                   className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                     currentStep >= step.number
//                       ? 'bg-indigo-600 border-indigo-600 text-white'
//                       : 'border-gray-300 text-gray-500'
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{step.number}</span>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-900">{step.title}</p>
//                   <p className="text-xs text-gray-500">{step.description}</p>
//                 </div>
//               </div>
//               {index < steps.length - 1 && (
//                 <div
//                   className={`flex-1 h-0.5 mx-4 ${
//                     currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
//                   }`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//         <div className="p-8">
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             {renderStepContent()}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
//                 disabled={currentStep === 1}
//                 className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Previous
//               </button>

//               <div className="flex space-x-3">
//                 {currentStep < 4 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="px-6 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-8 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {isSubmitting
//                       ? (isEditing ? 'Updating...' : 'Creating...')
//                       : (isEditing ? 'Update Property' : 'Create Property')
//                     }
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyForm;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useCreateProperty, useUpdateProperty } from '../../hooks/useProperties';
// import { useRouter } from 'next/navigation';
// import {
//   Upload,
//   X,
//   MapPin,
//   Home,
//   DollarSign,
//   Calendar,
//   Square,
//   Bed,
//   Bath,
//   Wifi,
//   Car,
//   Shield,
//   Zap,
//   Waves,
//   TreePine,
//   Building,
//   Plus,
//   Minus,
//   Camera,
//   Video,
//   Info
// } from 'lucide-react';
// import { ObjectSchema } from 'yup';

// // Define the form data type explicitly with correct optional fields
// type PropertyFormData = {
//   title: string;
//   description: string;
//   type: string;
//   listingType: string;
//   price: number;
//   currency: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode?: string;
//   latitude?: number | null;
//   longitude?: number | null;
//   bedrooms?: number | null;
//   bathrooms?: number | null;
//   area?: number | null;
//   yearBuilt?: number | null;
//   availableFrom?: string;
// };

// // Apply explicit type to the Yup schema with correct optional fields
// const propertySchema: ObjectSchema<PropertyFormData> = yup.object({
//   title: yup.string().required('Title is required').max(100, 'Title must be less than 100 characters'),
//   description: yup.string().required('Description is required').max(2000, 'Description must be less than 2000 characters'),
//   type: yup.string().required('Property type is required'),
//   listingType: yup.string().required('Listing type is required'),
//   price: yup.number().required('Price is required').positive('Price must be positive'),
//   currency: yup.string().default('NGN'),
//   address: yup.string().required('Address is required'),
//   city: yup.string().required('City is required'),
//   state: yup.string().required('State is required'),
//   zipCode: yup.string().optional(),
//   latitude: yup.number().nullable().optional(),
//   longitude: yup.number().nullable().optional(),
//   bedrooms: yup.number().nullable().positive('Bedrooms must be positive').optional(),
//   bathrooms: yup.number().nullable().positive('Bathrooms must be positive').optional(),
//   area: yup.number().nullable().positive('Area must be positive').optional(),
//   yearBuilt: yup.number().nullable().min(1800, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future').optional(),
//   availableFrom: yup.string().optional(),
// });

// interface PropertyFormProps {
//   initialData?: any;
//   isEditing?: boolean;
// }

// const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, isEditing = false }) => {
//   const [imageUrls, setImageUrls] = useState<string[]>(initialData?.imageUrls || []);
//   const [videoUrls, setVideoUrls] = useState<string[]>(initialData?.videoUrls || []);
//   const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || []);
//   const [customAmenity, setCustomAmenity] = useState('');
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter();
//   const createProperty = useCreateProperty();
//   const updateProperty = useUpdateProperty();

//   const form = useForm<PropertyFormData>({
//     resolver: yupResolver(propertySchema),
//     defaultValues: {
//       title: initialData?.title || '',
//       description: initialData?.description || '',
//       type: initialData?.type || '',
//       listingType: initialData?.listingType || '',
//       price: initialData?.price || 0,
//       currency: initialData?.currency || 'NGN',
//       address: initialData?.address || '',
//       city: initialData?.city || '',
//       state: initialData?.state || '',
//       zipCode: initialData?.zipCode || '',
//       latitude: initialData?.latitude || null,
//       longitude: initialData?.longitude || null,
//       bedrooms: initialData?.bedrooms || null,
//       bathrooms: initialData?.bathrooms || null,
//       area: initialData?.area || null,
//       yearBuilt: initialData?.yearBuilt || null,
//       availableFrom: initialData?.availableFrom ? new Date(initialData.availableFrom).toISOString().split('T')[0] : '',
//     }
//   });

//   const propertyTypes = [
//     { value: 'HOUSE', label: 'House', icon: Home },
//     { value: 'APARTMENT', label: 'Apartment', icon: Building },
//     { value: 'SHOP', label: 'Shop', icon: Building },
//     { value: 'OFFICE', label: 'Office', icon: Building },
//     { value: 'LAND', label: 'Land', icon: Square },
//     { value: 'WAREHOUSE', label: 'Warehouse', icon: Building },
//     { value: 'COMMERCIAL', label: 'Commercial', icon: Building },
//     { value: 'INDUSTRIAL', label: 'Industrial', icon: Building },
//   ];

//   const commonAmenities = [
//     { name: 'Parking', icon: Car },
//     { name: 'Security', icon: Shield },
//     { name: 'Generator', icon: Zap },
//     { name: 'Swimming Pool', icon: Waves },
//     { name: 'Garden', icon: TreePine },
//     { name: 'WiFi', icon: Wifi },
//     { name: 'Air Conditioning', icon: Building },
//     { name: 'Furnished', icon: Home },
//     { name: 'Balcony', icon: Building },
//     { name: 'Elevator', icon: Building },
//   ];

//   const nigerianStates = [
//     'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
//     'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
//     'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
//     'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
//     'Yobe', 'Zamfara'
//   ];

//   const addImageUrl = (url: string) => {
//     if (url && !imageUrls.includes(url)) {
//       setImageUrls([...imageUrls, url]);
//     }
//   };

//   const removeImageUrl = (url: string) => {
//     setImageUrls(imageUrls.filter(image => image !== url));
//   };

//   const addVideoUrl = (url: string) => {
//     if (url && !videoUrls.includes(url)) {
//       setVideoUrls([...videoUrls, url]);
//     }
//   };

//   const removeVideoUrl = (url: string) => {
//     setVideoUrls(videoUrls.filter(video => video !== url));
//   };

//   const toggleAmenity = (amenityName: string) => {
//     if (amenities.includes(amenityName)) {
//       setAmenities(amenities.filter(a => a !== amenityName));
//     } else {
//       setAmenities([...amenities, amenityName]);
//     }
//   };

//   const addCustomAmenity = () => {
//     if (customAmenity && !amenities.includes(customAmenity)) {
//       setAmenities([...amenities, customAmenity]);
//       setCustomAmenity('');
//     }
//   };

//   const onSubmit = async (data: PropertyFormData) => {
//     setIsSubmitting(true);
    
//     const submitData = {
//       ...data,
//       imageUrls,
//       videoUrls,
//       amenities,
//       availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
//     };

//     try {
//       if (isEditing && initialData?.id) {
//         await updateProperty.mutateAsync({ id: initialData.id, data: submitData });
//       } else {
//         await createProperty.mutateAsync(submitData);
//       }
//       router.push('/dashboard/properties');
//     } catch (error) {
//       // Error handled by mutations
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const nextStep = async () => {
//     const fieldsToValidate = getFieldsForStep(currentStep);
//     const isValid = await form.trigger(fieldsToValidate);
//     if (isValid) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const getFieldsForStep = (step: number): (keyof PropertyFormData)[] => {
//     switch (step) {
//       case 1:
//         return ['title', 'description', 'type', 'listingType'];
//       case 2:
//         return ['price', 'address', 'city', 'state'];
//       case 3:
//         return []; // Optional fields
//       default:
//         return [];
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Property Title *
//               </label>
//               <input
//                 {...form.register('title')}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="e.g., Beautiful 3-bedroom apartment in Victoria Island"
//               />
//               {form.formState.errors.title && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 {...form.register('description')}
//                 rows={6}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Describe your property in detail. Include features, nearby amenities, and what makes it special..."
//               />
//               {form.formState.errors.description && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Property Type *
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   {propertyTypes.map((type) => (
//                     <label key={type.value} className="relative">
//                       <input
//                         {...form.register('type')}
//                         type="radio"
//                         value={type.value}
//                         className="sr-only peer"
//                       />
//                       <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                         <type.icon className="w-6 h-6 text-gray-600 peer-checked:text-indigo-600" />
//                         <span className="mt-2 text-sm font-medium text-gray-700 peer-checked:text-indigo-700">
//                           {type.label}
//                         </span>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//                 {form.formState.errors.type && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.type.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Listing Type *
//                 </label>
//                 <div className="space-y-3">
//                   <label className="relative">
//                     <input
//                       {...form.register('listingType')}
//                       type="radio"
//                       value="FOR_RENT"
//                       className="sr-only peer"
//                     />
//                     <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                       <div className="flex items-center">
//                         <Calendar className="w-5 h-5 text-gray-600 mr-3" />
//                         <div>
//                           <span className="font-medium text-gray-900">For Rent</span>
//                           <p className="text-sm text-gray-500">Monthly rental property</p>
//                         </div>
//                       </div>
//                     </div>
//                   </label>

//                   <label className="relative">
//                     <input
//                       {...form.register('listingType')}
//                       type="radio"
//                       value="FOR_SALE"
//                       className="sr-only peer"
//                     />
//                     <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                       <div className="flex items-center">
//                         <DollarSign className="w-5 h-5 text-gray-600 mr-3" />
//                         <div>
//                           <span className="font-medium text-gray-900">For Sale</span>
//                           <p className="text-sm text-gray-500">Property for purchase</p>
//                         </div>
//                       </div>
//                     </div>
//                   </label>
//                 </div>
//                 {form.formState.errors.listingType && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.listingType.message}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price *
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <span className="text-gray-500 sm:text-sm">₦</span>
//                 </div>
//                 <input
//                   {...form.register('price')}
//                   type="number"
//                   className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="0"
//                 />
//               </div>
//               {form.formState.errors.price && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.price.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address *
//               </label>
//               <input
//                 {...form.register('address')}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Enter full address"
//               />
//               {form.formState.errors.address && (
//                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.address.message}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   City *
//                 </label>
//                 <input
//                   {...form.register('city')}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter city"
//                 />
//                 {form.formState.errors.city && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.city.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   State *
//                 </label>
//                 <select
//                   {...form.register('state')}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 >
//                   <option value="">Select State</option>
//                   {nigerianStates.map((state) => (
//                     <option key={state} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                 </select>
//                 {form.formState.errors.state && (
//                   <p className="mt-1 text-sm text-red-600">{form.formState.errors.state.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 ZIP Code (Optional)
//               </label>
//               <input
//                 {...form.register('zipCode')}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Enter ZIP code"
//               />
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bedrooms
//                 </label>
//                 <div className="relative">
//                   <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     {...form.register('bedrooms')}
//                     type="number"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bathrooms
//                 </label>
//                 <div className="relative">
//                   <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     {...form.register('bathrooms')}
//                     type="number"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Area (sqft)
//                 </label>
//                 <div className="relative">
//                   <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     {...form.register('area')}
//                     type="number"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Year Built
//                 </label>
//                 <input
//                   {...form.register('yearBuilt')}
//                   type="number"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="e.g., 2020"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Available From
//                 </label>
//                 <input
//                   {...form.register('availableFrom')}
//                   type="date"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Amenities */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Amenities
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {commonAmenities.map((amenity) => (
//                   <label key={amenity.name} className="relative">
//                     <input
//                       type="checkbox"
//                       checked={amenities.includes(amenity.name)}
//                       onChange={() => toggleAmenity(amenity.name)}
//                       className="sr-only peer"
//                     />
//                     <div className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
//                       <amenity.icon className="w-4 h-4 text-gray-600 mr-2" />
//                       <span className="text-sm text-gray-700">{amenity.name}</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>

//               {/* Custom Amenity */}
//               <div className="mt-4 flex gap-2">
//                 <input
//                   type="text"
//                   value={customAmenity}
//                   onChange={(e) => setCustomAmenity(e.target.value)}
//                   placeholder="Add custom amenity"
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//                 <button
//                   type="button"
//                   onClick={addCustomAmenity}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Add
//                 </button>
//               </div>

//               {/* Selected Amenities */}
//               {amenities.length > 0 && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {amenities.map((amenity) => (
//                     <span
//                       key={amenity}
//                       className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
//                     >
//                       {amenity}
//                       <button
//                         type="button"
//                         onClick={() => setAmenities(amenities.filter(a => a !== amenity))}
//                         className="ml-2 text-indigo-600 hover:text-indigo-800"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             {/* Images */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Property Images
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <div className="space-y-2">
//                   <input
//                     type="url"
//                     placeholder="Enter image URL and press Enter"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         e.preventDefault();
//                         addImageUrl(e.currentTarget.value);
//                         e.currentTarget.value = '';
//                       }
//                     }}
//                   />
//                   <p className="text-xs text-gray-500">
//                     Add image URLs one by one. Press Enter to add each URL.
//                   </p>
//                 </div>
//               </div>

//               {imageUrls.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//                   {imageUrls.map((url, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={url}
//                         alt={`Property image ${index + 1}`}
//                         className="w-full h-32 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImageUrl(url)}
//                         className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Videos */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Property Videos (Optional)
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <div className="space-y-2">
//                   <input
//                     type="url"
//                     placeholder="Enter video URL and press Enter"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         e.preventDefault();
//                         addVideoUrl(e.currentTarget.value);
//                         e.currentTarget.value = '';
//                       }
//                     }}
//                   />
//                   <p className="text-xs text-gray-500">
//                     Add video URLs (YouTube, Vimeo, etc.). Press Enter to add each URL.
//                   </p>
//                 </div>
//               </div>

//               {videoUrls.length > 0 && (
//                 <div className="space-y-2 mt-4">
//                   {videoUrls.map((url, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <Video className="w-4 h-4 text-gray-400 mr-2" />
//                         <span className="text-sm text-gray-700 truncate">{url}</span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeVideoUrl(url)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   const steps = [
//     { number: 1, title: 'Basic Info', description: 'Property details and type' },
//     { number: 2, title: 'Location & Price', description: 'Address and pricing' },
//     { number: 3, title: 'Details', description: 'Rooms and amenities' },
//     { number: 4, title: 'Media', description: 'Photos and videos' },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={step.number} className="flex items-center">
//               <div className="flex items-center">
//                 <div
//                   className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                     currentStep >= step.number
//                       ? 'bg-indigo-600 border-indigo-600 text-white'
//                       : 'border-gray-300 text-gray-500'
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{step.number}</span>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-900">{step.title}</p>
//                   <p className="text-xs text-gray-500">{step.description}</p>
//                 </div>
//               </div>
//               {index < steps.length - 1 && (
//                 <div
//                   className={`flex-1 h-0.5 mx-4 ${
//                     currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
//                   }`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//         <div className="p-8">
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             {renderStepContent()}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
//                 disabled={currentStep === 1}
//                 className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Previous
//               </button>

//               <div className="flex space-x-3">
//                 {currentStep < 4 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="px-6 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-8 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {isSubmitting
//                       ? (isEditing ? 'Updating...' : 'Creating...')
//                       : (isEditing ? 'Update Property' : 'Create Property')
//                     }
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyForm;

'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProperty, useUpdateProperty, useDeleteProperty } from '@/hooks/useProperties';
import { uploadToCloudinary } from '@/services/cloudinary';
import toast from 'react-hot-toast';

// const PROPERTY_TYPES = ['APARTMENT', 'HOUSE', 'VILLA', 'CONDO', 'TOWNHOUSE', 'COMMERCIAL'] as const;
// const LISTING_TYPES = ['RENT', 'SALE'] as const;
// const AMENITIES = [
//   'WiFi', 'Parking', 'Swimming Pool', 'Gym', 'Air Conditioning', 
//   'Heating', 'Laundry', 'Pet Friendly', 'Furnished', 'Security'
// ] as const;

const PROPERTY_TYPES = ['HOUSE', 'APARTMENT', 'SHOP', 'OFFICE', 'LAND', 'WAREHOUSE', 'COMMERCIAL', 'INDUSTRIAL'] as const;
const LISTING_TYPES = ['FOR_RENT', 'FOR_SALE'] as const;

const AMENITIES = [
  'WiFi', 'Parking', 'Swimming Pool', 'Gym', 'Air Conditioning', 
  'Heating', 'Laundry', 'Pet Friendly', 'Furnished', 'Security'
] as const;

type PropertyType = typeof PROPERTY_TYPES[number];
type ListingType = typeof LISTING_TYPES[number];
type Amenity = typeof AMENITIES[number];

interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
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
  amenities?: Amenity[];
  availableFrom?: string;
  imageUrls: string[];
}

interface PropertyFormProps {
  property?: Property | null;
  onSuccess?: () => void;
}

export default function PropertyForm({ property = null, onSuccess }: PropertyFormProps) {
  const [step, setStep] = useState<number>(1);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(property?.imageUrls || []);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Property>({
    defaultValues: property ? {
      ...property,
      availableFrom: property.availableFrom?.split('T')[0],
    } : undefined
  });

  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();
  const deleteMutation = useDeleteProperty();

  const selectedAmenities = watch('amenities') || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length + existingImages.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    setImageFiles(prev => [...prev, ...files]);
  };

  const removeImage = (index: number, isExisting = false) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setImageFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      try {
        const result = await uploadToCloudinary(file);
        uploadedUrls.push(result.secure_url);
      } catch (error) {
        console.error('Upload failed:', error);
        throw new Error(`Failed to upload image: ${file.name}`);
      }
    }
    return uploadedUrls;
  };

  const onSubmit = async (data: Property) => {
    try {
      setIsUploading(true);
      let imageUrls = [...existingImages];

      if (imageFiles.length > 0) {
        const newImageUrls = await uploadImages(imageFiles);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      if (imageUrls.length === 0) {
        toast.error('At least one image is required');
        return;
      }

      const formData: Property = {
        ...data,
        price: parseFloat(String(data.price)),
        bedrooms: data.bedrooms ? parseInt(String(data.bedrooms)) : undefined,
        bathrooms: data.bathrooms ? parseInt(String(data.bathrooms)) : undefined,
        area: data.area ? parseFloat(String(data.area)) : undefined,
        yearBuilt: data.yearBuilt ? parseInt(String(data.yearBuilt)) : undefined,
        latitude: data.latitude ? parseFloat(String(data.latitude)) : undefined,
        longitude: data.longitude ? parseFloat(String(data.longitude)) : undefined,
        amenities: Array.isArray(data.amenities) ? data.amenities : [],
        imageUrls,
      };

      if (property) {
        await updateMutation.mutateAsync({ id: property.id, data: formData });
        toast.success('Property updated successfully!');
      } else {
        await createMutation.mutateAsync(formData as any);
        toast.success('Property created successfully!');
      }

      onSuccess?.();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Failed to save property');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!property || !window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await deleteMutation.mutateAsync(property.id);
      toast.success('Property deleted successfully!');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {property ? 'Edit Property' : 'Create New Property'}
      </h2>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div className={`w-20 h-1 mx-2 ${
                step > stepNum ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Beautiful 3-bedroom apartment"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Property Type *</label>
                <select
                  {...register('type', { required: 'Property type is required' })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  {PROPERTY_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Listing Type *</label>
                <select
                  {...register('listingType', { required: 'Listing type is required' })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Listing Type</option>
                  {LISTING_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.listingType && <p className="text-red-500 text-sm mt-1">{errors.listingType.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price *</label>
                <input
                  type="number"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your property in detail..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Location & Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Location & Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input
                  {...register('address', { required: 'Address is required' })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main Street"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  {...register('city', { required: 'City is required' })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lagos"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <input
                  {...register('state', { required: 'State is required' })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lagos State"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Zip Code</label>
                <input
                  {...register('zipCode')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <input
                  type="number"
                  {...register('bedrooms')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bathrooms</label>
                <input
                  type="number"
                  {...register('bathrooms')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Area (sq ft)</label>
                <input
                  type="number"
                  {...register('area')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year Built</label>
                <input
                  type="number"
                  {...register('yearBuilt')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2020"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Latitude</label>
                <input
                  type="number"
                  step="any"
                  {...register('latitude')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6.5244"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Longitude</label>
                <input
                  type="number"
                  step="any"
                  {...register('longitude')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.3792"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Images & Amenities */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Images & Amenities</h3>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Images *</label>
              <p className="text-sm text-gray-600 mb-3">Upload up to 10 images (first image will be the main thumbnail)</p>
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Existing Images:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {existingImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, true)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {imageFiles.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">New Images:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {imageFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, false)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Input */}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-dashed rounded-lg"
                disabled={imageFiles.length + existingImages.length >= 10}
              />
              <p className="text-sm text-gray-500 mt-1">
                {10 - (imageFiles.length + existingImages.length)} images remaining
              </p>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {AMENITIES.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={amenity}
                      {...register('amenities')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Available From */}
            <div>
              <label className="block text-sm font-medium mb-2">Available From</label>
              <input
                type="date"
                {...register('availableFrom')}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>

              <div className="flex space-x-4">
                {property && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete Property'}
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isUploading || createMutation.isPending || updateMutation.isPending}
                  className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Uploading Images...' : 
                   property ? 
                   (updateMutation.isPending ? 'Updating...' : 'Update Property') : 
                   (createMutation.isPending ? 'Creating...' : 'Create Property')}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}