import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthEmailForm } from '../components/AuthEmailForm'
import { useAuth } from '../hooks/useAuth'

export function SendCodePage() {
  const navigate = useNavigate()
  const { reset } = useAuth()

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <section className="card">
      <div className="page-header">
        <p className="page-header__eyebrow">Step 1 · Email verification</p>
        <h1 className="page-header__title">Send a login code</h1>
        <p className="page-header__description">
          Enter your work email and we&apos;ll send you a 6-digit code to finish signing in.
        </p>
      </div>

      <AuthEmailForm
        onSuccess={() => {
          void navigate('/auth/verify-code')
        }}
      />
    </section>
  )
}

