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


import React, { useState, useEffect } from 'react'; 
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
  Calendar as CalendarIcon, Play, Pause, Trash2, Edit, GripVertical, Monitor
} from 'lucide-react';

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
  media: MediaFile;
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
  assignedScreens: string[];
  userId: string;
}

export function PlaylistManager({ sidebarCollapsed, setSidebarCollapsed }: PlaylistManagerProps) {
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '09:00',
    endTime: '17:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    isActive: true
  });

  // 📌 Parse stored JSON safely
  const safeParse = <T,>(val: any, fallback: T): T => {
    try {
      if (!val) return fallback;
      if (typeof val === 'string') return JSON.parse(val) as T;
      return fallback;
    } catch {
      return fallback;
    }
  };

 useEffect(() => {
  if (!user?.$id) return;

  let cancelled = false;

  const loadData = async () => {
    try {
      setLoading(true);

      const [mediaResp, playlistResp] = await Promise.all([
        appwriteService.getMediaFiles(user.$id).catch(() => ({ documents: [] })),
        appwriteService.getPlaylists(user.$id).catch(() => ({ documents: [] }))
      ]);

      const mediaDocs = mediaResp?.documents ?? [];
      const playlistDocs = playlistResp?.documents ?? [];

      const resolvedMediaFiles: MediaFile[] = mediaDocs.map((doc: any) => ({
        $id: doc.$id,
        name: doc.name ?? 'Untitled',
        type: doc.type ?? 'image',
        url: doc.url ?? '',
        duration: doc.duration ?? 10,
        size: doc.size ?? 0,
      }));

      if (cancelled) return;
      setMediaFiles(resolvedMediaFiles);

      const mappedPlaylists: Playlist[] = (playlistDocs as any[]).map((doc: any) => {
        // parse items
        const parsedItems = safeParse<PlaylistItem[]>(doc.items, []);
        const items: PlaylistItem[] = parsedItems.map((it, idx) => {
          const found = resolvedMediaFiles.find(m => m.$id === it.mediaId);
          return {
            ...it,
            media: found ?? it.media,
            order: typeof it.order === 'number' ? it.order : idx,
          };
        });

        // parse schedule
        const parsedSchedule = safeParse(doc.schedule, {
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          startTime: '09:00',
          endTime: '17:00',
          days: [],
        });

        const totalDuration = doc.totalDuration ?? items.reduce((a, b) => a + (b.duration || 0), 0);

        return {
          $id: doc.$id,
          $createdAt: doc.$createdAt ?? new Date().toISOString(),
          name: doc.name ?? 'Untitled Playlist',
          description: doc.description ?? '',
          items,
          totalDuration,
          isActive: doc.isActive ?? true,
          schedule: parsedSchedule, // ✅ always object
          assignedScreens: doc.assignedScreens ?? "",
          userId: doc.userId ?? user.$id,
        };
      });

      if (cancelled) return;
      setPlaylists(mappedPlaylists);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  loadData();
  return () => { cancelled = true; };
}, [user?.$id]);


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

  const handleEditPlaylist = (playlist: Playlist) => {
    setEditingPlaylist(playlist);
    setFormData({
      name: playlist.name,
      description: playlist.description,
      startDate: new Date(playlist.schedule.startDate),
      endDate: new Date(playlist.schedule.endDate),
      startTime: playlist.schedule.startTime,
      endTime: playlist.schedule.endTime,
      days: playlist.schedule.days,
      isActive: playlist.isActive,
    });
    setPlaylistItems(playlist.items);
    setShowCreateDialog(true);
  };

// paste into PlaylistManager.tsx (replace your handleSavePlaylist)

// PlaylistManager.tsx
// const handleSavePlaylist = async () => {
//   try {
//     if (!user) throw new Error('Not authenticated');

//     const normalized = playlistItems.map(it => ({
//       id: it.id,
//       mediaId: it.mediaId,
//       duration: it.duration || 0,
//       order: it.order || 0
//     }));

//     const payload = {
//       name: formData.name,
//       description: formData.description,
//       items: normalized.map(i => JSON.stringify(i)),
//       totalDuration: normalized.reduce((a, b) => a + b.duration, 0),
//       isActive: formData.isActive,
//       assignedScreens: [],
//       userId: user.$id,

//       // ✅ provide required "schedule" as a string
//       schedule: JSON.stringify({
//         start: new Date().toISOString(),
//         end: null // or some default value
//       })
//     };

//     await appwriteService.createPlaylist(payload);
//   } catch (err) {
//     console.error('Error saving playlist:', err);
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
      days: formData.days || [] // assuming it's an array of selected days
    };

    const payload = {
      $id: editingPlaylist?.$id || `playlist_${Date.now()}`,
      $createdAt: editingPlaylist?.$createdAt || new Date().toISOString(),
      name: formData.name,
      description: formData.description,
      // ⚠️ if your Appwrite attribute `items` is array<string>, keep stringifying each item
      items: playlistItems.map((i) => JSON.stringify(i)),
      totalDuration,
      isActive: formData.isActive,
      // ✅ stringify schedule object before sending
      schedule: JSON.stringify(scheduleData),
      assignedScreens: editingPlaylist?.assignedScreens || [],
      // assignedScreens: formData.assignedScreens?.[0] ?? "",
      userId: user?.$id ?? "unknown"
    };

    if (editingPlaylist) {
      // optimistic update
      setPlaylists((prev) =>
        prev.map((p) => (p.$id === editingPlaylist.$id ? (payload as Playlist) : p))
      );
      await appwriteService.updatePlaylist(payload.$id, payload);
    } else {
      // optimistic push
      setPlaylists((prev) => [payload as Playlist, ...prev]);
      await appwriteService.createPlaylist(payload);
    }

    setShowCreateDialog(false);
  } catch (error) {
    console.error("Error saving playlist:", error);
  }
};


// const handleSavePlaylist = async () => {
//   try {
//     if (!user) throw new Error('Not authenticated');

//     const normalized = playlistItems.map(it => ({
//       id: it.id,
//       mediaId: it.mediaId,
//       duration: it.duration || 0,
//       order: it.order || 0
//     }));

//     const payload = {
//       name: formData.name,
//       description: formData.description,
//       items: normalized.map(i => JSON.stringify(i)), // <-- array of strings
//       totalDuration: normalized.reduce((a, b) => a + b.duration, 0),
//       isActive: formData.isActive,
//       assignedScreens: [],
//       userId: user.$id
//     };

//     await appwriteService.createPlaylist(payload); // adapt to your wrapper name
//     // refresh playlists / close dialog / toast success...
//   } catch (err) {
//     console.error('Error saving playlist:', err);
//     // show friendly UI error
//   }
// };

  // const handleSavePlaylist = async () => {
  //   try {
  //     const totalDuration = playlistItems.reduce((a, b) => a + b.duration, 0);

  //     const playlistData = {
  //       name: formData.name,
  //       description: formData.description,
  //       items: JSON.stringify(playlistItems), // 📌 store JSON string
  //       totalDuration,
  //       isActive: formData.isActive,
  //       schedule: JSON.stringify({
  //         startDate: formData.startDate.toISOString(),
  //         endDate: formData.endDate.toISOString(),
  //         startTime: formData.startTime,
  //         endTime: formData.endTime,
  //         days: formData.days,
  //       }),
  //       assignedScreens: editingPlaylist?.assignedScreens || [],
  //       userId: user?.$id ?? 'unknown',
  //     };

  //     if (editingPlaylist) {
  //       await appwriteService.updatePlaylist(editingPlaylist.$id, playlistData);
  //       setPlaylists(prev => prev.map(p => p.$id === editingPlaylist.$id ? { ...p, ...playlistData, items: playlistItems } as Playlist : p));
  //     } else {
  //       const doc = await appwriteService.createPlaylist(playlistData);
  //       const parsedDoc: Playlist = {
  //         ...(doc as any),
  //         items: playlistItems,
  //         schedule: JSON.parse(playlistData.schedule),
  //       };
  //       setPlaylists(prev => [parsedDoc, ...prev]);
  //     }

  //     setShowCreateDialog(false);
  //   } catch (err) {
  //     console.error('Error saving playlist:', err);
  //   }
  // };

  // const handleSavePlaylist = async () => {
  //   try {
  //     const totalDuration = playlistItems.reduce((acc, item) => acc + (item.duration || 0), 0);

  //     const playlistData = {
  //       $id: editingPlaylist?.$id || `playlist_${Date.now()}`,
  //       $createdAt: editingPlaylist?.$createdAt || new Date().toISOString(),
  //       name: formData.name,
  //       description: formData.description,
  //       items: playlistItems,
  //       totalDuration,
  //       isActive: formData.isActive,
  //       schedule: {
  //         startDate: formData.startDate.toISOString(),
  //         endDate: formData.endDate.toISOString(),
  //         startTime: formData.startTime,
  //         endTime: formData.endTime,
  //         days: formData.days
  //       },
  //       assignedScreens: editingPlaylist?.assignedScreens || [],
  //       userId: user?.$id ?? 'unknown'
  //     };

  //     if (editingPlaylist) {
  //       // optimistic update locally; you may call appwriteService.updatePlaylist(...) here
  //       setPlaylists(prev => prev.map(p => p.$id === editingPlaylist.$id ? (playlistData as Playlist) : p));
  //     } else {
  //       // optimistic push and optionally call appwriteService.createPlaylist(...)
  //       setPlaylists(prev => [playlistData as Playlist, ...prev]);
  //     }

  //     setShowCreateDialog(false);
  //   } catch (error) {
  //     console.error('Error saving playlist:', error);
  //   }
  // };

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      // optionally call appwriteService.deletePlaylist(playlistId)
      setPlaylists(prev => prev.filter(p => p.$id !== playlistId));
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const handleAddMediaToPlaylist = (media: MediaFile) => {
    const newItem: PlaylistItem = {
      id: ID.unique(),
      mediaId: media.$id,
      media,
      duration: media.type === 'image' ? 10 : 30, // Default durations
      order: playlistItems.length
    };
    setPlaylistItems(prev => [...prev, newItem]);
  };

  const handleRemoveMediaFromPlaylist = (itemId: string) => {
    setPlaylistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(playlistItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setPlaylistItems(updatedItems);
  };

  const updateItemDuration = (itemId: string, duration: number) => {
    setPlaylistItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, duration } : item
    ));
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableMedia = mediaFiles.filter(media =>
    !playlistItems.some(item => item.mediaId === media.$id)
  );

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
            onChange={(e) => setSearchQuery(e.target.value)}
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
                      {/* {playlist.items?.slice(0, 4).map((item, index) => {
                        const Icon = item.media.type === 'image' ? ImageIcon : Video;
                        return (
                          <div key={index} className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                        );
                      })} */}
            {playlist.items?.slice(0, 4).map((item, index) => {
  // make sure item is parsed correctly
  const parsedItem = typeof item === "string" ? JSON.parse(item) : item;

  // fallback if no media attached
  const isImage = parsedItem.media?.type === "image";

  const Icon = isImage ? ImageIcon : Video;

  return (
    <div key={index} className="...">
      <Icon className="w-5 h-5" />
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
                        <span>{playlist.assignedScreens?.length || 0} screens</span>
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
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter playlist name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter playlist description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
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
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
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
                        variant={formData.days.includes(day) ? "default" : "outline"}
                        onClick={() => {
                          const newDays = formData.days.includes(day)
                            ? formData.days.filter(d => d !== day)
                            : [...formData.days, day];
                          setFormData({...formData, days: newDays});
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
                                  <p className="font-medium text-sm">{item.media.name}</p>
                                  <div className="flex items-center space-x-2">
                                    <Input
                                      type="number"
                                      value={item.duration}
                                      onChange={(e) => updateItemDuration(item.id, parseInt(e.target.value) || 0)}
                                      className="w-20 h-8"
                                      min="1"
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
                  <p className="text-muted-foreground text-center py-8">
                    No items in playlist. Add media from the available files above.
                  </p>
                )}
              </div>

              {playlistItems.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Total Duration: {formatDuration(playlistItems.reduce((acc, item) => acc + item.duration, 0))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePlaylist}
              disabled={!formData.name || playlistItems.length === 0}
            >
              {editingPlaylist ? 'Update' : 'Create'} Playlist
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
