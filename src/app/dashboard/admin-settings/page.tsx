// components/admin/AdminSettings.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface PlatformSettings {
  // General Settings
  platformName: string;
  platformEmail: string;
  supportPhone: string;
  contactAddress: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  
  // User Management
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  allowUserRegistrations: boolean;
  defaultUserRole: 'CLIENT' | 'LANDLORD' | 'AGENT';
  maxLoginAttempts: number;
  sessionTimeout: number;
  
  // Property Settings
  maxPropertiesPerUser: number;
  maxImagesPerProperty: number;
  maxVideoSize: number; // in MB
  autoApproveProperties: boolean;
  allowFeaturedProperties: boolean;
  featuredPropertyFee: number;
  
  // Verification Settings
  requireLandlordVerification: boolean;
  requireAgentVerification: boolean;
  verificationAutoApprove: boolean;
  documentExpiryDays: number;
  
  // Payment & Commission
  enableCommission: boolean;
  commissionRate: number;
  agentCommissionRate: number;
  paymentGateway: 'paystack' | 'flutterwave' | 'stripe';
  testMode: boolean;
  
  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  notifyNewRegistrations: boolean;
  notifyNewProperties: boolean;
  notifyNewComplaints: boolean;
  
  // Security Settings
  enable2FA: boolean;
  passwordMinLength: number;
  passwordRequireSpecial: boolean;
  passwordRequireNumbers: boolean;
  passwordExpiryDays: number;
  ipWhitelist: string[];
  
  // API & Integration
  googleMapsApiKey: string;
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
}

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'properties' | 'verification' | 'payments' | 'notifications' | 'security' | 'integrations'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Default settings
  const [settings, setSettings] = useState<PlatformSettings>({
    // General Settings
    platformName: 'PropertyPro',
    platformEmail: 'admin@propertypro.com',
    supportPhone: '+2348000000000',
    contactAddress: 'Lagos, Nigeria',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    dateFormat: 'DD/MM/YYYY',
    
    // User Management
    requireEmailVerification: true,
    requirePhoneVerification: true,
    allowUserRegistrations: true,
    defaultUserRole: 'CLIENT',
    maxLoginAttempts: 5,
    sessionTimeout: 24,
    
    // Property Settings
    maxPropertiesPerUser: 50,
    maxImagesPerProperty: 20,
    maxVideoSize: 100,
    autoApproveProperties: false,
    allowFeaturedProperties: true,
    featuredPropertyFee: 5000,
    
    // Verification Settings
    requireLandlordVerification: true,
    requireAgentVerification: true,
    verificationAutoApprove: false,
    documentExpiryDays: 365,
    
    // Payment & Commission
    enableCommission: true,
    commissionRate: 5,
    agentCommissionRate: 10,
    paymentGateway: 'paystack',
    testMode: true,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    notifyNewRegistrations: true,
    notifyNewProperties: false,
    notifyNewComplaints: true,
    
    // Security Settings
    enable2FA: false,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordExpiryDays: 90,
    ipWhitelist: [],
    
    // API & Integration
    googleMapsApiKey: '',
    cloudinaryCloudName: '',
    cloudinaryApiKey: '',
    twilioAccountSid: '',
    twilioAuthToken: '',
  });

  const [ipWhitelistInput, setIpWhitelistInput] = useState('');

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const savedSettings = localStorage.getItem('adminSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    setIsLoading(true);
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key: keyof PlatformSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addIpToWhitelist = () => {
    if (ipWhitelistInput.trim() && !settings.ipWhitelist.includes(ipWhitelistInput.trim())) {
      handleSettingChange('ipWhitelist', [...settings.ipWhitelist, ipWhitelistInput.trim()]);
      setIpWhitelistInput('');
    }
  };

  const removeIpFromWhitelist = (ip: string) => {
    handleSettingChange('ipWhitelist', settings.ipWhitelist.filter(item => item !== ip));
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      const defaultSettings = {
        // General Settings
        platformName: 'PropertyPro',
        platformEmail: 'admin@propertypro.com',
        supportPhone: '+2348000000000',
        contactAddress: 'Lagos, Nigeria',
        currency: 'NGN',
        timezone: 'Africa/Lagos',
        dateFormat: 'DD/MM/YYYY',
        
        // User Management
        requireEmailVerification: true,
        requirePhoneVerification: true,
        allowUserRegistrations: true,
        defaultUserRole: 'CLIENT',
        maxLoginAttempts: 5,
        sessionTimeout: 24,
        
        // Property Settings
        maxPropertiesPerUser: 50,
        maxImagesPerProperty: 20,
        maxVideoSize: 100,
        autoApproveProperties: false,
        allowFeaturedProperties: true,
        featuredPropertyFee: 5000,
        
        // Verification Settings
        requireLandlordVerification: true,
        requireAgentVerification: true,
        verificationAutoApprove: false,
        documentExpiryDays: 365,
        
        // Payment & Commission
        enableCommission: true,
        commissionRate: 5,
        agentCommissionRate: 10,
        paymentGateway: 'paystack',
        testMode: true,
        
        // Notification Settings
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
        notifyNewRegistrations: true,
        notifyNewProperties: false,
        notifyNewComplaints: true,
        
        // Security Settings
        enable2FA: false,
        passwordMinLength: 8,
        passwordRequireSpecial: true,
        passwordRequireNumbers: true,
        passwordExpiryDays: 90,
        ipWhitelist: [],
        
        // API & Integration
        googleMapsApiKey: '',
        cloudinaryCloudName: '',
        cloudinaryApiKey: '',
        twilioAccountSid: '',
        twilioAuthToken: '',
      };
      
      setSettings(defaultSettings as any);
      localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
    }
  };

  if (isLoading && !settings.platformName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
              <p className="mt-1 text-sm text-gray-500">
                Configure and manage your platform settings
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={resetToDefaults}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset to Defaults
              </button>
              <button
                onClick={saveSettings}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Save Status */}
          {saveStatus === 'saved' && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Settings saved successfully
                  </p>
                </div>
              </div>
            </div>
          )}

          {saveStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    Failed to save settings. Please try again.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'general', name: 'General', icon: '⚙️' },
                { id: 'users', name: 'User Management', icon: '👥' },
                { id: 'properties', name: 'Properties', icon: '🏠' },
                { id: 'verification', name: 'Verification', icon: '✅' },
                { id: 'payments', name: 'Payments', icon: '💰' },
                { id: 'notifications', name: 'Notifications', icon: '🔔' },
                { id: 'security', name: 'Security', icon: '🔒' },
                { id: 'integrations', name: 'Integrations', icon: '🔌' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
            </h2>
          </div>

          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Platform Name</label>
                    <input
                      type="text"
                      value={settings.platformName}
                      onChange={(e) => handleSettingChange('platformName', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Platform Email</label>
                    <input
                      type="email"
                      value={settings.platformEmail}
                      onChange={(e) => handleSettingChange('platformEmail', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Support Phone</label>
                    <input
                      type="text"
                      value={settings.supportPhone}
                      onChange={(e) => handleSettingChange('supportPhone', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('currency', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="NGN">Nigerian Naira (NGN)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Africa/Lagos">West Africa Time (WAT)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Format</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Address</label>
                  <textarea
                    value={settings.contactAddress}
                    onChange={(e) => handleSettingChange('contactAddress', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* User Management Settings */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Default User Role</label>
                    <select
                      value={settings.defaultUserRole}
                      onChange={(e) => handleSettingChange('defaultUserRole', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="CLIENT">Client</option>
                      <option value="LANDLORD">Landlord</option>
                      <option value="AGENT">Agent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                      min="1"
                      max="10"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Session Timeout (hours)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      min="1"
                      max="720"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.allowUserRegistrations}
                      onChange={(e) => handleSettingChange('allowUserRegistrations', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Allow new user registrations
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.requireEmailVerification}
                      onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Require email verification
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.requirePhoneVerification}
                      onChange={(e) => handleSettingChange('requirePhoneVerification', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Require phone verification
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Property Settings */}
            {activeTab === 'properties' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Properties Per User</label>
                    <input
                      type="number"
                      value={settings.maxPropertiesPerUser}
                      onChange={(e) => handleSettingChange('maxPropertiesPerUser', parseInt(e.target.value))}
                      min="1"
                      max="1000"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Images Per Property</label>
                    <input
                      type="number"
                      value={settings.maxImagesPerProperty}
                      onChange={(e) => handleSettingChange('maxImagesPerProperty', parseInt(e.target.value))}
                      min="1"
                      max="50"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Video Size (MB)</label>
                    <input
                      type="number"
                      value={settings.maxVideoSize}
                      onChange={(e) => handleSettingChange('maxVideoSize', parseInt(e.target.value))}
                      min="1"
                      max="500"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Featured Property Fee (₦)</label>
                    <input
                      type="number"
                      value={settings.featuredPropertyFee}
                      onChange={(e) => handleSettingChange('featuredPropertyFee', parseInt(e.target.value))}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.autoApproveProperties}
                      onChange={(e) => handleSettingChange('autoApproveProperties', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Auto-approve new properties
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.allowFeaturedProperties}
                      onChange={(e) => handleSettingChange('allowFeaturedProperties', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Allow featured properties
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Settings */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Document Expiry (Days)</label>
                    <input
                      type="number"
                      value={settings.documentExpiryDays}
                      onChange={(e) => handleSettingChange('documentExpiryDays', parseInt(e.target.value))}
                      min="30"
                      max="730"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.requireLandlordVerification}
                      onChange={(e) => handleSettingChange('requireLandlordVerification', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Require landlord verification
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.requireAgentVerification}
                      onChange={(e) => handleSettingChange('requireAgentVerification', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Require agent verification
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.verificationAutoApprove}
                      onChange={(e) => handleSettingChange('verificationAutoApprove', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Auto-approve verifications
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                    <input
                      type="number"
                      value={settings.commissionRate}
                      onChange={(e) => handleSettingChange('commissionRate', parseFloat(e.target.value))}
                      min="0"
                      max="50"
                      step="0.1"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Agent Commission Rate (%)</label>
                    <input
                      type="number"
                      value={settings.agentCommissionRate}
                      onChange={(e) => handleSettingChange('agentCommissionRate', parseFloat(e.target.value))}
                      min="0"
                      max="50"
                      step="0.1"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Gateway</label>
                    <select
                      value={settings.paymentGateway}
                      onChange={(e) => handleSettingChange('paymentGateway', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="paystack">Paystack</option>
                      <option value="flutterwave">Flutterwave</option>
                      <option value="stripe">Stripe</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableCommission}
                      onChange={(e) => handleSettingChange('enableCommission', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Enable commission system
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.testMode}
                      onChange={(e) => handleSettingChange('testMode', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Test mode (sandbox)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900">Notification Channels</h3>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Email notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      SMS notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    {/* <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    /> */}
                    <Link href='/dashboard/settings/notifications' > got to push notifications settings </Link>
                    <label className="ml-2 block text-sm text-gray-900">
                      Push notifications
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900">Admin Notifications</h3>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notifyNewRegistrations}
                      onChange={(e) => handleSettingChange('notifyNewRegistrations', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Notify on new user registrations
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notifyNewProperties}
                      onChange={(e) => handleSettingChange('notifyNewProperties', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Notify on new property listings
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notifyNewComplaints}
                      onChange={(e) => handleSettingChange('notifyNewComplaints', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Notify on new complaints
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password Minimum Length</label>
                    <input
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                      min="6"
                      max="20"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password Expiry (Days)</label>
                    <input
                      type="number"
                      value={settings.passwordExpiryDays}
                      onChange={(e) => handleSettingChange('passwordExpiryDays', parseInt(e.target.value))}
                      min="0"
                      max="365"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Set to 0 to disable password expiry</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enable2FA}
                      onChange={(e) => handleSettingChange('enable2FA', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Enable Two-Factor Authentication (2FA)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.passwordRequireSpecial}
                      onChange={(e) => handleSettingChange('passwordRequireSpecial', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Require special characters in passwords
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.passwordRequireNumbers}
                      onChange={(e) => handleSettingChange('passwordRequireNumbers', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Require numbers in passwords
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">IP Whitelist</label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="text"
                      value={ipWhitelistInput}
                      onChange={(e) => setIpWhitelistInput(e.target.value)}
                      placeholder="Enter IP address"
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={addIpToWhitelist}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Add IP addresses that are allowed to access the admin portal. Leave empty to allow all IPs.
                  </p>

                  {settings.ipWhitelist.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {settings.ipWhitelist.map((ip, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                          <span className="text-sm text-gray-700">{ip}</span>
                          <button
                            onClick={() => removeIpFromWhitelist(ip)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Integration Settings */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Google Maps API Key</label>
                    <input
                      type="password"
                      value={settings.googleMapsApiKey}
                      onChange={(e) => handleSettingChange('googleMapsApiKey', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your Google Maps API key"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cloudinary Cloud Name</label>
                      <input
                        type="text"
                        value={settings.cloudinaryCloudName}
                        onChange={(e) => handleSettingChange('cloudinaryCloudName', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your cloud name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cloudinary API Key</label>
                      <input
                        type="password"
                        value={settings.cloudinaryApiKey}
                        onChange={(e) => handleSettingChange('cloudinaryApiKey', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your API key"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Twilio Account SID</label>
                      <input
                        type="password"
                        value={settings.twilioAccountSid}
                        onChange={(e) => handleSettingChange('twilioAccountSid', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Twilio SID"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Twilio Auth Token</label>
                      <input
                        type="password"
                        value={settings.twilioAuthToken}
                        onChange={(e) => handleSettingChange('twilioAuthToken', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Twilio token"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Integration Guide
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          These settings are for third-party service integrations. Make sure to:
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Keep API keys secure and never commit them to version control</li>
                          <li>Use environment variables in production</li>
                          <li>Test integrations thoroughly before going live</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={saveSettings}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;