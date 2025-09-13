"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IndustryCardProps = {
  image: string;
  title: string;
  subtitle: string;
  details: string[];
};

function IndustryCard({ image, title, subtitle, details }: IndustryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[380px] w-full [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d] transition-all duration-700",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md",
            "[backface-visibility:hidden]"
          )}
        >
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="absolute inset-0 h-full w-full object-cover rounded-2xl opacity-70"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-sm text-gray-200">{subtitle}</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-2xl border border-white/10 backdrop-blur-md p-6 flex flex-col justify-center bg-black/60",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]"
          )}
        >
          <h4 className="text-xl font-semibold text-white mb-4">{title}</h4>
          <ul className="space-y-2">
            {details.map((detail, i) => (
              <li key={i} className="text-gray-200 text-sm">• {detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function IndustriesGrid() {
  const industries = [
    {
      image: "https://picsum.photos/600/400?random=1",
      title: "Corporate",
      subtitle:
        "Enhance employee engagement, streamline communication, and keep teams aligned with smart signage.",
      details: ["Meeting & Conference Rooms", "HR Screens", "Breakrooms"],
    },
    {
      image: "https://picsum.photos/600/400?random=2",
      title: "Retail",
      subtitle:
        "Boost sales and create immersive shopping experiences with dynamic in-store screens.",
      details: ["Supermarkets & Shopping Malls", "Grocery Stores", "Pet Stores"],
    },
    {
      image: "https://picsum.photos/600/400?random=3",
      title: "Hospitality",
      subtitle:
        "Deliver personalized guest experiences across hotels, resorts, and nightlife venues.",
      details: ["Hotels & Resorts", "Spas & Beauty Venues", "Nightlife"],
    },
    {
      image: "https://picsum.photos/600/400?random=4",
      title: "Restaurants",
      subtitle:
        "Engage customers with digital menu boards and promotions in cafes, bars, and QSRs.",
      details: ["Quick Service Restaurants", "Cafes", "Bars"],
    },
    {
      image: "https://picsum.photos/600/400?random=5",
      title: "Banking",
      subtitle:
        "Build trust and simplify financial services with clear, real-time customer messaging.",
      details: ["Retail Banks", "ATM Locations", "Corporate Branches"],
    },
    {
      image: "https://picsum.photos/600/400?random=6",
      title: "Entertainment",
      subtitle:
        "Drive engagement with interactive content across cinemas, arenas, and amusement venues.",
      details: ["Amusement Parks", "Cinemas", "Stadiums"],
    },
    {
      image: "https://picsum.photos/600/400?random=7",
      title: "Transportation",
      subtitle:
        "Deliver real-time updates and information in airports, transit hubs, and parking spaces.",
      details: ["Airports", "Bus & Train Stations", "Parking Facilities"],
    },
    {
      image: "https://picsum.photos/600/400?random=8",
      title: "Real Estate",
      subtitle:
        "Showcase properties and drive client interest with immersive digital listings.",
      details: ["Residential Properties", "Commercial Buildings", "Agencies"],
    },
    {
      image: "https://picsum.photos/600/400?random=9",
      title: "Government",
      subtitle:
        "Streamline public communication with timely announcements and community updates.",
      details: ["Public Buildings", "Municipal Offices", "Community Centers"],
    },
    {
      image: "https://picsum.photos/600/400?random=10",
      title: "Events",
      subtitle:
        "Elevate conferences, expos, and concerts with dynamic event signage and branding.",
      details: ["Trade Shows", "Live Concerts", "Corporate Events"],
    },
    {
      image: "https://picsum.photos/600/400?random=11",
      title: "Advertising",
      subtitle:
        "Monetize indoor and outdoor screens with targeted DOOH campaigns powered by AI.",
      details: ["DOOH Networks", "Indoor Ads", "Billboards"],
    },
    {
      image: "https://picsum.photos/600/400?random=12",
      title: "Healthcare",
      subtitle:
        "Inform and reassure patients with helpful, real-time content across medical facilities.",
      details: ["Hospitals", "Pharmacies", "Dental Clinics", "Waiting Rooms"],
    },
    {
      image: "https://picsum.photos/600/400?random=13",
      title: "Fitness",
      subtitle:
        "Keep members motivated with engaging displays in gyms, studios, and wellness centers.",
      details: ["Gyms", "Fitness Studios", "Wellness Clubs"],
    },
  ];
  

  return (
    <section className="relative py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl md:text-5xl font-semibold">
          Industries We Power
        </h2>
        <p className="mt-4 text-center text-gray-400 max-w-2xl mx-auto">
          From corporate offices to retail malls, Grid signage adapts to your
          industry—turning everyday screens into opportunities for growth.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <IndustryCard key={i} {...industry} />
          ))}
        </div>
      </div>
    </section>
  );
}





