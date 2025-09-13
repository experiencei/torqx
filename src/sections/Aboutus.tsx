'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Spotlight } from '@/components/Spotlight';
import { BorderBeam } from '@/components/Border';
import { CardHoverEffect } from '@/components/Pulse';
import {
  Globe,
  Users,
  Heart,
  Lightbulb,
  Sparkles,
  Rocket, 
  Target,
} from "lucide-react";

const iconComponents = {
  Users: Users,
  Heart: Heart,
  Lightbulb: Lightbulb,
  Globe: Globe,
  Sparkles: Sparkles,
  Rocket: Rocket,
  Target: Target,
};

type IconName = keyof typeof iconComponents;

const values: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Customer Centricity",
    description:
      "Every solution begins with our customers. We design around their needs, challenges, and goals.",
    icon: "Users",
  },
  {
    title: "Quality Obsession",
    description:
      "From strategy to execution, excellence is non-negotiable. We deliver only the highest standards.",
    icon: "Heart",
  },
  {
    title: "Agility",
    description:
      "We move fast, adapt quickly, and embrace change—staying ahead in an ever-evolving market.",
    icon: "Rocket",
  },
  {
    title: "Innovation",
    description:
      "We push boundaries with data, creativity, and technology to unlock new possibilities.",
    icon: "Lightbulb",
  },
];

export default function AboutUs1() {
  const aboutData = {
    title: "About Us",
    subtitle:
      "Your brand everywhere it matters. We connect with Africa’s premium audiences where they live, work, and play.",
    mission:
      "Traditional outdoor advertising needed disruption. Grid brings intelligence to urban spaces, data to digital displays, and innovation to audience engagement.",
    vision:
      "We see Africa’s cities not as cluttered with ads, but as canvases waiting for stories. Our vision is to transform how brands connect with millions across the continent—redefining the future of engagement.",
    values,
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full overflow-hidden py-20 bg-black text-white">
      {/* <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(220, 100%, 50%, 0.08) 0, hsla(220, 100%, 55%, 0.04) 50%, transparent 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, 0.08) 0, hsla(220, 100%, 55%, 0.04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, 0.06) 0, hsla(220, 100%, 85%, 0.06) 80%, transparent 100%)"
      /> */}

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h1 className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400">
            {aboutData.subtitle}
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 grid gap-12 md:grid-cols-2"
          >
            {/* Mission */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br from-gray-900 to-gray-800 p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="via-blue-500/40 from-transparent to-transparent"
              />

              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5">
                <Rocket className="h-8 w-8 text-blue-400" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-3xl font-semibold text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {aboutData.mission}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br from-gray-900 to-gray-800 p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="from-transparent via-purple-500/40 to-transparent"
                reverse
              />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5">
                <Target className="h-8 w-8 text-purple-400" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-3xl font-semibold text-transparent">
                Our Vision
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div ref={valuesRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
              The principles that guide our every step—driving trust, impact,
              and innovation.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutData.values?.map((value, index) => {
              const IconComponent = iconComponents[value.icon];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-6 w-6" />}
                    title={value.title}
                    description={value.description}
                    variant={
                      index === 0
                        ? "blue"
                        : index === 1
                        ? "purple"
                        : index === 2
                        ? "rose"
                        : "amber"
                    }
                    glowEffect={true}
                    size="lg"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
