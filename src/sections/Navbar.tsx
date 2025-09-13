"use client"

import Image from "next/image";
import  Logo from "@/assets/images/logo.svg";
// import Button from "@/components/Buttona";
// import {twMerge } from "tailwind-merge";
// import { useState } from 'react';
// import { AnimatePresence , motion } from "framer-motion";

import { Button } from "@/components/ui/buttonui"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const navigationLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#", label: "Features" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
]

export default function Navbar() {
  return (
    <header className="bg-brand-dark/95 backdrop-blur-md border-b border-white/10 px-4 md:px-6 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-9 md:hidden text-white hover:bg-white/10"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-in-out group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-in-out group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-in-out group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40 p-2 md:hidden bg-brand-dark border border-white/10">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className="block py-2 px-3 rounded-md text-white/80 hover:text-brand-green hover:bg-white/10 font-medium"
                        active={link.active}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-brand-green hover:opacity-90 transition">
              <Logo />
            </a>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-4">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className={`py-1.5 font-medium transition ${
                        link.active
                          ? "text-brand-green"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-sm text-white/70 hover:text-brand-green hover:bg-white/10"
          >
            <a href="#">Sign In</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="text-sm bg-brand-green text-brand-dark hover:bg-brand-green/90 font-semibold"
          >
            <a href="#">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  )
}


// const navLinks = [
//     { label: "Home", href: "#" },
//     { label: "Features", href: "#features" },
//     { label: "Integrations", href: "#integrations" },
//     { label: "FAQs", href: "#faqs" },
// ];

// export default function Navbar() {
//     const [isOpen , setIsOpen] = useState(false);
//     return (
//         <>
//         <section className="py-4 lg:py-8 fixed w-full top-0 z-50">
//             <div className="container max-w-5xl">
//                 <div className="border border-white/15 rounded-[27px] md:rounded-full bg-neutral-950/70 backdrop-blur">
//                     <div className="grid grid-cols-2 lg:grid-cols-3 p-2 px-4 md:pr-2 items-center ">
//                         <div>
//                             <LogoImage className="h-9 md:h-auto w-auto"/>
//                         </div>
//                         {/* // note the hidden class if for us to hide the navigation on tab view */}
//                         <div className="flex justify-center items-center hidden"> 
//                             <nav className="flex gap-6 foot-medium">
//                             {navLinks.map((link) => (
//                                 <a href={link.href} key={link.label}>
//                                     {link.label}
//                                 </a>
//                             ))}
                            
//                             </nav>
//                         </div>
//                         <div className="flex justify-end gap-4">
//                         <svg 
//                             xmlns="http://www.w3.org/2000/svg" 
//                             width="24" 
//                             height="24" 
//                             viewBox="0 0 24 24" 
//                             fill="none" 
//                             stroke="currentColor" 
//                             strokeWidth="2" 
//                             strokeLinecap="round" 
//                             strokeLinejoin="round" 
//                             className="feather feather-menu md:hidden"
//                             onClick={() => setIsOpen(!isOpen)}
//                             >
                            
//                             <line x1="3" y1="6" x2="21" y2="6" className={twMerge("origin-left transition" , isOpen && 'rotate-45 -translate-y-1')}></line>
//                             <line x1="3" y1="12" x2="21" y2="12" className={twMerge("transition", isOpen && 'opacity-0')}></line>
//                             <line x1="3" y1="18" x2="21" y2="18" className={twMerge("origin-left transition" , isOpen && "-rotate-45 translate-y-1")}></line>
//                         </svg>
//                         <Button variant="secondary" className="hidden md:inline-flex items-center"> Log In</Button>
//                         <Button variant="primary" className="hidden md:inline-flex items-center">Sign Up</Button>
//                         </div>
//                     </div>
//                     <AnimatePresence>
//                         {isOpen && (
//                             <motion.div 
//                                 initial={{
//                                     height : 0
//                                 }}
//                                 animate={{
//                                     height : "auto"
//                                 }}
//                                 exit={{height : "auto"}}
//                             className=" overflow-hidden">
//                                 <div className="flex flex-col items-center gap-4 py-4">
//                             {navLinks.map(link => (
//                                 <a href={link.href} key={link.label} className="">{link.label}</a>
//                             ))}
//                             <Button variant="secondary">Log In</Button>
//                             <Button variant="primary">Sign Up</Button>
//                             </div>
//                         </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </section>

//         <div className="pb-[86px] md:pb-[98px] lg:px-[130px]">
//         </div>
//         </>
//     )
// };


  
// "use client";

// import Image from "next/image";
// import logoImage from "@/assets/images/logo.svg";
// import Button from "@/components/Button";
// import { twMerge } from "tailwind-merge";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const navLinks = [
//   { label: "Home", href: "#" },
//   { label: "Features", href: "#features" },
//   { label: "Integrations", href: "#integrations" },
//   { label: "FAQs", href: "#faqs" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <section className="py-4 lg:py-8 fixed w-full top-0 z-50">
//         <div className="container max-w-5xl">
//           <div className="border border-white/15 rounded-[27px] md:rounded-full bg-brand-dark/70 backdrop-blur">
//             <div className="grid grid-cols-2 lg:grid-cols-3 p-2 px-4 md:pr-2 items-center ">
//               <div>
//                 <Image
//                   src={logoImage}
//                   alt="torqx logo"
//                   className="h-9 md:h-auto w-auto"
//                 />
//               </div>

//               {/* Note the hidden class is for us to hide the navigation on small screens */}
//               <div className="flex justify-center items-center hidden lg:flex">
//                 <nav className="flex gap-6 font-medium text-white">
//                   {navLinks.map((link) => (
//                     <a
//                       href={link.href}
//                       key={link.label}
//                       className="hover:text-brand-green transition"
//                     >
//                       {link.label}
//                     </a>
//                   ))}
//                 </nav>
//               </div>

//               <div className="flex justify-end gap-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="feather feather-menu lg:hidden cursor-pointer text-white"
//                   onClick={() => setIsOpen(!isOpen)}
//                 >
//                   <line
//                     x1="3"
//                     y1="6"
//                     x2="21"
//                     y2="6"
//                     className={twMerge(
//                       "origin-left transition",
//                       isOpen && "rotate-45 -translate-y-1"
//                     )}
//                   />
//                   <line
//                     x1="3"
//                     y1="12"
//                     x2="21"
//                     y2="12"
//                     className={twMerge("transition", isOpen && "opacity-0")}
//                   />
//                   <line
//                     x1="3"
//                     y1="18"
//                     x2="21"
//                     y2="18"
//                     className={twMerge(
//                       "origin-left transition",
//                       isOpen && "-rotate-45 translate-y-1"
//                     )}
//                   />
//                 </svg>
//                 <Button
//                   variant="secondary"
//                   className="hidden md:inline-flex items-center"
//                 >
//                   Log In
//                 </Button>
//                 <Button
//                   variant="primary"
//                   className="hidden md:inline-flex items-center"
//                 >
//                   Sign Up
//                 </Button>
//               </div>
//             </div>

//             {/* Mobile Nav */}
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.div
//                   initial={{ height: 0 }}
//                   animate={{ height: "auto" }}
//                   exit={{ height: 0 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="flex flex-col items-center gap-4 py-4 text-white">
//                     {navLinks.map((link) => (
//                       <a
//                         href={link.href}
//                         key={link.label}
//                         className="hover:text-brand-green transition"
//                       >
//                         {link.label}
//                       </a>
//                     ))}
//                     <Button variant="secondary">Log In</Button>
//                     <Button variant="primary">Sign Up</Button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       <div className="pb-[86px] md:pb-[98px] lg:px-[130px]" />
//     </>
//   );
// }
