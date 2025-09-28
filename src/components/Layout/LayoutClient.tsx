'use client';

import React from 'react';

// This is a client component wrapper for your layout
export default function LayoutClient({ children }: { children: React.ReactNode }) {
  // If you have layout logic that requires hooks, put it here
  return (
    <div className="min-h-screen">
      {/* Your header/navigation */}
      <main>{children}</main>
      {/* Your footer */}
    </div>
  );
}