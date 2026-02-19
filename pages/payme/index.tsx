"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import ComicBackground from "@/components/ComicBackground";

type PricingCardProps = {
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  accent: string; // Color accent for each card
  index: number;
};

const PricingCard = ({
  title,
  price,
  originalPrice,
  description,
  features,
  actionLabel,
  accent,
  index,
}: PricingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="w-full max-w-sm"
  >
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl p-[2px]"
      style={{
        background: `linear-gradient(135deg, ${accent}, rgba(255,215,0,0.6), ${accent})`,
      }}
    >
      {/* Inner card */}
      <div className="flex h-full flex-col rounded-2xl bg-[#0a0a1a] p-6 md:p-8">
        {/* Title */}
        <h3
          className="font-Bangers text-xl tracking-wider md:text-2xl"
          style={{ color: accent, textShadow: `0 0 15px ${accent}40` }}
        >
          {title}
        </h3>

        {/* Price */}
        <div className="my-6 flex items-baseline gap-3">
          {originalPrice && (
            <span className="font-Bangers text-lg tracking-wide text-gray-500 line-through">
              ₹{originalPrice}
            </span>
          )}
          <span
            className="font-Bangers text-4xl tracking-wider md:text-5xl"
            style={{
              background: `linear-gradient(135deg, #ffd700, ${accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₹{price}
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 font-Bangers text-sm tracking-wide text-gray-400 md:text-base">
          {description}
        </p>

        {/* Divider */}
        <div
          className="mb-6 h-[1px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
          }}
        />

        {/* Features */}
        <div className="mb-8 flex flex-1 flex-col gap-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2
                className="h-5 w-5 shrink-0"
                style={{ color: accent }}
              />
              <span className="font-Bangers text-sm tracking-wide text-gray-300">
                {f}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href={`/nocheckout/?amount=${price}&plan=${encodeURIComponent(title)}`}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-xl py-3 font-Bangers text-lg tracking-wider text-black transition-all md:text-xl"
            style={{
              background: `linear-gradient(135deg, ${accent}, #ffd700)`,
              boxShadow: `0 0 20px ${accent}40`,
            }}
          >
            {actionLabel}
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <ComicBackground backgroundColor="#0a0a1a" />
        <p className="relative z-10 font-Bangers text-xl tracking-wider text-yellow-400">
          Loading...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <ComicBackground backgroundColor="#0a0a1a" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-Bangers text-3xl tracking-wider text-yellow-400"
            style={{ textShadow: "0 0 20px rgba(255,215,0,0.3)" }}
          >
            Please Sign In
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 rounded-xl px-8 py-3 font-Bangers text-lg tracking-wider text-black"
            style={{
              background: "linear-gradient(135deg, #ffd700, #ff4444)",
              boxShadow: "0 0 20px rgba(255,215,0,0.3)",
            }}
            onClick={() => signIn()}
          >
            Sign In
          </motion.button>
        </div>
      </div>
    );
  }

  const feature = [
    "Only Participate in one event excluding flagship events",
    "Cultural Night Access",
    "Accomodation",
    "Food Included",
  ];

  const features_nit = ["Participate in all events except flagship events", feature[1], "Culfest T-Shirt included"];
  const feature_all_more = [
    "Participate in all events except flagship events",
    feature[1],
    feature[2],
    feature[3],
  ];

  const plans = [
    {
      title: "Culfest 2026 Standard Plan (Exclusive of Flagship Events)",
      price: session.user.isNITJSR ? 200 : 400,
      originalPrice: session.user.isNITJSR ? 500 : 800,
      description: "Pay for participating in one event only excluding the flagship events",
      features: session.user.isNITJSR ? [feature[0], feature[1], "Culfest T-Shirt not included"] : [feature[0], feature[1]],
      actionLabel: "Get It",
      accent: "#3b82f6", // Blue
    },
    {
      title: "Culfest 2026 Premium Plan (Exclusive of Flagship Events)",
      price: session.user.isNITJSR ? 450 : 1250,
      originalPrice: session.user.isNITJSR ? 1000 : 2500,
      description: "Pay for participating in all the events and cultural night excluding the flagship events",
      features: session.user.isNITJSR ? features_nit : feature_all_more,
      actionLabel: "Get It",
      accent: "#ffd700", // Gold
    },
    {
      title: "Battle Crew Plan (Only for Flagship Events)",
      price: 2850,
      originalPrice: 5000,
      description: "For Battle of Bands / Battle of Dance (Entire Crew)",
      features: ["Whole Crew Access", "Event Entry"],
      actionLabel: "Get It",
      accent: "#ef4444", // Red
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Comic Background */}
      <ComicBackground backgroundColor="#0a0a1a" topRingOffset="8%" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-36 pb-16 md:py-24">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-Bangers text-4xl tracking-wider md:text-6xl"
          style={{
            background: "linear-gradient(135deg, #ffd700, #ff4444, #ffd700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(255,215,0,0.2)",
          }}
        >
          PRICING PLANS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 font-Bangers text-lg tracking-[6px] md:text-xl"
          style={{
            color: "#00e5ff",
            textShadow: "0 0 10px rgba(0,229,255,0.5)",
          }}
        >
          COMIC CON EDITION
        </motion.p>

        {/* Cards Grid */}
        <section className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <PricingCard key={plan.title} {...plan} index={i} />
          ))}
        </section>

        {/* Contact Button */}
        <Link href="/contactus">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-16 rounded-xl border-2 border-yellow-500/50 bg-black/60 px-8 py-3 font-Bangers text-lg tracking-wider text-yellow-400 transition-all hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          >
            Contact Us
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
