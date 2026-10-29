import type { ReactNode } from 'react'
import Container from '../components/Container'
import WhatsAppGlyph from '../components/WhatsAppGlyph'
import ContactForm from '../components/ContactForm'
import { CUIN } from '../content/home'
import { CORPORATE_PHONE, CORPORATE_PHONE_HREF } from '../content/about'
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WEBSITE_DISPLAY,
  WEBSITE_URL,
  WHATSAPP_URL,
} from '../nav'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-0.5 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <dt className="text-sm font-medium text-navy/65">{label}</dt>
      <dd className="min-w-0 break-words font-semibold text-navy">{children}</dd>
    </div>
  )
}

const link = 'underline decoration-navy/25 underline-offset-4 transition-colors duration-200 hover:text-teal-dark hover:decoration-teal'

export default function Contact() {
  return (
    <>
      <section className="bg-mist">
        <Container className="py-10 sm:py-14">
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl">
            Contact Us
          </h1>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-16">
          <div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg bg-teal-dark p-5 text-white transition-colors duration-200 hover:bg-navy"
            >
              <WhatsAppGlyph size={32} />
              <span>
                <span className="block text-base font-semibold sm:text-lg">Chat with us on WhatsApp</span>
                <span className="block text-sm text-white/90">Message us directly on {PHONE_DISPLAY}</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            <h2 className="mt-10 text-2xl font-semibold tracking-tight text-navy">Get In Touch:</h2>
            <dl className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
              <Row label="Phone / WhatsApp">
                <a className={link} href={PHONE_HREF}>
                  {PHONE_DISPLAY}
                </a>
              </Row>
              <Row label="Email">
                <a className={link} href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </Row>
              <Row label="Website">
                <a className={link} href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">
                  {WEBSITE_DISPLAY}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Row>
              <Row label="CEO (Corporate)">
                <a className={link} href={CORPORATE_PHONE_HREF}>
                  {CORPORATE_PHONE}
                </a>
              </Row>
            </dl>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-dark">Company</p>
              <p className="mt-3 font-bold text-navy">{COMPANY_NAME}</p>
              <p className="mt-1 font-semibold text-navy">Project: IWA Healthcare</p>
              <p className="mt-1 text-navy/75">SECP Registered - CUIN: {CUIN}</p>
            </div>
          </div>

          <div className="rounded-lg border border-navy/10 bg-mist p-4 min-[400px]:p-6 sm:p-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
