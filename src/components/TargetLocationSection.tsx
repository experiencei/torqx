import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { MapPin, Search, Calendar, Map, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { getEnvVar } from '../lib/env';

interface TargetLocationSectionProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedLocations: any[];
  setSelectedLocations: (locations: any[]) => void;
}

export function TargetLocationSection({
  selectedCountry,
  setSelectedCountry,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedLocations,
  setSelectedLocations
}: TargetLocationSectionProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize Mapbox when dialog opens
  useEffect(() => {
    if (isMapOpen && mapRef.current && !map) {
      // Load Mapbox GL JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = () => {
        const link = document.createElement('link');
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Initialize map
        const mapboxgl = (window as any).mapboxgl;
        mapboxgl.accessToken = getEnvVar('MAPBOX_ACCESS_TOKEN');
        
        const newMap = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [3.3792, 6.5244], // Lagos, Nigeria
          zoom: 10
        });

        // Add markers for available screens
        mockScreens.forEach((screen) => {
          const marker = new mapboxgl.Marker({
            color: '#7c3aed'
          })
            .setLngLat([screen.longitude, screen.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold">${screen.location}</h3>
                  <p class="text-sm">${screen.screens} screens • ${screen.impressions} impressions</p>
                  <button onclick="selectLocation(${screen.id})" class="mt-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    Select Location
                  </button>
                </div>
              `)
            )
            .addTo(newMap);
        });

        setMap(newMap);
      };
      document.head.appendChild(script);
    }
  }, [isMapOpen]);

  const addLocation = (location: any) => {
    if (!selectedLocations.find(loc => loc.id === location.id)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const removeLocation = (locationId: number) => {
    setSelectedLocations(selectedLocations.filter(loc => loc.id !== locationId));
  };

  const countries = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'Egypt',
    'Morocco',
  
  ];

  const mockScreens = [
    { id: 1, location: 'Victoria Island, Lagos', screens: 45, impressions: '2.5M', spots: 120, latitude: 6.4281, longitude: 3.4219 },
    { id: 2, location: 'Ikeja GRA, Lagos', screens: 32, impressions: '1.8M', spots: 95, latitude: 6.5833, longitude: 3.3500 },
    { id: 3, location: 'Abuja CBD', screens: 28, impressions: '1.2M', spots: 78, latitude: 9.0579, longitude: 7.4951 }
  ];

  // Make selectLocation globally available for popup buttons
  (window as any).selectLocation = (id: number) => {
    const location = mockScreens.find(screen => screen.id === id);
    if (location) {
      addLocation(location);
    }
  };

  return (
    <Card className="bg-card border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">Target Location</h3>
      
      <div className="space-y-6">
        {/* Country Selection */}
        <div className="space-y-3">
          <Label>Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent 
  className="bg-background border border-border shadow-lg backdrop-blur-md"
>
  {countries.map((country) => (
    <SelectItem key={country} value={country}>
      {country}
    </SelectItem>
  ))}
</SelectContent>
          </Select>
        </div>

        {/* Timing */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label>Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label>End Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* GeoTargeting */}
        <div className="space-y-3">
          <Label>GeoTargeting</Label>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search for locations..."
                className="pl-10"
              />
            </div>
            <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Map className="w-4 h-4 mr-2" />
                  Open Map
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-background border border-border shadow-lg backdrop-blur-md  ">
                <DialogHeader>
                  <DialogTitle>Available Screens Map</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 bg-background border border-border shadow-lg backdrop-blur-md">
                  {/* Mapbox Container */}
                  <div ref={mapRef} className="h-80 bg-muted rounded-lg"></div>
                  
                  {/* Location Stats */}
                  <div className="grid grid-cols-1 gap-3">
                    {mockScreens.map((screen) => (
                      <div key={screen.id} className="p-4 bg-accent rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium">{screen.location}</p>
                            <div className="flex space-x-4 text-sm text-muted-foreground">
                              <span>{screen.screens} screens</span>
                              <span>{screen.impressions} impressions</span>
                              <span>{screen.spots} spots</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => addLocation(screen)}
                        >
                          Select
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Selected Locations */}
        {selectedLocations.length > 0 && (
          <div className="space-y-3">
            <Label>Selected Locations</Label>
            <div className="flex flex-wrap gap-2">
              {selectedLocations.map((location) => (
                <Badge key={location.id} variant="secondary" className="flex items-center gap-2">
                  {location.location}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0"
                    onClick={() => removeLocation(location.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

