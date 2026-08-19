import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LaptopEyes from './LaptopEyes'
import { StaggerContainer, StaggerItem } from '../motion/Reveal'

export default function ProjectsHero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section
      id="projects-hero"
      ref={sectionRef}
      aria-labelledby="projects-headline"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        paddingBottom: '80px',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Ambient accent glow — top right */}
      <motion.div aria-hidden="true" style={{
        position: 'absolute', top: '-8%', right: '-6%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,106,74,0.09) 0%, transparent 65%)',
        pointerEvents: 'none', y: y1,
      }} />
      {/* Ambient glow — bottom left */}
      <motion.div aria-hidden="true" style={{
        position: 'absolute', bottom: '8%', left: '-8%',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,173,157,0.04) 0%, transparent 65%)',
        pointerEvents: 'none', y: y2,
      }} />
      <div className="projects-orbits" aria-hidden="true">
        <svg viewBox="0 0 800 600" fill="none" role="presentation">
          <g>
            <ellipse cx="400" cy="300" rx="360" ry="132" transform="rotate(-18 400 300)" />
            <ellipse cx="400" cy="300" rx="318" ry="168" transform="rotate(38 400 300)" />
            <ellipse cx="400" cy="300" rx="250" ry="108" transform="rotate(84 400 300)" />
          </g>
        </svg>
      </div>

      {/* Content grid */}
      <div
        className="ph-grid"
        style={{
          maxWidth: '1120px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left — text */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.12}>
          {/* Eyebrow */}
          <StaggerItem>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              <span style={{
                display: 'inline-block',
                width: '28px', height: '1.5px',
                background: 'var(--accent)',
                borderRadius: '1px',
              }} />
              Full-stack · Data · Applied ML
            </span>
          </StaggerItem>

          {/* Headline */}
          <StaggerItem>
            <h1
              id="projects-headline"
              style={{
                margin: '16px 0 0',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              Things I've{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>built.</em>
            </h1>
          </StaggerItem>

          {/* Description */}
          <StaggerItem>
            <p style={{
              margin: '20px 0 0',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: '420px',
            }}>
              End-to-end systems where full-stack engineering meets data pipelines and applied ML. Each project solves a real problem from the ground up.
            </p>
          </StaggerItem>

          {/* Escape hatch line */}
          <StaggerItem>
            <p style={{
              margin: '10px 0 0',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              fontStyle: 'italic',
            }}>
              "a few things that escaped localhost."
            </p>
          </StaggerItem>

          {/* Scroll cue */}
          <StaggerItem>
            <div style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.06em',
            }}>
              <span>Scroll to explore</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M5 10l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Right — laptop + eyes */}
        <motion.div
          className="ph-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          style={{ y: laptopY, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <LaptopEyes />
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .ph-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .ph-grid p { margin-left: auto !important; margin-right: auto !important; }
          .ph-grid span[style*="inline-flex"] { justify-content: center !important; }
          .ph-visual { max-width: 320px !important; margin-left: auto !important; margin-right: auto !important; }
        }
        @media (max-width: 480px) {
          .ph-grid { padding: 0 16px !important; }
          .ph-visual { max-width: 260px !important; }
        }
      `}</style>
    </section>
  )
}
