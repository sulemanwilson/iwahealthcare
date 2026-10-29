import { CONTACT_EMAIL, WHATSAPP_URL } from '../nav'
import { IMAGES, SERVICES as CORE } from './home'

/* Service titles and descriptions come from the supplied content (see ./home). */

const mail = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
const wa = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`

export type Service = {
  id: string
  title: string
  description: string
  image: string
  alt: string
  cta: { kind: 'email' | 'whatsapp'; label: string; href: string }
}

export const SERVICES: Service[] = [
  {
    id: 'hospital-staffing',
    title: CORE[0].title,
    description: CORE[0].text,
    image: IMAGES.hospital,
    alt: 'Medical staff working in a hospital',
    cta: {
      kind: 'email',
      label: 'Enquire by Email',
      href: mail('Hospital staffing enquiry'),
    },
  },
  {
    id: 'clinic-staffing',
    title: CORE[1].title,
    description: CORE[1].text,
    image: IMAGES.clinic,
    alt: 'Medical staff at a clinic',
    cta: {
      kind: 'email',
      label: 'Enquire by Email',
      href: mail('Clinic staffing enquiry'),
    },
  },
  {
    id: 'home-nursing',
    title: CORE[2].title,
    description: CORE[2].text,
    image: IMAGES.homeNursing,
    alt: 'Nurse caring for a patient at home',
    cta: {
      kind: 'whatsapp',
      label: 'Enquire on WhatsApp',
      href: wa('Hello IWA Healthcare, I would like to enquire about home nursing services.'),
    },
  },
  {
    id: 'physiotherapy',
    title: CORE[3].title,
    description: CORE[3].text,
    image: IMAGES.physio,
    alt: 'Physiotherapist helping a patient with exercises',
    cta: {
      kind: 'whatsapp',
      label: 'Enquire on WhatsApp',
      href: wa('Hello IWA Healthcare, I would like to enquire about physiotherapy at home or on-site.'),
    },
  },
  {
    id: 'caregivers',
    title: CORE[4].title,
    description: CORE[4].text,
    image: IMAGES.caregivers,
    alt: 'Caregiver assisting a patient',
    cta: {
      kind: 'whatsapp',
      label: 'Enquire on WhatsApp',
      href: wa('Hello IWA Healthcare, I would like to enquire about a caregiver or patient attendant.'),
    },
  },
]

export const INQUIRIES = [
  {
    audience: 'Hospitals',
    text: 'Need nurses, paramedical or support staff? Tell us what your hospital requires.',
    kind: 'email' as const,
    label: 'Email Us',
    href: mail('Hospital staffing enquiry'),
  },
  {
    audience: 'Clinics',
    text: 'Looking for skilled professionals for your clinic or medical centre?',
    kind: 'email' as const,
    label: 'Email Us',
    href: mail('Clinic staffing enquiry'),
  },
  {
    audience: 'Families',
    text: 'Need nursing, physiotherapy or caregiver support for a loved one at home?',
    kind: 'whatsapp' as const,
    label: 'WhatsApp Us',
    href: wa('Hello IWA Healthcare, I am looking for care for a family member at home.'),
  },
]
