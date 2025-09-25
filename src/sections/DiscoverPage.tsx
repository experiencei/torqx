"use client";

import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Client, Databases, Storage, Query } from "appwrite";
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
  X,
  Plus,
} from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Appwrite Setup
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const storage = new Storage(client);

interface DiscoverPageProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

interface Venue {
  $id: string;
  name: string;
  type: string;
  city: string;
  region: string;
  country: string;
  coordinates: { lat: number; lng: number };
  impressions: number;
  cpm: number;
  screenCount: number;
  rating: number;
  imageId: string;
  demographics: string;
  peakHours: string;
  footfall: number;
  pricing: { name: string; price: number; duration: string }[];
}

export function DiscoverPage({
  sidebarCollapsed,
  setSidebarCollapsed,
}: DiscoverPageProps) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [venueTypeFilter, setVenueTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("reach");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  // Fetch venues from Appwrite
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_IDI!,
          process.env.NEXT_PUBLIC_APPWRITE_VENUES_COLLECTION_IDI!,
          [Query.limit(50)]
        );

        const mapped = res.documents.map((doc: any) => ({
          $id: doc.$id,
          name: doc.name,
          type: doc.type,
          city: doc.city,
          region: doc.region,
          country: doc.country,
          coordinates: { lat: doc.lat, lng: doc.lng },
          impressions: doc.impressions,
          cpm: doc.cpm,
          screenCount: doc.screenCount,
          rating: doc.rating,
          imageId: doc.imageId,
          demographics: doc.demographics,
          peakHours: doc.peakHours,
          footfall: doc.footfall,
          pricing: doc.pricing || [],
        }));
        setVenues(mapped);
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };

    fetchVenues();
  }, []);

  // Mapbox integration
  // useEffect(() => {
  //   if (!venues.length) return;

  //   const map = new mapboxgl.Map({
  //     container: "map-container",
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [3.3792, 6.5244], // Lagos default
  //     zoom: 6,
  //   });

  //   venues.forEach((venue) => {
  //     const el = document.createElement("div");
  //     el.className =
  //       "w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white cursor-pointer";
  //     el.innerHTML = "📺";

  //     const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
  //       <div>
  //         <strong>${venue.name}</strong><br/>
  //         ${venue.city}, ${venue.region}<br/>
  //         Impressions: ${venue.impressions.toLocaleString()}<br/>
  //         CPM: ₦${venue.cpm}
  //       </div>
  //     `);

  //     new mapboxgl.Marker(el)
  //       .setLngLat([venue.coordinates.lng, venue.coordinates.lat])
  //       .setPopup(popup)
  //       .addTo(map)
  //       .getElement()
  //       .addEventListener("click", () => setSelectedVenue(venue));
  //   });

  //   return () => map.remove();
  // }, [venues]);
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [3.3792, 6.5244], // Lagos default
      zoom: 6,
    });
  
    if (venues.length) {
      venues.forEach((venue) => {
        const el = document.createElement("div");
        el.className =
          "w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white cursor-pointer";
        el.innerHTML = "📺";
  
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div>
            <strong>${venue.name}</strong><br/>
            ${venue.city}, ${venue.region}<br/>
            Impressions: ${venue.impressions.toLocaleString()}<br/>
            CPM: ₦${venue.cpm}
          </div>
        `);
  
        new mapboxgl.Marker(el)
          .setLngLat([venue.coordinates.lng, venue.coordinates.lat])
          .setPopup(popup)
          .addTo(map)
          .getElement()
          .addEventListener("click", () => setSelectedVenue(venue));
      });
    }
  
    return () => map.remove();
  }, [venues]);
  

  const filteredVenues = venues
    .filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry =
        countryFilter === "all" || venue.country === countryFilter;
      const matchesCity = cityFilter === "all" || venue.city === cityFilter;
      const matchesType =
        venueTypeFilter === "all" || venue.type === venueTypeFilter;

      return matchesSearch && matchesCountry && matchesCity && matchesType;
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

  const getImageUrl = (imageId: string) =>
    storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_VENUE_BUCKET_ID!, // venue-images bucket
      imageId
    );

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-black">
              Discover Venues
            </h1>
            <p className="text-gray-600 text-sm">
              Find and explore advertising venues for your campaigns
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Map */}
        <div
          id="map-container"
          className="w-full lg:w-1/2 h-64 lg:h-full"
        ></div>

        {/* Right Side - Venue List */}
        <div className="w-full lg:w-1/2 p-4 bg-gray-50 overflow-auto">
          <div className="space-y-4">
            {filteredVenues.map((venue) => (
              <Card
                key={venue.$id}
                className="p-4 bg-white shadow hover:shadow-md cursor-pointer"
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={getImageUrl(venue.imageId)}
                    alt={venue.name}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{venue.name}</h3>
                    <Badge className="bg-purple-100 text-purple-700">
                      {venue.type}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {venue.city}, {venue.region}
                    </p>
                    <div className="flex space-x-4 text-sm mt-2">
                      <span>👀 {formatNumber(venue.impressions)}</span>
                      <span>💰 ₦{venue.cpm}</span>
                      <span>📺 {venue.screenCount}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Detail Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{selectedVenue.name}</h2>
              <Button
                variant="ghost"
                onClick={() => setSelectedVenue(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <img
                src={getImageUrl(selectedVenue.imageId)}
                alt={selectedVenue.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <p className="text-gray-600">
                {selectedVenue.demographics} | Peak: {selectedVenue.peakHours}
              </p>
              <p className="mt-2 text-gray-600">
                Footfall: {formatNumber(selectedVenue.footfall)}
              </p>
              <div className="mt-4 space-y-2">
                {selectedVenue.pricing.map((pkg, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-3 bg-gray-100 rounded"
                  >
                    <span>
                      {pkg.name} – {pkg.duration}
                    </span>
                    <span className="font-semibold text-purple-600">
                      ₦{formatNumber(pkg.price)}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full bg-purple-600 text-white">
                <Plus className="w-5 h-5 mr-2" /> Add to Campaign
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
