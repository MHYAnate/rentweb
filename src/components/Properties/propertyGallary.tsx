// // components/PropertyGallery.tsx
// 'use client';

// import { useState } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon, X } from 'lucide-react';

// interface PropertyGalleryProps {
//   images: string[];
// }

// export function PropertyGallery({ images }: PropertyGalleryProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const nextImage = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const openModal = (index: number) => {
//     setCurrentIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (!images || images.length === 0) {
//     return (
//       <div className="bg-gray-200 rounded-lg w-full h-96 flex items-center justify-center">
//         <span className="text-gray-500">No images available</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Main Gallery */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         {/* Main Image */}
//         <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
//           <img
//             src={images[currentIndex]}
//             alt={`Property image ${currentIndex + 1}`}
//             className="w-full h-96 object-cover cursor-pointer"
//             onClick={() => openModal(currentIndex)}
//           />
          
//           {/* Navigation Arrows */}
//           {images.length > 1 && (
//             <>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
//               >
//                 <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
//               >
//                 <ChevronRightIcon className="h-6 w-6 text-gray-700" />
//               </button>
//             </>
//           )}

//           {/* Image Counter */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
//             {currentIndex + 1} / {images.length}
//           </div>
//         </div>

//         {/* Thumbnail Strip */}
//         {images.length > 1 && (
//           <div className="p-4 bg-gray-50">
//             <div className="flex space-x-2 overflow-x-auto">
//               {images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                     index === currentIndex
//                       ? 'border-blue-500 ring-2 ring-blue-200'
//                       : 'border-gray-300 hover:border-gray-400'
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modal for Fullscreen View */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
//           <div className="relative max-w-7xl max-h-full w-full h-full">
//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
//             >
//               <X className="h-8 w-8" />
//             </button>

//             {/* Main Image */}
//             <div className="flex items-center justify-center h-full w-full">
//               <img
//                 src={images[currentIndex]}
//                 alt={`Property image ${currentIndex + 1}`}
//                 className="max-w-full max-h-full object-contain"
//               />
//             </div>

//             {/* Navigation */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
//                 >
//                   <ChevronLeftIcon className="h-12 w-12" />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
//                 >
//                   <ChevronRightIcon className="h-12 w-12" />
//                 </button>

//                 {/* Image Counter */}
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
//                   {currentIndex + 1} / {images.length}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// components/PropertyGallery.tsx
'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg w-full h-96 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
          <img
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            className="w-full h-96 object-cover cursor-pointer"
            onClick={() => openModal(currentIndex)}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {images.length > 1 && (
          <div className="p-4 bg-gray-50">
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full w-full h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="flex items-center justify-center h-full w-full">
              <img
                src={images[currentIndex]}
                alt={`Property image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronLeftIcon className="h-12 w-12" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronRightIcon className="h-12 w-12" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
