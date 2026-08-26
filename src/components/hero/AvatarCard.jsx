export default function AvatarCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '360px', margin: '0 auto' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '12% 4% 4%', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,106,74,0.16), transparent 68%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />
      <img
        className="anim-float"
        src="/images/hero/avatar.png"
        alt="Jatin"
        style={{ position: 'relative', display: 'block', width: '100%', height: 'auto', animation: 'floatY 5.5s ease-in-out infinite' }}
      />
    </div>
  )
}
