import type {
  HeroContent,
  Stat,
  Benefit,
  SimulatorConfig,
  Step,
  Service,
  AboutContent,
  CoverageContent,
  Testimonial,
  VideoItem,
  ContactContent,
  JobOpening,
  JobOpeningInput,
  FaqItem,
} from '@/types/content.types'

import heroRaw from './hero.json'
import statsRaw from './stats.json'
import benefitsRaw from './benefits.json'
import simulatorRaw from './simulator.json'
import stepsRaw from './steps.json'
import servicesRaw from './services.json'
import aboutRaw from './about.json'
import coverageRaw from './coverage.json'
import testimonialsRaw from './testimonials.json'
import videosRaw from './videos.json'
import contactRaw from './contact.json'
import jobsRaw from './jobs.json'
import faqRaw from './faq.json'

export const hero = heroRaw satisfies HeroContent
export const stats = statsRaw satisfies Stat[]
export const benefits = benefitsRaw satisfies Benefit[]
export const simulator = simulatorRaw satisfies SimulatorConfig
export const steps = stepsRaw satisfies Step[]
export const services = servicesRaw satisfies Service[]
export const about = aboutRaw satisfies AboutContent
export const coverage = coverageRaw satisfies CoverageContent
export const testimonials = testimonialsRaw satisfies Testimonial[]
export const videos = videosRaw satisfies VideoItem[]
export const contact = contactRaw as ContactContent

// All open roles are the same "Asesor Comercial" position offered in
// different cities — shared fields live here once and get spread over each
// city-specific entry from jobs.json, so editing the role only touches this
// constant instead of triplicating it across cities.
const ADVISOR_ROLE = {
  title: 'Asesor Comercial',
  modality: 'Tiempo completo',
  description:
    'Atención y acompañamiento a clientes. Seguimiento comercial. Captación de nuevos clientes. Cumplimiento de objetivos comerciales.',
  salary: 'Ingresos competitivos + Comisiones. Gana hasta $2,500 USD semanales.',
  active: true,
} as const

export const jobs = (jobsRaw as JobOpeningInput[]).map((input) => ({
  ...ADVISOR_ROLE,
  ...input,
})) satisfies JobOpening[]

export const faq = faqRaw satisfies FaqItem[]
