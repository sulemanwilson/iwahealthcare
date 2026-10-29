import type { ReactNode } from 'react'
import Container from './Container'

export default function Section({
  children,
  tone = 'white',
  className = '',
}: {
  children: ReactNode
  tone?: 'white' | 'mist'
  className?: string
}) {
  return (
    <section className={tone === 'mist' ? 'bg-mist' : 'bg-white'}>
      <Container className={`py-12 sm:py-16 lg:py-20 ${className}`}>{children}</Container>
    </section>
  )
}
