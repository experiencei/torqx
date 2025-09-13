'use client';

import { FC, useEffect } from "react";
import { useInView, useAnimate, stagger } from "motion/react";
import SplitType from "split-type";

const Intro: FC = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(() => {
    if (!scope.current) return;

    const split = new SplitType(scope.current.querySelector("h2"), {
      types: "lines,words",
      tagName: "span",
    });

    // 👇 Initial state (hidden downwards)
    split.words?.forEach((word) => {
      (word as HTMLElement).style.transform = "translateY(100%)";
      (word as HTMLElement).style.display = "inline-block";
    });
  }, [scope]);

  useEffect(() => {
    if (inView && scope.current) {
      animate(
        scope.current.querySelectorAll(".word"),
        { transform: "translateY(0%)" },
        {
          duration: 0.6,
          delay: stagger(0.1),
          ease: "easeOut",
        }
      );
    }
  }, [inView, animate, scope]);

  return (
    <section className="section mt-16 lg:mt-24" ref={scope}>
      <div className="container">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight lg:w-[85%]">
          Power your growth with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            smarter solutions
          </span>{" "}
          — we blend clean code, thoughtful design, and real innovation to help
          your business scale faster.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl">
          From seamless integrations to future-ready experiences, our platform
          gives you everything you need to stay ahead — so you can focus on
          growth while we handle the tech.
        </p>
      </div>
    </section>
  );
};

export default Intro;
