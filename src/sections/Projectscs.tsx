"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Plug, Tv, Code } from "lucide-react";

import darkSaasLandingPage from "/assets/Ctv.jpg";
import lightSaasLandingPage from "/assets/griddy.jpg";
import aiStartupLandingPage from "/assets/coding.jpg";
import eiStartupLandingPage from "/assets/productdooh.png";



const howItWorks = [
  {
    icon: Tv,
    title: "Use Your Existing Screens",
    description:
      "Already running TVs in your space? Grid works with Smart TVs (Android, FireOS) or via simple streaming sticks like Chromecast. Just install the Grid Screen Manager and start monetizing instantly.",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/Ctv.jpg",
  },
  {
    icon: Plug,
    title: "Get Grid Hardware",
    description:
      "No screens? No problem. If your venue has foot traffic but no displays, Grid provides plug-and-play hardware. We’ll ship and set you up — transforming your venue into a revenue channel overnight.",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/productdooh.png",
  },
  {
    icon: Code,
    title: "Integrate with Your Systems",
    description:
      "For enterprises and operators with existing signage or CMS, Grid connects seamlessly via API, Lite URL, or VAST tags. Keep your workflow, add new revenue.",
    image: "https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/coding.jpg",
  },
];

export const GridHowItWorks = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
           <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center"
        >
          How It Works:{" "}
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Turn Footfall Into Revenue
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 max-w-3xl mx-auto text-center text-lg text-gray-300 leading-relaxed"
        >
          With Grid, you don’t need expensive new screens or complex setups. Whether you already
          own displays, run a high-footfall venue, or prefer API-level integration — Grid gives you
          everything you need to start earning from your space.
        </motion.p>


        <div className="md:mt-20 flex flex-col mt-10 gap-16">

          {howItWorks.map((item, index) => (
            <Card
              key={item.title}
              className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg px-6 md:px-8 pt-8 md:pt-10 pb-6 md:pb-10 sticky"
              style={{
                top: `calc(64px + ${index * 40}px)`,
              }}
            > 

              <div className="lg:grid lg:grid-cols-2 lg:gap-16 ">
                {/* LEFT TEXT CONTENT */}
                <div className="lg:p-16">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-400">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-3 text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* RIGHT IMAGE (kept in original absolute position) */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-xl"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Plug, Tv, Code } from "lucide-react";

// import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
// import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
// import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";

// const howItWorks = [
//   {
//     icon: Tv,
//     title: "Use Your Existing Screens",
//     description:
//       "Already running TVs in your space? Grid works with Smart TVs (Android, FireOS) or via simple streaming sticks like Chromecast. Just install the Grid Screen Manager and start monetizing instantly.",
//     image: darkSaasLandingPage,
//   },
//   {
//     icon: Plug,
//     title: "Get Grid Hardware",
//     description:
//       "No screens? No problem. If your venue has foot traffic but no displays, Grid provides plug-and-play hardware. We’ll ship and set you up — transforming your venue into a revenue channel overnight.",
//     image: lightSaasLandingPage,
//   },
//   {
//     icon: Code,
//     title: "Integrate with Your Systems",
//     description:
//       "For enterprises and operators with existing signage or CMS, Grid connects seamlessly via API, Lite URL, or VAST tags. Keep your workflow, add new revenue.",
//     image: aiStartupLandingPage,
//   },
// ];

// export const GridHowItWorks = () => {
//   return (
//     <section className="py-20 bg-black text-white">
//       <div className="container mx-auto px-4">
//         {/* Custom Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center"
//         >
//           How It Works:{" "}
//           <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//             Turn Footfall Into Revenue
//           </span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="mt-6 max-w-3xl mx-auto text-center text-lg text-gray-300 leading-relaxed"
//         >
//           With Grid, you don’t need expensive new screens or complex setups. Whether you already
//           own displays, run a high-footfall venue, or prefer API-level integration — Grid gives you
//           everything you need to start earning from your space.
//         </motion.p>

//         {/* Sticky Cards */}
//         <div className="md:mt-20 flex flex-col mt-10 gap-16">
//           {howItWorks.map((item, index) => (
//             <div
//               key={item.title}
//               className="bg-zinc-900/40 border border-white/10 rounded-2xl shadow-lg px-6 md:px-8 pt-8 md:pt-10 pb-6 md:pb-10 sticky"
//               style={{
//                 top: `calc(64px + ${index * 40}px)`,
//               }}
//             >
//               <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
//                 {/* LEFT TEXT CONTENT */}
//                 <div className="lg:p-8">
//                   <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-400">
//                     <item.icon className="h-5 w-5" />
//                     <span>{item.title}</span>
//                   </div>

//                   <h3 className="text-2xl md:text-3xl font-bold mt-3 text-white">
//                     {item.title}
//                   </h3>

//                   <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>

//                 {/* RIGHT IMAGE */}
//                 <div className="relative mt-6 lg:mt-0">
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     className="rounded-xl shadow-lg w-full object-cover lg:absolute lg:h-full lg:w-auto lg:max-w-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };