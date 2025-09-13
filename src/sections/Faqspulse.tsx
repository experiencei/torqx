'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is Pulse Ads Manager?",
    answer:
      "Pulse is Torqx AI’s intelligent ad manager that helps brands, agencies, and enterprises launch DOOH, CTV, and connected screen campaigns in minutes. No paperwork, no back-and-forth — just AI-powered simplicity.",
  },
  {
    question: "Can I create ads without a designer?",
    answer:
      "Yes! With Pulse, you can generate ad creatives directly using AI prompts. Simply describe your idea, and Pulse designs it for you — saving time and cost while ensuring professional quality.",
  },
  {
    question: "How does geotargeting work in Pulse?",
    answer:
      "Advanced geotargeting lets you select precise locations for your campaigns: cities, postal codes, individual venues, or radius targeting. Integrated Google Maps previews show exactly where your ads will run.",
  },
  {
    question: "Which industries can benefit from Pulse?",
    answer:
      "Pulse serves every sector — from retail and restaurants to healthcare, education, entertainment, and corporate spaces. Anywhere there’s a screen, Pulse helps you connect with audiences effectively.",
  },
  {
    question: "Can I track performance in real time?",
    answer:
      "Absolutely. Pulse gives you a live dashboard with campaign insights, impressions, and engagement metrics. You can even generate QR codes for interactive tracking and optimize campaigns instantly.",
  },
  {
    question: "How fast can I launch a campaign?",
    answer:
      "In minutes. Just log in, set your budget, pick your venues and schedule, and Pulse handles the rest — no contracts, no delays. It’s advertising at the speed of your business.",
  },
];

export default function PulseFAQs() {
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
            Everything you need to know about Pulse — from launching campaigns 
            to tracking performance, answered in one place.
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
