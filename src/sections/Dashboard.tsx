// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progresss';
// import { DotCalendar } from '@/components/ui/dot-calendar';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { useAuth } from '@/lib/Authcontexts';
// import { databases, DATABASE_ID, appwriteService } from '@/lib/appwrites';
// import { Query } from 'appwrite';
// import { 
//   Menu, 
//   Monitor, 
//   FolderOpen, 
//   List, 
//   Play, 
//   Pause,
//   Clock,
//   TrendingUp,
//   Activity,
//   Calendar as CalendarIcon,
//   Plus
// } from 'lucide-react';

// interface DashboardProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// interface DashboardStats {
//   totalScreens: number;
//   totalMedia: number;
//   activePlaylists: number;
//   currentlyPlaying: number;
// }

// interface RecentActivity {
//   id: string;
//   type: 'media_upload' | 'playlist_created' | 'screen_connected';
//   title: string;
//   timestamp: string;
// }

// export function Dashboard({ sidebarCollapsed, setSidebarCollapsed }: DashboardProps) {
//   const { user } = useAuth();
//   const [stats, setStats] = useState<DashboardStats>({
//     totalScreens: 0,
//     totalMedia: 0,
//     activePlaylists: 0,
//     currentlyPlaying: 0
//   });
//   const [currentMedia, setCurrentMedia] = useState<any>(null);
//   const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [loading, setLoading] = useState(true);
//   const [quickStartOpen, setQuickStartOpen] = useState(false);
//   const [quickStartAction, setQuickStartAction] = useState<'upload' | 'playlist' | 'screen'>('upload');
//   const [scheduledDates, setScheduledDates] = useState<string[]>([]);

//   useEffect(() => {
//     if (user) {
//       loadDashboardData();
//     }
//   }, [user]);

//   const loadDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // Load stats from different collections
//       const [screensData, mediaData, playlistsData] = await Promise.all([
//         appwriteService.getScreens(user!.$id).catch(() => ({ documents: [] })),
//         appwriteService.getMediaFiles(user!.$id).catch(() => ({ documents: [] })),
//         appwriteService.getPlaylists(user!.$id).catch(() => ({ documents: [] }))
//       ]);

//       // Calculate currently playing screens
//       const activeScreens = screensData.documents.filter((screen: any) => 
//         screen.status === 'online' && screen.currentPlaylist
//       ).length;

//       // Filter active playlists
//       const activePlaylists = playlistsData.documents.filter((playlist: any) => 
//         playlist.isActive
//       ).length;

//       setStats({
//         totalScreens: screensData.documents.length,
//         totalMedia: mediaData.documents.length,
//         activePlaylists: activePlaylists,
//         currentlyPlaying: activeScreens
//       });

//       // Generate scheduled dates for dot calendar (dates with active playlists)
//       const dates = playlistsData.documents
//         .filter((playlist: any) => playlist.isActive && playlist.scheduledDate)
//         .map((playlist: any) => playlist.scheduledDate.split('T')[0]);
//       setScheduledDates([...new Set(dates)]);

//       // Get most recent media as "current media"
//       if (mediaData.documents.length > 0) {
//         const latest = mediaData.documents.sort((a: any, b: any) => 
//           new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
//         )[0];
//         setCurrentMedia(latest);
//       }

//       // Generate some recent activity (in a real app, this would come from an activity log)
//       const activities: RecentActivity[] = [
//         ...mediaData.documents.slice(0, 2).map((media: any) => ({
//           id: media.$id,
//           type: 'media_upload' as const,
//           title: `Uploaded "${media.name}"`,
//           timestamp: media.$createdAt
//         })),
//         ...playlistsData.documents.slice(0, 2).map((playlist: any) => ({
//           id: playlist.$id,
//           type: 'playlist_created' as const,
//           title: `Created playlist "${playlist.name}"`,
//           timestamp: playlist.$createdAt
//         })),
//         ...screensData.documents.slice(0, 1).map((screen: any) => ({
//           id: screen.$id,
//           type: 'screen_connected' as const,
//           title: `Screen "${screen.name}" connected`,
//           timestamp: screen.$createdAt
//         }))
//       ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

//       setRecentActivity(activities);
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActivityIcon = (type: string) => {
//     switch (type) {
//       case 'media_upload': return FolderOpen;
//       case 'playlist_created': return List;
//       case 'screen_connected': return Monitor;
//       default: return Activity;
//     }
//   };

//   const formatTimeAgo = (timestamp: string) => {
//     const now = new Date();
//     const time = new Date(timestamp);
//     const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     return `${Math.floor(diffInHours / 24)}d ago`;
//   };

//   const handleQuickStart = () => {
//     switch (quickStartAction) {
//       case 'upload':
//         // Navigate to Media Library
//         window.location.hash = '#media';
//         break;
//       case 'playlist':
//         // Navigate to Playlists
//         window.location.hash = '#playlists';
//         break;
//       case 'screen':
//         // Navigate to Screens
//         window.location.hash = '#screens';
//         break;
//     }
//     setQuickStartOpen(false);
//   };

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
//               <h1 className="text-2xl font-semibold">Dashboard</h1>
//               <p className="text-muted-foreground">Welcome back, {user?.name || 'User'}</p>
//             </div>
//           </div>
//           <Dialog open={quickStartOpen} onOpenChange={setQuickStartOpen}>
//             <DialogTrigger asChild>
//               <Button className="bg-purple-600 hover:bg-purple-700 text-white">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Quick Start
//               </Button>
//             </DialogTrigger>
//             <DialogContent 
//   className="
//     sm:max-w-md 
//     bg-background/80 
//     backdrop-blur-md 
//     border 
//     border-border/40 
//     shadow-lg 
//     rounded-xl
//   "
// >

//               <DialogHeader>
//                 <DialogTitle>Quick Start</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="quick-action">What would you like to do?</Label>
//                   <Select value={quickStartAction} onValueChange={(value: any) => setQuickStartAction(value)}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="upload">
//                         <div className="flex items-center space-x-2">
//                           <FolderOpen className="w-4 h-4" />
//                           <span>Upload Media Files</span>
//                         </div>
//                       </SelectItem>
//                       <SelectItem value="playlist">
//                         <div className="flex items-center space-x-2">
//                           <List className="w-4 h-4" />
//                           <span>Create New Playlist</span>
//                         </div>
//                       </SelectItem>
//                       <SelectItem value="screen">
//                         <div className="flex items-center space-x-2">
//                           <Monitor className="w-4 h-4" />
//                           <span>Add New Screen</span>
//                         </div>
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <Button variant="outline" onClick={() => setQuickStartOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleQuickStart} className="bg-purple-600 hover:bg-purple-700 text-white">
//                     Continue
//                   </Button>
//                 </div>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card className="relative overflow-hidden">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Screens</CardTitle>
//               <Monitor className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalScreens}</div>
//               <p className="text-xs text-muted-foreground">
//                 {stats.currentlyPlaying} currently active
//               </p>
//               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-10 -mt-10" />
//             </CardContent>
//           </Card>

//           <Card className="relative overflow-hidden">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Media Files</CardTitle>
//               <FolderOpen className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalMedia}</div>
//               <p className="text-xs text-muted-foreground">
//                 Images and videos
//               </p>
//               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-10 -mt-10" />
//             </CardContent>
//           </Card>

//           <Card className="relative overflow-hidden">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Playlists</CardTitle>
//               <List className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.activePlaylists}</div>
//               <p className="text-xs text-muted-foreground">
//                 Currently scheduled
//               </p>
//               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -mr-10 -mt-10" />
//             </CardContent>
//           </Card>

//           <Card className="relative overflow-hidden">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Playing Now</CardTitle>
//               <Play className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.currentlyPlaying}</div>
//               <p className="text-xs text-muted-foreground">
//                 Screens displaying content
//               </p>
//               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10" />
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Current Media Preview */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Play className="w-5 h-5" />
//                   <span>Currently Playing</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {currentMedia ? (
//                   <div className="space-y-4">
//                     <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center border">
//                       {currentMedia.type === 'image' ? (
//                         <img 
//                           src={currentMedia.url} 
//                           alt={currentMedia.name}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       ) : (
//                         <div className="text-center">
//                           <Play className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
//                           <p className="text-sm text-muted-foreground">Video: {currentMedia.name}</p>
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium">{currentMedia.name}</h3>
//                         <p className="text-sm text-muted-foreground">
//                           {currentMedia.type === 'image' ? 'Image' : 'Video'} • {(currentMedia.size / 1024 / 1024).toFixed(1)} MB
//                         </p>
//                       </div>
//                       <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
//                         <Activity className="w-3 h-3 mr-1" />
//                         Live
//                       </Badge>
//                     </div>
//                     <Progress value={75} className="w-full" />
//                     <p className="text-xs text-muted-foreground">Playing on {stats.currentlyPlaying} screens</p>
//                   </div>
//                 ) : (
//                   <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
//                     <div className="text-center">
//                       <Pause className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
//                       <p className="text-muted-foreground">No content currently playing</p>
//                       <p className="text-sm text-muted-foreground mt-1">Upload media and create a playlist to get started</p>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Schedule Calendar */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <CalendarIcon className="w-5 h-5" />
//                 <span>Schedule</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               <DotCalendar
//                 scheduledDates={scheduledDates}
//                 onDateClick={(date) => console.log('Selected date:', date)}
//               />
//               <div className="p-4 border-t space-y-2">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-muted-foreground">Active playlists</span>
//                   <Badge variant="outline">{stats.activePlaylists}</Badge>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-muted-foreground">Total content</span>
//                   <Badge variant="outline">{stats.totalMedia}</Badge>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activity */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <TrendingUp className="w-5 h-5" />
//               <span>Recent Activity</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {recentActivity.length > 0 ? (
//               <div className="space-y-4">
//                 {recentActivity.map((activity) => {
//                   const Icon = getActivityIcon(activity.type);
//                   return (
//                     <div key={activity.id} className="flex items-center space-x-3">
//                       <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
//                         <Icon className="w-4 h-4 text-muted-foreground" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">{activity.title}</p>
//                         <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center text-muted-foreground py-8">
//                 <Activity className="w-12 h-12 mx-auto mb-2" />
//                 <p>No recent activity</p>
//                 <p className="text-sm mt-1">Start by uploading media or creating a playlist</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progresss';
import { DotCalendar } from '@/components/ui/dot-calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/Authcontexts';
import { databases, DATABASE_ID, appwriteService , getLastUploadedFile, resolveFileUrl  } from '@/lib/appwrites';
import { Query } from 'appwrite';
import { 
  Menu, 
  Monitor, 
  FolderOpen, 
  List, 
  Play, 
  Pause,
  Clock,
  TrendingUp,
  Activity,
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';

interface DashboardProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  onPageChange: (page: 'dashboard' | 'media' | 'playlists' | 'screens' | 'settings') => void;
}

interface DashboardStats {
  totalScreens: number;
  totalMedia: number;
  activePlaylists: number;
  currentlyPlaying: number;
}

interface RecentActivity {
  id: string;
  type: 'media_upload' | 'playlist_created' | 'screen_connected';
  title: string;
  timestamp: string;
}

export function Dashboard({ sidebarCollapsed, setSidebarCollapsed, onPageChange }: DashboardProps) {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalScreens: 0,
    totalMedia: 0,
    activePlaylists: 0,
    currentlyPlaying: 0
  });
  const [currentMedia, setCurrentMedia] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);
  const [quickStartOpen, setQuickStartOpen] = useState(false);
  const [quickStartAction, setQuickStartAction] = useState<'upload' | 'playlist' | 'screen'>('upload');
  const [scheduledDates, setScheduledDates] = useState<string[]>([]);
  const [latestFile, setLatestFile] = useState<any>(null);

useEffect(() => {
  if (!user) return;

  const fetchLatest = async () => {
    const file = await getLastUploadedFile(user.$id);
    setLatestFile(file);
    console.log("file" , file)
  };



  fetchLatest();
}, [user]);


  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load stats from different collections
      const [screensData, mediaData, playlistsData] = await Promise.all([
        appwriteService.getScreens(user!.$id).catch(() => ({ documents: [] })),
        appwriteService.getMediaFiles(user!.$id).catch(() => ({ documents: [] })),
        appwriteService.getPlaylists(user!.$id).catch(() => ({ documents: [] }))
      ]);

      // Calculate currently playing screens
      const activeScreens = screensData.documents.filter((screen: any) => 
        screen.status === 'online' && screen.currentPlaylist
      ).length;

      // Filter active playlists
      const activePlaylists = playlistsData.documents.filter((playlist: any) => 
        playlist.isActive
      ).length;

      setStats({
        totalScreens: screensData.documents.length,
        totalMedia: mediaData.documents.length,
        activePlaylists: activePlaylists,
        currentlyPlaying: activeScreens
      });

      // Generate scheduled dates for dot calendar (dates with active playlists)
      const dates = playlistsData.documents
        .filter((playlist: any) => playlist.isActive && playlist.scheduledDate)
        .map((playlist: any) => playlist.scheduledDate.split('T')[0]);
      setScheduledDates([...new Set(dates)]);

      // Get most recent media as "current media"
      // if (mediaData.documents.length > 0) {
      //   const latest = mediaData.documents.sort((a: any, b: any) => 
      //     new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
      //   )[0];
      //   setCurrentMedia(latest);
      // }

      
if (mediaData.documents.length > 0) {
  // pick the latest document
  const latest = mediaData.documents
    .sort((a: any, b: any) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())[0];

  // Normalize / resolve a usable URL (same approach used in MediaLibrary)
  let resolvedUrl = "";
  if (latest.url && typeof latest.url === "string" && latest.url.trim() !== "") {
    resolvedUrl = latest.url;
  } else if (latest.fileId) {
    try {
      // prefer preview for images, fallback to view
      resolvedUrl = (await appwriteService.getFilePreview(latest.fileId)) || (await appwriteService.getFileView(latest.fileId)) || "";
    } catch (err) {
      console.error("Error resolving file URL for dashboard currentMedia:", err);
      resolvedUrl = "";
    }
  }

  // ensure we store the resolved url on the currentMedia object
  setCurrentMedia({ ...latest, url: resolvedUrl });
}


      // Generate some recent activity (in a real app, this would come from an activity log)
      const activities: RecentActivity[] = [
        ...mediaData.documents.slice(0, 2).map((media: any) => ({
          id: media.$id,
          type: 'media_upload' as const,
          title: `Uploaded "${media.name}"`,
          timestamp: media.$createdAt
        })),
        ...playlistsData.documents.slice(0, 2).map((playlist: any) => ({
          id: playlist.$id,
          type: 'playlist_created' as const,
          title: `Created playlist "${playlist.name}"`,
          timestamp: playlist.$createdAt
        })),
        ...screensData.documents.slice(0, 1).map((screen: any) => ({
          id: screen.$id,
          type: 'screen_connected' as const,
          title: `Screen "${screen.name}" connected`,
          timestamp: screen.$createdAt
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'media_upload': return FolderOpen;
      case 'playlist_created': return List;
      case 'screen_connected': return Monitor;
      default: return Activity;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleQuickStart = () => {
    switch (quickStartAction) {
      case 'upload':
        onPageChange('media'); // ✅ Go to Media Library
        break;
      case 'playlist':
        onPageChange('playlists'); // ✅ Go to Playlists
        break;
      case 'screen':
        onPageChange('screens'); // ✅ Go to Screens
        break;
    }
    setQuickStartOpen(false);
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
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name || 'User'}</p>
            </div>
          </div>
          <Dialog open={quickStartOpen} onOpenChange={setQuickStartOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Quick Start
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="
                sm:max-w-md 
                bg-background/80 
                backdrop-blur-md 
                border 
                border-border/40 
                shadow-lg 
                rounded-xl
              "
            >
              <DialogHeader>
                <DialogTitle>Quick Start</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quick-action">What would you like to do?</Label>
                  <Select value={quickStartAction} onValueChange={(value: any) => setQuickStartAction(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upload">
                        <div className="flex items-center space-x-2">
                          <FolderOpen className="w-4 h-4" />
                          <span>Upload Media Files</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="playlist">
                        <div className="flex items-center space-x-2">
                          <List className="w-4 h-4" />
                          <span>Create New Playlist</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="screen">
                        <div className="flex items-center space-x-2">
                          <Monitor className="w-4 h-4" />
                          <span>Add New Screen</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setQuickStartOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleQuickStart} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Continue
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Screens</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalScreens}</div>
              <p className="text-xs text-muted-foreground">
                {stats.currentlyPlaying} currently active
              </p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-10 -mt-10" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Media Files</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMedia}</div>
              <p className="text-xs text-muted-foreground">
                Images and videos
              </p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-10 -mt-10" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Playlists</CardTitle>
              <List className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePlaylists}</div>
              <p className="text-xs text-muted-foreground">
                Currently scheduled
              </p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -mr-10 -mt-10" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Playing Now</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentlyPlaying}</div>
              <p className="text-xs text-muted-foreground">
                Screens displaying content
              </p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Media Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Currently Playing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
  {latestFile ? (
    <div className="space-y-4">
      <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center border">
        {latestFile.type === "image" ? (
          <img
            src={latestFile.url}
            alt={latestFile.name}
            className="w-full h-full object-contain rounded-lg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/placeholder.png";
            }}
          />
        ) : (
          <video
            src={latestFile.url}
            controls
            className="w-full h-full rounded-lg"
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{latestFile.name}</h3>
          <p className="text-sm text-muted-foreground">
            {latestFile.type === "image" ? "Image" : "Video"} •{" "}
            {(latestFile.size / 1024).toFixed(1)} KB
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          <Activity className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </div>
    </div>
  ) : (
    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Pause className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No content currently playing</p>
      </div>
    </div>
  )}
</CardContent>

            </Card>
          </div>

          {/* Schedule Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DotCalendar
                scheduledDates={scheduledDates}
                onDateClick={(date) => console.log('Selected date:', date)}
              />
              <div className="p-4 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active playlists</span>
                  <Badge variant="outline">{stats.activePlaylists}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total content</span>
                  <Badge variant="outline">{stats.totalMedia}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Activity className="w-12 h-12 mx-auto mb-2" />
                <p>No recent activity</p>
                <p className="text-sm mt-1">Start by uploading media or creating a playlist</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
