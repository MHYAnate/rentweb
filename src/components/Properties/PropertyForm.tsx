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

'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateProperty, useUpdateProperty } from '../../hooks/useProperties';
import { useRouter } from 'next/navigation';
import {
  Upload,
  X,
  MapPin,
  Home,
  DollarSign,
  Calendar,
  Square,
  Bed,
  Bath,
  Wifi,
  Car,
  Shield,
  Zap,
  Waves,
  TreePine,
  Building,
  Plus,
  Minus,
  Camera,
  Video,
  Info
} from 'lucide-react';
import { ObjectSchema } from 'yup';

// Define the form data type explicitly with correct optional fields
type PropertyFormData = {
  title: string;
  description: string;
  type: string;
  listingType: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number | null;
  longitude?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  yearBuilt?: number | null;
  availableFrom?: string;
};

// Apply explicit type to the Yup schema with correct optional fields
const propertySchema: ObjectSchema<PropertyFormData> = yup.object({
  title: yup.string().required('Title is required').max(100, 'Title must be less than 100 characters'),
  description: yup.string().required('Description is required').max(2000, 'Description must be less than 2000 characters'),
  type: yup.string().required('Property type is required'),
  listingType: yup.string().required('Listing type is required'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  currency: yup.string().default('NGN'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().optional(),
  latitude: yup.number().nullable().optional(),
  longitude: yup.number().nullable().optional(),
  bedrooms: yup.number().nullable().positive('Bedrooms must be positive').optional(),
  bathrooms: yup.number().nullable().positive('Bathrooms must be positive').optional(),
  area: yup.number().nullable().positive('Area must be positive').optional(),
  yearBuilt: yup.number().nullable().min(1800, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future').optional(),
  availableFrom: yup.string().optional(),
});

interface PropertyFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, isEditing = false }) => {
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.imageUrls || []);
  const [videoUrls, setVideoUrls] = useState<string[]>(initialData?.videoUrls || []);
  const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || []);
  const [customAmenity, setCustomAmenity] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const form = useForm<PropertyFormData>({
    resolver: yupResolver(propertySchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      type: initialData?.type || '',
      listingType: initialData?.listingType || '',
      price: initialData?.price || 0,
      currency: initialData?.currency || 'NGN',
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zipCode: initialData?.zipCode || '',
      latitude: initialData?.latitude || null,
      longitude: initialData?.longitude || null,
      bedrooms: initialData?.bedrooms || null,
      bathrooms: initialData?.bathrooms || null,
      area: initialData?.area || null,
      yearBuilt: initialData?.yearBuilt || null,
      availableFrom: initialData?.availableFrom ? new Date(initialData.availableFrom).toISOString().split('T')[0] : '',
    }
  });

  const propertyTypes = [
    { value: 'HOUSE', label: 'House', icon: Home },
    { value: 'APARTMENT', label: 'Apartment', icon: Building },
    { value: 'SHOP', label: 'Shop', icon: Building },
    { value: 'OFFICE', label: 'Office', icon: Building },
    { value: 'LAND', label: 'Land', icon: Square },
    { value: 'WAREHOUSE', label: 'Warehouse', icon: Building },
    { value: 'COMMERCIAL', label: 'Commercial', icon: Building },
    { value: 'INDUSTRIAL', label: 'Industrial', icon: Building },
  ];

  const commonAmenities = [
    { name: 'Parking', icon: Car },
    { name: 'Security', icon: Shield },
    { name: 'Generator', icon: Zap },
    { name: 'Swimming Pool', icon: Waves },
    { name: 'Garden', icon: TreePine },
    { name: 'WiFi', icon: Wifi },
    { name: 'Air Conditioning', icon: Building },
    { name: 'Furnished', icon: Home },
    { name: 'Balcony', icon: Building },
    { name: 'Elevator', icon: Building },
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  const addImageUrl = (url: string) => {
    if (url && !imageUrls.includes(url)) {
      setImageUrls([...imageUrls, url]);
    }
  };

  const removeImageUrl = (url: string) => {
    setImageUrls(imageUrls.filter(image => image !== url));
  };

  const addVideoUrl = (url: string) => {
    if (url && !videoUrls.includes(url)) {
      setVideoUrls([...videoUrls, url]);
    }
  };

  const removeVideoUrl = (url: string) => {
    setVideoUrls(videoUrls.filter(video => video !== url));
  };

  const toggleAmenity = (amenityName: string) => {
    if (amenities.includes(amenityName)) {
      setAmenities(amenities.filter(a => a !== amenityName));
    } else {
      setAmenities([...amenities, amenityName]);
    }
  };

  const addCustomAmenity = () => {
    if (customAmenity && !amenities.includes(customAmenity)) {
      setAmenities([...amenities, customAmenity]);
      setCustomAmenity('');
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    
    const submitData = {
      ...data,
      imageUrls,
      videoUrls,
      amenities,
      availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
    };

    try {
      if (isEditing && initialData?.id) {
        await updateProperty.mutateAsync({ id: initialData.id, data: submitData });
      } else {
        await createProperty.mutateAsync(submitData);
      }
      router.push('/dashboard/properties');
    } catch (error) {
      // Error handled by mutations
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof PropertyFormData)[] => {
    switch (step) {
      case 1:
        return ['title', 'description', 'type', 'listingType'];
      case 2:
        return ['price', 'address', 'city', 'state'];
      case 3:
        return []; // Optional fields
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title *
              </label>
              <input
                {...form.register('title')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Beautiful 3-bedroom apartment in Victoria Island"
              />
              {form.formState.errors.title && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...form.register('description')}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe your property in detail. Include features, nearby amenities, and what makes it special..."
              />
              {form.formState.errors.description && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((type) => (
                    <label key={type.value} className="relative">
                      <input
                        {...form.register('type')}
                        type="radio"
                        value={type.value}
                        className="sr-only peer"
                      />
                      <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
                        <type.icon className="w-6 h-6 text-gray-600 peer-checked:text-indigo-600" />
                        <span className="mt-2 text-sm font-medium text-gray-700 peer-checked:text-indigo-700">
                          {type.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                {form.formState.errors.type && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Listing Type *
                </label>
                <div className="space-y-3">
                  <label className="relative">
                    <input
                      {...form.register('listingType')}
                      type="radio"
                      value="FOR_RENT"
                      className="sr-only peer"
                    />
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                        <div>
                          <span className="font-medium text-gray-900">For Rent</span>
                          <p className="text-sm text-gray-500">Monthly rental property</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      {...form.register('listingType')}
                      type="radio"
                      value="FOR_SALE"
                      className="sr-only peer"
                    />
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-gray-600 mr-3" />
                        <div>
                          <span className="font-medium text-gray-900">For Sale</span>
                          <p className="text-sm text-gray-500">Property for purchase</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                {form.formState.errors.listingType && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.listingType.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₦</span>
                </div>
                <input
                  {...form.register('price')}
                  type="number"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              {form.formState.errors.price && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                {...form.register('address')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter full address"
              />
              {form.formState.errors.address && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...form.register('city')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter city"
                />
                {form.formState.errors.city && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  {...form.register('state')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {form.formState.errors.state && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.state.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code (Optional)
              </label>
              <input
                {...form.register('zipCode')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter ZIP code"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...form.register('bedrooms')}
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <div className="relative">
                  <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...form.register('bathrooms')}
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sqft)
                </label>
                <div className="relative">
                  <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...form.register('area')}
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <input
                  {...form.register('yearBuilt')}
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available From
                </label>
                <input
                  {...form.register('availableFrom')}
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonAmenities.map((amenity) => (
                  <label key={amenity.name} className="relative">
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity.name)}
                      onChange={() => toggleAmenity(amenity.name)}
                      className="sr-only peer"
                    />
                    <div className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50 transition-colors">
                      <amenity.icon className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">{amenity.name}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Custom Amenity */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  placeholder="Add custom amenity"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addCustomAmenity}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Selected Amenities */}
              {amenities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => setAmenities(amenities.filter(a => a !== amenity))}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Enter image URL and press Enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addImageUrl(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500">
                    Add image URLs one by one. Press Enter to add each URL.
                  </p>
                </div>
              </div>

              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageUrl(url)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Videos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Enter video URL and press Enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addVideoUrl(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500">
                    Add video URLs (YouTube, Vimeo, etc.). Press Enter to add each URL.
                  </p>
                </div>
              </div>

              {videoUrls.length > 0 && (
                <div className="space-y-2 mt-4">
                  {videoUrls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Video className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700 truncate">{url}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVideoUrl(url)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Property details and type' },
    { number: 2, title: 'Location & Price', description: 'Address and pricing' },
    { number: 3, title: 'Details', description: 'Rooms and amenities' },
    { number: 4, title: 'Media', description: 'Photos and videos' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  <span className="text-sm font-medium">{step.number}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-8">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex space-x-3">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting
                      ? (isEditing ? 'Updating...' : 'Creating...')
                      : (isEditing ? 'Update Property' : 'Create Property')
                    }
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;