import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="card">
      <div className="page-header">
        <p className="page-header__eyebrow">Oops</p>
        <h1 className="page-header__title">Page not found</h1>
        <p className="page-header__description">
          The requested path is not part of the E2E-XS navigation map. Use the command palette or sidebar
          to find what you need.
        </p>
      </div>

      <Link to="/" className="btn btn-primary">
        Return to dashboard
      </Link>
    </div>
  )
}

