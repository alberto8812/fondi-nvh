import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { hero } from "@/data";
import { Button } from "@/components/ui";
import { EASE } from "@/components/motion";

const beat = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked (e.g. WhatsApp in-app browser, iOS Low Power Mode, Android Data Saver).
      // Fall back to a plain <img> so no native tap-to-play affordance shows up.
      setAutoplayBlocked(true);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-900 flex items-center min-h-[clamp(520px,42vw,720px)]"
    >
      {/* Background video */}
      {autoplayBlocked ? (
        <img
          src="/images/hero-bg-poster.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover lg:object-[50%_25%]"
          style={{ filter: "saturate(0.9)" }}
        />
      ) : (
        <video
          ref={videoRef}
          src={hero.bgVideo}
          poster="/images/hero-bg-poster.jpg"
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover lg:object-[50%_25%]"
          style={{ filter: "saturate(0.9)" }}
          autoPlay
          muted
          playsInline
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/50 from-10% via-brand-900/50 via-25% to-transparent to-85% pointer-events-none" />

      {/* Content */}
      <div className="relative w-full px-5 sm:px-8 md:px-12 pt-16 pb-14 md:pt-24 md:pb-[104px] max-w-[640px]">
        {/* Beat 1 — eyebrow (reserves its space now, reveals at 4s) */}
        <motion.div {...beat(0.7)}>
          <div className="font-mono text-xs font-medium tracking-[.14em] uppercase flex items-center gap-2 text-brand-300">
            <span className="w-[22px] h-px bg-brand-400" />
            {hero.eyebrow}
          </div>
        </motion.div>

        {/* Beat 1 — headline (immediate) */}
        <motion.h1
          {...beat(0)}
          className="font-sans font-bold text-on-brand"
          style={{
            fontSize: "clamp(34px, 9vw, 56px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            textWrap: "balance",
            margin: "22px 0 0",
          }}
        >
          {hero.headline}{" "}
          <span className="font-serif italic font-normal text-brand-300">
            {hero.headlineItalic}
          </span>
        </motion.h1>

        {/* Beat 3 — subline + CTAs (when video ends, ~7.8s) */}
        <motion.p
          {...beat(0.5)}
          className="font-serif text-brand-200"
          style={{
            fontSize: "clamp(17px, 4.5vw, 21px)",
            lineHeight: 1.5,
            maxWidth: "480px",
            margin: "24px 0 0",
            textWrap: "pretty",
          }}
        >
          {hero.subline}
        </motion.p>

        {/* Beat 4 — CTA (with subline, video-end) */}
        <motion.div
          {...beat(0.5)}
          className="flex flex-col sm:flex-row gap-3 mt-9"
        >
          <Button variant="solid" size="lg" href={hero.ctaPrimary.href}>
            {hero.ctaPrimary.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
