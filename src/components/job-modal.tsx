import { useEffect, useRef, useState } from 'react'
import { contact } from '@/data'
import { Icon } from '@/components/ui'
import type { JobOpening } from '@/types/content.types'

interface JobModalProps {
  job: JobOpening | null
  onClose: () => void
}

function formatPublishedAt(iso: string) {
  // Append a local time-of-day so date-only strings ("2026-06-15") parse in the
  // browser's local timezone instead of UTC — otherwise negative-offset zones
  // display the previous day.
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
}

export function JobModal({ job, onClose }: JobModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [rendered, setRendered] = useState<JobOpening | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (job) {
      setRendered(job)
      dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [job])

  return (
    <dialog
      ref={dialogRef}
      className="job-modal"
      aria-label={rendered?.title}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
      onTransitionEnd={(e) => {
        if (e.target === dialogRef.current && !dialogRef.current?.open) {
          setRendered(null)
        }
      }}
    >
      {rendered && (
        <div className="relative bg-white p-6 md:p-8" style={{ borderRadius: '14px' }}>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="flex items-start justify-between gap-3 pr-10">
            <h2
              className="font-sans font-semibold text-brand-900"
              style={{ fontSize: '21px', letterSpacing: '-0.01em', margin: 0 }}
            >
              {rendered.title}
            </h2>
            <span className="shrink-0 font-mono text-[11px] font-medium tracking-[.04em] uppercase text-brand-700 bg-brand-100 px-2.5 py-1 rounded-full">
              {rendered.modality}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[13px] text-neutral-500 mt-2">
            <Icon name="home" size={14} />
            {rendered.location}
          </div>

          <div className="font-mono text-[11px] tracking-[.1em] uppercase text-neutral-400 mt-1">
            Publicado el {formatPublishedAt(rendered.publishedAt)}
          </div>

          <p className="text-[15px] leading-[1.6] text-neutral-600 mt-5" style={{ textWrap: 'pretty' }}>
            {rendered.description}
          </p>

          {rendered.salary && (
            <div className="mt-5 pt-5 border-t border-neutral-200">
              <div className="font-mono text-[11px] tracking-[.1em] uppercase text-neutral-400 mb-1">
                Salario
              </div>
              <div className="text-[15px] font-medium text-brand-900">{rendered.salary}</div>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-neutral-200">
            <div className="font-mono text-[11px] tracking-[.1em] uppercase text-neutral-400 mb-3">
              Contacto
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href={contact.telHref}
                className="flex items-center gap-2.5 text-[14px] no-underline hover:text-brand-900 transition-colors text-neutral-600"
              >
                <Icon name="phone" size={15} className="stroke-brand-600" />
                {contact.phone}
              </a>
              <div className="flex items-center gap-2.5 text-[14px] text-neutral-600">
                <Icon name="mail" size={15} className="stroke-brand-600" />
                {contact.email}
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
