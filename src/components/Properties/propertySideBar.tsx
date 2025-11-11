// // components/PropertySidebar.tsx
// 'use client';

// import { useState } from 'react';
// import {
//   PhoneIcon,
//   EnvelopeIcon,
//   UserIcon,
//   ShieldCheckIcon,
// } from '@heroicons/react/24/outline';
// // import { FavoriteButton } from './FavoriteButton';
// // import { ShareButton } from './ShareButton';

// interface PropertySidebarProps {
//   property: any;
// }

// export function PropertySidebar({ property }: PropertySidebarProps) {
//   const [showFullPhone, setShowFullPhone] = useState(false);

//   const contactPerson = property.managedByAgent || property.postedBy;

//   const formatPhone = (phone: string) => {
//     if (showFullPhone) {
//       return phone;
//     }
//     // Show only last 4 digits initially
//     return `••• ••• ${phone.slice(-4)}`;
//   };

//   const handlePhoneClick = () => {
//     setShowFullPhone(true);
//   };

//   const handleCall = () => {
//     window.open(`tel:${contactPerson.phone}`);
//   };

//   const handleEmail = () => {
//     if (contactPerson.email) {
//       window.open(`mailto:${contactPerson.email}`);
//     }
//   };

//   const getVerificationBadge = (role: string, verificationStatus: string) => {
//     if (role === 'ADMIN') {
//       return {
//         color: 'bg-purple-100 text-purple-800',
//         text: 'Verified Admin',
//         icon: ShieldCheckIcon,
//       };
//     }
    
//     if (verificationStatus === 'VERIFIED') {
//       return {
//         color: 'bg-green-100 text-green-800',
//         text: 'Verified',
//         icon: ShieldCheckIcon,
//       };
//     }
    
//     return null;
//   };

//   const verificationBadge = getVerificationBadge(
//     contactPerson.role,
//     contactPerson.verificationStatus
//   );

//   return (
//     <div className="space-y-6">
//       {/* Contact Card */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
//         {/* Contact Person */}
//         <div className="flex items-center space-x-3 mb-4">
//           {contactPerson.avatarUrl ? (
//             <img
//               src={contactPerson.avatarUrl}
//               alt={contactPerson.firstName}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//               <UserIcon className="h-6 w-6 text-blue-600" />
//             </div>
//           )}
//           <div>
//             <h4 className="font-semibold text-gray-900">
//               {contactPerson.firstName} {contactPerson.lastName}
//             </h4>
//             <p className="text-sm text-gray-600 capitalize">
//               {contactPerson.role.toLowerCase()}
//             </p>
//             {verificationBadge && (
//               <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${verificationBadge.color}`}>
//                 <verificationBadge.icon className="h-3 w-3 mr-1" />
//                 {verificationBadge.text}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Phone Number */}
//         <div className="space-y-3">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <span className="font-mono text-gray-900">
//                 {formatPhone(contactPerson.phone)}
//               </span>
//               {!showFullPhone && (
//                 <button
//                   onClick={handlePhoneClick}
//                   className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//                 >
//                   Show
//                 </button>
//               )}
//             </div>
//             {showFullPhone && (
//               <button
//                 onClick={handleCall}
//                 className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
//               >
//                 <PhoneIcon className="h-4 w-4" />
//                 <span>Call Now</span>
//               </button>
//             )}
//           </div>

//           {/* Email */}
//           {contactPerson.email && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <button
//                 onClick={handleEmail}
//                 className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
//               >
//                 <span className="text-gray-900 truncate">{contactPerson.email}</span>
//                 <EnvelopeIcon className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Actions</h3>
        
//         <div className="space-y-3">
//           {/* <FavoriteButton propertyId={property.id} size="large" /> */}
//           {/* <ShareButton property={property} /> */}
          
//           <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
//             Report Property
//           </button>
//         </div>
//       </div>

//       {/* Property Stats */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Statistics</h3>
        
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <span className="text-gray-600">Views</span>
//             <span className="font-semibold text-gray-900">
//               {property._count?.views || 0}
//             </span>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <span className="text-gray-600">Favorites</span>
//             <span className="font-semibold text-gray-900">
//               {property._count?.favoritedBy || 0}
//             </span>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <span className="text-gray-600">Ratings</span>
//             <span className="font-semibold text-gray-900">
//               {property.ratings?.length || 0}
//             </span>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <span className="text-gray-600">Listed</span>
//             <span className="font-semibold text-gray-900">
//               {new Date(property.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Price Summary */}
//       <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Summary</h3>
        
//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <span className="text-gray-600">Listing Price</span>
//             <span className="text-2xl font-bold text-blue-600">
//               {property.currency} {property.price.toLocaleString()}
//             </span>
//           </div>
          
//           {property.listingType === 'FOR_RENT' && (
//             <p className="text-sm text-gray-600">
//               Monthly rental • {property.currency}
//             </p>
//           )}
          
//           {property.listingType === 'FOR_SALE' && (
//             <p className="text-sm text-gray-600">
//               Purchase price • {property.currency}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// components/PropertySidebar.tsx
'use client';

import { useState } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface PropertySidebarProps {
  property: any;
}

export function PropertySidebar({ property }: PropertySidebarProps) {
  const [showFullPhone, setShowFullPhone] = useState(false);

  const contactPerson = property.managedByAgent || property.postedBy;

  const formatPhone = (phone: string) => {
    if (showFullPhone) {
      return phone;
    }
    return `••• ••• ${phone.slice(-4)}`;
  };

  const handlePhoneClick = () => {
    setShowFullPhone(true);
  };

  const handleCall = () => {
    window.open(`tel:${contactPerson.phone}`);
  };

  const handleEmail = () => {
    if (contactPerson.email) {
      window.open(`mailto:${contactPerson.email}`);
    }
  };

  const getVerificationBadge = (role: string, verificationStatus: string) => {
    if (role === 'ADMIN') {
      return {
        color: 'bg-purple-100 text-purple-800',
        text: 'Verified Admin',
        icon: ShieldCheckIcon,
      };
    }

    if (verificationStatus === 'VERIFIED') {
      return {
        color: 'bg-green-100 text-green-800',
        text: 'Verified',
        icon: ShieldCheckIcon,
      };
    }

    return null;
  };

  const verificationBadge = getVerificationBadge(
    contactPerson.role,
    contactPerson.verificationStatus
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

        <div className="flex items-center space-x-3 mb-4">
          {contactPerson.avatarUrl ? (
            <img
              src={contactPerson.avatarUrl}
              alt={contactPerson.firstName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900">
              {contactPerson.firstName} {contactPerson.lastName}
            </h4>
            <p className="text-sm text-gray-600 capitalize">
              {contactPerson.role.toLowerCase()}
            </p>
            {verificationBadge && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${verificationBadge.color}`}>
                <verificationBadge.icon className="h-3 w-3 mr-1" />
                {verificationBadge.text}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-mono text-gray-900">
                {formatPhone(contactPerson.phone)}
              </span>
              {!showFullPhone && (
                <button
                  onClick={handlePhoneClick}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Show
                </button>
              )}
            </div>
            {showFullPhone && (
              <button
                onClick={handleCall}
                className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>Call Now</span>
              </button>
            )}
          </div>

          {contactPerson.email && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <button
                onClick={handleEmail}
                className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="text-gray-900 truncate">{contactPerson.email}</span>
                <EnvelopeIcon className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Actions</h3>

        <div className="space-y-3">
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
            Report Property
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Statistics</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Views</span>
            <span className="font-semibold text-gray-900">
              {property._count?.views || 0}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Favorites</span>
            <span className="font-semibold text-gray-900">
              {property._count?.favoritedBy || 0}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ratings</span>
            <span className="font-semibold text-gray-900">
              {property.ratings?.length || 0}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Listed</span>
            <span className="font-semibold text-gray-900">
              {new Date(property.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Summary</h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Listing Price</span>
            <span className="text-2xl font-bold text-blue-600">
              {property.currency} {property.price.toLocaleString()}
            </span>
          </div>

          {property.listingType === 'FOR_RENT' && (
            <p className="text-sm text-gray-600">
              Yearly rental • {property.currency}
            </p>
          )}

          {property.listingType === 'FOR_SALE' && (
            <p className="text-sm text-gray-600">
              Purchase price • {property.currency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
