// services/cloudinary.ts

interface CloudinaryUploadResponse {
  secure_url: string;
  [key: string]: any; // You can refine this if you need more specific fields
}

export const uploadToCloudinary = async (file: File): Promise<CloudinaryUploadResponse> => {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || !cloudName) {
    throw new Error('Missing Cloudinary configuration');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'properties');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const result: CloudinaryUploadResponse = await response.json();
  return result;
};