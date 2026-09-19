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
    official: 'Combo Package 1',
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
    official: 'Combo Package 2',
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
    official: 'Combo Package 3',
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
    <span className="combos__ride">
      {Icon ? <Icon size={14} strokeWidth={1.8} aria-hidden="true" /> : null}
      {name}
    </span>
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
              Stack the rides. <em>Keep the saving.</em>
            </h2>
          </div>
          <p className="combos__lead">
            Three water-sport mixes, written as one rate sheet — every ride and
            the original price, visible at a glance.
          </p>
        </motion.header>

        <motion.article className="combos__sheet" variants={fadeUp}>
          <aside className="combos__spine" aria-hidden="true">
            <span>Mix</span>
            <b>03</b>
            <span>Water</span>
          </aside>

          <div className="combos__lanes">
            {COMBOS.map((combo) => (
              <div key={combo.number} className="combos__lane">
                <p className="combos__no">{combo.number}</p>

                <div className="combos__copy">
                  <h3>
                    {combo.name}
                    <small>{combo.official}</small>
                  </h3>

                  <div className="combos__recipe">
                    {combo.included.map((ride) => (
                      <Ride key={ride.id} {...ride} />
                    ))}
                    {combo.choice ? (
                      <span className="combos__or">
                        <em>any one</em>
                        {combo.choice.map((ride) => (
                          <Ride key={ride.id} {...ride} />
                        ))}
                      </span>
                    ) : null}
                  </div>
                </div>

                <p className="combos__fare">
                  <span className="combos__now">
                    {rupees(combo.price)}
                    <small>/ person</small>
                  </span>
                  <span className="combos__was">
                    <s>{rupees(combo.original)}</s>
                    save {rupees(combo.original - combo.price)}
                  </span>
                </p>
              </div>
            ))}

            <div className="combos__foot">
              <p>Prices include the listed water rides only. Day packages are separate.</p>
              <Button href="#book" arrow tone="on-dark">
                Book a mix
              </Button>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </section>
  )
}

export default Combos
