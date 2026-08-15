"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import {
  Shield, Heart, Stethoscope,
  FlaskConical, ScanLine, Wind, Pill, Droplets, Siren, Sparkles,
} from "lucide-react";
import { services } from "@/data/services";
import { useEffect, useState } from "react";

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

const ORBIT_X = 230;
const ORBIT_Y = 80;
const ORBIT_PERIOD = 22; // seconds per full revolution

type CardProps = {
  card: (typeof floatingCards)[number];
  baseAngle: number;
  rotation: MotionValue<number>;
};

function FloatingCard({ card, baseAngle, rotation }: CardProps) {
  const x = useTransform(rotation, (r) => Math.cos(baseAngle + r) * ORBIT_X);
  const y = useTransform(rotation, (r) => Math.sin(baseAngle + r) * ORBIT_Y);
  const depth = useTransform(rotation, (r) => Math.sin(baseAngle + r));
  const scale = useTransform(depth, [-1, 1], [0.55, 1.1]);
  const opacity = useTransform(depth, [-1, 1], [0.2, 1.0]);
  const zIndex = useTransform(depth, (d) => Math.round(50 + d * 49));

  const filter = useTransform(
    depth,
    (d) => `brightness(${(0.52 + (d + 1) * 0.32).toFixed(3)})`
  );

  const boxShadow = useTransform(depth, (d) => {
    const t = Math.max(0, d);
    return [
      `0 4px ${(t * 32).toFixed(0)}px rgba(59,130,246,${(t * 0.45).toFixed(3)})`,
      `0 0 ${(t * 16).toFixed(0)}px rgba(16,185,129,${(t * 0.28).toFixed(3)})`,
    ].join(", ");
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 + card.index * 0.07, duration: 0.7 }}
      style={{ position: "absolute", left: "50%", top: "50%", zIndex }}
    >
      <motion.div style={{ x, y }}>
        <motion.div
          style={{
            translateX: "-50%",
            translateY: "-50%",
            scale,
          }}
        >
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

export default function HeroOrbital() {
  const rotation = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsDesktop = () => window.innerWidth >= 1024;
    const initialIsDesktop = checkIsDesktop();
    setIsDesktop(initialIsDesktop);

    let controls: any = null;
    if (initialIsDesktop) {
      controls = animate(rotation, Math.PI * 2, {
        duration: ORBIT_PERIOD,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      });
    }

    const handleResize = () => {
      const currentIsDesktop = checkIsDesktop();
      setIsDesktop(currentIsDesktop);
      if (currentIsDesktop) {
        if (!controls) {
          controls = animate(rotation, Math.PI * 2, {
            duration: ORBIT_PERIOD,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          });
        }
      } else {
        if (controls) {
          controls.stop();
          controls = null;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (controls) controls.stop();
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCards = floatingCards.length;

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <div className="absolute inset-[15%] rounded-full bg-primary-500/10 dark:bg-primary-400/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-[30%] rounded-full bg-emerald-500/10 dark:bg-emerald-400/5 blur-2xl pointer-events-none" />

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

      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          width: `${ORBIT_X * 2}px`,
          height: `${ORBIT_Y * 2}px`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(148,163,184,0.18)",
          boxShadow: "0 0 14px rgba(59,130,246,0.07)",
        }}
      />

      <div className="absolute inset-[35%] rounded-full border border-primary-200/20 dark:border-primary-800/25 pointer-events-none" />

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 50 }}
      >
        <div className="relative w-32 h-32 rounded-full bg-white dark:bg-surface-dark-dim flex items-center justify-center shadow-2xl border border-primary-100 dark:border-border-dark p-4 overflow-hidden">
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
            src="/praxen-jerumed.webp"
            alt="Praxen Jerumed"
            width={140}
            height={140}
            sizes="140px"
            className="w-full h-full object-contain relative z-10"
            priority
          />
        </div>
      </div>

      {mounted && isDesktop && floatingCards.map((card, i) => (
        <FloatingCard
          key={card.name}
          card={card}
          baseAngle={(i / totalCards) * Math.PI * 2 - Math.PI / 2}
          rotation={rotation}
        />
      ))}
    </div>
  );
}
