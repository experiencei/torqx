import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Menu,
  Search,
  Filter,
  MapPin,
  Eye,
  Plus,
  Monitor,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Star,
  X,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { appwriteService } from '../lib/appwrite';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DiscoverPageProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface Venue {
  $id: string;
  name: string;
  type: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  screenCount: number;
  dailyImpressions: number;
  cpm: number;
  amenities?: string[];
  operatingHours: string;
  status: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}



export function DiscoverPage({
  sidebarCollapsed,
  setSidebarCollapsed,
}: DiscoverPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [venueTypeFilter, setVenueTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("reach");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [hoveredVenue, setHoveredVenue] = useState<string | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedVenues, setAddedVenues] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      setLoading(true);
      const response = await appwriteService.getVenues();
      setVenues(response.documents);
    } catch (error: any) {
      toast.error('Failed to load venues: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort venues
  const filteredVenues = venues
    .filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = countryFilter === "all" || venue.country === countryFilter;
      const matchesCity = cityFilter === "all" || venue.city === cityFilter;
      const matchesType = venueTypeFilter === "all" || venue.type === venueTypeFilter;

      return matchesSearch && matchesCountry && matchesCity && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "reach":
          return b.dailyImpressions - a.dailyImpressions;
        case "cpm":
          return a.cpm - b.cpm;
        case "venue":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const handleAddToCampaign = (venue: Venue) => {
    setAddedVenues(prev => new Set([...prev, venue.$id]));
    toast.success(`${venue.name} added to campaign selection!`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-border bg-background">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
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
              <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                Discover Venues
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Find and explore advertising venues for your campaigns
              </p>
            </div>
          </div>

          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by city, venue, region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Filters */}
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {[...new Set(venues.map(v => v.city))].map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={venueTypeFilter} onValueChange={setVenueTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Venue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {[...new Set(venues.map(v => v.type))].map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reach">By Reach</SelectItem>
                <SelectItem value="cpm">By CPM</SelectItem>
                <SelectItem value="venue">By Venue Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Interactive Map */}
        <div className="w-full lg:w-1/2 h-64 lg:h-full bg-accent relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-foreground mb-2">Loading Map</h3>
                <p className="text-muted-foreground">Fetching venue locations...</p>
              </div>
            </div>
          ) : filteredVenues.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Venues Available</h3>
                <p className="text-muted-foreground">Add venues in Appwrite console to see them here</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">Venue locations with hover details</p>
                <p className="text-xs text-muted-foreground mt-2">Mapbox integration ready</p>
              </div>
            </div>
          )}

          {/* Map Pins Overlay */}
          {!loading && filteredVenues.length > 0 && (
            <div className="absolute inset-0 p-4">
              {filteredVenues.map((venue, index) => (
                <div
                  key={venue.$id}
                  className={`absolute w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer transform transition-all duration-200 ${
                    hoveredVenue === venue.$id ? "scale-125 z-10" : ""
                  }`}
                  style={{
                    left: `${20 + ((index * 15) % 60)}%`,
                    top: `${30 + ((index * 20) % 40)}%`,
                  }}
                  onMouseEnter={() => setHoveredVenue(venue.$id)}
                  onMouseLeave={() => setHoveredVenue(null)}
                  onClick={() => setSelectedVenue(venue)}
                >
                  <Monitor className="w-4 h-4 text-white" />

                  {/* Hover Tooltip */}
                  {hoveredVenue === venue.$id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover text-popover-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 border border-border shadow-md">
                      <div className="font-medium">{venue.name}</div>
                      <div className="text-xs opacity-75">
                        {formatNumber(venue.dailyImpressions)} daily impressions
                      </div>
                      <div className="text-xs opacity-75">₦{venue.cpm} CPM</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Venue Cards */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 bg-background overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading venues...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVenues.map((venue) => (
                <Card
                  key={venue.$id}
                  className="bg-card border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 md:p-6"
                  onClick={() => setSelectedVenue(venue)}
                  onMouseEnter={() => setHoveredVenue(venue.$id)}
                  onMouseLeave={() => setHoveredVenue(null)}
                >
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
                    {/* Venue Image */}
                    <div className="w-full md:w-24 h-48 md:h-16 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                      {venue.imageUrl ? (
                        <ImageWithFallback
                          src={venue.imageUrl}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Monitor className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{venue.name}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                              {venue.type}
                            </Badge>
                            <Badge variant="outline" className={venue.status === 'active' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}>
                              {venue.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {venue.city}, {venue.state}
                          </div>
                          {venue.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{venue.description}</p>
                          )}
                        </div>

                        <Button
                          size="sm"
                          className={`mt-2 md:mt-0 cursor-pointer ${
                            addedVenues.has(venue.$id)
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCampaign(venue);
                          }}
                          disabled={addedVenues.has(venue.$id)}
                        >
                          {addedVenues.has(venue.$id) ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-1" />
                              Add to Campaign
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                            <Eye className="w-4 h-4" />
                            <span>Daily Impressions</span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {formatNumber(venue.dailyImpressions)}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span>CPM</span>
                          </div>
                          <p className="font-semibold text-foreground">₦{venue.cpm}</p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                            <Monitor className="w-4 h-4" />
                            <span>Screens</span>
                          </div>
                          <p className="font-semibold text-foreground">{venue.screenCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Empty State */}
              {!loading && filteredVenues.length === 0 && venues.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Venues Available</h3>
                  <p className="text-muted-foreground">
                    Add venue data to your Appwrite console to see venues here.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check the setup guide for details on populating venue data.
                  </p>
                </div>
              )}

              {/* No Results State */}
              {!loading && filteredVenues.length === 0 && venues.length > 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No venues found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find venues.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Venue Detail Panel */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto border border-border">
            <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">{selectedVenue.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVenue(null)}
                className="cursor-pointer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Venue Preview */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Venue Preview</h3>
                    <div className="aspect-video bg-accent rounded-lg overflow-hidden">
                      {selectedVenue.imageUrl ? (
                        <ImageWithFallback
                          src={selectedVenue.imageUrl}
                          alt={selectedVenue.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Monitor className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Map Snippet */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Location</h3>
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                        <p className="font-medium text-foreground">{selectedVenue.city}</p>
                        <p className="text-sm text-muted-foreground">{selectedVenue.state}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Lat: {selectedVenue.latitude.toFixed(4)}, Lng: {selectedVenue.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        {selectedVenue.type}
                      </Badge>
                      <Badge variant="outline" className={selectedVenue.status === 'active' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}>
                        {selectedVenue.status}
                      </Badge>
                    </div>

                    {selectedVenue.description && (
                      <p className="text-muted-foreground mb-4">{selectedVenue.description}</p>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-lg font-semibold text-foreground">
                          {formatNumber(selectedVenue.dailyImpressions)}
                        </p>
                        <p className="text-sm text-muted-foreground">Daily Impressions</p>
                      </div>

                      <div className="text-center p-4 bg-accent rounded-lg">
                        <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-lg font-semibold text-foreground">
                          {selectedVenue.screenCount}
                        </p>
                        <p className="text-sm text-muted-foreground">Screens</p>
                      </div>
                    </div>
                  </div>

                  {/* Venue Details */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Venue Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Operating Hours:</span>
                        <span className="text-sm font-medium text-foreground">
                          {selectedVenue.operatingHours}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Base CPM:</span>
                        <span className="text-sm font-medium text-foreground">₦{selectedVenue.cpm}</span>
                      </div>
                      {selectedVenue.amenities && selectedVenue.amenities.length > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground block mb-2">Amenities:</span>
                          <div className="flex flex-wrap gap-1">
                            {selectedVenue.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sample Pricing */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Estimated Pricing</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">Weekly Campaign</p>
                          <p className="text-sm text-muted-foreground">7 days exposure</p>
                        </div>
                        <p className="font-semibold text-purple-600">
                          ₦{formatNumber(selectedVenue.cpm * selectedVenue.dailyImpressions * 7 / 1000)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">Monthly Campaign</p>
                          <p className="text-sm text-muted-foreground">30 days exposure</p>
                        </div>
                        <p className="font-semibold text-purple-600">
                          ₦{formatNumber(selectedVenue.cpm * selectedVenue.dailyImpressions * 30 / 1000)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full cursor-pointer ${
                      addedVenues.has(selectedVenue.$id)
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                    onClick={() => handleAddToCampaign(selectedVenue)}
                    disabled={addedVenues.has(selectedVenue.$id)}
                  >
                    {addedVenues.has(selectedVenue.$id) ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Added to Campaign
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Add to Campaign
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}