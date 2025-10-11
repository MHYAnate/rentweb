'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProperty, useUpdateProperty, useDeleteProperty } from '@/hooks/useProperties';
import { uploadToCloudinary } from '@/services/cloudinary';
import toast from 'react-hot-toast';

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