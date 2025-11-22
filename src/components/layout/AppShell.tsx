import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AiAssistantPanel } from '../ai/AiAssistantPanel'
import {
  CommandPalette,
  type CommandPaletteCommand,
} from '../command-palette/CommandPalette'
import { InspectorPanel } from './InspectorPanel'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

const getPageTitle = (pathname: string) => {
  if (pathname.startsWith('/auth/verify-code')) {
    return 'Authentication · Verify'
  }

  if (pathname.startsWith('/auth/logged-in')) {
    return 'Authentication · Session'
  }

  if (pathname.startsWith('/auth')) {
    return 'Authentication · Send code'
  }

  if (pathname.startsWith('/activity')) {
    return 'Activity'
  }

  if (pathname.startsWith('/profile')) {
    return 'Profile'
  }

  return 'Dashboard'
}

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [isAiAssistantOpen, setAiAssistantOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev)
  }, [])

  const openCommandPalette = useCallback(() => {
    setCommandPaletteOpen(true)
  }, [])

  const closeCommandPalette = useCallback(() => {
    setCommandPaletteOpen(false)
  }, [])

  const openAiAssistant = useCallback(() => {
    setAiAssistantOpen(true)
  }, [])

  const closeAiAssistant = useCallback(() => {
    setAiAssistantOpen(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const pageTitle = useMemo(() => getPageTitle(location.pathname), [location.pathname])

  const commands = useMemo<CommandPaletteCommand[]>(
    () => [
      {
        id: 'nav-dashboard',
        label: 'Go to Dashboard',
        category: 'Navigation',
        action: () => {
          void navigate('/')
        },
      },
      {
        id: 'nav-activity',
        label: 'Go to Activity',
        category: 'Navigation',
        action: () => {
          void navigate('/activity')
        },
      },
      {
        id: 'nav-auth',
        label: 'Go to Auth flow',
        category: 'Navigation',
        action: () => {
          void navigate('/auth/send-code')
        },
      },
      {
        id: 'nav-profile',
        label: 'Go to Profile',
        category: 'Navigation',
        action: () => {
          void navigate('/profile')
        },
      },
      {
        id: 'toggle-sidebar',
        label: isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
        category: 'Actions',
        action: toggleSidebar,
      },
      {
        id: 'open-ai',
        label: 'Open AI assistant',
        category: 'Actions',
        action: openAiAssistant,
      },
    ],
    [isSidebarCollapsed, navigate, openAiAssistant, toggleSidebar],
  )

  return (
    <div className="app-shell">
      <TopBar
        pageTitle={pageTitle}
        onToggleSidebar={toggleSidebar}
        onOpenCommandPalette={openCommandPalette}
        onOpenAiAssistant={openAiAssistant}
      />

      <div className="shell-body">
        <Sidebar collapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <main className="main-content">
          <Outlet />
        </main>
        <InspectorPanel />
      </div>

      {isCommandPaletteOpen ? (
        <CommandPalette onClose={closeCommandPalette} commands={commands} />
      ) : null}
      <AiAssistantPanel isOpen={isAiAssistantOpen} onClose={closeAiAssistant} />
    </div>
  )
}

