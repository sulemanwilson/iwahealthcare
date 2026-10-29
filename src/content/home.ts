import { CONTACT_EMAIL } from '../nav'

/**
 * Optimised Cloudinary delivery (auto format/quality, capped width).
 * Remove this wrapper if "strict transformations" is enabled on the account.
 */
export const img = (url: string, width = 1400) =>
  url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`)

/** Responsive candidates so small screens don't download desktop-sized photos. */
export const imgSet = (url: string, widths: number[]) => widths.map((w) => `${img(url, w)} ${w}w`).join(', ')

const base = 'https://res.cloudinary.com/opwybh2g/image/upload'

export const IMAGES = {
  hero: `${base}/v1791643473/pexels-rdne-6129676.jpg`,
  hospital: `${base}/v1791643545/pexels-cristian-rojas-8460371.jpg`,
  homeNursing: `${base}/v1791643607/pexels-cristian-rojas-8460414.jpg`,
  physio: `${base}/v1791643656/pexels-funkcines-terapijos-centras-927573878-20860622.jpg`,
  clinic: `${base}/v1791643668/pexels-silverkblack-39192382.jpg`,
  caregivers: `${base}/v1791644928/pexels-jsme-mila-523821574-18459210.jpg`,
  /** Founder portrait. */
  founder: `${base}/v1792935951/WhatsApp_Image_2026-10-25_at_6.19.41_PM.jpg`,
}

export const CUIN = '0357337'

export const HERO = {
  tagline: '“Integrated Care, Inspired Wellness”',
  headline: '“Bridging the Gap Between Care & Those Who Need It”',
  subheadline:
    "“Pakistan's Trusted Healthcare Staffing Partner - Providing Qualified, Verified & Reliable Medical Staff for Hospitals, Clinics & Homes.”",
  trust: '“An Official Project of INTEGRATED WELLNESS ASSOCIATES (SMC-Pvt) LTD - SECP Registered Company”',
}

export const INTRO = {
  title: 'WHAT IS IWA HEALTHCARE?',
  body: 'IWA Healthcare is a specialized healthcare staffing and home-care service provider. We provide highly trained and professional staff for both clinical and home settings.',
  servicesHeading: 'Our Core Services Include:',
}

/** Local-intent line (added for SEO; not part of the original supplied copy). */
export const LAHORE_NOTE =
  'Home nursing, physiotherapy and caregiver services in Lahore, with healthcare staffing for hospitals and clinics across Pakistan.'

export const SERVICES = [
  {
    title: 'Hospital Staffing Solutions',
    text: 'Providing qualified Nurses, Paramedical Staff, and Support Staff to leading hospitals.',
    image: IMAGES.hospital,
    alt: 'Medical staff working in a hospital',
  },
  {
    title: 'Clinic Staffing',
    text: 'Reliable and skilled staff for private clinics and medical centers.',
    image: IMAGES.clinic,
    alt: 'Medical staff at a clinic',
  },
  {
    title: 'Home Nursing Services',
    text: 'Professional, compassionate nursing care in the comfort of your home.',
    image: IMAGES.homeNursing,
    alt: 'Nurse caring for a patient at home',
  },
  {
    title: 'Physiotherapy at Home & On-Site',
    text: 'Licensed and experienced physiotherapists for recovery and rehabilitation.',
    image: IMAGES.physio,
    alt: 'Physiotherapist helping a patient with exercises',
  },
  {
    title: 'Caregivers & Patient Attendants',
    text: 'Trained attendants for elderly care, post-operative care, and long-term patient support.',
    image: IMAGES.caregivers,
    alt: 'Caregiver assisting a patient',
  },
] as const

export const WHY_INTRO = {
  title: 'WHY CHOOSE IWA HEALTHCARE?',
  body: '“When it comes to health, you cannot compromise. Here is why hospitals, clinics, and families trust us:”',
}

export const WHY = [
  {
    title: '1. 100% Verified Staff:',
    text: 'Every single staff member undergoes strict document verification and police verification for your complete peace of mind and security.',
  },
  {
    title: '2. Qualified & Trained Professionals:',
    text: 'We provide only qualified, certified, and experienced staff - including Registered Nurses, LHVs, Midwives, and Certified Physiotherapists.',
  },
  {
    title: '3. Reliable & Compassionate Care:',
    text: 'Our staff is not just skilled but also compassionate, professional, and patient-focused.',
  },
  {
    title: '4. Quick Deployment:',
    text: 'We understand that healthcare needs are urgent. We ensure quick and timely provision of staff, whenever you need it.',
  },
  {
    title: '5. 24/7 Availability:',
    text: 'Healthcare never sleeps, and neither do we. Our team and services are available 24 hours a day, 7 days a week.',
  },
]

/* Functional call-to-action copy (not part of the supplied content). */
export const CTA = {
  title: 'Tell us what you need. We will help you find the right people.',
  text: `Reach our team by email at ${CONTACT_EMAIL} or message us on WhatsApp.`,
}
