// // lib/queryClient.js
// import { QueryClient } from '@tanstack/react-query';

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // Automatically refetch data on window focus
//       refetchOnWindowFocus: false,
//       // Retry failed requests up to 3 times
//       retry: 3,
//       // Cache data for 5 minutes
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });

// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

// Create a new instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // It's a good practice to set a staleTime to avoid refetching too often
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export { queryClient };