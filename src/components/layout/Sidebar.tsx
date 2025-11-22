import { NavLink } from 'react-router-dom'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'D' },
  { to: '/activity', label: 'Activity', icon: 'A' },
  { to: '/auth/send-code', label: 'Auth demo', icon: 'S' },
  { to: '/profile', label: 'Profile', icon: 'P' },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`} aria-label="Primary navigation">
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `sidebar__link${isActive ? ' active' : ''}`}
          >
            <span className="sidebar__icon">{item.icon}</span>
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        {!collapsed && <span className="badge">Preview</span>}
        <button type="button" className="btn btn-icon" onClick={onToggle}>
          {collapsed ? '>' : '<'}
        </button>
      </div>
    </aside>
  )
}

