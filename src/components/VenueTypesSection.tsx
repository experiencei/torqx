import React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  ShoppingCart,
  Store,
  Building,
  Dumbbell,
  Briefcase,
  Globe,
} from "lucide-react";

interface VenueTypesSectionProps {
  selectedVenues: string[];
  setSelectedVenues: (venues: string[]) => void;
}

const venueTypes = [
  { id: "grocery", label: "Grocery", icon: ShoppingCart },
  { id: "retail", label: "Retail", icon: Store },
  { id: "urban", label: "Urban Panels", icon: Building },
  { id: "gyms", label: "Gyms", icon: Dumbbell },
  { id: "corporate", label: "Corporate", icon: Briefcase },
  { id: "all", label: "All", icon: Globe },
];

export function VenueTypesSection({
  selectedVenues,
  setSelectedVenues,
}: VenueTypesSectionProps) {
  const handleVenueToggle = (venueId: string) => {
    if (venueId === "all") {
      if (selectedVenues.includes("all")) {
        setSelectedVenues([]);
      } else {
        setSelectedVenues(venueTypes.map((v) => v.id));
      }
    } else {
      const newSelected = selectedVenues.includes(venueId)
        ? selectedVenues.filter((v) => v !== venueId && v !== "all")
        : [...selectedVenues.filter((v) => v !== "all"), venueId];

      const individualVenues = venueTypes
        .filter((v) => v.id !== "all")
        .map((v) => v.id);
      const allIndividualSelected = individualVenues.every((v) =>
        newSelected.includes(v)
      );

      if (allIndividualSelected && !newSelected.includes("all")) {
        newSelected.push("all");
      }

      setSelectedVenues(newSelected);
    }
  };

  return (
    <Card className="bg-background border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Venue Types
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {venueTypes.map((venue) => (
          <div key={venue.id} className="flex items-center space-x-3">
            <Checkbox
              id={venue.id}
              checked={selectedVenues.includes(venue.id)}
              onCheckedChange={() => handleVenueToggle(venue.id)}
              className="border-border data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <Label
              htmlFor={venue.id}
              className="flex items-center space-x-2 text-foreground cursor-pointer"
            >
              <venue.icon className="w-4 h-4 text-muted-foreground" />
              <span>{venue.label}</span>
            </Label>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-accent rounded-lg">
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          {selectedVenues.length > 0
            ? `${selectedVenues.length} venue type(s)`
            : "None"}
        </p>
        {selectedVenues.includes("all") && (
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            All venue types selected for maximum reach
          </p>
        )}
      </div>
    </Card>
  );
}
