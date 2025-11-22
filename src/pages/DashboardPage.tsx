export function DashboardPage() {
  return (
    <div className="card">
      <div className="page-header">
        <p className="page-header__eyebrow">Overview</p>
        <h1 className="page-header__title">Dashboard</h1>
        <p className="page-header__description">
          High-level signals for the End to End Company Products workspace. This area will soon surface
          auth status, AI interactions, and live data from the gateway.
        </p>
      </div>

      <div className="content-surface">
        <p className="page-header__description">
          No live widgets yet—this card reserves space for usage metrics, session activity, and alerts. Use
          the command palette (Ctrl/⌘+K) to jump between sections.
        </p>
      </div>
    </div>
  )
}

