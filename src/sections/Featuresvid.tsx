"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, UtensilsCrossed, Tv, Plane } from "lucide-react";
// import gymvid from ""

const features = [
  {
    title: "Gyms",
    description:
      "Engage 2M+ fitness enthusiasts across 170 screens. Reach health-conscious audiences with impactful brand messaging and activations.",
    icon: <Dumbbell className="w-6 h-6 text-brand-green" />,
    video: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/gym.mp4", 
  },
  {
    title: "Restaurants",
    description:
      "Influence 3M+ diners in 400+ restaurants with immersive digital storytelling. Drive recall with contextual ads during mealtime moments.",
    icon: <UtensilsCrossed className="w-6 h-6 text-brand-blue" />,
    video: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/restaurant.mp4",
  },
  {
    title: "Corporate Spaces",
    description:
      "Connect with 1.6M+ professionals via lift & lobby displays. Capture decision-makers with high-impact digital screens at the workplace.",
    icon: <Tv className="w-6 h-6 text-amber-500" />,
    video: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/elevator.mp4",
  },
  {
    title: "Airports",
    description:
      "Engage 2.5M+ travelers across major airports. Boost visibility with premium placements at departure lounges and arrival zones.",
    icon: <Plane className="w-6 h-6 text-purple-500" />,
    video: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/airport2.mp4",
  },
];

export default function Feature() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // autoplay
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(
        () => setActiveIndex((prev: number) => (prev + 1) % features.length),
        8000
      );
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const handleOver = (index: number) => {
    setIsPaused(true);
    setActiveIndex(index);
  };
  const handleLeave = () => setIsPaused(false);

  return (
    <section className="container mx-auto px-4 py-20">
      {/* Heading */}
      <div className="max-w-2xl mb-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-brand-dark mb-4">
          Real-World Placements
        </h2>
        <p className="text-lg text-gray-600">
          See how Torqx AI powers impactful campaigns across everyday spaces —
          from gyms to airports — where attention is at its peak.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left: Feature list */}
        <div className="md:col-span-5 space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => handleOver(index)}
              onMouseLeave={handleLeave}
              onClick={() => setActiveIndex(index)}
              className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-300
                ${
                  activeIndex === index
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3
                  className={`text-base font-semibold ${
                    activeIndex === index ? "text-white" : "text-brand-dark"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    activeIndex === index
                      ? "text-gray-200"
                      : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Active video */}
        <div className="md:col-span-7 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={features[activeIndex].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl overflow-hidden border border-gray-200 shadow-lg w-full h-[320px] md:h-[380px]"
            >
              <video
                src={features[activeIndex].video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
