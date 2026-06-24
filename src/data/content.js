export const BRAND = { name: 'PULSE', tagline: 'Train Stronger Every Day' }

export const NAV_LINKS = [
  { label: 'Classes', href: '#classes' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Pricing', href: '#pricing' },
]

export const HERO = {
  headline: ['Train', 'Stronger', 'Every', 'Day'],
  subcopy:
    'Elite coaching, cutting-edge equipment, and a community that pushes you further. Your fitness journey starts here.',
  ctas: [
    { label: 'Start Free Trial', href: '#', primary: true },
    { label: 'See How It Works', href: '#', primary: false },
  ],
  stats: [
    { value: '400+', label: 'Members' },
    { value: '15+', label: 'Certified Trainers' },
    { value: '24/7', label: 'Access' },
  ],
  orbitCards: [
    { icon: '🏋️', label: 'Strength' },
    { icon: '❤️', label: 'Cardio' },
    { icon: '🧘', label: 'Yoga' },
    { icon: '⚡', label: 'HIIT' },
    { icon: '🥗', label: 'Nutrition' },
    { icon: '🔄', label: 'Recovery' },
  ],
}

export const FEATURES = [
  {
    icon: '🏆',
    title: 'Expert Coaching',
    desc: 'Certified trainers design every program to match your goals and experience level.',
  },
  {
    icon: '🛠️',
    title: 'Premium Equipment',
    desc: 'Top-tier machines, free weights, and recovery gear for every workout style.',
  },
  {
    icon: '👥',
    title: 'Community Vibe',
    desc: 'Small classes, big energy. Train alongside people who show up every day.',
  },
  {
    icon: '📊',
    title: 'Track Progress',
    dec: 'Real-time performance tracking and monthly assessments to keep you on target.',
  },
]

export const CLASSES = [
  { title: 'Powerlifting', icon: '🏋️', desc: 'Build raw strength with compound lifts and progressive overload.', schedule: 'Mon / Wed / Fri 6am & 5pm' },
  { title: 'HIIT Blast', icon: '⚡', desc: 'High-intensity intervals to torch calories and boost endurance.', schedule: 'Tue / Thu / Sat 7am & 12pm' },
  { title: 'Vinyasa Flow', icon: '🧘', desc: 'Dynamic yoga linking breath with movement for flexibility & focus.', schedule: 'Daily 8am & 6pm' },
  { title: 'Boxing', icon: '🥊', desc: 'Punch, dodge, and condition with bag work and pad drills.', schedule: 'Mon / Wed / Fri 7am & 6pm' },
  { title: 'Spin Cycle', icon: '🚴', desc: 'High-energy indoor cycling with timed sprints and climbs.', schedule: 'Tue / Thu 6am & 5:30pm' },
  { title: 'Recovery', icon: '🔄', desc: 'Mobility, stretching, and foam rolling to improve recovery.', schedule: 'Sat / Sun 9am & 11am' },
]

export const TRAINERS = [
  { name: 'Maya Chen', role: 'Head Strength Coach', bio: '10+ years coaching powerlifters and everyday athletes.', img: '' },
  { name: 'Leo Torres', role: 'HIIT & Conditioning', bio: 'Former competitive sprinter turned high-intensity specialist.', img: '' },
  { name: 'Priya Sharma', role: 'Yoga & Mobility', bio: 'RYT-500 certified with a focus on functional flexibility.', img: '' },
  { name: 'Jake Morrison', role: 'Boxing & Functional', bio: 'Amateur boxer with a passion for functional fitness.', img: '' },
]

export const PRICING = [
  {
    tier: 'Basic',
    price: 29,
    period: '/month',
    features: ['Gym access 6am–10pm', 'Locker room access', 'Free fitness assessment', 'Mobile workout log'],
    highlighted: false,
  },
  {
    tier: 'Pro',
    price: 59,
    period: '/month',
    features: ['24/7 gym access', 'Unlimited classes', '1 personal training session/mo', 'Nutrition consultation', 'Priority booking'],
    highlighted: true,
  },
  {
    tier: 'Elite',
    price: 99,
    period: '/month',
    features: ['Everything in Pro', '4 PT sessions/mo', 'Recovery suite access', 'Custom meal plans', 'Guest passes (x2)', 'Exclusive merch pack'],
    highlighted: false,
  },
]

export const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'X', href: '#' },
]
