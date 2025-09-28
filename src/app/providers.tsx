// 'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useState } from 'react';

// export default function Providers({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 60 * 1000, // 1 minute
//         retry: 1,
//       },
//     },
//   }));

//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//   );
// }

// 'use client';

// import React from 'react';
// import { QueryClient, QueryClientProvider } from 'react-query';

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       refetchOnWindowFocus: false, // Optional: disable refetching on window focus
//     },
//   },
// });

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     // Provide the client to your App
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//   );
// }

'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false, // Optional: disable refetching on window focus
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}