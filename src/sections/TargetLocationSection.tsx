import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Search, Calendar, Map } from 'lucide-react';

interface TargetLocationSectionProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export function TargetLocationSection({
  selectedCountry,
  setSelectedCountry,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}: TargetLocationSectionProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [isMapOpen, setIsMapOpen] = useState(false);

  const countries = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'Egypt',
    'Morocco',
    'United States',
    'United Kingdom'
  ];

  const mockScreens = [
    { id: 1, location: 'Victoria Island, Lagos', screens: 45, impressions: '2.5M', spots: 120 },
    { id: 2, location: 'Ikeja GRA, Lagos', screens: 32, impressions: '1.8M', spots: 95 },
    { id: 3, location: 'Abuja CBD', screens: 28, impressions: '1.2M', spots: 78 }
  ];

  return (
    <Card className="bg-white border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-6">Target Location</h3>
      
      <div className="space-y-6">
        {/* Country Selection */}
        <div className="space-y-3">
          <Label className="text-black">Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="bg-white border-gray-300 text-black">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {countries.map((country) => (
                <SelectItem key={country} value={country} className="text-black hover:bg-gray-50">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timing */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-black">Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-black"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-black">End Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-black"
              />
            </div>
          </div>
        </div>

        {/* GeoTargeting */}
        <div className="space-y-3">
          <Label className="text-black">GeoTargeting</Label>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search for locations..."
                className="pl-10 bg-white border-gray-300 text-black placeholder-gray-500"
              />
            </div>
            <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50">
                  <Map className="w-4 h-4 mr-2" />
                  Open Map
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-gray-200 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-black">Available Screens Map</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Mock Map Area */}
                  <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-gray-600 text-center">
                      <Map className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive Map View</p>
                      <p className="text-sm">Click on screen icons to view details</p>
                    </div>
                    {/* Mock screen markers */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Location Stats */}
                  <div className="grid grid-cols-1 gap-3">
                    {mockScreens.map((screen) => (
                      <div key={screen.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-black font-medium">{screen.location}</p>
                            <div className="flex space-x-4 text-sm text-gray-600">
                              <span>{screen.screens} screens</span>
                              <span>{screen.impressions} impressions</span>
                              <span>{screen.spots} spots</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
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
      </div>
    </Card>
  );
}