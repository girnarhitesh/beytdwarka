import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Button from '../components/buttonComponent/Button.jsx'
import Cta from '../components/ctaComponent/Cta.jsx'
import PageHeader from '../components/pageHeaderComponent/PageHeader.jsx'
import { FRAMES, Lightbox } from '../components/galleryComponent/Gallery.jsx'
import '../components/galleryComponent/Gallery.css'
import './GalleryPage.css'

const EASE = [0.22, 1, 0.36, 1]
const HERO = FRAMES.find((frame) => frame.id === 'dusk') ?? FRAMES[0]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
}

function GalleryPage() {
  const [open, setOpen] = useState(null)
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-40px' },
      }

  return (
    <main className="gallery-page">
      <PageHeader
        crumb={[
          { label: 'Home', href: '/' },
          { label: 'Gallery' },
        ]}
        kicker="Frames"
        kickerMeta={`${String(FRAMES.length).padStart(2, '0')} stills`}
        title={
          <>
            Light on the island, <em>held still.</em>
          </>
        }
        titleId="gallery-page-title"
        lead="Shore, harbour, fire and last light — a compact set from Beyt Dwarka. Open any frame."
        actions={
          <>
            <Button href="#frames" arrow>
              View frames
            </Button>
            <Button href="/#book" tone="on-dark">
              Book your day
            </Button>
          </>
        }
        src={HERO.src}
        position={HERO.position}
      />

      <section className="gallery-wall section" id="frames" aria-label="Photograph wall">
        <motion.div className="gallery-wall__board container" {...motionProps}>
          {FRAMES.map((frame, index) => (
            <motion.button
              key={frame.id}
              type="button"
              className="gallery-wall__shot"
              variants={fadeUp}
              onClick={() => setOpen(index)}
              aria-label={`Open ${frame.title}, ${frame.place}`}
            >
              <img
                src={frame.src}
                alt=""
                loading={index < 4 ? 'eager' : 'lazy'}
                style={{ objectPosition: frame.position }}
              />
              <span className="gallery-wall__meta">
                <b>{frame.title}</b>
                <em>{frame.place}</em>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <Cta />

      <Lightbox
        index={open}
        reduced={Boolean(prefersReducedMotion)}
        onClose={() => setOpen(null)}
        onChange={setOpen}
      />
    </main>
  )
}

export default GalleryPage
