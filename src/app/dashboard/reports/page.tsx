// // // components/admin/ReportPage.tsx
// // 'use client';

// // import React, { useState, useMemo } from 'react';
// // import { useDashboardStats, useAllUsers, useAllPropertiesAdmin, useAllComplaints, useVerificationRequests } from '@/hooks/useAdmin';
// // // import { Role, VerificationStatus, PropertyType, PropertyStatus, ListingType, ComplaintStatus } from '@prisma/client';

// // export enum Role {
// //   CLIENT = 'CLIENT',
// //   LANDLORD = 'LANDLORD',
// //   AGENT = 'AGENT',
// //   ADMIN = 'ADMIN',
// //   SUPER_ADMIN = 'SUPER_ADMIN',
// // }

// // export enum VerificationStatus {
// //   UNVERIFIED = 'UNVERIFIED',
// //   PENDING = 'PENDING',
// //   VERIFIED = 'VERIFIED',
// //   REJECTED = 'REJECTED',
// // }

// // export enum PropertyType {
// //   HOUSE = 'HOUSE',
// //   APARTMENT = 'APARTMENT',
// //   SHOP = 'SHOP',
// //   OFFICE = 'OFFICE',
// //   LAND = 'LAND',
// //   WAREHOUSE = 'WAREHOUSE',
// //   COMMERCIAL = 'COMMERCIAL',
// //   INDUSTRIAL = 'INDUSTRIAL',
// // }

// // export enum PropertyStatus {
// //   AVAILABLE = 'AVAILABLE',
// //   RENTED = 'RENTED',
// //   UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
// //   UNAVAILABLE = 'UNAVAILABLE',
// // }

// // export enum ListingType {
// //   FOR_RENT = 'FOR_RENT',
// //   FOR_SALE = 'FOR_SALE',
// // }

// // export enum ComplaintStatus {
// //   PENDING = 'PENDING',
// //   IN_REVIEW = 'IN_REVIEW',
// //   RESOLVED = 'RESOLVED',
// //   REJECTED = 'REJECTED',
// // }

// // interface ReportFilters {
// //   startDate: string;
// //   endDate: string;
// //   reportType: 'users' | 'properties' | 'financial' | 'engagement' | 'verifications' | 'complaints';
// //   role?: Role;
// //   propertyType?: PropertyType;
// //   status?: PropertyStatus | ComplaintStatus | VerificationStatus;
// //   minPrice?: number;
// //   maxPrice?: number;
// // }

// // interface ReportData {
// //   title: string;
// //   headers: string[];
// //   rows: any[];
// //   summary: {
// //     total: number;
// //     [key: string]: any;
// //   };
// // }

// // const ReportPage: React.FC = () => {
// //   const [filters, setFilters] = useState<ReportFilters>({
// //     startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
// //     endDate: new Date().toISOString().split('T')[0],
// //     reportType: 'users'
// //   });

// //   const [isGenerating, setIsGenerating] = useState(false);

// //   // Fetch all necessary data
// //   const { data: dashboardData } = useDashboardStats();
// //   const { data: usersData } = useAllUsers({ page: 1, limit: 1000 });
// //   const { data: propertiesData } = useAllPropertiesAdmin({ page: 1, limit: 1000 });
// //   const { data: complaintsData } = useAllComplaints({ page: 1, limit: 1000 });
// //   const { data: verificationsData } = useVerificationRequests({ page: 1, limit: 1000 });
  

// //   // Generate report data based on filters
// //   const reportData = useMemo((): ReportData => {
// //     if (!dashboardData?.data) {
// //       return { title: '', headers: [], rows: [], summary: { total: 0 } };
// //     }

// //     const { userMetrics, propertyMetrics, engagement, systemHealth, analytics } = dashboardData.data;

// //     const startDate = new Date(filters.startDate);
// //     const endDate = new Date(filters.endDate);
// //     endDate.setHours(23, 59, 59, 999);

// //     const filterByDate = (items: any[], dateField: string = 'createdAt') => {
// //       return items.filter(item => {
// //         const itemDate = new Date(item[dateField]);
// //         return itemDate >= startDate && itemDate <= endDate;
// //       });
// //     };

// //     switch (filters.reportType) {
// //       case 'users':
// //         const filteredUsers = filterByDate(userMetrics?.userTableData || []);
// //         const usersByRole = filteredUsers.reduce((acc, user) => {
// //           acc[user.role] = (acc[user.role] || 0) + 1;
// //           return acc;
// //         }, {} as Record<string, number>);

// //         const usersByVerification = filteredUsers.reduce((acc, user) => {
// //           acc[user.verificationStatus] = (acc[user.verificationStatus] || 0) + 1;
// //           return acc;
// //         }, {} as Record<string, number>);

// //         return {
// //           title: 'User Registration Report',
// //           headers: ['Name', 'Email', 'Phone', 'Role', 'Verification Status', 'Email Verified', 'Join Date', 'Last Login', 'Properties Posted', 'Reviews Given'],
// //           rows: filteredUsers.map(user => ({
// //             name: `${user.firstName} ${user.lastName}`,
// //             email: user.email,
// //             phone: user.phone,
// //             role: user.role,
// //             verificationStatus: user.verificationStatus,
// //             emailVerified: user.isEmailVerified ? 'Yes' : 'No',
// //             joinDate: new Date(user.joinDate).toLocaleDateString(),
// //             lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
// //             propertiesPosted: user.propertiesCount,
// //             reviewsGiven: user.reviewsCount
// //           })),
// //           summary: {
// //             total: filteredUsers.length,
// //             byRole: usersByRole,
// //             byVerification: usersByVerification,
// //             newRegistrations: filteredUsers.length,
// //             activeUsers: filteredUsers.filter(u => u.lastLogin && new Date(u.lastLogin) >= startDate).length
// //           }
// //         };

// //       case 'properties':
// //         const filteredProperties = filterByDate(propertyMetrics?.propertyTableData || []);
// //         const totalValue = filteredProperties.reduce((sum, property) => sum + (property.price || 0), 0);
// //         const propertiesByType = filteredProperties.reduce((acc, property) => {
// //           acc[property.type] = (acc[property.type] || 0) + 1;
// //           return acc;
// //         }, {} as Record<string, number>);

// //         const propertiesByStatus = filteredProperties.reduce((acc, property) => {
// //           acc[property.status] = (acc[property.status] || 0) + 1;
// //           return acc;
// //         }, {} as Record<string, number>);

// //         return {
// //           title: 'Property Listing Report',
// //           headers: ['Title', 'Type', 'Listing Type', 'Status', 'Price', 'Location', 'Bedrooms', 'Bathrooms', 'Area', 'Posted By', 'Views', 'Favorites', 'Ratings', 'Listed Date'],
// //           rows: filteredProperties.map(property => ({
// //             title: property.title,
// //             type: property.type,
// //             listingType: property.listingType,
// //             status: property.status,
// //             price: `₦${property.price?.toLocaleString()}`,
// //             location: property.location,
// //             bedrooms: property.bedrooms || 'N/A',
// //             bathrooms: property.bathrooms || 'N/A',
// //             area: property.area ? `${property.area} sqm` : 'N/A',
// //             postedBy: property.postedBy,
// //             views: property.views,
// //             favorites: property.favorites,
// //             ratings: property.ratings,
// //             listedDate: new Date(property.createdAt).toLocaleDateString()
// //           })),
// //           summary: {
// //             total: filteredProperties.length,
// //             byType: propertiesByType,
// //             byStatus: propertiesByStatus,
// //             totalValue,
// //             averagePrice: totalValue / (filteredProperties.length || 1),
// //             totalViews: filteredProperties.reduce((sum, p) => sum + p.views, 0),
// //             totalFavorites: filteredProperties.reduce((sum, p) => sum + p.favorites, 0)
// //           }
// //         };

// //       case 'financial':
// //         const financialProperties = filterByDate(propertyMetrics?.propertyTableData || []);
// //         const forRentProperties = financialProperties.filter(p => p.listingType === 'FOR_RENT');
// //         const forSaleProperties = financialProperties.filter(p => p.listingType === 'FOR_SALE');
        
// //         const rentalValue = forRentProperties.reduce((sum, p) => sum + (p.price || 0), 0);
// //         const saleValue = forSaleProperties.reduce((sum, p) => sum + (p.price || 0), 0);

// //         return {
// //           title: 'Financial Report',
// //           headers: ['Period', 'Listing Type', 'Property Type', 'Title', 'Price', 'Status', 'Location', 'Days Listed', 'Views per Day'],
// //           rows: financialProperties.map(property => {
// //             const daysListed = Math.ceil((new Date().getTime() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24));
// //             const viewsPerDay = daysListed > 0 ? (property.views / daysListed).toFixed(2) : property.views;
            
// //             return {
// //               period: new Date(property.createdAt).toLocaleDateString(),
// //               listingType: property.listingType,
// //               propertyType: property.type,
// //               title: property.title,
// //               price: `₦${property.price?.toLocaleString()}`,
// //               status: property.status,
// //               location: property.location,
// //               daysListed,
// //               viewsPerDay
// //             };
// //           }),
// //           summary: {
// //             total: financialProperties.length,
// //             totalProperties: financialProperties.length,
// //             totalPortfolioValue: rentalValue + saleValue,
// //             rentalPortfolioValue: rentalValue,
// //             salePortfolioValue: saleValue,
// //             averageRentalPrice: forRentProperties.length ? rentalValue / forRentProperties.length : 0,
// //             averageSalePrice: forSaleProperties.length ? saleValue / forSaleProperties.length : 0,
// //             availableProperties: financialProperties.filter(p => p.status === 'AVAILABLE').length,
// //             rentedProperties: financialProperties.filter(p => p.status === 'RENTED').length
// //           }
// //         };

// //       case 'engagement':
// //         const engagementProperties = filterByDate(propertyMetrics?.propertyTableData || []);
// //         const topPerforming = [...engagementProperties]
// //           .sort((a, b) => (b.views + b.favorites * 2 + b.ratings * 3) - (a.views + a.favorites * 2 + a.ratings * 3))
// //           .slice(0, 50);

// //         return {
// //           title: 'User Engagement Report',
// //           headers: ['Property Title', 'Type', 'Price', 'Location', 'Views', 'Favorites', 'Ratings', 'Engagement Score', 'Days Listed', 'Views per Day'],
// //           rows: topPerforming.map(property => {
// //             const daysListed = Math.ceil((new Date().getTime() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24));
// //             const engagementScore = property.views + (property.favorites * 2) + (property.ratings * 3);
// //             const viewsPerDay = daysListed > 0 ? (property.views / daysListed).toFixed(2) : property.views;
            
// //             return {
// //               title: property.title,
// //               type: property.type,
// //               price: `₦${property.price?.toLocaleString()}`,
// //               location: property.location,
// //               views: property.views,
// //               favorites: property.favorites,
// //               ratings: property.ratings,
// //               engagementScore,
// //               daysListed,
// //               viewsPerDay
// //             };
// //           }),
// //           summary: {
// //             total: engagementProperties.length,
// //             totalProperties: engagementProperties.length,
// //             totalViews: engagementProperties.reduce((sum, p) => sum + p.views, 0),
// //             totalFavorites: engagementProperties.reduce((sum, p) => sum + p.favorites, 0),
// //             totalRatings: engagementProperties.reduce((sum, p) => sum + p.ratings, 0),
// //             averageEngagement: engagementProperties.length ? 
// //               engagementProperties.reduce((sum, p) => sum + p.views + p.favorites * 2 + p.ratings * 3, 0) / engagementProperties.length : 0,
// //             topPerformingCount: topPerforming.length
// //           }
// //         };

// //       case 'verifications':
// //         const filteredVerifications = verificationsData?.data ? filterByDate(verificationsData.data, 'submittedAt') : [];
// //         const verificationsByStatus = filteredVerifications.reduce((acc, verification) => {
// //           acc[verification.status] = (acc[verification.status] || 0) + 1;
// //           return acc;
// //         }, {} as Record<string, number>);

// //         return {
// //           title: 'Verification Requests Report',
// //           headers: ['User Name', 'Role', 'NIN', 'Status', 'Submitted Date', 'Reviewed Date', 'Status Reason', 'Agent License', 'Tax ID'],
// //           rows: filteredVerifications.map(verification => ({
// //             userName: verification.user ? `${verification.user.firstName} ${verification.user.lastName}` : 'N/A',
// //             role: verification.user?.role,
// //             nin: verification.nin,
// //             status: verification.status,
// //             submittedDate: new Date(verification.submittedAt).toLocaleDateString(),
// //             reviewedDate: verification.reviewedAt ? new Date(verification.reviewedAt).toLocaleDateString() : 'Pending',
// //             statusReason: verification.statusReason || 'N/A',
// //             agentLicense: verification.agentLicenseNumber || 'N/A',
// //             taxId: verification.taxIdNumber || 'N/A'
// //           })),
// //           summary: {
// //             total: filteredVerifications.length,
// //             byStatus: verificationsByStatus,
// //             pending: filteredVerifications.filter(v => v.status === 'PENDING').length,
// //             approved: filteredVerifications.filter(v => v.status === 'VERIFIED').length,
// //             rejected: filteredVerifications.filter(v => v.status === 'REJECTED').length,
// //             averageProcessingTime: filteredVerifications.filter(v => v.reviewedAt).reduce((sum, v) => {
// //               const processingTime = new Date(v.reviewedAt).getTime() - new Date(v.submittedAt).getTime();
// //               return sum + processingTime;
// //             }, 0) / (filteredVerifications.filter(v => v.reviewedAt).length || 1) / (1000 * 60 * 60 * 24) // Convert to days
// //           }
// //         };

// //       case 'complaints':
// //         const filteredComplaints = complaintsData?.data ? filterByDate(complaintsData.data) : [];
// //         const complaintsByStatus = filteredComplaints.reduce((acc, complaint) => {
// //           acc[complaint.status] = (acc[complaint.status] || 0) + 1;
// //           return acc;
// //         }, {} as Record<string, number>);

// //         return {
// //           title: 'Complaints Report',
// //           headers: ['Subject', 'Client', 'Property', 'Status', 'Submitted Date', 'Resolved Date', 'Resolution Notes', 'Image Count'],
// //           rows: filteredComplaints.map(complaint => ({
// //             subject: complaint.subject,
// //             client: complaint.client ? `${complaint.client.firstName} ${complaint.client.lastName}` : 'N/A',
// //             property: complaint.property?.title || 'N/A',
// //             status: complaint.status,
// //             submittedDate: new Date(complaint.createdAt).toLocaleDateString(),
// //             resolvedDate: complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleDateString() : 'Pending',
// //             resolutionNotes: complaint.resolutionNotes || 'N/A',
// //             imageCount: complaint.imageUrls?.length || 0
// //           })),
// //           summary: {
// //             total: filteredComplaints.length,
// //             byStatus: complaintsByStatus,
// //             pending: filteredComplaints.filter(c => c.status === 'PENDING').length,
// //             resolved: filteredComplaints.filter(c => c.status === 'RESOLVED').length,
// //             averageResolutionTime: filteredComplaints.filter(c => c.resolvedAt).reduce((sum, c) => {
// //               const resolutionTime = new Date(c.resolvedAt).getTime() - new Date(c.createdAt).getTime();
// //               return sum + resolutionTime;
// //             }, 0) / (filteredComplaints.filter(c => c.resolvedAt).length || 1) / (1000 * 60 * 60 * 24) // Convert to days
// //           }
// //         };

// //       default:
// //         return { title: '', headers: [], rows: [], summary: { total: 0 } };
// //     }
// //   }, [filters, dashboardData, usersData, propertiesData, complaintsData, verificationsData]);

// //   const handleFilterChange = (key: keyof ReportFilters, value: any) => {
// //     setFilters(prev => ({ ...prev, [key]: value }));
// //   };

// //   const exportToCSV = () => {
// //     setIsGenerating(true);
    
// //     try {
// //       const csvHeaders = reportData.headers.join(',');
// //       const csvRows = reportData.rows.map(row => 
// //         reportData.headers.map(header => {
// //           const value = row[header.toLowerCase().replace(/[^a-z0-9]/g, '')] || '';
// //           return `"${String(value).replace(/"/g, '""')}"`;
// //         }).join(',')
// //       );
      
// //       const csvContent = [csvHeaders, ...csvRows].join('\n');
// //       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //       const link = document.createElement('a');
      
// //       const url = URL.createObjectURL(blob);
// //       link.setAttribute('href', url);
// //       link.setAttribute('download', `${reportData.title.replace(/\s+/g, '_')}_${filters.startDate}_to_${filters.endDate}.csv`);
// //       link.style.visibility = 'hidden';
      
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     } catch (error) {
// //       console.error('Export failed:', error);
// //       alert('Failed to export report. Please try again.');
// //     } finally {
// //       setIsGenerating(false);
// //     }
// //   };

// //   const exportToPDF = () => {
// //     setIsGenerating(true);
// //     // In a real implementation, you would use a PDF library like jspdf
// //     // For now, we'll simulate the export
// //     setTimeout(() => {
// //       alert('PDF export would be generated here. This feature requires jspdf library.');
// //       setIsGenerating(false);
// //     }, 1000);
// //   };

// //   const printReport = () => {
// //     window.print();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white shadow">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center py-6">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
// //               <p className="mt-1 text-sm text-gray-500">
// //                 Generate detailed reports and export data for analysis
// //               </p>
// //             </div>
// //             <div className="flex space-x-3">
// //               <button
// //                 onClick={exportToCSV}
// //                 disabled={isGenerating || reportData.rows.length === 0}
// //                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {isGenerating ? 'Exporting...' : 'Export CSV'}
// //               </button>
// //               <button
// //                 onClick={exportToPDF}
// //                 disabled={isGenerating || reportData.rows.length === 0}
// //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {isGenerating ? 'Exporting...' : 'Export PDF'}
// //               </button>
// //               <button
// //                 onClick={printReport}
// //                 disabled={reportData.rows.length === 0}
// //                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 Print Report
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Filters */}
// //         <div className="bg-white shadow rounded-lg mb-6">
// //           <div className="px-6 py-4 border-b border-gray-200">
// //             <h3 className="text-lg font-medium text-gray-900">Report Filters</h3>
// //           </div>
// //           <div className="p-6">
// //             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
// //               {/* Report Type */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Report Type</label>
// //                 <select
// //                   value={filters.reportType}
// //                   onChange={(e) => handleFilterChange('reportType', e.target.value)}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                 >
// //                   <option value="users">User Registrations</option>
// //                   <option value="properties">Property Listings</option>
// //                   <option value="financial">Financial Overview</option>
// //                   <option value="engagement">User Engagement</option>
// //                   <option value="verifications">Verification Requests</option>
// //                   <option value="complaints">Complaints</option>
// //                 </select>
// //               </div>

// //               {/* Start Date */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Start Date</label>
// //                 <input
// //                   type="date"
// //                   value={filters.startDate}
// //                   onChange={(e) => handleFilterChange('startDate', e.target.value)}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>

// //               {/* End Date */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">End Date</label>
// //                 <input
// //                   type="date"
// //                   value={filters.endDate}
// //                   onChange={(e) => handleFilterChange('endDate', e.target.value)}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>

// //               {/* Additional Filters based on report type */}
// //               {filters.reportType === 'users' && (
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Role</label>
// //                   <select
// //                     value={filters.role || ''}
// //                     onChange={(e) => handleFilterChange('role', e.target.value || undefined)}
// //                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="">All Roles</option>
// //                     <option value="CLIENT">Client</option>
// //                     <option value="LANDLORD">Landlord</option>
// //                     <option value="AGENT">Agent</option>
// //                     <option value="ADMIN">Admin</option>
// //                   </select>
// //                 </div>
// //               )}

// //               {filters.reportType === 'properties' && (
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Property Type</label>
// //                   <select
// //                     value={filters.propertyType || ''}
// //                     onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
// //                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="">All Types</option>
// //                     <option value="HOUSE">House</option>
// //                     <option value="APARTMENT">Apartment</option>
// //                     <option value="SHOP">Shop</option>
// //                     <option value="OFFICE">Office</option>
// //                     <option value="LAND">Land</option>
// //                     <option value="WAREHOUSE">Warehouse</option>
// //                     <option value="COMMERCIAL">Commercial</option>
// //                     <option value="INDUSTRIAL">Industrial</option>
// //                   </select>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Price Range for Financial Report */}
// //             {filters.reportType === 'financial' && (
// //               <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Minimum Price</label>
// //                   <input
// //                     type="number"
// //                     value={filters.minPrice || ''}
// //                     onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
// //                     placeholder="0"
// //                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Maximum Price</label>
// //                   <input
// //                     type="number"
// //                     value={filters.maxPrice || ''}
// //                     onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
// //                     placeholder="100000000"
// //                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Summary Cards */}
// //         {reportData.summary.total > 0 && (
// //           <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
// //             <div className="bg-white overflow-hidden shadow rounded-lg">
// //               <div className="p-5">
// //                 <div className="flex items-center">
// //                   <div className="flex-shrink-0">
// //                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
// //                       <span className="text-white text-sm">📊</span>
// //                     </div>
// //                   </div>
// //                   <div className="ml-5 w-0 flex-1">
// //                     <dl>
// //                       <dt className="text-sm font-medium text-gray-500 truncate">Total Records</dt>
// //                       <dd className="text-lg font-medium text-gray-900">{reportData.summary.total}</dd>
// //                     </dl>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Dynamic summary cards based on report type */}
// //             {filters.reportType === 'users' && (
// //               <>
// //                 <div className="bg-white overflow-hidden shadow rounded-lg">
// //                   <div className="p-5">
// //                     <div className="flex items-center">
// //                       <div className="flex-shrink-0">
// //                         <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
// //                           <span className="text-white text-sm">👥</span>
// //                         </div>
// //                       </div>
// //                       <div className="ml-5 w-0 flex-1">
// //                         <dl>
// //                           <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
// //                           <dd className="text-lg font-medium text-gray-900">{reportData.summary.activeUsers}</dd>
// //                         </dl>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="bg-white overflow-hidden shadow rounded-lg">
// //                   <div className="p-5">
// //                     <div className="flex items-center">
// //                       <div className="flex-shrink-0">
// //                         <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
// //                           <span className="text-white text-sm">🆕</span>
// //                         </div>
// //                       </div>
// //                       <div className="ml-5 w-0 flex-1">
// //                         <dl>
// //                           <dt className="text-sm font-medium text-gray-500 truncate">New Registrations</dt>
// //                           <dd className="text-lg font-medium text-gray-900">{reportData.summary.newRegistrations}</dd>
// //                         </dl>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </>
// //             )}

// //             {filters.reportType === 'properties' && (
// //               <>
// //                 <div className="bg-white overflow-hidden shadow rounded-lg">
// //                   <div className="p-5">
// //                     <div className="flex items-center">
// //                       <div className="flex-shrink-0">
// //                         <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
// //                           <span className="text-white text-sm">💰</span>
// //                         </div>
// //                       </div>
// //                       <div className="ml-5 w-0 flex-1">
// //                         <dl>
// //                           <dt className="text-sm font-medium text-gray-500 truncate">Total Value</dt>
// //                           <dd className="text-lg font-medium text-gray-900">
// //                             ₦{reportData.summary.totalValue?.toLocaleString()}
// //                           </dd>
// //                         </dl>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="bg-white overflow-hidden shadow rounded-lg">
// //                   <div className="p-5">
// //                     <div className="flex items-center">
// //                       <div className="flex-shrink-0">
// //                         <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
// //                           <span className="text-white text-sm">👀</span>
// //                         </div>
// //                       </div>
// //                       <div className="ml-5 w-0 flex-1">
// //                         <dl>
// //                           <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
// //                           <dd className="text-lg font-medium text-gray-900">{reportData.summary.totalViews}</dd>
// //                         </dl>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </>
// //             )}

// //             {filters.reportType === 'financial' && (
// //               <>
// //                 <div className="bg-white overflow-hidden shadow rounded-lg">
// //                   <div className="p-5">
// //                     <div className="flex items-center">
// //                       <div className="flex-shrink-0">
// //                         <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
// //                           <span className="text-white text-sm">💰</span>
// //                         </div>
// //                       </div>
// //                       <div className="ml-5 w-0 flex-1">
// //                         <dl>
// //                           <dt className="text-sm font-medium text-gray-500 truncate">Portfolio Value</dt>
// //                           <dd className="text-lg font-medium text-gray-900">
// //                             ₦{reportData.summary.totalPortfolioValue?.toLocaleString()}
// //                           </dd>
// //                         </dl>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="bg-white overflow-hidden shadow rounded-lg">
// //                   <div className="p-5">
// //                     <div className="flex items-center">
// //                       <div className="flex-shrink-0">
// //                         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
// //                           <span className="text-white text-sm">🏠</span>
// //                         </div>
// //                       </div>
// //                       <div className="ml-5 w-0 flex-1">
// //                         <dl>
// //                           <dt className="text-sm font-medium text-gray-500 truncate">Available</dt>
// //                           <dd className="text-lg font-medium text-gray-900">{reportData.summary.availableProperties}</dd>
// //                         </dl>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         )}

// //         {/* Report Table */}
// //         <div className="bg-white shadow rounded-lg">
// //           <div className="px-6 py-4 border-b border-gray-200">
// //             <h3 className="text-lg font-medium text-gray-900">
// //               {reportData.title} ({filters.startDate} to {filters.endDate})
// //             </h3>
// //             <p className="mt-1 text-sm text-gray-500">
// //               Showing {reportData.rows.length} records
// //             </p>
// //           </div>

// //           {reportData.rows.length === 0 ? (
// //             <div className="text-center py-12">
// //               <div className="text-gray-400 text-6xl mb-4">📊</div>
// //               <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
// //               <p className="text-gray-500">Try adjusting your filters or select a different date range.</p>
// //             </div>
// //           ) : (
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     {reportData.headers.map((header, index) => (
// //                       <th
// //                         key={index}
// //                         scope="col"
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
// //                       >
// //                         {header}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {reportData.rows.map((row, rowIndex) => (
// //                     <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// //                       {reportData.headers.map((header, cellIndex) => {
// //                         const key = header.toLowerCase().replace(/[^a-z0-9]/g, '');
// //                         return (
// //                           <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                             {row[key]}
// //                           </td>
// //                         );
// //                       })}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>

// //         {/* Detailed Summary */}
// //         {reportData.summary.total > 0 && (
// //           <div className="mt-6 bg-white shadow rounded-lg">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h3 className="text-lg font-medium text-gray-900">Report Summary</h3>
// //             </div>
// //             <div className="p-6">
// //               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
// //                 {/* Summary statistics */}
// //                 <div>
// //                   <h4 className="text-md font-medium text-gray-900 mb-4">Key Metrics</h4>
// //                   <dl className="space-y-3">
// //                     {Object.entries(reportData.summary).map(([key, value]) => {
// //                       if (typeof value === 'number' && key !== 'total') {
// //                         return (
// //                           <div key={key} className="flex justify-between">
// //                             <dt className="text-sm font-medium text-gray-500 capitalize">
// //                               {key.replace(/([A-Z])/g, ' $1').trim()}
// //                             </dt>
// //                             <dd className="text-sm text-gray-900">
// //                               {key.includes('Price') || key.includes('Value') ? `₦${value.toLocaleString()}` : value}
// //                             </dd>
// //                           </div>
// //                         );
// //                       }
// //                       return null;
// //                     })}
// //                   </dl>
// //                 </div>

// //                 {/* Distribution charts would go here */}
// //                 <div>
// //                   <h4 className="text-md font-medium text-gray-900 mb-4">Distribution</h4>
// //                   <div className="text-sm text-gray-500">
// //                     {/* In a real implementation, you would show charts here */}
// //                     Charts showing data distribution would be displayed here.
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Print Styles */}
// //       <style jsx global>{`
// //         @media print {
// //           .bg-gray-50 { background: white !important; }
// //           .shadow { box-shadow: none !important; }
// //           .rounded-lg { border-radius: 0 !important; }
// //           .px-4, .px-6 { padding-left: 0 !important; padding-right: 0 !important; }
// //           .py-8, .py-6, .py-4 { padding-top: 0 !important; padding-bottom: 0 !important; }
// //           .mb-6 { margin-bottom: 0 !important; }
// //           .mt-6 { margin-top: 0 !important; }
// //           .flex { display: block !important; }
// //           .hidden { display: none !important; }
// //           .overflow-x-auto { overflow: visible !important; }
// //           table { width: 100%; border-collapse: collapse; }
// //           th, td { border: 1px solid #000; padding: 4px; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default ReportPage;

// // components/admin/ReportPage.tsx
// 'use client';

// import React, { useState, useMemo } from 'react';
// import { useDashboardStats, useAllUsers, useAllPropertiesAdmin, useAllComplaints, useVerificationRequests } from '@/hooks/useAdmin';

// // ... (Keep all the enums as they are)


// export enum Role {
//   CLIENT = 'CLIENT',
//   LANDLORD = 'LANDLORD',
//   AGENT = 'AGENT',
//   ADMIN = 'ADMIN',
//   SUPER_ADMIN = 'SUPER_ADMIN',
// }

// export enum VerificationStatus {
//   UNVERIFIED = 'UNVERIFIED',
//   PENDING = 'PENDING',
//   VERIFIED = 'VERIFIED',
//   REJECTED = 'REJECTED',
// }

// export enum PropertyType {
//   HOUSE = 'HOUSE',
//   APARTMENT = 'APARTMENT',
//   SHOP = 'SHOP',
//   OFFICE = 'OFFICE',
//   LAND = 'LAND',
//   WAREHOUSE = 'WAREHOUSE',
//   COMMERCIAL = 'COMMERCIAL',
//   INDUSTRIAL = 'INDUSTRIAL',
// }

// export enum PropertyStatus {
//   AVAILABLE = 'AVAILABLE',
//   RENTED = 'RENTED',
//   UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
//   UNAVAILABLE = 'UNAVAILABLE',
// }

// export enum ListingType {
//   FOR_RENT = 'FOR_RENT',
//   FOR_SALE = 'FOR_SALE',
// }

// export enum ComplaintStatus {
//   PENDING = 'PENDING',
//   IN_REVIEW = 'IN_REVIEW',
//   RESOLVED = 'RESOLVED',
//   REJECTED = 'REJECTED',
// }

// interface ReportFilters {
//   startDate: string;
//   endDate: string;
//   reportType: 'users' | 'properties' | 'financial' | 'engagement' | 'verifications' | 'complaints';
//   role?: Role;
//   propertyType?: PropertyType;
//   status?: PropertyStatus | ComplaintStatus | VerificationStatus;
//   minPrice?: number;
//   maxPrice?: number;
// }

// interface ReportData {
//   title: string;
//   headers: string[];
//   rows: any[];
//   summary: {
//     total: number;
//     [key: string]: any;
//   };
// }

// interface ReportFilters {
//   startDate: string;
//   endDate: string;
//   reportType: 'users' | 'properties' | 'financial' | 'engagement' | 'verifications' | 'complaints';
//   role?: Role;
//   verificationStatus?: VerificationStatus;
//   propertyType?: PropertyType;
//   status?: PropertyStatus | ComplaintStatus | VerificationStatus;
//   minPrice?: number;
//   maxPrice?: number;
//   hasProperties?: boolean;
//   isEmailVerified?: boolean;
// }

// interface ReportData {
//   title: string;
//   headers: string[];
//   rows: any[];
//   summary: {
//     total: number;
//     [key: string]: any;
//   };
// }

// const ReportPage: React.FC = () => {
//   const [filters, setFilters] = useState<ReportFilters>({
//     startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//     endDate: new Date().toISOString().split('T')[0],
//     reportType: 'users'
//   });

//   const [isGenerating, setIsGenerating] = useState(false);

//   // Fetch all necessary data
//   const { data: dashboardData } = useDashboardStats();
//   const { data: usersData } = useAllUsers({ page: 1, limit: 1000 });
//   const { data: propertiesData } = useAllPropertiesAdmin({ page: 1, limit: 1000 });
//   const { data: complaintsData } = useAllComplaints({ page: 1, limit: 1000 });
//   const { data: verificationsData } = useVerificationRequests({ page: 1, limit: 1000 });

//   // Generate report data based on filters
//   const reportData = useMemo((): ReportData => {
//     if (!dashboardData?.data) {
//       return { title: '', headers: [], rows: [], summary: { total: 0 } };
//     }

//     const { userMetrics, propertyMetrics, engagement, systemHealth, analytics } = dashboardData.data;

//     const startDate = new Date(filters.startDate);
//     const endDate = new Date(filters.endDate);
//     endDate.setHours(23, 59, 59, 999);

//     const filterByDate = (items: any[], dateField: string = 'createdAt') => {
//       return items.filter(item => {
//         const itemDate = new Date(item[dateField]);
//         return itemDate >= startDate && itemDate <= endDate;
//       });
//     };

//     switch (filters.reportType) {
//       case 'users':
//         // Get raw user data from the userMetrics
//         let filteredUsers = userMetrics?.userTableData || [];
        
//         // Apply date filter on joinDate (createdAt)
//         filteredUsers = filteredUsers.filter((user: any) => {
//           const userDate = new Date(user.joinDate || user.createdAt);
//           return userDate >= startDate && userDate <= endDate;
//         });

//         // Apply role filter if specified
//         if (filters.role) {
//           filteredUsers = filteredUsers.filter((user: any) => user.role === filters.role);
//         }

//         // Apply verification status filter if specified
//         if (filters.verificationStatus) {
//           filteredUsers = filteredUsers.filter((user: any) => 
//             user.verificationStatus === filters.verificationStatus
//           );
//         }

//         // Apply email verification filter if specified
//         if (filters.isEmailVerified !== undefined) {
//           filteredUsers = filteredUsers.filter((user: any) => 
//             user.isEmailVerified === filters.isEmailVerified
//           );
//         }

//         // Apply has properties filter if specified
//         if (filters.hasProperties !== undefined) {
//           filteredUsers = filteredUsers.filter((user: any) => {
//             const hasProps = (user.propertiesCount || 0) > 0;
//             return filters.hasProperties ? hasProps : !hasProps;
//           });
//         }

//         // Calculate statistics
//         const usersByRole = filteredUsers.reduce((acc: any, user: any) => {
//           acc[user.role] = (acc[user.role] || 0) + 1;
//           return acc;
//         }, {} as Record<string, number>);

//         const usersByVerification = filteredUsers.reduce((acc: any, user: any) => {
//           acc[user.verificationStatus] = (acc[user.verificationStatus] || 0) + 1;
//           return acc;
//         }, {} as Record<string, number>);

//         const emailVerifiedCount = filteredUsers.filter((u: any) => u.isEmailVerified).length;
//         const phoneVerifiedCount = filteredUsers.filter((u: any) => u.phone && u.phone.length > 0).length;
//         const withPropertiesCount = filteredUsers.filter((u: any) => (u.propertiesCount || 0) > 0).length;
//         const activeInLast7Days = filteredUsers.filter((u: any) => {
//           if (!u.lastLogin) return false;
//           const lastLoginDate = new Date(u.lastLogin);
//           const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//           return lastLoginDate >= sevenDaysAgo;
//         }).length;

//         // Calculate engagement metrics
//         const totalPropertiesPosted = filteredUsers.reduce((sum: number, user: any) => 
//           sum + (user.propertiesCount || 0), 0
//         );
//         const totalReviewsGiven = filteredUsers.reduce((sum: number, user: any) => 
//           sum + (user.reviewsCount || 0), 0
//         );

//         return {
//           title: 'User Registration Report',
//           headers: [
//             'ID',
//             'Name', 
//             'Email', 
//             'Phone', 
//             'Role', 
//             'Verification Status', 
//             'Email Verified', 
//             'Join Date', 
//             'Last Login', 
//             'Properties Posted',
//             'Properties Managed',
//             'Reviews Given',
//             'Complaints Filed',
//             'Days Since Registration'
//           ],
//           rows: filteredUsers.map((user: any) => {
//             const daysSinceReg = Math.floor(
//               (new Date().getTime() - new Date(user.joinDate || user.createdAt).getTime()) 
//               / (1000 * 60 * 60 * 24)
//             );
            
//             return {
//               id: user.id || 'N/A',
//               name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A',
//               email: user.email || 'N/A',
//               phone: user.phone || 'N/A',
//               role: user.role || 'N/A',
//               verificationstatus: user.verificationStatus || 'UNVERIFIED',
//               emailverified: user.isEmailVerified ? 'Yes' : 'No',
//               joindate: new Date(user.joinDate || user.createdAt).toLocaleDateString(),
//               lastlogin: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
//               propertiesposted: user.propertiesCount || 0,
//               propertiesmanaged: user.managedPropertiesCount || 0,
//               reviewsgiven: user.reviewsCount || 0,
//               complaintsfiled: user.complaintsCount || 0,
//               dayssinceregistration: daysSinceReg
//             };
//           }),
//           summary: {
//             total: filteredUsers.length,
//             byRole: usersByRole,
//             byVerification: usersByVerification,
//             emailVerified: emailVerifiedCount,
//             phoneProvided: phoneVerifiedCount,
//             withProperties: withPropertiesCount,
//             activeInLast7Days,
//             newRegistrations: filteredUsers.length,
//             activeUsers: filteredUsers.filter((u: any) => 
//               u.lastLogin && new Date(u.lastLogin) >= startDate
//             ).length,
//             totalPropertiesPosted,
//             totalReviewsGiven,
//             averagePropertiesPerUser: filteredUsers.length > 0 
//               ? (totalPropertiesPosted / filteredUsers.length).toFixed(2) 
//               : 0,
//             verificationRate: filteredUsers.length > 0
//               ? ((filteredUsers.filter((u: any) => u.verificationStatus === 'VERIFIED').length / filteredUsers.length) * 100).toFixed(1)
//               : 0
//           }
//         };

//       // ... (Keep all other cases as they are)
      
//       default:
//         return { title: '', headers: [], rows: [], summary: { total: 0 } };
//     }
//   }, [filters, dashboardData, usersData, propertiesData, complaintsData, verificationsData]);

//   const handleFilterChange = (key: keyof ReportFilters, value: any) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   // ... (Keep exportToCSV, exportToPDF, printReport functions as they are)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header - Keep as is */}
      
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Enhanced Filters Section */}
//         <div className="bg-white shadow rounded-lg mb-6">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-900">Report Filters</h3>
//           </div>
//           <div className="p-6">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {/* Report Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Report Type</label>
//                 <select
//                   value={filters.reportType}
//                   onChange={(e) => handleFilterChange('reportType', e.target.value)}
//                   className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="users">User Registrations</option>
//                   <option value="properties">Property Listings</option>
//                   <option value="financial">Financial Overview</option>
//                   <option value="engagement">User Engagement</option>
//                   <option value="verifications">Verification Requests</option>
//                   <option value="complaints">Complaints</option>
//                 </select>
//               </div>

//               {/* Start Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                 <input
//                   type="date"
//                   value={filters.startDate}
//                   onChange={(e) => handleFilterChange('startDate', e.target.value)}
//                   className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* End Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">End Date</label>
//                 <input
//                   type="date"
//                   value={filters.endDate}
//                   onChange={(e) => handleFilterChange('endDate', e.target.value)}
//                   className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* User-specific Filters */}
//               {filters.reportType === 'users' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Role</label>
//                     <select
//                       value={filters.role || ''}
//                       onChange={(e) => handleFilterChange('role', e.target.value || undefined)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">All Roles</option>
//                       <option value="CLIENT">Client</option>
//                       <option value="LANDLORD">Landlord</option>
//                       <option value="AGENT">Agent</option>
//                       <option value="ADMIN">Admin</option>
//                       <option value="SUPER_ADMIN">Super Admin</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Verification Status</label>
//                     <select
//                       value={filters.verificationStatus || ''}
//                       onChange={(e) => handleFilterChange('verificationStatus', e.target.value || undefined)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">All Statuses</option>
//                       <option value="UNVERIFIED">Unverified</option>
//                       <option value="PENDING">Pending</option>
//                       <option value="VERIFIED">Verified</option>
//                       <option value="REJECTED">Rejected</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Email Verified</label>
//                     <select
//                       value={filters.isEmailVerified === undefined ? '' : filters.isEmailVerified.toString()}
//                       onChange={(e) => handleFilterChange('isEmailVerified', 
//                         e.target.value === '' ? undefined : e.target.value === 'true'
//                       )}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">All Users</option>
//                       <option value="true">Verified Only</option>
//                       <option value="false">Unverified Only</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Has Properties</label>
//                     <select
//                       value={filters.hasProperties === undefined ? '' : filters.hasProperties.toString()}
//                       onChange={(e) => handleFilterChange('hasProperties', 
//                         e.target.value === '' ? undefined : e.target.value === 'true'
//                       )}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">All Users</option>
//                       <option value="true">With Properties</option>
//                       <option value="false">Without Properties</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {/* ... (Keep other filter sections as they are) */}
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Summary Cards for Users */}
//         {reportData.summary.total > 0 && filters.reportType === 'users' && (
//           <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="p-5">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-lg">👥</span>
//                     </div>
//                   </div>
//                   <div className="ml-5 w-0 flex-1">
//                     <dl>
//                       <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
//                       <dd className="text-lg font-semibold text-gray-900">{reportData.summary.total}</dd>
//                     </dl>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="p-5">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-lg">✅</span>
//                     </div>
//                   </div>
//                   <div className="ml-5 w-0 flex-1">
//                     <dl>
//                       <dt className="text-sm font-medium text-gray-500 truncate">Verified Users</dt>
//                       <dd className="text-lg font-semibold text-gray-900">
//                         {reportData.summary.byVerification?.VERIFIED || 0}
//                         <span className="text-sm text-gray-500 ml-1">
//                           ({reportData.summary.verificationRate}%)
//                         </span>
//                       </dd>
//                     </dl>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="p-5">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-lg">🏠</span>
//                     </div>
//                   </div>
//                   <div className="ml-5 w-0 flex-1">
//                     <dl>
//                       <dt className="text-sm font-medium text-gray-500 truncate">Property Owners</dt>
//                       <dd className="text-lg font-semibold text-gray-900">
//                         {reportData.summary.withProperties}
//                       </dd>
//                     </dl>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="p-5">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-lg">🔥</span>
//                     </div>
//                   </div>
//                   <div className="ml-5 w-0 flex-1">
//                     <dl>
//                       <dt className="text-sm font-medium text-gray-500 truncate">Active (7 days)</dt>
//                       <dd className="text-lg font-semibold text-gray-900">
//                         {reportData.summary.activeInLast7Days}
//                       </dd>
//                     </dl>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Role Distribution for Users */}
//         {reportData.summary.total > 0 && filters.reportType === 'users' && reportData.summary.byRole && (
//           <div className="bg-white shadow rounded-lg mb-6">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">User Distribution</h3>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 {Object.entries(reportData.summary.byRole).map(([role, count]) => (
//                   <div key={role} className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">{count as number}</div>
//                     <div className="text-sm text-gray-500 capitalize">{role.toLowerCase()}</div>
//                     <div className="text-xs text-gray-400">
//                       {((count as number / reportData.summary.total) * 100).toFixed(1)}%
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Report Table - Keep the existing table structure */}
//         <div className="bg-white shadow rounded-lg">
//           {/* ... (Keep the existing table code) */}
//         </div>

//         {/* ... (Keep the rest of the component as is) */}
//       </div>
//     </div>
//   );
// };

// export default ReportPage;

// components/admin/ReportPage.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useDashboardStats, useAllUsers, useAllPropertiesAdmin, useAllComplaints, useVerificationRequests } from '@/hooks/useAdmin';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin


export enum Role {
  CLIENT = 'CLIENT',
  LANDLORD = 'LANDLORD',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  SHOP = 'SHOP',
  OFFICE = 'OFFICE',
  LAND = 'LAND',
  WAREHOUSE = 'WAREHOUSE',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export enum ListingType {
  FOR_RENT = 'FOR_RENT',
  FOR_SALE = 'FOR_SALE',
}

export enum ComplaintStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

interface ReportFilters {
  startDate: string;
  endDate: string;
  reportType: 'users' | 'properties' | 'financial' | 'engagement' | 'verifications' | 'complaints';
  role?: Role;
  verificationStatus?: VerificationStatus;
  propertyType?: PropertyType;
  status?: PropertyStatus | ComplaintStatus | VerificationStatus;
  minPrice?: number;
  maxPrice?: number;
  hasProperties?: boolean;
  isEmailVerified?: boolean;
  city?: string;
  state?: string;
  listingType?: ListingType;
}

interface ReportData {
  title: string;
  headers: string[];
  rows: any[];
  summary: {
    total: number;
    [key: string]: any;
  };
}

const ReportPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reportType: 'users'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch all necessary data
  const { data: dashboardData } = useDashboardStats();
  const { data: usersData } = useAllUsers({ page: 1, limit: 1000 });
  const { data: propertiesData } = useAllPropertiesAdmin({ page: 1, limit: 1000 });
  const { data: complaintsData } = useAllComplaints({ page: 1, limit: 1000 });
  const { data: verificationsData } = useVerificationRequests({ page: 1, limit: 1000 });

  // Generate report data based on filters
  const reportData = useMemo((): ReportData => {
    if (!dashboardData?.data) {
      return { title: '', headers: [], rows: [], summary: { total: 0 } };
    }

    const { userMetrics, propertyMetrics, engagement, systemHealth, analytics } = dashboardData.data;

    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    endDate.setHours(23, 59, 59, 999);

    const filterByDate = (items: any[], dateField: string = 'createdAt') => {
      return items.filter(item => {
        const itemDate = new Date(item[dateField]);
        return itemDate >= startDate && itemDate <= endDate;
      });
    };

    switch (filters.reportType) {
      case 'users':
        // Get raw user data from the userMetrics
        let filteredUsers = userMetrics?.userTableData || [];
        
        // Apply date filter on joinDate (createdAt)
        filteredUsers = filteredUsers.filter((user: any) => {
          const userDate = new Date(user.joinDate || user.createdAt);
          return userDate >= startDate && userDate <= endDate;
        });

        // Apply role filter if specified
        if (filters.role) {
          filteredUsers = filteredUsers.filter((user: any) => user.role === filters.role);
        }

        // Apply verification status filter if specified
        if (filters.verificationStatus) {
          filteredUsers = filteredUsers.filter((user: any) => 
            user.verificationStatus === filters.verificationStatus
          );
        }

        // Apply email verification filter if specified
        if (filters.isEmailVerified !== undefined) {
          filteredUsers = filteredUsers.filter((user: any) => 
            user.isEmailVerified === filters.isEmailVerified
          );
        }

        // Apply has properties filter if specified
        if (filters.hasProperties !== undefined) {
          filteredUsers = filteredUsers.filter((user: any) => {
            const hasProps = (user.propertiesCount || 0) > 0;
            return filters.hasProperties ? hasProps : !hasProps;
          });
        }

        // Calculate statistics
        const usersByRole = filteredUsers.reduce((acc: any, user: any) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const usersByVerification = filteredUsers.reduce((acc: any, user: any) => {
          acc[user.verificationStatus] = (acc[user.verificationStatus] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const emailVerifiedCount = filteredUsers.filter((u: any) => u.isEmailVerified).length;
        const phoneVerifiedCount = filteredUsers.filter((u: any) => u.phone && u.phone.length > 0).length;
        const withPropertiesCount = filteredUsers.filter((u: any) => (u.propertiesCount || 0) > 0).length;
        const activeInLast7Days = filteredUsers.filter((u: any) => {
          if (!u.lastLogin) return false;
          const lastLoginDate = new Date(u.lastLogin);
          const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return lastLoginDate >= sevenDaysAgo;
        }).length;

        // Calculate engagement metrics
        const totalPropertiesPosted = filteredUsers.reduce((sum: number, user: any) => 
          sum + (user.propertiesCount || 0), 0
        );
        const totalReviewsGiven = filteredUsers.reduce((sum: number, user: any) => 
          sum + (user.reviewsCount || 0), 0
        );

        return {
          title: 'User Registration Report',
          headers: [
            'ID',
            'Name', 
            'Email', 
            'Phone', 
            'Role', 
            'Verification Status', 
            'Email Verified', 
            'Join Date', 
            'Last Login', 
            'Properties Posted',
            'Properties Managed',
            'Reviews Given',
            'Complaints Filed',
            'Days Since Registration'
          ],
          rows: filteredUsers.map((user: any) => {
            const daysSinceReg = Math.floor(
              (new Date().getTime() - new Date(user.joinDate || user.createdAt).getTime()) 
              / (1000 * 60 * 60 * 24)
            );
            
            return {
              id: user.id || 'N/A',
              name:user.name || "N/A",
              email: user.email || 'N/A',
              phone: user.phone || 'N/A',
              role: user.role || 'N/A',
              verificationstatus: user.verificationStatus || 'UNVERIFIED',
              emailverified: user.isEmailVerified ? 'Yes' : 'No',
              joindate: new Date(user.joinDate || user.createdAt).toLocaleDateString(),
              lastlogin: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
              propertiesposted: user.propertiesCount || 0,
              propertiesmanaged: user.managedPropertiesCount || 0,
              reviewsgiven: user.reviewsCount || 0,
              complaintsfiled: user.complaintsCount || 0,
              dayssinceregistration: daysSinceReg
            };
          }),
          summary: {
            total: filteredUsers.length,
            byRole: usersByRole,
            byVerification: usersByVerification,
            emailVerified: emailVerifiedCount,
            phoneProvided: phoneVerifiedCount,
            withProperties: withPropertiesCount,
            activeInLast7Days,
            newRegistrations: filteredUsers.length,
            activeUsers: filteredUsers.filter((u: any) => 
              u.lastLogin && new Date(u.lastLogin) >= startDate
            ).length,
            totalPropertiesPosted,
            totalReviewsGiven,
            averagePropertiesPerUser: filteredUsers.length > 0 
              ? (totalPropertiesPosted / filteredUsers.length).toFixed(2) 
              : 0,
            verificationRate: filteredUsers.length > 0
              ? ((filteredUsers.filter((u: any) => u.verificationStatus === 'VERIFIED').length / filteredUsers.length) * 100).toFixed(1)
              : 0
          }
        };

      case 'properties':
        let filteredProperties = propertyMetrics?.propertyTableData || [];
        
        // Apply date filter
        filteredProperties = filterByDate(filteredProperties);
        
        // Apply property type filter
        if (filters.propertyType) {
          filteredProperties = filteredProperties.filter((p: any) => p.type === filters.propertyType);
        }
        
        // Apply status filter
        if (filters.status) {
          filteredProperties = filteredProperties.filter((p: any) => p.status === filters.status);
        }
        
        // Apply listing type filter
        if (filters.listingType) {
          filteredProperties = filteredProperties.filter((p: any) => p.listingType === filters.listingType);
        }
        
        // Apply price range filter
        if (filters.minPrice !== undefined) {
          filteredProperties = filteredProperties.filter((p: any) => p.price >= (filters.minPrice ?? Infinity));
        }
        if (filters.maxPrice !== undefined) {
          filteredProperties = filteredProperties.filter((p: any) => p.price <= (filters.maxPrice ?? Infinity));
        }
        
        // Apply location filters
        if (filters.city) {
          filteredProperties = filteredProperties.filter((p: any) => 
            p.location?.toLowerCase().includes(filters.city?.toLowerCase())
          );
        }
        if (filters.state) {
          filteredProperties = filteredProperties.filter((p: any) => 
            p.location?.toLowerCase().includes(filters.state?.toLowerCase())
          );
        }

        const totalValue = filteredProperties.reduce((sum: number, property: any) => 
          sum + (property.price || 0), 0
        );
        
        const propertiesByType = filteredProperties.reduce((acc: any, property: any) => {
          acc[property.type] = (acc[property.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const propertiesByStatus = filteredProperties.reduce((acc: any, property: any) => {
          acc[property.status] = (acc[property.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const propertiesByListingType = filteredProperties.reduce((acc: any, property: any) => {
          acc[property.listingType] = (acc[property.listingType] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const averageViews = filteredProperties.length > 0
          ? (filteredProperties.reduce((sum: number, p: any) => sum + p.views, 0) / filteredProperties.length).toFixed(1)
          : 0;

        return {
          title: 'Property Listing Report',
          headers: [
            'ID',
            'Title', 
            'Type', 
            'Listing Type', 
            'Status', 
            'Price', 
            'Location', 
            'Bedrooms', 
            'Bathrooms', 
            'Area', 
            'Posted By',
            'Managed By',
            'Views', 
            'Favorites', 
            'Ratings',
            'Featured',
            'Listed Date'
          ],
          rows: filteredProperties.map((property: any) => ({
            id: property.id || 'N/A',
            title: property.title,
            type: property.type,
            listingtype: property.listingType,
            status: property.status,
            price: `₦${property.price?.toLocaleString()}`,
            location: property.location,
            bedrooms: property.bedrooms || 'N/A',
            bathrooms: property.bathrooms || 'N/A',
            area: property.area ? `${property.area} sqm` : 'N/A',
            postedby: property.postedBy,
            managedby: property.managedBy || 'N/A',
            views: property.views,
            favorites: property.favorites,
            ratings: property.ratings,
            featured: property.isFeatured ? 'Yes' : 'No',
            listeddate: new Date(property.createdAt).toLocaleDateString()
          })),
          summary: {
            total: filteredProperties.length,
            byType: propertiesByType,
            byStatus: propertiesByStatus,
            byListingType: propertiesByListingType,
            totalValue,
            averagePrice: filteredProperties.length > 0 
              ? totalValue / filteredProperties.length 
              : 0,
            totalViews: filteredProperties.reduce((sum: number, p: any) => sum + p.views, 0),
            totalFavorites: filteredProperties.reduce((sum: number, p: any) => sum + p.favorites, 0),
            averageViews,
            featuredCount: filteredProperties.filter((p: any) => p.isFeatured).length,
            availableCount: filteredProperties.filter((p: any) => p.status === 'AVAILABLE').length,
            rentedCount: filteredProperties.filter((p: any) => p.status === 'RENTED').length
          }
        };

      case 'financial':
        let financialProperties = propertyMetrics?.propertyTableData || [];
        financialProperties = filterByDate(financialProperties);
        
        // Apply price filters
        if (filters.minPrice !== undefined) {
          financialProperties = financialProperties.filter((p: any) => p.price >= (filters.minPrice ?? Infinity));
        }
        if (filters.maxPrice !== undefined) {
          financialProperties = financialProperties.filter((p: any) => p.price <= (filters.maxPrice ?? Infinity));
        }

        const forRentProperties = financialProperties.filter((p: any) => p.listingType === 'FOR_RENT');
        const forSaleProperties = financialProperties.filter((p: any) => p.listingType === 'FOR_SALE');
        
        const rentalValue = forRentProperties.reduce((sum: number, p: any) => sum + (p.price || 0), 0);
        const saleValue = forSaleProperties.reduce((sum: number, p: any) => sum + (p.price || 0), 0);

        // Calculate monthly rental income (assuming annual rent)
        const monthlyRentalIncome = rentalValue / 12;
        
        // Group by price ranges
        const priceRanges = {
          'Under 500K': financialProperties.filter((p: any) => p.price < 500000).length,
          '500K - 1M': financialProperties.filter((p: any) => p.price >= 500000 && p.price < 1000000).length,
          '1M - 5M': financialProperties.filter((p: any) => p.price >= 1000000 && p.price < 5000000).length,
          '5M - 10M': financialProperties.filter((p: any) => p.price >= 5000000 && p.price < 10000000).length,
          'Above 10M': financialProperties.filter((p: any) => p.price >= 10000000).length,
        };

        return {
          title: 'Financial Report',
          headers: [
            'Period', 
            'Property ID',
            'Title',
            'Listing Type', 
            'Property Type', 
            'Price', 
            'Status', 
            'Location',
            'Posted By',
            'Days Listed', 
            'Views',
            'Views per Day',
            'Estimated ROI'
          ],
          rows: financialProperties.map((property: any) => {
            const daysListed = Math.ceil(
              (new Date().getTime() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24)
            );
            const viewsPerDay = daysListed > 0 ? (property.views / daysListed).toFixed(2) : property.views;
            const estimatedROI = property.listingType === 'FOR_RENT' 
              ? ((property.price * 12) / property.price * 100).toFixed(1) + '%'
              : 'N/A';
            
            return {
              period: new Date(property.createdAt).toLocaleDateString(),
              propertyid: property.id || 'N/A',
              title: property.title,
              listingtype: property.listingType,
              propertytype: property.type,
              price: `₦${property.price?.toLocaleString()}`,
              status: property.status,
              location: property.location,
              postedby: property.postedBy,
              dayslisted: daysListed,
              views: property.views,
              viewsperday: viewsPerDay,
              estimatedroi: estimatedROI
            };
          }),
          summary: {
            total: financialProperties.length,
            totalProperties: financialProperties.length,
            totalPortfolioValue: rentalValue + saleValue,
            rentalPortfolioValue: rentalValue,
            salePortfolioValue: saleValue,
            monthlyRentalIncome,
            averageRentalPrice: forRentProperties.length ? rentalValue / forRentProperties.length : 0,
            averageSalePrice: forSaleProperties.length ? saleValue / forSaleProperties.length : 0,
            availableProperties: financialProperties.filter((p: any) => p.status === 'AVAILABLE').length,
            rentedProperties: financialProperties.filter((p: any) => p.status === 'RENTED').length,
            priceRanges,
            forRentCount: forRentProperties.length,
            forSaleCount: forSaleProperties.length
          }
        };

      case 'engagement':
        let engagementProperties = propertyMetrics?.propertyTableData || [];
        engagementProperties = filterByDate(engagementProperties);

        // Calculate engagement score for each property
        engagementProperties = engagementProperties.map((property: any) => ({
          ...property,
          engagementScore: property.views + (property.favorites * 2) + (property.ratings * 3)
        }));

        // Sort by engagement score
        const topPerforming = [...engagementProperties]
          .sort((a: any, b: any) => b.engagementScore - a.engagementScore)
          .slice(0, 50);

        const totalEngagement = engagementProperties.reduce((sum: number, p: any) => 
          sum + p.engagementScore, 0
        );

        const averageEngagement = engagementProperties.length > 0 
          ? totalEngagement / engagementProperties.length 
          : 0;

        // Group by engagement levels
        const engagementLevels = {
          'Very High': engagementProperties.filter((p: any) => p.engagementScore > 100).length,
          'High': engagementProperties.filter((p: any) => p.engagementScore > 50 && p.engagementScore <= 100).length,
          'Medium': engagementProperties.filter((p: any) => p.engagementScore > 20 && p.engagementScore <= 50).length,
          'Low': engagementProperties.filter((p: any) => p.engagementScore > 0 && p.engagementScore <= 20).length,
          'None': engagementProperties.filter((p: any) => p.engagementScore === 0).length,
        };

        return {
          title: 'User Engagement Report',
          headers: [
            'Rank',
            'Property ID',
            'Title', 
            'Type', 
            'Price', 
            'Location', 
            'Views', 
            'Favorites', 
            'Ratings',
            'Engagement Score', 
            'Days Listed', 
            'Views per Day',
            'Favorites Rate',
            'Performance'
          ],
          rows: topPerforming.map((property: any, index: number) => {
            const daysListed = Math.ceil(
              (new Date().getTime() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24)
            );
            const viewsPerDay = daysListed > 0 ? (property.views / daysListed).toFixed(2) : property.views;
            const favoritesRate = property.views > 0 
              ? ((property.favorites / property.views) * 100).toFixed(1) + '%' 
              : '0%';
            const performance = property.engagementScore > averageEngagement ? 'Above Average' : 'Below Average';
            
            return {
              rank: index + 1,
              propertyid: property.id || 'N/A',
              title: property.title,
              type: property.type,
              price: `₦${property.price?.toLocaleString()}`,
              location: property.location,
              views: property.views,
              favorites: property.favorites,
              ratings: property.ratings,
              engagementscore: property.engagementScore,
              dayslisted: daysListed,
              viewsperday: viewsPerDay,
              favoritesrate: favoritesRate,
              performance: performance
            };
          }),
          summary: {
            total: engagementProperties.length,
            totalProperties: engagementProperties.length,
            totalViews: engagementProperties.reduce((sum: number, p: any) => sum + p.views, 0),
            totalFavorites: engagementProperties.reduce((sum: number, p: any) => sum + p.favorites, 0),
            totalRatings: engagementProperties.reduce((sum: number, p: any) => sum + p.ratings, 0),
            averageEngagement: averageEngagement.toFixed(2),
            topPerformingCount: topPerforming.length,
            engagementLevels,
            highEngagementProperties: engagementProperties.filter((p: any) => p.engagementScore > 50).length,
            zeroEngagementProperties: engagementProperties.filter((p: any) => p.engagementScore === 0).length
          }
        };

      case 'verifications':
        let filteredVerifications = verificationsData?.data || [];
        
        // Apply date filter
        filteredVerifications = filterByDate(filteredVerifications, 'submittedAt');
        
        // Apply status filter
        if (filters.verificationStatus) {
          filteredVerifications = filteredVerifications.filter((v: any) => 
            v.status === filters.verificationStatus
          );
        }
        
        // Apply role filter
        if (filters.role) {
          filteredVerifications = filteredVerifications.filter((v: any) => 
            v.user?.role === filters.role
          );
        }

        const verificationsByStatus = filteredVerifications.reduce((acc: any, verification: any) => {
          acc[verification.status] = (acc[verification.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const verificationsByRole = filteredVerifications.reduce((acc: any, verification: any) => {
          const role = verification.user?.role || 'UNKNOWN';
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Calculate average processing time
        const processedVerifications = filteredVerifications.filter((v: any) => v.reviewedAt);
        const totalProcessingTime = processedVerifications.reduce((sum: number, v: any) => {
          const processingTime = new Date(v.reviewedAt).getTime() - new Date(v.submittedAt).getTime();
          return sum + processingTime;
        }, 0);
        const averageProcessingTime = processedVerifications.length > 0
          ? totalProcessingTime / processedVerifications.length / (1000 * 60 * 60 * 24)
          : 0;

        return {
          title: 'Verification Requests Report',
          headers: [
            'Request ID',
            'User Name', 
            'Email',
            'Phone',
            'Role', 
            'NIN', 
            'Status', 
            'Submitted Date', 
            'Reviewed Date',
            'Processing Days',
            'Status Reason', 
            'Agent License', 
            'Tax ID',
            'Documents'
          ],
          rows: filteredVerifications.map((verification: any) => {
            const processingDays = verification.reviewedAt
              ? Math.ceil((new Date(verification.reviewedAt).getTime() - new Date(verification.submittedAt).getTime()) / (1000 * 60 * 60 * 24))
              : 'Pending';
            
            const documentCount = [
              verification.idCardFrontUrl,
              verification.idCardBackUrl,
              verification.proofOfAddressUrl,
              verification.agentLicenseUrl,
              ...(verification.proofOfOwnershipUrls || [])
            ].filter(Boolean).length;
            
            return {
              requestid: verification.id,
              username: verification.user ? `${verification.user.firstName} ${verification.user.lastName}` : 'N/A',
              email: verification.user?.email || 'N/A',
              phone: verification.user?.phone || 'N/A',
              role: verification.user?.role || 'N/A',
              nin: verification.nin ? `${verification.nin.slice(0, 4)}...${verification.nin.slice(-4)}` : 'N/A',
              status: verification.status,
              submitteddate: new Date(verification.submittedAt).toLocaleDateString(),
              revieweddate: verification.reviewedAt ? new Date(verification.reviewedAt).toLocaleDateString() : 'Pending',
              processingdays: processingDays,
              statusreason: verification.statusReason || 'N/A',
              agentlicense: verification.agentLicenseNumber || 'N/A',
              taxid: verification.taxIdNumber || 'N/A',
              documents: `${documentCount} docs`
            };
          }),
          summary: {
            total: filteredVerifications.length,
            byStatus: verificationsByStatus,
            byRole: verificationsByRole,
            pending: verificationsByStatus.PENDING || 0,
            approved: verificationsByStatus.VERIFIED || 0,
            rejected: verificationsByStatus.REJECTED || 0,
            unverified: verificationsByStatus.UNVERIFIED || 0,
            averageProcessingTime: averageProcessingTime.toFixed(1),
            processedCount: processedVerifications.length,
            approvalRate: filteredVerifications.length > 0
              ? ((verificationsByStatus.VERIFIED || 0) / filteredVerifications.length * 100).toFixed(1)
              : 0
          }
        };

      case 'complaints':
        let filteredComplaints = complaintsData?.data || [];
        
        // Apply date filter
        filteredComplaints = filterByDate(filteredComplaints);
        
        // Apply status filter
        if (filters.status) {
          filteredComplaints = filteredComplaints.filter((c: any) => c.status === filters.status);
        }

        const complaintsByStatus = filteredComplaints.reduce((acc: any, complaint: any) => {
          acc[complaint.status] = (acc[complaint.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const complaintsByProperty = filteredComplaints.reduce((acc: any, complaint: any) => {
          if (complaint.property) {
            acc[complaint.property.title] = (acc[complaint.property.title] || 0) + 1;
          } else {
            acc['General'] = (acc['General'] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        // Calculate resolution metrics
        const resolvedComplaints = filteredComplaints.filter((c: any) => c.resolvedAt);
        const totalResolutionTime = resolvedComplaints.reduce((sum: number, c: any) => {
          const resolutionTime = new Date(c.resolvedAt).getTime() - new Date(c.createdAt).getTime();
          return sum + resolutionTime;
        }, 0);
        const averageResolutionTime = resolvedComplaints.length > 0
          ? totalResolutionTime / resolvedComplaints.length / (1000 * 60 * 60 * 24)
          : 0;

        // Group complaints by category (based on subject keywords)
        const categories = {
          'Maintenance': filteredComplaints.filter((c: any) => 
            c.subject?.toLowerCase().includes('maintenance') || 
            c.subject?.toLowerCase().includes('repair')
          ).length,
          'Payment': filteredComplaints.filter((c: any) => 
            c.subject?.toLowerCase().includes('payment') || 
            c.subject?.toLowerCase().includes('rent')
          ).length,
          'Security': filteredComplaints.filter((c: any) => 
            c.subject?.toLowerCase().includes('security') || 
            c.subject?.toLowerCase().includes('safety')
          ).length,
          'Other': 0
        };
        categories.Other = filteredComplaints.length - categories.Maintenance - categories.Payment - categories.Security;

        return {
          title: 'Complaints Report',
          headers: [
            'Complaint ID',
            'Subject', 
            'Client Name',
            'Client Email',
            'Property', 
            'Status', 
            'Priority',
            'Submitted Date', 
            'Resolved Date',
            'Resolution Days',
            'Resolved By',
            'Resolution Notes', 
            'Images'
          ],
          rows: filteredComplaints.map((complaint: any) => {
            const resolutionDays = complaint.resolvedAt
              ? Math.ceil((new Date(complaint.resolvedAt).getTime() - new Date(complaint.createdAt).getTime()) / (1000 * 60 * 60 * 24))
              : 'Pending';
            
            // Determine priority based on age and status
            let priority = 'Normal';
            if (complaint.status === 'PENDING') {
              const daysOld = Math.ceil((new Date().getTime() - new Date(complaint.createdAt).getTime()) / (1000 * 60 * 60 * 24));
              if (daysOld > 7) priority = 'High';
              else if (daysOld > 3) priority = 'Medium';
            }
            
            return {
              complaintid: complaint.id,
              subject: complaint.subject,
              clientname: complaint.client ? `${complaint.client.firstName} ${complaint.client.lastName}` : 'N/A',
              clientemail: complaint.client?.email || 'N/A',
              property: complaint.property?.title || 'General',
              status: complaint.status,
              priority: priority,
              submitteddate: new Date(complaint.createdAt).toLocaleDateString(),
              resolveddate: complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleDateString() : 'Pending',
              resolutiondays: resolutionDays,
              resolvedby: complaint.resolvedBy || 'N/A',
              resolutionnotes: complaint.resolutionNotes ? 
                (complaint.resolutionNotes.length > 50 
                  ? complaint.resolutionNotes.substring(0, 50) + '...' 
                  : complaint.resolutionNotes) 
                : 'N/A',
              images: complaint.imageUrls?.length || 0
            };
          }),
          summary: {
            total: filteredComplaints.length,
            byStatus: complaintsByStatus,
            categories,
            pending: complaintsByStatus.PENDING || 0,
            inReview: complaintsByStatus.IN_REVIEW || 0,
            resolved: complaintsByStatus.RESOLVED || 0,
            rejected: complaintsByStatus.REJECTED || 0,
            averageResolutionTime: averageResolutionTime.toFixed(1),
            resolvedCount: resolvedComplaints.length,
            resolutionRate: filteredComplaints.length > 0
              ? ((complaintsByStatus.RESOLVED || 0) / filteredComplaints.length * 100).toFixed(1)
              : 0,
            highPriorityCount: filteredComplaints.filter((c: any) => {
              if (c.status !== 'PENDING') return false;
              const daysOld = Math.ceil((new Date().getTime() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24));
              return daysOld > 7;
            }).length
          }
        };

      default:
        return { title: '', headers: [], rows: [], summary: { total: 0 } };
    }
  }, [filters, dashboardData, usersData, propertiesData, complaintsData, verificationsData]);

  const handleFilterChange = (key: keyof ReportFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const exportToCSV = () => {
    setIsGenerating(true);
    
    try {
      const csvHeaders = reportData.headers.join(',');
      const csvRows = reportData.rows.map(row => 
        reportData.headers.map(header => {
          const key = header.toLowerCase().replace(/[^a-z0-9]/g, '');
          const value = row[key] || '';
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      );
      
      const csvContent = [csvHeaders, ...csvRows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${reportData.title.replace(/\s+/g, '_')}_${filters.startDate}_to_${filters.endDate}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };



const exportToPDF = () => {
  setIsGenerating(true);

  try {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text(reportData.title, 14, 20);

    // Subtitle with date range
    doc.setFontSize(11);
    doc.text(`From ${filters.startDate} to ${filters.endDate}`, 14, 28);

    // Table headers and rows
    const headers = [reportData.headers];
    const rows = reportData.rows.map(row =>
      reportData.headers.map(header => {
        const key = header.toLowerCase().replace(/[^a-z0-9]/g, '');
        return row[key] || '';
      })
    );

    // Use autoTable plugin for clean table rendering
    autoTable(doc, { // Use the imported autoTable function
      head: headers,
      body: rows,
      startY: 35,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] }, // teal header
    });

    // Save file
    doc.save(
      `${reportData.title.replace(/\s+/g, '_')}_${filters.startDate}_to_${filters.endDate}.pdf`
    );
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export report. Please try again.");
  } finally {
    setIsGenerating(false);
  }
};

  const printReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="mt-1 text-sm text-gray-500">
                Generate detailed reports and export data for analysis
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportToCSV}
                disabled={isGenerating || reportData.rows.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Exporting...' : 'Export CSV'}
              </button>
              <button
                onClick={exportToPDF}
                disabled={isGenerating || reportData.rows.length === 0}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Exporting...' : 'Export PDF'}
              </button>
              <button
                onClick={printReport}
                disabled={reportData.rows.length === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Print Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Report Filters</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Report Type</label>
                <select
                  value={filters.reportType}
                  onChange={(e) => handleFilterChange('reportType', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="users">User Registrations</option>
                  <option value="properties">Property Listings</option>
                  <option value="financial">Financial Overview</option>
                  <option value="engagement">User Engagement</option>
                  <option value="verifications">Verification Requests</option>
                  <option value="complaints">Complaints</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* User-specific Filters */}
              {filters.reportType === 'users' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      value={filters.role || ''}
                      onChange={(e) => handleFilterChange('role', e.target.value || undefined)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Roles</option>
                      <option value="CLIENT">Client</option>
                      <option value="LANDLORD">Landlord</option>
                      <option value="AGENT">Agent</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification Status</label>
                    <select
                      value={filters.verificationStatus || ''}
                      onChange={(e) => handleFilterChange('verificationStatus', e.target.value || undefined)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Statuses</option>
                      <option value="UNVERIFIED">Unverified</option>
                      <option value="PENDING">Pending</option>
                      <option value="VERIFIED">Verified</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Verified</label>
                    <select
                      value={filters.isEmailVerified === undefined ? '' : filters.isEmailVerified.toString()}
                      onChange={(e) => handleFilterChange('isEmailVerified', 
                        e.target.value === '' ? undefined : e.target.value === 'true'
                      )}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Users</option>
                      <option value="true">Verified Only</option>
                      <option value="false">Unverified Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Has Properties</label>
                    <select
                      value={filters.hasProperties === undefined ? '' : filters.hasProperties.toString()}
                      onChange={(e) => handleFilterChange('hasProperties', 
                        e.target.value === '' ? undefined : e.target.value === 'true'
                      )}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Users</option>
                      <option value="true">With Properties</option>
                      <option value="false">Without Properties</option>
                    </select>
                  </div>
                </>
              )}

              {/* Property-specific Filters */}
              {(filters.reportType === 'properties' || filters.reportType === 'engagement') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Type</label>
                    <select
                      value={filters.propertyType || ''}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Types</option>
                      <option value="HOUSE">House</option>
                      <option value="APARTMENT">Apartment</option>
                      <option value="SHOP">Shop</option>
                      <option value="OFFICE">Office</option>
                      <option value="LAND">Land</option>
                      <option value="WAREHOUSE">Warehouse</option>
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="INDUSTRIAL">Industrial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Status</label>
                    <select
                      value={filters.status || ''}
                      onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Statuses</option>
                      <option value="AVAILABLE">Available</option>
                      <option value="RENTED">Rented</option>
                      <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                      <option value="UNAVAILABLE">Unavailable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Listing Type</label>
                    <select
                      value={filters.listingType || ''}
                      onChange={(e) => handleFilterChange('listingType', e.target.value || undefined)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Types</option>
                      <option value="FOR_RENT">For Rent</option>
                      <option value="FOR_SALE">For Sale</option>
                    </select>
                  </div>
                </>
              )}

              {/* Verification-specific Filters */}
              {filters.reportType === 'verifications' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Verification Status</label>
                  <select
                    value={filters.verificationStatus || ''}
                    onChange={(e) => handleFilterChange('verificationStatus', e.target.value || undefined)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="VERIFIED">Verified</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              )}

              {/* Complaint-specific Filters */}
              {filters.reportType === 'complaints' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Complaint Status</label>
                  <select
                    value={filters.status || ''}
                    onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              )}
            </div>

            {/* Price Range for Financial Report */}
            {(filters.reportType === 'financial' || filters.reportType === 'properties') && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Price</label>
                  <input
                    type="number"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Maximum Price</label>
                  <input
                    type="number"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="100000000"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        {reportData.summary.total > 0 && (
          <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Dynamic summary cards based on report type */}
            {filters.reportType === 'users' && (
              <>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">👥</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                          <dd className="text-lg font-semibold text-gray-900">{reportData.summary.total}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✅</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Verified Users</dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            {reportData.summary.byVerification?.VERIFIED || 0}
                            <span className="text-sm text-gray-500 ml-1">
                              ({reportData.summary.verificationRate}%)
                            </span>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">🏠</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Property Owners</dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            {reportData.summary.withProperties}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">🔥</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Active (7 days)</dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            {reportData.summary.activeInLast7Days}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {filters.reportType === 'properties' && (
              <>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">🏢</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Properties</dt>
                          <dd className="text-lg font-semibold text-gray-900">{reportData.summary.total}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">💰</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            ₦{reportData.summary.totalValue?.toLocaleString()}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">👀</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                          <dd className="text-lg font-semibold text-gray-900">{reportData.summary.totalViews}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✅</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Available</dt>
                          <dd className="text-lg font-semibold text-gray-900">{reportData.summary.availableCount}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {filters.reportType === 'financial' && (
              <>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">💰</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Portfolio Value</dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            ₦{reportData.summary.totalPortfolioValue?.toLocaleString()}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">🏠</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Available</dt>
                          <dd className="text-lg font-semibold text-gray-900">{reportData.summary.availableProperties}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">📈</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Monthly Income</dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            ₦{reportData.summary.monthlyRentalIncome?.toLocaleString()}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">🔑</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Rented</dt>
                          <dd className="text-lg font-semibold text-gray-900">{reportData.summary.rentedProperties}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Role Distribution for Users */}
        {reportData.summary.total > 0 && filters.reportType === 'users' && reportData.summary.byRole && (
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">User Distribution</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(reportData.summary.byRole).map(([role, count]) => (
                  <div key={role} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{count as number}</div>
                    <div className="text-sm text-gray-500 capitalize">{role.toLowerCase()}</div>
                    <div className="text-xs text-gray-400">
                      {((count as number / reportData.summary.total) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Report Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {reportData.title} ({filters.startDate} to {filters.endDate})
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Showing {reportData.rows.length} records
            </p>
          </div>

          {reportData.rows.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
              <p className="text-gray-500">Try adjusting your filters or select a different date range.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {reportData.headers.map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {reportData.headers.map((header, cellIndex) => {
                        const key = header.toLowerCase().replace(/[^a-z0-9]/g, '');
                        return (
                          <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row[key]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detailed Summary */}
        {reportData.summary.total > 0 && (
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Report Summary</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Summary statistics */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Key Metrics</h4>
                  <dl className="space-y-3">
                    {Object.entries(reportData.summary).map(([key, value]) => {
                      if (typeof value === 'number' && key !== 'total') {
                        return (
                          <div key={key} className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {key.includes('Price') || key.includes('Value') || key.includes('Income') 
                                ? `₦${value.toLocaleString()}` 
                                : key.includes('Rate') || key.includes('Percentage')
                                  ? `${value}%`
                                  : value}
                            </dd>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </dl>
                </div>

                {/* Distribution data */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Distribution</h4>
                  <dl className="space-y-3">
                    {Object.entries(reportData.summary).map(([key, value]) => {
                      if (typeof value === 'object' && value !== null) {
                        return (
                          <div key={key} className="space-y-2">
                            <dt className="text-sm font-semibold text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </dt>
                            <dd className="ml-4 space-y-1">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <div key={subKey} className="flex justify-between text-sm">
                                  <span className="text-gray-500">{subKey}</span>
                                  <span className="text-gray-900">{subValue as string}</span>
                                </div>
                              ))}
                            </dd>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .bg-gray-50 { background: white !important; }
          .shadow { box-shadow: none !important; }
          .rounded-lg { border-radius: 0 !important; }
          .px-4, .px-6 { padding-left: 0 !important; padding-right: 0 !important; }
          .py-8, .py-6, .py-4 { padding-top: 0 !important; padding-bottom: 0 !important; }
          .mb-6 { margin-bottom: 0 !important; }
          .mt-6 { margin-top: 0 !important; }
          .flex { display: block !important; }
          .hidden { display: none !important; }
          .overflow-x-auto { overflow: visible !important; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 4px; font-size: 10px; }
          button { display: none !important; }
          select, input { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ReportPage;