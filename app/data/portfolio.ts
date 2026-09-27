import type {
  PortfolioProfile,
  Project,
  Milestone,
  Award,
  ToolSkill,
  Certification
} from '../types/portfolio'

export const profileData: PortfolioProfile = {
  name: 'Aulia Anggraeni',
  headline: 'UI/UX Designer | Graphic Designer',
  subheadline: "Let's make it happen",
  bioHighlight: "Good design is invisible. — Mine isn't.",
  location: 'Located in Jakarta, available worldwide.',
  stats: '20+ projects · Visuals that stop the scroll. Interfaces that keep them there.',
  whatsappUrl: 'https://wa.me/62895330188539',
  behanceUrl: 'https://www.behance.net/auliaggr',
  cvUrl: 'https://drive.google.com/file/d/1h7JciFN7T6Ba0N-62YUKiEn5ubLRL3U_/view?usp=sharing',
  email: 'auliaggrr@gmail.com',
  phone: '(+62) 895330188539',
  copyright: '© Copyright 2026. All rights Reserved.',
  avatarUrl: '/images/framer/b9b0uWvMTsgD4uE1e7oWavando0.png',
  portraitUrl: '/images/framer/ukCxeFXctWLPk9NuHWUUv8R9G1A.png',
  socialLinks: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/auliaggr/', icon: 'linkedin' },
    { name: 'Behance', url: 'https://www.behance.net/auliaggr', icon: 'behance' },
    { name: 'Dribbble', url: 'https://dribbble.com/auliaggr', icon: 'dribbble' },
    { name: 'Instagram', url: 'https://instagram.com/auliaggr', icon: 'instagram' }
  ]
}

export const projectsData: Project[] = [
  {
    slug: 'rorojonggrang',
    title: 'Kisah Roro Jonggrang',
    subtitle: 'Discover the Magic of Nusantara.',
    description: 'An AR-based educational game that brings the Roro Jonggrang legend to life through interactive storytelling, gamified cultural learning, and immersive 3D elements.',
    client: 'IPB University',
    category: 'UI/UX, App, Graphic Design',
    date: 'Jun 23, 2025',
    externalUrl: 'https://www.behance.net/gallery/244060707/RORO-JONGGRANG-AR-INTERACTIVE-FOLKLORE-LEARNING',
    coverImage: '/images/framer/J1RSxjBcZXhjk8eXpBlTksoQ1Qs.png',
    tags: ['Augmented Reality', 'Education', 'Mobile App', 'Gamification']
  },
  {
    slug: 'hyperaid',
    title: 'HyperAid',
    subtitle: 'Hypertension Monitoring Application',
    description: 'A proactive healthcare monitoring application designed to help patients monitor hypertension symptoms, track daily health metrics, and easily communicate with specialists.',
    client: 'Health Tech Research',
    category: 'UI/UX, Mobile App',
    date: '2025',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/SvUL8y3GjBTTxO4Chz8etdB30.jpg',
    tags: ['Healthcare', 'Mobile App', 'UI/UX']
  },
  {
    slug: 'voxplore',
    title: 'Voxplore',
    subtitle: 'Interactive 3D AR Campus Map for SV IPB University',
    description: 'An interactive 3D augmented reality campus map navigation tool crafted to help students, visitors, and faculty explore campus facilities seamlessly.',
    client: 'SV IPB University',
    category: 'UI/UX, 3D AR Design',
    date: '2025',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/mUDibeSoFeRO5bfxVSFwyVHcxk.jpg',
    tags: ['3D', 'AR', 'Campus Map', 'Interactive']
  },
  {
    slug: 'foody',
    title: 'Foody',
    subtitle: 'AI nutrition for BMI, meal tracking & personalized food picks.',
    description: 'An AI-powered nutritional companion offering real-time BMI tracking, intelligent meal recommendations, and customized meal planning based on dietary preferences.',
    client: 'FoodTech',
    category: 'UI/UX, AI Product Design',
    date: '2024',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/PiXLGIkyiEyimV1YtLdttZu8.jpg',
    tags: ['AI', 'Nutrition', 'Mobile App']
  },
  {
    slug: 'bidthrift',
    title: 'BidThrift+',
    subtitle: 'Curated Thrifting & Auction Marketplace',
    description: 'A digital marketplace enabling eco-conscious fashion lovers to bid, buy, and trade vintage goods securely.',
    client: 'E-Commerce Venture',
    category: 'UI/UX, E-Commerce',
    date: '2024',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/18LrDGuzV3e49jjmxkXiOW0IH6w.jpg',
    tags: ['Marketplace', 'Auction', 'E-commerce']
  },
  {
    slug: 'gamebuddy',
    title: 'Gamebuddy',
    subtitle: 'Internet Cafe Booking Platform',
    description: 'Streamlined online seat reservation and community management platform for esports hubs and internet cafes.',
    client: 'Gaming Hub',
    category: 'UI/UX, Web & Mobile',
    date: '2024',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/czQ394H7zsdd5hChTcm1wMUvxM.jpg',
    tags: ['Booking', 'Esports', 'Platform']
  },
  {
    slug: 'ndrey-kitchen',
    title: 'Ndrey Kitchen',
    subtitle: 'Online Food Ordering App',
    description: 'A high-converting online food ordering experience tailored for local culinary delights with seamless delivery tracking.',
    client: 'Ndrey Kitchen',
    category: 'UI/UX, Food Delivery',
    date: '2024',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/aV9wztX6XkvhjtYLOFTpQxgGE.jpg',
    tags: ['Food Delivery', 'Mobile App']
  },
  {
    slug: 'traspotter',
    title: 'Traspotter',
    subtitle: 'Waste detection app for smarter sorting.',
    description: 'An AI-assisted environmental utility helping communities classify recyclable materials accurately via smartphone cameras.',
    client: 'Green Initiative',
    category: 'UI/UX, AI Utility',
    date: '2024',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/ZtSlD4Zhsvv7KWwEkhnA95Rw5s.jpg',
    tags: ['Sustainability', 'Computer Vision']
  },
  {
    slug: 'drezzle',
    title: 'Drezzle',
    subtitle: 'Women’s dress app for discovering styles.',
    description: 'A style discovery mobile application combining algorithmic curation with visual search for modern women fashion.',
    client: 'Fashion Retail',
    category: 'UI/UX, Fashion App',
    date: '2024',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/1dZDmxHTLSUHNz27QnbE4w1M.jpg',
    tags: ['Fashion', 'Discovery']
  },
  {
    slug: 'mentalup',
    title: 'MentalUp',
    subtitle: 'Mental Health Consultation App with a Psychologist',
    description: 'A confidential, empathetic telehealth platform connecting certified psychologists with individuals seeking mental wellness support.',
    client: 'Wellness Hub',
    category: 'UI/UX, Healthcare',
    date: '2024',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/5sZZHqytGiyTVwVO5obJvw7nGg.jpg',
    tags: ['Telehealth', 'Mental Health']
  },
  {
    slug: 'clotie',
    title: 'Clotie',
    subtitle: 'Women’s fashion e-commerce.',
    description: 'An elegant apparel e-commerce store with smooth micro-interactions and quick checkout flows.',
    client: 'Fashion Brand',
    category: 'UI/UX, E-Commerce',
    date: '2023',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/XJ8TttsY9AJ1Qw7EoY1jBtp9jxw.jpg',
    tags: ['E-commerce', 'Minimalist']
  },
  {
    slug: 'ousean-pay',
    title: 'Ousean Pay',
    subtitle: 'Digital wallet app',
    description: 'A modern fintech mobile application supporting peer-to-peer transfers, bill settlements, and financial budgeting.',
    client: 'Fintech Studio',
    category: 'UI/UX, Fintech',
    date: '2023',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/D91itc5JxPsqQ4k9vpuKLkCKoM.jpg',
    tags: ['Fintech', 'Mobile Wallet']
  },
  {
    slug: 'ontravel',
    title: 'Ontravel',
    subtitle: 'App for finding routes, hotels, and trips easily.',
    description: 'An all-in-one travel companion designed to simplify itinerary organization, flight tracking, and boutique hotel bookings.',
    client: 'Travel Agency',
    category: 'UI/UX, Travel',
    date: '2023',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/CNaGt3Vd0iF2uoYcdFoQl8Hvws.jpg',
    tags: ['Travel', 'Booking']
  },
  {
    slug: 'morker',
    title: 'Morker',
    subtitle: 'Interactive company dashboard.',
    description: 'An analytical corporate portal featuring real-time data visualizations, team KPI tracking, and operational dashboards.',
    client: 'Enterprise Client',
    category: 'UI/UX, Dashboard',
    date: '2023',
    externalUrl: 'https://www.behance.net/auliaggr',
    coverImage: '/images/framer/ahVGoaitWDMxyo3pnM8jMNwOMc.jpg',
    tags: ['B2B', 'SaaS', 'Dashboard']
  }
]

export const journeyData: Milestone[] = [
  { role: 'Graphic Designer Intern', company: 'Aiti Media', year: '2026' },
  { role: 'UI/UX Designer Mentor', company: 'Ousean School', year: '2026' },
  { role: 'Fullstack Developer', company: 'PLN Icon Plus', year: '2025' },
  { role: 'Graphic Designer', company: 'Nuansart.Keychain', year: '2024' },
  { role: 'UI/UX Designer', company: 'Polairud', year: '2021' }
]

export const awardsData: Award[] = [
  {
    title: '1st Place Winner in UI/UX Design at Switchfest',
    date: 'Sep 9, 2024',
    organization: 'UIN Walisongo'
  },
  {
    title: '3rd Place Winner in UI/UX Design at Techsprint',
    date: 'Mar 3, 2024',
    organization: 'Reclas Technology'
  }
]

export const toolsData: ToolSkill[] = [
  {
    name: 'Figma',
    description: 'Leading design tool for UI/UX & systems',
    category: 'UI/UX Design',
    iconUrl: '/images/framer/HPbAOefqTKNJ0RaNwYD2M2LRsI.svg'
  },
  {
    name: 'Framer',
    description: 'Interactive responsive website builder',
    category: 'No-Code & Motion',
    iconUrl: '/images/framer/ySapg2uTxrZTtNT0Q3seiqK7Ws.svg'
  },
  {
    name: 'Adobe Photoshop',
    description: 'Raster graphics & photo manipulation',
    category: 'Visual Design',
    iconUrl: '/images/framer/d415nCGSohpGjeGP5mpZV9p9EU.svg'
  },
  {
    name: 'Adobe Illustrator',
    description: 'Vector design & brand identity systems',
    category: 'Graphic Design',
    iconUrl: '/images/framer/QQhTOClhfQfJVVVgNKNpiNHNAQ.svg'
  },
  {
    name: 'Blender',
    description: '3D modeling & spatial environments',
    category: '3D & AR',
    iconUrl: '/images/framer/Q7kGC7ssDlHnhgm8b8T5XImyR0.svg'
  },
  {
    name: 'Webflow',
    description: 'Responsive web layout engineering',
    category: 'Web Design',
    iconUrl: '/images/framer/b1nONhD7ssDJtMjxVYP3pzQ5oY.svg'
  }
]

export const certificationsData: Certification[] = [
  { title: '1st Place Winner in UI/UX Design', issuer: 'Switchfest, UIN Walisongo' },
  { title: '3rd Place Winner in UI/UX Design', issuer: 'Techsprint, Reclas Technology' },
  { title: 'UI/UX Design Mastery', issuer: 'Skilvul' },
  { title: 'Complete UI Designer', issuer: 'BuildWithAngga' },
  { title: 'Software Engineer', issuer: 'LSP Vokasi IPB (BNSP)' },
  { title: 'Computer Programming', issuer: 'BNSP / LSP SMK Negeri 12 Jakarta' },
  { title: 'Software & Game Development', issuer: 'PLN Icon Plus (Internship)' },
  { title: 'Software Engineering', issuer: 'IPB University' },
  { title: 'Design, Documentation & Branding', issuer: 'MPKMB 60, Sekolah Vokasi IPB' },
  { title: 'UI/UX Designer Web COMPRO', issuer: 'PT Buatin Creative Group' },
  { title: 'Mentor Poster Prestasi Goes To You', issuer: 'IPB University / Ditmawa' },
  { title: 'Design, Decoration & Branding', issuer: 'Scholarship for Reach a Dream' },
  { title: 'Front End Web Development', issuer: 'Udemy' },
  { title: 'Pemrograman Dengan Python', issuer: 'Dicoding Academy' },
  { title: 'MPKMB (Student Orientation)', issuer: 'IPB University' },
  { title: 'Field Work Practice (PKL)', issuer: 'Korpolairud Baharkam Polri' }
]

export const brandPartners = [
  'IPB University', 'PLN Icon Plus', 'Aiti Media', 'Ousean School',
  'Polairud', 'Switchfest', 'Techsprint', 'Skilvul', 'BuildWithAngga'
]

export const portfolioData = {
  profile: profileData,
  projects: projectsData,
  journey: journeyData,
  awards: awardsData,
  tools: toolsData,
  certifications: certificationsData,
  brands: brandPartners
}
