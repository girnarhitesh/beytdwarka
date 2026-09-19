import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AboutBeyt from './components/aboutBeytComponent/AboutBeyt.jsx'
import Combos from './components/combosComponent/Combos.jsx'
import Cta from './components/ctaComponent/Cta.jsx'
import DolphinSafari from './components/dolphinSafariComponent/DolphinSafari.jsx'
import Experiences from './components/experiencesComponent/Experiences.jsx'
import Faq from './components/faqComponent/Faq.jsx'
import Gallery from './components/galleryComponent/Gallery.jsx'
import Hero from './components/heroComponent/Hero.jsx'
import HowToReach from './components/howToReachComponent/HowToReach.jsx'
import Nav from './components/navComponent/Nav.jsx'
import Packages from './components/packagesComponent/Packages.jsx'
import { BootScreen } from './components/loaderComponent/Loader.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import PackagesPage from './pages/PackagesPage.jsx'
import ThingsToDoPage from './pages/ThingsToDoPage.jsx'
import './App.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <main>
      <Hero />
      <AboutBeyt />
      <DolphinSafari />
      <Packages />
      <Combos />
      <Experiences />
      <Gallery />
      <Faq />
      <Cta />
      {/* <HowToReach /> */}
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      {/* <BootScreen> */}
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/things-to-do" element={<ThingsToDoPage />} />
        </Routes>
      {/* </BootScreen> */}
    </BrowserRouter>
  )
}

export default App
