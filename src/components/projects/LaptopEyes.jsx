import { useEffect, useRef, useState, useCallback } from 'react'

/* ── tiny activity-graph bars ─────────────────────────────── */
const BARS = [3, 6, 4, 8, 5, 9, 6, 4, 7, 5, 8, 3, 6, 9, 5, 7, 4, 8, 6, 9]

export default function LaptopEyes() {
  const containerRef = useRef(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })        // −1..1 range
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 })   // px relative to container
  const [spotVisible, setSpotVisible] = useState(false)
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  /* cursor tracking ─ smooth lerp via rAF */
  const lerp = (a, b, t) => a + (b - a) * t

  const animate = useCallback(() => {
    const dx = targetRef.current.x - currentRef.current.x
    const dy = targetRef.current.y - currentRef.current.y
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      currentRef.current.x += dx * 0.08
      currentRef.current.y += dy * 0.08
      setPupil({ x: currentRef.current.x, y: currentRef.current.y })
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  const onMouseMove = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // normalise to −1..1
    targetRef.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width * 0.4)))
    targetRef.current.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height * 0.4)))

    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  /* touch fallback — idle drift */
  useEffect(() => {
    let t = 0
    const idle = setInterval(() => {
      if (document.hidden) return
      t += 0.02
      const x = Math.sin(t * 0.7) * 0.3
      const y = Math.cos(t * 0.5) * 0.2
      targetRef.current.x = x
      targetRef.current.y = y
    }, 50)
    return () => clearInterval(idle)
  }, [])

  /* pupil offset in px — max travel radius 5.5px */
  const px = pupil.x * 5.5
  const py = pupil.y * 5.5

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setSpotVisible(true)}
      onMouseLeave={() => setSpotVisible(false)}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        userSelect: 'none',
      }}
    >
      {/* ── cursor-following spotlight ──────────────────────── */}
      {spotVisible && (
        <div style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          left: spotPos.x,
          top: spotPos.y,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(201,106,74,0.12) 0%, transparent 60%)',
          zIndex: 20,
          transition: 'opacity 0.3s',
        }} />
      )}

      {/* ── floating laptop wrapper ─────────────────────────── */}
      <div style={{
        animation: 'floatY 5.5s ease-in-out infinite',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Laptop body */}
        <div style={{
          position: 'relative',
          borderRadius: '16px 16px 6px 6px',
          background: 'linear-gradient(160deg, #2c2825 0%, #1d1b18 100%)',
          border: '1px solid rgba(233,225,212,0.1)',
          boxShadow: [
            '0 32px 80px rgba(0,0,0,0.6)',
            '0 0 0 1px rgba(201,106,74,0.08)',
            '0 -1px 0 0 rgba(233,225,212,0.12) inset',
          ].join(', '),
          padding: '10px 10px 0',
          overflow: 'hidden',
        }}>

          {/* ── Screen bezel ── */}
          <div style={{
            position: 'relative',
            borderRadius: '10px 10px 0 0',
            background: '#0e0d0b',
            overflow: 'hidden',
            aspectRatio: '16/10',
          }}>

            {/* ─ All background layers: blueprint + dots + contour + grain ─ */}
            {/* Blueprint horizontal lines */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(70,130,180,0.04) 0px, rgba(70,130,180,0.04) 1px, transparent 1px, transparent 18px)',
              zIndex: 0,
            }} />
            {/* Blueprint vertical lines */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(70,130,180,0.04) 0px, rgba(70,130,180,0.04) 1px, transparent 1px, transparent 18px)',
              zIndex: 0,
            }} />
            {/* Technical dots */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(233,225,212,0.05) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              zIndex: 0,
            }} />
            {/* Contour ellipses (SVG) */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.06 }} aria-hidden="true">
              <ellipse cx="50%" cy="50%" rx="38%" ry="28%" fill="none" stroke="rgba(201,106,74,0.6)" strokeWidth="1" strokeDasharray="2 4" />
              <ellipse cx="50%" cy="50%" rx="55%" ry="42%" fill="none" stroke="rgba(233,225,212,0.3)" strokeWidth="1" strokeDasharray="2 4" />
              <ellipse cx="50%" cy="50%" rx="22%" ry="15%" fill="none" stroke="rgba(201,106,74,0.5)" strokeWidth="0.5" strokeDasharray="2 4" />
            </svg>
            {/* Noise/grain */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
              opacity: 0.025, zIndex: 0,
            }} />

            {/* ─ Technical portfolio UI (30% opacity, secondary) ─ */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              opacity: 0.3,
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              fontFamily: 'var(--font-sans)',
            }}>
              {/* Nav bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(233,225,212,0.12)', paddingBottom: '5px' }}>
                <span style={{ fontSize: '7px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.1em' }}>
                  JATIN<span style={{ color: 'var(--accent)' }}>.</span>
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Projects', 'About', 'Contact'].map(l => (
                    <span key={l} style={{ fontSize: '5px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</span>
                  ))}
                </div>
              </div>

              {/* Headline */}
              <div style={{ paddingTop: '4px' }}>
                <div style={{ fontSize: '9px', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', letterSpacing: '0.01em', lineHeight: 1.2 }}>
                  Selected work.
                </div>
              </div>

              {/* Activity graph */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px', height: '16px', marginTop: '2px' }}>
                {BARS.map((h, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: `${h * 6}%`,
                    minHeight: '2px',
                    background: i % 3 === 0
                      ? 'var(--accent)'
                      : 'rgba(233,225,212,0.2)',
                    borderRadius: '1px',
                  }} />
                ))}
              </div>

              {/* Status rows */}
              <div style={{ marginTop: '3px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  { label: 'SYSTEM', ok: true },
                  { label: 'PROJECTS', ok: true },
                  { label: 'ML MODELS', ok: false },
                ].map(({ label, ok }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: ok ? '#5CB85C' : 'var(--accent)' }} />
                    <span style={{ fontSize: '4px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* ML pipeline diagram */}
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px', flexWrap: 'nowrap' }}>
                {['INPUT', '→', 'ML', '→', 'OUTPUT'].map((t, i) => (
                  <span key={i} style={{
                    fontSize: '4px',
                    color: t === '→' ? 'rgba(233,225,212,0.3)' : 'var(--text-muted)',
                    background: t === '→' ? 'transparent' : 'rgba(233,225,212,0.05)',
                    padding: t === '→' ? '0' : '1px 3px',
                    borderRadius: '2px',
                    border: t === '→' ? 'none' : '1px solid rgba(233,225,212,0.08)',
                    letterSpacing: '0.08em',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* ─ Scanline overlay ─ */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)',
            }} />

            {/* ─ Eyes ─ */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '22%',
              zIndex: 15,
            }}>
              <Eye px={px} py={py} id="eye-left" />
              <Eye px={px} py={py} id="eye-right" />
            </div>

            {/* Screen vignette */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12,
              background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
            }} />
          </div>

          {/* ── Hinge strip ── */}
          <div style={{
            height: '4px',
            background: 'linear-gradient(180deg, #1a1816 0%, #111010 100%)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }} />
        </div>

        {/* ── Base / trackpad ── */}
        <div style={{
          position: 'relative',
          height: '14px',
          background: 'linear-gradient(180deg, #252220 0%, #1a1816 100%)',
          borderRadius: '0 0 10px 10px',
          border: '1px solid rgba(233,225,212,0.07)',
          borderTop: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '40px', height: '4px',
            borderRadius: '2px',
            background: 'rgba(233,225,212,0.06)',
            border: '1px solid rgba(233,225,212,0.1)',
          }} />
        </div>

        {/* Ground shadow */}
        <div style={{
          position: 'absolute',
          bottom: '-18px',
          left: '10%',
          right: '10%',
          height: '18px',
          background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(0,0,0,0.5) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: -1,
        }} />
      </div>

      {/* Ambient ember glow behind laptop */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '280px', height: '280px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,106,74,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'pulseGlow 4s ease-in-out infinite',
      }} />
    </div>
  )
}

/* ── Single Eye ────────────────────────────────────────────── */
function Eye({ px, py, id }) {
  return (
    <div
      id={id}
      style={{
        position: 'relative',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 35%, #2a1f1a 0%, #0e0b08 100%)',
        border: '2px solid rgba(201,106,74,0.5)',
        boxShadow: [
          '0 0 0 1px rgba(201,106,74,0.2)',
          '0 0 12px rgba(201,106,74,0.4)',
          '0 0 28px rgba(201,106,74,0.2)',
          'inset 0 1px 0 rgba(255,255,255,0.08)',
          'inset 0 0 16px rgba(0,0,0,0.6)',
        ].join(', '),
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Iris ring */}
      <div style={{
        position: 'absolute',
        inset: '6px',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, rgba(201,106,74,0.25), rgba(180,90,60,0.1), rgba(201,106,74,0.3), rgba(160,80,50,0.15), rgba(201,106,74,0.25))',
        border: '1px solid rgba(201,106,74,0.3)',
      }} />

      {/* Iris texture stripes */}
      {[0, 30, 60, 90, 120, 150].map(angle => (
        <div key={angle} style={{
          position: 'absolute',
          inset: '7px',
          borderRadius: '50%',
          border: '1px solid rgba(201,106,74,0.08)',
          transform: `rotate(${angle}deg)`,
        }} />
      ))}

      {/* Pupil — cursor-tracked */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #2d1a12, #0a0705)',
        border: '1px solid rgba(201,106,74,0.2)',
        transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
        transition: 'transform 0.05s linear',
        boxShadow: '0 0 6px rgba(0,0,0,0.8)',
      }}>
        {/* Pupil highlight */}
        <div style={{
          position: 'absolute',
          top: '18%', left: '22%',
          width: '5px', height: '5px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          filter: 'blur(0.5px)',
        }} />
        {/* Secondary micro-highlight */}
        <div style={{
          position: 'absolute',
          bottom: '20%', right: '20%',
          width: '2px', height: '2px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.3)',
        }} />
      </div>

      {/* Corneal highlight arc */}
      <div style={{
        position: 'absolute',
        top: '4px', left: '8px',
        width: '24px', height: '10px',
        borderRadius: '50%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
        transform: 'rotate(-15deg)',
        pointerEvents: 'none',
      }} />

      {/* Ember glow core (center) */}
      <div style={{
        position: 'absolute',
        inset: '10px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,106,74,0.15) 0%, transparent 70%)',
        animation: 'pulseGlow 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Optical detail ring */}
      <div style={{
        position: 'absolute',
        inset: '3px',
        borderRadius: '50%',
        border: '1px dashed rgba(201,106,74,0.12)',
        pointerEvents: 'none',
      }} />

      {/* Scanline overlay on eye */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
    </div>
  )
}
