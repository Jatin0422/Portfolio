import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '../motion/Reveal'

export default function AboutVisual() {
  const containerRef = useRef(null)
  
  // Link scroll progress of this specific component to the path drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  })

  // We want the lines to draw at slightly different scroll rates for an organic feel
  const path1 = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const path2 = useTransform(scrollYProgress, [0.1, 0.8], [0, 1])
  const path3 = useTransform(scrollYProgress, [0.2, 0.9], [0, 1])
  const opacityFade = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])

  return (
    <Reveal className="h-full">
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '100%',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-normal)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {/* Background dot grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(233,225,212,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: 'center center',
            pointerEvents: 'none',
          }}
        />
        {/* Soft gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(23,21,19,0.3) 0%, rgba(201,106,74,0.04) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', width: '100%', maxWidth: '360px', aspectRatio: '1', margin: '0 auto' }}>
          <svg
            viewBox="0 0 400 400"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
            aria-hidden="true"
          >
            {/* Orbital rings */}
            <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(233,225,212,0.06)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(201,106,74,0.15)" strokeWidth="1" />

            {/* Scroll-driven drawing paths */}
            <motion.path
              d="M 200,200 L 101,101"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              style={{ pathLength: path1 }}
            />
            <motion.path
              d="M 200,200 L 299,101"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              style={{ pathLength: path2 }}
            />
            <motion.path
              d="M 200,200 L 200,340"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              style={{ pathLength: path3 }}
            />

            {/* Nodes */}
            {/* Center */}
            <circle cx="200" cy="200" r="6" fill="var(--bg-base)" stroke="var(--accent)" strokeWidth="2" />
            
            {/* Nodes corresponding to lines */}
            <motion.g transform="translate(101,101)" style={{ opacity: path1 }}>
              <circle cx="0" cy="0" r="5" fill="var(--accent)" />
              <text x="-12" y="-12" fill="var(--text-primary)" fontSize="12" fontFamily="var(--font-sans)" textAnchor="end" letterSpacing="0.05em">SOFTWARE</text>
              <text x="-12" y="4" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-sans)" textAnchor="end">Systems & Architecture</text>
            </motion.g>

            <motion.g transform="translate(299,101)" style={{ opacity: path2 }}>
              <circle cx="0" cy="0" r="5" fill="var(--accent)" />
              <text x="12" y="-12" fill="var(--text-primary)" fontSize="12" fontFamily="var(--font-sans)" textAnchor="start" letterSpacing="0.05em">DATA + ML</text>
              <text x="12" y="4" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-sans)" textAnchor="start">Pipelines & Models</text>
            </motion.g>

            <motion.g transform="translate(200,340)" style={{ opacity: path3 }}>
              <circle cx="0" cy="0" r="6" fill="var(--text-primary)" />
              <text x="0" y="24" fill="var(--text-primary)" fontSize="13" fontFamily="var(--font-sans)" textAnchor="middle" letterSpacing="0.05em" fontWeight="500">REAL-WORLD PROBLEMS</text>
            </motion.g>
            
            {/* Pulsing glow at center */}
            <motion.circle 
              cx="200" 
              cy="200" 
              r="20" 
              fill="var(--accent)" 
              opacity="0.1" 
              style={{ opacity: opacityFade }}
              animate={{ r: [20, 24, 20], opacity: [0.1, 0.2, 0.1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />

          </svg>
        </div>
      </div>
    </Reveal>
  )
}
