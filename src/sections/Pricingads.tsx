"use client";
import CheckIcon from "@/assets/icons/check-circle.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import Link from "next/link";


const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Manage up to 3 screens",
      "Basic scheduling & playlists",
      "Upload images & videos",
      "Remote updates from dashboard",
      "Community support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 49,
    buttonText: "Contact Now",
    popular: true,
    inverse: true,
    features: [
      "Unlimited screens & campaigns",
      "Advanced scheduling & targeting",
      "Audience & engagement analytics",
      "QR code campaigns & reporting",
      "AI content suggestions",
      "Priority 24/7 support",
      "API & enterprise integrations",
    ],
  },
  {
    title: "CMS Connect",
    monthlyPrice: 0,
    buttonText: "Get started free",
    popular: false,
    inverse: false,
    features: [
      "Integrate with your existing CMS",
      "Lite URL, API, or VAST tag support",
      "Keep your current workflows",
      "Add monetization instantly",
      "Basic reporting & analytics",
    ],
  },
];


export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center">
          <h2 className="section-title text-3xl font-semibold text-black">
            Pricing
          </h2>
          <p className="section-description mt-5 text-gray-600">
            Free forever. Upgrade for advanced targeting, analytics, and
            enterprise features.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            ({ title, monthlyPrice, buttonText, popular, inverse, features }) => (
              <div
                className={twMerge(
                  "card w-full max-w-sm rounded-2xl border p-8 transition-all",
                  inverse
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-black"
                )}
                key={title}
              >
                <div className="flex justify-between items-center">
                  <h3
                    className={twMerge(
                      "text-lg font-bold",
                      inverse ? "text-white/70" : "text-black/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular && (
                    <div className="inline-flex text-sm px-4 py-0.5 rounded-xl border border-white/20">
                      <motion.span
                        animate={{
                          backgroundPositionX: "100%",
                        }}
                        transition={{
                          duration: 20,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                        className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2Ef,#3bFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mt-6">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span
                    className={twMerge(
                      "tracking-tight font-bold",
                      inverse ? "text-white/50" : "text-black/50"
                    )}
                  >
                    /month
                  </span>
                </div>

                {/* Button */}
                <Link
      href="/contact"
      className={twMerge(
        "w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center justify-center",
        inverse
          ? "bg-white text-black hover:bg-black hover:text-white border border-white"
          : "bg-black text-white hover:bg-white hover:text-black border border-black"
      )}
    >
      {buttonText}
    </Link>

                <ul className="flex flex-col gap-4 mt-8">
                  {features.map((feature) => (
                    <li
                      className={twMerge(
                        "text-sm flex items-center gap-3",
                        inverse ? "text-white/80" : "text-gray-700"
                      )}
                      key={feature}
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
