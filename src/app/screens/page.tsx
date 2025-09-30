'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/sections/Sidebars'
import { Dashboard } from '@/sections/Dashboard';
import { MediaLibrary } from '@/sections/MediaLibrary';
import { PlaylistManager } from '@/sections/PlaylistManager';
import { ScreenManager } from '@/sections/ScreenManager';
import { Settings } from '@/sections/Settings';
import { AuthProvider } from '@/lib/Authcontexts';
import { ThemeProvider } from '@/lib/Themecontexts';
import { AuthWrapper } from '@/components/AuthWrappers';
import { Toaster } from '@/components/ui/sonner';
import '@/lib/setup-envs';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'media' | 'playlists' | 'screens' | 'settings'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onToggleCollapse={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : ''}`}>
        {currentPage === 'dashboard' && (
          <Dashboard 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            onPageChange={setCurrentPage}
          />
        )}
        {currentPage === 'media' && (
          <MediaLibrary 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
        {currentPage === 'playlists' && (
          <PlaylistManager 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
        {currentPage === 'screens' && (
          <ScreenManager 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
        {currentPage === 'settings' && (
          <Settings 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthWrapper>
          <MainApp />
        </AuthWrapper>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}