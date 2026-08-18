export default function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: '36px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.5,
      }}
    >
      {/* Scroll label */}
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.6rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        scroll
      </span>

      {/* Animated mouse */}
      <div style={{
        width: '22px',
        height: '34px',
        borderRadius: '11px',
        border: '1.5px solid rgba(233,225,212,0.2)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '6px',
      }}>
        <span style={{
          width: '3px',
          height: '7px',
          borderRadius: '2px',
          background: 'var(--accent)',
          animation: 'scrollBounce 1.6s ease-in-out infinite',
          display: 'block',
        }} />
      </div>
    </div>
  )
}
