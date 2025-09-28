// 'use client';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { propertiesAPI, landingAPI } from '../services/api';
// import toast from 'react-hot-toast';

// export const useProperties = (params?: any) => {
//   return useQuery(
//     ['properties', params],
//     () => propertiesAPI.getAll(params),
//     {
//       select: (data) => data.data,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     }
//   );
// };

// export const useProperty = (id: string) => {
//   return useQuery(
//     ['property', id],
//     () => propertiesAPI.getById(id, { trackView: 'true' }),
//     {
//       select: (data) => data.data.data,
//       enabled: !!id,
//     }
//   );
// };

// export const useLandingData = (params?: any) => {
//   return useQuery(
//     ['landing', params],
//     () => landingAPI.getLandingData(params),
//     {
//       select: (data) => data.data.data,
//       staleTime: 2 * 60 * 1000, // 2 minutes
//     }
//   );
// };

// export const useCreateProperty = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation(propertiesAPI.create, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['properties']);
//       queryClient.invalidateQueries(['landing']);
//       toast.success('Property created successfully!');
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'Failed to create property');
//     },
//   });
// };

// export const useUpdateProperty = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation(
//     ({ id, data }: { id: string; data: any }) => propertiesAPI.update(id, data),
//     {
//       onSuccess: (_, variables) => {
//         queryClient.invalidateQueries(['properties']);
//         queryClient.invalidateQueries(['property', variables.id]);
//         queryClient.invalidateQueries(['landing']);
//         toast.success('Property updated successfully!');
//       },
//       onError: (error: any) => {
//         toast.error(error.response?.data?.message || 'Failed to update property');
//       },
//     }
//   );
// };

// export const useDeleteProperty = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation(propertiesAPI.delete, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['properties']);
//       queryClient.invalidateQueries(['landing']);
//       toast.success('Property deleted successfully!');
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'Failed to delete property');
//     },
//   });
// };

// export const useSearchSuggestions = (query: string) => {
//   return useQuery(
//     ['searchSuggestions', query],
//     () => landingAPI.getSearchSuggestions({ query }),
//     {
//       select: (data) => data.data.data,
//       enabled: query.length >= 2,
//       staleTime: 10 * 60 * 1000, // 10 minutes
//     }
//   );
// };

'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesAPI, landingAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useProperties = (params?: any) => {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => propertiesAPI.getAll(params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
    mutationFn: propertiesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['landing'] });
      toast.success('Property created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create property');
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => propertiesAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['landing'] });
      toast.success('Property updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update property');
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: propertiesAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['landing'] });
      toast.success('Property deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete property');
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