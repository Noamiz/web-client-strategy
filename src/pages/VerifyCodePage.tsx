import type { AuthVerifyCodeSuccess } from 'common-strategy'
import { AuthCodeForm } from '../components/AuthCodeForm'

type VerifyCodePageProps = {
  onSuccess: (session: AuthVerifyCodeSuccess) => void
  onBack: () => void
}

export function VerifyCodePage({ onSuccess, onBack }: VerifyCodePageProps) {
  return (
    <section className="card">
      <header>
        <p className="eyebrow">Step 2</p>
        <h2>Enter your code</h2>
        <p>Use the same email and the 6-digit verification code we just sent.</p>
      </header>

      <AuthCodeForm onSuccess={onSuccess} />

      <button type="button" className="link-button" onClick={onBack}>
        Start over
      </button>
    </section>
  )
}

