import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { testimonials } from '@/data'
import { fadeUp, EASE } from '@/components/motion'

const VP = { once: true, amount: 0.2 } as const
const CARD_WIDTH = 340
const CARD_GAP = 20

const cardFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({ fillPct: 100, fillOffsetPct: 0, prev: false, next: false })

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const fillPct = Math.min(100, (el.clientWidth / el.scrollWidth) * 100)
    const progress = max > 0 ? el.scrollLeft / max : 0
    setScrollState({
      fillPct,
      fillOffsetPct: progress * (100 - fillPct),
      prev: el.scrollLeft > 4,
      next: el.scrollLeft < max - 4,
    })
  }, [])

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [updateScrollState])

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' })
  }

  const hasOverflow = scrollState.prev || scrollState.next

  return (
    <section className="bg-white py-14 md:py-[76px] overflow-hidden">
      {/* Header */}
      <motion.div
        className="px-5 sm:px-8 md:px-12 flex items-end justify-between gap-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        <div>
          <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400">
            Testimonios
          </div>
          <h2
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
            <span className="font-serif italic font-medium">Historias reales</span> de personas a las que apoyamos.
          </h2>
        </div>

        {hasOverflow && (
          <div className="hidden sm:flex items-center gap-2 mb-[44px] shrink-0">
            <NavButton direction="prev" disabled={!scrollState.prev} onClick={() => scrollByCard(-1)} />
            <NavButton direction="next" disabled={!scrollState.next} onClick={() => scrollByCard(1)} />
          </div>
        )}
      </motion.div>

      {/* Track */}
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          tabIndex={0}
          role="region"
          aria-label="Testimonios de clientes"
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-5 sm:pl-8 md:pl-12 pr-5 sm:pr-8 md:pr-12 pb-1 focus:outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.n}
              className="fondi-card flex flex-col bg-white border border-neutral-200 p-6 md:p-[30px] snap-start shrink-0"
              style={{
                borderRadius: '10px',
                width: CARD_WIDTH,
                minHeight: 232,
              }}
              variants={cardFade}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              transition={{ duration: 0.35, ease: EASE, delay: Math.min(i, 5) * 0.05 }}
            >
              <div className="flex justify-between items-start">
                <div className="text-status-amber" style={{ fontSize: '14px', letterSpacing: '3px' }}>
                  ★★★★★
                </div>
                <div
                  className="font-serif text-brand-300"
                  style={{ fontSize: '44px', lineHeight: 0.4 }}
                >
                  "
                </div>
              </div>

              <p
                className="font-serif text-brand-900 flex-1"
                style={{
                  fontSize: '17px',
                  lineHeight: 1.55,
                  margin: '16px 0 0',
                  textWrap: 'pretty',
                }}
              >
                {t.q}
              </p>

              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-neutral-100">
                <div
                  className="flex items-center justify-center rounded-full font-semibold text-[15px] bg-brand-200 text-brand-800 shrink-0"
                  style={{ width: '38px', height: '38px' }}
                >
                  {t.i}
                </div>
                <div className="text-sm font-semibold text-neutral-700">
                  {t.n}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edge fades — signal there's more without a dot indicator */}
        {scrollState.prev && (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent" />
        )}
        {scrollState.next && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent" />
        )}
      </div>

      {/* Scroll progress — replaces dot pagination with a position hairline */}
      {hasOverflow && (
        <div className="px-5 sm:px-8 md:px-12 mt-6">
          <div className="relative h-[3px] w-full max-w-[120px] bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-brand-900 rounded-full transition-[left] duration-150 ease-out"
              style={{
                width: `${scrollState.fillPct}%`,
                left: `${scrollState.fillOffsetPct}%`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Testimonio anterior' : 'Siguiente testimonio'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-brand-900 transition-all duration-150 hover:border-brand-300 hover:bg-brand-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'prev' ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  )
}
