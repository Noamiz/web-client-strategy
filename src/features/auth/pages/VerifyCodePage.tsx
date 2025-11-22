import type { AuthVerifyCodeSuccess } from 'common-strategy'
import { useNavigate } from 'react-router-dom'
import { AuthCodeForm } from '../components/AuthCodeForm'
import { useAuth } from '../hooks/useAuth'

export function VerifyCodePage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSuccess = (session: AuthVerifyCodeSuccess) => {
    login(session)
    void navigate('/auth/logged-in')
  }

  return (
    <section className="card">
      <div className="page-header">
        <p className="page-header__eyebrow">Step 2 · Security check</p>
        <h1 className="page-header__title">Verify the code</h1>
        <p className="page-header__description">
          Use the same email plus the 6-digit code we just sent to finish signing in.
        </p>
      </div>

      <AuthCodeForm onSuccess={handleSuccess} />

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => {
          void navigate('/auth/send-code')
        }}
      >
        Start over
      </button>
    </section>
  )
}

