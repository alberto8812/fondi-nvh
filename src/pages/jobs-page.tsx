import { useState } from 'react'
import { motion } from 'motion/react'
import { jobs, contact } from '@/data'
import { Icon, Button } from '@/components/ui'
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/components/motion'
import { openFondiChat } from '@/lib/chat-bridge'
import { JobModal } from '@/components/job-modal'
import type { JobOpening } from '@/types/content.types'

const VP = { once: true, amount: 0.2 } as const

function formatShortDate(iso: string) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
}

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

export function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null)
  const activeJobs = jobs.filter((job) => job.active)

  return (
    <main>
      <section
        id="careers"
        className="bg-neutral-100 border-t border-neutral-200 px-5 sm:px-8 md:px-12 pt-[calc(70px+56px)] md:pt-[calc(70px+76px)] pb-14 md:pb-[76px]"
      >
        {/* Header — text + photo, two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={VP}>
            <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400">
              Trabajá con nosotros
            </div>
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
              Construí tu <span className="font-serif italic font-medium">carrera</span> en Fondi.
            </h1>
            <p className="text-base leading-[1.65] text-neutral-600" style={{ maxWidth: '420px' }}>
              Sumate a un equipo que ayuda todos los días a miles de personas a acceder al crédito
              que necesitan. Buscamos gente comprometida para crecer junto a nosotros.
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
                className="rounded-lg border border-neutral-200 bg-white p-5"
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

        {/* Open roles */}
        <div className="mt-10 md:mt-14 pt-10 md:pt-12 border-t border-neutral-200">
          <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400 mb-6">
            Búsquedas abiertas
          </div>

          {activeJobs.length === 0 ? (
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {activeJobs.map((job, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  variants={staggerItem}
                  className="fondi-card flex flex-col text-left bg-white border border-neutral-200 p-6 md:p-[30px] cursor-pointer overflow-hidden"
                  style={{ borderRadius: '10px', height: '272px' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="font-sans font-semibold text-brand-900 line-clamp-2"
                      style={{ fontSize: '19px', letterSpacing: '-0.01em', margin: 0, lineHeight: 1.25 }}
                    >
                      {job.title}
                    </h3>
                    <span
                      className="shrink-0 font-mono text-[11px] font-medium tracking-[.04em] uppercase text-brand-700 bg-brand-100 px-2.5 py-1 rounded-full"
                    >
                      {job.modality}
                    </span>
                  </div>

                  {/* Scannable facts instead of free-text prose — fixed-length
                      data (location, short date, salary) keeps card height
                      predictable regardless of how long the description is;
                      the full description only shows in the detail modal. */}
                  <div className="flex flex-col gap-1.5 mt-3">
                    <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                      <Icon name="home" size={14} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                      <Icon name="clock" size={14} />
                      Publicado el {formatShortDate(job.publishedAt)}
                    </div>
                    {job.salary && (
                      <div className="text-[14px] font-medium text-brand-900 mt-0.5">{job.salary}</div>
                    )}
                  </div>

                  {/* Pinned footer — stays at the card's bottom edge regardless of
                      how much metadata rendered above, so cards in the same grid
                      row line up and the fixed card height above never overflows. */}
                  <div className="flex flex-col gap-2 mt-auto pt-5 border-t border-neutral-200">
                    <div className="flex items-center gap-2.5 text-[13px] text-neutral-600">
                      <Icon name="phone" size={14} className="stroke-brand-600" />
                      {contact.phone}
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-neutral-600">
                      <Icon name="mail" size={14} className="stroke-brand-600" />
                      {contact.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-brand-700 mt-1.5">
                      Ver detalle completo →
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </main>
  )
}
