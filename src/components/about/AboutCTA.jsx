import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

const EXPLORING = [
  'LLM applications',
  'Production engineering',
  'Django APIs at scale',
  'Applied ML pipelines',
  'System design patterns',
]

export default function AboutCTA() {
  const ref = useReveal(0.15)
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref} className="reveal" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '24px',
      alignItems: 'stretch'
    }}>
      {/* Currently exploring panel */}
      <div style={{
        background: 'var(--bg-base)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '24px',
        }}>
          Currently exploring
        </p>
        <div ref={useReveal(0.1)} className="reveal-stagger" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          {EXPLORING.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-normal)',
                borderRadius: '100px',
                padding: '8px 18px',
                letterSpacing: '0.02em',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-normal)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Projects CTA panel */}
      <div style={{
        position: 'relative',
        padding: '40px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-normal)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
      }}>
        {/* Ambient glow */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          right: '-80px',
          top: '-80px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,106,74,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div>
          <p style={{
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}>
            What I've built
          </p>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--text-primary)',
          }}>
            See the work in context.
          </h3>
        </div>
        
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: '0.95rem',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          maxWidth: '460px',
        }}>
          Projects are where the ideas land. Some are tools I needed, some are experiments in applying ML to real data, and some exist just because I was curious.
        </p>

        <div style={{ marginTop: '12px' }}>
          <Link
            to="/projects"
            id="about-cta-projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 28px',
              background: hovered ? 'var(--accent-hover)' : 'var(--accent)',
              color: '#fff',
              boxShadow: hovered ? '0 8px 24px rgba(201,106,74,0.35)' : '0 4px 12px rgba(201,106,74,0.2)',
              transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            View Projects ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
