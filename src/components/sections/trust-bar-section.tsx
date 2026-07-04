import { motion } from 'motion/react'
import { stats } from '@/data'
import { staggerContainer, staggerItem } from '@/components/motion'

export function TrustBarSection() {
  return (
    <div className="bg-brand-800" style={{ padding: '28px 48px' }}>
      <motion.div
        className="grid grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((s) => (
          <motion.div key={s.l} variants={staggerItem} className="text-center">
            <div
              className="font-serif italic text-brand-300"
              style={{ fontSize: '34px', lineHeight: 1 }}
            >
              {s.v}
            </div>
            <div className="text-[13px] mt-2 text-brand-200">
              {s.l}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
