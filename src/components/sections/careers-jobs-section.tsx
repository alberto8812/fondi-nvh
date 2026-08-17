import { useState } from 'react'
import { motion } from 'motion/react'
import { jobs } from '@/data'
import { Icon, Button, Badge, Eyebrow, cardClassName, cardStyle } from '@/components/ui'
import { fadeUp, staggerContainer, staggerItem } from '@/components/motion'
import { openFondiChat } from '@/lib/chat-bridge'
import { JobModal } from '@/components/job-modal'
import type { JobOpening } from '@/types/content.types'

const VP = { once: true, amount: 0.2 } as const

const activeJobs = jobs.filter((job) => job.active)

function applyToJob(job: JobOpening) {
  openFondiChat({ mode: 'application', jobTitle: `${job.title} — ${job.location}` })
}

export function CareersJobsSection() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null)

  return (
    <>
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
              Por el momento no tenemos vacantes abiertas, pero nos encantaría conocerte. Escríbenos
              y te contactamos cuando surja una oportunidad para ti.
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
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <Badge>{job.modality}</Badge>
                      {job.active && (
                        <Badge className="text-green-700 bg-green-100">
                          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-green-700 mr-1.5" />
                          Activo
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Meta demoted to one quiet line — location is the only
                      fact that varies per card. */}
                  <div className="flex items-center gap-1.5 mt-2.5 text-[13px] text-neutral-500">
                    <Icon name="map-pin" size={14} />
                    <span>{job.location}</span>
                  </div>

                  {/* Salary is the one fact that actually sells a
                      commission-based sales role — it gets its own
                      elevated surface instead of blending into body text. */}
                  {job.salary && (
                    <div className="flex items-center gap-2.5 mt-4 bg-brand-50 px-3.5 py-2.5" style={{ borderRadius: '8px' }}>
                      <div
                        className="flex items-center justify-center text-brand-700 shrink-0"
                        style={{ width: '28px', height: '28px', borderRadius: '7px' }}
                      >
                        <Icon name="dollar-sign" size={16} />
                      </div>
                      <span className="text-[13.5px] leading-[1.4] text-brand-900 font-medium tabular-nums">
                        {job.salary}
                      </span>
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

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </>
  )
}
