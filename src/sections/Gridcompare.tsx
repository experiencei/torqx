"use client";

import { Comparison, ComparisonHandle, ComparisonItem } from "@/components/ui/kibo-ui/comparison";
import Image from "next/image";

const Gridcompare = () => (
  <section>
    <h2 className="text-3xl font-bold text-center mb-4">
  From Static Posters to Smart Screens
  </h2>
  <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
  Traditional billboards can’t adapt. Grid transforms any screen into a dynamic,
  AI-powered platform that evolves with your audience.
  </p>
  <Comparison className="aspect-video">
    <ComparisonItem className="bg-red-500" position="left">
      <Image
        alt="Placeholder 1"
        className="opacity-50"
        height={1080}
        src="https://placehold.co/1920x1080?random=1"
        unoptimized
        width={1920}
      />
    </ComparisonItem>
    <ComparisonItem className="bg-blue-500" position="right">
      <Image
        alt="Placeholder 2"
        className="opacity-50"
        height={1440}
        src="https://placehold.co/2560x1440?random=2"
        unoptimized
        width={2560}
      />
    </ComparisonItem>
    <ComparisonHandle />
  </Comparison>
  </section>
);

export default Gridcompare;