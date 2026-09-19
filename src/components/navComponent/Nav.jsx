import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import Button from '../buttonComponent/Button.jsx'
import { site } from '../../site.config.js'
import './Nav.css'

const EASE = [0.22, 1, 0.36, 1]

const LINKS = [
  {
    id: 'things-to-do',
    label: 'Things To Do',
    items: [
      { label: 'Explore', href: '/things-to-do#explore', tease: 'Beaches, trails, points' },
      { label: 'Experiences', href: '/things-to-do#experiences', tease: 'Island hours' },
      { label: 'Entertainment', href: '/things-to-do#entertainment', tease: 'On the water' },
    ],
  },
  { id: 'packages', label: 'Packages', href: '/packages' },
  { id: 'gallery', label: 'Gallery', href: '/gallery' },
]

function BrandMark({ href, onClick, reduced }) {
  const [hover, setHover] = useState(false)
  const name = site.shortName

  return (
    <a
      className="nav__mark"
      href={href}
      onClick={onClick}
      aria-label={name}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <span className="nav__mark-name">
        {Array.from(name).map((char, index) =>
          char === ' ' ? (
            <span key={`space-${index}`} className="nav__mark-space">
              {' '}
            </span>
          ) : (
            <motion.span
              key={`${char}-${index}`}
              className="nav__mark-letter"
              animate={
                reduced
                  ? { opacity: 1, y: 0 }
                  : hover
                    ? { opacity: 1, y: -2, color: '#1f8fa0' }
                    : { opacity: [0.58, 1, 0.58], y: [0, -1.2, 0], color: 'currentColor' }
              }
              transition={
                hover
                  ? { duration: 0.35, ease: EASE, delay: index * 0.028 }
                  : {
                      duration: 2.8,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: index * 0.11,
                    }
              }
            >
              {char}
            </motion.span>
          ),
        )}
      </span>
    </a>
  )
}

function Nav() {
  const uid = useId()
  const prefersReducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [openId, setOpenId] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileLayer, setMobileLayer] = useState(null)
  const leaveTimer = useRef(null)
  const focusTimer = useRef(null)
  const [deskFocus, setDeskFocus] = useState(false)

  const openMenu = (id) => {
    window.clearTimeout(leaveTimer.current)
    setOpenId(id)
  }

  const closeMenu = () => {
    window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => setOpenId(null), 120)
  }

  const enterFocus = () => {
    window.clearTimeout(focusTimer.current)
    setDeskFocus(true)
  }

  const leaveFocus = () => {
    window.clearTimeout(focusTimer.current)
    focusTimer.current = window.setTimeout(() => setDeskFocus(false), 100)
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

  useEffect(() => () => {
    window.clearTimeout(leaveTimer.current)
    window.clearTimeout(focusTimer.current)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileLayer(null)
  }

  const go = () => {
    setOpenId(null)
    closeMobile()
  }

  const duration = prefersReducedMotion ? 0 : 0.45
  const veil = deskFocus || Boolean(openId)
  const layer = LINKS.find((link) => link.id === mobileLayer)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${mobileOpen ? ' is-open' : ''}${veil ? ' is-veil' : ''}`}>
      <AnimatePresence>
        {veil ? (
          <motion.div
            className="nav__veil"
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: EASE }}
          />
        ) : null}
      </AnimatePresence>

      <div className="nav__dock container">
        <BrandMark href="/" onClick={go} reduced={Boolean(prefersReducedMotion)} />

        <nav className="nav__desk" aria-label="Primary">
          {LINKS.map((link) =>
            link.items ? (
              <div
                key={link.id}
                className={`nav__item${openId === link.id ? ' is-on' : ''}`}
                onMouseEnter={() => {
                  openMenu(link.id)
                  enterFocus()
                }}
                onMouseLeave={() => {
                  closeMenu()
                  leaveFocus()
                }}
              >
                <button
                  type="button"
                  className="nav__link"
                  aria-expanded={openId === link.id}
                  aria-controls={`${uid}-${link.id}`}
                  onClick={() => setOpenId((current) => (current === link.id ? null : link.id))}
                  onFocus={() => {
                    openMenu(link.id)
                    enterFocus()
                  }}
                  onBlur={leaveFocus}
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
              <a
                key={link.id}
                className="nav__link"
                href={link.href}
                onClick={go}
                onMouseEnter={enterFocus}
                onMouseLeave={leaveFocus}
                onFocus={enterFocus}
                onBlur={leaveFocus}
              >
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
            onMouseEnter={enterFocus}
            onMouseLeave={leaveFocus}
            onFocus={enterFocus}
            onBlur={leaveFocus}
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
