'use client';

import { useState } from "react";
import Image from "next/image";
import CheckIcon from "@/assets/icons/check-circle.svg";

import { cn } from "@/lib/utils";
import {
  Building2,
  ShoppingBag,
  Hotel,
  Utensils,
  Landmark,
  Clapperboard,
  Bus,
  Home,
  LandmarkIcon,
  Calendar,
  Megaphone,
  HeartPulse,
  Dumbbell,
  Factory,
  Church,
  Car,
} from "lucide-react";

type IndustryCardProps = {
  image: string;
  title: string;
  subtitle: string;
  details: string[];
  icon: React.ReactNode;
};

function IndustryCard({ image, title, subtitle, details, icon }: IndustryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[420px] w-full [perspective:2000px]"
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
          {/* Image at the top */}
          <div className="h-72 w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content below */}
          <div className="p-6 flex flex-col items-start text-left bg-black/40 h-[calc(100%-160px)]">
            <div className="flex items-center gap-2 text-primary">
              {icon}
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="mt-3 text-sm text-gray-300">{subtitle}</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-2xl border border-white/10 backdrop-blur-md p-6 flex flex-col justify-center bg-black/70",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]"
          )}
        >
          <h4 className="text-xl font-semibold text-white mb-4">{title} — Use Cases</h4>
          <ul className="space-y-2">
            {details.map((detail, i) => (
              <li key={i} className="text-gray-200 text-sm flex items-center gap-2">
                <CheckIcon className="h-5 w-5" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const industries = [
  // { src: '/assets/restaurantss.jpeg', label: 'Restaurants' },
  // { src: '/assets/gyms.png', label: 'Gyms' },
  // { src: '/assets/university.jpeg', label: 'Universities' },
  // { src: '/assets/hotellagos.jpeg', label: 'Hotels' },
  // { src: '/assets/pharmacy.png', label: 'Retail & Pharmacies' },
  { src: '/assets/coworking.png', label: 'Co-working Spaces' },
  // { src: '/assets/agency.png', label: 'Travel Agencies' },
  { src: '/assets/diningy.png', label: 'Casual Dining' },
  // { src: '/assets/airway.jpeg', label: 'Airport' },
  // { src: '/assets/grocerynew.jpeg', label: 'Grocery Store' },
  // { src: '/assets/doctors.png', label: "Doctor's office" },
  // { src: '/assets/gasstation.jpeg', label: 'Gas Station' },
];
export default function IndustriesGrid() {
  const industries = [
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/agency.png",
      title: "Corporate",
      subtitle:
        "Enhance employee engagement, streamline communication, and keep teams aligned with smart signage.",
      details: ["Meeting & Conference Rooms", "HR Screens", "Breakrooms"],
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/grocerynew.jpeg",
      title: "Retail",
      subtitle:
        "Boost sales and create immersive shopping experiences with dynamic in-store screens.",
      details: ["Supermarkets & Malls", "Grocery Stores", "Pet Stores"],
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/hotellagos.jpeg",
      title: "Hospitality",
      subtitle:
        "Deliver personalized guest experiences across hotels, resorts, and nightlife venues.",
      details: ["Hotels & Resorts", "Spas", "Nightlife"],
      icon: <Hotel className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/restaurantss.jpeg",
      title: "Restaurants",
      subtitle:
        "Engage customers with digital menu boards and promotions in cafes, bars, and QSRs.",
      details: ["Quick Service Restaurants", "Cafes", "Bars"],
      icon: <Utensils className="h-5 w-5" />,
    },
    {       
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/asorock.jpeg",
      title: "Banking",
      subtitle:
        "Build trust and simplify financial services with clear, real-time customer messaging.",
      details: ["Retail Banks", "ATM Locations", "Corporate Branches"],
      icon: <Landmark className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/bank.jpeg",
      title: "Entertainment",
      subtitle:
        "Drive engagement with interactive content across cinemas, arenas, and amusement venues.",
      details: ["Amusement Parks", "Cinemas", "Stadiums"],
      icon: <Clapperboard className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/airway.jpeg",
      title: "Transportation",
      subtitle:
        "Deliver real-time updates and information in airports, transit hubs, and parking spaces.",
      details: ["Airports", "Bus & Train Stations", "Parking Facilities"],
      icon: <Bus className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/agency.png",
      title: "Real Estate",
      subtitle:
        "Showcase properties and drive client interest with immersive digital listings.",
      details: ["Residential Properties", "Commercial Buildings", "Agencies"],
      icon: <Home className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/rockyy.jpeg",
      title: "Government",
      subtitle:
        "Streamline public communication with timely announcements and community updates.",
      details: ["Public Buildings", "Municipal Offices", "Community Centers"],
      icon: <LandmarkIcon className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/event.png",
      title: "Events",
      subtitle:
        "Elevate conferences, expos, and concerts with dynamic event signage and branding.",
      details: ["Trade Shows", "Live Concerts", "Corporate Events"],
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/loster.png",
      title: "Advertising",
      subtitle:
        "Monetize indoor and outdoor screens with targeted DOOH campaigns powered by AI.",
      details: ["DOOH Networks", "Indoor Ads", "Billboards"],
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/doctors.png",
      title: "Healthcare",
      subtitle:
        "Inform and reassure patients with helpful, real-time content across medical facilities.",
      details: ["Hospitals", "Pharmacies", "Dental Clinics", "Waiting Rooms"],
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/gyms.png",
      title: "Fitness",
      subtitle:
        "Keep members motivated with engaging displays in gyms, studios, and wellness centers.",
      details: ["Gyms", "Fitness Studios", "Wellness Clubs"],
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/gasstation.jpeg",
      title: "Manufacturing",
      subtitle:
        "Empower factory floors with real-time dashboards, safety alerts, and productivity updates.",
      details: ["Factory Floors", "Assembly Lines", "Warehouses"],
      icon: <Factory className="h-5 w-5" />,
    },
    {
      image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/church.jpeg",
      title: "Churches",
      subtitle:
        "Enhance worship services and community events with digital announcements and live feeds.",
      details: ["Sunday Services", "Community Outreach", "Events & Programs"],
      icon: <Church className="h-5 w-5" />,
    },
    // {
    //   image: "https://picsum.photos/600/400?random=16",
    //   title: "Car Dealerships",
    //   subtitle:
    //     "Showcase promotions, highlight inventory, and elevate the buying experience with digital displays.",
    //   details: ["Showrooms", "Service Centers", "Car Expos"],
    //   icon: <Car className="h-5 w-5" />,
    // },
  ];

  return (
    <section className="relative py-10 -mb-14 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold">
          Industries We Power
        </h2>
        <p className="mt-4 text-center text-gray-400 max-w-2xl mx-auto">
          From corporate offices to retail malls, Grid signage adapts to your industry—turning everyday screens into opportunities for growth.
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
