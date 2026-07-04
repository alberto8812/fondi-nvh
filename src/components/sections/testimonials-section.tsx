import { motion } from 'motion/react'
import { testimonials } from '@/data'
import { fadeUp, staggerContainer, staggerItem } from '@/components/motion'

const VP = { once: true, amount: 0.2 } as const

export function TestimonialsSection() {
  return (
    <section className="bg-white" style={{ padding: '76px 48px' }}>
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}>
        <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400">
          Testimonios
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
          <span className="font-serif italic font-medium">Historias reales</span> de personas a las que apoyamos.
        </h2>
      </motion.div>

      {/* Cards — stagger */}
      <motion.div
        className="grid grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.n}
            variants={staggerItem}
            className="fondi-card bg-white border border-neutral-200"
            style={{
              borderRadius: '10px',
              padding: '30px',
            }}
          >
            <div className="flex justify-between items-start">
              <div className="text-status-amber" style={{ fontSize: '14px', letterSpacing: '3px' }}>
                ★★★★★
              </div>
              <div
                className="font-serif text-brand-300"
                style={{ fontSize: '58px', lineHeight: 0.55 }}
              >
                "
              </div>
            </div>

            <p
              className="font-serif text-brand-900"
              style={{
                fontSize: '17px',
                lineHeight: 1.55,
                margin: '16px 0 20px',
                textWrap: 'pretty',
              }}
            >
              {t.q}
            </p>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full font-semibold text-[15px] bg-brand-200 text-brand-800"
                style={{
                  width: '38px',
                  height: '38px',
                }}
              >
                {t.i}
              </div>
              <div className="text-sm font-semibold text-neutral-700">
                {t.n}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
