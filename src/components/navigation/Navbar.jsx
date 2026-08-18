import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',       href: '/'           },
  { label: 'About',      href: '/about'       },
  { label: 'Projects',   href: '/projects'    },
  { label: 'Experience', href: '/experience'  },
  { label: 'Contact',    href: '/contact'     },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(23,21,19,0.88)' : 'rgba(23,21,19,0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <nav
        aria-label="Primary navigation"
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Jatin – home"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          JATIN<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul
          role="list"
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href
            return (
              <li key={label}>
                <NavLink href={href} active={active}>{label}</NavLink>
              </li>
            )
          })}
        </ul>

        {/* Resume CTA */}
        <ResumeBtn className="nav-resume-btn" />

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--text-primary)',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: 'currentColor',
                transition: 'transform 0.3s, opacity 0.3s',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '320px' : '0',
          transition: 'max-height 0.35s var(--ease-out-expo)',
          background: 'var(--bg-base)',
          borderTop: menuOpen ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <ul role="list" style={{ listStyle: 'none', margin: 0, padding: '8px 24px 20px' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <Link
                to={href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  color: pathname === href ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
          <li style={{ paddingTop: '16px' }}>
            <ResumeBtn tabIndex={menuOpen ? 0 : -1} />
          </li>
        </ul>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-resume-btn    { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */

function NavLink({ href, active, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={href}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: active || hovered ? (active ? 'var(--accent)' : 'var(--text-primary)') : 'var(--text-secondary)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  )
}

function ResumeBtn({ className, tabIndex }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="/resume"
      className={className}
      tabIndex={tabIndex}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hovered ? 'var(--bg-base)' : 'var(--accent)',
        background: hovered ? 'var(--accent)' : 'transparent',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--radius-sm)',
        padding: '6px 16px',
        transition: 'background 0.2s, color 0.2s',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Resume ↗
    </a>
  )
}
