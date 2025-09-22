import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Store, Building, Dumbbell, Briefcase, Globe } from 'lucide-react';

interface VenueTypesSectionProps {
  selectedVenues: string[];
  setSelectedVenues: (venues: string[]) => void;
}

const venueTypes = [
  { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
  { id: 'retail', label: 'Retail', icon: Store },
  { id: 'urban', label: 'Urban Panels', icon: Building },
  { id: 'gyms', label: 'Gyms', icon: Dumbbell },
  { id: 'corporate', label: 'Corporate', icon: Briefcase },
  { id: 'all', label: 'All', icon: Globe },
];

export function VenueTypesSection({ selectedVenues, setSelectedVenues }: VenueTypesSectionProps) {
  const handleVenueToggle = (venueId: string) => {
    if (venueId === 'all') {
      // If "All" is selected, select all venue types
      if (selectedVenues.includes('all')) {
        setSelectedVenues([]);
      } else {
        setSelectedVenues(venueTypes.map(v => v.id));
      }
    } else {
      // Handle individual venue selection
      const newSelected = selectedVenues.includes(venueId)
        ? selectedVenues.filter(v => v !== venueId && v !== 'all')
        : [...selectedVenues.filter(v => v !== 'all'), venueId];
      
      // If all individual venues are selected, also select "All"
      const individualVenues = venueTypes.filter(v => v.id !== 'all').map(v => v.id);
      const allIndividualSelected = individualVenues.every(v => newSelected.includes(v));
      
      if (allIndividualSelected && !newSelected.includes('all')) {
        newSelected.push('all');
      }
      
      setSelectedVenues(newSelected);
    }
  };

  return (
    <Card className="bg-white border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-6">Venue Types</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {venueTypes.map((venue) => (
          <div key={venue.id} className="flex items-center space-x-3">
            <Checkbox
              id={venue.id}
              checked={selectedVenues.includes(venue.id)}
              onCheckedChange={() => handleVenueToggle(venue.id)}
              className="border-gray-400 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <Label
              htmlFor={venue.id}
              className="flex items-center space-x-2 text-black cursor-pointer"
            >
              <venue.icon className="w-4 h-4 text-gray-600" />
              <span>{venue.label}</span>
            </Label>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Selected: {selectedVenues.length > 0 ? `${selectedVenues.length} venue type(s)` : 'None'}
        </p>
        {selectedVenues.includes('all') && (
          <p className="text-sm text-purple-600 mt-1">All venue types selected for maximum reach</p>
        )}
      </div>
    </Card>
  );
}