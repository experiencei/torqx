'use client';
import { FC, useEffect, useRef } from "react";
import heroImage from "@/assets/images/hero-image.jpg";
import Image from "next/image";
import Button from "@/components/Buttonabt";
import SplitType from "split-type";
import { useAnimate, motion, stagger, useTransform, useScroll } from "motion/react";

const Hero: FC = () => {
  const [titleScope, titleAnimate] = useAnimate();
  const scrollingDiv = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollingDiv,
    offset: ["start end", "end end"],
  });

  const portraitWith = useTransform(scrollYProgress, [0, 1], ["100%", "240%"]);

  useEffect(() => {
    if (!titleScope.current) return;

    const split = new SplitType(titleScope.current, {
      types: "lines,words",
      tagName: "span",
    });

    if (split.words && split.words.length > 0) {
      titleAnimate(
        split.words,
        { transform: "translateY(0)", opacity: 1 },
        { duration: 0.5, delay: stagger(0.2) }
      );
    }
  }, [titleScope, titleAnimate]);

  return (
    <section>
      <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
        {/* LEFT CONTENT */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="container !max-w-3xl mx-auto text-center">
            <motion.h1
              ref={scrollingDiv}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold mt-20 md:mt-0"
            >
              Powering the Future of Digital Advertising
            </motion.h1>

            <div className="flex flex-col md:flex-row justify-center md:items-center mt-10 gap-6">
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Button
                  variant="secondary"
                  className="group relative px-6 py-3 rounded-lg font-medium normal-case text-black bg-white hover:bg-black hover:text-white transition-all"
                  iconAfter={
                    <div className="overflow-hidden size-5">
                      <div className="h-5 w-10 flex transition-transform duration-500 group-hover:-translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          className="size-5 stroke-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          className="size-5 stroke-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  }
                >
                  <span>Request a Demo</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="md:col-span-5 relative">
          <motion.div
            className="mt-20 md:mt-0 md:size-full md:absolute md:right-0 max-md:!w-full"
            style={{
              width: portraitWith,
            }}
          >
            <video
                src="https://cxpqdxdbyccviojjtalg.supabase.co/storage/v1/object/public/Torqx%20AI/solution.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
          </motion.div>
        </div>
      </div>
 
      {/* SCROLL REFERENCE DIV */}
      <div className="md:h-[200vh]" ref={scrollingDiv}></div>
    </section>
  );
};

export default Hero;
