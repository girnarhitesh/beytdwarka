import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/buttonComponent/Button.jsx'
import Cta from '../components/ctaComponent/Cta.jsx'
import PageHeader from '../components/pageHeaderComponent/PageHeader.jsx'
import {
  EXPERIENCES,
  ExperiencePrint,
} from '../components/experiencesComponent/Experiences.jsx'
import '../components/experiencesComponent/Experiences.css'
import './ExperiencesPage.css'

const HERO = EXPERIENCES[0]
const FEATURED = EXPERIENCES.slice(0, 2)
const MOSAIC = EXPERIENCES.slice(2)

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
}

function ExperiencesPage() {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <main className="exp-page">
      <PageHeader
        crumb={[
          { label: 'Home', href: '/' },
          { label: 'Experiences' },
        ]}
        kicker="Island log"
        kickerMeta={`${String(EXPERIENCES.length).padStart(2, '0')} moments`}
        title={
          <>
            Incredible <em>experience</em>
          </>
        }
        titleId="exp-page-title"
        lead="Every island hour — safari, shore, darshan, trails, and last light on the gulf."
        actions={
          <>
            <Button href="#all-experiences" arrow>
              View all
            </Button>
            <Button href="/#book" tone="on-dark">
              Book your day
            </Button>
          </>
        }
        src={HERO.src}
        position={HERO.position}
      />

      <section
        className="experiences section"
        id="all-experiences"
        aria-label="All island experiences"
      >
        <motion.div className="experiences__wrap container" {...motionProps}>
          <motion.div className="experiences__featured" variants={stagger}>
            {FEATURED.map((item) => (
              <ExperiencePrint key={item.id} item={item} size="lead" />
            ))}
          </motion.div>

          <motion.div className="experiences__mosaic" variants={stagger}>
            {MOSAIC.map((item) => (
              <ExperiencePrint key={item.id} item={item} size="tile" />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Cta />
    </main>
  )
}

export default ExperiencesPage
