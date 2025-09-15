'use client';

import { useEffect, useState } from 'react';
import { easeInOut, motion, spring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { ArrowRight, Database, Sparkles, Zap } from 'lucide-react';

export default function AppHero() {
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    networks: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const newUsers = prev.users >= 200 ? 200: prev.users + 500;
        const newTransactions =
          prev.transactions >= 15000 ? 15000 : prev.transactions + 3700;
        const newNetworks = prev.networks >= 4 ? 4 : prev.networks + 1;

        if (
          newUsers === 1000 &&
          newTransactions === 15000 &&
          newNetworks === 0.4
        ) {
          clearInterval(interval);
        }

        return {
          users: newUsers,
          transactions: newTransactions,
          networks: newNetworks,
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: spring, stiffness: 100 },
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black mt-14 py-28 text-white sm:px-6 lg:px-8 lg:py-2">
      {/* Removed gradients / glow / noise → keep solid black bg */}
<div
  className="relative mx-auto mb-10 w-full max-w-[500px] sm:max-w-[600px] lg:max-w-[750px] xl:max-w-[900px] 
  lg:mb-0 lg:mr-0 lg:flex-shrink-0"
>
  <img
    src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/dodo.png"
    alt="Torqx 3D Visualization"
    className="h-auto w-full object-contain transition-all duration-1000 hover:scale-105"
  />

  {/* Labels */}
  <motion.div
    variants={itemVariants}
    className="absolute top-4 left-2 sm:top-6 sm:-left-4 rounded-lg border border-purple-500/30 bg-black p-2 backdrop-blur-md"
  >
    <div className="flex items-center gap-2">
      <Zap className="h-4 w-4 text-purple-400" />
      <span className="text-xs font-medium">Dynamic Content</span>
    </div>
  </motion.div>

  <motion.div
    variants={itemVariants}
    className="absolute top-1/2 right-2 sm:-right-8 rounded-lg border border-blue-500/30 bg-black p-2 backdrop-blur-md"
  >
    <div className="flex items-center gap-2">
      <Database className="h-4 w-4 text-blue-400" />
      <span className="text-xs font-medium">Seamless Monetization</span>
    </div>
  </motion.div>

  <motion.div
    variants={itemVariants}
    className="absolute bottom-4 left-2 sm:bottom-8 sm:left-8 rounded-lg border border-indigo-500/30 bg-black p-2 backdrop-blur-md"
  >
    <div className="flex items-center gap-2">
      <Sparkles className="h-4 w-4 text-indigo-400" />
      <span className="text-xs font-medium">AI-Powered Targeting</span>
    </div>
  </motion.div>
</div>


      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mb-10 flex w-full max-w-[1450px] flex-grow flex-col items-center justify-center px-4 text-center sm:px-8 lg:mb-0 lg:items-start lg:justify-end lg:text-left"
      >
        <motion.div className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-start">
          <div className="w-full lg:w-auto">
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-green-500/30 bg-black px-3 py-1 text-sm text-green-300"
            >
              <span className="mr-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
                New
              </span>
              Introducing Grid
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              The Future of Screens, <br className="hidden sm:inline" />
              <span className="text-green-400">Powered by AI</span>
            </motion.h1>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex flex-wrap justify-center gap-4 md:gap-6 lg:justify-start"
            >
              <div className="rounded-lg border border-purple-500/20 bg-black px-4 py-2">
                <p className="text-2xl font-bold text-white">
                  {stats.users.toLocaleString()}+
                </p>
                <p className="text-xs text-gray-400">Active Screens</p>
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-black px-4 py-2">
                <p className="text-2xl font-bold text-white">
                  {stats.transactions.toLocaleString()}+
                </p>
                <p className="text-xs text-gray-400">Monthly Impressions</p>
              </div>
              <div className="rounded-lg border border-indigo-500/20 bg-black px-4 py-2">
                <p className="text-2xl font-bold text-white">
                  {stats.networks}+
                </p>
                <p className="text-xs text-gray-400">Cities Powered</p>
              </div>
            </motion.div>

            {/* Integrations */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <span className="text-xs font-medium text-gray-400">
                Integrates with:
              </span>
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-black px-2 py-1 text-xs font-medium text-gray-300">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                Android
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-black px-2 py-1 text-xs font-medium text-gray-300">
                <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                Linux
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-black px-2 py-1 text-xs font-medium text-gray-300">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                Mac OS
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-black px-2 py-1 text-xs font-medium text-gray-300">
                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                +2 more
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-col items-center lg:mt-0 lg:items-end">
            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md px-6 text-center text-lg leading-relaxed text-gray-300 lg:text-end"
            >
              Grid turns static displays into living, AI-powered ecosystems —
              giving brands and screen owners limitless possibilities.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-col flex-wrap gap-4 sm:flex-row lg:justify-end"
            >
              <Link
    href="/contact"
    className="group inline-flex items-center justify-center rounded-full px-3 py-3 text-base font-semibold text-black border  bg-white border-white shadow-md transition hover:bg-green-500 hover:text-white"
  >
    Get Started with Grid
    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

  </Link>
              {/* <Button
                className="group rounded-full border border-white bg-white text-black px-6 py-6 shadow-lg transition-all hover:bg-gray-200"
                size="lg"
              >
                Get Started with Grid
              </Button> */}
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mx-auto flex items-center gap-3 rounded-full border border-slate-700 bg-black px-3 py-1 lg:mx-0 lg:ml-auto"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 overflow-hidden rounded-full border-2 border-black bg-slate-800"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-blue-600"></div>
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-300">
                <span className="font-semibold text-white">500+</span>{' '}
                advertisers already onboard
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
    </section>
  );
}
