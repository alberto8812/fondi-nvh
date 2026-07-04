import { contact } from '@/data'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-900 text-brand-300" style={{ paddingTop: '60px' }}>
      {/* 3-column grid */}
      <div
        className="px-12 pb-10 border-b border-brand-800"
      >
        <div className="grid grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-[9px]">
              <span
                className="inline-flex w-[30px] h-[30px] rounded-[7px] items-center justify-center font-serif font-semibold italic text-lg bg-brand-300 text-brand-900"
              >
                F
              </span>
              <span className="font-sans font-bold text-[19px] text-white">FONDI</span>
            </div>
            <p className="font-serif italic text-[19px] mt-[18px] max-w-[340px] leading-[1.45] text-brand-200">
              Estamos aquí para apoyarte cuando más lo necesitas.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <div
              className="font-mono text-[11.5px] tracking-[.14em] uppercase mb-4 text-brand-500"
            >
              Contacto
            </div>
            <div className="flex flex-col gap-2.5 text-[14.5px] text-brand-200">
              <a
                href={contact.telHref}
                className="no-underline hover:text-white transition-colors text-brand-200"
              >
                {contact.phone}
              </a>
              <span>{contact.email}</span>
              <a
                href={`https://wa.me/${contact.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-white transition-colors text-brand-200"
              >
                WhatsApp →
              </a>
            </div>
          </div>

          {/* Requisitos */}
          <div>
            <div
              className="font-mono text-[11.5px] tracking-[.14em] uppercase mb-4 text-brand-500"
            >
              Requisitos
            </div>
            <div className="flex flex-col gap-2.5 text-[14.5px] text-brand-200">
              <span>Pasaporte vigente</span>
              <span>Ser mayor de 18 años</span>
              <span>Sin fiador ni historial</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="px-12 py-6 flex justify-between flex-wrap gap-3 text-[12.5px] text-brand-500"
      >
        <span>© {year} Fondi · Todos los derechos reservados</span>
        <span>Créditos sujetos a evaluación</span>
      </div>
    </footer>
  )
}
