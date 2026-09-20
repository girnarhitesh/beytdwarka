import { motion, useReducedMotion } from 'framer-motion'
import {
  Bath,
  Clock,
  Flame,
  Footprints,
  Gamepad2,
  Leaf,
  Moon,
  Ship,
  Sun,
  Tent,
  Ticket,
  Utensils,
  Waves,
} from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import Button from '../components/buttonComponent/Button.jsx'
import PageHeader from '../components/pageHeaderComponent/PageHeader.jsx'
import { CAMPS, getCamp, MEAL_PLANS } from '../data/camps.js'
import './CampDetailPage.css'

const EASE = [0.22, 1, 0.36, 1]
const inr = new Intl.NumberFormat('en-IN')
const rupees = (value) => `₹${inr.format(value)}`

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
}

const ICONS = {
  bath: Bath,
  beach: Waves,
  fire: Flame,
  games: Gamepad2,
  meals: Utensils,
  moon: Moon,
  sports: Ship,
  stay: Tent,
  sun: Sun,
  therapy: Leaf,
  ticket: Ticket,
  walk: Footprints,
}

function CampDetailPage() {
  const { slug } = useParams()
  const stay = getCamp(slug)
  const prefersReducedMotion = useReducedMotion()

  if (!stay) {
    return <Navigate to="/camp-site" replace />
  }

  const others = CAMPS.filter((item) => item.slug !== stay.slug)
  const price = stay.price ?? stay.from
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-48px' },
      }

  return (
    <main className="campd">
      <PageHeader
        crumb={[
          { label: 'Home', href: '/' },
          { label: 'Camp Site', href: '/camp-site' },
          { label: stay.short },
        ]}
        kicker={stay.kicker}
        title={stay.name}
        titleId="campd-title"
        lead={stay.tagline}
        src={stay.src}
        position={stay.position}
        actions={
          <>
            <Button href={`/#book?stay=${stay.slug}`} arrow>
              Book this stay
            </Button>
            <Button href="/camp-site" tone="on-dark">
              All stays
            </Button>
          </>
        }
      />

      <section className="campd__body section" aria-labelledby="campd-details">
        <motion.div className="campd__wrap container" {...motionProps}>
          <motion.ul className="campd__facts" variants={fadeUp}>
            <li>
              <span>From</span>
              <strong>
                {rupees(price)}
                <small>
                  {stay.unit}
                  {stay.taxNote ? ` · ${stay.taxNote}` : ''}
                </small>
              </strong>
            </li>
            <li>
              <span>Check-in</span>
              <strong>{stay.checkIn}</strong>
            </li>
            <li>
              <span>Check-out</span>
              <strong>{stay.checkOut}</strong>
            </li>
          </motion.ul>

          {stay.rooms ? (
            <motion.div className="campd__rates" variants={fadeUp}>
              <p className="campd__label" id="campd-details">
                Room rates
              </p>
              <p className="campd__hint">
                Rate per person per room, per night, on twin sharing.
              </p>
              <div className="camp-rate camp-rate--detail" role="table">
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
                      <small>{room.note}</small>
                    </span>
                    {MEAL_PLANS.map((plan) => (
                      <span key={plan.id} role="cell">
                        {rupees(room.rates[plan.id])}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <p className="campd__label" id="campd-details">
              Inclusions
            </p>
          )}

          <motion.div className="campd__includes" variants={fadeUp}>
            {stay.rooms ? (
              <p className="campd__label">Inclusions</p>
            ) : null}
            <ul>
              {stay.inclusions.map((item) => {
                const Icon = ICONS[item.icon] ?? Clock
                return (
                  <li key={item.title}>
                    <span aria-hidden="true">
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    {item.title}
                  </li>
                )
              })}
            </ul>
          </motion.div>

          <motion.article className="campd__story" variants={fadeUp}>
            <div className="campd__story-media">
              <img
                src={stay.storySrc}
                alt=""
                style={{ objectPosition: stay.storyPosition }}
              />
            </div>
            <div>
              <p className="campd__label">The stay</p>
              <h2>{stay.story.title}</h2>
              <p>{stay.story.body}</p>
              <Button href={`/#book?stay=${stay.slug}`} arrow tone="on-light" size="sm">
                Book this stay
              </Button>
            </div>
          </motion.article>
        </motion.div>
      </section>

      {others.length ? (
        <section className="campd__more section" aria-label="Other camp stays">
          <div className="campd__more-row container">
            <p className="campd__label">Also on camp site</p>
            <div className="campd__cards">
              {others.map((item) => (
                <a
                  key={item.slug}
                  className="campd__card"
                  href={`/camp-site/${item.slug}`}
                >
                  <img
                    src={item.src}
                    alt=""
                    style={{ objectPosition: item.position }}
                  />
                  <span>
                    <b>{item.short}</b>
                    <em>
                      {rupees(item.price ?? item.from)} {item.unit}
                    </em>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default CampDetailPage
