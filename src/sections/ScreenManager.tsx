import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/Authcontext';
import { databases, DATABASE_ID } from '@/lib/appwrites';
import { Query, ID } from 'appwrite';

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
  Edit,
  Play,
  Pause,
  MapPin,
  Clock,
  Activity,
  Smartphone
} from 'lucide-react';

interface ScreenManagerProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface Screen {
  $id: string;
  $createdAt: string;
  name: string;
  location: string;
  pairingCode: string;
  status: 'online' | 'offline' | 'error';
  currentPlaylist?: string;
  playlistName?: string;
  lastSeen: string;
  deviceInfo?: {
    model: string;
    os: string;
    resolution: string;
  };
  userId: string;
}

interface Playlist {
  $id: string;
  name: string;
  isActive: boolean;
}

export function ScreenManager({ sidebarCollapsed, setSidebarCollapsed }: ScreenManagerProps) {
  // Mock user data for demo
  const user = {
    name: 'Demo User',
    $id: 'demo_user_id'
  };
  const [screens, setScreens] = useState<Screen[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPairingDialog, setShowPairingDialog] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [newPairingCode, setNewPairingCode] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demo
      setTimeout(() => {
        const mockScreens: Screen[] = [
          {
            $id: 'demo_screen_1',
            $createdAt: new Date().toISOString(),
            name: 'Lobby Display',
            location: 'Main Entrance Lobby',
            pairingCode: 'ABC123',
            status: 'online',
            currentPlaylist: 'demo_playlist_1',
            playlistName: 'Morning Announcements',
            lastSeen: new Date().toISOString(),
            deviceInfo: {
              model: 'Samsung Galaxy Tab A',
              os: 'Android 12',
              resolution: '1920x1080'
            },
            userId: user.$id
          },
          {
            $id: 'demo_screen_2',
            $createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            name: 'Waiting Area TV',
            location: 'Customer Waiting Area',
            pairingCode: 'DEF456',
            status: 'offline',
            lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            deviceInfo: {
              model: 'LG Smart TV',
              os: 'webOS 6.0',
              resolution: '3840x2160'
            },
            userId: user.$id
          },
          {
            $id: 'demo_screen_3',
            $createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            name: 'Menu Board',
            location: 'Behind Counter',
            pairingCode: 'GHI789',
            status: 'online',
            currentPlaylist: 'demo_playlist_1',
            playlistName: 'Morning Announcements',
            lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            deviceInfo: {
              model: 'iPad Pro',
              os: 'iOS 17',
              resolution: '2048x2732'
            },
            userId: user.$id
          }
        ];

        const mockPlaylists: Playlist[] = [
          {
            $id: 'demo_playlist_1',
            name: 'Morning Announcements',
            isActive: true
          },
          {
            $id: 'demo_playlist_2',
            name: 'Afternoon Specials',
            isActive: true
          }
        ];

        setScreens(mockScreens);
        setPlaylists(mockPlaylists);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const generatePairingCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleAddScreen = async () => {
    try {
      const pairingCode = generatePairingCode();
      
      const newScreen: Screen = {
        $id: `demo_screen_${Date.now()}`,
        $createdAt: new Date().toISOString(),
        name: formData.name,
        location: formData.location,
        pairingCode,
        status: 'offline',
        lastSeen: new Date().toISOString(),
        userId: user.$id
      };

      // Mock add - update local state
      setScreens(prev => [newScreen, ...prev]);
      setShowAddDialog(false);
      setFormData({ name: '', location: '' });
      
      // Show pairing code dialog
      setNewPairingCode(pairingCode);
      setShowPairingDialog(true);
    } catch (error) {
      console.error('Error adding screen:', error);
    }
  };

  const handleDeleteScreen = async (screenId: string) => {
    try {
      // Mock delete - remove from local state
      setScreens(prev => prev.filter(s => s.$id !== screenId));
    } catch (error) {
      console.error('Error deleting screen:', error);
    }
  };

  const handleAssignPlaylist = async (screenId: string, playlistId: string) => {
    try {
      const playlist = playlists.find(p => p.$id === playlistId);
      // Mock update - update local state
      setScreens(prev => prev.map(screen => 
        screen.$id === screenId 
          ? { ...screen, currentPlaylist: playlistId, playlistName: playlist?.name || '' }
          : screen
      ));
    } catch (error) {
      console.error('Error assigning playlist:', error);
    }
  };

  const handleRemovePlaylist = async (screenId: string) => {
    try {
      // Mock update - update local state
      setScreens(prev => prev.map(screen => 
        screen.$id === screenId 
          ? { ...screen, currentPlaylist: undefined, playlistName: undefined }
          : screen
      ));
    } catch (error) {
      console.error('Error removing playlist:', error);
    }
  };

  const formatLastSeen = (dateString: string) => {
    const now = new Date();
    const lastSeen = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return Wifi;
      case 'offline': return WifiOff;
      case 'error': return WifiOff;
      default: return WifiOff;
    }
  };

  const filteredScreens = screens.filter(screen =>
    screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    screen.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineScreens = screens.filter(s => s.status === 'online').length;
  const playingScreens = screens.filter(s => s.currentPlaylist && s.status === 'online').length;

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
            onChange={(e) => setSearchQuery(e.target.value)}
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
                            <Select onValueChange={(value) => handleAssignPlaylist(screen.$id, value)}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Assign playlist" />
                              </SelectTrigger>
                              <SelectContent>
                                {playlists.map((playlist) => (
                                  <SelectItem key={playlist.$id} value={playlist.$id}>
                                    {playlist.name}
                                  </SelectItem>
                                ))}
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
        <DialogContent  className="bg-background/80 backdrop-blur-md shadow-xl border">
          <DialogHeader>
            <DialogTitle>Add New Screen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="screen-name">Screen Name</Label>
              <Input
                id="screen-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Main Entrance Display"
              />
            </div>
            <div>
              <Label htmlFor="screen-location">Location</Label>
              <Input
                id="screen-location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g., Front Lobby"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddScreen}
              disabled={!formData.name || !formData.location}
            >
              Add Screen
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pairing Code Dialog */}
      <Dialog open={showPairingDialog} onOpenChange={setShowPairingDialog}>
        <DialogContent>
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
              <p>2. Open the app and tap &quot;Pair with Dashboard&quot;</p>
              <p>3. Enter the pairing code above</p>
              <p>4. Your screen will appear online when connected</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowPairingDialog(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}