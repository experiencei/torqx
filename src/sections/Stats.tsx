"use client";

import CountUp from "react-countup";

const stats = [
  {
    num: 3,
    suffix: "+",
    text: "Cities",
  },
  {
    num: 100,
    suffix: "K+",
    text: "Views",
  },
  {
    num: 12,
    suffix: "K",
    text: "Displays",
  },
  // {
  //   num: 860,
  //   suffix: "+",
  //   text: "Digital High Resolution Displays",
  // },
  {
    num: 32,
    suffix: "K+",
    text: "Brands",
  },
];

const Stats = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
            Backed by Proven Scale
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Torqx AI powers campaigns across cities, brands, and screens with
            unmatched reliability and performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-semibold text-black">
                <CountUp
                  end={item.num}
                  duration={3}
                  delay={0.5}
                  separator=","
                />
                {item.suffix}
              </span>
              <p className="mt-2 text-sm md:text-base font-medium text-gray-700 max-w-[150px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
