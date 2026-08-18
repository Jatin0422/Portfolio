/**
 * AvatarCard — polished placeholder for a future digital avatar.
 * The inner .avatar-slot is easy to replace: swap the placeholder JSX
 * for a real <img> or canvas element when the avatar is ready.
 */
export default function AvatarCard() {
  return (
    <div
      aria-label="Avatar placeholder – will display digital avatar"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '340px',
        aspectRatio: '3 / 4',
        margin: '0 auto',
      }}
    >
      {/* Outer orbit ring — decorative */}
      <div
        className="anim-orbit"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-28px',
          borderRadius: '50%',
          border: '1px dashed rgba(201,106,74,0.20)',
          animation: 'orbitSpin 22s linear infinite',
        }}
      >
        {/* orbit dot */}
        <span style={{
          position: 'absolute',
          top: '12%',
          right: '-4px',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 8px 2px rgba(201,106,74,0.5)',
          animation: 'pulseGlow 2.4s ease-in-out infinite',
        }} />
      </div>

      {/* Inner orbit ring */}
      <div
        className="anim-orbit-r"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-56px',
          borderRadius: '50%',
          border: '1px solid rgba(233,225,212,0.06)',
          animation: 'orbitSpinReverse 38s linear infinite',
        }}
      >
        <span style={{
          position: 'absolute',
          bottom: '18%',
          left: '-3px',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: 'rgba(233,225,212,0.35)',
        }} />
      </div>

      {/* Card body */}
      <div
        className="anim-float"
        style={{
          position: 'relative',
          height: '100%',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-normal)',
          boxShadow: [
            '0 0 0 1px rgba(201,106,74,0.08)',
            '0 24px 64px rgba(0,0,0,0.45)',
            '0 0 60px rgba(201,106,74,0.06) inset',
          ].join(', '),
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'floatY 5.5s ease-in-out infinite',
        }}
      >
        {/* Top bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '14px 16px 12px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          {['#C96A4A', '#B8AD9D', '#7A7268'].map((c, i) => (
            <span key={i} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: c, opacity: i === 0 ? 0.9 : 0.5,
            }} />
          ))}
          <span style={{
            marginLeft: '6px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            avatar.render
          </span>
        </div>

        {/* Avatar slot — replace this block with <img> or canvas */}
        <div
          className="avatar-slot"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '24px',
            position: 'relative',
          }}
        >
          {/* Soft radial glow behind slot */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(201,106,74,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Circle placeholder silhouette */}
          <div style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, var(--bg-raised) 0%, var(--bg-surface) 100%)',
            border: '1px solid var(--border-normal)',
            boxShadow: '0 0 24px rgba(201,106,74,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Person silhouette via CSS */}
            <svg
              width="48" height="56"
              viewBox="0 0 48 56"
              fill="none"
              aria-hidden="true"
              style={{ opacity: 0.25 }}
            >
              <circle cx="24" cy="16" r="12" fill="var(--text-primary)" />
              <path
                d="M0 56c0-13.255 10.745-24 24-24s24 10.745 24 24"
                fill="var(--text-primary)"
              />
            </svg>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              Digital Avatar
            </p>
            <p style={{
              margin: '4px 0 0',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              color: 'rgba(122,114,104,0.7)',
              letterSpacing: '0.04em',
            }}>
              Coming soon
            </p>
          </div>
        </div>

        {/* Bottom metadata strip */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
          }}>
            JATIN
          </span>
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 6px var(--accent)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </div>
  )
}
