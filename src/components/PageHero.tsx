import type { ReactNode } from 'react'
import Container from './Container'

type Props = { title: string; children?: ReactNode }

export default function PageHero({ title, children }: Props) {
  return (
    <section className="bg-mist">
      <Container className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-xl text-lg leading-relaxed text-navy/70">{children}</div>}
      </Container>
    </section>
  )
}
