import { motion, useReducedMotion } from 'framer-motion'
import { Check, Clock } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import Button from '../components/buttonComponent/Button.jsx'
import { getPackage, PACKAGES } from '../data/packages.js'
import './PackageDetailPage.css'

const EASE = [0.22, 1, 0.36, 1]
const inr = new Intl.NumberFormat('en-IN')

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

function PackageDetailPage() {
  const { slug } = useParams()
  const pack = getPackage(slug)
  const prefersReducedMotion = useReducedMotion()

  if (!pack) {
    return <Navigate to="/packages" replace />
  }

  const others = PACKAGES.filter((item) => item.slug !== pack.slug)
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-64px' },
      }

  return (
    <main className="pkgd">
      <header className="pkgd__stage">
        <div className="pkgd__vista" aria-hidden="true">
          <img
            className={prefersReducedMotion ? '' : 'is-drift'}
            src={pack.src}
            alt=""
            style={{ objectPosition: pack.position }}
          />
          <p className="pkgd__chip">
            <Clock size={12} strokeWidth={1.75} />
            {pack.duration}
          </p>
        </div>

        <div className="pkgd__pass">
          <p className="pkgd__crumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/packages">Packages</a>
            <span>/</span>
            {pack.short}
          </p>
          <p className="pkgd__kicker">{pack.kicker}</p>
          <h1 className="pkgd__title">{pack.name}</h1>
          <p className="pkgd__tagline">{pack.tagline}</p>

          <div className="pkgd__stats">
            <p className="pkgd__price">
              <strong>₹{inr.format(pack.price)}</strong>
              <span>/- {pack.priceNote}</span>
            </p>
            <p className="pkgd__time">
              <span>{pack.durationLabel}</span>
              <b>{pack.duration}</b>
            </p>
          </div>

          <div className="pkgd__cta">
            <Button href={`/#book?plan=${pack.slug}`} arrow>
              Book this package
            </Button>
            <Button href="/packages" tone="on-dark">
              All packages
            </Button>
          </div>
        </div>
      </header>

      <section className="pkgd__body" aria-labelledby="pkgd-includes">
        <motion.div className="pkgd__panel container" {...motionProps}>
          <motion.div className="pkgd__includes" variants={fadeUp}>
            <p className="pkgd__label" id="pkgd-includes">
              Inclusions
            </p>
            <ul>
              {pack.inclusions.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">
                    <Check size={13} strokeWidth={2.4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.article className="pkgd__story" variants={fadeUp}>
            <div className="pkgd__story-media" aria-hidden="true">
              <img
                src={pack.storySrc}
                alt=""
                style={{ objectPosition: pack.storyPosition }}
              />
            </div>
            <div className="pkgd__story-copy">
              <p className="pkgd__label">The experience</p>
              <h2>{pack.story.title}</h2>
              <p>{pack.story.body}</p>
              <Button href={`/#book?plan=${pack.slug}`} arrow tone="on-light" size="sm">
                Book your day
              </Button>
            </div>
          </motion.article>
        </motion.div>
      </section>

      {others.length ? (
        <section className="pkgd__more" aria-label="Other packages">
          <div className="pkgd__more-row container">
            <p className="pkgd__label">Also on the island</p>
            <div className="pkgd__cards">
              {others.map((item) => (
                <a key={item.slug} className="pkgd__card" href={`/packages/${item.slug}`}>
                  <img
                    src={item.src}
                    alt=""
                    style={{ objectPosition: item.position }}
                  />
                  <span>
                    <b>{item.short}</b>
                    <em>₹{inr.format(item.price)} {item.priceNote}</em>
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

export default PackageDetailPage
