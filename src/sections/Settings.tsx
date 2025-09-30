import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/Authcontexts';
import { useTheme } from '@/lib/Themecontexts';
import { databases, storage, DATABASE_ID, STORAGE_BUCKET_ID } from '@/lib/appwrites';
import { Query, ID } from 'appwrite';

import {
  Menu,
  User,
  Building,
  Palette,
  Globe,
  Shield,
  Bell,
  Save,
  Camera,
  Moon,
  Sun,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

interface SettingsProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface BusinessProfile {
  $id?: string;
  businessName: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  timezone: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  userId: string;
}

export function Settings({ sidebarCollapsed, setSidebarCollapsed }: SettingsProps) {
  // Prefer auth user if available, otherwise fall back to demo user.
  const { user: authUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Local fallback/demo user (used if authUser is not yet available)
  const demoUser = {
    name: 'Demo User',
    email: 'demo@screenmanager.com',
    $id: 'demo_user_id',
    prefs: {
      avatar: '',
      screenOffline: true,
      playlistEnded: true,
      lowStorage: true,
      weeklyReport: false,
      emailNotifications: true,
      pushNotifications: false
    }
  };

  // Use actual user when available; otherwise demo user
  const user = authUser ?? demoUser;

  // state
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    businessName: '',
    description: '',
    address: '',
    phone: '',
    website: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    primaryColor: '#8B5CF6',
    secondaryColor: '#3B82F6',
    userId: user.$id
  });

  const [userProfile, setUserProfile] = useState({
    name: user.name || '',
    email: user.email || '',
    avatar: user.prefs?.avatar || ''
  });

  const [notifications, setNotifications] = useState({
    screenOffline: true,
    playlistEnded: true,
    lowStorage: true,
    weeklyReport: false,
    emailNotifications: true,
    pushNotifications: false
  });

  const timezones = [
    
  "Africa/Abidjan",
  "Africa/Accra",
  "Africa/Addis_Ababa",
  "Africa/Algiers",
  "Africa/Cairo",
  "Africa/Casablanca",
  "Africa/Johannesburg",
  "Africa/Kigali",
  "Africa/Lagos",
  "Africa/Luanda",
  "Africa/Lusaka",
  "Africa/Nairobi"

  ];

  // Keep a ref for mounted state and timers so we can cleanup on unmount
  const isMounted = useRef(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    isMounted.current = true;
    loadSettings();

    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // only re-run when auth user identity changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.$id]);

  /**
   * loadSettings
   * - If auth user exists, attempt to fetch real data (you can add DB calls here).
   * - If auth user is not yet available, we fallback to demo values so UI won't be stuck on skeleton.
   * - Protects against unmounted component and clears timers.
   */
  const loadSettings = async () => {
    try {
      setLoading(true);

      // If you want to fetch real business profile from Appwrite, replace this block
      // with actual databases.listDocuments(...) call using the correct collection id.
      // For now we populate from either demo or any cached/local state to avoid indefinite loading.

      if (!user || user.$id === demoUser.$id) {
        // No authenticated user available — show demo data quickly (no long timeout)
        // This prevents the component remaining in skeleton forever while auth loads.
        if (!isMounted.current) return;
        setBusinessProfile({
          $id: 'demo_business_1',
          businessName: 'Demo Coffee Shop',
          description: 'A cozy coffee shop in downtown',
          address: '123 Main Street, Lagos City',
          phone: '(234) 123-456789',
          website: 'https://democoffeeshop.com',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          primaryColor: '#8B5CF6',
          secondaryColor: '#3B82F6',
          userId: user.$id
        });

        const userPrefs = (user as any).prefs || {};
        setNotifications({
          screenOffline: userPrefs.screenOffline ?? true,
          playlistEnded: userPrefs.playlistEnded ?? true,
          lowStorage: userPrefs.lowStorage ?? true,
          weeklyReport: userPrefs.weeklyReport ?? false,
          emailNotifications: userPrefs.emailNotifications ?? true,
          pushNotifications: userPrefs.pushNotifications ?? false
        });

        setUserProfile({
          name: user.name || '',
          email: user.email || '',
          avatar: user.prefs?.avatar || ''
        });

        // small delay so skeleton shows briefly for smoother UX
        timeoutRef.current = window.setTimeout(() => {
          if (isMounted.current) setLoading(false);
        }, 200);
        return;
      }

      // If we have a real authenticated user, attempt to load from DB (replace with your collection IDs)
      // Wrapped in try/catch so failures fallback to demo values and don't keep the UI loading forever.
      // Example pseudo-code below: uncomment & adapt if you have collection IDs:
      //
      // const BUSINESS_COLLECTION_ID = 'your_business_collection_id';
      // const res = await databases.listDocuments(DATABASE_ID, BUSINESS_COLLECTION_ID, [Query.equal('userId', user.$id)]);
      // if (res.documents.length > 0) { /* setBusinessProfile from res.documents[0] */ }

      // For now we still use demo values to ensure the component always renders.
      // You should replace this with your real fetching logic.
      if (isMounted.current) {
        // simulate a small fetch delay for authenticated users
        timeoutRef.current = window.setTimeout(() => {
          if (!isMounted.current) return;

          setBusinessProfile({
            $id: 'demo_business_1',
            businessName: 'Demo Coffee Shop',
            description: 'A cozy coffee shop in downtown',
            address: '123 Main Street, Lagos City',
            phone: '(234) 123-456789',
            website: 'https://democoffeeshop.com',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            primaryColor: '#8B5CF6',
            secondaryColor: '#3B82F6',
            userId: user.$id
          });

          const userPrefs = (user as any).prefs || {};
          setNotifications({
            screenOffline: userPrefs.screenOffline ?? true,
            playlistEnded: userPrefs.playlistEnded ?? true,
            lowStorage: userPrefs.lowStorage ?? true,
            weeklyReport: userPrefs.weeklyReport ?? false,
            emailNotifications: userPrefs.emailNotifications ?? true,
            pushNotifications: userPrefs.pushNotifications ?? false
          });

          setUserProfile({
            name: user.name || '',
            email: user.email || '',
            avatar: user.prefs?.avatar || ''
          });

          setLoading(false);
        }, 350);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      if (isMounted.current) {
        // fallback to demo data so UI shows something
        setBusinessProfile((prev) => ({ ...prev, businessName: prev.businessName || 'Demo Coffee Shop' }));
        setNotifications((prev) => ({ ...prev }));
        setUserProfile((prev) => ({ ...prev }));
        setLoading(false);
      }
    }
  };

  // Mock updateProfile wrapper — replace with real API call
  const updateProfile = async (data: any) => {
    // In real app call your API / databases to update user profile/preferences
    // For now just log and resolve
    console.log('Mock update profile:', data);
    return Promise.resolve();
  };

  const handleSaveBusinessProfile = async () => {
    try {
      setSaving(true);

      // Replace with your save logic (databases.createDocument / updateDocument)
      await new Promise(resolve => setTimeout(resolve, 700));

      if (!businessProfile.$id) {
        setBusinessProfile({ ...businessProfile, $id: `demo_business_${Date.now()}` });
      }

      // Optionally cache in localStorage so reloads are faster (optional)
      try {
        localStorage.setItem('businessProfile', JSON.stringify(businessProfile));
      } catch (_) {}

    } catch (error) {
      console.error('Error saving business profile:', error);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleSaveUserProfile = async () => {
    try {
      setSaving(true);
      await updateProfile({
        name: userProfile.name
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      setSaving(true);
      await updateProfile({
        prefs: { ...user?.prefs, ...notifications }
      });
    } catch (error) {
      console.error('Error saving notifications:', error);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const fileId = ID.unique();

      // If storage is configured and available, use it. If not, skip safely.
      if (storage && STORAGE_BUCKET_ID) {
        await storage.createFile(STORAGE_BUCKET_ID, fileId, file);
        // createFile returns a file object — use getFileView to obtain a view URL if available
        // some SDKs return the URL directly; adapt this if your SDK differs
        const fileUrl = storage.getFileView(STORAGE_BUCKET_ID, fileId).href;
        await updateProfile({
          prefs: { ...user?.prefs, avatar: fileUrl }
        });
        setUserProfile({ ...userProfile, avatar: fileUrl });
      } else {
        // fallback: create a local object URL for preview only (not persisted)
        const localUrl = URL.createObjectURL(file);
        await updateProfile({
          prefs: { ...user?.prefs, avatar: localUrl }
        });
        setUserProfile({ ...userProfile, avatar: localUrl });
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const fileId = ID.unique();

      if (storage && STORAGE_BUCKET_ID) {
        await storage.createFile(STORAGE_BUCKET_ID, fileId, file);
        const fileUrl = storage.getFileView(STORAGE_BUCKET_ID, fileId).href;
        setBusinessProfile({ ...businessProfile, logo: fileUrl });
      } else {
        const localUrl = URL.createObjectURL(file);
        setBusinessProfile({ ...businessProfile, logo: localUrl });
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  // Render skeleton if loading
  if (loading) {
    return (
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Main UI
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
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and business preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>User Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    {/* AvatarImage works with empty src — AvatarFallback will be used */}
                    <AvatarImage src={userProfile.avatar || undefined} />
                    <AvatarFallback className="text-lg">
                      {userProfile.name?.charAt(0) || user?.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="user-name">Full Name</Label>
                      <Input
                        id="user-name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="user-email">Email Address</Label>
                      <Input
                        id="user-email"
                        value={userProfile.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveUserProfile} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Business Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      value={businessProfile.businessName}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, businessName: e.target.value })}
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-phone">Phone Number</Label>
                    <Input
                      id="business-phone"
                      value={businessProfile.phone}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-website">Website</Label>
                    <Input
                      id="business-website"
                      value={businessProfile.website}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, website: e.target.value })}
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-description">Description</Label>
                    <Textarea
                      id="business-description"
                      value={businessProfile.description}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, description: e.target.value })}
                      placeholder="Brief description of your business"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-address">Address</Label>
                    <Textarea
                      id="business-address"
                      value={businessProfile.address}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, address: e.target.value })}
                      placeholder="Enter your business address"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Business Logo</h4>
                <div className="flex items-center space-x-4">
                  {businessProfile.logo && (
                    <img
                      src={businessProfile.logo}
                      alt="Business Logo"
                      className="w-16 h-16 object-contain border rounded-lg"
                    />
                  )}
                  <label htmlFor="logo-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Camera className="w-4 h-4 mr-2" />
                      {businessProfile.logo ? 'Change Logo' : 'Upload Logo'}
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <Button onClick={handleSaveBusinessProfile} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                Save Business Profile
              </Button>
            </CardContent>
          </Card>

          {/* Appearance & Branding */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Appearance & Branding</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={businessProfile.primaryColor}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={businessProfile.primaryColor}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, primaryColor: e.target.value })}
                      placeholder="#8B5CF6"
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={businessProfile.secondaryColor}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, secondaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={businessProfile.secondaryColor}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, secondaryColor: e.target.value })}
                      placeholder="#3B82F6"
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4" />
                  <Label>Light Mode</Label>
                </div>
                {/* Theme toggle is commented out until useTheme is restored */}
                {/* <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
                <div className="flex items-center space-x-2">
                  <Label>Dark Mode</Label>
                  <Moon className="w-4 h-4" />
                </div>
              </div> */} 

              <Button onClick={handleSaveBusinessProfile} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                Save Appearance
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={businessProfile.timezone}
                  onValueChange={(value: string) => setBusinessProfile({ ...businessProfile, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background/80 backdrop-blur-md shadow-xl border">
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{tz.replace('_', ' ')}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveBusinessProfile} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Screen Goes Offline</Label>
                    <p className="text-sm text-muted-foreground">Get notified when a screen disconnects</p>
                  </div>
                  <Switch
                    checked={notifications.screenOffline}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, screenOffline: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Playlist Ends</Label>
                    <p className="text-sm text-muted-foreground">Get notified when a playlist finishes</p>
                  </div>
                  <Switch
                    checked={notifications.playlistEnded}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, playlistEnded: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Low Storage Warning</Label>
                    <p className="text-sm text-muted-foreground">Get notified when storage is running low</p>
                  </div>
                  <Switch
                    checked={notifications.lowStorage}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, lowStorage: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, weeklyReport: checked })}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <Label>Email Notifications</Label>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4" />
                      <Label>Push Notifications</Label>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                Save Notifications
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
