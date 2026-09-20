import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Cta from '../components/ctaComponent/Cta.jsx'
import PageHeader from '../components/pageHeaderComponent/PageHeader.jsx'
import './ThingsToDoPage.css'

const EASE = [0.22, 1, 0.36, 1]
const HERO =
  'https://beytdwarka.com/assets/img/Home/gallery/DSC03900-min_11zon.webp'

const CATS = [
  { id: 'explore', label: 'Explore' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'entertainment', label: 'Entertainment' },
]

const G =
  'https://beytdwarka.com/assets/img/Home/gallery'

const EXPLORE = [
  {
    title: 'Padam Beach: Tranquil Retreat',
    copy: 'Explore the calm and peaceful environment of Padam Beach, perfect for relaxation and adventure.',
    src: `${G}/DSC03900-min_11zon.webp`,
    position: '50% 62%',
  },
  {
    title: 'Water Sports at Padam Beach',
    copy: 'Indulge in exciting water sports activities, from jet skiing to parasailing at Padam Beach.',
    src: `${G}/IMG-20240313-WA0054-min-min-min_11zon.webp`,
    position: '50% 42%',
  },
  {
    title: 'Marine Exploration',
    copy: 'Dive deep into marine life around Beyt Dwarka and uncover the hidden beauty beneath the waves.',
    src: `${G}/20230201_170445_11zon.jpg`,
    position: '50% 50%',
  },
  {
    title: 'Samiani Island: Glamping Getaway',
    copy: 'Enjoy a luxury camping experience on Samiani Island, with breathtaking views and serenity.',
    src: `${G}/camping11_11zon.webp`,
    position: '48% 42%',
  },
  {
    title: 'Shankh Sarovar: A Spiritual Oasis',
    copy: 'Find peace and spirituality at Shankh Sarovar, surrounded by sacred temples and calming waters.',
    src: `${G}/IMG_2511_4_11zon_11zon.webp`,
    position: '50% 35%',
  },
  {
    title: 'Dunny Point: History and Nature',
    copy: 'Discover the rich history and natural beauty at Dunny Point, a perfect blend of culture and nature.',
    src: `${G}/IMG_6206_7_11zon_11zon.webp`,
    position: '50% 48%',
  },
  {
    title: 'Boating at Beyt Dwarka',
    copy: 'Embark on a scenic boat ride along the coast of Beyt Dwarka, visiting ancient temples and serene beaches.',
    src: `${G}/IMG_2841_11zon.jpg`,
    position: '50% 38%',
  },
  {
    title: 'Hanuman Dandi Trail',
    copy: 'Take a spiritual hike on the Hanuman Dandi Trail, visiting revered temples amidst nature’s beauty.',
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop',
    position: '50% 60%',
  },
  {
    title: 'Sadhu Sea View Point: Scenic Beauty',
    copy: 'Enjoy breathtaking panoramic views of the sea and explore the historic Gurudwara nearby.',
    src: `${G}/20231003_182210-min-min-min_11zon.webp`,
    position: '50% 40%',
  },
  {
    title: 'Sundarvan Point Trail: Sacred Journey',
    copy: 'Walk along Sundarvan Point and visit the holy Dargahs along this sacred path.',
    src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1200&auto=format&fit=crop',
    position: '50% 55%',
  },
  {
    title: 'Shankholiya Point',
    copy: 'Visit the peaceful Shankh Holiya Point, with scenic views and a serene environment.',
    src: `${G}/IMG_2932_11zon.jpg`,
    position: '50% 42%',
  },
  {
    title: 'Beyt Dwarka Parikrama',
    copy: 'Take a spiritual walk around Beyt Dwarka, discovering local culture and culinary delights.',
    src: 'https://images.unsplash.com/photo-1661287416385-5c18354886ee?q=80&w=1200&auto=format&fit=crop',
    position: '42% 58%',
  },
  {
    title: 'Star Gazing at Beyt Dwarka',
    copy: 'Gaze at the starry skies at Beyt Dwarka and enjoy the therapeutic mud baths.',
    src: `${G}/20221227_164737_11zon.jpg`,
    position: '50% 48%',
  },
]

const EXPERIENCES = [
  {
    title: 'Divine Blessings from Lord Krishna at Beyt Dwarka Temple',
    copy: 'Experience the peace of serene beaches, thrilling adventures, and breathtaking sunsets at Padam Beach, all while seeking blessings from Lord Krishna.',
    src: `${G}/IMG_2511_4_11zon_11zon.webp`,
    position: '50% 35%',
  },
  {
    title: 'Divine Blessings from Local Temples',
    copy: 'Receive blessings from revered temples dedicated to Devakiji, Amba Mataji, Shri Rukmani Devi, Jambavati Devi, Satyabhama Devi, and Radhaji.',
    src: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    position: '50% 40%',
  },
  {
    title: 'Amazing Stays at Glamping and Campsites',
    copy: 'Marvel at stunning ocean views and enjoy the comfort of unique glamping experiences while exploring the rich heritage of Beyt Dwarka.',
    src: `${G}/camping11_11zon.webp`,
    position: '48% 42%',
  },
  {
    title: 'Discover the Museum of Sona ni Dwarka',
    copy: 'Relive the fascinating history of Beyt Dwarka at the Museum of Sona ni Dwarka, showcasing artifacts and stories from the past.',
    src: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=1200&auto=format&fit=crop',
    position: '50% 50%',
  },
  {
    title: 'Mud and Sand Bath Therapy',
    copy: 'Revitalize your senses with the ancient healing practices of mud and sand bath therapy, known for its detoxifying and skin-soothing benefits, set against the serene landscapes of Beyt Dwarka.',
    src: `${G}/20221227_164737_11zon.jpg`,
    position: '50% 48%',
  },
  {
    title: 'Divine Blessings at Shiv Mandir Nageshwar',
    copy: 'Experience spiritual tranquility and luxury by glamping or camping under the stars on the beautiful Samiani Island, near the revered Shiv Mandir.',
    src: `${G}/20231003_182210-min-min-min_11zon.webp`,
    position: '50% 40%',
  },
  {
    title: 'Savour Delectable Food',
    copy: 'Embark on a culinary journey amidst the serene landscapes of Beyt Dwarka, enjoying local delicacies that reflect the region’s vibrant culture.',
    src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop',
    position: '50% 50%',
  },
  {
    title: 'Divine Blessings from Lord Hanuman and Makardhwaja',
    copy: 'Find divine peace amidst the temples dedicated to Lord Hanuman, Devakiji, and Amba Mataji, surrounded by lush landscapes.',
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop',
    position: '50% 60%',
  },
  {
    title: 'Divine Blessings at Beyt Dwarka Gurudwara',
    copy: 'Step into history at the Gurudwara established by Bhai Mohkam Singh, where spirituality meets scenic views of Dunny Point.',
    src: `${G}/IMG_6206_7_11zon_11zon.webp`,
    position: '50% 48%',
  },
  {
    title: 'Divine Blessings at Haji Kirmani Dargah and Sidi Bawa Peer Dargah',
    copy: 'Embark on an unforgettable boat ride along Beyt Dwarka’s coastlines, visiting historic temples and immersing yourself in rich heritage.',
    src: `${G}/IMG_2841_11zon.jpg`,
    position: '50% 38%',
  },
  {
    title: 'Dolphin Safari',
    copy: 'Embark on a thrilling Dolphin Safari and witness these majestic creatures in their natural habitat!',
    src: `${G}/20230201_170445_11zon.jpg`,
    position: '50% 50%',
  },
  {
    title: 'Scuba Diving',
    copy: 'Dive into the crystal-clear waters of Beyt Dwarka and explore a mesmerizing underwater world with our Scuba Diving experience!',
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    position: '50% 45%',
  },
]

const ENTERTAINMENT = [
  {
    title: 'Sea Theater',
    copy: 'Enjoy a magical outdoor cinema experience right on the beach, where the beauty of nature meets the charm of film under the stars!',
    src: `${G}/20231003_182210-min-min-min_11zon.webp`,
    position: '50% 40%',
    soon: true,
  },
  {
    title: 'Beach Dance',
    copy: 'Celebrate and groove to the rhythms by the shore with breathtaking views of the sea.',
    src: `${G}/IMG-20240313-WA0054-min-min-min_11zon.webp`,
    position: '50% 42%',
  },
  {
    title: 'Music Festival',
    copy: 'Feel the beat at Beyt Dwarka’s vibrant music festival and relive the island’s rich cultural history.',
    src: `${G}/IMG_6206_7_11zon_11zon.webp`,
    position: '50% 48%',
  },
  {
    title: 'Kite Festival',
    copy: 'Fly high at the Beyt Dwarka Kite Festival and witness colorful skies at Padam Beach.',
    src: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=1200&auto=format&fit=crop',
    position: '50% 35%',
  },
  {
    title: 'Bonfire & DJ Night',
    copy: 'Enjoy a magical night with bonfires and live DJ performances under the starry skies of Beyt Dwarka.',
    src: `${G}/camping11_11zon.webp`,
    position: '48% 42%',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

function ThingsToDoPage() {
  const { hash } = useLocation()
  const active = hash.replace('#', '') || 'explore'
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-48px' },
      }

  return (
    <main className="todo">
      <PageHeader
        crumb={[
          { label: 'Home', href: '/' },
          { label: 'Things To Do' },
        ]}
        kicker="Things to do"
        title={
          <>
            Explore, experience, and <em>entertain</em> on the island.
          </>
        }
        titleId="todo-title"
        lead="Three clear paths — beaches and trails, island hours, and time on the water. Start with Explore."
        src={HERO}
        position="50% 62%"
      />

      <nav className="todo-tabs" aria-label="Things to do categories">
        <div className="todo-tabs__row container">
          {CATS.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`todo-tabs__link${active === cat.id ? ' is-on' : ''}`}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        className="todo-block section"
        id="explore"
        aria-labelledby="explore-title"
      >
        <motion.div className="todo-block__wrap container" {...motionProps}>
          <motion.header className="todo-block__header" variants={fadeUp}>
            <p className="todo-block__crumb">
              <a href="/">Home</a>
              <span>/</span>
              Explore
            </p>
            <h2 className="todo-block__title" id="explore-title">
              Explore
            </h2>
            <p className="todo-block__lead">
              Discover cozy stays, beautiful beaches, and vibrant culture in
              Beyt Dwarka with us!
            </p>
          </motion.header>

          <TodoCards items={EXPLORE} />
        </motion.div>
      </section>

      <section
        className="todo-block todo-block--mute section"
        id="experiences"
        aria-labelledby="todo-exp-title"
      >
        <motion.div className="todo-block__wrap container" {...motionProps}>
          <motion.header className="todo-block__header" variants={fadeUp}>
            <p className="todo-block__crumb">
              <a href="/">Home</a>
              <span>/</span>
              Experiences
            </p>
            <h2 className="todo-block__title" id="todo-exp-title">
              Experiences
            </h2>
            <p className="todo-block__lead">
              Immerse yourself in the spiritual serenity of Beyt Dwarka’s
              temples and rich cultural heritage, while enjoying delightful
              accommodations!
            </p>
          </motion.header>

          <TodoCards items={EXPERIENCES} />
        </motion.div>
      </section>

      <section
        className="todo-block section"
        id="entertainment"
        aria-labelledby="todo-ent-title"
      >
        <motion.div className="todo-block__wrap container" {...motionProps}>
          <motion.header className="todo-block__header" variants={fadeUp}>
            <p className="todo-block__crumb">
              <a href="/">Home</a>
              <span>/</span>
              Entertainment
            </p>
            <h2 className="todo-block__title" id="todo-ent-title">
              Entertainment
            </h2>
            <p className="todo-block__lead">
              Experience cozy, clean, and convenient accommodations at the
              various campsites of Beyt Dwarka, with plenty of entertainment
              options!
            </p>
          </motion.header>

          <TodoCards items={ENTERTAINMENT} />
        </motion.div>
      </section>

      <Cta />
    </main>
  )
}

function TodoCards({ items }) {
  return (
    <div className="todo-list">
      {items.map((item, index) => (
        <motion.article key={item.title} className="todo-card" variants={fadeUp}>
          <div className="todo-card__media">
            <img
              src={item.src}
              alt=""
              loading="lazy"
              style={{ objectPosition: item.position }}
            />
          </div>
          <span className="todo-card__no">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="todo-card__body">
            {item.soon ? <span className="todo-card__soon">Coming soon</span> : null}
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

export default ThingsToDoPage
