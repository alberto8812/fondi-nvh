import { MotionConfig } from 'motion/react'
import { Navbar } from '@/components/layout'
import { Footer } from '@/components/layout'
import {
  HeroSection,
  TrustBarSection,
  BenefitsSection,
  // SimulatorSection, — sin tasas reales todavía; ver AmountSelectorSection más abajo. Reactivar cuando el producto tenga condiciones definidas.
  AmountSelectorSection,
  StepsSection,
  ServicesSection,
  AboutSection,
  TestimonialsSection,
  VideosSection,
  ContactSection,
} from '@/components/sections'
import { FloatingChatWidget } from '@/components/floating-chat-widget'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <HeroSection />
        <TrustBarSection />
        <BenefitsSection />
        {/* <SimulatorSection /> */}
        <AmountSelectorSection />
        <StepsSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <VideosSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChatWidget />
    </MotionConfig>
  )
}

export default App
