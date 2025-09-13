"use client";

import {
  Pill,
  PillIcon,
} from "@/components/ui/kibo-ui/pill";
import {
  Activity,
  Cloud,
  Target,
  Sparkles,
  MapPin,
  Shuffle,
} from "lucide-react";

// assign brand-aligned pill colors
const colors = [
  "bg-green-600",
  "bg-blue-600",
  "bg-purple-600",
  "bg-indigo-600",
  "bg-rose-600",
  "bg-amber-600",
];

const features = [
  {
    title: "Real-time Data Triggers",
    icon: Activity,
    desc: "Switch ads instantly based on live events or audience activity.",
  },
  {
    title: "Weather Intelligence",
    icon: Cloud,
    desc: "Deliver weather-based campaigns — sunny, rainy, or stormy.",
  },
  {
    title: "Contextual Relevance",
    icon: Target,
    desc: "Ensure ads match the exact moment and location context.",
  },
  {
    title: "Memorable & Impactful",
    icon: Sparkles,
    desc: "Create high-recall campaigns that leave a lasting impression.",
  },
  {
    title: "Hyper-local Mastery",
    icon: MapPin,
    desc: "Reach audiences street by street, city by city with precision.",
  },
  {
    title: "Adaptive Switching",
    icon: Shuffle,
    desc: "Seamlessly switch ad creatives based on external conditions.",
  },
];

const Pills = () => (
  <div className="flex flex-wrap items-center justify-center gap-4 py-10 px-6">
    {features.map((feature, idx) => (
      <Pill
        key={idx}
        className={`${colors[idx % colors.length]} text-white border-none shadow-md hover:opacity-90 transition-transform duration-200 hover:scale-105`}
      >
        <div className="relative flex items-center">
          <PillIcon
            icon={feature.icon}
            className="animate-pulse"
          />
          {/* little blinking dot like heartbeat effect */}
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-white animate-ping"></span>
        </div>
        <div className="flex flex-col text-left ml-2">
          <span className="text-sm font-semibold">{feature.title}</span>
          <span className="text-xs text-white/80">{feature.desc}</span>
        </div>
      </Pill>
    ))}
  </div>
);

export default Pills;
