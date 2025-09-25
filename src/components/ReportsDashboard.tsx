import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Menu, Download, Calendar, TrendingUp, TrendingDown, Monitor, Eye, DollarSign, MapPin, Search, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../lib/Authcontext';
import { appwriteService } from '../lib/appwrite';
import { toast } from 'sonner';

interface ReportsDashboardProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

// Mock data
const impressionsData = [
  { date: 'Jan 1', impressions: 12000 },
  { date: 'Jan 2', impressions: 15000 },
  { date: 'Jan 3', impressions: 18000 },
  { date: 'Jan 4', impressions: 14000 },
  { date: 'Jan 5', impressions: 22000 },
  { date: 'Jan 6', impressions: 25000 },
  { date: 'Jan 7', impressions: 28000 },
];

const venueData = [
  { name: 'Grocery', value: 35, color: '#8b5cf6' },
  { name: 'Retail', value: 28, color: '#06b6d4' },
  { name: 'Corporate', value: 20, color: '#10b981' },
  { name: 'Gyms', value: 12, color: '#f59e0b' },
  { name: 'Urban Panels', value: 5, color: '#ef4444' },
];

const screensData = [
  { id: 'SC001', venue: 'Mall of Lagos', city: 'Lagos', impressions: 45230, cpm: 420, status: 'Active' },
  { id: 'SC002', venue: 'Shoprite Ikeja', city: 'Lagos', impressions: 38940, cpm: 450, status: 'Active' },
  { id: 'SC003', venue: 'Abuja Central', city: 'Abuja', impressions: 32100, cpm: 380, status: 'Active' },
  { id: 'SC004', venue: 'Fitness First', city: 'Lagos', impressions: 28750, cpm: 520, status: 'Paused' },
  { id: 'SC005', venue: 'Corporate Plaza', city: 'Lagos', impressions: 25600, cpm: 390, status: 'Active' },
];

export function ReportsDashboard({ sidebarCollapsed, setSidebarCollapsed }: ReportsDashboardProps) {
  const { user } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [impressionsData, setImpressionsData] = useState<any[]>([]);
  const [venueData, setVenueData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalImpressions: 0,
    screensActivated: 0,
    averageCPM: 0,
    budgetSpent: 0,
    totalBudget: 0
  });

  useEffect(() => {
    if (user) {
      loadCampaignData();
    }
  }, [user, selectedCampaign, dateRange]);

  const loadCampaignData = async () => {
    try {
      setLoading(true);
      const campaignsResponse = await appwriteService.getCampaigns(user!.$id);
      setCampaigns(campaignsResponse.documents);
      
      // Calculate metrics from campaigns
      calculateMetrics(campaignsResponse.documents);
      generateImpressionsData(campaignsResponse.documents);
      generateVenueData(campaignsResponse.documents);
    } catch (error: any) {
      toast.error('Failed to load campaign data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (campaigns: any[]) => {
    let totalImpressions = 0;
    let totalBudget = 0;
    let budgetSpent = 0;
    let totalCPM = 0;
    let screensCount = 0;

    const activeCampaigns = campaigns.filter(c => c.status === 'active');

    activeCampaigns.forEach(campaign => {
      // Calculate impressions based on budget and date range
      const startDate = new Date(campaign.startDate);
      const endDate = new Date(campaign.endDate);
      const currentDate = new Date();
      const daysPassed = Math.max(0, Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate current impressions based on time elapsed
      const expectedTotalImpressions = campaign.estimatedImpressions || 0;
      const dailyImpressions = expectedTotalImpressions / totalDays;
      const currentImpressions = Math.min(dailyImpressions * daysPassed, expectedTotalImpressions);
      
      totalImpressions += Math.floor(currentImpressions);
      totalBudget += campaign.budget || 0;
      
      // Calculate budget spent proportionally
      const spentRatio = Math.min(daysPassed / totalDays, 1);
      budgetSpent += (campaign.budget || 0) * spentRatio;
      
      totalCPM += campaign.cpm || 450;
      screensCount += campaign.screensCount || 0;
    });

    setMetrics({
      totalImpressions,
      screensActivated: screensCount,
      averageCPM: activeCampaigns.length > 0 ? Math.floor(totalCPM / activeCampaigns.length) : 450,
      budgetSpent: Math.floor(budgetSpent),
      totalBudget
    });
  };

  const generateImpressionsData = (campaigns: any[]) => {
    const data = [];
    const days = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      let dailyImpressions = 0;
      campaigns.forEach(campaign => {
        if (campaign.status === 'active') {
          const startDate = new Date(campaign.startDate);
          const endDate = new Date(campaign.endDate);
          
          if (date >= startDate && date <= endDate) {
            const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const expectedImpressions = campaign.estimatedImpressions || 0;
            dailyImpressions += Math.floor(expectedImpressions / totalDays);
          }
        }
      });
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        impressions: dailyImpressions
      });
    }
    
    setImpressionsData(data);
  };

  const generateVenueData = (campaigns: any[]) => {
    const venueTypes: { [key: string]: number } = {};
    
    campaigns.forEach(campaign => {
      if (campaign.selectedVenues && Array.isArray(campaign.selectedVenues)) {
        campaign.selectedVenues.forEach((venue: string) => {
          venueTypes[venue] = (venueTypes[venue] || 0) + 1;
        });
      }
    });

    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    const data = Object.entries(venueTypes).map(([name, count], index) => ({
      name,
      value: count,
      color: colors[index % colors.length]
    }));

    setVenueData(data);
  };

  const filteredScreens = screensData.filter(screen => 
    screen.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    screen.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    screen.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-border bg-background">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-foreground">Campaign Reports</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">Monitor and analyze your campaign performance</p>
            </div>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.$id} value={campaign.$id}>
                    {campaign.brandName || 'Untitled Campaign'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 bg-background overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="mb-6">
              <svg width="120" height="120" viewBox="0 0 120 120" className="text-muted-foreground">
                <rect x="20" y="80" width="15" height="30" fill="currentColor" opacity="0.3" rx="2">
                  <animate attributeName="height" values="30;10;30" dur="1.5s" repeatCount="indefinite" begin="0s"/>
                  <animate attributeName="y" values="80;100;80" dur="1.5s" repeatCount="indefinite" begin="0s"/>
                </rect>
                <rect x="40" y="70" width="15" height="40" fill="currentColor" opacity="0.6" rx="2">
                  <animate attributeName="height" values="40;20;40" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                  <animate attributeName="y" values="70;90;70" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                </rect>
                <rect x="60" y="60" width="15" height="50" fill="currentColor" rx="2">
                  <animate attributeName="height" values="50;25;50" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                  <animate attributeName="y" values="60;85;60" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                </rect>
                <rect x="80" y="75" width="15" height="35" fill="currentColor" opacity="0.8" rx="2">
                  <animate attributeName="height" values="35;15;35" dur="1.5s" repeatCount="indefinite" begin="0.9s"/>
                  <animate attributeName="y" values="75;95;75" dur="1.5s" repeatCount="indefinite" begin="0.9s"/>
                </rect>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Launch your first campaign to see the magic!</h3>
            <p className="text-muted-foreground max-w-md">
              Create and launch your first DOOH advertising campaign to see real-time analytics, 
              performance metrics, and AI-powered insights here.
            </p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="mb-6">
              <svg width="120" height="120" viewBox="0 0 120 120" className="text-muted-foreground">
                <rect x="20" y="80" width="15" height="30" fill="currentColor" opacity="0.3" rx="2"/>
                <rect x="40" y="70" width="15" height="40" fill="currentColor" opacity="0.6" rx="2"/>
                <rect x="60" y="60" width="15" height="50" fill="currentColor" rx="2"/>
                <rect x="80" y="75" width="15" height="35" fill="currentColor" opacity="0.8" rx="2"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Launch your first campaign to see the magic!</h3>
            <p className="text-muted-foreground max-w-md">
              Create and launch your first DOOH advertising campaign to see real-time analytics, 
              performance metrics, and AI-powered insights here.
            </p>
          </div>
        ) : (
          <>
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Impressions</p>
                    <p className="text-2xl md:text-3xl font-semibold text-foreground mt-1">
                      {metrics.totalImpressions >= 1000000 
                        ? `${(metrics.totalImpressions / 1000000).toFixed(1)}M`
                        : `${(metrics.totalImpressions / 1000).toFixed(0)}K`
                      }
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Live data</span>
                    </div>
                  </div>
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Screens Activated</p>
                    <p className="text-2xl md:text-3xl font-semibold text-foreground mt-1">{metrics.screensActivated}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Active now</span>
                    </div>
                  </div>
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average CPM</p>
                    <p className="text-2xl md:text-3xl font-semibold text-foreground mt-1">₦{metrics.averageCPM}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Optimized</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Spent</p>
                    <p className="text-2xl md:text-3xl font-semibold text-foreground mt-1">
                      ₦{(metrics.budgetSpent / 1000).toFixed(0)}K
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      of ₦{(metrics.totalBudget / 1000).toFixed(0)}K allocated
                    </p>
                    <Progress 
                      value={metrics.totalBudget > 0 ? (metrics.budgetSpent / metrics.totalBudget) * 100 : 0} 
                      className="mt-2" 
                    />
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Performance Section */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Impressions Chart */}
            <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Impressions Over Time</h3>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impressionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
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
            <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Venue Type Performance</h3>
              <div className="h-64 md:h-80 flex items-center justify-center">
                {venueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={venueData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={false}
                      >
                        {venueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>No venue data available</p>
                    <p className="text-sm mt-1">Create campaigns to see venue performance</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Geo Distribution */}
        <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Geographic Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-foreground">Lagos</p>
                  <p className="text-sm text-muted-foreground">89 screens</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">1.8M</p>
                <p className="text-sm text-muted-foreground">impressions</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-foreground">Abuja</p>
                  <p className="text-sm text-muted-foreground">42 screens</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">620K</p>
                <p className="text-sm text-muted-foreground">impressions</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-foreground">Port Harcourt</p>
                  <p className="text-sm text-muted-foreground">26 screens</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">285K</p>
                <p className="text-sm text-muted-foreground">impressions</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Screens Performance Table */}
        <Card className="p-4 md:p-6 bg-card border-border shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
            <h3 className="text-lg font-semibold text-foreground">Screen Performance</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search screens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Screen ID</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Venue</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">City</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Impressions</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">CPM</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredScreens.map((screen) => (
                  <tr key={screen.id} className="border-b border-border hover:bg-accent cursor-pointer transition-colors">
                    <td className="py-3 px-2 font-mono text-purple-600">{screen.id}</td>
                    <td className="py-3 px-2 text-foreground">{screen.venue}</td>
                    <td className="py-3 px-2 text-muted-foreground">{screen.city}</td>
                    <td className="py-3 px-2 text-foreground font-medium">{screen.impressions.toLocaleString()}</td>
                    <td className="py-3 px-2 text-foreground">₦{screen.cpm}</td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant={screen.status === 'Active' ? 'default' : 'secondary'}
                        className={screen.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'}
                      >
                        {screen.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-4 md:p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground mb-3">
                Your campaign is performing 23% better during weekday lunch hours (12-2 PM). 
                Consider reallocating 15% more budget to these high-performing time slots for optimal ROI.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                  Apply Suggestion
                </Button>
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20 cursor-pointer">
                  View More Insights
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}