'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const industries = [
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/restaurantss.jpeg', label: 'Restaurants' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/gyms.png', label: 'Gyms' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/university.jpeg', label: 'Universities' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/hotellagos.jpeg', label: 'Hotels' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/pharmacy.png', label: 'Retail & Pharmacies' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/coworking.png', label: 'Co-working Spaces' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/agency.png', label: 'Travel Agencies' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/diningy.png', label: 'Casual Dining' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/airway.jpeg', label: 'Airport' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/grocerynew.jpeg', label: 'Grocery Store' },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/doctors.png', label: "Doctor's office" },
  { src: 'https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/gasstation.jpeg', label: 'Gas Station' },
];

export default function MasonryGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen px-4 py-20 md:px-6 bg-black text-white">
      {/* Section Intro */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
          Built for Every Space, Designed for Every Industry
        </h2>
        <p className="text-lg text-gray-400">
          From restaurants to gyms, universities to hotels, Grid transforms spaces into
          monetizable, connected environments. No matter your venue size or audience, our
          platform adapts to engage, inform, and unlock new revenue streams.
        </p>
      </div>

      {/* Gallery */}
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
        {industries.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out"
          >
            <motion.img
              src={item.src}
              alt={item.label}
              className={`w-full rounded-lg object-cover transition-all duration-300 ease-in-out ${
                hovered === null
                  ? 'blur-0 scale-100'
                  : hovered === index
                    ? 'blur-0 scale-105'
                    : 'blur-xs'
              }`}
              whileHover={{ scale: 1.05 }}
            />

            {/* Overlay Label */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-lg font-semibold text-white tracking-wide">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
