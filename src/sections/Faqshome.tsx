'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'all' | 'pulse' | 'grid' | 'solutions';
}

const faqItems: FaqItem[] = [
  // General / All
  {
    id: '1',
    question: 'What is Torqx AI?',
    answer:
      'Torqx AI is a next-generation digital advertising platform. With Pulse, advertisers can launch campaigns in minutes across DOOH, CTV, and digital screens. With Grid, screen owners can monetize their displays instantly and earn from global campaigns.',
    category: 'all',
  },

  // Pulse FAQs
  {
    id: '2',
    question: 'What is Pulse?',
    answer:
      'Pulse is our ad management dashboard. Brands, businesses, agencies, and enterprises can design, schedule, and launch campaigns without scouting, negotiating, or paperwork. Just set your budget and go live instantly.',
    category: 'pulse',
  },
  {
    id: '3',
    question: 'How fast can I launch a campaign with Pulse?',
    answer:
      'Campaigns can go live in minutes. No long contracts, no manual approvals — just choose your locations, set your budget, and Pulse handles the rest.',
    category: 'pulse',
  },
  {
    id: '4',
    question: 'Does Pulse support programmatic ads?',
    answer:
      'Yes. Pulse supports programmatic ad buying, audience targeting, and contextual triggers like weather, time of day, or foot traffic. Your campaigns always reach the right audience at the right time.',
    category: 'pulse',
  },

  // Grid FAQs
  {
    id: '5',
    question: 'What is Grid?',
    answer:
      'Grid allows any screen owner — from gyms and restaurants to airports and malls — to monetize their screens by running ads. Even landlords without screens can participate by installing supported devices.',
    category: 'grid',
  },
  {
    id: '6',
    question: 'How do I connect my screens to Grid?',
    answer:
      'It’s simple: install the Torqx AI app (Android, Linux, Apple, Windows, or webOS). You can connect via API, CMS, Lite URL, or VAST Tag. Just add it to your playlist and start earning immediately.',
    category: 'grid',
  },
  {
    id: '7',
    question: 'Do I need new hardware to use Grid?',
    answer:
      'No. Grid works with most existing digital signage systems and media players. If you have a screen, you can monetize it.',
    category: 'grid',
  },

  // Solutions / Use Cases
  {
    id: '8',
    question: 'Who can benefit from Torqx AI solutions?',
    answer:
      'Advertisers can launch impactful campaigns across multiple cities. Agencies can manage clients at scale. Screen owners can unlock new revenue streams. Enterprises can control vast screen networks with one dashboard.',
    category: 'solutions',
  },
  {
    id: '9',
    question: 'Can Torqx AI integrate with my existing CMS?',
    answer:
      'Yes. Torqx AI integrates seamlessly with your CMS or signage system. Whether via API, Lite URL, or VAST tags, we adapt to your existing workflow.',
    category: 'solutions',
  },
  {
    id: '10',
    question: 'What kind of targeting does Torqx AI support?',
    answer:
      'We support contextual targeting such as location, weather, time of day, and audience behavior. This ensures every ad is relevant, timely, and impactful.',
    category: 'solutions',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'grid', label: 'Grid' },
  { id: 'solutions', label: 'Solutions' },
];

export default function Faq2() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white py-6 md:py-6">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center">

          <h2 className="text-black mb-6 text-center text-4xl font-semibold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 max-w-2xl text-center">
            Everything you need to know about Pulse, Grid, and how Torqx AI helps brands and screen owners transform advertising.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black-700 hover:bg-black-200',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  'border border-gray-200 h-fit overflow-hidden rounded-xl',
                  expandedId === faq.id
                    ? 'shadow-lg bg-gray-50'
                    : 'bg-white',
                )}
                style={{ minHeight: '58px' }}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <h3 className="text-black text-lg font-semibold">
                    {faq.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {expandedId === faq.id ? (
                      <MinusIcon className="text-brand-green h-5 w-5" />
                    ) : (
                      <PlusIcon className="text-brand-green h-5 w-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 px-6 pt-2 pb-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Can’t find what you’re looking for?
          </p>
          <a
            href="/contact"
            className="border-brand-green text-brand-green hover:bg-black hover:text-white inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 font-medium transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
