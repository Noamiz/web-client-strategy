interface TopBarProps {
  pageTitle: string
  onToggleSidebar: () => void
  onOpenCommandPalette: () => void
  onOpenAiAssistant: () => void
}

export function TopBar({
  pageTitle,
  onToggleSidebar,
  onOpenCommandPalette,
  onOpenAiAssistant,
}: TopBarProps) {
  return (
    <header className="top-bar" role="banner">
      <div className="top-bar__brand">
        <span>End to End Company</span>
        <div className="top-bar__title">{pageTitle}</div>
      </div>

      <div className="top-bar__search" aria-label="Global search placeholder">
        <span>Search workspace...</span>
        <span className="badge">Soon</span>
      </div>

      <div className="top-bar__actions">
        <button
          type="button"
          className="btn btn-icon"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          Nav
        </button>
        <button type="button" className="btn btn-icon" aria-label="Notifications">
          Bell
        </button>
        <button type="button" className="btn btn-icon" aria-label="Open command palette" onClick={onOpenCommandPalette}>
          Cmd+K
        </button>
        <button
          type="button"
          className="btn btn-icon"
          aria-label="Open AI assistant"
          onClick={onOpenAiAssistant}
        >
          AI
        </button>
        <span className="avatar" aria-label="Current user">
          U
        </span>
      </div>
    </header>
  )
}

