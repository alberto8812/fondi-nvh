export interface HeroContent {
  eyebrow: string
  headline: string
  headlineItalic: string
  subline: string
  ctaPrimary: { label: string; href: string }
  ctaWhatsApp: { label: string; href: string }
  bgVideo: string
}

export interface Stat {
  v: string
  l: string
}

export interface Benefit {
  n: string
  ic: string
  t: string
  d: string
}

export interface SimulatorConfig {
  monthlyRate: number
  montoMin: number
  montoMax: number
  montoStep: number
  montoDefault: number
  plazoMin: number
  plazoMax: number
  plazoStep: number
  plazoDefault: number
  quickAmounts: number[]
  waNumber: string
}

export interface Step {
  n: string
  t: string
  d: string
}

export interface Service {
  ic: string
  t: string
  d: string
}

export interface AboutContent {
  eyebrow: string
  headline: string
  body: string
  cta: { label: string; href: string }
  image: string
  values: { icon: string; title: string; text: string }[]
}

export interface Testimonial {
  i: string
  n: string
  q: string
}

export interface VideoItem {
  t: string
  poster: string
  url: string
}

export interface ContactQuestion {
  id: string
  label: string
  type: 'text' | 'boolean'
}

export interface ContactContent {
  eyebrow: string
  headline: string
  headlineItalic: string
  subtext: string
  phone: string
  telHref: string
  waNumber: string
  waIntro: string
  assistantName: string
  assistantRole: string
  greeting: string
  teaser: string
  questions: ContactQuestion[]
  email: string
}
