import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Button from '../buttonComponent/Button.jsx'
import { site } from '../../site.config.js'
import './Footer.css'

const VISIT = [
  { label: 'About us', href: '/#about' },
  { label: 'Things to do', href: '/things-to-do' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Packages', href: '/packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Contact', href: '/#book' },
]

const OFFERS = [
  { label: 'Padam Beach', href: '/packages/padam' },
  { label: 'Enjoy Beyt Dwarka', href: '/packages/enjoy' },
  { label: 'Beyt Dwarka Darshan', href: '/packages/darshan' },
  { label: 'Dolphin Safari', href: '/#dolphin' },
  { label: 'Full Splash', href: '/#combos' },
  { label: 'Sky Mix', href: '/#combos' },
  { label: 'Jet Mix', href: '/#combos' },
]

const SOCIAL = [
  {
    label: 'Instagram',
    name: 'Beyt Dwarka Tourism',
    href: 'https://www.instagram.com/beytdwarkatourism/',
    Icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    name: 'Beyt Dwarka Tourism',
    href: 'https://www.facebook.com/beytdwarkatourism/',
    Icon: FacebookIcon,
  },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1h1.3V3h-2.2C11.9 3 11 5 11 6.7v1.8H9v2.7h2V21h3.2v-9.8h2.2l.4-2.7h-2.3z"
      />
    </svg>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  const island = `${import.meta.env.BASE_URL}Images/beytdwarka-hero-background-image.png`

  return (
    <footer className="foot" id="contact">
      <div className="foot__vista" aria-hidden="true">
        <img src={island} alt="" loading="lazy" />
      </div>
      <div className="foot__grid container">
        <div className="foot__brand">
          <a className="foot__mark" href="/">
            {site.shortName}
          </a>
          <p>
            Sacred island of Lord Krishna, two kilometres off Okha — temples,
            beaches, and a quiet day on the gulf.
          </p>
          <div className="foot__social">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label}, Beyt Dwarka Tourism`}
              >
                <Icon />
              </a>
            ))}
          </div>
          <Button href="/#book" size="sm" arrow>
            Book your day
          </Button>
        </div>

        <nav className="foot__col" aria-label="Visit">
          <p className="foot__label">Visit</p>
          <ul>
            {VISIT.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="foot__col" aria-label="Packages and experiences">
          <p className="foot__label">Packages</p>
          <ul>
            {OFFERS.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot__col">
          <p className="foot__label">Contact</p>
          <ul className="foot__contact">
            <li>
              <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
              <a href="tel:+917201060500">+91 7201060500</a>
            </li>
            <li>
              <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
              <a href="mailto:info@beytdwarka.com">info@beytdwarka.com</a>
            </li>
            <li>
              <MessageCircle size={14} strokeWidth={1.75} aria-hidden="true" />
              <a
                href="https://wa.me/917201060500"
                target="_blank"
                rel="noreferrer"
              >
                +91 7201060500
              </a>
            </li>
            <li>
              <MapPin size={14} strokeWidth={1.75} aria-hidden="true" />
              <span>Beyt Dwarka, Gujarat</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="foot__bar">
        <div className="foot__bar-row container">
          <p>© {year} {site.shortName}. All rights reserved.</p>
          <a
            className="foot__credit"
            href="https://okghumo.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Powered by OkGhumo"
          >
            <span>Powered by</span>
            <img
              src="https://okghumo.com/Images/OkGhumoLogo.png"
              alt="OkGhumo"
              width="96"
              height="20"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
