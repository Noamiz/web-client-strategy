import type { FormEvent } from 'react'
import { useState } from 'react'
import type { ApiError, AuthVerifyCodeSuccess } from 'common-strategy'
import { verifyCode } from '../api/authClient'

type AuthCodeFormProps = {
  onSuccess: (session: AuthVerifyCodeSuccess) => void
}

const getErrorMessage = (error: ApiError) => {
  switch (error.code) {
    case 'UNAUTHORIZED':
      return 'That code is invalid. Please try again or request a new one.'
    case 'NOT_FOUND':
    case 'VALIDATION_ERROR':
      return 'We could not find a pending login for that email. Please request a new code.'
    case 'TOO_MANY_REQUESTS':
      return 'Too many attempts. Please wait a moment before trying again.'
    default:
      return error.message
  }
}

export function AuthCodeForm({ onSuccess }: AuthCodeFormProps) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedCode = code

    if (!normalizedEmail || normalizedCode.length < 6) {
      setErrorMessage('Enter the same email plus the 6-digit code we sent you.')
      return
    }

    setLoading(true)
    setErrorMessage(null)

    const result = await verifyCode({
      email: normalizedEmail,
      code: normalizedCode,
    })

    setLoading(false)

    if (result.ok) {
      setCode('')
      onSuccess(result.data)
      return
    }

    setErrorMessage(getErrorMessage(result.error))
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="verify-email">Email</label>
        <input
          id="verify-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="verify-code">Verification code</label>
        <input
          id="verify-code"
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
          disabled={loading}
          maxLength={6}
          required
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="form-error" aria-live="assertive">
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify code'}
      </button>
    </form>
  )
}

