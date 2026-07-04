import { useState } from 'react'
import { motion } from 'motion/react'
import { videos } from '@/data'
import { fadeUp, staggerContainer, staggerItem } from '@/components/motion'

const VP = { once: true, amount: 0.2 } as const

export function VideosSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <section
      id="videos"
      className="bg-brand-50 border-t border-neutral-200"
      style={{
        padding: '76px 48px',
      }}
    >
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}>
        <div className="font-mono text-xs tracking-[.14em] uppercase text-brand-600">
          Experiencias en video
        </div>
        <h2
          className="font-sans font-semibold mt-[14px] text-brand-900"
          style={{
            fontSize: '34px',
            letterSpacing: '-0.02em',
            lineHeight: 1.12,
            maxWidth: '560px',
            textWrap: 'balance',
            marginBottom: '10px',
          }}
        >
          Nuestros clientes lo cuentan{' '}
          <span className="font-serif italic font-medium">mejor que nosotros.</span>
        </h2>
        <p className="text-[15px] m-0 mb-10 text-neutral-500">
          Pasa el cursor para ver un adelanto — haz clic para verlo completo.
        </p>
      </motion.div>

      {/* Cards — stagger entrance, CSS hover preserved */}
      <motion.div
        className="grid grid-cols-3 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        {videos.map((v, i) => (
          <motion.div key={v.t} variants={staggerItem}>
            <VideoCard
              video={v}
              isActive={activeIdx === i}
              onEnter={() => setActiveIdx(i)}
              onLeave={() => setActiveIdx(null)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

interface VideoCardProps {
  video: { t: string; poster: string }
  isActive: boolean
  onEnter: () => void
  onLeave: () => void
}

function VideoCard({ video, isActive, onEnter, onLeave }: VideoCardProps) {
  return (
    <div
      className="relative cursor-pointer overflow-hidden border border-neutral-200 bg-brand-900"
      style={{
        aspectRatio: '16/10',
        borderRadius: '10px',
        transition: 'transform 0.2s cubic-bezier(0.2,0.8,0.2,1)',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={video.poster}
        alt={video.t}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        style={{
          opacity: isActive ? 0.7 : 0.85,
          filter: isActive ? 'saturate(1) brightness(0.85)' : 'saturate(0.8) brightness(0.75)',
        }}
        loading="lazy"
      />

      <div
        className="absolute left-3 bottom-3 flex items-center gap-[9px] rounded-full px-3.5 py-2 transition-all duration-200 bg-neutral-50/94"
        style={{
          boxShadow: '0 2px 8px rgba(11, 63, 124,.15)',
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" className="fill-brand-800">
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
        <span className="font-mono text-xs font-medium text-brand-900">
          {video.t}
        </span>
      </div>
    </div>
  )
}
