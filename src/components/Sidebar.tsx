import React from 'react';
import { BarChart3, FileText, Compass, Image, Zap, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../lib/Authcontext';
import { useTheme } from '../lib/Themecontext';
import { Button } from './ui/button';
import { toast } from 'sonner';

const menuItems = [
  { id: 'campaigns', icon: BarChart3, label: 'Campaigns' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'discover', icon: Compass, label: 'Discover' },
  { id: 'gallery', icon: Image, label: 'Gallery' },
];

interface SidebarProps {
  collapsed: boolean;
  currentPage: 'campaigns' | 'reports' | 'gallery' | 'discover';
  onPageChange: (page: 'campaigns' | 'reports' | 'gallery' | 'discover') => void;
  onToggleCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, currentPage, onPageChange, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => onToggleCollapse(true)}
        />
      )}
      
      <div className={`${
        collapsed ? '-translate-x-full lg:translate-x-0 lg:w-0' : 'translate-x-0 lg:w-64'
      } fixed lg:sticky lg:top-0 top-0 left-0 h-screen w-64 lg:w-64 bg-background border-r border-border flex flex-col transition-all duration-300 z-50 lg:z-auto overflow-hidden`}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground whitespace-nowrap">Torqx AI</span>
          </div>
        </div>

        {/* Navigation */}
        {/* Navigation */}
<nav className="flex-1 p-4">
  <div className="space-y-2">
    {menuItems.map((item) => (
      <button
        key={item.id}
        onClick={() => {
          onPageChange(item.id);
          if (window.innerWidth < 1024) {
            onToggleCollapse(true);
          }
        }}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
          currentPage === item.id
            ? 'bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
            : 'text-gray-600 dark:text-gray-400 hover:text-foreground hover:bg-accent'
        }`}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        <span>{item.label}</span>
      </button>
    ))}
  </div>
</nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-border">
          {/* User Info */}
          {user && (
            <div className="mb-4 p-3 bg-accent rounded-lg">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          
          {/* Controls */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-full justify-start"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 mr-3" />
              ) : (
                <Moon className="w-4 h-4 mr-3" />
              )}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}