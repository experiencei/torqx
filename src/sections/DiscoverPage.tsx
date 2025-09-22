import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Search,
  Filter,
  MapPin,
  Eye,
  Monitor,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Star,
  X,
  Plus,
  ArrowLeft,
} from "lucide-react";

interface DiscoverPageProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface Venue {
  id: string;
  name: string;
  type: string;
  location: {
    city: string;
    region: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  impressions: number;
  cpm: number;
  screenCount: number;
  rating: number;
  image: string;
  audienceInsights: {
    demographics: string;
    peakHours: string;
    footfall: number;
  };
  pricing: {
    packages: {
      name: string;
      price: number;
      duration: string;
    }[];
  };
}

// Mock venue data
const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Mall of Lagos",
    type: "Shopping Mall",
    location: {
      city: "Lagos",
      region: "Lagos State",
      country: "Nigeria",
      coordinates: { lat: 6.5244, lng: 3.3792 },
    },
    impressions: 250000,
    cpm: 420,
    screenCount: 8,
    rating: 4.8,
    image: "/api/placeholder/400/300",
    audienceInsights: {
      demographics: "25-45 years, Middle-Upper Class",
      peakHours: "12PM-8PM",
      footfall: 15000,
    },
    pricing: {
      packages: [
        { name: "Basic", price: 350000, duration: "1 week" },
        {
          name: "Premium",
          price: 1200000,
          duration: "1 month",
        },
        {
          name: "Extended",
          price: 3000000,
          duration: "3 months",
        },
      ],
    },
  },
  {
    id: "2",
    name: "Fitness First Victoria Island",
    type: "Gym & Fitness",
    location: {
      city: "Lagos",
      region: "Lagos State",
      country: "Nigeria",
      coordinates: { lat: 6.4281, lng: 3.4219 },
    },
    impressions: 85000,
    cpm: 520,
    screenCount: 4,
    rating: 4.5,
    image: "/api/placeholder/400/300",
    audienceInsights: {
      demographics: "20-40 years, Health Conscious",
      peakHours: "6AM-10AM, 6PM-10PM",
      footfall: 2500,
    },
    pricing: {
      packages: [
        { name: "Basic", price: 180000, duration: "1 week" },
        { name: "Premium", price: 650000, duration: "1 month" },
      ],
    },
  },
  {
    id: "3",
    name: "Transcorp Hilton Abuja",
    type: "Corporate",
    location: {
      city: "Abuja",
      region: "FCT",
      country: "Nigeria",
      coordinates: { lat: 9.0765, lng: 7.3986 },
    },
    impressions: 45000,
    cpm: 680,
    screenCount: 3,
    rating: 4.9,
    image: "/api/placeholder/400/300",
    audienceInsights: {
      demographics: "30-55 years, Corporate Executives",
      peakHours: "8AM-6PM",
      footfall: 1200,
    },
    pricing: {
      packages: [
        { name: "Premium", price: 450000, duration: "1 week" },
        {
          name: "Executive",
          price: 1500000,
          duration: "1 month",
        },
      ],
    },
  },
  {
    id: "4",
    name: "Shoprite Ikeja",
    type: "Grocery Store",
    location: {
      city: "Lagos",
      region: "Lagos State",
      country: "Nigeria",
      coordinates: { lat: 6.6018, lng: 3.3515 },
    },
    impressions: 180000,
    cpm: 380,
    screenCount: 6,
    rating: 4.3,
    image: "/api/placeholder/400/300",
    audienceInsights: {
      demographics: "25-50 years, Families",
      peakHours: "10AM-8PM",
      footfall: 8500,
    },
    pricing: {
      packages: [
        { name: "Basic", price: 280000, duration: "1 week" },
        {
          name: "Standard",
          price: 950000,
          duration: "1 month",
        },
      ],
    },
  },
  {
    id: "5",
    name: "Urban TV Network Lagos",
    type: "Urban Panel",
    location: {
      city: "Lagos",
      region: "Lagos State",
      country: "Nigeria",
      coordinates: { lat: 6.455, lng: 3.3841 },
    },
    impressions: 320000,
    cpm: 350,
    screenCount: 12,
    rating: 4.2,
    image: "/api/placeholder/400/300",
    audienceInsights: {
      demographics: "18-50 years, Urban Commuters",
      peakHours: "7AM-10AM, 4PM-8PM",
      footfall: 25000,
    },
    pricing: {
      packages: [
        {
          name: "Rush Hour",
          price: 500000,
          duration: "1 week",
        },
        {
          name: "Full Coverage",
          price: 1800000,
          duration: "1 month",
        },
      ],
    },
  },
];

export function DiscoverPage({
  sidebarCollapsed,
  setSidebarCollapsed,
}: DiscoverPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [venueTypeFilter, setVenueTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("reach");
  const [selectedVenue, setSelectedVenue] =
    useState<Venue | null>(null);
  const [hoveredVenue, setHoveredVenue] = useState<
    string | null
  >(null);

  // Filter and sort venues
  const filteredVenues = mockVenues
    .filter((venue) => {
      const matchesSearch =
        venue.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        venue.location.city
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        venue.location.region
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCountry =
        countryFilter === "all" ||
        venue.location.country === countryFilter;
      const matchesCity =
        cityFilter === "all" ||
        venue.location.city === cityFilter;
      const matchesType =
        venueTypeFilter === "all" ||
        venue.type === venueTypeFilter;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesCity &&
        matchesType
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "reach":
          return b.impressions - a.impressions;
        case "cpm":
          return a.cpm - b.cpm;
        case "venue":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
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
              onClick={() =>
                setSidebarCollapsed(!sidebarCollapsed)
              }
              className="text-black hover:bg-gray-100"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-black">
                Discover Venues
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Find and explore advertising venues for your
                campaigns
              </p>
            </div>
          </div>

          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by city, venue, region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-white border-gray-300"
              />
            </div>

            {/* Filters */}
            <Select
              value={countryFilter}
              onValueChange={setCountryFilter}
            >
              <SelectTrigger className="w-full sm:w-32 bg-white border-gray-300">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Countries
                </SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={cityFilter}
              onValueChange={setCityFilter}
            >
              <SelectTrigger className="w-full sm:w-32 bg-white border-gray-300">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Port Harcourt">
                  Port Harcourt
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={venueTypeFilter}
              onValueChange={setVenueTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-40 bg-white border-gray-300">
                <SelectValue placeholder="Venue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Shopping Mall">
                  Shopping Mall
                </SelectItem>
                <SelectItem value="Gym & Fitness">
                  Gym & Fitness
                </SelectItem>
                <SelectItem value="Corporate">
                  Corporate
                </SelectItem>
                <SelectItem value="Grocery Store">
                  Grocery Store
                </SelectItem>
                <SelectItem value="Urban Panel">
                  Urban Panel
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reach">By Reach</SelectItem>
                <SelectItem value="cpm">By CPM</SelectItem>
                <SelectItem value="venue">
                  By Venue Type
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Interactive Map */}
        <div className="w-full lg:w-1/2 h-64 lg:h-full bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Interactive Map
              </h3>
              <p className="text-gray-500">
                Venue locations with hover details
              </p>
            </div>
          </div>

          {/* Map Pins Overlay */}
          <div className="absolute inset-0 p-4">
            {filteredVenues.map((venue, index) => (
              <div
                key={venue.id}
                className={`absolute w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer transform transition-all duration-200 ${
                  hoveredVenue === venue.id
                    ? "scale-125 z-10"
                    : ""
                }`}
                style={{
                  left: `${20 + ((index * 15) % 60)}%`,
                  top: `${30 + ((index * 20) % 40)}%`,
                }}
                onMouseEnter={() => setHoveredVenue(venue.id)}
                onMouseLeave={() => setHoveredVenue(null)}
                onClick={() => setSelectedVenue(venue)}
              >
                <Monitor className="w-4 h-4 text-white" />

                {/* Hover Tooltip */}
                {hoveredVenue === venue.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20">
                    <div className="font-medium">
                      {venue.name}
                    </div>
                    <div className="text-xs opacity-75">
                      {formatNumber(venue.impressions)}{" "}
                      impressions
                    </div>
                    <div className="text-xs opacity-75">
                      ₦{venue.cpm} CPM
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Venue Cards */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 bg-gray-50 overflow-auto">
          <div className="space-y-4">
            {filteredVenues.map((venue) => (
              <Card
                key={venue.id}
                className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 md:p-6"
                onClick={() => setSelectedVenue(venue)}
                onMouseEnter={() => setHoveredVenue(venue.id)}
                onMouseLeave={() => setHoveredVenue(null)}
              >
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
                  {/* Venue Image */}
                  <div className="w-full md:w-24 h-48 md:h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-black mb-1">
                          {venue.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700"
                          >
                            {venue.type}
                          </Badge>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm text-gray-600">
                              {venue.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {venue.location.city},{" "}
                          {venue.location.region}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white mt-2 md:mt-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to campaign logic
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add to Campaign
                      </Button>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <Eye className="w-4 h-4" />
                          <span>Impressions</span>
                        </div>
                        <p className="font-semibold text-black">
                          {formatNumber(venue.impressions)}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <DollarSign className="w-4 h-4" />
                          <span>CPM</span>
                        </div>
                        <p className="font-semibold text-black">
                          ₦{venue.cpm}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <Monitor className="w-4 h-4" />
                          <span>Screens</span>
                        </div>
                        <p className="font-semibold text-black">
                          {venue.screenCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Empty State */}
            {filteredVenues.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-black mb-2">
                  No venues found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find
                  venues.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Venue Detail Panel */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black">
                {selectedVenue.name}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVenue(null)}
                className="text-gray-500 hover:text-black"
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
                    <h3 className="font-semibold text-black mb-3">
                      Venue Preview
                    </h3>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedVenue.image}
                        alt={selectedVenue.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Map Snippet */}
                  <div>
                    <h3 className="font-semibold text-black mb-3">
                      Location
                    </h3>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                        <p className="font-medium text-black">
                          {selectedVenue.location.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedVenue.location.region}
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
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        {selectedVenue.type}
                      </Badge>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-medium text-black">
                          {selectedVenue.rating}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-lg font-semibold text-black">
                          {formatNumber(
                            selectedVenue.impressions,
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          Est. Impressions
                        </p>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-lg font-semibold text-black">
                          {selectedVenue.screenCount}
                        </p>
                        <p className="text-sm text-gray-600">
                          Screens
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Audience Insights */}
                  <div>
                    <h3 className="font-semibold text-black mb-3">
                      Audience Insights
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Demographics:
                        </span>
                        <span className="text-sm font-medium text-black">
                          {
                            selectedVenue.audienceInsights
                              .demographics
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Peak Hours:
                        </span>
                        <span className="text-sm font-medium text-black">
                          {
                            selectedVenue.audienceInsights
                              .peakHours
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Daily Footfall:
                        </span>
                        <span className="text-sm font-medium text-black">
                          {formatNumber(
                            selectedVenue.audienceInsights
                              .footfall,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h3 className="font-semibold text-black mb-3">
                      Pricing Packages
                    </h3>
                    <div className="space-y-3">
                      {selectedVenue.pricing.packages.map(
                        (pkg, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-black">
                                {pkg.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {pkg.duration}
                              </p>
                            </div>
                            <p className="font-semibold text-purple-600">
                              ₦{formatNumber(pkg.price)}
                            </p>
                          </div>
                        ),
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Base CPM: ₦{selectedVenue.cpm}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-5 h-5 mr-2" />
                    Added
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