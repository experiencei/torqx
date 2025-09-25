'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { CampaignCreation } from '@/components/CampaignCreation';
import { ReportsDashboard } from '@/components/ReportsDashboard';
import { GalleryPage } from '@/components/GalleryPage';
import { DiscoverPage } from '@/components/DiscoverPage';
import { AuthProvider } from '@/lib/Authcontext';
import { ThemeProvider } from '@/lib/Themecontext';
import { AuthWrapper } from '@/components/AuthWrapper';
import { Toaster } from '@/components/ui/sonner';
import '@/lib/setup-env';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<'campaigns' | 'reports' | 'gallery' | 'discover'>('campaigns');
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
        {currentPage === 'campaigns' && (
          <CampaignCreation 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
        {currentPage === 'reports' && (
          <ReportsDashboard 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
        {currentPage === 'discover' && (
          <DiscoverPage 
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