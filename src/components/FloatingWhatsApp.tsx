import { createPortal } from 'react-dom'

const message =
  "Assalam-o-Alaikum, I would like to enquire about IWA Healthcare's services. Please provide me with more information."

const whatsappUrl = `https://wa.me/923214069908?text=${encodeURIComponent(message)}`

export default function FloatingWhatsApp() {
  // Rendered straight into <body> so no ancestor (layout wrapper, transforms, overflow) can pin it to the page end.
  return createPortal(
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with IWA Healthcare on WhatsApp (opens in a new tab)"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 will-change-transform flex h-12 w-12 items-center sm:h-14 sm:w-14 justify-center rounded-full bg-teal text-white shadow-lg shadow-navy/25 ring-1 ring-white/30 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:bottom-6 sm:right-6"
    >
      <img src="/assets/whatsapp-glyph-white.svg" width={30} height={30} alt="" aria-hidden="true" className="block" />
    </a>,
    document.body,
  )
}
