// import React, { useState, useEffect, useCallback } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Progress } from '@/components/ui/progress';
// import { useAuth } from '@/lib/Authcontexts';
// import { appwriteService, storage, STORAGE_BUCKET_ID } from '@/lib/appwrites';
// import { Query, ID } from 'appwrite';

// import { 
//   Menu, 
//   Upload, 
//   Search, 
//   Filter, 
//   Grid3X3, 
//   List, 
//   Image as ImageIcon, 
//   Video, 
//   FileText, 
//   Trash2, 
//   Download, 
//   Eye,
//   Calendar,
//   HardDrive,
//   Plus,
//   X
// } from 'lucide-react';

// interface MediaLibraryProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// interface MediaFile {
//   $id: string;
//   $createdAt: string;
//   name: string;
//   originalName: string;
//   type: 'image' | 'video';
//   size: number;
//   url: string;
//   fileId: string;
//   duration?: number;
//   thumbnailUrl?: string;
//   userId: string;
// }

// export function MediaLibrary({ sidebarCollapsed, setSidebarCollapsed }: MediaLibraryProps) {
//   const { user } = useAuth();
//   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
//   const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
//   const [dragActive, setDragActive] = useState(false);

//   useEffect(() => {
//     if (user) {
//       loadMediaFiles();
//     }
//   }, [user]);

//   useEffect(() => {
//     // Filter files based on search and type
//     let filtered = mediaFiles;
    
//     if (searchQuery) {
//       filtered = filtered.filter(file => 
//         file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     if (selectedType !== 'all') {
//       filtered = filtered.filter(file => file.type === selectedType);
//     }
    
//     setFilteredFiles(filtered);
//   }, [mediaFiles, searchQuery, selectedType]);

//   const loadMediaFiles = async () => {
//     try {
//       setLoading(true);
      
//       const response = await appwriteService.getMediaFiles(user!.$id);
//       const mediaFiles = response.documents.map((doc: any) => ({
//         $id: doc.$id,
//         $createdAt: doc.$createdAt,
//         name: doc.name,
//         originalName: doc.originalName,
//         type: doc.type,
//         size: doc.size,
//         url: doc.url || appwriteService.getFileView(doc.fileId),
//         fileId: doc.fileId,
//         duration: doc.duration,
//         thumbnailUrl: doc.thumbnailUrl,
//         userId: doc.userId
//       }));
      
//       setMediaFiles(mediaFiles);
//     } catch (error) {
//       console.error('Error loading media files:', error);
//       setMediaFiles([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileUpload(Array.from(e.dataTransfer.files));
//     }
//   }, []);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFileUpload(Array.from(e.target.files));
//     }
//   };

//   const handleFileUpload = async (files: File[]) => {
//     try {
//       setUploading(true);
//       setUploadProgress(0);

//       const uploadedFiles = [];
      
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         setUploadProgress(((i + 0.5) / files.length) * 100);
        
//         // Upload file to storage
//         const uploadResponse = await appwriteService.uploadFile(file);
        
//         // Create media document
//         const mediaData = {
//           name: file.name.split('.')[0],
//           originalName: file.name,
//           type: file.type.startsWith('image/') ? 'image' : 'video',
//           size: file.size,
//           fileId: uploadResponse.$id,
//           url: appwriteService.getFileView(uploadResponse.$id).toString(),
//           userId: user!.$id,
//           duration: file.type.startsWith('video/') ? 30 : undefined
//         };
        
//         const mediaResponse = await appwriteService.createMediaFile(mediaData);
        
//         uploadedFiles.push({
//           ...mediaResponse,
//           url: appwriteService.getFileView(uploadResponse.$id).toString()
//         });
        
//         setUploadProgress(((i + 1) / files.length) * 100);
//       }

//       // Add to local state
//       setMediaFiles(prev => [...uploadedFiles, ...prev]);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     } finally {
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   const deleteFile = async (file: MediaFile) => {
//     try {
//       // Delete from database
//       await appwriteService.deleteMediaFile(file.$id);
      
//       // Delete from storage
//       await storage.deleteFile(STORAGE_BUCKET_ID, file.fileId);
      
//       // Remove from local state
//       setMediaFiles(prev => prev.filter(f => f.$id !== file.$id));
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }
//   };

//   const formatFileSize = (bytes: number) => {
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     if (bytes === 0) return '0 Byte';
//     const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
//     return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getFileIcon = (type: string) => {
//     switch (type) {
//       case 'image': return ImageIcon;
//       case 'video': return Video;
//       default: return FileText;
//     }
//   };

//   return (
//     <div className="flex-1 overflow-auto">
//       {/* Header */}
//       <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
//         <div className="flex items-center justify-between p-6">
//   <div className="flex items-center space-x-4">
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//       className="lg:hidden"
//     >
//       <Menu className="w-5 h-5" />
//     </Button>
//     <div>
//       <h1 className="text-2xl font-semibold">Media Library</h1>
//       <p className="text-muted-foreground">
//         {mediaFiles.length} files • {formatFileSize(mediaFiles.reduce((acc, file) => acc + file.size, 0))} total
//       </p>
//     </div>
//   </div>

//   <div>
//     <Button className="bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden">
//       <Plus className="w-4 h-4 mr-2" />
//       Upload Media
//       <input
//         type="file"
//         multiple
//         accept="image/*,video/*"
//         onChange={handleFileSelect}
//         className="absolute inset-0 opacity-0 cursor-pointer"
//       />
//     </Button>
//   </div>
// </div>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* Search and Filters */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search media files..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="flex space-x-2">
//             <Button
//               variant={selectedType === 'all' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setSelectedType('all')}
//             >
//               All
//             </Button>
//             <Button
//               variant={selectedType === 'image' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setSelectedType('image')}
//             >
//               <ImageIcon className="w-4 h-4 mr-1" />
//               Images
//             </Button>
//             <Button
//               variant={selectedType === 'video' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setSelectedType('video')}
//             >
//               <Video className="w-4 h-4 mr-1" />
//               Videos
//             </Button>
//           </div>
//           <div className="flex space-x-1 border rounded-lg p-1">
//             <Button
//               variant={viewMode === 'grid' ? 'default' : 'ghost'}
//               size="sm"
//               onClick={() => setViewMode('grid')}
//             >
//               <Grid3X3 className="w-4 h-4" />
//             </Button>
//             <Button
//               variant={viewMode === 'list' ? 'default' : 'ghost'}
//               size="sm"
//               onClick={() => setViewMode('list')}
//             >
//               <List className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Upload Area */}
//         {mediaFiles.length === 0 && !loading && (
//   <div
//     className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
//       dragActive ? 'border-primary bg-accent' : 'border-muted-foreground/25'
//     }`}
//     onDragEnter={handleDrag}
//     onDragLeave={handleDrag}
//     onDragOver={handleDrag}
//     onDrop={handleDrop}
//   >
//     <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//     <h3 className="text-lg font-medium mb-2">Upload your first media files</h3>
//     <p className="text-muted-foreground mb-4">
//       Drag and drop images or videos here, or browse to select files
//     </p>

//     <Button variant="outline" className="relative overflow-hidden">
//       <Upload className="w-4 h-4 mr-2" />
//       Browse Files
//       <input
//         type="file"
//         multiple
//         accept="image/*,video/*"
//         onChange={handleFileSelect}
//         className="absolute inset-0 opacity-0 cursor-pointer"
//       />
//     </Button>
//   </div>
// )}

//         {/* Upload Progress */}
//         {uploading && (
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-4">
//                 <Upload className="w-5 h-5 text-primary" />
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-medium">Uploading files...</span>
//                     <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
//                   </div>
//                   <Progress value={uploadProgress} className="w-full" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Media Grid/List */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <Card key={i} className="animate-pulse">
//                 <div className="aspect-video bg-muted rounded-t-lg" />
//                 <CardContent className="p-4">
//                   <div className="h-4 bg-muted rounded w-3/4 mb-2" />
//                   <div className="h-3 bg-muted rounded w-1/2" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredFiles.map((file) => {
//               const Icon = getFileIcon(file.type);
//               return (
//                 <Card key={file.$id} className="group hover:shadow-lg transition-all duration-200">
//                   <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-lg relative overflow-hidden">
//                     {file.type === 'image' ? (
//                       <img 
//                         src={file.url} 
//                         alt={file.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-full">
//                         <Video className="w-12 h-12 text-muted-foreground" />
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                       <div className="flex space-x-2">
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           onClick={() => setSelectedFile(file)}
//                         >
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           onClick={() => deleteFile(file)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                     <Badge 
//                       variant="secondary" 
//                       className="absolute top-2 right-2 bg-black/50 text-white border-0"
//                     >
//                       <Icon className="w-3 h-3 mr-1" />
//                       {file.type}
//                     </Badge>
//                   </div>
//                   <CardContent className="p-4">
//                     <h3 className="font-medium truncate mb-1">{file.name}</h3>
//                     <div className="flex items-center justify-between text-sm text-muted-foreground">
//                       <span>{formatFileSize(file.size)}</span>
//                       <span>{formatDate(file.$createdAt)}</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         ) : (
//           <Card>
//             <CardContent className="p-0">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="border-b">
//                     <tr>
//                       <th className="text-left p-4 font-medium">Name</th>
//                       <th className="text-left p-4 font-medium">Type</th>
//                       <th className="text-left p-4 font-medium">Size</th>
//                       <th className="text-left p-4 font-medium">Created</th>
//                       <th className="text-left p-4 font-medium">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredFiles.map((file) => {
//                       const Icon = getFileIcon(file.type);
//                       return (
//                         <tr key={file.$id} className="border-b hover:bg-accent/50 transition-colors">
//                           <td className="p-4">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
//                                 <Icon className="w-5 h-5 text-muted-foreground" />
//                               </div>
//                               <div>
//                                 <p className="font-medium">{file.name}</p>
//                                 <p className="text-sm text-muted-foreground">{file.originalName}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <Badge variant="outline" className="capitalize">
//                               {file.type}
//                             </Badge>
//                           </td>
//                           <td className="p-4 text-muted-foreground">
//                             {formatFileSize(file.size)}
//                           </td>
//                           <td className="p-4 text-muted-foreground">
//                             {formatDate(file.$createdAt)}
//                           </td>
//                           <td className="p-4">
//                             <div className="flex space-x-1">
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 onClick={() => setSelectedFile(file)}
//                               >
//                                 <Eye className="w-4 h-4" />
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 onClick={() => deleteFile(file)}
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Empty State */}
//         {!loading && filteredFiles.length === 0 && mediaFiles.length > 0 && (
//           <div className="text-center py-12">
//             <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium mb-2">No files found</h3>
//             <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>

//       {/* Overlay blur when dialog is open */}
//       {(!!selectedFile || uploading) && (
//         <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
//       )}

//       {/* File Preview Dialog */}
//       <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
//         <DialogContent className="max-w-4xl z-50">
//           <DialogHeader>
//             <DialogTitle>{selectedFile?.name}</DialogTitle>
//           </DialogHeader>
//           {selectedFile && (
//             <div className="space-y-4">
//               <div className="aspect-video bg-accent rounded-lg overflow-hidden">
//                 {selectedFile.type === 'image' ? (
//                   <img 
//                     src={selectedFile.url} 
//                     alt={selectedFile.name}
//                     className="w-full h-full object-contain"
//                   />
//                 ) : (
//                   <video 
//                     src={selectedFile.url} 
//                     controls
//                     className="w-full h-full"
//                   />
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="text-muted-foreground">Original Name:</span>
//                   <p className="font-medium">{selectedFile.originalName}</p>
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground">File Size:</span>
//                   <p className="font-medium">{formatFileSize(selectedFile.size)}</p>
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground">Type:</span>
//                   <p className="font-medium capitalize">{selectedFile.type}</p>
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground">Created:</span>
//                   <p className="font-medium">{formatDate(selectedFile.$createdAt)}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/lib/Authcontexts';
import { appwriteService, storage, STORAGE_BUCKET_ID , getUserMediaFiles } from '@/lib/appwrites';
import { Query, ID } from 'appwrite';

import { 
  Menu, 
  Upload, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Trash2, 
  Download, 
  Eye,
  Calendar,
  HardDrive,
  Plus,
  X
} from 'lucide-react';

interface MediaLibraryProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface MediaFile {
  $id: string;
  $createdAt: string;
  name: string;
  originalName: string;
  type: 'image' | 'video';
  size: number;
  url: string;
  fileId: string;
  duration?: number;
  thumbnailUrl?: string;
  userId: string;
}

export function MediaLibrary({ sidebarCollapsed, setSidebarCollapsed }: MediaLibraryProps) {
  const { user } = useAuth();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (user) {
      loadMediaFiles();
    } else {
      // if no user, clear state
      setMediaFiles([]);
      setFilteredFiles([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Filter files based on search and type
    let filtered = mediaFiles;
    
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(file => file.type === selectedType);
    }
    
    setFilteredFiles(filtered);
  }, [mediaFiles, searchQuery, selectedType]);

  const loadMediaFiles = async () => {
  try {
    setLoading(true);

    if (!user) return;

    const files = await getUserMediaFiles(user.$id);

    console.log("res22" , files)

    // Cast into MediaFile[] (our frontend format)
    const mediaFilesResolved: MediaFile[] = files.map((doc: any) => ({
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      name: doc.name,
      originalName: doc.originalName,
      type: doc.type,
      size: doc.size,
      url: doc.url,  // already guaranteed working view url
      fileId: doc.fileId,
      duration: doc.duration,
      thumbnailUrl: doc.thumbnailUrl,
      userId: doc.userId,
    }));

    setMediaFiles(mediaFilesResolved);
  } catch (error) {
    console.error('Error loading media files:', error);
    setMediaFiles([]);
  } finally {
    setLoading(false);
  }
};


  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(Array.from(e.target.files));
      // clear input so same file can be reselected later
      e.currentTarget.value = "";
    }
  };

  const handleFileUpload = async (files: File[]) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      const uploadedFiles: MediaFile[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(((i + 0.5) / files.length) * 100);
        
        // Upload file to storage
        const uploadResponse = await appwriteService.uploadFile(file);
        // uploadResponse.$id is the storage file id

        // Resolve a usable view/preview URL BEFORE creating DB document
        // Use preview for images (smaller), view for other types — both normalized to strings by appwriteService
        let resolvedUrl = "";
        try {
          if (file.type.startsWith('image/')) {
            resolvedUrl = await appwriteService.getFilePreview(uploadResponse.$id);
            // fallback to view if preview is empty
            if (!resolvedUrl) resolvedUrl = await appwriteService.getFileView(uploadResponse.$id);
          } else {
            resolvedUrl = await appwriteService.getFileView(uploadResponse.$id);
          }
        } catch (err) {
          console.error("Error getting file URL from storage for fileId:", uploadResponse.$id, err);
          resolvedUrl = "";
        }

        // Create media document: ensure url field is a string (resolvedUrl)
        const mediaData = {
          name: file.name.split('.')[0],
          originalName: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          size: file.size,
          fileId: uploadResponse.$id,
          url: resolvedUrl,
          userId: user!.$id,
          duration: file.type.startsWith('video/') ? 30 : undefined
        };

        const mediaResponse = await appwriteService.createMediaFile(mediaData);

        // Build a consistent object for the frontend state (prefer created doc fields but use our resolvedUrl)
        uploadedFiles.push({
          $id: mediaResponse.$id,
          $createdAt: mediaResponse.$createdAt,
          name: mediaResponse.name || mediaData.name,
          originalName: mediaResponse.originalName || mediaData.originalName,
          type: mediaResponse.type || mediaData.type,
          size: mediaResponse.size || mediaData.size,
          url: mediaResponse.url || mediaData.url || resolvedUrl,
          fileId: mediaResponse.fileId || mediaData.fileId,
          duration: mediaResponse.duration || mediaData.duration,
          thumbnailUrl: mediaResponse.thumbnailUrl || undefined,
          userId: mediaResponse.userId || mediaData.userId
        } as MediaFile);
        
        setUploadProgress(((i + 1) / files.length) * 100);
      }

      // Add to local state (prepend to show newest first)
      setMediaFiles(prev => [...uploadedFiles, ...prev]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFile = async (file: MediaFile) => {
    try {
      // Delete from database
      await appwriteService.deleteMediaFile(file.$id);
      
      // Delete from storage
      await storage.deleteFile(STORAGE_BUCKET_ID, file.fileId);
      
      // Remove from local state
      setMediaFiles(prev => prev.filter(f => f.$id !== file.$id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      default: return FileText;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-6">
  <div className="flex items-center space-x-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      className="lg:hidden"
    >
      <Menu className="w-5 h-5" />
    </Button>
    <div>
      <h1 className="text-2xl font-semibold">Media Library</h1>
      <p className="text-muted-foreground">
        {mediaFiles.length} files • {formatFileSize(mediaFiles.reduce((acc, file) => acc + file.size, 0))} total
      </p>
    </div>
  </div>

  <div>
    <Button className="bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden">
      <Plus className="w-4 h-4 mr-2" />
      Upload Media
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </Button>
  </div>
</div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={selectedType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              All
            </Button>
            <Button
              variant={selectedType === 'image' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('image')}
            >
              <ImageIcon className="w-4 h-4 mr-1" />
              Images
            </Button>
            <Button
              variant={selectedType === 'video' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('video')}
            >
              <Video className="w-4 h-4 mr-1" />
              Videos
            </Button>
          </div>
          <div className="flex space-x-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        {mediaFiles.length === 0 && !loading && (
  <div
    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
      dragActive ? 'border-primary bg-accent' : 'border-muted-foreground/25'
    }`}
    onDragEnter={handleDrag}
    onDragLeave={handleDrag}
    onDragOver={handleDrag}
    onDrop={handleDrop}
  >
    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
    <h3 className="text-lg font-medium mb-2">Upload your first media files</h3>
    <p className="text-muted-foreground mb-4">
      Drag and drop images or videos here, or browse to select files
    </p>

    <Button variant="outline" className="relative overflow-hidden">
      <Upload className="w-4 h-4 mr-2" />
      Browse Files
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </Button>
  </div>
)}

        {/* Upload Progress */}
        {uploading && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Upload className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Uploading files...</span>
                    <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Media Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file) => {
              const Icon = getFileIcon(file.type);
              return (
                <Card key={file.$id} className="group hover:shadow-lg transition-all duration-200">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-lg relative overflow-hidden">
                    {file.type === 'image' ? (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                        // onError={(e) => {
                        //   // fallback: if the image fails to load, replace with a placeholder
                        //   (e.currentTarget as HTMLImageElement).src = '/placeholder-image.png';
                        // }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Video className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedFile(file)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => deleteFile(file)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 right-2 bg-black/50 text-white border-0"
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {file.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate mb-1">{file.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{formatDate(file.$createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Size</th>
                      <th className="text-left p-4 font-medium">Created</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => {
                      const Icon = getFileIcon(file.type);
                      return (
                        <tr key={file.$id} className="border-b hover:bg-accent/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                                <Icon className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{file.originalName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize">
                              {file.type}
                            </Badge>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {formatDate(file.$createdAt)}
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSelectedFile(file)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteFile(file)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && filteredFiles.length === 0 && mediaFiles.length > 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No files found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Overlay blur when dialog is open */}
      {(!!selectedFile || uploading) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      )}

      {/* File Preview Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl z-50">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <div className="aspect-video bg-accent rounded-lg overflow-hidden">
                {selectedFile.type === 'image' ? (
                  <img 
                    src={selectedFile.url} 
                    alt={selectedFile.name}
                    className="w-full h-full object-contain"
                    // onError={(e) => {
                    //   (e.currentTarget as HTMLImageElement).src = '/placeholder-image.png';
                    // }}
                  />
                ) : (
                  <video 
                    src={selectedFile.url} 
                    controls
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Original Name:</span>
                  <p className="font-medium">{selectedFile.originalName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">File Size:</span>
                  <p className="font-medium">{formatFileSize(selectedFile.size)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium capitalize">{selectedFile.type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">{formatDate(selectedFile.$createdAt)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
