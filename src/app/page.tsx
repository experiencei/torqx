
import Header from "@/components/mvpblocks/header-2";
import GradientHero from "@/components/mvpblocks/gradient-hero";
import Feature from "@/sections/Featuresvid";
import Pills from "@/sections/Pills";
import FeaturesSection from "@/components/mvpblocks/features-grid";
import Stats from "@/sections/Stats";
import { LogoTicker } from "@/sections/LogoTickerads";
import ImpactSection from "@/sections/Hoverexp";
import { TapeSection } from "@/sections/Tapescs";
import { Testimonials } from "@/sections/Testimonialsads";
import Faq2 from "@/sections/Faqshome";
import FooterTorqx from "@/sections/Footerhome";


 
export default function Home() {
  return (
     <>
        <Header variant="default" />
        <GradientHero />
        <LogoTicker />
        <FeaturesSection />
        <Stats />
        <Feature />
        <Pills />
        <ImpactSection />
        <TapeSection />
        <Testimonials />
        <Faq2 />
        <FooterTorqx />
    </>
  );
}


