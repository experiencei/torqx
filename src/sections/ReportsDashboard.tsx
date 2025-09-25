// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { Menu, Download, Calendar, TrendingUp, TrendingDown, Monitor, Eye, DollarSign, MapPin, Search, Lightbulb } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// interface ReportsDashboardProps {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }

// // Mock data
// const impressionsData = [
//   { date: 'Jan 1', impressions: 12000 },
//   { date: 'Jan 2', impressions: 15000 },
//   { date: 'Jan 3', impressions: 18000 },
//   { date: 'Jan 4', impressions: 14000 },
//   { date: 'Jan 5', impressions: 22000 },
//   { date: 'Jan 6', impressions: 25000 },
//   { date: 'Jan 7', impressions: 28000 },
// ];

// interface VenueDatum {
//   name: string;
//   value: number;
//   color: string;
// }

// const venueData = [
//   { name: 'Grocery', value: 35, color: '#8b5cf6' },
//   { name: 'Retail', value: 28, color: '#06b6d4' },
//   { name: 'Corporate', value: 20, color: '#10b981' },
//   { name: 'Gyms', value: 12, color: '#f59e0b' },
//   { name: 'Urban Panels', value: 5, color: '#ef4444' },
// ];

// const screensData = [
//   { id: 'SC001', venue: 'Mall of Lagos', city: 'Lagos', impressions: 45230, cpm: 420, status: 'Active' },
//   { id: 'SC002', venue: 'Shoprite Ikeja', city: 'Lagos', impressions: 38940, cpm: 450, status: 'Active' },
//   { id: 'SC003', venue: 'Abuja Central', city: 'Abuja', impressions: 32100, cpm: 380, status: 'Active' },
//   { id: 'SC004', venue: 'Fitness First', city: 'Lagos', impressions: 28750, cpm: 520, status: 'Paused' },
//   { id: 'SC005', venue: 'Corporate Plaza', city: 'Lagos', impressions: 25600, cpm: 390, status: 'Active' },
// ];

// export function ReportsDashboard({ sidebarCollapsed, setSidebarCollapsed }: ReportsDashboardProps) {
//   const [selectedCampaign, setSelectedCampaign] = useState('all');
//   const [dateRange, setDateRange] = useState('7days');
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredScreens = screensData.filter(screen => 
//     screen.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     screen.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     screen.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       {/* Header */}
//       <header className="px-4 md:px-8 py-6 border-b border-gray-200 bg-white">
//         <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="text-black hover:bg-gray-100"
//             >
//               <Menu className="w-4 h-4" />
//             </Button>
//             <div>
//               <h1 className="text-xl md:text-2xl font-semibold text-black">Campaign Reports</h1>
//               <p className="text-gray-600 mt-1 text-sm md:text-base">Monitor and analyze your campaign performance</p>
//             </div>
//           </div>
          
//           {/* Filter Bar */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
//               <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300">
//                 <SelectValue placeholder="Select Campaign" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Campaigns</SelectItem>
//                 <SelectItem value="campaign1">Summer Launch 2024</SelectItem>
//                 <SelectItem value="campaign2">Brand Awareness Q1</SelectItem>
//                 <SelectItem value="campaign3">Product Launch</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select value={dateRange} onValueChange={setDateRange}>
//               <SelectTrigger className="w-full sm:w-40 bg-white border-gray-300">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="7days">Last 7 days</SelectItem>
//                 <SelectItem value="30days">Last 30 days</SelectItem>
//                 <SelectItem value="90days">Last 90 days</SelectItem>
//                 <SelectItem value="custom">Custom Range</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50">
//               <Download className="w-4 h-4 mr-2" />
//               <span className="hidden sm:inline">Export</span>
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 bg-gray-50 overflow-auto">
//         {/* Key Metrics Row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Impressions</p>
//                 <p className="text-2xl md:text-3xl font-semibold text-black mt-1">2.4M</p>
//                 <div className="flex items-center mt-2">
//                   <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//                   <span className="text-sm text-green-600">+12.5%</span>
//                 </div>
//               </div>
//               <Eye className="w-8 h-8 text-purple-600" />
//             </div>
//           </Card>

//           <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Screens Activated</p>
//                 <p className="text-2xl md:text-3xl font-semibold text-black mt-1">157</p>
//                 <div className="flex items-center mt-2">
//                   <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//                   <span className="text-sm text-green-600">+8.2%</span>
//                 </div>
//               </div>
//               <Monitor className="w-8 h-8 text-blue-600" />
//             </div>
//           </Card>

//           <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Average CPM</p>
//                 <p className="text-2xl md:text-3xl font-semibold text-black mt-1">₦445</p>
//                 <div className="flex items-center mt-2">
//                   <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
//                   <span className="text-sm text-red-600">-3.1%</span>
//                 </div>
//               </div>
//               <DollarSign className="w-8 h-8 text-green-600" />
//             </div>
//           </Card>

//           <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Budget Spent</p>
//                 <p className="text-2xl md:text-3xl font-semibold text-black mt-1">₦1.2M</p>
//                 <p className="text-sm text-gray-500 mt-1">of ₦2.0M allocated</p>
//                 <Progress value={60} className="mt-2" />
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Performance Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
//           {/* Impressions Chart */}
//           <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//             <h3 className="text-lg font-semibold text-black mb-4">Impressions Over Time</h3>
//             <div className="h-64 md:h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={impressionsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                   <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
//                   <YAxis stroke="#64748b" fontSize={12} />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: 'white', 
//                       border: '1px solid #e2e8f0',
//                       borderRadius: '8px'
//                     }} 
//                   />
//                   <Line 
//                     type="monotone" 
//                     dataKey="impressions" 
//                     stroke="#8b5cf6" 
//                     strokeWidth={3}
//                     dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </Card>

//           {/* Venue Breakdown */}
//           <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//             <h3 className="text-lg font-semibold text-black mb-4">Venue Type Performance</h3>
//             <div className="h-64 md:h-80 flex items-center justify-center">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={venueData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     dataKey="value"
//                     label={({ name , value }: { name: string; value: number }) => `${name}: ${value}%`}
//                     labelLine={false}
//                   >
//                     {venueData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </Card>
//         </div>

//         {/* Geo Distribution */}
//         <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//           <h3 className="text-lg font-semibold text-black mb-4">Geographic Distribution</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <MapPin className="w-5 h-5 text-purple-600" />
//                 <div>
//                   <p className="font-medium text-black">Lagos</p>
//                   <p className="text-sm text-gray-600">89 screens</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold text-black">1.8M</p>
//                 <p className="text-sm text-gray-600">impressions</p>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <MapPin className="w-5 h-5 text-blue-600" />
//                 <div>
//                   <p className="font-medium text-black">Abuja</p>
//                   <p className="text-sm text-gray-600">42 screens</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold text-black">620K</p>
//                 <p className="text-sm text-gray-600">impressions</p>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <MapPin className="w-5 h-5 text-green-600" />
//                 <div>
//                   <p className="font-medium text-black">Port Harcourt</p>
//                   <p className="text-sm text-gray-600">26 screens</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold text-black">285K</p>
//                 <p className="text-sm text-gray-600">impressions</p>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Screens Performance Table */}
//         <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
//             <h3 className="text-lg font-semibold text-black">Screen Performance</h3>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//               <Input
//                 placeholder="Search screens..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full md:w-64 bg-white border-gray-300"
//               />
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-2 font-medium text-gray-900">Screen ID</th>
//                   <th className="text-left py-3 px-2 font-medium text-gray-900">Venue</th>
//                   <th className="text-left py-3 px-2 font-medium text-gray-900">City</th>
//                   <th className="text-left py-3 px-2 font-medium text-gray-900">Impressions</th>
//                   <th className="text-left py-3 px-2 font-medium text-gray-900">CPM</th>
//                   <th className="text-left py-3 px-2 font-medium text-gray-900">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredScreens.map((screen) => (
//                   <tr key={screen.id} className="border-b border-gray-100 hover:bg-gray-50">
//                     <td className="py-3 px-2 font-mono text-purple-600">{screen.id}</td>
//                     <td className="py-3 px-2 text-black">{screen.venue}</td>
//                     <td className="py-3 px-2 text-gray-600">{screen.city}</td>
//                     <td className="py-3 px-2 text-black font-medium">{screen.impressions.toLocaleString()}</td>
//                     <td className="py-3 px-2 text-black">₦{screen.cpm}</td>
//                     <td className="py-3 px-2">
//                       <Badge 
//                         variant={screen.status === 'Active' ? 'default' : 'secondary'}
//                         className={screen.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
//                       >
//                         {screen.status}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>

//         {/* AI Insights */}
//         <Card className="p-4 md:p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
//           <div className="flex items-start space-x-3">
//             <Lightbulb className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
//             <div>
//               <h3 className="text-lg font-semibold text-black mb-2">AI-Powered Insights</h3>
//               <p className="text-gray-700 mb-3">
//                 Your campaign is performing 23% better during weekday lunch hours (12-2 PM). 
//                 Consider reallocating 15% more budget to these high-performing time slots for optimal ROI.
//               </p>
//               <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
//                 <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
//                   Apply Suggestion
//                 </Button>
//                 <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
//                   View More Insights
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Menu, Download, TrendingUp, TrendingDown, Monitor,
  Eye, DollarSign, MapPin, Search
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// ---- Appwrite Setup ----
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const CAMPAIGN_DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const CAMPAIGN_COLLECTION_ID = import.meta.env.VITE_APPWRITE_CAMPAIGN_COLLECTION_ID;
const VENUE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_VENUE_COLLECTION_ID;

// ---- Helpers ----
const getImpressionsOverTime = (budget: number, start: string, end: string) => {
  const impressionsPerDay = budget;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  const data: { date: string; impressions: number }[] = [];
  let accumulated = 0;

  for (let i = 0; i < days; i++) {
    accumulated += impressionsPerDay;
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      impressions: accumulated,
    });
  }
  return data;
};

const generateVenueData = (venues: any[]) => {
  if (!venues.length) return [];
  let remaining = 100;
  return venues.map((venue, index) => {
    let value = index === venues.length - 1
      ? remaining
      : Math.floor(Math.random() * (remaining / (venues.length - index)));
    remaining -= value;
    return {
      name: venue.type,
      value,
      color: ['#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444'][index % 5]
    };
  });
};

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
};

// ---- Static Screens (for now) ----
const screensData = [
  { id: 'SC001', venue: 'Mall of Lagos', city: 'Lagos', impressions: 45230, cpm: 420, status: 'Active' },
  { id: 'SC002', venue: 'Shoprite Ikeja', city: 'Lagos', impressions: 38940, cpm: 450, status: 'Active' },
  { id: 'SC003', venue: 'Abuja Central', city: 'Abuja', impressions: 32100, cpm: 380, status: 'Active' },
  { id: 'SC004', venue: 'Fitness First', city: 'Lagos', impressions: 28750, cpm: 520, status: 'Paused' },
  { id: 'SC005', venue: 'Corporate Plaza', city: 'Lagos', impressions: 25600, cpm: 390, status: 'Active' },
];

interface ReportsDashboardProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export function ReportsDashboard({ sidebarCollapsed, setSidebarCollapsed }: ReportsDashboardProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('all');
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [impressionsData, setImpressionsData] = useState<any[]>([]);
  const [venueData, setVenueData] = useState<any[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignRes = await databases.listDocuments(CAMPAIGN_DB_ID, CAMPAIGN_COLLECTION_ID);
        const venueRes = await databases.listDocuments(CAMPAIGN_DB_ID, VENUE_COLLECTION_ID);

        setCampaigns(campaignRes.documents);
        setVenues(venueRes.documents);

        if (campaignRes.documents.length > 0) {
          const first = campaignRes.documents[0];
          setActiveCampaign(first);
          setImpressionsData(getImpressionsOverTime(first.budget, first.startDate, first.endDate));

          // Match venues linked to campaign
          const linkedVenues = venueRes.documents.filter((v: any) =>
            first.selectedVenues?.includes(v.$id)
          );
          setVenueData(generateVenueData(linkedVenues));
        }
      } catch (err) {
        console.error("Error fetching reports data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCampaignId !== 'all') {
      const campaign = campaigns.find(c => c.$id === selectedCampaignId);
      if (campaign) {
        setActiveCampaign(campaign);
        setImpressionsData(getImpressionsOverTime(campaign.budget, campaign.startDate, campaign.endDate));

        const linkedVenues = venues.filter((v: any) =>
          campaign.selectedVenues?.includes(v.$id)
        );
        setVenueData(generateVenueData(linkedVenues));
      }
    }
  }, [selectedCampaignId]);

  if (!activeCampaign) return <div className="p-6">Loading reports...</div>;

  const totalImpressions = impressionsData.length ? impressionsData[impressionsData.length - 1].impressions : 0;

  const filteredScreens = screensData.filter(screen =>
    screen.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    screen.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    screen.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
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
              <h1 className="text-xl md:text-2xl font-semibold text-black">Campaign Reports</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Monitor and analyze your campaign performance</p>
            </div>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300">
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="campaign1">Summer Launch 2024</SelectItem>
                <SelectItem value="campaign2">Brand Awareness Q1</SelectItem>
                <SelectItem value="campaign3">Product Launch</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-40 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 bg-gray-50 overflow-auto">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Impressions</p>
                <p className="text-2xl md:text-3xl font-semibold text-black mt-1">{formatNumber(totalImpressions)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Screens Activated</p>
                <p className="text-2xl md:text-3xl font-semibold text-black mt-1">157</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.2%</span>
                </div>
              </div>
              <Monitor className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average CPM</p>
                <p className="text-2xl md:text-3xl font-semibold text-black mt-1">₦445</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-3.1%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Budget Spent</p>
                <p className="text-2xl md:text-3xl font-semibold text-black mt-1">₦1.2M</p>
                <p className="text-sm text-gray-500 mt-1">of ₦2.0M allocated</p>
                <Progress value={60} className="mt-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Impressions Chart */}
          <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-4">Impressions Over Time</h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impressionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Venue Breakdown */}
          <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-4">Venue Type Performance</h3>
            <div className="h-64 md:h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={venueData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name , value }: { name: string; value: number }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {venueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Geo Distribution */}
        <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Geographic Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-black">Lagos</p>
                  <p className="text-sm text-gray-600">89 screens</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-black">1.8M</p>
                <p className="text-sm text-gray-600">impressions</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-black">Abuja</p>
                  <p className="text-sm text-gray-600">42 screens</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-black">620K</p>
                <p className="text-sm text-gray-600">impressions</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-black">Port Harcourt</p>
                  <p className="text-sm text-gray-600">26 screens</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-black">285K</p>
                <p className="text-sm text-gray-600">impressions</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Screens Performance Table */}
        <Card className="p-4 md:p-6 bg-white border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
            <h3 className="text-lg font-semibold text-black">Screen Performance</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search screens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64 bg-white border-gray-300"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-900">Screen ID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">Venue</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">City</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">Impressions</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">CPM</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredScreens.map((screen) => (
                  <tr key={screen.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-purple-600">{screen.id}</td>
                    <td className="py-3 px-2 text-black">{screen.venue}</td>
                    <td className="py-3 px-2 text-black">{screen.city}</td>
                    <td className="py-3 px-2 text-black">{formatNumber(screen.impressions)}</td>
                    <td className="py-3 px-2 text-black">₦{screen.cpm}</td>
                    <td className="py-3 px-2">
                      <Badge variant={screen.status === 'Active' ? 'default' : 'secondary'}>
                        {screen.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
