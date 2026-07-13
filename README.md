# Fondi Landing

Landing page de Fondi — plataforma de préstamos personales para el mercado estadounidense. Explica el producto, muestra montos disponibles y dirige al usuario a WhatsApp para iniciar el proceso (sin formularios).

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vitejs.dev)
- [React Router](https://reactrouter.com) (`createBrowserRouter`, ver `src/router.tsx`)
- [Tailwind CSS 4](https://tailwindcss.com) (tokens en `src/styles/globals.css`)
- [Motion](https://motion.dev) para animaciones
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) como gate anti-bots del chat (ver `docs/proteccion-anti-bots.md`)
- [Oxlint](https://oxc.rs) como linter
- [pnpm](https://pnpm.io) como package manager

## Requisitos

- Node.js 20+
- pnpm

## Uso

```bash
pnpm install
pnpm dev        # servidor de desarrollo con HMR
pnpm build      # typecheck + build de producción
pnpm preview    # preview del build
pnpm lint       # oxlint
pnpm typecheck  # tsc --noEmit
```

## Estructura

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout (contiene el <Outlet /> con transición de ruta)
│   ├── sections/         # Secciones de la landing (hero, beneficios, monto, pasos, servicios, about, testimonios, videos, contacto, faq)
│   ├── motion/           # Wrappers de animación (reveal, counter, variants)
│   ├── ui/               # Componentes base (button, card, badge, heading, icon)
│   └── floating-chat-widget.tsx  # Widget flotante de chat/WhatsApp global (protegido con Cloudflare Turnstile)
├── pages/                # HomePage y JobsPage (/careers)
├── router.tsx            # Rutas con createBrowserRouter ("/" y "/careers")
├── data/                 # Contenido en JSON por sección (copy, no lógica)
├── lib/                  # Utilidades (puente de chat, scroll a hash, etc.)
├── styles/globals.css    # Design tokens Tailwind v4 (brand/neutral)
└── types/content.types.ts
```

El flujo de conversión es: el usuario ve el producto → elige un monto en `AmountSelectorSection` → se lo dirige a WhatsApp. No hay simulador de tasas activo (`SimulatorSection` queda comentado en `App.tsx` hasta que el producto tenga condiciones reales) ni formulario de contacto tradicional. La página `/careers` (`JobsPage`) muestra las vacantes abiertas de Fondi (dato estático en `src/data/jobs.json`), sin postulación online.

La sección de Preguntas Frecuentes (`FaqSection`, contenido en `src/data/faq.json`) vive al final de la landing, antes del footer.

## Pendientes

- `src/data/contact.json` → `social.instagram` y `social.facebook` tienen URLs placeholder (`fondi.us`). Reemplazar por los handles reales de Fondi antes de publicar.

## Documentación adicional

Ver `docs/`:

- `seo-implementacion.md` — metadatos, sitemap, robots, JSON-LD
- `formulario-email-whatsapp.md` — decisión de reemplazar formulario por WhatsApp
- `deteccion-pais-dialectos.md` — estrategia para adaptar dialecto según país del visitante
- `deploy-aws-godaddy.md` — pasos de deploy (S3 + CloudFront + ACM + DNS en GoDaddy)
