'use client';

import React, { useState , useEffect } from 'react';
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { Sidebar } from '@/sections/Sidebar';
import { CampaignCreation } from '@/sections/CampaignCreation';
import { ReportsDashboard } from '@/sections/ReportsDashboard';
import { GalleryPage } from '@/sections/GalleryPage';
import { DiscoverPage } from '@/sections/DiscoverPage';
import  { Skeleton } from '@/components/ui/skeleton';



export default function App() {
  const [currentPage, setCurrentPage] = useState<'campaigns' | 'reports' | 'gallery' | 'discover'>('campaigns');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userAccount = await account.get();
        setUser(userAccount);
      } catch (err) {
        // No active session, redirect to login
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <Skeleton/>;
  if (!user) return null; // will redirect

  return (
    <div className="min-h-screen bg-white text-black flex">
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



