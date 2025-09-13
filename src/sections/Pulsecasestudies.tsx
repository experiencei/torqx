"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CaseStudy = {
  industry: string;
  title: string;
  description: string;
  image: string;
};

const caseStudies: CaseStudy[] = [
  {
    industry: "Restaurants",
    title: "Boosting Foot Traffic with Hyper-Local Ads",
    description:
      "A fast-casual chain used Pulse geotargeting to reach hungry diners within 1km of their locations. Within 2 weeks, they saw a 30% increase in walk-ins during lunch hours.",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/set.png",
  },
  {
    industry: "Retail",
    title: "Driving Seasonal Sales in Real Time",
    description:
      "A fashion retailer leveraged Pulse’s scheduling tools to push time-limited offers across malls and shopping districts. Campaigns delivered a 22% lift in same-day sales.",
    image:
    "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/ret.png",
  },
  {
    industry: "Healthcare",
    title: "Improving Patient Engagement & Trust",
    description:
      "Hospitals deployed Pulse screens to share wellness tips and reduce waiting-time anxiety. Patients reported higher satisfaction scores and better appointment attendance.",
    image:  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/cet.png"
  },
];

export default function PulseCaseStudies() {
  return (
    <section className="bg-black text-white py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Real Impact. Across Industries.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
            See how businesses unlock growth and engagement with Pulse Ads
            Manager.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.industry}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-10 items-center",
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-lg md:h-96">
                <Image
                  src={study.image}
                  alt={study.industry}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div>
                <span className="text-sm uppercase tracking-wide text-gray-400">
                  {study.industry}
                </span>
                <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                  {study.title}
                </h3>
                <p className="mt-4 text-gray-400 text-base leading-relaxed">
                  {study.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
