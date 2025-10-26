// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '@/contexts/AuthContext';
// import {
//   Home,
//   Building,
//   User,
//   Settings,
//   Heart,
//   Star,
//   Bell,
//   Search,
//   Plus,
//   BarChart3,
//   Users,
//   FileText,
//   Menu,
//   X,
//   LogOut,
//   Shield,
//   MessageSquare,
//   Calendar
// } from 'lucide-react';

// interface DashboardLayoutProps {
//   children: React.ReactNode;
//   title?: string;
//   subtitle?: string;
//   action?: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({
//   children,
//   title,
//   subtitle,
//   action
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user, logout, isAuthenticated } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   if (!isAuthenticated) {
//     router.push('/login');
//     return null;
//   }

//   const handleLogout = () => {
//     logout();
//     router.push('/');
//   };

//   const navigationItems = [
//     {
//       name: 'Dashboard',
//       href: '/dashboard',
//       icon: BarChart3,
//       roles: ['CLIENT', 'LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN']
//     },
//     {
//       name: 'Properties',
//       href: '/dashboard/properties',
//       icon: Building,
//       roles: ['LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN']
//     },
//     {
//       name: 'My Properties',
//       href: '/dashboard/my-properties',
//       icon: Home,
//       roles: ['LANDLORD', 'AGENT']
//     },
//     {
//       name: 'Favorites',
//       href: '/dashboard/favorites',
//       icon: Heart,
//       roles: ['CLIENT', 'LANDLORD', 'AGENT']
//     },
//     {
//       name: 'Reviews',
//       href: '/dashboard/reviews',
//       icon: Star,
//       roles: ['CLIENT', 'LANDLORD', 'AGENT']
//     },
//     {
//       name: 'Complaints',
//       href: '/dashboard/complaints',
//       icon: MessageSquare,
//       roles: ['CLIENT', 'LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN']
//     },
//     {
//       name: 'Agents',
//       href: '/dashboard/agents',
//       icon: Users,
//       roles: ['LANDLORD', 'ADMIN', 'SUPER_ADMIN']
//     },
//     {
//       name: 'Verification',
//       href: '/dashboard/verification',
//       icon: Shield,
//       roles: ['LANDLORD', 'AGENT']
//     },
//     {
//       name: 'Analytics',
//       href: '/dashboard/analytics',
//       icon: BarChart3,
//       roles: ['LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN']
//     },
//     {
//       name: 'Reports',
//       href: '/dashboard/reports',
//       icon: FileText,
//       roles: ['ADMIN', 'SUPER_ADMIN']
//     }
//   ];

//   const filteredNavigation = navigationItems.filter(item => 
//     item.roles.includes(user?.role)
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile sidebar */}
//       <div className={`fixed inset-0 flex z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
//         <div
//           className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
//             sidebarOpen ? 'opacity-100' : 'opacity-0'
//           }`}
//           onClick={() => setSidebarOpen(false)}
//         />
//         <div
//           className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${
//             sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <div className="absolute top-0 right-0 -mr-12 pt-2">
//             <button
//               type="button"
//               className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <X className="h-6 w-6 text-white" />
//             </button>
//           </div>
//           <SidebarContent navigation={filteredNavigation} user={user} onLogout={handleLogout} pathname={pathname} />
//         </div>
//       </div>

//       {/* Static sidebar for desktop */}
//       <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
//         <div className="flex-1 flex flex-col min-h-0 bg-white shadow-xl">
//           <SidebarContent navigation={filteredNavigation} user={user} onLogout={handleLogout} pathname={pathname} />
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64 flex flex-col min-h-screen">
//         {/* Top bar */}
//         <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
//           <button
//             type="button"
//             className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </button>

//           <div className="flex-1 px-4 flex justify-between items-center">
//             <div className="flex-1 flex">
//               <div className="w-full flex md:ml-0">
//                 <div className="relative w-full text-gray-400 focus-within:text-gray-600 max-w-lg">
//                   <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5" />
//                   </div>
//                   <input
//                     className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
//                     placeholder="Search properties..."
//                     type="search"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="ml-4 flex items-center md:ml-6 space-x-4">
//               {/* Notifications */}
//               <button className="bg-white p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 transition-colors relative">
//                 <Bell className="h-6 w-6" />
//                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
//               </button>

//               {/* Add Property Button */}
//               {['LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN'].includes(user?.role) && (
//                 <Link
//                   href="/dashboard/properties/create"
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Property
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Page header */}
//         {(title || subtitle || action) && (
//           <div className="bg-white shadow-sm border-b border-gray-200">
//             <div className="px-4 sm:px-6 lg:px-8 py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   {title && (
//                     <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
//                   )}
//                   {subtitle && (
//                     <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
//                   )}
//                 </div>
//                 {action && <div>{action}</div>}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main content */}
//         <main className="flex-1">
//           <div className="py-6">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// const SidebarContent: React.FC<{
//   navigation: any[];
//   user: any;
//   onLogout: () => void;
//   pathname: string;
// }> = ({ navigation, user, onLogout, pathname }) => {
//   return (
//     <>
//       {/* Logo */}
//       <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-gray-200">
//         <Link href="/" className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
//             <Home className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-xl font-bold text-gray-900">Ppoint</span>
//         </Link>
//       </div>

//       {/* User info */}
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//         <div className="flex items-center">
//           <div className="flex-shrink-0">
//             {user?.avatarUrl ? (
//               <img
//                 className="h-10 w-10 rounded-full"
//                 src={user.avatarUrl}
//                 alt={`${user.firstName} ${user.lastName}`}
//               />
//             ) : (
//               <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                 <span className="text-sm font-medium text-indigo-800">
//                   {user?.firstName?.[0]}{user?.lastName?.[0]}
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className="ml-3">
//             <p className="text-sm font-medium text-gray-900">
//               {user?.firstName} {user?.lastName}
//             </p>
//             <p className="text-xs text-gray-500 capitalize">
//               {user?.role?.toLowerCase()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
//         {navigation.map((item) => {
//           const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
//                 isActive
//                   ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
//                   : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//               }`}
//             >
//               <item.icon
//                 className={`flex-shrink-0 mr-3 h-5 w-5 ${
//                   isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
//                 }`}
//               />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Bottom actions */}
//       <div className="flex-shrink-0 px-3 py-4 border-t border-gray-200 space-y-1">
//         <Link
//           href="/dashboard/profile"
//           className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
//         >
//           <User className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
//           Profile
//         </Link>
//         <Link
//           href="/dashboard/settings"
//           className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
//         >
//           <Settings className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
//           Settings
//         </Link>
//         <button
//           onClick={onLogout}
//           className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-900 transition-colors"
//         >
//           <LogOut className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
//           Sign out
//         </button>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Building,
  User,
  Settings,
  Heart,
  Star,
  Bell,
  Search,
  Plus,
  BarChart3,
  Users,
  FileText,
  Menu,
  X,
  LogOut,
  Shield,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  action
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3,
      roles: ['CLIENT', 'LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN']
    },
    {
      name: 'Properties',
      href: '/dashboard/propertiess',
      icon: Building,
      roles: ['LANDLORD', 'AGENT']
    },
    {
      name: 'Properties',
      href: '/dashboard/admin-properties',
      icon: Building,
      roles: [ 'ADMIN', 'SUPER_ADMIN']
    },
    {
      name: 'My Properties',
      href: '/dashboard/my-properties',
      icon: Home,
      roles: ['LANDLORD', 'AGENT']
    },
    {
      name: 'Favorites',
      href: '/dashboard/favorites',
      icon: Heart,
      roles: ['CLIENT', 'LANDLORD', 'AGENT']
    },
    {
      name: 'Reviews',
      href: '/dashboard/reviews',
      icon: Star,
      roles: ['CLIENT', 'LANDLORD', 'AGENT']
    },
    {
      name: 'Complaints',
      href: '/dashboard/complaints',
      icon: MessageSquare,
      roles: ['CLIENT', 'LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN']
    },
    {
      name: 'Agents',
      href: '/dashboard/agents',
      icon: Users,
      roles: ['LANDLORD', 'ADMIN', 'SUPER_ADMIN']
    },
    {
      name: 'Verification',
      href: '/dashboard/verification',
      icon: Shield,
      roles: ['LANDLORD', 'AGENT']
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      roles: ['LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN']
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: FileText,
      roles: ['ADMIN', 'SUPER_ADMIN']
    }
  ];

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div> */}
          <SidebarContent navigation={filteredNavigation} user={user} onLogout={handleLogout} pathname={pathname} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white shadow-xl">
          <SidebarContent navigation={filteredNavigation} user={user} onLogout={handleLogout} pathname={pathname} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600 max-w-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
                    placeholder="Search properties..."
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {/* Notifications */}
              <button className="bg-white p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
              </button>

              {/* Add Property Button */}
              {['LANDLORD', 'AGENT', 'ADMIN', 'SUPER_ADMIN'].includes(user?.role) && (
                <Link
                  href="/dashboard/properties/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Page header */}
        {(title || subtitle || action) && (
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  {title && (
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  )}
                  {subtitle && (
                    <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
                  )}
                </div>
                {action && <div>{action}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<{
  navigation: any[];
  user: any;
  onLogout: () => void;
  pathname: string;
}> = ({ navigation, user, onLogout, pathname }) => {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Ppoint</span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {user?.avatarUrl ? (
              <img
                className="h-10 w-10 rounded-full"
                src={user.avatarUrl}
                alt={`${user.firstName} ${user.lastName}`}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-800">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role?.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          // --- FIX START ---
          // Use exact match for the root dashboard link, and prefix matching for others.
          const isRootDashboardLink = item.href === '/dashboard';
          const isActive = isRootDashboardLink
            ? pathname === item.href
            : pathname.startsWith(item.href);
          // --- FIX END ---

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`flex-shrink-0 mr-3 h-5 w-5 ${
                  isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="flex-shrink-0 px-3 py-4 border-t border-gray-200 space-y-1">
        <Link
          href="/dashboard/profile"
          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <User className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Profile
        </Link>
        <Link
          href="/dashboard/settings"
          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Settings className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Settings
        </Link>
        <button
          onClick={onLogout}
          className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-900 transition-colors"
        >
          <LogOut className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
          Sign out
        </button>
      </div>
    </>
  );
};

export default DashboardLayout;