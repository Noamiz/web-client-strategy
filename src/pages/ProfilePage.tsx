export function ProfilePage() {
  return (
    <div className="card">
      <div className="page-header">
        <p className="page-header__eyebrow">Account</p>
        <h1 className="page-header__title">Profile & Settings</h1>
        <p className="page-header__description">
          Manage notification preferences, social logins, and security controls. Integrations will hook up
          once the server exposes profile endpoints.
        </p>
      </div>

      <div className="empty-state">
        <p>Profile editing is coming soon. For now, use the auth demo to simulate sign-ins.</p>
      </div>
    </div>
  )
}

