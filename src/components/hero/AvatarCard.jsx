export default function AvatarCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '560px', margin: '0 auto' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '14% 6% 8%', borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(201,106,74,0.2), transparent 68%)', filter: 'blur(24px)',
      }} />
      {[['-4%', '9%', '38s'], ['6%', '16%', '28s']].map(([inset, radius, duration], i) => (
        <div key={inset} className={i ? 'anim-orbit-r' : 'anim-orbit'} aria-hidden="true" style={{
          position: 'absolute', inset, border: '1px solid rgba(233,225,212,0.08)', borderRadius: '50%',
          transform: `rotate(${i ? 26 : -17}deg)`, animation: `${i ? 'orbitSpinReverse' : 'orbitSpin'} ${duration} linear infinite`, pointerEvents: 'none',
        }} />
      ))}
      {[[12, 22], [83, 28], [18, 68], [79, 72], [52, 8]].map(([left, top]) => (
        <span key={`${left}-${top}`} aria-hidden="true" style={{
          position: 'absolute', left: `${left}%`, top: `${top}%`, width: '3px', height: '3px', borderRadius: '50%',
          background: 'rgba(201,106,74,0.72)', boxShadow: '0 0 7px rgba(201,106,74,0.42)', pointerEvents: 'none',
        }} />
      ))}
      <div aria-hidden="true" style={{
        position: 'absolute', left: '8%', right: '8%', bottom: '2%', height: '11%', borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(201,106,74,0.2), rgba(201,106,74,0.03) 50%, transparent 72%)', filter: 'blur(8px)',
        border: '1px solid rgba(201,106,74,0.16)',
      }} />
      <img className="anim-float" src="/images/hero/avatar.png" alt="Jatin" style={{
        position: 'relative', display: 'block', width: '100%', height: 'auto', animation: 'floatY 5.5s ease-in-out infinite',
        filter: 'drop-shadow(0 20px 28px rgba(0,0,0,0.38))',
      }} />
    </div>
  )
}
