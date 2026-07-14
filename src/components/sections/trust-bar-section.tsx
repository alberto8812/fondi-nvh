import { motion } from 'motion/react'
import { stats } from '@/data'
import { staggerContainer, staggerItem } from '@/components/motion'

export function TrustBarSection() {
  return (
    <div className="bg-brand-800 py-7 px-5 sm:px-8 md:px-12">
      <motion.div
        className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 sm:gap-6"
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
            {s.d && (
              <div className="text-[11px] mt-1 text-brand-300">
                {s.d}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
