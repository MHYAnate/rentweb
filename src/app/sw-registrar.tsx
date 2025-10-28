"use client";

import { useEffect } from "react";

/**
 * SerwistRegistrar is a client component that registers the service worker.
 *
 * It uses the native navigator.serviceWorker API to ensure maximum compatibility 
 * within the build environment and handles success/failure using Promises.
 */
export const SerwistRegistrar = () => {
  useEffect(() => {
    // 1. Ensure we are in the browser and the Service Worker API is supported.
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      
      const swUrl = "/sw.js"; // Must match the swDest path in next.config.ts

      // Use native API to register the service worker
      // The options object only supports 'scope', which we set to the root.
      navigator.serviceWorker.register(swUrl, { scope: "/" })
        .then(registration => {
          // This .then() block handles the 'onReady' success case
          console.log("Service Worker: Registered successfully. Scope:", registration.scope);
        })
        .catch(error => {
          // This .catch() block handles the 'onError' failure case
          console.error("Service Worker: Failed to register.", error);
        });
    }
  }, []);

  // This component renders nothing, its purpose is purely side-effect (registration)
  return null;
};
