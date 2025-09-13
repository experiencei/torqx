"use client"

import Header from "@/components/mvpblocks/header-2";
import AppHero from "@/sections/Gridhero";
// import { LogoTicker } from "@/sections/LogoTickerads";
import MasonryGallery from "@/sections/Gallerygrid";
import { GridHowItWorks } from "@/sections/Projectscs";
import { Pricing } from "@/sections/Pricingads";
import FooterTorqx from "@/sections/Footerhome";
import GridFAQ  from "@/sections/Gridfaqs";
import { LogoTicker } from "@/sections/LogoTicker";
 
  
 

export default function PulsePage() {
  return (
    <>
    <Header variant="pulse"/>
    <AppHero />
    <LogoTicker />
    <MasonryGallery />
    {/* <Gridcompare /> */}
    <GridHowItWorks />
    <Pricing />
    <GridFAQ />
    <FooterTorqx variant="pulse"/>
    </>
  );
}
