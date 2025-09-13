"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import HoverExpand from "@/components/ui/hover-expand";

const text = `Providing advertisers with high impact access to Urban Africa.`;
const words = text.split(" ");

const images = [
  // "https://images.pexels.com/photos/30082445/pexels-photo-30082445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // "https://images.unsplash.com/photo-1692606743169-e1ae2f0a960f?q=80&w=3560&auto=format&fit=crop",
  // "https://assets.lummi.ai/assets/QmQLSBeCFHUwCv7WBpGr7T3P67UXaAw8B2vvmtKimyinrL?auto=format&w=1500",
  // "https://assets.lummi.ai/assets/QmXe6v7jBF5L2R7FCio8KQdXwTX2uqzRycUJapyjoXaTqd?auto=format&w=1500",
  // "https://assets.lummi.ai/assets/QmNfwUDpehZyLWzE8to7QzgbJ164S6fQy8JyUWemHtmShj?auto=format&w=1500",
  // "https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format",
  // "https://assets.lummi.ai/assets/Qmb2P6tF2qUaFXnXpnnp2sk9HdVHNYXUv6MtoiSq7jjVhQ?auto=format&w=1500",
  // "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=1200&auto=format",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/4.jpeg",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/2.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/3.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/1.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/5.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/6.png",
];

export default function Introduction() {
  const scrollTarget = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });

  const [currentWord, setCurrentWord] = useState(0);
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(latest);
    });
  }, [wordIndex]);

  return (
    <section className="bg-white text-brand-dark overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-24">
        {/* INTRODUCTION */}
        <div className="sticky top-12 md:top-20 lg:top-28 text-center">
       
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-brand-dark leading-tight flex flex-wrap justify-center">
          {words.map((word, i) => (
            <span
              key={i}
              className={twMerge(
                "transition duration-600 text-black/20 whitespace-nowrap mr-2",
                i < currentWord && "text-black"
              )}
            >
              {word}
            </span>
          ))}
        </h2>

          <span className="mt-3 block text-lg md:text-xl text-gray-600 text-brand-green">
            Redefining how Africa sees, feels, and engages with brands.
          </span>
        </div>

        {/* Scroll spacer for reveal effect */}
        <div className="h-[10vh]" ref={scrollTarget}></div>

        {/* GRID SECTION */}
        <div className="relative mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {/* MAP IMAGE */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-md flex justify-center items-center">
            <img
              src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/africa3.png"
              alt="Map Preview"
              className="w-[700px] max-w-4xl h-auto rounded-xl object-cover"
            />
          </div>

          {/* HOVER EXPAND */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-md flex justify-center items-center">
            <HoverExpand
              images={images}
              initialSelectedIndex={0}
              thumbnailHeight={200}
              modalImageSize={400}
              maxThumbnails={6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
