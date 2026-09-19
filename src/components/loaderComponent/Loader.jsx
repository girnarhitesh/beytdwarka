import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import './Loader.css'

const EASE = [0.22, 1, 0.36, 1]
const LOOP = [0.45, 0, 0.55, 1]
const MIN_MS = 2200
const MAX_MS = 4000

const DOLPHIN =
  'M20 7s0-4-5-4c-1.53 0-2.85.19-4 .5C10.5 3.06 7.26.31 4 3.57l2.56 2.56C2.5 10.53 4 18 4 18s-3 0-3 4c0 0 4-1 4-1s4 1 4 1c0-4-3-4-3-4s.85-5.76 7-6.82V14c2 0 2.68-1.81 2.89-3H18c4 0 5-1 5-2s-2-2-3-2m-2 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'

function Loader({ onDone }) {
  const reduced = useReducedMotion()
  const closed = useRef(false)

  useEffect(() => {
    document.documentElement.classList.add('is-booting')

    const close = () => {
      if (closed.current) return
      closed.current = true
      document.documentElement.classList.remove('is-booting')
      onDone()
    }

    const started = Date.now()
    const cap = window.setTimeout(close, MAX_MS)

    const finish = () => {
      const wait = Math.max(reduced ? 320 : MIN_MS - (Date.now() - started), 0)
      window.setTimeout(close, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => {
      window.clearTimeout(cap)
      window.removeEventListener('load', finish)
      document.documentElement.classList.remove('is-booting')
    }
  }, [onDone, reduced])

  return (
    <motion.div
      className="loader"
      role="status"
      aria-live="polite"
      aria-label="Loading Beyt Dwarka"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: reduced ? 0.2 : 0.5, ease: EASE },
      }}
    >
      <div className="loader__stack">
        <div className="loader__orb">
          <motion.svg
            className="loader__ring"
            viewBox="0 0 120 120"
            aria-hidden="true"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'linear' }}
          >
            <circle className="loader__track" cx="60" cy="60" r="54" />
            <circle className="loader__arc" cx="60" cy="60" r="54" />
          </motion.svg>

          <div className="loader__icon">
            {[0.22, 0.1].map((opacity, index) => (
              <motion.span
                key={opacity}
                className="loader__trail"
                style={{ opacity }}
                aria-hidden="true"
                animate={
                  reduced
                    ? undefined
                    : { x: [0, -10 - index * 8], y: [0, -4, 0], opacity: [opacity, 0] }
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: LOOP,
                  delay: index * 0.12,
                }}
              >
                <DolphinMark />
              </motion.span>
            ))}

            <motion.span
              className="loader__mark"
              animate={
                reduced
                  ? undefined
                  : { y: [0, -5, 0], rotate: [-4, 4, -4], scale: [1, 1.05, 1] }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: LOOP }}
            >
              <DolphinMark />
            </motion.span>
          </div>
        </div>

        <motion.p
          className="loader__name"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        >
          Beyt <em>Dwarka</em>
        </motion.p>
      </div>
    </motion.div>
  )
}

function DolphinMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={DOLPHIN} />
    </svg>
  )
}

export function BootScreen({ children }) {
  const [booting, setBooting] = useState(true)
  const finish = useCallback(() => setBooting(false), [])

  return (
    <>
      <AnimatePresence>{booting ? <Loader onDone={finish} /> : null}</AnimatePresence>
      {children}
    </>
  )
}

export default Loader
