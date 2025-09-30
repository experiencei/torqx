// import React, { useState, useEffect, useCallback } from 'react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
// import { 
//   Menu, Upload, Search, MoreHorizontal, Play, Image as ImageIcon, 
//   FileVideo, Calendar, Maximize, Tag, Plus, Eye, Edit3, Trash2
// } from 'lucide-react';

// import { useAuth } from '@/lib/Authcontext';
// import { appwriteService } from '@/lib/appwrite';
// import { toast } from 'sonner';

// interface GalleryPageProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// interface Creative {
//   $id: string;
//   userId: string;
//   fileName: string;
//   fileId: string;
//   fileType: string;
//   fileSize: number;
//   tags?: string[];
//   isPublic: boolean;
  
// }



// export function GalleryPage({ sidebarCollapsed, setSidebarCollapsed }: GalleryPageProps) {
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [creatives, setCreatives] = useState<Creative[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       loadUserGallery();
//     }
//   }, [user]);

//   const loadUserGallery = async () => {
//     try {
//       setLoading(true);
//       const response = await appwriteService.getUserGallery(user!.$id);
//       setCreatives(response.documents);
//     } catch (error: any) {
//       toast.error('Failed to load gallery: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files || files.length === 0 || !user) return;

//     setUploading(true);
//     try {
//       for (const file of Array.from(files)) {
//         // Upload file to storage
//         const uploadedFile = await appwriteService.uploadFile(file);
        
//         // Add to gallery collection
//         await appwriteService.addToGallery({
//           userId: user.$id,
//           fileName: file.name,
//           fileId: uploadedFile.$id,
//           fileType: file.type,
//           fileSize: file.size,
//           tags: [],
//           isPublic: false,
//         });
//       }
      
//       toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully!`);
//       loadUserGallery(); // Refresh gallery
//     } catch (error: any) {
//       toast.error('Upload failed: ' + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Filter creatives based on search and filters
//   const filteredCreatives = creatives.filter(creative => {
//     const matchesSearch = creative.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (creative.tags && creative.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
//     const matchesType = typeFilter === 'all' || 
//                        (typeFilter === 'image' && creative.fileType.startsWith('image/')) ||
//                        (typeFilter === 'video' && creative.fileType.startsWith('video/'));
    
//     return matchesSearch && matchesType;
//   });

//   const handleCreativeClick = (creative: Creative) => {
//     setSelectedCreative(creative);
//     setPreviewOpen(true);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <>
//       {/* Header */}
//       <header className="px-4 md:px-8 py-6 border-b border-border bg-background">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="lg:hidden"
//             >
//               <Menu className="w-4 h-4" />
//             </Button>
//             <div>
//               <h1 className="text-xl md:text-2xl font-semibold text-foreground">Creative Gallery</h1>
//               <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage and organize your creative assets</p>
//             </div>
//           </div>
          
//           {/* Top Action Bar */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search creatives..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full sm:w-64"
//               />
//             </div>
            
//             {/* Filters */}
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-full sm:w-32">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="image">Images</SelectItem>
//                 <SelectItem value="video">Videos</SelectItem>
//               </SelectContent>
//             </Select>
            
//             {/* Upload Button */}
//             <div className="relative">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*,video/*"
//                 onChange={handleFileUpload}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 id="file-upload"
//               />
//               <Button 
//                 className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer" 
//                 disabled={uploading}
//                 asChild
//               >
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <Upload className="w-4 h-4 mr-2" />
//                   {uploading ? 'Uploading...' : 'Upload'}
//                 </label>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-8 bg-background overflow-auto">
//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
//               <p className="text-muted-foreground">Loading your gallery...</p>
//             </div>
//           </div>
//         ) : creatives.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="mb-6">
//               <svg width="120" height="120" viewBox="0 0 120 120" className="text-muted-foreground mx-auto">
//                 <rect x="10" y="20" width="100" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
//                 <circle cx="35" cy="45" r="8" fill="currentColor" opacity="0.3"/>
//                 <polygon points="70,45 85,65 95,55 110,75 10,75 10,65" fill="currentColor" opacity="0.3"/>
//                 <rect x="30" y="85" width="60" height="4" rx="2" fill="currentColor" opacity="0.3"/>
//                 <rect x="40" y="92" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.2"/>
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Launch your first campaign!</h3>
//             <p className="text-muted-foreground mb-4 max-w-md mx-auto">
//               Upload your creative assets to get started. Your gallery will store images and videos 
//               for use in your DOOH advertising campaigns.
//             </p>
//             <div className="relative inline-block">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*,video/*"
//                 onChange={handleFileUpload}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 id="empty-state-upload"
//               />
//               <Button 
//                 className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer" 
//                 disabled={uploading}
//                 asChild
//               >
//                 <label htmlFor="empty-state-upload" className="cursor-pointer">
//                   <Upload className="w-4 h-4 mr-2" />
//                   {uploading ? 'Uploading...' : 'Upload Your First Creative'}
//                 </label>
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Gallery Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//               {filteredCreatives.map((creative) => (
//                 <Card 
//                   key={creative.$id} 
//                   className="bg-card border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
//                   onClick={() => handleCreativeClick(creative)}
//                 >
//                   <div className="relative">
//                     {/* Thumbnail */}
//                     <div className="aspect-video bg-accent rounded-t-lg overflow-hidden relative">
//                       <div className="w-full h-full flex items-center justify-center">
//                         {creative.fileType.startsWith('image/') ? (
//                           <ImageIcon className="w-12 h-12 text-muted-foreground" />
//                         ) : (
//                           <FileVideo className="w-12 h-12 text-muted-foreground" />
//                         )}
//                       </div>
                      
//                       {/* Type Indicator */}
//                       <div className="absolute top-2 left-2">
//                         {creative.fileType.startsWith('video/') ? (
//                           <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md flex items-center space-x-1">
//                             <Play className="w-3 h-3" />
//                             <span className="text-xs">Video</span>
//                           </div>
//                         ) : (
//                           <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md">
//                             <ImageIcon className="w-3 h-3" />
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Three-dot Menu */}
//                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button 
//                               variant="ghost" 
//                               size="sm"
//                               className="w-8 h-8 p-0 bg-black bg-opacity-75 text-white hover:bg-black hover:bg-opacity-90 cursor-pointer"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <MoreHorizontal className="w-4 h-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem className="cursor-pointer">
//                               <Eye className="w-4 h-4 mr-2" />
//                               Preview
//                             </DropdownMenuItem>
//                             <DropdownMenuItem className="cursor-pointer">
//                               <Edit3 className="w-4 h-4 mr-2" />
//                               Rename
//                             </DropdownMenuItem>
//                             <DropdownMenuItem className="cursor-pointer">
//                               <Plus className="w-4 h-4 mr-2" />
//                               Add to Campaign
//                             </DropdownMenuItem>
//                             <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
//                               <Trash2 className="w-4 h-4 mr-2" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>
                    
//                     {/* Content */}
//                     <div className="p-4">
//                       <h3 className="font-medium text-foreground truncate mb-2">{creative.fileName}</h3>
//                       <p className="text-sm text-muted-foreground mb-3">
//                         {(creative.fileSize / 1024 / 1024).toFixed(1)} MB
//                       </p>
                      
//                       {/* Tags */}
//                       {creative.tags && creative.tags.length > 0 && (
//                         <div className="flex flex-wrap gap-1 mb-3">
//                           {creative.tags.slice(0, 2).map((tag) => (
//                             <Badge key={tag} variant="secondary" className="text-xs">
//                               {tag}
//                             </Badge>
//                           ))}
//                           {creative.tags.length > 2 && (
//                             <Badge variant="secondary" className="text-xs">
//                               +{creative.tags.length - 2}
//                             </Badge>
//                           )}
//                         </div>
//                       )}
                      
//                       {/* Upload Date */}
//                       {selectedCreative && (
//                           <div className="text-xs text-muted-foreground">
//                             <Calendar className="w-3 h-3 inline mr-1" />
//                             {formatDate(selectedCreative.$createdAt)}
//                           </div>
//                         )}
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>

//             {/* No Results State */}
//             {filteredCreatives.length === 0 && (
//               <div className="text-center py-12">
//                 <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-foreground mb-2">No creatives found</h3>
//                 <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Preview Panel Dialog */}
//       <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh]">
//           {selectedCreative && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-foreground">{selectedCreative.fileName}</DialogTitle>
//               </DialogHeader>
              
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Preview */}
//                 <div className="lg:col-span-2">
//                   <div className="relative bg-accent rounded-lg overflow-hidden aspect-video">
//                     <div className="w-full h-full flex items-center justify-center">
//                       <div className="text-center">
//                         {creative.fileType.startsWith('image/') ? (
//     <img
//       src={appwriteService.getFilePreview(creative.fileId)}
//       alt={creative.fileName}
//       className="w-full h-full object-cover"
//     />
//   ) : (
//     <div className="w-full h-full flex items-center justify-center bg-black">
//       <FileVideo className="w-12 h-12 text-white" />
//     </div>
//   )}
//                       </div>
//                     </div>
//                     <Button 
//                       variant="ghost" 
//                       size="sm"
//                       className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-75 cursor-pointer"
//                       onClick={async () => {
//                         try {
//                           const url = await appwriteService.getFileView(selectedCreative.fileId);
//                           window.open(url.toString(), '_blank');
//                         } catch (error) {
//                           toast.error('Failed to open file');
//                         }
//                       }}
//                     >
//                       <Maximize className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
                
//                 {/* Metadata */}
//                 <div className="space-y-6">
//                   {/* File Details */}
//                   <div>
//                     <h4 className="font-medium text-foreground mb-3">File Details</h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Type:</span>
//                         <span className="text-foreground">{selectedCreative.fileType}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Size:</span>
//                         <span className="text-foreground">{(selectedCreative.fileSize / 1024 / 1024).toFixed(1)} MB</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Uploaded:</span>
//                         <span className="text-foreground">{formatDate(selectedCreative.createdAt)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Public:</span>
//                         <span className="text-foreground">{selectedCreative.isPublic ? 'Yes' : 'No'}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Tags */}
//                   <div>
//                     <h4 className="font-medium text-foreground mb-3">Tags</h4>
//                     {selectedCreative.tags && selectedCreative.tags.length > 0 ? (
//                       <div className="flex flex-wrap gap-2">
//                         {selectedCreative.tags.map((tag) => (
//                           <Badge key={tag} variant="secondary">
//                             <Tag className="w-3 h-3 mr-1" />
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-sm text-muted-foreground">No tags added</p>
//                     )}
//                   </div>
                  
//                   {/* Actions */}
//                   <div className="pt-4 border-t border-border">
//                     <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-2 cursor-pointer">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add to New Campaign
//                     </Button>
//                     <div className="grid grid-cols-2 gap-2">
//                       <Button variant="outline" size="sm" className="cursor-pointer">
//                         <Edit3 className="w-4 h-4 mr-1" />
//                         Rename
//                       </Button>
//                       <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
//                         <Trash2 className="w-4 h-4 mr-1" />
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
// import { 
//   Menu, Upload, Search, MoreHorizontal, Play, Image as ImageIcon, 
//   FileVideo, Calendar, Maximize, Tag, Plus, Eye, Edit3, Trash2
// } from 'lucide-react';

// import { useAuth } from '@/lib/Authcontext';
// import { appwriteService } from '@/lib/appwrite';
// import { toast } from 'sonner';

// interface GalleryPageProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// interface Creative {
//   $id: string;
//   userId: string;
//   fileName: string;
//   fileId: string;
//   fileType: string;
//   fileSize: number;
//   tags?: string[];
//   isPublic: boolean;
//   $createdAt?: string;
//   createdAt?: string;
//   // Added local fields after resolving URLs
//   previewUrl?: string | null;
//   viewUrl?: string | null;
// }

// export function GalleryPage({ sidebarCollapsed, setSidebarCollapsed }: GalleryPageProps) {
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [creatives, setCreatives] = useState<Creative[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       loadUserGallery();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   /**
//    * Normalizes different possible return shapes from appwriteService storage helpers:
//    * - string (url)
//    * - object with `href` (some SDK returns object)
//    * - Promise resolving to one of the above
//    */
//   const resolveUrlValue = (val: any): string | null => {
//     if (!val) return null;
//     if (typeof val === 'string') return val;
//     if (typeof val === 'object' && typeof val.href === 'string') return val.href;
//     try {
//       const s = val.toString();
//       if (typeof s === 'string' && s !== '[object Object]') return s;
//     } catch (e) {
//       // fallthrough
//     }
//     return null;
//   };

//   const loadUserGallery = async () => {
//     try {
//       setLoading(true);
//       const response = await appwriteService.getUserGallery(user!.$id);

//       // response.documents expected
//       const docs = Array.isArray(response?.documents) ? response.documents : [];

//       // Resolve preview/view URLs for all items in parallel
//       const resolved: Creative[] = await Promise.all(docs.map(async (doc: any) => {
//         // Keep existing fields and add previewUrl/viewUrl
//         const creativeBase: Creative = {
//           ...doc,
//           $id: doc.$id,
//           userId: doc.userId,
//           fileName: doc.fileName,
//           fileId: doc.fileId,
//           fileType: doc.fileType,
//           fileSize: doc.fileSize,
//           tags: doc.tags || [],
//           isPublic: doc.isPublic ?? false,
//           $createdAt: doc.$createdAt,
//           createdAt: doc.createdAt
//         };

//         // Safely attempt to get preview and view URLs
//         let previewUrl: string | null = null;
//         let viewUrl: string | null = null;

//         try {
//           const p = await appwriteService.getFilePreview(creativeBase.fileId);
//           previewUrl = resolveUrlValue(p);
//         } catch (err) {
//           // Not fatal; preview may not exist for videos
//           previewUrl = null;
//         }

//         try {
//           const v = await appwriteService.getFileView(creativeBase.fileId);
//           viewUrl = resolveUrlValue(v);
//         } catch (err) {
//           viewUrl = null;
//         }

//         return {
//           ...creativeBase,
//           previewUrl,
//           viewUrl
//         };
//       }));

//       setCreatives(resolved);
//     } catch (error: any) {
//       toast.error('Failed to load gallery: ' + (error?.message || String(error)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files || files.length === 0 || !user) return;

//     setUploading(true);
//     try {
//       for (const file of Array.from(files)) {
//         // Upload file to storage
//         const uploadedFile = await appwriteService.uploadFile(file);

//         // Add to gallery collection (let Appwrite set $createdAt automatically)
//         await appwriteService.addToGallery({
//           userId: user.$id,
//           fileName: file.name,
//           fileId: uploadedFile.$id,
//           fileType: file.type,
//           fileSize: file.size,
//           tags: [],
//           isPublic: false
//         });
//       }

//       toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully!`);
//       await loadUserGallery(); // Refresh with resolved URLs
//     } catch (error: any) {
//       toast.error('Upload failed: ' + (error?.message || String(error)));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Filter creatives based on search and filters
//   const filteredCreatives = creatives.filter(creative => {
//     const matchesSearch = creative.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (creative.tags && creative.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
//     const matchesType = typeFilter === 'all' ||
//                        (typeFilter === 'image' && creative.fileType.startsWith('image/')) ||
//                        (typeFilter === 'video' && creative.fileType.startsWith('video/'));

//     return matchesSearch && matchesType;
//   });

//   const handleCreativeClick = (creative: Creative) => {
//     // ensure selectedCreative has viewUrl; if not, attempt to resolve again
//     if (!creative.viewUrl && creative.fileId) {
//       // attempt to fetch viewUrl on demand, but still open dialog (spinner may be nice, but keep simple)
//       (async () => {
//         try {
//           const v = await appwriteService.getFileView(creative.fileId);
//           const viewUrl = resolveUrlValue(v);
//           const updated = { ...creative, viewUrl };
//           setSelectedCreative(updated);
//         } catch (err) {
//           setSelectedCreative(creative); // fallback
//         }
//       })();
//     } else {
//       setSelectedCreative(creative);
//     }
//     setPreviewOpen(true);
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return '-';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <>
//       {/* Header */}
//       <header className="px-4 md:px-8 py-6 border-b border-border bg-background">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="lg:hidden"
//             >
//               <Menu className="w-4 h-4" />
//             </Button>
//             <div>
//               <h1 className="text-xl md:text-2xl font-semibold text-foreground">Creative Gallery</h1>
//               <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage and organize your creative assets</p>
//             </div>
//           </div>

//           {/* Top Action Bar */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search creatives..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full sm:w-64"
//               />
//             </div>

//             {/* Filters */}
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-full sm:w-32">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="image">Images</SelectItem>
//                 <SelectItem value="video">Videos</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Upload Button */}
//             <div className="relative">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*,video/*"
//                 onChange={handleFileUpload}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 id="file-upload"
//               />
//               <Button
//                 className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
//                 disabled={uploading}
//                 asChild
//               >
//                 <label htmlFor="file-upload" className="cursor-pointer flex items-center">
//                   <Upload className="w-4 h-4 mr-2" />
//                   {uploading ? 'Uploading...' : 'Upload'}
//                 </label>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-8 bg-background overflow-auto">
//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
//               <p className="text-muted-foreground">Loading your gallery...</p>
//             </div>
//           </div>
//         ) : creatives.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="mb-6">
//               <svg width="120" height="120" viewBox="0 0 120 120" className="text-muted-foreground mx-auto">
//                 <rect x="10" y="20" width="100" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
//                 <circle cx="35" cy="45" r="8" fill="currentColor" opacity="0.3"/>
//                 <polygon points="70,45 85,65 95,55 110,75 10,75 10,65" fill="currentColor" opacity="0.3"/>
//                 <rect x="30" y="85" width="60" height="4" rx="2" fill="currentColor" opacity="0.3"/>
//                 <rect x="40" y="92" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.2"/>
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Launch your first campaign!</h3>
//             <p className="text-muted-foreground mb-4 max-w-md mx-auto">
//               Upload your creative assets to get started. Your gallery will store images and videos 
//               for use in your DOOH advertising campaigns.
//             </p>
//             <div className="relative inline-block">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*,video/*"
//                 onChange={handleFileUpload}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 id="empty-state-upload"
//               />
//               <Button 
//                 className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer" 
//                 disabled={uploading}
//                 asChild
//               >
//                 <label htmlFor="empty-state-upload" className="cursor-pointer flex items-center">
//                   <Upload className="w-4 h-4 mr-2" />
//                   {uploading ? 'Uploading...' : 'Upload Your First Creative'}
//                 </label>
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Gallery Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//               {filteredCreatives.map((creative) => (
//                 <Card 
//                   key={creative.$id} 
//                   className="bg-card border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
//                   onClick={() => handleCreativeClick(creative)}
//                 >
//                   <div className="relative">
//                     {/* Thumbnail */}
//                     <div className="aspect-video bg-accent rounded-t-lg overflow-hidden relative">
//                       {/* If we have a previewUrl (image), render it. Otherwise show an icon */}
//                       <div className="w-full h-full flex items-center justify-center">
//                         {creative.fileType.startsWith('image/') && creative.previewUrl ? (
//                           <img
//                             src={creative.previewUrl}
//                             alt={creative.fileName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : creative.fileType.startsWith('image/') && creative.viewUrl ? (
//                           // fallback to viewUrl if preview missing
//                           <img
//                             src={creative.viewUrl}
//                             alt={creative.fileName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : creative.fileType.startsWith('video/') && creative.previewUrl ? (
//                           // video may have a preview image
//                           <img
//                             src={creative.previewUrl}
//                             alt={creative.fileName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : creative.fileType.startsWith('video/') ? (
//                           <div className="w-full h-full flex items-center justify-center bg-black">
//                             <FileVideo className="w-12 h-12 text-white" />
//                           </div>
//                         ) : (
//                           <ImageIcon className="w-12 h-12 text-muted-foreground" />
//                         )}
//                       </div>

//                       {/* Type Indicator */}
//                       <div className="absolute top-2 left-2">
//                         {creative.fileType.startsWith('video/') ? (
//                           <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md flex items-center space-x-1">
//                             <Play className="w-3 h-3" />
//                             <span className="text-xs">Video</span>
//                           </div>
//                         ) : (
//                           <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md">
//                             <ImageIcon className="w-3 h-3" />
//                           </div>
//                         )}
//                       </div>

//                       {/* Three-dot Menu */}
//                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button 
//                               variant="ghost" 
//                               size="sm"
//                               className="w-8 h-8 p-0 bg-black bg-opacity-75 text-white hover:bg-black hover:bg-opacity-90 cursor-pointer"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <MoreHorizontal className="w-4 h-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedCreative(creative); setPreviewOpen(true); }}>
//                               <Eye className="w-4 h-4 mr-2" />
//                               Preview
//                             </DropdownMenuItem>
//                             <DropdownMenuItem className="cursor-pointer">
//                               <Edit3 className="w-4 h-4 mr-2" />
//                               Rename
//                             </DropdownMenuItem>
//                             <DropdownMenuItem className="cursor-pointer">
//                               <Plus className="w-4 h-4 mr-2" />
//                               Add to Campaign
//                             </DropdownMenuItem>
//                             <DropdownMenuItem 
//                               className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
//                               onClick={async (e) => {
//                                 e.stopPropagation();
//                                 try {
//                                   // TODO: implement delete API call in appwriteService if available
//                                   // await appwriteService.deleteGalleryItem(creative.$id);
//                                   toast('Delete action not implemented');
//                                 } catch (err: any) {
//                                   toast.error('Delete failed: ' + (err?.message || String(err)));
//                                 }
//                               }}
//                             >
//                               <Trash2 className="w-4 h-4 mr-2" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-4">
//                       <h3 className="font-medium text-foreground truncate mb-2">{creative.fileName}</h3>
//                       <p className="text-sm text-muted-foreground mb-3">
//                         {(creative.fileSize / 1024 / 1024).toFixed(1)} MB
//                       </p>

//                       {/* Tags */}
//                       {creative.tags && creative.tags.length > 0 && (
//                         <div className="flex flex-wrap gap-1 mb-3">
//                           {creative.tags.slice(0, 2).map((tag) => (
//                             <Badge key={tag} variant="secondary" className="text-xs">
//                               {tag}
//                             </Badge>
//                           ))}
//                           {creative.tags.length > 2 && (
//                             <Badge variant="secondary" className="text-xs">
//                               +{creative.tags.length - 2}
//                             </Badge>
//                           )}
//                         </div>
//                       )}

//                       {/* Upload Date */}
//                       <div className="text-xs text-muted-foreground">
//                         <Calendar className="w-3 h-3 inline mr-1" />
//                         {formatDate(creative.$createdAt || creative.createdAt)}
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>

//             {/* No Results State */}
//             {filteredCreatives.length === 0 && (
//               <div className="text-center py-12">
//                 <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-foreground mb-2">No creatives found</h3>
//                 <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Preview Panel Dialog */}
//       <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
//         {/* Add subtle blur + semi-transparent background for readability */}
//         <DialogContent className="max-w-4xl max-h-[90vh] backdrop-blur-md bg-background/80">
//           {selectedCreative && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-foreground">{selectedCreative.fileName}</DialogTitle>
//               </DialogHeader>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Preview */}
//                 <div className="lg:col-span-2">
//                   <div className="relative bg-accent rounded-lg overflow-hidden aspect-video">
//                     <div className="w-full h-full flex items-center justify-center">
//                       {selectedCreative.fileType.startsWith('video/') ? (
//                         // show video if we have viewUrl, else show placeholder
//                         selectedCreative.viewUrl ? (
//                           <video
//                             src={selectedCreative.viewUrl}
//                             controls
//                             className="w-full h-full object-contain"
//                           />
//                         ) : (
//                           <div className="text-center">
//                             <FileVideo className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                             <p className="text-foreground">Video Preview</p>
//                             <p className="text-sm text-muted-foreground">Click the open button to view/download</p>
//                           </div>
//                         )
//                       ) : selectedCreative.previewUrl || selectedCreative.viewUrl ? (
//                         <img
//                           src={selectedCreative.previewUrl || selectedCreative.viewUrl || ''}
//                           alt={selectedCreative.fileName}
//                           className="w-full h-full object-contain"
//                         />
//                       ) : (
//                         <div className="text-center">
//                           <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                           <p className="text-foreground">Image Preview</p>
//                           <p className="text-sm text-muted-foreground">Click the open button to view/download</p>
//                         </div>
//                       )}
//                     </div>

//                     <Button 
//                       variant="ghost" 
//                       size="sm"
//                       className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-75 cursor-pointer"
//                       onClick={async () => {
//                         try {
//                           // Prefer viewUrl for full file access
//                           let url = selectedCreative.viewUrl;
//                           if (!url) {
//                             // try resolve on-demand
//                             const v = await appwriteService.getFileView(selectedCreative.fileId);
//                             url = (typeof v === 'string' ? v : (v?.href ? v.href : (v?.toString ? v.toString() : null)));
//                           }
//                           if (url) {
//                             window.open(url, '_blank');
//                           } else {
//                             toast.error('File URL unavailable');
//                           }
//                         } catch (error) {
//                           toast.error('Failed to open file');
//                         }
//                       }}
//                     >
//                       <Maximize className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Metadata */}
//                 <div className="space-y-6">
//                   {/* File Details */}
//                   <div>
//                     <h4 className="font-medium text-foreground mb-3">File Details</h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Type:</span>
//                         <span className="text-foreground">{selectedCreative.fileType}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Size:</span>
//                         <span className="text-foreground">{(selectedCreative.fileSize / 1024 / 1024).toFixed(1)} MB</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Uploaded:</span>
//                         <span className="text-foreground">{formatDate(selectedCreative.$createdAt || selectedCreative.createdAt)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Public:</span>
//                         <span className="text-foreground">{selectedCreative.isPublic ? 'Yes' : 'No'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Tags */}
//                   <div>
//                     <h4 className="font-medium text-foreground mb-3">Tags</h4>
//                     {selectedCreative.tags && selectedCreative.tags.length > 0 ? (
//                       <div className="flex flex-wrap gap-2">
//                         {selectedCreative.tags.map((tag) => (
//                           <Badge key={tag} variant="secondary">
//                             <Tag className="w-3 h-3 mr-1" />
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-sm text-muted-foreground">No tags added</p>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="pt-4 border-t border-border">
//                     <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-2 cursor-pointer">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add to New Campaign
//                     </Button>
//                     <div className="grid grid-cols-2 gap-2">
//                       <Button variant="outline" size="sm" className="cursor-pointer">
//                         <Edit3 className="w-4 h-4 mr-1" />
//                         Rename
//                       </Button>
//                       <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
//                         <Trash2 className="w-4 h-4 mr-1" />
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }





// GalleryPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  Menu, Upload, Search, MoreHorizontal, Play, Image as ImageIcon, 
  FileVideo, Calendar, Maximize, Tag, Plus, Eye, Edit3, Trash2
} from 'lucide-react';

import { useAuth } from '@/lib/Authcontext';
import { appwriteService , getUserGallery } from '@/lib/appwrite';
import { toast } from 'sonner';

interface GalleryPageProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface Creative {
  $id: string;
  userId: string;
  fileName: string;
  fileId: string;
  fileType: string;
  fileSize: number;
  tags?: string[];
  isPublic: boolean;
  $createdAt?: string;
  createdAt?: string;
  // resolved local preview/view URLs (string or null)
  previewUrl?: string | null;
  viewUrl?: string | null;
}

export function GalleryPage({ sidebarCollapsed, setSidebarCollapsed }: GalleryPageProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [creatives, setCreatives] = useState<Creative[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // keep track of created object URLs so we can revoke them on cleanup
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (user) loadUserGallery();
    // cleanup on unmount: revoke any blob: URLs we created
    return () => {
      objectUrlsRef.current.forEach((u) => {
        try { URL.revokeObjectURL(u); } catch (e) { /* ignore */ }
      });
      objectUrlsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Robust converter: accepts string | { href } | Response | Blob | ArrayBuffer | Uint8Array | others
  const toUrl = async (val: any): Promise<string | null> => {
    if (!val) return null;
    // plain string → good
    if (typeof val === 'string') return val;

    // object with href
    if (typeof val === 'object' && val !== null) {
      if (typeof (val as any).href === 'string') return (val as any).href;
      // Response from fetch / SDK
      if (typeof (val as Response).blob === 'function') {
        try {
          const blob = await (val as Response).blob();
          const url = URL.createObjectURL(blob);
          objectUrlsRef.current.push(url);
          return url;
        } catch (e) {
          return null;
        }
      }
      // If val is already a Blob
      if (val instanceof Blob) {
        const url = URL.createObjectURL(val);
        objectUrlsRef.current.push(url);
        return url;
      }

      // ArrayBuffer or typed arrays
      if (val instanceof ArrayBuffer || ArrayBuffer.isView(val)) {
        const blob = new Blob([val]);
        const url = URL.createObjectURL(blob);
        objectUrlsRef.current.push(url);
        return url;
      }

      // fallback to toString if it's not [object Object]
      try {
        const s = val.toString();
        if (s && s !== '[object Object]') return s;
      } catch {}
    }

    // final fallback: cast to string if useful
    try {
      const s2 = String(val);
      if (s2 && s2 !== '[object Object]') return s2;
    } catch {}

    return null;
  };


  const loadUserGallery = async () => {
  try {
    setLoading(true);
    if (!user) return;

    const docs = await getUserGallery(user.$id);

    const creatives: Creative[] = docs.map((doc: any) => ({
      $id: doc.$id,
      userId: doc.userId,
      fileName: doc.fileName,
      fileId: doc.fileId,
      fileType: doc.fileType,
      fileSize: doc.fileSize,
      tags: doc.tags || [],
      isPublic: doc.isPublic ?? false,
      $createdAt: doc.$createdAt,
      createdAt: doc.createdAt,
      previewUrl: doc.previewUrl,
      viewUrl: doc.viewUrl,
    }));

    setCreatives(creatives);
  } catch (error: any) {
    toast.error("Failed to load gallery: " + (error?.message || String(error)));
  } finally {
    setLoading(false);
  }
};


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !user) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const uploadedFile = await appwriteService.uploadFile(file, user.$id);
        await appwriteService.addToGallery({
          userId: user.$id,
          fileName: file.name,
          fileId: uploadedFile.$id,
          fileType: file.type,
          fileSize: file.size,
          tags: [],
          isPublic: false
        });
      }
      toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully!`);
      await loadUserGallery();
    } catch (error: any) {
      toast.error('Upload failed: ' + (error?.message || String(error)));
    } finally {
      setUploading(false);
    }
  };

  // Filtering and click handlers (kept largely the same)
  const filteredCreatives = creatives.filter(creative => {
    const matchesSearch = creative.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (creative.tags && creative.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesType = typeFilter === 'all' ||
                       (typeFilter === 'image' && creative.fileType.startsWith('image/')) ||
                       (typeFilter === 'video' && creative.fileType.startsWith('video/'));
    return matchesSearch && matchesType;
  });

  const handleCreativeClick = (creative: Creative) => {
    // if viewUrl missing, try to lazy-resolve
    if (!creative.viewUrl && creative.fileId) {
      (async () => {
        try {
          const vRaw = await appwriteService.getFileView(creative.fileId).catch(() => null);
          const viewUrl = await toUrl(vRaw);
          setSelectedCreative({ ...creative, viewUrl });
        } catch {
          setSelectedCreative(creative);
        }
      })();
    } else {
      setSelectedCreative(creative);
    }
    setPreviewOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // -- UI (keeps your structure, but uses previewUrl/viewUrl safely)
  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-border bg-background">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-foreground">Creative Gallery</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage and organize your creative assets</p>
            </div>
          </div>

          {/* Top Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search creatives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Filters */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>

            {/* Upload Button */}
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                disabled={uploading}
                asChild
              >
                <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </label>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-background overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your gallery...</p>
            </div>
          </div>
        ) : creatives.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg width="120" height="120" viewBox="0 0 120 120" className="text-muted-foreground mx-auto">
                <rect x="10" y="20" width="100" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="35" cy="45" r="8" fill="currentColor" opacity="0.3"/>
                <polygon points="70,45 85,65 95,55 110,75 10,75 10,65" fill="currentColor" opacity="0.3"/>
                <rect x="30" y="85" width="60" height="4" rx="2" fill="currentColor" opacity="0.3"/>
                <rect x="40" y="92" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Launch your first campaign!</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Upload your creative assets to get started. Your gallery will store images and videos 
              for use in your DOOH advertising campaigns.
            </p>
            <div className="relative inline-block">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="empty-state-upload"
              />
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer" 
                disabled={uploading}
                asChild
              >
                <label htmlFor="empty-state-upload" className="cursor-pointer flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Your First Creative'}
                </label>
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredCreatives.map((creative) => (
                <Card 
                  key={creative.$id} 
                  className="bg-card border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleCreativeClick(creative)}
                >
                  <div className="relative">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-accent rounded-t-lg overflow-hidden relative">
                      <div className="w-full h-full flex items-center justify-center">
                        {creative.fileType.startsWith('image/') && (creative.previewUrl || creative.viewUrl) ? (
                          <img
                            
                            src={creative.previewUrl || creative.viewUrl || undefined}
                            alt={creative.fileName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            crossOrigin="anonymous"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : creative.fileType.startsWith('video/') && creative.previewUrl ? (
                          <img
                           
                            src={creative.previewUrl}
                            alt={creative.fileName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            crossOrigin="anonymous"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : creative.fileType.startsWith('video/') ? (
                          <div className="w-full h-full flex items-center justify-center bg-black">
                            <FileVideo className="w-12 h-12 text-white" />
                          </div>
                        ) : (
                          <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        )}
                      </div>

                      {/* Type Indicator */}
                      <div className="absolute top-2 left-2">
                        {creative.fileType.startsWith('video/') ? (
                          <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md flex items-center space-x-1">
                            <Play className="w-3 h-3" />
                            <span className="text-xs">Video</span>
                          </div>
                        ) : (
                          <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md">
                            <ImageIcon className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Menu */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-8 h-8 p-0 bg-black bg-opacity-75 text-white hover:bg-black hover:bg-opacity-90 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedCreative(creative); setPreviewOpen(true); }}>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit3 className="w-4 h-4 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Plus className="w-4 h-4 mr-2" />
                              Add to Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  toast('Delete action not implemented');
                                } catch (err: any) {
                                  toast.error('Delete failed: ' + (err?.message || String(err)));
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-medium text-foreground truncate mb-2">{creative.fileName}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {(creative.fileSize / 1024 / 1024).toFixed(1)} MB
                      </p>

                      {/* Tags */}
                      {creative.tags && creative.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {creative.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {creative.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{creative.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Upload Date */}
                      <div className="text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {formatDate(creative.$createdAt || creative.createdAt)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results State */}
            {filteredCreatives.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No creatives found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Panel Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] backdrop-blur-md bg-background/80">
          {selectedCreative && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground">{selectedCreative.fileName}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview */}
                <div className="lg:col-span-2">
                  <div className="relative bg-accent rounded-lg overflow-hidden aspect-video">
                    <div className="w-full h-full flex items-center justify-center">
                      {selectedCreative.fileType.startsWith('video/') ? (
                        selectedCreative.viewUrl ? (
                          <video
                            src={selectedCreative.viewUrl}
                            controls
                            className="w-full h-full object-contain"
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="text-center">
                            <FileVideo className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-foreground">Video Preview</p>
                            <p className="text-sm text-muted-foreground">Click the open button to view/download</p>
                          </div>
                        )
                      ) : selectedCreative.previewUrl || selectedCreative.viewUrl ? (
                        <img
                           
                          src={selectedCreative.previewUrl || selectedCreative.viewUrl || ''}
                          alt={selectedCreative.fileName}
                          className="w-full h-full object-contain"
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-foreground">Image Preview</p>
                          <p className="text-sm text-muted-foreground">Click the open button to view/download</p>
                        </div>
                      )}
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-75 cursor-pointer"
                      onClick={async () => {
                        try {
                          let url = selectedCreative.viewUrl;
                          if (!url) {
                            const vRaw = await appwriteService.getFileView(selectedCreative.fileId).catch(() => null);
                            url = await toUrl(vRaw);
                          }
                          if (url) window.open(url, '_blank');
                          else toast.error('File URL unavailable');
                        } catch {
                          toast.error('Failed to open file');
                        }
                      }}
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">File Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="text-foreground">{selectedCreative.fileType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="text-foreground">{(selectedCreative.fileSize / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uploaded:</span>
                        <span className="text-foreground">{formatDate(selectedCreative.$createdAt || selectedCreative.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Public:</span>
                        <span className="text-foreground">{selectedCreative.isPublic ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Tags</h4>
                    {selectedCreative.tags && selectedCreative.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedCreative.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No tags added</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-2 cursor-pointer">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to New Campaign
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        <Edit3 className="w-4 h-4 mr-1" />
                        Rename
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
