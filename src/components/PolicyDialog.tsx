import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { POLICIES, POLICIES_UPDATED } from '../content/policies'
import type { Policy } from '../content/policies'
import { CONTACT_EMAIL } from '../nav'

/** Policy text shared by the dialogs and the Privacy Policy page. */
export function PolicyBody({ policy }: { policy: Policy }) {
  return (
    <>
        <p>{policy.intro}</p>
        {policy.sections.map((s) => (
          <section key={s.heading} className="mt-6">
            <h3 className="text-base font-semibold text-navy">{s.heading}</h3>
            {s.paragraphs?.map((t) => (
              <p key={t} className="mt-2">
                {t}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <p className="mt-8 border-t border-navy/10 pt-4">
          Questions about this page? Email{' '}
          <a className="font-semibold text-teal-dark underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
    </>
  )
}

/** Footer legal links: Privacy Policy is a page (/privacy-policy); the others open in an accessible modal dialog. */
export default function PolicyLinks() {
  const [openId, setOpenId] = useState<Policy['id'] | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const policy = POLICIES.find((p) => p.id === openId)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !openId) return
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'
    bodyRef.current?.scrollTo({ top: 0 })
    return () => {
      document.body.style.overflow = ''
    }
  }, [openId])

  const close = () => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
    setOpenId(null)
  }

  return (
    <>
      <nav aria-label="Legal">
        <ul className="flex flex-wrap gap-x-5 gap-y-0.5">
          {POLICIES.map((p) => (
            <li key={p.id}>
              {p.id === 'privacy' ? (
                <Link to="/privacy-policy" className="inline-block py-2 underline-offset-4 transition-colors duration-200 hover:text-teal-dark hover:underline">
                  {p.label}
                </Link>
              ) : (
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setOpenId(p.id)}
                className="py-2 underline-offset-4 transition-colors duration-200 hover:text-teal-dark hover:underline"
              >
                {p.label}
              </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <dialog
        ref={dialogRef}
        aria-labelledby="policy-title"
        onClose={() => setOpenId(null)}
        onCancel={() => setOpenId(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="m-auto max-h-[88dvh] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-xl bg-white p-0 text-navy shadow-xl backdrop:bg-navy/60"
      >
        {policy && (
          <div className="flex max-h-[88dvh] flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-navy/10 px-6 py-4 sm:px-8">
              <div>
                <h2 id="policy-title" className="text-xl font-semibold tracking-tight text-navy">
                  {policy.title}
                </h2>
                <p className="mt-1 text-xs text-navy/70">Last updated: {POLICIES_UPDATED}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={`Close ${policy.title}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-navy transition-colors duration-200 hover:bg-mist"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div ref={bodyRef} tabIndex={0} className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-navy/80 sm:px-8">
              <PolicyBody policy={policy} />
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
