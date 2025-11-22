import type { AuthToken } from 'common-strategy'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const formatTokenPreview = (token: AuthToken) =>
  token.token.length > 12
    ? `${token.token.slice(0, 6)}...${token.token.slice(-4)}`
    : token.token

export function LoggedInPage() {
  const navigate = useNavigate()
  const { user, token, reset } = useAuth()

  if (!user || !token) {
    return <Navigate to="/auth/send-code" replace />
  }

  const handleSignOut = () => {
    reset()
    void navigate('/auth/send-code')
  }

  return (
    <section className="card">
      <div className="page-header">
        <p className="page-header__eyebrow">Session ready</p>
        <h1 className="page-header__title">You are logged in</h1>
        <p className="page-header__description">
          This placeholder screen confirms the token returned by the authentication service.
        </p>
      </div>

      <dl className="session-details">
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Auth token preview</dt>
          <dd>{formatTokenPreview(token)}</dd>
        </div>
      </dl>

      <button type="button" className="btn btn-primary" onClick={handleSignOut}>
        Sign out
      </button>
    </section>
  )
}

