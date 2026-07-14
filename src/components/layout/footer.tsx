import { contact, coverage } from "@/data";
import { Icon } from "@/components/ui/icon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="bg-brand-900 text-brand-300"
      style={{ paddingTop: "60px" }}
    >
      {/* 4-column grid */}
      <div className="px-5 sm:px-8 md:px-12 pb-10 border-b border-brand-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <img
              src="/images/balck-logo.png"
              alt="Fondi"
              className="h-15 w-auto object-contain"
            />
            <p className="font-serif italic text-[19px] mt-[18px] max-w-[340px] leading-[1.45] text-brand-200">
              Estamos disponibles para apoyarte cuando más lo necesitas.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @fondi.financial"
                className="text-brand-300 hover:text-on-brand transition-colors"
              >
                <Icon name="instagram" size={20} />
              </a>
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Fondi US"
                className="text-brand-300 hover:text-on-brand transition-colors"
              >
                <Icon name="facebook" size={20} />
              </a>
            </div>
          </div>

          {/* Ubicaciones */}
          <div>
            <div className="font-mono text-[11.5px] tracking-[.14em] uppercase mb-4 text-brand-500">
              Ubicaciones
            </div>
            <div className="flex flex-col gap-2.5 text-[14.5px] text-brand-200">
              {coverage.locations.map((loc) => (
                <span key={loc.city} className="flex items-center gap-2">
                  <Icon name="map-pin" size={14} className="shrink-0 text-brand-500" />
                  {loc.city}, {loc.region}
                </span>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <div className="font-mono text-[11.5px] tracking-[.14em] uppercase mb-4 text-brand-500">
              Contacto
            </div>
            <div className="flex flex-col gap-2.5 text-[14.5px] text-brand-200">
              <a
                href={contact.telHref}
                className="no-underline hover:text-on-brand transition-colors text-brand-200"
              >
                {contact.phone}
              </a>
              <span>{contact.email}</span>
              <a
                href={`https://wa.me/${contact.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-on-brand transition-colors text-brand-200"
              >
                WhatsApp →
              </a>
            </div>
          </div>

          {/* Requisitos */}
          <div>
            <div className="font-mono text-[11.5px] tracking-[.14em] uppercase mb-4 text-brand-500">
              Requisitos
            </div>
            <div className="flex flex-col gap-2.5 text-[14.5px] text-brand-200">
              {coverage.requirements.map((req) => (
                <span key={req}>{req}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="px-5 sm:px-8 md:px-12 py-6 flex justify-between flex-wrap gap-3 text-[12.5px] text-brand-500">
        <span>© {year} Fondi · Todos los derechos reservados</span>
        <span>Créditos sujetos a evaluación</span>
      </div>
    </footer>
  );
}
