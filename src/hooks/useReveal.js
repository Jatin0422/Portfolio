import { useEffect, useRef } from 'react'

/**
 * useReveal — attaches IntersectionObserver to toggle `.visible` class.
 * @param {number} threshold
 * @param {boolean} once - if true, animation only plays once. Default is false (replays).
 * @returns {React.RefObject}
 */
export function useReveal(threshold = 0.15, once = false) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          if (once) observer.disconnect()
        } else if (!once) {
          el.classList.remove('visible')
        }
      },
      { threshold }
    )
    
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return ref
}

