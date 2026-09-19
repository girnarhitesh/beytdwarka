import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import './Faq.css'

const EASE = [0.22, 1, 0.36, 1]

const FAQS = [
  {
    q: 'What are the main attractions included in the tours?',
    a: 'Our tours typically include key attractions such as the Dwarkadhish Temple, Nageshwar Jyotirlinga, Bet Dwarka Island, and Rukmini Temple. Each package offers a curated experience of the island’s historical and cultural landmarks.',
  },
  {
    q: 'How can I make a reservation for a tour?',
    a: 'You can easily make a reservation through our website by selecting your desired package and filling out the booking form. Alternatively, you can contact us via phone or email to secure your spot.',
  },
  {
    q: 'Are meals included in the tour packages?',
    a: 'Yes, meals are included in our Premium Day Package.',
  },
  {
    q: 'What should I bring on the tour?',
    a: 'We recommend wearing comfortable clothing and shoes suitable for walking. Don’t forget your camera for capturing beautiful moments! Additionally sunscreen and any personal items you may need.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We understand that plans can change. Cancellations made at least 48 hours before the tour will receive a full refund. For cancellations within 48 hours, we may offer a rescheduling option or partial refund depending on the circumstances.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
}

function Faq() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-80px' },
      }

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section className="faq section" id="faq" aria-labelledby="faq-title">
      <motion.div className="faq__wrap container" {...motionProps}>
        <motion.header className="faq__header" variants={fadeUp}>
          <div>
            <p className="faq__kicker">
              Help desk
              <span>{String(FAQS.length).padStart(2, '0')} answers</span>
            </p>
            <h2 className="faq__title" id="faq-title">
              Frequently Asked <em>Questions</em>
            </h2>
          </div>
          <p className="faq__lead">
            Find answers to your most common inquiries about our tours and
            services below.
          </p>
        </motion.header>

        <motion.div className="faq__list" variants={fadeUp} role="list">
          {FAQS.map((item, index) => {
            const open = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`

            return (
              <div
                key={item.q}
                className={`faq__item${open ? ' is-open' : ''}`}
                role="listitem"
              >
                <h3 className="faq__question">
                  <button
                    type="button"
                    id={buttonId}
                    className="faq__trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="faq__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="faq__question-text">{item.q}</span>
                    <span className="faq__icon" aria-hidden="true">
                      {open ? <Minus size={18} strokeWidth={2.2} /> : <Plus size={18} strokeWidth={2.2} />}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="faq__panel"
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.35, ease: EASE }
                      }
                    >
                      <p className="faq__answer">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Faq
