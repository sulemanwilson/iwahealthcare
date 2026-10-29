import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Container from './Container'
import PolicyLinks from './PolicyDialog'
import { CUIN } from '../content/home'
import { CORPORATE_PHONE, CORPORATE_PHONE_HREF } from '../content/about'
import { COMPANY_NAME, CONTACT_EMAIL, LOGO_SRC, SECP_LOGO_SRC, NAV_LINKS, PHONE_DISPLAY, SOCIAL_LINKS, PHONE_HREF, WEBSITE_DISPLAY, WEBSITE_URL } from '../nav'

const SOCIAL_ICONS = { Facebook, Instagram, LinkedIn: Linkedin } as const

function FooterLogo() {
  return (
    <Link to="/" aria-label="IWA Healthcare home" className="inline-flex shrink-0 items-center">
      <img
        src={LOGO_SRC}
        alt="IWA Healthcare"
        width={2118}
        height={742}
        decoding="async"
        className="h-12 w-auto object-contain"
      />
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-mist">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_auto] lg:gap-12">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <FooterLogo />
          <p className="text-sm font-bold text-navy">{COMPANY_NAME}</p>
          <p className="text-sm font-bold text-navy">Project: IWA Healthcare</p>
          <p className="text-sm text-navy/70">SECP Registered | CUIN: {CUIN}</p>
          <img
            src={SECP_LOGO_SRC}
            alt="SECP emblem"
            width={56}
            height={56}
            loading="lazy"
            className="block h-14 w-auto max-w-[8rem] object-contain mix-blend-multiply"
          />
          <ul className="flex gap-3 pt-1" aria-label="Social media">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICONS[s.name]
              const box = 'flex h-11 w-11 items-center justify-center rounded-md border border-navy/15 bg-white text-teal'
              return (
                <li key={s.name}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`IWA Healthcare on ${s.name}`} className={`${box} transition-colors duration-200 hover:bg-teal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal`}>
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  ) : (
                    <span role="img" aria-label={`${s.name} link coming soon`} title={`${s.name} link coming soon`} className={`${box} cursor-not-allowed opacity-50`}>
                      <Icon size={18} aria-hidden="true" />
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-navy">Get In Touch:</p>
          <ul className="mt-3 space-y-2 text-sm text-navy/70">
            <li>
              Phone / WhatsApp:{' '}
              <a href={PHONE_HREF} className="transition-colors duration-200 hover:text-teal-dark">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors duration-200 hover:text-teal-dark">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              Website:{' '}
              <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-teal-dark">
                {WEBSITE_DISPLAY}
              </a>
            </li>
            <li>
              CEO (Corporate):{' '}
              <a href={CORPORATE_PHONE_HREF} className="transition-colors duration-200 hover:text-teal-dark">
                {CORPORATE_PHONE}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-block py-1 text-navy/70 transition-colors duration-200 hover:text-teal-dark">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-navy/10">
        <Container className="flex flex-col gap-3 pb-24 pt-5 text-xs text-navy/70 sm:pb-5 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <PolicyLinks />
        </Container>
      </div>
    </footer>
  )
}
