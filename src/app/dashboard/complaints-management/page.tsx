// // components/admin/ComplaintsManagement.tsx
// 'use client';

// import React, { useState, useMemo } from 'react';
// import { useAllComplaints, useUpdateComplaint } from '@/hooks/useAdmin';



// export enum ComplaintStatus {
//   PENDING = "PENDING",
//   IN_REVIEW = "IN_REVIEW",
//   RESOLVED = "RESOLVED",
//   REJECTED = "REJECTED",
// }

// interface ComplaintFilters {
//   status?: ComplaintStatus;
//   search?: string;
//   dateFrom?: string;
//   dateTo?: string;
// }

// const ComplaintsManagement: React.FC = () => {
//   const [filters, setFilters] = useState<ComplaintFilters>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
//   const [resolutionNotes, setResolutionNotes] = useState('');

//   const itemsPerPage = 10;

//   const { data: complaintsData, isLoading, error, refetch } = useAllComplaints({
//     page: currentPage,
//     limit: itemsPerPage,
//     ...filters
//   });

//   const updateComplaintMutation = useUpdateComplaint();

//   // Handle filter changes
//   const handleFilterChange = (key: keyof ComplaintFilters, value: string) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value || undefined
//     }));
//     setCurrentPage(1);
//   };

//   // Handle search
//   const handleSearch = (searchTerm: string) => {
//     handleFilterChange('search', searchTerm);
//   };

//   // View complaint details
//   const handleViewComplaint = (complaint: any) => {
//     setSelectedComplaint(complaint);
//     setIsDetailModalOpen(true);
//   };

//   // Start resolution process
//   const handleStartResolution = (complaint: any) => {
//     setSelectedComplaint(complaint);
//     setResolutionNotes(complaint.resolutionNotes || '');
//     setIsResolutionModalOpen(true);
//   };

//   // Update complaint status
//   const handleUpdateStatus = async (complaintId: string, status: ComplaintStatus, notes?: string) => {
//     try {
//       await updateComplaintMutation.mutateAsync({
//         id: complaintId,
//         data: {
//           status,
//           ...(notes && { resolutionNotes: notes }),
//           ...(status === 'RESOLVED' && { resolvedAt: new Date().toISOString() })
//         }
//       });
//       refetch();
//     } catch (error) {
//       console.error('Failed to update complaint:', error);
//     }
//   };

//   // Submit resolution
//   const handleSubmitResolution = async () => {
//     if (!selectedComplaint) return;

//     try {
//       await updateComplaintMutation.mutateAsync({
//         id: selectedComplaint.id,
//         data: {
//           status: 'RESOLVED',
//           resolutionNotes,
//           resolvedAt: new Date().toISOString()
//         }
//       });
//       setIsResolutionModalOpen(false);
//       setSelectedComplaint(null);
//       setResolutionNotes('');
//       refetch();
//     } catch (error) {
//       console.error('Failed to resolve complaint:', error);
//     }
//   };

//   // Quick status update
//   const handleQuickStatusUpdate = async (complaintId: string, status: ComplaintStatus) => {
//     try {
//       await updateComplaintMutation.mutateAsync({
//         id: complaintId,
//         data: { status }
//       });
//       refetch();
//     } catch (error) {
//       console.error('Failed to update complaint status:', error);
//     }
//   };

//   // Status badge component
//   const getStatusBadge = (status: ComplaintStatus) => {
//     const statusConfig = {
//       PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
//       IN_REVIEW: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'In Review' },
//       RESOLVED: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Resolved' },
//       REJECTED: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' }
//     };
    
//     const config = statusConfig[status];
//     return (
//       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
//         {config.label}
//       </span>
//     );
//   };

//   // Priority indicator based on complaint age
//   const getPriorityIndicator = (createdAt: string) => {
//     const created = new Date(createdAt);
//     const now = new Date();
//     const daysOld = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    
//     if (daysOld > 7) return { color: 'bg-red-500', tooltip: 'High priority - Over 7 days old' };
//     if (daysOld > 3) return { color: 'bg-orange-500', tooltip: 'Medium priority - Over 3 days old' };
//     return { color: 'bg-green-500', tooltip: 'Low priority - Recent' };
//   };

//   // Statistics
//   const stats = useMemo(() => {
//     if (!complaintsData?.data) return null;

//     const complaints = complaintsData.data;
//     const total = complaints.length;
//     const pending = complaints.filter((c:any) => c.status === 'PENDING').length;
//     const inReview = complaints.filter((c:any) => c.status === 'IN_REVIEW').length;
//     const resolved = complaints.filter((c:any) => c.status === 'RESOLVED').length;
//     const rejected = complaints.filter((c:any) => c.status === 'REJECTED').length;

//     return {
//       total,
//       pending,
//       inReview,
//       resolved,
//       rejected,
//       resolutionRate: total > 0 ? ((resolved + rejected) / total * 100).toFixed(1) : '0'
//     };
//   }, [complaintsData]);

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <h3 className="text-sm font-medium text-red-800">
//               Error loading complaints
//             </h3>
//             <div className="mt-2 text-sm text-red-700">
//               <p>Failed to load complaint data. Please try again.</p>
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={() => refetch()}
//                 className="bg-red-100 text-red-800 px-3 py-2 rounded text-sm font-medium hover:bg-red-200"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="sm:flex sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
//             Complaints & Dispute Resolution
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage and resolve customer complaints and disputes efficiently.
//           </p>
//         </div>
//         <div className="mt-4 sm:mt-0">
//           <div className="text-sm text-gray-500">
//             Total Complaints: {complaintsData?.pagination?.total || 0}
//           </div>
//         </div>
//       </div>

//       {/* Statistics */}
//       {stats && (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">📋</span>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Total</dt>
//                     <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">⏳</span>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
//                     <dd className="text-lg font-medium text-gray-900">{stats.pending}</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">🔍</span>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">In Review</dt>
//                     <dd className="text-lg font-medium text-gray-900">{stats.inReview}</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">✅</span>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Resolved</dt>
//                     <dd className="text-lg font-medium text-gray-900">{stats.resolved}</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">📈</span>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Resolution Rate</dt>
//                     <dd className="text-lg font-medium text-gray-900">{stats.resolutionRate}%</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
//             {/* Search */}
//             <div>
//               <label htmlFor="search" className="block text-sm font-medium text-gray-700">
//                 Search
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="search"
//                   id="search"
//                   placeholder="Search by subject, client, or property..."
//                   className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Status Filter */}
//             <div>
//               <label htmlFor="status" className="block text-sm font-medium text-gray-700">
//                 Status
//               </label>
//               <select
//                 id="status"
//                 name="status"
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                 onChange={(e) => handleFilterChange('status', e.target.value)}
//                 value={filters.status || ''}
//               >
//                 <option value="">All Status</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="IN_REVIEW">In Review</option>
//                 <option value="RESOLVED">Resolved</option>
//                 <option value="REJECTED">Rejected</option>
//               </select>
//             </div>

//             {/* Date From */}
//             <div>
//               <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 id="dateFrom"
//                 name="dateFrom"
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
//                 value={filters.dateFrom || ''}
//               />
//             </div>

//             {/* Date To */}
//             <div>
//               <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 id="dateTo"
//                 name="dateTo"
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 onChange={(e) => handleFilterChange('dateTo', e.target.value)}
//                 value={filters.dateTo || ''}
//               />
//             </div>
//           </div>

//           {/* Reset Filters */}
//           <div className="mt-4 flex justify-end">
//             <button
//               onClick={() => setFilters({})}
//               className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Complaints Table */}
//       <div className="bg-white shadow overflow-hidden sm:rounded-md">
//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <>
//             <ul className="divide-y divide-gray-200">
//               {complaintsData?.data?.map((complaint: any) => {
//                 const priority = getPriorityIndicator(complaint.createdAt);
//                 const daysOld = Math.floor((new Date().getTime() - new Date(complaint.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                
//                 return (
//                   <li key={complaint.id} className="hover:bg-gray-50 transition-colors duration-150">
//                     <div className="px-4 py-4 sm:px-6">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center flex-1 min-w-0">
//                           {/* Priority Indicator */}
//                           <div 
//                             className={`w-2 h-12 rounded-l ${priority.color} mr-4`}
//                             title={priority.tooltip}
//                           />

//                           {/* Complaint Details */}
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center">
//                               <h4 className="text-sm font-medium text-gray-900 truncate">
//                                 {complaint.subject}
//                               </h4>
//                               <div className="ml-2 flex-shrink-0">
//                                 {getStatusBadge(complaint.status)}
//                               </div>
//                             </div>
                            
//                             <div className="mt-1 text-sm text-gray-500">
//                               <div className="flex flex-wrap gap-4">
//                                 <span>
//                                   <strong>Client:</strong> {complaint.client?.firstName} {complaint.client?.lastName}
//                                 </span>
//                                 <span>
//                                   <strong>Property:</strong> {complaint.property?.title || 'N/A'}
//                                 </span>
//                                 <span>
//                                   <strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleDateString()} ({daysOld} days ago)
//                                 </span>
//                                 {complaint.resolvedAt && (
//                                   <span>
//                                     <strong>Resolved:</strong> {new Date(complaint.resolvedAt).toLocaleDateString()}
//                                   </span>
//                                 )}
//                               </div>
                              
//                               {complaint.description && (
//                                 <p className="mt-2 text-gray-600 line-clamp-2">
//                                   {complaint.description}
//                                 </p>
//                               )}
//                             </div>

//                             {/* Image Previews */}
//                             {complaint.imageUrls && complaint.imageUrls.length > 0 && (
//                               <div className="mt-2 flex space-x-2">
//                                 {complaint.imageUrls.slice(0, 3).map((url: string, index: number) => (
//                                   <div key={index} className="w-12 h-12 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
//                                     <span className="text-xs text-gray-500">Img {index + 1}</span>
//                                   </div>
//                                 ))}
//                                 {complaint.imageUrls.length > 3 && (
//                                   <div className="w-12 h-12 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
//                                     <span className="text-xs text-gray-500">+{complaint.imageUrls.length - 3}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="ml-4 flex-shrink-0 flex space-x-2">
//                           <button
//                             onClick={() => handleViewComplaint(complaint)}
//                             className="text-blue-600 hover:text-blue-900 text-sm font-medium"
//                           >
//                             View
//                           </button>
                          
//                           {complaint.status !== 'RESOLVED' && complaint.status !== 'REJECTED' && (
//                             <>
//                               <button
//                                 onClick={() => handleStartResolution(complaint)}
//                                 className="text-green-600 hover:text-green-900 text-sm font-medium"
//                               >
//                                 Resolve
//                               </button>
                              
//                               {/* Quick Status Updates */}
//                               <div className="relative group">
//                                 <button className="text-gray-400 hover:text-gray-600 text-sm font-medium">
//                                   ⋮
//                                 </button>
//                                 <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
//                                   <div className="py-1">
//                                     {complaint.status === 'PENDING' && (
//                                       <button
//                                         onClick={() => handleQuickStatusUpdate(complaint.id, ComplaintStatus.IN_REVIEW)}
//                                         className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
//                                       >
//                                         Mark as In Review
//                                       </button>
//                                     )}
//                                     {complaint.status === 'IN_REVIEW' && (
//                                       <button
//                                         onClick={() => handleQuickStatusUpdate(complaint.id, ComplaintStatus.PENDING)}
//                                         className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
//                                       >
//                                         Return to Pending
//                                       </button>
//                                     )}
//                                     <button
//                                       onClick={() => handleQuickStatusUpdate(complaint.id, ComplaintStatus.REJECTED)}
//                                       className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                                     >
//                                       Reject Complaint
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>

//             {/* Pagination */}
//             {complaintsData?.pagination && complaintsData.pagination.totalPages > 1 && (
//               <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                 <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Showing{' '}
//                       <span className="font-medium">
//                         {(complaintsData.pagination.page - 1) * itemsPerPage + 1}
//                       </span>{' '}
//                       to{' '}
//                       <span className="font-medium">
//                         {Math.min(complaintsData.pagination.page * itemsPerPage, complaintsData.pagination.total)}
//                       </span>{' '}
//                       of <span className="font-medium">{complaintsData.pagination.total}</span> complaints
//                     </p>
//                   </div>
//                   <div>
//                     <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                       <button
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                       >
//                         Previous
//                       </button>
//                       {Array.from({ length: complaintsData.pagination.totalPages }, (_, i) => i + 1).map(page => (
//                         <button
//                           key={page}
//                           onClick={() => setCurrentPage(page)}
//                           className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                             currentPage === page
//                               ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                               : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       ))}
//                       <button
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, complaintsData.pagination.totalPages))}
//                         disabled={currentPage === complaintsData.pagination.totalPages}
//                         className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                       >
//                         Next
//                       </button>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Complaint Detail Modal */}
//       {isDetailModalOpen && selectedComplaint && (
//         <ComplaintDetailModal
//           complaint={selectedComplaint}
//           onClose={() => {
//             setIsDetailModalOpen(false);
//             setSelectedComplaint(null);
//           }}
//           onStartResolution={() => {
//             setIsDetailModalOpen(false);
//             handleStartResolution(selectedComplaint);
//           }}
//           onStatusUpdate={handleQuickStatusUpdate}
//         />
//       )}

//       {/* Resolution Modal */}
//       {isResolutionModalOpen && selectedComplaint && (
//         <ResolutionModal
//           complaint={selectedComplaint}
//           resolutionNotes={resolutionNotes}
//           onResolutionNotesChange={setResolutionNotes}
//           onSubmit={handleSubmitResolution}
//           onClose={() => {
//             setIsResolutionModalOpen(false);
//             setSelectedComplaint(null);
//             setResolutionNotes('');
//           }}
//           isLoading={updateComplaintMutation.isPending}
//         />
//       )}
//     </div>
//   );
// };

// // Complaint Detail Modal Component
// const ComplaintDetailModal: React.FC<{
//   complaint: any;
//   onClose: () => void;
//   onStartResolution: () => void;
//   onStatusUpdate: (id: string, status: ComplaintStatus) => void;
// }> = ({ complaint, onClose, onStartResolution, onStatusUpdate }) => {
//   const daysOld = Math.floor((new Date().getTime() - new Date(complaint.createdAt).getTime()) / (1000 * 60 * 60 * 24));

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
//         <div className="mt-3">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">{complaint.subject}</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 Submitted {new Date(complaint.createdAt).toLocaleDateString()} ({daysOld} days ago)
//               </p>
//             </div>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
//             {/* Client Information */}
//             <div>
//               <h4 className="text-sm font-medium text-gray-900 mb-2">Client Information</h4>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p><strong>Name:</strong> {complaint.client?.firstName} {complaint.client?.lastName}</p>
//                 <p><strong>Email:</strong> {complaint.client?.email}</p>
//                 <p><strong>Phone:</strong> {complaint.client?.phone}</p>
//               </div>
//             </div>

//             {/* Property Information */}
//             <div>
//               <h4 className="text-sm font-medium text-gray-900 mb-2">Property Information</h4>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 {complaint.property ? (
//                   <>
//                     <p><strong>Title:</strong> {complaint.property.title}</p>
//                     <p><strong>Type:</strong> {complaint.property.type}</p>
//                     <p><strong>Location:</strong> {complaint.property.city}, {complaint.property.state}</p>
//                   </>
//                 ) : (
//                   <p className="text-gray-500">No property associated</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Complaint Description */}
//           <div className="mt-6">
//             <h4 className="text-sm font-medium text-gray-900 mb-2">Complaint Details</h4>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
//             </div>
//           </div>

//           {/* Attached Images */}
//           {complaint.imageUrls && complaint.imageUrls.length > 0 && (
//             <div className="mt-6">
//               <h4 className="text-sm font-medium text-gray-900 mb-2">Attached Images ({complaint.imageUrls.length})</h4>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                 {complaint.imageUrls.map((url: string, index: number) => (
//                   <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
//                     <div className="bg-gray-200 h-32 flex items-center justify-center">
//                       <span className="text-sm text-gray-500">Image {index + 1}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Resolution History */}
//           {(complaint.resolutionNotes || complaint.resolvedAt) && (
//             <div className="mt-6">
//               <h4 className="text-sm font-medium text-gray-900 mb-2">Resolution Details</h4>
//               <div className="bg-green-50 rounded-lg p-4">
//                 {complaint.resolvedAt && (
//                   <p><strong>Resolved On:</strong> {new Date(complaint.resolvedAt).toLocaleDateString()}</p>
//                 )}
//                 {complaint.resolutionNotes && (
//                   <>
//                     <p className="mt-2"><strong>Resolution Notes:</strong></p>
//                     <p className="text-gray-700 whitespace-pre-wrap">{complaint.resolutionNotes}</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="mt-6 flex justify-end space-x-3">
//             {complaint.status !== 'RESOLVED' && complaint.status !== 'REJECTED' && (
//               <>
//                 <button
//                   onClick={() => onStatusUpdate(complaint.id, ComplaintStatus.REJECTED)}
//                   className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   Reject Complaint
//                 </button>
//                 <button
//                   onClick={onStartResolution}
//                   className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                 >
//                   Mark as Resolved
//                 </button>
//               </>
//             )}
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Resolution Modal Component
// const ResolutionModal: React.FC<{
//   complaint: any;
//   resolutionNotes: string;
//   onResolutionNotesChange: (notes: string) => void;
//   onSubmit: () => void;
//   onClose: () => void;
//   isLoading: boolean;
// }> = ({ complaint, resolutionNotes, onResolutionNotesChange, onSubmit, onClose, isLoading }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
//         <div className="mt-3">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Resolve Complaint</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 {complaint.subject}
//               </p>
//             </div>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="mt-6">
//             <label htmlFor="resolutionNotes" className="block text-sm font-medium text-gray-700">
//               Resolution Notes
//             </label>
//             <textarea
//               id="resolutionNotes"
//               rows={6}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Describe how the complaint was resolved, steps taken, and any follow-up actions..."
//               value={resolutionNotes}
//               onChange={(e) => onResolutionNotesChange(e.target.value)}
//             />
//             <p className="mt-2 text-sm text-gray-500">
//               These notes will be visible to the client and stored for future reference.
//             </p>
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               onClick={onClose}
//               disabled={isLoading}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onSubmit}
//               disabled={isLoading || !resolutionNotes.trim()}
//               className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
//             >
//               {isLoading ? 'Resolving...' : 'Mark as Resolved'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplaintsManagement;

"use client"

import type React from "react"
import { useState } from "react"
import { useAllComplaints, useUpdateComplaint } from "@/hooks/useAdmin"
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Eye,
  CheckCheck,
  MoreVertical,
} from "lucide-react"

export enum ComplaintStatus {
  PENDING = "PENDING",
  IN_REVIEW = "IN_REVIEW",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

interface ComplaintFilters {
  status?: ComplaintStatus
  search?: string
  dateFrom?: string
  dateTo?: string
}

const ComplaintsManagement: React.FC = () => {
  const [filters, setFilters] = useState<ComplaintFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false)
  const [resolutionNotes, setResolutionNotes] = useState("")
  const [stats, setStats] = useState<any>(null) // Declare stats variable

  const itemsPerPage = 10

  const {
    data: complaintsData,
    isLoading,
    error,
    refetch,
  } = useAllComplaints({
    page: currentPage,
    limit: itemsPerPage,
    ...filters,
  })

  const updateComplaintMutation = useUpdateComplaint()

  const getStatusBadge = (status: ComplaintStatus) => {
    const statusConfig = {
      PENDING: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: Clock,
        label: "Pending",
      },
      IN_REVIEW: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: FileText,
        label: "In Review",
      },
      RESOLVED: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: CheckCircle2,
        label: "Resolved",
      },
      REJECTED: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: AlertCircle,
        label: "Rejected",
      },
    }

    const config = statusConfig[status]
    const IconComponent = config.icon

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
      >
        <IconComponent className="w-3.5 h-3.5" />
        {config.label}
      </span>
    )
  }

  // Declare handleSearch function
  const handleSearch = (searchTerm: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: searchTerm }))
  }

  // Declare handleFilterChange function
  const handleFilterChange = (filterKey: keyof ComplaintFilters, filterValue: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: filterValue }))
  }

  // Declare getPriorityIndicator function
  const getPriorityIndicator = (createdAt: string) => {
    const daysOld = Math.floor((new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24))
    if (daysOld < 7) {
      return { color: "bg-green-50", tooltip: "Less than a week old" }
    } else if (daysOld < 30) {
      return { color: "bg-yellow-50", tooltip: "Less than a month old" }
    } else {
      return { color: "bg-red-50", tooltip: "More than a month old" }
    }
  }

  // Declare handleViewComplaint function
  const handleViewComplaint = (complaint: any) => {
    setSelectedComplaint(complaint)
    setIsDetailModalOpen(true)
  }

  // Declare handleStartResolution function
  const handleStartResolution = (complaint: any) => {
    setSelectedComplaint(complaint)
    setIsResolutionModalOpen(true)
  }

  // Declare handleQuickStatusUpdate function
  const handleQuickStatusUpdate = (id: string, status: ComplaintStatus) => {
    updateComplaintMutation.mutate({ id, data: { status } })
  }

  // Declare handleSubmitResolution function
  const handleSubmitResolution = () => {
    updateComplaintMutation.mutate({ id: selectedComplaint.id, data: { status: ComplaintStatus.RESOLVED, resolutionNotes } })
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900">Error loading complaints</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Failed to load complaint data. Please try again.</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => refetch()}
                className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Complaints & Disputes</h1>
          <p className="mt-2 text-base text-gray-600">Manage and resolve customer complaints efficiently</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-sm font-semibold text-gray-700">
            Total: <span className="text-indigo-600">{complaintsData?.pagination?.total || 0}</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total" value={stats.total} icon={FileText} color="indigo" />
          <StatCard label="Pending" value={stats.pending} icon={Clock} color="amber" />
          <StatCard label="In Review" value={stats.inReview} icon={AlertTriangle} color="blue" />
          <StatCard label="Resolved" value={stats.resolved} icon={CheckCircle2} color="emerald" />
          <StatCard label="Resolution Rate" value={`${stats.resolutionRate}%`} icon={CheckCheck} color="purple" />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search complaints..."
                  className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                onChange={(e) => handleFilterChange("status", e.target.value)}
                value={filters.status || ""}
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label htmlFor="dateFrom" className="block text-sm font-semibold text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                value={filters.dateFrom || ""}
              />
            </div>

            {/* Date To */}
            <div>
              <label htmlFor="dateTo" className="block text-sm font-semibold text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                id="dateTo"
                name="dateTo"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                value={filters.dateTo || ""}
              />
            </div>
          </div>

          {/* Reset Filters */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setFilters({})}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-indigo-200 border-t-indigo-600"></div>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {complaintsData?.data?.map((complaint: any) => {
                const priority = getPriorityIndicator(complaint.createdAt)
                const daysOld = Math.floor(
                  (new Date().getTime() - new Date(complaint.createdAt).getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <li key={complaint.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <div className="px-6 py-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center flex-1 min-w-0 gap-4">
                          <div
                            className={`w-1.5 h-16 rounded-full flex-shrink-0 ${priority.color}`}
                            title={priority.tooltip}
                          />

                          {/* Complaint Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-sm font-semibold text-gray-900 truncate">{complaint.subject}</h4>
                              {getStatusBadge(complaint.status)}
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex flex-wrap gap-4">
                                <span>
                                  <strong className="text-gray-700">Client:</strong> {complaint.client?.firstName}{" "}
                                  {complaint.client?.lastName}
                                </span>
                                <span>
                                  <strong className="text-gray-700">Property:</strong>{" "}
                                  {complaint.property?.title || "N/A"}
                                </span>
                                <span>
                                  <strong className="text-gray-700">Submitted:</strong>{" "}
                                  {new Date(complaint.createdAt).toLocaleDateString()} ({daysOld}d ago)
                                </span>
                              </div>

                              {complaint.description && (
                                <p className="text-gray-600 line-clamp-1 mt-2">{complaint.description}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="ml-4 flex-shrink-0 flex gap-2">
                          <button
                            onClick={() => handleViewComplaint(complaint)}
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>

                          {complaint.status !== "RESOLVED" && complaint.status !== "REJECTED" && (
                            <>
                              <button
                                onClick={() => handleStartResolution(complaint)}
                                className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Resolve complaint"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                              </button>

                              {/* Quick Status Updates */}
                              <div className="relative group">
                                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                  <MoreVertical className="w-5 h-5" />
                                </button>
                                <div className="absolute right-0 mt-1 w-48 rounded-lg shadow-lg bg-white border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                  <div className="py-1">
                                    {complaint.status === "PENDING" && (
                                      <button
                                        onClick={() => handleQuickStatusUpdate(complaint.id, ComplaintStatus.IN_REVIEW)}
                                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                      >
                                        Mark as In Review
                                      </button>
                                    )}
                                    {complaint.status === "IN_REVIEW" && (
                                      <button
                                        onClick={() => handleQuickStatusUpdate(complaint.id, ComplaintStatus.PENDING)}
                                        className="block w-full text-left px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 transition-colors"
                                      >
                                        Return to Pending
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleQuickStatusUpdate(complaint.id, ComplaintStatus.REJECTED)}
                                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                      Reject Complaint
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Pagination */}
            {complaintsData?.pagination && complaintsData.pagination.totalPages > 1 && (
              <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="hidden sm:flex sm:items-center sm:justify-between flex-1">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-semibold text-gray-900">
                        {(complaintsData.pagination.page - 1) * itemsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-semibold text-gray-900">
                        {Math.min(complaintsData.pagination.page * itemsPerPage, complaintsData.pagination.total)}
                      </span>{" "}
                      of <span className="font-semibold text-gray-900">{complaintsData.pagination.total}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      {Array.from({ length: complaintsData.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            currentPage === page
                              ? "bg-indigo-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(prev + 1, complaintsData.pagination.totalPages))
                        }
                        disabled={currentPage === complaintsData.pagination.totalPages}
                        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Complaint Detail Modal */}
      {isDetailModalOpen && selectedComplaint && (
        <ComplaintDetailModal
          complaint={selectedComplaint}
          onClose={() => {
            setIsDetailModalOpen(false)
            setSelectedComplaint(null)
          }}
          onStartResolution={() => {
            setIsDetailModalOpen(false)
            handleStartResolution(selectedComplaint)
          }}
          onStatusUpdate={handleQuickStatusUpdate}
        />
      )}

      {/* Resolution Modal */}
      {isResolutionModalOpen && selectedComplaint && (
        <ResolutionModal
          complaint={selectedComplaint}
          resolutionNotes={resolutionNotes}
          onResolutionNotesChange={setResolutionNotes}
          onSubmit={handleSubmitResolution}
          onClose={() => {
            setIsResolutionModalOpen(false)
            setSelectedComplaint(null)
            setResolutionNotes("")
          }}
          isLoading={updateComplaintMutation.isPending}
        />
      )}
    </div>
  )
}

const StatCard: React.FC<{
  label: string
  value: string | number
  icon: React.ComponentType<{ className: string }>
  color: "indigo" | "amber" | "blue" | "emerald" | "purple"
}> = ({ label, value, icon: Icon, color }) => {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg border ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

// Complaint Detail Modal Component
const ComplaintDetailModal: React.FC<{
  complaint: any
  onClose: () => void
  onStartResolution: () => void
  onStatusUpdate: (id: string, status: ComplaintStatus) => void
}> = ({ complaint, onClose, onStartResolution, onStatusUpdate }) => {
  const daysOld = Math.floor((new Date().getTime() - new Date(complaint.createdAt).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{complaint.subject}</h3>
              <p className="mt-1 text-sm text-gray-600">
                Submitted {new Date(complaint.createdAt).toLocaleDateString()} ({daysOld} days ago)
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
            {/* Client Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Client Information</h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm">
                  <strong className="text-gray-700">Name:</strong> {complaint.client?.firstName}{" "}
                  {complaint.client?.lastName}
                </p>
                <p className="text-sm mt-2">
                  <strong className="text-gray-700">Email:</strong> {complaint.client?.email}
                </p>
                <p className="text-sm mt-2">
                  <strong className="text-gray-700">Phone:</strong> {complaint.client?.phone}
                </p>
              </div>
            </div>

            {/* Property Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Property Information</h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                {complaint.property ? (
                  <>
                    <p className="text-sm">
                      <strong className="text-gray-700">Title:</strong> {complaint.property.title}
                    </p>
                    <p className="text-sm mt-2">
                      <strong className="text-gray-700">Type:</strong> {complaint.property.type}
                    </p>
                    <p className="text-sm mt-2">
                      <strong className="text-gray-700">Location:</strong> {complaint.property.city},{" "}
                      {complaint.property.state}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No property associated</p>
                )}
              </div>
            </div>
          </div>

          {/* Complaint Description */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Complaint Details</h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
            </div>
          </div>

          {/* Attached Images */}
          {complaint.imageUrls && complaint.imageUrls.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Attached Images ({complaint.imageUrls.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {complaint.imageUrls.map((url: string, index: number) => (
                  <div key={index} className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                    <div className="bg-gray-200 h-32 flex items-center justify-center">
                      <span className="text-sm text-gray-500">Image {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolution History */}
          {(complaint.resolutionNotes || complaint.resolvedAt) && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Resolution Details</h4>
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                {complaint.resolvedAt && (
                  <p className="text-sm">
                    <strong className="text-emerald-900">Resolved On:</strong>{" "}
                    {new Date(complaint.resolvedAt).toLocaleDateString()}
                  </p>
                )}
                {complaint.resolutionNotes && (
                  <>
                    <p className="mt-2 text-sm">
                      <strong className="text-emerald-900">Resolution Notes:</strong>
                    </p>
                    <p className="text-sm text-emerald-800 whitespace-pre-wrap mt-1">{complaint.resolutionNotes}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            {complaint.status !== "RESOLVED" && complaint.status !== "REJECTED" && (
              <>
                <button
                  onClick={() => onStatusUpdate(complaint.id, ComplaintStatus.REJECTED)}
                  className="px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={onStartResolution}
                  className="px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Mark as Resolved
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Resolution Modal Component
const ResolutionModal: React.FC<{
  complaint: any
  resolutionNotes: string
  onResolutionNotesChange: (notes: string) => void
  onSubmit: () => void
  onClose: () => void
  isLoading: boolean
}> = ({ complaint, resolutionNotes, onResolutionNotesChange, onSubmit, onClose, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Resolve Complaint</h3>
              <p className="mt-1 text-sm text-gray-600">{complaint.subject}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="resolutionNotes" className="block text-sm font-semibold text-gray-900 mb-2">
              Resolution Notes
            </label>
            <textarea
              id="resolutionNotes"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              placeholder="Describe how the complaint was resolved, steps taken, and any follow-up actions..."
              value={resolutionNotes}
              onChange={(e) => onResolutionNotesChange(e.target.value)}
            />
            <p className="mt-2 text-sm text-gray-600">
              These notes will be visible to the client and stored for future reference.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading || !resolutionNotes.trim()}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Resolving..." : "Mark as Resolved"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplaintsManagement
