"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import HoverExpand from "@/components/ui/hover-expand";

const text = `Providing advertisers with high impact access to Urban Africa.`;
const words = text.split(" ");

const images = [
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
<div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-md flex justify-center items-center overflow-hidden">
  <img
    src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/africas.png"
    alt="Map Preview"
    className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-xl object-contain"
  />
</div>

{/* HOVER EXPAND */}
<div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-md flex justify-center items-center overflow-hidden">
  <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
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
      </div>
    </section>
  );
}
