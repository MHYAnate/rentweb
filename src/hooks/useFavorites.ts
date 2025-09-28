// 'use client';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { favoritesAPI } from '../services/api';
// import { useAuth } from '../contexts/AuthContext';
// import toast from 'react-hot-toast';

// export const useFavorites = (params?: any) => {
//   const { isAuthenticated } = useAuth();
  
//   return useQuery(
//     ['favorites', params],
//     () => favoritesAPI.getAll(params),
//     {
//       select: (data) => data.data,
//       enabled: isAuthenticated,
//     }
//   );
// };

// export const useFavoriteStatus = (propertyId: string) => {
//   const { isAuthenticated } = useAuth();
  
//   return useQuery(
//     ['favoriteStatus', propertyId],
//     () => favoritesAPI.checkStatus(propertyId),
//     {
//       select: (data) => data.data.data,
//       enabled: isAuthenticated && !!propertyId,
//     }
//   );
// };

// export const useToggleFavorite = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation(
//     async ({ propertyId, isFavorited }: { propertyId: string; isFavorited: boolean }) => {
//       if (isFavorited) {
//         return favoritesAPI.remove(propertyId);
//       } else {
//         return favoritesAPI.add(propertyId);
//       }
//     },
//     {
//       onSuccess: (_, variables) => {
//         queryClient.invalidateQueries(['favorites']);
//         queryClient.invalidateQueries(['favoriteStatus', variables.propertyId]);
//         toast.success(
//           variables.isFavorited 
//             ? 'Removed from favorites' 
//             : 'Added to favorites'
//         );
//       },
//       onError: (error: any) => {
//         toast.error(error.response?.data?.message || 'Failed to update favorites');
//       },
//     }
//   );
// };

'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useFavorites = (params?: any) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['favorites', params],
    queryFn: () => favoritesAPI.getAll(params),
    select: (data) => data.data,
    enabled: isAuthenticated,
  });
};

export const useFavoriteStatus = (propertyId: string) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['favoriteStatus', propertyId],
    queryFn: () => favoritesAPI.checkStatus(propertyId),
    select: (data) => data.data.data,
    enabled: isAuthenticated && !!propertyId,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ propertyId, isFavorited }: { propertyId: string; isFavorited: boolean }) => {
      if (isFavorited) {
        return favoritesAPI.remove(propertyId);
      } else {
        return favoritesAPI.add(propertyId);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favoriteStatus', variables.propertyId] });
      toast.success(
        variables.isFavorited 
          ? 'Removed from favorites' 
          : 'Added to favorites'
      );
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update favorites');
    },
  });
};