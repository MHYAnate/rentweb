import "./globals.css";

import ClientLayout from './ClientLayout';
import InstallPWAButton from "./pwaBtn";

export const metadata = {
  title: 'Ppoint',
  description: 'Pin Pointing perfect property',
  manifest: "/manifest.webmanifest", // <-- This links your manifest
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <InstallPWAButton />
      </body>
    </html>
  );
}