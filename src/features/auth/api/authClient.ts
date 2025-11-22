import type {
  ApiError,
  AuthSendCodeRequest,
  AuthSendCodeResponse,
  AuthVerifyCodeRequest,
  AuthVerifyCodeSuccess,
  Result,
} from 'common-strategy'

type AuthResult<T> = Result<T>

const JSON_HEADERS = {
  'Content-Type': 'application/json',
}

const fallbackError = (message: string): ApiError => ({
  code: 'INTERNAL_SERVER_ERROR',
  message,
})

const toResult = <T>(errorMessage: string): AuthResult<T> => ({
  ok: false,
  error: fallbackError(errorMessage),
})

const isResult = <T>(value: unknown): value is AuthResult<T> =>
  typeof value === 'object' &&
  value !== null &&
  'ok' in value &&
  typeof (value as { ok: unknown }).ok === 'boolean'

async function postAuth<T>(path: string, payload: unknown): Promise<AuthResult<T>> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(payload),
    })

    const data: unknown = await response.json().catch(() => null)
    if (isResult<T>(data)) {
      return data
    }

    return toResult<T>('Received an unexpected response from the authentication service.')
  } catch (error) {
    console.error('Auth request failed', error)
    return toResult<T>('Unable to reach the authentication service. Please try again.')
  }
}

export const sendCode = (payload: AuthSendCodeRequest) =>
  postAuth<AuthSendCodeResponse>('/auth/send-code', payload)

export const verifyCode = (payload: AuthVerifyCodeRequest) =>
  postAuth<AuthVerifyCodeSuccess>('/auth/verify-code', payload)

