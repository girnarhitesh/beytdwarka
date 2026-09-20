import Cta from '../components/ctaComponent/Cta.jsx'
import PageHeader from '../components/pageHeaderComponent/PageHeader.jsx'
import Packages from '../components/packagesComponent/Packages.jsx'
import './PackagesPage.css'

const HERO =
  'https://beytdwarka.com/assets/img/Home/gallery/DSC03900-min_11zon.webp'

function PackagesPage() {
  return (
    <main className="pkg-page">
      <PageHeader
        crumb={[
          { label: 'Home', href: '/' },
          { label: 'Packages' },
        ]}
        kicker="Day routes"
        title={
          <>
            Plan your day on <em>the island.</em>
          </>
        }
        titleId="pkg-page-title"
        lead="Padam Beach, Enjoy Beyt Dwarka, and Darshan — the same three packages from the homepage, with guest counts and what’s included."
        src={HERO}
        position="50% 62%"
      />
      <Packages />
      <Cta />
    </main>
  )
}

export default PackagesPage
