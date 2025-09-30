import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/lib/Themecontexts';
import { useAuth } from '@/lib/Authcontexts';

import { 
  Menu, 
  X, 
  LayoutDashboard, 
  FolderOpen, 
  List, 
  Monitor, 
  Settings as SettingsIcon,
  Moon,
  Sun,
  LogOut,
  Play,
  Zap
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  currentPage: 'dashboard' | 'media' | 'playlists' | 'screens' | 'settings';
  onPageChange: (page: 'dashboard' | 'media' | 'playlists' | 'screens' | 'settings') => void;
  onToggleCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, currentPage, onPageChange, onToggleCollapse }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { 
      id: 'dashboard' as const, 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Overview & stats'
    },
    { 
      id: 'media' as const, 
      label: 'Media Library', 
      icon: FolderOpen,
      description: 'Upload & manage files'
    },
    { 
      id: 'playlists' as const, 
      label: 'Playlists', 
      icon: List,
      description: 'Create & schedule content'
    },
    { 
      id: 'screens' as const, 
      label: 'Screens', 
      icon: Monitor,
      description: 'Manage your displays'
    },
    { 
      id: 'settings' as const, 
      label: 'Settings', 
      icon: SettingsIcon,
      description: 'Business & preferences'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/20 lg:hidden z-40"
          onClick={() => onToggleCollapse(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
  fixed lg:sticky top-0 left-0 h-screen 
  bg-sidebar/80 backdrop-blur-md border-r border-sidebar-border z-50
  transition-all duration-300 flex flex-col
  ${collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-72 lg:w-72'}
`}>

        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sidebar-foreground font-semibold">Screen Manager</h1>
                  <p className="text-sidebar-foreground/60 text-sm">Digital Signage</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleCollapse(!collapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
  key={item.id}
  variant="ghost"
  className={`
    w-full justify-start h-auto p-3 text-left group
    ${isActive 
      ? `
        bg-purple-600 text-white shadow-sm 
        dark:bg-transparent dark:text-purple-400
      ` 
      : `
        text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
      `
    }
    ${collapsed ? 'px-3' : ''}
  `}
  onClick={() => onPageChange(item.id)}
>

                <Icon className={`w-5 h-5 flex-shrink-0 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs opacity-70 ${isActive ? 'text-sidebar-primary-foreground/70' : 'text-sidebar-foreground/50'}`}>
                      {item.description}
                    </div>
                  </div>
                )}
              </Button>
            );
          })}
        </div>

        {/* User & Theme Controls */}
        <div className="p-4 border-t border-sidebar-border space-y-4">
          {/* Theme Toggle */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed && (
              <div className="flex items-center space-x-2 text-sidebar-foreground">
                <Sun className="w-4 h-4" />
                <span className="text-sm">Light</span>
              </div>
            )}
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-sidebar-primary"
            />
            {!collapsed && (
              <div className="flex items-center space-x-2 text-sidebar-foreground">
                <span className="text-sm">Dark</span>
                <Moon className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* User Info */}
          {user && (
            <Card className={`p-3 bg-sidebar-accent border-sidebar-border ${collapsed ? 'p-2' : ''}`}>
              <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-sidebar-accent-foreground/60 truncate">
                      {user.email}
                    </p>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={signOut}
                  className="text-sidebar-accent-foreground hover:bg-sidebar-border/50 flex-shrink-0"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}