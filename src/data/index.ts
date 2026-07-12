import type {
  HeroContent,
  Stat,
  Benefit,
  SimulatorConfig,
  Step,
  Service,
  AboutContent,
  Testimonial,
  VideoItem,
  ContactContent,
  JobOpening,
  FaqItem,
} from '@/types/content.types'

import heroRaw from './hero.json'
import statsRaw from './stats.json'
import benefitsRaw from './benefits.json'
import simulatorRaw from './simulator.json'
import stepsRaw from './steps.json'
import servicesRaw from './services.json'
import aboutRaw from './about.json'
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
export const testimonials = testimonialsRaw satisfies Testimonial[]
export const videos = videosRaw satisfies VideoItem[]
export const contact = contactRaw as ContactContent
export const jobs = jobsRaw satisfies JobOpening[]
export const faq = faqRaw satisfies FaqItem[]
