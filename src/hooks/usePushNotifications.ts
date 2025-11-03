
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

// Type definitions
interface PushSubscriptionKeys {
  auth: string;
  p256dh: string;
}

interface PushSubscriptionData {
  endpoint: string;
  keys: PushSubscriptionKeys;
}

interface PushSubscriptionResult {
  success: boolean;
  error?: string;
}

interface UsePushNotificationsReturn {
  isSupported: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  permission: NotificationPermission;
  subscription: PushSubscription | null;
  subscribeToPush: () => Promise<PushSubscriptionResult>;
  unsubscribeFromPush: () => Promise<PushSubscriptionResult>;
  checkSubscription: () => Promise<void>;
  checkPermission: () => void;
}

// Fixed version: Properly typed Uint8Array creation
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const outputArray = new Uint8Array(buffer);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const usePushNotifications = () => {
  const { user } = useAuth();
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkPermission();
      checkSubscription();
    }
  }, []);

  const checkPermission = useCallback(() => {
    if (!('Notification' in window)) return;
    setPermission(Notification.permission);
  }, []);

  const checkSubscription = useCallback(async (): Promise<void> => {
    if (!isSupported) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      setIsSubscribed(!!sub);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  }, [isSupported]);

  // const subscribeToPush = useCallback(async (): Promise<PushSubscriptionResult> => {
  //   if (!isSupported) {
  //     return {
  //       success: false,
  //       error: 'Push notifications are not supported in this browser'
  //     };
  //   }

  //   setIsLoading(true);
  //   try {
  //     // Request notification permission
  //     const permissionResult = await Notification.requestPermission();
  //     setPermission(permissionResult);

  //     if (permissionResult !== 'granted') {
  //       throw new Error('Permission not granted for notifications');
  //     }

  //     // Register service worker
  //     const registration = await navigator.serviceWorker.register('/sw.js');
      
  //     // Get the VAPID public key from environment
  //     const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  //     if (!vapidPublicKey) {
  //       throw new Error('VAPID public key is not configured');
  //     }

  //     // Convert VAPID key to Uint8Array
  //     const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
      
  //     // Subscribe to push with proper typing
  //     const sub = await registration.pushManager.subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: applicationServerKey
  //     });

  //     setSubscription(sub);
  //     setIsSubscribed(true);

  //     // Send subscription to backend
  //     const serializedSub: PushSubscriptionData = {
  //       endpoint: sub.endpoint,
  //       keys: {
  //         auth: arrayBufferToBase64(sub.getKey('auth') as ArrayBuffer),
  //         p256dh: arrayBufferToBase64(sub.getKey('p256dh') as ArrayBuffer)
  //       }
  //     };

  //     await api.post('/push/subscribe', {
  //       subscription: serializedSub,
  //       userId: user?.id
  //     });

  //     return { success: true };

  //   } catch (error) {
  //     console.error('Error subscribing to push:', error);
      
  //     let message = 'Failed to subscribe to push notifications';
  //     if (error instanceof Error) {
  //       if (error.message.includes('Permission not granted')) {
  //         message = 'Please allow notifications in your browser settings';
  //       } else if (error.message.includes('not supported')) {
  //         message = 'Push notifications are not supported in this browser';
  //       } else if (error.message.includes('VAPID public key')) {
  //         message = 'Push notifications are not properly configured';
  //       }
  //     }
      
  //     return { success: false, error: message };
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [isSupported, user]);


  // Alternative version with type assertion
const subscribeToPush = useCallback(async (): Promise<PushSubscriptionResult> => {
  if (!isSupported) {
    return {
      success: false,
      error: 'Push notifications are not supported in this browser'
    };
  }

  setIsLoading(true);
  try {
    const permissionResult = await Notification.requestPermission();
    setPermission(permissionResult);

    // if (permissionResult !== 'granted') {
    //   throw new Error('Permission not granted for notifications');
    // }

    const registration = await navigator.serviceWorker.register('/sw.js');
    
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      throw new Error('VAPID public key is not configured');
    }

    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
    
    // Use type assertion to fix the TypeScript error
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey as any // Type assertion
    });

    setSubscription(sub);
    setIsSubscribed(true);

    const serializedSub: PushSubscriptionData = {
      endpoint: sub.endpoint,
      keys: {
        auth: arrayBufferToBase64(sub.getKey('auth') as ArrayBuffer),
        p256dh: arrayBufferToBase64(sub.getKey('p256dh') as ArrayBuffer)
      }
    };

    await api.post('/push/subscribe', {
      subscription: serializedSub,
      userId: user?.id
    });

    return { success: true };

  } catch (error) {
    console.error('Error subscribing to push:', error);
    let message = 'Failed to subscribe to push notifications';
    if (error instanceof Error) {
      if (error.message.includes('Permission not granted')) {
        message = 'Please allow notifications in your browser settings';
      } else if (error.message.includes('not supported')) {
        message = 'Push notifications are not supported in this browser';
      } else if (error.message.includes('VAPID public key')) {
        message = 'Push notifications are not properly configured';
      }
    }
    return { success: false, error: message };
  } finally {
    setIsLoading(false);
  }
}, [isSupported, user]);
  const unsubscribeFromPush = useCallback(async (): Promise<PushSubscriptionResult> => {
    if (!subscription) {
      return {
        success: false,
        error: 'No active subscription found'
      };
    }

    setIsLoading(true);
    try {
      await subscription.unsubscribe();
      setSubscription(null);
      setIsSubscribed(false);

      // Remove subscription from backend
      await api.post('/push/unsubscribe', {
        endpoint: subscription.endpoint
      });

      return { success: true };

    } catch (error) {
      console.error('Error unsubscribing from push:', error);
      return { 
        success: false, 
        error: 'Failed to unsubscribe from push notifications' 
      };
    } finally {
      setIsLoading(false);
    }
  }, [subscription]);

  const requestPermissionAndSubscribe = useCallback(async (): Promise<PushSubscriptionResult> => {
    return await subscribeToPush();
  }, [subscribeToPush]);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    subscription,
    subscribeToPush: requestPermissionAndSubscribe,
    unsubscribeFromPush,
    checkSubscription,
    checkPermission
  };
};

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}