"use client";

import { Monitor, Layers, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-green-500" />,
    title: "Create & Captivate",
    desc: "Design eye-catching content in minutes using ready-made templates or your own images, videos, and text. Drag-and-drop layouts, QR codes, and adaptive designs ensure your campaigns look stunning on every screen, no matter the size or orientation.",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/3.jpg",
  },
  {
    icon: <Monitor className="h-6 w-6 text-blue-500" />,
    title: "Deploy with Precision",
    desc: "Schedule campaigns by time, date, or location with pinpoint accuracy. Whether managing one screen or thousands, Torqx AI ensures smooth playback — even offline — and gives you full control over settings like volume, orientation, and sleep mode.",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/4.jpg",
  }, 
  {
    icon: <BarChart3 className="h-6 w-6 text-green-500" />,
    title: "Measure What Matters",
    desc: "Monitor campaigns with real-time analytics, proof-of-play reports, and live screen snapshots. From performance stats to device logs, always stay in control and know where to optimize",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/5.jpg",
  },
  {
    icon: <Layers className="h-6 w-6 text-blue-500" />,
    title: "Connect & Scale",
    desc: "Bring in live dashboards, social feeds, or weather updates with built-in apps. Use APIs and Zapier to sync campaigns with your internal tools or automate triggers in real time.",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/6.jpg",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-black">
            Everything You Need to Power Digital Screens
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From content creation to deployment, analytics, and integrations —
            Torqx AI helps you run smarter campaigns with confidence.
          </p>
        </div>

        {/* Grid with extended lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          {features.map((feature, idx) => {
            const isLeftCol = idx % 2 === 0;
            const isTopRow = idx < 2;

            return (
              <div
                key={idx}
                className="flex flex-col p-8 space-y-4 relative"
              >
                {/* Extended borders */}
                {isTopRow && (
                  <div className="absolute top-0 left-0 right-0 -mx-8 h-px bg-gray-200" />
                )}
                {!isTopRow && (
                  <div className="absolute top-0 left-0 right-0 -mx-8 h-px bg-gray-200" />
                )}
                {isLeftCol && (
                  <div className="absolute top-0 bottom-0 left-0 -my-8 w-px bg-gray-200" />
                )}
                {!isLeftCol && (
                  <div className="absolute top-0 bottom-0 right-0 -my-8 w-px bg-gray-200" />
                )}

                {/* Icon + Title */}
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600">{feature.desc}</p>

                {/* Snapshot */}
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
