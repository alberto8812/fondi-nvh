import { motion } from 'motion/react'
import { about } from '@/data'
import { Button } from '@/components/ui'
import { slideInLeft, slideInRight } from '@/components/motion'

const VP = { once: true, amount: 0.25 } as const

export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="grid grid-cols-2 gap-12 items-center bg-brand-900"
      style={{ padding: '76px 48px' }}
    >
      {/* Text — slides from left */}
      <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={VP}>
        <div className="font-mono text-xs tracking-[.14em] uppercase text-brand-300">
          {about.eyebrow}
        </div>
        <h2
          className="font-serif italic font-normal text-white"
          style={{
            fontSize: '38px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
            margin: '14px 0 18px',
          }}
        >
          {about.headline}
        </h2>
        <p
          className="text-base leading-[1.65] text-brand-200"
          style={{ margin: '0 0 24px' }}
        >
          {about.body}
        </p>
        <Button variant="outline" href={about.cta.href}>
          {about.cta.label}
        </Button>
      </motion.div>

      {/* Image — slides from right */}
      <motion.div
        variants={slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="relative rounded-xl overflow-hidden bg-brand-800"
        style={{ minHeight: '340px' }}
      >
        <img
          src={about.image}
          alt="Equipo Fondi"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.88) contrast(1.02)' }}
          loading="lazy"
        />
      </motion.div>
    </section>
  )
}
