import { useReveal } from '../../hooks/useReveal'
import { useState, useRef, useEffect } from 'react'

const STACK = [
  {
    area: 'Full-stack',
    items: ['React', 'Django', 'REST APIs', 'PostgreSQL', 'JavaScript / Python'],
  },
  {
    area: 'Applied ML',
    items: ['Model training', 'Scikit-learn', 'Feature engineering', 'Evaluation pipelines'],
  },
  {
    area: 'Data & Forecasting',
    items: ['Pandas', 'NumPy', 'Time-series', 'Data pipelines'],
  },
  {
    area: 'System Design',
    items: ['API architecture', 'Data modelling', 'Auth & security', 'Deployment'],
  },
  {
    area: 'Tooling',
    items: ['Git', 'Linux', 'Docker', 'VS Code'],
  },
]

export default function AboutStack() {
  const ref = useReveal(0.1)
  const [activeIdx, setActiveIdx] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef([])

  useEffect(() => {
    const currentTab = tabsRef.current[activeIdx]
    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      })
    }
  }, [activeIdx])

  const activeContent = STACK[activeIdx]

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-normal)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 32px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background flare */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,106,74,0.035) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '24px',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        paddingBottom: '12px',
      }}>
        {STACK.map(({ area }, idx) => (
          <button
            key={area}
            ref={el => tabsRef.current[idx] = el}
            onClick={() => setActiveIdx(idx)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 4px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: activeIdx === idx ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'color 0.3s',
            }}
          >
            {area}
          </button>
        ))}
        {/* Animated indicator */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          height: '2px',
          background: 'var(--accent)',
          borderRadius: '2px 2px 0 0',
          transition: 'left 0.4s var(--ease-spring), width 0.4s var(--ease-spring)',
          ...indicatorStyle,
        }} />
      </div>

      {/* Content */}
      <div style={{ marginTop: '32px', minHeight: '120px' }}>
        <ul
          key={activeContent.area}
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            animation: 'fadeSlideUp 0.5s var(--ease-out-expo) forwards',
          }}
        >
          {activeContent.items.map(item => (
            <li
              key={item}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                opacity: 0.8,
                flexShrink: 0,
              }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
