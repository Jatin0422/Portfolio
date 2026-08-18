import { useReveal } from '../../hooks/useReveal'
import AboutTraits from './AboutTraits'
import AboutStack from './AboutStack'
import AboutCTA from './AboutCTA'
import AboutVisual from './AboutVisual'
import { Reveal, StaggerContainer, StaggerItem } from '../motion/Reveal'

/* ── Section label ──────────────────────────────────────────── */
function Label({ children }) {
  return (
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
        width: '28px',
        height: '1.5px',
        background: 'var(--accent)',
        borderRadius: '1px',
      }} />
      {children}
    </span>
  )
}

/* ── Section divider ────────────────────────────────────────── */
function SectionHead({ label, title, id }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <Label>{label}</Label>
      <Reveal y={12} delay={0.1}>
        <div style={{ marginTop: '12px' }}>
          <h2
            id={id}
            style={{
              margin: 0,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
        </div>
      </Reveal>
      <Reveal 
        x="-20px" 
        y={0} 
        delay={0.2}
      >
        <div
          style={{
            marginTop: '16px',
            height: '1px',
            background: 'linear-gradient(to right, var(--accent), transparent)',
            width: '100%',
            maxWidth: '220px',
            transformOrigin: 'left',
          }}
        />
      </Reveal>
    </div>
  )
}

/* ── About hero ─────────────────────────────────────────────── */
function AboutHero() {
  return (
    <div
      style={{
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: '80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
      }}
      className="about-hero-grid"
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0,
        left: '-10%',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,106,74,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Left — identity */}
      <StaggerContainer delayChildren={0.1}>
        <StaggerItem>
          <Label>About me</Label>
        </StaggerItem>
        <StaggerItem>
          <h1
            id="about-headline"
            style={{
              margin: '16px 0 24px',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            Software that{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              does something
            </em>
            {' '}useful.
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            maxWidth: '460px',
          }}>
            I'm Jatin — a developer who moves across the full stack and into ML when the problem calls for it. My work tends to sit at the intersection of practical software engineering and applied data: building the thing that needs to be built, in a way that actually holds up.
          </p>
        </StaggerItem>
      </StaggerContainer>

      {/* Right — animated schematic visual */}
      <Reveal delay={0.2} style={{ height: '100%', minHeight: '400px' }}>
        <AboutVisual />
      </Reveal>

      <style>{`
        @media (max-width: 860px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 100px !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ── Main export ────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-headline"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '96px',
        paddingBottom: '120px',
      }}>
        <AboutHero />

        {/* How I think */}
        <div>
          <SectionHead
            label="How I think"
            title="The way I work."
            id="about-traits-heading"
          />
          <AboutTraits />
        </div>

        {/* What I work with */}
        <div>
          <SectionHead
            label="What I work with"
            title="Tools and domains."
            id="about-stack-heading"
          />
          <AboutStack />
        </div>

        {/* CTA + exploring */}
        <AboutCTA />
      </div>
    </section>
  )
}
