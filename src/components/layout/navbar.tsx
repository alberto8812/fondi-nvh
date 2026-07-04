import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '@/components/motion'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Simulador', href: '#simulador' },
  { label: 'Nosotros', href: '#nosotros' },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-brand-900 border-b border-brand-800">
      <div className="h-[70px] flex items-center justify-between px-5 sm:px-8 md:px-10">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-[9px] no-underline">
          <span className="inline-flex w-[30px] h-[30px] rounded-[7px] items-center justify-center bg-brand-300">
            <img src="/images/logo-icon.png" alt="" className="w-[21px] h-[21px] object-contain" />
          </span>
          <span className="font-sans font-bold text-[19px] tracking-[.02em] text-white">
            FONDI
          </span>
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex gap-[30px] items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-300 hover:text-white transition-colors duration-300 no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* CTA — always visible so it's reachable even if the mobile menu's JS fails to mount */}
          <a
            href="#contacto"
            className="inline-flex text-sm font-semibold px-3 sm:px-[18px] py-2.5 rounded-md no-underline transition-colors duration-300 bg-brand-300 text-brand-900 hover:bg-brand-400"
          >
            <span className="sm:hidden">Solicitar</span>
            <span className="hidden sm:inline">Solicitar crédito →</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-md text-brand-300 hover:text-white transition-colors duration-300"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel — positions relative to the sticky header, slides/fades in */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="md:hidden absolute left-0 right-0 top-full bg-brand-900 border-b border-brand-800"
          >
            <div className="flex flex-col px-5 py-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-brand-300 hover:text-white transition-colors duration-300 no-underline py-3 border-b border-brand-800 last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
