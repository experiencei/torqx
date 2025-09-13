"use client";

import { useState } from "react";

import {
  LayoutDashboard,
  MapPin,
  Building2,
  CalendarClock,
  QrCode,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    id: "dashboard",
    name: "Dashboard Clarity",
    icon: LayoutDashboard,
    title: "Simplify Campaign Management with Dashboard Clarity",
    description:
      "Consolidate all your campaigns in one convenient location. Enjoy a clear and organized summary, complete with filters to find what you need quickly. Start or pause campaigns with one click. With Pulse’s AI-powered creative prompts, you can launch ads without needing a designer.",

          image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/2.jpg",
// sample dashboard UI
  },
  {
    id: "geotargeting",
    name: "Advanced Geotargeting",
    icon: MapPin,
    title: "Reach Audiences Precisely with Geotargeting",
    description:
      "Pinpoint exact locations for your campaigns: postal codes, cities, or radius targeting in any country where we operate. With integrated Google Maps view, you can visualize coverage and exclude specific areas with ease.",
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/3.jpg", // sample map UI
  },
  {
    id: "venue",
    name: "Venue Types",
    icon: Building2,
    title: "Target Campaigns by Venue Type",
    description:
      "Select from gyms, malls, co-working spaces, hotels, restaurants, offices, and airports. Pulse lets you preview your brand media instantly and apply venue filters for precise audience targeting.",
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/4.jpg", // venue style
  },
  {
    id: "schedule",
    name: "Schedule & Planning",
    icon: CalendarClock,
    title: "Maximize Impact with Advanced Scheduling",
    description:
      "Plan campaigns by date, range, or specific hours each day. Ensure coverage is focused and cost-effective, delivering ads when your audience is most active.",
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/5.jpg", // scheduling UI
  },
  {
    id: "qrcode",
    name: "QR Code Generation",
    icon: QrCode,
    title: "Drive Engagement with QR Codes",
    description:
      "Generate QR codes instantly for each ad. Link directly to a landing page or offer, and track campaign performance effortlessly. A seamless way to merge offline visibility with online engagement.",
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/6.jpg", // qr code example
  },
];

export default function PulseFeatures() {
  const [active, setActive] = useState("dashboard");
  const activeFeature = features.find((f) => f.id === active)!;

  return (
    <section className="bg-black text-white sm:-pt-14 md:py-14">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            The Pulse Ads Manager You Need
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Pulse is your AI-powered ad manager to launch, manage, and optimize
            campaigns across DOOH, CTV, and connected screens — all from a
            single dashboard.
          </p>
        </div>

        {/* Feature Toggle */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setActive(feature.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                  ${
                    active === feature.id
                      ? "bg-white text-black border-white"
                      : "border-gray-700 text-gray-400 hover:border-white hover:text-white"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {feature.name}
              </button>
            );
          })}
        </div>

        {/* Active Feature */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Text */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                {activeFeature.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {activeFeature.description}
              </p>
            </div>

            {/* Image */}
            <div className="rounded-xl overflow-hidden border border-gray-800 shadow-lg">
              <img
                src={activeFeature.image}
                alt={activeFeature.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
