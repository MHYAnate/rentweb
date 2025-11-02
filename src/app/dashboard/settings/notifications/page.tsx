// frontend/app/settings/notifications/page.tsx
'use client';

import { useState, useEffect } from 'react';
import PushNotificationManager from '@/components/push/PushNotificationManager';
import InstallPWAButton from '@/app/pwaBtn';
import { useAuth } from '@/contexts/AuthContext';

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsSettings() {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'new-properties',
      label: 'New Properties',
      description: 'Get notified when new properties matching your criteria are listed',
      enabled: true
    },
    {
      id: 'price-changes',
      label: 'Price Changes',
      description: 'Receive alerts when prices change on properties you\'ve saved',
      enabled: true
    },
    {
      id: 'messages',
      label: 'Messages',
      description: 'Notifications for new messages from landlords or agents',
      enabled: true
    },
    {
      id: 'system-updates',
      label: 'System Updates',
      description: 'Important updates about the platform and new features',
      enabled: true
    }
  ]);

  useEffect(() => {
    setIsClient(true);
    // Load saved preferences from localStorage or API
    const savedPreferences = localStorage.getItem('notification-preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const togglePreference = (id: string): void => {
    setPreferences(prev => {
      const updated = prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      );
      // Save to localStorage
      localStorage.setItem('notification-preferences', JSON.stringify(updated));
      return updated;
    });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-gray-600">
            Manage how you receive notifications and app updates
            {user && (
              <span className="text-sm text-gray-500 block mt-1">
                Settings for {user.email || user.phone}
              </span>
            )}
          </p>
        </div>

        {/* Push Notification Settings */}
        <PushNotificationManager />
        
        {/* Email Notification Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          <p className="text-gray-600 text-sm mb-4">
            Choose what types of notifications you want to receive
          </p>
          
          <div className="space-y-4">
            {preferences.map((preference) => (
              <div key={preference.id} className="flex items-start justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <label 
                      htmlFor={preference.id}
                      className="relative flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={preference.id}
                        checked={preference.enabled}
                        onChange={() => togglePreference(preference.id)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        preference.enabled ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          preference.enabled ? 'transform translate-x-5' : ''
                        }`} />
                      </div>
                    </label>
                    <div>
                      <h4 className="font-medium text-gray-900">{preference.label}</h4>
                      <p className="text-sm text-gray-600">{preference.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PWA Installation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Install App</h3>
          <p className="text-gray-600 text-sm mb-4">
            Install Properties Point as a standalone app for better experience and offline access.
          </p>
          <InstallPWAButton />
        </div>

        {/* Information Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">About Notifications</h4>
          <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
            <li>Push notifications require browser permission and work best in Chrome, Firefox, and Edge</li>
            <li>You can change these settings at any time</li>
            <li>Notifications are sent securely and we never share your data</li>
            <li>Some features may require the app to be installed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}