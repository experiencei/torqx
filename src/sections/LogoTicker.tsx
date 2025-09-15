"use client";

import { motion } from "framer-motion";

const logos = [
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/blackbell.jpg",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/cafeone.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/chicken.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/filmhouse.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/ifitness.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/medplus.jpg",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/shoprite.png",
  "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/spar.png",
];

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-10 bg-white">
      <div className="container mx-auto">
        {/* Section Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-lg font-medium text-black"
        >
          Our Location Customer{" "}
          {/* <span className="font-semibold text-black">1000+ businesses</span> */}
        </motion.p>

        {/* Logos Ticker */}
        <div className="mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {[...logos, ...logos].map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Brand Logo"
                className="h-12 w-22 object-contain mx-auto"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
