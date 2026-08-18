import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, StaggerContainer, StaggerItem } from '../motion/Reveal'

const TRAITS = [
  {
    label: 'Builder',
    desc: 'I default to making things. Reading, sketching, and discussing are useful — but the real thinking happens when I start writing code.',
    icon: '⬡',
  },
  {
    label: 'Practical',
    desc: 'Software that works in production is the standard. I care about correctness, clarity, and shipping things that hold up.',
    icon: '◈',
  },
  {
    label: 'Curious',
    desc: 'I move across the stack — front-end, back-end, ML — not out of indecision but because the interesting problems are rarely confined to one layer.',
    icon: '◎',
  },
  {
    label: 'Detail-driven',
    desc: 'Most bugs live in the gap between what you intended and what you wrote. I try to close that gap as early as possible.',
    icon: '◇',
  },
]

function TraitItem({ label, desc, icon, isLast, progress }) {
  // Use scroll progress for the connecting line
  const scaleY = useTransform(progress, [0, 1], [0, 1])

  return (
    <StaggerItem className="flex gap-8 relative" style={{ display: 'flex', gap: '32px', position: 'relative' }}>
      {/* Timeline line and icon */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-normal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          fontSize: '0.9rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {icon}
        </div>
        {!isLast && (
          <div style={{
            flex: 1,
            width: '2px',
            background: 'var(--border-subtle)',
            marginTop: '8px',
            marginBottom: '8px',
            minHeight: '60px',
            position: 'relative',
          }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, var(--accent) 0%, transparent 100%)',
                transformOrigin: 'top center',
                scaleY
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? '0' : '48px', paddingTop: '4px' }}>
        <h3 style={{
          margin: '0 0 12px',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
        }}>
          {label}
        </h3>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          maxWidth: '540px',
        }}>
          {desc}
        </p>
      </div>
    </StaggerItem>
  )
}

export default function AboutTraits() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <StaggerContainer
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '16px',
      }}
    >
      <div ref={containerRef}>
        {TRAITS.map((trait, i) => {
          // Calculate an individual progress window for each line segment
          const segmentStart = i / TRAITS.length
          const segmentEnd = (i + 1) / TRAITS.length
          
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const segmentProgress = useTransform(scrollYProgress, [segmentStart, segmentEnd], [0, 1])

          return (
            <TraitItem 
              key={trait.label} 
              {...trait} 
              isLast={i === TRAITS.length - 1} 
              progress={segmentProgress}
            />
          )
        })}
      </div>
    </StaggerContainer>
  )
}
