'use client';

import { useEffect, useState } from 'react';
import { motion, spring } from 'framer-motion';
import { ArrowRight, Database, Sparkles, Zap } from 'lucide-react';
import Link from "next/link";

export default function AppHero() {
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    networks: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        users: prev.users >= 200 ? 200 : prev.users + 500,
        transactions: prev.transactions >= 15000 ? 15000 : prev.transactions + 3700,
        networks: prev.networks >= 4 ? 4 : prev.networks + 1,
      }));
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
    <section className="relative flex min-h-screen items-center bg-black px-6 py-16 text-white lg:px-12 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        
        {/* LEFT SIDE — Image + Floating Labels */}
        <div className="relative w-full max-w-5xl px-2">
  <img
    src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/dodo.png"
    alt="Torqx 3D Visualization"
    className="w-full h-auto object-contain transition-all duration-1000 hover:scale-105"
  />



          {/* Labels */}
          <motion.div
            variants={itemVariants}
            className="absolute top-4 left-2 rounded-lg border border-purple-500/30 bg-black px-2 py-1 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-medium">Dynamic Content</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="absolute top-1/2 right-2 rounded-lg border border-blue-500/30 bg-black px-2 py-1 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium">Seamless Monetization</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="absolute bottom-4 left-2 rounded-lg border border-indigo-500/30 bg-black px-2 py-1 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-medium">AI-Powered Targeting</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE — Text Content */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
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
              <p className="text-2xl font-bold">{stats.users.toLocaleString()}+</p>
              <p className="text-xs text-gray-400">Active Screens</p>
            </div>
            <div className="rounded-lg border border-blue-500/20 bg-black px-4 py-2">
              <p className="text-2xl font-bold">{stats.transactions.toLocaleString()}+</p>
              <p className="text-xs text-gray-400">Monthly Impressions</p>
            </div>
            <div className="rounded-lg border border-indigo-500/20 bg-black px-4 py-2">
              <p className="text-2xl font-bold">{stats.networks}+</p>
              <p className="text-xs text-gray-400">Cities Powered</p>
            </div>
          </motion.div>

          {/* Short description */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-lg text-lg leading-relaxed text-gray-300"
          >
            Grid turns static displays into living, AI-powered ecosystems — giving brands 
            and screen owners limitless possibilities.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-full border border-white bg-white px-6 py-3 text-base font-semibold text-black shadow-md transition hover:bg-green-500 hover:text-white"
            >
              Get Started with Grid
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 rounded-full border border-slate-700 bg-black px-3 py-1"
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
              <span className="font-semibold text-white">500+</span> advertisers already onboard
            </span>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
}
