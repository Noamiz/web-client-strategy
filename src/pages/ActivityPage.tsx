export function ActivityPage() {
  return (
    <div className="card">
      <div className="page-header">
        <p className="page-header__eyebrow">History</p>
        <h1 className="page-header__title">Activity</h1>
        <p className="page-header__description">
          Track recent authentication attempts, system events, and audit history. Data plumbing is still in
          progress, so this page renders a placeholder for now.
        </p>
      </div>

      <div className="empty-state">
        <p>No activity to show yet. We&apos;ll connect this view to server-strategy events soon.</p>
      </div>
    </div>
  )
}

