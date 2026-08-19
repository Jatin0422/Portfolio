import { useEffect, useRef } from 'react'

const EVENTS = [
  ['2023', 'Where It All Started', 'Started an E-Commerce Business', 'Stepping into e-commerce taught me far more than selling products. Managing the business from the ground up sharpened my communication, decision-making, problem-solving, and understanding of how real-world businesses operate.'],
  ['2024', 'Building the Foundation', 'Started B.Tech in Computer Science', 'I began my B.Tech in Computer Science & Engineering at LJ University, building a stronger technical foundation across programming, databases, data structures, and the fundamentals of software development.'],
  ['2025', 'From Learning to Building', 'Started Full-Stack Development', 'I began turning programming knowledge into working applications, exploring frontend, backend, databases, APIs, and the systems that connect them into something people can actually use.'],
  ['2026', 'Expanding the Stack', 'Deepened Full-Stack & Entered Machine Learning', 'With a stronger grasp of full-stack engineering, I began pushing beyond conventional application development and into machine learning — working with data, models, forecasting, and intelligent systems.'],
  ['2026', 'Building Things That Matter', 'Major Projects & Applied Engineering', 'I brought these skills together through larger, end-to-end projects, combining software engineering, data, and machine learning to turn real problems into practical, deployable solutions.'],
]
const POINTS = [[13.5,11],[14.5,25],[14.5,45],[15.5,65],[16.5,85],[17.5,115],[17.5,145],[16.5,175],[15,215],[15,255],[15.5,295],[16.5,335],[18,345],[19,365],[22,390],[19,405],[23.5,430],[19,455],[23,470],[21.5,495],[19.5,530],[18,565],[19.5,595],[21,630],[20.5,665],[21.5,700],[20.5,750],[20,790],[20.5,835],[21,875],[20,910],[19,940],[19,970],[20,1000],[21,1035]]
const PATH_HEIGHT = 1035

function NodeWeb() { return <svg className="experience-node-web" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="#eee9df" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round"><path d="M50 50C49 37 51 22 50 4"/><path d="M50 50C60 39 72 27 88 15"/><path d="M50 50C63 49 79 50 96 50"/><path d="M50 50C61 60 75 72 88 85"/><path d="M50 50C50 64 51 79 50 96"/><path d="M50 50C39 61 27 73 13 86"/><path d="M50 50C37 50 21 50 4 50"/><path d="M50 50C40 39 27 28 12 15"/><path d="M37 38C43 33 53 32 61 37C68 42 68 51 63 58C57 66 46 68 38 63C31 59 30 49 34 42C35 40 36 39 37 38Z"/><path d="M27 29C39 20 58 20 71 29C83 38 84 54 76 67C67 81 47 84 32 76C19 69 15 53 20 40C22 35 24 32 27 29Z"/><path d="M17 20C34 8 59 8 78 20C94 31 97 52 89 69C80 89 58 97 37 90C17 83 5 65 10 44C11 34 13 26 17 20Z"/></g></svg> }

export default function ExperienceSection() {
  const timelineRef = useRef(null)
  useEffect(() => {
    const timeline = timelineRef.current, spider = timeline.querySelector('.experience-spider'), thread = timeline.querySelector('.experience-thread')
    const nodes = [...timeline.querySelectorAll('.experience-node')], events = [...timeline.querySelectorAll('.experience-event')]
    const update = () => {
      const rect = timeline.getBoundingClientRect(), y = Math.min(PATH_HEIGHT, Math.max(0, -rect.top / Math.max(1, timeline.offsetHeight - window.innerHeight * .25)) * PATH_HEIGHT)
      thread.style.clipPath = `inset(0 0 ${PATH_HEIGHT - y}px 0)`
      spider.style.top = `${y - 4}px`
      nodes.forEach(node => node.classList.toggle('is-filled', y >= Number(node.dataset.y)))
      events.forEach(event => { const r = event.getBoundingClientRect(); event.classList.toggle('is-visible', r.top < window.innerHeight * .72 && r.bottom > window.innerHeight * .08) })
    }
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return <section className="experience-page" aria-labelledby="experience-heading"><div className="experience-wrap">
    <header className="experience-hero"><div><span className="experience-label">05 · Experience</span><h1 id="experience-heading">The path so far.</h1><p>A journey from business ownership to software development and toward applied machine learning — shaped by building things, solving problems and continuously learning.</p></div></header>
    <div className="experience-intro"><h2>Not a straight line.</h2><p>Each stage added another layer — from understanding how businesses operate to building software and exploring applied machine learning.</p></div>
    <div className="experience-timeline" ref={timelineRef}><div className="experience-base-line" aria-hidden="true"/><div className="experience-thread" aria-hidden="true"><img src="/images/experience/thread.png" alt=""/></div><div className="experience-spider" aria-hidden="true"><img src="/images/experience/spider.png" alt=""/></div>
      {EVENTS.map(([year, heading, title, description], i) => { const y = 95 + i * 220; return <article className="experience-event" style={{ top: y }} key={heading}><div className="experience-main"><h3>{heading}</h3><div>{title}</div></div><div className="experience-year">{year}</div><p>{description}</p></article> })}
      {EVENTS.map(([, heading], i) => <div className="experience-node" data-y={95 + i * 220} style={{ top: 95 + i * 220 }} key={heading}><NodeWeb/></div>)}
    </div>
    <footer className="experience-closing"><span className="experience-label">Continuing</span><h2>Still building.</h2><p>The next milestone hasn't been written yet.</p></footer>
  </div></section>
}
