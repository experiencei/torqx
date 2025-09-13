'use client';
import { useRef } from "react";
import Image from "next/image";
import productImage from "@/assets/product-image.png";
import tubeImage from "@/assets/tube.png";
import pyramidImage from "@/assets/pyramid.png";
import { motion , useScroll , useTransform} from "framer-motion";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  // const appImage = useRef<HTMLImageElement>(null);
 

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end" , "end start"],

});


  const rotateX = useTransform(scrollYProgress , [0 , 1] , [15, 0]); 
  const opacity = useTransform(scrollYProgress , [0 , 1] , [.5, 1]); 
  const translateY = useTransform(scrollYProgress , [0 , 1] , [150, -150]); 

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip">
      <div className="container">
        <div className="section-heading">
            <div className="flex justify-center">
              <div className="tag">Boost your productivity</div>
            </div>
            <h2 className="section-title mt-5 ">A more effective way to track progress</h2>
            <p className="section-description mt-5 ">
              Effortlessly turn your ideas into a fully functional, responsible , Saas website in just minutes with this template.
            </p>
        </div>
        <div className="relative">
        <motion.div
            style={{
              opacity: opacity,
              rotateX: rotateX,
              transformPerspective: "800px",
            }}
          >
          <Image src={productImage} alt="Product Image" className="mt-10" ref={sectionRef}/>
          </motion.div>
          <motion.img src={pyramidImage.src} alt="Pyramid Image" height={262} width={262} className="hidden md:block absolute -right-36 -top-32 " style={{
                      translateY,
                    }}/>
          <motion.img src={tubeImage.src} alt="Tube Image" height={248}  width={248} className="hidden md:block absolute bottom-24 -left-36" style={{
                      translateY,
                    }}/>
        </div>
      </div>

    </section>
  );
};
