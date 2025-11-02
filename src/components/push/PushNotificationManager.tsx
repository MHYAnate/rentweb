// frontend/components/PushNotificationManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import toast from 'react-hot-toast';

export default function PushNotificationManager() {
  const {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    subscribeToPush,
    unsubscribeFromPush
  } = usePushNotifications();

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubscribe = async (): Promise<void> => {
    const result = await subscribeToPush();
    if (result.success) {
      toast.success('Push notifications enabled!');
    } else {
      toast.error(result.error || 'An unexpected error occurred.');
    }
  };

  const handleUnsubscribe = async (): Promise<void> => {
    const result = await unsubscribeFromPush();
    if (result.success) {
      toast.success('Push notifications disabled');
    } else {
      toast.error(result.error || 'An unexpected error occurred.');
    }
  };

  if (!isClient) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Push Notifications Not Supported
        </h3>
        <p className="text-yellow-700 text-sm">
          Your browser doesn&apos;t support push notifications. Please try using a modern browser like Chrome, Firefox, or Edge.
        </p>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Notifications Blocked
        </h3>
        <p className="text-red-700 text-sm mb-3">
          You&apos;ve blocked notifications for this site. To enable push notifications:
        </p>
        <ol className="text-red-700 text-sm list-decimal list-inside space-y-1">
          <li>Click the lock icon in your browser&apos;s address bar</li>
          <li>Find &quot;Notifications&quot; in the site settings</li>
          <li>Change the setting to &quot;Allow&quot;</li>
          <li>Refresh the page and try again</li>
        </ol>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
      
      {isSubscribed ? (
        <div className="space-y-3">
          <div className="flex items-center text-green-600">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>You are subscribed to push notifications</span>
          </div>
          <button
            onClick={handleUnsubscribe}
            disabled={isLoading}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
            type="button"
          >
            {isLoading ? 'Disabling...' : 'Disable Push Notifications'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">
            Get instant notifications for new properties, price changes, and important updates.
          </p>
          <button
            onClick={handleSubscribe}
            disabled={isLoading }
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            type="button"
          >
            {isLoading ? (
              <>
                <svg 
                  className="animate-spin h-5 w-5 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Subscribing...
              </>
            ) : (
              <>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 17h5l-5 5v-5zM8.5 16.5a5 5 0 01-1-9.9V7a7 7 0 1013.9 2.1" 
                  />
                </svg>
                Enable Push Notifications
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}