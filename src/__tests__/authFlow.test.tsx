import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type {
  AuthSendCodeResponse,
  AuthVerifyCodeSuccess,
  Result,
} from 'common-strategy'
import App from '../App'

const createFetchResponse = <T,>(body: Result<T>) =>
  ({
    ok: body.ok,
    json: async () => body,
  }) as Response

const queueFetchResponses = (...payloads: Result<unknown>[]) => {
  const fetchMock = vi.fn()

  payloads.forEach((payload) => {
    fetchMock.mockResolvedValueOnce(createFetchResponse(payload))
  })

  globalThis.fetch = fetchMock as typeof fetch
  return fetchMock
}

describe('auth flow', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('walks through the happy path and lands on the logged-in page', async () => {
    const sendCodeSuccess: Result<AuthSendCodeResponse> = {
      ok: true,
      data: {
        expiresAt: Date.now() + 60_000,
        maskedDestination: 'u***@example.com',
      },
    }

    const verifySuccess: Result<AuthVerifyCodeSuccess> = {
      ok: true,
      data: {
        user: {
          id: 'user-1',
          email: 'dev@example.com',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isActive: true,
        },
        token: {
          token: 'abc123456789xyz',
          issuedAt: Date.now(),
          expiresAt: Date.now() + 60 * 60 * 1000,
        },
      },
    }

    queueFetchResponses(sendCodeSuccess, verifySuccess)

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/work email/i), 'dev@example.com')
    await user.click(screen.getByRole('button', { name: /send code/i }))

    await screen.findByRole('heading', { name: /enter your code/i })

    await user.type(screen.getByLabelText(/email/i), 'dev@example.com')
    await user.type(screen.getByLabelText(/verification code/i), '123456')
    await user.click(screen.getByRole('button', { name: /verify code/i }))

    await waitFor(() => {
      expect(screen.getByText(/you are logged in/i)).toBeInTheDocument()
    })

    expect(screen.getByText('dev@example.com')).toBeInTheDocument()
  })

  it('surfaces API errors during verification', async () => {
    const sendCodeSuccess: Result<AuthSendCodeResponse> = {
      ok: true,
      data: {
        expiresAt: Date.now() + 60_000,
      },
    }

    const verifyError: Result<AuthVerifyCodeSuccess> = {
      ok: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Code invalid',
      },
    }

    const fetchMock = queueFetchResponses(sendCodeSuccess, verifyError)

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/work email/i), 'dev@example.com')
    await user.click(screen.getByRole('button', { name: /send code/i }))
    await screen.findByRole('heading', { name: /enter your code/i })

    await user.type(screen.getByLabelText(/email/i), 'dev@example.com')
    await user.type(screen.getByLabelText(/verification code/i), '123456')
    await user.click(screen.getByRole('button', { name: /verify code/i }))

    await screen.findByText(/that code is invalid/i)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})

