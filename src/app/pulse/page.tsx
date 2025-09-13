import PulseHero from "@/sections/Heropulse";
import Header from "@/components/mvpblocks/header-2";
import PulseFeatures from "@/sections/Featurespulse";
import HowItWorks from "@/sections/Howitwork";
import PulseIndustries from "@/sections/Industriespulse";
import FooterTorqx from "@/sections/Footerhome";
import PulseCaseStudies from "@/sections/Pulsecasestudies";
import PulseFAQs from "@/sections/Faqspulse";

export default function PulsePage() {
  return ( 
    <>
    <Header variant="pulse"/>
    <PulseHero />
    <PulseFeatures />
    <HowItWorks />
    <PulseIndustries />
    <PulseCaseStudies />
    <PulseFAQs />
    <FooterTorqx variant="pulse"/>
    </>
  );
}




// export default function PulsePage() {
//   return (
//     <>
//       <Header />
//       <PulseHero />
//     </>
//   );
// }
