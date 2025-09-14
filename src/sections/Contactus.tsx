'use client';

import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import Confetti from 'react-confetti';
import Link from 'next/link';

export default function ContactUs2() {
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
        headers: { 'content-type': 'application/json' },
      });
      if (res.status === 200) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Err', err);
    }
  };

  return isSubmitted ? (
    <div className="flex flex-col items-center justify-center py-20 text-white bg-black">
      <h1 className="text-center font-extrabold text-3xl md:text-4xl">
        🎉 Thank you for reaching out to Torqx AI!
      </h1>
      <p className="mt-3 text-gray-400 text-center">
        Our team will get back to you soon — the future of AI-powered growth starts here.
      </p>
      <Confetti />
    </div>
  ) : (
    <section className="w-full bg-black text-white py-20">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Heading */}
        <h2 className="mb-5 text-center text-4xl font-semibold md:text-6xl leading-tight">
  Let’s Shape the Future with <br />
  <span className="text-green-500 block">Torqx AI</span>
</h2>

        <p className="mb-12 text-center text-gray-400 max-w-2xl mx-auto">
          Whether you’re an ambitious startup, a growing brand, or an enterprise looking to scale — 
          Torqx AI is here to power your journey. Drop us a message and let’s create impact together.
        </p>

        {/* Grid layout */}
        <div className="mx-auto grid gap-12 rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-10 shadow-xl md:grid-cols-2">
          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-black px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-black px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[120px] rounded-md border border-gray-700 bg-black px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="How can Torqx AI help you?"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full rounded-md border border-white bg-white px-4 py-3 text-black font-semibold uppercase tracking-wide transition hover:bg-black hover:text-white"
            >
              Let’s Build the Future <Send className="ml-2 h-5 w-5" />
            </button>
          </form>

          {/* Contact Info */}
          <div>
            <h3 className="mb-8 text-2xl font-semibold">Connect with Us</h3>
            <div className="mb-6 flex items-center gap-4">
              <Mail className="h-6 w-6 text-green-500" />
              <p className="text-gray-300">ask@torqx.ai</p>
            </div>
            <div className="mb-6 flex items-center gap-4">
              <Phone className="h-6 w-6 text-green-500" />
              <p className="text-gray-300">+234 8069311076</p>
            </div>
            <div className="mb-6 flex items-center gap-4">
              <MapPin className="h-6 w-6 text-green-500" />
              <p className="text-gray-300">Lagos,Nigeria</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-8">
              <Link href="#" className="hover:text-green-500 transition">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-green-500 transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-green-500 transition">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-green-500 transition">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
