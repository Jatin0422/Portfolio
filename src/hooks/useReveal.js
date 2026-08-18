import { useEffect, useRef } from 'react'

/**
 * useReveal — attaches IntersectionObserver to add `.visible` class.
 * @param {number} threshold
 * @returns {React.RefObject}
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
