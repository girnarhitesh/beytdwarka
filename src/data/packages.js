const img = (path) => `${import.meta.env.BASE_URL}${path}`

const PHOTOS = {
  beach: img(`Images/ShowcaseImages/${encodeURIComponent('image copy.png')}`),
  harbour: img('Images/ShowcaseImages/image.png'),
  island: img('Images/beytdwarka-hero-background-image.png'),
}

export const PACKAGES = [
  {
    slug: 'padam',
    kicker: 'Beach day',
    name: 'Enjoy Padam Beach',
    short: 'Padam Beach',
    tagline:
      'Experience the beauty of a peaceful coastal paradise at Beyt Dwarka.',
    price: 499,
    priceNote: '+ Tax',
    durationLabel: 'Duration',
    duration: '4 Hours of Beach Time',
    src: PHOTOS.beach,
    position: '48% 62%',
    storySrc: PHOTOS.island,
    storyPosition: '68% 42%',
    inclusions: [
      '1 bottle of mineral water (1L) per person',
      'One-time tea/coffee with cookies and one hot snack',
      'Exclusive beach access',
      'Wash and change facilities',
      'Water sports available on a chargeable basis',
    ],
    story: {
      title: 'Discover Padam Beach, Beyt Dwarka',
      body: 'Escape to the serene coastline of Beyt Dwarka and enjoy a relaxing beach experience surrounded by the beauty of Gujarat’s Arabian Sea. Spend four hours by the shore, unwind with refreshments, and enjoy the beach at your own pace. For adventure seekers, optional water sports are also available on a chargeable basis.',
    },
  },
  {
    slug: 'enjoy',
    kicker: 'Full day',
    name: 'Enjoy Beyt Dwarka',
    short: 'Enjoy Beyt Dwarka',
    tagline: 'A full day with meals, wellness, and time on Padam Beach.',
    price: 1499,
    priceNote: '+ Tax',
    durationLabel: 'Duration',
    duration: '8 Hours · 09:30 AM – 05:30 PM',
    src: PHOTOS.harbour,
    position: '70% 80%',
    storySrc: PHOTOS.beach,
    storyPosition: '48% 62%',
    inclusions: [
      'Pick-up and drop from parking',
      '1 L mineral water, tea and cookies',
      'Exclusive beach access with wash and change',
      'One hot snack',
      'Sand bath and mud therapy',
      'Guided marine / beach walk',
      'Veg lunch and evening hi-tea',
      'Water sports available on a chargeable basis',
    ],
    story: {
      title: 'A full day on the island',
      body: 'Arrive in the morning for a complete Beyt Dwarka day — beach time, a slow wellness hour, a guided walk, and meals by the shore. Keep the pace easy, and add water sports if you want a little more on the water.',
    },
  },
  {
    slug: 'darshan',
    kicker: 'Temple day',
    name: 'Beyt Dwarka Darshan',
    short: 'Beyt Dwarka Darshan',
    tagline: 'Guided temple visits by AC car, with prasad and island heritage.',
    price: 1999,
    priceNote: '+ Tax',
    durationLabel: 'Duration',
    duration: 'Guided · 2–6 guests per car',
    src: PHOTOS.island,
    position: '50% 38%',
    storySrc: PHOTOS.harbour,
    storyPosition: '70% 80%',
    inclusions: [
      'Pick-up by AC car',
      '1 L mineral water, tea and cookies',
      'Temple darshan with guide and prasad',
      'Hanuman Dandi Temple',
      'Golden Dwarka Museum ticket',
    ],
    story: {
      title: 'Darshan on Beyt Dwarka',
      body: 'Travel by AC car for a quieter temple loop — Dwarkadhish, Hanuman Dandi, and a short museum hour. Built for small groups of two to six, with a guide and prasad along the way.',
    },
  },
]

export function getPackage(slug) {
  return PACKAGES.find((item) => item.slug === slug)
}
