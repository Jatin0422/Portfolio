import { useEffect, useRef } from 'react'

const EVENTS = [
  ['2023', 'Where It All Started', 'Started an E-Commerce Business', 'Stepping into e-commerce taught me far more than selling products. Managing the business from the ground up sharpened my communication, decision-making, problem-solving, and understanding of how real-world businesses operate.'],
  ['2024', 'Building the Foundation', 'Started B.Tech in Computer Science', 'I began my B.Tech in Computer Science & Engineering at LJ University, building a stronger technical foundation across programming, databases, data structures, and the fundamentals of software development.'],
  ['2025', 'From Learning to Building', 'Started Full-Stack Development', 'I began turning programming knowledge into working applications, exploring frontend, backend, databases, APIs, and the systems that connect them into something people can actually use.'],
  ['2026', 'Expanding the Stack', 'Deepened Full-Stack & Entered Machine Learning', 'With a stronger grasp of full-stack engineering, I began pushing beyond conventional application development and into machine learning — working with data, models, forecasting, and intelligent systems.'],
  ['2026', 'Building Things That Matter', 'Major Projects & Applied Engineering', 'I brought these skills together through larger, end-to-end projects, combining software engineering, data, and machine learning to turn real problems into practical, deployable solutions.'],
]
const PATH_HEIGHT = 1035

function NodeWeb() { return <svg className="experience-node-web" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="#eee9df" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round"><path d="M50 50C49 37 51 22 50 4"/><path d="M50 50C60 39 72 27 88 15"/><path d="M50 50C63 49 79 50 96 50"/><path d="M50 50C61 60 75 72 88 85"/><path d="M50 50C50 64 51 79 50 96"/><path d="M50 50C39 61 27 73 13 86"/><path d="M50 50C37 50 21 50 4 50"/><path d="M50 50C40 39 27 28 12 15"/><path d="M37 38C43 33 53 32 61 37C68 42 68 51 63 58C57 66 46 68 38 63C31 59 30 49 34 42C35 40 36 39 37 38Z"/><path d="M27 29C39 20 58 20 71 29C83 38 84 54 76 67C67 81 47 84 32 76C19 69 15 53 20 40C22 35 24 32 27 29Z"/><path d="M17 20C34 8 59 8 78 20C94 31 97 52 89 69C80 89 58 97 37 90C17 83 5 65 10 44C11 34 13 26 17 20Z"/></g></svg> }

export default function ExperienceSection() {
  const timelineRef = useRef(null)
  useEffect(() => {
    const timeline = timelineRef.current, spider = timeline.querySelector('.experience-spider'), thread = timeline.querySelector('.experience-thread')
    const threadImage = thread.querySelector('img')
    const spiderImage = spider.querySelector('img')
    const nodes = [...timeline.querySelectorAll('.experience-node')], events = [...timeline.querySelectorAll('.experience-event')]
    let threadCenters = []
    let spiderAnchor = { x: spiderImage.naturalWidth / 2, y: 0 }
    const readThread = () => {
      const canvas = document.createElement('canvas'), context = canvas.getContext('2d')
      canvas.width = threadImage.naturalWidth; canvas.height = threadImage.naturalHeight
      context.drawImage(threadImage, 0, 0)
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
      let previous = canvas.width / 2
      threadCenters = Array.from({ length: canvas.height }, (_, row) => {
        const runs = []; let start = -1
        for (let column = 0; column < canvas.width; column += 1) {
          if (pixels[(row * canvas.width + column) * 4 + 3] > 10) { if (start < 0) start = column } else if (start >= 0) { runs.push([(start + column - 1) / 2]); start = -1 }
        }
        if (start >= 0) runs.push([(start + canvas.width - 1) / 2])
        if (runs.length) previous = runs.reduce((closest, [center]) => Math.abs(center - previous) < Math.abs(closest - previous) ? center : closest, runs[0][0])
        return previous
      })
      update()
    }
    const readSpiderAnchor = () => {
      const canvas = document.createElement('canvas'), context = canvas.getContext('2d')
      canvas.width = spiderImage.naturalWidth; canvas.height = spiderImage.naturalHeight
      context.drawImage(spiderImage, 0, 0)
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
      const row = Array.from({ length: canvas.width }, (_, column) => column).filter(column => pixels[column * 4 + 3] > 10)
      if (row.length) spiderAnchor = { x: (row[0] + row[row.length - 1]) / 2, y: 0 }
      update()
    }
    const update = () => {
      const rect = timeline.getBoundingClientRect()
      const timelineStart = window.scrollY + rect.top
      const usableDistance = Math.max(1, timeline.offsetHeight - window.innerHeight)
      const start = timelineStart + 95 - window.innerHeight * .72
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / usableDistance))
      const y = progress * PATH_HEIGHT
      const revealY = Math.min(PATH_HEIGHT, y + 3)
      const threadRect = thread.getBoundingClientRect()
      const x = threadCenters[Math.round(revealY)] ?? threadImage.naturalWidth / 2
      thread.style.clipPath = `inset(0 0 ${PATH_HEIGHT - revealY}px 0)`
      const spiderWidth = spider.offsetWidth, spiderHeight = spider.offsetHeight
      spider.style.left = `${threadRect.left - rect.left + x / threadImage.naturalWidth * threadRect.width - (spiderAnchor.x / spiderImage.naturalWidth * spiderWidth - spiderWidth / 2)}px`
      spider.style.top = `${revealY - 37 + (y === 0 ? 30 : 0)}px`
      nodes.forEach(node => node.classList.toggle('is-filled', y >= Number(node.dataset.y)))
      events.forEach((event, i) => event.classList.toggle('is-visible', y >= Number(nodes[i].dataset.y) - 36))
    }
    if (threadImage.complete) readThread(); else threadImage.addEventListener('load', readThread, { once: true })
    if (spiderImage.complete) readSpiderAnchor(); else spiderImage.addEventListener('load', readSpiderAnchor, { once: true })
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
