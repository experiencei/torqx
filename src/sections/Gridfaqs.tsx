"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from 'lucide-react';


const faqs = [
  {
    question: "Do I need to buy new screens to use Grid?",
    answer:
      "Not at all. If you already have Smart TVs (Android or FireOS) or can connect a streaming stick like Chromecast, you’re good to go. Just install the Grid Screen Manager app and start monetizing instantly.",
  },
  {
    question: "What if my venue doesn’t have any screens?",
    answer:
      "Grid provides plug-and-play hardware for venues with high foot traffic. We’ll ship devices directly to you, so you can start running ads and generating revenue overnight.",
  },
  {
    question: "How do I integrate Grid with my existing digital signage system?",
    answer:
      "Grid connects seamlessly with your CMS or signage setup via API, Lite URL, or VAST tags — keeping your current workflow while adding new revenue streams.",
  },
  {
    question: "Is there any cost to get started?",
    answer:
      "No. Grid’s free plan lets you connect and run screens without upfront costs. Upgrade to Pro for analytics, AI-powered targeting, and enterprise support.",
  },
  {
    question: "How does Grid help me generate revenue?",
    answer:
      "By connecting your screens to the Grid network, you unlock access to advertisers who want to reach real audiences in your venue. Every impression is tracked and monetized.",
  },
  {
    question: "What kind of venues can use Grid?",
    answer:
      "Restaurants, gyms, coworking spaces, travel agencies, pharmacies, universities, malls, hotels — any venue with screens and people walking through can benefit.",
  },
];

export default function GridFAQs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about using Grid to monetize your venue
            screens.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                {activeIndex === index ? (
                  <Minus className="h-5 w-5 text-green-400" />
                ) : (
                  <Plus className="h-5 w-5 text-green-400" />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white text-black px-6 py-3 font-semibold shadow-md hover:bg-gray-200 transition-all"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
