import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, CalendarCheck, Check, Mail } from 'lucide-react'
import Container from '../components/Container'
import Section from '../components/Section'
import ConsultationDialog from '../components/ConsultationDialog'
import GetServiceMenu from '../components/GetServiceMenu'
import WhatsAppGlyph from '../components/WhatsAppGlyph'
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '../nav'
import { CTA, HERO, IMAGES, INTRO, LAHORE_NOTE, SERVICES, WHY, WHY_INTRO, img, imgSet } from '../content/home'

const h2 = 'mt-3 text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl'

export default function Home() {
  const [consultOpen, setConsultOpen] = useState(false)
  const homeNursingLink = `${WHATSAPP_URL}?text=${encodeURIComponent(
    'Hello IWA Healthcare, I would like to enquire about home nursing.',
  )}`

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <Container className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="text-lg font-semibold text-teal-dark">{HERO.tagline}</p>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-navy min-[400px]:text-4xl sm:text-5xl">
              {HERO.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/75">{HERO.subheadline}</p>

            <div className="mt-8 max-w-xl">
              <div className="rounded-lg bg-navy px-5 py-6 sm:px-7 sm:py-7">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                  <span aria-hidden="true" className="h-0.5 w-8 shrink-0 bg-teal" />
                  Panel of Elite Professors
                </p>
                <p className="mt-3 text-balance text-xl font-semibold leading-snug text-white sm:text-2xl">
                  No More Waiting — Consult Top Professors Online, On Time
                </p>
              </div>
              <ul className="mt-3 flex flex-col divide-y divide-navy/10 text-sm font-semibold text-navy sm:flex-row sm:divide-x sm:divide-y-0">
                {['PMDC Verified Professors', '100% On-Time Consultation', 'No Extra Waiting'].map((t) => (
                  <li key={t} className="flex items-center gap-2 py-2 sm:px-4 sm:first:pl-0 sm:last:pr-0">
                    <Check size={16} aria-hidden="true" className="shrink-0 text-teal-dark" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setConsultOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-5 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:w-auto sm:px-7 sm:text-base"
              >
                <CalendarCheck size={18} aria-hidden="true" className="shrink-0" />
                Book Online Consultation
              </button>
              <GetServiceMenu
                label="Get Qualified Staff Now"
                size="lg"
                align="left"
                emailSubject="Request for qualified medical staff"
                whatsappText="Hello IWA Healthcare, I need qualified medical staff."
              />
              <a
                href={homeNursingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md border border-navy/25 bg-white px-5 py-3.5 text-[15px] sm:px-7 sm:text-base font-semibold text-navy transition-colors duration-200 hover:border-navy hover:bg-mist sm:w-auto"
              >
                Need Home Nursing?
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
            </div>

            <p className="mt-10 max-w-xl border-l-2 border-teal pl-4 text-sm font-medium leading-relaxed text-navy">
              {HERO.trust}
            </p>
          </div>

          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-mist">
              <img
                src={img(IMAGES.hero, 1400)}
                srcSet={imgSet(IMAGES.hero, [700, 1100, 1400])}
                sizes="(min-width: 1024px) 48vw, 100vw"
                alt="Healthcare professional caring for a patient"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>
      <ConsultationDialog open={consultOpen} onClose={() => setConsultOpen(false)} />

      {/* What is IWA Healthcare */}
      <Section tone="mist">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className={h2}>{INTRO.title}</h2>
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-navy/75 sm:text-xl sm:leading-relaxed">{INTRO.body}</p>
            <p className="mt-5 border-t border-navy/10 pt-5 text-base font-medium leading-relaxed text-teal-dark">{LAHORE_NOTE}</p>
          </div>
        </div>
      </Section>

      {/* Core services */}
      <Section>
        <div className="max-w-2xl">
          <h2 className={h2}>{INTRO.servicesHeading}</h2>
        </div>
        <ol className="mt-8 divide-y sm:mt-10 divide-navy/10 border-y border-navy/10">
          {SERVICES.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[88px_1fr] items-center gap-x-4 gap-y-1 py-5 md:grid-cols-[200px_1fr] md:gap-x-8 md:gap-y-5 md:py-8 lg:grid-cols-[240px_1fr_auto] lg:gap-10">
              <div className="row-span-2 aspect-square overflow-hidden rounded-lg bg-mist md:row-span-1 md:aspect-[4/3]">
                <img
                  src={img(s.image, 800)}
                  srcSet={imgSet(s.image, [480, 800])}
                  sizes="(min-width: 768px) 240px, 88px"
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div>
                <p className="text-sm font-semibold tabular-nums text-teal-dark">{String(i + 1).padStart(2, '0')}</p>
                <p className="max-w-lg text-base leading-relaxed text-navy/75 sm:text-lg md:mt-2">
                  <strong className="font-semibold text-navy">{s.title}:</strong> {s.text}
                </p>
              </div>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 py-2 text-sm font-semibold text-navy transition-colors duration-200 hover:text-teal-dark col-start-2 self-start lg:col-start-auto"
              >
                Learn more
                <span className="sr-only"> about {s.title}</span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* Why choose us */}
      <Section tone="mist">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className={h2}>{WHY_INTRO.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/75">{WHY_INTRO.body}</p>
          </div>
          <ol className="border-b border-navy/10">
            {WHY.map((w) => (
              <li key={w.title} className="grid gap-1.5 border-t border-navy/10 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <p className="font-semibold text-navy">{w.title}</p>
                <p className="leading-relaxed text-navy/75">{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Final contact CTA */}
      <section className="bg-navy">
        <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.3fr_auto] lg:items-center lg:gap-20">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">{CTA.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">{CTA.text}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-dark px-5 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:brightness-125 sm:px-7 sm:text-base"
              >
                <WhatsAppGlyph />
                WhatsApp {WHATSAPP_DISPLAY}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3.5 text-[15px] sm:px-7 sm:text-base font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
              >
                <Mail size={18} aria-hidden="true" />
                Email Us
              </a>
            </div>
            <Link
              to="/contact"
              className="inline-block text-sm font-medium text-white/75 underline underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              Or visit our contact page
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
