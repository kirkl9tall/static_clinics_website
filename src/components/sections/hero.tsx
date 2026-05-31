"use client";

import { Link } from "@/navigation";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import {
  ArrowRight, Building2, Shield, Heart, Stethoscope,
  FlaskConical, ScanLine, Wind, Pill, Droplets, Siren, Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ComponentType<any>> = {
  Stethoscope, Heart, FlaskConical, Shield, ScanLine, Wind, Pill, Droplets, Siren, Sparkles,
};

const colorPalette = [
  "bg-primary-500", "bg-rose-500", "bg-emerald-500", "bg-violet-500",
  "bg-blue-500", "bg-amber-500", "bg-cyan-500", "bg-pink-500",
  "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-fuchsia-500",
];

const floatingCards = services.map((service, index) => ({
  name: service.name,
  icon: iconMap[service.icon] || Stethoscope,
  color: colorPalette[index % colorPalette.length],
  index,
}));

// ORBIT_Y / ORBIT_X ≈ 0.35 gives the tilted-disc / "vertical ring" perspective look.
const ORBIT_X = 230;
const ORBIT_Y = 80;
const ORBIT_PERIOD = 22; // seconds per full revolution

type CardProps = {
  card: (typeof floatingCards)[number];
  baseAngle: number;
  rotation: MotionValue<number>;
};

function FloatingCard({ card, baseAngle, rotation }: CardProps) {
  // --- position on the 3D elliptical orbit ---
  const x = useTransform(rotation, (r) => Math.cos(baseAngle + r) * ORBIT_X);
  const y = useTransform(rotation, (r) => Math.sin(baseAngle + r) * ORBIT_Y);

  // depth: +1 = nearest (bottom arc), −1 = farthest (top arc)
  const depth = useTransform(rotation, (r) => Math.sin(baseAngle + r));

  // --- depth-driven lighting ---
  const scale   = useTransform(depth, [-1, 1], [0.55, 1.1]);
  const opacity = useTransform(depth, [-1, 1], [0.2,  1.0]);
  const zIndex  = useTransform(depth, (d) => Math.round(50 + d * 49));

  // Directional brightness: front faces the light, back falls into shadow
  const filter = useTransform(
    depth,
    (d) => `brightness(${(0.52 + (d + 1) * 0.32).toFixed(3)})`
  );

  // Glow only on front-facing cards (blue key light + teal fill)
  const boxShadow = useTransform(depth, (d) => {
    const t = Math.max(0, d);
    return [
      `0 4px ${(t * 32).toFixed(0)}px rgba(59,130,246,${(t * 0.45).toFixed(3)})`,
      `0 0 ${(t * 16).toFixed(0)}px rgba(16,185,129,${(t * 0.28).toFixed(3)})`,
    ].join(", ");
  });

  return (
    // Level 1 — positioned at container centre; handles entrance + zIndex
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 + card.index * 0.07, duration: 0.7 }}
      style={{ position: "absolute", left: "50%", top: "50%", zIndex }}
    >
      {/* Level 2 — orbital offset (x, y from centre) */}
      <motion.div style={{ x, y }}>
        {/* Level 3 — centre the card on its orbital point + depth scale */}
        <motion.div
          style={{
            translateX: "-50%",
            translateY: "-50%",
            scale,
          }}
        >
          {/* Level 4 — depth opacity, glow, brightness */}
          <motion.div
            style={{ opacity, boxShadow, filter }}
            className="bg-white dark:bg-surface-dark-dim rounded-2xl px-4 py-3 border border-primary-200 dark:border-border-dark flex items-center gap-3 min-w-max"
          >
            <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-text-primary dark:text-text-dark-primary whitespace-nowrap">
              {card.name}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");

  // One shared rotation motion value — all cards derive position from it, zero re-renders.
  const rotation = useMotionValue(0);
  // Only render the orbital cards after hydration — framer-motion computes
  // floating-point transforms differently on server vs client, causing a mismatch.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Animate 0 → 2π and loop forever. sin/cos are periodic so the loop is seamless.
    const controls = animate(rotation, Math.PI * 2, {
      duration: ORBIT_PERIOD,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCards = floatingCards.length;

  return (
    <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-200/20 to-emerald-200/20 dark:from-primary-800/10 dark:to-emerald-800/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-700/50 rounded-full mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                {t("badge")}
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary leading-[1.1] mb-6">
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-8 max-w-xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/clinics"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white gradient-primary rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Building2 className="w-5 h-5" />
                {t("ctaSecondary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              {["FMH Certified", "Swiss Quality", "5 Locations"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual — 3D orbiting ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">

              {/* Ambient depth glow pools */}
              <div className="absolute inset-[15%] rounded-full bg-primary-500/10 dark:bg-primary-400/5 blur-3xl pointer-events-none" />
              <div className="absolute inset-[30%] rounded-full bg-emerald-500/10 dark:bg-emerald-400/5 blur-2xl pointer-events-none" />

              {/* Rotating conic gradient — light sweeping the disc plane */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(59,130,246,0.07) 20%, rgba(16,185,129,0.10) 40%, rgba(99,102,241,0.07) 60%, transparent 80%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Elliptical orbit track — visually matches the card path */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  width:  `${ORBIT_X * 2}px`,
                  height: `${ORBIT_Y * 2}px`,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  border: "1px solid rgba(148,163,184,0.18)",
                  boxShadow: "0 0 14px rgba(59,130,246,0.07)",
                }}
              />

              {/* Inner decorative ring */}
              <div className="absolute inset-[35%] rounded-full border border-primary-200/20 dark:border-primary-800/25 pointer-events-none" />

              {/* Centre logo — zIndex 50 so back-half cards go under, front-half go over */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 50 }}
              >
                <div className="relative w-32 h-32 rounded-full bg-white dark:bg-surface-dark-dim flex items-center justify-center shadow-2xl border border-primary-100 dark:border-border-dark p-4 overflow-hidden">
                  {/* Rotating light sheen on the logo disc */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 65%, rgba(255,255,255,0.2) 80%, rgba(59,130,246,0.1) 88%, transparent 100%)",
                    }}
                  />
                  <Image
                    src="/praxen-jerumed.png"
                    alt="Praxen Jerumed – Ihr Gesundheitsnetzwerk in der Schweiz"
                    width={140}
                    height={140}
                    className="w-full h-full object-contain relative z-10"
                    priority
                  />
                </div>
              </div>

              {/* Orbiting service cards — client-only to avoid SSR/hydration float mismatch */}
              {mounted && floatingCards.map((card, i) => (
                <FloatingCard
                  key={card.name}
                  card={card}
                  baseAngle={(i / totalCards) * Math.PI * 2 - Math.PI / 2}
                  rotation={rotation}
                />
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
