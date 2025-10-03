// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Calendar } from '@/components/ui/calendar';
// import { useAuth } from '@/lib/Authcontexts';
// import { appwriteService } from '@/lib/appwrites';
// import { Query, ID } from 'appwrite';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { 
//   Menu, 
//   Plus, 
//   Search, 
//   List, 
//   Image as ImageIcon, 
//   Video, 
//   Clock, 
//   Calendar as CalendarIcon,
//   Play,
//   Pause,
//   Trash2,
//   Edit,
//   Copy,
//   Settings,
//   GripVertical,
//   Monitor
// } from 'lucide-react';

// interface PlaylistManagerProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// interface MediaFile {
//   $id: string;
//   name: string;
//   type: 'image' | 'video';
//   url: string;
//   duration?: number;
//   size: number;
// }

// interface PlaylistItem {
//   id: string;
//   mediaId: string;
//   media: MediaFile;
//   duration: number;
//   order: number;
// }

// interface Playlist {
//   $id: string;
//   $createdAt: string;
//   name: string;
//   description: string;
//   items: PlaylistItem[];
//   totalDuration: number;
//   isActive: boolean;
//   schedule: {
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//     days: string[];
//   };
//   assignedScreens: string[];
//   userId: string;
// }

// export function PlaylistManager({ sidebarCollapsed, setSidebarCollapsed }: PlaylistManagerProps) {
//   // Mock user data for demo
//   const user = {
//     name: 'Demo User',
//     $id: 'demo_user_id'
//   };
//   const [playlists, setPlaylists] = useState<Playlist[]>([]);
//   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showCreateDialog, setShowCreateDialog] = useState(false);
//   const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
//   const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([]);
//   const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     startDate: new Date(),
//     endDate: new Date(),
//     startTime: '09:00',
//     endTime: '17:00',
//     days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
//     isActive: true
//   });

//   useEffect(() => {
//     if (user) {
//       loadData();
//     }
//   }, [user]);

//   const loadData = async () => {
//     try {
//       setLoading(true);
      
//       // Mock data for demo
//       setTimeout(() => {
//         const mockMediaFiles: MediaFile[] = [
//           {
//             $id: 'demo_media_1',
//             name: 'Welcome Banner',
//             type: 'image',
//             url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
//             size: 2048576
//           },
//           {
//             $id: 'demo_media_2',
//             name: 'Product Showcase',
//             type: 'video',
//             url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
//             size: 15728640,
//             duration: 30
//           },
//           {
//             $id: 'demo_media_3',
//             name: 'Store Hours',
//             type: 'image',
//             url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
//             size: 1024000
//           }
//         ];

//         const mockPlaylists: Playlist[] = [
//           {
//             $id: 'demo_playlist_1',
//             $createdAt: new Date().toISOString(),
//             name: 'Morning Announcements',
//             description: 'Daily morning content for lobby display',
//             items: [
//               {
//                 id: 'item_1',
//                 mediaId: 'demo_media_1',
//                 media: mockMediaFiles[0],
//                 duration: 15,
//                 order: 0
//               }
//             ],
//             totalDuration: 15,
//             isActive: true,
//             schedule: {
//               startDate: new Date().toISOString(),
//               endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
//               startTime: '08:00',
//               endTime: '12:00',
//               days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
//             },
//             assignedScreens: ['demo_screen_1'],
//             userId: user.$id
//           }
//         ];

//         setMediaFiles(mockMediaFiles);
//         setPlaylists(mockPlaylists);
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Error loading data:', error);
//       setLoading(false);
//     }
//   };

//   const handleCreatePlaylist = () => {
//     setEditingPlaylist(null);
//     setFormData({
//       name: '',
//       description: '',
//       startDate: new Date(),
//       endDate: new Date(),
//       startTime: '09:00',
//       endTime: '17:00',
//       days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
//       isActive: true
//     });
//     setPlaylistItems([]);
//     setShowCreateDialog(true);
//   };

//   const handleEditPlaylist = (playlist: Playlist) => {
//     setEditingPlaylist(playlist);
//     setFormData({
//       name: playlist.name,
//       description: playlist.description,
//       startDate: new Date(playlist.schedule.startDate),
//       endDate: new Date(playlist.schedule.endDate),
//       startTime: playlist.schedule.startTime,
//       endTime: playlist.schedule.endTime,
//       days: playlist.schedule.days,
//       isActive: playlist.isActive
//     });
//     setPlaylistItems(playlist.items || []);
//     setShowCreateDialog(true);
//   };

//   const handleSavePlaylist = async () => {
//     try {
//       const totalDuration = playlistItems.reduce((acc, item) => acc + item.duration, 0);
      
//       const playlistData = {
//         $id: editingPlaylist?.$id || `demo_playlist_${Date.now()}`,
//         $createdAt: editingPlaylist?.$createdAt || new Date().toISOString(),
//         name: formData.name,
//         description: formData.description,
//         items: playlistItems,
//         totalDuration,
//         isActive: formData.isActive,
//         schedule: {
//           startDate: formData.startDate.toISOString(),
//           endDate: formData.endDate.toISOString(),
//           startTime: formData.startTime,
//           endTime: formData.endTime,
//           days: formData.days
//         },
//         assignedScreens: editingPlaylist?.assignedScreens || [],
//         userId: user.$id
//       };

//       // Mock save - update local state
//       if (editingPlaylist) {
//         setPlaylists(prev => prev.map(p => p.$id === editingPlaylist.$id ? playlistData : p));
//       } else {
//         setPlaylists(prev => [playlistData, ...prev]);
//       }

//       setShowCreateDialog(false);
//     } catch (error) {
//       console.error('Error saving playlist:', error);
//     }
//   };

//   const handleDeletePlaylist = async (playlistId: string) => {
//     try {
//       // Mock delete - remove from local state
//       setPlaylists(prev => prev.filter(p => p.$id !== playlistId));
//     } catch (error) {
//       console.error('Error deleting playlist:', error);
//     }
//   };

//   const handleAddMediaToPlaylist = (media: MediaFile) => {
//     const newItem: PlaylistItem = {
//       id: ID.unique(),
//       mediaId: media.$id,
//       media,
//       duration: media.type === 'image' ? 10 : 30, // Default durations
//       order: playlistItems.length
//     };
//     setPlaylistItems([...playlistItems, newItem]);
//   };

//   const handleRemoveMediaFromPlaylist = (itemId: string) => {
//     setPlaylistItems(playlistItems.filter(item => item.id !== itemId));
//   };

//   const handleDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const items = Array.from(playlistItems);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     // Update order
//     const updatedItems = items.map((item, index) => ({
//       ...item,
//       order: index
//     }));

//     setPlaylistItems(updatedItems);
//   };

//   const updateItemDuration = (itemId: string, duration: number) => {
//     setPlaylistItems(playlistItems.map(item => 
//       item.id === itemId ? { ...item, duration } : item
//     ));
//   };

//   const formatDuration = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const filteredPlaylists = playlists.filter(playlist =>
//     playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const availableMedia = mediaFiles.filter(media => 
//     !playlistItems.some(item => item.mediaId === media.$id)
//   );

//   return (
//     <div className="flex-1 overflow-auto">
//       {/* Header */}
//       <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
//         <div className="flex items-center justify-between p-6">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="lg:hidden"
//             >
//               <Menu className="w-5 h-5" />
//             </Button>
//             <div>
//               <h1 className="text-2xl font-semibold">Playlists</h1>
//               <p className="text-muted-foreground">{playlists.length} playlists • {playlists.filter(p => p.isActive).length} active</p>
//             </div>
//           </div>
//           <Button 
//             onClick={handleCreatePlaylist}
//             className="bg-purple-600 text-white"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             New Playlist
//           </Button>
//         </div>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//           <Input
//             placeholder="Search playlists..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         {/* Playlists Grid */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <Card key={i} className="animate-pulse">
//                 <CardHeader>
//                   <div className="h-4 bg-muted rounded w-3/4 mb-2" />
//                   <div className="h-3 bg-muted rounded w-1/2" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-20 bg-muted rounded mb-4" />
//                   <div className="h-3 bg-muted rounded w-full" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : filteredPlaylists.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPlaylists.map((playlist) => (
//               <Card key={playlist.$id} className="group hover:shadow-lg transition-all duration-200">
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <CardTitle className="text-lg">{playlist.name}</CardTitle>
//                       <p className="text-sm text-muted-foreground mt-1">{playlist.description}</p>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <Badge variant={playlist.isActive ? "default" : "secondary"}>
//                         {playlist.isActive ? (
//                           <>
//                             <Play className="w-3 h-3 mr-1" />
//                             Active
//                           </>
//                         ) : (
//                           <>
//                             <Pause className="w-3 h-3 mr-1" />
//                             Inactive
//                           </>
//                         )}
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {/* Preview Items */}
//                     <div className="flex space-x-2">
//                       {playlist.items?.slice(0, 4).map((item, index) => {
//                         const Icon = item.media.type === 'image' ? ImageIcon : Video;
//                         return (
//                           <div key={index} className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
//                             <Icon className="w-5 h-5 text-muted-foreground" />
//                           </div>
//                         );
//                       })}
//                       {playlist.items && playlist.items.length > 4 && (
//                         <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
//                           <span className="text-xs text-muted-foreground">+{playlist.items.length - 4}</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div className="flex items-center space-x-2">
//                         <List className="w-4 h-4 text-muted-foreground" />
//                         <span>{playlist.items?.length || 0} items</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Clock className="w-4 h-4 text-muted-foreground" />
//                         <span>{formatDuration(playlist.totalDuration || 0)}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <CalendarIcon className="w-4 h-4 text-muted-foreground" />
//                         <span>{formatDate(playlist.$createdAt)}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Monitor className="w-4 h-4 text-muted-foreground" />
//                         <span>{playlist.assignedScreens?.length || 0} screens</span>
//                       </div>
//                     </div>

//                     {/* Schedule */}
//                     <div className="text-xs text-muted-foreground">
//                       {playlist.schedule?.startTime} - {playlist.schedule?.endTime} • {playlist.schedule?.days.length} days
//                     </div>

//                     {/* Actions */}
//                     <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Button size="sm" variant="outline" onClick={() => handleEditPlaylist(playlist)}>
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleDeletePlaylist(playlist.$id)}>
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <List className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium mb-2">No playlists yet</h3>
//             <p className="text-muted-foreground mb-4">Create your first playlist to start scheduling content</p>
//             <Button onClick={handleCreatePlaylist}>
//               <Plus className="w-4 h-4 mr-2" />
//               Create Playlist
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Create/Edit Playlist Dialog */}
//       <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-background/80 backdrop-blur-md shadow-xl border">
//           <DialogHeader>
//             <DialogTitle>{editingPlaylist ? 'Edit Playlist' : 'Create New Playlist'}</DialogTitle>
//           </DialogHeader>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Basic Info */}
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Playlist Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   placeholder="Enter playlist name"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   placeholder="Enter playlist description"
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   checked={formData.isActive}
//                   onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
//                 />
//                 <Label>Active</Label>
//               </div>

//               {/* Schedule */}
//               <div className="space-y-4">
//                 <h3 className="font-medium">Schedule</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label>Start Time</Label>
//                     <Input
//                       type="time"
//                       value={formData.startTime}
//                       onChange={(e) => setFormData({...formData, startTime: e.target.value})}
//                     />
//                   </div>
//                   <div>
//                     <Label>End Time</Label>
//                     <Input
//                       type="time"
//                       value={formData.endTime}
//                       onChange={(e) => setFormData({...formData, endTime: e.target.value})}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Days of Week</Label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
//                       <Button
//                         key={day}
//                         size="sm"
//                         variant={formData.days.includes(day) ? "default" : "outline"}
//                         onClick={() => {
//                           const newDays = formData.days.includes(day)
//                             ? formData.days.filter(d => d !== day)
//                             : [...formData.days, day];
//                           setFormData({...formData, days: newDays});
//                         }}
//                       >
//                         {day.charAt(0).toUpperCase() + day.slice(1, 3)}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Media Selection & Playlist Builder */}
//             <div className="space-y-4">
//               <h3 className="font-medium">Available Media</h3>
//               <div className="max-h-40 overflow-y-auto border rounded-lg p-4">
//                 {availableMedia.length > 0 ? (
//                   <div className="grid grid-cols-2 gap-2">
//                     {availableMedia.map((media) => {
//                       const Icon = media.type === 'image' ? ImageIcon : Video;
//                       return (
//                         <Button
//                           key={media.$id}
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleAddMediaToPlaylist(media)}
//                           className="justify-start"
//                         >
//                           <Icon className="w-4 h-4 mr-2" />
//                           <span className="truncate">{media.name}</span>
//                         </Button>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-muted-foreground text-center">No available media files</p>
//                 )}
//               </div>

//               <h3 className="font-medium">Playlist Items ({playlistItems.length})</h3>
//               <div className="max-h-60 overflow-y-auto border rounded-lg p-4">
//                 <DragDropContext onDragEnd={handleDragEnd}>
//                   <Droppable droppableId="playlist">
//                     {(provided) => (
//                       <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
//                         {playlistItems.map((item, index) => (
//                           <Draggable key={item.id} draggableId={item.id} index={index}>
//                             {(provided) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 className="flex items-center space-x-3 p-3 bg-accent rounded-lg"
//                               >
//                                 <div {...provided.dragHandleProps}>
//                                   <GripVertical className="w-4 h-4 text-muted-foreground" />
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="font-medium text-sm">{item.media.name}</p>
//                                   <div className="flex items-center space-x-2">
//                                     <Input
//                                       type="number"
//                                       value={item.duration}
//                                       onChange={(e) => updateItemDuration(item.id, parseInt(e.target.value) || 0)}
//                                       className="w-20 h-8"
//                                       min="1"
//                                     />
//                                     <span className="text-xs text-muted-foreground">seconds</span>
//                                   </div>
//                                 </div>
//                                 <Button
//                                   size="sm"
//                                   variant="ghost"
//                                   onClick={() => handleRemoveMediaFromPlaylist(item.id)}
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                 </DragDropContext>
//                 {playlistItems.length === 0 && (
//                   <p className="text-muted-foreground text-center py-8">
//                     No items in playlist. Add media from the available files above.
//                   </p>
//                 )}
//               </div>

//               {playlistItems.length > 0 && (
//                 <div className="text-sm text-muted-foreground">
//                   Total Duration: {formatDuration(playlistItems.reduce((acc, item) => acc + item.duration, 0))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end space-x-2 pt-4 border-t">
//             <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
//               Cancel
//             </Button>
//             <Button 
//               onClick={handleSavePlaylist}
//               disabled={!formData.name || playlistItems.length === 0}
//             >
//               {editingPlaylist ? 'Update' : 'Create'} Playlist
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react'; 
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import { useAuth } from '@/lib/Authcontexts';
// import { appwriteService } from '@/lib/appwrites';
// import { Query, ID } from 'appwrite';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { 
//   Menu, Plus, Search, List, Image as ImageIcon, Video, Clock, 
//   Calendar as CalendarIcon, Play, Pause, Trash2, Edit, GripVertical, Monitor
// } from 'lucide-react';

// interface PlaylistManagerProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// interface MediaFile {
//   $id: string;
//   name: string;
//   type: 'image' | 'video';
//   url: string;
//   duration?: number;
//   size: number;
// }

// interface PlaylistItem {
//   id: string;
//   mediaId: string;
//   media: MediaFile;
//   duration: number;
//   order: number;
// }

// interface Playlist {
//   $id: string;
//   $createdAt: string;
//   name: string;
//   description: string;
//   items: PlaylistItem[];
//   totalDuration: number;
//   isActive: boolean;
//   schedule: {
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//     days: string[];
//   };
//   assignedScreens: string[];
//   userId: string;
// }

// export function PlaylistManager({ sidebarCollapsed, setSidebarCollapsed }: PlaylistManagerProps) {
//   const { user } = useAuth();

//   const [playlists, setPlaylists] = useState<Playlist[]>([]);
//   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showCreateDialog, setShowCreateDialog] = useState(false);
//   const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
//   const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     startDate: new Date(),
//     endDate: new Date(),
//     startTime: '09:00',
//     endTime: '17:00',
//     days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
//     isActive: true
//   });

//   // 📌 Parse stored JSON safely
//   const safeParse = <T,>(val: any, fallback: T): T => {
//     try {
//       if (!val) return fallback;
//       if (typeof val === 'string') return JSON.parse(val) as T;
//       return val as T;
//     } catch {
//       return fallback;
//     }
//   };

//   useEffect(() => {
//     if (!user?.$id) return;

//     let cancelled = false;

//     const loadData = async () => {
//       try {
//         setLoading(true);

//         const [mediaResp, playlistResp] = await Promise.all([
//           appwriteService.getMediaFiles(user.$id).catch(() => ({ documents: [] })),
//           appwriteService.getPlaylists(user.$id).catch(() => ({ documents: [] }))
//         ]);

//         const mediaDocs = mediaResp?.documents ?? [];
//         const playlistDocs = playlistResp?.documents ?? [];

//         const resolvedMediaFiles: MediaFile[] = mediaDocs.map((doc: any) => ({
//           $id: doc.$id,
//           name: doc.name ?? 'Untitled',
//           type: doc.type ?? 'image',
//           url: doc.url ?? '',
//           duration: doc.duration ?? 10,
//           size: doc.size ?? 0,
//         }));

//         if (cancelled) return;
//         setMediaFiles(resolvedMediaFiles);

//         const mappedPlaylists: Playlist[] = (playlistDocs as any[]).map((doc: any) => {
//           // parse items
//           const parsedItems = safeParse<PlaylistItem[]>(doc.items, []);
//           const items: PlaylistItem[] = parsedItems.map((it, idx) => {
//             const found = resolvedMediaFiles.find(m => m.$id === it.mediaId);
//             return {
//               ...it,
//               media: found ?? it.media,
//               order: typeof it.order === 'number' ? it.order : idx,
//             };
//           });

//           // parse schedule
//           const parsedSchedule = safeParse(doc.schedule, {
//             startDate: new Date().toISOString(),
//             endDate: new Date().toISOString(),
//             startTime: '09:00',
//             endTime: '17:00',
//             days: [] as string[],
//           });

//           const totalDuration = doc.totalDuration ?? items.reduce((a, b) => a + (b.duration || 0), 0);

//           return {
//             $id: doc.$id,
//             $createdAt: doc.$createdAt ?? new Date().toISOString(),
//             name: doc.name ?? 'Untitled Playlist',
//             description: doc.description ?? '',
//             items,
//             totalDuration,
//             isActive: doc.isActive ?? true,
//             schedule: {
//               ...parsedSchedule,
//               days: parsedSchedule.days || []  // ✅ always array
//             },
//             assignedScreens: Array.isArray(doc.assignedScreens) ? doc.assignedScreens : [], // ✅ always array
//             userId: doc.userId ?? user.$id,
//           };
//         });

//         if (cancelled) return;
//         setPlaylists(mappedPlaylists);
//       } catch (err) {
//         console.error('Error loading data:', err);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     loadData();
//     return () => { cancelled = true; };
//   }, [user?.$id]);

//   const handleCreatePlaylist = () => {
//     setEditingPlaylist(null);
//     setFormData({
//       name: '',
//       description: '',
//       startDate: new Date(),
//       endDate: new Date(),
//       startTime: '09:00',
//       endTime: '17:00',
//       days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
//       isActive: true,
//     });
//     setPlaylistItems([]);
//     setShowCreateDialog(true);
//   };

//   const handleEditPlaylist = (playlist: Playlist) => {
//     setEditingPlaylist(playlist);
//     setFormData({
//       name: playlist.name,
//       description: playlist.description,
//       startDate: new Date(playlist.schedule.startDate),
//       endDate: new Date(playlist.schedule.endDate),
//       startTime: playlist.schedule.startTime,
//       endTime: playlist.schedule.endTime,
//       days: playlist.schedule.days || [], // ✅ safe default
//       isActive: playlist.isActive,
//     });
//     setPlaylistItems(playlist.items);
//     setShowCreateDialog(true);
//   };

//   const handleSavePlaylist = async () => {
//     try {
//       if (!user) throw new Error("Not authenticated");

//       const totalDuration = playlistItems.reduce(
//         (acc, item) => acc + (item.duration || 0),
//         0
//       );

//       const scheduleData = {
//         startDate: formData.startDate?.toISOString?.() || "",
//         endDate: formData.endDate?.toISOString?.() || "",
//         startTime: formData.startTime || "",
//         endTime: formData.endTime || "",
//         days: formData.days || []
//       };

//       const payload = {
//         $id: editingPlaylist?.$id || `playlist_${Date.now()}`,
//         $createdAt: editingPlaylist?.$createdAt || new Date().toISOString(),
//         name: formData.name,
//         description: formData.description,
//         items: playlistItems, // ✅ store as array of objects
//         totalDuration,
//         isActive: formData.isActive,
//         schedule: scheduleData, // ✅ store as object
//         assignedScreens: editingPlaylist?.assignedScreens || [], // ✅ always array
//         userId: user?.$id ?? "unknown"
//       };

//       if (editingPlaylist) {
//         setPlaylists((prev) =>
//           prev.map((p) => (p.$id === editingPlaylist.$id ? (payload as Playlist) : p))
//         );
//         await appwriteService.updatePlaylist(payload.$id, {
//           ...payload,
//           items: JSON.stringify(payload.items),
//           schedule: JSON.stringify(payload.schedule),
//         });
//       } else {
//         setPlaylists((prev) => [payload as Playlist, ...prev]);
//         await appwriteService.createPlaylist({
//           ...payload,
//           items: JSON.stringify(payload.items),
//           schedule: JSON.stringify(payload.schedule),
//         });
//       }

//       setShowCreateDialog(false);
//     } catch (error) {
//       console.error("Error saving playlist:", error);
//     }
//   };

  

//   const handleDeletePlaylist = async (playlistId: string) => {
//     try {
//       // optionally call appwriteService.deletePlaylist(playlistId)
//       setPlaylists(prev => prev.filter(p => p.$id !== playlistId));
//     } catch (error) {
//       console.error('Error deleting playlist:', error);
//     }
//   };

//   const handleAddMediaToPlaylist = (media: MediaFile) => {
//     const newItem: PlaylistItem = {
//       id: ID.unique(),
//       mediaId: media.$id,
//       media,
//       duration: media.type === 'image' ? 10 : 30, // Default durations
//       order: playlistItems.length
//     };
//     setPlaylistItems(prev => [...prev, newItem]);
//   };

//   const handleRemoveMediaFromPlaylist = (itemId: string) => {
//     setPlaylistItems(prev => prev.filter(item => item.id !== itemId));
//   };

//   const handleDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const items = Array.from(playlistItems);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     // Update order
//     const updatedItems = items.map((item, index) => ({
//       ...item,
//       order: index
//     }));

//     setPlaylistItems(updatedItems);
//   };

//   const updateItemDuration = (itemId: string, duration: number) => {
//     setPlaylistItems(prev => prev.map(item =>
//       item.id === itemId ? { ...item, duration } : item
//     ));
//   };

//   const formatDuration = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const filteredPlaylists = playlists.filter(playlist =>
//     playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const availableMedia = mediaFiles.filter(media =>
//     !playlistItems.some(item => item.mediaId === media.$id)
//   );

//   return (
//     <div className="flex-1 overflow-auto">
//       {/* Header */}
//       <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
//         <div className="flex items-center justify-between p-6">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="lg:hidden"
//             >
//               <Menu className="w-5 h-5" />
//             </Button>
//             <div>
//               <h1 className="text-2xl font-semibold">Playlists</h1>
//               <p className="text-muted-foreground">{playlists.length} playlists • {playlists.filter(p => p.isActive).length} active</p>
//             </div>
//           </div>
//           <Button 
//             onClick={handleCreatePlaylist}
//             className="bg-purple-600 text-white"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             New Playlist
//           </Button>
//         </div>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//           <Input
//             placeholder="Search playlists..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         {/* Playlists Grid */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <Card key={i} className="animate-pulse">
//                 <CardHeader>
//                   <div className="h-4 bg-muted rounded w-3/4 mb-2" />
//                   <div className="h-3 bg-muted rounded w-1/2" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-20 bg-muted rounded mb-4" />
//                   <div className="h-3 bg-muted rounded w-full" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : filteredPlaylists.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPlaylists.map((playlist) => (
//               <Card key={playlist.$id} className="group hover:shadow-lg transition-all duration-200">
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <CardTitle className="text-lg">{playlist.name}</CardTitle>
//                       <p className="text-sm text-muted-foreground mt-1">{playlist.description}</p>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <Badge variant={playlist.isActive ? "default" : "secondary"}>
//                         {playlist.isActive ? (
//                           <>
//                             <Play className="w-3 h-3 mr-1" />
//                             Active
//                           </>
//                         ) : (
//                           <>
//                             <Pause className="w-3 h-3 mr-1" />
//                             Inactive
//                           </>
//                         )}
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {/* Preview Items */}

//                     <div className="flex space-x-2">
//                       {/* {playlist.items?.slice(0, 4).map((item, index) => {
//                         const Icon = item.media.type === 'image' ? ImageIcon : Video;
//                         return (
//                           <div key={index} className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
//                             <Icon className="w-5 h-5 text-muted-foreground" />
//                           </div>
//                         );
//                       })} */}
//             {playlist.items?.slice(0, 4).map((item, index) => {
//   // make sure item is parsed correctly
//   const parsedItem = typeof item === "string" ? JSON.parse(item) : item;

//   // fallback if no media attached
//   const isImage = parsedItem.media?.type === "image";

//   const Icon = isImage ? ImageIcon : Video;

//   return (
//     <div key={index} className="...">
//       <Icon className="w-5 h-5" />
//     </div>
//   );
// })}

//                       {playlist.items && playlist.items.length > 4 && (
//                         <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
//                           <span className="text-xs text-muted-foreground">+{playlist.items.length - 4}</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div className="flex items-center space-x-2">
//                         <List className="w-4 h-4 text-muted-foreground" />
//                         <span>{playlist.items?.length || 0} items</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Clock className="w-4 h-4 text-muted-foreground" />
//                         <span>{formatDuration(playlist.totalDuration || 0)}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <CalendarIcon className="w-4 h-4 text-muted-foreground" />
//                         <span>{formatDate(playlist.$createdAt)}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Monitor className="w-4 h-4 text-muted-foreground" />
//                         <span>{playlist.assignedScreens?.length || 0} screens</span>
//                       </div>
//                     </div>

//                     {/* Schedule */}
//                     <div className="text-xs text-muted-foreground">
//   {playlist.schedule?.startTime} - {playlist.schedule?.endTime} • {playlist.schedule?.days?.length || 0} days
// </div>

                    

//                     {/* Actions */}
//                     <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Button size="sm" variant="outline" onClick={() => handleEditPlaylist(playlist)}>
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleDeletePlaylist(playlist.$id)}>
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : 
        
        
//         (
//           <div className="text-center py-12">
//             <List className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium mb-2">No playlists yet</h3>
//             <p className="text-muted-foreground mb-4">Create your first playlist to start scheduling content</p>
//             <Button onClick={handleCreatePlaylist}>
//               <Plus className="w-4 h-4 mr-2" />
//               Create Playlist
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Create/Edit Playlist Dialog */}
//       <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-background/80 backdrop-blur-md shadow-xl border">
//           <DialogHeader>
//             <DialogTitle>{editingPlaylist ? 'Edit Playlist' : 'Create New Playlist'}</DialogTitle>
//           </DialogHeader>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Basic Info */}
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Playlist Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   placeholder="Enter playlist name"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   placeholder="Enter playlist description"
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   checked={formData.isActive}
//                   onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
//                 />
//                 <Label>Active</Label>
//               </div>

//               {/* Schedule */}
//               <div className="space-y-4">
//                 <h3 className="font-medium">Schedule</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label>Start Time</Label>
//                     <Input
//                       type="time"
//                       value={formData.startTime}
//                       onChange={(e) => setFormData({...formData, startTime: e.target.value})}
//                     />
//                   </div>
//                   <div>
//                     <Label>End Time</Label>
//                     <Input
//                       type="time"
//                       value={formData.endTime}
//                       onChange={(e) => setFormData({...formData, endTime: e.target.value})}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Days of Week</Label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
//                       <Button
//                         key={day}
//                         size="sm"
//                         variant={formData.days.includes(day) ? "default" : "outline"}
//                         onClick={() => {
//                           const newDays = formData.days.includes(day)
//                             ? formData.days.filter(d => d !== day)
//                             : [...formData.days, day];
//                           setFormData({...formData, days: newDays});
//                         }}
//                       >
//                         {day.charAt(0).toUpperCase() + day.slice(1, 3)}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Media Selection & Playlist Builder */}
//             <div className="space-y-4">
//               <h3 className="font-medium">Available Media</h3>
//               <div className="max-h-40 overflow-y-auto border rounded-lg p-4">
//                 {availableMedia.length > 0 ? (
//                   <div className="grid grid-cols-2 gap-2">
//                     {availableMedia.map((media) => {
//                       const Icon = media.type === 'image' ? ImageIcon : Video;
//                       return (
//                         <Button
//                           key={media.$id}
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleAddMediaToPlaylist(media)}
//                           className="justify-start"
//                         >
//                           <Icon className="w-4 h-4 mr-2" />
//                           <span className="truncate">{media.name}</span>
//                         </Button>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-muted-foreground text-center">No available media files</p>
//                 )}
//               </div>

//               <h3 className="font-medium">Playlist Items ({playlistItems.length})</h3>
//               <div className="max-h-60 overflow-y-auto border rounded-lg p-4">
//                 <DragDropContext onDragEnd={handleDragEnd}>
//                   <Droppable droppableId="playlist">
//                     {(provided) => (
//                       <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
//                         {playlistItems.map((item, index) => (
//                           <Draggable key={item.id} draggableId={item.id} index={index}>
//                             {(provided) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 className="flex items-center space-x-3 p-3 bg-accent rounded-lg"
//                               >
//                                 <div {...provided.dragHandleProps}>
//                                   <GripVertical className="w-4 h-4 text-muted-foreground" />
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="font-medium text-sm">{item.media.name}</p>
//                                   <div className="flex items-center space-x-2">
//                                     <Input
//                                       type="number"
//                                       value={item.duration}
//                                       onChange={(e) => updateItemDuration(item.id, parseInt(e.target.value) || 0)}
//                                       className="w-20 h-8"
//                                       min="1"
//                                     />
//                                     <span className="text-xs text-muted-foreground">seconds</span>
//                                   </div>
//                                 </div>
//                                 <Button
//                                   size="sm"
//                                   variant="ghost"
//                                   onClick={() => handleRemoveMediaFromPlaylist(item.id)}
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                 </DragDropContext>
//                 {playlistItems.length === 0 && (
//                   <p className="text-muted-foreground text-center py-8">
//                     No items in playlist. Add media from the available files above.
//                   </p>
//                 )}
//               </div>

//               {playlistItems.length > 0 && (
//                 <div className="text-sm text-muted-foreground">
//                   Total Duration: {formatDuration(playlistItems.reduce((acc, item) => acc + item.duration, 0))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end space-x-2 pt-4 border-t">
//             <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
//               Cancel
//             </Button>
//             <Button 
//               onClick={handleSavePlaylist}
//               disabled={!formData.name || playlistItems.length === 0}
//             >
//               {editingPlaylist ? 'Update' : 'Create'} Playlist
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// // import React, { useState, useEffect } from 'react'; 
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Badge } from '@/components/ui/badge';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Switch } from '@/components/ui/switch';
// // import { useAuth } from '@/lib/Authcontexts';
// // import { appwriteService } from '@/lib/appwrites';
// // import { ID } from 'appwrite';
// // import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// // import { 
// //   Menu, Plus, Search, List, Image as ImageIcon, Video, Clock, 
// //   Calendar as CalendarIcon, Play, Pause, Trash2, Edit, GripVertical, Monitor
// // } from 'lucide-react';

// // interface PlaylistManagerProps {
// //   sidebarCollapsed: boolean;
// //   setSidebarCollapsed: (collapsed: boolean) => void;
// // }

// // interface MediaFile {
// //   $id: string;
// //   name: string;
// //   type: 'image' | 'video';
// //   url: string;
// //   duration?: number;
// //   size: number;
// // }

// // interface PlaylistItem {
// //   id: string;
// //   mediaId: string;
// //   media: MediaFile;
// //   duration: number;
// //   order: number;
// // }

// // interface Playlist {
// //   $id: string;
// //   $createdAt: string;
// //   name: string;
// //   description: string;
// //   items: PlaylistItem[];
// //   totalDuration: number;
// //   isActive: boolean;
// //   schedule: {
// //     startDate: string;
// //     endDate: string;
// //     startTime: string;
// //     endTime: string;
// //     days: string[];
// //   };
// //   assignedScreens: string[];
// //   userId: string;
// // }

// // interface Screen {
// //   $id: string;
// //   name: string;
// //   location?: string;
// //   pairingCode: string;
// //   status: string;
// //   currentPlaylist?: string | null;
// //   playlistName?: string | null;
// //   userId: string;
// // }

// // export function PlaylistManager({ sidebarCollapsed, setSidebarCollapsed }: PlaylistManagerProps) {
// //   const { user } = useAuth();

// //   const [playlists, setPlaylists] = useState<Playlist[]>([]);
// //   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
// //   const [screens, setScreens] = useState<Screen[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [showCreateDialog, setShowCreateDialog] = useState(false);
// //   const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
// //   const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
// //   const [selectedScreens, setSelectedScreens] = useState<string[]>([]);

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     startDate: new Date(),
// //     endDate: new Date(),
// //     startTime: '09:00',
// //     endTime: '17:00',
// //     days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
// //     isActive: true
// //   });

// //   // 📌 Parse stored JSON safely
// //   const safeParse = <T,>(val: any, fallback: T): T => {
// //     try {
// //       if (!val) return fallback;
// //       if (typeof val === 'string') return JSON.parse(val) as T;
// //       return val as T;
// //     } catch {
// //       return fallback;
// //     }
// //   };

// //   useEffect(() => {
// //     if (!user?.$id) return;

// //     let cancelled = false;

// //     const loadData = async () => {
// //       try {
// //         setLoading(true);

// //         const [mediaResp, playlistResp, screenResp] = await Promise.all([
// //           appwriteService.getMediaFiles(user.$id).catch(() => ({ documents: [] })),
// //           appwriteService.getPlaylists(user.$id).catch(() => ({ documents: [] })),
// //           appwriteService.getScreens(user.$id).catch(() => ({ documents: [] })),
// //         ]);

// //         const mediaDocs = mediaResp?.documents ?? [];
// //         const playlistDocs = playlistResp?.documents ?? [];
// //         const screenDocs = screenResp?.documents ?? [];

// //         const resolvedMediaFiles: MediaFile[] = mediaDocs.map((doc: any) => ({
// //           $id: doc.$id,
// //           name: doc.name ?? 'Untitled',
// //           type: doc.type ?? 'image',
// //           url: doc.url ?? '',
// //           duration: doc.duration ?? 10,
// //           size: doc.size ?? 0,
// //         }));

// //         if (cancelled) return;
// //         setMediaFiles(resolvedMediaFiles);

// //         const mappedPlaylists: Playlist[] = (playlistDocs as any[]).map((doc: any) => {
// //           // parse items
// //           const parsedItems = safeParse<PlaylistItem[]>(doc.items, []);
// //           const items: PlaylistItem[] = parsedItems.map((it: any, idx: number) => {
// //             const found = resolvedMediaFiles.find(m => m.$id === it.mediaId);
// //             return {
// //               id: it.id ?? ID.unique(),
// //               mediaId: it.mediaId,
// //               media: found ?? (it.media ?? { $id: it.mediaId, name: 'Untitled', type: 'image', url: '', duration: 10, size: 0 }),
// //               duration: typeof it.duration === 'number' ? it.duration : 10,
// //               order: typeof it.order === 'number' ? it.order : idx,
// //             } as PlaylistItem;
// //           });

// //           // parse schedule
// //           const parsedSchedule = safeParse(doc.schedule, {
// //             startDate: new Date().toISOString(),
// //             endDate: new Date().toISOString(),
// //             startTime: '09:00',
// //             endTime: '17:00',
// //             days: [] as string[],
// //           });

// //           const totalDuration = doc.totalDuration ?? items.reduce((a: number, b: PlaylistItem) => a + (b.duration || 0), 0);

// //           return {
// //             $id: doc.$id,
// //             $createdAt: doc.$createdAt ?? new Date().toISOString(),
// //             name: doc.name ?? 'Untitled Playlist',
// //             description: doc.description ?? '',
// //             items,
// //             totalDuration,
// //             isActive: doc.isActive ?? true,
// //             schedule: {
// //               ...parsedSchedule,
// //               days: parsedSchedule.days || []
// //             },
// //             assignedScreens: Array.isArray(doc.assignedScreens) ? doc.assignedScreens : [],
// //             userId: doc.userId ?? user.$id,
// //           } as Playlist;
// //         });

// //         if (cancelled) return;
// //         setPlaylists(mappedPlaylists);

// //         const mappedScreens: Screen[] = (screenDocs as any[]).map((doc: any) => ({
// //           $id: doc.$id,
// //           name: doc.name ?? "Unnamed Screen",
// //           location: doc.location ?? "",
// //           pairingCode: doc.pairingCode ?? "",
// //           status: doc.status ?? "offline",
// //           currentPlaylist: doc.currentPlaylist ?? null,
// //           playlistName: doc.playlistName ?? null,
// //           userId: doc.userId ?? user.$id,
// //         }));

// //         if (cancelled) return;
// //         setScreens(mappedScreens);
// //       } catch (err) {
// //         console.error('Error loading data:', err);
// //       } finally {
// //         if (!cancelled) setLoading(false);
// //       }
// //     };

// //     loadData();
// //     return () => { cancelled = true; };
// //   }, [user?.$id]);

// //   const handleCreatePlaylist = () => {
// //     setEditingPlaylist(null);
// //     setFormData({
// //       name: '',
// //       description: '',
// //       startDate: new Date(),
// //       endDate: new Date(),
// //       startTime: '09:00',
// //       endTime: '17:00',
// //       days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
// //       isActive: true,
// //     });
// //     setPlaylistItems([]);
// //     setSelectedScreens([]);
// //     setShowCreateDialog(true);
// //   };

// //   const handleEditPlaylist = (playlist: Playlist) => {
// //     setEditingPlaylist(playlist);
// //     setFormData({
// //       name: playlist.name,
// //       description: playlist.description,
// //       startDate: new Date(playlist.schedule.startDate),
// //       endDate: new Date(playlist.schedule.endDate),
// //       startTime: playlist.schedule.startTime,
// //       endTime: playlist.schedule.endTime,
// //       days: playlist.schedule.days || [],
// //       isActive: playlist.isActive,
// //     });
// //     setPlaylistItems(playlist.items || []);
// //     setSelectedScreens(Array.isArray(playlist.assignedScreens) ? [...playlist.assignedScreens] : []);
// //     setShowCreateDialog(true);
// //   };

// //   const handleSavePlaylist = async () => {
// //     try {
// //       if (!user) throw new Error("Not authenticated");

// //       const totalDuration = playlistItems.reduce(
// //         (acc, item) => acc + (item.duration || 0),
// //         0
// //       );

// //       const scheduleData = {
// //         startDate: formData.startDate?.toISOString?.() || "",
// //         endDate: formData.endDate?.toISOString?.() || "",
// //         startTime: formData.startTime || "",
// //         endTime: formData.endTime || "",
// //         days: formData.days || []
// //       };

// //   const payload = {
// //   $id: editingPlaylist?.$id || `playlist_${Date.now()}`,
// //   $createdAt: editingPlaylist?.$createdAt || new Date().toISOString(),
// //   name: formData.name,
// //   description: formData.description,
// //   items: JSON.stringify(playlistItems),  // stored as string
// //   totalDuration,
// //   isActive: formData.isActive,
// //   schedule: JSON.stringify(scheduleData), // also stringified
// //   assignedScreens: JSON.stringify(selectedScreens || []), // stringify here too
// //   userId: user?.$id ?? "unknown"
// // } as unknown as Playlist;


// //       if (editingPlaylist) {
// //         setPlaylists((prev) =>
// //           prev.map((p) => (p.$id === editingPlaylist.$id ? payload : p))
// //         );
// //         await appwriteService.updatePlaylist(payload.$id, {
// //           ...payload,
// //           items: JSON.stringify(payload.items),
// //           schedule: JSON.stringify(payload.schedule),
// //         });
// //       } else {
// //         setPlaylists((prev) => [payload, ...prev]);
// //         await appwriteService.createPlaylist({
// //           ...payload,
// //           items: JSON.stringify(payload.items),
// //           schedule: JSON.stringify(payload.schedule),
// //         });
// //       }

// //       setShowCreateDialog(false);
// //     } catch (error) {
// //       console.error("Error saving playlist:", error);
// //     }
// //   };

// //   const handleDeletePlaylist = async (playlistId: string) => {
// //     try {
// //       // Optimistically remove from UI
// //       setPlaylists(prev => prev.filter(p => p.$id !== playlistId));
// //       // try to delete from backend
// //       if (appwriteService.deletePlaylist) {
// //         await appwriteService.deletePlaylist(playlistId).catch(err => console.error('delete error', err));
// //       }
// //     } catch (error) {
// //       console.error('Error deleting playlist:', error);
// //     }
// //   };

// //   const handleAddMediaToPlaylist = (media: MediaFile) => {
// //     const newItem: PlaylistItem = {
// //       id: ID.unique(),
// //       mediaId: media.$id,
// //       media,
// //       duration: media.type === 'image' ? 10 : 30, // Default durations
// //       order: playlistItems.length
// //     };
// //     setPlaylistItems(prev => [...prev, newItem]);
// //   };

// //   const handleRemoveMediaFromPlaylist = (itemId: string) => {
// //     setPlaylistItems(prev => prev.filter(item => item.id !== itemId));
// //   };

// //   const handleDragEnd = (result: any) => {
// //     if (!result.destination) return;

// //     const items = Array.from(playlistItems);
// //     const [reorderedItem] = items.splice(result.source.index, 1);
// //     items.splice(result.destination.index, 0, reorderedItem);

// //     // Update order
// //     const updatedItems = items.map((item, index) => ({
// //       ...item,
// //       order: index
// //     }));

// //     setPlaylistItems(updatedItems);
// //   };

// //   const updateItemDuration = (itemId: string, duration: number) => {
// //     setPlaylistItems(prev => prev.map(item =>
// //       item.id === itemId ? { ...item, duration } : item
// //     ));
// //   };

// //   const formatDuration = (seconds: number) => {
// //     const minutes = Math.floor(seconds / 60);
// //     const remainingSeconds = seconds % 60;
// //     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   const filteredPlaylists = playlists.filter(playlist =>
// //     playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const availableMedia = mediaFiles.filter(media =>
// //     !playlistItems.some(item => item.mediaId === media.$id)
// //   );

// //   const toggleScreenSelection = (screenId: string) => {
// //     setSelectedScreens(prev => prev.includes(screenId) ? prev.filter(s => s !== screenId) : [...prev, screenId]);
// //   };

// //   return (
// //     <div className="flex-1 overflow-auto">
// //       {/* Header */}
// //       <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
// //         <div className="flex items-center justify-between p-6">
// //           <div className="flex items-center space-x-4">
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
// //               className="lg:hidden"
// //             >
// //               <Menu className="w-5 h-5" />
// //             </Button>
// //             <div>
// //               <h1 className="text-2xl font-semibold">Playlists</h1>
// //               <p className="text-muted-foreground">{playlists.length} playlists • {playlists.filter(p => p.isActive).length} active</p>
// //             </div>
// //           </div>
// //           <Button 
// //             onClick={handleCreatePlaylist}
// //             className="bg-purple-600 text-white"
// //           >
// //             <Plus className="w-4 h-4 mr-2" />
// //             New Playlist
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="p-6 space-y-6">
// //         {/* Search */}
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
// //           <Input
// //             placeholder="Search playlists..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="pl-10"
// //           />
// //         </div>

// //         {/* Playlists Grid */}
// //         {loading ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {[...Array(6)].map((_, i) => (
// //               <Card key={i} className="animate-pulse">
// //                 <CardHeader>
// //                   <div className="h-4 bg-muted rounded w-3/4 mb-2" />
// //                   <div className="h-3 bg-muted rounded w-1/2" />
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="h-20 bg-muted rounded mb-4" />
// //                   <div className="h-3 bg-muted rounded w-full" />
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         ) : filteredPlaylists.length > 0 ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredPlaylists.map((playlist) => (
// //               <Card key={playlist.$id} className="group hover:shadow-lg transition-all duration-200">
// //                 <CardHeader>
// //                   <div className="flex items-start justify-between">
// //                     <div className="flex-1">
// //                       <CardTitle className="text-lg">{playlist.name}</CardTitle>
// //                       <p className="text-sm text-muted-foreground mt-1">{playlist.description}</p>
// //                     </div>
// //                     <div className="flex items-center space-x-1">
// //                       <Badge variant={playlist.isActive ? "default" : "secondary"}>
// //                         {playlist.isActive ? (
// //                           <>
// //                             <Play className="w-3 h-3 mr-1" />
// //                             Active
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Pause className="w-3 h-3 mr-1" />
// //                             Inactive
// //                           </>
// //                         )}
// //                       </Badge>
// //                     </div>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="space-y-4">
// //                     {/* Preview Items */}

// //                     <div className="flex space-x-2">
// //                       {playlist.items?.slice(0, 4).map((item, index) => {
// //                         const parsedItem = typeof item === "string" ? safeParse<PlaylistItem>(item, null as any) : item;
// //                         const isImage = parsedItem?.media?.type === 'image';
// //                         const Icon = isImage ? ImageIcon : Video;
// //                         return (
// //                           <div key={index} className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
// //                             <Icon className="w-5 h-5 text-muted-foreground" />
// //                           </div>
// //                         );
// //                       })}

// //                       {playlist.items && playlist.items.length > 4 && (
// //                         <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
// //                           <span className="text-xs text-muted-foreground">+{playlist.items.length - 4}</span>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Stats */}
// //                     <div className="grid grid-cols-2 gap-4 text-sm">
// //                       <div className="flex items-center space-x-2">
// //                         <List className="w-4 h-4 text-muted-foreground" />
// //                         <span>{playlist.items?.length || 0} items</span>
// //                       </div>
// //                       <div className="flex items-center space-x-2">
// //                         <Clock className="w-4 h-4 text-muted-foreground" />
// //                         <span>{formatDuration(playlist.totalDuration || 0)}</span>
// //                       </div>
// //                       <div className="flex items-center space-x-2">
// //                         <CalendarIcon className="w-4 h-4 text-muted-foreground" />
// //                         <span>{formatDate(playlist.$createdAt)}</span>
// //                       </div>
// //                       <div className="flex items-center space-x-2">
// //                         <Monitor className="w-4 h-4 text-muted-foreground" />
// //                         <span>{screens.filter(s => s.currentPlaylist === playlist.$id).length} screens</span>
// //                       </div>
// //                     </div>

// //                     {/* Schedule */}
// //                     <div className="text-xs text-muted-foreground">
// //                       {playlist.schedule?.startTime} - {playlist.schedule?.endTime} • {playlist.schedule?.days?.length || 0} days
// //                     </div>

// //                     {/* Actions */}
// //                     <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //                       <Button size="sm" variant="outline" onClick={() => handleEditPlaylist(playlist)}>
// //                         <Edit className="w-4 h-4" />
// //                       </Button>
// //                       <Button size="sm" variant="outline" onClick={() => handleDeletePlaylist(playlist.$id)}>
// //                         <Trash2 className="w-4 h-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-center py-12">
// //             <List className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
// //             <h3 className="text-lg font-medium mb-2">No playlists yet</h3>
// //             <p className="text-muted-foreground mb-4">Create your first playlist to start scheduling content</p>
// //             <Button onClick={handleCreatePlaylist}>
// //               <Plus className="w-4 h-4 mr-2" />
// //               Create Playlist
// //             </Button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Create/Edit Playlist Dialog */}
// //       <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
// //         <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-background/80 backdrop-blur-md shadow-xl border">
// //           <DialogHeader>
// //             <DialogTitle>{editingPlaylist ? 'Edit Playlist' : 'Create New Playlist'}</DialogTitle>
// //           </DialogHeader>
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
// //             {/* Basic Info */}
// //             <div className="space-y-4">
// //               <div>
// //                 <Label htmlFor="name">Playlist Name</Label>
// //                 <Input
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({...formData, name: e.target.value})}
// //                   placeholder="Enter playlist name"
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="description">Description</Label>
// //                 <Textarea
// //                   id="description"
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({...formData, description: e.target.value})}
// //                   placeholder="Enter playlist description"
// //                 />
// //               </div>
// //               <div className="flex items-center space-x-2">
// //                 <Switch
// //                   checked={formData.isActive}
// //                   onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
// //                 />
// //                 <Label>Active</Label>
// //               </div>

// //               {/* Schedule */}
// //               <div className="space-y-4">
// //                 <h3 className="font-medium">Schedule</h3>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <Label>Start Time</Label>
// //                     <Input
// //                       type="time"
// //                       value={formData.startTime}
// //                       onChange={(e) => setFormData({...formData, startTime: e.target.value})}
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label>End Time</Label>
// //                     <Input
// //                       type="time"
// //                       value={formData.endTime}
// //                       onChange={(e) => setFormData({...formData, endTime: e.target.value})}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <Label>Days of Week</Label>
// //                   <div className="flex flex-wrap gap-2 mt-2">
// //                     {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
// //                       <Button
// //                         key={day}
// //                         size="sm"
// //                         variant={formData.days.includes(day) ? "default" : "outline"}
// //                         onClick={() => {
// //                           const newDays = formData.days.includes(day)
// //                             ? formData.days.filter(d => d !== day)
// //                             : [...formData.days, day];
// //                           setFormData({...formData, days: newDays});
// //                         }}
// //                       >
// //                         {day.charAt(0).toUpperCase() + day.slice(1, 3)}
// //                       </Button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Assign Screens */}
// //                 <div>
// //                   <Label>Assign Screens</Label>
// //                   <div className="flex flex-wrap gap-2 mt-2">
// //                     {screens.length > 0 ? (
// //                       screens.map(screen => (
// //                         <Button
// //                           key={screen.$id}
// //                           size="sm"
// //                           variant={selectedScreens.includes(screen.$id) ? "default" : "outline"}
// //                           onClick={() => toggleScreenSelection(screen.$id)}
// //                           className="flex items-center space-x-2"
// //                         >
// //                           <Monitor className="w-4 h-4" />
// //                           <span className="truncate">{screen.name}</span>
// //                         </Button>
// //                       ))
// //                     ) : (
// //                       <p className="text-muted-foreground">No screens available</p>
// //                     )}
// //                   </div>
// //                 </div>

// //               </div>
// //             </div>

// //             {/* Media Selection & Playlist Builder */}
// //             <div className="space-y-4">
// //               <h3 className="font-medium">Available Media</h3>
// //               <div className="max-h-40 overflow-y-auto border rounded-lg p-4">
// //                 {availableMedia.length > 0 ? (
// //                   <div className="grid grid-cols-2 gap-2">
// //                     {availableMedia.map((media) => {
// //                       const Icon = media.type === 'image' ? ImageIcon : Video;
// //                       return (
// //                         <Button
// //                           key={media.$id}
// //                           variant="outline"
// //                           size="sm"
// //                           onClick={() => handleAddMediaToPlaylist(media)}
// //                           className="justify-start"
// //                         >
// //                           <Icon className="w-4 h-4 mr-2" />
// //                           <span className="truncate">{media.name}</span>
// //                         </Button>
// //                       );
// //                     })}
// //                   </div>
// //                 ) : (
// //                   <p className="text-muted-foreground text-center">No available media files</p>
// //                 )}
// //               </div>

// //               <h3 className="font-medium">Playlist Items ({playlistItems.length})</h3>
// //               <div className="max-h-60 overflow-y-auto border rounded-lg p-4">
// //                 <DragDropContext onDragEnd={handleDragEnd}>
// //                   <Droppable droppableId="playlist">
// //                     {(provided) => (
// //                       <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
// //                         {playlistItems.map((item, index) => (
// //                           <Draggable key={item.id} draggableId={item.id} index={index}>
// //                             {(provided) => (
// //                               <div
// //                                 ref={provided.innerRef}
// //                                 {...provided.draggableProps}
// //                                 className="flex items-center space-x-3 p-3 bg-accent rounded-lg"
// //                               >
// //                                 <div {...provided.dragHandleProps}>
// //                                   <GripVertical className="w-4 h-4 text-muted-foreground" />
// //                                 </div>
// //                                 <div className="flex-1">
// //                                   <p className="font-medium text-sm">{item.media?.name}</p>
// //                                   <div className="flex items-center space-x-2">
// //                                     <Input
// //                                       type="number"
// //                                       value={item.duration}
// //                                       onChange={(e) => updateItemDuration(item.id, parseInt(e.target.value) || 0)}
// //                                       className="w-20 h-8"
// //                                       min="1"
// //                                     />
// //                                     <span className="text-xs text-muted-foreground">seconds</span>
// //                                   </div>
// //                                 </div>
// //                                 <Button
// //                                   size="sm"
// //                                   variant="ghost"
// //                                   onClick={() => handleRemoveMediaFromPlaylist(item.id)}
// //                                 >
// //                                   <Trash2 className="w-4 h-4" />
// //                                 </Button>
// //                               </div>
// //                             )}
// //                           </Draggable>
// //                         ))}
// //                         {provided.placeholder}
// //                       </div>
// //                     )}
// //                   </Droppable>
// //                 </DragDropContext>
// //                 {playlistItems.length === 0 && (
// //                   <p className="text-muted-foreground text-center py-8">
// //                     No items in playlist. Add media from the available files above.
// //                   </p>
// //                 )}
// //               </div>

// //               {playlistItems.length > 0 && (
// //                 <div className="text-sm text-muted-foreground">
// //                   Total Duration: {formatDuration(playlistItems.reduce((acc, item) => acc + item.duration, 0))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex justify-end space-x-2 pt-4 border-t">
// //             <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
// //               Cancel
// //             </Button>
// //             <Button 
// //               onClick={handleSavePlaylist}
// //               disabled={!formData.name || playlistItems.length === 0}
// //             >
// //               {editingPlaylist ? 'Update' : 'Create'} Playlist
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // }

// // export default PlaylistManager;


import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/lib/Authcontexts';
import { appwriteService } from '@/lib/appwrites';
import { Query, ID } from 'appwrite';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Menu, Plus, Search, List, Image as ImageIcon, Video, Clock,
  Calendar as CalendarIcon, Play, Pause, Trash2, Edit, GripVertical, Monitor, QrCode
} from 'lucide-react';

// ---------- Types ----------
interface PlaylistManagerProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface MediaFile {
  $id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  duration?: number;
  size: number;
}

interface PlaylistItem {
  id: string;
  mediaId: string;
  media: MediaFile | any;
  duration: number;
  order: number;
}

interface Playlist {
  $id: string;
  $createdAt: string;
  name: string;
  description: string;
  items: PlaylistItem[];
  totalDuration: number;
  isActive: boolean;
  schedule: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    days: string[];
  };
  assignedScreens: string[]; // keep as array
  userId: string;
}

interface Screen {
  $id: string;
  $createdAt?: string;
  name: string;
  location: string;
  pairingCode: string;
  status: 'online' | 'offline' | 'error';
  currentPlaylist?: string | null;
  playlistName?: string | null;
  lastSeen?: string;
  deviceInfo?: any;
  userId: string;
}

// ---------- Component ----------
export  function PlaylistManager({ sidebarCollapsed, setSidebarCollapsed }: PlaylistManagerProps) {
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

  const [formData, setFormData] = useState(() => ({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '09:00',
    endTime: '17:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as string[],
    isActive: true,
  }));

  // Safe parse helper - accepts JSON string or already-parsed objects
  const safeParse = <T,>(val: any, fallback: T): T => {
    try {
      if (val === undefined || val === null) return fallback;
      if (typeof val === 'string') return JSON.parse(val) as T;
      return val as T;
    } catch (err) {
      return fallback;
    }
  };

  // Normalize assignedScreens field (server might store as string or array)
  const normalizeAssignedScreens = (raw: any): string[] => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        // fallback: try comma separated
        return raw.split(',').map((s) => s.trim()).filter(Boolean);
      } catch {
        return raw.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }
    return [];
  };

  // Load playlists, media and screens from server
  const loadData = async () => {
    if (!user?.$id) return;
    setLoading(true);
    try {
      const [mediaResp, playlistResp, screensResp] = await Promise.all([
        appwriteService.getMediaFiles ? appwriteService.getMediaFiles(user.$id).catch(() => ({ documents: [] })) : Promise.resolve({ documents: [] }),
        appwriteService.getPlaylists ? appwriteService.getPlaylists(user.$id).catch(() => ({ documents: [] })) : Promise.resolve({ documents: [] }),
        appwriteService.getScreens ? appwriteService.getScreens(user.$id).catch(() => ({ documents: [] })) : Promise.resolve({ documents: [] }),
      ]);

      const mediaDocs = mediaResp?.documents ?? [];
      const playlistDocs = playlistResp?.documents ?? [];
      const screensDocs = screensResp?.documents ?? [];

      const resolvedMediaFiles: MediaFile[] = mediaDocs.map((doc: any) => ({
        $id: doc.$id,
        name: doc.name ?? 'Untitled',
        type: doc.type ?? 'image',
        url: doc.externalUrl ?? doc.url ?? '',
        duration: doc.duration ?? 10,
        size: doc.size ?? 0,
      }));

      setMediaFiles(resolvedMediaFiles);

      // const mappedPlaylists: Playlist[] = (playlistDocs as any[]).map((doc: any) => {
      //   // items may be stored as array-of-objects, or array-of-strings (stringified), or string
      //   const rawItems = doc.items ?? [];
      //   const parsedItems = safeParse<any[]>(rawItems, []);

      //   const items: PlaylistItem[] = (Array.isArray(parsedItems) ? parsedItems : []).map((it: any, idx: number) => {
      //     const itemObj = typeof it === 'string' ? safeParse<any>(it, it) : it;
      //     const found = resolvedMediaFiles.find((m) => m.$id === itemObj.mediaId) ?? itemObj.media ?? null;
      //     return {
      //       id: itemObj.id ?? ID.unique(),
      //       mediaId: itemObj.mediaId ?? (found ? found.$id : ''),
      //       media: found ?? itemObj.media ?? { name: itemObj.media?.name ?? 'Unknown', type: itemObj.media?.type ?? 'image', $id: itemObj.mediaId ?? '' },
      //       duration: itemObj.duration ?? 10,
      //       order: typeof itemObj.order === 'number' ? itemObj.order : idx,
      //     } as PlaylistItem;
      //   });

      //   const schedule = safeParse<any>(doc.schedule, {
      //     startDate: new Date().toISOString(),
      //     endDate: new Date().toISOString(),
      //     startTime: '09:00',
      //     endTime: '17:00',
      //     days: [],
      //   });

      //   const normalizedSchedule = {
      //     startDate: schedule.startDate ?? new Date().toISOString(),
      //     endDate: schedule.endDate ?? new Date().toISOString(),
      //     startTime: schedule.startTime ?? '09:00',
      //     endTime: schedule.endTime ?? '17:00',
      //     days: Array.isArray(schedule.days) ? schedule.days : [],
      //   };

      //   return {
      //     $id: doc.$id,
      //     $createdAt: doc.$createdAt ?? new Date().toISOString(),
      //     name: doc.name ?? 'Untitled Playlist',
      //     description: doc.description ?? '',
      //     items,
      //     totalDuration: doc.totalDuration ?? items.reduce((a, b) => a + (b.duration || 0), 0),
      //     isActive: doc.isActive ?? true,
      //     schedule: normalizedSchedule,
      //     assignedScreens: normalizeAssignedScreens(doc.assignedScreens),
      //     userId: doc.userId ?? user.$id,
      //   } as Playlist;
      // });

const mappedPlaylists: Playlist[] = (playlistDocs as any[]).map((doc: any) => {
  // ✅ parse each string item back into object
  const items: PlaylistItem[] = Array.isArray(doc.items)
    ? doc.items.map((it: any, idx: number) => {
        const parsed = typeof it === "string" ? JSON.parse(it) : it;
        return {
          ...parsed,
          order: parsed.order ?? idx,
        };
      })
    : [];

  const parsedSchedule =
    typeof doc.schedule === "string"
      ? JSON.parse(doc.schedule)
      : doc.schedule ?? {
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          startTime: "09:00",
          endTime: "17:00",
          days: [] as string[],
        };

  return {
    $id: doc.$id,
    $createdAt: doc.$createdAt ?? new Date().toISOString(),
    name: doc.name ?? "Untitled Playlist",
    description: doc.description ?? "",
    items,
    totalDuration: doc.totalDuration ?? items.reduce((a, b) => a + (b.duration || 0), 0),
    isActive: doc.isActive ?? true,
    schedule: parsedSchedule,
    assignedScreens: Array.isArray(doc.assignedScreens) ? doc.assignedScreens : [],
    userId: doc.userId ?? user.$id,
  };
});

      const normalizedScreens: Screen[] = (screensDocs as any[]).map((s: any) => ({
        $id: s.$id,
        $createdAt: s.$createdAt,
        name: s.name,
        location: s.location ?? '',
        pairingCode: s.pairingCode ?? '',
        status: (s.status as Screen['status']) ?? 'offline',
        currentPlaylist: s.currentPlaylist ?? null,
        playlistName: s.playlistName ?? null,
        lastSeen: s.lastSeen,
        deviceInfo: s.deviceInfo || undefined,
        userId: s.userId ?? user.$id,
      }));

      setPlaylists(mappedPlaylists);
      setScreens(normalizedScreens);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.$id]);

  // helper: when editing a playlist, populate form
  const handleEditPlaylist = (playlist: Playlist) => {
    setEditingPlaylist(playlist);
    setFormData({
      name: playlist.name,
      description: playlist.description,
      startDate: new Date(playlist.schedule.startDate),
      endDate: new Date(playlist.schedule.endDate),
      startTime: playlist.schedule.startTime,
      endTime: playlist.schedule.endTime,
      days: Array.isArray(playlist.schedule.days) ? playlist.schedule.days : [],
      isActive: playlist.isActive,
    } as any);
    setPlaylistItems(playlist.items ?? []);
    setShowCreateDialog(true);
  };

  const handleCreatePlaylist = () => {
    setEditingPlaylist(null);
    setFormData({
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: '09:00',
      endTime: '17:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      isActive: true,
    });
    setPlaylistItems([]);
    setShowCreateDialog(true);
  };

  // Persist playlist to server. We stringify `items` and `schedule` when sending to Appwrite (common pattern).

// const handleSavePlaylist = async () => {
//   try {
//     if (!user) throw new Error("Not authenticated");

//     const totalDuration = playlistItems.reduce(
//       (acc, item) => acc + (item.duration || 0),
//       0
//     );

//     const scheduleData = {
//       startDate: formData.startDate?.toISOString?.() || "",
//       endDate: formData.endDate?.toISOString?.() || "",
//       startTime: formData.startTime || "",
//       endTime: formData.endTime || "",
//       days: formData.days || [],
//     };

//     const payload = {
//       $id: editingPlaylist?.$id || `playlist_${Date.now()}`,
//       $createdAt: editingPlaylist?.$createdAt || new Date().toISOString(),
//       name: formData.name,
//       description: formData.description,
//       // ✅ stringify each playlist item
//       items: playlistItems.map((item) => JSON.stringify(item)),
//       totalDuration,
//       isActive: formData.isActive,
//       // also stringify schedule if Appwrite expects string
//       schedule: JSON.stringify(scheduleData),
//       assignedScreens: editingPlaylist?.assignedScreens || [],
//       userId: user?.$id ?? "unknown",
//     };

//     if (editingPlaylist) {
//       setPlaylists((prev) =>
//         prev.map((p) =>
//           p.$id === editingPlaylist.$id ? (payload as any) : p
//         )
//       );
//       await appwriteService.updatePlaylist(payload.$id, payload);
//     } else {
//       setPlaylists((prev) => [payload as any, ...prev]);
//       await appwriteService.createPlaylist(payload);
//     }

//     setShowCreateDialog(false);
//   } catch (error) {
//     console.error("Error saving playlist:", error);
//   }
// };

const handleSavePlaylist = async () => {
  try {
    if (!user) throw new Error("Not authenticated");

    const totalDuration = playlistItems.reduce(
      (acc, item) => acc + (item.duration || 0),
      0
    );

    const scheduleData = {
      startDate: formData.startDate?.toISOString?.() || "",
      endDate: formData.endDate?.toISOString?.() || "",
      startTime: formData.startTime || "",
      endTime: formData.endTime || "",
      days: formData.days || [],
    };

const playlistPayload = {
  name: formData.name,
  description: formData.description,
  items: playlistItems.map((item) =>
    JSON.stringify({
      id: item.id,
      mediaId: item.mediaId,
      duration: item.duration,
      order: item.order,
    })
  ),
  totalDuration,
  isActive: formData.isActive,
  status: formData.isActive ? "active" : "inactive",  // ✅ new
  schedule: JSON.stringify(scheduleData),
  assignedScreens: editingPlaylist?.assignedScreens || [],
  userId: user?.$id ?? "unknown",
};

    // ------------------------------
    // 1. Create or update playlist doc
    // // ------------------------------
    // const playlistPayload = {
    //   name: formData.name,
    //   description: formData.description,
    //   items: playlistItems.map((item) =>
    //     JSON.stringify({
    //       id: item.id,
    //       mediaId: item.mediaId,
    //       duration: item.duration,
    //       order: item.order,
    //     })
    //   ),
    //   totalDuration,
    //   isActive: formData.isActive,
    //   schedule: JSON.stringify(scheduleData),
    //   assignedScreens: editingPlaylist?.assignedScreens || [],
    //   userId: user?.$id ?? "unknown",
    // };

    let playlistId: string;
    if (editingPlaylist) {
      playlistId = editingPlaylist.$id;
      await appwriteService.updatePlaylist(playlistId, playlistPayload);
    } else {
      const created = await appwriteService.createPlaylist(playlistPayload);
      playlistId = created.$id; // ✅ grab new playlist ID
    }

    // ------------------------------
    // 2. Ensure each media item has a media doc
    // ------------------------------
    for (let i = 0; i < playlistItems.length; i++) {
      const item = playlistItems[i];

// const mediaPayload = {
//   name: item.media?.name ?? "Unnamed",             // ✅ required
//   originalName: item.media?.originalName ?? "N/A", // ✅ required
//   type: item.media?.type ?? "image",               // ✅ required
//   size: item.media?.size ?? 0,                     // ✅ required
//   externalUrl: item.media?.url ?? "",              // ✅ required
//   fileId: item.media?.fileId ?? "",                // ✅ required
//   duration: item.duration ?? 0,                    // optional
//   thumbnailUrl: item.media?.thumbnailUrl ?? "",    // optional
//   userId: user?.$id ?? "unknown",                  // ✅ required
//   status: "active",                                // optional
//   playlistId,                                      // optional
//   order: i                                         // optional
// };

const mediaPayload = {
  name: item.media?.name ?? "Unnamed",
  originalName: item.media?.originalName ?? "N/A",
  type: item.media?.type ?? "image",
  size: item.media?.size ?? 0,
  externalUrl: item.media?.externalUrl ?? item.media?.url ?? "",
  fileId: item.media?.fileId ?? "",
  duration: item.duration ?? 0,
  thumbnailUrl: item.media?.thumbnailUrl ?? "",
  userId: user?.$id ?? "unknown",
  status: "active",          // ✅ force always
  playlistId ,  // ✅ always link to playlist
  order: i
};


      try {
        // if media already exists, update instead of duplicate
        await appwriteService.upsertMedia(item.mediaId, mediaPayload);
      } catch (err) {
        console.error("⚠️ Failed to upsert media:", err);
      }
    }

    // ------------------------------
    // 3. Reload UI
    // ------------------------------
    await loadData();
    setShowCreateDialog(false);
  } catch (error) {
    console.error("❌ Error saving playlist:", error);
    alert("Failed to save playlist. See console for details.");
  }
};



  const handleDeletePlaylist = async (playlistId: string) => {
    if (!confirm('Delete this playlist?')) return;
    try {
      await appwriteService.deletePlaylist(playlistId);
      // refresh lists
      await loadData();
    } catch (err) {
      console.error('Error deleting playlist:', err);
      alert('Delete failed');
    }
  };

  // Add media to playlist builder
  const handleAddMediaToPlaylist = (media: MediaFile) => {
    const newItem: PlaylistItem = {
      id: ID.unique(),
      mediaId: media.$id,
      media,
      duration: media.type === 'image' ? 10 : 30,
      order: playlistItems.length,
    };
    setPlaylistItems(prev => [...prev, newItem]);
  };

  const handleRemoveMediaFromPlaylist = (itemId: string) => {
    setPlaylistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(playlistItems);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setPlaylistItems(items.map((it, index) => ({ ...it, order: index })));
  };

  const updateItemDuration = (itemId: string, duration: number) => {
    setPlaylistItems(prev => prev.map(item => item.id === itemId ? { ...item, duration } : item));
  };

  // Assign / remove playlist from a screen (updates the screen doc)
  const handleAssignScreenToPlaylist = async (screenId: string, playlistId: string, playlistName?: string) => {
    try {
      await appwriteService.updateScreen(screenId, { currentPlaylist: playlistId, playlistName: playlistName ?? '' });
      await loadData();
    } catch (err) {
      console.error('Failed to assign playlist to screen:', err);
      alert('Assign failed');
    }
  };

  const handleRemovePlaylistFromScreen = async (screenId: string) => {
    try {
      await appwriteService.updateScreen(screenId, { currentPlaylist: null, playlistName: null });
      await loadData();
    } catch (err) {
      console.error('Failed to remove playlist from screen:', err);
      alert('Remove failed');
    }
  };

  // computed helpers
  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableMedia = mediaFiles.filter(media => !playlistItems.some(item => item.mediaId === media.$id));

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
              <h1 className="text-2xl font-semibold">Playlists</h1>
              <p className="text-muted-foreground">{playlists.length} playlists • {playlists.filter(p => p.isActive).length} active</p>
            </div>
          </div>
          <Button
            onClick={handleCreatePlaylist}
            className="bg-purple-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Playlist
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            className="pl-10"
          />
        </div>

        {/* Playlists Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded mb-4" />
                  <div className="h-3 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <Card key={playlist.$id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{playlist.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{playlist.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge variant={playlist.isActive ? "default" : "secondary"}>
                        {playlist.isActive ? (
                          <>
                            <Play className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Pause className="w-3 h-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Preview Items */}

                    <div className="flex space-x-2">
                      {playlist.items?.slice(0, 4).map((item, index) => {
                        const parsedItem = typeof item === 'string' ? safeParse<any>(item, item) : item;
                        const isImage = parsedItem?.media?.type === 'image';
                        const Icon = isImage ? ImageIcon : Video;
                        return (
                          <div key={index} className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                        );
                      })}

                      {playlist.items && playlist.items.length > 4 && (
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">+{playlist.items.length - 4}</span>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <List className="w-4 h-4 text-muted-foreground" />
                        <span>{playlist.items?.length || 0} items</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{formatDuration(playlist.totalDuration || 0)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                        <span>{formatDate(playlist.$createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-4 h-4 text-muted-foreground" />
                        <span>{(playlist.assignedScreens && playlist.assignedScreens.length) || screens.filter(s => s.currentPlaylist === playlist.$id).length} screens</span>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="text-xs text-muted-foreground">
                      {playlist.schedule?.startTime} - {playlist.schedule?.endTime} • {playlist.schedule?.days?.length || 0} days
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" onClick={() => handleEditPlaylist(playlist)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeletePlaylist(playlist.$id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <List className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No playlists yet</h3>
            <p className="text-muted-foreground mb-4">Create your first playlist to start scheduling content</p>
            <Button onClick={handleCreatePlaylist}>
              <Plus className="w-4 h-4 mr-2" />
              Create Playlist
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Playlist Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-background/80 backdrop-blur-md shadow-xl border">
          <DialogHeader>
            <DialogTitle>{editingPlaylist ? 'Edit Playlist' : 'Create New Playlist'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Playlist Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: (e.target as HTMLInputElement).value })}
                  placeholder="Enter playlist name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: (e.target as HTMLTextAreaElement).value })}
                  placeholder="Enter playlist description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, isActive: checked })}
                />
                <Label>Active</Label>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h3 className="font-medium">Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: (e.target as HTMLInputElement).value })}
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: (e.target as HTMLInputElement).value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                      <Button
                        key={day}
                        size="sm"
                        variant={(formData.days || []).includes(day) ? "default" : "outline"}
                        onClick={() => {
                          const has = (formData.days || []).includes(day);
                          const newDays = has ? (formData.days || []).filter(d => d !== day) : [...(formData.days || []), day];
                          setFormData({ ...formData, days: newDays });
                        }}
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Media Selection & Playlist Builder */}
            <div className="space-y-4">
              <h3 className="font-medium">Available Media</h3>
              <div className="max-h-40 overflow-y-auto border rounded-lg p-4">
                {availableMedia.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableMedia.map((media) => {
                      const Icon = media.type === 'image' ? ImageIcon : Video;
                      return (
                        <Button
                          key={media.$id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddMediaToPlaylist(media)}
                          className="justify-start"
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          <span className="truncate">{media.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center">No available media files</p>
                )}
              </div>

              <h3 className="font-medium">Playlist Items ({playlistItems.length})</h3>
              <div className="max-h-60 overflow-y-auto border rounded-lg p-4">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="playlist">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {playlistItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center space-x-3 p-3 bg-accent rounded-lg"
                              >
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{item.media?.name ?? 'Unknown'}</p>
                                  <div className="flex items-center space-x-2">
                                    <Input
                                      type="number"
                                      value={item.duration}
                                      onChange={(e) => updateItemDuration(item.id, parseInt((e.target as HTMLInputElement).value) || 0)}
                                      className="w-20 h-8"
                                      min={1}
                                    />
                                    <span className="text-xs text-muted-foreground">seconds</span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveMediaFromPlaylist(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {playlistItems.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No items in playlist. Add media from the available files above.</p>
                )}
              </div>

              {playlistItems.length > 0 && (
                <div className="text-sm text-muted-foreground">Total Duration: {formatDuration(playlistItems.reduce((acc, item) => acc + item.duration, 0))}</div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleSavePlaylist} disabled={!formData.name || playlistItems.length === 0}>{editingPlaylist ? 'Update' : 'Create'} Playlist</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
