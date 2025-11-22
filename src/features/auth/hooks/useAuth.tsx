import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AuthToken, AuthVerifyCodeSuccess, User } from 'common-strategy'

type AuthSession = AuthVerifyCodeSuccess | null

interface AuthContextValue {
  user: User | null
  token: AuthToken | null
  isAuthenticated: boolean
  login: (session: AuthVerifyCodeSuccess) => void
  reset: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const useAuthState = () => {
  const [session, setSession] = useState<AuthSession>(null)

  const login = useCallback((next: AuthVerifyCodeSuccess) => {
    setSession(next)
  }, [])

  const reset = useCallback(() => {
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session),
      login,
      reset,
    }),
    [session, login, reset],
  )

  return value
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = useAuthState()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

