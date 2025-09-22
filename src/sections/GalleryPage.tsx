import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Menu, Upload, Search, MoreHorizontal, Play, Image as ImageIcon, 
  FileVideo, Calendar, Maximize, Tag, Link2, Plus, Eye, Edit3, Trash2
} from 'lucide-react';

interface GalleryPageProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface Creative {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  url: string;
  thumbnail: string;
  tags: string[];
  campaigns: string[];
  uploadDate: string;
  dimensions: string;
  duration?: string;
}

// Mock data
const mockCreatives: Creative[] = [
  {
    id: '1',
    name: 'Summer_Sale_Banner.jpg',
    type: 'image',
    size: '2.4 MB',
    url: '/api/placeholder/1920/1080',
    thumbnail: '/api/placeholder/400/300',
    tags: ['Retail', 'Sale', 'Summer'],
    campaigns: ['Summer Launch 2024', 'Brand Awareness Q1'],
    uploadDate: '2024-01-15',
    dimensions: '1920x1080'
  },
  {
    id: '2',
    name: 'Fitness_Promo_Video.mp4',
    type: 'video',
    size: '15.7 MB',
    url: '/api/placeholder/1920/1080',
    thumbnail: '/api/placeholder/400/300',
    tags: ['Fitness', 'Health', 'Promo'],
    campaigns: ['Fitness Campaign'],
    uploadDate: '2024-01-14',
    dimensions: '1920x1080',
    duration: '30s'
  },
  {
    id: '3',
    name: 'Corporate_Brand_Logo.png',
    type: 'image',
    size: '850 KB',
    url: '/api/placeholder/800/600',
    thumbnail: '/api/placeholder/400/300',
    tags: ['Corporate', 'Branding'],
    campaigns: ['Brand Awareness Q1'],
    uploadDate: '2024-01-13',
    dimensions: '800x600'
  },
  {
    id: '4',
    name: 'Food_Advertisement.jpg',
    type: 'image',
    size: '3.2 MB',
    url: '/api/placeholder/1080/1920',
    thumbnail: '/api/placeholder/400/300',
    tags: ['Food', 'Restaurant', 'Vertical'],
    campaigns: ['Food Delivery Launch'],
    uploadDate: '2024-01-12',
    dimensions: '1080x1920'
  },
  {
    id: '5',
    name: 'Tech_Product_Demo.mp4',
    type: 'video',
    size: '22.1 MB',
    url: '/api/placeholder/1920/1080',
    thumbnail: '/api/placeholder/400/300',
    tags: ['Technology', 'Product', 'Demo'],
    campaigns: ['Tech Launch'],
    uploadDate: '2024-01-11',
    dimensions: '1920x1080',
    duration: '45s'
  },
  {
    id: '6',
    name: 'Fashion_Lifestyle.jpg',
    type: 'image',
    size: '1.8 MB',
    url: '/api/placeholder/1200/800',
    thumbnail: '/api/placeholder/400/300',
    tags: ['Fashion', 'Lifestyle'],
    campaigns: [],
    uploadDate: '2024-01-10',
    dimensions: '1200x800'
  }
];

export function GalleryPage({ sidebarCollapsed, setSidebarCollapsed }: GalleryPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Filter creatives based on search and filters
  const filteredCreatives = mockCreatives.filter(creative => {
    const matchesSearch = creative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creative.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || creative.type === typeFilter;
    const matchesCampaign = campaignFilter === 'all' || creative.campaigns.includes(campaignFilter);
    
    return matchesSearch && matchesType && matchesCampaign;
  });

  const handleCreativeClick = (creative: Creative) => {
    setSelectedCreative(creative);
    setPreviewOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-black hover:bg-gray-100"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-black">Creative Gallery</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Manage and organize your creative assets</p>
            </div>
          </div>
          
          {/* Top Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search creatives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-white border-gray-300"
              />
            </div>
            
            {/* Filters */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="Summer Launch 2024">Summer Launch 2024</SelectItem>
                <SelectItem value="Brand Awareness Q1">Brand Awareness Q1</SelectItem>
                <SelectItem value="Fitness Campaign">Fitness Campaign</SelectItem>
                <SelectItem value="Tech Launch">Tech Launch</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Upload Button */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-50 overflow-auto">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredCreatives.map((creative) => (
            <Card 
              key={creative.id} 
              className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleCreativeClick(creative)}
            >
              <div className="relative">
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden relative">
                  <img 
                    src={creative.thumbnail} 
                    alt={creative.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Type Indicator */}
                  <div className="absolute top-2 left-2">
                    {creative.type === 'video' ? (
                      <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md flex items-center space-x-1">
                        <Play className="w-3 h-3" />
                        <span className="text-xs">{creative.duration}</span>
                      </div>
                    ) : (
                      <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-md">
                        <ImageIcon className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  
                  {/* Three-dot Menu */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="w-8 h-8 p-0 bg-black bg-opacity-75 text-white hover:bg-black hover:bg-opacity-90"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-gray-200">
                        <DropdownMenuItem className="text-black hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-black hover:bg-gray-50">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-black hover:bg-gray-50">
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-black truncate mb-2">{creative.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{creative.size}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {creative.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                    {creative.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        +{creative.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Linked Campaigns */}
                  {creative.campaigns.length > 0 ? (
                    <div className="flex items-center space-x-1 text-xs text-purple-600">
                      <Link2 className="w-3 h-3" />
                      <span>{creative.campaigns.length} campaign{creative.campaigns.length > 1 ? 's' : ''}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">No campaigns</div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCreatives.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">No creatives found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters, or upload new creatives.</p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Creative
            </Button>
          </div>
        )}
      </div>

      {/* Preview Panel Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-white border-gray-200">
          {selectedCreative && (
            <>
              <DialogHeader>
                <DialogTitle className="text-black">{selectedCreative.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview */}
                <div className="lg:col-span-2">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                    {selectedCreative.type === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <FileVideo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Video Preview</p>
                          <p className="text-sm text-gray-500">{selectedCreative.duration}</p>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={selectedCreative.url} 
                        alt={selectedCreative.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-75"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Metadata */}
                <div className="space-y-6">
                  {/* File Details */}
                  <div>
                    <h4 className="font-medium text-black mb-3">File Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="text-black capitalize">{selectedCreative.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="text-black">{selectedCreative.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dimensions:</span>
                        <span className="text-black">{selectedCreative.dimensions}</span>
                      </div>
                      {selectedCreative.duration && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="text-black">{selectedCreative.duration}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded:</span>
                        <span className="text-black">{formatDate(selectedCreative.uploadDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <h4 className="font-medium text-black mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCreative.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Campaign History */}
                  <div>
                    <h4 className="font-medium text-black mb-3">Campaign Usage</h4>
                    {selectedCreative.campaigns.length > 0 ? (
                      <div className="space-y-2">
                        {selectedCreative.campaigns.map((campaign) => (
                          <div key={campaign} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                            <Link2 className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-black">{campaign}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Not used in any campaigns yet</p>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-2">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to New Campaign
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-50">
                        <Edit3 className="w-4 h-4 mr-1" />
                        Rename
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}