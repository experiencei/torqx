'use client';

import React , { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Github } from 'lucide-react';
import Link from "next/link";
import { PopupButton , PopupWidget } from "react-calendly";

export default function GradientHero() {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.body);
  }, []);

  return ( 
    <div className="bg-background relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"></div>
        <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-26">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex justify-center"
          >
            <div className="border-border bg-background/80 inline-flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm">
              <span className="bg-[#C6FE1E] mr-2 rounded-full px-2 py-0.5 text-xs font-semibold text-black">
                New
              </span>
              <span className="text-muted-foreground">
                Launch Powerful Digital Ads in Minutes.
              </span>
              <ChevronRight className="text-muted-foreground ml-1 h-4 w-4" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center font-semibold text-black tracking-tighter text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Campaigns. Screens. Insights. All in One.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg"
          >
            AI-powered DOOH ads management platform built for Africa’s businesses. 
            Simplify campaigns, maximize reach, and measure impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Request a Demo */}
            {root && (
  <PopupButton
  url="https://calendly.com/ayelojahighbee01/30min"
  rootElement={document.body}
  text="Request a Demo →"
  className={"inline-flex items-center justify-center bg-black text-white space-x-2 rounded-full px-5 py-2 text-base font-semibold shadow-lg transition-all duration-300"}
/>
)}
            


            {/* Get Started */}
            <Link
  href="/contact"
  className="inline-flex items-center justify-center px-5 py-2 text-base font-semibold text-black border border-black rounded-full shadow-lg transition-all duration-300 hover:bg-black hover:text-white"
>
  Get Started for Free
</Link>
 
          </motion.div>

          {/* Feature Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: 'spring',
              stiffness: 50,
            }}
            className="relative mx-auto mt-12 max-w-4xl"
          >
            <div className="border-border/40 bg-background/50 overflow-hidden rounded-xl border shadow-xl backdrop-blur-sm">
              <div className="border-border/40 bg-muted/50 flex h-10 items-center border-b px-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-background/50 text-muted-foreground mx-auto flex items-center rounded-md px-3 -py-1 text-xs">
                  https://torqx.ai
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/2.jpg"
                  alt="Dashboard Preview"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
