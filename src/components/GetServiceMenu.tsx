import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ChevronDown, Mail } from 'lucide-react'
import WhatsAppGlyph from './WhatsAppGlyph'
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '../nav'

type Props = {
  /** `desktop` opens a floating panel; `mobile` expands inline inside the mobile menu. */
  variant?: 'desktop' | 'mobile'
  onSelect?: () => void
  label?: string
  size?: 'md' | 'lg'
  align?: 'left' | 'right'
  /** Optional prefilled subject / message for the two options. */
  emailSubject?: string
  whatsappText?: string
}

const itemClass =
  'group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-mist focus-visible:bg-mist'
const iconClass =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal-dark text-white'

export default function GetServiceMenu({
  variant = 'desktop',
  onSelect,
  label = 'Get Service',
  size = 'md',
  align = 'right',
  emailSubject,
  whatsappText,
}: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLUListElement>(null)
  const panelId = useId()
  const isMobile = variant === 'mobile'
  const isLg = size === 'lg'
  const emailHref = `mailto:${CONTACT_EMAIL}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ''}`
  const whatsappHref = `${WHATSAPP_URL}${whatsappText ? `?text=${encodeURIComponent(whatsappText)}` : ''}`

  // Close when the pointer or keyboard focus moves outside the component.
  useEffect(() => {
    if (!open) return
    const outside = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', outside)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
    }
  }, [open])

  const items = () => Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])

  const close = (returnFocus = false) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && open) {
      // Handle it here so a parent (the mobile menu) doesn't also close.
      e.stopPropagation()
      close(true)
      return
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const target = e.target as HTMLElement
    if (target === buttonRef.current) {
      if (e.key !== 'ArrowDown') return
      e.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => items()[0]?.focus())
      return
    }
    const list = items()
    const i = list.indexOf(target as HTMLAnchorElement)
    if (i === -1) return
    e.preventDefault()
    const next = e.key === 'ArrowDown' ? (i + 1) % list.length : (i - 1 + list.length) % list.length
    list[next].focus()
  }

  const select = () => {
    setOpen(false)
    onSelect?.()
  }

  const panelBase = 'rounded-lg border border-navy/10 bg-white p-1.5'
  const panelClass = isMobile
    ? `${panelBase} mt-3 ${open ? 'block' : 'hidden'}`
    : `${panelBase} absolute top-full z-50 mt-2.5 w-72 ${align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} shadow-[0_14px_32px_-10px_rgba(11,31,58,0.22),0_2px_6px_rgba(11,31,58,0.06)] transition-[opacity,transform,visibility] duration-150 ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
      }`

  return (
    <div
      ref={rootRef}
      className={isMobile ? 'w-full' : isLg ? 'relative w-full sm:w-auto' : 'relative'}
      onKeyDown={onKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center justify-center gap-2 rounded-md bg-teal-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy ${
          isMobile ? 'w-full py-3 text-[15px]' : ''
        } ${isLg ? 'w-full px-7 py-3.5 text-base sm:w-auto' : ''}`}
      >
        {label}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <ul ref={panelRef} id={panelId} className={panelClass}>
        <li>
          <a href={emailHref} onClick={select} className={itemClass}>
            <span className={iconClass}>
              <Mail size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-navy">Email Us</span>
              <span className="block truncate text-[13px] text-navy/65">{CONTACT_EMAIL}</span>
            </span>
          </a>
        </li>
        <li>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={select} className={itemClass}>
            <span className={iconClass}>
              <WhatsAppGlyph />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-navy">
                WhatsApp Us<span className="sr-only"> (opens in a new tab)</span>
              </span>
              <span className="block truncate text-[13px] text-navy/65">{WHATSAPP_DISPLAY}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}
