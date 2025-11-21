import type { AuthToken, User } from 'common-strategy'

interface LoggedInPageProps {
  user: User
  token: AuthToken
  onSignOut: () => void
}

const formatTokenPreview = (token: AuthToken) =>
  token.token.length > 12
    ? `${token.token.slice(0, 6)}...${token.token.slice(-4)}`
    : token.token

export function LoggedInPage({ user, token, onSignOut }: LoggedInPageProps) {
  return (
    <section className="card">
      <header>
        <p className="eyebrow">All set</p>
        <h2>You are logged in</h2>
        <p>Welcome back! This screen is a placeholder for the upcoming dashboard.</p>
      </header>

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

      <button type="button" onClick={onSignOut}>
        Sign out
      </button>
    </section>
  )
}

