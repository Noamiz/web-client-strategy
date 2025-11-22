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

