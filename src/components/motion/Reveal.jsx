import { motion } from 'framer-motion'

export function Reveal({ 
  children, 
  delay = 0,
  y = 20, 
  x = 0,
  duration = 0.7,
  once = false,
  className,
  style
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.19, 1, 0.22, 1] 
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className, style, delayChildren = 0, staggerChildren = 0.1, once = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      transition={{ staggerChildren, delayChildren }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, style, y = 20, x = 0, duration = 0.65 }) {
  const variants = {
    hidden: { opacity: 0, y, x },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration, ease: [0.19, 1, 0.22, 1] }
    }
  }

  return (
    <motion.div variants={variants} className={className} style={style}>
      {children}
    </motion.div>
  )
}
