// "use client";

// import React, { useState, useEffect, useCallback } from 'react';

// // Define the custom event type for the browser's install prompt
// interface BeforeInstallPromptEvent extends Event {
//   readonly platforms: Array<string>;
//   readonly userChoice: Promise<{
//     outcome: 'accepted' | 'dismissed',
//     platform: string
//   }>;
//   prompt(): Promise<void>;
// }

// /**
//  * A button component that triggers the PWA install prompt when clicked.
//  * It only appears if the browser supports PWA installation and hasn't already installed the app.
//  */
// const InstallPWAButton: React.FC = () => {
//   // State to hold the deferred event object
//   const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
//   // State to track if the app is already installed
//   const [isInstalled, setIsInstalled] = useState(false);

//   // 1. Event listener to capture the installation prompt event
//   useEffect(() => {
//     // Check if the app is already running as a standalone PWA
//     if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
//       setIsInstalled(true);
//       return;
//     }

//     const handler = (e: Event) => {
//       // Prevent the default browser prompt from showing automatically
//       e.preventDefault();
//       // Store the event so we can trigger it later
//       setDeferredPrompt(e as BeforeInstallPromptEvent);
//     };

//     window.addEventListener('beforeinstallprompt', handler);

//     return () => {
//       window.removeEventListener('beforeinstallprompt', handler);
//     };
//   }, []);

//   // 2. Click handler for the button
//   const handleInstallClick = useCallback(async () => {
//     if (!deferredPrompt) {
//       console.log('Install prompt not available.');
//       return;
//     }

//     // Show the installation prompt
//     deferredPrompt.prompt();

//     // Wait for the user to respond to the prompt
//     const { outcome } = await deferredPrompt.userChoice;

//     if (outcome === 'accepted') {
//       console.log('User accepted the PWA installation prompt.');
//       // Update state to hide the button after successful install
//       setIsInstalled(true); 
//     } else {
//       console.log('User dismissed the PWA installation prompt.');
//     }

//     // Clear the stored event
//     setDeferredPrompt(null);
//   }, [deferredPrompt]);

//   // If the app is installed or the prompt is not available, don't show the button
//   if (isInstalled || !deferredPrompt) {
//     return null;
//   }

//   return (
//     <button
//       onClick={handleInstallClick}
//       className="fixed bottom-4 right-4 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 z-50"
//       aria-label="Install App"
//     >
//       Install App (PWA)
//     </button>
//   );
// };

// export default InstallPWAButton;

"use client";


export default function InstallPWAButton() {
  const { isInstallable, handleInstall } = usePWAInstall();
  

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Install App
    </button>
  );
}

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
    } finally {
      setDeferredPrompt(null);
    }
  };

  return { isInstallable, handleInstall };
}