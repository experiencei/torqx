"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MonitorPlay,
  MapPin,
  Building2,
  CalendarClock,
  QrCode,
} from "lucide-react";

const features = [
  {
    step: "Step 1",
    title: "Launch Instantly",
    content:
      "Start campaigns in minutes. No scouting, no paperwork — just set your budget and go live with ease.",
    icon: <MonitorPlay className="text-brand-green h-6 w-6" />,
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/8.png",
      
  },
  {
    step: "Step 2",
    title: "Target Precisely",
    content:
      "Use advanced geotargeting to choose exact cities, postal codes, or radius targeting. Visualize everything with Google Maps integration.",
    icon: <MapPin className="text-brand-green h-6 w-6" />,
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/9.png",
  },
  {
    step: "Step 3",
    title: "Choose Your Venues",
    content:
      "From gyms and malls to offices, hotels, restaurants, and airports — select venues that match your campaign goals.",
    icon: <Building2 className="text-brand-green h-6 w-6" />,
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/10.png",
  },
  { 
    step: "Step 4",
    title: "Plan & Optimize",
    content:
      "Schedule campaigns by day, week, or hour. Generate QR codes to measure engagement and boost interactivity effortlessly.",
    icon: <CalendarClock className="text-brand-green h-6 w-6" />,
    image:
      "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/12.png",
  },
];

export default function HowItWorks() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl">
            How Pulse Works
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A smarter way to launch, manage, and monetize ad campaigns across
            DOOH, CTV, and connected screens.
          </p>
        </div>

        {/* Divider */}
        <hr className="mx-auto mb-10 h-px w-1/2 border-gray-800" />
 
        {/* Content */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-12">
          {/* Steps */}
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14",
                    index === currentFeature
                      ? "border-brand-green bg-brand-green/10 text-brand-green scale-110 shadow-[0_0_15px_rgba(0,255,120,0.4)]"
                      : "border-gray-600 bg-gray-800 text-gray-500"
                  )}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Showcase */}
          <div className="order-1 relative h-[220px] md:order-2 md:h-[320px] lg:h-[420px] rounded-xl overflow-hidden border border-gray-800 shadow-xl">
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full object-cover transform transition-transform hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-md text-xs font-medium text-brand-green backdrop-blur-sm">
                        {feature.step}
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
