'use client';

import Image from "next/image";



import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-10 bg-white">
      <div className="container mx-auto">
        {/* Section Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-lg font-medium text-black"
        >
          Trusted by <span className="font-semibold text-black">1000+ businesses</span>
        </motion.p>

        {/* Logos */}
        <div className="mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
<div className="flex items-center justify-center rounded-lg bg-white p-2">

          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/uber.png" alt="Uber Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/unilever.png" alt="Unilever Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/spotify.png" alt="Spotify Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/qatar.png" alt="Qatar Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/sporty.png" alt="Sporty Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/pepsi.png" alt="Pepsi Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/nivea.png" alt="Nivea Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/netflix.png" alt="Netflix Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/nestle.png" alt="Nestle Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/mtn.png" alt="MTN Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/monster.png" alt="Monster Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/lg.png" alt="LG Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/indrive.png" alt="Indrive Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/heineken.png" alt="Heineken Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/colgate.png" alt="Colgate Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/glovo.png" alt="Glovo Logo" />

             {/* second loop */}
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/uber.png" alt="Uber Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/unilever.png" alt="Unilever Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/spotify.png" alt="Spotify Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/qatar.png" alt="Qatar Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/sporty.png" alt="Sporty Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/pepsi.png" alt="Pepsi Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/nivea.png" alt="Nivea Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/netflix.png" alt="Netflix Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/nestle.png" alt="Nestle Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/mtn.png" alt="MTN Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/monster.png" alt="Monster Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/lg.png" alt="LG Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/indrive.png" alt="Indrive Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/heineken.png" alt="Heineken Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/colgate.png" alt="Colgate Logo" />
            <img className="logo-ticker-image" src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/glovo.png" alt="Glovo Logo" />
          </motion.div>
</div>

        </div>
      </div>
    </div>
  );
};


// 'use client';

// import Image from "next/image";
// import acmeLogo from "@/assets/logo-acme.png";
// import quantumLogo from "@/assets/logo-quantum.png";
// import echoLogo from "@/assets/logo-echo.png";
// import celestialLogo from "@/assets/logo-celestial.png";
// import pulseLogo from "@/assets/logo-pulse.png";
// import apexLogo from "@/assets/logo-apex.png";
// import { motion } from "framer-motion";

// export const LogoTicker = () => {
//   return (
//     <div className="py-8 md:py-10 bg-black">
//       <div className="container mx-auto">
//         {/* Section Heading */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="text-center text-lg font-medium text-white"
//         >
//           Trusted by <span className="font-semibold text-white">1000+ businesses</span>
//         </motion.p>

//         {/* Logos */}

//         <div className="mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white,transparent)]">
//           <motion.div
//             className="flex gap-14 flex-none pr-14"
//             animate={{ translateX: "-50%" }}
//             transition={{
//               duration: 20,
//               ease: "linear",
//               repeat: Infinity,
//               repeatType: "loop",
//             }}
//           >
//      {/* <div className="flex items-center justify-center rounded-lg bg-white p-2"> */}

//             <Image className="logo-ticker-image" src={acmeLogo} alt="Acme Logo" />
//             {/* </div> */}
//             <Image className="logo-ticker-image" src={quantumLogo} alt="Quantum Logo" />
//             <Image className="logo-ticker-image" src={echoLogo} alt="Echo Logo" />
//             <Image className="logo-ticker-image" src={celestialLogo} alt="Celestial Logo" />
//             <Image className="logo-ticker-image" src={pulseLogo} alt="Pulse Logo" />
//             <Image className="logo-ticker-image" src={apexLogo} alt="Apex Logo" />

//             {/* second loop */}
//             <Image className="logo-ticker-image" src={acmeLogo} alt="Acme Logo" />
//             <Image className="logo-ticker-image" src={quantumLogo} alt="Quantum Logo" />
//             <Image className="logo-ticker-image" src={echoLogo} alt="Echo Logo" />
//             <Image className="logo-ticker-image" src={celestialLogo} alt="Celestial Logo" />
//             <Image className="logo-ticker-image" src={pulseLogo} alt="Pulse Logo" />
//             <Image className="logo-ticker-image" src={apexLogo} alt="Apex Logo" />
     
          
//           </motion.div>
//         </div>
//         </div>
//     </div>
//   );
// };
