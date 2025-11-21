import type { FormEvent } from 'react'
import { useState } from 'react'
import { sendCode } from '../api/authClient'

interface AuthEmailFormProps {
  onSuccess: () => void
}

export function AuthEmailForm({ onSuccess }: AuthEmailFormProps) {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setErrorMessage(null)

    const result = await sendCode({ email: normalizedEmail })
    setLoading(false)

    if (result.ok) {
      onSuccess()
      return
    }

    setErrorMessage(result.error.message)
  }

  return (
    <form
      className="auth-form"
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
      noValidate
    >
      <div className="form-field">
        <label htmlFor="auth-email">Work email</label>
        <input
          id="auth-email"
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

      {errorMessage ? (
        <p role="alert" className="form-error" aria-live="assertive">
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send code'}
      </button>
    </form>
  )
}

