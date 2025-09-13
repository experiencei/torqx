"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Merriweather } from "next/font/google"; // Google font just for testimonials


import avatar2 from "@/assets/avatar-2.png";


// Import Merriweather for testimonials
const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type Testimonial = {
  text: string;
  imageSrc: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    text: "Torqx AI has redefined how we deliver digital ads in urban centers. The precision targeting and real-time triggers give us unmatched impact.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of1.jpeg",
    name: "Nadia Bello",
    role: "Head of Marketing, UrbanReach",
  },
  {
    text: "We connected 200+ screens across airports and malls using Torqx AI. Campaign deployment went from weeks of manual work to a few minutes.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of2.jpeg",
    name: "Chidi Okeke",
    role: "CTO, AeroConnect",
  },
  {
    text: "The contextual relevance of Torqx AI is unmatched. Switching ads based on weather and location helped us increase engagement by 35%.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of3.jpeg",
    name: "Amira Hassan",
    role: "Brand Manager, VitaJuice",
  },
  {
    text: "Torqx AI gave us hyperlocal mastery. Reaching gym-goers with sports drink campaigns in real-time changed how we think about DOOH.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of6.jpeg",
    name: "Lucas Martins",
    role: "Growth Lead, PowerFuel",
  },
  {
    text: "For the first time, we can measure proof-of-play and live impressions from digital screens. Torqx AI turned DOOH into a performance channel.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of4.jpeg",
    name: "Ebele Onwudiwe",
    role: "Data Science Lead, AdNova",
  },
  {
    text: "Torqx AI’s integrations make scaling campaigns across cities seamless. The automation has saved us hundreds of hours.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of5.jpeg",
    name: "Daniel Kofi",
    role: "Operations Manager, ScreenNet Africa",
  },
  {
    text: "Before Torqx AI, running contextual ads across multiple vendors was a nightmare. Now, everything is unified under one dashboard.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of6.jpeg",
    name: "Sophia Adeyemi",
    role: "Product Manager, RetailOne",
  },
  {
    text: "We used Torqx AI to run interactive campaigns at malls. Engagement soared because ads finally felt timely and relevant.",
    imageSrc: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/of7.jpeg",
    name: "James Mensah",
    role: "Digital Strategist, AdHive",
  },
  {
    text: "Torqx AI is the bridge between creativity and data. It has given our campaigns both storytelling power and measurable outcomes.",
    imageSrc: avatar2.src,
    name: "Fatima Diallo",
    role: "Creative Director, BrandSpark",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = ({
  className,
  testimonials,
  duration,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => (
  <div className={className}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration: duration || 10,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <Fragment key={index}>
          {testimonials.map(({ text, imageSrc, name, role }) => (
            <div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              key={imageSrc}
            >
              <p
                className={`${merriweather.className} text-base md:text-lg text-gray-800 leading-relaxed`}
              >
                “{text}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-black">
                    {name}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">
                    {role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-black">
            Trusted by Africa’s Leading Brands
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how{" "}
            <span className="text-[#16a34a] font-semibold">Torqx AI</span>{" "}
            empowers advertisers to create memorable, context-driven campaigns
            across cities, malls, gyms, and airports.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="mt-14 flex justify-center gap-6 max-h-[738px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
