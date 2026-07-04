const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Simulador', href: '#simulador' },
  { label: 'Nosotros', href: '#nosotros' },
] as const

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 h-[70px] flex items-center justify-between px-10 bg-brand-900 border-b border-brand-800"
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-[9px] no-underline">
        <span
          className="inline-flex w-[30px] h-[30px] rounded-[7px] items-center justify-center font-serif font-semibold text-lg italic bg-brand-300 text-brand-900"
        >
          F
        </span>
        <span className="font-sans font-bold text-[19px] tracking-[.02em] text-white">
          FONDI
        </span>
      </a>

      {/* Nav links */}
      <nav className="hidden md:flex gap-[30px] items-center">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-brand-300 hover:text-white transition-colors duration-200 no-underline"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href={`#contacto`}
        className="text-sm font-semibold px-[18px] py-2.5 rounded-md no-underline transition-colors duration-200 bg-brand-300 text-brand-900 hover:bg-brand-400"
      >
        Solicitar crédito →
      </a>
    </header>
  )
}
