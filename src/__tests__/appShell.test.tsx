import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, vi } from 'vitest'
import AppRoutes from '../App'

describe('AppShell layout', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the top bar and sidebar navigation', () => {
    render(<AppRoutes />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /activity/i })).toBeInTheDocument()
  })

  it('opens the command palette via keyboard and runs navigation commands', async () => {
    const user = userEvent.setup()
    render(<AppRoutes />)

    await user.click(screen.getByLabelText(/open command palette/i))
    expect(screen.getByRole('dialog', { name: /command palette/i })).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: /command palette/i })).not.toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    const input = await screen.findByPlaceholderText(/search actions/i)
    await user.type(input, 'profile{enter}')

    expect(await screen.findByRole('heading', { name: /profile & settings/i })).toBeInTheDocument()
  })

  it('opens the AI assistant panel and echoes user messages', async () => {
    const user = userEvent.setup()
    render(<AppRoutes />)

    await user.click(screen.getByLabelText(/open ai assistant/i))
    expect(screen.getByText(/workspace helper/i)).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText(/ask something/i)
    await user.type(textarea, 'Hello AI friend')
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByText('Hello AI friend')).toBeInTheDocument()
  })
})

