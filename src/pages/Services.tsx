import { ArrowRight, Mail } from 'lucide-react'
import Container from '../components/Container'
import WhatsAppGlyph from '../components/WhatsAppGlyph'
import { INTRO, LAHORE_NOTE, img, imgSet } from '../content/home'
import { INQUIRIES, SERVICES } from '../content/services'
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../nav'

function InquiryLink({
  kind,
  href,
  label,
  tone = 'teal',
}: {
  kind: 'email' | 'whatsapp'
  href: string
  label: string
  tone?: 'teal' | 'light'
}) {
  const external = kind === 'whatsapp'
  const styles =
    tone === 'teal'
      ? 'bg-teal-dark text-white hover:bg-navy'
      : 'border border-navy/25 bg-white text-navy hover:border-navy hover:bg-mist'
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-center text-[15px] font-semibold transition-colors duration-200 sm:w-auto ${styles}`}
    >
      {kind === 'email' ? <Mail size={18} aria-hidden="true" /> : <WhatsAppGlyph />}
      {label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

export default function Services() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-mist">
        <Container className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-20">
          <div>
            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-navy min-[400px]:text-4xl sm:text-5xl">
              {INTRO.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/75">{INTRO.body}</p>
            <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-teal-dark">{LAHORE_NOTE}</p>
          </div>
          <nav aria-label="Services on this page" className="self-end">
            <p className="text-sm font-medium text-navy/65">On this page</p>
            <ol className="mt-3 divide-y divide-navy/10 border-y border-navy/10">
              {SERVICES.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-center gap-4 py-3.5 text-navy transition-colors duration-200 hover:text-teal-dark"
                  >
                    <span className="w-6 text-sm font-semibold tabular-nums text-teal-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-medium">{s.title}</span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </section>

      {/* Services */}
      {SERVICES.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <section key={s.id} id={s.id} className={`scroll-mt-24 bg-white ${i > 0 ? 'border-t border-navy/10' : ''}`}>
            <Container
              className={`grid items-center gap-6 py-10 sm:gap-8 sm:py-14 lg:gap-16 lg:py-16 ${flip ? 'lg:grid-cols-[6fr_5fr]' : 'lg:grid-cols-[5fr_6fr]'}`}
            >
              <div className={`aspect-[16/10] overflow-hidden rounded-lg bg-mist sm:aspect-[4/3] ${flip ? 'lg:order-last' : ''}`}>
                <img
                  src={img(s.image, 1200)}
                  srcSet={imgSet(s.image, [600, 900, 1200])}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div>
                <p className="text-sm font-semibold tabular-nums text-teal-dark">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy/75">{s.description}</p>
                <div className="mt-8">
                  <InquiryLink {...s.cta} />
                </div>
              </div>
            </Container>
          </section>
        )
      })}

      {/* Inquiries */}
      <section className="bg-navy">
        <Container className="py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Enquiries</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Tell us what you need
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Choose the option that fits you and reach our team directly.
            </p>
          </div>
          <div className="mt-8 grid gap-8 border-t sm:mt-10 border-white/15 pt-8 lg:grid-cols-3 lg:gap-0 lg:pt-10">
            {INQUIRIES.map((q, i) => (
              <div
                key={q.audience}
                className={`flex flex-col ${i > 0 ? 'max-lg:border-t max-lg:border-white/15 max-lg:pt-8 lg:border-l lg:border-white/15 lg:pl-8' : ''} ${i < INQUIRIES.length - 1 ? 'lg:pr-8' : ''}`}
              >
                <h3 className="text-xl font-semibold text-white">{q.audience}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-white/75">{q.text}</p>
                <div className="mt-6">
                  <a
                    href={q.href}
                    {...(q.kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal-dark px-6 py-3 text-center text-[15px] font-semibold text-white transition-colors duration-200 hover:brightness-125 sm:w-auto"
                  >
                    {q.kind === 'email' ? <Mail size={18} aria-hidden="true" /> : <WhatsAppGlyph />}
                    {q.label}
                    {q.kind === 'whatsapp' && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 break-words text-sm text-white/70">
            {CONTACT_EMAIL} · WhatsApp {WHATSAPP_DISPLAY}
          </p>
        </Container>
      </section>
    </>
  )
}
