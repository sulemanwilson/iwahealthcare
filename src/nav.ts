export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
] as const

export const COMPANY_NAME = 'INTEGRATED WELLNESS ASSOCIATES (SMC-Pvt) LTD'
export const LOGO_SRC = 'https://res.cloudinary.com/opwybh2g/image/upload/v1791636283/IWA_Healthcare_Sticker_Logo.png'

/** Official SECP emblem supplied by the client; displayed unmodified. */
export const SECP_LOGO_SRC = 'https://res.cloudinary.com/opwybh2g/image/upload/v1791707170/SECP_Emblem_Sticker_Logo.png'

export const CONTACT_EMAIL = 'info@iwahealthcare.com'
export const WHATSAPP_URL = 'https://wa.me/923214069908'
export const WHATSAPP_DISPLAY = '+92 321 4069908'

export const PHONE_DISPLAY = '0321-4069908'
export const PHONE_HREF = 'tel:+923214069908'
export const WEBSITE_URL = 'https://www.iwahealthcare.com'
export const WEBSITE_DISPLAY = 'www.iwahealthcare.com'

/**
 * Social profile URLs. Paste the real, verified URL into `url` to activate each icon.
 * While `url` is empty the icon renders as a disabled placeholder (no dead links).
 */
export const SOCIAL_LINKS: { name: 'Facebook' | 'Instagram' | 'LinkedIn'; url: string }[] = [
  { name: 'Facebook', url: 'https://www.facebook.com/share/18Eq5tNoCK/' },
  { name: 'Instagram', url: 'https://www.instagram.com/iwa_healthcare_official' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/suleman-wilson-%F0%9F%94%84-3762323b3' },
]
