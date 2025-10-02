// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useAuth } from "@/lib/Authcontexts";
// import { appwriteService } from "@/lib/appwrites";
// import { 
//   Menu, Plus, Search, Monitor, Wifi, WifiOff, Settings, QrCode,
//   Trash2, Play, Pause, MapPin, Clock, Activity, Smartphone
// } from "lucide-react";

// interface ScreenManagerProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// interface Screen {
//   $id: string;
//   $createdAt: string;
//   name: string;
//   location: string;
//   pairingCode: string;
//   status: "online" | "offline" | "error";
//   currentPlaylist?: string;
//   playlistName?: string;
//   lastSeen: string;
//   deviceInfo?: {
//     model: string;
//     os: string;
//     resolution: string;
//   };
//   userId: string;
// }

// export function ScreenManager({ sidebarCollapsed, setSidebarCollapsed }: ScreenManagerProps) {
//   const { user } = useAuth();
//   const [screens, setScreens] = useState<Screen[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddDialog, setShowAddDialog] = useState(false);
//   const [showPairingDialog, setShowPairingDialog] = useState(false);
//   const [newPairingCode, setNewPairingCode] = useState("");

//   // Form state
//   const [formData, setFormData] = useState({ name: "", location: "" });

//   useEffect(() => {
//     if (user) {
//       loadData();
//     }
//   }, [user]);

//  const loadData = async () => {
//   try {
//     setLoading(true);
//     const res = await appwriteService.getScreens(user!.$id);

//     // normalize documents into Screen[]
//     const screens: Screen[] = res.documents.map((doc: any) => ({
//       $id: doc.$id,
//       $createdAt: doc.$createdAt,
//       name: doc.name,
//       location: doc.location,
//       pairingCode: doc.pairingCode,
//       status: doc.status as "online" | "offline" | "error",
//       currentPlaylist: doc.currentPlaylist ?? undefined,
//       playlistName: doc.playlistName ?? undefined,
//       lastSeen: doc.lastSeen,
//       deviceInfo: doc.deviceInfo || undefined,
//       userId: doc.userId,
//     }));

//     setScreens(screens);
//   } catch (error) {
//     console.error("Error loading screens:", error);
//   } finally {
//     setLoading(false);
//   }
// };


//   const generatePairingCode = () => {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   };

// const handleAddScreen = async () => {
//   try {
//     const pairingCode = generatePairingCode();

//     const newScreen = {
//       name: formData.name,
//       location: formData.location,
//       pairingCode,
//       status: "offline",
//       lastSeen: new Date().toISOString(),
//       userId: user!.$id,
//     };

//     // Create in Appwrite
//     const res = await appwriteService.createScreen(newScreen);

//     // Normalize Appwrite response into Screen type
//     const normalized: Screen = {
//       $id: res.$id,
//       $createdAt: res.$createdAt,
//       name: res.name,
//       location: res.location,
//       pairingCode: res.pairingCode,
//       status: res.status,
//       currentPlaylist: res.currentPlaylist ?? undefined,
//       playlistName: res.playlistName ?? undefined,
//       lastSeen: res.lastSeen,
//       deviceInfo: res.deviceInfo || undefined,
//       userId: res.userId,
//     };

//     // Add to state
//     setScreens((prev) => [normalized, ...prev]);

//     // Reset UI
//     setShowAddDialog(false);
//     setFormData({ name: "", location: "" });

//     // Show pairing code modal
//     setNewPairingCode(pairingCode);
//     setShowPairingDialog(true);
//   } catch (error) {
//     console.error("Error adding screen:", error);
//   }
// };


//   const handleDeleteScreen = async (screenId: string) => {
//     try {
//       await appwriteService.deleteScreen(screenId);
//       setScreens((prev) => prev.filter((s) => s.$id !== screenId));
//     } catch (error) {
//       console.error("Error deleting screen:", error);
//     }
//   };

//   const handleAssignPlaylist = async (
//   screenId: string,
//   playlistId: string,
//   playlistName: string
// ) => {
//   try {
//     const updated = await appwriteService.updateScreen(screenId, {
//       currentPlaylist: playlistId,
//       playlistName,
//     });

//     // normalize the result into Screen type
//     const normalized: Screen = {
//       $id: updated.$id,
//       $createdAt: updated.$createdAt,
//       name: updated.name,
//       location: updated.location,
//       pairingCode: updated.pairingCode,
//       status: updated.status,
//       currentPlaylist: updated.currentPlaylist ?? undefined,
//       playlistName: updated.playlistName ?? undefined,
//       lastSeen: updated.lastSeen,
//       deviceInfo: updated.deviceInfo || undefined,
//       userId: updated.userId,
//     };

//     setScreens((prev) =>
//       prev.map((s) => (s.$id === screenId ? normalized : s))
//     );
//   } catch (error) {
//     console.error("Error assigning playlist:", error);
//   }
// };

// const handleRemovePlaylist = async (screenId: string) => {
//   try {
//     const updated = await appwriteService.updateScreen(screenId, {
//       currentPlaylist: null,
//       playlistName: null,
//     });

//     // normalize the result into Screen type
//     const normalized: Screen = {
//       $id: updated.$id,
//       $createdAt: updated.$createdAt,
//       name: updated.name,
//       location: updated.location,
//       pairingCode: updated.pairingCode,
//       status: updated.status,
//       currentPlaylist: updated.currentPlaylist ?? undefined,
//       playlistName: updated.playlistName ?? undefined,
//       lastSeen: updated.lastSeen,
//       deviceInfo: updated.deviceInfo || undefined,
//       userId: updated.userId,
//     };

//     setScreens((prev) =>
//       prev.map((s) => (s.$id === screenId ? normalized : s))
//     );
//   } catch (error) {
//     console.error("Error removing playlist:", error);
//   }
// };


//   const formatLastSeen = (dateString: string) => {
//     const now = new Date();
//     const lastSeen = new Date(dateString);
//     const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));

//     if (diffInMinutes < 1) return "Just now";
//     if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
//     if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
//     return `${Math.floor(diffInMinutes / 1440)}d ago`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "online": return "bg-green-500";
//       case "offline": return "bg-gray-500";
//       case "error": return "bg-red-500";
//       default: return "bg-gray-500";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "online": return Wifi;
//       case "offline": return WifiOff;
//       case "error": return WifiOff;
//       default: return WifiOff;
//     }
//   };

//   const filteredScreens = screens.filter((screen) =>
//     screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     screen.location.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const onlineScreens = screens.filter((s) => s.status === "online").length;
//   const playingScreens = screens.filter((s) => s.currentPlaylist && s.status === "online").length;

//   // --- UI remains the same (I kept your existing render tree) ---
  
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
//               <h1 className="text-2xl font-semibold">Screen Management</h1>
//               <p className="text-muted-foreground">{screens.length} screens • {onlineScreens} online • {playingScreens} playing</p>
//             </div>
//           </div>
//           <Button 
//             onClick={() => setShowAddDialog(true)}
//             className="bg-purple-600 text-white"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Add Screen
//           </Button>
//         </div>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <Monitor className="w-5 h-5 text-muted-foreground" />
//                 <div>
//                   <p className="text-2xl font-bold">{screens.length}</p>
//                   <p className="text-sm text-muted-foreground">Total Screens</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <Wifi className="w-5 h-5 text-green-500" />
//                 <div>
//                   <p className="text-2xl font-bold">{onlineScreens}</p>
//                   <p className="text-sm text-muted-foreground">Online</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <Play className="w-5 h-5 text-blue-500" />
//                 <div>
//                   <p className="text-2xl font-bold">{playingScreens}</p>
//                   <p className="text-sm text-muted-foreground">Playing Content</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <WifiOff className="w-5 h-5 text-gray-500" />
//                 <div>
//                   <p className="text-2xl font-bold">{screens.length - onlineScreens}</p>
//                   <p className="text-sm text-muted-foreground">Offline</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <div className="relative max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//           <Input
//             placeholder="Search screens..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         {/* Screens Grid */}
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
//         ) : filteredScreens.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredScreens.map((screen) => {
//               const StatusIcon = getStatusIcon(screen.status);
//               return (
//                 <Card key={screen.$id} className="group hover:shadow-lg transition-all duration-200">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <CardTitle className="text-lg flex items-center space-x-2">
//                           <Monitor className="w-5 h-5" />
//                           <span>{screen.name}</span>
//                         </CardTitle>
//                         <div className="flex items-center space-x-2 mt-1">
//                           <MapPin className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-muted-foreground">{screen.location}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <div className={`w-3 h-3 rounded-full ${getStatusColor(screen.status)}`} />
//                         <Badge variant={screen.status === 'online' ? "default" : "secondary"} className="capitalize">
//                           {screen.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {/* Current Playlist */}
//                       <div className="p-3 bg-accent rounded-lg">
//                         {screen.currentPlaylist ? (
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <Play className="w-4 h-4 text-green-500" />
//                               <div>
//                                 <p className="font-medium text-sm">{screen.playlistName}</p>
//                                 <p className="text-xs text-muted-foreground">Currently playing</p>
//                               </div>
//                             </div>
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() => handleRemovePlaylist(screen.$id)}
//                             >
//                               <Pause className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         ) : (
//                           <div className="text-center py-2">
//                             <Pause className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
//                             <p className="text-sm text-muted-foreground">No playlist assigned</p>
//                             <Select onValueChange={(value) => handleAssignPlaylist(screen.$id, value)}>
//                               <SelectTrigger className="w-full mt-2">
//                                 <SelectValue placeholder="Assign playlist" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {playlists.map((playlist) => (
//                                   <SelectItem key={playlist.$id} value={playlist.$id}>
//                                     {playlist.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         )}
//                       </div>

//                       {/* Device Info */}
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div className="flex items-center space-x-2">
//                           <QrCode className="w-4 h-4 text-muted-foreground" />
//                           <span className="font-mono">{screen.pairingCode}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Clock className="w-4 h-4 text-muted-foreground" />
//                           <span>{formatLastSeen(screen.lastSeen)}</span>
//                         </div>
//                       </div>

//                       {screen.deviceInfo && (
//                         <div className="text-xs text-muted-foreground space-y-1">
//                           <div className="flex items-center space-x-2">
//                             <Smartphone className="w-3 h-3" />
//                             <span>{screen.deviceInfo.model} • {screen.deviceInfo.os}</span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <Monitor className="w-3 h-3" />
//                             <span>{screen.deviceInfo.resolution}</span>
//                           </div>
//                         </div>
//                       )}

//                       {/* Actions */}
//                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <Button size="sm" variant="outline" onClick={() => setSelectedScreen(screen)}>
//                           <Settings className="w-4 h-4" />
//                         </Button>
//                         <Button 
//                           size="sm" 
//                           variant="outline" 
//                           onClick={() => {
//                             setNewPairingCode(screen.pairingCode);
//                             setShowPairingDialog(true);
//                           }}
//                         >
//                           <QrCode className="w-4 h-4" />
//                         </Button>
//                         <Button size="sm" variant="outline" onClick={() => handleDeleteScreen(screen.$id)}>
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <Monitor className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium mb-2">No screens yet</h3>
//             <p className="text-muted-foreground mb-4">Add your first screen to start displaying content</p>
//             <Button onClick={() => setShowAddDialog(true)}>
//               <Plus className="w-4 h-4 mr-2" />
//               Add Screen
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Add Screen Dialog */}
//       <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
//         <DialogContent  className="bg-background/80 backdrop-blur-md shadow-xl border">
//           <DialogHeader>
//             <DialogTitle>Add New Screen</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="screen-name">Screen Name</Label>
//               <Input
//                 id="screen-name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 placeholder="e.g., Main Entrance Display"
//               />
//             </div>
//             <div>
//               <Label htmlFor="screen-location">Location</Label>
//               <Input
//                 id="screen-location"
//                 value={formData.location}
//                 onChange={(e) => setFormData({...formData, location: e.target.value})}
//                 placeholder="e.g., Front Lobby"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end space-x-2 pt-4">
//             <Button variant="outline" onClick={() => setShowAddDialog(false)}>
//               Cancel
//             </Button>
//             <Button 
//               onClick={handleAddScreen}
//               disabled={!formData.name || !formData.location}
//             >
//               Add Screen
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Pairing Code Dialog */}
//       <Dialog open={showPairingDialog} onOpenChange={setShowPairingDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Screen Pairing Code</DialogTitle>
//           </DialogHeader>
//           <div className="text-center space-y-6">
//             <div className="p-8 bg-accent rounded-lg">
//               <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
//               <div className="text-4xl font-mono font-bold mb-2">{newPairingCode}</div>
//               <p className="text-sm text-muted-foreground">Enter this code in your Screen Player app</p>
//             </div>
//             <div className="space-y-2 text-sm text-muted-foreground">
//               <p>1. Download the Screen Player app on your Android device</p>
//               <p>2. Open the app and tap &quot;Pair with Dashboard&quot;</p>
//               <p>3. Enter the pairing code above</p>
//               <p>4. Your screen will appear online when connected</p>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <Button onClick={() => setShowPairingDialog(false)}>
//               Done
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



// src/sections/ScreenManager.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/Authcontexts";
import { appwriteService } from "@/lib/appwrites";
import {
  Menu,
  Plus,
  Search,
  Monitor,
  Wifi,
  WifiOff,
  Settings,
  QrCode,
  Trash2,
  Play,
  Pause,
  MapPin,
  Clock,
  Activity,
  Smartphone
} from "lucide-react";

interface Screen {
  $id: string;
  $createdAt: string;
  name: string;
  location: string;
  pairingCode: string;
  status: "online" | "offline" | "error";
  currentPlaylist?: string;
  playlistName?: string;
  lastSeen: string;
  deviceInfo?: {
    model: string;
    os: string;
    resolution: string;
  } | undefined;
  userId: string;
}

interface Playlist {
  $id: string;
  name: string;
  // any other fields you store
}

interface ScreenManagerProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export function ScreenManager({ sidebarCollapsed, setSidebarCollapsed }: ScreenManagerProps) {
  const { user } = useAuth();
  const [screens, setScreens] = useState<Screen[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [playlistsLoading, setPlaylistsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPairingDialog, setShowPairingDialog] = useState(false);
  const [newPairingCode, setNewPairingCode] = useState("");
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);

  // Form state
  const [formData, setFormData] = useState({ name: "", location: "" });

  // Load screens for user
  useEffect(() => {
    if (user) {
      loadData();
      loadPlaylists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Fetch screens
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await appwriteService.getScreens(user!.$id);

      // Normalize documents into Screen[]
      const screensList: Screen[] = (res.documents ?? res ?? []).map((doc: any) => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        name: doc.name,
        location: doc.location,
        pairingCode: doc.pairingCode,
        status: (doc.status as "online" | "offline" | "error") ?? "offline",
        currentPlaylist: doc.currentPlaylist ?? undefined,
        playlistName: doc.playlistName ?? undefined,
        lastSeen: doc.lastSeen ?? doc.$updatedAt ?? new Date().toISOString(),
        deviceInfo: doc.deviceInfo || undefined,
        userId: doc.userId,
      }));

      setScreens(screensList);
    } catch (error) {
      console.error("Error loading screens:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch playlists for the current user (normalize different shapes)
  const loadPlaylists = async () => {
    if (!user) return;
    try {
      setPlaylistsLoading(true);
      const res = await appwriteService.getPlaylists(user.$id);
      // res may be { documents: [...] } or an array
      const docs = (res && (res.documents ?? res)) || [];
      const normalized = docs.map((p: any) => ({
        $id: p.$id,
        name: p.name ?? p.title ?? "Untitled Playlist",
      }));
      setPlaylists(normalized);
    } catch (error) {
      console.error("Failed to load playlists:", error);
      setPlaylists([]);
    } finally {
      setPlaylistsLoading(false);
    }
  };

  const generatePairingCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Add a new screen
  const handleAddScreen = async () => {
    try {
      const pairingCode = generatePairingCode();

      const newScreen = {
        name: formData.name,
        location: formData.location,
        pairingCode,
        status: "active",
        lastSeen: new Date().toISOString(),
        userId: user!.$id,
      };

      const res = await appwriteService.createScreen(newScreen);

      const normalized: Screen = {
        $id: res.$id,
        $createdAt: res.$createdAt,
        name: res.name,
        location: res.location,
        pairingCode: res.pairingCode,
        status: res.status as "online" | "offline" | "error",
        currentPlaylist: res.currentPlaylist ?? undefined,
        playlistName: res.playlistName ?? undefined,
        lastSeen: res.lastSeen,
        deviceInfo: res.deviceInfo || undefined,
        userId: res.userId,
      };

      setScreens((prev) => [normalized, ...prev]);
      setShowAddDialog(false);
      setFormData({ name: "", location: "" });

      setNewPairingCode(pairingCode);
      setShowPairingDialog(true);
    } catch (error) {
      console.error("Error adding screen:", error);
    }
  };

  const handleDeleteScreen = async (screenId: string) => {
    try {
      await appwriteService.deleteScreen(screenId);
      setScreens((prev) => prev.filter((s) => s.$id !== screenId));
    } catch (error) {
      console.error("Error deleting screen:", error);
    }
  };

  // Assign playlist -> passes both id and name
  // const handleAssignPlaylist = async (screenId: string, playlistId: string, playlistName: string) => {
  //   try {
  //     const updated = await appwriteService.updateScreen(screenId, {
  //       currentPlaylist: playlistId,
  //       playlistName,
  //     });

  //     // Normalize result
  //     const normalized: Screen = {
  //       $id: updated.$id,
  //       $createdAt: updated.$createdAt,
  //       name: updated.name,
  //       location: updated.location,
  //       pairingCode: updated.pairingCode,
  //       status: updated.status as "online" | "offline" | "error",
  //       currentPlaylist: updated.currentPlaylist ?? undefined,
  //       playlistName: updated.playlistName ?? undefined,
  //       lastSeen: updated.lastSeen,
  //       deviceInfo: updated.deviceInfo || undefined,
  //       userId: updated.userId,
  //     };

  //     setScreens((prev) => prev.map((s) => (s.$id === screenId ? normalized : s)));
  //   } catch (error) {
  //     console.error("Error assigning playlist:", error);
  //   }
  // };

  const handleAssignPlaylist = async (screenId: string, playlistId: string, playlistName: string) => {
  try {
    // 1. Update screen
    const updatedScreen = await appwriteService.updateScreen(screenId, {
      currentPlaylist: playlistId,
      playlistName,
    });

    // 2. Update playlist: add this screenId into assignedScreens[]
    const playlistDoc = await appwriteService.getPlaylist(playlistId);
    const currentScreens: string[] = Array.isArray(playlistDoc.assignedScreens)
      ? playlistDoc.assignedScreens
      : [];

    const updatedScreens = Array.from(new Set([...currentScreens, screenId]));

    await appwriteService.updatePlaylist(playlistId, {
      assignedScreens: updatedScreens,
      screenId: screenId,
    });

    // 3. Update state in React
    const normalized: Screen = {
      $id: updatedScreen.$id,
      $createdAt: updatedScreen.$createdAt,
      name: updatedScreen.name,
      location: updatedScreen.location,
      pairingCode: updatedScreen.pairingCode,
      status: updatedScreen.status as "online" | "offline" | "error",
      currentPlaylist: updatedScreen.currentPlaylist ?? undefined,
      playlistName: updatedScreen.playlistName ?? undefined,
      lastSeen: updatedScreen.lastSeen,
      deviceInfo: updatedScreen.deviceInfo || undefined,
      userId: updatedScreen.userId,
    };

    setScreens((prev) =>
      prev.map((s) => (s.$id === screenId ? normalized : s))
    );

    // Optionally reload playlists so UI reflects updated counts
    await loadPlaylists();
  } catch (error) {
    console.error("Error assigning playlist:", error);
  }
};



const handleRemovePlaylist = async (screenId: string, playlistId?: string) => {
  try {
    // 1. Update screen: clear current playlist
    const updatedScreen = await appwriteService.updateScreen(screenId, {
      currentPlaylist: null,
      playlistName: null,
    });

    // 2. Update playlist: remove this screenId from assignedScreens[]
    if (playlistId) {
      const playlistDoc = await appwriteService.getPlaylist(playlistId);
      const currentScreens: string[] = Array.isArray(playlistDoc.assignedScreens)
        ? playlistDoc.assignedScreens
        : [];

      const updatedScreens = currentScreens.filter((id) => id !== screenId);

      await appwriteService.updatePlaylist(playlistId, {
        assignedScreens: updatedScreens,
      });
    }

    // 3. Update state in React
    const normalized: Screen = {
      $id: updatedScreen.$id,
      $createdAt: updatedScreen.$createdAt,
      name: updatedScreen.name,
      location: updatedScreen.location,
      pairingCode: updatedScreen.pairingCode,
      status: updatedScreen.status as "online" | "offline" | "error",
      currentPlaylist: updatedScreen.currentPlaylist ?? undefined,
      playlistName: updatedScreen.playlistName ?? undefined,
      lastSeen: updatedScreen.lastSeen,
      deviceInfo: updatedScreen.deviceInfo || undefined,
      userId: updatedScreen.userId,
    };

    setScreens((prev) =>
      prev.map((s) => (s.$id === screenId ? normalized : s))
    );

    await loadPlaylists();
  } catch (error) {
    console.error("Error removing playlist:", error);
  }
};


  const formatLastSeen = (dateString: string) => {
    const now = new Date();
    const lastSeen = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-gray-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return Wifi;
      case "offline": return WifiOff;
      case "error": return WifiOff;
      default: return WifiOff;
    }
  };

  const filteredScreens = screens.filter((screen) =>
    screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    screen.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineScreens = screens.filter((s) => s.status === "online").length;
  const playingScreens = screens.filter((s) => s.currentPlaylist && s.status === "online").length;

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
              <h1 className="text-2xl font-semibold">Screen Management</h1>
              <p className="text-muted-foreground">{screens.length} screens • {onlineScreens} online • {playingScreens} playing</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-purple-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Screen
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{screens.length}</p>
                  <p className="text-sm text-muted-foreground">Total Screens</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{onlineScreens}</p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{playingScreens}</p>
                  <p className="text-sm text-muted-foreground">Playing Content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <WifiOff className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-2xl font-bold">{screens.length - onlineScreens}</p>
                  <p className="text-sm text-muted-foreground">Offline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search screens..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Screens Grid */}
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
        ) : filteredScreens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScreens.map((screen) => {
              const StatusIcon = getStatusIcon(screen.status);
              return (
                <Card key={screen.$id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Monitor className="w-5 h-5" />
                          <span>{screen.name}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{screen.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(screen.status)}`} />
                        <Badge variant={screen.status === 'online' ? "default" : "secondary"} className="capitalize">
                          {screen.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Current Playlist */}
                      <div className="p-3 bg-accent rounded-lg">
                        {screen.currentPlaylist ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Play className="w-4 h-4 text-green-500" />
                              <div>
                                <p className="font-medium text-sm">{screen.playlistName}</p>
                                <p className="text-xs text-muted-foreground">Currently playing</p>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemovePlaylist(screen.$id)}
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center py-2">
                            <Pause className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">No playlist assigned</p>

                            {/* Assign playlist */}
                            <Select
                              onValueChange={(value) => {
                                // value is playlistId
                                const selected = playlists.find((p) => p.$id === value);
                                if (selected) {
                                  handleAssignPlaylist(screen.$id, selected.$id, selected.name);
                                }
                              }}
                            >
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder={playlistsLoading ? "Loading playlists..." : (playlists.length ? "Assign playlist" : "No playlists")} />
                              </SelectTrigger>

                              <SelectContent className="bg-background/80 backdrop-blur-md shadow-xl border">
                                {playlists.length > 0 ? (
                                  playlists.map((playlist) => (
                                    <SelectItem key={playlist.$id} value={playlist.$id}>
                                      {playlist.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="_none" disabled>
                                    No playlists available
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      {/* Device Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <QrCode className="w-4 h-4 text-muted-foreground" />
                          <span className="font-mono">{screen.pairingCode}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{formatLastSeen(screen.lastSeen)}</span>
                        </div>
                      </div>

                      {screen.deviceInfo && (
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-3 h-3" />
                            <span>{screen.deviceInfo.model} • {screen.deviceInfo.os}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Monitor className="w-3 h-3" />
                            <span>{screen.deviceInfo.resolution}</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" onClick={() => setSelectedScreen(screen)}>
                          <Settings className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setNewPairingCode(screen.pairingCode);
                            setShowPairingDialog(true);
                          }}
                        >
                          <QrCode className="w-4 h-4" />
                        </Button>

                        <Button size="sm" variant="outline" onClick={() => handleDeleteScreen(screen.$id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Monitor className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No screens yet</h3>
            <p className="text-muted-foreground mb-4">Add your first screen to start displaying content</p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Screen
            </Button>
          </div>
        )}
      </div>

      {/* Add Screen Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-background/80 backdrop-blur-md shadow-xl border">
          <DialogHeader>
            <DialogTitle>Add New Screen</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="screen-name">Screen Name</Label>
              <Input
                id="screen-name"
                value={formData.name}
                onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Main Entrance Display"
              />
            </div>

            <div>
              <Label htmlFor="screen-location">Location</Label>
              <Input
                id="screen-location"
                value={formData.location}
                onChange={(e: any) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Front Lobby"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddScreen} disabled={!formData.name || !formData.location}>Add Screen</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pairing Code Dialog */}
      <Dialog open={showPairingDialog} onOpenChange={setShowPairingDialog}>
        <DialogContent className="bg-background/80 backdrop-blur-md shadow-xl border">
          <DialogHeader>
            <DialogTitle>Screen Pairing Code</DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-6">
            <div className="p-8 bg-accent rounded-lg">
              <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <div className="text-4xl font-mono font-bold mb-2">{newPairingCode}</div>
              <p className="text-sm text-muted-foreground">Enter this code in your Screen Player app</p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Download the Screen Player app on your Android device</p>
              <p>2. Open the app and tap "Pair with Dashboard"</p>
              <p>3. Enter the pairing code above</p>
              <p>4. Your screen will appear online when connected</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setShowPairingDialog(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Selected Screen Settings Dialog */}
      <Dialog open={!!selectedScreen} onOpenChange={(open) => { if (!open) setSelectedScreen(null); }}>
        <DialogContent className="max-w-2xl bg-background/80 backdrop-blur-md shadow-xl border">
          <DialogHeader>
            <DialogTitle>Screen Settings</DialogTitle>
          </DialogHeader>

          {selectedScreen && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Screen Name</Label>
                  <div className="p-2 bg-muted rounded">{selectedScreen.name}</div>
                </div>
                <div>
                  <Label>Location</Label>
                  <div className="p-2 bg-muted rounded">{selectedScreen.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Pairing Code</Label>
                  <div className="p-2 bg-muted rounded font-mono">{selectedScreen.pairingCode}</div>
                </div>
                <div>
                  <Label>Last Seen</Label>
                  <div className="p-2 bg-muted rounded">{formatLastSeen(selectedScreen.lastSeen)}</div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedScreen(null)}>Close</Button>
                <Button variant="destructive" onClick={() => {
                  // quick delete from settings dialog
                  handleDeleteScreen(selectedScreen.$id);
                  setSelectedScreen(null);
                }}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Screen
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
