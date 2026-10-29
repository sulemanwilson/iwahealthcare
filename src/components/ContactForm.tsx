import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { CONTACT_EMAIL, WHATSAPP_URL } from '../nav'
import { FIELD_MAX, cleanLine, cleanMultiline } from '../lib/enquiry'

const SUBJECT = 'New Inquiry - IWA Healthcare'
const MESSAGE_MAX = 1000
// Some email clients drop mailto links longer than ~2,000 characters (every space or non-Latin letter grows when encoded).
const MAILTO_MAX = 2000

const INQUIRY_TYPES = [
  'Hospital/Clinic Staffing',
  'Home Nursing',
  'Physiotherapy',
  'Caregiving',
  'Other',
] as const

type Values = { name: string; email: string; phone: string; type: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'opened' | 'toolong'

const empty: Values = { name: '', email: '', phone: '', type: '', message: '' }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (cleanLine(v.name).length < 2) e.name = 'Please enter your full name.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (v.email.trim().length > FIELD_MAX.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  const digits = v.phone.replace(/\D/g, '')
  if (!v.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (!/^\+?[\d\s\-()]+$/.test(v.phone.trim()) || digits.length < 10 || digits.length > 15)
    e.phone = 'Please enter a valid phone number, for example 0321-4069908.'
  if (!(INQUIRY_TYPES as readonly string[]).includes(v.type)) e.type = 'Please choose an inquiry type.'
  if (cleanMultiline(v.message).length < 10) e.message = 'Please write a short message (at least 10 characters).'
  return e
}

const fieldBase =
  'block h-12 w-full rounded-md border bg-white px-4 text-base text-navy placeholder:text-navy/60 transition-colors duration-200 hover:border-navy/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25'

export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [attempt, setAttempt] = useState(0)
  const [draftHref, setDraftHref] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const noticeRef = useRef<HTMLDivElement>(null)

  // After a failed submit, move focus to the first invalid field.
  useEffect(() => {
    if (!attempt) return
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [attempt])

  const onChange = (key: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
    if (status !== 'idle') setStatus('idle')
  }

  const onBlur = (key: keyof Values) => () => {
    if (values[key] !== '') setErrors((prev) => ({ ...prev, [key]: validate(values)[key] }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    // Honeypot: real visitors never fill this in.
    if ((form.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('idle')
      setAttempt((n) => n + 1)
      return
    }

    const body = [
      `Full Name: ${cleanLine(values.name)}`,
      `Email Address: ${cleanLine(values.email)}`,
      `Phone Number: ${cleanLine(values.phone)}`,
      `Enquiry Type: ${values.type}`,
      '',
      'Message:',
      cleanMultiline(values.message).replace(/\n/g, '\r\n'),
    ].join('\r\n')
    const href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`
    if (href.length > MAILTO_MAX) {
      setStatus('toolong')
      requestAnimationFrame(() => noticeRef.current?.focus())
      return
    }
    setDraftHref(href)
    window.open(href, '_blank', 'noopener,noreferrer')
    setStatus('opened')
    requestAnimationFrame(() => noticeRef.current?.focus())
  }

  const fieldProps = (key: keyof Values) => ({
    id: `cf-${key}`,
    name: key,
    value: values[key],
    onChange: onChange(key),
    onBlur: onBlur(key),
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `cf-${key}-error` : undefined,
    maxLength: key === 'message' ? MESSAGE_MAX : key === 'type' ? undefined : FIELD_MAX[key],
    className: `${fieldBase} ${errors[key] ? 'border-red-700' : 'border-navy/25'}`,
  })

  const label = (key: keyof Values, text: string) => (
    <label htmlFor={`cf-${key}`} className="mb-1.5 block text-sm font-semibold text-navy">
      {text} <span aria-hidden="true" className="text-red-700">*</span>
      <span className="sr-only"> (required)</span>
    </label>
  )

  const error = (key: keyof Values) =>
    errors[key] ? (
      <p id={`cf-${key}-error`} className="mt-1.5 text-sm text-red-700">
        {errors[key]}
      </p>
    ) : null

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="cf-title">
      <h2 id="cf-title" className="text-2xl font-semibold tracking-tight text-navy">
        Send us an enquiry
      </h2>
      <p className="mt-2 max-w-xl leading-relaxed text-navy/75">
        Tell us what you need and our team will get back to you. Fields marked with{' '}
        <span aria-hidden="true" className="text-red-700">*</span>
        <span className="sr-only">an asterisk</span> are required.
      </p>

      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          {label('name', 'Full Name')}
          <input type="text" autoComplete="name" aria-required="true" {...fieldProps('name')} />
          {error('name')}
        </div>
        <div>
          {label('email', 'Email Address')}
          <input type="email" autoComplete="email" inputMode="email" aria-required="true" {...fieldProps('email')} />
          {error('email')}
        </div>
        <div>
          {label('phone', 'Phone Number')}
          <input type="tel" autoComplete="tel" inputMode="tel" aria-required="true" {...fieldProps('phone')} />
          {error('phone')}
        </div>
        <div>
          {label('type', 'Enquiry Type')}
          <div className="relative">
            <select aria-required="true" {...fieldProps('type')} className={`${fieldProps('type').className} appearance-none pr-11 ${values.type ? '' : 'text-navy/70'}`}>
              <option value="" disabled>
                Select an enquiry type
              </option>
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t} className="text-navy">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/70"
            />
          </div>
          {error('type')}
        </div>
        <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
          {label('message', 'Message')}
          <textarea
            rows={6}
            aria-required="true"
            {...fieldProps('message')}
            className={`${fieldProps('message').className} h-auto resize-y py-3 leading-relaxed`}
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            <div>{error('message')}</div>
            <p className="shrink-0 text-xs text-navy/70" aria-hidden="true">
              {values.message.length}/{MESSAGE_MAX}
            </p>
          </div>
        </div>
        {/* Honeypot (hidden from people and assistive tech) */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Leave this field empty
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="mt-6">
        {Object.keys(errors).length > 0 && status === 'idle' && (
          <p className="text-sm font-medium text-red-700">Please correct the highlighted fields and try again.</p>
        )}
        {status === 'toolong' && (
          <div ref={noticeRef} tabIndex={-1} role="alert" className="rounded-md border border-red-700/40 bg-white p-4 text-sm leading-relaxed text-navy">
            <p className="font-semibold text-red-700">Your message is too long to prefill in an email.</p>
            <p className="mt-1">
              Please shorten it, or email us directly at{' '}
              <a className="font-semibold underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        )}
        {status === 'opened' && (
          <div ref={noticeRef} tabIndex={-1} role="status" className="rounded-md border border-teal/40 bg-white p-4 text-sm leading-relaxed text-navy">
            <p className="font-semibold">We have asked Gmail to open with your enquiry filled in.</p>
            <p className="mt-1">
              Your enquiry has not been sent until you press Send in Gmail. If nothing opened,{' '}
              <a className="font-semibold underline underline-offset-2" href={draftHref} target="_blank" rel="noopener noreferrer">
                open the Gmail draft again
              </a>
              , or email us at{' '}
              <a className="font-semibold underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>{' '}
              or message us on{' '}
              <a className="font-semibold underline underline-offset-2" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-navy/10 pt-6">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-md bg-teal-dark px-8 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:w-auto"
        >
          Submit Enquiry
        </button>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy/70">
          Gmail will open with your enquiry pre-filled. Please review the details and press Send to submit.
        </p>
      </div>
    </form>
  )
}
