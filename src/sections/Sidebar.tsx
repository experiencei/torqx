import React from 'react';
import { BarChart3, FileText, Compass, Image, HelpCircle, Zap } from 'lucide-react';

const menuItems = [
  { id: 'campaigns', icon: BarChart3, label: 'Campaigns' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'discover', icon: Compass, label: 'Discover' },
  { id: 'gallery', icon: Image, label: 'Gallery' },
  // { id: 'help', icon: HelpCircle, label: 'Help & Support' },
];

interface SidebarProps {
  collapsed: boolean;
  currentPage: 'campaigns' | 'reports' | 'gallery' | 'discover';
  onPageChange: (page: 'campaigns' | 'reports' | 'gallery' | 'discover') => void;
  onToggleCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, currentPage, onPageChange, onToggleCollapse }: SidebarProps) {
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
      } fixed lg:relative top-0 left-0 h-full w-64 lg:w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50 lg:z-auto overflow-hidden`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-black whitespace-nowrap">Torqx AI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'campaigns' || item.id === 'reports' || item.id === 'gallery' || item.id === 'discover') {
                    onPageChange(item.id);
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      onToggleCollapse(true);
                    }
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  currentPage === item.id
                    ? 'bg-purple-50 text-purple-600 border border-purple-200' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}