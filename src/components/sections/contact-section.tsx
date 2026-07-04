import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { contact } from '@/data'
import { slideInLeft, slideInRight, EASE } from '@/components/motion'

const VP = { once: true, amount: 0.2 } as const

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.05 21.5h-.04a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1 14.6-11.62 9.34 9.34 0 0 1 2.75 6.66 9.42 9.42 0 0 1-9.4 9.4zM20.06 3.9A11.34 11.34 0 0 0 2.2 17.58L.5 23.75l6.33-1.66a11.32 11.32 0 0 0 5.22 1.33h.01a11.35 11.35 0 0 0 8-19.52z" />
  </svg>
)

type FormErrors = {
  nombre?: string
  telefono?: string
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [monto, setMonto] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: FormErrors = {}
    if (!nombre.trim()) nextErrors.nombre = 'Ingresa tu nombre completo.'
    if (!telefono.trim()) nextErrors.telefono = 'Ingresa un teléfono de contacto.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSubmitted(true)
  }

  return (
    <section
      id="contacto"
      className="bg-neutral-100 border-t border-neutral-200 px-5 sm:px-8 md:px-12 py-14 md:py-[76px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: info — slides from left */}
        <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={VP}>
          <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400">
            {contact.eyebrow}
          </div>
          <h2
            className="font-sans font-semibold text-brand-900"
            style={{
              fontSize: 'clamp(26px, 6vw, 34px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              margin: '14px 0 18px',
              textWrap: 'balance',
            }}
          >
            {contact.headline}{' '}
            <span className="font-serif italic font-medium">{contact.headlineItalic}</span>
          </h2>
          <p
            className="text-base leading-[1.65] text-neutral-600"
            style={{ margin: '0 0 28px', maxWidth: '400px' }}
          >
            {contact.subtext}
          </p>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${contact.waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-base font-semibold rounded-lg no-underline mb-6 transition-colors duration-300 hover:bg-whatsapp-hover bg-whatsapp text-white"
            style={{ padding: '15px 24px' }}
          >
            <WaIcon />
            Escríbenos por WhatsApp
          </a>

          {/* Contact details */}
          <div
            className="flex flex-col gap-3 pt-[22px] border-t border-neutral-200"
          >
            <a
              href={contact.telHref}
              className="flex items-center gap-3 text-[15px] no-underline hover:text-brand-900 transition-colors text-neutral-600"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className="stroke-brand-600">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
              </svg>
              {contact.phone}
            </a>
            <div className="flex items-center gap-3 text-[15px] text-neutral-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className="stroke-brand-600">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {contact.email}
            </div>
          </div>
        </motion.div>

        {/* Right: form panel — slides from right */}
        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={VP}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col items-center justify-center rounded-xl bg-white border border-neutral-200 p-6 md:p-8"
                style={{ minHeight: '300px' }}
              >
                <div className="font-serif italic text-[34px] text-brand-900">✓</div>
                <p className="font-sans font-semibold text-lg mt-4 text-brand-900">¡Recibimos tu solicitud!</p>
                <p className="text-[15px] text-center mt-2 text-neutral-600">
                  Un asesor te contactará a la brevedad.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: EASE }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 rounded-xl bg-white border border-neutral-200 p-6 md:p-8"
              >
                <div>
                  <label htmlFor="nombre" className="block text-[13px] font-medium mb-1.5 text-neutral-600">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value)
                      if (errors.nombre) setErrors((prev) => ({ ...prev, nombre: undefined }))
                    }}
                    aria-invalid={!!errors.nombre}
                    aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                    className="fondi-input w-full rounded-md text-[15px] font-sans border border-neutral-300 bg-white text-brand-900"
                    style={{
                      padding: '12px 14px',
                    }}
                  />
                  {errors.nombre && (
                    <p id="nombre-error" className="text-xs mt-1.5 text-status-red">
                      {errors.nombre}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-[13px] font-medium mb-1.5 text-neutral-600">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    placeholder="+1 (___) ___-____"
                    value={telefono}
                    onChange={(e) => {
                      setTelefono(e.target.value)
                      if (errors.telefono) setErrors((prev) => ({ ...prev, telefono: undefined }))
                    }}
                    aria-invalid={!!errors.telefono}
                    aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                    className="fondi-input w-full rounded-md text-[15px] font-sans border border-neutral-300 bg-white text-brand-900"
                    style={{
                      padding: '12px 14px',
                    }}
                  />
                  {errors.telefono && (
                    <p id="telefono-error" className="text-xs mt-1.5 text-status-red">
                      {errors.telefono}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="monto" className="block text-[13px] font-medium mb-1.5 text-neutral-600">
                    ¿Cuánto necesitas?
                  </label>
                  <input
                    id="monto"
                    type="text"
                    placeholder="Ej: $2,500"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="fondi-input w-full rounded-md text-[15px] font-sans border border-neutral-300 bg-white text-brand-900"
                    style={{
                      padding: '12px 14px',
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="text-base font-semibold rounded-md border-none cursor-pointer transition-colors duration-300 mt-1 hover:bg-brand-800 bg-brand-900 text-white"
                  style={{ padding: '15px' }}
                >
                  Solicitar mi crédito
                </motion.button>
                <p className="text-xs text-center m-0 text-neutral-400">
                  Nunca enviamos spam a tu correo.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
