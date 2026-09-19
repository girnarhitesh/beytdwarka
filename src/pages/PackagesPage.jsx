import Cta from '../components/ctaComponent/Cta.jsx'
import Packages from '../components/packagesComponent/Packages.jsx'
import './PackagesPage.css'

const HERO =
  'https://beytdwarka.com/assets/img/Home/gallery/DSC03900-min_11zon.webp'

function PackagesPage() {
  return (
    <main className="pkg-page">
      <section className="pkg-page__hero" aria-labelledby="pkg-page-title">
        <div className="pkg-page__media" aria-hidden="true">
          <img src={HERO} alt="" />
        </div>
        <div className="pkg-page__copy container">
          <div>
            <p className="pkg-page__crumb">
              <a href="/">Home</a>
              <span>/</span>
              Packages
            </p>
            <p className="pkg-page__kicker">Day routes</p>
            <h1 className="pkg-page__title" id="pkg-page-title">
              Plan your day on <em>the island.</em>
            </h1>
          </div>
          <p className="pkg-page__lead">
            Padam Beach, Enjoy Beyt Dwarka, and Darshan — the same three
            packages from the homepage, with guest counts and what’s included.
          </p>
        </div>
      </section>

      <Packages />
      <Cta />
    </main>
  )
}

export default PackagesPage
