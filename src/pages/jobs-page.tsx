import { useState } from 'react'
import { motion } from 'motion/react'
import { jobs, contact } from '@/data'
import { Icon, Button, Badge, Eyebrow, IconRow, cardClassName, cardStyle } from '@/components/ui'
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/components/motion'
import { openFondiChat } from '@/lib/chat-bridge'
import { formatDate } from '@/lib/format'
import { JobModal } from '@/components/job-modal'
import type { JobOpening } from '@/types/content.types'

const VP = { once: true, amount: 0.2 } as const

// Placeholder application form link — single canonical constant so the
// client can swap the real Microsoft Forms URL in one place once it's ready.
const JOB_APPLICATION_FORM_URL = 'https://forms.office.com/r/PLACEHOLDER-fondi-careers'

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
              <Button variant="primary" onClick={() => openFondiChat()}>
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
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  variants={staggerItem}
                  className={`${cardClassName({ interactive: true })} flex flex-col text-left p-6 md:p-[30px] overflow-hidden`}
                  style={{ ...cardStyle(), height: '272px' }}
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

                  {/* Scannable facts instead of free-text prose — fixed-length
                      data (location, short date, salary) keeps card height
                      predictable regardless of how long the description is;
                      the full description only shows in the detail modal. */}
                  <div className="flex flex-col gap-1.5 mt-3">
                    <IconRow icon="home">{job.location}</IconRow>
                    <IconRow icon="clock">Publicado el {formatDate(job.publishedAt)}</IconRow>
                    {job.salary && (
                      <div className="text-[14px] font-medium text-brand-900 mt-0.5">{job.salary}</div>
                    )}
                  </div>

                  {/* Pinned footer — stays at the card's bottom edge regardless of
                      how much metadata rendered above, so cards in the same grid
                      row line up and the fixed card height above never overflows. */}
                  <div className="flex flex-col gap-2 mt-auto pt-5 border-t border-neutral-200">
                    <IconRow
                      icon="phone"
                      iconClassName="stroke-brand-600"
                      gapClassName="gap-2.5"
                      textClassName="text-[13px] text-neutral-600"
                    >
                      {contact.phone}
                    </IconRow>
                    <IconRow
                      icon="mail"
                      iconClassName="stroke-brand-600"
                      gapClassName="gap-2.5"
                      textClassName="text-[13px] text-neutral-600"
                    >
                      {contact.email}
                    </IconRow>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-brand-700 mt-1.5">
                      Ver detalle completo →
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          <motion.div
            className="mt-8 md:mt-10 pt-8 border-t border-neutral-200 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <Button variant="primary" href={JOB_APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">
              📝 Aplica hoy completando el formulario
            </Button>
            <p className="text-[14px] text-neutral-600 mt-4">
              También puedes enviar tu hoja de vida al correo: {contact.email}
            </p>
          </motion.div>
        </div>
      </section>

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </main>
  )
}
