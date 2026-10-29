import type { ReactNode } from 'react'
import { Phone } from 'lucide-react'
import Container from '../components/Container'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { IMAGES, img, imgSet } from '../content/home'
import {
  CORPORATE_PHONE,
  CORPORATE_PHONE_HREF,
  FOUNDER,
  MISSION,
  OBJECTIVE,
  PHILOSOPHY,
  WHO,
} from '../content/about'

const h2 = 'mt-3 text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl'

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${light ? 'text-white/70' : 'text-teal-dark'}`}>
      {children}
    </p>
  )
}

export default function About() {
  return (
    <>
      <PageHero title="About Us">
        “Integrated Care, Inspired Wellness”
      </PageHero>

      {/* Who we are */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h2 className={h2}>{WHO.title}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy/75 sm:text-xl sm:leading-relaxed">
              {WHO.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-teal pl-5 text-xl font-medium leading-snug text-navy sm:text-2xl">
              {WHO.quote}
            </blockquote>
          </div>
          <dl className="self-center border-y border-navy/10">
            {WHO.facts.map((f) => (
              <div key={f.label} className="grid gap-1 border-b border-navy/10 py-5 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium text-navy/65">{f.label}</dt>
                <dd className="break-words font-semibold text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Objective */}
      <Section tone="mist">
        <Eyebrow>{OBJECTIVE.title}</Eyebrow>
        <h2 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-navy sm:text-4xl">
          {OBJECTIVE.lead}
        </h2>
        <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-2 md:gap-16">
          {OBJECTIVE.paths.map((p) => (
            <p key={p} className="border-t-2 border-teal pt-5 text-lg leading-relaxed text-navy sm:text-xl">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className={h2}>{PHILOSOPHY.title}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy/75">
              {PHILOSOPHY.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-mist lg:order-last">
            <img
              src={img(IMAGES.physio, 1200)}
              srcSet={imgSet(IMAGES.physio, [600, 900, 1200])}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt="Physiotherapist helping a patient with exercises"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </Section>

      {/* Mission */}
      <section className="bg-navy">
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow light>{MISSION.title}</Eyebrow>
            <p className="mt-6 text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl sm:leading-snug">
              {MISSION.text}
            </p>
          </div>
        </Container>
      </section>

      {/* Founder's message */}
      <Section tone="mist">
        <div className="grid items-center gap-8 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-sm sm:mx-0">
            <p className="text-lg font-bold text-navy">{FOUNDER.name}</p>
            <p className="mb-4 text-sm font-bold text-navy/80">{FOUNDER.title}</p>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-white">
              <img
                src={img(IMAGES.founder, 900)}
                alt={`${FOUNDER.name}, ${FOUNDER.title}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
          <figure>
            <Eyebrow>{FOUNDER.heading}</Eyebrow>
            <blockquote className="mt-5 border-l-2 border-teal pl-5 text-xl leading-relaxed text-navy sm:text-2xl sm:leading-relaxed">
              {FOUNDER.message.map((para, i) => (
                <p key={para} className={i > 0 ? 'mt-4' : undefined}>
                  {i === FOUNDER.message.length - 1 ? <strong className="font-semibold">{para}</strong> : para}
                </p>
              ))}
            </blockquote>
            <figcaption className="mt-8 border-t border-navy/10 pt-5">
              <a
                href={CORPORATE_PHONE_HREF}
                className="inline-flex flex-wrap items-center gap-2 text-sm font-semibold text-navy transition-colors duration-200 hover:text-teal-dark"
              >
                <Phone size={16} className="text-teal" aria-hidden="true" />
                <span className="font-normal text-navy/65">{FOUNDER.contactLabel}</span>
                {CORPORATE_PHONE}
              </a>
            </figcaption>
          </figure>
        </div>
      </Section>
    </>
  )
}
