export interface Project {
  slug: string
  title: string
  subtitle: string
  description?: string
  client?: string
  category: string
  date?: string
  externalUrl?: string
  imageUrl?: string
  coverImage?: string
  tags?: string[]
}

export interface Milestone {
  role: string
  company: string
  year: string
  description?: string
}

export interface Award {
  title: string
  date: string
  organization?: string
  logoUrl?: string
}

export interface BrandPartner {
  name: string
  logoUrl: string
}

export interface ToolSkill {
  name: string
  description: string
  category?: string
  iconUrl?: string
}

export interface Certification {
  title: string
  issuer: string
  credentialUrl?: string
  imageUrl?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface PortfolioProfile {
  name: string
  headline: string
  subheadline: string
  bioHighlight: string
  location: string
  stats: string
  whatsappUrl: string
  behanceUrl: string
  cvUrl: string
  email: string
  phone: string
  copyright: string
  avatarUrl?: string
  portraitUrl?: string
  socialLinks: SocialLink[]
}
