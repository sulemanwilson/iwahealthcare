import Container from '../components/Container'
import { PolicyBody } from '../components/PolicyDialog'
import { POLICIES, POLICIES_UPDATED } from '../content/policies'

const policy = POLICIES.find((p) => p.id === 'privacy')!

export default function PrivacyPolicy() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{policy.title}</h1>
      <p className="mt-2 text-sm text-navy/70">Last updated: {POLICIES_UPDATED}</p>
      <div className="mt-8 text-base leading-relaxed text-navy/80">
        <PolicyBody policy={policy} />
      </div>
    </Container>
  )
}
