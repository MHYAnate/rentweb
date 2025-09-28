
// 'use client';

// import React from 'react';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from '../lib/queryClient';
// import { AuthProvider } from '../contexts/AuthContext';
// import Layout from '@/components/Layout/Layout';

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <Layout>{children}</Layout>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient'; // Correctly import the instance
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '@/components/Layout/Layout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>{children}</Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}