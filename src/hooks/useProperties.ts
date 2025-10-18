// 'use client';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { propertiesAPI, landingAPI } from '../services/api';
// import toast from 'react-hot-toast';



// export const useProperties = (params?: any) => {
//   return useQuery({
//     queryKey: ['properties', params],
//     queryFn: () => propertiesAPI.getAll(params),
//     select: (data) => data.data,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// export const useProperty = (id: string) => {
//   return useQuery({
//     queryKey: ['property', id],
//     queryFn: () => propertiesAPI.getById(id, { trackView: 'true' }),
//     select: (data) => data.data.data,
//     enabled: !!id,
//   });
// };

// export const useSimilarProperties = (id: string) => {
//   return useQuery({
//     queryKey: ['similar-properties', id],
//     queryFn: () => propertiesAPI.getSimilar(id, { limit: 4 }),
//     select: (data) => data.data.data,
//     enabled: !!id,
//   });
// };
// // export const useProperties = (params?: any) => {
// //   return useQuery({
// //     queryKey: ['properties', params],
// //     queryFn: () => propertiesAPI.getAll(params),
// //     select: (data) => data.data,
// //     staleTime: 5 * 60 * 1000, // 5 minutes
// //   });
// // };

// // export const useProperty = (id: string) => {
// //   return useQuery({
// //     queryKey: ['property', id],
// //     queryFn: () => propertiesAPI.getById(id, { trackView: 'true' }),
// //     select: (data) => data.data.data,
// //     enabled: !!id,
// //   });
// // };

// export const useLandingData = (params?: any) => {
//   return useQuery({
//     queryKey: ['landing', params],
//     queryFn: () => landingAPI.getLandingData(params),
//     select: (data) => data.data.data,
//     staleTime: 2 * 60 * 1000, // 2 minutes
//   });
// };


// export const useCreateProperty = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     // The mutation function calls the API service
//     mutationFn: (formData) => propertiesAPI.create(formData),
    
//     // On success, invalidate queries to trigger a refetch of property data
//     onSuccess: () => {
//       // This will refetch any queries with the key 'properties'
//       queryClient.invalidateQueries({ queryKey: ['properties'] });
      
//       // You might also want to refetch landing page data if it displays properties
//       queryClient.invalidateQueries({ queryKey: ['landing'] });
      
//       toast.success('Property listing created successfully!');
//     },

//     // On error, display an informative toast message
//     onError: (error) => {
//       const errorMessage = error.message || 'Failed to create property. Please try again.';
//       toast.error(errorMessage);
//     },
//   });
// };

// export const useUpdateProperty = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) => propertiesAPI.update(id, data),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({ queryKey: ['properties'] });
//       queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
//       queryClient.invalidateQueries({ queryKey: ['landing'] });
//       toast.success('Property updated successfully!');
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'Failed to update property');
//     },
//   });
// };

// export const useDeleteProperty = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: propertiesAPI.delete,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['properties'] });
//       queryClient.invalidateQueries({ queryKey: ['landing'] });
//       toast.success('Property deleted successfully!');
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'Failed to delete property');
//     },
//   });
// };

// export const useSearchSuggestions = (query: string) => {
//   return useQuery({
//     queryKey: ['searchSuggestions', query],
//     queryFn: () => landingAPI.getSearchSuggestions({ query }),
//     select: (data) => data.data.data,
//     enabled: query.length >= 2,
//     staleTime: 10 * 60 * 1000, // 10 minutes
//   });
// };

'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesAPI, landingAPI, authAPI } from '../services/api';
import toast from 'react-hot-toast';

// New hook for fetching the current user's properties
export const useUserProperties = (params?: any) => {
  return useQuery({
    queryKey: ['userProperties', params],
    queryFn: () => authAPI.getUserProperties(params),
    select: (response) => response.data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProperties = (params?: any) => {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => propertiesAPI.getAll(params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesAPI.getById(id, { trackView: 'true' }),
    select: (data) => data.data.data,
    enabled: !!id,
  });
};

export const useSimilarProperties = (id: string) => {
  return useQuery({
    queryKey: ['similar-properties', id],
    queryFn: () => propertiesAPI.getSimilar(id, { limit: 4 }),
    select: (data) => data.data.data,
    enabled: !!id,
  });
};

export const useLandingData = (params?: any) => {
  return useQuery({
    queryKey: ['landing', params],
    queryFn: () => landingAPI.getLandingData(params),
    select: (data) => data.data.data,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: any) => propertiesAPI.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['userProperties'] });
      queryClient.invalidateQueries({ queryKey: ['landing'] });
      toast.success('Property listing created successfully!');
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || 'Failed to create property. Please try again.';
      toast.error(errorMessage);
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      propertiesAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['userProperties'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['landing'] });
      toast.success('Property updated successfully!');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to update property'
      );
    },
  });
};

// Updated to invalidate userProperties as well
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertiesAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['userProperties'] }); // <-- Important addition
      queryClient.invalidateQueries({ queryKey: ['landing'] });
      toast.success('Property deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to delete property'
      );
    },
  });
};

export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => landingAPI.getSearchSuggestions({ query }),
    select: (data) => data.data.data,
    enabled: query.length >= 2,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};