const G = 'https://beytdwarka.com/assets/img/Home/gallery'

export const MEAL_PLANS = [
  { id: 'bb', label: 'Breakfast' },
  { id: 'map', label: 'Breakfast and Dinner' },
  { id: 'ap', label: 'Breakfast, Lunch and Dinner' },
]

export const CAMPS = [
  {
    slug: 'elysium',
    kicker: 'Overnight stay',
    name: 'Elysium Camp Site',
    short: 'Elysium rooms',
    tagline:
      'AC rooms with attached washroom, twin sharing, on the island shore.',
    from: 3500,
    unit: 'per person / night',
    taxNote: 'Rates as listed',
    checkIn: '12 noon',
    checkOut: '09 AM',
    src: `${G}/camping11_11zon.webp`,
    position: '50% 28%',
    storySrc: `${G}/DSC03900-min_11zon.webp`,
    storyPosition: '50% 62%',
    rooms: [
      {
        name: 'Swiss Cottage Sea View',
        note: 'AC with Attached Washroom',
        rates: { bb: 4000, map: 4500, ap: 5000 },
      },
      {
        name: 'Container Room',
        note: 'AC with Attached Washroom',
        rates: { bb: 3500, map: 4000, ap: 4500 },
      },
      {
        name: 'Extra Adult / Child',
        note: 'Add-on occupancy',
        rates: { bb: 2000, map: 2500, ap: 3000 },
      },
    ],
    highlights: [
      'Twin sharing',
      'Meal plan as booked',
      'Marine walk or dolphin safari',
    ],
    inclusions: [
      { icon: 'stay', title: 'Per person per night on twin sharing' },
      { icon: 'meals', title: 'Meal plan as per package' },
      { icon: 'walk', title: 'Complimentary marine / beach walk or dolphin safari' },
      { icon: 'sun', title: 'Check-in 12 noon' },
      { icon: 'moon', title: 'Check-out 09 AM' },
    ],
    story: {
      title: 'A proper night on the shore',
      body: 'Elysium is the island stay with an attached washroom and air-conditioning. Pick Swiss Cottage for a sea view, a Container Room for a compact AC cabin, or add an extra adult. Rates are per person, per night, with breakfast, breakfast and dinner, or breakfast, lunch and dinner.',
    },
  },
  {
    slug: 'camping',
    kicker: 'Island camping',
    name: 'Beyt Dwarka Camping',
    short: 'Alpine tent',
    tagline:
      'A full island night — tent stay, meals, safari, and a bonfire close.',
    price: 3000,
    unit: 'per person',
    taxNote: 'Incl. GST',
    checkIn: '10 AM',
    checkOut: '09 AM',
    src: `${G}/20231003_182210-min-min-min_11zon.webp`,
    position: '50% 55%',
    storySrc: `${G}/camping11_11zon.webp`,
    storyPosition: '50% 28%',
    highlights: [
      'Alpine tent',
      'All meals',
      'Dolphin safari',
      'Bonfire & DJ',
      'Marine walk',
      'Mud therapy',
    ],
    inclusions: [
      { icon: 'stay', title: 'Alpine tent on sharing basis with mattress, blanket and pillow' },
      { icon: 'meals', title: '02 breakfast, 02 lunch, 01 dinner' },
      { icon: 'bath', title: 'Common wash and change facility' },
      { icon: 'beach', title: 'Beach activities' },
      { icon: 'walk', title: 'Guided marine walk' },
      { icon: 'sun', title: 'Sunset point / sunrise point' },
      { icon: 'therapy', title: 'Sand bath and mud therapy' },
      { icon: 'games', title: 'Indoor and outdoor games at camp site' },
      { icon: 'fire', title: 'Bonfire with DJ and Garba' },
      { icon: 'sports', title: 'Dolphin safari' },
      { icon: 'sun', title: 'Check-in 10 AM' },
      { icon: 'moon', title: 'Check-out 09 AM' },
      { icon: 'ticket', title: 'Inclusive of GST' },
    ],
    story: {
      title: 'One night under canvas',
      body: 'The camping package is the full island loop in a sharing alpine tent. Meals, a marine walk, mud therapy, games, a dolphin safari, and a bonfire with DJ and Garba are included — check in at 10 AM and leave by 09 AM, GST in.',
    },
  },
]

export function getCamp(slug) {
  return CAMPS.find((item) => item.slug === slug)
}
