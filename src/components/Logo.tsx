import { Link } from 'react-router-dom'
import { LOGO_SRC } from '../nav'

export default function Logo({ className = 'h-11 sm:h-12' }: { className?: string }) {
  return (
    <Link to="/" aria-label="IWA Healthcare home" className="inline-flex shrink-0 items-center">
      <img
        src={LOGO_SRC}
        alt="IWA Healthcare"
        width={2118}
        height={742}
        decoding="async"
        className={`${className} w-auto object-contain`}
      />
    </Link>
  )
}
