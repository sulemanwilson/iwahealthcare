import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Mail, X } from 'lucide-react'
import WhatsAppGlyph from './WhatsAppGlyph'
import { CONTACT_EMAIL, WHATSAPP_URL } from '../nav'
import { FIELD_MAX, cleanLine, cleanMultiline } from '../lib/enquiry'

type Values = { name: string; phone: string; email: string; specialty: string; message: string }
type Errors = Partial<Record<keyof Values, string>>

const SUBJECT = 'Online Doctor Consultation Enquiry - IWA Healthcare'
const MESSAGE_MAX = 500
// Some email clients drop mailto links longer than ~2,000 characters.
const MAILTO_MAX = 2000
const empty: Values = { name: '', phone: '', email: '', specialty: '', message: '' }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (cleanLine(v.name).length < 2) e.name = 'Please enter your full name.'
  const digits = v.phone.replace(/\D/g, '')
  if (!v.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (!/^\+?[\d\s\-()]+$/.test(v.phone.trim()) || digits.length < 10 || digits.length > 15)
    e.phone = 'Please enter a valid phone number, for example 0321-4069908.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (v.email.trim().length > FIELD_MAX.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (cleanLine(v.specialty).length < 2) e.specialty = 'Please enter your preferred consultation or specialty.'
  return e
}

const fieldBase =
  'block h-12 w-full rounded-md border bg-white px-4 text-base text-navy placeholder:text-navy/60 transition-colors duration-200 hover:border-navy/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25'
const optionClass =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy'

export default function ConsultationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [step, setStep] = useState<'form' | 'send'>('form')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      setValues(empty)
      setErrors({})
      setStep('form')
      if (!dialog.open) dialog.showModal()
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
    if (dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!attempt) return
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [attempt])

  const onChange = (key: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (errors[key]) setErrors((p) => ({ ...p, [key]: validate(next)[key] }))
  }
  const onBlur = (key: keyof Values) => () => {
    if (values[key] !== '') setErrors((p) => ({ ...p, [key]: validate(values)[key] }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return setAttempt((n) => n + 1)
    setStep('send')
  }

  const lines = [
    'Online Doctor Consultation Enquiry',
    '',
    `Full Name: ${cleanLine(values.name)}`,
    `Phone Number: ${cleanLine(values.phone)}`,
    `Email Address: ${cleanLine(values.email)}`,
    `Preferred Consultation / Specialty: ${cleanLine(values.specialty)}`,
    `Additional Message: ${cleanMultiline(values.message) || '-'}`,
  ]
  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(lines.join('\r\n'))}`
  const waHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
    ['Hello IWA Healthcare, I would like to enquire about an online doctor consultation.', '', ...lines.slice(2)].join('\n'),
  )}`
  const mailTooLong = mailHref.length > MAILTO_MAX

  const fieldProps = (key: keyof Values) => ({
    id: `cd-${key}`,
    name: key,
    value: values[key],
    onChange: onChange(key),
    onBlur: onBlur(key),
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `cd-${key}-error` : key === 'message' ? 'cd-message-hint' : undefined,
    maxLength: key === 'message' ? MESSAGE_MAX : FIELD_MAX[key],
    className: `${fieldBase} ${errors[key] ? 'border-red-700' : 'border-navy/25'}`,
  })
  const label = (key: keyof Values, text: string, required = true) => (
    <label htmlFor={`cd-${key}`} className="mb-1.5 block text-sm font-semibold text-navy">
      {text}{' '}
      {required ? (
        <>
          <span aria-hidden="true" className="text-red-700">*</span>
          <span className="sr-only">(required)</span>
        </>
      ) : (
        <span className="font-normal text-navy/70">(optional)</span>
      )}
    </label>
  )
  const error = (key: keyof Values) =>
    errors[key] ? (
      <p id={`cd-${key}-error`} className="mt-1.5 text-sm text-red-700">
        {errors[key]}
      </p>
    ) : null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cd-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-xl bg-white p-0 text-navy shadow-xl backdrop:bg-navy/60"
    >
      {open && (
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-navy/10 px-5 py-4 sm:px-8">
            <div>
              <h2 id="cd-title" className="text-xl font-semibold tracking-tight text-navy">
                Book Online Consultation
              </h2>
              <p className="mt-1 text-sm text-navy/75">Consultation enquiry request, not a confirmed appointment.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close consultation enquiry"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-navy transition-colors duration-200 hover:bg-mist"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-6 sm:px-8">
            {step === 'form' ? (
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                <p className="text-sm leading-relaxed text-navy/75">
                  Fields marked with <span aria-hidden="true" className="text-red-700">*</span>
                  <span className="sr-only">an asterisk</span> are required.
                </p>
                <div className="mt-5 grid gap-5">
                  <div>
                    {label('name', 'Full Name')}
                    <input type="text" autoComplete="name" aria-required="true" {...fieldProps('name')} />
                    {error('name')}
                  </div>
                  <div>
                    {label('phone', 'Phone Number')}
                    <input type="tel" autoComplete="tel" inputMode="tel" aria-required="true" {...fieldProps('phone')} />
                    {error('phone')}
                  </div>
                  <div>
                    {label('email', 'Email Address')}
                    <input type="email" autoComplete="email" inputMode="email" aria-required="true" {...fieldProps('email')} />
                    {error('email')}
                  </div>
                  <div>
                    {label('specialty', 'Preferred Consultation / Specialty')}
                    <input type="text" aria-required="true" {...fieldProps('specialty')} />
                    {error('specialty')}
                  </div>
                  <div>
                    {label('message', 'Additional Message', false)}
                    <p id="cd-message-hint" className="-mt-0.5 mb-1.5 text-sm text-navy/70">
                      Please do not include medical records or other sensitive health details.
                    </p>
                    <textarea
                      rows={4}
                      {...fieldProps('message')}
                      className={`${fieldProps('message').className} h-auto resize-y py-3 leading-relaxed`}
                    />
                  </div>
                </div>
                {Object.keys(errors).length > 0 && (
                  <p role="alert" className="mt-5 text-sm font-medium text-red-700">
                    Please correct the highlighted fields and try again.
                  </p>
                )}
                <button
                  type="submit"
                  className={`${optionClass} mt-6 bg-teal-dark text-white hover:bg-navy sm:w-auto sm:px-8`}
                >
                  Continue
                </button>
              </form>
            ) : (
              <div aria-live="polite">
                <p className="text-base font-semibold text-navy">Choose how to send your enquiry</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/75">
                  Your details are filled in. Your enquiry is not sent until you press Send in your email app or
                  WhatsApp. Our team will contact you; no appointment is confirmed by this form.
                </p>
                <div className="mt-5 grid gap-3">
                  {mailTooLong ? (
                    <p role="alert" className="rounded-md border border-red-700/40 p-3 text-sm leading-relaxed text-navy">
                      Your details are too long to prefill in an email. Shorten your message, or use WhatsApp.
                    </p>
                  ) : (
                    <a href={mailHref} className={`${optionClass} bg-teal-dark text-white hover:bg-navy`}>
                      <Mail size={18} aria-hidden="true" />
                      Email Us
                    </a>
                  )}
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${optionClass} border border-navy/25 bg-white text-navy hover:border-navy hover:bg-mist`}
                  >
                    <WhatsAppGlyph />
                    WhatsApp Us<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="mt-4 py-2 text-sm font-semibold text-navy underline underline-offset-4 hover:text-teal-dark"
                >
                  Edit details
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
