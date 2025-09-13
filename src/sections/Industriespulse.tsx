import {
  Building2,
  Stethoscope,
  Clapperboard,
  Utensils,
  ShoppingBag,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  position?: "left" | "right";
  cornerStyle?: string;
};

const leftFeatures: FeatureItem[] = [
  {
    icon: Building2,
    title: "Education",
    description:
      "Inform and engage students with dynamic updates, campus news, and real-time announcements. Transform hallways, libraries, and auditoriums into connected learning spaces.",
    position: "left",
    cornerStyle: "sm:translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description:
      "Care for patients in a concise, effective way. Share health tips, appointment reminders, and emergency alerts across hospitals and clinics, reducing wait-time stress and improving trust.",
    position: "left",
    cornerStyle: "sm:-translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: Clapperboard,
    title: "Entertainment",
    description:
      "Promote shows, movies, and events with stunning visuals that captivate audiences. From cinemas to concert halls, Pulse ensures every seat is filled.",
    position: "left",
    cornerStyle: "sm:translate-x-4 sm:rounded-tr-[2px]",
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: Utensils,
    title: "Restaurants",
    description:
      "Serve up menu specials and deals with delight. Highlight chef’s picks, new dishes, or QR-based table ordering to boost sales and enhance dining experiences.",
    position: "right",
    cornerStyle: "sm:-translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description:
      "Drive in-store sales with real-time promotions. Guide shoppers with interactive wayfinding, seasonal campaigns, and instant offers that increase cart value.",
    position: "right",
    cornerStyle: "sm:translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: Building2,
    title: "Corporate & Workspaces",
    description:
      "Keep employees informed and inspired. Share company updates, KPIs, wellness initiatives, and recognition in lobbies, co-working spaces, and offices.",
    position: "right",
    cornerStyle: "sm:-translate-x-4 sm:rounded-tl-[2px]",
  },
];

const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;

  return (
    <div>
      <div
        className={cn(
          "relative rounded-2xl px-4 pt-4 pb-4 text-sm",
          "bg-zinc-900/70 ring-1 ring-zinc-800",
          feature.cornerStyle
        )}
      >
        <div className="text-emerald-400 mb-3 text-[2rem]">
          <Icon />
        </div>
        <h2 className="text-white mb-2.5 text-2xl font-semibold">
          {feature.title}
        </h2>
        <p className="text-zinc-400 text-base text-pretty">
          {feature.description}
        </p>
        {/* Decorative elements */}
        <span className="from-emerald-400/0 via-emerald-400 to-emerald-400/0 absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,rgba(16,185,129,0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </div>
  );
};

export default function PulseIndustries() {
  return (
    <section className="bg-black pt-20 pb-8" id="industries">
      <div className="mx-6 max-w-[1120px] pt-2 pb-16 max-[300px]:mx-4 min-[1150px]:mx-auto">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={`left-feature-${index}`} feature={feature} />
            ))}
          </div>

          {/* Center column */}
          <div className="order-[1] mb-6 self-center sm:order-[0] md:mb-0">
            <div className="bg-zinc-900 text-white ring-1 ring-zinc-800 relative mx-auto mb-4.5 w-fit rounded-full px-4 py-2 text-sm">
              <span className="relative z-1 flex items-center gap-2">
                Across Industries
              </span>
              <span className="from-emerald-400/0 via-emerald-400 to-emerald-400/0 absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r"></span>
            </div>
            <h2 className="text-white mb-2 text-center text-2xl font-bold sm:mb-2.5 md:text-[2rem]">
              Pulse Delivers Everywhere
            </h2>
            <p className="text-zinc-400 mx-auto max-w-[20rem] text-center text-pretty">
              Whether it’s classrooms, clinics, retail shops, or restaurants —
              Pulse transforms how industries connect, engage, and grow.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={`right-feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
