import { motion, useReducedMotion } from 'framer-motion'
import Button from '../buttonComponent/Button.jsx'
import './Cta.css'

const EASE = [0.22, 1, 0.36, 1]

const SHOTS = [
  {
    id: 'shore',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/DSC03900-min_11zon.webp',
    position: '50% 62%',
  },
  {
    id: 'hat',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG_2511_4_11zon_11zon.webp',
    position: '50% 35%',
  },
  {
    id: 'friends',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG_6206_7_11zon_11zon.webp',
    position: '50% 48%',
  },
  {
    id: 'dusk',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/20231003_182210-min-min-min_11zon.webp',
    position: '50% 40%',
  },
  {
    id: 'jump',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG-20240313-WA0054-min-min-min_11zon.webp',
    position: '50% 42%',
  },
  {
    id: 'fire',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/camping11_11zon.webp',
    position: '48% 42%',
  },
  {
    id: 'boat',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG_2841_11zon.jpg',
    position: '50% 38%',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

function Cta() {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-48px' },
      }

  return (
    <section className="cta section section--flush" id="book" aria-labelledby="cta-title">
      <div className="cta__glow cta__glow--teal" aria-hidden="true" />
      <div className="cta__glow cta__glow--sand" aria-hidden="true" />

      <motion.div className="cta__copy container" {...motionProps}>
        <motion.p className="cta__kicker" variants={fadeUp}>
          Ready when you are
          <span>Open dates</span>
        </motion.p>
        <motion.h2 className="cta__title" id="cta-title" variants={fadeUp}>
          The island is waiting. Come across <em>today.</em>
        </motion.h2>
        <motion.p className="cta__lead" variants={fadeUp}>
          Temples, tide, and a quiet boat hour on Beyt Dwarka.
        </motion.p>
        <motion.div className="cta__actions" variants={fadeUp}>
          <Button href="/packages" arrow tone="on-light">
            Book your day
          </Button>
          <Button href="/#faq" tone="on-light">
            Ask a question
          </Button>
        </motion.div>
      </motion.div>

      <div className="cta__fan" aria-hidden="true">
        {SHOTS.map((shot) => (
          <figure key={shot.id} className="cta__shot">
            <img src={shot.src} alt="" style={{ objectPosition: shot.position }} />
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Cta
