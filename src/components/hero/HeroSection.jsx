import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import AvatarCard from './AvatarCard'
import ScrollIndicator from './ScrollIndicator'

/* ── Stagger reveal on mount ────────────────────────────────── */
function useMountReveal(itemCount, delayMs = 120) {
  const [visible, setVisible] = useState(Array(itemCount).fill(false))

  useEffect(() => {
    const timers = Array.from({ length: itemCount }, (_, i) =>
      setTimeout(() => setVisible(v => { const n = [...v]; n[i] = true; return n }), 200 + i * delayMs)
    )
    return () => timers.forEach(clearTimeout)
  }, [itemCount, delayMs])

  return visible
}

/* ── Reveal style helper ────────────────────────────────────── */
function revealStyle(visible, extraDelay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.75s cubic-bezier(0.19,1,0.22,1) ${extraDelay}ms, transform 0.75s cubic-bezier(0.19,1,0.22,1) ${extraDelay}ms`,
  }
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const vis = useMountReveal(6)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax offsets
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-headline"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px', /* offset for fixed navbar */
        paddingBottom: '80px',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Ambient accent glow — top right */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,106,74,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
          y: y1,
        }}
      />
      {/* Ambient glow — bottom left */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-8%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,173,157,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
          y: y2,
        }}
      />

      {/* ── Content grid ── */}
      <div
        style={{
          maxWidth: '1120px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(240px, .8fr) minmax(0, .8fr)',
          gap: '40px',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left: text content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Eyebrow */}
          <div style={revealStyle(vis[0])} className="hero-eyebrow">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              <span style={{
                display: 'inline-block',
                width: '28px',
                height: '1.5px',
                background: 'var(--accent)',
                borderRadius: '1px',
              }} />
              Software Developer · Applied ML
            </span>
          </div>

          {/* Headline */}
          <div style={revealStyle(vis[1])}>
            <h1
              id="hero-headline"
              style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              I build useful things{' '}
              <em style={{
                fontStyle: 'italic',
                color: 'var(--accent)',
                position: 'relative',
                display: 'inline-block',
              }}>
                with code.
              </em>
            </h1>
          </div>

          {/* Supporting copy */}
          <div style={revealStyle(vis[2])}>
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: '440px',
            }}>
              I turn ideas, data and real-world problems into usable software.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="hero-ctas"
            style={{
              ...revealStyle(vis[3]),
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <CTAButton primary href="#projects" id="hero-cta-explore">
              Explore my work ↗
            </CTAButton>
            <CTAButton to="/resume" id="hero-cta-resume">
              Resume ↗
            </CTAButton>
          </div>

          {/* Subtle status row */}
          <div style={revealStyle(vis[4])} className="hero-status">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}>
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#5CB85C',
                boxShadow: '0 0 6px rgba(92,184,92,0.6)',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }} />
              Open to opportunities
            </div>
          </div>
        </div>

        {/* Center: avatar */}
        <div
          className="avatar-wrapper"
          style={{
            ...revealStyle(vis[5]),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <AvatarCard />
        </div>

        {/* Right: focus */}
        <div className="hero-focus" style={{ ...revealStyle(vis[5]), display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', color: 'var(--text-primary)', lineHeight: 1.05 }}>An Aspiring</span>
          <strong style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(.9rem, 1.6vw, 1.15rem)', letterSpacing: '.14em', color: 'var(--accent)' }}>AI &amp; ML ENGINEER</strong>
          <strong style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(.9rem, 1.6vw, 1.15rem)', letterSpacing: '.14em', color: 'var(--text-secondary)' }}>FULL-STACK DEVELOPER</strong>
        </div>
      </div>

      <ScrollIndicator />

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .hero-grid p { margin-left: auto !important; margin-right: auto !important; }
          .hero-ctas   { justify-content: center !important; }
          .hero-eyebrow { justify-content: center !important; }
          .hero-status  { justify-content: center !important; }
          .avatar-wrapper { order: -1; }
          .hero-focus { align-items: center; }
        }
        @media (max-width: 900px) {
          .avatar-wrapper { max-width: 260px !important; }
        }
        @media (max-width: 480px) {
          .avatar-wrapper { max-width: 220px !important; }
          .hero-grid { padding: 0 16px !important; }
        }
      `}</style>

    </section>
  )
}

/* ── CTA Button ───────────────────────────────────────────── */
function CTAButton({ children, primary, to, href, id }) {
  const [hovered, setHovered] = useState(false)

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    textDecoration: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 24px',
    transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
    cursor: 'pointer',
    border: 'none',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }

  const styles = primary
    ? {
        ...base,
        background: hovered ? 'var(--accent-hover)' : 'var(--accent)',
        color: '#fff',
        boxShadow: hovered ? '0 8px 24px rgba(201,106,74,0.35)' : '0 4px 12px rgba(201,106,74,0.2)',
      }
    : {
        ...base,
        background: 'transparent',
        color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border-normal)' : 'var(--border-subtle)',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.2)' : 'none',
      }

  if (to) {
    return (
      <Link
        to={to}
        id={id}
        style={styles}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      id={id}
      style={styles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}
