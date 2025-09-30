'use client';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

const data = {
  facebookLink: "https://facebook.com/torqxai",
  instaLink: "https://instagram.com/torqxai",
  // twitterLink: "https://twitter.com/torqxai",
  linkedinLink: "https://linkedin.com/company/torqxai",
  products: {
    pulse: "/pulse",
    grid: "/grid",
  },
  about: {
    solutions: "/solutions",
    company: "/about",
  },
  contact: {
    email: "ask@torqx.ai",
    phone: "+234 8069311076",
    address: "Lagos, Nigeria",
  },
  company: {
    name: "Torqx AI",
    description:
      "Empowering advertisers and screen owners with AI-driven tools to launch, manage, and monetize digital campaigns across DOOH, CTV, and connected screens in minutes.",
    logo: "https://i.postimg.cc/2SRcktkT/Mvpblocks.webp",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  // { icon: Twitter, label: "Twitter", href: data.twitterLink },
  { icon: Linkedin, label: "LinkedIn", href: data.linkedinLink },
];

interface FooterProps {
  variant?: "default" | "pulse";
}

export default function FooterTorqx({ variant = "default" }: FooterProps) {
  const isPulse = variant === "pulse";

  return (
    <footer
      className={`mt-10 w-full place-self-end rounded-t-xl transition-colors duration-300 ${
        isPulse ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 sm:justify-start">
              <img
                src={data.company.logo || "/placeholder.svg"}
                alt="Torqx AI logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-2xl font-bold tracking-tight">
                {data.company.name}
              </span>
            </div>
            <p
              className={`mt-6 max-w-sm text-sm leading-relaxed ${
                isPulse ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {data.company.description}
            </p>
            <ul className="mt-6 flex gap-6">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    prefetch={false}
                    href={href}
                    className={`transition ${
                      isPulse
                        ? "text-gray-600 hover:text-black"
                        : "text-gray-400 hover:text-emerald-400"
                    }`}
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="text-lg font-semibold">Products</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  href={data.products.pulse}
                  className={`transition ${
                    isPulse ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Pulse
                </Link>
              </li>
              <li>
                <Link
                  href={data.products.grid}
                  className={`transition ${
                    isPulse ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Grid
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-lg font-semibold">About Us</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  href={data.about.solutions}
                  className={`transition ${
                    isPulse ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Solution
                </Link>
              </li>
              <li>
                <Link
                  href={data.about.company}
                  className={`transition ${
                    isPulse ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Company
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-lg font-semibold">Contact</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail
                  className={`${isPulse ? "text-black" : "text-emerald-400"} size-4`}
                />
                <span className={isPulse ? "text-gray-600" : "text-gray-400"}>
                  {data.contact.email}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className={`${isPulse ? "text-black" : "text-emerald-400"} size-4`}
                />
                <span className={isPulse ? "text-gray-600" : "text-gray-400"}>
                  {data.contact.phone}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin
                  className={`${isPulse ? "text-black" : "text-emerald-400"} size-4`}
                />
                <span className={isPulse ? "text-gray-600" : "text-gray-400"}>
                  {data.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className={`mt-12 border-t pt-6 ${
            isPulse ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className={`text-sm ${isPulse ? "text-gray-500" : "text-gray-500"}`}>
              &copy; 2025 {data.company.name}. All rights reserved.
            </p>
            <p className={`text-sm mt-4 sm:mt-0 ${isPulse ? "text-gray-500" : "text-gray-500"}`}>
              Powered by Torqx AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
