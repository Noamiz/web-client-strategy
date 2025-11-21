import { AuthEmailForm } from '../components/AuthEmailForm'

type SendCodePageProps = {
  onContinue: () => void
}

export function SendCodePage({ onContinue }: SendCodePageProps) {
  return (
    <section className="card">
      <header>
        <p className="eyebrow">Step 1</p>
        <h2>Enter your email</h2>
        <p>We will email you a 6-digit code to finish signing in.</p>
      </header>

      <AuthEmailForm onSuccess={onContinue} />
    </section>
  )
}

