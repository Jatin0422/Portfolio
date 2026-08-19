import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Static ES imports — Vite resolves these at build time, most reliable method
import nexoraImg   from '../../assets/projects/Nexora_card.png'
import retrixImg   from '../../assets/projects/Retrix_card.png'
import rentwiseImg from '../../assets/projects/Rentwise_card.png'

const PROJECT_IMAGES = {
  nexora:   nexoraImg,
  retrix:   retrixImg,
  rentwise: rentwiseImg,
}

/* ── Browser-frame container with real screenshot ─────────── */
function ProjectMockup({ project }) {
  return (
    <div style={{
      width: '100%',
      borderRadius: '12px',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-normal)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,106,74,0.06)',
      overflow: 'hidden',
    }}>
      {/* Browser chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '10px 14px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-raised)',
      }}>
        {['#C96A4A', '#B8AD9D55', '#7A726855'].map((c, i) => (
          <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />
        ))}
        <div style={{
          flex: 1, marginLeft: '8px', height: '16px', borderRadius: '4px',
          background: 'rgba(233,225,212,0.05)', border: '1px solid rgba(233,225,212,0.08)',
          display: 'flex', alignItems: 'center', paddingLeft: '8px', gap: '4px',
        }}>
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <circle cx="4" cy="4" r="3" fill="none" stroke="rgba(122,114,104,0.5)" strokeWidth="1" />
            <path d="M4 2v2l1 1" stroke="rgba(122,114,104,0.5)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '6px', color: 'var(--text-muted)', letterSpacing: '0.04em', fontFamily: 'var(--font-sans)' }}>
            {project.url}
          </span>
        </div>
      </div>

      {/* Screenshot */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={PROJECT_IMAGES[project.id]}
          alt={`${project.title} product screenshot`}
          loading="eager"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          onError={e => { e.currentTarget.style.outline = '2px solid red'; console.error('IMG FAILED:', e.currentTarget.src) }}
        />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, transparent 55%, rgba(14,13,11,0.35) 100%)',
        }} />
      </div>
    </div>
  )
}

/* ── Link button ──────────────────────────────────────────── */
function ProjectLink({ href, children, primary, id }) {
  const [hovered, setHovered] = useState(false)
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontFamily: 'var(--font-sans)', fontSize: '0.8125rem',
    fontWeight: 500, letterSpacing: '0.04em', textDecoration: 'none',
    borderRadius: 'var(--radius-sm)', padding: '9px 18px',
    transition: 'all 0.2s', cursor: 'pointer',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }
  const style = primary
    ? { ...base, background: hovered ? 'var(--accent-hover)' : 'var(--accent)', color: '#fff', boxShadow: hovered ? '0 8px 24px rgba(201,106,74,0.35)' : '0 4px 12px rgba(201,106,74,0.2)' }
    : { ...base, background: 'transparent', color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)', border: '1px solid', borderColor: hovered ? 'var(--border-normal)' : 'var(--border-subtle)', boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.2)' : 'none' }
  return (
    <a href={href} id={id} style={style} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children}
    </a>
  )
}

/* ── Tag ──────────────────────────────────────────────────── */
function Tag({ children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 500,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        padding: '4px 10px', borderRadius: '4px', border: '1px solid',
        borderColor: hovered ? 'rgba(201,106,74,0.35)' : 'var(--border-subtle)',
        color: hovered ? 'var(--accent)' : 'var(--text-muted)',
        background: hovered ? 'rgba(201,106,74,0.06)' : 'transparent',
        transition: 'all 0.2s', cursor: 'default',
      }}
    >{children}</span>
  )
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD — alternating layout:
     even index (0, 2, …): IMAGE LEFT  | TEXT RIGHT
     odd  index (1, 3, …): TEXT LEFT   | IMAGE RIGHT
   Animation replays every viewport entry (once: false).
───────────────────────────────────────────────────────────── */
export default function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0            // 0=Nexora, 2=RentWise → image left
  const cardRef = useRef(null)
  const [cardHovered, setCardHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 85%', 'start 30%'],
  })
  const mockupY = useTransform(scrollYProgress, [0, 1], [-12, 12])

  // Which column each panel sits in
  const imgCol  = isEven ? '1' : '2'
  const textCol = isEven ? '2' : '1'

  // Clip direction: image slides in from left (even) or right (odd)
  const clipFrom = isEven ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'

  // Text slides in from right (even) or left (odd)
  const textX = isEven ? 40 : -40

  return (
    <article
      ref={cardRef}
      aria-label={`Project: ${project.title}`}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
        paddingBottom: '96px',
      }}
      className={`project-card pc-${index}`}
    >
      {/* Ambient hover glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: isEven ? '-5%' : 'auto',
        right: isEven ? 'auto' : '-5%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: `radial-gradient(circle, rgba(201,106,74,${cardHovered ? 0.07 : 0.03}) 0%, transparent 70%)`,
        pointerEvents: 'none', transition: 'background 0.4s', zIndex: 0,
      }} />

      {/* ── Image panel ── */}
      <motion.div
        style={{ y: mockupY, gridColumn: imgCol, gridRow: '1', zIndex: 1 }}
        initial={{ opacity: 0, clipPath: clipFrom }}
        whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0%)' }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
        className="project-visual"
      >
        <ProjectMockup project={project} />
      </motion.div>

      {/* ── Text panel ── */}
      <motion.div
        style={{ gridColumn: textCol, gridRow: '1', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}
        initial={{ opacity: 0, x: textX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        className="project-text"
      >
        {/* Number + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8,
          }}>{project.number}</span>
          <span style={{ width: '24px', height: '1px', background: 'rgba(201,106,74,0.35)' }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{project.category}</span>
        </div>

        <h2 style={{
          margin: 0, fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400,
          lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text-primary)',
        }}>
          {project.title}<span style={{ color: 'var(--accent)' }}>.</span>
        </h2>

        <p style={{
          margin: 0, fontFamily: 'var(--font-sans)', fontSize: '0.875rem',
          fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.02em',
        }}>{project.tagline}</p>

        {/* Accent line */}
        <motion.div
          style={{ height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', transformOrigin: 'left', maxWidth: '200px' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        />

        <p style={{
          margin: 0, fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.9rem, 1.3vw, 0.975rem)', lineHeight: 1.75,
          color: 'var(--text-secondary)', maxWidth: '420px',
        }}>{project.description}</p>

        {/* Tags */}
        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
        >
          {project.tags.map(tag => (
            <motion.span key={tag}
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] } } }}
            >
              <Tag>{tag}</Tag>
            </motion.span>
          ))}
        </motion.div>

        {/* Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
          {project.links.map((link, i) => (
            <ProjectLink
              key={link.label} href={link.href} primary={i === 0}
              id={`project-${project.id}-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label} {link.icon}
            </ProjectLink>
          ))}
        </div>
      </motion.div>

      {/* Mobile reflow */}
      <style>{`
        @media (max-width: 860px) {
          .pc-${index} {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .pc-${index} .project-visual,
          .pc-${index} .project-text { grid-column: 1 !important; }
          .pc-${index} .project-visual { grid-row: 1 !important; }
          .pc-${index} .project-text  { grid-row: 2 !important; }
          .pc-${index} .project-text p { max-width: 100% !important; }
        }
      `}</style>
    </article>
  )
}
