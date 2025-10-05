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

// src/app/dashboard/layout.tsx - CORRECT PATTERN

// 'use client';

// import { useSession } from 'next-auth/react'; // Or your specific auth hook
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react'; // 👈 1. Import useEffect
// import { Suspense } from 'react';

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const { status } = useSession({
//     required: true, // Optional: next-auth can handle the redirect for you
//     onUnauthenticated() {
//         // This is an even cleaner way if your auth provider supports it
//         router.push('/login');
//     },
//   });
//   const router = useRouter();

//   // 👇 2. Move the logic into a useEffect hook
//   useEffect(() => {
//     // The effect runs after the component renders
//     if (!status) {
//       router.push('/login');
//     }
//   }, [status, router]); // 👈 3. Add dependencies

//   // 4. Show a loading state while checking authentication
//   if (status === 'loading') {
//     return <div>Loading session...</div>; // Or a full-page loader
//   }

//   // 5. Only render the children if the user is authenticated
//   if (status === 'authenticated') {
//     return (
//       <div>
//         {/* Your sidebar, navbar, etc. */}
//         <main>{children}</main>
//       </div>
//     );
//   }

//   // Render null or a loader while the redirect is happening
//   return null;
// }