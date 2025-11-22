// NOTE: InspectorPanel is a placeholder for future list/detail and diagnostic flows.
// It intentionally renders a stub so the shell layout mirrors the internal tool.
export function InspectorPanel() {
  return (
    <aside className="inspector-panel" aria-label="Inspector panel">
      <p className="page-header__eyebrow">Inspector</p>
      <p className="page-header__description">
        Reserved for metrics, WebSocket traces, or debug info that mirrors the internal tool layout.
      </p>
    </aside>
  )
}

