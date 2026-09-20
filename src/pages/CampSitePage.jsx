import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/buttonComponent/Button.jsx'
import Cta from '../components/ctaComponent/Cta.jsx'
import PageHeader from '../components/pageHeaderComponent/PageHeader.jsx'
import { CAMPS, MEAL_PLANS } from '../data/camps.js'
import './CampSitePage.css'

const EASE = [0.22, 1, 0.36, 1]
const inr = new Intl.NumberFormat('en-IN')
const rupees = (value) => `₹${inr.format(value)}`

const HERO =
  'https://beytdwarka.com/assets/img/Home/gallery/camping11_11zon.webp'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

function CampSitePage() {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-48px' },
      }

  const elysium = CAMPS.find((item) => item.slug === 'elysium')
  const camping = CAMPS.find((item) => item.slug === 'camping')

  return (
    <main className="camp-page">
      <PageHeader
        crumb={[
          { label: 'Home', href: '/' },
          { label: 'Camp Site' },
        ]}
        kicker="Stay the night"
        title={
          <>
            Sleep on the island at <em>Elysium Camp.</em>
          </>
        }
        titleId="camp-page-title"
        lead="Two overnight stays — AC rooms at Elysium, or an alpine tent with meals, safari, and a bonfire close."
        src={HERO}
        position="50% 28%"
      />

      <section className="camp-page__list section" aria-label="Camp site stays">
        <motion.div className="camp-page__grid container" {...motionProps}>
          <ElysiumCard stay={elysium} />
          <CampingCard stay={camping} />
        </motion.div>
      </section>

      <Cta />
    </main>
  )
}

function ElysiumCard({ stay }) {
  return (
    <motion.article className="camp-card camp-card--stay" variants={fadeUp}>
      <div className="camp-card__shot">
        <a href={`/camp-site/${stay.slug}`} aria-label={`View ${stay.name}`}>
          <img src={stay.src} alt="" style={{ objectPosition: stay.position }} />
        </a>
        <p className="camp-card__chip">{stay.kicker}</p>
      </div>

      <div className="camp-card__body">
        <header className="camp-card__head">
          <div>
            <h2>{stay.name}</h2>
            <p>AC rooms · twin sharing · attached washroom</p>
          </div>
          <p className="camp-card__from">
            From <strong>{rupees(stay.from)}</strong>
            <span>/ night</span>
          </p>
        </header>

        <div className="camp-rate" role="table" aria-label="Room rates">
          <div className="camp-rate__row camp-rate__row--head" role="row">
            <span role="columnheader">Room Type</span>
            {MEAL_PLANS.map((plan) => (
              <span key={plan.id} role="columnheader">
                {plan.label}
              </span>
            ))}
          </div>
          {stay.rooms.map((room) => (
            <div key={room.name} className="camp-rate__row" role="row">
              <span role="rowheader">
                <strong>{room.name}</strong>
              </span>
              {MEAL_PLANS.map((plan) => (
                <span key={plan.id} role="cell">
                  {rupees(room.rates[plan.id])}
                </span>
              ))}
            </div>
          ))}
        </div>

        <ul className="camp-card__notes">
          {stay.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="camp-card__foot">
          <p>
            In {stay.checkIn} · Out {stay.checkOut}
          </p>
          <Button href={`/camp-site/${stay.slug}`} arrow size="sm" tone="on-light">
            View stay
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

function CampingCard({ stay }) {
  return (
    <motion.article className="camp-card camp-card--tent" variants={fadeUp}>
      <div className="camp-card__shot">
        <a href={`/camp-site/${stay.slug}`} aria-label={`View ${stay.name}`}>
          <img src={stay.src} alt="" style={{ objectPosition: stay.position }} />
        </a>
        <p className="camp-card__chip">{stay.kicker}</p>
        <p className="camp-card__fare">
          <strong>{rupees(stay.price)}</strong>
          <span>
            {stay.unit} · {stay.taxNote}
          </span>
        </p>
      </div>

      <div className="camp-card__body">
        <header className="camp-card__head">
          <div>
            <h2>{stay.name}</h2>
            <p>Alpine tent · meals · safari · bonfire</p>
          </div>
        </header>

        <ul className="camp-card__pills">
          {stay.highlights.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="camp-card__foot">
          <p>
            In {stay.checkIn} · Out {stay.checkOut}
          </p>
          <Button href={`/camp-site/${stay.slug}`} arrow size="sm">
            View stay
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

export default CampSitePage
