import { motion } from 'motion/react'
import { steps } from '@/data'
import { fadeUp, EASE } from '@/components/motion'

const VP = { once: true, amount: 0.2 } as const

export function StepsSection() {
  return (
    <section id="como-funciona" className="bg-white" style={{ padding: '120px 48px 76px' }}>
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}>
        <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400">
          Cómo funciona
        </div>
        <h2
          className="font-sans font-semibold mt-[14px] text-brand-900"
          style={{
            fontSize: '34px',
            letterSpacing: '-0.02em',
            lineHeight: 1.12,
            maxWidth: '520px',
            textWrap: 'balance',
            marginBottom: '44px',
          }}
        >
          Tres pasos y el dinero está{' '}
          <span className="font-serif italic font-medium">en tu cuenta.</span>
        </h2>
      </motion.div>

      {/* Steps — each child gets its own whileInView + delay; the grid container has overflow:hidden
          so we can't use a staggerContainer wrapper (IntersectionObserver can't observe display:contents) */}
      <div
        className="grid grid-cols-3 border border-neutral-200 bg-white"
        style={{
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {steps.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.09 }}
            viewport={VP}
            className={i < steps.length - 1 ? 'border-r border-neutral-200' : ''}
            style={{
              padding: '34px 30px',
            }}
          >
            <div className="font-mono text-[13px] tracking-[.08em] text-brand-500">
              PASO {p.n}
            </div>
            <h3
              className="font-sans font-semibold text-brand-900"
              style={{ fontSize: '20px', margin: '14px 0 8px' }}
            >
              {p.t}
            </h3>
            <p className="text-[15px] leading-[1.55] m-0 text-neutral-600">
              {p.d}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
