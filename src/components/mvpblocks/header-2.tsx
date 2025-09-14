"use client";
// ii
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { PopupButton , useCalendlyEventListener  } from "react-calendly";

interface NavItem {
  name: string;
  href: string;
}

interface HeaderProps {
  variant?: "default" | "pulse";
}

const navItems: NavItem[] = [
  { name: "Pulse", href: "/pulse" },
  { name: "Grid", href: "/grid" },
  { name: "Solutions", href: "/solutions" },
  { name: "About Us", href: "/about" },
];


export default function Header({ variant = "default" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
      setRoot(document.body);
    }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useCalendlyEventListener({
    onEventScheduled: () => {
      setIsMobileMenuOpen(false); // closes nav when scheduling is complete
    },
  });

  const isPulse = variant === "pulse";

  // Colors logic based on variant
  const baseHeaderBg = isPulse
    ? "bg-black text-white"
    : isScrolled
    ? "bg-white/80 shadow-sm backdrop-blur-md text-black"
    : "bg-transparent text-black";

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${baseHeaderBg}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  isPulse ? "bg-white" : "bg-black"
                }`}
              >
                <Zap className={`h-5 w-5 ${isPulse ? "text-black" : "text-white"}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  Torqx AI
                </span>
                <span className="text-xs opacity-60">
                  {isPulse ? "Pulse" : "Build faster"}
                </span>
              </div>
            </Link>
 
            {/* Desktop Nav */}
            <nav className="hidden items-center space-x-1 lg:flex">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200
                      ${
                        isPulse
                          ? hoveredItem === item.name
                            ? "bg-white text-black"
                            : "text-white hover:bg-white hover:text-black"
                          : hoveredItem === item.name
                          ? "bg-black text-white"
                          : "text-black hover:text-black/80"
                      }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Buttons */}
            <div className="hidden items-center space-x-3 lg:flex">
              <Link
                href="/contact"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${
                    isPulse
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:text-white hover:bg-black"
                  }`}
              >
                Get Started for Free
              </Link>


  
{root && (
  <PopupButton
  url="https://calendly.com/ayelojahighbee01/30min"
  rootElement={document.body}
  text="Request a Demo"
  className={`inline-flex items-center space-x-2 rounded-lg px-5 py-2.5 text-sm font-semibold border transition-colors duration-200
    ${
      isPulse
        ? "border-white text-white hover:bg-white hover:text-black"
        : "border-black text-black hover:bg-black hover:text-white"
    }`}
/>
)}
    
              
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden rounded-lg p-2 transition-colors duration-200 ${
                isPulse
                  ? "text-white hover:bg-white hover:text-black"
                  : "text-black hover:bg-black hover:text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className={`fixed top-16 right-4 z-50 w-80 rounded-2xl shadow-2xl p-6 lg:hidden
              ${isPulse ? "bg-black text-white" : "bg-white text-black"}
            `}
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-lg px-4 py-3 font-medium transition-colors duration-200
                    ${
                      isPulse
                        ? "hover:bg-white hover:text-black"
                        : "hover:bg-black hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="space-y-3 mt-6">
              <Link
                href="/contact"
                className={`block w-full rounded-lg py-3 text-center font-medium shadow-lg transition-all duration-200
                  ${isPulse ? "bg-white text-black hover:bg-black hover:text-white" : "bg-black text-white hover:bg-white hover:text-black"}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started for Free
              </Link>
              <div
  onClick={() => setIsMobileMenuOpen(false)}
  className="w-full"
>
{root && (
  <PopupButton
  url="https://calendly.com/ayelojahighbee01/30min"
  rootElement={document.body}
  text="Request a Demo"
  className={`block w-full rounded-lg border py-3 text-center font-semibold shadow-lg transition-all duration-200
    ${
      isPulse
        ? "border-white text-white hover:bg-white hover:text-black"
        : "border-black text-black hover:bg-black hover:text-white"
    }
  `}
/>
)}
  
</div>

              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


