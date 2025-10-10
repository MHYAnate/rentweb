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