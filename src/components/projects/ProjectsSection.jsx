import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const PROJECTS = [
  {
    id: 'nexora',
    number: '01',
    category: 'Migration Intelligence',
    title: 'Nexora',
    tagline: 'Where people move and why — mapped, modelled, and made useful.',
    description:
      'Full-stack platform that ingests multi-source migration data, runs ML demand-prediction models, and surfaces actionable route analytics via an interactive dashboard. Built for analysts who need real answers, not raw spreadsheets.',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'scikit-learn', 'Celery', 'Redis'],
    url: 'nexora.app',
    links: [
      { label: 'Case Study', href: '#', icon: '→' },
      { label: 'GitHub', href: 'https://github.com/Jatin0422', icon: '↗' },
    ],
  },
  {
    id: 'retrix',
    number: '02',
    category: 'Return Intelligence',
    title: 'Retrix',
    tagline: 'Predict returns before they happen. Reduce them before they cost you.',
    description:
      'E-commerce return-prediction engine that classifies high-risk orders using purchase history, product signals, and customer behaviour. Integrates as a lightweight API layer over existing order management systems.',
    tags: ['Python', 'XGBoost', 'Flask', 'Next.js', 'MongoDB', 'Pandas', 'Docker'],
    url: 'retrix.io',
    links: [
      { label: 'Case Study', href: '#', icon: '→' },
      { label: 'GitHub', href: 'https://github.com/Jatin0422', icon: '↗' },
    ],
  },
  {
    id: 'rentwise',
    number: '03',
    category: 'Housing Intelligence',
    title: 'RentWise',
    tagline: 'Search for a home like you actually know the market.',
    description:
      'AI-powered rental search that combines fair-price scoring, neighbourhood similarity matching, and natural-language filtering. Lets renters cut through listing noise and find genuinely good-value homes.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI', 'Mapbox', 'Prisma'],
    url: 'rentwise.in',
    links: [
      { label: 'Live Demo', href: '#', icon: '↗' },
      { label: 'GitHub', href: 'https://github.com/Jatin0422', icon: '↗' },
    ],
  },
]

/* ── Section label ──────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
    }}>
      <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'var(--accent)', borderRadius: '1px' }} />
      {children}
    </span>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-list-heading"
      style={{
        position: 'relative',
        zIndex: 1,
        paddingTop: '40px',
        paddingBottom: '120px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <SectionLabel>Selected work</SectionLabel>
          <h2
            id="projects-list-heading"
            style={{
              margin: '14px 0 0',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            Three products. Three problems{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>solved.</em>
          </h2>
          {/* Accent divider */}
          <motion.div
            style={{ marginTop: '16px', height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', maxWidth: '240px', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          />
        </motion.div>

        {/* Project cards */}
        <div style={{ position: 'relative' }}>
          {/* Faint vertical track line */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: 0, bottom: 0, left: '50%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,106,74,0.08), transparent)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginTop: '24px' }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            More on GitHub — or reach out if you want to talk through the details.
          </p>
          <a
            id="projects-github-cta"
            href="https://github.com/Jatin0422"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500,
              letterSpacing: '0.04em', textDecoration: 'none', borderRadius: 'var(--radius-sm)',
              padding: '12px 28px',
              background: 'transparent', color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,106,74,0.3)'
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View all on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
