import HeroSection from '../components/hero/HeroSection'
import AboutSection from '../components/about/AboutSection'
import ProjectsHero from '../components/projects/ProjectsHero'
import ProjectsSection from '../components/projects/ProjectsSection'
import ExperienceSection from '../components/experience/ExperienceSection'
import ContactSection from '../components/contact/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsHero />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
