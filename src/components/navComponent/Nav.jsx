import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import Button from '../buttonComponent/Button.jsx'
import { site } from '../../site.config.js'
import './Nav.css'

const EASE = [0.22, 1, 0.36, 1]

const LINKS = [
  { id: 'island', label: 'Island', href: '/#about' },
  {
    id: 'life',
    label: 'Island life',
    items: [
      { label: 'About Beyt', href: '/#about', tease: 'The island story' },
      { label: 'Dolphin Safari', href: '/#dolphin', tease: 'Open water hour' },
      { label: 'Experiences', href: '/#experiences', tease: 'Six island hours' },
      { label: 'All experiences', href: '/experiences', tease: 'Full log, later' },
    ],
  },
  {
    id: 'plans',
    label: 'Plans',
    items: [
      { label: 'Day packages', href: '/#packages', tease: 'Padam, Enjoy, Darshan' },
      { label: 'Water combos', href: '/#combos', tease: 'Stack the rides' },
    ],
  },
  { id: 'gallery', label: 'Gallery', href: '/gallery' },
  { id: 'help', label: 'Help', href: '/#faq' },
]

function Nav() {
  const uid = useId()
  const prefersReducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [openId, setOpenId] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileLayer, setMobileLayer] = useState(null)
  const leaveTimer = useRef(null)

  const openMenu = (id) => {
    window.clearTimeout(leaveTimer.current)
    setOpenId(id)
  }

  const closeMenu = () => {
    window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => setOpenId(null), 120)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpenId(null)
        setMobileLayer(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px)')
    const onChange = () => {
      if (media.matches) {
        setMobileOpen(false)
        setMobileLayer(null)
      }
    }
    media.addEventListener('change', onChange)
    return () => window.removeEventListener('change', onChange)
  }, [])

  useEffect(() => () => window.clearTimeout(leaveTimer.current), [])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileLayer(null)
  }

  const go = () => {
    setOpenId(null)
    closeMobile()
  }

  const duration = prefersReducedMotion ? 0 : 0.45
  const layer = LINKS.find((link) => link.id === mobileLayer)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${mobileOpen ? ' is-open' : ''}`}>
      <div className="nav__dock container">
        <a className="nav__mark" href="/" onClick={go}>
          {/* <span className="nav__mark-tick" aria-hidden="true" /> */}
          <span className="nav__mark-name">{site.shortName}</span>
        </a>

        <nav className="nav__desk" aria-label="Primary">
          {LINKS.map((link) =>
            link.items ? (
              <div
                key={link.id}
                className={`nav__item${openId === link.id ? ' is-on' : ''}`}
                onMouseEnter={() => openMenu(link.id)}
                onMouseLeave={closeMenu}
              >
                <button
                  type="button"
                  className="nav__link"
                  aria-expanded={openId === link.id}
                  aria-controls={`${uid}-${link.id}`}
                  onClick={() => setOpenId((current) => (current === link.id ? null : link.id))}
                  onFocus={() => openMenu(link.id)}
                >
                  {link.label}
                </button>
                <div className="nav__tide" id={`${uid}-${link.id}`} role="region">
                  <div className="nav__tide-inner">
                    {link.items.map((item, index) => (
                      <a key={item.href + item.label} href={item.href} onClick={go}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{item.label}</strong>
                        <em>{item.tease}</em>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={link.id} className="nav__link" href={link.href} onClick={go}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="nav__end">
          <Button
            href="/#book"
            size="sm"
            arrow
            className="nav__cta"
            tone={scrolled || mobileOpen ? 'on-light' : 'on-dark'}
            onClick={go}
          >
            Book
          </Button>
          <button
            type="button"
            className="nav__toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls={`${uid}-chart`}
            onClick={() => {
              setMobileOpen((open) => !open)
              setMobileLayer(null)
            }}
          >
            <i />
            <i />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="nav__chart"
            id={`${uid}-chart`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          >
            <motion.div
              className="nav__chart-wash"
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration, ease: EASE }}
            />

            <nav className="nav__chart-list" aria-label="Mobile">
              {LINKS.map((link, index) =>
                link.items ? (
                  <button
                    key={link.id}
                    type="button"
                    className="nav__chart-link"
                    style={{ '--stagger': `${index * 0.06}s` }}
                    onClick={() => setMobileLayer(link.id)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.id}
                    className="nav__chart-link"
                    href={link.href}
                    style={{ '--stagger': `${index * 0.06}s` }}
                    onClick={go}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                ),
              )}
            </nav>

            <div className="nav__chart-cta">
              <Button href="/#book" arrow block onClick={go}>
                Book your day
              </Button>
            </div>

            <AnimatePresence>
              {layer ? (
                <motion.div
                  className="nav__layer"
                  key={layer.id}
                  initial={prefersReducedMotion ? false : { x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration, ease: EASE }}
                >
                  <button type="button" className="nav__back" onClick={() => setMobileLayer(null)}>
                    Back
                  </button>
                  <p className="nav__layer-kicker">{layer.label}</p>
                  {layer.items.map((item, index) => (
                    <a key={item.href + item.label} href={item.href} onClick={go}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item.label}</strong>
                      <em>{item.tease}</em>
                    </a>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Nav
