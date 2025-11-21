import { useState } from 'react'
import type { AuthToken, AuthVerifyCodeSuccess, User } from 'common-strategy'

type AuthSession = AuthVerifyCodeSuccess | null

export const useAuth = () => {
  const [session, setSession] = useState<AuthSession>(null)

  const login = (next: AuthVerifyCodeSuccess) => {
    setSession(next)
  }

  const reset = () => {
    setSession(null)
  }

  const user: User | null = session?.user ?? null
  const token: AuthToken | null = session?.token ?? null

  return {
    user,
    token,
    isAuthenticated: Boolean(session),
    login,
    reset,
  }
}

