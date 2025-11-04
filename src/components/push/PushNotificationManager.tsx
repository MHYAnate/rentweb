// // frontend/components/PushNotificationManager.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { usePushNotifications } from '../../hooks/usePushNotifications';
// import toast from 'react-hot-toast';

// export default function PushNotificationManager() {
//   const {
//     isSupported,
//     isSubscribed,
//     isLoading,
//     permission,
//     subscribeToPush,
//     unsubscribeFromPush
//   } = usePushNotifications();

//   const [isClient, setIsClient] = useState<boolean>(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleSubscribe = async (): Promise<void> => {
//     const result = await subscribeToPush();
//     if (result.success) {
//       toast.success('Push notifications enabled!');
//     } else {
//       toast.error(result.error || 'An unexpected error occurred.');
//     }
//   };

//   const handleUnsubscribe = async (): Promise<void> => {
//     const result = await unsubscribeFromPush();
//     if (result.success) {
//       toast.success('Push notifications disabled');
//     } else {
//       toast.error(result.error || 'An unexpected error occurred.');
//     }
//   };

//   if (!isClient) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//           <div className="h-10 bg-gray-200 rounded w-full"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!isSupported) {
//     return (
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//         <h3 className="text-lg font-semibold text-yellow-800 mb-2">
//           Push Notifications Not Supported
//         </h3>
//         <p className="text-yellow-700 text-sm">
//           Your browser doesn&apos;t support push notifications. Please try using a modern browser like Chrome, Firefox, or Edge.
//         </p>
//       </div>
//     );
//   }

//   if (permission === 'denied') {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <h3 className="text-lg font-semibold text-red-800 mb-2">
//           Notifications Blocked
//         </h3>
//         <p className="text-red-700 text-sm mb-3">
//           You&apos;ve blocked notifications for this site. To enable push notifications:
//         </p>
//         <ol className="text-red-700 text-sm list-decimal list-inside space-y-1">
//           <li>Click the lock icon in your browser&apos;s address bar</li>
//           <li>Find &quot;Notifications&quot; in the site settings</li>
//           <li>Change the setting to &quot;Allow&quot;</li>
//           <li>Refresh the page and try again</li>
//         </ol>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
      
//       {isSubscribed ? (
//         <div className="space-y-3">
//           <div className="flex items-center text-green-600">
//             <svg 
//               className="w-5 h-5 mr-2" 
//               fill="currentColor" 
//               viewBox="0 0 20 20"
//               aria-hidden="true"
//             >
//               <path 
//                 fillRule="evenodd" 
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
//                 clipRule="evenodd" 
//               />
//             </svg>
//             <span>You are subscribed to push notifications</span>
//           </div>
//           <button
//             onClick={handleUnsubscribe}
//             disabled={isLoading}
//             className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
//             type="button"
//           >
//             {isLoading ? 'Disabling...' : 'Disable Push Notifications'}
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           <p className="text-gray-600 text-sm">
//             Get instant notifications for new properties, price changes, and important updates.
//           </p>
//           <button
//             onClick={handleSubscribe}
//             disabled={isLoading || permission !== 'granted'}
//             className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
//             type="button"
//           >
//             {isLoading ? (
//               <>
//                 <svg 
//                   className="animate-spin h-5 w-5 text-white" 
//                   fill="none" 
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <circle 
//                     className="opacity-25" 
//                     cx="12" 
//                     cy="12" 
//                     r="10" 
//                     stroke="currentColor" 
//                     strokeWidth="4"
//                   ></circle>
//                   <path 
//                     className="opacity-75" 
//                     fill="currentColor" 
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Subscribing...
//               </>
//             ) : (
//               <>
//                 <svg 
//                   className="w-5 h-5" 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M15 17h5l-5 5v-5zM8.5 16.5a5 5 0 01-1-9.9V7a7 7 0 1013.9 2.1" 
//                   />
//                 </svg>
//                 Enable Push Notifications
//               </>
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// components/push/PushNotificationManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function PushNotificationManager() {
  const {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    subscribeToPush,
    unsubscribeFromPush,
    requestPermission,
    checkSubscription
  } = usePushNotifications();

  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Check if we should show the prompt
  useEffect(() => {
    const shouldShowPrompt = 
      isSupported && 
      permission === 'default' && 
      !dismissed &&
      !localStorage.getItem('push-prompt-dismissed');

    setShowPrompt(shouldShowPrompt);
  }, [isSupported, permission, dismissed]);

  const handleSubscribe = async () => {
    const result = await subscribeToPush();
    if (result.success) {
      setShowPrompt(false);
    } else {
      console.error('Subscription failed:', result.error);
    }
  };

  const handleUnsubscribe = async () => {
    await unsubscribeFromPush();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('push-prompt-dismissed', 'true');
  };

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Push Notifications Not Supported
        </h3>
        <p className="text-yellow-700 text-sm">
         
          {` Your browser doesn't support push notifications. Please try using Chrome, Firefox, or Edge.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Permission Prompt */}
      {showPrompt && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Enable Push Notifications
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Get instant updates on new properties, price changes, and important messages.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Enabling...' : 'Enable Notifications'}
                </button>
                <button
                  onClick={handleDismiss}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Push Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
        
        <div className="space-y-4">
          {/* Support Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Browser Support</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isSupported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isSupported ? 'Supported' : 'Not Supported'}
            </span>
          </div>

          {/* Permission Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Permission</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              permission === 'granted' ? 'bg-green-100 text-green-800' :
              permission === 'denied' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {permission === 'granted' ? 'Granted' :
               permission === 'denied' ? 'Denied' : 'Not Asked'}
            </span>
          </div>

          {/* Subscription Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Subscription</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isSubscribed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isSubscribed ? 'Subscribed' : 'Not Subscribed'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {!isSubscribed ? (
              <>
                {permission !== 'granted' && (
                  <button
                    onClick={handleRequestPermission}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    Request Permission
                  </button>
                )}
                <button
                  onClick={handleSubscribe}
                  disabled={isLoading || permission !== 'granted'}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe to Push'}
                </button>
              </>
            ) : (
              <button
                onClick={handleUnsubscribe}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
              </button>
            )}
            
            <button
              onClick={checkSubscription}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Refresh Status
            </button>
          </div>

          {/* Help Text */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Push notifications work on Chrome Firefox Edge and Safari (iOS 16.4+)</p>
            <p>• On mobile you may need to install the app to home screen</p>
            <p>• Notifications are sent securely and can be disabled anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}