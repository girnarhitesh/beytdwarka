import { motion, useReducedMotion } from 'framer-motion'
import { Sailboat, Ship, Sofa, Wind, Zap } from 'lucide-react'
import Button from '../buttonComponent/Button.jsx'
import './Combos.css'

const EASE = [0.22, 1, 0.36, 1]
const inr = new Intl.NumberFormat('en-IN')
const rupees = (value) => `₹${inr.format(value)}`

const ICONS = {
  jet: Zap,
  speed: Ship,
  banana: Sailboat,
  sofa: Sofa,
  para: Wind,
}

const COMBOS = [
  {
    number: '01',
    name: 'Full Splash',
    why: 'All four water rides in one booking.',
    count: '4 rides',
    price: 950,
    original: 1100,
    included: [
      { id: 'jet', name: 'Jet Ski' },
      { id: 'speed', name: 'Speed Boat' },
      { id: 'banana', name: 'Banana Boat' },
      { id: 'sofa', name: 'Sofa Ride' },
    ],
  },
  {
    number: '02',
    name: 'Sky Mix',
    why: 'Parasailing, then one extra ride of your choice.',
    count: '2 rides',
    price: 1500,
    original: 1700,
    included: [{ id: 'para', name: 'Parasailing' }],
    choice: [
      { id: 'speed', name: 'Speed Boat' },
      { id: 'banana', name: 'Banana Boat' },
      { id: 'sofa', name: 'Sofa Ride' },
    ],
  },
  {
    number: '03',
    name: 'Jet Mix',
    why: 'Jet ski, then one extra ride of your choice.',
    count: '2 rides',
    price: 600,
    original: 700,
    included: [{ id: 'jet', name: 'Jet Ski' }],
    choice: [
      { id: 'speed', name: 'Speed Boat' },
      { id: 'banana', name: 'Banana Boat' },
      { id: 'sofa', name: 'Sofa Ride' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function Ride({ id, name }) {
  const Icon = ICONS[id]
  return (
    <li className="combos__ride">
      {Icon ? <Icon size={13} strokeWidth={1.8} aria-hidden="true" /> : null}
      {name}
    </li>
  )
}

function Combos() {
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
    <section className="combos section" id="combos" aria-labelledby="combos-title">
      <motion.div className="combos__wrap container" {...motionProps}>
        <motion.header className="combos__header" variants={fadeUp}>
          <div>
            <p className="combos__kicker">
              Water sports
              <span>03 mixes</span>
            </p>
            <h2 className="combos__title" id="combos-title">
              Three mixes. <em>One clear price.</em>
            </h2>
          </div>
          <p className="combos__lead">
            See exactly which rides you get, where you pick one, and how much
            you save versus booking them apart.
          </p>
        </motion.header>

        <div className="combos__grid">
          {COMBOS.map((combo) => (
            <motion.article key={combo.number} className="combos__card" variants={fadeUp}>
              <header className="combos__top">
                <p className="combos__no">{combo.number}</p>
                <div>
                  <h3>{combo.name}</h3>
                  <p className="combos__why">{combo.why}</p>
                </div>
                <p className="combos__count">{combo.count}</p>
              </header>

              <div className="combos__groups">
                <div className="combos__group">
                  <p className="combos__label">Included</p>
                  <ul>
                    {combo.included.map((ride) => (
                      <Ride key={ride.id} {...ride} />
                    ))}
                  </ul>
                </div>

                {combo.choice ? (
                  <div className="combos__group">
                    <p className="combos__label">Pick one</p>
                    <ul>
                      {combo.choice.map((ride) => (
                        <Ride key={ride.id} {...ride} />
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="combos__fare">
                <p className="combos__now">
                  {rupees(combo.price)}
                  <small>/ person</small>
                </p>
                <p className="combos__was">
                  <s>{rupees(combo.original)}</s>
                  Save {rupees(combo.original - combo.price)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="combos__foot" variants={fadeUp}>
          <p>Prices cover the water rides listed here. Day packages are separate.</p>
          <Button href="#book" arrow tone="on-light">
            Book a mix
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Combos
