import { useState } from 'react'
import { motion } from 'motion/react'
import { jobs } from '@/data'
import { Icon, Button, Badge, Eyebrow, cardClassName, cardStyle } from '@/components/ui'
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/components/motion'
import { openFondiChat } from '@/lib/chat-bridge'
import { formatDate } from '@/lib/format'
import { JobModal } from '@/components/job-modal'
import type { JobOpening } from '@/types/content.types'

const VP = { once: true, amount: 0.2 } as const

const WHY_FONDI = [
  {
    icon: 'education',
    title: 'Crecimiento profesional',
    text: 'Formación continua y un camino claro para crecer dentro del equipo.',
  },
  {
    icon: 'shield',
    title: 'Estabilidad y respaldo',
    text: 'Una empresa establecida, con procesos claros y respaldo real detrás de cada rol.',
  },
  {
    icon: 'handshake',
    title: 'Impacto real',
    text: 'Tu trabajo ayuda todos los días a que más personas accedan al crédito que necesitan.',
  },
]

const EXPECTATIONS = [
  'Actitud comercial',
  'Orientación al servicio',
  'Buena presentación personal',
  'Experiencia en ventas o servicio al cliente',
]

export function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null)
  const activeJobs = jobs.filter((job) => job.active)

  function applyToJob(job: JobOpening) {
    openFondiChat({ mode: 'application', jobTitle: `${job.title} — ${job.location}` })
  }

  return (
    <main>
      <section
        id="careers"
        className="bg-neutral-100 border-t border-neutral-200 px-5 sm:px-8 md:px-12 pt-[calc(70px+56px)] md:pt-[calc(70px+76px)] pb-14 md:pb-[76px]"
      >
        {/* Header — text + photo, two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={VP}>
            <Eyebrow>Únete al equipo Fondi</Eyebrow>
            <h1
              className="font-sans font-semibold mt-[14px] text-brand-900"
              style={{
                fontSize: 'clamp(26px, 6vw, 34px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textWrap: 'balance',
                margin: '14px 0 18px',
              }}
            >
              Únete al equipo <span className="font-serif italic font-medium">Fondi</span>.
            </h1>
            <p className="text-base leading-[1.65] text-neutral-600" style={{ maxWidth: '420px' }}>
              Súmate a una empresa que cada día ayuda a más personas a acceder al respaldo
              financiero que necesitan. Buscamos personas comprometidas, con actitud de servicio y
              ganas de crecer junto a nosotros.
            </p>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="relative rounded-xl overflow-hidden bg-neutral-200 aspect-[4/3] md:aspect-auto md:min-h-[300px]"
          >
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=70"
              alt="Equipo Fondi trabajando"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.88) contrast(1.02)' }}
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Why Fondi — values strip */}
        <motion.div
          className="mt-10 md:mt-14 pt-10 md:pt-12 border-t border-neutral-200"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {WHY_FONDI.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
              >
                <div
                  className="flex items-center justify-center bg-brand-900/[0.08] text-brand-900"
                  style={{ width: '44px', height: '44px', borderRadius: '9px' }}
                >
                  <Icon name={item.icon} size={22} />
                </div>
                <h3
                  className="font-sans font-semibold text-brand-900"
                  style={{ fontSize: '16px', letterSpacing: '-0.01em', margin: '16px 0 6px' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.55] m-0 text-neutral-600"
                  style={{ textWrap: 'pretty' }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* What we expect from you */}
        <motion.div
          className="mt-10 md:mt-14 pt-10 md:pt-12 border-t border-neutral-200"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <Eyebrow className="mb-6">¿Qué esperamos de ti?</Eyebrow>
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {EXPECTATIONS.map((item) => (
              <motion.li
                key={item}
                variants={staggerItem}
                className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
              >
                <div
                  className="flex items-center justify-center bg-brand-900/[0.08] text-brand-900 shrink-0"
                  style={{ width: '32px', height: '32px', borderRadius: '9px' }}
                >
                  <Icon name="badge" size={16} />
                </div>
                <p className="text-[14px] text-neutral-700 m-0">{item}</p>
              </motion.li>
            ))}
          </motion.ul>
          <p className="text-[14px] leading-[1.55] text-neutral-600 mt-5">
            Importante: debes tener tu situación migratoria definida.
          </p>
        </motion.div>

        {/* Open roles */}
        <div className="mt-10 md:mt-14 pt-10 md:pt-12 border-t border-neutral-200">
          <Eyebrow className="mb-6">Búsquedas abiertas</Eyebrow>

          {activeJobs.length === 0 ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className={`${cardClassName()} p-8 md:p-10 text-center`}
              style={cardStyle()}
            >
              <p className="text-[15px] leading-[1.55] m-0 mb-6 text-neutral-600">
                Por el momento no tenemos vacantes abiertas, pero nos encantaría conocerte.
                Escríbenos y te contactamos cuando surja una oportunidad para ti.
              </p>
              <Button
                variant="primary"
                onClick={() => openFondiChat({ mode: 'application', jobTitle: 'una futura vacante' })}
              >
                Contáctanos
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {activeJobs.map((job, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className={`${cardClassName()} flex flex-col p-6 md:p-[30px]`}
                  style={cardStyle()}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="flex flex-col text-left cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="font-sans font-semibold text-brand-900 line-clamp-2"
                        style={{ fontSize: '19px', letterSpacing: '-0.01em', margin: 0, lineHeight: 1.25 }}
                      >
                        {job.title}
                      </h3>
                      <Badge>{job.modality}</Badge>
                    </div>

                    {/* Meta demoted to one quiet line — location is the only
                        fact that varies per card; the publish date is
                        lower-priority still, so it rides along in the same
                        tier instead of claiming its own row. */}
                    <div className="flex items-center gap-1.5 mt-2.5 text-[13px] text-neutral-500">
                      <Icon name="map-pin" size={14} />
                      <span>{job.location}</span>
                      <span aria-hidden className="text-neutral-300">
                        ·
                      </span>
                      <span>Publicado el {formatDate(job.publishedAt)}</span>
                    </div>

                    {/* Salary is the one fact that actually sells a
                        commission-based sales role — it gets its own
                        elevated surface instead of blending into body text. */}
                    {job.salary && (
                      <div
                        className="flex items-center gap-2.5 mt-4 bg-brand-50 px-3.5 py-2.5"
                        style={{ borderRadius: '8px' }}
                      >
                        <div
                          className="flex items-center justify-center text-brand-700 shrink-0"
                          style={{ width: '28px', height: '28px', borderRadius: '7px' }}
                        >
                          <Icon name="dollar-sign" size={16} />
                        </div>
                        <div
                          className="text-[13.5px] leading-[1.4] text-brand-900 font-medium"
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          {job.salary}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-[13px] font-medium text-neutral-500 mt-4 group-hover:text-brand-700 transition-colors">
                      Ver detalle completo →
                    </div>
                  </button>

                  {/* Single, unambiguous action per card — contact info
                      already lives in the modal, repeating it on every card
                      only competed with the one thing this page wants you
                      to do. */}
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center mt-5"
                    onClick={() => applyToJob(job)}
                  >
                    Aplicar
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </main>
  )
}
