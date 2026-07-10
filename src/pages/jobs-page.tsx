import { motion } from 'motion/react'
import { jobs } from '@/data'
import { Icon, Button } from '@/components/ui'
import { fadeUp, staggerContainer, staggerItem } from '@/components/motion'
import { openFondiChat } from '@/lib/chat-bridge'

const VP = { once: true, amount: 0.2 } as const

export function JobsPage() {
  return (
    <main>
      <section
        id="careers"
        className="bg-neutral-100 border-t border-neutral-200 px-5 sm:px-8 md:px-12 pt-[calc(70px+56px)] md:pt-[calc(70px+76px)] pb-14 md:pb-[76px]"
      >
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}>
          <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400">
            Trabajá con nosotros
          </div>
          <h1
            className="font-sans font-semibold mt-[14px] text-brand-900"
            style={{
              fontSize: 'clamp(26px, 6vw, 34px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              maxWidth: '520px',
              textWrap: 'balance',
              marginBottom: '44px',
            }}
          >
            Construí tu <span className="font-serif italic font-medium">carrera</span> en Fondi.
          </h1>
        </motion.div>

        {jobs.length === 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="fondi-card bg-white border border-neutral-200 p-8 md:p-10 text-center"
            style={{ borderRadius: '10px' }}
          >
            <p className="text-[15px] leading-[1.55] m-0 mb-6 text-neutral-600">
              Por el momento no tenemos vacantes abiertas, pero nos encantaría conocerte.
              Escribinos y te contactamos cuando surja una oportunidad para vos.
            </p>
            <Button variant="primary" onClick={() => openFondiChat()}>
              Contactanos
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="fondi-card flex flex-col gap-4 bg-white border border-neutral-200 p-6 md:p-[30px]"
                style={{ borderRadius: '10px' }}
              >
                <div className="flex gap-5 items-start">
                  <div
                    className="flex items-center justify-center flex-shrink-0 bg-brand-900 text-brand-300"
                    style={{ width: '44px', height: '44px', borderRadius: '9px' }}
                  >
                    <Icon name="briefcase" size={22} />
                  </div>
                  <div>
                    <h3
                      className="font-sans font-semibold text-brand-900"
                      style={{ fontSize: '19px', margin: '2px 0 8px' }}
                    >
                      {job.title}
                    </h3>
                    <p className="text-[13px] font-medium text-neutral-500 m-0">
                      {job.modality} · {job.location}
                    </p>
                  </div>
                </div>
                <p className="text-[15px] leading-[1.55] m-0 text-neutral-600">
                  {job.description}
                </p>
                <Button
                  variant="primary"
                  className="self-start"
                  onClick={() => openFondiChat()}
                >
                  Postularme
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  )
}
