import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Container from './Container'
import Logo from './Logo'
import GetServiceMenu from './GetServiceMenu'
import { CUIN } from '../content/home'
import { COMPANY_NAME, NAV_LINKS } from '../nav'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Keep the page from scrolling behind the open mobile menu.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' && open) {
      setOpen(false)
      toggleRef.current?.focus()
    }
  }

  return (
    <>
      <div className="border-b border-navy/10 bg-mist">
        <Container className="flex min-h-8 items-center justify-center gap-2 py-1.5 text-center sm:py-0">
          <span aria-hidden="true" className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-teal sm:block" />
          <p className="text-[11px] font-medium leading-snug tracking-wide text-navy sm:text-xs">
            SECP Registered | CUIN: {CUIN} | {COMPANY_NAME}
          </p>
        </Container>
      </div>
    <header
      onKeyDown={onKeyDown}
      className={`sticky top-0 z-40 border-b bg-white transition-shadow duration-200 ${
        scrolled || open ? 'border-navy/[0.06] shadow-soft' : 'border-transparent'
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-20">
        <Logo className="h-11 sm:h-12 lg:h-14" />

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-9">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className="group relative py-2 text-[15px] font-medium text-navy"
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-teal transition-transform duration-200 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <GetServiceMenu />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-md text-navy transition-colors duration-200 hover:bg-mist md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-x-0 top-full h-[100dvh] bg-navy/25 md:hidden"
          />
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-navy/10 bg-white shadow-soft md:hidden"
          >
            <Container className="py-2">
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.to} className="border-b border-navy/10">
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `relative flex items-center py-4 pl-4 text-base text-navy transition-colors duration-200 hover:bg-mist ${
                          isActive ? 'font-semibold' : 'font-medium'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={`absolute left-0 h-5 w-1 rounded-full bg-teal transition-opacity duration-200 ${
                              isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                          {l.label}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="pb-4 pt-5">
                <GetServiceMenu variant="mobile" onSelect={() => setOpen(false)} />
              </div>
            </Container>
          </nav>
        </>
      )}
    </header>
    </>
  )
}
