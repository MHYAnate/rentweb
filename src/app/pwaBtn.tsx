"use client";

import React, { useState, useEffect, useCallback } from 'react';

// Define the custom event type for the browser's install prompt
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

/**
 * A button component that triggers the PWA install prompt when clicked.
 * It only appears if the browser supports PWA installation and hasn't already installed the app.
 */
const InstallPWAButton: React.FC = () => {
  // State to hold the deferred event object
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // State to track if the app is already installed
  const [isInstalled, setIsInstalled] = useState(false);

  // 1. Event listener to capture the installation prompt event
  useEffect(() => {
    // Check if the app is already running as a standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      // Prevent the default browser prompt from showing automatically
      e.preventDefault();
      // Store the event so we can trigger it later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // 2. Click handler for the button
  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('Install prompt not available.');
      return;
    }

    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the PWA installation prompt.');
      // Update state to hide the button after successful install
      setIsInstalled(true); 
    } else {
      console.log('User dismissed the PWA installation prompt.');
    }

    // Clear the stored event
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  // If the app is installed or the prompt is not available, don't show the button
  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 z-50"
      aria-label="Install App"
    >
      Install App (PWA)
    </button>
  );
};

export default InstallPWAButton;
