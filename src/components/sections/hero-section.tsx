import { motion } from "motion/react";
import { hero } from "@/data";
import { Button } from "@/components/ui";
import { EASE } from "@/components/motion";

const WaIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.05 21.5h-.04a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1 14.6-11.62 9.34 9.34 0 0 1 2.75 6.66 9.42 9.42 0 0 1-9.4 9.4zM20.06 3.9A11.34 11.34 0 0 0 2.2 17.58L.5 23.75l6.33-1.66a11.32 11.32 0 0 0 5.22 1.33h.01a11.35 11.35 0 0 0 8-19.52z" />
  </svg>
);

const beat = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-900 flex items-center min-h-[clamp(520px,42vw,720px)]"
    >
      {/* Background video */}
      <video
        src={hero.bgVideo}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.9)" }}
        autoPlay
        muted
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/50 from-10% via-brand-900/50 via-25% to-transparent to-85%" />

      {/* Content */}
      <div className="relative w-full px-5 sm:px-8 md:px-12 pt-16 pb-14 md:pt-24 md:pb-[104px] max-w-[640px]">
        {/* Beat 1 — eyebrow */}
        <motion.div {...beat(0)}>
          <div className="font-mono text-xs font-medium tracking-[.14em] uppercase flex items-center gap-2 text-brand-300">
            <span className="w-[22px] h-px bg-brand-400" />
            {hero.eyebrow}
          </div>
        </motion.div>

        {/* Beat 2 — headline */}
        <motion.h1
          {...beat(0.12)}
          className="font-sans font-bold text-white"
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

        {/* Beat 3 — subline */}
        <motion.p
          {...beat(0.26)}
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

        {/* Beat 4 — CTAs */}
        <motion.div
          {...beat(0.4)}
          className="flex flex-col sm:flex-row gap-3 mt-9"
        >
          <Button variant="accent" size="lg" href={hero.ctaPrimary.href}>
            {hero.ctaPrimary.label}
          </Button>
          <Button
            variant="whatsapp"
            size="lg"
            href={hero.ctaWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WaIcon />}
          >
            {hero.ctaWhatsApp.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
